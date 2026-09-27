// 原站声音分析 v3：say 模板精聚类 + 渲染面盘点（renderCard / quiz / 详情层）
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../main-site-snapshot/index.html', import.meta.url), 'utf8');
const js = html.match(/<script>([\s\S]*?)<\/script>/)[1];

function extract(name) {
  const re = new RegExp(`(?:const|let|var)\\s+${name}\\s*=\\s*`);
  const idx = js.search(re);
  if (idx < 0) return null;
  const start = js.indexOf('=', idx) + 1;
  let depth = 0, inStr = null, esc = false, end = -1;
  for (let i = start; i < js.length; i++) {
    const c = js[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inStr = c; continue; }
    if (c === '[' || c === '{') depth++;
    else if (c === ']' || c === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
  }
  try { return eval('(' + js.slice(start, end) + ')'); }
  catch (e) { return null; }
}

const entries = extract('entries');

// say 模板：取 say 去掉术语和引号内容后的「骨架句」聚类（按前 14 字）
console.log('=== say 骨架聚类 TOP20 ===');
const tpl = {};
for (const e of entries) {
  let s = (e.say || '').trim().replace(/[“"][^”"]*[”"]/g, '「X」');
  const key = s.slice(0, 14);
  (tpl[key] ||= []).push(e.term);
}
const top = Object.entries(tpl).sort((a, b) => b[1].length - a[1].length).slice(0, 20);
for (const [k, terms] of top) console.log(`${terms.length} × "${k}…"  例: ${terms[0]}`);
console.log(`其余 ${355 - top.reduce((a, b) => a + b[1].length, 0)} 条为词条定制 say`);

// 每个高频骨架的完整实例
console.log('\n--- 高频骨架完整实例 ---');
for (const [k] of top.slice(0, 10)) {
  const e = entries.find(x => (x.say || '').replace(/[“"][^”"]*[”"]/g, '「X」').startsWith(k));
  console.log(`\n[${e.term}] ${e.say}`);
}

// renderCard 与 quiz 函数源码
console.log('\n=== renderCard 源码 ===');
const rc = js.match(/function renderCard[\s\S]{0,1400}/);
console.log(rc ? rc[0] : '未找到');
console.log('\n=== quiz 相关函数 ===');
const qz = js.match(/function\s+\w*[Qq]uiz\w*[\s\S]{0,900}/);
console.log(qz ? qz[0] : '未找到');

// 详情/展开相关
console.log('\n=== 详情层线索（detail/expand/modal 相关函数名）===');
const fns = [...js.matchAll(/function\s+(\w+)/g)].map(m => m[1]);
console.log(fns.join(', '));
