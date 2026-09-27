import Fastify from 'fastify';
import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import { fromNodeHeaders } from 'better-auth/node';
import { auth } from './auth.js';
import { prisma } from './db.js';
import { errorBody } from './http.js';
import { healthRoutes } from './routes/health.js';
import { favoritesRoutes } from './routes/favorites.js';
import { practiceRoutes } from './routes/practice.js';
import { courseRoutes } from './routes/courses.js';

const isProd = process.env.NODE_ENV === 'production';

export const buildApp = async () => {
  const app = Fastify({
    logger: isProd
      ? { level: 'info' }
      : { level: 'info', transport: undefined, redact: ['req.headers.cookie', 'req.headers.authorization'] },
    // 反向代理后要信任 X-Forwarded-*，否则拿到的都是 127.0.0.1
    trustProxy: true,
  });

  await app.register(cookie);

  const corsOrigin = (process.env.CORS_ORIGIN || 'http://127.0.0.1:5174,http://localhost:5174')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  await app.register(cors, {
    // 开发环境允许任意本机 Vite 端口，避免依赖固定端口（前端默认 5174）；
    // 生产环境仍只接受显式配置的来源。
    origin: (origin, callback) => {
      const isLocalDevOrigin = !isProd && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin || '');
      callback(null, !origin || corsOrigin.includes(origin) || isLocalDevOrigin);
    },
    credentials: true, // 必须：跨域下要携带会话 cookie
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });

  /**
   * 把 Better Auth 的全部路由挂到 /api/auth/*。
   * Better Auth 的 handler 接收标准 Web Request、返回标准 Response，这里做一次协议转换。
   */
  app.route({
    method: ['GET', 'POST'],
    url: '/api/auth/*',
    handler: async (request, reply) => {
      const url = new URL(request.url, process.env.BETTER_AUTH_URL || 'http://127.0.0.1:3000');
      const headers = fromNodeHeaders(request.headers);
      const hasBody = request.method !== 'GET' && request.method !== 'HEAD';
      const webRequest = new Request(url, {
        method: request.method,
        headers,
        body: hasBody ? JSON.stringify(request.body ?? {}) : undefined,
      });

      const response = await auth.handler(webRequest);

      reply.status(response.status);
      response.headers.forEach((value, key) => {
        if (key.toLowerCase() === 'set-cookie') return; // 下面单独处理，避免被合并成一条
        reply.header(key, value);
      });
      const setCookies = response.headers.getSetCookie?.() ?? [];
      if (setCookies.length) reply.header('set-cookie', setCookies);

      const text = await response.text();
      return reply.send(text);
    },
  });

  // 统一错误处理：必须在注册路由之前设置，否则插件作用域内的 schema 校验错误不会走到这里
  app.setErrorHandler((error, request, reply) => {
    const isValidation = Boolean(error.validation) || error.code === 'FST_ERR_VALIDATION';
    request.log.error({ err: error }, 'request failed');
    if (isValidation) {
      return reply.code(400).send(errorBody('VALIDATION_ERROR', error.message));
    }
    return reply.code(error.statusCode || 500).send(errorBody('INTERNAL_ERROR', '服务器内部错误'));
  });

  app.setNotFoundHandler((request, reply) =>
    reply.code(404).send(errorBody('NOT_FOUND', `接口不存在: ${request.method} ${request.url}`)),
  );

  await app.register(healthRoutes);
  await app.register(favoritesRoutes);
  await app.register(practiceRoutes);
  await app.register(courseRoutes);

  // 优雅退出：关掉数据库连接，避免容器/进程被强杀时留下锁
  app.addHook('onClose', async () => {
    await prisma.$disconnect();
  });

  return app;
};
