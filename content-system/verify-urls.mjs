// facts 锚点批量实测：读取全部 samples 的 facts.source，逐条 GET 验证可达性
// 用法: node content-system/verify-urls.mjs [samples子目录或文件...]
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const base = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const files = args.length
  ? args.map(a => join(base, a))
  : readdirSync(join(base, 'samples')).filter(f => f.endsWith('.json')).map(f => join(base, 'samples', f));

const urls = new Map(); // url -> [ids]
for (const f of files) {
  let d;
  try { d = JSON.parse(readFileSync(f, 'utf8')); } catch { continue; }
  for (const fact of d.facts || []) {
    if (!fact.source) continue;
    if (!urls.has(fact.source)) urls.set(fact.source, []);
    urls.get(fact.source).push(d.id);
  }
}

const ok = [], warn = [], bad = [];
const queue = [...urls.keys()];
let done = 0;
const CONC = 6;
async function check(url) {
  try {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 20000);
    const res = await fetch(url, { signal: ctl.signal, redirect: 'follow' });
    clearTimeout(t);
    if (res.ok) ok.push(url);
    else if (res.status >= 300 && res.status < 400) warn.push(`${url} → ${res.status}`);
    else bad.push(`${res.status} ${url}`);
  } catch (e) {
    warn.push(`TIMEOUT/ERR ${url}`);
  }
  done++;
}
async function run() {
  const workers = Array.from({ length: CONC }, async () => {
    while (queue.length) {
      const u = queue.shift();
      if (u) await check(u);
    }
  });
  await Promise.all(workers);
}
await run();
console.log(`共 ${urls.size} 个 URL，${done} 已测`);
console.log(`\n✓ 可达 ${ok.length}`);
console.log(`⚠ 跳转/超时 ${warn.length}`); warn.forEach(w => console.log('  ' + w));
console.log(`✗ 失败 ${bad.length}`); bad.forEach(b => console.log('  ' + b));
if (bad.length) { console.log('\n失败 URL 对应词条:'); for (const b of bad) { const u = b.split(' ').slice(1).join(' '); console.log(`  ${u} ← ${(urls.get(u) || []).join(',')}`); } }
process.exit(bad.length ? 1 : 0);
