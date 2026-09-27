// 主站 HTML 内容盘点脚本 v2（只读分析）
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('./index.html', import.meta.url), 'utf8');
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
const categories = extract('categories');
const summaryDefs = extract('summaryDefs');

// 1) 词条正文字数分布（q+a+say 三个内容字段）
const contentLen = (e) => (e.q || '').length + (e.a || '').length + (e.say || '').length;
if (entries) {
  const lens = entries.map(contentLen).sort((a, b) => a - b);
  const sum = lens.reduce((a, b) => a + b, 0);
  console.log('=== 词条正文字数（q+a+say）===');
  console.log(`条数 ${entries.length} · 总字数 ${sum} · 平均 ${Math.round(sum / entries.length)} 字/条`);
  console.log(`最短 ${lens[0]} · 中位 ${lens[Math.floor(lens.length / 2)]} · 最长 ${lens[lens.length - 1]}`);
  const over100 = lens.filter(l => l >= 100).length;
  console.log(`正文 ≥100 字的词条: ${over100} 条 (${Math.round(over100 / entries.length * 100)}%)`);
}

// 2) 分类结构
if (summaryDefs) {
  console.log('\n=== 导航分组 summaryDefs ===');
  for (const s of summaryDefs) console.log(`- ${s.key}: ${(s.cats || []).join('、')}`);
}

// 3) 练习题如何生成
const quizGen = js.match(/function\s+\w*[Qq]uiz\w*\([\s\S]{0,300}/);
console.log('\n=== 练习生成逻辑（函数开头 300 字符）===');
console.log(quizGen ? quizGen[0].replace(/\s+/g, ' ') : '未找到 quiz 生成函数');

// 4) 页面主要区块标题
const heads = [...html.matchAll(/<h[123][^>]*>([\s\S]{2,80}?)<\/h[123]>/g)].map(m => m[1].replace(/<[^>]*>/g, '').trim());
console.log('\n=== 页面 H1-H3 清单（前 40）===');
console.log(heads.slice(0, 40).join(' | '));

// 5) 更新日志
const logs = [...html.matchAll(/2026\.09\.\d+[\s\S]{0,120}?(?=<li|<\/ul|$)/g)].map(m => m[0].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim());
console.log('\n=== 更新日志（原文）===');
console.log(logs.slice(0, 10).join('\n'));

// 6) 页脚与引流位
const foot = html.match(/<footer[\s\S]*?<\/footer>/);
if (foot) console.log('\n=== footer 文本 ===\n', foot[0].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 500));
const groupMention = html.match(/[\s\S]{0,80}交流群[\s\S]{0,120}/);
if (groupMention) console.log('\n=== 交流群上下文 ===\n', groupMention[0].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim());
