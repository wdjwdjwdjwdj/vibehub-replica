import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

// 一致性校验：
// 1) 已归档产品线的文件是否还在活跃路径
// 2) 四个维度记忆文件是否存在且带日期戳
// 3) 构建配置是否指向唯一入口
// 4) 记忆同步快照是否与当前 git HEAD 一致

const root = process.cwd();
const checks = [];
const add = (ok, name, detail) => checks.push({ ok, name, detail });

// 1) 归档产品线残留
const FORBIDDEN = [
  'src/launchApp.jsx',
  'src/launch',
  'launch-public',
  'vite.vibehub.config.js',
  'vibehub.html',
  'tests/launch.spec.js',
  'dist-vibehub-qa',
];
const present = FORBIDDEN.filter((p) => fs.existsSync(path.join(root, p)));
add(present.length === 0, '归档产品线残留', present.length ? `仍存在: ${present.join(', ')}` : '已清除（archive/ 内不算）');

// 旧产品线已在 Git 历史中留档，不再占用活动工作树
const retiredArchive = path.join(root, 'archive', 'qizhan-line-2026-09-23');
add(!fs.existsSync(retiredArchive), '旧产品线已移出活动树', '可从 Git 提交 573dc6a 恢复');

// 2) 记忆体系
const memoryDir = path.join(root, '.workbuddy', 'memory');
const dims = ['01-background.md', '02-decisions.md', '03-progress.md', '04-conventions.md'];
const missingDims = dims.filter((f) => !fs.existsSync(path.join(memoryDir, f)));
add(missingDims.length === 0, '四维记忆文件齐备', missingDims.length ? `缺失: ${missingDims.join(', ')}` : dims.join(', '));

let stamped = 0;
for (const f of dims) {
  const full = path.join(memoryDir, f);
  if (!fs.existsSync(full)) continue;
  const content = fs.readFileSync(full, 'utf8');
  if (/^- \[\d{4}-\d{2}-\d{2}\]/m.test(content)) stamped += 1;
}
add(stamped === dims.length, '维度条目带日期戳', `${stamped}/${dims.length}`);

add(fs.existsSync(path.join(memoryDir, 'SYSTEM.md')), '体系说明存在', '.workbuddy/memory/SYSTEM.md');
add(fs.existsSync(path.join(memoryDir, '05-code-map.md')), '代码反向索引存在', '.workbuddy/memory/05-code-map.md');

// 3) 构建配置
let configOk = false;
let configDetail = '';
const configPath = path.join(root, 'vite.config.js');
if (fs.existsSync(configPath)) {
  const content = fs.readFileSync(configPath, 'utf8');
  configOk = content.includes("input: { index: 'index.html' }") && content.includes("outDir: 'dist'") && !content.includes('launch-public');
  configDetail = configOk ? 'index.html → dist/，无 launch-public' : '配置内容与预期不符';
}
add(configOk, '默认构建配置指向唯一入口', configDetail);

const entryOk = fs.existsSync(path.join(root, 'index.html')) && fs.readFileSync(path.join(root, 'index.html'), 'utf8').includes('/src/main.jsx');
add(entryOk, '入口 HTML 引用主入口', 'index.html → /src/main.jsx');

const pkgPath = path.join(root, 'package.json');
let pkgOk = false;
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  pkgOk = !('dev:vibehub' in pkg.scripts) && !('build:vibehub' in pkg.scripts) && 'memory:sync' in pkg.scripts;
}
add(pkgOk, 'package.json 脚本已收敛', '无 dev:vibehub / build:vibehub，含 memory:sync');

// 4) 同步快照新鲜度
const statePath = path.join(memoryDir, 'sync', 'git-state.json');
if (!fs.existsSync(statePath)) {
  add(false, '记忆同步快照', '未生成，请跑 npm run memory:sync');
} else {
  const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
  let head = '';
  try {
    head = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
  } catch {
    head = '';
  }
  const fresh = state.head === head;
  add(fresh, '同步快照与 HEAD 一致', fresh ? `${state.headShort} @ ${state.syncedAt}` : `快照 ${state.headShort} ≠ 当前 ${head.slice(0, 7)}，请重跑 memory:sync`);
}

// 输出
const failed = checks.filter((c) => !c.ok);
const lines = checks.map((c) => `${c.ok ? 'PASS' : 'FAIL'}  ${c.name} — ${c.detail}`);
lines.push('');
lines.push(failed.length ? `结果：${checks.length - failed.length}/${checks.length} 通过，${failed.length} 项未通过` : `结果：全部 ${checks.length} 项通过`);
console.log(lines.join('\n'));
process.exit(failed.length ? 1 : 0);
