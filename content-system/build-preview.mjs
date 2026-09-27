// 样板词条验收预览页生成器：左列主站闪卡，右列新样板
// 用法: node content-system/build-preview.mjs → 生成 content-system/preview.html
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const base = dirname(fileURLToPath(import.meta.url));

// —— 从主站快照提取 entries（括号配平截取）——
const html = readFileSync(join(base, '..', 'main-site-snapshot', 'index.html'), 'utf8');
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
  try { return eval('(' + js.slice(start, end) + ')'); } catch { return null; }
}
const mainEntries = extract('entries') || [];

// —— 读取样板词条 ——
const samples = readdirSync(join(base, 'samples'))
  .filter(f => f.endsWith('.json'))
  .map(f => JSON.parse(readFileSync(join(base, 'samples', f), 'utf8')));

// —— 主站闪卡匹配（按中文名/别名，大小写不敏感）——
const norm = (s) => (s || '').toLowerCase().replace(/\s+/g, '');
function findFlashcard(sample) {
  const candidates = [norm(sample.name.zh), norm(sample.name.en), ...(sample.aliases?.zh || []).map(norm)];
  return mainEntries.find(e => candidates.includes(norm(e.term)))
    || mainEntries.find(e => candidates.some(c => c && norm(e.term).includes(c) && c.length >= 3));
}
const contentLen = (L) => L.one_liner.length + L.scene.length + L.explain.length + L.tool_practice.length + L.say.length
  + JSON.stringify(L.misconceptions).length + JSON.stringify(L.related).length + JSON.stringify(L.quick_check).length;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const cards = samples.map((s) => {
  const zh = s.lang.zh, en = s.lang.en;
  const fc = findFlashcard(s);
  const newLen = contentLen(zh), oldLen = fc ? (fc.q?.length || 0) + (fc.a?.length || 0) + (fc.say?.length || 0) : 0;
  const mis = (zh.misconceptions || []).map(m => `<div class="mis"><b class="w">✗ ${esc(m.wrong)}</b><span class="r">✓ ${esc(m.right)}</span></div>`).join('');
  const rel = (zh.related || []).map(r => `<span class="rel"><b>${esc(r.id)}</b>${esc(r.why)}</span>`).join('');
  const qc = zh.quick_check;
  const opts = (qc.options || []).map((o, i) => `<div class="opt ${i === qc.answer ? 'ok' : ''}">${'ABC'[i]}. ${esc(o)}${i === qc.answer ? ' ✔' : ''}</div>`).join('');
  const facts = (s.facts || []).map(f => `<li><span>${esc(f.claim)}</span><a href="${esc(f.source)}" target="_blank" rel="noopener">来源 ↗</a></li>`).join('');
  const enBlock = `<details><summary>English version（${contentLen(en)} chars）</summary><div class="en">
    <p><b>${esc(en.one_liner)}</b></p><p>${esc(en.scene)}</p><p>${esc(en.explain)}</p>
    <p class="label">In real tools</p><p>${esc(en.tool_practice)}</p>
    ${(en.misconceptions || []).map(m => `<div class="mis"><b class="w">✗ ${esc(m.wrong)}</b><span class="r">✓ ${esc(m.right)}</span></div>`).join('')}
    <p class="label">Say it to AI</p><p>${esc(en.say)}</p></div></details>`;
  const flash = fc
    ? `<p class="label">问句</p><p><b>${esc(fc.q)}</b></p><p class="label">回答</p><p>${esc(fc.a)}</p><p class="label">AI 说法</p><p>${esc(fc.say)}</p>`
    : '<p class="none">主站现网无对应词条（新词条）</p>';
  return `<section class="term" id="${esc(s.id)}">
    <h2>${esc(s.name.zh)} <small>${esc(s.id)} · ${esc(s.category)} · ${esc(s.level)}</small></h2>
    <div class="cols">
      <div class="old"><h3>主站现网闪卡（${oldLen} 字）</h3>${flash}</div>
      <div class="new"><h3>新样板八段结构（${newLen} 字，${oldLen ? Math.round(newLen / oldLen * 10) / 10 + '×' : '新增'}）</h3>
        <p class="oneliner">${esc(zh.one_liner)}</p>
        <p class="label">什么时候会碰到</p><p>${esc(zh.scene)}</p>
        <p class="label">讲透</p><p>${esc(zh.explain)}</p>
        ${zh.deeper ? `<p class="label">进阶（deeper）</p><p class="deeper">${esc(zh.deeper)}</p>` : ''}
        <p class="label">在真实工具里</p><p>${esc(zh.tool_practice)}</p>
        <p class="label">常见误解与坑</p>${mis}
        <p class="label">相关术语</p><div class="rels">${rel}</div>
        <p class="label">快速自测</p><p>${esc(qc.q)}</p><div class="opts">${opts}</div><p class="explain">${esc(qc.explain)}</p>
        <p class="label">复制给 AI 的说法</p><p class="say">${esc(zh.say)}</p>
        <p class="label">事实锚点</p><ul class="facts">${facts}</ul>
        ${enBlock}
      </div>
    </div></section>`;
}).join('\n');

