import { chromium } from 'playwright';

const browser = await chromium.launch();
for (const [label, url] of [['source', 'https://vibe-hub.org/en/changelog'], ['local', 'http://127.0.0.1:5174/en/changelog']]) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US', colorScheme: 'light' });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1500);
  const result = await page.evaluate(() => {
    const entries = [...document.querySelectorAll('.changelog-entry')];
    const inspect = (el) => {
      const rect = (selector) => { const node = selector === ':scope' ? el : el?.querySelector(selector); if (!node) return null; const r=node.getBoundingClientRect(); const s=getComputedStyle(node); return { x:r.x,y:r.y+scrollY,w:r.width,h:r.height,display:s.display,margin:s.margin,padding:s.padding,font:s.font,lineHeight:s.lineHeight,borderBottom:s.borderBottom }; };
      return { text: el?.innerText, html: el?.outerHTML, entry: rect(':scope'), meta: rect('.changelog-entry-meta'), body: rect('.changelog-entry-body'), milestone: rect('.changelog-milestone'), title: rect('.changelog-milestone-title'), summary: rect('.changelog-milestone-summary'), updates: rect('.changelog-updates-group'), list: rect('.changelog-items-list'), items: [...(el?.querySelectorAll('.changelog-item')||[])].map((node)=>{const r=node.getBoundingClientRect();const s=getComputedStyle(node);return {text:node.innerText,x:r.x,y:r.y+scrollY,w:r.width,h:r.height,margin:s.margin,padding:s.padding,font:s.font,lineHeight:s.lineHeight}}) };
    };
    return { count: entries.length, first: inspect(entries[0]), last: inspect(entries.at(-1)) };
  });
  console.log(label, JSON.stringify(result, null, 2));
  await context.close();
}
await browser.close();
