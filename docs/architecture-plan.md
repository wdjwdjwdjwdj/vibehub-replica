# VibeHub 复刻 · 全栈化架构规划

> 编制日期：2026-09-17
> 适用范围：在现有 `E:\vibe coding\网站复刻` 工程基础上，从**纯静态站点**演进为**前后端完整、可自主部署、具备工程化体系**的站点。
> 本文所有选型均以 2026 年现行公开资料与实测为依据，来源标注在每节末尾。

---

## 一、约束与背景（先锚定现实）

规划必须服从这些已经确定的事实，否则就是空谈：

| 项 | 现状 |
| --- | --- |
| 前端 | Vite + React，已实现 710 路由 / 644 条双语详情，手写 CSS，**已通过 build** |
| 前端资产 | 8 个主题页、Practice 328 题、课程、Skill、Changelog、Anti-AI 全部已实现 |
| 测试资产 | `audit:topic-parity`、`audit:page-parity`、`audit:copy`、`test:terms`(644) 等 23 个脚本 |
| 数据 | 全部打包进 JS（`termAnatomy.js` 289KB、`termAliases.js` 14KB、`referenceDetails.js` 970KB） |
| 状态 | 仅 `localStorage`（`vibehub:favorites`、`vibehub-color-mode`、`vibehub.practice.recent.v1`） |
| 后端 | **不存在**（无服务端目录、无数据库、零真实网络请求） |
| 预算 | 阿里云 300 元学生券，**香港节点**（免备案），2核4G 轻量，券只够约 3-7 个月 |
| 人力 | 单人开发 + AI 协作，无运维团队 |
| 硬约束 | 未确认品牌/域名前不部署；不引入不必要的复杂度 |

**结论：这是"给一个成熟的静态站点补后端"，不是"从零建全栈应用"。** 所有选型都要服务于这个前提 —— 不能为了架构好看而推倒重来。

---

## 二、行业现状调研结论

### 2.1 Node 后端框架

2026 年的格局（多个独立来源结论一致）：

| 框架 | Stars | 定位 | 适用 |
| --- | --- | --- | --- |
| Express | ~65k | 生态最大、性能一般、TS 体验弱 | 遗留系统、快速原型 |
| **Fastify** | ~33k | 高性能、内置校验/序列化/日志 | **生产级 API、自托管** |
| Hono | ~22-32k | 多运行时、体积极小、Web 标准 | Serverless/边缘 |
| NestJS | ~76k | 企业级、规矩重 | 大团队协作、长期复杂业务 |
| Koa / Elysia | — | 极简 / Bun 专用 | 特定场景 |

**多来源一致的推荐语**：「要上生产、性能和工程化都要 → **Fastify**」「小项目、常规 API，闭眼选 Fastify」。

**同时反复出现的警告**：
- 「别为『万一高并发』提前上重框架」
- 「真实项目里，瓶颈十有八九在数据库，不在框架」
- 「别在选框架上耗三天」

### 2.2 鉴权（本轮最重要的发现）

| 方案 | 2026 状态 |
| --- | --- |
| **Better Auth** | **v1.0 已稳定**，自托管默认推荐，~210 万周下载，~30k stars |
| Auth.js (NextAuth) | 仍可用，但**深度绑定 Next.js**；已归入 Better Auth 组织维护 |
| Lucia | **2024 年 9 月已弃用**，作者本人推荐迁移到 Better Auth，现仅作教学参考 |
| Passport.js | 已过时（多篇文章直接写 "Passport.js Is Dead"） |
| Clerk / Auth0 | 托管方案，按用户收费 |

**最重要的两条行业共识**：
1. **「绝不要自己造鉴权」** —— 不写自研 JWT、不写自研密码哈希，用维护中的库。
2. Better Auth **框架无关**，官方提供 **Fastify 集成文档**，适配器对 Prisma / Drizzle / raw SQL 都是一等公民。

> 这条直接推翻了我上一轮给你的口头方案（"JWT + httpOnly cookie 自己写"）。**应该用 Better Auth**，安全性、维护性、工作量三项都更优。

### 2.3 ORM 与数据库

**必须先纠正一个过时认知**：Prisma 7（2025-11-19）**已移除 Rust 引擎**，改为纯 TypeScript/WASM。