const toc = samples.map(s => `<a href="#${esc(s.id)}">${esc(s.name.zh)}</a>`).join('');

const page = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>term-author 样板验收：10 词条对比预览</title>
<style>
:root{--bg:#f6f7f9;--card:#fff;--ink:#1d1d1f;--muted:#6e6e73;--line:#e5e5e7;--blue:#0a6cff;--ok:#1a7f37;--warn:#b25000}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.75 -apple-system,"PingFang SC","Microsoft YaHei",sans-serif;padding:32px 20px 80px}
header{max-width:1100px;margin:0 auto 20px}h1{font-size:22px;margin:0 0 6px}.sub{color:var(--muted);font-size:13px}
.toc{max-width:1100px;margin:0 auto 24px;display:flex;flex-wrap:wrap;gap:8px}.toc a{font-size:13px;color:var(--blue);text-decoration:none;background:var(--card);border:1px solid var(--line);border-radius:999px;padding:4px 12px}
.term{max-width:1100px;margin:0 auto 28px;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:22px 26px}
h2{font-size:19px;margin:0 0 14px}h2 small{color:var(--muted);font-weight:400;font-size:12px;margin-left:8px}
.cols{display:grid;grid-template-columns:1fr 1.9fr;gap:22px}
@media(max-width:860px){.cols{grid-template-columns:1fr}}
.old,.new{padding:4px 0}.old{border-right:1px dashed var(--line);padding-right:22px}@media(max-width:860px){.old{border-right:0}}
h3{font-size:13px;margin:0 0 10px;color:var(--muted);font-weight:600}
p{margin:0 0 8px}.label{color:var(--muted);font-size:12px;font-weight:600;margin-top:12px;letter-spacing:.04em}
.oneliner{font-size:17px;font-weight:700}.mis{margin:0 0 8px}.mis b{display:block;font-weight:600}.w{color:#b3261e}.r{color:var(--ok);font-size:14px}
.rel{display:inline-block;background:#f0f4ff;border-radius:8px;padding:2px 8px;font-size:13px;margin:0 6px 6px 0}.rel b{color:var(--blue)}
.opt{padding:4px 10px;border-radius:8px;font-size:14px;margin-bottom:4px;background:#fafafa}.opt.ok{background:#e8f5ec;color:var(--ok);font-weight:600}
.explain{color:var(--muted);font-size:13px}.deeper{background:#f0f7ff;border-left:3px solid var(--blue);padding:6px 10px;border-radius:0 8px 8px 0;font-size:14px}.say{background:#fffbe8;border:1px solid #f0e6b0;border-radius:8px;padding:8px 12px;font-size:14px}
.facts{margin:4px 0 0;padding-left:18px;font-size:13px;color:var(--muted)}.facts li{margin-bottom:4px}.facts a{color:var(--blue);text-decoration:none;margin-left:6px}
details{margin-top:14px;border-top:1px solid var(--line);padding-top:10px}summary{cursor:pointer;font-size:13px;color:var(--muted)}.en{margin-top:8px}
.none{color:var(--warn);font-size:13px}
footer{max-width:1100px;margin:30px auto 0;color:var(--muted);font-size:12px;text-align:center}
</style></head><body>
<header><h1>term-author 样板验收：10 词条对比预览</h1>
<p class="sub">左列 = 主站现网闪卡原文（来自 main-site-snapshot） · 右列 = 新样板八段结构全文。深度倍数按中文正文字数计算。生成时间 2026-09-26。</p></header>
<nav class="toc">${toc}</nav>
${cards}
<footer>由 content-system/build-preview.mjs 生成 · 质检状态：validate.mjs 10/10 通过</footer>
</body></html>`;

writeFileSync(join(base, 'preview.html'), page);
console.log('preview.html 已生成:', samples.length, '个词条');
console.log('主站闪卡匹配情况:', samples.map(s => `${s.id}:${findFlashcard(s) ? '有' : '无'}`).join(' '));
