# 起站 — 部署前全面审计报告

- 审计时间：2026-09-20
- 审计对象：`E:\vibe coding\网站复刻`，实际发布入口 `src/launchApp.jsx` → `src/launch/App.jsx`
- 构建产物：`dist/`（6 文件，636 KB）
- 审计方式：生产构建复现 + Playwright/Chromium 真实浏览器逐路由实测（本地预览 + 线上地址双重验证）
- 结论：**4 类缺陷已修复并复测通过，2 项非阻断建议保留**，站点已发布

---

## 一、审计结论速览

| 类别 | 检查范围 | 结果 |
| --- | --- | --- |
| 代码错误与运行时异常 | 11 条路由 + 恶意/边界路径 | 发现 1 处 P0 崩溃，已修复 |
| 失效链接与资源加载 | 全站链接爬取、图片/字体/JS/CSS | 通过，0 个 4xx/5xx |
| 响应式布局 | 320 / 375 / 414 / 768 / 1024 / 1440 / 1920 | 通过，无横向溢出 |
| 跨浏览器/健壮性 | localStorage 被禁用场景 | 发现 1 处 P1 白屏，已修复 |
| 安全漏洞 | XSS 向量、敏感信息、第三方依赖 | 通过，无 XSS 向量、无外部请求、无密钥泄漏 |
| 性能 | 包体积、LCP 图片、CLS、阻塞资源 | 1 项 P2 已修复，1 项 P3 建议保留 |

---

## 二、发现的问题（逐项）

### 已修复

#### F1 ｜ P0 ｜ 运行时崩溃：`/guide/<原型链属性名>` 导致整页白屏

- **现象**：访问 `/guide/constructor`、`/guide/__proto__`、`/guide/toString` 时页面完全空白。
- **实测证据**（修复前，Chromium）：
  ```
  /guide/constructor  → HTTP 200, h1=null, 可见文本 0 字符, root 子节点 0
  pageerror: Cannot read properties of undefined (reading 'map')
  ```
- **根因**：`guideById` 由 `Object.fromEntries()` 创建，继承 `Object.prototype`。当 URL 段命中 `constructor` / `toString` / `__proto__` 等继承属性时，`guideById[id]` 返回的是**真值**（函数或原型对象），绕过了 `if (!guide) return <NotFound/>` 的兜底判断，随后 `guide.steps.map(...)` 抛错；又因缺少错误边界，React 卸载整棵树 → 白屏。
- **影响**：任意访客手工构造 URL 即可让页面崩溃；若被分享出去会造成"网站坏了"的观感。
- **修复**：
  1. `src/launch/content.js` 改用**无原型对象**构建索引，并新增 `findGuide()` 用 `Object.hasOwn` 校验；
  2. `src/launch/App.jsx` 中 `GuideDetail` 增加 `Array.isArray(guide.steps)` 结构校验；
  3. 新增 `ErrorBoundary` 错误边界，任何未预料的渲染异常都显示可操作的重试页而非空白。
- **复测**：3 条路径均正常渲染 404 页，`pageerror` 数量 = 0。

#### F2 ｜ P1 ｜ 健壮性：浏览器禁用 localStorage 时应用白屏

- **现象**：Safari 无痕模式、企业隐私策略、部分隐私插件会直接抛出 `SecurityError`。
- **实测证据**（修复前，注入阻断 localStorage 的浏览器上下文）：
  ```
  STORAGE_BLOCKED → 可见文本 0 字符
  pageerror: The operation is insecure.
  ```
- **根因**：`readList()` 有 try/catch，但 `useEffect(() => localStorage.setItem(...))` 的**写入路径没有兜底**，挂载阶段即抛错并中断渲染。
- **修复**：新增 `writeList()` 将写入包在 try/catch 内，存储不可用时静默降级为"仅当前会话有效"。
- **复测**：同样上下文下页面正常渲染（可见文本 382 字符），0 异常。

#### F3 ｜ P2 ｜ 国际化 / SEO：中文站点却声明 `lang="en"`

