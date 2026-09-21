import { chromium } from 'playwright';
import fs from 'node:fs';

const localBase = process.env.VIBEHUB_BASE_URL || 'http://127.0.0.1:5174';
const sourceBase = 'https://vibe-hub.org';
const topics = [
  ['frontend', 'frontend'],
  ['backend', 'backend'],
  ['product', 'product'],
  ['testing', 'testing'],
  ['technology', 'stack'],
  ['ai', 'ai'],
  ['git', 'git'],
  ['design', 'design'],
];

const browser = await chromium.launch({ headless: true });

async function inspect(page, url, screenshotPath) {
  const errors = [];
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(`console: ${message.text()}`); });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.evaluate(() => document.fonts?.ready);
  await page.waitForTimeout(1500);
  if (screenshotPath) await page.screenshot({ path: screenshotPath, fullPage: false });
  const result = await page.evaluate(() => {
    const box = (element) => {
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      return { x: Math.round(rect.x), y: Math.round(rect.y), width: Math.round(rect.width), height: Math.round(rect.height) };
    };
    const cardSelector = document.querySelector('.term-card') ? '.term-card' : '.card';
    const cards = [...document.querySelectorAll(cardSelector)];
    const grids = [...document.querySelectorAll('.grid, .term-grid')];
    return {
      title: document.title,
      h1: document.querySelector('h1')?.textContent.trim() || '',
      main: box(document.querySelector('main')),
      layout: box(document.querySelector('.catalog-layout, .page-layout')),
      cardSelector,
      cardCount: cards.length,
      cardHeightTotal: cards.reduce((sum, card) => sum + Math.round(card.getBoundingClientRect().height), 0),
      cardMin: cards.length ? Math.min(...cards.map((card) => Math.round(card.getBoundingClientRect().height))) : 0,
      cardMax: cards.length ? Math.max(...cards.map((card) => Math.round(card.getBoundingClientRect().height))) : 0,
      gridTemplates: grids.map((grid) => getComputedStyle(grid).gridTemplateColumns),
      gridRects: grids.map(box),
      iframeCount: document.querySelectorAll('iframe').length,
      errorText: /^(404|page not found)$/i.test(document.body.innerText.trim()),
    };
  });
  result.errors = errors;
  return result;
}

const rows = [];
for (const [sourceSlug, localSlug] of topics) {
  for (const locale of ['en', 'zh']) {
    const sourceRoute = `${locale === 'en' ? '/en' : ''}/topics/${sourceSlug}`;
    const localRoute = `/${locale === 'en' ? 'en/' : ''}topics/${localSlug}`;
    const sourcePage = await (await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })).newPage();
    const localPage = await (await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })).newPage();
    await sourcePage.addInitScript(() => localStorage.setItem('vibehub-source-survey-shown-v1', '1'));
    await localPage.addInitScript(() => localStorage.setItem('vibehub-source-survey-shown-v1', '1'));
    const screenshotSuffix = sourceSlug === 'frontend' ? (locale === 'en' ? '' : '-zh') : null;
    const source = await inspect(sourcePage, `${sourceBase}${sourceRoute}`, screenshotSuffix ? `C:/Users/29688/AppData/Local/Temp/vh-source-topic-current${screenshotSuffix}.png` : null);
    const local = await inspect(localPage, `${localBase}${localRoute}`, screenshotSuffix ? `C:/Users/29688/AppData/Local/Temp/vh-local-topic-current${screenshotSuffix}.png` : null);
    rows.push({ sourceRoute, localRoute, source, local });
    await sourcePage.context().close();
    await localPage.context().close();
  }
}

await browser.close();
console.log(JSON.stringify(rows, null, 2));
const reportDir = 'replication-evidence/round-2026-09-21';
fs.mkdirSync(reportDir, { recursive: true });
fs.writeFileSync(`${reportDir}/topic-parity.json`, JSON.stringify(rows, null, 2));
console.log(JSON.stringify(rows, null, 2));
const failures = rows.filter(({ source, local }) => (
  !source.h1 || !local.h1 || local.errorText || local.iframeCount > 0 || local.errors.length ||
  source.cardCount !== local.cardCount || source.cardHeightTotal !== local.cardHeightTotal ||
  source.gridTemplates.join('|') !== local.gridTemplates.filter((value) => value !== 'none').join('|')
));
if (failures.length) {
  console.error(`topic parity audit failed: ${failures.map(({ localRoute }) => localRoute).join(', ')}`);
  process.exit(1);
}
console.log(`topic parity audit passed: ${rows.length} source/local topic pairs inspected`);
