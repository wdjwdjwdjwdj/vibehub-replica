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
