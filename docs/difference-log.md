# 差异清单与验收记录

## 最新批次（2026-09-21）

- **中文 Button 详情页可见文案清零**：依据实时原站 `https://vibe-hub.org/button` 与 `npm run audit:copy` 的渲染文本 diff，修复复制按钮双状态文案、中文别名与区分区标题、`＋新建项目`、`登 录`、删除确认弹窗，以及 2 个中文场景的原站措辞；中文页不再渲染原站未出现的 Selector Pro 推荐区。保留原生 React/HTML/CSS 与现有按钮、登录和删除确认交互。
  - 最终 `/button`：原站 98 行 / 本地 98 行，一致率 **100%**，缺失 0，多出 0。
  - 说明：本次以当前实时审计结果为验收依据；没有据此宣称字体、图标、几何或视觉像素级一致。

## 最新批次（2026-09-17）

- **详情页场景区 / Anatomy / Demo 文案对齐原站**：
  - **场景区**：实测发现**原站中英文场景数不同** —— 中文 `/button` 只有 2 个（登录表单提交 / 删除确认弹窗），英文 `/en/button` 有 4 个（Sign-in form / Delete confirmation / Empty project state / File toolbar）。本地两种语言都渲染 4 个且中文名是旧值。已改为：后两个场景仅在英文页渲染，前两个场景中文名对齐原站。现 `/button` 2 个、`/en/button` 4 个，均与原站一致。
  - **Anatomy**：本地原来完全没有这份数据（`anatomy` 在 `referenceDetails` 中 0 处，界面用自造的「意图/控件/反馈」）。已从原站 `/catalog/details/*.json` 抓取 **167 个术语 / 629 个 parts**（含 cn / en / desc / descEn / key），生成 `src/termAnatomy.js`。渲染改为原站结构：`.anat-part[data-ap] > .anat-part-trigger > .idx + .pn + .pe`，中文页显示 `pn + pe`（按钮本体 + Button），英文页只显示 `pn`（Button）——与原站行为一致。
  - **Button Demo 按钮**：本地「登录」→ 原站「登 录」（中间有空格）。
  - `/button` 文案一致率 **71.4% → 82.7%**。
  - **顺带清理死代码**：`SourceButtonSections`（非 Replica 版）无任何引用（`<SourceButtonSections ` 0 处），已删除 4931 字符 / 11 行。删除前做了引用检查与函数边界（以 `}` 结尾）校验。
  - 复验：`test:terms` 644 条、`test:e2e` 23/23、`test:catalog` 16、`audit:page-parity` 25/25、`build` 通过。
  - 代价：主 JS 由 1869.87 kB 增至 2159.43 kB（新增 `termAnatomy.js` 289KB + `termAliases.js` 14KB 数据），大 chunk 警告加剧，待后续用动态加载拆分。

- **详情页变体区与别名区块对齐原站**：
  - **变体名**：原站为 `<div class="variant-name">主要按钮<span>Primary</span></div>`（中英文名分属两个元素），本地原为单个旧文案「主要操作」。已改为原站值（主要按钮 / 次要按钮 / 文字按钮 / 危险按钮 / 加载与禁用）并支持 `<span>` 英文名；说明文案同步改为原站表述（「在同一操作区域留给最重要的动作」等）。
  - **新增 `.alias-row`（也常被叫作）区块**：原站结构为 `<div class="alias-row" aria-label="也常被叫作"><span>也常被叫作</span><em>操作按钮</em></div>`。仓库里原本**完全没有 aliases 数据**（`referenceDetails` 中 0 处），已从原站 catalog chunk 提取 **224 个术语 / 677 个别名**，生成 `src/termAliases.js`（含 `aliasesFor`）。新增 `AliasRow` 组件，插入 4 处详情页 H1 之后（SourceApiPage / SourceProjectRulesPage / SourceAiAgentPage / DetailPage）。
    - 按原站行为区分语言：中文页展示全部别名；英文页只展示纯 ASCII 别名（`/en/button` 因此不渲染，`/en/modal` 只显示 `Dialog` 且**无**「也常被叫作」标签）。
    - **已核实原站 Practice 的嵌入术语面板没有该区块**，故未在 `PracticeTermGuide` 中渲染（首次插入时误加了第 5 处，已移除）。
  - **描述分隔符**：本地用 `<span class="lead-separator"> · </span>`（前后带空格），原站文本为无空格的 `控件·用户提交`；已改为 `·`。
  - `/button` 文案一致率 **56.1% → 71.4%**。
  - 复验：`test:terms` 644 条、`test:e2e` 23/23、`test:catalog` 16、`audit:page-parity` 25/25、`build` 通过。
  - 同页剩余（已定位未修）：Anatomy 术语名（原站「按钮本体 Button / 文案 Label」，本地「按钮 / 标签」）、场景卡名（原站「登录表单提交 / 删除确认弹窗」，本地「登录表单 / 删除确认」）、`distinctions` 区分文案、Button Demo 的「登 录」（原站中间有空格）、Prompt 外层引号。

- **详情页 H1 与面包屑结构对齐原站**：原站为 `<h1>按钮<span>Button</span></h1>`（中英文名**分属两个元素**）且面包屑末尾为中文名（`术语图鉴›按钮`）；本地原为纯文本 `按钮Button` 与 `术语图鉴›按钮Button`。新增 `termNameZh(term)`（用英文 `title` 做后缀切分，切不出则退回整串，避免中英同名术语渲染出空的中文段）与 `DetailTitle` 组件，替换 4 处 H1 与 9 处面包屑。实测 `/button` → `<h1>按钮<span>Button</span></h1>`、`/card` → `<h1>卡片<span>Card</span></h1>`、`/git`（中英同名）自动退回 `<h1>Git</h1>`，零运行时错误；`/button` 文案一致率 55.1% → **56.1%**。
  - 同页剩余差异（已定位未修）：变体名（本地「主要操作/描边/文字/危险」，原站「主要按钮 Primary/次要按钮 Outline/文字按钮 Text/危险按钮 Danger」）；主描述空格（本地 `控件 · 用户提交`，原站 `控件·用户提交`）；Prompt 直引号 vs 原站弯引号；`.alias-row`「也常被叫作」区块本地**仍缺失**。
  - 复验：`test:terms` 644 条双语详情全部通过、`test:e2e` 23/23、`test:catalog` 16、`audit:page-parity` 25/25、`audit:topic-parity` 16/16、`build` 通过。

- **P1-1 清理 Skill 死代码**：`src/main.jsx` 曾并存三套 Skill 实现（`SkillPage` L885 / `ImprovedSkillPage` L887-893 / `ImprovedSkillPageV2` L895-904），靠 `SkillPage = ImprovedSkillPageV2;` 覆盖，前两套为死代码。已用原子脚本删除 12 行：移除旧 `SkillPage` 与 `ImprovedSkillPage`，将 V2 正式命名为 `SkillPage`，删除覆盖语句。删除前对函数首行与结束括号做了结构断言，回读校验 7 项全通过（旧实现已删、无 `ImprovedSkillPageV2` 残留、无覆盖语句、`SkillPage` 定义恰好 1 处、App 中 `<SkillPage/>` 仍可用、V2 主体内容保留）。**未误改任何实际渲染的实现**。

- **P2-1 主题页 title 对齐**：新增 `scripts/probe-topic-titles.mjs` 逐路由实测，改前 16 对**全部不一致**。原站不是统一模板：`/topics/frontend` 与 `/en/topics/frontend` 都**沿用首页标题**；其余 7 个中文为 `<主题>术语有哪些｜Vibe Coding 可视化图解 · VibeHub`，英文为 `<Topic> Terms | Visual Vibe Coding Guide · VibeHub`。已在 `CatalogDirectoryPage` 的 `usePageTitle` 中加入 frontend 特判，其余用 `topic[1]`/`topic[4]` 拼接，现 **16/16 一致**。
  - **踩坑（已修）**：`topicMeta[2]`/`[5]` 同时被用作 **H1 文本**（原站 H1 为 `Backend Terms for Vibe Coding` / `后端 VibeCoding 术语`），不能改成 title 格式。首次修改把该字段改掉后导致 2 处 E2E 断言失败，已恢复字段值并改由 `topic[1]`/`topic[4]` 构造 title。

- **P1-2 收敛 Skill 页高度差（+233px → +58.6px）**：新增 `scripts/measure-skill-page.mjs`。根因是本地用**写死高度**做对齐：`skill-detail` 有 `min-height:2337px`、两个功能块 `height:735px`/`651px`、标题 `height:179px`、rewrite 视觉区 `height:437px`、intro `min-height:596px`；而原站全是自然高度（`.skill-block` 仅 `padding-top:88px`）。已去掉这些写死值并对齐原站实测（intro 579、rewrite 视觉 399.8、install 去 `min-height`、容器改 `padding:24px 0 104px`）。
  - 结果：`skill-intro` 596→**579（完全一致）**、`skill-block#1` 735→630.7、`skill-block#2` 651→583.9、`skill-install` 194→184；子元素合计差由 232px 收敛到 33.6px，整页由 +233px 收敛到 **+58.6px**。
  - 剩余未清零：`skill-install` +11.5、`skill-block#2` +20.5、`skill-block#1` +1.8，均已定位到具体区块，需再深入各自内部排版（如 install 的 h2 字号/margin、block#2 的视觉区高度）。