| 指标 | Prisma 5/6（旧） | Prisma 7 | Drizzle |
| --- | --- | --- | --- |
| Bundle | ~14MB | **~1.6MB** | ~57KB |
| 冷启动 | 500ms-3s | ~80-150ms | ~50-100ms |
| 查询速度 | 基线 | ~3.4x 提升 | 最快 |

2024~2025 上半年的对比文章**全部过时**，不能再拿"Prisma 有 14MB 二进制"当理由。

选择倾向：
- **Drizzle**：SQL 透明、零依赖、edge 友好；代价是 pre-1.0、偶有 breaking change、文档与错误信息弱于 Prisma
- **Prisma 7**：迁移工具成熟、`prisma studio` 可视化、错误信息一流、文档最完善；代价是仍有 codegen 步骤、体积较大

### 2.4 部署与运维（2026 自托管实践）

| 环节 | 行业做法 |
| --- | --- |
| 反向代理 + HTTPS | **Caddy**（2026 最简：两行 Caddyfile，自动申请续期 Let's Encrypt）；Nginx + certbot 亦可 |
| 进程守护 | **systemd**（原生、日志入 journald）或 PM2（`pm2 startup systemd` + `pm2 save`） |
| 监听地址 | Node **必须绑 `127.0.0.1`**，绝不能 `0.0.0.0` |
| 防火墙 | UFW 默认拒绝，只放 22/80/443 |
| TLS | **不要在 Node 里终止 TLS**，交给反代（OCSP、HTTP/2、自动续期都是白送的） |
| 备份 | **必须有异地备份**；且「没成功恢复过的备份只是假设」 |
| 监控 | Netdata（绑 localhost）+ 外部 uptime（UptimeRobot / BetterStack 免费版） |
| 安全 | UFW + fail2ban + 安全响应头 + 限流 + `.env` 永不进 Git |
| Node 版本 | **v22 LTS（Iron，支持至 2027-04）**；v18 已 EOL |
| CI/CD | GitHub Actions + SSH 部署（3 个 secret：`SERVER_HOST` / `SERVER_USER` / `SSH_PRIVATE_KEY`） |
| 参考配置 | $5/月 的 **2核4G** 是社区标准配置 —— 与我们选的机型一致 |

---

## 三、技术选型决策

| 层 | 选型 | 核心理由 | 备选 / 否决理由 |
| --- | --- | --- | --- |
| 后端框架 | **Fastify** | 多来源共识（生产级自托管首选）；内置 JSON Schema 校验 + 编译式序列化 + Pino 日志，省掉大量自研 | Hono 留作未来若迁 Serverless 的退路；NestJS 否决（单人项目，规矩过重） |
| 鉴权 | **Better Auth** | 2026 自托管默认；框架无关、官方支持 Fastify；密码哈希/会话/限流等安全细节由库承担，避免自造 | Lucia 否决（已弃用）；Auth.js 否决（绑 Next.js，与现有 Vite 工程冲突） |
| ORM | **Prisma 7** | 迁移工具成熟、`prisma studio` 可视化、错误信息友好 —— 对**学习型单人项目**价值最高；Prisma 7 已无 Rust 包袱 | Drizzle 作为备选（更轻、更 SQL 原生）；若后续确定要上 edge 再评估 |
| 数据库 | **PostgreSQL 16** | 2核4G 完全够用（PG 常驻约 150MB）；工程化标准；与 Prisma / Better Auth 配合最成熟 | SQLite 更省资源，但迁移/并发/后续扩展受限，不予采用 |
| 反向代理 | **Caddy** | 自动 HTTPS，配置极简，无需 certbot 运维 | Nginx 更可控但需手工维护证书 |
| 进程守护 | **systemd** | 原生、无额外依赖、日志统一进 journald，符合"工程化"目标 | PM2 也可（更省事、有 cluster 模式），但 2 核机器单实例足够 |
| Node | **22 LTS** | 现行 Active LTS，支持到 2027-04 | v18 已 EOL，禁用 |
| 备份 | `pg_dump` + cron → **阿里云 OSS** | 异地备份；**OSS 属公共云产品，可用 300 元券抵扣** | 只放本机 = 等于没备份 |

