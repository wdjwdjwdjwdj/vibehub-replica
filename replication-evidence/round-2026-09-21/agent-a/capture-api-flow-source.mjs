import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('replication-evidence/round-2026-09-21/agent-a/evidence/TASK-002/source');
fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: 'en-US', colorScheme: 'light' });
const page = await context.newPage();
const diagnostics = { consoleErrors: [], pageErrors: [], failedResponses: [] };
page.on('console', (message) => { if (message.type() === 'error') diagnostics.consoleErrors.push(message.text()); });
page.on('pageerror', (error) => diagnostics.pageErrors.push(String(error)));
page.on('response', (response) => { if (response.status() >= 400) diagnostics.failedResponses.push(`${response.status()} ${response.url()}`); });

const extract = () => page.evaluate(() => {
  const first = (selector) => document.querySelector(selector);
  const counter = first('.fj-now')?.textContent?.trim() ?? null;
  const scene = first('.fj-scene');
  const nav = [...document.querySelectorAll('button.fj-nav')];
  const previous = nav.find((button) => /previous/i.test(button.textContent || ''));
  const next = nav.find((button) => /next/i.test(button.textContent || ''));
  return {
    counter,
    sceneClass: scene?.className ?? null,
    sceneStep: scene?.getAttribute('data-step') ?? null,
    sceneText: (scene?.innerText ?? '').replace(/\s+/g, ' ').trim().slice(0, 800),
    previous: previous ? { disabled: previous.disabled, text: previous.textContent.trim() } : null,
    next: next ? { disabled: next.disabled, text: next.textContent.trim() } : null,
  };
});
const record = async (name) => {
  const snapshot = await extract();
  const panel = page.locator('.fj-scene').first();
  if (await panel.count()) await panel.screenshot({ path: path.join(outDir, `${name}.png`) });
  return snapshot;
};

await page.goto('https://vibe-hub.org/en/api', { waitUntil: 'load', timeout: 60000 });
const close = page.locator('.source-survey-close').first();
if (await close.isVisible().catch(() => false)) await close.click();
await page.locator('.fj-nav').first().waitFor({ state: 'visible', timeout: 15000 });
const report = {
  taskId: 'TASK-002-api-flow',
  sourceUrl: page.url(),
  capturedAt: new Date().toISOString(),
  environment: { viewport: '1440x900', locale: 'en-US', colorScheme: 'light', browser: 'chromium' },
  first: await record('step-01'),
  steps: [],
};

const next = page.locator('button.fj-nav').filter({ hasText: 'Next' }).first();
for (let step = 2; step <= 6; step += 1) {
  await next.click();
  await page.waitForTimeout(250);
  const state = await record(`step-0${step}`);
  report.steps.push(state);
}
report.diagnostics = diagnostics;
fs.writeFileSync(path.join(outDir, 'api-flow-source-state.json'), JSON.stringify(report, null, 2));
await context.close();
await browser.close();
console.log(JSON.stringify(report, null, 2));
