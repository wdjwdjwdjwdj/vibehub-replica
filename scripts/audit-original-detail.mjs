import { chromium } from 'playwright';

const routes = process.argv.slice(2).length ? process.argv.slice(2) : ['/en/button', '/en/rollback', '/en/push', '/en/moodboard'];
const browser = await chromium.launch({ headless: true });
try {
  for (const route of routes) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.goto(`https://vibe-hub.org${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(800);
    const snapshot = await page.evaluate(() => ({
      title: document.title,
      classes: [...document.querySelectorAll('[class*="detail"], [class*="prose"], [class*="dh-"]')].map((node) => node.className).filter(Boolean).slice(0, 80),
      sections: [...document.querySelectorAll('main h2, main h3, .detail-body h2, .detail-body h3')].map((node) => node.innerText.trim()).filter(Boolean),
      paragraphs: [...document.querySelectorAll('.detail-body p, main p')].map((node) => node.innerText.trim()).filter(Boolean).slice(0, 40),
      lists: [...document.querySelectorAll('.detail-body ul, .detail-body ol')].map((list) => [...list.querySelectorAll('li')].map((item) => item.innerText.trim()).filter(Boolean)).filter((list) => list.length),
      directChildren: [...document.querySelectorAll('.detail-body')].flatMap((body) => [...body.children].map((node) => ({ tag: node.tagName, className: node.className, text: node.innerText.trim().slice(0, 700) }))),
      bodyText: document.body.innerText.replace(/\s+/g, ' ').trim().slice(0, 3500),
    }));
    console.log(`\n=== ${route} ===\n${JSON.stringify(snapshot, null, 2)}`);
    await page.close();
  }
} finally {
  await browser.close();
}
