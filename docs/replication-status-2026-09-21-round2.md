# VibeHub 复刻持续交付记录（2026-09-21 第二轮 · `/en/html` 达标）

> **2026-09-27 事后注**：`dev:vibehub` / `vite.vibehub.config.js` / `dist-vibehub-qa` 均已并入默认配置，现在用 `npm run dev`（端口 5174）即可；「起站」另一条产品线已从活动树移除，可从 Git 提交 `573dc6a` 恢复。下表保留当时的原始记录。

## 一、工程与运行入口

| 项 | 值 |
| --- | --- |
| 工程目录 | `E:\vibe coding\网站复刻` |
| VibeHub 开发命令（当时） | `npm run dev:vibehub -- --host 127.0.0.1 --port 5174`，现等价于 `npm run dev` |
| 验收入口 | `http://127.0.0.1:5174/en/html` |
| 5174 端口进程 | PID 24472，`vite --config vite.vibehub.config.js --host 127.0.0.1 --port 5174`（本工程 vibehub dev server，未终止/未覆盖） |
| “起站”默认入口（当时） | `index.html` / `src/launch*` / `launch-public/` / 默认 `vite.config.js`，本轮未改动；**该线已于 2026-09-23 归档** |
| 原站 | `https://vibe-hub.org/en/html` |

## 二、本轮改动文件

| 文件 | 改动 |
| --- | --- |
| `src/styles.css` | 全局 design token 对齐原站 `:root`（`--bg/--bg-soft/--bg-hover/--text/--text-2/--text-3/--border/--border-hover/--border-light/--brand/--brand-hover/--brand-light/--radius/--ease` 等，本地别名 `--ink/--muted/--line/--soft/--panel` 按 `.vh-html-replica` 同规则映射）；`body` 补 `font-size:15px; line-height:1.7; letter-spacing:.1px; -webkit-font-smoothing:antialiased`；Footer 全套规则按原站逐条还原（`--border-light` 边框、`color-mix` 半透明图标底、`--text-3` 次要文字、`.footer-contribute-card` 品牌色、`.footer-wordmark` 基色、`.site-footer-shell{position:relative}`）；Header 按实测几何对齐原站 `.nav` 体系（`box-sizing:border-box; height:60px` 使内容盒 59px、`.header-inner{gap:16px}`、`.main-nav{margin-left:12px}`、导航项 34px/8px 圆角/550 字重/`--text-2`、Skill 链 650 + Manrope 17px 图标、Community 按钮同款尺寸与原站 path、语言按钮 V 形箭头、主题色块改原站不规则 blob、明暗模式 sun/moon 结构、`.search-box` 12px 内距 + 999px 圆角 + 白 94% 底、`.search-box input` 13px + `font-family:inherit` + `line-height:normal` + `padding:0`、右侧控件 `flex:none` 且搜索框 `flex:0 1` 可收缩） |
| `src/main.jsx` | 导航：搜索图标改用原站文本字符 `⌕`；语言按钮去掉原站没有的 `⌄` 并改为 `<span>English</span><i>` 结构；**移除原站没有的 `Sign in` 账号按钮**（`AuthDialog` 代码保留、暂不渲染入口）；`aria-label` 对齐原站（`Search terms and components` / logo `VibeHub`）；三个图标换成原站同款 markup（`ti-ai-agent` 字体字形、users path、sun/moon SVG） |
| `src/sourceHtmlDetail.jsx` | `getHtmlCopyMarkdown` 增加 Quick check 作答段：作答后按原站插入 `**Correct**` / `**Try again**` + 所选项反馈；新增模块级 `htmlQuickCheckAnswer` 共享状态与 `setHtmlQuickCheckAnswer`，`HtmlQuickCheck` 作答时写入、卸载时重置；补 `useEffect` import |
| `src/htmlDetail.css` | 按原站样式表重新生成（`scripts/extract-original-css.mjs`）：类名清单补 `lesson-practice-feedback` / `lesson-practice-feedback-icon` / `lesson-practice-state`，修复答题反馈块完全无样式的问题 |
| `src/catalogCardHeightsByTopic.js` | 按原站实时页面重采 8 主题 × 中英 = 16 组、354 张卡片高度（原缓存缺 16 条、过期 6 条） |
| `scripts/html-detail-classes.txt` | 补 3 个 feedback 类名 |
| `scripts/lib/png-diff.mjs` | **新增**：纯 Node PNG 解码/编码/逐像素对比（无第三方依赖） |
| `scripts/diff-png.mjs` | **新增**：像素对比 CLI，输出 mismatchRatio、16 段差异分布、差异图，≤1% 退出码 0 |
| `scripts/compare-html-page.mjs` | 升级：选择器改用 CSS 逗号列表（修复 `nav--local.png` 一直缺失）、新增逐区块 mismatchRatio 与 `compare.json` |
| `scripts/diff-selector-styles.mjs` | **新增**：任意路由的选择器级计算样式/几何对比 |
| `scripts/probe-original-css.mjs` | **新增**：抓取原站样式表并按选择器片段检索规则原文 |
| `scripts/verify-html-interaction-shots.mjs` | **新增**：7 个交互状态的原站/本地整页截图逐像素对比 |
| `scripts/scrape-topic-card-heights.mjs` | **新增**：重采主题页卡片高度（原文件头注释引用的生成器此前不存在） |
| `scripts/audit-copy-parity.mjs` | 页面清单补 `/en/html`；默认 `VH_LOCAL` 改为 5174 |
| `scripts/audit-topic-parity.mjs` | 默认 `VIBEHUB_BASE_URL` 改为 5174；报告落盘 `replication-evidence/round-2026-09-21/topic-parity.json` |
| `scripts/catalog-mini-smoke.mjs` | 报告落盘 `replication-evidence/round-2026-09-21/catalog-mini-smoke.json` |
| `scripts/verify-html-interactions.mjs` | 输出目录改到本轮；复制 Markdown 前先关闭问卷并延长等待 |

