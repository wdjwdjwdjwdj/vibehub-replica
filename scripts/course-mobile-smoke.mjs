import { chromium } from 'playwright';

const base = process.env.VIBEHUB_BASE_URL || 'http://127.0.0.1:5174';
const slugs = ['01-page-structure', '02-visual-direction', '03-hero-cta', '04-content-structure', '05-evidence-pricing-faq', '06-layout-surface', '07-form-and-interaction', '08-responsive', '09-delivery-and-agent'];
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const failures = [];
const runtimeErrors = [];
page.on('pageerror', (error) => runtimeErrors.push(`pageerror: ${error.message}`));
page.on('console', (message) => { if (message.type() === 'error') runtimeErrors.push(`console: ${message.text()}`); });

for (const slug of slugs) {
  runtimeErrors.length = 0;
  await page.goto(`${base}/en/courses/product-website/${slug}`, { waitUntil: 'domcontentloaded' });
  const result = await page.evaluate(() => ({
    h1: document.querySelector('h1')?.textContent?.trim() || '',
    scrollWidth: document.documentElement.scrollWidth,
    sections: document.querySelectorAll('.course-reader-section').length,
    visuals: document.querySelectorAll('.course-inline-visual').length,
  }));
  if (!result.h1 || result.scrollWidth > 390 || result.sections < 4 || result.visuals < 1 || runtimeErrors.length) failures.push(`${slug} -> ${JSON.stringify({ ...result, runtimeErrors })}`);
}

for (const route of ['/en/courses/product-website', '/en/courses/git-workflow']) {
  runtimeErrors.length = 0;
  await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded' });
  const result = await page.evaluate(() => ({
    h1: document.querySelector('h1')?.textContent?.trim() || '',
    scrollWidth: document.documentElement.scrollWidth,
    mainHeight: Math.round(document.querySelector('main')?.getBoundingClientRect().height || 0),
    scrollHeight: document.querySelector('main')?.scrollHeight || 0,
    cards: document.querySelectorAll('.course-chapter-card').length,
    visualsHidden: [...document.querySelectorAll('.course-chapter-list-visual')].every((element) => getComputedStyle(element).display === 'none'),
  }));
  if (!result.h1 || result.scrollWidth > 390 || result.mainHeight !== 736 || result.scrollHeight <= result.mainHeight || result.cards < 1 || !result.visualsHidden || runtimeErrors.length) failures.push(`${route} -> ${JSON.stringify({ ...result, runtimeErrors })}`);
}

await browser.close();
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log(`course mobile smoke passed: ${slugs.length} product chapters and 2 overview routes at 390px`);
