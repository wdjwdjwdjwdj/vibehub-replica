# 页面清单

状态约定：`已实现` 表示本地代码已有对应页面；`已验证` 表示 smoke/e2e 或截图验证已经覆盖；`未完成` 表示仍有原站差异或外部步骤未完成。

| 页面/路由 | 已实现 | 已验证 | 备注 |
| --- | --- | --- | --- |
| `/`、`/en` 术语目录 | 是 | 是 | `/` 默认中文（8 个主题、354 个术语，中文分类/分组/术语说明），`/en` 保留英文入口；两者均支持搜索、收藏；首页当前使用原站 `catalog-directory-page` 结构，1440×900 主高度 18293px 与原站一致；`probe-catalog-home-interactions.mjs` 覆盖问卷、分类跳转、收藏和首卡详情导航 |
| `/topics/frontend` 等 8 个主题页（含原站 `/topics/technology` 别名） | 是 | 部分 | 已切换为原站目录表面：分类条、左侧分组、三列/Website Sections 两列 Demo 卡片；Testing/Git/Design 按原站隐藏左栏并使用全宽网格；搜索、收藏和调查弹层可用。已按原站真实 DOM 结构重建实际有预览的卡片：Frontend 6、Backend 9、AI 7（AI 应用基础/AI 幻觉/Vibe Coding/多模态/RAG/Fine-tuning/推理模型）、Product 8（用户故事/用例/用户流程/用户旅程/Persona/PRD/产品探索/MVP）、Testing 6、Tech Stack 6、Design 8、Git 6；原站其余卡片的 `.card-demo` 为空，本地不再渲染通用占位块。`npm run audit:topic-parity` 已通过 16 个中英文入口，`npm run test:catalog` 覆盖上述结构；本批已把详情页 H1 改为原站的「中文名 + `<span>英文名</span>`」双元素结构（4 处 H1、9 处面包屑，中英同名术语自动退回整串），面包屑末尾也改为中文名；变体区改为原站的中英文双元素名并补齐说明文案；场景区按原站语言差异渲染（中文 2 个 / 英文 4 个）；Anatomy 改用原站 `parts` 数据（167 术语 / 629 parts，落在 `src/termAnatomy.js`）并补 `data-ap` 与 `.pe` 结构；新增 `.alias-row`「也常被叫作」区块（数据来自原站 chunk，224 术语 / 677 别名，落在 `src/termAliases.js`，中文页显示全部、英文页只显示纯 ASCII 别名且无标签）；描述分隔符由 ` · ` 改为原站的 `·`。`/button` 文案一致率 56.1% → 71.4%；本批已按原站实测对齐 16 个中英文主题页 `<title>`（含 `/topics/frontend` 与 `/en/topics/frontend` 沿用首页标题这两个特例，`npm run audit:copy` 之外的 `scripts/probe-topic-titles.mjs` 可复跑校验，现已 16/16 一致）；仍需补逐主题截图对比及其余卡片空白高度/壳层视觉细节 |
| `/:term`、`/en/:term` 354 个术语详情页 | 是 | 部分 | 共用详情模板，已接入逐条抓取文案，按术语 ID 分配真实可操作 Demo；Git Story 与 Card、Tag、布局、Typography、URL、Domain 等 dh-demo 家族已补为独立 HTML/CSS/React 视图；Button 已补齐四个典型场景和专属正文结构，Git 已补齐用法/组成/历史视图，Upload 已补齐原站式上传区、Quick Check、用法/禁用场景、Anatomy、Variants 和四个场景卡；Input、Modal、Card、Markdown 已补齐原站式用法/禁用场景、Anatomy、Variants 和四个场景卡；HTML、DNS、Typography、Terminal 已补齐源站式教学区块、变体和四个场景卡，四页桌面及 390px 移动端区块已通过专项几何审计；API、Project Rules 已补齐源站式教学区块，AI Agent 已改为独立源站形状页面，含六阶段工作循环、工具轨迹、证据状态、Quick Check/Agent prompt、Learn next 和决策表，并通过桌面关键几何、390px 溢出和 E2E 验证；Button/Git/Upload/Input/Modal/Card/Markdown/HTML/DNS/Typography/Terminal/API/AI Agent/Project Rules 的阅读顺序已有 DOM 截图与 E2E 验证，字体与图标已接入；中文详情页的全局标签（面包屑/复制按钮/引用区/判题标题与副标题/区分区/场景区/延伸阅读/结构区/变体区/Agent prompt）已对齐原站当前中文值，`/button` 文案一致率 42.9% → 55.1%；但仍有**结构层**差异：原站 H1 把中英文名分属两个元素（`<h1>按钮<span>Button</span></h1>`）且带 `.alias-row` 别名区块，本地为纯文本且无该区块，变体名仍是旧值，需模板级重建；Demo 内部视觉和原站专属教学细节仍未全部补齐 |
| `/practice`、`/en/practice` | 是 | 是 | 接入原站 `lessonPractice` 的 328 条双语判断题；随机选题、12 条最近题目记录、9 个方向筛选、正确/错误反馈、答对后嵌入完整术语指南和下一题；1440×900 split-screen 主内容、744px 锁定面板和页脚起点已与原站几何对齐；仅最近题目按原站 key 持久化，答案/得分/方向为当前会话状态；题库按路由动态加载 |
| `/anti-ai-flavor` | 是 | 是 | 中文默认入口已按原站当前 25 条目录实现（中文口癖 11、页面模板感 8、不好用的交互 6），卡片标题、引用、示例均已中文化；`/en/anti-ai-flavor` 保留原站 18 条英文结构；分类锚点、三列卡片和原生 HTML/CSS 预览可用，字体、图标和预览内部细节仍有差异 |
| `/vibehub-skill` | 是 | 是 | 原站 Skill 首屏结构、Agent 对话预览、Tooltip、安装指令复制、重写复制、两段全宽功能面板和主动提示双卡；本批清理源站不存在的功能区底边框后，1440×1000 主内容高度约 2337px，与原站 2337.1px 对齐，hero/install/rewrite 的位置误差 ≤0.1px；插画、共享 Header/Footer 和字体抗锯齿仍有像素差异 |
| `/vibehub-skill/lab`、`/en/vibehub-skill/lab` | 是 | 是 | 原站 robots 禁止抓取但实际可访问；已按真实页面补齐四步组合互动练习 |
| `/changelog`、`/en/changelog` | 是 | 是 | 已按原站时间线、月份定位、All/Updates/New Terms 筛选、milestone summary、版本徽章和新增词汇展开交互实现并截图复核；移动端无横向溢出 |
| `/courses`、`/en/courses`、`/courses/git-workflow`、6 个 Git 章节、`/courses/product-website`、9 个产品官网章节 | 是 | 是 | `test:courses` 已覆盖双语总览与全部章节；产品官网和 Git 课程首页均使用原站 940px 固定滚动壳层与卡片列表，Git 章节卡新增 6 个原生 HTML/CSS 工作流视觉，390px 移动端总览也按原站固定容器、116px 卡片和隐藏视觉对齐；正文/图示按原站抓取并用本地 HTML/CSS 重建；首章正文 4 个源站术语引用可打开右侧详情面板，细部内容仍有差异 |
| 原站 sitemap 741 个 URL | 是 | 是 | `audit:original:sitemap` 已核对原站 741 个唯一 URL，其中 708 条为 354 个双语详情入口，33 条为特殊页面；本地另补充英文课程、英文 Changelog、Git 课程双语章节、Skill Lab 和 frontend 主题别名 |
| 全站字体与图标（P0） | 是 | 已验证 | `public/fonts/` 三个 woff2 已接入：`@font-face` Manrope Variable（latin / latin-ext，200–800 可变）与 tabler-icons；Header `.vh-logo` 双层字标、`.vh-word-brand`/`.vh-word-tagline`、`.footer-wordmark`、`.nav-skill-link` 使用 Manrope；18 个 tabler 图标码点已定义并应用于 Footer 社交图标、链接箭头与调查弹层关闭键；浏览器窗口灯为原站红/黄/绿 8×8。本地实测值与原站一致（`.vh-logo` 93×34、brand 宽 62.3、tagline 宽 134.7、wordmark 310×90）。`npm run audit:copy` 反映文案仍有差异，字体接入不等于一比一 |
| 自有品牌版本 | 部分 | 未完成 | 已准备运行时与静态 HTML 共用的基础品牌配置，以及 `VITE_SITE_INDEPENDENT` 和可选 Footer 合作方/社交链接配置；默认保持原站基线，实际品牌名、Logo、favicon、社交链接和站点名称仍等待确认 |
| 公网部署 | 未完成 | 未完成 | 等待确认部署平台、账号归属和域名/站点名 |


