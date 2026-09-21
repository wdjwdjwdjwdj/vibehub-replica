import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import { termExtras } from '../src/termExtras.js';

const base = process.env.VIBEHUB_BASE_URL || 'http://127.0.0.1:5174';
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: 'en-US', colorScheme: 'light' });
const rows = [];
const entries = process.env.EXTRA_LIMIT ? termExtras.slice(0, Number(process.env.EXTRA_LIMIT)) : termExtras;
for (const [, , slug] of entries) {
  const page = await context.newPage();
  page.setDefaultTimeout(5000);
  console.log(`probe ${rows.length + 1}/${entries.length} ${slug}`);
  const errors = [];
  page.on('pageerror', (error) => errors.push(String(error)));
  try {
    await page.goto(`${base}/en/${slug}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(180);
    const initial = await page.locator('h1').first().innerText();
    const beforeFavorite = await page.locator('.favorite-button').getAttribute('aria-label');
    await page.locator('.favorite-button').click();
    const afterFavorite = await page.locator('.favorite-button').getAttribute('aria-label');
    await page.locator('.detail-copy-markdown').click();
    const copied = await page.locator('.detail-copy-markdown').innerText();
    const stageButton = page.locator('.extra-stage-action').first();
    if (await stageButton.count()) await stageButton.click();
    const practiceOption = page.locator('.extra-lesson-practice .lesson-practice-option').first();
    if (await practiceOption.count()) await practiceOption.click();
    rows.push({ slug, initial, favoriteToggled: beforeFavorite !== afterFavorite, copied, stage: await page.locator('.extra-stage-action').first().innerText().catch(() => ''), errors });
  } catch (error) {
    rows.push({ slug, error: error.message, errors });
  }
  await page.close();
}
await context.close();
await browser.close();
const failed = rows.filter((row) => row.error || row.errors?.length || !row.favoriteToggled);
const report = { total: rows.length, passed: rows.length - failed.length, failed, sample: rows.slice(0, 3), rows };
await fs.mkdir('replication-evidence/round-2026-09-21/extra-details', { recursive: true });
await fs.writeFile('replication-evidence/round-2026-09-21/extra-details/interaction-report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (failed.length) process.exitCode = 1;
