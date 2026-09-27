# VibeHub 复刻持续交付记录（2026-09-21）

> **2026-09-23 事后注**：本记录中的「起站」默认入口已于 2026-09-23 归档到 `archive/qizhan-line-2026-09-23/`，仓库现在只有 VibeHub 复刻一条线，默认 dev 端口为 5174，`VIBEHUB_BASE_URL` 的默认值也已统一为 5174。下文关于「5173 是起站服务」的描述已成历史。

## 当前工程与运行入口

- 工程目录：`E:\vibe coding\网站复刻`
- VibeHub 开发命令：`npm run dev:vibehub -- --host 127.0.0.1 --port 5174`
- 验收入口：`http://127.0.0.1:5174/en/html`
- “起站”入口仍由默认 `vite.config.js` 保留；本轮没有切换或覆盖它。

## 调研依据与限制

- 原站基线使用同一 Playwright Chromium 配置（1440×900、DPR 1、英文路由、默认浅色主题、清空相关 localStorage），采集 DOM、Computed Styles、全页截图和点击后的状态；本地验收使用相同配置。
- `/en/html` 的正文确认是 DOM/CSS + 可交互 React 控件，不是视频、序列帧或 Canvas；因此按区块结构、样式和状态重建，未使用 iframe 或整页截图。
- Changelog、Skill、Learning Lab 和主题页分别保留了结构化 JSON/截图/交互脚本证据；原站 Practice 题目、调查弹层和部分页面内容具有动态性，差异记录按可重复的结构和行为基线处理。
- 原站公网页面可访问；Firefox/WebKit、真实后端账号同步、生产部署和第三方消息未在本轮执行。
- 当前会话未提供 Browser/IAB 插件，因此按前端测试规范使用 Playwright Chromium 作为浏览器验证 fallback；所有源站/本地截图均保持 1440×900、DPR 1、浅色主题和同一语言/存储状态。

## 本轮完成

