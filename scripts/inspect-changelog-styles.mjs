import { chromium } from 'playwright';
const browser = await chromium.launch();
for (const [label, url] of [['source','https://vibe-hub.org/en/changelog'],['local','http://127.0.0.1:5174/en/changelog']]) {
  const page = await (await browser.newContext({viewport:{width:1440,height:900},locale:'en-US'})).newPage();
  await page.goto(url,{waitUntil:'networkidle',timeout:60000}); await page.waitForTimeout(1200);
  const x=await page.evaluate(()=>[...document.querySelectorAll('.changelog-entry')].map((e)=>{const h=e.querySelector('.changelog-milestone-title'); const s=getComputedStyle(h); const m=getComputedStyle(e.querySelector('.changelog-milestone')); return {text:h.textContent.trim().slice(0,30), weight:s.fontWeight, milestoneH:e.querySelector('.changelog-milestone').getBoundingClientRect().height, titleH:h.getBoundingClientRect().height, border:m.borderBottom};}));
  console.log(label,JSON.stringify(x)); await page.context().close();
}
await browser.close();
