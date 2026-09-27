# 术语站聚焦化改造技术方案

> 对象：仓库唯一产品线 —— `index.html` + `src/main.jsx` + `public/`（即 `npm run dev`，默认端口 5174）
> 目标：把"复刻完成的全功能站点"裁剪为"仅保留术语界面的小白向术语产品"，并完成图片策略与新 Logo 落地。
> 状态：待评审。本文档只出方案，不含代码实施。
>
> **2026-09-23 更新**：原「起站 · AI 建站入门」产品线已归档到 `archive/qizhan-line-2026-09-23/`，仓库只剩这一条线。原入口 `vibehub.html` 已改名为 `index.html`，`vite.vibehub.config.js` 已并入默认 `vite.config.js`，产物目录统一为 `dist/`。本文档中提及 `vibehub.html` / `dev:vibehub` / `dist-vibehub-qa` 的位置按上述新路径理解。

## 文档信息

| 项 | 内容 |
| --- | --- |
| 方案日期 | 2026-09-21（第三轮） |
| 输入约束 | ① 仅保留术语界面；② 保留 3 张图片（过多则精简为仅第 1 张术语图片）；③ 图片风格不变；④ 重新设计 Logo |
| 关联文档 | `docs/replication-status-2026-09-21-round2.md`（复刻验收）、`docs/page-inventory.md`（页面清单）、`docs/parity-ledger.md` |
| 不影响的范围 | 无第二产品线。原「起站 · AI 建站入门」线已于 2026-09-23 归档至 `archive/qizhan-line-2026-09-23/`，不参与构建 |
| 参考图 | 用户随任务粘贴的 435×174 浅色 UI 局部截图（`pasted-d56f8b7a-…-download.jpg`），判定为术语页局部截图；其中"第 1 张术语图片"按"术语界面呈现顺序的第一张图 = 页头品牌标"口径执行（见 2.3，口径可在评审时校正） |

## 〇、一页速览（供方案对比）

| 对比维度 | 本方案结论 |
| --- | --- |
| 改造对象 | 仓库唯一产品线（`index.html` + `src/main.jsx`）；无第二条线需要回避 |
| 保留界面 | 术语目录首页 `/`+`/en`、8 个主题页、354 个双语术语详情页，合计 **726 条路由** |
| 移除界面 | `/practice`、`/anti-ai-flavor`、`/vibehub-skill`(+`/lab`)、`/changelog`、`/courses/*`（产品官网 + Git 两套课） |
| 横切移除 | 账号云同步（`apiClient`）、全局问卷、页头社区弹层、第三方品牌（oil/GitHub/X/小红书） |
| 横切保留 | 搜索、中/英切换、黑夜模式、主题色盘、本地收藏、自定义光标 |
| 图片策略 | 保留 3 张：新 Logo（替换 `vh-logo.png`）+ `slide-forest.png` + `apple-glass-ribbons.webp`；删除 `oil-favicon.png`；回退条件满足时可精简为仅第 1 张（Logo） |
| 图像风格 | 两张目录卡预览字节级不动；新 Logo 沿用现标"品牌蓝 rgb(49,87,213) + 近黑"双色视觉语言 |
| Logo 交付 | SVG 母版 + PNG 512/192/64/48/32/20 + favicon，20px 可识别、明暗双模 |
| 实现路径 | 原地裁剪（分支 `focus/terms-only`），P0 基线 → P1 路由裁剪 → P2 数据清理 → P3 图片/Logo → P4 品牌页脚 → P5 验证，每阶段独立 commit 可回滚 |
| 包体预期 | 静态图移除约 225KB 源码、`practiceData` 719KB 动态块整块消失，预期解除主包 >500kB 警告 |
| 验收抓手 | route-smoke 774→726 全 200；test:terms 708 / test:demos 644 / test:catalog 16/16；零图片 404；390px 无溢出 |
| 关键风险 | `main.jsx` 单文件裁剪误伤术语分支 → 阶段 commit + 每阶段术语 smoke 全量兜底 |
| 待产品确认 | ① 3 张 vs 1 张图片；② 问卷去留；③ 中英语言开关；④ 正式品牌名；⑤ 被移除路由的外链/sitemap 对外处理 |

---

## 一、调研结论

### 1.1 工程现状

2026-09-23 完成产品线收敛后，仓库只有一条线：

| 线 | 入口 | 公共目录 | 构建配置 | 状态 |
| --- | --- | --- | --- | --- |
| 术语复刻（唯一） | `index.html` → `src/main.jsx` | `public/` | `vite.config.js`（默认，端口 5174，产物 `dist/`） | 复刻已完成，本方案的改造对象 |

