# 文案逐句一致性报告

生成方式：`npm run audit:copy`（原站 https://vibe-hub.org vs 本地 http://127.0.0.1:5173，1440×1000，滚动触发懒加载后取可见文本逐行 diff）

本报告只反映**渲染后的可见文本**，不覆盖字体、图标、几何与交互。

| 页面 | 原站行数 | 本地行数 | 一致率 | 本地缺 | 本地多出 |
| --- | --- | --- | --- | --- | --- |
| 中文首页 `/` | 442 | 425 | 92.5% | 33 | 16 |
| 英文首页 `/en` | 442 | 425 | 92.3% | 34 | 17 |
| 中文 Frontend 主题页 `/topics/frontend` | 442 | 425 | 92.5% | 33 | 16 |
| 英文 Frontend 主题页 `/en/topics/frontend` | 442 | 425 | 92.3% | 34 | 17 |
| Skill 介绍页 `/vibehub-skill` | 69 | 70 | 100% | 0 | 1 |
| 练习页 `/practice` | 30 | 30 | 83.3% | 5 | 5 |
| 中文更新日志 `/changelog` | 440 | 441 | 100% | 0 | 1 |
| Button 详情页 `/en/button` | 108 | 108 | 99.1% | 1 | 1 |
| HTML 详情页（英文） `/en/html` | 149 | 150 | 100% | 0 | 1 |
| Button 详情页（中文） `/button` | 98 | 98 | 100% | 0 | 0 |

## 中文首页 `/`

一致率 92.5%（原站 442 行 / 本地 425 行）

### 原站有、本地缺（33）

- HTML
- 内容结构
- CSS
- 视觉样式
- JS
- 交互逻辑
- HTML 源：1 个任务
- + 脚本插入节点
- DOM 树：2 个任务
- VibeHub · 蓝色马克杯
- 蓝色马克杯
- title 标识当前文档
- <head>
- title
- description
- og:image
- 标签页
- 搜索
- 分享
- 同一个 head，不同读取方
- VibeHub
- VibeHub
- 同一枚网站图标
- og:title
- og:image
- og:url
- 周末指南
- 短途旅行计划
- 图片
- manifest.json
- name · icons · start_url · display
- VibeHub
- 打开 /workspace

### 本地多出（16）

- 登录
- HTML 内容结构
- CSS 视觉样式
- JS 交互逻辑
- body
- main
- button#add
- task
- Save changes
- View details
- Learn more →
- Open the full example ↗
- Text can navigate to another page.
- Save changes
- View details
- Learn more →

## 英文首页 `/en`

一致率 92.3%（原站 442 行 / 本地 425 行）

### 原站有、本地缺（34）

- HTML
- Content structure
- CSS
- Visual style
- JS
- Interaction logic
- **Hike the mountain** on Saturday, start early
- HTML source: 1 task
- + script inserts node
- DOM tree: 2 tasks
- VibeHub · Blue mug
- Blue mug
- title identifies this document
- <head>
- title
- description
- og:image
- tab
- search
- share
- one head, different readers
- VibeHub
- VibeHub
- same site icon
- og:title
- og:image
- og:url
- Weekend guide
- Plan a short trip
- image
- manifest.json
- name · icons · start_url · display
- VibeHub
- opens /workspace

### 本地多出（17）

- Sign in
- HTML Content structure
- CSS Visual style
- JS Interaction logic
- **Mountain climbing on Saturday** on Saturday, start early
- body
- main
- button#add
- task
- Save changes
- View details
- Learn more →
- Open the full example ↗
- Text can navigate to another page.
- Save changes
- View details
- Learn more →

## 中文 Frontend 主题页 `/topics/frontend`

一致率 92.5%（原站 442 行 / 本地 425 行）

### 原站有、本地缺（33）

- HTML
- 内容结构
- CSS
- 视觉样式
- JS
- 交互逻辑
- HTML 源：1 个任务
- + 脚本插入节点
- DOM 树：2 个任务
- VibeHub · 蓝色马克杯
- 蓝色马克杯
- title 标识当前文档
- <head>
- title
- description
- og:image
- 标签页
- 搜索
- 分享
- 同一个 head，不同读取方
- VibeHub
- VibeHub
- 同一枚网站图标
- og:title
- og:image
- og:url
- 周末指南
- 短途旅行计划
- 图片
- manifest.json
- name · icons · start_url · display
- VibeHub
- 打开 /workspace

### 本地多出（16）

- 登录
- HTML 内容结构
- CSS 视觉样式
- JS 交互逻辑
- body
- main
- button#add
- task
- Save changes
- View details
- Learn more →
- Open the full example ↗
- Text can navigate to another page.
- Save changes
- View details
- Learn more →

## 英文 Frontend 主题页 `/en/topics/frontend`

一致率 92.3%（原站 442 行 / 本地 425 行）

### 原站有、本地缺（34）

- HTML
- Content structure
- CSS
- Visual style
- JS
- Interaction logic
- **Hike the mountain** on Saturday, start early
- HTML source: 1 task
- + script inserts node
- DOM tree: 2 tasks
- VibeHub · Blue mug
- Blue mug
- title identifies this document
- <head>
- title
- description
- og:image
- tab
- search
- share
- one head, different readers
- VibeHub
- VibeHub
- same site icon
- og:title
- og:image
- og:url
- Weekend guide
- Plan a short trip
- image
- manifest.json
- name · icons · start_url · display
- VibeHub
- opens /workspace

### 本地多出（17）

- Sign in
- HTML Content structure
- CSS Visual style
- JS Interaction logic
- **Mountain climbing on Saturday** on Saturday, start early
- body
- main
- button#add
- task
- Save changes
- View details
- Learn more →
- Open the full example ↗
- Text can navigate to another page.
- Save changes
- View details
- Learn more →

## Skill 介绍页 `/vibehub-skill`

一致率 100%（原站 69 行 / 本地 70 行）

### 本地多出（1）

- 登录

## 练习页 `/practice`

一致率 83.3%（原站 30 行 / 本地 30 行）

### 原站有、本地缺（5）

- 一个删除数据的按钮发出 GET 请求，刷新页面时数据又被删了一次。问题出在哪？
- 删除该用 DELETE 或约定 POST，GET 会被重发
- 只在前端加一个确认弹窗就够了
- 把返回的状态码改成 404 就不会重复删了
- oil 的小红书主页

### 本地多出（5）

- 登录
- 单实例服务正在重启，用户暂时打不开页面。哪种判断和验收最准确？
- 承认重启期间可能短暂不可用，确认服务恢复后持久化数据仍能读到
- 把代码里的单例对象删掉，就能让部署变成多实例并避免中断
- 只要服务重新显示在线，重启前放在内存里的任务就一定还在

## 中文更新日志 `/changelog`

一致率 100%（原站 440 行 / 本地 441 行）

### 本地多出（1）

- 登录

## Button 详情页 `/en/button`

一致率 99.1%（原站 108 行 / 本地 108 行）

### 原站有、本地缺（1）

- Web fine-tuning tool · Selector Pro

### 本地多出（1）

- WEB FINE-TUNING TOOL · SELECTOR PRO

## HTML 详情页（英文） `/en/html`

一致率 100%（原站 149 行 / 本地 150 行）

### 本地多出（1）

- Sign in

## Button 详情页（中文） `/button`

一致率 100%（原站 98 行 / 本地 98 行）

逐句完全一致。

