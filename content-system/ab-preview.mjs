// A/B 并排预览：原站卡片 vs v5 新版卡片（静态审查产物，不改主站）
// 用法: node content-system/ab-preview.mjs → content-system/ab-preview.html
import { readFileSync, writeFileSync } from 'node:fs';

const html = readFileSync(new URL('../main-site-snapshot/index.html', import.meta.url), 'utf8');
const js = html.match(/<script>([\s\S]*?)<\/script>/)[1];
function extract(name) {
  const idx = js.search(new RegExp(`(?:const|let|var)\\s+${name}\\s*=\\s*`));
  const start = js.indexOf('=', idx) + 1;
  let depth = 0, inStr = null, esc = false, end = -1;
  for (let i = start; i < js.length; i++) {
    const c = js[i];
    if (inStr) { if (esc) esc = false; else if (c === '\\') esc = true; else if (c === inStr) inStr = null; continue; }
    if (c === '"' || c === "'" || c === '`') { inStr = c; continue; }
    if (c === '[' || c === '{') depth++;
    else if (c === ']' || c === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
  }
  return eval('(' + js.slice(start, end) + ')');
}
const entries = extract('entries');

const card = (e, tag, cls) => `
  <article class="card ${cls}">
    <div class="tag">${tag}</div>
    <div class="card-top"><span class="term">${e.term}</span><span class="meta">${e.level ?? ''} ${e.cat ?? ''}</span></div>
    <span class="card-label">大白话场景</span>
    <h3>${e.q} <em class="len">${e.q.length}字</em></h3>
    <span class="card-label">一句话讲解</span>
    <p>${e.a} <em class="len">${e.a.length}字</em></p>
    <div class="say-block"><div class="say-head"><b>跟 AI 说</b></div><p class="say-text">${e.say} <em class="len">${e.say.length}字</em></p></div>
    <div class="sum">合计 ${(e.q + e.a + e.say).length} 字</div>
  </article>`;

const rows = ['HTTP', '状态'].map(term => {
  const old = entries.find(e => e.term === term);
  const neu = JSON.parse(readFileSync(new URL(`./samples/${old && term === 'HTTP' ? 'http' : 'state'}.json`, import.meta.url), 'utf8'));
  const n = neu.lang.zh;
  return `<section><h2>${term}</h2><div class="grid">
    ${card(old, '原站版', 'old')}
    ${card({ term, level: old.level, cat: old.cat, q: n.scene, a: n.explain, say: n.say }, 'v5 新版', 'new')}
  </div></section>`;
}).join('\n');

writeFileSync(new URL('./ab-preview.html', import.meta.url), `<!doctype html><html lang="zh"><head><meta charset="utf-8">
<title>A/B 对照 · v5 首验（HTTP / 状态）</title><style>
  body{font-family:"PingFang SC","Microsoft YaHei",system-ui,sans-serif;background:#f5f6f8;margin:0;padding:32px;color:#1c1e21}
  header{max-width:1080px;margin:0 auto 24px}
  h1{font-size:20px;margin:0 0 8px}
  header p{color:#5a6068;font-size:14px;margin:0}
  section{max-width:1080px;margin:0 auto 32px}
  h2{font-size:16px;border-left:4px solid #2c6ecb;padding-left:10px}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
  @media(max-width:860px){.grid{grid-template-columns:1fr}}
  .card{background:#fff;border:1px solid #e2e5ea;border-radius:14px;padding:18px 20px;position:relative}
  .card.old{border-top:3px solid #9aa1ab}
  .card.new{border-top:3px solid #2c6ecb}
  .tag{position:absolute;top:-12px;right:12px;font-size:12px;padding:2px 10px;border-radius:99px;background:#fff;border:1px solid currentColor}
  .old .tag{color:#6b7280}.new .tag{color:#2c6ecb}
  .card-top{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px}
  .term{font-weight:700;font-size:17px}
  .meta{color:#8a919b;font-size:12px}
  .card-label{display:block;font-size:11px;color:#9aa1ab;margin:12px 0 4px;letter-spacing:.05em}
  h3{font-size:16px;margin:0;line-height:1.5}
  p{font-size:14px;margin:0;line-height:1.75}
  .len{font-style:normal;font-size:11px;color:#b3b9c2;white-space:nowrap}
  .say-block{margin-top:14px;background:#f6f8fb;border:1px dashed #d4dae2;border-radius:10px;padding:10px 14px}
  .say-head b{font-size:12px;color:#5a6068}
  .say-text{margin-top:4px;font-size:13px;color:#3d434b}
  .sum{margin-top:12px;font-size:12px;color:#8a919b;text-align:right}
  footer{max-width:1080px;margin:0 auto;color:#5a6068;font-size:13px;line-height:1.8;border-top:1px solid #e2e5ea;padding-top:16px}
</style></head><body>
<header><h1>A/B 对照 · v5 标准首验：HTTP 与 状态</h1>
<p>左原站右新版。看三点：①扫读节奏是否一致（单卡三段、无展开）；②每 1 字信息量是否 ≥ 原站；③新版是否多给了东西（HTTP：状态码+请求/响应分工；状态：易失性+去向）。</p></header>
${rows}
<footer>深度方案：卡片保持三槽位节奏；深度出口 = a 的密度 + say 的指令（现场向 AI 取回）+ 独立知识点拆词条；quiz 字段留待第二阶段接入主站测验页。详见 content-system/AB-ROUND5.md 与 STYLE-GUIDE v5。</footer>
</body></html>`);
console.log('已生成 content-system/ab-preview.html');
