// 生成剩余未升级词条的分类工作清单 → content-system/worklist/<序号>-<分类>.json
// 用法: node content-system/batch-worklist.mjs
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';

const html = readFileSync(new URL('../main-site-snapshot/index.html', import.meta.url), 'utf8');
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
const entries = eval('(' + js.slice(start, end) + ')');

// 已升级词条（samples 里 name.zh 能匹配到的）
const done = new Set();
for (const f of readdirSync(new URL('./samples', import.meta.url)).filter(f => f.endsWith('.json'))) {
  const d = JSON.parse(readFileSync(new URL(`./samples/${f}`, import.meta.url), 'utf8'));
  done.add(d.name.zh);
}

const rest = entries.filter(e => !done.has(e.term));
const byCat = {};
for (const e of rest) (byCat[e.cat] ||= []).push({ term: e.term, level: e.level, q: e.q, a: e.a, say: e.say });

mkdirSync(new URL('./worklist', import.meta.url), { recursive: true });
let n = 0;
const summary = [];
for (const [cat, items] of Object.entries(byCat)) {
  n++;
  const file = `${String(n).padStart(2, '0')}-${cat.replace(/\s+/g, '_')}.json`;
  writeFileSync(new URL(`./worklist/${file}`, import.meta.url), JSON.stringify(items, null, 1));
  summary.push(`${file}: ${items.length} 条 [${items.map(i => i.term).join('、')}]`);
}
console.log(`剩余 ${rest.length} 条，${Object.keys(byCat).length} 个分类：\n` + summary.join('\n'));
