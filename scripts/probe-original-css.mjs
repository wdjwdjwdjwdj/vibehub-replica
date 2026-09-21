/**
 * 抓取原站样式表并按选择器片段检索规则原文（原站 CSS 是唯一视觉依据）。
 * 用法：
 *   node scripts/probe-original-css.mjs --route /en/html --find ".site-footer" --find "--line"
 *   node scripts/probe-original-css.mjs --route /en/html --find ".footer-social-icon" --ctx 260 --max 8
 * 可选：--save 目录（把抓到的 CSS 落盘，便于离线复查）
 */
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const argValue = (name, dflt) => {
  const i = args.indexOf(name);
  return i === -1 ? dflt : args[i + 1];
};
const ROUTE = argValue('--route', '/en/html');
const BASE = argValue('--base', 'https://vibe-hub.org');
const CTX = Number(argValue('--ctx', '300'));
const MAX = Number(argValue('--max', '6'));
const SAVE = argValue('--save', '');
const finds = [];
for (let i = 0; i < args.length; i += 1) if (args[i] === '--find') finds.push(args[i + 1]);

if (!finds.length) {
  console.error('用法: node scripts/probe-original-css.mjs --route /en/html --find ".site-footer"');
  process.exit(2);
}

const res = await fetch(`${BASE}${ROUTE}`, { headers: { 'user-agent': 'Mozilla/5.0' } });
const html = await res.text();
const hrefs = [...html.matchAll(/<link[^>]+rel=["']?stylesheet["']?[^>]*>/gi)]
  .map((m) => m[0].match(/href=["']([^"']+)["']/i)?.[1])
  .filter(Boolean);
const inline = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]);

const cssParts = [];
for (const href of hrefs) {
  const url = new URL(href, BASE).toString();
  try {
    const r = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } });
    cssParts.push({ url, text: await r.text() });
  } catch (e) {
    console.log(`[warn] CSS 抓取失败 ${url}: ${String(e).slice(0, 100)}`);
  }
}
for (const [i, text] of inline.entries()) cssParts.push({ url: `inline-style-${i}`, text });

if (SAVE) {
  const dir = path.resolve(SAVE);
  fs.mkdirSync(dir, { recursive: true });
  cssParts.forEach((part, i) => fs.writeFileSync(path.join(dir, `${String(i).padStart(2, '0')}-${part.url.replace(/[^\w.-]+/g, '_').slice(-60)}.css`), part.text));
  console.log(`CSS 已保存到 ${dir}（${cssParts.length} 个文件，共 ${cssParts.reduce((s, p) => s + p.text.length, 0)} 字符）`);
}

// 规则切分
const rules = [];
for (const part of cssParts) {
  let depth = 0;
  let start = 0;
  for (let i = 0; i < part.text.length; i += 1) {
    const ch = part.text[i];
    if (ch === '{') depth += 1;
    else if (ch === '}') {
      depth -= 1;
      if (depth === 0) {
        rules.push({ src: part.url, from: start, to: i + 1, text: part.text.slice(start, i + 1) });
        start = i + 1;
      }
    }
  }
}

for (const frag of finds) {
  const hits = rules.filter((r) => r.text.slice(0, r.text.indexOf('{') + 1).includes(frag));
  console.log(`\n########## "${frag}" -> ${hits.length} 条规则 ##########`);
  hits.slice(0, MAX).forEach((r, idx) => {
    console.log(`--- #${idx + 1} @ ${r.src} (chars ${r.from}-${r.to}) ---`);
    const sel = r.text.slice(0, r.text.indexOf('{') + 1);
    const body = r.text.slice(r.text.indexOf('{') + 1);
    if (sel.length > 600) console.log(`选择器: ${sel.slice(0, 600)}…`);
    else console.log(`选择器: ${sel}`);
    console.log(`声明: ${body.length > 2000 ? `${body.slice(0, 2000)}…[共 ${body.length} 字符]` : body}`);
  });
  if (hits.length > MAX) console.log(`… 其余 ${hits.length - MAX} 条省略`);
}