## 三、`/en/html` 验收结果（1440×900，DPR=1，locale=en-US，light）

### 3.1 几何 + 文案 + 像素（`node scripts/compare-html-page.mjs .../html-final/cmp`）

```
scrollHeight  original=5075  local=5075  delta=0
```

| 区块 | Δy | Δh | 可见文本 | mismatchRatio | 结论 |
| --- | --- | --- | --- | --- | --- |
| nav | 0 | 0 | IDENTICAL | 0.733% | PASS |
| topbar | 0 | 0 | IDENTICAL | 0.000% | PASS |
| hero | 0 | 0 | IDENTICAL | 0.299% | PASS |
| lessons | 0 | 0 | IDENTICAL | 0.000% | PASS |
| usage | 0 | 0 | IDENTICAL | 0.045% | PASS |
| anatomy | 0 | 0 | IDENTICAL | 0.000% | PASS |
| variants | 0 | 0 | IDENTICAL | 0.000% | PASS |
| scenes | 0 | 0 | IDENTICAL | 0.076% | PASS |
| selector | 0 | 0 | IDENTICAL | 0.025% | PASS |
| references | 0 | 0 | IDENTICAL | 0.000% | PASS |
| footer | 0 | 0 | IDENTICAL | 0.095% | PASS |
| survey | 0 | 0 | IDENTICAL | 0.031% | PASS |

- 门槛：单通道差 >12 计为差异像素，mismatchRatio ≤1%（阈值未放宽）。
- 证据：`replication-evidence/round-2026-09-21/html-final/cmp/`（`compare.txt`、`compare.json`、`*--original.png`、`*--local.png`、`diff-*.png`）。

### 3.2 文案逐句一致性（`npm run audit:copy` → `/en/html`）

原站 149 行 / 本地 149 行，**一致率 100%，逐句完全一致**（含导航，本地已无原站没有的多余控件）。
报告：`docs/copy-parity-latest.md`。

### 3.3 交互（`node scripts/verify-html-interactions.mjs`）

20 项状态断言全部 MATCH（唯一 DIFF 是 `nav.afterNextClick` 的 URL host，原站 `vibe-hub.org` vs 本地 `127.0.0.1:5174`，path 均为 `/en/css`，属预期）：
问卷弹出/选项数/点击后状态、Quick check 错误与正确反馈（class、marker、feedback 标题）、Anatomy 点击高亮与收起、收藏前后 `aria-pressed`、复制标签与剪贴板内容（2560 字符逐字节一致）、参考链接 href/target/rel、上一条/下一条、返回、发音按钮可点、刷新后 H1 与五个区块存在、`__errors` 均为空。
报告：`replication-evidence/round-2026-09-21/html/interactions/interaction-report.json`。

### 3.4 交互状态截图（`node scripts/verify-html-interaction-shots.mjs`）

7 个状态全部 PASS，scrollHeight 与原站一致，两边 errors=0：

