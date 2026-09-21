import { chromium } from 'playwright';
const browser = await chromium.launch();
for (const [label,url] of [['source','https://vibe-hub.org/en/changelog'],['local','http://127.0.0.1:5174/en/changelog']]) {
  const page=await (await browser.newContext({viewport:{width:1440,height:900},locale:'en-US'})).newPage();
  await page.goto(url,{waitUntil:'networkidle',timeout:60000}); await page.waitForTimeout(1200);
  const r=await page.evaluate(()=>[...document.querySelectorAll('.changelog-item-icon')].slice(0,4).map((el)=>{const child=el.firstElementChild; const item=el.closest('.changelog-item'); const a=el.getBoundingClientRect(),b=child?.getBoundingClientRect(),c=item?.getBoundingClientRect(),s=getComputedStyle(child||el),p=getComputedStyle(el),q=getComputedStyle(item);return {html:child?.outerHTML,box:{x:a.x,y:a.y,w:a.width,h:a.height},child:{x:b?.x,y:b?.y,w:b?.width,h:b?.height},item:{x:c?.x,y:c?.y,w:c?.width,h:c?.height,align:q.alignItems},parent:{font:p.font,color:p.color,display:p.display},style:{font:s.font,lineHeight:s.lineHeight,fontFamily:s.fontFamily,display:s.display,stroke:s.stroke,strokeWidth:s.strokeWidth}}}));
  console.log(label,JSON.stringify(r,null,2)); await page.context().close();
}
await browser.close();
