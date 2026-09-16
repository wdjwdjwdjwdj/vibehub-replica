# 页面清单

状态约定：`已实现` 表示本地代码已有对应页面；`已验证` 表示 smoke/e2e 或截图验证已经覆盖；`未完成` 表示仍有原站差异或外部步骤未完成。

| 页面/路由 | 已实现 | 已验证 | 备注 |
| --- | --- | --- | --- |
| `/`、`/en` 术语目录 | 是 | 是 | `/` 默认中文（8 个主题、322 个条目，中文分类/分组/术语说明），`/en` 保留英文入口；两者均支持搜索、收藏；`npm run test:catalog` 覆盖目录卡片，`npm run test:header` 覆盖 390px Header 几何与运行时 |
| `/topics/frontend` 等 8 个主题页（含原站 `/topics/technology` 别名） | 是 | 部分 | 已切换为原站目录表面：分类条、左侧分组、三列/Website Sections 两列 Demo 卡片；Testing/Git/Design 按原站隐藏左栏并使用全宽网格；搜索、收藏和调查弹层可用。已按原站真实 DOM 结构重建实际有预览的卡片：Frontend 6、Backend 9、AI 7、Product 7、Testing 6、Tech Stack 6、Design 8、Git 6；原站其余卡片的 `.card-demo` 为空，本地不再渲染通用占位块。`npm run audit:topic-parity` 已通过 16 个中英文入口，`npm run test:catalog` 覆盖上述结构；仍需补逐主题截图对比及其余卡片空白高度/壳层视觉细节 |
| `/:term`、`/en/:term` 322 条详情页 | 是 | 部分 | 共用详情模板，已接入逐条抓取文案，按术语 ID 分配真实可操作 Demo；Git Story 与 Card、Tag、布局、Typography、URL、Domain 等 dh-demo 家族已补为独立 HTML/CSS/React 视图；Button 已补齐四个典型场景和专属正文结构，Git 已补齐用法/组成/历史视图，Upload 已补齐原站式上传区、Quick Check、用法/禁用场景、Anatomy、Variants 和四个场景卡；Input、Modal、Card、Markdown 已补齐原站式用法/禁用场景、Anatomy、Variants 和四个场景卡；HTML、DNS、Typography、Terminal 已补齐源站式教学区块、变体和四个场景卡，四页桌面及 390px 移动端区块已通过专项几何审计；API、Project Rules 已补齐源站式教学区块，AI Agent 已改为独立源站形状页面，含六阶段工作循环、工具轨迹、证据状态、Quick Check/Agent prompt、Learn next 和决策表，并通过桌面关键几何、390px 溢出和 E2E 验证；Button/Git/Upload/Input/Modal/Card/Markdown/HTML/DNS/Typography/Terminal/API/AI Agent/Project Rules 的阅读顺序已有 DOM 截图与 E2E 验证，字体、图标、Demo 内部视觉和原站专属教学细节仍未全部补齐 |
| `/practice`、`/en/practice` | 是 | 是 | 接入原站 `lessonPractice` 的 296 条双语判断题；随机选题、12 条最近题目记录、9 个方向筛选、正确/错误反馈、答对后嵌入完整术语指南和下一题；仅最近题目按原站 key 持久化，答案/得分/方向为当前会话状态；题库按路由动态加载 |
| `/anti-ai-flavor` | 是 | 是 | 中文默认入口已按原站当前 25 条目录实现（中文口癖 11、页面模板感 8、不好用的交互 6），卡片标题、引用、示例均已中文化；`/en/anti-ai-flavor` 保留原站 18 条英文结构；分类锚点、三列卡片和原生 HTML/CSS 预览可用，字体、图标和预览内部细节仍有差异 |
| `/vibehub-skill` | 是 | 是 | 原站 Skill 首屏结构、Agent 对话预览、Tooltip、安装指令复制、重写复制、两段全宽功能面板和主动提示双卡；插画细节仍有差异 |
| `/vibehub-skill/lab`、`/en/vibehub-skill/lab` | 是 | 是 | 原站 robots 禁止抓取但实际可访问；已按真实页面补齐四步组合互动练习 |
| `/changelog`、`/en/changelog` | 是 | 是 | 已按原站时间线、月份定位、All/Updates/New Terms 筛选、milestone summary、版本徽章和新增词汇展开交互实现并截图复核；移动端无横向溢出 |
| `/courses`、`/en/courses`、`/courses/git-workflow`、6 个 Git 章节、`/courses/product-website`、9 个产品官网章节 | 是 | 是 | `test:courses` 已覆盖双语总览与全部章节；产品官网和 Git 课程首页均使用原站 940px 固定滚动壳层与卡片列表，Git 章节卡新增 6 个原生 HTML/CSS 工作流视觉，390px 移动端总览也按原站固定容器、116px 卡片和隐藏视觉对齐；正文/图示按原站抓取并用本地 HTML/CSS 重建；首章正文 4 个源站术语引用可打开右侧详情面板，细部内容仍有差异 |
| 原站 sitemap 677 个 URL | 是 | 是 | `audit:original:sitemap` 已核对原站 677 个唯一 URL，其中 644 条为 322 个双语详情入口，33 条为特殊页面；本地另补充英文课程、英文 Changelog、Git 课程双语章节、Skill Lab 和 frontend 主题别名 |
| 自有品牌版本 | 部分 | 未完成 | 已准备运行时与静态 HTML 共用的基础品牌配置，以及 `VITE_SITE_INDEPENDENT` 和可选 Footer 合作方/社交链接配置；默认保持原站基线，实际品牌名、Logo、favicon、社交链接和站点名称仍等待确认 |
| 公网部署 | 未完成 | 未完成 | 等待确认部署平台、账号归属和域名/站点名 |