- **P0 字体与图标接入（本批）**：原站 `Manrope Variable`（font-weight 200–800、`woff2-variations`）与 `tabler-icons`（`/fonts/tabler-icons-subset.woff2`）此前虽已下载到 `public/fonts/`，但 `src/styles.css` 与 `index.html` **零处引用**，属于"文件在、未接入"。已按原站运行时实测值接入：
  - 新增 3 条 `@font-face`（Manrope latin / latin-ext / tabler-icons），保留原站 `unicode-range` 与 `font-display`。
  - Header 补齐原站 `.vh-logo` 双层字标结构：`Vibe` + 强调的 `Hub`，hover 切换为 tagline（中文 `Vibe Coding 术语图鉴` / 英文 `Your Vibe Coding Guide`），容器宽度 `--vh-logo-rest:61px` → hover `--vh-logo-hover:148px`。实测本地 `.vh-logo` `93×34`、`.vh-word-brand` 宽 `62.3px`、tagline 宽 `134.7px`，**与原站完全一致**。
  - `.footer-wordmark` 补 `Manrope Variable` + `font-variation-settings:'wght' 840`；实测 `310×90`、字距 `-12.996px`，与原站一致。
  - 浏览器窗口灯由灰色 `6×6 #d6dae4` 改为原站红/黄/绿 `8×8`（`#ff6258` / `#ffbd2e` / `#28c840`）。
  - tabler-icons 补 `.ti` 基类与 18 个实际使用图标的 `:before` 码点。码点从原站运行时 `getComputedStyle(el,'::before').content` 提取——原站 tabler CSS 受 CORS 限制无法直接读取。已应用于 Footer 社交图标（brand-github / brand-x / mail / pencil-plus，15px）、链接箭头（arrow-up-right，14×12）、调查弹层关闭键（x，16×16），实测尺寸与原站一致。
  - 品牌字段改为可配置：`VITE_SITE_BRAND_LEAD/TAIL`、`VITE_SITE_TAGLINE_ZH/EN`，默认保持原站基线。**品牌名、Logo、favicon、站点名称仍待确认，未做任何替换**。
  - 回退：Manrope 回退 `Avenir Next → 系统字体栈`；tabler 只在 `.ti` 元素生效；字体加载失败不会导致页面不可用或布局塌陷。
  - 本批复验：`npm run build` 通过（CSS 411.14 → 421.47 kB）；`audit:topic-parity` 16/16、`audit:page-parity` 25/25、`test:catalog` 16、`test:e2e` 23/23。

- **P0-2 文案逐句一致性脚本上线**：新增 `npm run audit:copy`（`scripts/audit-copy-parity.mjs`）。按页面抽取原站与本地**渲染后**的可见文本，逐行 LCS diff，输出"原站有/本地缺"与"本地多出"的具体句子；访问前注入 `vibehub-source-survey-shown-v1` 消除调查弹层噪声，行列乘积过大时退化为集合比对，报告落盘 `docs/copy-parity-latest.md`。首批 9 个页面一致率：中文/英文首页 91.7%、中文/英文 Frontend 主题页 92.6%/93%、Skill 73.9%、练习页 70%、中文更新日志 95.5%、Button 英文详情 92.6%、**Button 中文详情仅 42.9%**（原站 98 行 / 本地 110 行，缺 56、多 68）。
  - 已暴露的真实缺陷（未修，转后续批次）：① 目录卡片标题原站 `HTML` / `内容结构` 为两行，本地合成一行 `HTML 内容结构`；② Demo 内部文案缺失（`HTML 源：1 个任务`、`+ 脚本插入节点`、`DOM 树：2 个任务`、`VibeHub · 蓝色马克杯`、`title 标识当前文档` 等）；③ 本地多出原站没有的 `body`/`main`/`button#add`/`task`/`Save changes`/`View details`/`Learn more →`/`Open the full example ↗`；④ **本地中文页混入英文且重复**：本地 `Mountain climbing on Saturday on Saturday, start early`，原站 `Hike the mountain on Saturday, start early`。
  - 该脚本只做审计不改页面，后续每批应以它的输出作为文案验收依据。

- **中文详情页文案对齐原站**：`npm run audit:copy` 暴露 `/button` 中文详情一致率仅 42.9%，排查后确认根因不是"缺内容"，而是**中文详情页仍在使用自主改写的旧标签，而英文详情页早已按原站对齐**（`/en/button` 92.6%）。已核实原站中文标签在 `/button`、`/card`、`/upload` 三页完全一致，属全局标签而非页面特例，遂做全局原子替换（含回读校验，14 类共 44 处）：

  | 位置 | 旧文案 | 新文案（= 原站） |
  | --- | --- | --- |
  | 面包屑 | 全部词条 | 术语图鉴 |
  | 复制按钮 | 复制 Markdown | 复制为 Markdown |
  | 引用区标题 | 你会怎么说 | 你可能会说 |
  | 判断题标题 | 快速判断 | 选择题 |
  | 判断题副标题 | 选择最佳答案 | 选择一个你认为最合适的答案 |
  | 区分区标题 | 快速判断 | 容易混淆？这样区分 |
  | 场景区标题 | 典型用法 | 典型使用场景 |
  | 延伸阅读标题 | 进一步阅读 | 延伸阅读 · 权威出处 |
  | 结构区标题 | 组成 | 组成结构 · Anatomy |
  | 变体区标题 | 变体 | 常见变体 · Variants |
  | Agent prompt | 你可以这样对 AI Agent 说 | 你可以这样告诉 AI Agent |
  | Button Demo | 创建账号 / 不可用 / 登录你的账号 | 注册新账号 / 不可点 / 登录账号 |

  `/button` 一致率由 42.9% 提升到 55.1%。复验：`test:catalog` 16、`test:e2e` 23/23、`audit:topic-parity` 16/16、`audit:page-parity` 25/25、`build` 通过。

- **中文详情页剩余差异已定位（未修，属结构层，转 P2-2）**：一致率停在 55.1% 的原因不是文案而是 DOM 结构 ——
  - 原站 H1 为 `<h1>按钮<span>Button</span></h1>`（中英文名**分属两个元素**），本地是纯文本 `<h1>按钮Button</h1>`。
  - 原站存在 `.alias-row`（「也常被叫作 操作按钮」）区块，本地**完全没有该区块**。
  - 主描述原站为无空格连接的 `控件·用户提交`，本地为 `控件 · 用户提交`。
  - 原站 Prompt 使用弯引号 `"重设密码"`，本地为直引号。
  - 变体名原站是「主要按钮 Primary / 次要按钮 Outline / 文字按钮 Text / 危险按钮 Danger / Loading & Disabled」，本地是「主要操作 / 描边 / 文字 / 危险 / Loading & Disabled」，且原站中英文名同样分属两个元素。
  这些需要详情页模板级重建，不是替换文案能解决的，已登记为下一批输入。

- 顺带修正两处**过时** E2E 断言（非本批新引入）：① 首页中文 title 上一批已按原站补全为 `VibeHub｜Vibe Coding 术语图鉴 · 用大白话找准前端、后端、AI 术语`，测试仍期望旧短标题；② 英文主题页改走 `ImprovedTopicPage` 后容器类名为 `catalog-page catalog-directory-page`，测试仍断言旧的 `topic-catalog-page`。两者均按原站/实现现状更新；页面本身 137 张卡片、无运行时错误，不是靠改断言掩盖问题。

- 已核实原站主题页 title 特例（供 P2-1 使用）：`/topics/frontend` 沿用首页中文标题 `VibeHub｜Vibe Coding 术语图鉴 · 用大白话找准前端、后端、AI 术语`；`/en/topics/frontend` 为 `VibeHub | Vibe Coding Terms`。**不能用统一模板覆盖**。

- Git 课程总览本轮从旧的通用 `practice-intro/course-grid` 改为原站真实课程壳层：固定 940px 主滚动区、课程返回入口、进度信息、6 张带“未开始”状态的章节卡和每章独立 Git 工作流 HTML/CSS 视觉；不使用课程截图、iframe 或占位 Demo。1440px 原站/本地主容器均为 `940px`，章节列表卡片结构与间距已对齐；390px 原站/本地主容器均为 `736px`，卡片均为 `116px` 且视觉隐藏，新增课程移动端 smoke 已覆盖。Git 章节内容和进入 reader 的链路保持可用；视觉字体、SVG 精度和内部课程细节仍有差异。

- 新增可复跑专项几何烟测 `npm run test:special`：直接读取原站与本地 `/en/api`、`/en/ai-agent`、`/en/project-rules`，比较 Hero、主教学区、练习、Prompt、推荐工具和参考资料的语义区块起点/高度，并拒绝 iframe。当前 3/3 通过；AI Agent 概念区起点保留 `-2px` 差异，Project Rules 主内容高度保留 `-1px` 差异，均在 2px 验收阈值内。最新构建通过，主 JS `1866.70 kB`（gzip `618.98 kB`）、CSS `411.14 kB`（gzip `62.14 kB`），仍有主 chunk 超过 500 kB 警告。

- Project Rules 特殊详情页本轮按原站真实 DOM 重排为独立原生页面：Hero、项目仓库→规则文件→Agent 行为流程、规则控制三卡、硬校验边界、Quick check/Agent prompt、Learn next、Selector Pro 和 Further reading 均保持源站顺序；原有项目仓库、AGENTS.md/CLAUDE.md、Agent behavior 状态交互继续可用。1440px 量测已对齐原站关键节点：Hero `y=149/h=347`、流程 `y=536/h=391`、规则解释 `y=974/h=236`、边界 `y=1255/h=97`、练习区 `y=1395/h=470`、推荐工具 `y=2046/h=266`、Further reading `y=2352/h=144`，本地主内容高度 `2556px`，原站 `2557px`。截图证据：`C:\Users\29688\AppData\Local\Temp\vh-source-project-rules-source-shaped.png`、`C:\Users\29688\AppData\Local\Temp\vh-local-project-rules-source-shaped.png`。字体、图标、Survey、外壳和内部交互细节仍有差异，不能宣称像素级一比一。

- API 特殊详情页本轮按原站当前 DOM 重排为独立源站形状：Hero、四区保存流程、边界说明、Quick check、Agent prompt、Selector Pro 和 Further reading 保持原站纵向顺序；原有六状态本地流程仍保留，编辑/发送/校验/写入/返回/显示状态可推进。1440px 量测已对齐原站关键节点：Hero `y=149/h=293`、流程 `y=482/h=1171`、推荐工具 `y=1699/h=266`、Further reading `y=2006/h=91`，本地主内容高度 `2157px` 与原站一致。截图证据：`C:\Users\29688\AppData\Local\Temp\vh-source-api-source-shaped.png`、`C:\Users\29688\AppData\Local\Temp\vh-local-api-source-shaped.png`。流程内部视觉、题目文案、字体、图标、Survey 和外壳仍有差异，不能按几何一致宣称一比一。

- AI Agent 特殊详情页本轮按原站 `/en/ai-agent` 的真实 DOM 重建为独立原生页面：Hero、六阶段 Agent 工作循环、工具调用轨迹、证据状态、Quick check、Agent prompt、Learn next、AI Agent/Chatbot 对比表、Bug 排查场景、Selector Pro 与 Further reading 均有对应 HTML/CSS/React 结构；左右键和阶段按钮可切换工作状态，`Start` 后显示 `Next step`。1440px 同尺寸量测已对齐原站关键节点：Hero `y=149/h=333`、工作循环 `y=520/h=681`、Quick check `y=1548/h=359`、Prompt `y=1948/h=150`、对比区 `y=2309/h=793`、Selector `y=3110/h=266`、Further reading `y=3417/h=91`，本地主内容高度 `3568px` 与原站一致。截图证据：`C:\Users\29688\AppData\Local\Temp\vh-source-ai-agent-source-shaped.png`、`C:\Users\29688\AppData\Local\Temp\vh-local-ai-agent-source-shaped.png`。内部字体、图标、Survey 外壳及动效仍有差异；这是结构/几何已验证，不代表像素级一比一或已完成自有品牌替换。

