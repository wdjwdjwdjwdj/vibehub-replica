import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const base = process.env.VIBEHUB_BASE_URL || 'http://127.0.0.1:5174';
const out = resolve(process.cwd(), 'replication-evidence/round-2026-09-23/ai-core/interactions');
const slugs = ['rag', 'prompt-injection', 'temperature', 'fine-tuning', 'reasoning-model', 'agent-memory'];
const correctIndex = { 'agent-memory': 0 };

await mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const report = [];

for (const english of [true, false]) {
  for (const slug of slugs) {
    const errors = [];
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
    page.on('console', (message) => { if (message.type() === 'error') errors.push(`console: ${message.text()}`); });
    const route = `${english ? '/en' : ''}/${slug}`;
    await page.goto(`${base}${route}`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('h1');
    await page.waitForSelector('.extra-ai-learning');

    await page.locator('.scene-controls button').nth(1).click();
    const demoStateChanged = await page.locator('.scene-controls button').nth(1).getAttribute('aria-pressed') === 'true';
    await page.locator('.extra-ai-part-list button').nth(1).click();
    const anatomyChanged = await page.locator('.extra-ai-part-list button').nth(1).getAttribute('aria-pressed') === 'true';
    await page.locator('.extra-ai-variant-tabs button').nth(1).click();
    const variantChanged = await page.locator('.extra-ai-variant-tabs button').nth(1).getAttribute('aria-selected') === 'true';
    await page.locator('.extra-ai-scene-tabs button').nth(1).click();
    const scenarioChanged = await page.locator('.extra-ai-scene-tabs button').nth(1).getAttribute('aria-pressed') === 'true';
    await page.locator('.lesson-practice-option').nth(correctIndex[slug] ?? 2).click();
    const quizPassed = await page.locator('.quiz-result.success').count() === 1;
    const expectedChinese = !english ? /[\u4e00-\u9fff]/.test(await page.locator('main').innerText()) : true;
    await page.screenshot({ path: resolve(out, `${english ? 'en' : 'zh'}-${slug}-interactive.png`), fullPage: true });
    report.push({ route, demoStateChanged, anatomyChanged, variantChanged, scenarioChanged, quizPassed, expectedChinese, errors });
    await page.close();
  }
}

await browser.close();
await writeFile(resolve(out, 'interaction-report.json'), `${JSON.stringify({ base, report }, null, 2)}\n`);
const failures = report.filter((item) => !item.demoStateChanged || !item.anatomyChanged || !item.variantChanged || !item.scenarioChanged || !item.quizPassed || !item.expectedChinese || item.errors.length);
if (failures.length) {
  console.error(JSON.stringify(failures, null, 2));
  process.exit(1);
}
console.log(`AI core interaction verification passed: ${report.length} bilingual routes`);