已归档：`archive/qizhan-line-2026-09-23/`（原「起站 · AI 建站入门」试用版，含 `launchApp.jsx`、`src/launch/`、`launch-public/`、旧 `vite.config.js`、旧构建产物）。不参与构建、不进包。

复刻完成度（引自 round2 验收报告，均已落盘 `replication-evidence/round-2026-09-21/`）：

- `/en/html` 12 个区块几何 Δy=0、Δh=0，mismatchRatio ≤0.733%，文案逐句一致率 100%；
- 774 条路由全部 200；8 个主题页中英 16/16 卡片数、卡片总高、网格模板一致；代表页 25/25；
- 主 bundle >500kB（Vite 警告，未作为阻塞处理）；`test:legacy` 有 10 条仓库内旧断言失败（非功能回归）。

### 1.2 界面盘点：术语界面 vs 冗余功能

`src/main.jsx:1637` 的 `App()` 是唯一路由分发点。全站界面分两类：

**A. 术语界面（保留）**

| 路由 | 组件 | 内容 |
| --- | --- | --- |
| `/`、`/en` | `CatalogDirectoryPage` | 术语目录首页（8 主题、354 术语、搜索、收藏） |
| `/topics/:id`（8 个主题，含 `/topics/technology` 别名） | `TopicPage`（=`CatalogDirectoryPage`） | 主题术语目录 |
| `/:term`、`/en/:term`（354 个双语详情页） | `TermDetailsGate` → `DetailPage` 及专属页面 | 含 `/html` 一比一复刻页（`sourceHtmlDetail.jsx`）、`api`/`ai-agent`/`project-rules` 源站形态页、32 个 extra 详情页、`button`/`git`/`upload`/`input`/`modal`/`card`/`markdown` 结构化页、`html`/`dns`/`typography`/`terminal` 扩展页 |

**B. 非术语界面（移除）**

| 路由 | 组件 | 数据依赖 | 移除理由 |
| --- | --- | --- | --- |
| `/practice`、`/en/practice` | `PracticePage` | `practiceData.js`（719KB，328 题） | 答题练习对小白无直接用处 |
| `/anti-ai-flavor` | `AntiAiPage` | `antiAiCatalog`（内联于 main.jsx:1458） | 进阶专题 |
| `/vibehub-skill`、`/vibehub-skill/lab` | `SkillPage`、`LearningLabPage` | 内联 | Agent 安装/组合练习，面向已上手用户 |
| `/changelog`、`/en/changelog` | `ChangelogPage` | `changelogData.js`、`changelogItems.js`、`changelogBaseline.js` | 项目动态，非学习内容 |
| `/courses`、`/courses/product-website/*`、`/courses/git-workflow[/*]` | `CourseOverview`、`ProductCourseOverview`、`CourseChapterPage`、`GitCoursePage`、`GitCourseChapterPage` | `courseData.js`（40KB）、`gitCourseData.js`（144KB） | 系统课程，超出小白查术语需求 |

### 1.3 图片资产盘点（对齐约束 2/3/4 的事实基础）

`public/assets/` 现存位图仅 4 张（另有 `public/fonts/` 三个 woff2，非图片）：

| 文件 | 大小 | 角色 | 引用点 | 所属界面 | 处置建议 |
| --- | --- | --- | --- | --- | --- |
| `vh-logo.png` | 49KB | 站点 Logo：页头 20px 品牌标 + favicon + `favicon`/`app-icon`/`logo`/`accessibility` 四个术语的 Demo 素材 | `siteConfig.js:17-18`、`main.jsx:255/787/791` | 术语界面 | **保留（被新 Logo 等量替换）** |
| `slide-forest.png` | 356KB | `style-glass` 目录卡片预览图 | `main.jsx:324`（`DesignCardVisual`） | 术语界面（目录卡） | **保留，字节级不动** |
| `apple-glass-ribbons.webp` | 29KB | `style-apple` 目录卡片预览图 | `main.jsx:321`（`DesignCardVisual`） | 术语界面（目录卡） | **保留，字节级不动** |
| `oil-favicon.png` | 12KB | 第三方合作方 "oil 欧呦" 品牌标（页头 oil-link + 页脚 partner 行） | `siteConfig.js:26`、`main.jsx:255/258` | 横切/第三方 | **随第三方品牌一并移除** |

**结论：术语界面实际只渲染 3 张位图，与"保留 3 张图片"的约束天然吻合**；第 4 张属于原站合作方品牌，不是术语产品资产。

