import { chromium } from 'playwright';

// Desktop is the current acceptance baseline; the existing mobile CSS remains
// intentionally out of scope for this smoke check.
const viewport = { width: 1440, height: 900 };
const cases = [
  {
    name: 'header',
    source: {
      root: '.nav',
      logo: '.vh-logo',
      search: 'input[aria-label="Search terms and components"]',
      language: '.nav-lang',
      theme: '.nav-circle',
      mode: '.nav-color-mode',
      primary: '.nav-primary-item',
    },
    local: {
      root: '.site-header',
      logo: '.brand',
      search: 'input[aria-label="Search terms and components"]',
      language: '.language-button',
      theme: '.theme-color-button',
      mode: '.icon-button',
      primary: '.main-nav a',
    },
  },
];

const metric = (selector) => {
  const element = document.querySelector(selector);
  if (!element) return null;
  const rect = element.getBoundingClientRect();
  return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
};

async function inspect(page, selectors) {
  return page.evaluate((items) => ({
    metrics: Object.fromEntries(Object.entries(items).map(([key, selector]) => [key, {
      selector,
      rect: (() => {
        const element = document.querySelector(selector);
        if (!element) return null;
        const rect = element.getBoundingClientRect();
        return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
      })(),
    }])),
    bodyWidth: document.body.getBoundingClientRect().width,
    scrollWidth: document.documentElement.scrollWidth,
  }), selectors);
}

const browser = await chromium.launch({ headless: true });
const pages = {};

for (const [label, url] of [['source', 'https://vibe-hub.org/en'], ['local', `${process.env.VIBEHUB_BASE_URL || 'http://127.0.0.1:5174'}/en`]]) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });
  await page.addInitScript(() => localStorage.setItem('vibehub-source-survey-shown-v1', '1'));
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(900);
  pages[label] = { page, context, errors, inspection: await inspect(page, cases[0][label]) };
}

const source = pages.source.inspection;
const local = pages.local.inspection;
const failures = [];
for (const key of Object.keys(cases[0].source)) {
  const sourceRect = source.metrics[key]?.rect;
  const localRect = local.metrics[key]?.rect;
  if (!sourceRect || !localRect) {
    failures.push(`${key}: missing source/local element`);
    continue;
  }
  for (const dimension of ['x', 'y', 'width', 'height']) {
    if (Math.abs(sourceRect[dimension] - localRect[dimension]) > 1) {
      failures.push(`${key}.${dimension}: source=${sourceRect[dimension]} local=${localRect[dimension]}`);
    }
  }
}
if (local.scrollWidth > local.bodyWidth + 1) {
  failures.push(`horizontal overflow: body=${local.bodyWidth} scroll=${local.scrollWidth}`);
}
for (const label of ['source', 'local']) {
  if (pages[label].errors.length) failures.push(`${label} runtime errors: ${pages[label].errors.join(' | ')}`);
}

for (const value of Object.values(pages)) await value.context.close();
await browser.close();

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('header shell smoke passed: 1440px source/local geometry, overflow, and runtime errors');
