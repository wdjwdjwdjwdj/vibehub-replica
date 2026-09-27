# 铺量台账（v5 标准）

> 目标：355 条按 v5 原站声音手册升级 q/a/say 三槽位。未升级词条零变化（verify-rollout.mjs 核验）。

## Batch 1 + 2（2026-09-27，已注入 ✅ 20/355）

| # | 词条 | 分类 | 级别 |
|---|---|---|---|
| 1 | HTML | 开始做网页 | 入门 |
| 2 | CSS | 开始做网页 | 入门 |
| 3 | JavaScript | 开始做网页 | 入门 |
| 4 | DOM | 开始做网页 | 进阶 |
| 5 | 组件 | 开始做网页 | 入门 |
| 6 | 状态 | 交互与体验 | 入门 |
| 7 | API | 数据与后端 | 入门 |
| 8 | 请求 | 数据与后端 | 入门 |
| 9 | Token | 数据与后端 | 进阶 |
| 10 | 缓存 | 数据与后端 | 进阶 |
| 11 | Prompt | AI 协作 | 入门 |
| 12 | MCP | AI 协作 | 进阶 |
| 13 | 上下文窗口 | AI 协作 | 进阶 |
| 14 | Git | 开发工具 | 入门 |
| 15 | 环境变量 | 开发工具 | 进阶 |
| 16 | 部署 | 上线与安全 | 入门 |
| 17 | HTTPS | 上线与安全 | 入门 |
| 18 | HTTP | 网络与接口 | 入门 |
| 19 | 状态码 | 网络与接口 | 入门 |
| 20 | Cookie | 网络与接口 | 入门 |

覆盖 10 个分类；入门 14 / 进阶 6。全部通过 validate.mjs 门禁（scene 12–24 字、explain/say 40–80 字、facts ≥2 官方锚点、禁词含类比词）。

## Batch 3 + 4（2026-09-27，已注入 ✅ 34/355 —— 全站铺量启动）

- **表单实战 22 条（Batch 3，全类完成）**：锚样 10 条（text-input、textarea、number-stepper、radio、checkbox、switch、range-slider、date-picker、file-upload、autocomplete）+ 委托 12 条（cascade-select、inline-validation、password-input、captcha-input、search-input、multi-step-form、email-input、phone-input、required-optional、disabled-button、form-reset、address-form）
- **官网区块实战 12 条（Batch 4，全类完成）**：hero-section、top-nav、cta-section、testimonials、pricing-table、footer-faq、logo-wall、feature-highlights、how-it-works、case-showcase、footer-nav、trust-section
- 生产方式：亲写锚样 10 条 → 双子代理按 BATCH-BRIEF.md 并行生产 24 条（quiz 分布均分、facts 全部 WebFetch 实测）→ 人工审核通过 → 注入核验。

## 剩余 301 条（15 个待做分类 + 12 个小类）

按 BATCH-BRIEF.md 流程逐批推进（每批一个分类文件，双子代理并行 + 锚样 + 人工审核）。队列：

| 批次 | 分类 | 条数 | 备注 |
|---|---|---|---|
| 5 | 弹窗与提示（20-弹窗与提示.json） | 20 | 组件交互类，facts 走 MDN |
| 6 | 内容展示（21-内容展示.json） | 26 | 最大批，可拆两轮 |
| 7 | AI 协作（06）+ AI 协作方法论（26） | 31 | sources 走各家官方 docs，注意区域拦截的标待抽查 |
| 8 | 导航实战（22）+ 页面布局（23） | 24 | |
| 9 | 外观样式（24）+ 动画实战（25） | 24 | |
| 10 | 布局与视觉（02）+ 设计（16） | 18 | |
| 11 | 交互与体验（03）+ 性能与无障碍（13） | 24 | 无障碍类 facts 走 W3C WAI |
| 12 | JavaScript 语言（10）+ 现代前端（11） | 24 | |
| 13 | 开发工具（07）+ 测试与排错（08） | 23 | |
| 14 | 排错急救（27） | 16 | **保留「先查三处」系列模板**（STYLE-GUIDE 五） |
| 15 | 数据与后端（05）+ 网络与接口（15） | 18 | |
| 16 | 上线与安全（09）+ 部署上线（17） | 16 | |
| 17 | 导航与结构（04）+ 产品与设计（12）+ 团队与项目（14）+ 开始做网页（01） | 37 | 收尾批，可拆 |

## 工具链

- `node content-system/batch-worklist.mjs` — 重新生成剩余词条分类清单（每批完成后重跑，worklist 会自动缩小）
- `node content-system/validate.mjs` — 门禁（不过不入库）
- `node content-system/apply-to-main-site.mjs` — 注入 → main-site-upgraded/index.html（用户手动部署 Cloudflare）
- `node content-system/verify-rollout.mjs` — 核验改动范围与未动词条零变化
- `node content-system/ab-preview.mjs` — 原站 vs 新版并排预览
