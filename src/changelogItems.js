const englishItems = {
  '2026-09-13': [
    'Refactored the Product Website course into 9 focused chapters covering page structure, design tokens, hero CTA, layouts, pricing, spacing, forms, mobile responsive, and launch acceptance checklist.',
    'Streamlined chapter titles and introductions across all courses, removing rhetorical filler to make learning objectives clear at a glance.',
    'Simplified AI collaboration prompts across courses, helping beginners describe modular changes in everyday language and verify results easily.'
  ],
  '2026-09-09': [
    'Added Hash and Pointer entries with diagrams, practice questions, and commands you can run yourself.',
    'Follow how a content hash changes, why a page can still load an old file, and how to recover when shared settings are edited by mistake.',
    'Switch between light and dark modes, with matching course illustrations and term examples.',
    'The Git course now includes operation steps, result checks, and questions about staging, branches, merges, remote sync, and recovery.',
    'After a correct answer, open the term in a new tab. The Configuration File entry clarifies runtime settings versus project rules.',
    'The community menu lists VibeHub Group 6 and the GPT subscription services group separately.'
  ],
  '2026-09-06': [
    'Added a Git course that shows how file changes become commit history.',
    'Added Quality Gate, Entitlement, and PostgreSQL entries with visual examples and practice questions.',
    'Explore why a merge is blocked, why an export remains locked after payment, and why an order cannot be saved.',
    'Varied answer positions so practice focuses on understanding the content.'
  ],
  '2026-09-05': [
    'Added a dedicated Testing section and five entries, including Contract Testing and Database Migration.',
    'Clarified AI tool entries with common names and comparisons between similar concepts.'
  ],
  '2026-09-04': ['Made chapter headings and paragraphs consistent for easier reading.', 'Removed repeated explanations and unnecessary transitions.'],
  '2026-09-02': ['Added 20 core backend terms including atomicity, distributed systems, and circuit breakers', 'Added intuitive state flow diagrams for data transactions and distributed interactions'],
  '2026-08-31': ['Added 11 AI tool terms including API proxy, base URL, config file, hook, and subagent', 'Explained realistic tool calling and permission flows for agent environments'],
  '2026-08-28': ['Updated the practice menu for a consistent selection experience on phones and computers.'],
  '2026-08-27': ['Added domain filters for targeted self-assessment across categories'],
  '2026-08-24': ['Introduced Selector Pro tool cards across frontend and UI term entries'],
  '2026-08-21': ['Reduced course image sizes to use less data.', 'Clarified term descriptions and updated link-sharing previews.'],
  '2026-08-20': ['Added 11 terms including accessibility, API key, contrast, moodboard, and placeholder', 'Equipped terms with interactive visual workbenches for real-time observation', 'Cleaned up artificial phrasing to keep descriptions in a natural human voice'],
  '2026-08-17': ['Added CRUD, Field, and Data Type to explain how records are managed and what their fields contain.'],
  '2026-08-15': ['Launched the complete 12-chapter Product Website course with interactive visuals', 'Added 17 web foundation terms (DOM, CSS, Cookie, Cache, Metadata, Sitemap, etc.)', 'Introduced split-screen course reader with synchronized term side panel'],
  '2026-08-07': ['Added masonry, split-screen, Art Deco, and Brutalist design terms'],
  '2026-08-04': ['Added blue-green deployment and canary release terms for deployment risk control', 'Category filters stay at the top while browsing long lists.'],
  '2026-08-02': ['Launched Anti-AI Flavor guide covering AI slop tells, UI templates, and revisions', 'Provided actionable agent prompts and before/after comparisons for each slop tell'],
  '2026-07-30': ['Save terms without signing in and review your favorites by category', 'Smoothed transitions between catalog and detail views'],
  '2026-07-28': ['Released the baseline catalog of 244 foundational frontend, design, and git terms', 'Added 30 beginner-friendly interactive practice questions with immediate feedback'],
  '2026-07-26': ['Switch between Chinese and English; the site remembers your language choice', 'Introduced VibeHub Skill to learn terminology directly within agent workflows'],
  '2026-07-24': ["Added authentic 'You might say' quotes to identify terms from observed effects", 'Added one-click copyable AI prompts ready to send directly to coding agents', 'Enhanced search ranking to support aliases, descriptions, and natural phrasing'],
  '2026-07-22': ['Learn terms encountered while building websites and products through plain-language explanations and diagrams.', 'The first version is available to explore, with term pages and interactive examples.']
};

