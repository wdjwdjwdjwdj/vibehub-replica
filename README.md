# 起站 — Vibe Coding 术语图鉴

在 `https://vibe-hub.org` 基础上做的一比一复刻站：354 个术语 × 中英双语，共 726 条路由，纯静态输出到 `dist/`。

技术栈：Vite + React + 手写 CSS。技术债与验收状态见 `docs/parity-ledger.md`。

## 本地运行

```bash
npm install
npm run dev
```

默认地址 `http://127.0.0.1:5174/`。注意：仓库里多数验收脚本默认打这个端口，切换端口需要显式设置 `VIBEHUB_BASE_URL`。

## 构建与验收

```bash
npm run build
npm run preview
npm run test:routes     # 726 条路由全量 200
npm run test:terms      # 708 条双语术语详情渲染
npm run test:demos      # 644 个详情 Demo 家族审计
npm run test:catalog
npm run test:practice
```

完整验收脚本清单见 `package.json` 的 `scripts` 字段。双服务联调（前端 + `server/` 后端）用 `npm run test:p1`。

## 品牌配置

品牌名默认「起站」，可用环境变量覆盖，见 `src/siteConfig.js`：

```bash
VITE_SITE_NAME=起站
VITE_SITE_TAGLINE_ZH=Vibe Coding 术语图鉴
VITE_SITE_TAGLINE_EN=Your Vibe Coding Guide
VITE_SITE_LOGO=/assets/brand-mark.svg
VITE_SITE_FAVICON=/assets/brand-mark.svg
```

「起站」是当前工作名，长期运营前仍需确认域名、商标与社交账号可用性。

## 部署

静态发布目录 `dist/`，`public/_redirects` 为支持该规则的平台提供 SPA 回退；其他平台需把所有路径回退到 `index.html`。

发布前必须隔离发布：仓库根含 `server/`（约 347 MB 后端骨架）与 `replication-evidence/`，直接发布根目录会被平台判定为需要后端。做法是把 `dist/` 复制到项目外干净目录再发布。

## 已归档的产品线

2026-09-23 起，仓库只保留 VibeHub 复刻这一条线。原「起站 · AI 建站入门」试用版（8 概念 + 小练习）已整体归档到 `archive/qizhan-line-2026-09-23/`，不参与构建、不进包，仅作历史留档。

## 记忆体系

项目记忆在 `.workbuddy/memory/`，分四个维度维护 + 代码变更自动同步。规则见 `.workbuddy/memory/SYSTEM.md`，同步命令 `npm run memory:sync`。
