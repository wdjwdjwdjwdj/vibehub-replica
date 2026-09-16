# VibeHub 独立站复刻

这是一个不依赖原站运行时的 Vite + React 复刻版本。原站视觉作为基线，目录数据保存在 `src/catalogData.js`，页面通过客户端路由独立渲染，不使用 iframe、整页截图或占位 Demo。

## 本地启动

```bash
npm install
npm run dev -- --host 127.0.0.1
```

默认地址：`http://127.0.0.1:5173/`，英文入口为 `/en`。

部署时可通过 `.env` 覆盖基础品牌配置（不填写则保持 VibeHub 基线）：

```bash
VITE_SITE_NAME=你的站点名
VITE_SITE_DESCRIPTOR=你的站点描述
VITE_SITE_DESCRIPTION=你的站点描述（用于静态 HTML 与分享预览）
VITE_SITE_LOGO=/assets/your-logo.png
VITE_SITE_FAVICON=/assets/your-favicon.png
```

若要切换为独立品牌，将 `VITE_SITE_INDEPENDENT=true`，并按 `.env.example` 提供自己的 Footer 合作方、社交链接和投稿入口；独立模式会隐藏原站 Oil 外链，不会因只修改站点名称而误带原站归属信息。

变量模板见 [.env.example](<E:/vibe coding/网站复刻/.env.example>)。目前仅完成配置入口，尚未替换为用户自有品牌。

原站课程正文和图示元数据可在原站内容变化后重新抓取：

```bash
npm run scrape:course
npm run scrape:practice
```

`scrape:practice` 会从原站逐条读取 `catalog/details/*.json` 中的 `lessonPractice`，生成 296 条双语判断题；题库变化时可重跑。

## 验证

```bash
npm run build
npm run test:e2e
```

特殊页面的原站/本地结构对照可在 production preview 运行：

```bash
npm run audit:page-parity
npm run audit:topic-parity
npm run test:catalog
npm run test:header
npm run audit:anti-ai
npm run audit:extended
npm run audit:changelog
```

`audit:page-parity` 会逐对读取原站和本地的 H1、主要交互数量、页面高度、404 文案与 iframe 约束；当前包含 25 对特殊页面，覆盖 Button/Git/Upload/Input/Modal/Card/Markdown/HTML/DNS/Typography/Terminal/API/AI Agent/Project Rules。`audit:topic-parity` 会在 1440px 下逐对检查 8 个主题的中英文卡片数量、实测高度总和、3 列/Website Sections 2 列/特殊主题全宽分栏模板、iframe 和运行时错误，并更新英文与中文 Frontend 代表截图。`test:catalog` 会在中英文 Frontend 入口检查前六张高频卡片的本地原生 DOM 结构、无 iframe、无横向溢出和运行时错误。`test:header` 会在 390px 视口逐项对照原站与本地 Header 的 Logo、搜索框、语言、主题、模式按钮和主导航几何，并检查横向溢出与运行时错误。视觉截图证据和未关闭差异仍见 `docs/difference-log.md`。

`audit:changelog` 会展开原站与本地更新日志，逐项核对 22 个里程碑、49 条说明、322 个词条链接及分类名称，并监听两侧运行时错误。

`audit:anti-ai` 会在 1440px 和 390px 下逐对读取原站与本地中文/英文 Anti-AI 目录，核对中文 25 条、英文 18 条卡片数量、分类高度、关键本地化文案、横向溢出和浏览器错误。

`audit:extended` 会在 1440px 和 390px 下逐对读取 HTML、DNS、Typography、Terminal 的原站/本地页面；桌面端核对 Usage、Anatomy、Variants、Typical use cases、Selector 和 References 的位置与高度，移动端除横向溢出和浏览器错误外，还核对六个语义区块相对原站 DOM 基线的位置与高度。

