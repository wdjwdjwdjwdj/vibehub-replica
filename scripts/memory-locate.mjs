import fs from 'node:fs';
import path from 'node:path';

// 反向定位：从记忆里的一个关键词回到代码上下文。
// 用法：npm run memory:locate -- <关键词>

const root = process.cwd();
const keyword = process.argv.slice(2).filter((a) => !a.startsWith('--'))[0];
if (!keyword) {
  console.error('用法: npm run memory:locate -- <关键词>');
  process.exit(1);
}

const needle = keyword.toLowerCase();
const memoryDir = path.join(root, '.workbuddy', 'memory');
const SKIP_DIRS = new Set(['node_modules', '.git', 'archive', 'replication-evidence', 'server/node_modules', 'dist', 'test-results']);
const TEXT_EXT = /\.(js|jsx|mjs|ts|tsx|json|md|css|html|svg|prisma)$/;

// 1) 先查记忆索引表
const hits = [];
if (fs.existsSync(path.join(memoryDir, '05-code-map.md'))) {
  const lines = fs.readFileSync(path.join(memoryDir, '05-code-map.md'), 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (line.toLowerCase().includes(needle) && line.includes('|')) {
      hits.push({ kind: 'memory-index', file: '.workbuddy/memory/05-code-map.md', line: i + 1, text: line.trim() });
    }
  });
}

// 2) 再查记忆维度文件
const dimFiles = ['01-background.md', '02-decisions.md', '03-progress.md', '04-conventions.md', 'MEMORY.md'];
for (const f of dimFiles) {
  const full = path.join(memoryDir, f);
  if (!fs.existsSync(full)) continue;
  fs.readFileSync(full, 'utf8').split('\n').forEach((line, i) => {
    if (line.toLowerCase().includes(needle) && line.trim().length > 2) {
      hits.push({ kind: 'memory', file: `.workbuddy/memory/${f}`, line: i + 1, text: line.trim().slice(0, 160) });
    }
  });
}

// 3) 再查代码库
const walk = (dir, out = [], depth = 0) => {
  if (depth > 6) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out, depth + 1);
    else if (TEXT_EXT.test(entry.name)) out.push(full);
  }
  return out;
};

const files = walk(root);
const codeHits = [];
for (const file of files) {
  let content;
  try {
    content = fs.readFileSync(file, 'utf8');
  } catch {
    continue;
  }
  if (content.length > 3_000_000) continue;
  content.split('\n').forEach((line, i) => {
    if (line.toLowerCase().includes(needle)) {
      codeHits.push({ file: path.relative(root, file), line: i + 1, text: line.trim().slice(0, 140) });
    }
  });
}

const out = [];
out.push(`locate: "${keyword}"`);
out.push('');
out.push(`== 记忆命中 (${hits.length}) ==`);
for (const h of hits.slice(0, 20)) out.push(`  ${h.file}:${h.line}  ${h.text}`);
if (!hits.length) out.push('  (无)');
out.push('');
out.push(`== 代码命中 (${codeHits.length}) ==`);
for (const h of codeHits.slice(0, 40)) out.push(`  ${h.file}:${h.line}  ${h.text}`);
if (codeHits.length > 40) out.push(`  ... 另有 ${codeHits.length - 40} 处`);
if (!codeHits.length) out.push('  (无)');

console.log(out.join('\n'));
