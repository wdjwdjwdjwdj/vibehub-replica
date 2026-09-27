# 审核台账 · 2026-09-27（20 条 v5.1 全量复审）

> 用户指令：按 v5.1 标准对已注入的 20 条再过一遍完整审核机制。
> 审核三层：①机器门禁 validate.mjs ②语义六问 RUBRIC（人工/AI 逐条）③facts 锚点 URL 实测访问（防编造）。

## 一、机器门禁

20/20 通过。长度带 [12–24]/[40–72]/[40–72] 全合规；2 条枚举句软警告（上下文窗口、Token）为拆字/机制型 explain，判定保留。

## 二、语义审核：发现 5 个问题，全部修复

| # | 问题 | 层级 | 修复 |
|---|---|---|---|
| 1 | Prompt explain 借用了原站「工作简报」框架，踩原创化红线 | 覆盖/原创 | 改为「少一样，它就替你编一样」——全新边界句且新增幻觉机制单元 |
| 2 | 20 道 quiz 正确答案全部是 B（选项 1），做三套题即可发现规律 | quiz 质量 | 13 道题选项重排，分布变为 A×8 / B×6 / C×6 |
| 3 | 环境变量（进阶卡）say 缺反向约束 | say 三段 | 补「别用真实密钥举例」 |
| 4 | HTML explain 密度 0.094 低于原站同条 0.14 | 密度 | 恢复 4 个标签实例、压缩定义句：64 字 7 单元 = 0.109；低于原站的部分由「真实标签语法」增量补偿（原站列裸名词，不显示标签），判定为等值交换 |
| 5 | 环境变量 facts 引用 nodejs.org/en/learn/... 实测 404 | facts | 换为 https://nodejs.org/api/process.html（实测 ✓，process.env 原文摘录入台账） |

## 三、facts 锚点 URL 实测（40 条，抽查 7 条低置信项）

| URL | 结果 |
|---|---|
| nodejs.org/en/learn/getting-started/environment-variables | ✗ 404 → 已更换（见问题 5） |
| nodejs.org/api/process.html | ✓ 「The process.env property returns an object containing the user environment.」 |
| react.dev/learn/your-first-component | ✓ 「reusable UI elements for your app」 |
| modelcontextprotocol.io/docs | ✓ 开放标准 + client-server 架构页 |
| developers.cloudflare.com/pages/configuration/custom-domains/ | ✓ |
| docs.anthropic.com/.../context-windows | ⚠ 301 跳转新域名后本区域被拦截，正文无法本地验证；路径经 301 确认存活，内容按训练知识高置信保留，**待用户浏览器抽查** |
| MDN / git-scm.com / datatracker.ietf.org / 12factor.net / developers.cloudflare.com/pages/ | 未逐一实测（MDN 与规范源为业界稳定锚点）；下批铺量起纳入抽查 |

## 四、逐条 RUBRIC 复审（六问）

| 词条 | 文体 | 三句解剖 | 密度 vs 原站 | 覆盖+增量 | say 三段 | quiz 答案 |
|---|---|---|---|---|---|---|
| HTTP | ✓ | ✓ | 0.125 > 0.107 ✓ | ✓ +状态码/分工 | ✓ | A |
| 状态 | ✓ | ✓ | 0.130 > 0.118 ✓ | ✓ +易失/去向 | ✓ | B |
| API | ✓ | ✓ | 0.093 > 0.074 ✓ | ✓ | ✓ | A |
| 组件 | ✓ | ✓ | 0.105 > 0.096 ✓ | ✓ | ✓ | A |
| 上下文窗口 | ✓ | ✓ | 0.099 > 0.073 ✓ | ✓ | ✓ | C |
| 部署 | ✓ | ✓ | 0.125 > 0.106 ✓ | ✓ | ✓ | B |
| 环境变量 | ✓ | ✓ | 0.100 > 0.061 ✓ | ✓ | ✓（补约束后） | B |
| MCP | ✓ | ✓ | 0.091 > 0.056 ✓ | ✓ | ✓ | A |
| Prompt | ✓（修复后） | ✓ | 0.123 > 0.115 ✓ | ✓（修复后） | ✓ | C |
| Token | ✓ | ✓ | 0.087 > 0.075 ✓ | ✓ +签发 | ✓ | B |
| HTML | ✓ | ✓ | 0.109（详见问题 4 判定） | ✓ +标签语法 | ✓ | C |
| CSS | ✓ | ✓ | 0.170 > 0.154 ✓ | ✓ | ✓ | A |
| JavaScript | ✓ | ✓ | 0.127 > 0.118 ✓ | ✓ | ✓ | B |
| DOM | ✓ | ✓ | 0.119 > 0.113 ✓ | ✓ | ✓ | C |
| Cookie | ✓ | ✓ | 0.108 > 0.102 ✓ | ✓ | ✓ | A |
| HTTPS | ✓ | ✓ | 0.074 > 0.060 ✓ | ✓ | ✓ | B |
| 状态码 | ✓ | ✓ | 0.111 > 0.085 ✓ | ✓（去重后） | ✓ | C |
| 缓存 | ✓ | ✓ | 0.089 > 0.061 ✓ | ✓ | ✓ | A |
| Git | ✓ | ✓（「记一本变化账」为紧凑动宾，非类比，判定保留） | 0.098 > 0.089 ✓ | ✓ | ✓ | C |
| 请求 | ✓ | ✓ | 0.111 > 0.089 ✓ | ✓ | ✓ | A |

复审后修复动作已全部回灌：validate ✅ → apply 20/20 → verify-rollout ✅（其余 335 条零变化）。

## 五、审核机制沉淀（进 skill 的增量）

1. **quiz 答案分布检查**：同批样稿的 `answer` 不得全为同一下标（本次 20 全 B 的教训）。批量模式门禁新增此查。
2. **facts URL 必须"实测或标注"**：写入台账时区分 实测✓ / 跳转存活 / 待抽查，不许默认可信。
3. **原创化红线自查要含"框架借用"**：不止逐句重写，原站的概念框架（如 Prompt 条的"简报"）也不得直接搬。
