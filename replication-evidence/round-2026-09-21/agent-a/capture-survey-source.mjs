import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('replication-evidence/round-2026-09-21/agent-a/evidence/TASK-001/source');
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  locale: 'en-US',
  colorScheme: 'light',
});
const page = await context.newPage();
const diagnostics = { consoleErrors: [], pageErrors: [], failedResponses: [] };
page.on('console', (message) => { if (message.type() === 'error') diagnostics.consoleErrors.push(message.text()); });
page.on('pageerror', (error) => diagnostics.pageErrors.push(String(error)));
page.on('response', (response) => { if (response.status() >= 400) diagnostics.failedResponses.push(`${response.status()} ${response.url()}`); });

const state = async (name) => {
  const survey = page.locator('.source-survey');
  const visible = await survey.isVisible().catch(() => false);
  const data = await page.evaluate(() => {
    const root = document.querySelector('.source-survey');
    const options = [...document.querySelectorAll('.source-survey-option')];
    const optionBox = document.querySelector('.source-survey-options');
    return {
      exists: Boolean(root),
      optionCount: options.length,
      disabled: options.map((option) => option.disabled),
      ariaBusy: optionBox?.getAttribute('aria-busy') ?? null,
      panelText: (root?.innerText ?? '').replace(/\s+/g, ' ').trim(),
    };
  });
  if (visible) await survey.screenshot({ path: path.join(outDir, `${name}.png`) });
  return { visible, ...data };
};

await page.goto('https://vibe-hub.org/en/html', { waitUntil: 'load', timeout: 60000 });
await page.locator('.source-survey').waitFor({ state: 'visible', timeout: 15000 });
const report = {
  taskId: 'TASK-001-survey-submit',
  sourceUrl: page.url(),
  capturedAt: new Date().toISOString(),
  environment: { viewport: '1440x900', locale: 'en-US', colorScheme: 'light', browser: 'chromium' },
  initial: await state('initial'),
};

await page.locator('.source-survey-option').nth(2).click();
await page.waitForTimeout(200);
report.after200ms = await state('after-0200ms');
await page.waitForTimeout(400);
report.after600ms = await state('after-0600ms');
await page.waitForTimeout(1200);
report.after1800ms = await state('after-1800ms');
report.diagnostics = diagnostics;

fs.writeFileSync(path.join(outDir, 'survey-source-state.json'), JSON.stringify(report, null, 2));
await context.close();
await browser.close();
console.log(JSON.stringify(report, null, 2));
