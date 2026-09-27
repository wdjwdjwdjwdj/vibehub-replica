# VibeHub 复刻 — 全站 1:1 一致性台账 (Parity Ledger)

> 依据原始任务硬约束：「必须明确区分已实现 / 已验证 / 未完成，不能因为构建通过就宣布一比一完成。」本台账持续维护。

## 一、本回合结论（2026-09-20 夜间）

- **P1 缺陷**：已全部修复并通过 Playwright 验证（courseById / gitChapterById 原型链污染白屏、storage SecurityError 白屏、header 在 1024px / 320px 横向溢出）。
- **路由健康**：`node scripts/route-smoke.mjs`（VIBEHUB_BASE_URL=http://127.0.0.1:5174）**710 条路由全部返回 200**，无 404 / 500 / 服务端崩溃。
- **优先级页面 `/en/html`（HTML 术语详解页）几何已 1:1**：`replication-evidence/round-2026-09-20/html/compare.txt` 显示逐段包围盒与源站误差 ≤2px（scrollHeight 5075 vs 5073），hero / lessons / usage / anatomy / variants / scenes / selector / references / footer / survey 几何一致，文本一致。
- **剩余差距（均为 cosmetic / 内容层面，非断裂）**：
  - `.source-survey` 弹层高 418 vs 408（约 10px，由选项文案换行高度差异导致，content-driven）；
  - `.breadcrumb-link` textAlign 为 start，源站为 center（视觉影响极小）；
  - nav 本地多出 "Sign in" 与语言下拉箭头（产品化选择，非 bug）；
  - **文案为意译而非逐字对齐**（local-text vs original-text 差异显著）。

- **2026-09-21 sitemap 对齐**：原站当前 sitemap 共 354 个双语术语 slug；历史本地快照缺少 32 个。新增入口已写入 `src/termExtras.js`，并在 `src/main.jsx` 中按原站真实 section 归位；32 个英文标题、中文 H1/引语和直接访问已验证。新增条目的专用 Demo/Anatomy/场景仍待后续逐页补齐。

## 一点五、2026-09-23 新增术语盘点与本轮完成范围

| 主题 | 新增术语（32 项全量） | 本轮状态 |
|---|---|---|
| Backend（11） | HTTP Status Code、Stack Trace、Timeout、Object Storage、Primary Key、Session、OAuth、Webhook、HTTP Methods、IP Address、WebSocket | 待按页面逐项专用化 |
| Git（3） | Merge Conflict、Remote Repository、Reset & Revert | 待验证已有专用详情 |
| Tech Stack（3） | Node.js、Dependency、Semantic Versioning | 待验证已有专用详情 |
| **AI（6）** | **RAG、Prompt Injection、Temperature、Fine-tuning、Reasoning Model、Agent Memory** | **本轮完成** |
| Product（6） | Scope Creep、Technical Debt、Persona、Prototype、Event Tracking、Regex | 待按页面逐项专用化 |
| Frontend（3） | Keyframe、Prefers Reduced Motion、Semantic HTML | 待按页面逐项专用化 |

### AI 核心组：已实现 / 已验证 / 已知差异

- **已实现**：上述 6 组共 12 条中英路由均使用专用页面，中文直链不再回退到通用详情壳。每页均包含原站对应的可切换专用 Demo、逐项可选的 Anatomy、Variants、可切换场景、Quick check 与中英 Agent prompt；所有内容都按术语分别编写。
- **原站证据**：`replication-evidence/round-2026-09-23/ai-core/inventory.json` 保存 12 条源站/本地 DOM、标题、控件和高度快照；`*.source.png`、`*.local.png` 保存对应全页截图。
- **交互验证**：`node scripts/verify-extra-ai-core.mjs` 已通过。报告与每条点击后截图保存于 `replication-evidence/round-2026-09-23/ai-core/interactions/`；断言包括 Demo 状态、Anatomy、Variants、场景、正确题目反馈、中文内容以及零页面/控制台错误。
- **路由与构建验证**：`npm run build:vibehub`、`node scripts/term-render-smoke.mjs`（708 条双语详情路由）和 `node scripts/route-smoke.mjs`（726 条路由）均通过；`npm run audit:original:sitemap` 复核 354 个 slug，`catalogMissing` 与 `sitemapUnknown` 均为空。
- **已知差异（明确保留）**：原站这 6 页的独立 Demo / Quick check / Prompt 高度约为 2.2–2.8k px；本地因本轮需求新增完整 Anatomy、Variants 与可切换场景，页面高度约为 3.3–3.6k px。因此这 6 页的**原站主结构与原生 Demo 已对照，扩展学习段不宣称像素级 1:1**。截图和 DOM 证据用于后续继续收敛。

## 二、页面类型清单与状态

| 类别 | 路由规模 | 布局 | 内容 | 交互 | 验证手段 | 状态 |
|---|---|---|---|---|---|---|
| 术语详情 | 354×2=708 | ✅ 代表页 /en/html；AI 核心组使用专用页 | ⚠️ 6 个 AI 新增项已完成中英专用内容，另 26 项待逐页审计 | ✅ AI 核心组逐控件验证 | compare.txt + sitemap + 2026-09-23 interaction report | 部分完成，不能宣称全量 1:1 |
| 落地/首页 | / , /en | ❓ | ❓ | ❓ | 需 chromium | 待核验 |
| 主题列表 | /topics/* (8) | ❓ | ❓ | ❓ | 需 chromium | 待核验 |
| 课程 | /courses/* | ❓ | ❓ | ❓ | 需 chromium | 待核验 |
| 练习 | /practice | ❓ | ❓ | ❓ | 需 chromium | 待核验 |
| 变更日志 | /changelog | ❓ | ❓ | ❓ | 需 chromium | 待核验 |
| 反 AI 风味 | /anti-ai-flavor | ❓ | ❓ | ❓ | 需 chromium | 待核验 |
| 技能实验室 | /vibehub-skill/lab | ❓ | ❓ | ❓ | 需 chromium | 待核验 |

## 三、验证手段与阻塞

- **几何/文本一致性**：`scripts/` + `replication-evidence/round-2026-09-20/html/`（orig-*.html、compare.txt、computed-diff.txt、interaction-report.json）。
- **行为一致性**：`scripts/audit-runtime-parity-v2.mjs` 对比 `/en/html`、`/en/button`、`/en/api` 的交互行为，写入 `RUNTIME-PARITY.json`。
- **当前浏览器能力**：本工作区 Chromium 已可启动，2026-09-23 的源站/本地截图、交互点击和路由验证均在本地完成；历史下载阻塞记录不再适用。

## 四、下一步（扩展 1:1 到全站）

1. 在可联网 / 已装 chromium 的环境跑 `audit:runtime-parity`，补齐行为一致性数据。
2. 逐页类型扩展：优先级 落地页 `/` → `/topics/frontend` → `/courses/*` → `/practice` → `/changelog`。
3. 内容：与需求方确认是否要求逐字段逐字对齐（当前为意译，属「未完成」）。

## 五、已修复 / 已知缺陷追踪

- **P1**：courseById 原型链污染白屏 ✅；gitChapterById 原型链污染白屏 ✅；storage SecurityError 白屏 ✅；header 1024/320px 横向溢出 ✅。
- **P2**：入口 chunk gzip 330KB + 首屏后 1.2s 预取 307KB termDetails（性能，未修）。
- **P3**：favicon 404（未修）；`<title>` 已改为 "VibeHub — Your Vibe Coding Guide"（本回合）。
