# 交给另一个 AI 的简报（可直接整段粘贴）

---

先纠正一个错误前提。

你此前收到的提示词说：「当前项目只有首页框架和英文目录数据，大量 Demo、详情页、其他导航页面与持久化尚未完成。」

**这个前提是错的，已经过时。** 不要按「从零补齐」的方式推进——那会造成大量重复劳动，并覆盖掉已完成的部分。请先读项目里已有的 `docs/page-inventory.md`、`docs/interaction-inventory.md`、`docs/difference-log.md`，以及我新加的 `docs/independent-audit-2026-09-17.md`。

## 项目真实状态（2026-09-17 实测，非文档自述）

位置 `E:\vibe coding\网站复刻`，Vite + React + 手写 CSS，纯静态输出，`npm run build` 通过。

原站 vs 本地同尺寸（1440×1000）实测页高：

| 页面 | 原站 | 本地 |
| --- | --- | --- |
| `/` | 17103 | 17099 |
| `/anti-ai-flavor` | 4319 | 4311 |
| `/changelog` | 7012 | 7028 |
| `/en/button` | 3971 | 3959 |
| `/en/git` | 5042 | 5025 |
| `/en/api` | 2340 | 2340 |

主题页 16 对中英文入口审计：卡片数量、卡片总高（如 Frontend 137 张 / 42953px）、网格模板**全部一致**。

已有能力：354 术语 × 中英双语详情页、8 个主题页、Practice（328 题真实题库）、AI Slop、Changelog、Skill、Skill Lab、课程（产品官网 9 章 + Git 6 章）、收藏/深色模式/调查弹层持久化（已对齐原站 localStorage key）。

**结论：缺口不在「页面有没有」，而在三层——字体/图标度量、文案逐句一致、Demo 内部视觉。** 请把精力放在这三层，不要再补页面骨架。

## 本次会话已做的修改（**不要回退，不要重做**）

1. `styles.css` `:root` 全站字体栈：由 `Inter, ui-sans-serif…` 改为原站的 `-apple-system,BlinkMacSystemFont,"PingFang SC","Helvetica Neue","Microsoft YaHei",sans-serif`。
2. 首页 `<title>` 补全后缀 `· 用大白话找准前端、后端、AI 术语`。
3. 调查弹窗文案改为 `你是在哪里了解到 VibeHub 的？` / `选择最接近的渠道即可。`
4. 练习页 `<title>` 改为 `前端图解练习｜VibeHub`。
5. Skill 页 15 处文案与 H1 结构/排版对齐原站（H1 改为 `<span class="skill-hero-context">让 Vibe Coding</span><strong>表达更<span class="skill-hero-accent">准确</span></strong>`，配 60px / line-height 60px / letter-spacing -3.3px）。

以上改动已复跑 `audit:topic-parity`（16 对）、`audit:page-parity`（25 对）、`test:catalog`（16 面）全部通过，确认零回归。逐项细节见 `docs/independent-audit-2026-09-17.md`。

## 请按此顺序继续

- **P0-1 字体与图标**：原站加载了 **Manrope Variable**（用于 `.vh-word-brand`、`.vh-word-tagline`、`.nav-skill-link.is-current`、`.footer-wordmark` 等 6 处）与 **tabler-icons** 图标字体，本项目均未引入。补齐后必须复跑上述三项审计确认零回归。另补浏览器窗口红/黄/绿灯等纯 CSS 细节（本地是灰色）。
- **P0-2 建「文案一致性」脚本**：按页面抽取原站与本地可见文本做逐句 diff，输出差异清单。Skill 页的经验证明人工逐条比对不可持续，这是达成 1:1 的关键工具。
- **P1 清理死代码**：删除 `SkillPage`(L885) 与 `ImprovedSkillPage`(L887)，保留 `ImprovedSkillPageV2`(L895) 并重命名为 `SkillPage`。
- **P1 关闭 Skill 页 233px 高度差**：已定位为两个功能块 +106 / +88px、`skill-intro` +17px、`skill-install` +22px。
- **P2 主题页 `<title>` 对齐**。注意原站特例：`/topics/frontend` 直接沿用首页标题，而 `/en/topics/backend` 用自己的 `Backend Terms | Visual Vibe Coding Guide · VibeHub`。
- **P2 卡片 Demo 内部文案与视觉逐张对照**（当前有预览的卡片：Frontend 6、Backend 9、AI 7、Product 7、Testing 6、Tech Stack 6、Design 8、Git 6。例：Markdown 卡原站为 `SOURCE 源码` / `RENDERED 渲染后`，本地为 `原始文档` / `渲染预览`）。
- **P3 自有品牌替换与公网部署**：需要人工确认品牌名、Logo、favicon、部署平台、账号归属、站点名称；未确认前不要擅自决定。

## 必须保持的约束

- 以原站实时页面为唯一视觉依据，不重新设计，不用生成概念图替代原站截图。
- 禁用 iframe、整页截图、占位 Demo、无效按钮冒充完成。
- 明确区分「已实现 / 已验证 / 未完成」；构建通过 ≠ 一比一完成。
- 每批改动后复跑相关审计，保留可复跑的验证证据。
- 报告进度时给出实测数字，不要只写「已完成」。

## 三个工程陷阱（会浪费你大量时间）

1. **对同一文件并发发起多个编辑会丢失更新。** 实测 4 个并发 Edit 有 2 个未落盘，但工具仍返回成功。批量改写必须用单次原子脚本（读取 → 全部替换 → 写入 → 回读校验），或严格串行编辑。
2. **`src/main.jsx` 文件后段有 `SkillPage = ImprovedSkillPageV2;` 覆盖。** 实际渲染的是 V2；修改 `SkillPage`(L885) 或 `ImprovedSkillPage`(L887) 不会有任何效果。排查「改了没生效」先查这里。
3. **`src/main.jsx` 398KB、`src/styles.css` 455KB，单行常超 5000 字符。** grep 只返回行号无法定位时，用 Node 按字符偏移切片查看，不要直接 Read 整行。

## 环境

- 本地预览：`vite preview` 端口 4173。
- 原站可直连，无需代理。
- 可用审计脚本：`audit:topic-parity`、`audit:page-parity`、`audit:extended`、`audit:anti-ai`、`audit:changelog`、`test:catalog`、`test:terms`、`test:demos`、`test:routes`。
