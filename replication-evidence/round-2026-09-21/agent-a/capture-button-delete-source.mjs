import { chromium } from 'playwright';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('replication-evidence/round-2026-09-21/agent-a/evidence/TASK-003/source');
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

const snapshot = async () => page.evaluate(() => {
  const button = [...document.querySelectorAll('button')].find((node) => node.textContent.trim() === 'Delete');
  if (!button) return { found: false };
  const ancestors = [];
  let node = button;
  for (let level = 0; node && level < 6; level += 1, node = node.parentElement) {
    ancestors.push({
      tag: node.tagName.toLowerCase(),
      className: node.className?.toString() || '',
      id: node.id || '',
      text: (node.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 1200),
      html: node.outerHTML,
    });
  }
  return {
    found: true,
    button: {
      disabled: button.disabled,
      className: button.className?.toString() || '',
      ariaPressed: button.getAttribute('aria-pressed'),
      ariaExpanded: button.getAttribute('aria-expanded'),
      text: button.textContent.trim(),
    },
    scrollHeight: document.documentElement.scrollHeight,
    ancestors,
  };
});

await page.goto('https://vibe-hub.org/en/button', { waitUntil: 'load', timeout: 60000 });
const surveyClose = page.locator('.source-survey-close').first();
if (await surveyClose.isVisible().catch(() => false)) await surveyClose.click();
const deleteButton = page.getByRole('button', { name: 'Delete', exact: true }).first();
await deleteButton.waitFor({ state: 'visible', timeout: 15000 });
await deleteButton.scrollIntoViewIfNeeded();
await page.waitForTimeout(250);
await page.screenshot({ path: path.join(outDir, 'before-click.png') });
const before = await snapshot();
await deleteButton.click();
await page.waitForTimeout(800);
await page.screenshot({ path: path.join(outDir, 'after-0800ms.png') });
const after = await snapshot();
const stable = JSON.stringify(before) === JSON.stringify(after);
const report = {
  taskId: 'TASK-003-button-delete-static',
  sourceUrl: page.url(),
  capturedAt: new Date().toISOString(),
  environment: { viewport: '1440x900', locale: 'en-US', colorScheme: 'light', browser: 'chromium' },
  before,
  after800ms: after,
  exactStateUnchanged: stable,
  comparableStateSha256: {
    before: crypto.createHash('sha256').update(JSON.stringify(before)).digest('hex'),
    after800ms: crypto.createHash('sha256').update(JSON.stringify(after)).digest('hex'),
  },
  diagnostics,
};
fs.writeFileSync(path.join(outDir, 'button-delete-source-state.json'), JSON.stringify(report, null, 2));
await context.close();
await browser.close();
console.log(JSON.stringify(report, null, 2));
