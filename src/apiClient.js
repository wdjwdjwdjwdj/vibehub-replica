const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
// Keep local Vite development usable without requiring a root .env file.
// 同域生产部署直接使用相对路径；只有分离部署才需要显式 API origin。
const API_BASE_URL = configuredApiBaseUrl
  ? configuredApiBaseUrl.replace(/\/$/, '')
  : import.meta.env.DEV
    ? 'http://127.0.0.1:3000'
    : '';

export class ApiError extends Error {
  constructor(message, status = 0, code = 'API_ERROR') {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

async function request(path, options = {}) {
  if (!API_BASE_URL) throw new ApiError('未配置后端服务', 0, 'API_NOT_CONFIGURED');

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      credentials: 'include',
      headers: {
        ...(options.body ? { 'content-type': 'application/json' } : {}),
        ...options.headers,
      },
    });
  } catch (error) {
    throw new ApiError('后端服务暂不可用', 0, 'NETWORK_ERROR');
  }

  const payload = await response.json().catch(() => null);
  if (!response.ok || payload?.ok === false) {
    const error = payload?.error;
    throw new ApiError(error?.message || `请求失败（${response.status}）`, response.status, error?.code || 'API_ERROR');
  }
  return payload?.data !== undefined ? payload.data : payload;
}

export const apiClient = {
  getSession: () => request('/api/auth/get-session'),
  signIn: (email, password) => request('/api/auth/sign-in/email', { method: 'POST', body: JSON.stringify({ email, password }) }),
  signUp: (name, email, password) => request('/api/auth/sign-up/email', { method: 'POST', body: JSON.stringify({ name, email, password }) }),
  requestPasswordReset: (email, redirectTo = window.location.origin) => request('/api/auth/request-password-reset', { method: 'POST', body: JSON.stringify({ email, redirectTo }) }),
  signOut: () => request('/api/auth/sign-out', { method: 'POST', body: JSON.stringify({}) }),
  getFavorites: () => request('/api/favorites'),
  saveFavorites: (termIds) => request('/api/favorites', { method: 'PUT', body: JSON.stringify({ termIds }) }),
  addFavorite: (termId) => request(`/api/favorites/${encodeURIComponent(termId)}`, { method: 'PUT' }),
  removeFavorite: (termId) => request(`/api/favorites/${encodeURIComponent(termId)}`, { method: 'DELETE' }),
  getRecentPractice: () => request('/api/practice/recent'),
  recordPractice: (termId, correct, clientEventId) => request('/api/practice/record', { method: 'POST', body: JSON.stringify({ termId, correct, clientEventId }) }),
  getCourseProgress: () => request('/api/courses/progress'),
  setCourseChapterProgress: (courseId, chapterId, completed) => request(`/api/courses/${encodeURIComponent(courseId)}/chapters/${encodeURIComponent(chapterId)}/progress`, { method: 'PUT', body: JSON.stringify({ completed }) }),
  setCoursePosition: (courseId, chapterId, anchor) => request(`/api/courses/${encodeURIComponent(courseId)}/position`, { method: 'PUT', body: JSON.stringify({ chapterId, anchor }) }),
};
