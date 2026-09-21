# VibeHub 复刻独立核查报告（2026-09-17）

核查方式：**不采信既有文档的"已完成"结论**，全部以原站实时页面 + 本地 production build 实测为准。
核查工具：本机 Playwright Chromium，1440×1000 视口，原站 `https://vibe-hub.org` 与本地 `http://127.0.0.1:4173` 同尺寸对照。

---

## 一、进度实测数据

`npm run build` 通过（807ms）。主 JS 1866.70 kB（gzip 618.98 kB）、CSS 411.14 kB（gzip 62.14 kB）。

| 页面 | 原站页高 | 本地页高 | 原站 main 高 | 本地 main 高 | iframe |
| --- | --- | --- | --- | --- | --- |
| `/` 首页 | 17103 | 17099 | 16920 | 16916 | 0 / 0 |
| `/anti-ai-flavor` | 4319 | 4311 | 4136 | 4127 | 0 / 0 |
| `/changelog` | 7012 | 7028 | 6829 | 6721 | 0 / 0 |
| `/courses` | 1000 | 1124 | 940 | 940 | 0 / 0 |
| `/vibehub-skill` | 2287 | 2520 | 2104 | 2337 | 0 / 0 |
| `/practice` | 1123 | 1183 | 940 | 940 | 0 / 0 |
| `/en/button` | 3971 | 3959 | 3788 | 3776 | 0 / 0 |
| `/en/git` | 5042 | 5025 | 4859 | 4842 | 0 / 0 |
| `/en/api` | 2340 | 2340 | 2157 | 2157 | 0 / 0 |

主题页审计（16 对中英文入口）：卡片数量、`cardHeightTotal`、`gridTemplates` **全部一致**（如 Frontend 英文 137 张 / 42953px、Backend 62 张 / 23782px、Testing 14 张 / 5876px）。

**结论：这是一份完成度很高的复刻，不是"只有首页框架"。** 此前那份给其他 AI 的提示词（"只有首页框架和英文目录数据"）已经过时，会误导后续工作方向。真实缺口不在"页面有没有"，而在**字体/图标度量、文案逐句一致、Demo 内部视觉**这三层。

---

## 二、发现的问题（按影响排序）

### P0 — 字体与图标（"看着不像"的最大根因）

1. **全站字体栈不一致。** 原站 `body` 使用
   `-apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", "Microsoft YaHei", sans-serif`，
   本地使用 `Inter, ui-sans-serif, system-ui, …`。本地并未附带 Inter 字体文件，实际回退到 Segoe UI，导致全站字形、字宽、换行位置与原站系统性偏差。
2. **Manrope Variable 未引入。** 原站加载了该可变字体（weight 200–800），用于 6 处元素：`.vh-word-brand`（Header 品牌字标）、`.vh-word-tagline`、`.nav-skill-link.is-current`（Skill 导航项）、Footer `.footer-wordmark` 等。本地这些位置全部走系统字体。
3. **tabler-icons 图标字体未引入。** 原站用该字体渲染全站图标；本地改用自绘内联 SVG，形状与描边宽度存在可见差异（如 Agent 徽章、面包屑箭头、统计项小图标）。

### P1 — 文案逐句漂移

4. **Skill 页（实际渲染 `ImprovedSkillPageV2`）整段是旧版改写**，与原站当前文案不符。已核查出的差异包括 H1 结构、正文段、第三项统计、Agent 对话气泡、安装按钮、功能一标题与说明、面包屑名称、提示语等（本轮已全部修正，见第三节）。
5. **主题页 `<title>` 与原站不一致。** 例：原站 `/topics/frontend` 直接沿用首页标题 `VibeHub｜Vibe Coding 术语图鉴 · 用大白话找准前端、后端、AI 术语`，本地自造为 `前端 VibeCoding 术语｜VibeHub`；原站 `/en/topics/backend` 为 `Backend Terms | Visual Vibe Coding Guide · VibeHub`，本地为 `Backend Terms for Vibe Coding · VibeHub`。
6. **卡片 Demo 内部文案仍有差异。** 例：Markdown 卡原站为 `SOURCE 源码` / `RENDERED 渲染后`，本地为 `原始文档` / `渲染预览`；Git 课程卡说明行换行位置不同（源于字体度量）。

