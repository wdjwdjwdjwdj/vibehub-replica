import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
try {
  await page.goto('https://vibe-hub.org/en/practice', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  for (let round = 1; round <= 30; round += 1) {
    for (let optionIndex = 0; optionIndex < 3; optionIndex += 1) {
      const option = page.locator('.practice-option').nth(optionIndex);
      if (await option.isDisabled()) break;
      await option.click();
      await page.waitForTimeout(25);
    }
    const state = await page.evaluate(() => ({
      title: document.querySelector('h1')?.innerText || '',
      recent: JSON.parse(localStorage.getItem('vibehub.practice.recent.v1') || '[]'),
      hasNext: [...document.querySelectorAll('button')].some((node) => node.innerText.trim() === 'Next question'),
    }));
    console.log(`${round}: recent=${state.recent.length} next=${state.hasNext} title=${state.title}`);
    const next = page.getByRole('button', { name: /Next question/ });
    if (!(await next.count())) break;
    await next.click();
    await page.waitForTimeout(35);
  }
} finally {
  await browser.close();
}
