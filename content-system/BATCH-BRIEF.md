# BATCH-BRIEF · 词条批量生产委托书（v5.1）

> 给批量生产执行者（子代理/新会话）的完整作业说明。读完全文再动笔。产出物：`content-system/samples/<id>.json`，每条过 validate 门禁。

## 0. 必读文件（按序）

1. `content-system/BATCH-BRIEF.md`（本文）
2. `content-system/STYLE-GUIDE.md` — v5.1 原站声音手册（量化画像/三句解剖/禁词）
3. `content-system/SCHEMA.md` — JSON 结构
4. 分配给你的 `content-system/worklist/<分类文件>.json` — 每条词条的原站原文（term/level/q/a/say）
5. 锚样（few-shot 正例，逐字精读再动笔）：
   - `content-system/samples/http.json`（问句场景型）
   - `content-system/samples/cookie.json`（机制型）
   - `content-system/samples/text-input.json`、`content-system/samples/switch.json`（需求陈述/控件型）

## 1. 每条词条的产出（SCHEMA v5）

```jsonc
{
  "id": "<kebab-case 英文 id>",
  "name": { "zh": "<与原站 term 完全一致>", "en": "<英文名>" },
  "category": "<与原站 cat 完全一致>",
  "level": "<与原站 level 完全一致，勿改>",
  "updated": "2026-09-27",
  "lang": {
    "zh": {
      "scene": "12–24 字。好奇问句（？收尾）或需求陈述（。收尾），两种模式看分类惯例",
      "explain": "40–72 字（目标 45–65）。定义句 + 实例枚举句 + 边界句",
      "say": "40–72 字。首人称处境 + 具体交付物 + 反向约束（进阶卡必带）",
      "quiz": { "q": "场景题或辨析反例题", "options": ["A", "B", "C"], "answer": 0, "explain": "60 字内" }
    }
  },
  "facts": [ { "claim": "…", "source": "https://官方URL" }, { "…": "…" } ],
  "qa": { "structure_ok": true, "ai_flavor_ok": true, "reviewed": false }
}
```

en 语言块整体省略（中文优先，en 暂缓）。

## 2. 硬性写作规则（validate.mjs 会拦，先自查）

- scene：禁第一人称开头（你/我们/我）；一卡一悬念；场景罗列（A、B、C——）是废稿写法。
- explain：开头是定义句（术语作主语）；冒号或顿号枚举 ≥3 个具体实例；约半数词条带边界否定收尾（不/别/归/只/而不是…）。禁类比词（就像/好比/相当于/如同/不妨把）。中文弯引号“”；英文术语与中文间留空格。
- say：以「我在…/我需要…/我想…/我刚碰到…」开场；交付物具体到「拿 X 举例 / 给一小段代码 / 逐段指出 / 按步骤讲」；进阶卡必带反向约束（先别讲 X / 别用真实密钥举例 / 不要每次按键都发请求）。
- 冗余两型自查：①同一信息单元说两遍（实例句+大类句重复）；②修饰冗余（「能读进来的」「的部分」）。写完删一遍：任何半句删掉读者无损失就删。
- 拆字枚举只用于真正的复合词（环境变量=跟着环境变的量）；术语字面拆解本身已是内容时不硬拆。

## 3. facts 锚点（防编造，最严纪律）

- 每条 ≥2 个，官方一手来源。许可域名：developer.mozilla.org、web.dev、www.w3.org、react.dev、nodejs.org、modelcontextprotocol.io、各工具官方文档根域。UX/设计类词条可用 www.nngroup.com（Nielsen Norman Group）与 W3C WAI。
- **每条 URL 写进 JSON 前必须用 WebFetch 实测**（404=换）。测不通就换更稳的断言——宁可换断言，不许编 URL。三档状态记录在最终报告里：实测✓ / 跳转存活 / 未验证。
- 断言措辞必须与来源页面实际内容一致，不得加戏。

## 4. 与原站原文的关系（红线）

worklist 里的 q/a/say 是**对照物，不是素材**：信息单元清单必须全覆盖（原站有的新版必须有），再补 ≥1 个原站没有的增量（机制、边界、新实例）。**任何一句不得复用原站措辞**，概念框架（原站怎么切分讲解的）也不要照搬。

## 5. 作业流程（逐条执行，不批量起稿）

1. 读该条原文 → 列信息单元清单；
2. 精读锚样同型词条 → 写四件套（scene/explain/say/quiz）+ facts（URL 逐条实测）；
3. 六问自评：文体无违规？三句解剖齐？密度 ≥ 原站？覆盖+增量？say 三段齐？quiz 答案位置对不对？
4. 写 `content-system/samples/<id>.json` → `node content-system/validate.mjs samples/<id>.json` → 硬失败必须修，警告判断理由；
5. 下一条。

## 6. 批次级检查（全部写完后）

- **quiz 答案分布**：本批所有 answer 不得挤在同一个下标（0/1/2 大致均分）；
- 汇总报告：文件清单、validate 状态、facts 三档状态表、不确定项清单。

## 7. 禁止事项

- 只允许新建/修改 `content-system/samples/<id>.json`，不碰任何其他文件；
- 不改 main-site-upgraded/、不跑 apply、不删文件、不 git 操作。