- **影响**：屏幕阅读器会用英文音素朗读中文；搜索引擎语言判定错误；影响中文检索表现。
- **修复**：`index.html` → `<html lang="zh-CN">`。线上已确认为 `zh-CN`。

#### F4 ｜ P2 ｜ 资源 MIME 类型不符：favicon 声明 png 实为 svg

- **证据**：`<link rel="icon" type="image/png" href="/qizhan-mark.svg">`，而实际文件是 SVG。
- **影响**：部分浏览器会因类型不匹配而丢弃图标，站点标签页无图标。
- **修复**：`type` 改为 `image/svg+xml`。

#### F5 ｜ P2 ｜ 布局稳定性（CLS）：首屏图片未声明尺寸

- **证据**：`qizhan-hero.png` 固有尺寸 1448×1086，渲染尺寸 489×367，图片标签**无 `width`/`height` 属性**。
- **影响**：图片加载完成瞬间推动下方内容，产生布局偏移（CLS），移动端体感明显。
- **修复**：补 `width="1448" height="1086"` 建立固定宽高比占位；同时补 `fetchpriority="high"`、`decoding="async"`，并在 `<head>` 中对首屏图做 `rel="preload"` 以改善 LCP。

#### F6 ｜ P3 ｜ 分享与降级缺失：无 Open Graph 标签、无 `<noscript>`

- **影响**：微信/社交平台分享时不显示标题摘要与缩略图；JS 被拦截时用户只看到纯空白页。
- **修复**：补充 `og:type` / `og:title` / `og:description` / `og:image`（指向首屏插画）与 `twitter:card`；`<body>` 内增加 `<noscript>` 中文提示。

#### F7 ｜ P0（部署级）｜ 单页应用深链刷新 404 风险 —— 专项验证通过

- **风险**：项目用 `history.pushState` 做客户端路由，若托管平台不做"路由回退"，用户直接刷新 `/guide/html` 会 404（这一点项目自身第 5 课"部署"的练习题恰好也在讲）。
- **验证**：本地无回退的裸静态服务器实测确为 `404`；部署后对线上地址逐一请求：
  ```
  /                  → 200
  /guide/html        → 200（与首页同一入口 HTML）
  /practice          → 200
  /favorites         → 200
  /guide/constructor → 200
  ```
- **结论**：码上架**已正确识别并应用 `dist/_redirects` 的 `/* /index.html 200` 回退规则**，该风险不成立。（发布副本中另附了 `404.html`，作为不支持 `_redirects` 的平台上的二次保险。）

### 未修复（建议项，不影响上线）

#### F8 ｜ P3 ｜ 缺少 `<link rel="canonical">`

- **原因**：当前是平台分配的临时地址，写入 canonical 会导致正式域名上线后指向错误页面。
- **建议**：确定自有域名后再补，与 `og:url` 一并配置为绝对地址。

#### F9 ｜ P3 ｜ 首屏插画体积偏大（401.8 KB PNG）

- **证据**：`qizhan-hero.png` 固有 1448×1086，但最大渲染宽度仅 489 CSS px（2× 屏需 978 px），存在约 1.5× 过采样；PNG 格式对插画类图像的压缩效率低于 WebP。
- **影响**：占首屏总下载量约 98%，是 LCP 的主要成本；移动网络下体感明显。
- **建议**（未执行，避免未经确认改动美术资产）：导出约 1000px 宽 WebP（预计 100–150 KB，可省约 60–70%），用 `<picture>` + PNG 作为回退；或保留 PNG 仅做尺寸下采样。

---

## 三、通过项（无需改动，已实测确认）

