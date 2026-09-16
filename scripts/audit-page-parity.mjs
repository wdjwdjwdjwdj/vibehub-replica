import { chromium } from 'playwright';

const localBase = process.env.VIBEHUB_BASE_URL || 'http://127.0.0.1:5173';
const sourceBase = 'https://vibe-hub.org';
const routes = [
  '/en',
  '/en/topics/frontend',
  '/en/practice',
  '/en/anti-ai-flavor',
  '/en/vibehub-skill',
  '/en/vibehub-skill/lab',
  '/en/changelog',
  '/en/courses',
  '/en/courses/product-website',
  '/en/courses/product-website/01-page-structure',
  '/en/courses/git-workflow',
  '/en/button',
  '/en/git',
  '/en/upload',
  '/en/input',
  '/en/modal',
  '/en/card',
  '/en/markdown',
  '/en/html',
  '/en/dns',
  '/en/typography',
  '/en/terminal',
  '/en/api',
  '/en/ai-agent',
  '/en/project-rules',
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();

async function inspect(url) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(1200);
  return page.evaluate(() => ({
    h1: document.querySelector('h1')?.textContent.trim() || '',
    title: document.title,
    mainHeight: Math.round(document.querySelector('main')?.getBoundingClientRect().height || 0),
    linkCount: document.querySelectorAll('main a').length,
    buttonCount: document.querySelectorAll('main button').length,
    iframeCount: document.querySelectorAll('iframe').length,
    errorText: /404|page not found/i.test(document.body.innerText),
  }));
}

const rows = [];
for (const route of routes) {
  const source = await inspect(`${sourceBase}${route}`);
  const local = await inspect(`${localBase}${route}`);
  const randomized = route === '/en/practice';
  rows.push({ route, source, local, titleEqual: source.title === local.title, h1Equal: randomized ? null : source.h1 === local.h1 });
}

await browser.close();
console.log(JSON.stringify(rows, null, 2));

const failures = rows.filter(({ local }) => !local.h1 || local.errorText || local.iframeCount > 0);
if (failures.length) {
  console.error(`page parity audit failed: ${failures.map(({ route }) => route).join(', ')}`);
  process.exit(1);
}
console.log(`page parity audit passed: ${rows.length} source/local page pairs inspected`);
