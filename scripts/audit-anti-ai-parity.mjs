import { chromium } from 'playwright';

const localBase = process.env.VIBEHUB_BASE_URL || 'http://127.0.0.1:5173';
const sourceBase = 'https://vibe-hub.org';
const cases = [
  { route: '/anti-ai-flavor', h1: '防止 AI 味儿', sections: [11, 8, 6], firstTerm: '稳稳接住' },
  { route: '/en/anti-ai-flavor', h1: 'Avoid AI Slop', sections: [4, 8, 6], firstTerm: 'Abstract Boosters' },
];
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

const browser = await chromium.launch({ headless: true });

async function inspect(page, url) {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(1000);
  const data = await page.evaluate(() => ({
    h1: document.querySelector('h1')?.textContent.trim() || '',
    sections: [...document.querySelectorAll('.cat-section')].map((section) => ({
      id: section.id,
      cards: section.querySelectorAll('.aif-term-card').length,
      height: section.getBoundingClientRect().height,
    })),
    cardHeights: [...document.querySelectorAll('.aif-term-card')].map((card) => card.getBoundingClientRect().height),
    mainHeight: document.querySelector('main')?.getBoundingClientRect().height || 0,
    scrollWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
    text: document.body.innerText,
  }));
  return { data, errors };
}

const rows = [];
for (const viewport of viewports) {
  for (const item of cases) {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
    const sourcePage = await context.newPage();
    const localPage = await context.newPage();
    const source = await inspect(sourcePage, `${sourceBase}${item.route}`);
    const local = await inspect(localPage, `${localBase}${item.route}`);
    rows.push({ viewport: viewport.name, width: viewport.width, route: item.route, source, local });
    await context.close();
  }
}
await browser.close();

console.log(JSON.stringify(rows.map((row) => ({
  viewport: row.viewport,
  route: row.route,
  source: {
    h1: row.source.data.h1,
    sections: row.source.data.sections.map((section) => ({ cards: section.cards, height: Math.round(section.height * 10) / 10 })),
    mainHeight: Math.round(row.source.data.mainHeight),
  },
  local: {
    h1: row.local.data.h1,
    sections: row.local.data.sections.map((section) => ({ cards: section.cards, height: Math.round(section.height * 10) / 10 })),
    mainHeight: Math.round(row.local.data.mainHeight),
    scrollWidth: row.local.data.scrollWidth,
  },
  errors: [...row.source.errors, ...row.local.errors],
})), null, 2));

const failures = [];
for (const row of rows) {
  const expected = cases.find((item) => item.route === row.route);
  const local = row.local.data;
  const source = row.source.data;
  if (row.source.errors.length || row.local.errors.length) failures.push(`${row.viewport} ${row.route}: browser errors`);
  if (local.h1 !== expected.h1) failures.push(`${row.viewport} ${row.route}: unexpected h1 ${JSON.stringify(local.h1)}`);
  if (local.sections.map((section) => section.cards).join(',') !== expected.sections.join(',')) {
    failures.push(`${row.viewport} ${row.route}: section card counts differ`);
  }
  if (!local.text.includes(expected.firstTerm)) failures.push(`${row.viewport} ${row.route}: localized card copy missing`);
  if (local.scrollWidth > row.width || local.bodyWidth > row.width) {
    failures.push(`${row.viewport} ${row.route}: horizontal overflow (${local.scrollWidth}px)`);
  }
  if (local.sections.length !== source.sections.length) failures.push(`${row.viewport} ${row.route}: source/local section count differs`);
  local.sections.forEach((section, index) => {
    const sourceSection = source.sections[index];
    if (Math.abs(section.height - sourceSection.height) > 2) {
      failures.push(`${row.viewport} ${row.route}: section ${index + 1} height differs by ${Math.round(section.height - sourceSection.height)}px`);
    }
  });
}

if (failures.length) {
  console.error(`anti-ai parity audit failed:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}
console.log(`anti-ai parity audit passed: ${rows.length} source/local viewport pairs inspected`);
