# 起站：AI 建站入门试用版

这是一个独立品牌、免登录的中文学习站，帮助第一次使用 AI 建站的人理解 8 个关键概念并完成小练习。

当前公开构建只包含 `src/launch/`、`src/launchApp.jsx` 和 `launch-public/`。历史复刻代码仍保留在仓库中用于本地参考，但 Vite 入口不会导入它们，`publicDir` 也已切到 `launch-public/`，因此旧品牌、旧课程、旧题库和旧素材不会进入 `dist/`。

## 本地运行

```bash
npm install
npm run dev -- --host 127.0.0.1
```

默认地址为 `http://127.0.0.1:5173/`。

## 首发功能

- 8 个原创入门概念：HTML、CSS、响应式设计、域名、部署、Git、可访问性、表单
- 每节包含解释、适用场景、三步操作、最小示例和一道检查题
- 综合练习
- 浏览器本地收藏与学习进度
- 桌面与移动端响应式布局
- 无账号、无后端请求、无云端同步

本地数据使用：

- `qizhan:favorites`
- `qizhan:completed`

清除浏览器站点数据后会丢失收藏和进度，这是当前免登录试用版的预期行为。

## 构建与测试

```bash
npm run build
npm run preview -- --host 127.0.0.1
npm run test:e2e
```

`test:e2e` 验证学习、答题完成、本地收藏、刷新持久化和 390px 移动端无横向溢出。运行测试时默认请求 `http://127.0.0.1:5173`，测试生产预览可设置：

```powershell
$env:QIZHAN_BASE_URL='http://127.0.0.1:4173'
npm run test:e2e
```

历史复刻版测试保留为 `npm run test:legacy`，它们不适用于当前首发入口。

## 品牌配置

默认工作品牌为“起站”，可在部署环境覆盖：

```bash
VITE_SITE_NAME=起站
VITE_SITE_DESCRIPTOR=AI 建站入门
VITE_SITE_DESCRIPTION=起站 — 帮助 AI 建站初学者理解关键概念并完成第一个网页。
VITE_SITE_LOGO=/qizhan-mark.svg
VITE_SITE_FAVICON=/qizhan-mark.svg
```

“起站”是当前工作名，正式长期运营前仍需检查域名、商标和社交账号是否可用。

## 部署

静态发布目录是 `dist/`。`launch-public/_redirects` 为支持该规则的平台提供 SPA 路由回退；其他平台需要配置所有页面路径回到 `index.html`。

上线前按 [部署清单](<E:/vibe coding/网站复刻/docs/deployment-checklist.md>) 完成域名、HTTPS、移动端和刷新检查。当前版本不需要部署 `server/`。

视觉方向稿保存在 [qizhan-launch-concept.png](<E:/vibe coding/网站复刻/design/qizhan-launch-concept.png>)。
