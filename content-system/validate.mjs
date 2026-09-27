// term-author 内容质检脚本 · v5（2026-09-27，配套 STYLE-GUIDE v5 三槽位标准）
// 用法: node content-system/validate.mjs                → 检查 samples/ 全部词条
//       node content-system/validate.mjs samples/http.json → 检查单个词条
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const base = dirname(fileURLToPath(import.meta.url));
const target = process.argv[2];
const files = target
  ? [join(base, target)]
  : readdirSync(join(base, 'samples')).filter(f => f.endsWith('.json')).map(f => join(base, 'samples', f));

const BANNED_ZH = ['赋能', '抓手', '闭环', '深入浅出', '综上所述', '总而言之', '值得注意的是', '众所周知', '在当今', '随着', '大揭秘', '干货', '一站式', '究极', '解锁', '助力', '致力于',
  // v5 新增：AI 味高发（类比引导词 + 教练腔，见 STYLE-GUIDE v5 第三节）
  '就像', '好比', '相当于', '如同', '不妨把', '你有没有', '别担心', '亲测', '手把手'];
const BANNED_EN = [/\bdelve\b/i, /\btapestry\b/i, /\blandscapes?\b/i, /it'?s important to note/i, /in today'?s/i, /game-?changer/i, /unlock(ing)? the power/i, /\bseamless(ly)?\b/i, /\bleverage\b/i, /comprehensive guide/i, /\brobust\b/i];

// v5 区间来自原站 355 条实测（P10–P90 外放宽少量余量）：scene 14–22 / explain 41–56 / say 41–62
// v5.1（2026-09-27 冗余反馈）：explain/say 上限 80→72——原站 a 历史最长 72，新版不得比原站最长更长
// 中文按字数计；英文约 0.55 倍密度，上限放宽约一倍。en 整体暂缓，仅存在时校验。
const ZH_LIMITS = { scene: [12, 24], explain: [40, 72], say: [40, 72] };
const EN_LIMITS = { scene: [25, 55], explain: [90, 180], say: [90, 180] };
const LIMITS = { zh: ZH_LIMITS, en: EN_LIMITS };
let failures = 0;
const fail = (msg) => { failures++; console.log(`  ✗ ${msg}`); };
const warn = (msg) => console.log(`  ⚠ ${msg}`);

for (const file of files) {
  const id = file.split(/[\\/]/).pop().replace('.json', '');
  console.log(`\n▶ ${id}`);
  let d;
  try { d = JSON.parse(readFileSync(file, 'utf8')); } catch (e) { fail(`JSON 解析失败: ${e.message}`); continue; }

  // 顶层结构
  for (const k of ['id', 'name', 'category', 'level', 'updated', 'lang', 'facts', 'qa']) {
    if (!(k in d)) fail(`缺少顶层字段 ${k}`);
  }
  if (d.id !== id) fail(`id 字段(${d.id})与文件名(${id})不一致`);
  if (d.id && !/^[a-z][a-z0-9-]*$/.test(d.id)) fail(`id 必须是 kebab-case`);

  // 三槽位：zh 必填，en 可选（暂缓）
  const langs = d.lang?.zh ? ['zh'] : [];
  if (!d.lang?.zh) fail('缺少 lang.zh');
  if (d.lang?.en) langs.push('en');

  for (const lang of langs) {
    const L = d.lang[lang];
    for (const k of ['scene', 'explain', 'say']) {
      if (typeof L[k] !== 'string') { fail(`lang.${lang} 缺少 ${k}`); continue; }
      const [min, max] = LIMITS[lang][k];
      const len = L[k].length;
      if (len < min || len > max) fail(`lang.${lang}.${k} 长度 ${len} 超出 [${min},${max}]`);
    }
    // scene：必须问句或陈述收尾，且不得第一人称开场（原站 355 条无一例外）
    if (typeof L.scene === 'string') {
      if (!/[？。]$/.test(L.scene.trim())) fail(`lang.${lang}.scene 必须以 ？ 或 。 收尾（好奇问句/需求陈述两种模式）`);
      if (/^(你|你们|我们|我)/.test(L.scene.trim())) fail(`lang.${lang}.scene 禁用第一人称开场（主语应是现象）`);
    }
    // quiz：可选，存在即校验结构（测验页素材，不进卡片）
    if (L.quiz !== undefined) {
      const q = L.quiz;
      if (typeof q.q !== 'string' || !Array.isArray(q.options) || q.options.length !== 3) {
        fail(`lang.${lang}.quiz 需要题目 + 3 个选项`);
      } else if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 2) {
        fail(`quiz.answer 必须是 0–2`);
      } else if (!q.explain) {
        fail(`quiz 缺少 explain`);
      }
    }
    // 禁词
    const allText = JSON.stringify(L);
    for (const w of BANNED_ZH) if (allText.includes(w)) fail(`lang.${lang} 命中禁词「${w}」`);
    for (const re of BANNED_EN) if (re.test(allText)) fail(`lang.${lang} 命中英文禁词 ${re}`);
    // v5 风格结构警告（软警告：按 STYLE-GUIDE 三句解剖人工判断，不算硬失败）
    if (lang === 'zh') {
      const a = typeof L.explain === 'string' ? L.explain : '';
      if (a && !a.includes('：') && (a.match(/、/g) || []).length < 2) warn(`explain 疑似缺枚举句（无冒号且顿号<2）——实例枚举是密度主要来源，确认是否漏写`);
      if (typeof L.say === 'string' && L.say && !/请|帮/.test(L.say)) warn(`say 缺交付物请求词（请/帮）——具体交付物是 say 的核心段`);
    }
  }

  // 事实锚点
  if (!Array.isArray(d.facts) || d.facts.length < 2) {
    fail(`facts 至少 2 条`);
  } else {
    for (const f of d.facts) {
      if (!f.claim || !f.source) fail(`facts 项缺少 claim/source`);
      else if (!/^https?:\/\//.test(f.source)) fail(`facts.source 必须是 http(s) URL`);
    }
  }
}

console.log(`\n${'='.repeat(50)}`);
if (failures === 0) { console.log(`✅ 全部通过（${files.length} 个词条）`); process.exit(0); }
console.log(`❌ ${failures} 个问题（${files.length} 个词条）`); process.exit(1);