### 明确否决的方案

- **PocketBase**（61k stars，单文件后端）：对"最快跑通"极优，但它是**配置驱动的 BaaS**，与"高工程化体系"的学习目标相悖，且会绕开 Prisma/Better Auth 这套主流技术栈。**记录为可选快车道，不采用**。
- **Supabase self-host**：功能全但需多容器，2核4G 吃紧，且引入 vendor 心智负担。
- **自研鉴权**：违反行业共识，安全风险高。

---

## 四、目标架构

```
                    浏览器（Vite + React SPA）
                            │  HTTPS
                            ▼
                  ┌──────────────────┐
                  │   Caddy :443     │  自动 TLS
                  └────────┬─────────┘
              /api/*       │        /*（静态资源）
                  ┌────────┘        └────────────┐
                  ▼                              ▼
        ┌───────────────────┐          ┌──────────────────┐
        │ Fastify 127.0.0.1 │          │  dist/ 静态文件   │
        │  :3000            │          │  (前端构建产物)   │
        └─────────┬─────────┘          └──────────────────┘
                  │
      ┌───────────┴────────────┐
      ▼                        ▼
┌───────────────┐      ┌──────────────┐
│ Better Auth   │      │  业务 API     │
│ /api/auth/*   │      │ 收藏 / 练习   │
└───────┬───────┘      └──────┬───────┘
        └────────┬────────────┘
                 ▼
        ┌──────────────────┐        ┌─────────────────┐
        │ Prisma 7         │───────▶│ PostgreSQL 16   │
        └──────────────────┘        │ 127.0.0.1:5432  │
                                    └─────────────────┘
```

**关键设计原则**

1. **后端可选，不是必需** —— 未登录用户拥有与现在**完全相同**的功能；后端宕机时站点降级为纯本地模式，**不白屏**。
2. **前端不动骨架** —— 不迁移到 Next.js，现有 644 路由与 23 个审计脚本全部继续可用。
3. **数据不回退** —— `localStorage` 依然是第一数据源（离线可用），云端是"登录后的增强"。

---

## 五、数据模型

**Better Auth 自带表**（由库的迁移生成，不手写）：

| 表 | 用途 |
| --- | --- |
| `user` | 用户主体（id / email / name / emailVerified / image / timestamps） |
| `session` | 会话（token / expiresAt / ipAddress / userAgent） |
| `account` | 第三方登录凭据（provider / providerAccountId） |
| `verification` | 邮箱验证、魔法链接等临时令牌 |

**业务表**（我们设计的）：

```prisma
// 收藏：一个用户对一个术语
model UserFavorite {
  userId    String
  termId    String   // 术语 id，如 "button"、"circuit-breaker"
  createdAt DateTime @default(now())

  @@id([userId, termId])          // 复合主键，天然去重
  @@index([userId])
}

// 练习记录
model PracticeRecord {
  id        String   @id @default(cuid())
  userId    String
  termId    String
  correct   Boolean
  createdAt DateTime @default(now())

  @@index([userId, createdAt])    // 支撑"最近 N 条"查询
}
```

**刻意不做的事**：
- 不给收藏加自增主键 —— `(userId, termId)` 复合主键天然防止重复收藏
- 不做软删除 —— 收藏是 bool 语义，取消即物理删除
- 练习记录暂不做聚合统计（先跑通链路，统计是 P3 的事）

---

## 六、API 契约

**Better Auth 内置**（不用自己写）：

```
POST /api/auth/sign-up/email
POST /api/auth/sign-in/email
POST /api/auth/sign-out
GET  /api/auth/get-session
```

**业务 API**（我们实现）：

| 方法 | 路径 | 说明 | 鉴权 |
| --- | --- | --- | --- |
| `GET` | `/api/health` | 健康检查（返回 db 连通性 + 版本） | 否 |
| `GET` | `/api/favorites` | 返回 `string[]`（术语 id 列表） | 是 |
| `PUT` | `/api/favorites` | **全量覆盖**收藏列表，幂等 | 是 |
| `GET` | `/api/practice/recent` | 最近 12 条练习记录 | 是 |
| `POST` | `/api/practice/record` | 记录一次答题 `{termId, correct}` | 是 |

