// 把 content-system/samples 的词条按 v5 标准并入主站快照（增删改查原则：只动必要处）
// v5（2026-09-27）：只注入 q/a/say 三槽位，保持原站卡片节奏；深度注入路径已废止（见 STYLE-GUIDE v5）
// 用法: node content-system/apply-to-main-site.mjs → 生成 main-site-upgraded/index.html
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const base = dirname(fileURLToPath(import.meta.url));
const root = join(base, '..');
const html = readFileSync(join(root, 'main-site-snapshot', 'index.html'), 'utf8');
const jsStart = html.indexOf('<script>') + '<script>'.length;
const jsEnd = html.indexOf('</' + 'script>', jsStart);
const js = html.slice(jsStart, jsEnd);

// ---- 1. 定位 entries 数组字面量的精确区间 ----
const declRe = /(?:const|let|var)\s+entries\s*=\s*/;
const declMatch = declRe.exec(js);
if (!declMatch) throw new Error('未找到 entries 声明');
const arrStart = js.indexOf('=', declMatch.index) + 1;
let depth = 0, inStr = null, escFlag = false, arrEnd = -1;
for (let i = arrStart; i < js.length; i++) {
  const c = js[i];
  if (inStr) {
    if (escFlag) escFlag = false;
    else if (c === '\\') escFlag = true;
    else if (c === inStr) inStr = null;
    continue;
  }
  if (c === '"' || c === "'" || c === '`') { inStr = c; continue; }
  if (c === '[' || c === '{') depth++;
  else if (c === ']' || c === '}') { depth--; if (depth === 0) { arrEnd = i + 1; break; } }
}
if (arrEnd < 0) throw new Error('entries 数组括号未配平');
// entries 是主站内联的单引号 JS 字面量（纯数据、无函数），用 eval 解析
const entries = eval('(' + js.slice(arrStart, arrEnd) + ')');

// ---- 2. 载入样稿并按名匹配 ----
const samples = readdirSync(join(base, 'samples')).filter(f => f.endsWith('.json')).map(f => JSON.parse(readFileSync(join(base, 'samples', f), 'utf8')));
const norm = (s) => (s || '').toLowerCase().replace(/\s+/g, '');
let matched = 0, missed = [];
for (const s of samples) {
  const zh = s.lang.zh;
  const candidates = [norm(s.name.zh), norm(s.name.en), ...(s.aliases?.zh || []).map(norm), ...(s.aliases?.en || []).map(norm)];
  const entry = entries.find(e => candidates.includes(norm(e.term)))
    || entries.find(e => candidates.some(c => c && norm(e.term).includes(c) && c.length >= 3));
  if (!entry) { missed.push(s.id); continue; }
  matched++;
  // v5 三槽位：scene→大白话场景(q)，explain→一句话讲解(a)，say→跟 AI 说
  entry.q = zh.scene;
  entry.a = zh.explain;
  entry.say = zh.say;
  // cat/level 保持原站值不动；深度字段（d/dp/p/ms/qz）一律不再注入
}
console.log(`词条匹配: ${matched}/${samples.length}`, missed.length ? `未匹配: ${missed.join(',')}` : '');
if (missed.length) throw new Error(`有 ${missed.length} 条样稿未匹配到主站词条，中止注入`);

// ---- 3. 换回 entries 数组（其余词条原样保留）----
const newJs = js.slice(0, arrStart) + JSON.stringify(entries) + js.slice(arrEnd);
const out = html.slice(0, jsStart) + newJs + html.slice(jsEnd);

mkdirSync(join(root, 'main-site-upgraded'), { recursive: true });
writeFileSync(join(root, 'main-site-upgraded', 'index.html'), out);
console.log('main-site-upgraded/index.html 已生成:', Math.round(out.length / 1024) + 'KB（快照', Math.round(html.length / 1024) + 'KB）');
console.log('改动点: 仅 entries 数据中已升级词条的 q/a/say 三字段；引擎、样式、其余词条零改动');