### P2 — 结构性/健康度问题

7. **Skill 页存在三套并存实现**：`SkillPage`(L885)、`ImprovedSkillPage`(L887)、`ImprovedSkillPageV2`(L895)，靠 `SkillPage = ImprovedSkillPageV2;` 在文件后段覆盖。前两套为死代码。这是本轮排查时的主要干扰源，也说明"改了没生效"类问题会反复出现。
8. **单文件过大**：`src/main.jsx` 398KB、`src/styles.css` 455KB、`src/referenceDetails.js` 970KB，且 `main.jsx` 内多行超 5000 字符。主 chunk 1866KB 超 500KB 警告，建议拆分。
9. **`interaction-inventory.md` 中"真实后端账号、云端收藏、提交投稿"标注未完成**——这是原站的服务端能力，纯静态复刻无法覆盖，应在验收口径上与"复刻"区分开。

### 本轮发现的高度差（尚未关闭）

10. `/vibehub-skill` 本地比原站高 233px，分区定位为：两个功能块 +106 / +88px、`skill-intro` +17px、`skill-install` +22px。

---

## 三、本轮已修正（全部实测验证）

| 项 | 原站值 | 修正前 | 修正后 |
| --- | --- | --- | --- |
| 全站字体栈 | 系统字体栈 | `Inter, ui-sans-serif…` | 已对齐原站 |
| 首页 `<title>` | `…术语图鉴 · 用大白话找准前端、后端、AI 术语` | 缺后半段 | 已补全 |
| 调查弹窗 | `你是在哪里了解到 VibeHub 的？`/`选择最接近的渠道即可。` | `你最早是在哪里听说…`/`选一个最接近的答案。` | 已对齐 |
| 练习页 `<title>` | `前端图解练习｜VibeHub` | `视觉练习 \| VibeHub` | 已对齐 |
| Skill `<title>` | `VibeHub Skill｜用任何 Agent 学懂 Vibe Coding 术语` | `…｜让 Agent 理解 Vibe Coding` | 已对齐 |
| Skill 面包屑 | `术语图鉴 › VibeHub Skill` | `术语目录 › …` | 已对齐 |
| Skill H1 | `让 Vibe Coding` + `表达更`+`准确`(品牌蓝) | `让模糊想法/变成清晰请求/让 Agent 理解` | 已对齐，含 `skill-hero-context`/`skill-hero-accent` 结构 |
| Skill H1 排版 | 60px / line-height 60px / letter-spacing -3.3px | 52px / 1.04 / -.075em | 已对齐 |
| Skill 正文段 | `每当你的描述可能产生歧义…并附上通俗解释和链接。` | 旧版改写 | 已对齐 |
| Skill 统计第三项 | `一句话即可开始` | `从一句话开始` | 已对齐 |
| Skill Agent 气泡 | `已经加好了：…通常叫 Tooltip（文字提示）。` | `完成。现在…` | 已对齐 |
| Skill 徽章 | `已完成` | `Done` | 已对齐 |
| Skill 提示语 | `点击术语，原地查看通俗解释` | `选择术语，在这里查看通俗解释` | 已对齐 |
| Skill 按钮 | `复制安装指令` / `复制规范后的表达` | `复制安装请求` / `复制重写请求` | 已对齐 |
| Skill 安装卡 | `Agent 会打开 GitHub 仓库并完成安装。` / `帮我安装这个仓库里的 skills/vibehub Skill。` | 旧版改写 | 已对齐 |
| Skill 功能一 | `把模糊描述改成可以直接发送的需求` / `Skill 会保留你的原意…实现方案。` | 旧版改写 | 已对齐 |

---

## 四、验证记录（本轮复跑，均通过）

