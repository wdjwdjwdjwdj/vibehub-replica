# 内部运行机制对齐计划与验收

## 研究结论

目标站是 DOM/CSS/React 风格的浏览器运行时，不是 Canvas/WebGL 页面。因而“机制基本一致”按用户可观察的状态转移验收：输入事件、状态节点、存储副作用、反馈是否改变文档流，以及诊断结果。

已对照源站实测的关键路径：

1. `/en/html`：Survey 首次显示并可关闭；第二个选项为正确答案；答题反馈会使 Quick check 和父级文档流增高。
2. `/en/button`：四个英文场景是静态示例，点击 Delete 不产生反馈或场景状态副作用；中文只显示两个场景。
3. `/en/api`：Next 驱动 1/6 到 6/6 的六状态流程；首状态 Previous 禁用，末状态 Next 禁用；末状态为 response/backend done/database saved。
4. Header 主题色：首次访问不写主题色 key；选择 Violet 后写入 `vibe-guide-theme=violet`，并应用 `--brand=#7c3aed`。

## 落地规则

- 以源站运行时观测为 oracle，不为通过旧 Canvas draw gate 人工增加 Canvas。
- 对会改变内容高度的反馈使用自然文档流；静态校准只保留为初始几何基线。
- 保留 React 组件可编辑性，但不为源站静态示例增加源站没有的状态副作用。
- 每次改动同时跑本地回归和 Source/Local runtime parity，源站网络失败单独记录，不折算成代码通过。

## 验收命令

```text
npm run build
npm run test:e2e
npm run test:routes
npm run audit:runtime-parity
```

运行时报告写入 `replication-evidence/vibehub-independent-runtime/runtime-parity/RUNTIME-PARITY.json`，要求 `runtimeParityPassed=true` 且 `diagnosticsPassed=true`。