---

## 盘点更新（2026-09-21 第二轮 · 桌面 1440×900）

按原站实时 sitemap（741 条 URL）与上表逐类核对，当前状态如下。约定：**已实现**=本地有对应页面/交互；**已验证**=有可复跑的原站/本地同状态证据；**未完成**=仍有原站差异或外部步骤未完成。

| 页面/路由 | 已实现 | 已验证 | 未完成 | 备注 |
| --- | --- | --- | --- | --- |
| `/en/html`（本轮验收入口） | 是 | **是（12/12 区块 Δy=0 Δh=0，mismatchRatio ≤0.733%，文案 100%，20 项交互 MATCH，7 个交互状态截图 PASS）** | 否 | `docs/replication-status-2026-09-21-round2.md` |
| `/`、`/en` 术语目录 | 是 | 部分 | 是 | `audit:topic-parity` 16/16 几何通过；4 张卡片缺 Demo；文案有意译差异 |
| 8 个主题页（含 `/topics/technology` 别名） | 是 | **是（16/16 卡片数、卡片总高、网格模板全部一致）** | 是 | 本轮重采 354 张卡片高度修复；卡片内部 Demo、图标和抗锯齿仍有差异 |
| 354 个双语术语详情入口 | 是 | 部分 | 是 | 代表页 `audit:page-parity` 25/25；32 个新增英文页已升级为 source-shaped 可编辑模板，逐页交互 smoke 32/32；专用 demo 内部视觉仍未逐像素相同 |
| `/practice`、`/en/practice` | 是 | 是 | 是 | 328 题双语判断；随机题目导致逐句文案无法全等 |
| `/anti-ai-flavor` | 是 | 部分 | 是 | 中文 25 条 / 英文 18 条目录可用；预览内部细节有差异 |
| `/vibehub-skill` 与 Lab | 是 | 部分 | 是 | Skill 主体几何已对齐，仍有约 2.862% 像素差异；Lab 主体几何与交互已通过 |
| `/changelog`、`/en/changelog` | 是 | 部分 | 是 | 时间线/筛选/展开可用；条目数已变（23 条），旧测试写死 22 |
| `/courses` 双语总览 + 15 个章节 | 是 | 是 | 是 | `test:courses` 覆盖；细部内容有差异 |
| 全站字体与图标 | 是 | **是（Manrope Variable 与 tabler-icons-subset 均与原站逐字节一致；Header 三处图标改用原站同款 markup）** | 否 | `public/fonts/` 三个 woff2 |
| 全站路由 | 是 | **是（774 条路由全部 200）** | 否 | `node scripts/route-smoke.mjs` |
| 原站 sitemap 对齐 | 是 | **是（741 条，catalogMissing=0、sitemapUnknown=[]）** | 否 | `node scripts/audit-original-sitemap.mjs` |
| 剪贴板/复制行为 | 是 | **是（作答/未作答三种状态均逐字节一致）** | 否 | 本轮补了 Quick check 作答段 |
| `test:catalog`（目录 Demo 结构） | 是 | **是（AI/Product 双语目录、无 iframe/溢出）** | 部分 | 仍可把首六项断言收敛为更稳定的语义化卡片/交互断言 |
| 自有品牌版本 | 部分 | 否 | 是 | 等待品牌名/Logo/favicon/社交链接确认 |
| 公网部署 | 否 | 否 | 是 | 等待平台与账号归属确认 |