- Design Styles 截图收敛：对比原站 `/en/topics/design` 首屏后，将 Minimalism、Apple HIG、Notion Style、Bento Grid、Glassmorphism、Neo-Brutalism 的卡片预览改为更接近原站的本地 HTML/CSS 结构；Apple wallpaper 与 Glass album cover 以本地源站素材复刻，并登记到素材授权台账，未使用截图或生成图。原站实际有预览的 Design 卡片数量仍按 8 张记录，其余 16 张保持空白。局部截图已目视复核；本批次最终 `npm run test:catalog` 通过 16/16、`npm run test:e2e` 通过 23/23、390px Design 资源/溢出检查通过、`npm run audit:topic-parity` 通过 16/16、`npm run build` 通过。字体、图标、原站内部动效和素材授权仍未完成，不能宣称一比一。

- 主题目录第二批 Demo 与空白状态：重新读取原站 8 个主题入口全部卡片的 `.card-demo`，确认原站实际有结构化预览的数量为 Frontend 6、Backend 9、AI 7、Product 7、Testing 6、Tech Stack 6、Design 8、Git 6。新增 Backend 的 CDN/Port/Redirect、Product 的 MVP、AI 的 Context Window、Design 的 Swiss/Editorial 本地 HTML/CSS/React 结构；对原站 `.card-demo` 为空的其余卡片移除本地通用彩色/灰色预览，避免以占位 Demo 冒充完成。`npm run test:catalog` 通过 16 个中英文主题入口，`npm run test:e2e` 通过 23/23，390px 14 个核心入口无横向溢出和运行时错误，`npm run build` 通过。新增预览已完成结构验证，但尚未逐张完成原站/本地截图像素对比；字体、图标、Survey、卡片空白高度和外壳仍是差异，不能宣称一比一。

- Git 主题全量 Demo：重新读取原站 Git 主题 12 个卡片的真实渲染结果，将本地 `Git`、`Commit`、`Branch`、`Merge`、`Pull`、`Push`、`Clone`、`Pull Request`、`Worktree`、`Stash`、`.gitignore`、`Diff` 全部改为独立 HTML/CSS/React 结构；前九张覆盖历史时间线、版本保存、分支、合并、拉取、推送、克隆、PR 审查和 Worktree 双目录，后三张按原站实际空白预览保留空白。截图证据为 `C:\Users\29688\AppData\Local\Temp\vh-source-git-topic-after.png` 与 `vh-local-git-topic-after.png`；`npm run test:catalog` 验证 Git 双语 12 个结构，390px 中英文入口无溢出且无运行时错误，主题审计最终 `16/16` 通过。仍有字体、图标、Header/Footer、Survey 尺寸及内部视觉精度差异。

## 参考基线

- 原站入口：`https://vibe-hub.org/`、`https://vibe-hub.org/en`
- 原站路由清单来源：`https://vibe-hub.org/sitemap.xml`
- 原站规则来源：`https://vibe-hub.org/robots.txt`
- 历史本地视觉基线已归档在 Git 提交 `573dc6a`，只用于早期方向记录，不作为原站截图或页面内容替代。
- 本地实现截图：通过 Playwright Chromium 生成到系统临时目录，未写入仓库；验收依据仍是原站实时页面与对应本地截图。

## 已检查的对比点

1. 顶部导航顺序、搜索框、语言和深色模式入口。
2. 主题条、左侧分组导航、主标题和三列术语卡结构。
3. 卡片标题/描述/视觉预览/收藏入口的层级。
4. 详情页的 breadcrumb、标题、侧栏 prompt、Demo、Anatomy 和 Quick check。
5. 移动端导航换行、详情页单列、侧栏顺序和页脚双列布局。

## 当前差异

