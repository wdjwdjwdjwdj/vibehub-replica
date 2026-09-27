import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './db.js';
import { sendAuthEmail } from './email.js';

const isProduction = process.env.NODE_ENV === 'production';
const baseURL = process.env.BETTER_AUTH_URL || (isProduction ? '' : 'http://127.0.0.1:3000');
if (isProduction && !baseURL) throw new Error('BETTER_AUTH_URL is required in production');
const configuredTrustedOrigins = (process.env.CORS_ORIGIN || 'http://127.0.0.1:5174,http://localhost:5174')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const trustedOrigins = isProduction
  ? configuredTrustedOrigins
  : [...new Set([
      ...configuredTrustedOrigins,
      'http://127.0.0.1:5174',
      'http://localhost:5174',
      'http://127.0.0.1:5180',
      'http://localhost:5180',
    ])];

const dispatchAuthEmail = (payload) => {
  void sendAuthEmail(payload).catch((error) => {
    // 只记录错误类型和消息，避免把收件人、凭据或邮件正文写入日志。
    console.error('[auth-email] send failed:', error?.message || 'unknown error');
  });
};

/**
 * Better Auth 配置。
 *
 * 当前范围（按已确认的决策）：
 *   - 仅邮箱 + 密码
 *   - 不接 OAuth（无域名时 GitHub 回调地址无法登记）
 *   - 不启用邮箱验证（服务器无 SMTP，开启会导致注册后无法验证、直接登不进去）
 */
export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: process.env.DATABASE_URL?.startsWith('postgres') ? 'postgresql' : 'sqlite' }),

  secret: process.env.BETTER_AUTH_SECRET,
  baseURL,
  basePath: '/api/auth',

  emailAndPassword: {
    enabled: true,
    // 关键：未配置 SMTP 时若开启邮箱验证，注册流程会卡死（收不到验证邮件 → 无法登录）
    requireEmailVerification: process.env.REQUIRE_EMAIL_VERIFICATION === 'true',
    minPasswordLength: 8,
    sendResetPassword: async ({ user, url }) => {
      dispatchAuthEmail({ to: user.email, subject: '重置你的起站密码', text: `请打开以下链接重置密码：${url}` });
    },
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      dispatchAuthEmail({ to: user.email, subject: '验证你的起站邮箱', text: `请打开以下链接验证邮箱：${url}` });
    },
  },

  // GitHub OAuth 暂不启用：GitHub 的 callback URL 只接受域名或 localhost，不接受裸 IP。
  // 拿到域名后取消下面注释即可，无需改动其他代码。
  // socialProviders: {
  //   github: {
  //     clientId: process.env.GITHUB_CLIENT_ID,
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET,
  //   },
  // },

  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 天
    updateAge: 60 * 60 * 24, // 每天续期一次
  },

  advanced: {
    // 重要：当前用 http://<IP> 访问（无域名、无 HTTPS），
    // 若开启 secure cookie，浏览器会拒绝写入 → 登录态失效。
    // 将来接入 HTTPS 后改为 true。
    useSecureCookies: isProduction || process.env.BETTER_AUTH_SECURE_COOKIES === 'true',
    defaultCookieAttributes: {
      httpOnly: true,
      sameSite: 'lax',
    },
  },

  trustedOrigins,
});