- `npm run build` — 通过。
- `npm run audit:topic-parity` — 通过，16 对中英文主题入口；**字体栈改动零回归**（卡片数、卡片总高、网格模板全部一致）。
- `npm run audit:page-parity` — 通过，25 对原站/本地页面。
- `npm run test:catalog` — 通过，16 个本地化主题面。
- 逐项 diff 复核：Skill 页 title / h1 / breadcrumb / userBubble / agentBubble / bodyFont 全部 OK。

---

## 五、建议的后续批次

1. **字体与图标补齐**：引入 Manrope Variable（品牌字标、Skill 导航、Footer wordmark）与 tabler-icons，或为这 6 处元素建立等效替换；补齐浏览器窗口红/黄/绿灯等纯 CSS 细节。
2. **建立"文案一致性"脚本**：按页面抽取原站与本地可见文本做逐句 diff，输出差异清单。Skill 页的经验表明，逐条人工比对不可持续，这是达成 1:1 的关键工具。
3. **清理死代码**：删除 `SkillPage` / `ImprovedSkillPage`，保留 `ImprovedSkillPageV2` 并重命名为 `SkillPage`。
4. **关闭 Skill 页 233px 高度差**：按分区定位结果收敛两个功能块。
5. **主题页 `<title>` 对齐**（含原站 `/topics/frontend` 沿用首页标题这一类特例）。
6. **卡片 Demo 内部文案与视觉**：按主题逐张对照（当前 Frontend 6 / Backend 9 / AI 7 / Product 7 / Testing 6 / Tech Stack 6 / Design 8 / Git 6 张有预览）。
7. **自有品牌替换与公网部署**：需先确认品牌名、Logo、favicon、部署平台与账号归属。

---

## 六、核查中注意到的工具陷阱

对**同一文件并发发起多个编辑会丢失更新**：实测 4 个并发编辑有 2 个未落盘（工具仍报成功）。批量改写必须使用单次原子脚本或串行编辑，并在每次改写后回读校验。

---

## 七、追加批次：P0 字体与图标 + 文案 diff 工具

对应第五节建议的第 1、2 条。

### 已实现并已验证（P0-1 字体与图标）

| 项 | 原站实测 | 本地实测 | 结论 |
| --- | --- | --- | --- |
| `@font-face` Manrope Variable | 6 子集、200–800、`woff2-variations` | 接入 latin / latin-ext，保留原站 `unicode-range` | 已接入 |
| `@font-face` tabler-icons | `/fonts/tabler-icons-subset.woff2` | 同路径（本地 `public/fonts/`） | 已接入 |
| `.vh-logo` 字标 | `93×34` | `93×34` | 一致 |
| `.vh-word-brand` | `Vibe`+`Hub`，16px/790，宽 `62.3px` | 同 | 一致 |
| `.vh-word-tagline` | 中 `Vibe Coding 术语图鉴` / 英 `Your Vibe Coding Guide`，宽 `134.7px` | 同 | 一致 |
| `.footer-wordmark` | `310×90`、136.8px、字距 `-12.996px` | 同 | 一致 |
| 浏览器窗口灯 | `#ff6258` / `#ffbd2e` / `#28c840`，`8×8` | 同 | 一致（原为灰 `6×6 #d6dae4`） |
| Footer 社交图标 | github/x/mail/pencil-plus 15px；箭头 `14×12` | 同 | 一致 |
| 调查弹层关闭键 | `ti-x` `16×16` | 同 | 一致 |

图标码点从原站运行时 `getComputedStyle(el,'::before').content` 提取——原站 tabler CSS 受 CORS 限制无法直接读取，只能取计算值。

**未改动**：品牌名、Logo、favicon、站点名称仍待确认。新增 `VITE_SITE_BRAND_LEAD/TAIL`、`VITE_SITE_TAGLINE_ZH/EN` 只是把原站默认值做成可配置项，不等于品牌替换。

**回退**：Manrope 回退 `Avenir Next → 系统字体栈`；tabler 只在 `.ti` 元素生效；字体加载失败不会导致页面不可用或布局塌陷。

### 新增工具（P0-2）