- 术语详情使用统一信息架构，并按原站 Demo 类型接入真实的 HTML/CSS/React 工作区；已抓取并接入原站 322 条英文、322 条中文条目的 quote/tagline/Quick check/Agent prompt/variants/scenes/references 数据。Component、Markdown、网站 Hero、Project Rules、JavaScript、AI Agent、Style 等代表性 Demo 已按原站结构实现，其他术语仍有更细的专用视觉 Demo、段落结构和链接差异，逐条截图差异尚未全部关闭。
- 调查弹层已按原站路由范围收紧到术语目录、主题页和术语详情；课程、Practice、AI Slop、Skill 介绍、Changelog、Lab 不显示。显示频率与服务端记录策略仍未确认。
- 原站部分术语有更细的专用视觉 Demo；当前未使用概念图或整页截图替代，只保留可操作的代码实现，因此个别 Demo 的视觉细节仍不同。
- 详情页当前已按原站主要容器模型调整为 980px 外框、916px 正文单列，并补齐顶部收藏按钮；代表性详情页的标题、引用、正文和 Demo 纵向位置已逐项测量复核，其他页面仍可能因原站专属段落数量不同而有高度差。
- 首页桌面目录的左侧起点与原站保持 216px；根据同尺寸 DOM 测量，将默认 `main` 右内边距调整为 32px，使首屏三列卡片网格宽度从 1180px 修正为原站的 1192px。标题/卡片纵向位置和字体渲染仍有少量差异。
- 课程总览、Git 工作流课程入口与产品官网 9 个章节路由已补齐为本地正文、章节目录和前后章导航；产品官网 9 章正文、43 个分节和 20 个原站图示元数据已抓取整理，并用本地 HTML/CSS 重建对比、流程、状态、抽屉和走查图示。产品官网课程首页也已按原站实际的单列 9 张章节卡片、固定滚动主容器和右侧图示几何重建；截图证据为原站 `C:\Users\29688\AppData\Local\Temp\vh-source-product-course-home-v1.png`、本地 `C:\Users\29688\AppData\Local\Temp\vh-local-product-course-home-v5.png`。图示内部细部、字体、动效和原站部分交互仍有差异。更新日志深层内容、原站实验室和外部投稿流程尚未完整接入。
- 本轮补齐产品官网课程正文中的源站术语引用：首章 4 个 `前端↗`、`最小可行产品↗`、`组件↗`、`单页滚动布局↗` 引用均可打开右侧术语详情面板，支持关闭及进入完整术语页；打开面板时本地阅读区按原站收敛为左侧约 720px、右侧 708px，移动端改为全屏面板。截图证据为原站 `C:\Users\29688\AppData\Local\Temp\vh-source-course-term-panel-v1.png`、本地 `C:\Users\29688\AppData\Local\Temp\vh-local-course-term-panel-v2.png`。本地面板复用已实现的术语指南，工具栏标题、面板内部排版与原站专属内容仍有差异，不宣称课程面板一比一完成。
- Anti-AI 页面已按原站当前目录结构重做为全宽网格背景、左侧分类锚点、三组分类标题和三列原生卡片；分类锚点可滚动到对应分组，卡片预览为本地 HTML/CSS。中文条目已在后续批次补齐到原站当前 25 条，英文入口保留 18 条；字体、图标和预览内部细节仍有差异。
- Skill 介绍页已按原站当前首屏重做为面包屑、三行主标题、Agent 对话预览、322/2/Start with one sentence 三项统计、深色安装卡、Rewrite 和 Proactive hints 区块；本轮按原站 DOM 测量修正为与原站一致的 1120px 容器、596px Hero、194px 安装卡、735/651px 两段功能区和全宽下方交互面板，并补齐重写复制按钮、主动提示双卡内容及三条说明。Tooltip、安装复制、重写复制和术语链接可用；浏览器插画仍是本地 HTML/CSS，细部字体/图标与原站不同。截图证据为原站 `C:\Users\29688\AppData\Local\Temp\vh-source-skill-current.png`、本地 `C:\Users\29688\AppData\Local\Temp\vh-local-skill-current.png`。
- 主题页已改为与原站一致的目录表面，不再使用简化长列表：顶部分类条、按主题保留或隐藏的左侧分组导航、三列术语卡、Website Sections 两列术语卡、分类切换、搜索、收藏和调查弹层均复用本地目录数据与原生 Demo。Testing、Git、Design 的原站网格为 1376px 全宽，本地已按相同分栏规则复现。
- 主题目录本轮新增原站 1440px 几何校准：`src/catalogCardHeightsByTopic.js` 保存当前原站 8 个主题、2 种语言共 644 个主题条目的实测卡片高度，`TermCard` 在桌面端按当前主题和语言选择高度；原站 `Website Sections` 分组使用 2 列 586px 卡片，本地已按分组规则复现，其他分组保持 3 列 384px。`npm run audit:topic-parity` 已逐对检查 16 个中英文主题入口，卡片数量与高度总和均通过，整页高度只保留字体/小数像素累计差异；这是当前源站快照，不代表未来源站数据自动同步。
- 更新日志已按原站的月份定位、时间线、All/Updates/New Terms 筛选和新增词汇展开实现；首屏默认显示前 12 个新增词汇，展开按钮会显示全部条目，且已补齐原站存在的 milestone summary、版本徽章、更新项图标和词条分类/悬浮标题。1440px DOM 复核显示正文列宽与原站一致，前后条目累计纵向误差约 7px，字体渲染、图标路径和词条卡片细部仍有差异。
- Button 详情的 Demo 已替换为原站同类登录面板：邮箱校验、登录成功、密码重置和创建账号均有可见反馈；Hero 右侧已替换为独立 HTML/CSS 产品窗口，不再使用文字占位。二者仍与原站插图细节、字体和间距存在差异。
- Button 与 Git 详情已修正原站阅读顺序：Quick Check 位于 Demo 之后、正文知识区块之前，并避免通用详情模板在页面末尾重复渲染；原站 Button 当前测得 Quick Check 起点约为 `y=706`，本地约为 `y=721`。本地仍与原站存在 Quick Check 卡片样式、Agent prompt 位置、专属 Anatomy/Variants/Use cases/selector/references 区块和整页高度差异；当前仅将该顺序作为已验证差异收敛，不宣称详情页一比一完成。截图证据为原站 `C:\Users\29688\AppData\Local\Temp\vh-source-button-current-structure.png`、本地 `C:\Users\29688\AppData\Local\Temp\vh-local-button-current-structure.png`。
- 本轮继续把 Button/Git 的原站专属正文做成可操作本地结构：Button 按当前 DOM 对齐四个典型场景、Anatomy、Variants 和 Selector Pro 推荐；Git 增加 When to use/When NOT to use、工作区→暂存区→本地仓库→远程仓库流程、四种历史视图、四条 Anatomy 解释和四个历史场景面板；Git 的两个用法区块已按源站 DOM 改为上下整宽布局。最新 1440px 主内容量测为 Button 原站 `3788.5px` / 本地 `3788.3px`，Git 原站 `4859px` / 本地 `4331px`；Button 已进入结构对齐阶段，Git 仍缺少原站更密集的教学图示与场景内部细节，不能按高度接近推断一比一。最新 Button 原站/本地截图为 `C:\Users\29688\AppData\Local\Temp\vh-source-button-current-v1.png`、`C:\Users\29688\AppData\Local\Temp\vh-local-button-current-v1.png`；既有 Git 对比截图为 `C:\Users\29688\AppData\Local\Temp\vh-source-button-source-sections.png`、`C:\Users\29688\AppData\Local\Temp\vh-local-button-source-sections.png`、`C:\Users\29688\AppData\Local\Temp\vh-source-git-source-sections.png`、`C:\Users\29688\AppData\Local\Temp\vh-local-git-source-sections.png`。本地导航壳层、字体、调查弹层和 Git 场景内部细节仍不同。
- 本轮新增 Upload 专属详情结构：以原站 `/en/upload` 当前页面为依据，补齐真实上传 Demo、Quick Check 与 Agent prompt、Upload/File 区分、When to use/When NOT to use、原生 Anatomy/Variants 和头像上传/客服附件/CSV 导入/媒体库四个场景卡；场景卡、文件选择和 Variant 选择均有本地状态。1440px 主内容量测为原站 `5217px` / 本地 `4966px`，页面标题已对齐为 `Upload UI Component Explained | VibeHub`。截图证据为原站 `C:\Users\29688\AppData\Local\Temp\vh-source-upload-current.png`、本地 `C:\Users\29688\AppData\Local\Temp\vh-local-upload-current.png`；原站使用更宽的独立详情壳层，本地仍复用现有详情模板，Anatomy 的标题/示意/条目内部顺序、图标、字体、上传插画和局部间距存在差异，不能按高度接近推断一比一。
- 本轮新增 Input、Modal、Card、Markdown 四个结构化详情页：按原站当前英文/中文页面勘察结果补齐 When to use/When NOT to use、Anatomy、Variants 和四个 Typical use cases 场景卡；本轮又按源站 DOM 将 When to use 与 When NOT to use 改为上下两个整宽区块，Variant 与场景操作仍使用本地 React 状态，未使用 iframe、整页截图或概念图替代。最新 1440px 主内容量测为 Input 原站 `5088px` / 本地 `5147px`、Modal 原站 `5200px` / 本地 `4820px`、Card 原站 `5230px` / 本地 `4893px`、Markdown 原站 `5342px` / 本地 `4947px`；四页标题已按原站对齐。截图证据：Input 原站/本地 `C:\Users\29688\AppData\Local\Temp\vh-source-input.png`、`C:\Users\29688\AppData\Local\Temp\vh-local-input.png`；Modal 原站/本地 `C:\Users\29688\AppData\Local\Temp\vh-source-modal.png`、`C:\Users\29688\AppData\Local\Temp\vh-local-modal.png`；Card 与 Markdown 同目录下对应 `vh-source-card.png`、`vh-local-card.png`、`vh-source-markdown.png`、`vh-local-markdown.png`。本地仍复用现有详情壳层，原站教学插画、内部段落密度、图标、字体与局部顺序存在明显差异，不能按高度接近推断一比一。
- Button 本轮按原站当前 DOM 重新做了结构级复核：本地保留源站的登录 Hero、Quick check、区别说明、Anatomy、Variants、四个纵向 Typical use cases、Selector Pro 推荐和 Further reading；移除重复场景集合、源站不存在的辅助按钮及 Agent prompt 复制按钮，场景动作仍由本地 HTML/CSS/React 提供反馈。1440px 主内容高度为原站 `3788.5px` / 本地 `3788.3px`，Quick check/Anatomy/Variants/Scenes/推荐工具起始位置均在约 2px 内；源站/本地截图为 `C:\Users\29688\AppData\Local\Temp\vh-source-button-current-v1.png`、`C:\Users\29688\AppData\Local\Temp\vh-local-button-current-v1.png`。本地字体、导航壳层、调查弹层和场景内部细部仍不同，Button 不能仅凭几何高度宣称一比一。
- 本轮新增 HTML、DNS、Typography、Terminal 四个源站式详情结构：保留各页原生首屏 Demo，并补齐源站可见的适用/不适用、Anatomy、Variants、四个 Typical use cases 场景卡和可操作反馈；没有使用 iframe、整页截图或概念图替代。最新 1440px 主内容量测为 HTML 原站 `4889px` / 本地 `4257px`、DNS 原站 `5162px` / 本地 `4262px`、Typography 原站 `4930px` / 本地 `4290px`、Terminal 原站 `4944px` / 本地 `4243px`；四页英文标题已按原站对齐。截图证据：`C:\Users\29688\AppData\Local\Temp\vh-source-{html|dns|typography|terminal}-extended-final.png`、本地 `C:\Users\29688\AppData\Local\Temp\vh-local-html-static-tree-v1.png` 及此前 `vh-local-{html|dns|typography|terminal}-extended-final.png`。源站使用更密集的教学插画与场景细节，本地使用独立 HTML/CSS/React 原生重建，内部图示、字体、间距和按钮数量仍有明显差异，不能按高度接近推断一比一。
- HTML 详情本轮进一步按原站首屏 DOM 收敛：将本地原先可点击的 6 个树节点和页面链接改为静态 HTML 节点/链接，补上原站箭头与层级缩进；Anatomy 下方的 4 个标记仍为真实可操作控件。该页主交互按钮数由 31 降为 24，仍与原站 11 个按钮存在专属详情区差异；不将按钮数量接近视为一比一完成。
- 本轮新增 API、AI Agent、Project Rules 三个源站式详情结构：API 使用本地请求—契约—后端—数据库流程，并补充 HTTP 200 与业务成功的边界；AI Agent 增加目标/工具/证据三项说明、Agent-vs-Chatbot 决策表和 Learn next；Project Rules 增加规则作用、硬校验边界和 Learn next。三页均保留本地 HTML/CSS/React 原生交互，未使用 iframe、整页截图或概念图替代。1440px 主内容量测为 API 原站 `2157px` / 本地 `2066px`、AI Agent 原站 `3568px` / 本地 `2988px`、Project Rules 原站 `2557px` / 本地 `2577px`。API 已按原站当前 DOM 收敛为“编辑保存、发送请求、接收校验、写入记录、返回结果、显示结果”6 状态，四个区域会随状态高亮；AI Agent/Project Rules 的段落与卡片排版也仍不同。截图证据：`C:\Users\29688\AppData\Local\Temp\vh-source-api-six-state-v1.png`、`C:\Users\29688\AppData\Local\Temp\vh-local-api-six-state-v1.png` 以及此前 `vh-source-{api|ai-agent|project-rules}-focused-final-v2.png` / `vh-local-{api|ai-agent|project-rules}-focused-final-v2.png`。三页均不能按高度接近推断一比一。
- 更新日志中文数据本轮按原站当前 DOM 补齐了 22 个里程碑的全部可见说明条目，中文页本地高度由约 `6490px` 收敛到 `7028px`，原站约 `7012px`；筛选、展开和月份定位仍保持可操作。中文主导航也补齐了原站全局可见的“课程”入口，英文导航保持当前原站不显示课程的状态。截图证据：`C:\Users\29688\AppData\Local\Temp\vh-source-zh-changelog-audit.png`、`C:\Users\29688\AppData\Local\Temp\vh-local-zh-changelog-source-data-v2.png`。剩余差异主要是条目字体渲染、容器外层 DOM、图标和少量高度累计。
- 本轮补齐了此前 59 个缺少 `demoText` 的详情 Demo：前后端/数据库保存链路、布局结构拆解、缓存/指针记录变更，以及部署、测试、并发和队列类步骤化证据面板均已接入；烟测现在明确要求每条双语详情存在 Demo。
- 本轮按原站 `git-story--*` DOM 结构补齐 Git 术语的专用故事视图：Git、Commit、Branch、Merge、Pull、Push、Clone、Pull Request、Worktree、Stash、`.gitignore`、Diff 共 12 个双语详情已脱离通用列表，分别呈现提交流、分支图、差异对照或忽略状态；与原站的图标、动画和部分节点间距仍有差异。
- 本轮补齐原站约 136 个 `dh-demo` 详情的控件、数据展示、反馈/导航和站点内容四大族独立视觉实现，并将另外 93 条原先落入通用详情分支的基础 Web、产品、AI、配置/工具链详情接入原站线索驱动的专用面板：均使用本地 HTML/CSS/React；Card 的插画资产、部分教学面板、URL 的彩色分段和尺寸仍与原站不同，未使用概念图或整页截图替代。
- 现状审计发现原站 robots 禁止抓取但实际可访问的 `/vibehub-skill/lab` 与 `/en/vibehub-skill/lab`；本地已补齐 Skill Learning Lab 的四步组合练习、方案比较、优先级选择、range 调整、结果检查、完成态和复制修改需求。其插画与原站仍是独立 HTML/CSS 实现，细节动画尚有差异。
- 自有品牌尚未替换：这是部署前的必要确认项，不在未确认时擅自决定。
- 默认语言已切换为中文：根路径、主题分类/分组、术语名与说明、中文详情标题和主要导航均走中文；`/en/*` 仍保留英文内容用于双语验收。中文标题沿用原站当前的中英并列术语命名（如“按钮Button”），不是把英文路由删除或伪装成翻译。
- 品牌配置入口已准备：`src/siteConfig.js` 与 `vite.config.js` 共同读取基础品牌字段，`VITE_SITE_INDEPENDENT=true` 时还可由 Footer 合作方/社交链接字段替换或隐藏原站外链；静态 HTML 首次响应与 React 运行时均覆盖基础元数据，默认值保持当前 VibeHub 基线。这不等于自有品牌替换完成，实际品牌值仍等待确认。
- 持久化 key 已按原站当前行为对齐：收藏读写 `vibehub:favorites` 的版本化对象，深色模式读写 `vibehub-color-mode` 的 `dark/light`，调查状态读写 `vibehub-source-survey-shown-v1` 的 `1`；旧 `vh-*` key 只作为迁移读取兼容。
- 详情 QuickCheck 已改为页面会话内状态，刷新后清空，符合原站当前行为；Practice 页复核后也已移除答案、得分和方向的额外 key，仅保留原站 `vibehub.practice.recent.v1` 最近题目记录。
- 收藏状态已提升到 App 统一状态，主题页、首页和详情页之间切换后即时同步；跨路由 smoke 已覆盖该路径。
- 尚未进行公网部署；平台、账号归属和站点名称未确认。

