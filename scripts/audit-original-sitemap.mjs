import { catalogData } from '../src/catalogData.js';
import { extraItemsByTopic } from '../src/termExtras.js';

const source = await fetch('https://vibe-hub.org/sitemap.xml');
if (!source.ok) throw new Error(`sitemap request failed: ${source.status}`);
const xml = await source.text();
const urls = xml.split('<loc>').slice(1).map((chunk) => chunk.split('</loc>')[0].trim()).filter(Boolean);
const paths = urls.map((url) => new URL(url).pathname);
const termIds = new Set([
  ...Object.values(catalogData).flatMap((groups) => groups.flatMap((group) => group.items.map((item) => item.length === 4 ? item[0] : item[2] || item[0]))),
  ...Object.values(extraItemsByTopic).flatMap((items) => items.map((item) => item[0])),
]);
const specialSlugs = new Set(['/', '/practice', '/anti-ai-flavor', '/vibehub-skill', '/changelog', '/courses']);
const stripLocale = (path) => path.replace(/^\/en(?=\/|$)/, '') || '/';
const termPaths = paths.filter((path) => /^\/(?:en\/)?[a-z0-9-]+$/.test(path) && !specialSlugs.has(stripLocale(path)));
const termSlugs = new Set(termPaths.map((path) => path.replace(/^\/en\//, '').replace(/^\//, '')));
const specialPaths = paths.filter((path) => !termPaths.includes(path));
const catalogMissing = [...termIds].filter((id) => !termSlugs.has(id));
const sitemapUnknown = [...termSlugs].filter((id) => !termIds.has(id));

console.log(JSON.stringify({
  total: paths.length,
  unique: new Set(paths).size,
  termPaths: termPaths.length,
  termSlugs: termSlugs.size,
  specialPaths,
  catalogMissing,
  sitemapUnknown,
}, null, 2));

if (catalogMissing.length || sitemapUnknown.length) process.exit(1);
