import fs from 'node:fs';
import path from 'node:path';

const outDir = 'replication-evidence/round-2026-09-20/html';
const cssHrefs = JSON.parse(fs.readFileSync(path.join(outDir, 'orig-css-hrefs.json'), 'utf8'));

const cacheDir = path.join(outDir, 'css');
fs.mkdirSync(cacheDir, { recursive: true });

const sources = [];
for (const href of cssHrefs) {
  const name = href.split('/').pop().split('?')[0];
  const file = path.join(cacheDir, name);
  if (!fs.existsSync(file)) {
    const res = await fetch(href);
    if (!res.ok) { console.log('FAIL', href, res.status); continue; }
    fs.writeFileSync(file, await res.text());
  }
  sources.push({ name, text: fs.readFileSync(file, 'utf8') });
}
console.log('css files', sources.map((s) => `${s.name}:${s.text.length}`).join(' '));

// --- tiny CSS parser ---
const keyframes = [];
function parseRules(text, baseSelector = '') {
  const rules = [];
  let i = 0;
  const len = text.length;
  while (i < len) {
    // skip whitespace
    while (i < len && /\s/.test(text[i])) i++;
    if (i >= len) break;
    // comments
    if (text.startsWith('/*', i)) { const end = text.indexOf('*/', i + 2); i = end === -1 ? len : end + 2; continue; }
    // read selector/prelude until { or ;
    let start = i;
    let depth = 0;
    let prelude = '';
    while (i < len) {
      const ch = text[i];
      if (ch === '"' || ch === "'") { const q = ch; i++; while (i < len && text[i] !== q) { if (text[i] === '\\') i++; i++; } i++; continue; }
      if (ch === '(') depth++;
      if (ch === ')') depth--;
      if (ch === '{' && depth === 0) break;
      if (ch === ';' && depth === 0) break;
      i++;
    }
    prelude = text.slice(start, i).trim();
    if (i < len && text[i] === ';') { i++; continue; }
    if (i >= len) break;
    // now at '{'
    i++;
    let bdepth = 0;
    const bodyStart = i;
    while (i < len) {
      const ch = text[i];
      if (ch === '"' || ch === "'") { const q = ch; i++; while (i < len && text[i] !== q) { if (text[i] === '\\') i++; i++; } i++; continue; }
      if (ch === '{') bdepth++;
      else if (ch === '}') { if (bdepth === 0) break; bdepth--; }
      i++;
    }
    const body = text.slice(bodyStart, i);
    i++;
    if (prelude.startsWith('@')) {
      if (/^@keyframes/i.test(prelude)) {
        keyframes.push({ prelude: prelude.replace(/^@keyframes\s*/i, '@keyframes '), body });
        continue;
      }
      if (/^@(media|supports|layer|container)/i.test(prelude)) {
        rules.push({ prelude: (baseSelector ? baseSelector + ' ' : '') + prelude, nested: parseRules(body, '') });
      }
      continue;
    }
    rules.push({ prelude: (baseSelector ? baseSelector + ' ' : '') + prelude, body: body.trim() });
  }
  return rules;
}

const allRules = [];
for (const s of sources) allRules.push(...parseRules(s.text));
console.log('total rules', allRules.length);

