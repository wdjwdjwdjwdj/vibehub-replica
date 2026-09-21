/**
 * 逐选择器对比原站与本地 /en/html 的计算样式，只输出有差异的项。
 * 用法：node scripts/diff-computed-styles.mjs [extraSelectors...]
 */
import { chromium } from 'playwright';
import fs from 'node:fs';

const SELECTORS = [
  '.detail-hero', '.detail-hero .dh-head', '.detail-hero h1', '.dh-quote', '.dh-quote-label', '.dh-quote-text',
  '.dh-tagline', '.dh-summary-lead', '.dh-summary-separator', '.dh-demo', '.detail-hero .dh-demo',
  '.html-demo', '.html-tree', '.html-node', '.html-node.html-d1', '.html-arrow', '.html-page',
  '.lesson-extras', '.lesson-practice', '.lesson-practice-heading', '.lesson-practice-kicker', '.lesson-practice-hint',
  '.lesson-practice h2', '.lesson-practice-options', '.lesson-practice-option', '.lesson-practice-marker', '.lesson-practice-label',
  '.lesson-agent-prompt', '.lesson-agent-prompt h2', '.lesson-agent-prompt blockquote', '.lesson-agent-quote',
  '.usage-grid', '.usage-box', '.usage-box h3', '.usage-box ul', '.usage-box li', '.usage-text', '.mk', '.mk-win', '.mk-row', '.mk-tag',
  '.section-title', '.anat-wrap', '.anat-stage', '.html-anat', '.anat-parts', '.anat-part', '.anat-part-trigger', '.anat-part .idx', '.anat-part .pn', '.anat-part .pd',
  '.variant-grid', '.variant-card', '.variant-name', '.variant-demo', '.variant-when',
  '.scenes', '.scene-list', '.scene-item', '.scene-cap', '.scene-shot', '.sc-body', '.sc-body-inner', '.terminal-win',
  '.selector-recommendation', '.selector-recommendation-card',
  '.references-section', '.reference-list', '.reference-link', '.reference-title', '.reference-source',
  '.detail-topbar', '.detail-breadcrumb', '.detail-back-button', '.breadcrumb-link', '.breadcrumb-separator', '.breadcrumb-current',
  '.detail', '.detail-page', '.detail-body', '.float-nav',
  ...process.argv.slice(2),
];

const PROPS = [
  'display', 'position', 'width', 'height', 'minHeight', 'maxWidth', 'padding', 'margin', 'gap', 'rowGap', 'columnGap',
  'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'color', 'backgroundColor', 'textAlign', 'textDecorationLine',
  'border', 'borderTop', 'borderBottom', 'borderRadius', 'boxShadow', 'outline', 'gridTemplateColumns', 'justifyContent', 'alignItems', 'overflow', 'flexDirection',
];

const browser = await chromium.launch();
const data = {};
for (const [label, url] of [
  ['original', 'https://vibe-hub.org/en/html'],
  ['local', 'http://127.0.0.1:5174/en/html'],
]) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: 'en-US', colorScheme: 'light' });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(3000);
  data[label] = await page.evaluate(({ selectors, props }) => {
    const out = {};
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (!el) { out[sel] = null; continue; }
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      const entry = { __rect: `${Math.round(rect.width)}x${Math.round(rect.height)}` };
      for (const p of props) entry[p] = cs[p];
      out[sel] = entry;
    }
    return out;
  }, { selectors: SELECTORS, props: PROPS });
  await context.close();
}
await browser.close();

const lines = [];
for (const sel of SELECTORS) {
  const a = data.original[sel];
  const b = data.local[sel];
  if (!a && !b) continue;
  if (!a) { lines.push(`?? ${sel}: 原站缺失`); continue; }
  if (!b) { lines.push(`?? ${sel}: 本地缺失`); continue; }
  const diffs = [];
  for (const key of ['__rect', ...PROPS]) {
    if (String(a[key]) !== String(b[key])) diffs.push(`${key}: orig[${a[key]}] != local[${b[key]}]`);
  }
  if (diffs.length) {
    lines.push(`===== ${sel} =====`);
    for (const d of diffs) lines.push('  ' + d);
  }
}
const text = lines.join('\n');
fs.writeFileSync('replication-evidence/round-2026-09-20/html/computed-diff.txt', text);
console.log(text || '(no differences)');