补充核实（避免误判为线上 bug）：`src/termAnatomy.js` 的 `demo`/`demoEn` 字段里有 3 个指向不存在文件的背景图 URL（`/assets/avatar-fox.png`、`/assets/cover-mountain.png`×4、`/assets/cover-workspace.png`×4），`referenceDetails.js`/`termDetails.js` 中各有一处 `cover-template.png` 但只是 Demo 代码示例里的**文本**（文件树清单），不会发起请求。经全仓检索，`termAnatomy` 仅 `.parts` 被消费（`main.jsx:984`），`demo` 字段从未注入 DOM——即**当前不存在线上 404**，属于休眠数据卫生问题，改造时一并清洗（见 3.4）。

### 1.4 模块依赖与共享边界

`src/main.jsx` 顶部静态导入中，仅服务被移除页面的模块：

| 模块 | 大小 | 只服务 |
| --- | --- | --- |
| `courseData.js` | 39.9KB | 课程线 |
| `gitCourseData.js` | 144.4KB | 课程线 |
| `changelogData.js` / `changelogItems.js` / `changelogBaseline.js` | 14.8/12/3.5KB | 更新日志 |
| `surveyBrandMarks.jsx` | 10.1KB | 全局问卷（建议同移除，见 2.2） |
| `apiClient.js` | 2.2KB | 账号/云同步（建议同移除，见 2.2） |

动态导入中：`practiceData.js`（719KB）随练习页整块消失；`quickCheckFeedback.js`（237.8KB）**必须保留**——术语详情页的 QuickCheck 与练习页共用它；`termDetails.js`/`termAnatomy.js`/`referenceDetails.js` 等经 `dataLoader.js` 按需加载，属术语界面核心，保留。

共享边界结论：**课程/日志/练习/问卷/账号五类模块与术语界面无硬耦合**，唯一横跨点是 `QuickCheck`（详情页自带，不依赖练习页）和 `getTermCopy`（详情页与 `PracticeTermGuide` 共用，后者随练习页移除，不影响前者）。

### 1.5 横切功能盘点

| 功能 | 现状 | 对小白术语产品的价值 | 建议 |
| --- | --- | --- | --- |
| 搜索（页头） | 术语搜索 | 高 | 保留 |
| 中/英语言切换 | 354 术语双语是产品固有结构 | 高 | 保留 |
| 黑夜模式 + 主题色盘 | 原站术语界面组成部分 | 中 | 保留 |
| 收藏（localStorage `vibehub:favorites`） | 本地收藏 | 高 | 保留（改纯本地） |
| 账号/云同步 | `useAuth`/`useFavorites` 远端同步/`usePracticeSync` 走 `apiClient`；`Sign in` 入口已在 round2 摘除，但 hook 仍在挂载时请求后端 | 无（免登录产品） | 移除 |
| 全局问卷 `GlobalSurvey` | "你在哪了解到 VibeHub"弹层，出现在术语表面 | 无（增长调研） | 移除（默认决策，见未决问题 2） |
| 社区弹层 + 第三方链接 | 页头 Community（GitHub/术语投稿/Email）、页头 oil-link、页脚 oil/GitHub/X/小红书/Email/术语投稿 | 低（面向贡献者） | 页头移除；页脚最小化（保留投稿/邮箱，走独立品牌配置） |
| 自定义光标 FX | `vibehub.html` 内 DOM + CSS | 装饰 | 保留（零成本） |

### 1.6 测试与验收基础设施

| 脚本/测试 | 当前覆盖 | 裁剪后命运 |
| --- | --- | --- |
| `scripts/route-smoke.mjs` | 774 路由 200 | 更新期望清单 → 726 条 |
| `scripts/term-render-smoke.mjs` | 708 个双语详情渲染 | 保留 |
| `scripts/demo-family-audit.mjs` | 644 条详情 Demo | 保留 |
| `scripts/catalog-mini-smoke.mjs` | 16 组目录 | 保留 |
| `scripts/header-shell-smoke.mjs` | 页头外壳 | 保留，更新导航断言 |
| `scripts/special-detail-geometry-smoke.mjs` | 专属详情几何 | 保留 |
| `scripts/course-render-smoke.mjs`、`course-mobile-smoke.mjs`、`lab-render-smoke.mjs`、`practice-render-smoke.mjs` | 课程/实验室/练习 | 删除 |
| `scripts/audit-anti-ai-parity.mjs`、`audit-changelog-parity.mjs` | 被移除页面对 parity | 删除 |
| `scripts/audit-original-sitemap.mjs` | 原站 741 URL 对齐 | 保留但调整期望（被移除页面标记为"有意不复刻"，见未决问题 5） |
| `scripts/audit-copy-parity.mjs`、`audit-topic-parity.mjs`、`audit-page-parity.mjs`、`compare-html-page.mjs`、`verify-html-*.mjs` | 术语表面 parity | 保留（页面清单剔除被移除页） |
| `tests/vibehub.spec.js` | E2E（已有 10 条旧断言失败） | 删被移除页面用例，术语用例修复保留 |
| `tests/backend-sync.spec.js` | 云同步 | 删除 |
| `tests/launch.spec.js` | 原起站线（已随产品线归档至 `archive/`） | 已移除 |

