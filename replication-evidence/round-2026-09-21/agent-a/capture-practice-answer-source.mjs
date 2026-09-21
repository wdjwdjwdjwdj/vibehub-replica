import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('replication-evidence/round-2026-09-21/agent-a/evidence/TASK-004/source');
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

const capture = async (name) => {
  const state = await page.evaluate(() => {
    const options = [...document.querySelectorAll('.practice-option')];
    const result = document.querySelector('.practice-result');
    const question = document.querySelector('.practice-question, [class*="practice-question"]');
    const next = [...document.querySelectorAll('button')].find((node) => node.textContent.trim() === 'Next question');
    return {
      question: (question?.innerText || '').replace(/\s+/g, ' ').trim(),
      options: options.map((node) => ({
        text: (node.innerText || '').replace(/\s+/g, ' ').trim(),
        className: node.className,
        disabled: node.disabled,
        ariaPressed: node.getAttribute('aria-pressed'),
      })),
      result: result ? { text: (result.innerText || '').replace(/\s+/g, ' ').trim(), className: result.className } : null,
      nextQuestion: next ? { visible: Boolean(next.offsetParent), disabled: next.disabled } : null,
      documentHeight: document.documentElement.scrollHeight,
      recent: JSON.parse(localStorage.getItem('vibehub.practice.recent.v1') || '[]'),
    };
  });
  await page.locator('.practice-main, .practice-page, main').first().screenshot({ path: path.join(outDir, `${name}.png`) });
  return state;
};

await page.goto('https://vibe-hub.org/en/practice', { waitUntil: 'load', timeout: 60000 });
const surveyClose = page.locator('.source-survey-close').first();
if (await surveyClose.isVisible().catch(() => false)) await surveyClose.click();
await page.locator('.practice-option').first().waitFor({ state: 'visible', timeout: 15000 });
const report = {
  taskId: 'TASK-004-practice-answer-state',
  sourceUrl: page.url(),
  capturedAt: new Date().toISOString(),
  environment: { viewport: '1440x900', locale: 'en-US', colorScheme: 'light', browser: 'chromium' },
  initial: await capture('initial'),
  attempts: [],
};

// Begin with B so the stable slider question records the retry state before its A answer.
for (const index of [1, 0, 2]) {
  const option = page.locator('.practice-option').nth(index);
  if (await option.isDisabled()) break;
  await option.click();
  await page.waitForTimeout(1200);
  const state = await capture(`after-option-${index + 1}`);
  report.attempts.push({ optionIndex: index, state });
  if (state.options.every((item) => item.disabled)) break;
}
report.diagnostics = diagnostics;
fs.writeFileSync(path.join(outDir, 'practice-answer-source-state.json'), JSON.stringify(report, null, 2));
await context.close();
await browser.close();
console.log(JSON.stringify(report, null, 2));