**为什么收藏用全量覆盖（PUT）而不是增删（POST/DELETE）**：
收藏的自然操作单位是"我现在的收藏集合"，全量覆盖语义最简单、幂等、便于重试，且前端无需做差量计算。数据量上限 354，一次传输 < 2KB，完全无压力。

**统一错误格式**：`{ "error": { "code": "...", "message": "..." } }`

---

## 七、前端改造方案（最小侵入）

| 改动 | 内容 |
| --- | --- |
| 新增 `src/api/client.js` | fetch 封装：统一 base URL、`credentials: 'include'`、错误归一化、超时与重试 |
| 新增 `src/api/auth.js` | 登录/注册/登出/取会话（基于 Better Auth client） |
| 新增登录 UI | Header 增加登录入口 + 简单弹窗（复用现有 modal 样式，不引入 UI 库） |
| 收藏逻辑改造 | **双写**：始终写 `localStorage`；已登录时同步 `PUT /api/favorites`。登录瞬间做一次合并（本地 ∪ 云端） |
| 练习记录改造 | 同上：本地 `vibehub.practice.recent.v1` 保留，登录后上报 |
| 降级保护 | 所有 API 调用失败都静默回退本地模式，控制台告警但不弹错误 |

**不做的事**：不引入 Redux/Zustand（现有 `useState` + props 足够）、不改路由体系、不重写任何已通过的页面。

---

## 八、部署与运维方案

**服务器**：阿里云香港轻量应用服务器，2核4G，Ubuntu 22.04，系统镜像（非应用镜像）

**初始化清单**：
```bash
# 1. 基础
apt update && apt upgrade -y
adduser deploy && usermod -aG sudo deploy     # 非 root 运行
# 2. Node 22 LTS
curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && apt install -y nodejs
# 3. PostgreSQL 16 + Caddy
apt install -y postgresql caddy
# 4. 防火墙：只放 22/80/443
ufw default deny incoming && ufw allow 22,80,443/tcp && ufw enable
# 5. 防暴力破解
apt install -y fail2ban
```

**服务定义**（`/etc/systemd/system/vibehub-api.service`）：
```ini
[Unit]
Description=VibeHub API
After=network.target postgresql.service
[Service]
Type=simple
User=deploy
WorkingDirectory=/srv/vibehub/server
ExecStart=/usr/bin/node dist/index.js
Restart=on-failure
RestartSec=5
EnvironmentFile=/srv/vibehub/server/.env
[Install]
WantedBy=multi-user.target
```

**Caddy 配置**（`/etc/caddy/Caddyfile`，注意 `/api/*` 必须先于 catch-all）：
```
{$DOMAIN} {
    handle /api/* {
        reverse_proxy 127.0.0.1:3000
    }
    handle {
        root * /srv/vibehub/web
        try_files {path} /index.html      # SPA 路由回退
        file_server
    }
    encode gzip
    header {
        X-Content-Type-Options nosniff
        X-Frame-Options DENY
        Strict-Transport-Security max-age=31536000
    }
}
```

**备份**（cron，每日 03:00）：
```bash
pg_dump -Fc vibehub | gzip > /tmp/vibehub-$(date +%F).dump.gz
ossutil cp /tmp/vibehub-*.dump.gz oss://<bucket>/db/    # 异地，券可抵扣
find /tmp -name 'vibehub-*.dump.gz' -mtime +7 -delete   # 本地留 7 天
```
> 验收要求：**实际演练一次恢复**。没恢复过的备份不算备份。

**不做的运维**：不上 Docker（单机单服务，收益不足）、不上 K8s、不搞多环境集群。

---

## 九、分阶段路线图

| 阶段 | 目标 | 产出 | 验收方式 |
| --- | --- | --- | --- |
| **P0** | 本地跑通全链路 | Fastify + Better Auth + Prisma + 数据库，注册/登录/收藏/练习接口全部可用 | ✅ **已完成**：18 个接口用例全绿（本地先用 SQLite，部署切 PostgreSQL） |
| **P1** | 前端接入 | 登录 UI、收藏双写、练习记录同步、降级保护 | 现有 23 个测试脚本不回归 + 新增同步用例 |
| **P2** | 部署上线 | 香港服务器环境 + Caddy HTTPS + systemd + 备份任务 | 公网可访问、HTTPS 有效、重启自恢复、备份可恢复 |
| **P3** | 工程化完善 | CI/CD（Actions + SSH）、监控告警、迁移脚本化、包体积拆分 | 推送即部署；主包体积下降 |
| **P4** | 能力扩展（按需） | 术语投稿、管理后台、数据统计 | 按需定义 |

