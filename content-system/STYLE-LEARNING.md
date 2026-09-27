# 文笔风格学习方法：调研与管线落地（STYLE-LEARNING）

> 2026-09-27。问题：怎么让 AI 稳定学会原站（或任何作者）的文笔？结论：五层方法栈，规则层和门禁层已有，补齐中间三层并写进 term-author skill。

## 一、调研结论：五层方法栈

### 1. 规则层 —— voice rubric / 风格手册

把风格拆成**可执行、可判定的条款**（长度带、句法角色、禁用项），而不是形容词（「简洁有力」）。
来源：MDN 风格指南、各公司 brand voice guide 的通行做法。
**管线现状：已有**（STYLE-GUIDE v5 = 量化画像 + 三句解剖 + say 三段语法 + 禁词清单）。

### 2. 范例层 —— few-shot 内化（最重要的补强点）

3–5 条**同分布**样稿直接喂给写作模型，比抽象规则更有效。
关键实证（[Prompt Engineering Guide](https://www.promptingguide.ai/techniques/fewshot) 引 Min et al. 2022《Rethinking the Role of Demonstrations》）：**示范的输入分布与格式比单条示范的内容正确性更重要**。迁移到写作：喂「同分类、同级别、同长度带」的样稿，比喂随机样稿或只给规则有效得多；格式（三槽位结构）必须与产出一致。
**管线现状：缺**——samples/ 里 20 条已过审 v5 稿是现成正例库，但 skill 流程从不使用。

### 3. 反例层 —— contrastive pairs

明确给出「不要写成这样」的对照物，比只说「别有 AI 味」有效。写作者社区与品牌 voice 训练的通用做法。
**管线现状：半缺**——v4 被拒稿的「死因」已特征化记录在 STYLE-GUIDE 附录与 AB-ROUND5（类比滥用、教练腔、场景罗列、长度堆料），但没有进入写作流程。

### 4. 自评层 —— self-critique loop

generate → 按 rubric 打分 → 列出 3 处最弱的具体修改 → 重写 → 复评，直到收敛。
来源：[Self-Refinement（sandgarden）](https://sandgarden.com)、[Prompt Engineering 2026 实操指南（gend.co）](https://gend.co)（「Self-evaluate using a rubric; list 3 improvements; apply them and present the revised version」）。
**管线现状：缺**——只有 validate.mjs 结构门禁，写作后的风格自评全靠临场。

### 5. 门禁层 —— programmatic checks

能机器测的不留给人眼：长度带、收尾符号、人称、禁词。测不了的（信息单元密度）降级为结构代理指标（枚举句、边界句存在性）出警告。
**管线现状：已有**（validate.mjs），本次补 3 条结构警告。

### 为什么不用微调（判断，非引用）

355 条、单条百字级，数据量远低于微调收益线；微调一次迭代小时级，规则+范例方案分钟级；且标准还在随验收演进。等标准冻结、语料 >1000 条再评估。

## 二、机制映射：方法 → 管线落点

| 方法栈 | 管线落点 | 状态 |
|---|---|---|
| 规则层 | `STYLE-GUIDE.md` v5（量化画像/三句解剖/say 语法/禁词） | 已有 |
| 范例层 | skill 新增「学样」步：按同分类同级别从 samples/ 挑 3 条正例逐字精读 | **本次新增** |
| 反例层 | skill 学样步内嵌「v4 四死因」反例清单；STYLE-GUIDE 附录 | **本次接入** |
| 自评层 | skill 新增「自评改写」步：六问 RUBRIC → 列 3 处修改 → 重写 | **本次新增** |
| 门禁层 | validate.mjs + 3 条结构警告（枚举句/边界句/say 交付物） | 已有，补强 |

## 三、term-author skill 流程变更（v2 流程）

六步改为（加粗为变更）：

1. 调研（facts 锚点，不变）
2. **学样对照**：规则 → 正例精读 → 反例特征 → 原站原文信息单元清单
3. **大纲（v5 版）**：三槽位 + quiz + 深度四出口分配
4. 起草（词典腔武器库：实例枚举 / 拆字枚举 / 辨析反例）
5. **自评改写**（吸收原「去 AI 味改写」步）：六问评分 → 列 3 处最弱 → 重写
6. 质检入库：validate.mjs（结构硬失败 + 风格警告）→ ROLLOUT 台账

工具链：ab-preview.mjs（A/B 对照）、verify-rollout.mjs（改动范围核验）、validate.mjs（门禁）。

## 来源

- Prompt Engineering Guide · Few-shot（Min et al. 2022 实证）：https://www.promptingguide.ai/techniques/fewshot
- Self-Refinement 模式：https://sandgarden.com
- Prompt Engineering 2026 实操指南（Self-Critique → Improve Loop / Voice match）：https://gend.co
- Anthropic/OpenAI 官方工程文档本次访问受限（区域拦截/403），方法论以上述公开来源与通行实践为准。
