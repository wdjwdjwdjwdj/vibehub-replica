import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const sourceBase = 'https://vibe-hub.org';
const localBase = process.env.VIBEHUB_BASE_URL || 'http://127.0.0.1:5174';
const out = resolve(process.cwd(), 'replication-evidence/round-2026-09-23/ai-core');
const slugs = ['rag', 'prompt-injection', 'temperature', 'fine-tuning', 'reasoning-model', 'agent-memory'];
const routes = slugs.flatMap((slug) => [`/en/${slug}`, `/${slug}`]);

await mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });

async function inspect(page, url, screenshot) {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
  await page.waitForSelector('h1', { timeout: 15000 });
  await page.screenshot({ path: screenshot, fullPage: true });
  const snapshot = await page.evaluate(() => {
    const clean = (value) => value.replace(/\s+/g, ' ').trim();
    const detail = document.querySelector('main');
    const pick = (node) => ({
      tag: node.tagName.toLowerCase(),
      className: node.className || '',
      id: node.id || '',
      text: clean(node.textContent || '').slice(0, 240),
    });
    return {
      title: document.title,
      h1: clean(document.querySelector('h1')?.textContent || ''),
      headings: [...document.querySelectorAll('main h2, main h3')].map((node) => clean(node.textContent || '')),
      sectionTopology: detail ? [...detail.children].map(pick) : [],
      interactive: [...document.querySelectorAll('main button, main summary, main [role="tab"], main input, main select')].map((node, index) => ({
        index,
        tag: node.tagName.toLowerCase(),
        className: node.className || '',
        type: node.getAttribute('type') || '',
        text: clean(node.textContent || ''),
        ariaLabel: node.getAttribute('aria-label') || '',
        ariaPressed: node.getAttribute('aria-pressed') || '',
      })),
      htmlLength: document.documentElement.outerHTML.length,
      mainHeight: Math.round(detail?.getBoundingClientRect().height || 0),
      scrollHeight: document.documentElement.scrollHeight,
    };
  });
  return { status: response?.status() || 0, errors, ...snapshot };
}

const results = [];
for (const route of routes) {
  const safe = route.replaceAll('/', '_').replace(/^_/, '');
  const sourcePage = await context.newPage();
  const localPage = await context.newPage();
  const [source, local] = await Promise.all([
    inspect(sourcePage, `${sourceBase}${route}`, resolve(out, `${safe}.source.png`)),
    inspect(localPage, `${localBase}${route}`, resolve(out, `${safe}.local.png`)),
  ]);
  await sourcePage.close();
  await localPage.close();
  results.push({ route, source, local });
}

await browser.close();
await writeFile(resolve(out, 'inventory.json'), `${JSON.stringify({ sourceBase, localBase, routes, results }, null, 2)}\n`);
console.log(`Captured ${routes.length} source/local AI detail pairs in ${out}`);