**安全**
- 全量检索 `dangerouslySetInnerHTML` / `innerHTML` / `insertAdjacentHTML` / `eval` / `new Function` / `document.write` / `srcdoc` / `javascript:` → **0 命中**。所有动态内容经 React 转义渲染。
- 产物内绝对链接仅 5 条，全部为框架内部（SVG/MathML 命名空间、React 文档地址）。**无第三方统计、无 CDN 外链、无追踪脚本、无外部字体请求**。
- 产物中不存在任何密钥、Token、`.env` 内容。仓库根 `.gitignore` 已正确排除 `.env`、`.env.*`、`dist/`、`*.har`、`.workbuddy/`。
- 用户数据仅存于 `localStorage`（键：`qizhan:favorites`、`qizhan:completed`），不上传任何服务器。

**链接与资源**
- 爬取 11 条路由、共 73 处站内链接，全部可达且目标页均正常渲染，**0 失效**。
- 无重复 `id`；无外链（故无 `target="_blank"` 相关的 `rel="noopener"` 缺口）。
- JS / CSS / PNG / SVG 线上 MIME 类型全部正确。

**响应式**
- 320 / 375 / 414 / 768 / 1024 / 1440 / 1920 七档视口实测：`scrollWidth === innerWidth`，**无横向滚动、无溢出元素**。
- 移动端 375px 下代码块 `pre` 内部滚动正常（351/351），未撑破布局。

**可访问性**
- 30 个可交互元素**全部具备可访问名称**；图片 100% 有 `alt`；每页唯一 `h1`；有 `:focus-visible` 焦点样式；`prefers-reduced-motion` 已适配（关闭动画与平滑滚动）。

**性能**
- 生产构建通过，17 个模块：JS 240.36 KB（**gzip 77.31 KB**）、CSS 13.11 KB（gzip 3.57 KB）、HTML 1.28 KB（gzip 0.68 KB）。
- 单入口无冗余依赖，React 之外无第三方运行时。首屏已对 LCP 图片启用 preload + 高优先级。

---

## 四、部署包边界（重要）

项目根目录总计 **457.8 MB / 10417 文件**，其中绝大部分**不应进入发布包**：

| 目录 | 体积 | 处理 |
| --- | --- | --- |
| `server/` | 347.1 MB / 9508 文件 | **排除**。含未接入本站的 Fastify + Prisma 后端骨架 |
| `replication-evidence/` | 36.3 MB | **排除**。含原站抓包 HAR，涉及第三方站点内容与版权 |
| `.git/` | 18.5 MB | **排除**（VCS 元数据） |
| `node_modules/` | 61.5 MB | **排除**（依赖缓存） |
| `dist/` | **0.63 MB / 6 文件** | **仅此项发布** |

**密钥告警**：`server/.env` 中存在一条真实的 `BETTER_AUTH_SECRET`（base64 32 字节）。该文件已被 `.gitignore` 正确排除、且不在 `dist/` 内，本次未泄漏。但需注意：**该密钥已写入本地磁盘并以明文提交形态存在，上线后端前应重新生成**，且严禁随任何发布包外传。

**发布路径说明**：由于仓库内存在 `server/` 后端信号，平台预检首次判定 `backend_required: true` 并拦截匿名发布。实际发布产物是**纯静态前端**（收藏与进度仅存浏览器本地，无服务端账号/数据）。因此将真实产物 `dist/` 隔离为独立发布目录后重新预检，平台正确识别为 `artifact_type: static_local_storage`、`safety: ALLOW`，随后完成发布。

---

## 五、发布结果

| 项目 | 值 |
| --- | --- |
| 公开地址 | https://site-be0583ee2d36.mashangjia.com/ |
| 模式 | 匿名（临时站） |
| 状态 | `success`，平台已校验 `verified: true` |
| Deployment ID | 1321 |
| 预览有效期 | 约 24 小时（至 2026-09-21 22:10） |
| 认领有效期 | 至 2026-09-28 22:10，认领后**地址不变** |
| 能力边界 | 仅静态前端；不含服务端账号与云端数据同步 |

**线上独立验证**（非仅依赖 CLI 回执）：7 条路由逐一实访，标题与项目内容一致、无控制台错误、无失败请求；`/guide/html` 答题后进度写入 `localStorage`，返回首页正确显示 `1 / 8 已完成`；移动端 375px 无横向溢出。