### 1.7 关键结论

1. 术语界面边界清晰、可整段切除：路由分发集中在 `App()` 一处，被移除页面与术语界面无硬耦合。
2. 术语界面恰好渲染 3 张位图；第 4 张位图是第三方合作方品牌，随品牌独立化一并移除。
3. `vh-logo.png` 一身三任（Logo/favicon/术语 Demo 素材），新 Logo 必须同时满足 20px 页头、favicon、Demo 内 1:1 展示三种规格。
4. 主包 >500kB 的直接原因之一是被移除页面数据的静态导入；裁剪后预期解除（以构建实测为准）。
5. `apiClient`/账号体系在"免登录"定位下是纯负债，移除同时消灭后端依赖与 `backend-sync` 测试。
6. 术语详情页侧栏存在指向 `/practice` 的内部链接（`main.jsx:1435`），页头导航存在 5 个指向被移除页面的链接（`main.jsx:255`）——这是"界面聚焦"必须清零的死链。

---

## 二、调整规划

### 2.1 保留清单（目标产品定义）

- 路由：`/`、`/en`、`/topics/:id`（8 主题中英 16 条）、`/:term` 与 `/en/:term`（354 术语中英 708 条），合计 **726 条**。
- 页面能力：目录卡（含 MiniVisual 预览）、主题分组、术语详情（含全部专属 Demo、Anatomy、Variants、场景、QuickCheck、Agent prompt、收藏、复制 Markdown、发音、上一条/下一条）。
- 横切：搜索、语言切换、黑夜模式、主题色盘、本地收藏、自定义光标。
- 工程：`dataLoader` 按需加载与 1.2s 预取策略不变。

### 2.2 移除清单

| 类别 | 内容 |
| --- | --- |
| 页面 | `PracticePage`、`AntiAiPage`、`SkillPage`、`LearningLabPage`、`ChangelogPage`、`CourseOverview`、`ProductCourseOverview`、`CourseChapterPage`、`GitCoursePage`、`GitCourseChapterPage`、`CourseTermPanel`、`CourseBody`、`CourseInlineVisual`、`PracticeTermGuide`、`antiAiCatalog`、`buildPracticeBank` |
| 账号/云 | `useAuth`、`usePracticeSync`、`useFavorites` 的远端同步分支（保留本地读写）、`AuthDialog`、`apiClient.js`、`App` 中 `accountOpen` 状态 |
| 问卷 | `GlobalSurvey`、`Survey`、`surveyBrandMarks.jsx`、`readSurveySeen`/`markSurveySeen` |
| 导航/页脚 | 页头 5 个被移除页面链接 + Community 弹层 + oil-link；页脚第三方行（oil/GitHub/X/小红书） |
| 数据文件 | `practiceData.js`、`courseData.js`、`gitCourseData.js`、`changelogData.js`、`changelogItems.js`、`changelogBaseline.js` |
| 图片 | `public/assets/oil-favicon.png` |
| 路由回退 | 被移除路径统一渲染站内 `NotFound`（"这个页面不在术语图鉴里"），不做服务端重定向；部署层 sitemap/外链处理见未决问题 5 |

### 2.3 图片策略（约束 2 + 约束 3）

**保留的 3 张（术语界面现存且仅存的 3 张位图）：**

| 序 | 文件 | 角色 | 处置 |
| --- | --- | --- | --- |
| 1 | `vh-logo.png` → 新 Logo | 品牌标：页头 20px、favicon、4 个术语 Demo 素材 | 由新设计等角色替换（见 2.4） |
| 2 | `slide-forest.png` | `style-glass` 目录卡预览 | 原样保留 |
| 3 | `apple-glass-ribbons.webp` | `style-apple` 目录卡预览 | 原样保留 |

**决策规则（3 张 → 1 张的回退触发条件）：**
默认执行"保留 3 张"。同时满足以下两条时才回退为"仅保留第 1 张"：
1. 产品负责人判定目录卡预览对小白非必需；且
2. `style-glass` / `style-apple` 两张卡的预览改纯 CSS 后通过 `test:catalog` 与 `audit:topic-parity`（卡高允许变化，需重采 `catalogCardHeights*`）。

回退后全站位图仅剩新 Logo 一张（favicon 由同一 SVG 出）。该回退不影响任何其他结论，可作为独立补丁执行。