| 状态 | mismatchRatio |
| --- | --- |
| 01-survey-open | 0.033% |
| 02-survey-closed | 0.034% |
| 03-quiz-wrong | 0.037% |
| 04-quiz-correct | 0.028% |
| 05-anatomy-active | 0.038% |
| 06-favorite-on | 0.130% |
| 07-copied | 0.239% |

证据：`replication-evidence/round-2026-09-21/html/interaction-shots/`。

### 3.5 剪贴板行为修正

原站在 Quick check 作答后，“Copy as Markdown” 会插入 `**Correct**`/`**Try again**` + 所选项反馈；此前本地完全不插。已修正，错误作答（2702 字符）与正确作答（2690 字符）均与原站逐字节一致。证据：`replication-evidence/round-2026-09-21/html/clipboard/`。

## 四、全站扩展进展

| 检查 | 命令 | 结果 |
| --- | --- | --- |
| 构建 | `npm run build:vibehub` | 通过（361ms；>500kB chunk 警告依旧，非功能阻塞） |
| 路由 | `VIBEHUB_BASE_URL=http://127.0.0.1:5174 node scripts/route-smoke.mjs` | **通过，774 条路由全部 200** |
| sitemap | `node scripts/audit-original-sitemap.mjs` | 通过，`catalogMissing=0`、`sitemapUnknown=[]` |
| 主题页 | `npm run audit:topic-parity` | **通过 16/16**（本轮开始时 4/16） |
| 代表页 | `npm run audit:page-parity` | 通过 25/25 |
| 文案 | `npm run audit:copy` | `/en/html` 100%；其余页面仍有意译差异 |
| 目录 Demo | `npm run test:catalog` | **未通过 4/16**（见“未完成”） |
| 旧断言 | `npx playwright test tests/vibehub.spec.js` | 14 通过 / 10 失败，**全部为仓库内旧断言**，非本轮回归（见下） |

### 4.1 `audit:topic-parity` 从 4/16 到 16/16

失败原因是 `cardHeightTotal` 不符：本地 `catalogCardHeightsByTopic.js` 的卡片高度缓存相对原站实时页面既缺条目又过期。用新写的 `scripts/scrape-topic-card-heights.mjs` 按原站重采后 16 组全部对齐。

采样条件必须与 `audit-topic-parity.mjs` 的 `inspect()` 完全一致（`domcontentloaded` + `fonts.ready` + 1500ms、1440×1000、不滚动），**且不能给 context 设 `locale`**——原站 `/topics/frontend` 会按 Accept-Language 重定向，设了 `en-US` 会采到 `/en`（44045）而不是中文首页（40746）。

### 4.2 `test:legacy` 10 条失败均为旧断言（非本轮回归）

| 失败测试 | 原因 |
| --- | --- |
| VibeHub core routes and interactions | 期望问卷标题是 `heading` role，原站/本地实际都是 `<p class="source-survey-title">` |
| mobile layout renders without horizontal overflow | 选择器 `.source-extended-scenes` 已不存在（横向溢出断言本身通过） |
| reference demo families expose working state changes | 期望 `Close survey`，原站/本地问卷关闭按钮的 accessible name 实为 `Skip this question`，问卷未关闭从而挡住 `/en/skeleton` 的 Title 按钮 |
| changelog mobile layout and month navigation work | `#changelog-2026-09-13` 不在视口 |
| Chinese default surface … | `.changelog-entry` 实为 23 条，测试写死 22 |
| all first-class pages render real content | `.term-card` 实为 140 张（Frontend 已从 137 增长），测试写死 137 |
| detail demo families render native visual states | 选择器 `.catalog-html-layout` 已不存在 |
| reference detail structures match the original teaching patterns | 选择器 `.source-extended-usage` / `.source-extended-scenes` 已不存在 |
| Button and Git detail quick checks … | 选择器 `.survey-panel` 已不存在（本地用 `.source-survey`） |
| survey scope follows the original term surfaces | 同上 |

本轮确实引入并已修回一个回归：主题色按钮一度被改成空 `<button>` + `::after`，导致 1280×720（Playwright 默认视口）下 flex 收缩为 0 宽、不可点击。改为内嵌 `<span class="theme-color-dot">` 并给右侧控件加 `flex:none`、搜索框改 `flex:0 1` 可收缩（对齐原站 `.nav-search{flex:0 1 360px}` / `.nav-color-mode{flex:0 0 44px}`）后恢复。1280 下主题/明暗/油链坐标与原站一致（1081/1125/1185）。

## 五、未完成与下一步

