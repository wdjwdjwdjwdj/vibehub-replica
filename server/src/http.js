import { fromNodeHeaders } from 'better-auth/node';
import { auth } from './auth.js';

/** 统一错误响应形状 */
export const errorBody = (code, message) => ({ error: { code, message } });

/** 统一成功响应形状 */
export const okBody = (data) => ({ ok: true, data });

/** 取当前会话；未登录返回 null */
export const getSession = async (request) =>
  auth.api.getSession({ headers: fromNodeHeaders(request.headers) });

/**
 * 路由前置守卫：未登录直接回 401 并返回 null，调用方判空即可。
 */
export const requireSession = async (request, reply) => {
  const session = await getSession(request);
  if (!session) {
    reply.code(401).send(errorBody('UNAUTHORIZED', '请先登录'));
    return null;
  }
  return session;
};
