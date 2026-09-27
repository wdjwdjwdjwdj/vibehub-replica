# 术语内容 Schema v5（三槽位标准）

每个术语一个 JSON 文件，放 `content-system/samples/<id>.json`。
v5 依据「原站声音手册」（STYLE-GUIDE v5）把 v4 的 10 字段收敛为 **3 槽位 + 1 可选**，与主站卡片的真实渲染面一一对应。

## 注入映射（apply-to-main-site.mjs）

| JSON 字段 | 主站槽位 | 卡片标签 |
|---|---|---|
| `lang.zh.scene` | `entry.q` | 大白话场景（h3） |
| `lang.zh.explain` | `entry.a` | 一句话讲解（p） |
| `lang.zh.say` | `entry.say` | 跟 AI 说 |
| `lang.zh.quiz`（可选） | 测验页题库（第二阶段接入 startQuiz） | 不进卡片 |

v4 的 `entry.d / dp / p / ms / qz` 深度注入路径已废止，不再生成。

## 文件结构

```jsonc
{
  "id": "http",                          // kebab-case，与主站 term 对应
  "name": { "zh": "HTTP", "en": "HTTP" },
  "aliases": { "zh": ["超文本传输协议"] },
  "category": "网络与接口",               // 对齐主站分类
  "level": "入门",                        // 入门 | 进阶（与主站该词条原值一致，勿改）
  "updated": "2026-09-27",
  "lang": {
    "zh": {
      "scene": "12–24 字。q 槽位：好奇问句（？收尾）或需求陈述（。收尾），第一人称开场禁用，一个悬念",
      "explain": "40–80 字。a 槽位：定义句 + 实例枚举句（3–4 个具体项）+ 边界句（约半数词条）。禁类比，密度 ≥0.12 信息单元/字",
      "say": "40–80 字。say 槽位：首人称处境 + 具体交付物（拿 X 举例/给一小段代码/逐段指出）+ 反向约束（先别讲…/不要只给…）",
      "quiz": {                          // 可选：测验页素材，不进卡片
        "q": "场景题（给情境，不考背诵）",
        "options": ["干扰项A", "正确项B", "干扰项C"],
        "answer": 1,
        "explain": "为什么对、其余为什么错，60 字内"
      }
    },
    "en": { "同结构": "…" }              // 暂缓：中文优先，en 可整体省略，validate 仅在存在时校验
  },
  "facts": [
    { "claim": "本稿中出现的可核查断言", "source": "https://developer.mozilla.org/…" }
  ],                                      // ≥2 条，官方一手来源（MDN / 官方 docs），防编造
  "qa": { "structure_ok": true, "ai_flavor_ok": true, "reviewed": false }
}
```

## 写作规则速查（详见 STYLE-GUIDE v5）

- **scene**：现象提问，不写「你有没有」；场景罗列（A、B、C——）是被否定的 v4 写法。
- **explain**：`X 是 …：A、B、C。不/不能/而不是…`。用实例枚举替代类比；写完数信息单元 ÷ 字数 ≥ 0.12。
- **say**：模板是例外（原站仅 17/355 共用框架），逐条定制；反向约束是进阶卡的标配。
- **深度分配**：机制压进 explain；展开交给 say；独立知识点查重后并入既有词条或拆新卡；测验题进 quiz。**不建详情层，不在卡片堆料。**
