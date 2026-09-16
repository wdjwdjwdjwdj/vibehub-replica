# 素材与授权台账

本项目当前采用独立 HTML/CSS/React 实现。以下素材记录的是来源和发布前状态；未确认可再分发的源站素材不得作为独立站正式品牌素材发布。

| 素材 | 当前本地路径 | 来源 | 当前用途 | 发布状态 |
| --- | --- | --- | --- | --- |
| VibeHub logo（源站抓取/本地 QA） | `public/assets/vh-logo.png` | `https://vibe-hub.org/assets/vh-logo-v4-tight.png` | 本地视觉基线与默认兼容模式 | 待最终品牌 Logo 替换或确认授权 |
| Oil favicon（源站兼容素材） | `public/assets/oil-favicon.png` | 原站 Oil 合作方素材 | 默认兼容模式 Footer/Header | 独立站发布前应移除或取得授权 |
| 源站 pronunciation 音频 | 未复制进 `public/` | `https://vibe-hub.org/audio/pronunciations/html.mp3` | T2 基线证据中记录；本地 Demo 不依赖源站网络 | 待确认授权；不作为独立站发布依赖 |
| Design Styles Apple wallpaper | `public/assets/style-imagery/apple-glass-ribbons.webp` | `https://vibe-hub.org/assets/style-imagery/apple-glass-ribbons.webp` | Design Styles 目录 Apple HIG 卡片的本地视觉复刻 | 待确认授权；独立站发布前替换或移除 |
| Design Styles album cover | `public/assets/slide-forest.png` | `https://vibe-hub.org/assets/slide-forest.png` | Design Styles 目录 Glassmorphism 卡片的本地视觉复刻 | 待确认授权；独立站发布前替换或移除 |
| Manrope / Tabler 字体 | 未复制进 `public/` | 原站 Network 证据 | T1/T2 勘察记录 | 未确认授权；当前本地使用系统字体回退 |
| `design/vibehub-concept.png` | `design/vibehub-concept.png` | 项目历史设计资产 | 仅设计参考/QA，不参与渲染 | 不得当作原站截图或页面实现 |

独立品牌模式由 `VITE_SITE_INDEPENDENT=true` 控制；在站点名称、Logo、favicon 和授权确认前，不应把默认源站素材部署到公网。
