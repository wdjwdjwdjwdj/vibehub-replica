import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
try {
  await page.goto('https://vibe-hub.org/en/practice', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  const initial = await page.evaluate(() => ({
    title: document.querySelector('h1')?.innerText || '',
    optionButtons: [...document.querySelectorAll('button')].filter((node) => /^[ABC]$/.test(node.innerText.trim()) || node.innerText.trim().startsWith('A\n') || node.innerText.trim().startsWith('B\n') || node.innerText.trim().startsWith('C\n')).map((node) => ({ text: node.innerText.trim(), html: node.outerHTML.slice(0, 700) })),
    storage: Object.fromEntries(Object.entries(localStorage)),
    buttons: [...document.querySelectorAll('button')].map((node) => node.innerText.trim()).filter(Boolean).slice(-12),
  }));
  console.log('INITIAL', JSON.stringify(initial, null, 2));
  const option = page.locator('.practice-option').first();
  if (await option.count()) {
    await option.click();
    await page.waitForTimeout(80);
    for (let optionIndex = 0; optionIndex < 3; optionIndex += 1) {
      const candidate = page.locator('.practice-option').nth(optionIndex);
      if (await candidate.isDisabled()) break;
      await candidate.click();
      await page.waitForTimeout(80);
    }
    if (process.env.PRACTICE_ORIGINAL_CORRECT_SCREENSHOT) await page.screenshot({ path: process.env.PRACTICE_ORIGINAL_CORRECT_SCREENSHOT, fullPage: false });
    console.log('AFTER_CORRECT_OPTION', JSON.stringify(await page.evaluate(() => ({
      title: document.querySelector('h1')?.innerText || '',
      text: document.body.innerText.slice(-1200),
      storage: Object.fromEntries(Object.entries(localStorage)),
      options: [...document.querySelectorAll('.practice-option')].map((node) => ({ text: node.innerText.trim(), className: node.className, disabled: node.disabled, pressed: node.getAttribute('aria-pressed') })),
      practiceClasses: [...document.querySelectorAll('[class*="practice"]')].map((node) => node.className).filter(Boolean).slice(-20),
      detailHtml: [...document.querySelectorAll('[class*="practice"]')].find((node) => node.innerText.includes('Further reading'))?.outerHTML.slice(0, 3000) || '',
      buttons: [...document.querySelectorAll('button')].map((node) => node.innerText.trim()).filter(Boolean).slice(-15),
    })), null, 2));
  }
} finally {
  await browser.close();
}
