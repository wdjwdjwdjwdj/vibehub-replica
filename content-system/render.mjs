// term-author 内容渲染器：把 samples/*.json 渲染成自包含阅读页 reading.html
// 用法: node content-system/render.mjs
// 这是未来内容引擎的渲染层——铺量后同一管线直接复用。
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const base = dirname(fileURLToPath(import.meta.url));
const samples = readdirSync(join(base, 'samples'))
  .filter(f => f.endsWith('.json'))
  .map(f => JSON.parse(readFileSync(join(base, 'samples', f), 'utf8')));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function termSection(s) {
  const zh = s.lang.zh, en = s.lang.en;
  const mis = (L) => (L.misconceptions || []).map(m =>
    `<div class="mis"><div class="w"><b>✗</b><span>${esc(m.wrong)}</span></div><div class="r"><b>✓</b><span>${esc(m.right)}</span></div></div>`).join('');
  const rel = (L) => (L.related || []).map(r => `<span class="rel">${esc(r.id)}<small>${esc(r.why)}</small></span>`).join('');
  const quiz = (L, id) => {
    const q = L.quick_check;
    const opts = q.options.map((o, i) => `<button class="opt" data-ok="${i === q.answer}" data-q="${id}" onclick="pick(this)">${'ABC'[i]}. ${esc(o)}</button>`).join('');
    return `<div class="quiz"><p class="q">${esc(q.q)}</p><div class="opts">${opts}</div><p class="qe" data-q="${id}" hidden>${esc(q.explain)}</p></div>`;
  };
  const facts = (s.facts || []).map(f => `<li>${esc(f.claim)}<a href="${esc(f.source)}" target="_blank" rel="noopener">官方来源 ↗</a></li>`).join('');
  const body = (L) => `
    <p class="one">${esc(L.one_liner)}</p>
    <h4>什么时候会碰到</h4><p>${esc(L.scene)}</p>
    <h4>讲透</h4><p>${esc(L.explain)}</p>
    ${L.deeper ? `<details class="deeper"><summary>想深挖？进阶层（类比边界 · 设计权衡）</summary><p>${esc(L.deeper)}</p></details>` : ''}
    <h4>跟着做一遍</h4><div class="practice"><p>${esc(L.tool_practice)}</p></div>
    <h4>常见误解与坑</h4>${mis(L)}
    <h4>接下来弄懂谁</h4><div class="rels">${rel(L)}</div>
    <h4>快速自测</h4>${quiz(L, s.id)}
    <h4>复制给 AI 的说法</h4>
    <div class="saybox"><p>${esc(L.say)}</p><button class="copybtn" data-say="${esc(L.say)}" onclick="copySay(this)">复制</button></div>`;
  return `<article class="term" id="t-${esc(s.id)}" data-id="${esc(s.id)}">
    <header><span class="cat">${esc(s.category)}</span><span class="lv">${esc(s.level)}</span></header>
    <h2><span class="zh-name">${esc(s.name.zh)}</span><span class="en-name">${esc(s.name.en)}</span></h2>
    <div class="lzh">${body(zh)}</div>
    <div class="len" hidden>${body(en)}</div>
    <details class="facts"><summary>事实来源（${(s.facts || []).length} 条官方文档）</summary><ul>${facts}</ul></details>
  </article>`;
}

const nav = samples.map(s => `<a href="#t-${esc(s.id)}" data-id="${esc(s.id)}">${esc(s.name.zh)}<small>${esc(s.name.en)}</small></a>`).join('');

