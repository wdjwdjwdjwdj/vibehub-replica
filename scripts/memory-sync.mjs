import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const root = process.cwd();
const memoryDir = path.join(root, '.workbuddy', 'memory');
const syncDir = path.join(memoryDir, 'sync');
const stateFile = path.join(syncDir, 'git-state.json');
const commitsFile = path.join(syncDir, 'commits.md');

const wantRemote = process.argv.includes('--remote');

const git = (args, opts = {}) => {
  try {
    return execFileSync('git', args, { cwd: root, encoding: 'utf8', ...opts }).trim();
  } catch {
    return '';
  }
};

// ---- 采集 git 状态 ----
const branch = git(['rev-parse', '--abbrev-ref', 'HEAD']);
const head = git(['rev-parse', 'HEAD']);
const headShort = head.slice(0, 7);
const commitSubject = git(['log', '-1', '--pretty=%s']);
const commitDate = git(['log', '-1', '--pretty=%cI']);
const statusPorcelain = git(['status', '--porcelain']);
const branches = git(['branch', '--format=%(refname:short)']).split('\n').filter(Boolean);
const upstream = git(['rev-parse', '--abbrev-ref', '@{upstream}']);
const aheadBehind = upstream ? git(['rev-list', '--left-right', '--count', `${upstream}...HEAD`]).split('\t') : [];

const changes = statusPorcelain
  .split('\n')
  .filter(Boolean)
  .map((line) => {
    const code = line.slice(0, 2).trim();
    const file = line.slice(3).replace(/^"|"$/g, '');
    return { code, file };
  });

const areaOf = (file) => {
  if (!file.includes('/')) return '根配置';
  if (file.startsWith('src/main.jsx')) return '入口/路由';
  if (file.startsWith('src/')) return '前端源码';
  if (file.startsWith('server/')) return '后端';
  if (file.startsWith('scripts/')) return '验收脚本';
  if (file.startsWith('tests/')) return 'E2E 测试';
  if (file.startsWith('docs/')) return '文档';
  if (file.startsWith('.workbuddy/memory/')) return '记忆';
  if (file.startsWith('public/')) return '静态资产';
  if (file.startsWith('archive/')) return '归档';
  if (file.startsWith('replication-evidence/')) return '复刻证据';
  return '其他';
};

const byArea = {};
for (const c of changes) {
  const area = areaOf(c.file);
  byArea[area] = byArea[area] || [];
  byArea[area].push(c.file);
}

// ---- 变更 → 记忆维度推断 ----
const RULES = [
  { area: '前端源码', dims: ['03-progress.md', '05-code-map.md'] },
  { area: '入口/路由', dims: ['03-progress.md', '05-code-map.md'] },
  { area: '后端', dims: ['03-progress.md', '05-code-map.md'] },
  { area: '验收脚本', dims: ['04-conventions.md'] },
  { area: 'E2E 测试', dims: ['03-progress.md'] },
  { area: '文档', dims: ['03-progress.md'] },
  { area: '静态资产', dims: ['03-progress.md'] },
  { area: '根配置', dims: ['02-decisions.md', '03-progress.md'] },
  { area: '其他', dims: ['03-progress.md'] },
];

const suggest = new Set();
const configTouched = changes.some((c) => /vite\.config\.js|package\.json|index\.html|siteConfig\.js/.test(c.file));
if (configTouched) suggest.add('02-decisions.md');
for (const area of Object.keys(byArea)) {
  for (const rule of RULES) if (rule.area === area) rule.dims.forEach((d) => suggest.add(d));
}

// ---- 远端（可选，失败降级） ----
let remote = null;
if (wantRemote) {
  try {
    const out = execFileSync('gh', ['api', 'repos/wdjwdjwdjwdj/vibehub-replica', '--jq', '.default_branch,.pushed_at,.open_issues_count'], { cwd: root, encoding: 'utf8' }).trim();
    const [defaultBranch, pushedAt, openIssues] = out.split('\n');
    remote = { defaultBranch, pushedAt, openIssues: Number(openIssues) };
  } catch (error) {
    remote = { unavailable: String(error.message || error).slice(0, 120) };
  }
}

const state = {
  syncedAt: new Date().toISOString(),
  branch,
  head,
  headShort,
  commitSubject,
  commitDate,
  upstream: upstream || null,
  ahead: aheadBehind[1] ? Number(aheadBehind[1]) : null,
  behind: aheadBehind[0] ? Number(aheadBehind[0]) : null,
  branches,
  workingTree: {
    dirty: changes.length > 0,
    count: changes.length,
    byArea: Object.fromEntries(Object.entries(byArea).map(([k, v]) => [k, v.length])),
    files: changes.map((c) => `${c.code} ${c.file}`),
  },
  suggestMemoryUpdates: [...suggest].sort(),
  remote,
};

fs.mkdirSync(syncDir, { recursive: true });
fs.writeFileSync(stateFile, JSON.stringify(state, null, 2) + '\n', 'utf8');

// ---- 提交流（按 sha 去重追加） ----
const existing = fs.existsSync(commitsFile) ? fs.readFileSync(commitsFile, 'utf8') : '# 提交流（memory-sync 自动追加）\n';
const log = git(['log', '--pretty=%H|%cI|%an|%s', '-20']);
const lines = log.split('\n').filter(Boolean).map((line) => {
  const [sha, date, author, subject] = line.split('|');
  return `- \`${sha.slice(0, 7)}\` ${date.slice(0, 10)} ${author} — ${subject}`;
});
const missing = lines.filter((line) => !existing.includes(line.slice(0, 12))).reverse();
if (missing.length) {
  const append = existing.endsWith('\n') ? '' : '\n';
  fs.writeFileSync(commitsFile, existing + append + missing.join('\n') + '\n', 'utf8');
}

// ---- 输出 ----
const out = [];
out.push(`memory sync @ ${state.syncedAt}`);
out.push(`branch=${branch} head=${headShort} upstream=${upstream || '(none)'} ahead=${state.ahead ?? '-'} behind=${state.behind ?? '-'}`);
out.push(`working tree: ${changes.length ? `${changes.length} 项变更` : 'clean'}`);
for (const [area, count] of Object.entries(byArea)) out.push(`  - ${area}: ${count}`);
out.push(`commits appended: ${missing.length}`);
out.push(`state -> ${path.relative(root, stateFile)}`);
if (suggest.size) out.push(`建议核对维度文件: ${[...suggest].sort().join(', ')}`);
if (remote?.unavailable) out.push(`remote: 不可用（${remote.unavailable}）`);
else if (remote) out.push(`remote: ${remote.defaultBranch} pushed=${remote.pushedAt} issues=${remote.openIssues}`);

console.log(out.join('\n'));