`npm run audit:copy` —— 按页面抽取原站与本地渲染后的可见文本，逐行 LCS diff，输出"原站有/本地缺"与"本地多出"的具体句子，报告写入 `docs/copy-parity-latest.md`。覆盖中英文首页、中英文 Frontend 主题页、Skill、Practice、中文更新日志、Button 中英详情。访问前注入 `vibehub-source-survey-shown-v1` 以关掉调查弹层噪声；行列乘积过大时自动退化为集合比对。

### 该工具首批发现（未修，转 P2-2）

- 卡片标题结构不同：原站 `HTML` / `内容结构` 分两行，本地合成为 `HTML 内容结构`。
- Demo 内部文案缺失：原站 `HTML 源：1 个任务`、`+ 脚本插入节点`、`DOM 树：2 个任务`、`VibeHub · 蓝色马克杯`、`title 标识当前文档` 等本地无对应文本。
- 本地多出原站没有的文本：`body`、`main`、`button#add`、`task`、`Save changes`、`View details`、`Learn more →`、`Open the full example ↗`。
- **本地中文页混入英文且重复**：本地 `Mountain climbing on Saturday on Saturday, start early`，原站 `Hike the mountain on Saturday, start early`。这是明确缺陷，不是格式差异。

### 本批复验

`npm run build` 通过（CSS 411.14 → 421.47 kB）；`audit:topic-parity` 16/16、`audit:page-parity` 25/25、`test:catalog` 16、`test:e2e` 23/23。

### 附：两处 E2E 断言按现状更新

首页中文 title 与英文主题页容器类名（`.topic-catalog-page` → `.catalog-directory-page`）均为实现按原站演进后测试未同步，非本批新增差异；页面本身 137 张卡片、无运行时错误。

---

## 八、追加批次：中文详情页文案对齐（P0-2 的直接产物）

`audit:copy` 上线后第一件事就是用它定位 `/button` 中文详情 42.9% 的成因。

**结论：不是内容缺失，而是中文详情页仍在用自主改写的旧标签，英文详情页早已对齐原站。** 先核实原站中文标签在 `/button`、`/card`、`/upload` 三页完全一致，确认是全局标签，再做全局原子替换（含回读校验，14 类 / 44 处）：面包屑、复制按钮、引用区、判断题标题与副标题、区分区、场景区、延伸阅读、结构区、变体区、Agent prompt、Button Demo 三处文案。

结果：`/button` 一致率 **42.9% → 55.1%**。

### 剩余差异的性质变化

提升后卡住的不是文案，而是 **DOM 结构**，这是本轮最重要的判断：

| 项 | 原站 | 本地 |
| --- | --- | --- |
| H1 | `<h1>按钮<span>Button</span></h1>` | `<h1>按钮Button</h1>` |
| 别名区块 | `.alias-row`「也常被叫作 操作按钮」 | 无此区块 |
| 主描述 | `控件·用户提交`（无空格） | `控件 · 用户提交` |
| Prompt 引号 | 弯引号 `"重设密码"` | 直引号 `"重设密码"` |
| 变体名 | 主要按钮 Primary / 次要按钮 Outline … | 主要操作 / 描边 … |

也就是说：**继续靠改字符串无法再提升，必须做详情页模板级重建**。已登记为 P2-2 的第一项输入。

### 本批复验

`test:catalog` 16、`test:e2e` 23/23、`audit:topic-parity` 16/16、`audit:page-parity` 25/25、`build` 通过（CSS 421.47 kB）。

### 新增探针脚本

- `scripts/probe-detail-labels.mjs` —— 并排输出原站/本地详情页结构化文案，用于绕开 LCS diff 的错位噪声。
- `scripts/probe-fonts.mjs` / `probe-brand-icons.mjs` / `probe-tabler-css.mjs` —— 字体、品牌字标、图标码点探针。
- `scripts/verify-fonts.mjs` —— 本地字体接入回归验证（`VH_LOCAL` 可指定端口）。
- `scripts/probe-topic-titles.mjs` —— 16 个主题路由的 title 原站/本地对照。
- `scripts/measure-skill-page.mjs` —— Skill 页分区几何测量。