- `/en/html`：1440×900 原站/本地当前基线重采集；主内容高度均为 5075，Hero、Quick check、Usage、Anatomy、Variants、Scenes、Selector、References、Footer、Survey 均 `Δy=0、Δh=0`，除 References 截图局部文字抗锯齿 1.129% 外，各正文区块像素 mismatch ≤0.299%，导航 0.733%。
- `/en/html` 交互：问卷、Quick check 错误/正确反馈、Anatomy 点击高亮与收起、收藏、复制 Markdown、上下页导航、返回、刷新、发音按钮均完成同流程验证；原站与本地均无 pageerror。
- sitemap 对齐：从 `https://vibe-hub.org/sitemap.xml` 发现并补齐 32 个此前未在历史 catalog 快照中的术语入口，覆盖 Backend/Git/Tech Stack/AI/Product/Frontend；按原站 section 归位后 Frontend 140、Backend 73、Product 25、Testing 14、Tech Stack 20、AI 43、Git 15、Design Styles 24 与原站一致。
- 首页 `/en` 与 `/`：切换为原站当前 `catalog-directory-page` 目录结构，保留可编辑的 HTML/CSS/React 卡片 Demo、分类筛选、收藏、问卷和详情导航。1440×900 同状态下原站/本地主内容高度均为 18293px，目录 grid 高度均为 1855.34375px，Frontend 140 张卡片的卡高逐项一致；全页截图 mismatch 2.218%，主要残余是卡片内部 Demo、局部图标和字体抗锯齿。证据：`replication-evidence/round-2026-09-21/catalog-home-parity-5/`。
- 补齐术语入口标题：32 个新增英文路由的 H1 和 `<title>` 与原站当前页面一致，均可直接访问并刷新。
- 英文 Practice 标题分隔符修正为原站 `Frontend Visual Practice | VibeHub`。
- `/en/changelog`：补齐原站当前 2026-09-20 更新条目，包含 32 个新词条、4 条中英文更新说明、月份计数（7/11/5）、统计卡片（23/354/53+）和首屏词条分类；同时按原站 Computed Styles 校准时间线边框、基线对齐、标题字重和 Tabler 图标。1440×900 全页原站/本地高度均为 7656px，当前截图 mismatch 2.097%；筛选、展开和月份跳转均已走通。
- `/en/vibehub-skill`：按原站 Computed Styles 修正桌面端壳层、hero grid、浏览器演示、安装卡片、Rewrite/Suggest 两个功能区；移除源站不存在的功能区底边框后，1440×1000 下主内容高度收敛到原站 2337.1px / 本地 2337.0px，hero/install/rewrite 的 `Δy` ≤0.1px。最新截图与差异证据在 `replication-evidence/round-2026-09-21/skill-parity-3/`，全页 mismatch 2.862%。
- `/en/vibehub-skill` 交互：Tooltip 开合、安装指令复制、重写指令复制均已实际点击验证；无 pageerror/console error。
- `/en/vibehub-skill/lab`：完成桌面端 Learning Lab 的 Computed Styles 对齐；原站/本地 1440×900 全页均为 1440×1376，intro、stage、product、option cards、observe、footer 几何误差均 ≤0.02px，像素 mismatch 降至 0.724%。证据保存在 `replication-evidence/round-2026-09-21/lab-parity-8/`。
- `/en/vibehub-skill/lab` 交互：实际走通 Option B → 选择优先级 → 调整 3 个滑块 → 勾选 3 项检查 → 完成 → 复制练习；状态变化和复制按钮均通过，无 pageerror/console error。
- `/en/practice`：按原站当前 split-screen DOM/CSS 收敛桌面布局；原站/本地 1440×900 同状态主内容均为 846px、总文档高度均为 1029px，左右列、Question header、744px 锁定术语面板和页脚起点均对齐。题目文案保持实时题库随机性，不以随机题目逐句相等作为门槛。证据：`replication-evidence/round-2026-09-21/practice-parity-1/compare.json`。
- 路由校验脚本和 sitemap 审计已纳入新增术语，当前 sitemap `catalogMissing=0`、`sitemapUnknown=[]`。
- 特殊详情页回归：API、AI Agent、Project Rules 的原站/本地主内容高度已重新对齐（分别为 2157、3568、2557px）；API 与 Project Rules 关键区块 `Δ=0`，AI Agent 的 hero/提示区残余误差 ≤1px。共享 `SourceReferences` 已统一为可编辑的 Further reading 链接结构，并保留真实外链目标。
- 32 个新增英文术语详情：已从原站实时 DOM/样式采样建立 `src/extraDetailData.js` 文本基线和 `src/extraDetail.css` scoped 可编辑模板，接入顶部栏、上下页、发音、收藏、Markdown 复制、原站式 Hero/quote/tagline、概念场景、Quick check、Agent prompt、Learn next、Selector Pro 和 Further reading。32 页均已使用 source-shaped 专用场景：HTTP Status Code、网络类 IP/Timeout/WebSocket、账户/数据类 Session/HTTP Methods/Primary Key/Webhook/Object Storage/OAuth、运行时/依赖/版本/调用栈 Node.js/Dependency/Semantic Versioning/Stack Trace、Git、AI、Product、Frontend；每个场景均包含实际控制项、状态变化和可编辑 DOM/CSS。32/32 路由可访问，交互 smoke 32/32 通过；主高度对照除共享字体/抗锯齿外均收敛到约 +2–8px。
- `/en/dns`、`/en/typography`、`/en/terminal`：将首个 Hero Demo 改为源站同构的 `dh-demo` DOM（DNS Resolver 流程、Typography 角色样例、Terminal 窗口），补齐源站 Agent 气泡和桌面 Quick check 尺寸；1440px 下四个结构化详情（含 `/en/html`）的 Usage/Anatomy/Variants/Scenes/Selector/References 几何审计全部通过，四组均无横向溢出或浏览器错误。对应截图证据在 `replication-evidence/round-2026-09-21/focus-pages/`。

## 证据

- HTML 基线：`replication-evidence/round-2026-09-21/html-current/`
- HTML 最终逐区块对比：`replication-evidence/round-2026-09-21/html-final-6/compare.txt`（scrollHeight 原站/本地均 5075；References 的计算样式已移除本地额外 min-height，剩余仅 1.129% 字体/字形像素差异）。
- 首页目录最终对比：`replication-evidence/round-2026-09-21/catalog-home-parity-5/compare.json`、`local.png`、`diff.png`（1440×18293，同尺寸，mismatch 2.218%）。
- 首页目录交互报告：`replication-evidence/round-2026-09-21/catalog-home-interactions/interaction-report.json`（原站/本地均验证问卷关闭、Backend 目录跳转、收藏持久化、首卡详情跳转且无错误）。
- HTML 结构对比：`replication-evidence/round-2026-09-21/html-current/cmp/compare.txt`
- HTML 交互报告：`replication-evidence/round-2026-09-21/html/interactions/interaction-report.json`
- 新增术语清单与原站标题：`replication-evidence/round-2026-09-21/missing-terms.json`
- 桌面首页截图：`replication-evidence/round-2026-09-21/orig-home-final-fold.png`、`local-home-final-fold.png`
- Changelog 首屏截图：`replication-evidence/round-2026-09-21/orig-en.png`、`local-en.png`、`orig-zh.png`、`local-zh.png`；像素差异记录：`replication-evidence/round-2026-09-21/changelog-en-diff.png`
- Changelog 全页对比：`replication-evidence/round-2026-09-21/changelog-parity-9/`（原站/本地 7656px，同尺寸，mismatch 2.097%）。
- 主题页结构对比：`replication-evidence/round-2026-09-21/topic-parity.json`（中英文 8 个主题、16 对页面；卡片数量、总卡片高度、三列 grid 和运行时错误均通过）。