**P0 之前必须先解决的技术债**：主 JS 已达 **2159KB**（本会话新增两份数据文件所致），`termAnatomy` / `termAliases` 应按术语 id 动态加载。**这件事不能拖到 P3**，否则每加一份数据都在恶化首屏。

### ✅ 已完成（2026-09-17 19:50）

**结果：主 JS 2159.43 kB → 1024.88 kB（-51%），gzip 625.77 → 327.87 kB**

拆分策略不是"整个文件动态加载"，而是**先按用途做字段级拆分**：

| 产物 | 体积 | 加载方式 | 依据 |
| --- | --- | --- | --- |
| `termBasics.js` | 89.2 KB | **静态**（首屏必需） | `TermCard` 只用 `title` + `quote` |
| `termDetails.js` | 866.3 KB | **动态**（进详情页才加载） | tagline/prompt/options/demoText 等 92% 的字段只有详情页用 |
| `termAnatomy.js` | 277.9 KB | **动态** | 只有 Button 等少数详情页用 |

关键数据（实测字段体积）：`referenceDetails` 共 860.8 KB，其中**卡片必需的 `title` + `quote` 只占 68.7 KB（8%）**，剩下 792.2 KB（92%）是详情页专属。所以拆分的正确切法是按字段，而不是按文件。

实现要点：
- `src/dataLoader.js` 统一管理动态加载（缓存 Promise，失败可重试）
- `TermDetailsGate` 门组件在详情路由外层等待数据就绪（**必须放在组件外**，否则违反 Hooks 规则——`DetailPage` 第一行就调用了 `localizeTerm`）
- App 挂载后延迟 1.2s **后台预取**，用户从首页进详情页时通常已就绪、看不到加载态
- `referenceFor` 改为 `basics` 同步 + `details` 按需合并，未加载时优雅降级为 basics

踩到的两个坑（已修，值得记录）：
1. **`ChangelogPage` 里有 2 处裸 `referenceDetails` 引用**（不是 `term.referenceDetails` 属性），替换 import 后直接 `ReferenceError` 导致页面崩溃。修法：它只用 `title` 字段 → 改用 `termBasics`。
2. **`test:terms` 脚本 `goto` 后立即查询**，不等异步 chunk → 644 条全部报"h1 为空"。修法：脚本加 `waitForSelector('h1')` + 等待 `.detail-gate` 消失。

**复验（全部通过）**：`test:terms` 644 / `test:e2e` 23 / `test:catalog` 16 / `audit:page-parity` 25 / `audit:topic-parity` 16 / `build`。

---

## 十、风险与回退

| 风险 | 影响 | 应对 |
| --- | --- | --- |
| 香港轻量是 `BGP_NCO` 线路（官方称"仅适用于不需要对中国大陆用户提供服务"） | 国内访问晚高峰可能波动 | 已知并接受；若不可接受则换 CN2 线路（用不了阿里云券） |
| 300 元券"部分产品仅可抵扣 1 次" | 按月续费可能导致后续全价 | **一次性买够时长**，不按月续 |
| 券只够 3-7 个月 | 到期后需自付 | 提前评估续费成本；数据可随时导出迁移 |
| 单机无高可用 | 宕机即全站不可用 | 每日异地备份 + 定期快照；站点设计为"后端挂了仍可离线用" |
| 未备案 | 香港节点免备案 ✅ | 若未来迁大陆节点，需预留 2-3 周备案期 |
| 单人维护 | 认知负担 | 全部配置写入 `docs/deployment-checklist.md`，形成可执行 runbook |

**回退方案**：后端整体移除不影响站点可用 —— 前端所有 API 调用都是可选增强，最坏情况等于回到当前的纯静态形态。

---

## 十·五、成本与购买要点（补充实测数据）

> 本节由第二轮独立调研补充，用于修正"券能买什么"的常见误解。