const CLASSLIST = fs.readFileSync(process.argv[2], 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
const wanted = CLASSLIST.map((c) => ({ raw: c, cls: c.startsWith('.') ? c.slice(1) : c }));

const selectorMatches = (sel) => {
  const tokens = sel.match(/[.#][A-Za-z0-9_-]+/g) || [];
  return tokens.some((t) => wanted.some((w) => t.slice(1) === w.cls));
};

const rootVars = [];
const darkVars = [];
const kept = [];
const walk = (rules, inside) => {
  for (const r of rules) {
    if (r.nested) {
      const inner = [];
      for (const rr of r.nested) {
        if (rr.nested) {
          const sub = [];
          for (const rrr of rr.nested) if (!rrr.nested && selectorMatches(rrr.prelude)) sub.push(rrr);
          if (sub.length) inner.push({ prelude: rr.prelude, children: sub });
        } else if (selectorMatches(rr.prelude)) inner.push({ rule: rr });
      }
      if (inner.length) kept.push({ media: r.prelude, inner });
      continue;
    }
    if (/^(:root|html)\s*(\{|$)/.test(r.prelude.replace(/\s+$/, '')) || /^:root$|^html$/.test(r.prelude)) {
      if (/--/.test(r.body)) rootVars.push({ prelude: r.prelude, body: r.body });
    }
    if (/(\[data-theme=("|')?dark|\.dark\b|dark-mode)/.test(r.prelude) && /--/.test(r.body)) darkVars.push({ prelude: r.prelude, body: r.body });
    if (selectorMatches(r.prelude)) kept.push({ rule: r });
  }
};
walk(allRules, false);

const SCOPE = '.vh-html-replica';
const scopeSelector = (prelude) =>
  prelude
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (s.startsWith(SCOPE) ? s : `${SCOPE} ${s}`))
    .join(', ');

const fmtRule = (r) => `${scopeSelector(r.prelude)} { ${r.body} }`;
const out = [];
out.push('/* 从原站样式表提取的 /en/html 详情页规则，作用域限定在 .vh-html-replica 内 */');
const collectVars = (blocks) => {
  const map = new Map();
  const ordered = [...blocks].sort((a, b) => (a.prelude === ':root' ? -1 : b.prelude === ':root' ? 1 : 0));
  for (const rv of ordered) {
    for (const decl of rv.body.split(';')) {
      const d = decl.trim();
      if (!d.startsWith('--')) continue;
      const name = d.slice(0, d.indexOf(':'));
      if (!map.has(name)) map.set(name, d);
    }
  }
  return map;
};
const lightVars = collectVars(rootVars);
const darkMap = collectVars(darkVars);
out.push('.vh-html-replica {');
for (const d of lightVars.values()) out.push('  ' + d + ';');
out.push('  --ink:var(--text);');
out.push('  --muted:var(--text-2);');
out.push('  --line:var(--border);');
out.push('  --soft:var(--bg-soft);');
out.push('  --panel:var(--bg);');
out.push('  letter-spacing:.1px;');
out.push('}');
if (darkMap.size) {
  const darkNames = [...darkMap.keys()];
  out.push(`html[data-theme="dark"] .vh-html-replica, .vh-html-replica[data-theme="dark"] {`);
  for (const [name, d] of darkMap) {
    if (!name.startsWith('--theme')) out.push('  ' + d + ';');
  }
  out.push('}');
  console.log('dark vars', darkNames.length);
}
out.push('');
/* ---------------------------------------------------------------------------
 * 手工补充层：原站 base 排版 + 被 src/styles.css 里同名类覆盖掉的规则。
 * 这些不属于原站样式表提取范围（原站写在 html/body 或未声明该属性，
 * 本地通用规则就赢了），因此在此显式还原，保证 /en/html 与原站一致。
 * 放在文件末尾，保证优先级最高。
 * ------------------------------------------------------------------------- */
const manual = [
  '/* ==== 手工还原层（原站 base 排版 / 本地同名类覆盖还原） ==== */',  '.vh-html-replica { font-size:15px; line-height:1.7; color:var(--text); }',
  '.vh-html-replica .detail-hero h1 { margin:0; }',
  '.vh-html-replica .html-demo .html-node { font-size:12px; line-height:1.7; }',
  '.vh-html-replica .html-demo { width:100%; height:auto; }',
  '.vh-html-replica .html-demo .html-page { justify-content:normal; overflow:visible; }',
  '.vh-html-replica .html-demo .html-page b, .vh-html-replica .html-demo .html-page span { line-height:1.7; white-space:normal; }',
  '.vh-html-replica .usage-box { display:block; gap:normal; }',
  '.vh-html-replica .usage-box ul { margin:0; padding:0; }',
  '.vh-html-replica .usage-box h3 { margin:0 0 16px; }',
  '.vh-html-replica .variant-grid .variant-card { display:block; padding:0; gap:normal; }',
  '.vh-html-replica .lesson-agent-prompt, .vh-html-replica .scenes, .vh-html-replica .references-section { margin-top:8px; }',
  '.vh-html-replica .selector-recommendation { margin:8px 0 40px; padding:0; border:0; border-radius:0; background:transparent; }',
  '.vh-html-replica .selector-recommendation-card { width:100%; display:grid; grid-template-columns:4fr 3fr; box-sizing:border-box; margin:0; overflow:hidden; border:1px solid var(--border); border-radius:12px; color:inherit; background:var(--bg-soft); text-decoration:none; }',
  '.vh-html-replica .reference-link { color:rgb(0,0,238); }',
  '.vh-html-replica button, .vh-html-replica .breadcrumb-link { letter-spacing:normal; }',
  '.vh-html-replica .detail-back-button { font-size:13.3333px; line-height:normal; }',
  '.vh-html-replica .float-nav { line-height:normal; }',
  '.vh-html-replica .source-survey-close { padding:0; line-height:normal; }',
  '.vh-html-replica .source-survey-option { line-height:normal; }',
  // 本地全局 svg 规则会给所有 svg 加描边，问卷品牌标识是纯填充图形，需要显式关掉
  '.vh-html-replica .source-survey-option-mark svg, .vh-html-replica .source-survey-option-mark svg * { stroke:none; }',
  '.vh-html-replica.detail-page { padding-top:28px; }',
];
const mediaOut = [];
const KEYFRAME_RE = /@keyframes\s+(source-survey-in|source-survey-out|anat-callout-in)\b/;
for (const kf of keyframes) {
  if (KEYFRAME_RE.test(kf.prelude)) mediaOut.push(`${kf.prelude} {${kf.body}}`);
}
for (const k of kept) {
  if (k.rule) { out.push(fmtRule(k.rule)); continue; }
  mediaOut.push(`${k.media} {`);
  for (const item of k.inner) {
    if (item.rule) mediaOut.push('  ' + fmtRule(item.rule));
    else {
      mediaOut.push('  ' + item.prelude + ' {');
      for (const c of item.children) mediaOut.push('    ' + fmtRule(c));
      mediaOut.push('  }');
    }
  }
  mediaOut.push('}');
}
out.push(...mediaOut);
out.push('');
out.push(...manual);
const result = out
  .join('\n')
  // 去掉原站深色 color-mode 覆盖，避免与本地主题机制冲突
  .split('\n')
  .filter((line) => !line.includes('[data-color-mode'))
  .join('\n')
  .replace(/html\[data-theme="dark"\] \.vh-html-replica, \.vh-html-replica\[data-theme="dark"\] \{\s*\}/, '')
  .replace('--site-nav-height:108px;', '--site-nav-height:60px;');
fs.writeFileSync(path.join(outDir, 'extracted-rules.css'), result);
fs.writeFileSync('src/htmlDetail.css', `/* 自动生成：从原站样式表提取的 /en/html 详情页规则，全部限定在 .vh-html-replica 作用域内。
   生成脚本：scripts/extract-original-css.mjs（类名清单：scripts/html-detail-classes.txt）
   请勿手工大改；需要新增区块时先改脚本再重新生成。 */
${result}
`);
console.log('rootVarBlocks', rootVars.length, 'kept', kept.length, 'bytes', result.length);