## 已运行检查

- `npm run build:vibehub`：通过。
- `npm run test:routes`：通过，774 条本地双语/专题/课程路由返回 200。
- `node scripts/audit-original-sitemap.mjs`：通过，741 条原站 sitemap，`catalogMissing=0`、`sitemapUnknown=[]`。
- `node scripts/capture-html-page.mjs ...` 与 `node scripts/compare-html-page.mjs ...`：通过，`/en/html` 逐区块几何对齐。
- `node scripts/verify-html-interactions.mjs`：通过；唯一差异是导航跳转后的 host 属预期不同。单独捕获复制文本后，`LOCAL_LEN=2560` 与原站完全一致（`EXACT_MATCH=true`）。
- `npm run test:terms`（5174）：通过，整合历史 catalog 与实时 sitemap 补齐词条后的 708 条双语详情路由均完成 H1、Demo、无 iframe/运行时错误检查；`/html` 专用结构已纳入 smoke selector。smoke 按 120 条路由批次回收 Chromium，避免长串行运行触发 `ERR_INSUFFICIENT_RESOURCES` 的测试器假失败。
- `npm run test:courses`（5174）：通过，36 条双语课程路由完成渲染、标题和无运行时错误检查。
- `npm run test:practice`（5174）：通过，328 道双语 Practice 题与 9 组 scope 统计完成渲染检查；当前题量与原站实时 `/en/practice` 一致（Frontend 139、Backend 70、Product 25、Testing 14、Tech Stack 20、AI 43、Git 15、Design Styles 2）。
- `npm run test:special`（5174）：通过，API、AI Agent、Project Rules 三组特殊详情的 source/local 几何 smoke 通过。
- `node scripts/header-shell-smoke.mjs`（5174）：通过，修正旧脚本的 5173 入口和过时选择器后，1440×900 Header 几何、溢出和运行时错误检查通过。
- `node scripts/audit-changelog-parity.mjs`（`VIBEHUB_BASE_URL=http://127.0.0.1:5174`）：通过，23 个里程碑、334 个归档词条、53 条更新说明，词条顺序与分类一致。
- `node scripts/compare-changelog-page.mjs replication-evidence/round-2026-09-21/changelog-parity-9`：通过尺寸门槛，`sizeMatch=true`，全页像素 mismatch 2.097%。
- `node scripts/probe-changelog-interactions.mjs`：通过；updates/terms 筛选、首个 terms 条目展开、月份跳转均完成，`errors=[]`。
- `$env:VIBEHUB_BASE_URL='http://127.0.0.1:5174'; npm run audit:page-parity --silent`：通过 25 对代表性页面；全站页面仍有原站动态内容/随机练习题差异，不能据此宣称全部像素级完成。未设置环境变量时脚本会误抓 5173 的“起站”服务，本轮已保留该服务不动。
- `$env:VIBEHUB_BASE_URL='http://127.0.0.1:5174'; node scripts/audit-topic-parity.mjs`：通过 16 对中英文主题页，卡片数量和 grid 结构一致，无 iframe/运行时错误。
- `$env:VIBEHUB_BASE_URL='http://127.0.0.1:5174'; node scripts/probe-catalog-home-interactions.mjs`：通过原站/本地 2 组 1440×900 流程；问卷关闭、Backend 73 张卡片目录跳转、收藏 `aria-pressed` 与 `vibehub:favorites` 持久化、Frontend 首卡详情跳转均一致，`errors=[]`。
- `node scripts/probe-extra-interactions.mjs`（5174）：32 个新增英文详情逐页执行收藏切换、Markdown 复制、专用场景/控制项和 Quick check 点击；`passed=32`、`failed=[]`、`errors=[]`，报告在 `replication-evidence/round-2026-09-21/extra-details/interaction-report.json`。另以 Playwright Chromium 对网络、系统概念、Node/Dependency/SemVer/Stack Trace 控件逐项点击，均发生预期文本/状态变化且 `pageerror=[]`。
- `node scripts/audit-extra-details.mjs`（`EXTRA_BASE_URL=http://127.0.0.1:5174`）：32 个新增英文入口均返回 200，H1/quote/tagline/practice/prompt/references 均可采集；source/local 代表性截图与高度证据在 `replication-evidence/round-2026-09-21/extra-details/`。本轮复核后的主要页面高度差：HTTP Status Code +2.0px；Merge Conflict +7.6px、Remote Repository +7.5px、Reset & Revert -6.1px；六个 AI 页面约 +2.3–3.1px（Fine-tuning +2.3px）；Scope Creep、Technical Debt、Persona、Regex、Keyframe、Prefers Reduced Motion 约 +2.0–2.1px，Prototype/Event Tracking/Semantic HTML 约 +2.1px。剩余差异主要是原站 demo 内部视觉细节和字体抗锯齿，不是空白占位或 iframe。
- `scripts/compare-extra-detail.mjs` 与 `replication-evidence/round-2026-09-21/extra-details/*/compare.json`：已保存 32 页原站/本地 1440×900 全页截图、主高度和区块位置；网络、系统概念、运行时/依赖/版本/调用栈、Git、AI、Product、Frontend 专用场景均可独立编辑和回归。新增代表页高度差：IP Address +2.1px、Timeout +2.2px、WebSocket +2.2px、Session/HTTP Methods/Primary Key/Webhook/Object Storage/OAuth +2.1px、Node.js/Dependency/Semantic Versioning/Stack Trace +2.0px。
- `/en/practice` 几何复核：原站/本地 `main=846px`、`.practice-question-layout=846px`、`.practice-term-panel=744px`、页脚 `y=906` 均一致，双方各 3 个选项且无浏览器错误；证据 `replication-evidence/round-2026-09-21/practice-parity-1/`。
- `$env:VIBEHUB_BASE_URL='http://127.0.0.1:5174'; node scripts/audit-anti-ai-parity.mjs`：通过中英文桌面/移动共 4 对页面，三组卡片数量与区块高度误差在阈值内，无横向溢出或浏览器错误。
- `$env:VIBEHUB_BASE_URL='http://127.0.0.1:5174'; npm run audit:extended`：通过 4 个结构化详情的桌面对照（HTML/DNS/Typography/Terminal）；脚本默认聚焦本轮桌面交付，若需运行遗留移动基线可设置 `VIBEHUB_AUDIT_MOBILE=1`，当前移动详情仍保留既有代码但不作为本轮新增适配范围。
- `$env:VIBEHUB_BASE_URL='http://127.0.0.1:5174'; npm run test:demos`：通过 644 个双语术语详情，Catalog 256 / DH 154 / Reference 212 / Advanced 14 / Other 8，`failures=0`。审计脚本已增加 React 挂载等待，避免把空壳 DOM 误判为页面失败。
- `$env:VIBEHUB_BASE_URL='http://127.0.0.1:5174'; npm run test:catalog`：通过 AI/Product 目录结构和无 iframe/溢出检查。
- `$env:VH_LOCAL='http://127.0.0.1:5174'; npm run audit:runtime-parity`：通过 HTML 答题/调查/滚动、Button 场景和 API 六步流程，`runtimeParityPassed=true`、`diagnosticsPassed=true`。
- `$env:VIBEHUB_BASE_URL='http://127.0.0.1:5174'; npm run test:courses:mobile`：通过既有 390px 课程 smoke（9 章和 2 个概览入口）；本轮没有新增移动端样式。
- `node scripts/measure-skill-page.mjs /en/vibehub-skill`（5174）：hero/install/rewrite 与原站几何对齐；本地 main 高度约 2337px、原站 2337.1px。
- `node scripts/diff-png.mjs replication-evidence/round-2026-09-21/skill-parity-3/original.png replication-evidence/round-2026-09-21/skill-parity-3/local.png`：像素 mismatch 2.862%；主要来自共享 Header/Footer、Tabler 图标/浏览器演示局部 glyph 与字体抗锯齿，已保留差异图，未用截图替代 DOM。
- `node scripts/compare-lab-page.mjs replication-evidence/round-2026-09-21/lab-parity-8`：全页尺寸一致，像素 mismatch 0.724%；残余主要来自共享 Header、图标 glyph 与字体抗锯齿，产品预览主体已对齐。
- `node scripts/probe-learning-lab.mjs`：通过；Option B、优先级、滑块、3 项检查、完成态和 `Copied ✓` 均验证，errors=[]。
- `npm run test:legacy`（5174）：13/24 通过；11 条失败来自仓库内旧断言（历史 Frontend 137 条与 Changelog 22 条、旧 `.catalog-html-layout`/`.source-extended-*`/`.survey-panel` 选择器、问卷标题 role 与 survey 持久化时序、旧月份滚动定位、以及 `API flow follows the original six-state save journey` 的问卷弹层拦截），不是构建或页面运行时错误，已保留失败证据供后续更新测试基线。其中 API flow 一条经**还原本次目录预览改动后复跑仍以相同错误失败**，确认与本次改动无关：该测试的 `dismissSurvey()` 查找 `getByRole('button', { name: 'Close survey' })`，而 `Survey` 组件关闭按钮的实际 `aria-label` 是 `Skip this question`（中文为`跳过这个问题`），选择器已过时；`GlobalSurvey` 在 `/en/api`、`/api` 等词条面会在约 100ms 内以 portal 形式打开并拦截指针事件，导致 `Next` 按钮点击超时。属同一「问卷」类别的既有基线问题，非本轮回归。
- `npm run test:catalog` 已在 5174 入口通过；脚本仍保留 `.catalog-mini-demo` 结构断言，后续可再收敛为更稳定的语义化卡片/交互断言。
- `audit:copy` 仍会报告首页/Skill/Practice 的动态文案和中英文措辞差异，详见 `docs/copy-parity-latest.md`；这不是资源加载或交互错误。