### 券的适用边界（阿里云「云工开物」高校计划）

- 300 元无门槛抵扣金；需完成 **实名认证 + 学生认证**；有效期 1 年，到期未用作废
- **可以买**：ECS 云服务器、轻量应用服务器、OSS 对象存储、RDS、函数计算、CDN、百炼等**公共云产品**
- **不能买**：**域名**、虚拟主机、云市场三方商品
- **⚠️ 易踩坑**：那个「99 元/年 ECS 学生机」**不能用这张券抵扣**（很多人误以为能白嫖）
- **⚠️ 额度限制**：部分产品「**仅可使用代金券抵扣 1 次**，不与其他优惠叠加」→ 这是**必须一次性买够时长**的硬理由，按月续费很可能只有第一单能用券

### 香港轻量参考价（2026-09 实测，下单以页面为准）

| 配置 | 月付参考 |
| --- | --- |
| 2核 1G / 30G ESSD | 约 28 元 |
| 2核 2G / 40G ESSD | 约 39-58 元 |
| **2核 4G / 50G ESSD** | **约 78-88 元** |

本方案选 **2核4G**（PostgreSQL 常驻约 150MB，2G 会紧张）→ 300 元券约覆盖 **3-4 个月**。

### 域名是 HTTPS 的硬前置条件

- Let's Encrypt / Caddy 自动证书**必须绑定域名**，**IP 直连无法签发**
- 域名**不能用券购买**（约 30-60 元/年，需另付）
- 香港节点使用域名**无需备案**
- 不买域名的后果：只能 `http://IP` 访问 → 浏览器标记"不安全"，且**会话 cookie 在无 HTTPS 环境下会降级**（登录态可靠性受影响）

---

## 十·六、P0 实现记录（2026-09-17 完成）

代码在 `server/`，与前端完全隔离 —— 前端构建与测试未受任何影响。

### 落地结果

| 项 | 实际 |
| --- | --- |
| 依赖 | fastify 5.12.5 / better-auth 1.7.5 / prisma 6.19.3 / @fastify/cookie 11.1.2 / @fastify/cors 11.3.0 |
| 数据库 | 本地 **SQLite**（`prisma/dev.db`），生产切 PostgreSQL |
| 接口 | 认证 4 个（Better Auth 提供）+ 健康检查 + 收藏 2 个 + 练习 2 个 |
| 测试 | `server/test/api.test.js` **18 个用例全绿** |

### 关键设计

- **登录可选**：未登录时站点行为与纯静态版完全一致；后端不可用不影响浏览
- **收藏用全量覆盖（PUT）**：幂等、便于重试、前端无需算差量；上限 354 术语，请求体 < 2KB
- **只做增量写入**：全量覆盖语义下仍只增删差异项，保留已有收藏的 `createdAt`
- **练习记录只追加**：同步语义是"取最近 12 条"（与原站 `vibehub.practice.recent.v1` 一致），因此不存在并发冲突
- 统一响应形状 `{ok,data}` / `{error:{code,message}}`；Fastify JSON Schema 做入参校验
- Node 只绑 `127.0.0.1`，公网入口交给反向代理；`app.addHook('onClose')` 优雅关闭数据库连接

### 与规划的两处偏离（均有理由）

1. **数据库用 SQLite 而非 PostgreSQL**：本机无 PostgreSQL，Docker Desktop 守护进程也未运行。schema 刻意避开 PG 专有类型（不用 enum/数组/Json），部署时改 provider 一行 + 重建迁移即可。
2. **`useSecureCookies: false`**：当前是 `http://<IP>`（无域名无 HTTPS），开启 secure cookie 会导致浏览器拒写、登录态失效。

### 踩到的两个坑（记录备查）

1. **Better Auth 的 CSRF 保护要求写请求带 `Origin` 头**
   - node fetch 不带 → `403 MISSING_OR_NULL_ORIGIN`
   - 而 curl 恰好被放行，导致最初用 curl 测试时完全没暴露这个问题
   - 修法：测试脚本显式发送 `Origin`（即 trustedOrigins 中登记的前端地址）
   - **对 P1 的影响**：前端经 Vite 代理或同源部署时 Origin 自然正确，但任何服务端直连调用都要注意

