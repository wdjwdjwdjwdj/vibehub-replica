import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await (await browser.newContext()).newPage();
await page.goto('https://vibe-hub.org/en/changelog',{waitUntil:'networkidle',timeout:60000});
const out=await page.evaluate(async()=>{
  const urls=[...document.querySelectorAll('link[rel="stylesheet"]')].map(x=>x.href);
  const texts=[]; for(const url of urls){try{texts.push(await (await fetch(url)).text())}catch{}}
  const names=['sparkles','bulb','check','book-2','books','chevron-down','arrow-left','calendar','bolt'];
  const lines=[]; for(const name of names){for(const text of texts){let at=-1; while((at=text.indexOf(`.ti-${name}`,at+1))>=0){lines.push({name,match:text.slice(Math.max(0,at-80),Math.min(text.length,at+240))});}}}
  return {urls,lines};
});
console.log(JSON.stringify(out,null,2)); await browser.close();