const chineseItems = {
  '2026-09-13': [
    '重构《从零做一个产品官网》实战课程，精炼为 9 章核心内容，聚焦页面结构、设计变量、首屏与行动、功能排版、真实证据与定价、间距防遮挡、按钮与表单、手机适配和上线走查清单。',
    '优化全部课程的章节标题与目录导言，去除了生硬设问和冗余修饰，方便在目录中直观了解每一章能学到什么、解决什么问题。',
    '精简课程中的 AI 协作指引，帮助初学者用自然的日常语言向 AI 描述模块化修改需求，并在完成后进行直观验收。'
  ],
  '2026-09-09': [
    '新增「哈希」和「指针」词条，配有图解、练习和可以直接运行的验证命令。',
    '可以逐步看到文件内容变化后哈希怎样改变、页面为什么仍加载旧文件，以及共用配置被误改后怎样恢复。',
    '新增白天与黑夜模式切换，课程目录插画和术语示例随模式调整配色。',
    '补充 Git 课程的操作步骤、结果检查与判断题，讲清暂存、分支、合并、远程同步和恢复的边界。',
    '练习答对后，可以在新标签页打开对应术语；配置文件词条补充运行设置与项目规则的区别。',
    '社群入口分别展示 VibeHub 交流 6 群和 GPT 订阅服务群，方便按需求选择。'
  ],
  '2026-09-06': [
    '新增「Git 原理与 AI 协作」学习路线，用图解说明文件怎样走进提交历史。',
    '新增质量门禁、功能权益和 PostgreSQL 词条，配有图解与练习。',
    '可以逐步查看代码为何不能合并、付费后为何仍不能导出，以及订单为什么保存失败。',
    '调整练习选项顺序，让答题更侧重理解内容。'
  ],
  '2026-09-05': [
    '首页增加独立的「测试」入口，新增契约测试、数据库迁移等 5 个词条。',
    '改清 AI 工具相关词条的解释，补充常见叫法和容易混淆的概念。'
  ],
  '2026-09-04': ['统一课程标题和段落层次，方便按小节阅读。', '删去重复说明和多余过渡，让讲解更直接。'],
  '2026-09-02': ['新增原子性、分布式系统、背压、熔断机制、事务等 20 个后端核心词条', '通过图解查看数据保存和多个系统协作时的过程'],
  '2026-08-31': ['新增 API 代理、Base URL、配置文件、Hook、子代理等 11 个高频词条', '拆解真实工具调用流程，帮助初学者看懂 Agent 运行时的提示与配置'],
  '2026-08-28': ['调整练习范围的下拉菜单，让手机和电脑上的选择方式保持一致。'],
  '2026-08-27': ['选择想复习的分类，只练习这一类题目'],
  '2026-08-24': ['在前端与界面类术语中增加 Selector Pro 辅助模块推荐'],
  '2026-08-21': ['减小课程配图文件，节省查看图片时的流量。', '改清词条说明，调整分享链接时显示的预览卡片。'],
  '2026-08-20': ['新增无障碍、API 密钥、对比度、情绪板、占位符等 11 个核心词条', '为词条增加可操作的图解，支持调节参数、观察变化', '改写生硬的词条说明，让解释更自然、易懂'],
  '2026-08-17': ['新增 CRUD、字段和数据类型，帮助理解记录的增删改查和填写内容。'],
  '2026-08-15': ['正式发布「从零到上线产品官网」实战路线，包含 12 章连续阅读与交互演示', '新增 DOM、CSS、Cookie、缓存、页面元数据等 17 个 Web 基础关键概念', '推出桌面端双栏分屏阅读器，支持一边看路线一边对照术语面板'],
  '2026-08-07': ['新增瀑布流布局、分屏布局、Art Deco 风格、野兽派风格等版式词条'],
  '2026-08-04': ['新增蓝绿部署与金丝雀发布策略词条，帮助理解现代发布风险控制', '浏览较长的目录时，分类筛选栏会保留在顶部，方便切换。'],
  '2026-08-02': ['正式上线「防止 AI 味儿」专区，梳理中英文常见 AI 口癖、界面模板感与改法', '为每类口癖提供真实的 Agent 请求示例与前后对比'],
  '2026-07-30': ['无需登录即可收藏词条，并按分类回顾已收藏的内容', '调整目录与详情页之间的切换动画'],
  '2026-07-28': ['正式发布首批 244 个核心前端、设计、Git 与产品概念基础图鉴', '新增 30 道初学者交互练习题，支持随机刷题与即时正误反馈'],
  '2026-07-26': ['可以切换中文和英文，网站会记住语言选择', '推出 VibeHub Skill 协同指南，支持与常用 Coding Agent 联动边做边学'],
  '2026-07-24': ['引入「你可能会对 AI 说的话」真实人话语录，帮助用户从想要的效果找词条', '上线一键复制 AI 提示词功能，学完可直接粘贴发给 Agent', '优化站内智能搜索，支持按别名、拼音和自然效果描述模糊查找'],
  '2026-07-22': ['用通俗解释和图解认识做网页、做产品时遇到的术语，帮助初学者向 AI 表达需求。', '首个版本开放体验，可以浏览词条并尝试页面交互。']
};

export function getChangelogItems(entry, english) {
  if (english && englishItems[entry.date]) return englishItems[entry.date];
  if (!english && chineseItems[entry.date]) return chineseItems[entry.date];
  return (entry.bodyZh || entry.body || '').split('。').map((item) => item.trim()).filter(Boolean).map((item) => `${item}。`);
}
