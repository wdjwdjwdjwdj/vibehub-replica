# VibeHub 后端服务

前端（`../`，Vite + React）的配套后端：**邮箱密码认证 + 云端收藏 + 练习记录同步**。

> 设计前提：**登录是可选的**。未登录时站点功能与纯静态版完全一致，后端不可用也不影响浏览。

## 技术栈

| 层 | 选型 |
| --- | --- |
| 运行时 | Node 22 LTS |
| Web 框架 | Fastify 5 |
| 认证 | Better Auth 1.7（仅邮箱密码，OAuth 待有域名后启用） |
| ORM | Prisma 6 |
| 数据库 | 本地 SQLite / 生产 PostgreSQL 16 |

## 快速开始

```bash
cd server
npm install
cp .env.example .env          # 然后把 BETTER_AUTH_SECRET 换成随机值
npm run db:migrate            # 建库 + 应用迁移
npm run dev                   # 启动（默认 127.0.0.1:3000）
```

生成密钥：

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## 接口

### 认证（Better Auth 提供）

| 方法 | 路径 |
| --- | --- |
| POST | `/api/auth/sign-up/email` |
| POST | `/api/auth/sign-in/email` |
| POST | `/api/auth/sign-out` |
| GET | `/api/auth/get-session` |

### 业务接口

| 方法 | 路径 | 说明 | 鉴权 |
| --- | --- | --- | --- |
| GET | `/api/health` | 健康检查（含数据库连通性） | 否 |
| GET | `/api/favorites` | 返回收藏的术语 id 数组 | 是 |
| PUT | `/api/favorites` | **全量覆盖**收藏集合（幂等） | 是 |
| GET | `/api/practice/recent` | 最近 12 条练习记录 | 是 |
| POST | `/api/practice/record` | 追加一条练习记录 | 是 |

响应统一形状：成功 `{ ok: true, data }`，失败 `{ error: { code, message } }`。

## 测试

```bash
npm test        # 18 个接口用例（需先启动服务）
```

覆盖：健康检查、鉴权拦截、注册/登录/登出、会话有效性、收藏全量覆盖与幂等与去重、参数校验、练习记录顺序与上限。

## 环境变量

| 变量 | 说明 |
| --- | --- |
| `NODE_ENV` | `development` / `production` |
| `PORT` / `HOST` | 默认 `3000` / `127.0.0.1`（**不要绑 0.0.0.0**，公网入口交给反向代理） |
| `DATABASE_URL` | SQLite 用 `file:./dev.db`；生产用 `postgresql://...` |
| `BETTER_AUTH_SECRET` | 会话签名密钥，**必须随机且保密** |
| `BETTER_AUTH_URL` | 服务对外地址，用于生成回调链接 |
| `CORS_ORIGIN` | 允许的前端来源（逗号分隔），开发期为 Vite 地址 |

## 切换到 PostgreSQL（部署时）

1. 改 `prisma/schema.prisma` 的 `datasource.db.provider` 为 `"postgresql"`
2. 改 `src/auth.js` 中 `prismaAdapter(prisma, { provider: 'postgresql' })`
3. `.env` 的 `DATABASE_URL` 指向 PostgreSQL
4. 重新生成迁移并部署：

```bash
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/xxx_init_postgres/migration.sql
npm run db:deploy
```

> schema 已刻意避开 PG 专有类型（不用 enum / 数组 / Json），切换无需改业务代码。

## 已知约束（按当前决策）

- **不接 OAuth**：GitHub 的 callback URL 只接受域名或 localhost，不接受裸 IP。拿到域名后取消 `src/auth.js` 里 `socialProviders` 的注释即可。
- **关闭邮箱验证**：服务器无 SMTP，开启会导致注册后收不到验证邮件、直接登不进去。接入邮件服务后再开。
- **`useSecureCookies: false`**：当前用 `http://<IP>` 访问，开启 secure cookie 会导致浏览器拒写、登录态失效。接入 HTTPS 后改为 `true`。