汇总：**已实现 14/16 类，已验证（达到本轮验收标准）7/16 类，未完成 9/16 类**。构建 `npm run build:vibehub` 通过；未执行 commit/push/部署。32 个新增英文详情已逐页进入交互 smoke，代表性专用页面的 1440×900 几何差异约 2–8px。

### 本轮追加校正（2026-09-21 · `/en/html` 后续桌面验收）

- `/en/html`、`/en/dns`、`/en/typography`、`/en/terminal` 的桌面 Usage/Anatomy/Variants/Scenes/Selector/References 区块均已通过源站/本地几何审计；DNS、Typography、Terminal 的首个 `dh-demo` 已使用源站同构 DOM。移动端保留原有代码，本轮不新增移动端视觉适配。
- `npm run test:catalog`（5174）和 `npm run test:demos`（5174，644 条双语术语详情）已通过；上一版表格中“4/16 未通过”是旧测试基线，现已过时。

### 32 个新增英文详情（2026-09-21 本轮增量）

`http-status-code`、`stack-trace`、`timeout`、`object-storage`、`primary-key`、`session`、`oauth`、`webhook`、`http-methods`、`ip-address`、`websocket`、`merge-conflict`、`remote-repository`、`reset-revert`、`node-js`、`dependency`、`semantic-versioning`、`rag`、`prompt-injection`、`temperature`、`fine-tuning`、`reasoning-model`、`agent-memory`、`scope-creep`、`technical-debt`、`persona`、`prototype`、`event-tracking`、`regex`、`keyframe`、`prefers-reduced-motion`、`semantic-html` 均已接入本地 `/en/:term`。模板保留 React/CSS 可编辑边界；32 页均有对应 source-shaped 专用 DOM、控制项和状态结论（网络、系统概念、Node/Dependency/SemVer/Stack Trace、Git、AI、Product、Frontend）。逐页入口、截图、高度和交互记录见 `replication-evidence/round-2026-09-21/extra-details/`；仍保留原站字体抗锯齿与个别 demo 内部细节差异，未宣称逐像素全等。

