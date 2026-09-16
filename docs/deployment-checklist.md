# 部署验收清单

当前状态：本地 production build 与浏览器验收已完成；公网部署未执行。

## 部署前需要确认

- 部署平台：Vercel、Netlify、Cloudflare Pages 或其他平台
- 账号归属：部署到哪个用户/组织账号
- 站点名称：浏览器标题、站点展示名和域名
- 自有品牌素材：Logo、favicon、描述，以及是否替换当前 Oil 合作方/社交链接
- 是否保留 `/en` 英文入口和原站课程/Practice 内容

## 构建与启动

```bash
npm install
npm run build
npm run preview -- --host 127.0.0.1
```

这是纯静态 Vite 输出，发布目录为 `dist/`；Vite 会在构建时把品牌值写入静态 HTML，React 运行时也会同步浏览器元数据。部署环境可配置：

```bash
VITE_SITE_NAME=Your Site Name
VITE_SITE_DESCRIPTOR=Your site description
VITE_SITE_DESCRIPTION=Your description for static HTML and sharing previews
VITE_SITE_LOGO=/assets/your-logo.png
VITE_SITE_FAVICON=/assets/your-favicon.png
```

独立站必须同时设置 `VITE_SITE_INDEPENDENT=true`，并按 `.env.example` 填写 Footer 合作方、社交链接和投稿入口；否则默认保留原站 VibeHub/Oil 基线，避免在品牌值未确认时误发布。

## 公网验收

- 首页、`/en`、322 条中英文详情路由可打开，刷新不落到 404
- Practice 随机选题、答错重选、答对解锁指南、下一题和最近 12 条记录可用；详情 QuickCheck 按原站答案位置显示反馈
- 课程总览、章节目录、Git 课程和 Skill Lab 可打开
- 移动端 390px 无横向滚动
- 刷新后收藏、深色模式和调查状态分别保持在原站兼容 key 中
- 浏览器 console 无运行时错误，页面不含 iframe 或整页截图替代物
- 首屏标题、favicon、Logo、社交链接与确认后的品牌值一致
- 保存公网地址、部署时间、平台项目名和最终截图到交付记录

## 当前未完成

- 未确认部署平台、账号归属、站点名称和域名，因此没有公网地址。
- 自有品牌实际替换尚未执行；当前只提供环境配置入口，默认仍为 VibeHub 基线。
- 原站与本地 Demo 的逐条视觉细节差异仍记录在 `docs/difference-log.md`。
- exact-runtime 证据：T1 `/replication-evidence/vibehub-independent-mirror/runtime-v3` 已完成资源抓取与离线回放，但 DOM 页面无绘制帧，机器 interaction gate 未通过；普通 DOM 站点的 T2_DIRECT 基线、Implementation Contract 和 `T2-PREFLIGHT.json` 已通过，T2 QA 的 8 个状态无运行时错误且整页尺寸一致，但像素差仍超 1% 门槛，不能标记视觉 gate 完成。素材权利详情见 `docs/asset-rights-ledger.md`。
