// 铺量核验：对比快照与升级版 entries，逐字段确认改动范围
// 用法: node content-system/verify-rollout.mjs
import { readFileSync } from 'node:fs';

function loadEntries(path) {
  const html = readFileSync(new URL(path, import.meta.url), 'utf8');
  const js = html.match(/<script>([\s\S]*?)<\/script>/)[1];
  const idx = js.search(/(?:const|let|var)\s+entries\s*=\s*/);
  const start = js.indexOf('=', idx) + 1;
  let depth = 0, inStr = null, esc = false, end = -1;
  for (let i = start; i < js.length; i++) {
    const c = js[i];
    if (inStr) { if (esc) esc = false; else if (c === '\\') esc = true; else if (c === inStr) inStr = null; continue; }
    if (c === '"' || c === "'" || c === '`') { inStr = c; continue; }
    if (c === '[' || c === '{') depth++;
    else if (c === ']' || c === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
  }
  return { entries: eval('(' + js.slice(start, end) + ')'), html };
}

const snap = loadEntries('../main-site-snapshot/index.html');
const upg = loadEntries('../main-site-upgraded/index.html');

if (snap.entries.length !== upg.entries.length) {
  console.log(`❌ 条数不一致: 快照 ${snap.entries.length} vs 升级 ${upg.entries.length}`);
  process.exit(1);
}

let changed = [], intact = 0, fieldViolations = [];
for (let i = 0; i < snap.entries.length; i++) {
  const a = snap.entries[i], b = upg.entries[i];
  if (a.term !== b.term || a.cat !== b.cat || a.level !== b.level) {
    fieldViolations.push(`#${i} ${a.term}: term/cat/level 被改动`);
    continue;
  }
  const diff = (a.q !== b.q) + (a.a !== b.a) + (a.say !== b.say);
  const extra = Object.keys(b).filter(k => !['cat', 'term', 'level', 'q', 'a', 'say'].includes(k));
  if (extra.length) fieldViolations.push(`${a.term}: 出现额外字段 ${extra.join(',')}`);
  if (diff === 0) intact++;
  else changed.push(`${a.term}（${a.cat}·${a.level}，改 ${['q', 'a', 'say'].filter(k => a[k] !== b[k]).join('/')}）`);
}

// 深度注入残留检查
const leftovers = ['openDeep', 'deep-open', 'deep-morebox', 'deep-practice', 'deep-mis', 'deep-opt', '.deep-'].filter(k => upg.html.includes(k));

console.log(`词条总数: ${snap.entries.length}`);
console.log(`升级词条: ${changed.length} 条`);
changed.forEach(t => console.log(`  ↑ ${t}`));
console.log(`未动词条: ${intact} 条（term/cat/level/q/a/say 全部一致）`);
if (fieldViolations.length) { console.log('❌ 违规改动:'); fieldViolations.forEach(v => console.log('  ' + v)); }
if (leftovers.length) { console.log('❌ 深度注入残留:', leftovers.join(', ')); }
const ok = !fieldViolations.length && !leftovers.length;
console.log(ok ? '\n✅ 核验通过：改动仅限升级词条的三槽位，其余零变化' : '\n❌ 核验未通过');
process.exit(ok ? 0 : 1);
