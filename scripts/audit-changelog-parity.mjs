import { chromium } from 'playwright';

const localBase = process.env.VIBEHUB_BASE_URL || 'http://127.0.0.1:5174';
const expandLabels = ['Show all 20 terms', 'Show all 17 terms', 'Show all 244 terms'];

async function readPage(browser, url) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', (error) => errors.push(String(error)));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  for (const label of expandLabels) {
    const button = page.getByRole('button', { name: label, exact: true });
    if (await button.count()) await button.click();
  }
  const result = await page.evaluate(() => ({
    title: document.title,
    h1: document.querySelector('h1')?.textContent.trim(),
    entries: [...document.querySelectorAll('.changelog-entry')].map((entry) => ({
      date: entry.querySelector('.changelog-entry-date')?.textContent.trim(),
      title: entry.querySelector('.changelog-milestone-title')?.textContent.trim(),
      items: [...entry.querySelectorAll('.changelog-item-text')].map((item) => item.textContent.trim()),
      terms: [...entry.querySelectorAll('.changelog-term-pill')].map((term) => ({
        id: term.getAttribute('href')?.split('/').pop(),
        category: term.querySelector('.changelog-term-cat')?.textContent.trim(),
      })),
    })),
  }));
  await page.close();
  return { ...result, errors };
}

const browser = await chromium.launch({ headless: true });
const source = await readPage(browser, 'https://vibe-hub.org/en/changelog');
const local = await readPage(browser, `${localBase}/en/changelog`);
await browser.close();

const sourceEntries = source.entries.map(({ date, title, items, terms }) => ({ date, title, items, terms }));
const localEntries = local.entries.map(({ date, title, items, terms }) => ({ date, title, items, terms }));
const sourceCategories = Object.fromEntries(source.entries.flatMap((entry) => entry.terms.map((term) => [term.id, term.category])));
const localCategories = Object.fromEntries(local.entries.flatMap((entry) => entry.terms.map((term) => [term.id, term.category])));
const sameEntries = JSON.stringify(sourceEntries) === JSON.stringify(localEntries);
const stableCategories = (categories) => Object.fromEntries(Object.entries(categories).sort(([a], [b]) => a.localeCompare(b)));
const sameCategories = JSON.stringify(stableCategories(sourceCategories)) === JSON.stringify(stableCategories(localCategories));
if (!sameEntries || !sameCategories || source.errors.length || local.errors.length) {
  const firstEntryMismatch = sourceEntries.map((entry, index) => ({ index, source: entry, local: localEntries[index] })).find(({ source: entry, local }) => JSON.stringify(entry) !== JSON.stringify(local));
  const categoryMismatch = Object.keys({ ...sourceCategories, ...localCategories }).map((id) => ({ id, source: sourceCategories[id], local: localCategories[id] })).filter((entry) => entry.source !== entry.local).slice(0, 20);
  console.error(JSON.stringify({ sameEntries, sameCategories, firstEntryMismatch, categoryMismatch, sourceErrors: source.errors, localErrors: local.errors }, null, 2));
  process.exit(1);
}
console.log(`changelog parity passed: ${local.entries.length} milestones, ${Object.keys(localCategories).length} terms, ${local.entries.reduce((total, entry) => total + entry.items.length, 0)} update items`);
