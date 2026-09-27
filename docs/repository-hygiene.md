# 仓库卫生与恢复说明

## 当前 source of truth

- React/Vite 正式工程：`src/`、`public/`、`index.html`、`vite.config.js`
- 内容生产：`content-system/samples/`、`content-system/*.mjs`、`content-system/*.md`
- 内容基线与升级结果：`main-site-snapshot/`、`main-site-upgraded/`
- 后端与数据库历史：`server/src/`、`server/prisma/`
- 测试与审计逻辑：`tests/`、`scripts/`

## 默认不入库

- Vite 构建产物 `dist/`
- Playwright 输出 `test-results/`、`playwright-report/`
- 本地 Agent 与工具状态 `.mimosa/`、`.v2c/`、`.workbuddy/`
- 可由脚本生成的内容预览 HTML
- 批量截图、DOM 快照和中间 QA 轮次

新的复刻采集脚本统一写入 `replication-evidence/current/`；该目录默认忽略，需要长期保留的最终证据必须显式筛选后再入库。

## 证据保留策略

活动分支只保留最终核验需要的紧凑证据。完整的历史复刻证据、旧产品线和概念图保存在 Git 提交 `573dc6a`，需要时可只读查看：

```bash
git show 573dc6a:<path>
```

清理前本地恢复分支：`backup/before-repo-cleanup-20260927-2131`。

## 判定依据

- Git 官方说明：`.gitignore` 用于保持可再生或本地专属文件不被跟踪；已跟踪内容需要从索引中移除。
- Vite 官方说明：默认构建输出是 `dist/`，可由 `vite build` 重建。
- Playwright 官方说明：默认测试输出是 `test-results/`，HTML 报告默认位于 `playwright-report/`。
- Prisma 官方说明：`prisma/migrations/` 是数据库迁移历史，必须进入版本控制，因此本次不清理。
- GitHub 官方建议：程序生成文件应存放在 Git 仓库外，二进制大文件应谨慎进入普通 Git 历史。
