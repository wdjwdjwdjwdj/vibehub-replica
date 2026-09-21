import 'dotenv/config';
import { buildApp } from './app.js';

const PORT = Number(process.env.PORT || 3000);
// 只绑本地回环：生产环境由 Caddy/Nginx 反代，Node 不直接暴露公网
const HOST = process.env.HOST || '127.0.0.1';

const app = await buildApp();

const shutdown = async (signal) => {
  app.log.info(`${signal} received, shutting down gracefully`);
  try {
    await app.close();
    process.exit(0);
  } catch (error) {
    app.log.error({ err: error }, 'shutdown failed');
    process.exit(1);
  }
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

try {
  await app.listen({ port: PORT, host: HOST });
} catch (error) {
  app.log.error({ err: error }, 'failed to start');
  process.exit(1);
}