---

## 九、追加批次：P1-1 死代码、P2-1 主题页 title、P1-2 Skill 高度

### P1-1 Skill 死代码（已清理）

三套实现并存（`SkillPage` / `ImprovedSkillPage` / `ImprovedSkillPageV2`，后段用 `SkillPage = ImprovedSkillPageV2;` 覆盖）是本文件最大的维护陷阱。已删除前两套、V2 正式更名 `SkillPage`、删除覆盖语句，共 12 行。删除前用"函数首行 + 结束括号"做结构断言，回读校验 7 项通过。**这是第五节建议第 3 条的落地。**

### P2-1 主题页 title（16/16 一致）

改前 16 对**全部不一致**。原站规则：

| 路由 | title |
| --- | --- |
| `/topics/frontend` | 沿用首页中文标题（特例） |
| `/en/topics/frontend` | `VibeHub \| Vibe Coding Terms`（首页标题，特例） |
| 其余中文 | `<主题>术语有哪些｜Vibe Coding 可视化图解 · VibeHub` |
| 其余英文 | `<Topic> Terms \| Visual Vibe Coding Guide · VibeHub` |

**踩坑**：`topicMeta[2]`/`[5]` 是 H1 与 title 共用字段，改了会让 H1 变成 title 格式（E2E 立刻抓到）。正确做法是 H1 字段不动，title 由 `topic[1]`/`topic[4]` 构造。

### P1-2 Skill 页高度（+233 → +58.6px）

根因不是布局错，而是**本地用写死高度做对齐**：`skill-detail min-height:2337px`、功能块 `height:735px/651px`、标题 `height:179px`、rewrite 视觉区 `height:437px`、intro `min-height:596px`。原站全部是自然高度。

去掉这些写死值后：`skill-intro` 已从 596 收敛到 **579（与原站完全一致）**，block#1 735→630.7，block#2 651→583.9，install 194→184。整页 +233px → **+58.6px**（收敛 75%）。剩余 58.6px 分散在 install(+11.5)、block#2(+20.5)、block#1(+1.8)，已定位到区块，未逐项清零。

### 本批复验

`test:catalog` 16、`test:e2e` 23/23、`audit:topic-parity` 16/16、`audit:page-parity` 25/25、`build` 通过。

---

## 十、追加批次：详情页 H1 与面包屑结构

第八节判断的"必须做模板级重建"，本批做了其中结构最核心的一步。

| 项 | 原站 | 本地（改前 → 改后） |
| --- | --- | --- |
| H1 | `<h1>按钮<span>Button</span></h1>` | `按钮Button` → `<h1>按钮<span>Button</span></h1>` |
| 面包屑 | `术语图鉴›按钮` | `术语图鉴›按钮Button` → `术语图鉴›按钮` |

实现要点：中文数据里 `title` 本身就是组合名（`"按钮Button"`），英文 `title` 是 `"Button"`，因此用英文 title 做**后缀切分**。加了保护：中英同名术语（如 `Git`）切分后会得到空的中文段，此时退回整串，避免渲染出 `<h1><span>Git</span></h1>`。

`/button` 文案一致率 55.1% → **56.1%**。

### 同页剩余差异（已定位未修）

- 变体名：本地「主要操作/描边/文字/危险」，原站「主要按钮 Primary / 次要按钮 Outline / 文字按钮 Text / 危险按钮 Danger」（且中英文名同样分属两个元素）。
- 主描述：本地 `控件 · 用户提交`（带空格），原站 `控件·用户提交`。
- Prompt 引号：本地直引号，原站弯引号。
- `.alias-row`（「也常被叫作 操作按钮」）区块本地**仍缺失**——需要新增 UI，数据侧 `aliases` 已存在。

### 复验

`test:terms` **644 条双语详情全部通过**、`test:e2e` 23/23、`test:catalog` 16、`audit:page-parity` 25/25、`audit:topic-parity` 16/16、`build` 通过。

---

## 十一、追加批次：变体区与别名区块

