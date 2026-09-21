# 交互清单

| 交互 | 状态 | 验证方式 |
| --- | --- | --- |
| 客户端路由跳转与浏览器后退 | 已实现 | Playwright core smoke |
| 调查弹层在目录/详情路由出现与关闭 | 已实现 | 原站 `vibehub-source-survey-shown-v1=1` + Playwright core smoke |
| 首页主题切换与分组锚点 | 已实现 | 首页渲染 + 主题按钮 |
| 主题页分类切换、分组锚点和目录搜索 | 已实现 | 主题页目录模型 + Playwright first-class smoke |
| 全局搜索 | 已实现 | input 状态过滤目录 |
| 收藏/取消收藏 | 已实现 | 原站 `vibehub:favorites` `{version:1,items:[...]}` 格式 + 首页 Favorites；兼容旧本地 key |
| 主题页与详情页共享收藏状态 | 已实现 | App 统一状态 + Playwright 跨路由 smoke |
| 深色模式 | 已实现 | 原站 `vibehub-color-mode` 值 + DOM class；兼容旧本地 key |
| 独立品牌 Footer/Header 外链切换 | 已实现 | `VITE_SITE_INDEPENDENT=true` 时只渲染显式配置的合作方/社交入口；默认值保留原站基线 |
| 中英文入口切换 | 已实现 | URL 前缀切换 |
| 术语详情复制 Markdown | 已实现 | Copy 按钮反馈 |
| 详情页复制 Agent prompt | 已实现 | Copy prompt 反馈 |
| Button/CTA/Link Demo | 已实现 | Button 登录面板含邮箱校验/登录，详情正文按源站保留 Anatomy、Variants 和四个纵向场景，场景动作有反馈；CTA 含启动与演示反馈；Link/其他 action 含状态反馈 |
| Upload 详情 Demo | 已实现 | 原生文件选择、Quick Check、拖拽/按钮/图片/列表 Variants、Anatomy 示意和头像/附件/CSV/媒体库四个场景卡均为本地 HTML/CSS/React；场景卡点击会更新 active 状态 |
| Input/Modal/Card/Markdown 结构化详情区 | 已实现 | 原站式 When to use/When NOT to use、Anatomy、Variants、四个 Typical use cases 场景卡均为本地 HTML/CSS/React；Variant 与场景动作会更新可见状态，Quick Check 位于 Demo 后；390px 移动端和四页 E2E 已覆盖 |
| HTML/DNS/Typography/Terminal 结构化详情区 | 已实现并部分验证 | 保留各页原生首屏 Demo，新增源站式适用/不适用、Anatomy、Variants、四个场景卡；变体和场景动作会更新可见状态，Quick Check 位于 Demo 后；`audit:extended` 已覆盖四页桌面结构和中英文 390px 移动端区块位置/高度、无横向溢出与运行时错误；字体、图标、Demo 内部视觉和 exact-runtime T1/T2 仍未完成 |
| API/AI Agent/Project Rules 源站式详情区 | 已实现并验证 | API 改为独立源站顺序页面，保留六状态保存流程、边界说明、Quick Check 和 Agent prompt；AI Agent 改为独立源站形状页面，含六阶段工作循环、工具轨迹、证据状态、Agent-vs-Chatbot 决策表和 Learn next，阶段按钮/左右键/Start→Next step 可操作；Project Rules 增加规则作用、硬校验边界和 Learn next；三页 Quick Check 位于 Demo 后，`npm run test:special` 进行 3 对原站/本地几何比较，E2E、644 条 Demo 烟测和原站/本地截图已覆盖 |
| 表单/输入校验 Demo | 已实现 | 有效/无效输入反馈 |
| State/Progress/Spinner Demo | 已实现 | Saving→Saved 状态过渡 |
| Modal/Toast/Notification Demo | 已实现 | 打开、关闭、反馈状态 |
| Drawer/Popover/Tooltip Demo | 已实现 | 详情层、原生 tooltip |
| Tabs/Segmented/Menu Demo | 已实现 | 选中态和内容切换 |
| Switch/Checkbox/Radio/Disabled Demo | 已实现 | 开关影响按钮可用性 |
| Slider/Rate Demo | 已实现 | 数值和星级随滑动更新 |
| Search/Filter/Sort Demo | 已实现 | 列表过滤和选择反馈 |
| 原站结构化 Demo（Component、Markdown、Hero、Project Rules、JavaScript、AI Agent、Style、Workbench/Flow/Content） | 已实现 | 独立 HTML/CSS/React 工作区；Hero 产品窗口、按钮、标签、状态、渲染预览和任务流均有本地状态 |
| Git Story Demo（Git、Commit、Branch、Merge、Pull、Push、Clone、Pull Request、Worktree、Stash、.gitignore、Diff） | 已实现 | 线性提交流、分支/工作树图、差异对照和忽略状态均为 HTML/CSS/React；节点与推进按钮更新当前状态；Git 总览详情已按源站补齐 commit/push/GitHub Hero、4+4 用法区块、单一 Anatomy 流程和四个历史场景，历史视图仍可切换 |
| Dh Demo 家族（Card、Tag、布局、Typography、URL、Domain、控件、数据、反馈、FAQ/Pricing/Header/Navbar/Footer/Social proof/User voice 等） | 已实现 | 独立 HTML/CSS/React 视觉面板；表单、选择器、表格、Tabs、弹层、分页、FAQ、Pricing、站点导航和内容切换均有本地状态反馈，E2E 已覆盖抽查 |
| 其余 93 个专用详情 Demo（基础 Web、网络/部署、产品方法、AI、配置/工具链） | 已实现 | 按原站 `demoClass` 与 `demoText` 分为 catalog technical/foundation/product/AI/tool 面板；`test:demos` 全量 644 路由拒绝通用 fallback，HTML/DNS/Provider/User Story/AI Basics 另有结构 E2E |
| 59 个原站无 `demoText` 详情 Demo | 已实现 | 按保存链路、布局拆解、记录变更和步骤化证据分流；`test:terms` 强制检查每条详情存在 Demo |
| Quick check | 已实现 | 原站题目/答案/反馈结构；页面会话内可重选，刷新后清空答案；Button/Git 已验证位于 Demo 后、正文知识区块前 |
| Practice | 已实现并验证 | 328 条真实双语题库、随机选题、12 条最近题目记录、9 个方向及原站题量筛选、答错可重选、答对后禁用选项并嵌入完整术语指南、下一题；仅最近题目按原站 key 持久化，答案/得分/方向为当前会话状态 |
| AI Slop 分类锚点与原生卡片 | 已实现并验证 | 中文 25 条、英文 18 条；分类按钮滚动到三组条目，卡片链接可达，预览为本地 HTML/CSS，不使用 iframe/整页截图 |
| Changelog 月份定位、All/Updates/New Terms 筛选、词条展开 | 已实现并验证 | 原站结构复核；Playwright 断言筛选、milestone summary、Show all、移动端无溢出和月份跳转 |
| 课程总览、Git 章节入口与移动端滚动容器 | 已实现并验证 | 产品官网/Git 双语总览使用源站课程壳层；6 个 Git 章节卡、返回入口、从第一章开始和章节 reader 链路可用，`test:courses` 与 `test:courses:mobile` 覆盖桌面/390px 移动端 |
| 中文 Changelog 完整里程碑条目与中文全局课程入口 | 已实现 | 按原站当前 DOM 接入 22 个里程碑的中文 bullet；中文主导航在所有主页面显示课程入口，Playwright 检查中文更新日志、首页与筛选状态 |
| Skill Tooltip 与安装指令复制 | 已实现 | Tooltip 状态切换 + 复制成功反馈 |
| Skill Learning Lab 四步组合练习 | 已实现 | `test:lab` + Playwright e2e：方案、优先级、range、检查、完成与复制 |
| 课程总览、章节目录与前后章导航 | 已实现 | 课程章节渲染 e2e + 路由 smoke |
| 课程正文术语引用、右侧术语详情面板与关闭/完整术语页入口 | 已实现 | 产品官网首章中英文引用数量、桌面 720px/708px 分栏、移动端 390px 无溢出 + Playwright e2e |
| Git 六章正文、目录锚点与前后章导航 | 已实现 | `test:courses` 覆盖 12 个双语章节入口 |
| 真实后端账号、云端收藏、提交投稿 | 未完成 | 需要独立后端和外部账号授权 |
