import { chromium } from 'playwright';

const routes = ['/en/changelog', '/en/anti-ai-flavor', '/en/vibehub-skill', '/en/courses', '/en/practice'];
const browser = await chromium.launch({ headless: true });
try {
  for (const route of routes) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.goto(`https://vibe-hub.org${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(1500);
    const snapshot = await page.evaluate(() => ({
      title: document.title,
      h1: [...document.querySelectorAll('h1')].map((node) => node.innerText.trim()).filter(Boolean),
      h2: [...document.querySelectorAll('h2')].map((node) => node.innerText.trim()).filter(Boolean).slice(0, 30),
      buttons: [...document.querySelectorAll('button')].map((node) => node.innerText.trim()).filter(Boolean).slice(0, 40),
      links: [...document.querySelectorAll('a')].map((node) => `${node.innerText.trim()} → ${node.getAttribute('href') || ''}`).filter((item) => !item.startsWith(' →')).slice(0, 40),
      visibleText: document.body.innerText.replace(/\s+/g, ' ').trim().slice(0, 1200),
    }));
    console.log(`\n=== ${route} ===\n${JSON.stringify(snapshot, null, 2)}`);
    await page.close();
  }
} finally {
  await browser.close();
}