2. **Fastify 的 `setErrorHandler` 必须注册在 `register(路由)` 之前**
   - 放在之后会导致 schema 校验错误**不走自定义处理器**，返回 Fastify 原生格式 `{statusCode, code:"FST_ERR_VALIDATION"}`，与统一错误格式不一致
   - 修法：移到 register 之前，并额外兼容 `error.code === 'FST_ERR_VALIDATION'`

### 尚未做（属 P1/P2）

- 前端尚未有任何调用后端的代码（P1）
- 无部署脚本 / systemd 单元 / Caddyfile（P2）
- 邮箱验证、OAuth、速率限制均未启用（按当前决策）

---

## 十一、待你确认的项（阻塞 P2）

### 已决策（2026-09-17 17:35）

| 项 | 决定 | 影响 |
| --- | --- | --- |
| 域名 | **暂不买，先用 IP 访问** | 无 HTTPS；见下方 ⚠️ 冲突 |
| 登录方式 | **先只做邮箱密码**；GitHub OAuth 推迟到有域名后再启用 | P0/P1 无 OAuth 依赖，部署不被裸 IP 限制卡住 |
| 站点名称与品牌 | **先不管，后面统一换** | 技术链路先按 VibeHub 复刻外观跑通 |
| 下一步 | **先还技术债（主包瘦身）** | ✅ 已完成，见第九节 |

### ⚠️ 已识别的冲突：GitHub OAuth × 无域名

**GitHub OAuth App 的 Authorization callback URL 只接受域名或 `localhost`，不接受裸 IP。**

后果：
- **本地开发阶段**（`http://localhost:5173` / `127.0.0.1`）→ 可正常配置与调试 ✅
- **部署到 `http://<香港IP>` 后** → OAuth 回调无法登记，GitHub 登录**会失效** ❌

可选解法（需你选）：
1. 部署前补一个便宜域名（约 30-60 元/年，券不可用）→ 一劳永逸
2. 上线时**先只开邮箱登录**，GitHub OAuth 留到有域名后再启用
3. 用 `nip.io` / `sslip.io` 这类通配 DNS（把 IP 映射成 `x.x.x.x.nip.io`）——能用但是第三方服务，稳定性不保证

> **✅ 已决策：采用解法 2**（2026-09-17）
>
> 即：**P0/P1 阶段只实现邮箱密码认证，不接 OAuth**。GitHub OAuth 的接入位置预留（Better Auth 的 `socialProviders` 配置项留空），等拿到域名后再补 —— 届时只需填 Client ID/Secret + 回调地址，**不需要重构认证逻辑**。
>
> 由此产生的实施约束：
> - P0 认证范围收窄为 `emailAndPassword`，**不再需要你去创建 GitHub OAuth App**
> - 部署验收不含 OAuth 路径；`docs/deployment-checklist.md` 中相关项标记为"延后"
> - 邮箱验证（`emailVerification`）先关闭 —— 服务器未配 SMTP 时会导致注册流程走不通；后续接入邮件服务再开

### 仍未决（P2 前需要）

- 站点名称与自有品牌（推迟中，但部署前必须定）
- 是否替换 Logo / favicon
- 服务器配置最终定 2核4G（按本方案需跑 PostgreSQL）
- **购买执行**：需你本人下单（券记名在你账号，我无法代操作）

---

## 附：调研来源

- Node 框架对比：oflight.co.jp、snipshift.dev、stacknotice.com、saaslens.app（2026）
- 鉴权：starterpick.com（Auth.js vs Lucia vs Better Auth 2026）、rizz.dev（Node Auth 2026）、dev.to（Auth 2026）
- ORM：techsy.io（Prisma 7 架构变更）、toolchew.com、ecosire.com、turbostarter.dev（2026）
- Better Auth + Fastify 集成：better-auth.com/docs/integrations/fastify（官方文档）
- 部署运维：moscocrm.com（Self-Managed VPS Guide 2026）、techglean.com、cloudminister.com、dev.to（Deploying Node.js 2026）
- 阿里云券：help.aliyun.com（云工开物高校计划、学生权益指南）、developer.aliyun.com
- 备案：help.aliyun.com（备案服务器检查、备案 FAQ）
