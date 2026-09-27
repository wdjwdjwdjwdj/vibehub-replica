import { test, after } from 'node:test';
import assert from 'node:assert/strict';

const BASE = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
// Better Auth 有 CSRF 保护：无 Origin 的写请求会被拒（MISSING_OR_NULL_ORIGIN）。
// 这里模拟浏览器，发送服务端 trustedOrigins 里登记过的前端地址。
const ORIGIN = process.env.TEST_ORIGIN || 'http://127.0.0.1:5174';

// ---- 最小 cookie 容器（Node 的 fetch 不自动管理 cookie）----
const jar = new Map();
const cookieHeader = () => [...jar.entries()].map(([k, v]) => `${k}=${v}`).join('; ');

const storeCookies = (res) => {
  const setCookies = res.headers.getSetCookie?.() ?? [];
  for (const raw of setCookies) {
    const [pair] = raw.split(';');
    const idx = pair.indexOf('=');
    if (idx < 0) continue;
    const name = pair.slice(0, idx).trim();
    const value = pair.slice(idx + 1).trim();
    // Max-Age=0 或空值表示清除
    if (!value) jar.delete(name);
    else jar.set(name, value);
  }
};

const api = async (path, { method = 'GET', body } = {}) => {
  const res = await fetch(BASE + path, {
    method,
    headers: {
      'content-type': 'application/json',
      origin: ORIGIN,
      ...(jar.size ? { cookie: cookieHeader() } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  storeCookies(res);
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = text;
  }
  return { status: res.status, json };
};

// 每次运行用随机邮箱，避免与既有数据冲突
const email = `test-${Date.now()}@vibehub.test`;
const password = 'devpassword123';

// 用独立账号跑，结束后清理自己造的数据
after(async () => {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();
  try {
    await prisma.user.deleteMany({ where: { email } });
  } finally {
    await prisma.$disconnect();
  }
});

test('健康检查返回数据库状态', async () => {
  const r = await api('/api/health');
  assert.equal(r.status, 200);
  assert.equal(r.json.ok, true);
  assert.equal(r.json.data.database, 'up');
});

test('未登录访问收藏返回 401', async () => {
  const r = await api('/api/favorites');
  assert.equal(r.status, 401);
  assert.equal(r.json.error.code, 'UNAUTHORIZED');
});

test('未登录写入收藏返回 401', async () => {
  const r = await api('/api/favorites', { method: 'PUT', body: { termIds: ['button'] } });
  assert.equal(r.status, 401);
});

test('浏览器 CORS 预检允许收藏 PUT', async () => {
  const r = await fetch(`${BASE}/api/favorites`, {
    method: 'OPTIONS',
    headers: {
      origin: ORIGIN,
      'access-control-request-method': 'PUT',
      'access-control-request-headers': 'content-type',
    },
  });
  assert.equal(r.status, 204);
  assert.match(r.headers.get('access-control-allow-methods') || '', /PUT/);
});

test('不存在的接口返回统一 404 格式', async () => {
  const r = await api('/api/does-not-exist');
  assert.equal(r.status, 404);
  assert.equal(r.json.error.code, 'NOT_FOUND');
});

test('注册新账号', async () => {
  const r = await api('/api/auth/sign-up/email', {
    method: 'POST',
    body: { email, password, name: 'Tester' },
  });
  assert.equal(r.status, 200);
  assert.ok(r.json.user?.id, '应返回用户 id');
  assert.equal(r.json.user.email, email);
});

test('短密码被拒绝（策略生效）', async () => {
  const r = await api('/api/auth/sign-up/email', {
    method: 'POST',
    body: { email: `weak-${Date.now()}@vibehub.test`, password: '123', name: 'Weak' },
  });
  assert.ok(r.status >= 400, `弱密码应被拒，实际 ${r.status}`);
});

test('登录成功并写入会话 cookie', async () => {
  const r = await api('/api/auth/sign-in/email', {
    method: 'POST',
    body: { email, password },
  });
  assert.equal(r.status, 200);
  assert.ok(jar.has('better-auth.session_token'), '应下发会话 cookie');
});

test('登录后可以读取旧会话', async () => {
  const r = await api('/api/auth/get-session');
  assert.equal(r.status, 200);
  assert.equal(r.json?.user?.email, email);
});

test('收藏初始为空数组', async () => {
  const r = await api('/api/favorites');
  assert.equal(r.status, 200);
  assert.deepEqual(r.json.data, []);
});

test('收藏全量覆盖写入', async () => {
  const r = await api('/api/favorites', { method: 'PUT', body: { termIds: ['button', 'card', 'modal'] } });
  assert.equal(r.status, 200);

  const read = await api('/api/favorites');
  assert.deepEqual([...read.json.data].sort(), ['button', 'card', 'modal']);
});

test('收藏提交幂等（重复提交结果一致）', async () => {
  await api('/api/favorites', { method: 'PUT', body: { termIds: ['button', 'card', 'modal'] } });
  const again = await api('/api/favorites', { method: 'PUT', body: { termIds: ['button', 'card', 'modal'] } });
  assert.equal(again.status, 200);

  const read = await api('/api/favorites');
  assert.deepEqual([...read.json.data].sort(), ['button', 'card', 'modal']);
});

test('收藏覆盖会移除已取消项并保留新增项', async () => {
  await api('/api/favorites', { method: 'PUT', body: { termIds: ['button', 'input'] } });
  const read = await api('/api/favorites');
  assert.deepEqual([...read.json.data].sort(), ['button', 'input']);
});

test('收藏提交自动去重', async () => {
  await api('/api/favorites', { method: 'PUT', body: { termIds: ['button', 'button', 'button'] } });
  const read = await api('/api/favorites');
  assert.deepEqual(read.json.data, ['button']);
});

test('收藏增量 PUT/DELETE 幂等且不会覆盖其他收藏', async () => {
  const add = await api('/api/favorites/modal', { method: 'PUT', body: {} });
  assert.equal(add.status, 200);
  assert.deepEqual(add.json.data, { termId: 'modal', saved: true });

  const addAgain = await api('/api/favorites/modal', { method: 'PUT', body: {} });
  assert.equal(addAgain.status, 200);
  const afterAdd = await api('/api/favorites');
  assert.ok(afterAdd.json.data.includes('modal'));

  const remove = await api('/api/favorites/modal', { method: 'DELETE', body: {} });
  assert.equal(remove.status, 200);
  const removeAgain = await api('/api/favorites/modal', { method: 'DELETE', body: {} });
  assert.equal(removeAgain.status, 200);
  const afterRemove = await api('/api/favorites');
  assert.ok(!afterRemove.json.data.includes('modal'));
});

test('收藏参数校验：termIds 缺失返回 400', async () => {
  const r = await api('/api/favorites', { method: 'PUT', body: {} });
  assert.equal(r.status, 400);
  assert.equal(r.json.error.code, 'VALIDATION_ERROR');
});

test('练习记录：追加后可按最近顺序读取', async () => {
  const a = await api('/api/practice/record', { method: 'POST', body: { termId: 'button', correct: true } });
  assert.equal(a.status, 200);

  const b = await api('/api/practice/record', { method: 'POST', body: { termId: 'card', correct: false } });
  assert.equal(b.status, 200);

  const recent = await api('/api/practice/recent');
  assert.equal(recent.status, 200);
  assert.equal(recent.json.data.length, 2);
  assert.equal(recent.json.data[0].termId, 'card'); // 最新在前
  assert.equal(recent.json.data[1].termId, 'button');
});

test('练习记录：最近条数上限为 12', async () => {
  for (let i = 0; i < 15; i += 1) {
    await api('/api/practice/record', { method: 'POST', body: { termId: `term-${i}`, correct: i % 2 === 0 } });
  }
  const recent = await api('/api/practice/recent');
  assert.equal(recent.json.data.length, 12);
});

test('练习参数校验：correct 必须是布尔', async () => {
  const r = await api('/api/practice/record', { method: 'POST', body: { termId: 'button', correct: 'yes' } });
  assert.equal(r.status, 400);
});

test('练习记录使用 clientEventId 幂等', async () => {
  const body = { termId: 'button', correct: true, clientEventId: `event-${Date.now()}` };
  const first = await api('/api/practice/record', { method: 'POST', body });
  const retry = await api('/api/practice/record', { method: 'POST', body: { ...body, correct: false, termId: 'card' } });
  assert.equal(first.status, 200);
  assert.equal(retry.status, 200);
  assert.equal(retry.json.data.id, first.json.data.id);
  assert.equal(retry.json.data.termId, 'button');
  assert.equal(retry.json.data.correct, true);
  assert.equal(retry.json.data.clientEventId, body.clientEventId);
});

test('课程进度和继续阅读位置可以读取并更新', async () => {
  const progress = await api('/api/courses/product-website/chapters/01/progress', {
    method: 'PUT',
    body: { completed: true },
  });
  assert.equal(progress.status, 200);
  assert.equal(progress.json.data.courseId, 'product-website');
  assert.equal(progress.json.data.chapterId, '01');
  assert.equal(progress.json.data.completed, true);

  const position = await api('/api/courses/product-website/position', {
    method: 'PUT',
    body: { chapterId: '01', anchor: 'page-structure' },
  });
  assert.equal(position.status, 200);
  assert.equal(position.json.data.anchor, 'page-structure');

  const read = await api('/api/courses/progress');
  assert.equal(read.status, 200);
  assert.deepEqual(read.json.data.chapters[0].completed, true);
  assert.equal(read.json.data.positions[0].anchor, 'page-structure');
});

test('课程进度参数校验', async () => {
  const r = await api('/api/courses/product-website/chapters/01/progress', {
    method: 'PUT',
    body: { completed: 'yes' },
  });
  assert.equal(r.status, 400);
  assert.equal(r.json.error.code, 'VALIDATION_ERROR');
});

test('登出后会话失效', async () => {
  const out = await api('/api/auth/sign-out', { method: 'POST', body: {} });
  assert.ok(out.status === 200 || out.status === 204, `登出应成功，实际 ${out.status}`);

  const r = await api('/api/favorites');
  assert.equal(r.status, 401);
});