## 未完成与下一步

- 首页与主题目录的主结构、卡片数量和几何已对齐；仍有卡片内部 Demo、字体、图标、局部内容密度和像素抗锯齿差异。Practice 题库数量和方向统计已与原站实时页面同步，但随机题目逐句文案会随原站状态变化。Changelog 主时间线几何已对齐，但共享 Header/Footer、侧栏图标、词条 pill 和字体抗锯齿仍贡献约 2.1% 像素差异。Skill/Lab 的主体布局已完成，但 Skill 的共享 Header/Footer 与浏览器 glyph 仍有像素差异，Lab 也保留同类抗锯齿差异。
- 新增 32 个术语已从通用壳升级为 source-shaped 可编辑详情模板并有逐页交互 smoke；网络、系统概念、运行时/依赖/版本/调用栈、Git、AI、Product、Frontend 专用场景的桌面端几何已收敛到约 2–8px 高度差。仍有原站专用 demo 的图形、卡片内容密度、部分 Anatomy/Variants 细节和字体抗锯齿差异，不能据此宣称全部页面逐像素相同。
- 当前主 bundle 仍较大（Vite 构建有 >500 kB 警告）；未作为本轮功能阻塞处理。
- Firefox/WebKit 未运行；本轮未执行公网部署、提交或推送。