1. **`test:catalog` 4/16 未通过**：AI 主题的 `rag`、`fine-tuning`、`reasoning-model` 与 Product 主题的 `persona` 四张卡片在原站有 `.card-demo`，本地 `MiniVisual` 未实现（渲染为空）。原站 Demo 的 HTML 已抓到（`replication-evidence/round-2026-09-21/missing-demos.json`），但样式分散在 `styles/packs/ai.css` 与多个 `_next/static/css` 分包里，需要逐套提取并做中英双语文案。注意：原站的 `product-backlog` / `product-roadmap` 的 `.card-demo` 本身就是空的，本地“无 Demo”与原站一致，不是缺陷。
2. **`catalog-mini-smoke.mjs` 的 `expected` 清单过期**：原站 AI 主题前六张已变为 `ai-basics/ai-hallucination/vibe-coding/multimodal/rag/fine-tuning`，Product 主题前六张已变为 `story/use-case/flow/journey/persona/prd`；测试仍写旧顺序。补齐 4 个 Demo 后应同步更新该清单。
3. **其余页面类型内部视觉**：首页 `/`、`/en`、课程、Practice、Changelog、Skill/Lab 的字体、图标、局部内容密度与交互数量与原站仍有差异，目前只完成路由可达与代表性几何回归。
4. **新增 32 个术语壳层页**：入口、标题、通用详情壳可用，但原站专用 Demo / Anatomy / Variants / 场景交互尚未逐页补齐。
5. **主 bundle 仍 >500kB**（Vite 警告），未作为功能阻塞处理。
6. **未执行**：commit / push / 部署 / 公开发布；Firefox 与 WebKit 未运行。

## 六、证据目录

- `replication-evidence/round-2026-09-21/html-final/cmp/` — `/en/html` 12 区块几何 + 文案 + 像素对比
- `replication-evidence/round-2026-09-21/html/interactions/` — 20 项交互状态断言
- `replication-evidence/round-2026-09-21/html/interaction-shots/` — 7 个交互状态整页截图对比
- `replication-evidence/round-2026-09-21/html/clipboard/` — 剪贴板逐字节对比
- `replication-evidence/round-2026-09-21/html-current/`、`html-baseline*/`、`html-fix*/` — 逐轮修复过程基线
- `replication-evidence/round-2026-09-21/header-styles-fix1.txt`、`footer-styles.txt`、`header-geom/`、`icon-geom/`、`chain-probe/`、`font-probe/`、`gap-probe/` — Header/Footer 定位过程证据
- `replication-evidence/round-2026-09-21/topic-parity.json` — 16 组主题页对比
- `replication-evidence/round-2026-09-21/catalog-mini-smoke.json` — 目录 Demo 缺失明细
- `replication-evidence/round-2026-09-21/card-height-gaps.json` — 卡片高度缺口明细
- `replication-evidence/round-2026-09-21/missing-demos.json` — 4 个缺失 Demo 的原站 HTML
- `replication-evidence/round-2026-09-21/original-css/` — 原站样式表快照（12 个文件）
- `replication-evidence/round-2026-09-21/nav-probe/`、`survey-key` 等 — 导航/问卷存储键探针

## 七、失败尝试记录（供后续复用）

1. 直接把 `.theme-color-button` 改成空按钮 + `::after` 画色块 → 1280 下被 flex 压成 0 宽，Playwright 点击超时。改用内嵌 span + `flex:none`。
2. `scrape-topic-card-heights.mjs` 首版给 context 设了 `locale:'en-US'` → 原站 `/topics/frontend` 被重定向到 `/en`，采到英文高度（44045）而非中文首页（40746），主题页对齐反被破坏。去掉 locale 后正确。
3. `htmlDetail.css` 重新生成时类名清单缺 `lesson-practice-feedback` → 答题反馈块在本地完全无样式（高 117/92 vs 原站 74），页高差 22–47px。补类名重生成后 870x74 完全一致。
4. 曾误判 `test:legacy` 失败数从 8 升到 10 是本轮回归；逐条读错误后确认全部是旧断言（问卷 role/关闭按钮名、`source-extended-*`、`catalog-html-layout`、`survey-panel`、Frontend 137、changelog 22/13 日）。
5. `audit:topic-parity` / `audit:page-parity` / `test:catalog` / `test:legacy` 默认打 5173（“起站”入口），必须显式 `VIBEHUB_BASE_URL=http://127.0.0.1:5174`，否则会读到另一个产品的页面。