`test:e2e` 会运行 23 个浏览器测试，验证首页、单条详情、可操作 Demo、收藏持久化、练习、AI Slop、Skill、课程章节、课程正文术语引用右侧详情面板、Git Story、dh-demo 控件/数据/反馈/站点内容家族、原站代表性教学结构、API 双语 6 状态流程、详情 QuickCheck 正确答案位置与 Button/Git/Upload/Input/Modal/Card/Markdown/HTML/DNS/Typography/Terminal/API/AI Agent/Project Rules 阅读顺序、Upload 原生文件选择与四场景卡、结构化详情页 Variant/场景状态、中文默认导航与 Changelog 22 个里程碑/49 条说明、原站 localStorage 兼容、主题页与详情页收藏同步、首次访问状态 key、调查弹层路由范围、Changelog 筛选/展开/月定位、主题目录移动端无横向溢出。默认请求 `127.0.0.1:5173`，验收其他地址时可设置 `VIBEHUB_BASE_URL`。

```bash
npm run test:routes
```

`test:routes` 会请求全部本地一等页面、8 个双语主题入口、322 条中英文详情路由、双语产品官网课程路径、Git 工作流 6 个双语章节和 Skill Learning Lab，共 710 个本地入口。其中 677 条对应原站 sitemap，另外 33 条是本地补充的双语/主题/课程章节/Lab 入口。原站内容抓取脚本为 `node scripts/scrape-reference.mjs`，需要联网，仅在原站内容发生变化时重跑。

```bash
npm run audit:original:sitemap
```

`audit:original:sitemap` 会联网读取原站 sitemap，确认当前 677 个 URL 中的 644 条双语详情与本地 322 个术语 slug 完整对应，并列出特殊页面入口。

```bash
npm run test:terms
```

`test:terms` 会在真实 Chromium 页面中逐一打开 322 条术语的中英文详情路由，共 644 条，检查 H1、Demo 存在、404 状态和 iframe 禁用约束。

```bash
npm run test:demos
```

`test:demos` 会在真实 Chromium 页面中逐一审计 644 条详情，拒绝 `dh-generic-detail`、`reference-content-stage` 等通用 fallback，记录当前 Demo 家族分布并监听 iframe 约束。

```bash
npm run test:courses
```

`test:courses` 会在真实 Chromium 页面中打开产品官网课程与 Git 工作流课程的全部中英文总览/章节入口，检查 H1、章节正文、目录、原生课程图示和 iframe 禁用约束。

```bash
npm run test:courses:mobile
```

`test:courses:mobile` 会在 390px 视口逐章检查产品官网课程的分节、原生图示、运行时错误和整页横向溢出。

```bash
npm run test:lab
```

`test:lab` 会在真实 Chromium 页面中检查中英文 Skill Learning Lab 的标题、四步流程、两种方案和 iframe 禁用约束；`test:e2e` 还会跑完整的选择、滑块、检查、完成与复制流程。

```bash
npm run test:practice
```

`test:practice` 会在真实 Chromium 页面中校验 9 个方向的原站题量，并按正确答案走完全部 296 道双语练习，检查答对后术语详情解锁和运行时错误。`scrape:practice` 还会生成详情页 QuickCheck 使用的 `src/quickCheckAnswers.js` 与按需加载的 `src/quickCheckFeedback.js`。

## 当前路由

- `/`：中文术语目录、搜索、主题切换、收藏；默认站点语言
- `/en`：英文术语目录与对应英文详情页，作为保留的双语入口
- `/topics/:topic`：主题页
- `/:term`、`/en/:term`：322 条术语详情页和对应 Demo
- `/practice`：术语判断练习
- `/anti-ai-flavor`：AI Slop 图鉴
- `/vibehub-skill`：Skill 介绍与安装指令
- `/changelog`：更新日志
- `/courses`：课程总览；`/courses/product-website` 和 9 个章节路径：课程正文、章节目录和前后章导航；`/courses/git-workflow` 和 6 个章节路径：Git 工作流正文、章节目录和前后章导航
- `/vibehub-skill/lab`、`/en/vibehub-skill/lab`：Skill Learning Lab 组合互动练习

## 状态说明

已实现和已验证的范围见 `docs/page-inventory.md`、`docs/interaction-inventory.md`。差异与截图证据见 `docs/difference-log.md`，部署交接见 [deployment-checklist.md](<E:/vibe coding/网站复刻/docs/deployment-checklist.md>)；必须在确认自有品牌、部署平台、账号归属和站点名称后再进行公网部署。