**风格不变（约束 3）的落实：**
- `slide-forest.png`、`apple-glass-ribbons.webp` 不做任何重压缩、重采样、重命名，git 层面保持字节级不动（用 `git diff --stat` 证明零改动）。
- 新 Logo 沿用现标视觉语言（见 2.4 测量值），不属于"改图片风格"，属于换标识。
- `termAnatomy` 休眠字段中的 3 个失效背景图 URL 清洗为等效 CSS（渐变/形状），不新增位图、不改变 Demo 视觉意图。

### 2.4 Logo 重设计（约束 4）

**现状测量**（`public/assets/vh-logo.png`）：512×512 PNG、透明底；不透明像素 1167 色，两个主色 rgb(49,87,213)（蓝，约 50%）与 rgb(38,38,38)（近黑，约 47%）；当前以 20×20 渲染于页头，并在术语 Demo 中大尺寸展示。

**设计简报：**
- 方向：术语图鉴的品牌标——"一张术语卡/一个词条"的图形隐喻，双色（品牌蓝 + 近黑）或单色蓝，透明底。
- 硬约束：20×20 与 16×16 favicon 下可识别；明暗两种模式下都成立（近黑稿需配深色模式反白版）；与 `oil-favicon.png`（已移除）及原站任何资产不构成混淆；不使用原站作者个人标识。
- 交付物：SVG 母版 1 件；PNG 导出 512/192/64/48/32/20 各 1 件；favicon 用 32（或 SVG）；明暗两版。
- 命名与落点：`public/assets/brand-mark.svg`（母版）、`public/assets/brand-mark-512.png` 等；`siteConfig.js` 的 `logoPath`/`faviconPath` 默认值切换；`vibehub.html` 的 favicon 链接同步；页头 `<img>` 尺寸属性与 `alt`/`aria-label` 不变。
- Demo 兼容：`favicon`/`app-icon`/`logo`/`accessibility` 四个术语 Demo 内的 `<img src="/assets/vh-logo.png">` 改为新标路径，Demo 文案（"VibeHub on dark" 等）随品牌名评审结果一并处理。

### 2.5 品牌与第三方内容

- 启用独立品牌模式（`VITE_SITE_INDEPENDENT=true` 或等效默认）：页脚 partner/GitHub/X/小红书行自动清空，只保留"术语投稿 + Email"两项与 wordmark；品牌名沿用工作名 VibeHub，正式名待定（未决问题 4）。
- wordmark 文案随独立品牌配置更新，不再出现 "oil"。

### 2.6 范围外（明确不做）

- 不改术语内容数据（354 术语的文案、Demo、Anatomy 一律不动）。
- 不做 `/en/html` 等已验收页面的视觉回退。
- 不做公网部署（原部署清单已随起站线归档至 `archive/qizhan-line-2026-09-23/docs/deployment-checklist.md`，另行评审）。
- 不做 CSS 全量 purge（`styles.css` 500KB 含被移除页面样式，清理收益低、回归风险高，列为可选后置项，用未使用类名扫描评估后再决定）。

---

## 三、技术实现路径

### 3.1 方案选型

| 方案 | 描述 | 优势 | 劣势 |
| --- | --- | --- | --- |
| **A. 原地裁剪（推荐）** | 在唯一产品线内删除被移除页面的组件、数据、路由分支，`main.jsx` 瘦身 | 与"移除冗余"目标一致；无双份维护；git 历史可完整回滚 | 一次性改动面大，需分批验证 |
| B. 新建聚焦入口 | 仿起站模式新建 `src/terms/` 入口复用术语组件 | 保留全量复刻件作参考 | 术语组件埋在 `main.jsx` 单文件内，复用等于重构；长期双份维护 |

推荐 A，分支隔离执行（建议分支名 `focus/terms-only`），每阶段可独立提交、可回滚。

### 3.2 实施阶段

**P0 基线与分支（0.5 天）**
- 动作：建分支；跑 `npm run build:vibehub`、`node scripts/route-smoke.mjs`、`npm run test:terms`、`npm run test:demos`、`npm run test:catalog` 记录基线；对 `/`、`/topics/frontend`、`/button`、`/html`、`/avatar`、`/backdrop-blur` 截图留证。
- 出口：基线数据与截图落盘 `replication-evidence/focus-round-2026-09-21/baseline/`。

