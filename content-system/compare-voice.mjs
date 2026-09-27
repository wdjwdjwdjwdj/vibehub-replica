// 原站 vs 升级版 内容对比分析（诊断"还不如之前"差在哪）
// 【已过时】本脚本按 v4 深度字段（e.d/e.p）写就；v5 起改用 ab-preview.mjs（A/B 对照）与 verify-rollout.mjs（改动核验）
import { readFileSync } from 'node:fs';

function loadEntries(path) {
  const html = readFileSync(new URL(path, import.meta.url), 'utf8');
  const s = html.indexOf('<script>') + 8, e = html.indexOf('</' + 'script>', s);
  const js = html.slice(s, e);
  const m = /(?:const|let|var)\s+entries\s*=\s*/.exec(js);
  const start = js.indexOf('=', m.index) + 1;
  let depth = 0, inStr = null, esc = false, end = -1;
  for (let i = start; i < js.length; i++) {
    const c = js[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'") inStr = c;
    else if (c === '[' || c === '{') depth++;
    else if (c === ']' || c === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
  }
  return eval('(' + js.slice(start, end) + ')');
}

const orig = loadEntries('../main-site-snapshot/index.html');
const upgraded = loadEntries('../main-site-upgraded/index.html');
const upgradedTerms = new Set(upgraded.filter(x => x.d).map(x => x.term));

const targets = ['HTTP', '组件', '状态', 'API'];
for (const t of targets) {
  const o = orig.find(x => x.term === t);
  const n = upgraded.find(x => x.term === t && x.d);
  if (!o) { console.log('原站无', t); continue; }
  console.log('='.repeat(60));
  console.log('【' + t + '】原站版本');
  console.log('  场景问句:', o.q, `(${o.q.length}字)`);
  console.log('  一句话讲解:', o.a, `(${o.a.length}字)`);
  console.log('  AI说法:', o.say?.slice(0, 80), `(${(o.say || '').length}字)`);
  if (n) {
    console.log('--- 升级版 ---');
    console.log('  场景:', n.q, `(${n.q.length}字)`);
    console.log('  一句话讲解:', n.a, `(${n.a.length}字)`);
    console.log('  讲透:', n.d, `(${n.d.length}字)`);
    console.log('  跟着做:', n.p?.slice(0, 60), '…');
  }
  console.log('');
}

// 量化：原站全量 q/a 的句长与语气特征
const qLens = orig.map(x => x.q.length), aLens = orig.map(x => x.a.length);
const avg = (a) => Math.round(a.reduce((x, y) => x + y, 0) / a.length);
console.log('='.repeat(60));
console.log('原站 355 条节奏：场景问句平均', avg(qLens), '字 · 讲解平均', avg(aLens), '字 · 卡片总字数平均', avg(qLens) + avg(aLens));
const questionForm = orig.filter(x => /[？?]$/.test(x.q.trim())).length;
console.log('场景问句以问号收尾的比例:', Math.round(questionForm / orig.length * 100) + '%');
const upgradedNew = upgraded.filter(x => x.d);
const nQ = upgradedNew.map(x => x.q.length), nA = upgradedNew.map(x => x.a.length);
console.log('升级 10 条节奏：场景平均', avg(nQ), '字 · 讲解平均', avg(nA), '字 · 正面总字数平均', avg(nQ) + avg(nA) + Math.round(avg(upgradedNew.map(x => (x.d || '').length + (x.p || '').length))));
