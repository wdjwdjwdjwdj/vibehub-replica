import { chromium } from 'playwright';

const localBase = process.env.VIBEHUB_BASE_URL || 'http://127.0.0.1:5174';
const sourceBase = 'https://vibe-hub.org';
const routes = ['/en/html', '/en/dns', '/en/typography', '/en/terminal'];
const desktop = { width: 1440, height: 1000 };
const mobile = { width: 390, height: 844 };
const includeMobile = process.env.VIBEHUB_AUDIT_MOBILE === '1';

// Source DOM measurements captured at 390px on 2026-09-16. The current
// source uses different section class names, so mobile checks compare the
// local semantic sections against this measured source contract.
const mobileExpected = {
  '/en/html': {
    usage: [1629.7, 1654.5], anatomy: [3324.2, 564.1], variants: [3928.3, 710.7],
    scenes: [4679.0, 849.0], selector: [5568.0, 421.1], references: [6029.1, 144.2],
  },
  '/en/dns': {
    usage: [1720.8, 1573.9], anatomy: [3334.7, 825.5], variants: [4200.2, 746.7],
    scenes: [4986.9, 1246.2], selector: [6273.0, 421.1], references: [6734.1, 91.2],
  },
  '/en/typography': {
    usage: [1824.8, 1679.0], anatomy: [3543.8, 509.3], variants: [4093.2, 692.7],
    scenes: [4825.8, 931.4], selector: [5797.2, 421.1], references: [6258.3, 144.2],
  },
  '/en/terminal': {
    usage: [1649.2, 1590.1], anatomy: [3279.3, 586.2], variants: [3905.5, 728.7],
    scenes: [4674.2, 958.7], selector: [5672.9, 421.1], references: [6134.0, 91.2],
  },
};

const browser = await chromium.launch({ headless: true });

async function inspect(page, url, viewportName) {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(700);
  const data = await page.evaluate((name) => {
    const rect = (element) => element ? {
      top: element.getBoundingClientRect().top,
      height: element.getBoundingClientRect().height,
    } : null;
    const findHeadingSection = (heading) => [...document.querySelectorAll('main section')]
      .find((section) => section.querySelector('h2,h3,.section-title')?.textContent.trim() === heading);
    const isSource = location.origin.includes('vibe-hub.org');
    const isHtml = location.pathname.endsWith('/html');
    const selectors = isSource ? {
      usage: '.usage-grid',
      anatomy: 'section:not(.detail-hero):not(.lesson-practice):not(.lesson-agent-prompt):not(.scenes):not(.selector-recommendation):not(.references-section):has(h2)',
      variants: null,
      scenes: '.scenes',
      selector: '.selector-recommendation',
      references: '.references-section',
    } : {
      usage: isHtml ? '.usage-grid' : '.source-extended-usage',
      anatomy: isHtml ? null : '.source-extended-anatomy',
      variants: isHtml ? null : '.source-extended-variants',
      scenes: isHtml ? '.scenes' : '.source-extended-scenes',
      selector: '.selector-recommendation',
      references: '.references-section',
    };
    const section = (key) => {
      if (key === 'anatomy' && (!selectors.anatomy || selectors.anatomy.includes('section:not'))) return findHeadingSection('Anatomy');
      if (key === 'variants' && !selectors.variants) return findHeadingSection('Variants');
      return document.querySelector(selectors[key]);
    };
    return {
      viewport: name,
      mainHeight: document.querySelector('main')?.getBoundingClientRect().height || 0,
      sections: Object.fromEntries(Object.keys(selectors).map((key) => [key, rect(section(key))])),
      scrollWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
    };
  }, viewportName);
  return { ...data, errors };
}

const rows = [];
for (const viewport of includeMobile ? [desktop, mobile] : [desktop]) {
  const viewportName = viewport === desktop ? 'desktop' : 'mobile';
  for (const route of routes) {
    const context = await browser.newContext({ viewport });
    const sourcePage = await context.newPage();
    const localPage = await context.newPage();
    const source = await inspect(sourcePage, `${sourceBase}${route}`, viewportName);
    const local = await inspect(localPage, `${localBase}${route}`, viewportName);
    rows.push({ route, source, local });
    await context.close();
  }
}
await browser.close();

console.log(JSON.stringify(rows.map(({ route, source, local }) => ({ route, viewport: source.viewport, source, local })), null, 2));

const failures = [];
for (const row of rows) {
  if (row.source.errors?.length || row.local.errors?.length) failures.push(`${row.viewport} ${row.route}: browser errors`);
  if (row.local.scrollWidth > (row.viewport === 'mobile' ? mobile.width : desktop.width) || row.local.bodyWidth > (row.viewport === 'mobile' ? mobile.width : desktop.width)) {
    failures.push(`${row.viewport} ${row.route}: horizontal overflow`);
  }
  if (row.source.viewport === 'desktop') {
    for (const key of ['usage', 'anatomy', 'variants', 'scenes', 'selector', 'references']) {
      const sourceSection = row.source.sections[key];
      const localSection = row.local.sections[key];
      if (!sourceSection || !localSection) failures.push(`${row.route}: missing ${key} section`);
      else if (Math.abs(sourceSection.top - localSection.top) > 3 || Math.abs(sourceSection.height - localSection.height) > 3) {
        failures.push(`${row.route}: ${key} geometry differs`);
      }
    }
  } else {
    const expected = mobileExpected[row.route];
    for (const key of ['usage', 'anatomy', 'variants', 'scenes', 'selector', 'references']) {
      const localSection = row.local.sections[key];
      const [expectedTop, expectedHeight] = expected[key];
      if (!localSection) failures.push(`${row.route}: missing mobile ${key} section`);
      else if (Math.abs(localSection.top - expectedTop) > 3 || Math.abs(localSection.height - expectedHeight) > 3) {
        failures.push(`${row.route}: mobile ${key} geometry differs`);
      }
    }
  }
}

if (failures.length) {
  console.error(`extended detail parity audit failed:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}
console.log(`extended detail parity audit passed: ${rows.length} source/local viewport pairs inspected${includeMobile ? '' : ' (desktop; set VIBEHUB_AUDIT_MOBILE=1 for the legacy mobile contract)'}`);