**P1 路由与界面裁剪（2 天）**
- `src/main.jsx`：
  - `App()` 分发只保留：目录首页、主题页、术语详情；其余分支与 `NotFound` 保留为兜底；
  - 删除 P1 组件清单（2.2"页面"行全部）；
  - 页头：删除 Practice/Courses/AI Slop/Updates/Skill 导航项、Community 弹层、oil-link；`termMode`/`courseMode`/`showCourses`/`navEnglish` 逻辑简化为术语模式；`usePageTitle` 的 Skill/Lab 特例映射删除；
  - 详情页侧栏删除"练习这个术语"链接（`main.jsx:1435` 附近）；
  - 删除 `GlobalSurvey` 渲染（`createRoot(...).render(<><App/><GlobalSurvey/></>)` → 仅 `<App/>`）及 Survey 相关 storage 函数；
  - 删除 `useAuth`/`usePracticeSync`/`AuthDialog`/`accountOpen`；`useFavorites` 收敛为纯 localStorage 版（保留 `readStorage`/`vhSafeStorage` 路径）。
- 出口：`npm run build:vibehub` 通过；手工走查 726 条路由中各类页面各 1 条 + 5 条被移除路由显示 NotFound。

**P2 数据与依赖清理（1 天）**
- 删除 `src/practiceData.js`、`src/courseData.js`、`src/gitCourseData.js`、`src/changelogData.js`、`src/changelogItems.js`、`src/changelogBaseline.js`、`src/apiClient.js`、`src/surveyBrandMarks.jsx`；清理 `main.jsx` 顶部对应 import。
- 删除 `tests/backend-sync.spec.js`；`tests/vibehub.spec.js` 删除被移除页面用例并修复术语用例旧断言（round2 报告已列出 10 条旧断言清单）。
- 删除 `scripts/course-render-smoke.mjs`、`course-mobile-smoke.mjs`、`lab-render-smoke.mjs`、`practice-render-smoke.mjs`、`audit-anti-ai-parity.mjs`、`audit-changelog-parity.mjs`、`scrape-product-course.mjs`、`scrape-practice.mjs`；`package.json` scripts 同步。
- 出口：全仓无对被删模块的 import（grep 验证）；构建通过。

**P3 图片与 Logo（与 P1/P2 并行，2 天）**
- 删除 `public/assets/oil-favicon.png`；全仓检索无残留引用（`siteConfig.js` partner 配置、页头/页脚）。
- 新 Logo 资产按 2.4 落点放置并切换 `siteConfig.js` 默认值、`vibehub.html` favicon、4 个术语 Demo 的 img src。
- 清洗 `termAnatomy.js` 休眠字段 3 个失效 URL 为等效 CSS（保持 `demo` 结构其余部分不变）。
- 出口：`public/assets/` 位图 = 新 Logo 系列 + `slide-forest.png` + `apple-glass-ribbons.webp`（或回退方案下的仅 Logo 系列）；Playwright 网络监听确认全站零图片 404、零 `oil-favicon` 请求。

**P4 品牌与页脚（0.5 天）**
- `siteConfig.js` 切独立品牌默认；页脚只保留投稿/Email 与 wordmark；`.env.example` 增加聚焦版品牌变量说明。
- 出口：页脚无第三方品牌行；wordmark 与品牌名一致。

**P5 验证与文档（1 天）**
- 跑 4.3 全部命令；更新 `docs/page-inventory.md`、`docs/parity-ledger.md`、`README.md`（vibehub 线说明）；新增 `docs/focus-change-log.md` 记录本方案执行结果与偏差。
- 出口：验收检查单全绿后提交合并。

### 3.3 包体与性能

- 静态图中移除约 225KB 源码（courseData 39.9 + gitCourseData 144.4 + changelog 三件 30.3 + surveyBrandMarks 10.1 + apiClient 2.2）；`practiceData.js` 719KB 动态块整块消失；`quickCheckFeedback.js` 因 QuickCheck 共用保留。
- 预期解除主包 >500kB 警告（以 `npm run build:vibehub` 实测为准，报告前后 kB 数）。
- 首屏策略不变：目录页仍静态依赖 `catalogData/termBasics/catalogCardHeights*`；详情数据仍 1.2s 后台预取。

### 3.4 图片/Logo 落地路径（细节）

1. 新 Logo 先出 SVG 母版与 20px/16px 可读性测试稿，再导 PNG；
2. `siteConfig.js`：`logoPath`/`faviconPath` 默认值指向新资产，保留 env 覆盖能力；
3. `vibehub.html`：`<link rel="icon">` 同步（该文件目前无 favicon 链接，需新增或确认由构建注入——实施时核对）；
4. Demo 内 4 处 img src 替换；
5. `termAnatomy.js` 清洗：`background:url('/assets/cover-mountain.png')` → 同容器尺寸的线性渐变（如 `linear-gradient(160deg,#dfe7f5,#b9c8e4)`），`avatar-fox.png` → 品牌蓝圆形底 + 首字，`cover-workspace.png` → 中性灰渐变；保持 `center/cover` 语义与视觉密度；
6. 全资产扫描脚本（可新增 `scripts/audit-assets.mjs`）：抓取全站页面，收集网络请求中 `/assets/*`，与 `public/assets/` 白名单比对，输出多请求/缺文件两张表。

