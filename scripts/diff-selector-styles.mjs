/**
 * 通用「选择器级」计算样式 / 几何对比：原站 vs 本地任意路由。
 * 用法：
 *   node scripts/diff-selector-styles.mjs --route /en/html --selector ".site-footer" --selector ".footer-social-link" ...
 *   node scripts/diff-selector-styles.mjs --route /en/html --selectors ".site-footer,.footer-wordmark"
 * 可选：--props "display,position,fontSize"（默认内置集合）、--out 路径
 * 只输出有差异的选择器与属性，便于逐条修复。
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const SOURCE = process.env.VH_SOURCE || 'https://vibe-hub.org';
const LOCAL = process.env.VH_LOCAL || 'http://127.0.0.1:5174';
const VIEWPORT = { width: Number(process.env.VH_VW || 1440), height: Number(process.env.VH_VH || 900) };

const DEFAULT_PROPS = [
  'display', 'position', 'width', 'height', 'minHeight', 'maxWidth', 'padding', 'margin', 'gap', 'rowGap', 'columnGap',
  'fontSize', 'fontWeight', 'fontFamily', 'lineHeight', 'letterSpacing', 'color', 'backgroundColor', 'textAlign',
  'textDecorationLine', 'textTransform', 'border', 'borderTop', 'borderBottom', 'borderRadius', 'boxShadow', 'outline',
  'gridTemplateColumns', 'justifyContent', 'alignItems', 'alignContent', 'overflow', 'flexDirection', 'flexWrap',
  'top', 'right', 'bottom', 'left', 'zIndex', 'opacity', 'transform', 'whiteSpace', 'wordBreak', 'objectFit',
];

const argValue = (name, dflt) => {
  const i = process.argv.indexOf(name);
  return i === -1 ? dflt : process.argv[i + 1];
};
const route = argValue('--route', '/en/html');
const outPath = argValue('--out', '');
const propsArg = argValue('--props', '');
const props = propsArg ? propsArg.split(',').map((s) => s.trim()).filter(Boolean) : DEFAULT_PROPS;

const selectors = [];
for (let i = 0; i < process.argv.length; i += 1) {
  if (process.argv[i] === '--selector') selectors.push(process.argv[i + 1]);
  if (process.argv[i] === '--selectors') selectors.push(...process.argv[i + 1].split(',').map((s) => s.trim()).filter(Boolean));
}
if (!selectors.length) {
  console.error('用法: node scripts/diff-selector-styles.mjs --route /en/html --selector ".site-footer"');
  process.exit(2);
}

const browser = await chromium.launch();
const data = {};
try {
  for (const [label, url] of [['original', `${SOURCE}${route}`], ['local', `${LOCAL}${route}`]]) {
    const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1, locale: 'en-US', colorScheme: 'light' });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(2800);
    data[label] = await page.evaluate(({ selectors, props }) => {
      const out = {};
      for (const sel of selectors) {
        const els = [...document.querySelectorAll(sel)];
        if (!els.length) { out[sel] = null; continue; }
        out[sel] = els.slice(0, 6).map((el) => {
          const cs = getComputedStyle(el);
          const r = el.getBoundingClientRect();
          const entry = { __rect: `${Math.round(r.width)}x${Math.round(r.height)}@${Math.round(r.x)},${Math.round(r.y + window.scrollY)}`, __text: (el.innerText || '').replace(/\s+/g, ' ').slice(0, 80) };
          for (const p of props) entry[p] = cs[p];
          return entry;
        });
      }
      return out;
    }, { selectors, props });
    await context.close();
  }
} finally {
  await browser.close();
}

const lines = [];
for (const sel of selectors) {
  const a = data.original[sel];
  const b = data.local[sel];
  if (!a && !b) continue;
  if (!a) { lines.push(`?? ${sel}: 原站缺失`); continue; }
  if (!b) { lines.push(`?? ${sel}: 本地缺失`); continue; }
  const count = Math.max(a.length, b.length);
  for (let i = 0; i < count; i += 1) {
    const ea = a[i];
    const eb = b[i];
    const tag = count > 1 ? `${sel} [${i}]` : sel;
    if (!ea || !eb) { lines.push(`===== ${tag} =====`); lines.push(`  一方缺失 (orig=${!!ea} local=${!!eb})`); continue; }
    const diffs = [];
    for (const key of ['__rect', '__text', ...props]) {
      if (String(ea[key]) !== String(eb[key])) diffs.push(`${key}: orig[${ea[key]}] != local[${eb[key]}]`);
    }
    if (diffs.length) {
      lines.push(`===== ${tag} =====`);
      for (const d of diffs) lines.push('  ' + d);
    }
  }
}
const text = lines.length ? lines.join('\n') : '(no differences)';
console.log(text);
if (outPath) {
  fs.mkdirSync(path.dirname(path.resolve(outPath)), { recursive: true });
  fs.writeFileSync(path.resolve(outPath), `${text}\n`);
  console.log(`\n报告已写入 ${outPath}`);
}