## 2026-09-16 最终本地截图复核

- 以 1440×1000 同尺寸分别截取原站与本地 `/en` 首页；两者标题、导航顺序、主题条、左侧目录和三列卡片骨架一致，当前本地首页内容起点约比原站高 5px。
- 本地卡片 Demo 是独立 HTML/CSS/React 实现，已能呈现浏览器、组件流程、状态、代码等真实交互预览；与原站的细节视觉仍不完全相同，不能记录为一比一已完成。
- 原站本轮首页截图：`C:\Users\29688\AppData\Local\Temp\vh-final-reference-home.png`；本地代表性详情截图：`C:\Users\29688\AppData\Local\Temp\vh-final-local-component.png`。
- 原站更新日志截图：`C:\Users\29688\AppData\Local\Temp\vh-ref-final-changelog.png`；本地更新日志截图：`C:\Users\29688\AppData\Local\Temp\vh-local-final-changelog-v2.png`。
- 本轮新增代表性截图：本地 Button `C:\Users\29688\AppData\Local\Temp\vh-local-button-v5.png`、本地 Hero `C:\Users\29688\AppData\Local\Temp\vh-local-hero-v4.png`；均以 1440×1000 viewport 生成并目视检查。Button 已移除原站不存在的 Demo 标题栏。
- 本轮新增批量 Demo 抽查截图：Backend、Skeleton、Enqueue、Hash 均保存为 `C:\Users\29688\AppData\Local\Temp\vh-local-{backend|skeleton|enqueue|hash}-v6.png`；确认这些此前缺少结构化 Demo 的页面已出现可见、可操作的独立实现。
- Backend flow 最新截图 `C:\Users\29688\AppData\Local\Temp\vh-local-backend-v8.png` 已与原站 `C:\Users\29688\AppData\Local\Temp\vh-ref-backend-v7.png` 对照；保存链路、四个阶段卡片和底部步骤导航已对齐到同类结构，但原站更细的内容密度与动画仍是差异。
- Skill Learning Lab 原站英文截图 `C:\Users\29688\AppData\Local\Temp\vh-ref-skill-lab-en.png` 与本地最新截图 `C:\Users\29688\AppData\Local\Temp\vh-local-skill-lab-en-v5.png` 已按 1440×1000 viewport 对照；首屏网格、标题、流程、产品预览和 Header 控件位置已对齐到同类结构，产品插画细节与下方练习模块仍有差异。
- 最新生产预览截图：本地首页 `C:\Users\29688\AppData\Local\Temp\vh-final-local-home-v6.png`、本地 Skill Learning Lab `C:\Users\29688\AppData\Local\Temp\vh-final-local-skill-lab-en-v6.png`，均以 1440×1000 viewport 生成并完成目视检查；截图仅作为验收证据，不参与页面渲染。
- 首页网格修正后的截图：`C:\Users\29688\AppData\Local\Temp\vh-local-home-padding-v1.png`；Playwright DOM 测量确认首个卡片为 `x=216, width=384`、网格为 `width=1192`，与原站同尺寸测量一致。
- 本轮 Git Story 对比截图：原站与本地 Git、Branch、Diff 截图保存在 `C:\Users\29688\AppData\Local\Temp\vh-ref-git-story-{git|branch|diff}.png`、`C:\Users\29688\AppData\Local\Temp\vh-local-git-story-{git|branch|diff}-v3.png`，已目视确认专用结构生效，并将图标/动画/间距列为剩余差异。
- 本轮新增原站/本地代表性详情对比截图：HTML、DNS、Provider、User Story、AI Application Basics 分别保存在 `C:\Users\29688\AppData\Local\Temp\vh-original-{html|dns|provider|user-story|ai-basics}-v1.png` 与 `C:\Users\29688\AppData\Local\Temp\vh-final-{html|dns|provider|user-story|ai-basics}-v4.png`；结构已按原站同类教学面板对齐，但文字密度、图标、动画和下方正文节奏仍有差异。
- 产品官网课程首页新增原站/本地截图：`C:\Users\29688\AppData\Local\Temp\vh-source-product-course-home-v1.png`、`C:\Users\29688\AppData\Local\Temp\vh-local-product-course-home-v5.png`；1440×1000 下实测对齐固定滚动容器、1080px 主栏、标题/CTA 纵向位置、9 张单列章节卡片和右侧 280×158 教学视觉区域，卡片内部图示仍为独立 HTML/CSS 重建。
- 课程总览最新原站/本地截图：`C:\Users\29688\AppData\Local\Temp\vh-original-current-courses.png`、`C:\Users\29688\AppData\Local\Temp\vh-local-current-courses-v3.png`；本地已对齐原站 1080px 横向双卡、卡片尺寸、纵向间距和右侧教学视觉区域，右侧插图仍为独立 HTML/CSS，未复用原站整页或截图资源。
- Anti-AI 最新原站/本地截图：`C:\Users\29688\AppData\Local\Temp\vh-original-current-anti-ai-v2.png`、`C:\Users\29688\AppData\Local\Temp\vh-local-current-anti-ai-v2.png`；已目视检查首屏网格、分类锚点、标题层级、卡片三列和原生预览结构。
- Skill 最新原站/本地截图：`C:\Users\29688\AppData\Local\Temp\vh-original-current-skill-v2.png`、`C:\Users\29688\AppData\Local\Temp\vh-local-current-skill-v2.png`；已目视检查面包屑、分栏 Hero、Agent 对话框、安装卡和功能区起点。
- Changelog 最新原站/本地截图：`C:\Users\29688\AppData\Local\Temp\vh-source-changelog-current.png`、`C:\Users\29688\AppData\Local\Temp\vh-local-changelog-current.png`；已补齐原站式时间线圆点/竖线、版本徽章、milestone summary、更新项图标、侧栏统计卡边界和 12 条词条预览，筛选、月份锚点和词条展开保持可用。
- 主题页最新原站/本地截图：`C:\Users\29688\AppData\Local\Temp\vh-source-topic-current.png`、`C:\Users\29688\AppData\Local\Temp\vh-local-topic-current.png`；已目视检查分类条、分组侧栏、三列卡片、Website Sections 两列卡片、调查弹层和移动端溢出约束。截图中的 Demo 仍是本地 HTML/CSS/React 重建，内部插画与原站不宣称一比一。
- 产品官网章节最新原站/本地截图：第 1 章原站 `C:\Users\29688\AppData\Local\Temp\vh-original-current-course-ch1-v2.png`、本地 `C:\Users\29688\AppData\Local\Temp\vh-local-current-course-ch1-v4.png`；第 2 章原站 `C:\Users\29688\AppData\Local\Temp\vh-original-course-02.png`、本地 `C:\Users\29688\AppData\Local\Temp\vh-local-course-02-v4.png`。已目视检查左侧章节目录、800px 主文栏、标题/摘要、分节正文和原生 HTML/CSS 图示；本地图示已对齐同类信息结构，但图示内部细部、字体、动效和部分间距仍不同。
- Practice 最新原站/本地截图：初始态 `C:\Users\29688\AppData\Local\Temp\vh-original-current-practice-v2.png`、`C:\Users\29688\AppData\Local\Temp\vh-local-current-practice-v7.png`，答对态 `C:\Users\29688\AppData\Local\Temp\vh-original-practice-correct-v1.png`、`C:\Users\29688\AppData\Local\Temp\vh-local-practice-correct-v8.png`；本地已对齐原站当前的 20px 外边距、735/665 双栏、940px 练习区、601×760 术语面板、随机选题、答错重选、答对禁用选项和完整术语指南嵌入，并接入原站实时 `lessonPractice` 的 328 条双语题目及 9 个方向题量（Frontend 139、Backend 70、Product 25、Testing 14、Tech Stack 20、AI 43、Git 15、Design Styles 2）。连续题目审计确认原站 `vibehub.practice.recent.v1` 保留最近 12 条，本地已对齐该上限；复核确认答案、得分和方向选择仅保持当前会话状态，不额外制造原站未观察到的 key。
- 原站与本地在新浏览器上下文的术语目录/详情页都会显示调查弹层；课程总览抽查确认两者均不显示，剩余差异主要是渠道图标路径与投放频率。
- 最新调查弹层复核截图：本地 `C:\Users\29688\AppData\Local\Temp\vh-local-current-survey-icons.png`；已补齐与原站同类的 7 个渠道图标、按钮排列和图标色块，图标为本地内联 SVG，仍可能与原站原始路径存在细微形状差异。
- Dh Demo 抽查截图：原站 `C:\Users\29688\AppData\Local\Temp\vh-ref-dh-{card|tag|top-nav-layout|flex|typography|url|domain}.png`；本地 `C:\Users\29688\AppData\Local\Temp\vh-local-dh-{card|tag|top-nav-layout|flex|typography|url|domain}.png`，已完成分组目视对照；结果按上条记录为结构已实现、细节未完全等同。
- 本轮控件/数据视觉复核：本地 production preview Table 截图 `C:\Users\29688\AppData\Local\Temp\vh-final-local-dh-table-prod-v3.png`；已检查详情容器、表头、行间距、状态色和移动端无横向溢出。
- 本轮站点 Demo 截图：本地 Header `C:\Users\29688\AppData\Local\Temp\vh-local-dh-header-v4.png`、FAQ `C:\Users\29688\AppData\Local\Temp\vh-local-dh-faq-v3.png`、Pricing `C:\Users\29688\AppData\Local\Temp\vh-local-dh-pricing-v3.png`；已目视检查导航分项、折叠问答和月/年价格切换。

## 验证记录