### 3.5 测试与脚本调整对照

见 1.6 表。`route-smoke.mjs` 改法：`firstClassRoutes` 收敛为 `['/', '/en']`，删除 course 两段，期望总数 774 → **726**；`audit-original-sitemap.mjs` 增加"有意不复刻"清单（原站 33 个特殊页面中被移除的 14 条中英路由）并输出为预期差而非失败。

### 3.6 回滚策略

- 全程在 `focus/terms-only` 分支；P1–P4 每阶段独立 commit；
- 数据文件删除可经 git 恢复；如 P1 出现术语界面回归，`git revert` 对应阶段 commit 即可；
- 图片回退：新 Logo 保留旧 `vh-logo.png` 于 git 历史，不物理依赖。

---

## 四、验收标准

### 4.1 界面聚焦

- [ ] 站点只存在术语界面三类页面（目录首页 / 主题页 / 术语详情页）；被移除 5 组路由渲染站内 NotFound，无白屏、无报错；
- [ ] 页头导航仅剩"术语"一项与品牌区；无 Practice / Courses / AI Slop / Updates / Skill / Community / oil 链接；
- [ ] 术语详情页侧栏无"练习这个术语"等指向已移除页面的链接；全仓 grep 无 `/practice`、`/changelog`、`/courses`、`/anti-ai-flavor`、`/vibehub-skill` 死链（`src/launch/` 除外）；
- [ ] 无任何后端请求（`apiClient` 已删；收藏/进度纯 localStorage，刷新后仍在）。

### 4.2 图片与 Logo

- [ ] `public/assets/` 位图集合 = 新 Logo 系列 + `slide-forest.png` + `apple-glass-ribbons.webp`；`git diff` 证明两张预览图字节级未动；
- [ ] 全站（目录/主题/全部详情抽样 + 4 个含图 Demo 术语页）网络请求零图片 404；无 `oil-favicon.png` 请求；
- [ ] 新 Logo：20×20 页头与 favicon 可识别；明暗模式均成立；`/favicon`、`/app-icon`、`/logo`、`/accessibility` 四个术语 Demo 正常展示新标；
- [ ] 若执行 1 张回退：`style-glass`/`style-apple` 卡预览为 CSS 实现且 `test:catalog`、`audit:topic-parity` 通过（卡高差异已重采）。

### 4.3 技术与质量

- [ ] `npm run build:vibehub` 通过，无 >500kB 主包警告（附前后 kB 对比）；
- [ ] `node scripts/route-smoke.mjs`（期望清单 726 条）全部 200；
- [ ] `npm run test:terms`（708）、`npm run test:demos`（644）、`npm run test:catalog`（16/16）、`npm run test:header`、`npm run test:special` 通过；
- [ ] `npm run audit:copy`：`/en/html` 文案一致率维持 100%；`npm run audit:topic-parity` 16/16 不回归；
- [ ] 390px 移动端无横向溢出（术语首页/主题页/详情页各 1 条）；
- [ ] `tests/vibehub.spec.js` 术语相关用例通过；`backend-sync.spec.js` 已删除；
- [ ] 明暗模式 + 5 种主题色下目录页与详情页无视觉破版（抽查截图）。

### 4.4 验收检查单

- [ ] 4.1 全项
- [ ] 4.2 全项
- [ ] 4.3 全项
- [ ] `docs/focus-change-log.md` 记录实际执行与方案偏差
- [ ] 未决问题 1–5 均有书面结论

---

## 五、风险与未决问题

**未决问题（需产品负责人确认，默认值已给出）：**

1. **3 张 vs 1 张图片**：默认 3 张（新 Logo + 两张目录卡预览）。回退触发条件见 2.3。用户随附截图无法直接读取，"第 1 张术语图片"按页头品牌标口径执行，如与实际意图不符，仅影响 2.3 回退分支，不影响主方案。
2. **问卷去留**：默认移除（增长调研件，无学习价值）。若需保留来源统计，应改为部署层分析而非站内弹层。
3. **语言开关**：默认保留。双语是 354 术语产品的固有结构，移除英文等于删掉一半内容，与"聚焦界面"不是同一件事。
4. **品牌名**：2026-09-23 已确认沿用工作名「起站」（原 AI 建站入门产品线已归档，「起站」转为本站唯一品牌名）。`siteConfig.js` 已支持 env 覆盖（`VITE_SITE_NAME` / `VITE_SITE_TAGLINE_ZH` / `VITE_SITE_TAGLINE_EN`）。域名、商标与社交账号仍待确认。
5. **被移除路由的外链与 sitemap**：站内一律 NotFound；原站 sitemap 中这些 URL 的对外处理（外链 301 或任其 404）属部署决策，记录到部署清单。

