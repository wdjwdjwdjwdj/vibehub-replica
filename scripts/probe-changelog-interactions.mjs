import { chromium } from 'playwright';

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const errors = [];
page.on('pageerror', (error) => errors.push(String(error)));
page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
const base = process.env.CHANGELOG_BASE_URL || 'http://127.0.0.1:5174';
await page.goto(`${base}/en/changelog`, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(800);
const report = {
  title: await page.locator('h1').innerText(),
  stats: await page.locator('.changelog-stat-number').allTextContents(),
  initialEntries: await page.locator('.changelog-entry').count(),
};
await page.locator('.changelog-filter-btn').nth(1).click();
report.updatesFilter = { dataFilter: await page.locator('.changelog-filter-group').getAttribute('data-filter'), entries: await page.locator('.changelog-entry').count() };
await page.locator('.changelog-filter-btn').nth(2).click();
report.termsFilter = { dataFilter: await page.locator('.changelog-filter-group').getAttribute('data-filter'), entries: await page.locator('.changelog-entry').count() };
await page.locator('.changelog-filter-btn').first().click();
const firstExpand = page.locator('.changelog-expand-btn').first();
await firstExpand.click();
report.expand = { terms: await page.locator('.changelog-entry').first().locator('.changelog-term-pill').count(), buttonCount: await page.locator('.changelog-entry').first().locator('.changelog-expand-btn').count() };
await page.locator('.changelog-sidebar-link').nth(1).click();
await page.waitForTimeout(1500);
report.monthJump = await page.evaluate(() => ({ y: window.scrollY, target: document.querySelector('#changelog-2026-08-31')?.getBoundingClientRect().top + window.scrollY }));
report.errors = errors;
console.log(JSON.stringify(report, null, 2));
await context.close();
await browser.close();
if (errors.length || report.updatesFilter.dataFilter !== 'updates' || report.termsFilter.dataFilter !== 'terms' || report.expand.terms !== 32 || report.expand.buttonCount !== 0 || Math.abs(report.monthJump.target - report.monthJump.y) > 6) process.exit(1);