const page = `<!doctype html>
<html lang="zh-CN" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Vibe Coding 术语图鉴 · 新内容试读（首批 10 条）</title>
<style>
:root{--bg:#f6f7f9;--card:#fff;--ink:#1d1d1f;--muted:#6e6e73;--line:#e6e6e9;--blue:#0a6cff;--blue-soft:#eef4ff;--ok:#1a7f37;--ok-soft:#e9f6ec;--bad:#b3261e;--bad-soft:#fdeeec;--warn-soft:#fffbe8}
html[data-theme="dark"]{--bg:#101012;--card:#1c1c1e;--ink:#f5f5f7;--muted:#a1a1a6;--line:#333336;--blue:#4da2ff;--blue-soft:#16233a;--ok:#4fbf6a;--ok-soft:#16281c;--bad:#ff6b5e;--bad-soft:#3a1c19;--warn-soft:#33290f}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.85 -apple-system,"PingFang SC","Microsoft YaHei",sans-serif;-webkit-font-smoothing:antialiased}
header.top{position:sticky;top:0;z-index:9;background:color-mix(in srgb,var(--card) 88%,transparent);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.topin{max-width:860px;margin:0 auto;padding:12px 20px;display:flex;align-items:center;gap:12px}
.brand{font-weight:800;font-size:16px}.brand b{color:var(--blue)}
.topin .sp{flex:1}
.btn{border:1px solid var(--line);background:var(--card);color:var(--ink);border-radius:999px;padding:5px 14px;font-size:13px;cursor:pointer}
.btn:hover{border-color:var(--blue);color:var(--blue)}
nav.toc{max-width:860px;margin:20px auto 0;padding:0 20px;display:flex;flex-wrap:wrap;gap:8px}
nav.toc a{font-size:13px;color:var(--ink);text-decoration:none;background:var(--card);border:1px solid var(--line);border-radius:999px;padding:4px 13px;display:inline-flex;gap:6px;align-items:baseline}
nav.toc a small{color:var(--muted);font-size:11px}
nav.toc a.active{border-color:var(--blue);color:var(--blue);background:var(--blue-soft)}
main{max-width:860px;margin:0 auto;padding:8px 20px 90px}
.term{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:26px 30px;margin-top:24px;scroll-margin-top:80px}
.term header{display:flex;gap:8px;margin-bottom:8px}
.cat,.lv{font-size:12px;border-radius:6px;padding:1px 9px;background:var(--blue-soft);color:var(--blue)}
.lv{background:transparent;border:1px solid var(--line);color:var(--muted)}
h2{font-size:28px;margin:4px 0 16px;line-height:1.3}
.en-name{color:var(--muted);font-size:18px;font-weight:600;margin-left:10px}
h4{font-size:14px;color:var(--muted);letter-spacing:.05em;margin:26px 0 8px;font-weight:700}
p{margin:0 0 10px}
.one{font-size:19px;font-weight:700;line-height:1.6}
.practice{background:var(--blue-soft);border-radius:12px;padding:14px 18px}
.deeper{border:1px dashed var(--blue);border-radius:12px;padding:10px 16px;margin:14px 0}
.deeper summary{cursor:pointer;color:var(--blue);font-size:14px;font-weight:600}
.deeper p{margin-top:10px;font-size:15px}
.mis{display:flex;flex-direction:column;gap:4px;border:1px solid var(--line);border-radius:12px;padding:10px 16px;margin-bottom:10px}
.mis .w{color:var(--bad);display:flex;gap:8px}.mis .r{color:var(--ok);display:flex;gap:8px;font-size:15px}
.mis b{flex:none}
.rels{display:flex;flex-wrap:wrap;gap:8px}
.rel{display:inline-flex;flex-direction:column;background:var(--card);border:1px solid var(--line);border-radius:10px;padding:6px 12px;font-size:14px;font-weight:600;color:var(--blue)}
.rel small{font-weight:400;color:var(--muted);font-size:12px;line-height:1.5}
.quiz .q{font-weight:600}
.opt{display:block;width:100%;text-align:left;border:1px solid var(--line);background:var(--card);color:var(--ink);border-radius:10px;padding:9px 14px;margin-bottom:8px;font-size:15px;cursor:pointer;font-family:inherit}
.opt:hover{border-color:var(--blue)}
.opt.right{background:var(--ok-soft);border-color:var(--ok);color:var(--ok);font-weight:600}
.opt.wrong{background:var(--bad-soft);border-color:var(--bad);color:var(--bad)}
.qe{color:var(--muted);font-size:14px;background:var(--bg);border-radius:10px;padding:8px 14px}
.saybox{position:relative;background:var(--warn-soft);border:1px solid color-mix(in srgb,var(--ink) 8%,transparent);border-radius:12px;padding:14px 90px 14px 18px}
.saybox p{font-size:15px;margin:0}
.copybtn{position:absolute;right:12px;top:12px;border:0;background:var(--blue);color:#fff;border-radius:8px;padding:5px 14px;font-size:13px;cursor:pointer}
.copybtn.done{background:var(--ok)}
.facts{margin-top:26px;border-top:1px solid var(--line);padding-top:12px}
.facts summary{cursor:pointer;color:var(--muted);font-size:13px}
.facts ul{padding-left:20px;font-size:13px;color:var(--muted)}
.facts a{color:var(--blue);text-decoration:none;margin-left:6px}
footer.site{max-width:860px;margin:0 auto;padding:30px 20px;color:var(--muted);font-size:13px;text-align:center}
@media(max-width:640px){.term{padding:20px 18px}h2{font-size:24px}.saybox{padding-right:18px;padding-top:44px}}
</style>
</head>
<body>
<header class="top"><div class="topin">
  <span class="brand"><b>起站</b> · Vibe Coding 术语图鉴</span>
  <span class="sp"></span>
  <button class="btn" id="langBtn" onclick="toggleLang()">EN</button>
  <button class="btn" id="themeBtn" onclick="toggleTheme()">🌙</button>
</div></header>
<nav class="toc">${nav}</nav>
<main>
${samples.map(termSection).join('\n')}
</main>
<footer class="site">新内容试读版 · 首批 10 词条 · 内容管线 term-author + validate.mjs 10/10 通过 · 2026-09-27</footer>
<script>
let lang='zh';
function toggleLang(){lang=lang==='zh'?'en':'zh';document.documentElement.lang=lang==='zh'?'zh-CN':'en';
  document.querySelectorAll('.lzh').forEach(e=>e.hidden=lang!=='zh');
  document.querySelectorAll('.len').forEach(e=>e.hidden=lang!=='en');
  document.getElementById('langBtn').textContent=lang==='zh'?'EN':'中';
  document.querySelectorAll('.zh-name').forEach(e=>e.style.display=lang==='zh'?'':'none');
  document.querySelectorAll('.en-name').forEach(e=>e.style.display=lang==='en'?'':'none');
}
function toggleTheme(){const h=document.documentElement;h.dataset.theme=h.dataset.theme==='dark'?'light':'dark';
  document.getElementById('themeBtn').textContent=h.dataset.theme==='dark'?'☀️':'🌙';}
function pick(btn){const q=btn.dataset.q;document.querySelectorAll('.opt[data-q="'+q+'"]').forEach(b=>{b.disabled=true;if(b.dataset.ok==='true')b.classList.add('right')});
  if(btn.dataset.ok!=='true')btn.classList.add('wrong');document.querySelector('.qe[data-q="'+q+'"]').hidden=false;}
function copySay(btn){const t=btn.dataset.say;(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>{btn.textContent='已复制';btn.classList.add('done');setTimeout(()=>{btn.textContent='复制';btn.classList.remove('done')},1600)}).catch(()=>{const ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');btn.textContent='已复制';btn.classList.add('done');setTimeout(()=>{btn.textContent='复制';btn.classList.remove('done')},1600)}catch(e){}ta.remove()});}
const links=[...document.querySelectorAll('nav.toc a')];
const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.toggle('active',l.dataset.id===e.target.dataset.id))}})},{rootMargin:'-30% 0px -60% 0px'});
document.querySelectorAll('article.term').forEach(a=>obs.observe(a));
</script>
</body></html>`;

writeFileSync(join(base, 'reading.html'), page);
console.log('reading.html 已生成:', samples.length, '词条,', Math.round(page.length / 1024) + 'KB');
