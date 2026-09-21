import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './db.js';

/**
 * Better Auth 配置。
 *
 * 当前范围（按已确认的决策）：
 *   - 仅邮箱 + 密码
 *   - 不接 OAuth（无域名时 GitHub 回调地址无法登记）
 *   - 不启用邮箱验证（服务器无 SMTP，开启会导致注册后无法验证、直接登不进去）
 */
export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: 'sqlite' }), // 生产切 PostgreSQL 时改为 'postgresql'

  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || 'http://127.0.0.1:3000',
  basePath: '/api/auth',

  emailAndPassword: {
    enabled: true,
    // 关键：未配置 SMTP 时若开启邮箱验证，注册流程会卡死（收不到验证邮件 → 无法登录）
    requireEmailVerification: false,
    minPasswordLength: 8,
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
    useSecureCookies: false,
    defaultCookieAttributes: {
      httpOnly: true,
      sameSite: 'lax',
    },
  },

  trustedOrigins: (process.env.CORS_ORIGIN || 'http://127.0.0.1:5173,http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
});