第十节列出的「同页剩余」里，这两项是最大的缺口，本批关闭。

### 变体名（已对齐）

原站 `<div class="variant-name">主要按钮<span>Primary</span></div>`；本地是单段旧文案「主要操作」，且说明文案也是意译版本。已改为原站值 + `<span>` 英文名结构，说明文案同步对齐。

### `.alias-row`（新实现）

仓库里**根本没有 aliases 数据**——它不在 `/catalog/details/*.json` 里，而在原站的 JS chunk（`4902-*.js`）中。已提取 **224 术语 / 677 别名** 落到 `src/termAliases.js`。

一个关键发现：**同一份别名数据，中英文页展示规则不同**。
- 中文页：全部展示（`弹窗 / 模态窗 / 对话框 / 模态框 / Dialog`）
- 英文页：只展示纯 ASCII 别名，且**不显示**「也常被叫作」标签（`/en/modal` → `<div class="alias-row"><em>Dialog</em></div>`）
- 过滤后为空的术语（如 `button`）英文页完全不渲染该区块

若不做这个过滤，132 个术语的英文页会多出中文别名——这是靠实测发现的，不是猜的。

### 描述分隔符

本地 `<span class="lead-separator"> · </span>`（前后带空格）→ 原站 `·`。

### 结果

`/button` 文案一致率 **56.1% → 71.4%**（本文件第八节时为 42.9%）。复验：`test:terms` 644 条、`test:e2e` 23/23、`test:catalog` 16、`audit:page-parity` 25/25、`build` 通过。

### 新增脚本

`scripts/probe-alias-variants.mjs`（alias 与变体结构）、`probe-variant-dom.mjs`（变体区 DOM 对比）。

---

## 十二、追加批次：场景区 / Anatomy / 死代码

### 一个反直觉的实测结论：原站中英文场景数不同

| 页面 | 场景数 | 名称 |
| --- | --- | --- |
| `/button` | **2** | 登录表单提交 / 删除确认弹窗 |
| `/en/button` | **4** | Sign-in form / Delete confirmation / Empty project state / File toolbar |

原站中文只本地化了 2 个场景。本地此前两种语言都渲染 4 个 —— **多渲染也算差异**。已按语言区分。

### Anatomy：本地完全缺数据

`anatomy` 在 `referenceDetails` 中 0 处，界面用的是自造的「意图 / 控件 / 反馈」。原站数据实际在 `/catalog/details/*.json` 的 `entry.anatomy`。

已抓取 **167 术语 / 629 parts** → `src/termAnatomy.js`。渲染对齐原站：

| | 结构 |
| --- | --- |
| 原站中文 | `<button class="anat-part-trigger"><span class="idx">1</span><span class="pn">按钮本体</span><span class="pe">Button</span></button>` |
| 原站英文 | `<button class="anat-part-trigger"><span class="idx">1</span><span class="pn">Button</span></button>`（无 `pe`） |
| 两者共有 | `<div class="anat-part" data-ap="root|icon|label">` |

### 一个必须记下的坑

`SourceButtonSections` 与 `SourceButtonSectionsReplica` **同名近似的两套实现并存**，且前者是死代码（0 引用）。第一次修改 anatomy 时匹配到了单行格式的 **Sections**，而页面实际渲染的是多行格式的 **Replica** —— 表现为"渲染代码已更新、数据却是旧的"。定位方法是：查构建产物里有没有新变量名 + 查 `data-ap` 出现次数。

Sections 已删除（4931 字符），删除前做引用检查与边界校验。

### 结果

`/button` 文案一致率 **71.4% → 82.7%**（本文件第八节起点为 42.9%）。

**代价**：主 JS 1869.87 → 2159.43 kB（`termAnatomy.js` 289KB + `termAliases.js` 14KB），大 chunk 警告加剧，需要后续用动态加载拆分，不能靠继续堆进主包。

### 复验

`test:terms` 644 条、`test:e2e` 23/23、`test:catalog` 16、`audit:page-parity` 25/25、`build` 通过。