### 目录卡片预览集合修正（2026-09-21 验收后）

`npm run test:catalog` 在复跑中暴露出 4 条路由失败（`/topics/ai`、`/topics/product` 中英各 2 条）。逐项核验实时原站后确认根因是**原站目录预览集合已演进**，本地仍按旧快照分派：

- **AI 主题**：原站现有预览的是前 7 张 —— AI 应用基础、AI 幻觉、Vibe Coding、多模态 AI、**RAG、Fine-tuning、推理模型**；Context Engineering / Token / Context Window 起均为空。本地此前把预览挂在 Context Engineering / Token / Context Window 上，等于多渲染 3 张原站留空的、漏掉 3 张原站有的。
- **Product 主题**：原站现有预览的是前 8 张，比本地多 **Persona**。

修复内容：

- `src/main.jsx`：`AiCardVisual` 新增 `rag` / `fine-tuning` / `reasoning-model` 三个分支（DOM 结构取自原站实时采样）；`ProductCardVisual` 新增 `persona` 分支（原站该卡复用 `ai-card-visual ai-card-persona` 结构）；`MiniVisual` 的 AI / Product 分发表同步改为 `['ai-basics','ai-application-basics','ai-hallucination','vibe-coding','multimodal','multimodal-ai','rag','fine-tuning','reasoning-model']` 与 `['user-story','use-case','user-flow','user-journey','persona','prd','product-discovery','mvp']`。
- `src/styles.css`：新增 `aic-rag-flow`、`aic-ft-paths`、`aic-rm-compare`、`aic-persona-*` 样式（沿用既有 `source-ai-card-preview` / `source-product-card-preview` 的视觉语言）。
- `scripts/catalog-mini-smoke.mjs`：AI / Product 的 `expected` 与 `allExpected` 同步更新为原站当前预览集合（原列表里的 `ai-context`/`ai-token`/`ai-window` 已非前 6 张范畴）。

复验结果（1440×1000，同状态）：AI 前 6 张卡高 382/382/382/367/367/367 与原站逐项一致，demo 尺寸 228/149/228/212/212/212 全部一致；Product 前 6 张卡高 315×5 + 380 一致，新增 persona demo 334x187 与原站完全相等。前 10 张 AI 卡高序列 382/382/382/367/367/367/298/289/289/289 与原站完全相同，无横向溢出。`npm run test:catalog` 16/16 通过；`audit:topic-parity` 16 对、`test:demos` failures=0、`test:terms` 708、`test:routes` 774 均未回归。

**遗留已知差异**：原站无预览的卡仍渲染一个可见的空 `.card-demo`（108px、`#fafafa` 底、`1px #f0f0f2` 边框、圆角 8px），本地按既定决策不渲染该占位盒（影响全部主题而非仅 AI/Product，卡高已一致故视觉差异有限），未在本次范围内改动。
