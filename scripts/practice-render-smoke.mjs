import { chromium } from '@playwright/test';
import { practiceData } from '../src/practiceData.js';
import { catalogData } from '../src/catalogData.js';

const base = process.env.VIBEHUB_BASE_URL || 'http://127.0.0.1:5173';
const expectedCounts = new Map([
  ['All areas', 296],
  ['Frontend', 136],
  ['Backend', 59],
  ['Product', 19],
  ['Testing', 14],
  ['Tech Stack', 17],
  ['AI', 37],
  ['Git', 12],
  ['Design Styles', 2],
]);

const topicMeta = [
  ['Frontend', 'Frontend'], ['Backend', 'Backend'], ['Product', 'Product'], ['Testing', 'Testing'],
  ['Tech Stack', 'Tech Stack'], ['AI', 'AI'], ['Git', 'Git'], ['Design Styles', 'Design Styles'],
];
const itemId = (item) => item.length === 4 ? item[0] : item[2] || item[0];
const topicForItem = (id) => topicMeta.find(([, key]) => catalogData[key].some((section) => section.items.some((item) => itemId(item) === id)))?.[0] || 'Frontend';

const ordered = practiceData
  .map((entry) => ({ ...entry, topic: topicForItem(entry.termId) }))
  .sort((a, b) => (a.termId === 'button' ? -1 : b.termId === 'button' ? 1 : 0));

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
await page.addInitScript(`(() => { const ids = ${JSON.stringify(ordered.map((entry) => entry.termId))}; const key = (id) => 'frontend-' + id; let pending = null; Math.random = () => { const recent = JSON.parse(localStorage.getItem('vibehub.practice.recent.v1') || '[]'); if (pending && recent.includes(key(pending))) { const seen = JSON.parse(localStorage.getItem('__practiceSmokeSeen') || '[]'); if (!seen.includes(pending)) localStorage.setItem('__practiceSmokeSeen', JSON.stringify([...seen, pending])); pending = null; } const seen = JSON.parse(localStorage.getItem('__practiceSmokeSeen') || '[]'); const available = ids.filter((id) => !recent.includes(key(id))); const unseen = available.filter((id) => !seen.includes(id)); pending = pending || unseen[0] || available[0] || ids[0]; const position = Math.max(0, available.indexOf(pending)); return (position + 0.1) / Math.max(available.length, 1); }; })();`);
const errors = [];
page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
page.on('console', (message) => { if (message.type() === 'error') errors.push(`console: ${message.text()}`); });

try {
  await page.goto(`${base}/practice`, { waitUntil: 'networkidle' });
  const zhTitle = await page.locator('#practice-question-title').innerText();
  if (zhTitle !== ordered[0].zh.title) throw new Error('Chinese practice entry did not render');
  await page.evaluate(() => localStorage.clear());
  await page.goto(`${base}/en/practice`, { waitUntil: 'networkidle' });
  if (process.env.PRACTICE_SCREENSHOT) await page.screenshot({ path: process.env.PRACTICE_SCREENSHOT, fullPage: false });
  const menuTrigger = page.locator('.practice-scope-trigger');
  await menuTrigger.click();
  const menuOptions = page.locator('.practice-scope-menu [role="option"]');
  if (await menuOptions.count() !== expectedCounts.size) throw new Error(`expected ${expectedCounts.size} practice scopes`);
  for (const [label, count] of expectedCounts) {
    const option = menuOptions.filter({ hasText: `${label} (${count})` });
    if (await option.count() !== 1) throw new Error(`missing scope count: ${label} (${count})`);
  }
  await menuTrigger.click();

  const seen = new Set();
  for (let index = 0; index < ordered.length; index += 1) {
    const entry = ordered[index];
    const title = await page.locator('#practice-question-title').innerText();
    if (title !== entry.en.title) throw new Error(`question ${index + 1} mismatch for ${entry.termId}: ${title}`);
    if (seen.has(title)) throw new Error(`question repeated: ${entry.termId}`);
    seen.add(title);
    const correctIndex = entry.en.options.findIndex((option) => option.correct);
    if (correctIndex < 0) throw new Error(`missing correct answer: ${entry.termId}`);
    await page.locator('.practice-options button').nth(correctIndex).click();
    if (!(await page.locator('.practice-term-panel').getAttribute('class')).includes('is-revealed')) {
      throw new Error(`answer did not reveal related guide: ${entry.termId}`);
    }
    if (await page.locator('.practice-embedded-detail').count() !== 1) throw new Error(`embedded term guide missing: ${entry.termId}`);
    if (index === 0 && process.env.PRACTICE_CORRECT_SCREENSHOT) await page.screenshot({ path: process.env.PRACTICE_CORRECT_SCREENSHOT, fullPage: false });
    if (index < ordered.length - 1) await page.getByRole('button', { name: /Next question/ }).click();
  }
  if (seen.size !== 296) throw new Error(`expected 296 unique questions, got ${seen.size}`);
  if (errors.length) throw new Error(errors.join('\n'));
  console.log(`practice render smoke passed: ${seen.size} bilingual questions, ${expectedCounts.size} scope counts`);
} finally {
  await browser.close();
}
