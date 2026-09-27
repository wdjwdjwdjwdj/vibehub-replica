// 列出 main-site-upgraded 里已升级的词条名（临时检查脚本）
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../main-site-upgraded/index.html', import.meta.url), 'utf8');
const s = html.indexOf('<script>') + 8, e = html.indexOf('</' + 'script>', s);
const js = html.slice(s, e);
const m = /(?:const|let|var)\s+entries\s*=\s*/.exec(js);
const start = js.indexOf('=', m.index) + 1;
let depth = 0, inStr = null, esc = false, end = -1;
for (let i = start; i < js.length; i++) {
  const c = js[i];
  if (inStr) {
    if (esc) esc = false;
    else if (c === '\\') esc = true;
    else if (c === inStr) inStr = null;
    continue;
  }
  if (c === '"' || c === "'") inStr = c;
  else if (c === '[' || c === '{') depth++;
  else if (c === ']' || c === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
}
const entries = eval('(' + js.slice(start, end) + ')');
console.log('已升级的 10 个词条（主站原词名 · 分类）：');
entries.filter(x => x.d).forEach(x => console.log(' -', x.term, '（', x.cat, '）'));