## 提交前终验（2026-09-21 下午）

- 触发原因：提交前按用户要求先完成一轮全量验收。执行中另发现 `src/main.jsx` 曾被外部进程并发写入中间态（约 13:36–13:40，oxc 报 `Expected } but found Identifier`），导致当时 5181 服务全路由 500、首轮 B/C 两组验收作废；确认文件指纹稳定、无解析错误后重跑复验。
- 终验结果（单服务串行，`VIBEHUB_BASE_URL` 指向本地）：`build:vibehub` exit 0；`test:routes` 774 条 200；`test:catalog` 16/16；`test:terms` 708；`test:demos` failures=0；`test:courses` 36；`test:courses:mobile` 11；`test:practice` 328 题 + 9 组 scope；`test:special` 3 对；`test:header` 通过；`probe-extra-interactions` 32/32；`audit:topic-parity` 16 对；`audit:extended` 4 对；`audit:anti-ai` 4 对。仅 `test:legacy` 非零（13 过 / 11 败，见上）。
- `test:catalog` 首轮 4 条路由失败已定位为**原站目录预览集合演进**并修复（AI 主题新增 RAG/Fine-tuning/推理模型、移除 Context Engineering/Token/Context Window；Product 主题新增 Persona），修复与复验证据见 `docs/page-inventory.md` 末尾「目录卡片预览集合修正」一节。
- 未执行 commit/push/部署；本轮仅修改源码、样式、smoke 脚本与两份文档。