- `npm run test:e2e`：通过，23 个测试，覆盖核心流程、移动端、Frontend/Design Styles 主题目录移动端、代表性 Demo 状态变化、Changelog 筛选/summary/展开/月定位、Changelog 移动端无溢出、首要页面、产品课程首页 9 张章节卡片/9 个原生图示/首章入口、课程正文术语引用右侧详情面板、Git 课程总览进入第一章、Git 术语故事视图、Dh Demo 家族状态、控件/数据/反馈状态、站点内容状态、原站代表性教学结构、API 双语 6 状态流程、详情 QuickCheck 正确答案位置与刷新清空、Button/Git Quick Check 阅读顺序、原站 localStorage key 兼容、主题页与详情页收藏同步、首次访问不制造状态 key、Skill Lab 完整练习和调查弹层路由范围。
- `npm run test:terms`：通过，644 条中英文详情路由均在真实 Chromium 页面中渲染出 H1 和 Demo，且没有 404 页面或 iframe；脚本同时拒绝通用 `dh-generic-detail` / `reference-content-stage` fallback。
- `npm run test:demos`：通过，644 条中英文详情路由全量 Demo 家族审计通过；当前分布为 catalog 260、dh 156、reference 212、advanced 16，无 generic fallback。
- `npm run test:routes`：通过，710 个本地入口（原站 sitemap 的 677 个 URL，加上 Git 课程双语章节、Skill Lab 等本地补充入口）。
- `npm run audit:original:sitemap`：通过；原站 sitemap 当前 677 个 URL、644 条双语详情路径对应 322 个术语 slug，`catalogMissing` 与 `sitemapUnknown` 均为空；其余 33 条为首页、特殊页、主题页和产品课程路径。
- `npm run audit:page-parity`：通过；可复跑的原站/本地特殊页面结构审计逐对检查 25 个代表性入口（含 Button、Git、Upload、Input、Modal、Card、Markdown、HTML、DNS、Typography、Terminal、API、AI Agent、Project Rules）的标题、H1、主要交互数量、页面高度、404 文案和 iframe 约束；随机 Practice 题目的 H1 不做文本相等断言。产品官网课程首页的主容器高度、链接数和 H1 已与原站一致；首页、Changelog、Skill 和详情页的其他内容高度/交互数量仍明确保留为差异，审计不能替代逐条视觉截图比对。
- `npm run audit:changelog`：通过；展开后的原站/本地英文更新日志逐项核对 22 个里程碑、322 个词条链接、49 条更新说明和中文分类名，顺序与运行时错误均通过。
- `npm run audit:topic-parity`：通过；在 1440px 下逐对检查 8 个主题的中英文入口，共 16 对原站/本地页面；卡片数量、卡片高度总和、三列/Website Sections 两列/Testing-Git-Design 全宽分栏、iframe 和本地运行时错误均通过，Frontend 代表截图同步更新。
- `npm run test:courses`：通过，36 个双语产品官网/Git 课程总览与章节入口，真实 Chromium 检查 H1、章节正文、章节目录、产品章节图示和 iframe 约束。
- `npm run test:courses:mobile`：通过，产品官网 9 章在 390px 视口均有分节和原生图示，无横向溢出或运行时错误。
- `npm run test:lab`：通过，2 个双语 Skill Learning Lab 入口，真实 Chromium 检查标题、四步流程、两种方案和 iframe 约束。
- `npm run test:practice`：通过，真实 Chromium 按正确答案走完 328 道双语练习，校验 9 个方向题量、答对后相关术语解锁、题目不重复及无运行时错误。
- `node scripts/live-page-audit.mjs`：通过；在原站当前页面读取 Changelog、Anti-AI、Skill、Courses、Practice 的可见标题、按钮、链接和主要文本结构。
- `node scripts/audit-original-practice-recent.mjs`：通过；原站连续 30 道答题流程确认答错可重选、答对后选项禁用并显示完整术语指南，最近题目记录上限为 12。
- `node scripts/scrape-reference.mjs`：本轮重跑成功，英文/中文各 322 条，均无抓取错误；原站 Demo 文本各 264 条。
- `npm run scrape:course`：通过；从原站抓取产品官网 9 章、43 个分节和 20 个图示元数据，写入 `src/courseData.js`，保留可复跑边界。
- `npm run scrape:practice`：通过；从原站 `catalog/details/*.json` 提取 328 条双语 `lessonPractice`，写入 `src/practiceData.js`，并将 sitemap 新增 32 个术语纳入可复跑抓取边界。
- `npm run build`：通过；本轮 Vite 报告主 JS minified 约 1.780 MB、gzip 594.99 kB，Practice 独立 chunk 约 505.05 kB、gzip 182.63 kB，详情 QuickCheck 反馈按需 chunk 约 197.76 kB、gzip 82.65 kB，CSS 249.48 kB、gzip 39.96 kB。主包已不再包含 Practice 题库和 QuickCheck 反馈文案；主 chunk 仍超过 500 kB，部署前仍可继续拆分 `referenceDetails` 等静态数据。另用临时 `Independent Hub` 环境变量构建并检查静态 HTML 的 title、description、favicon，以及 Header/Footer 不再出现原站 Oil 外链，随后已恢复默认构建。
- `npm run preview -- --host 127.0.0.1 --port 5173`：通过；本批次复跑 E2E 23/23、课程 36 个双语入口、9 个产品课程移动端章节、710 个路由、644 条详情、644 条 Demo 家族、16 对主题页和 25 对代表性页面原站/本地 1440px 几何与截图审计；主题目录卡片总高度、Website Sections 两列规则以及 Testing/Git/Design 全宽规则已复测。更新日志中文 22 个里程碑/49 条说明、API/AI Agent/Project Rules 三页及此前 HTML/DNS/Typography/Terminal、Input/Modal/Card/Markdown、Upload、Practice、课程章节术语面板、HTML 静态结构修正和 2 个 Lab 入口均已保留验收证据。最新构建产物为 JS 1782.35 kB（gzip 595.99 kB）、CSS 253.39 kB（gzip 40.64 kB），仍有大 chunk 警告。验收后应停止本地服务并复核端口，当前公网部署仍未执行。
- 运行时错误烟测：通过；详情、课程和 Lab 批量脚本均监听 `pageerror` 与浏览器 console error，644/36/2 路由均无运行时错误；产品官网 9 章另以 390px 检查均为 `scrollWidth=390`。测试页移除 Google Fonts 外部运行时依赖，避免受限网络下的字体请求失败。
- Playwright Chromium：已检查英文首页截图、原站英文首页截图、移动端 Button 详情截图，并目视检查本地概念图与实现截图；Git Story、Dh Demo，以及 HTML/DNS/Provider/User Story/AI Application Basics 原站与本地抽查截图也已分组对照。
- Browser/IAB：当前会话未提供 Browser skill，因此按测试技能要求使用 Playwright fallback。
- 本轮 Button 批次复验（2026-09-16）：定向 Button/Git 测试通过，完整 `npm run test:e2e` 通过 23/23；`npm run audit:page-parity` 通过 25 对页面；Button 源/本地主内容高度为 `3788.5px` / `3788.3px`。`npm run build` 通过，产物 JS `1783.80 kB`（gzip `596.17 kB`）、CSS `265.64 kB`（gzip `42.51 kB`），仍有主 chunk 超过 500 kB 警告。当前未部署公网，部署平台、账号归属、站点名称和品牌素材仍待确认。
- Git 批次复验（2026-09-16）：本地/原站 1440px 主内容高度为 `4854.3px` / `4858.8px`；Hero、Quick check、Usage、Anatomy、Scenes、Selector Pro 的主要起点误差约 4px 内。完整 E2E 23/23 通过，Git 原站/本地截图为 `C:\Users\29688\AppData\Local\Temp\vh-source-git-current-v1.png`、`C:\Users\29688\AppData\Local\Temp\vh-local-git-current-v1.png`。仍保留本地页面壳层、调查弹层、字体和部分场景内部细节差异，不能仅凭高度接近宣称一比一。
- Git 最新构建复验（2026-09-16）：`npm run build` 通过，产物 JS `1787.08 kB`（gzip `596.99 kB`）、CSS `275.65 kB`（gzip `43.57 kB`），仍有主 chunk 超过 500 kB 警告；production preview 已在中文根路径与英文 Git 详情入口验证并停止。
- AI Agent 特殊详情页复验（2026-09-16）：定向回归 3/3、完整 E2E 23/23、710 路由、644 条双语详情、644 条 Demo、16 个主题入口、课程/Practice/Lab/移动端检查均通过；`npm run audit:page-parity --silent` 通过 25/25，`npm run audit:topic-parity --silent` 通过 16/16，390px `/ai-agent` 检查为 `scrollWidth=390` 且无运行时错误；最新 `npm run build` 通过，JS `1857.14 kB`（gzip `617.55 kB`）、CSS `400.67 kB`（gzip `60.60 kB`），仍有主 chunk 超过 500 kB 警告。该页结构和关键几何已对齐，但字体、图标、Survey、外壳和其他页面的内部视觉仍存在差异，公网部署未执行。
- Upload 批次复验（2026-09-16）：原站/本地 1440px 主内容高度为 `5217px` / `5214.6px`；Usage、Anatomy、Variants、Scenes、Selector Pro 的主要起点已按源站 DOM 对齐，Upload 四个场景在 390px 中英文入口均无横向溢出且无 pageerror/console error。原站/本地截图为 `C:\Users\29688\AppData\Local\Temp\vh-source-upload-current-v1.png`、`C:\Users\29688\AppData\Local\Temp\vh-local-upload-current-v1.png`。定向 Upload/Button/Git 相关测试 2/2 通过；仍保留本地壳层、字体、调查弹层和局部内部图示差异。
- Upload 最新构建复验（2026-09-16）：`npm run build` 通过，产物 JS `1787.08 kB`（gzip `596.99 kB`）、CSS `279.25 kB`（gzip `43.91 kB`），仍有主 chunk 超过 500 kB 警告；`npm run audit:page-parity` 通过 25 对页面。
- 最终 production preview smoke（2026-09-16）：中文 `/`、英文 `/en/button`、`/en/git`、`/en/upload` 在 390px Chromium 下均无横向溢出与运行时错误；验收后已停止 preview，5173/4173 无残留监听。
- 结构化详情四页复核（2026-09-16）：Input、Modal、Card、Markdown 的本地 When to use/When NOT to use、Anatomy、Variants、Typical use cases 区块已按原站当前 DOM 分页测量分别设定桌面节奏；lesson、Usage、Anatomy、Variants、Scenes、Selector 的起点误差约 1px 内。原站/本地 1440px 内容终点分别为：Input `5027.7px` / `5027.7px`、Modal `5139.6px` / `5139.7px`、Card `5169.5px` / `5169.6px`、Markdown `5281.8px` / `5281.8px`（本地主容器还包含模板外层底部空间，故不以 `main` 总高度作一比一判断）。四页 Variant/场景动作仍为本地 HTML/CSS/React 状态，不使用 iframe、整页截图或概念图；原站/本地截图为 `C:\Users\29688\AppData\Local\Temp\vh-source-{input|modal|card|markdown}-current-v1.png`、`C:\Users\29688\AppData\Local\Temp\vh-local-{input|modal|card|markdown}-current-v1.png`。截图目视复核仍显示教学插画、内部卡片内容密度、字体和部分交互视觉不同，不能按几何对齐宣称一比一。
- 结构化详情四页验证（2026-09-16）：`npm run test:e2e` 通过 `23/23`；390px 中英文 `/input`、`/modal`、`/card`、`/markdown` 均为 `scrollWidth=390`、无 `pageerror`；`npm run audit:page-parity` 通过 25 对页面，Input/Modal/Card/Markdown 的标题、H1、无 404 与 iframe 约束通过，但按钮/链接数量仍与原站不同，审计不替代截图比对。`npm run build` 通过，产物 JS `1787.08 kB`（gzip `596.99 kB`）、CSS `289.50 kB`（gzip `44.72 kB`），主 chunk 超过 500 kB 警告仍存在。
- 中文表面修正（2026-09-16）：补齐根路径 `/vibehub-skill` 与 `/vibehub-skill/lab` 的中文页面标题；`/en` 对应入口保持原站英文标题。Playwright 验证四个标题值，随后再次运行 `npm run test:e2e`，23/23 通过；构建产物 JS `1787.34 kB`（gzip `597.10 kB`）、CSS `289.50 kB`（gzip `44.72 kB`）。
- Anti-AI 批次复验（2026-09-16）：`npm run audit:anti-ai` 通过，检查原站/本地中文与英文入口在 1440px、390px 下的 4 组页面；分类数量、关键本地化文案、分组高度误差（≤2px）、横向溢出和浏览器错误均通过。随后 `npm run test:e2e` 通过 `23/23`，`npm run audit:page-parity` 通过 `25` 对代表性入口，`npm run audit:topic-parity` 通过 `16` 对主题入口；`npm run build` 通过，产物 JS `1795.27 kB`（gzip `600.63 kB`）、CSS `299.98 kB`（gzip `45.79 kB`），主 chunk 超过 500 kB 警告仍存在。由于 `exact-runtime-web-mirror` 的 route lock 已创建但尚未完成 T1 capture/T2 preflight，本地批次不能标记为 exact-runtime gate 完成；公网部署仍未执行。
- 全量入口复验（2026-09-16）：在 Anti-AI 改动后顺序重跑 `npm run test:terms`，644 条双语详情路由通过；`npm run test:demos` 通过 644 条 Demo 家族审计；`npm run test:routes` 通过 710 个路由。并行启动时 `test:terms` 曾遇到一次临时 `ERR_ABORTED`，单独顺序重跑通过，未观察到可复现失败。验收后已停止本地 Vite 服务，5173/4173 均无监听。
- Anti-AI 中文化与响应式复核（2026-09-16）：重新勘察原站当前 DOM 后，将中文 `/anti-ai-flavor` 从 18 条补齐为 25 条真实条目（中文口癖 11、页面模板感 8、不好用的交互 6），补齐中文引用与卡片示例；英文入口保持原站 18 条英文条目。原站/本地桌面三组高度分别为中文 `1593.8/1593.8`、`1211.4/1211.5`、`825.4/825.5`，英文 `851.8/851.9`、`1290.5/1290.6`、`878.2/878.3`；390px 中英文四组页面均与原站分组高度误差不超过 2px，`scrollWidth` 等于视口宽度且无运行时错误。新增可复跑 `npm run audit:anti-ai`，覆盖原站/本地 1440px 与 390px 四组页面、分类数量、中文/英文关键文案、分组高度及横向溢出。当前仍有站点 Header/Footer、字体/图标、卡片内部预览细节差异；此次修正不宣称一比一完成。最新截图应以 `C:\Users\29688\AppData\Local\Temp\vh-source-anti-ai-current-v2.png`、`C:\Users\29688\AppData\Local\Temp\vh-local-anti-ai-current-v2.png` 及英文对应截图为准。
- HTML/DNS/Typography/Terminal 桌面结构复核（2026-09-16）：重新读取原站当前 DOM 后，将四个详情页的 Lesson、Usage、Anatomy、Variants、Typical use cases、Selector、References 结构按原站桌面节奏收敛。`npm run audit:extended` 已通过 8 组原站/本地页面（4 页 × 1440px/390px）；桌面端核心区块起点和高度误差约 1px 内，主内容高度为 HTML `4889.2/4900.7px`、DNS `5162.5/5173px`、Typography `4929.9/4940.4px`、Terminal `4944.2/4955.4px`。四页 Demo 与教学图示仍为独立 HTML/CSS/React，不使用 iframe、整页截图或概念图替代。390px 本批次只验证自然流布局、`scrollWidth=bodyWidth=390` 和无运行时错误；原站/本地主内容高度仍约为 HTML `6157/6913px`、DNS `6809/7043px`、Typography `6386/7111px`、Terminal `6209/6768px`，详情壳层、首屏比例和移动端纵向节奏仍未完成。截图证据：`C:\Users\29688\AppData\Local\Temp\vh-source-extended-{html|dns|typography|terminal}-current-v2.png` 与本地对应文件；截图仅用于 QA，不参与页面渲染。`exact-runtime-web-mirror` route lock 已建立，但 T1 capture/T2 preflight 尚未完成，不能标记 exact-runtime gate 通过。
- HTML/DNS/Typography/Terminal 移动端结构复核（2026-09-16）：在 390px 视口重新读取原站 DOM，并将本地首屏 lead/Demo、Quick Check、Usage、Anatomy、Variants、Typical use cases、Selector、References 的区块位置与高度收敛；`npm run audit:extended` 已固化并通过 8 组原站/本地视口。四页上述核心区块位置/高度误差均在约 `0.1px` 内，双方 `scrollWidth=bodyWidth=390` 且无 pageerror/console error；本地主容器仍比原站多约 `10px` 底部模板空间，不以总高度宣称一比一。Demo 内部字体、图标、文案密度和部分视觉细节仍与原站不同，但内容保持本地原生 HTML/CSS/React 与可操作控件。截图证据更新为 `C:\Users\29688\AppData\Local\Temp\vh-source-extended-{html|dns|typography|terminal}-mobile-current.png` 与本地对应文件；截图仅用于 QA，不参与页面渲染。`exact-runtime-web-mirror` route lock 已建立，但 T1 capture/T2 preflight 尚未完成，不能标记 exact-runtime gate 通过。
- 移动端批次验证（2026-09-16）：`npm run audit:extended` 通过；`npm run build` 通过（JS `1795.54 kB`、gzip `600.66 kB`；CSS `323.16 kB`、gzip `47.99 kB`），仍有主 chunk 超过 `500 kB` 警告。E2E 按工具时限拆分复跑：核心前 21 项 `21/21`，最后两个慢用例 `2/2`；单独执行的完整命令未在 30 秒工具窗口内返回汇总，因此不写成一次性 `23/23`。随后将 `audit:page-parity` 放入独立后台长时进程复核，当前通过 25 对 source/local 页面。
- T2_DIRECT 证据链复核（2026-09-16）：根据普通 DOM/CSS 载体重新建立 `replication-evidence/vibehub-independent-editable` 路由锁；源站 `/en/html` 在 1440x900 与 390x844 下采集 initial、hero-scroll、survey-skip、quick-answer 共 8 个基线案例，`T2-PREFLIGHT.json` 通过，`npm run check:t2` 通过。补齐本地调查弹层与 Quick Check 的跨实现语义 selector 后，`verify-editable` 8 个状态均无 pageerror、console error 或 failed response，整页尺寸与基线一致；视觉 evidence 仍为未通过，桌面 mismatch ratio 约 3.6–3.9%，移动约 8.8–8.9%，因此保留为已验证的差异而非宣称一比一。详情页面移动端 Footer 与底部空间随后按源站 DOM 修正，390px HTML 整页高度由 `6570` 收敛至 `6265`。
- exact-runtime T1 证据复核（2026-09-16）：T1 `runtime-v1`/`runtime-v2` 的 bootstrap replay 分别受第三方 Analytics POST 影响；新增逐 URL 审查排除规则后，T1 `runtime-v3` 已达到 `offlineRuntimePassed=true`、`packageIntegrityPassed=true`、`misses=0`、`pageErrors=0`、`consoleErrors=0`，但 DOM 页面没有 Canvas/动画绘制（`drawDelta=0`），工具的机器 interaction gate 仍为 false。未创建 T1 freeze marker，也未把 T1 失败写成完成；普通 DOM 项目以新的 `T2_DIRECT` 路由作为可编辑证据链。排除规则与报告保留在 `replication-evidence/reviewed-exclusions.json` 和 T1 runtime 目录。
- 主题目录 MiniVisual 批次（2026-09-16）：重新读取原站英文 `/en` 与中文 `/` 的前六个卡片 DOM，原站使用 `stack-map`、`foundation-card-visual`、`md-demo`、`html-demo` 和 `wf-css-card` 等结构；本地将原先的简化 `mini-browser`/`mini-code` 视图替换为独立 HTML/CSS/React 等价结构，并保留中文/英文文案。原站与本地 Frontend 英文首卡说明区块起点均为约 `355px`，Frontend Demo 起点均约 `423.8px`；原站/本地前六卡 Demo 高度按语言分别收敛为英文 `214/188/188/188/188/148px`、中文 `188/188/188/188/188/148px`。`npm run audit:topic-parity` 最新通过 `16/16`，新增 `npm run test:catalog` 检查中英文结构、无 iframe、无横向溢出和运行时错误。其余卡片内部 Demo、Header/Footer 字体图标及全量首屏截图仍有差异，本批次不宣称一比一完成。
- 主题目录批次最终复验（2026-09-16）：`npm run test:catalog` 通过 `2` 个本地化 Frontend 入口，受影响详情 Quick Check E2E `2/2` 通过，`npm run build` 通过；最新产物 JS `1802.03 kB`（gzip `602.21 kB`）、CSS `330.74 kB`（gzip `49.73 kB`），主 chunk 超过 `500 kB` 警告仍存在。主题审计最终输出为 `16` 个 source/local 对，中文及英文 Frontend 首屏截图分别保留在 `C:\Users\29688\AppData\Local\Temp\vh-source-topic-current-zh.png`、`vh-local-topic-current-zh.png`、`vh-source-topic-current.png`、`vh-local-topic-current.png`；截图仅用于 QA，不参与页面渲染。
- 中文首页移动端外壳批次（2026-09-16）：重新读取原站中文 `/` 在 `390×844` 下的 Header、分类条、分组标题和前六张目录卡片 DOM/CSS；本地移动端首卡位置从约 `359.2px` 收敛至 `351.2px`（原站约 `351.0px`），卡片高度从约 `328.4px` 收敛至 `321.75px`，说明字体/行高、标题区与 Demo 起点均按原站值修正。中文卡片标题补齐原站的“中文黑色 + English 品牌蓝”结构，桌面端保持原有布局。`npm run test:catalog`、详情 Quick Check E2E `2/2`、`npm run audit:topic-parity` `16/16` 与 `npm run build` 均通过；主 JS `1802.28 kB`（gzip `602.34 kB`）、CSS `331.37 kB`（gzip `49.86 kB`），大 chunk 警告仍待拆分。移动 Header 的搜索/导航细节、其余卡片内部视觉、非 Frontend 主题页和完整截图像素差异仍未完成，本批次不宣称一比一。
- 中文 Header 移动端批次（2026-09-16）：原站与本地 `390×844` 的首行 Logo 图形、搜索框、语言按钮、主题色按钮、夜间模式按钮和第二行导航均按来源 DOM 坐标收敛到 `1px` 内，实际主要坐标差约 `0.2px`；本地 `scrollWidth` 与 body 宽度一致且无运行时错误。新增可复跑 `npm run test:header`。Header 图形文件、字体/图标字形、原站导航内部 DOM 命名和中文标题元信息仍保留差异，不宣称一比一。
- 中文分类与分组导航移动端批次（2026-09-16）：重新读取原站中文首页 `390×844` 的分类 chip 与分组 rail DOM/CSS；本地分类首个 chip 的坐标已收敛到原站 `x=26,y=128.5,h=31`，分类文字与数量改为原站的原生相邻元素加 CSS gap，分组 rail 首项坐标收敛到原站 `x=16,y=192,w=70,h=34`，同时保留目录首卡原已对齐的纵向位置。`npm run test:header`、`npm run test:catalog` 与 `npm run build` 复验通过；分类文字宽度仍受本地字体度量影响约 2.8px，分组 rail 内部仍是本地链接而非原站按钮结构，保留为差异。
- 分类批次最终回归（2026-09-16）：`npm run test:e2e` 通过 `23/23`，`npm run audit:topic-parity` 通过 `16/16` 主题入口；此前一次主题审计因原站字体/资源加载时序在英文 Product 入口读到不稳定高度而失败，单独复跑后恢复通过，未将一次性失败隐藏。当前记录以复跑通过结果为准，但保留原站动态字体加载导致审计偶发波动的风险。
- 中文卡片标题字距批次（2026-09-16）：重新读取原站中文首页 `1440px/390px` 的首卡标题与 English 后缀 computed style；本地补齐后缀 `margin-left:6px`、桌面 `17px/28.9px`、移动端 `16px/21.6px` 以及标题 `letter-spacing:.1px`，移动端后缀坐标由 `x=72` 收敛到原站 `x=78.203px`，字宽与原站一致。该修正只作用于目录卡标题，不改变交互语义；仍保留本地字体文件缺失造成的整体字形差异。
- 结构化详情移动端 Hero 批次（2026-09-16）：重新读取原站 `/en/html`、`/en/dns`、`/en/typography`、`/en/terminal` 的 390px Hero DOM；本地四页标题、引用卡片、正文起点和首个 Demo 起点均按页面独立收敛，HTML `/en/html` 主内容高度为原站 `6157.2656px`、本地 `6157.5313px`，约 `0.3px` 差异。Terminal 的原站引用卡片为三行，本地单独取消四行页面共用的最小高度后，扩展区块审计恢复通过。`npm run audit:extended` 通过 `8/8` source/local viewport pairs；仍是本地原生 React/HTML/CSS，不使用 iframe、整页截图或概念图。四页 Demo 内部字体、图标、文案密度和部分视觉细节仍不同，T2 visual evidence gate 仍未通过。
- Backend 目录首批 Demo 批次（2026-09-16）：重新读取原站英文/中文 Backend 主题页前六张卡片的真实 `.card-demo` DOM，将本地 `Domain`、`DNS`、`URL`、`HTTP`、`Cookie`、`HTTPS` 的骨架预览从通用灰色占位条替换为独立 HTML/CSS 结构；包含域名搜索结果、DNS 三节点、URL 分段图例、GET/POST 请求、Cookie 会话流和 HTTPS 安全状态，英文/中文文案分别与原站当前 DOM 对齐。1440px 六张 Demo 外框约为 `334×148px`，390px 中文六张卡片位置误差约 `0.16px`、卡片高度均为 `287.5px`；新增 `test:catalog` 对中英文 Frontend/Backend 四个入口检查首六张卡的结构、无 iframe、无横向溢出和运行时错误。仍有原站字体/图标度量、Survey 弹层尺寸、Backend 其余卡片 Demo 与完整截图像素差异。
- AI 目录首批 Demo 批次（2026-09-16）：重新读取原站英文/中文 AI 主题页前六张卡片的真实 `.card-demo` DOM 与路由 ID，将本地 `AI Application Basics`、`AI Hallucination`、`Vibe Coding`、`Multimodal AI`、`Context Engineering`、`Token` 从通用灰色预览替换为独立 HTML/CSS/React 结构；分别覆盖应用/模型/工具链路、来源核验、描述-运行-观察循环、多模态输入输出、上下文保留筛选和 Token 切分。原站/本地英文截图已复核：首六张卡的 Demo 外框高度与原站约为 `228/149/228/144/144/144px`，本地首六张均无 iframe、错误或横向溢出；`npm run test:catalog` 已扩展为中英文 Frontend/Backend/AI 六个入口，`npm run audit:topic-parity` 通过 `16/16`。截图证据为 `C:\Users\29688\AppData\Local\Temp\vh-source-ai-after.png` 与 `vh-local-ai-after.png`，仅用于 QA，不参与页面渲染。其余 AI 卡片仍是本地通用 Demo，字体、图标、Survey 尺寸和完整截图像素差异仍未完成。
- Product 目录首批 Demo 批次（2026-09-16）：重新读取原站英文 Product 主题前六张 `.card-demo`，将本地 `User Story`、`Use Case`、`User Flow`、`User Journey`、`PRD`、`Product Discovery` 从通用灰色预览替换为独立 HTML/CSS/React 结构；保留原站对应的故事卡、客户/系统动作、判断分支、旅程节点、PRD 分区和验证决策链。英文原站/本地截图已目视复核，八个中英文主题入口结构 smoke 通过；`npm run test:catalog` 当前检查 Frontend/Backend/AI/Product 共 8 个本地化入口，原站/本地完整主题几何审计仍通过 `16/16`。截图证据为 `C:\Users\29688\AppData\Local\Temp\vh-source-product-after.png` 与 `vh-local-product-after.png`，仅用于 QA；原站字体、图标、Survey 尺寸、Product 其余卡片内部 Demo 和完整截图像素差异仍未完成。
- Testing 目录首批 Demo 批次（2026-09-16）：重新读取原站英文 Testing 主题前六张 `.card-demo`，将本地 `Acceptance Criteria`、`Test Case`、`Unit Test`、`Integration Test`、`Contract Testing`、`End-to-End Test` 从通用灰色预览替换为独立 HTML/CSS/React 结构；覆盖验收清单、登录失败、纯函数断言、表单/API/数据库联调、API 契约和预订确认流程。截图证据为 `C:\Users\29688\AppData\Local\Temp\vh-source-testing-after.png` 与 `vh-local-testing-after.png`；复核中修正了目录卡片通用 `p` 最小高度对验收清单内部的污染，使标题和三条验收项完整显示。`npm run test:catalog` 当前通过中英文 Frontend/Backend/AI/Product/Testing 共 10 个入口；其余 Testing 卡片仍为通用预览，字体、图标、Survey 尺寸和完整截图像素差异仍未完成。
- Tech Stack 目录首批 Demo 批次（2026-09-16）：重新读取原站 `/en/topics/technology` 的前六张 `.card-demo` 与本地 `/en/topics/stack` 映射，将 `Terminal`、`Browser DevTools`、`npm`、`Build`、`CI`、`Lint` 从通用灰色预览替换为独立 HTML/CSS/React 结构；覆盖终端启动日志、DevTools 证据面板提示、package.json/依赖目录、构建产物、CI 合并状态和 Lint 错误行。截图证据为 `C:\Users\29688\AppData\Local\Temp\vh-source-stack-after.png` 与 `vh-local-stack-after.png`，仅用于 QA，不参与页面渲染；中英文首六张结构 smoke 与 390px 无溢出检查通过。其余 Stack 卡片仍为通用预览，字体、图标、Survey 尺寸、原站 `/topics/technology` 与本地别名的部分元信息及完整截图像素差异仍未完成。
- Design Styles 目录首批 Demo 批次（2026-09-16）：重新读取原站 `/en/topics/design` 首六张 `style-preview` 的实际渲染结果与本地路由映射，将 `Minimalism`、`Apple HIG`、`Notion Style`、`Bento Grid`、`Glassmorphism`、`Neo-Brutalism` 从同一套通用 CSS 预览替换为六种独立 HTML/CSS/React 构图；分别保留极简任务页、粉色大图与侧栏、Notion 侧栏表格、Bento 瓦片、深色玻璃播放器和粗边框高阴影新闻卡的视觉语义。截图证据为 `C:\Users\29688\AppData\Local\Temp\vh-source-design-after2.png` 与 `vh-local-design-after2.png`，仅用于 QA；`npm run test:catalog` 已扩展为中英文 14 个主题入口。其余 18 个设计风格卡片仍为通用预览，字体、图标、Survey 尺寸及完整截图像素差异仍未完成。
