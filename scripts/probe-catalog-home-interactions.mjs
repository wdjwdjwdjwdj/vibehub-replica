import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const targets = [
  { name: 'source', base: 'https://vibe-hub.org' },
  { name: 'local', base: process.env.VIBEHUB_BASE_URL || 'http://127.0.0.1:5174' },
];

const report = { viewport: { width: 1440, height: 900 }, targets: [] };
const browser = await chromium.launch({ headless: true });

for (const target of targets) {
  const context = await browser.newContext({ viewport: report.viewport });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(`console: ${message.text()}`); });

  await page.goto(`${target.base}/en`, { waitUntil: 'networkidle' });
  const initial = await page.evaluate(() => ({
    cards: document.querySelectorAll('.card, .term-card').length,
    categoryButtons: document.querySelectorAll('.catalog-filter-chip').length,
    surveyVisible: Boolean(document.querySelector('.source-survey')),
    scrollHeight: document.documentElement.scrollHeight,
  }));

  const surveyClose = page.locator('.source-survey-close');
  if (await surveyClose.count()) {
    await surveyClose.click();
    await page.locator('.source-survey').waitFor({ state: 'detached', timeout: 5000 });
  }
  const surveyAfterClose = await page.locator('.source-survey').count();

  await page.goto(`${target.base}/en`, { waitUntil: 'networkidle' });
  const backendChip = page.locator('.catalog-filter-chip').filter({ hasText: 'Backend' }).first();
  await backendChip.click();
  await page.waitForURL('**/topics/backend');
  await page.waitForFunction(() => document.querySelector('h1')?.textContent?.includes('Backend'));
  const backend = await page.evaluate(() => ({
    path: location.pathname,
    h1: document.querySelector('h1')?.textContent?.trim() || '',
    cards: document.querySelectorAll('.card, .term-card').length,
  }));

  await page.goto(`${target.base}/en`, { waitUntil: 'networkidle' });
  const favorite = page.locator('button.favorite-button').first();
  await favorite.click();
  const favoriteState = await favorite.getAttribute('aria-pressed');
  const saved = await page.evaluate(() => Object.keys(localStorage).filter((key) => key.toLowerCase().includes('favorite') || key.toLowerCase().includes('saved')));

  await page.goto(`${target.base}/en`, { waitUntil: 'networkidle' });
  const firstCardLink = page.locator('a.card-title-link').first();
  const cardHref = await firstCardLink.getAttribute('href');
  await firstCardLink.click();
  await page.waitForFunction(() => document.querySelector('h1')?.textContent?.trim() === 'Frontend');
  const firstCard = { href: cardHref, path: new URL(page.url()).pathname, h1: await page.locator('h1').first().textContent() };

  report.targets.push({ name: target.name, initial, surveyAfterClose, backend, favorite: { ariaPressed: favoriteState, storageKeys: saved }, firstCard, errors });
  await context.close();
}

await browser.close();
const outDir = 'replication-evidence/round-2026-09-21/catalog-home-interactions';
await mkdir(outDir, { recursive: true });
await writeFile(`${outDir}/interaction-report.json`, `${JSON.stringify(report, null, 2)}\n`);

const failures = report.targets.flatMap((target) => {
  const problems = [];
  if (target.initial.cards !== (target.name === 'source' ? 140 : 140)) problems.push(`cards=${target.initial.cards}`);
  if (!target.initial.surveyVisible || target.surveyAfterClose !== 0) problems.push('survey close');
  if (target.backend.path !== '/en/topics/backend' || target.backend.cards !== 73) problems.push(`backend=${JSON.stringify(target.backend)}`);
  if (target.favorite.ariaPressed !== 'true') problems.push(`favorite=${target.favorite.ariaPressed}`);
  if (target.firstCard.path !== '/en/frontend') problems.push(`firstCard=${JSON.stringify(target.firstCard)}`);
  if (target.errors.length) problems.push(`errors=${JSON.stringify(target.errors)}`);
  return problems.length ? `${target.name}: ${problems.join('; ')}` : [];
});

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`catalog home interactions passed: ${report.targets.length} source/local flows`);