**风险表：**

| 风险 | 影响 | 缓解 |
| --- | --- | --- |
| `main.jsx` 单文件 1776 行，删除组件时误伤术语分支 | 术语界面回归 | 分阶段 commit + 每阶段术语 smoke 全量跑 |
| `test:legacy` 旧断言修复工期失控 | P5 延期 | 旧断言清单已在 round2 报告列明，只修术语相关，其余删除 |
| `styles.css` 残留被移除页面样式 | 包体虚高 | 可选后置清理，先扫描未使用类名再决定 |
| 新 Logo 20px 不可识别 | 品牌受损 | 设计稿先过 20px/16px 可读性测试再导资产 |
| 卡片预览回退为 CSS 后卡高变化 | topic-parity 失败 | 回退分支附带重采 `catalogCardHeights*`（沿用 round2 的 `scrape-topic-card-heights.mjs`，注意采样条件一致） |

---

## 附录 A：图片引用完整索引

| 引用位置 | 目标 | 用途 | 方案处置 |
| --- | --- | --- | --- |
| `src/siteConfig.js:17` | `/assets/vh-logo.png` | `SITE.logoPath` 页头品牌标 | 换新 Logo |
| `src/siteConfig.js:18` | `/assets/vh-logo.png` | `SITE.faviconPath` | 换新 Logo |
| `src/siteConfig.js:26` | `/assets/oil-favicon.png` | partner logo | 删除（随第三方品牌） |
| `src/main.jsx:255` | `SITE.logoPath` / `SITE.footer.partner.logoPath` | 页头 img / oil-link | 换新 Logo / 删 oil-link |
| `src/main.jsx:321` | `/assets/style-imagery/apple-glass-ribbons.webp` | style-apple 目录卡预览 | 保留不动 |
| `src/main.jsx:324` | `/assets/slide-forest.png` | style-glass 目录卡预览 | 保留不动 |
| `src/main.jsx:787` | `/assets/vh-logo.png` | favicon/app-icon/logo 术语 Demo | 换新 Logo |
| `src/main.jsx:791` | `/assets/vh-logo.png` | accessibility 术语 Demo | 换新 Logo |
| `src/main.jsx:258` | `SITE.footer.partner.logoPath` | 页脚 partner 行 | 删除 |
| `src/termAnatomy.js:12` | `/assets/avatar-fox.png` | avatar 术语 Demo 背景（休眠字段） | 清洗为 CSS |
| `src/termAnatomy.js:14` ×4 | `/assets/cover-mountain.png` | backdrop-blur 术语 Demo 背景（休眠字段） | 清洗为 CSS |
| `src/termAnatomy.js:22/65` ×4 | `/assets/cover-workspace.png` | card/hero 术语 Demo 背景（休眠字段） | 清洗为 CSS |
| `src/referenceDetails.js:1`、`src/termDetails.js:4` | `assets/cover-template.png` | Demo 代码示例文本（非请求） | 不改 |

## 附录 B：`src/` 数据文件归属

- **保留（术语界面）**：`catalogData.js`、`termBasics.js`、`termExtras.js`、`termDetails.js`、`termAnatomy.js`、`termAliases.js`、`referenceDetails.js`、`extraDetailData.js`、`sourceStructuredDetails.js`、`sourceExtendedDetails.js`、`sourceFocusedDetails.js`、`quickCheckAnswers.js`、`quickCheckFeedback.js`、`catalogCardHeights.js`、`catalogCardHeightsZh.js`、`catalogCardHeightsByTopic.js`、`dataLoader.js`、`siteConfig.js`、`sourceHtmlDetail.jsx`、`styles.css`、`htmlDetail.css`、`extraDetail.css`
- **移除**：`practiceData.js`、`courseData.js`、`gitCourseData.js`、`changelogData.js`、`changelogItems.js`、`changelogBaseline.js`、`apiClient.js`、`surveyBrandMarks.jsx`

## 附录 C：证据目录

- 复刻验收证据：`replication-evidence/round-2026-09-21/`
- 本方案执行证据（实施时建立）：`replication-evidence/focus-round-2026-09-21/baseline/`、`after/`（截图、构建报告、route-smoke 输出、资产审计表）
