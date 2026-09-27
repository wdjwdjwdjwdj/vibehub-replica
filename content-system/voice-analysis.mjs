// 原站声音分析 v1：对 355 条词条做量化统计，产出 STYLE-GUIDE v5 的数据依据
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
  catch (e) { console.log(name, 'eval fail:', e.message.slice(0, 120)); return null; }
}

const entries = extract('entries');
if (!entries) { console.log('entries 提取失败'); process.exit(1); }
console.log(`共 ${entries.length} 条词条，字段: ${Object.keys(entries[0]).join(', ')}`);

const pct = (arr, p) => arr[Math.floor(arr.length * p)];
const stats = (name, lens) => {
  const s = [...lens].sort((a, b) => a - b);
  const avg = (s.reduce((a, b) => a + b, 0) / s.length).toFixed(1);
  console.log(`${name}: n=${s.length} 平均=${avg} P10=${pct(s, .1)} P25=${pct(s, .25)} 中位=${pct(s, .5)} P75=${pct(s, .75)} P90=${pct(s, .9)} P99=${pct(s, .99)} min=${s[0]} max=${s[s.length-1]}`);
};

console.log('\n=== 1. 字段长度分布 ===');
stats('q  场景问句', entries.map(e => (e.q || '').length));
stats('a  一句话讲解', entries.map(e => (e.a || '').length));
stats('say 指令', entries.map(e => (e.say || '').length));
stats('合计 q+a+say', entries.map(e => ((e.q||'') + (e.a||'') + (e.say||'')).length));

console.log('\n=== 2. q 的收尾符号 ===');
const ending = {};
for (const e of entries) {
  const q = (e.q || '').trim();
  const last = q.slice(-1);
  ending[last] = (ending[last] || 0) + 1;
}
console.log(Object.entries(ending).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${JSON.stringify(k)}: ${v} (${Math.round(v / entries.length * 100)}%)`).join('\n'));

console.log('\n=== 3. q 的疑问词开头分布 ===');
const starts = {};
for (const e of entries) {
  const q = (e.q || '').trim();
  const key = q.slice(0, 2);
  starts[key] = (starts[key] || 0) + 1;
}
console.log(Object.entries(starts).sort((a, b) => b[1] - a[1]).slice(0, 25).map(([k, v]) => `"${k}…": ${v}`).join('\n'));

console.log('\n=== 4. a 的句号数（句子数近似）===');
stats('a 句子数', entries.map(e => ((e.a || '').match(/[。！？]/g) || []).length + 1));
const noPeriod = entries.filter(e => !/[。！？]/.test(e.a || '')).length;
console.log(`a 中不含句号的（单句流水）: ${noPeriod}`);

console.log('\n=== 5. say 结构分析 ===');
// say 常见动词开头
const sayStarts = {};
for (const e of entries) {
  const s = (e.say || '').trim().replace(/^(请|帮我|帮)/, '');
  sayStarts[s.slice(0, 3)] = (sayStarts[s.slice(0, 3)] || 0) + 1;
}
console.log('say 开头三字 TOP20:');
console.log(Object.entries(sayStarts).sort((a, b) => b[1] - a[1]).slice(0, 20).map(([k, v]) => `"${k}…": ${v}`).join('\n'));

console.log('\n=== 6. 高频词（剔除标点，2 字以上，人工判停用词后看列表）===');
const words = {};
const stop = new Set(['什么', '我们', '你们', '一个', '这个', '那个', '可以', '就是', '不是', '没有', '自己', '怎么', '为什么', '时候', '如果', '但是', '所以', '因为', '还是', '以及', '通过', '使用', '进行', '一下', '一些', '这样', '那样', '来说', '来说', '出现', '时候']);
for (const e of entries) {
  const text = (e.q || '') + (e.a || '') + (e.say || '');
  const seg = text.match(/[\u4e00-\u9fa5]{2,6}|[A-Za-z][A-Za-z0-9-]{1,15}/g) || [];
  for (const w of seg) {
    if (stop.has(w)) continue;
    if (/^[\u4e00-\u9fa5]{2}$/.test(w) && ['里面', '外面', '上面', '下面', '东西', '地方', '问题', '内容', '情况', '数据', '信息', '过程', '方式', '方法'].includes(w)) continue;
    words[w] = (words[w] || 0) + 1;
  }
}
console.log(Object.entries(words).sort((a, b) => b[1] - a[1]).slice(0, 60).map(([k, v]) => `${k}:${v}`).join('  '));

console.log('\n=== 7. 语气标记 ===');
const toneChecks = {
  '问号(勾好奇)': e => /[?？]/.test(e.q || ''),
  '第一人称「你」': e => /你/.test((e.q||'') + (e.a||'')),
  '「其实」': e => /其实/.test((e.q||'') + (e.a||'')),
  '「本质」/「本质是」': e => /本质/.test((e.a||'')),
  '「就是」': e => /就是/.test((e.a||'')),
  '「相当于」/「就像」类比': e => /相当于|就像|好比/.test((e.a||'')),
  '「不用/不用管」宽慰': e => /不用|不用管|不用/.test((e.a||'') + (e.say||'')),
  '数字出现在 a': e => /\d/.test(e.a || ''),
  '英文术语出现在 a': e => /[A-Za-z]{2,}/.test(e.a || ''),
};
for (const [name, fn] of Object.entries(toneChecks)) {
  const n = entries.filter(fn).length;
  console.log(`${name}: ${n} (${Math.round(n / entries.length * 100)}%)`);
}

console.log('\n=== 8. level 字段分布 ===');
const levels = {};
for (const e of entries) levels[e.level || '(空)'] = (levels[e.level || '(空)'] || 0) + 1;
console.log(JSON.stringify(levels));

console.log('\n=== 9. 分类分布 ===');
const cats = {};
for (const e of entries) cats[e.cat || '(空)'] = (cats[e.cat || '(空)'] || 0) + 1;
console.log(JSON.stringify(cats));

console.log('\n=== 10. 最长/最短的 8 条（看边界样例）===');
const sorted = [...entries].sort((a, b) => ((a.q||'').length + (a.a||'').length) - ((b.q||'').length + (b.b||'').length || (b.q||'').length + (b.a||'').length));
for (const e of sorted.slice(0, 8)) console.log(`[${e.term}] ${e.q} | ${e.a} | say: ${e.say}`);
console.log('...');
for (const e of sorted.slice(-8)) console.log(`[${e.term}] ${e.q} | ${e.a} | say: ${e.say}`);
