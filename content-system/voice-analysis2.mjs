// 原站声音分析 v2：a 的句法结构、say 模板聚类、入门/进阶差异
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

// 1. a 的逐句结构：每句开头词 + 每句长度
console.log('=== a 第一句开头 TOP25 ===');
const s1 = {}, s2 = {}, s3 = {};
for (const e of entries) {
  const parts = (e.a || '').split(/(?<=[。！？])/).filter(s => s.trim());
  const w = (parts[0] || '').slice(0, 4);
  s1[w] = (s1[w] || 0) + 1;
  if (parts[1]) { const w2 = parts[1].trim().slice(0, 4); s2[w2] = (s2[w2] || 0) + 1; }
  if (parts[2]) { const w3 = parts[2].trim().slice(0, 6); s3[w3] = (s3[w3] || 0) + 1; }
}
console.log(Object.entries(s1).sort((a, b) => b[1] - a[1]).slice(0, 25).map(([k, v]) => `"${k}…": ${v}`).join('\n'));
console.log('\n=== a 第二句开头 TOP25 ===');
console.log(Object.entries(s2).sort((a, b) => b[1] - a[1]).slice(0, 25).map(([k, v]) => `"${k}…": ${v}`).join('\n'));
console.log('\n=== a 第三句开头 TOP25 ===');
console.log(Object.entries(s3).sort((a, b) => b[1] - a[1]).slice(0, 25).map(([k, v]) => `"${k}…": ${v}`).join('\n'));

// 2. say 模板聚类：把 say 里的术语名替换掉后聚类
console.log('\n=== say 模板聚类（前 90 字，去术语）===');
const tpl = {};
for (const e of entries) {
  let s = (e.say || '').trim();
  // 把术语本身和引号内内容归一化
  s = s.replace(/[“"][^”"]*[”"]/g, '「X」').replace(new RegExp(e.term, 'g'), 'X');
  const key = s.slice(0, 28);
  tpl[key] = (tpl[key] || 0) + 1;
}
const top = Object.entries(tpl).sort((a, b) => b[1] - a[1]).slice(0, 12);
for (const [k, v] of top) console.log(`${v} × "${k}…"`);
// 打印每个高频模板的一个完整实例
console.log('\n--- 每个模板的完整实例 ---');
const seen = new Set();
for (const e of entries) {
  let s = (e.say || '').trim().replace(/[“"][^”"]*[”"]/g, '「X」').replace(new RegExp(e.term, 'g'), 'X');
  const key = s.slice(0, 28);
  if (top.some(([k]) => k === key) && !seen.has(key)) {
    seen.add(key);
    console.log(`\n[${e.term}] ${e.say}`);
  }
}

// 3. 入门 vs 进阶 长度差异
console.log('\n=== 入门 vs 进阶 ===');
for (const lv of ['入门', '进阶']) {
  const es = entries.filter(e => e.level === lv);
  const ql = es.map(e => (e.q || '').length).sort((a, b) => a - b);
  const al = es.map(e => (e.a || '').length).sort((a, b) => a - b);
  const avgQ = (ql.reduce((a, b) => a + b, 0) / ql.length).toFixed(1);
  const avgA = (al.reduce((a, b) => a + b, 0) / al.length).toFixed(1);
  console.log(`${lv}: n=${es.length} q平均=${avgQ} a平均=${avgA}`);
}

// 4. q 以 。收尾的样例（陈述式场景）
console.log('\n=== q 以句号收尾的 10 个样例 ===');
entries.filter(e => /[。]$/.test((e.q || '').trim())).slice(0, 10).forEach(e => console.log(`[${e.term}] ${e.q}`));

// 5. HTTP 与 状态 原文
console.log('\n=== HTTP / 状态 原文 ===');
for (const t of ['HTTP', '状态', 'API', 'Token']) {
  const e = entries.find(x => x.term === t);
  if (e) console.log(`\n[${t}] level=${e.level}\nq: ${e.q}\na: ${e.a}\nsay: ${e.say}`);
}
