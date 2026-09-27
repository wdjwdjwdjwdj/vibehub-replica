/**
 * /en/html 与 /html 详情页的「原站标记」复刻区块。
 *
 * 用途：原站该词条详情页的功能区块（detail-hero / lesson-extras / usage-grid /
 * Anatomy / Variants / Typical use cases / Further reading）使用的是站点自有的
 * 结构与类名（usage-box、mk-win、html-anat、variant-card、scene-shot…），
 * 之前的实现用通用组件顶替，导致内容与插图与原站完全不一致。
 *
 * 本文件按原站真实 DOM 一比一重建这些区块：
 *   - 类名、层级、内联样式与原站一致（历史证据保存在 Git 提交 573dc6a）
 *   - 文案分 en / zh 两套，取自原站 /en/html 与 /html
 *   - 样式来自 src/htmlDetail.css（由 scripts/extract-original-css.mjs 从原站样式表提取，
 *     统一限定在 .vh-html-replica 作用域内）
 *
 * 维护方式：直接改这里的数据与 JSX；样式改动请改提取脚本后重新生成，不要手改 htmlDetail.css。
 */
import { useState, useEffect } from 'react';

/** 与 .ui-icon 配套的线性图标（原站内联 SVG，fill=none + currentColor 描边） */
export function HtmlUiIcon({ d, className = 'ui-icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const CHECK_PATH = 'm5 12.5 4.2 4.2L19 7';
const CROSS_PATH = 'M7 7l10 10M17 7 7 17';
const STAR_PATH = 'M23.9986 5L17.8856 17.4776L4 19.4911L14.0589 29.3251L11.6544 43L23.9986 36.4192L36.3454 43L33.9586 29.3251L44 19.4911L30.1913 17.4776L23.9986 5Z';

const MONO = 'ui-monospace,Menlo,monospace';

/* ------------------------------------------------------------------ 文案数据 */

const HERO = {
  en: {
    quoteLabel: 'You might say',
    quote: 'The code AI wrote has a bunch of angle brackets and English words. What are those for?',
    summaryLead: 'Describe the structure and meaning of a web page',
    summary:
      'HTML organizes a page into headings, paragraphs, links, forms, images, and other meaningful elements. CSS controls appearance and JavaScript adds behavior. Choosing the right element improves accessibility, keyboard behavior, search, and maintenance.',
    tree: [
      ['<html>', null, ''],
      ['<head>', 'Meta information', 'html-d1'],
      ['<body>', null, 'html-d1'],
      ['<h1>', 'Title', 'html-d2'],
      ['<p>', 'Paragraph', 'html-d2'],
      ['<a>', 'Link', 'html-d2'],
    ],
    page: { title: "Xiaoli's homepage", text: 'I like hiking and taking pictures. ', link: 'View my photo album →' },
  },
  zh: {
    quoteLabel: '你可能会说',
    quote: 'AI 写出来的代码里一堆 < > 和英文单词，这些东西是干嘛的？',
    summaryLead: 'HTML 是用标签描述网页内容结构、供浏览器渲染页面的标记语言',
    summary:
      '它用标签标出标题、段落、图片、链接和按钮。例如，产品页面的内容层级由 HTML 组织；视觉样式通常交给 CSS，复杂交互需要 JavaScript。',
    aliasLabel: '也常被叫作',
    aliasItems: ['HTML 页面结构', '超文本标记语言'],
    tree: [
      ['<html>', null, ''],
      ['<head>', '元信息', 'html-d1'],
      ['<body>', null, 'html-d1'],
      ['<h1>', '标题', 'html-d2'],
      ['<p>', '段落', 'html-d2'],
      ['<a>', '链接', 'html-d2'],
    ],
    page: { title: '小狸的主页', text: '我喜欢爬山和拍照。', link: '看我的相册 →' },
  },
};

const LESSON = {
  en: {
    kicker: 'Quick check',
    hint: 'Choose the best answer',
    question:
      "An article's main heading is only enlarged generic text, and View source is a clickable generic container. How should this be fixed?",
    agentTitle: 'You can say this to an AI Agent',
    agentPrompt:
      "Review this article's HTML structure: use the correct heading element for the page title, a real link for View source, and buttons for actions. Preserve the visual styling and verify every link and button with a keyboard.",
    options: [
      {
        label: 'Put the heading and source action into one image and make the whole image clickable',
        feedback: "An image removes selectable text and clear document structure, and its single click target obscures the action's meaning.",
      },
      {
        label: 'Use appropriate HTML heading and link elements for the structure and navigation',
        feedback:
          'HTML elements expose heading hierarchy and link behavior to the browser while CSS can still control appearance.',
        correct: true,
      },
      {
        label: 'Keep the generic containers and only increase the size and color contrast',
        feedback:
          'Visual styling changes appearance but does not give browsers, keyboards, or assistive tools the missing roles.',
      },
    ],
    feedbackCorrect: 'Correct',
    feedbackWrong: 'Try again',
  },
  zh: {
    kicker: '选择题',
    hint: '选择一个你认为最合适的答案',
    question: '文章页的大标题只是放大的普通文字，“查看原文”也是可点击的普通容器。应该怎样修改？',
    agentTitle: '你可以这样告诉 AI Agent',
    agentPrompt:
      '请先检查这篇文章的 HTML 结构：页面主标题使用正确的标题元素，“查看原文”使用真实链接，普通操作使用按钮。保留现有视觉样式，并用键盘确认链接和按钮都能正常访问。',
    options: [
      {
        label: '把标题和原文入口做进一张图片，再给整张图绑定点击',
        feedback: '图片会丢失可选择文字和清楚的内容结构，入口范围与含义也难以被正确识别。',
      },
      {
        label: '用合适的 HTML 标题和链接元素表达结构与跳转',
        feedback: 'HTML 元素会把标题层级和链接角色交给浏览器识别，页面外观仍可继续由 CSS 控制。',
        correct: true,
      },
      {
        label: '保留现有容器，只继续加大字号并换成更醒目的颜色',
        feedback: '视觉样式能改变外观，却不会让浏览器、键盘和辅助技术识别标题结构或链接角色。',
      },
    ],
    feedbackCorrect: '回答正确',
    feedbackWrong: '这个答案不太对',
  },
};

const USAGE = {
  en: {
    useTitle: 'When to use it',
    dontTitle: 'When NOT to use it',
    use: [
      {
        mock: 'report',
        text: 'Build page structure',
        title: 'A project report for people to read',
        lines: ['Clear headings, highlights, images, and sections', 'Help readers quickly scan for what matters to them.'],
        note: 'HTML turns content into a reading experience.',
      },
      {
        mock: 'url',
        text: 'Mark headings and sections',
        url: '🔒 report.example.com/launch',
        b: 'New product launch report',
        tag: 'Open page',
        note: 'Send a URL and anyone can view it in a browser.',
      },
      {
        mock: 'native',
        text: 'Create forms and links with native behavior',
        tags: ['▶ Video', '↗ Link', 'Fill out form'],
        note: 'A page can provide interactive elements such as media, links, and forms.',
      },
      {
        mock: 'markdown',
        text: 'Give content machine-readable meaning',
        code: '# Launch plan\n- Launch this week',
        b: 'Launch plan',
        sub: '· Launch this week',
      },
    ],
    dont: [
      {
        mock: 'unclosed',
        text: 'Use generic div elements for every role',
        code: '<div> card',
        inner: 'The content that follows may still be inside this element…',
        note: 'A missing </div> makes the DOM structure differ from what you expect.',
      },
      {
        mock: 'overlap',
        text: 'Choose tags only for their default appearance',
        code: '<b><i>text</b></i>',
        note: 'The tags overlap improperly; the browser may rearrange them during error recovery.',
      },
      {
        mock: 'head',
        text: 'Skip heading levels to get a larger font',
        pill: '<head> Welcome to my website',
        note: 'The structure is invalid; the browser may move the content into body during error recovery.',
      },
      {
        mock: 'docx',
        text: 'Put unsafe user content directly into HTML',
        badge: 'W',
        label: 'index.html → Save as .docx',
        note: 'DOCX is not HTML; browsers do not parse it as page structure.',
      },
    ],
  },
  zh: {
    useTitle: '什么时候用',
    dontTitle: '什么时候不用',
    use: [
      {
        mock: 'report',
        text: '把标题、图片和章节组织成清楚的网页结构',
        title: '一份给人看的项目报告',
        lines: ['清楚的标题、重点、图片和章节', '让读者快速扫到真正关心的内容'],
        note: 'HTML 把内容变成阅读体验',
      },
      {
        mock: 'url',
        text: (
          <>
            <b>制作可直接分享的页面</b>：官网、落地页、图文文章和报告，发一个网址就能在浏览器打开
          </>
        ),
        url: '🔒 report.example.com/launch',
        b: '新品发布报告',
        tag: '打开网页',
      },
      {
        mock: 'native',
        text: (
          <>
            <b>加入图片、链接和交互</b>：页面可以跳转、填写表单、播放媒体或触发操作
          </>
        ),
        tags: ['▶ 视频', '↗ 链接', '填写表单'],
        note: '页面可提供媒体、链接和表单等交互元素',
      },
      {
        mock: 'markdown',
        text: '把 Markdown 内容转成需要正式呈现的网页',
        code: '# 发布计划\n- 本周上线',
        b: '发布计划',
        sub: '· 本周上线',
      },
    ],
    dont: [
      {
        mock: 'unclosed',
        text: '标签打开后没有正确关闭，容易破坏后续结构',
        code: '<div> 卡片',
        inner: '后续内容可能仍处于该元素内…',
        note: '缺少 </div> 会使 DOM 结构与预期不一致',
      },
      {
        mock: 'overlap',
        text: '标签交叉嵌套，浏览器难以得到预期结构',
        code: '<b><i>文字</b></i>',
      },
      {
        mock: 'head',
        text: '不要把页面正文放进文档元数据区域（head）；正常可见内容应组织在 body 中',
        pill: '<head> 欢迎来到我的网站',
        note: '结构无效，浏览器可能按容错规则把内容移到 body',
      },
      {
        mock: 'docx',
        text: '不要用文字处理软件另存 HTML，以免破坏标签结构',
        badge: 'W',
        label: 'index.html → 另存为 .docx',
        note: 'DOCX 不是 HTML；浏览器不会将其作为网页结构解析',
      },
    ],
  },
};

const ANATOMY = {
  en: {
    title: 'Anatomy',
    attribute: ' href="https://vibe.guide"',
    content: 'Click to see',
    parts: [
      ['Opening Tag', null, 'Add angle brackets to the tag name to tell the browser "Start here"'],
      ['Attribute', null, 'Additional information written in the start tag, such as link address and image path'],
      ['Content', null, 'The part between the two pairs of angle brackets, only change this part when modifying the copy.'],
      ['Closing Tag', null, 'An extra slash tells the browser "end here"'],
    ],
  },
  zh: {
    title: '组成结构 · Anatomy',
    attribute: ' href="https://vibe.guide"',
    content: '点我看看',
    parts: [
      ['开始标签', 'Opening Tag', '尖括号加标签名，告诉浏览器「这里开始」'],
      ['属性', 'Attribute', '写在开始标签里的附加信息，如链接地址、图片路径'],
      ['内容', 'Content', '两对尖括号之间的部分，改文案只动这里'],
      ['结束标签', 'Closing Tag', '多一个斜杠，告诉浏览器「到这里结束」'],
    ],
  },
};

const VARIANTS = {
  en: {
    title: 'Variants',
    items: [
      { name: 'div', demo: '<div> … </div>', when: 'Use it to organize content and layout when there are no more appropriate semantic tags' },
      { name: 'Headings & p', demo: '<h1> <p>', when: 'Titles and paragraphs, the skeleton of the article' },
      { name: 'Link & Image', demo: '<a> <img>', when: 'a jumps to the URL, img posts the picture' },
      { name: 'Button & Input', demo: '<button> <input>', when: 'Interactive parts that can be clicked and filled on the page' },
    ],
  },
  zh: {
    title: '常见变体 · Variants',
    items: [
      { name: 'div 通用容器', alt: 'div', demo: '<div> … </div>', when: '没有更合适的语义标签时，用它组织内容和布局' },
      { name: 'h1~h3 与 p', alt: 'Headings & p', demo: '<h1> <p>', when: '标题和段落，文章的骨架' },
      { name: 'a 与 img', alt: 'Link & Image', demo: '<a> <img>', when: 'a 跳网址，img 贴图片' },
      { name: 'button 与 input', alt: 'Button & Input', demo: '<button> <input>', when: '页面上能点能填的交互件' },
    ],
  },
};

const SCENES = {
  en: {
    title: 'Typical use cases',
    caps: ['Page document', 'Article', 'Form', 'Navigation'],
    chat: { ask: 'Help me make a personal homepage', reply: 'Okay, here is your index.html:' },
    code: [
      [['<', 'h1', '>'], "Xiaoli's homepage", ['</', 'h1', '>']],
      [['<', 'p', '>'], 'I like climbing mountains and taking pictures. ', ['</', 'p', '>']],
      null,
    ],
    codeThird: { open: ['<', 'a', ' '], attr: 'href', value: '"/photos"', close: '>', text: 'View my photo album', end: ['</', 'a', '>'] },
    source: { url: 'view-source:https://my-first-page.vercel.app', lines: ["Xiaoli’s homepage", 'I like hiking and taking pictures. '], link: 'View my photo album' },
    devtools: { title: "Xiaoli's homepage", text: 'I like hiking and taking pictures. ', link: 'View my photo album →' },
    cheatsheet: {
      title: 'Common tag recognition',
      rows: [
        ['<div>', 'Universal container'],
        ['<p>', 'Paragraph'],
        ['<a>', 'Link'],
        ['<img>', 'Picture'],
        ['<button>', 'Button'],
        ['<input>', 'Input box'],
      ],
    },
  },
  zh: {
    title: '典型使用场景',
    caps: ['AI 给你的 index.html', '浏览器「查看源代码」', 'DevTools 检查元素', '常见标签速认小抄'],
    chat: { ask: '帮我做一个个人主页', reply: '好的，这是你的 index.html：' },
    code: [
      [['<', 'h1', '>'], '小狸的主页', ['</', 'h1', '>']],
      [['<', 'p', '>'], '我喜欢爬山和拍照。', ['</', 'p', '>']],
      null,
    ],
    codeThird: { open: ['<', 'a', ' '], attr: 'href', value: '"/photos"', close: '>', text: '看我的相册', end: ['</', 'a', '>'] },
    source: { url: 'view-source:https://my-first-page.vercel.app', lines: ['小狸的主页', '我喜欢爬山和拍照。'], link: '看我的相册' },
    devtools: { title: '小狸的主页', text: '我喜欢爬山和拍照。', link: '看我的相册 →' },
    cheatsheet: {
      title: '常见标签速认',
      rows: [
        ['<div>', '通用容器'],
        ['<p>', '段落'],
        ['<a>', '链接'],
        ['<img>', '图片'],
        ['<button>', '按钮'],
        ['<input>', '输入框'],
      ],
    },
  },
};

const REFERENCES = {
  en: {
    title: 'Further reading',
    items: [
      { title: 'Structuring content with HTML', href: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content' },
      { title: 'HTML: HyperText Markup Language', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
    ],
  },
  zh: {
    title: '延伸阅读 · 权威出处',
    items: [
      { title: '用 HTML 组织内容', href: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content' },
      { title: 'HTML：超文本标记语言', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
    ],
  },
};

const pick = (bundle, english) => (english ? bundle.en : bundle.zh);

/** 把可能的 JSX / 字符串 / 数组节点平整成纯文本（用于生成 Markdown） */
function toPlainText(node) {
  if (node == null || node === false) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(toPlainText).join('');
  if (node && node.props) return toPlainText(node.props.children);
  return '';
}

/**
 * 原站「Copy as Markdown」复制的是整页的结构化 Markdown（见
 * Git 提交 573dc6a 中的 original-clipboard.txt）。
 * 与原站逐段对应：Hero → 选择题 → Agent 提示 → When to use/NOT →
 * Anatomy → Variants → Typical use cases → Further reading。
 */
let htmlQuickCheckAnswer = null;
export function setHtmlQuickCheckAnswer(value) { htmlQuickCheckAnswer = value; }

export function getHtmlCopyMarkdown(english, name) {
  const hero = pick(HERO, english);
  const lesson = pick(LESSON, english);
  const usage = pick(USAGE, english);
  const anatomy = pick(ANATOMY, english);
  const variants = pick(VARIANTS, english);
  const scenes = pick(SCENES, english);
  const refs = pick(REFERENCES, english);
  const L = [];
  L.push(`# ${name}`);
  L.push('');
  L.push(`> **${hero.quoteLabel}**`);
  L.push(`> ${hero.quote}`);
  L.push('');
  L.push(`**${hero.summaryLead}**`);
  L.push('');
  L.push(hero.summary);
  L.push('');
  L.push(lesson.kicker);
  L.push('');
  L.push(lesson.hint);
  L.push('');
  L.push(`## ${lesson.question}`);
  L.push('');
  for (const opt of lesson.options) { L.push(toPlainText(opt.label)); L.push(''); }
  if (htmlQuickCheckAnswer !== null && lesson.options[htmlQuickCheckAnswer]) {
    const correctIndex = lesson.options.findIndex((option) => option.correct);
    const answeredLabel = htmlQuickCheckAnswer === correctIndex ? lesson.feedbackCorrect : lesson.feedbackWrong;
    L.push(`**${answeredLabel}**`);
    L.push('');
    L.push(toPlainText(lesson.options[htmlQuickCheckAnswer].feedback));
    L.push('');
  }
  L.push(`## ${lesson.agentTitle}`);
  L.push('');
  L.push(`> ${lesson.agentPrompt}`);
  L.push('');
  L.push(`## ${usage.useTitle}`);
  for (const item of usage.use) L.push(`- ${toPlainText(item.text)}`);
  L.push('');
  L.push(`## ${usage.dontTitle}`);
  for (const item of usage.dont) L.push(`- ${toPlainText(item.text)}`);
  L.push('');
  L.push(`## ${anatomy.title}`);
  L.push('');
  for (const [label, , detail] of anatomy.parts) {
    L.push(`### ${label}`);
    L.push('');
    L.push(detail);
    L.push('');
  }
  L.push(`## ${variants.title}`);
  L.push('');
  for (const item of variants.items) {
    L.push(`### ${item.name}`);
    L.push('');
    L.push(item.when);
    L.push('');
  }
  L.push(`## ${scenes.title}`);
  L.push('');
  for (const cap of scenes.caps) {
    L.push(`### ${cap}`);
    L.push('');
  }
  L.push(`## ${refs.title}`);
  L.push('');
  for (const item of refs.items) L.push(`- [${item.title}](${item.href}) — MDN`);
  return L.join('\n');
}

/* ------------------------------------------------------------------ 顶部栏 */

/** 原站 detail-topbar：面包屑 + 收藏 + Copy as Markdown */
export function HtmlDetailTopbar({ english, name, isFavorite, onToggleFavorite, copied, onCopy, backHref, onBack }) {
  const label = isFavorite ? (english ? 'Remove from favorites' : '取消收藏') : english ? 'Add to favorites' : '加入收藏';
  return (
    <div className="detail-topbar">
      <nav className="detail-breadcrumb" aria-label={english ? 'Breadcrumb' : '面包屑'}>
        <button
          type="button"
          className="detail-back-button"
          data-back="true"
          aria-label={english ? 'Back to all entries' : '返回全部词条'}
          title={english ? 'Back to all entries' : '返回全部词条'}
          onClick={() => {
            if (onBack) onBack();
            else window.location.assign(backHref);
          }}
        >
          <HtmlUiIcon d="M19 12H5m6-6-6 6 6 6" />
        </button>
        <button
          type="button"
          className="breadcrumb-link"
          data-back="true"
          onClick={() => {
            if (onBack) onBack();
            else window.location.assign(backHref);
          }}
        >
          {english ? 'All entries' : '术语图鉴'}
        </button>
        <span className="breadcrumb-separator" aria-hidden="true">
          ›
        </span>
        <span className="breadcrumb-current" aria-current="page">
          {name}
        </span>
      </nav>
      <div className="detail-topbar-actions">
        <button
          type="button"
          className={'favorite-button' + (isFavorite ? ' is-favorite' : '')}
          aria-label={label}
          aria-pressed={isFavorite}
          title={label}
          onClick={onToggleFavorite}
        >
          <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
            <path d={STAR_PATH} />
          </svg>
        </button>
        <button
          type="button"
          className="detail-copy-markdown"
          aria-label={english ? 'Copy as Markdown' : '复制为 Markdown'}
          data-locale={english ? 'en' : 'zh'}
          onClick={onCopy}
        >
          <span className="detail-copy-icon" aria-hidden="true">
            <svg className="ui-icon copy-icon-default" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="8" y="8" width="11" height="11" rx="2" />
              <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
            </svg>
            <svg className="ui-icon copy-icon-success" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d={CHECK_PATH} />
            </svg>
          </span>
          <span className="detail-copy-label" aria-hidden="true">
            <span className="copy-label-default">{english ? 'Copy as Markdown' : '复制为 Markdown'}</span>
            <span className="copy-label-success">{english ? 'Copied' : '已复制'}</span>
          </span>
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Hero */

/** 原站 section#detail-hero：标题 + 发音 + 你会说 + 摘要 + 演示 */
export function HtmlDetailHero({ english, name, pronunciation, demo }) {
  const copy = pick(HERO, english);
  return (
    <section className="detail-hero" id="detail-hero">
      <div className="dh-head">
        <h1>{name}</h1>
        {pronunciation}
      </div>
      <div className="dh-quote">
        <span className="dh-quote-label">{copy.quoteLabel}</span>
        <p className="dh-quote-text">{copy.quote}</p>
      </div>
      <div className="dh-tagline">
        <strong className="dh-summary-lead">{copy.summaryLead}</strong>
        <span className="dh-summary-separator" aria-hidden="true">
          ·
        </span>
        <span>{copy.summary}</span>
      </div>
      {copy.aliasItems && (
        <div className="alias-row" aria-label={copy.aliasLabel}>
          <span>{copy.aliasLabel}</span>
          {copy.aliasItems.map((item) => (
            <em key={item}>{item}</em>
          ))}
        </div>
      )}
      <div className="dh-demo responsive-detail-demo diagram-detail-demo" style={{ '--detail-demo-width': '400px' }}>
        <div className="dh-demo-viewport">
          <div className="dh-demo-inner">{demo}</div>
        </div>
      </div>
    </section>
  );
}

/** 原站 html-demo：左树 + 箭头 + 右渲染结果 */
export function HtmlHeroDemo({ english }) {
  const copy = pick(HERO, english);
  return (
    <div className="html-demo">
      <div className="html-tree">
        {copy.tree.map(([tag, em, cls], index) => (
          <span className={['html-node', cls].filter(Boolean).join(' ')} key={`${tag}-${index}`}>
            {tag}
            {em ? (
              <>
                {' '}
                <em>{em}</em>
              </>
            ) : null}
          </span>
        ))}
      </div>
      <span className="html-arrow">→</span>
      <div className="html-page">
        <b style={{ fontSize: '14px', color: 'var(--text)' }}>{copy.page.title}</b>
        <span style={{ fontSize: '12px', color: 'var(--text-2)' }}>{copy.page.text}</span>
        <span style={{ fontSize: '12px', color: 'var(--brand)', textDecoration: 'underline' }}>{copy.page.link}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 选择题 + Agent 提示 */

function HtmlQuickCheck({ english }) {
  const copy = pick(LESSON, english);
  const [answer, setAnswer] = useState(null);
  useEffect(() => () => setHtmlQuickCheckAnswer(null), []);
  const correctIndex = copy.options.findIndex((option) => option.correct);
  const answered = answer !== null;
  const isCorrect = answer === correctIndex;
  return (
    <section className="lesson-practice" aria-labelledby="lesson-practice-title">
      <div className="lesson-practice-heading">
        <span className="lesson-practice-kicker">{copy.kicker}</span>
        <span className="lesson-practice-hint">{copy.hint}</span>
      </div>
      <h2 id="lesson-practice-title">{copy.question}</h2>
      <div className="lesson-practice-options">
        {copy.options.map((option, index) => {
          const cls = ['lesson-practice-option'];
          if (answered && index === answer) cls.push(isCorrect ? 'is-correct' : 'is-incorrect');
          return (
            <label className={cls.join(' ')} key={option.label}>
              <input
                type="radio"
                name="lesson-practice-html"
                checked={answer === index}
                aria-describedby={answered ? 'lesson-practice-feedback' : undefined}
                onChange={() => { setAnswer(index); setHtmlQuickCheckAnswer(index); }}
              />
              <span className="lesson-practice-marker" aria-hidden="true">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="lesson-practice-label">{option.label}</span>
              {answered && index === answer && (
                <span className="lesson-practice-state" aria-hidden="true">
                  {isCorrect ? '✓' : '×'}
                </span>
              )}
            </label>
          );
        })}
      </div>
      {answered && (
        <div
          className={'lesson-practice-feedback ' + (isCorrect ? 'is-correct' : 'is-incorrect')}
          id="lesson-practice-feedback"
          role="status"
          aria-live="polite"
        >
          <span className="lesson-practice-feedback-icon" aria-hidden="true">
            {isCorrect ? '✓' : '!'}
          </span>
          <div>
            <strong>{isCorrect ? copy.feedbackCorrect : copy.feedbackWrong}</strong>
            <p>{copy.options[answer].feedback}</p>
          </div>
        </div>
      )}
    </section>
  );
}

function HtmlAgentPrompt({ english }) {
  const copy = pick(LESSON, english);
  return (
    <section className="lesson-agent-prompt" aria-labelledby="lesson-agent-title">
      <h2 id="lesson-agent-title">{copy.agentTitle}</h2>
      <blockquote>
        <span className="lesson-agent-quote" aria-hidden="true">
          “
        </span>
        <p>{copy.agentPrompt}</p>
      </blockquote>
    </section>
  );
}

/* ------------------------------------------------------------------ When to use / When NOT */

const MONO_STYLE = { fontFamily: MONO, fontSize: '12px', color: 'var(--text-2)' };

function HtmlUsageMock({ item }) {
  const note = item.note ? <span style={{ fontSize: '12px', color: 'var(--text-3)' }}>{item.note}</span> : null;
  switch (item.mock) {
    case 'report':
      return (
        <div className="mk ">
          <div className="mk-win">
            <span style={{ alignSelf: 'flex-start', fontSize: '15px', fontWeight: 700, color: 'var(--text)' }}>{item.title}</span>
            <span style={{ alignSelf: 'flex-start', fontSize: '12px', color: 'var(--text-2)', textAlign: 'left' }}>
              {item.lines[0]}
              <br />
              {item.lines[1]}
            </span>
            {note}
          </div>
        </div>
      );
    case 'url':
      return (
        <div className="mk ">
          <div className="mk-win">
            <span style={{ display: 'block', width: '100%', border: '1px solid var(--border)', borderRadius: '6px', padding: '5px 8px', fontSize: '12px', color: 'var(--text-2)', textAlign: 'left' }}>
              {item.url}
            </span>
            <div className="mk-row" style={{ width: '100%', justifyContent: 'space-between' }}>
              <b style={{ fontSize: '13px' }}>{item.b}</b>
              <span className="mk-tag blue">{item.tag}</span>
            </div>
            {note}
          </div>
        </div>
      );
    case 'native':
      return (
        <div className="mk ">
          <div className="mk-win">
            <div className="mk-row" style={{ width: '100%' }}>
              <span className="mk-tag gray">{item.tags[0]}</span>
              <span className="mk-tag gray">{item.tags[1]}</span>
              <span className="mk-tag blue">{item.tags[2]}</span>
            </div>
            {note}
          </div>
        </div>
      );
    case 'markdown':
      return (
        <div className="mk ">
          <div className="mk-row">
            <span style={MONO_STYLE}>
              {item.code.split('\n')[0]}
              <br />
              {item.code.split('\n')[1]}
            </span>
            <span style={{ color: 'var(--text-3)' }}>→</span>
            <span style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', padding: '7px 10px' }}>
              <b style={{ display: 'block', fontSize: '13px' }}>{item.b}</b>
              <span style={{ fontSize: '12px', color: 'var(--text-2)' }}>{item.sub}</span>
            </span>
          </div>
        </div>
      );
    case 'unclosed':
      return (
        <div className="mk bad">
          <div className="mk-win">
            <span style={MONO_STYLE}>
              {item.code}
              <br />
              <span style={{ marginLeft: '12px', color: 'var(--red)' }}>{item.inner}</span>
            </span>
            <span style={{ fontSize: '12px', color: 'var(--red)' }}>{item.note}</span>
          </div>
        </div>
      );
    case 'overlap':
      return (
        <div className="mk bad">
          <div className="mk-win">
            <span style={{ ...MONO_STYLE, color: 'var(--red)' }}>{item.code}</span>
            {note ? <span style={{ fontSize: '12px', color: 'var(--red)' }}>{item.note}</span> : null}
          </div>
        </div>
      );
    case 'head':
      return (
        <div className="mk bad">
          <div className="mk-win">
            <span style={{ display: 'block', width: '100%', textAlign: 'left', border: '1px solid var(--red)', borderRadius: '5px', padding: '3px 7px', fontSize: '12px', color: 'var(--red)' }}>
              {item.pill}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--red)' }}>{item.note}</span>
          </div>
        </div>
      );
    case 'docx':
      return (
        <div className="mk bad">
          <div className="mk-win">
            <div className="mk-row" style={{ width: '100%' }}>
              <span style={{ width: '22px', height: '26px', border: '1px solid var(--red)', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: 'var(--red)' }}>
                {item.badge}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-2)' }}>{item.label}</span>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--red)' }}>{item.note}</span>
          </div>
        </div>
      );
    default:
      return null;
  }
}

function HtmlUsage({ english }) {
  const copy = pick(USAGE, english);
  const render = (items, bad) =>
    items.map((item, index) => (
      <li className="has-usage-mock" key={`${item.mock}-${index}`}>
        <div className="usage-text">{item.text}</div>
        <HtmlUsageMock item={item} bad={bad} />
      </li>
    ));
  return (
    <div className="usage-grid">
      <div className="usage-box use">
        <h3>
          <span className="mark">
            <HtmlUiIcon d={CHECK_PATH} />
          </span>
          {copy.useTitle}
        </h3>
        <ul>{render(copy.use, false)}</ul>
      </div>
      <div className="usage-box dont">
        <h3>
          <span className="mark">
            <HtmlUiIcon d={CROSS_PATH} />
          </span>
          {copy.dontTitle}
        </h3>
        <ul>{render(copy.dont, true)}</ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Anatomy */

const PUNC = ({ children }) => <span className="html-punc">{children}</span>;

function HtmlAnatomy({ english }) {
  const copy = pick(ANATOMY, english);
  const [active, setActive] = useState(null);
  const cls = (key) => 'anat-part' + (active === key ? ' is-anat-locked is-anat-active' : '');
  const AP_CLASS = { open: 'html-tagname', attr: 'html-attr', content: 'html-content', close: 'html-tagname' };
  const apCls = (dataKey) => `ap ${AP_CLASS[dataKey]}${active === dataKey ? ' is-anat-active' : ''}`;
  const apProps = (key, callout) => ({
    'data-ap': key,
    ...(active === key ? { 'data-callout': callout } : {}),
  });
  return (
    <section>
      <div className="section-title">{copy.title}</div>
      <div className="anat-wrap">
        <div className="anat-stage">
          <div className="html-anat">
            <PUNC>&lt;</PUNC>
            <span className={apCls('open')} {...apProps('open', 1)}>
              a
            </span>
            <span className={apCls('attr')} {...apProps('attr', 2)}>
              {copy.attribute}
            </span>
            <PUNC>&gt;</PUNC>
            <span className={apCls('content')} {...apProps('content', 3)}>
              {copy.content}
            </span>
            <PUNC>&lt;/</PUNC>
            <span className={apCls('close')} {...apProps('close', 4)}>
              a
            </span>
            <PUNC>&gt;</PUNC>
          </div>
        </div>
        <div className="anat-parts">
          {copy.parts.map(([label, alt, detail], index) => {
            const key = ['open', 'attr', 'content', 'close'][index];
            return (
              <div className={cls(key)} data-ap={key} key={key}>
                <button
                  className="anat-part-trigger"
                  type="button"
                  aria-pressed={active === key}
                  onClick={() => setActive((current) => (current === key ? null : key))}
                >
                  <span className="idx">{index + 1}</span>
                  <span className="pn">{label}</span>
                  {alt ? <span className="pe">{alt}</span> : null}
                </button>
                <span className="pd">{detail}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Variants */

function HtmlVariants({ english }) {
  const copy = pick(VARIANTS, english);
  return (
    <section>
      <div className="section-title">{copy.title}</div>
      <div className="variant-grid">
        {copy.items.map((item) => (
          <div className="variant-card" key={item.name}>
            <div className="variant-name">
              {item.name}
              {item.alt ? <span>{item.alt}</span> : null}
            </div>
            <div className="variant-demo">
              <span style={{ fontFamily: MONO, fontSize: '12px', color: 'var(--code-keyword)' }}>{item.demo}</span>
            </div>
            <div className="variant-when">{item.when}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Typical use cases */

function CodeLine({ parts, text, end }) {
  return (
    <span>
      <span className="terminal-d">{parts[0]}</span>
      <span style={{ color: '#c792ea' }}>{parts[1]}</span>
      <span className="terminal-d">{parts[2]}</span>
      {text}
      <span className="terminal-d">{end[0]}</span>
      <span style={{ color: '#c792ea' }}>{end[1]}</span>
      <span className="terminal-d">{end[2]}</span>
    </span>
  );
}

function HtmlSceneBody({ kind, english }) {
  const copy = pick(SCENES, english);
  if (kind === 0) {
    const third = copy.codeThird;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ alignSelf: 'flex-end', maxWidth: '70%', background: 'var(--brand)', color: 'var(--on-brand)', borderRadius: '12px 12px 4px 12px', padding: '8px 12px', fontSize: '12px' }}>
          {copy.chat.ask}
        </div>
        <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '10px 12px' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-2)', marginBottom: '6px' }}>{copy.chat.reply}</div>
          <div className="terminal-win">
            <div className="terminal-body">
              {copy.code.map((line, index) => (line ? <CodeLine key={index} parts={line[0]} text={line[1]} end={line[2]} /> : null))}
              <span>
                <span className="terminal-d">{third.open[0]}</span>
                <span style={{ color: '#c792ea' }}>{third.open[1]}</span>{' '}
                <span className="terminal-a">{third.attr}</span>=<span className="terminal-g">{third.value}</span>
                <span className="terminal-d">{third.close}</span>
                {third.text}
                <span className="terminal-d">{third.end[0]}</span>
                <span style={{ color: '#c792ea' }}>{third.end[1]}</span>
                <span className="terminal-d">{third.end[2]}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (kind === 1) {
    return (
      <div style={{ maxWidth: '420px', margin: '0 auto', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{ padding: '6px 12px', borderBottom: '1px solid var(--border-light)', fontSize: '12px', color: 'var(--text-3)', fontFamily: MONO }}>{copy.source.url}</div>
        <div style={{ padding: '10px 12px', fontFamily: MONO, fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.8 }}>
          <span style={{ color: 'var(--text-3)' }}>1</span> <span style={{ color: 'var(--code-keyword)' }}>&lt;h1&gt;</span>
          {copy.source.lines[0]}
          <span style={{ color: 'var(--code-keyword)' }}>&lt;/h1&gt;</span>
          <br />
          <span style={{ color: 'var(--text-3)' }}>2</span> <span style={{ color: 'var(--code-keyword)' }}>&lt;p&gt;</span>
          {copy.source.lines[1]}
          <span style={{ color: 'var(--code-keyword)' }}>&lt;/p&gt;</span>
          <br />
          <span style={{ color: 'var(--text-3)' }}>3</span> <span style={{ color: 'var(--code-keyword)' }}>&lt;a</span>{' '}
          <span style={{ color: 'var(--warning)' }}>href="/photos"</span>
          <span style={{ color: 'var(--code-keyword)' }}>&gt;</span>
          {copy.source.link}
          <span style={{ color: 'var(--code-keyword)' }}>&lt;/a&gt;</span>
        </div>
      </div>
    );
  }
  if (kind === 2) {
    return (
      <div style={{ maxWidth: '420px', margin: '0 auto', display: 'flex', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden', background: 'var(--bg)' }}>
        <div style={{ flex: 1, padding: '12px 14px', borderRight: '1px solid var(--border-light)' }}>
          <b style={{ fontSize: '14px' }}>{copy.devtools.title}</b>
          <div style={{ fontSize: '12px', color: 'var(--text-2)', marginTop: '4px', outline: '2px solid var(--brand)', borderRadius: '3px', padding: '1px 3px' }}>
            {copy.devtools.text}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--brand)', textDecoration: 'underline', marginTop: '4px' }}>{copy.devtools.link}</div>
        </div>
        <div style={{ flex: 1, padding: '10px 12px', fontFamily: MONO, fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.8, background: 'var(--bg-soft)' }}>
          <span style={{ color: 'var(--code-keyword)' }}>&lt;h1&gt;</span>…<span style={{ color: 'var(--code-keyword)' }}>&lt;/h1&gt;</span>
          <br />
          <span style={{ background: 'var(--brand-light)', borderRadius: '3px', padding: '0 3px' }}>
            <span style={{ color: 'var(--code-keyword)' }}>&lt;p&gt;</span>…<span style={{ color: 'var(--code-keyword)' }}>&lt;/p&gt;</span>
          </span>
          <br />
          <span style={{ color: 'var(--code-keyword)' }}>&lt;a&gt;</span>…<span style={{ color: 'var(--code-keyword)' }}>&lt;/a&gt;</span>
        </div>
      </div>
    );
  }
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
      <div style={{ padding: '8px 14px', borderBottom: '1px solid var(--border-light)', fontSize: '12px', fontWeight: 600 }}>{copy.cheatsheet.title}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border-light)' }}>
        {copy.cheatsheet.rows.map(([tag, label]) => (
          <div style={{ background: 'var(--bg)', padding: '7px 12px', fontSize: '12px' }} key={tag}>
            <b style={{ fontFamily: MONO, color: 'var(--code-keyword)' }}>{tag}</b> <span style={{ color: 'var(--text-3)' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HtmlScenes({ english }) {
  const copy = pick(SCENES, english);
  return (
    <section className="scenes">
      <div className="section-title">{copy.title}</div>
      <div className="scene-list">
        {copy.caps.map((cap, index) => (
          <div className="scene-item" key={cap}>
            <div className="scene-cap">{cap}</div>
            <div className="scene-shot is-plain">
              <div className="sc-body">
                <div className="sc-body-inner">
                  <HtmlSceneBody kind={index} english={english} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Further reading */

function HtmlReferences({ english }) {
  const copy = pick(REFERENCES, english);
  return (
    <section className="references-section">
      <div className="section-title">{copy.title}</div>
      <div className="reference-list">
        {copy.items.map((item) => (
          <a className="reference-link" href={item.href} target="_blank" rel="noopener noreferrer" key={item.href}>
            <span className="reference-title">{item.title}</span>
            <span className="reference-source">MDN ↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 组合 */

/** /en/html 与 /html 详情正文：与原站 div.detail-body.detail-entry-html 内的顺序一致 */
export function HtmlDetailSections({ english, selector }) {
  return (
    <>
      <div className="lesson-extras">
        <HtmlQuickCheck english={english} />
        <HtmlAgentPrompt english={english} />
      </div>
      <HtmlUsage english={english} />
      <HtmlAnatomy english={english} />
      <HtmlVariants english={english} />
      <HtmlScenes english={english} />
      {selector}
      <HtmlReferences english={english} />
    </>
  );
}
