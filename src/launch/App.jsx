import { Component, useEffect, useMemo, useState } from 'react';
import { guides, findGuide } from './content.js';
import './styles.css';

const FAVORITES_KEY = 'qizhan:favorites';
const COMPLETED_KEY = 'qizhan:completed';

// 浏览器禁用本地存储（Safari 无痕、企业策略、隐私插件）时 localStorage 访问会直接抛错。
// 读取与写入都必须兜底，否则应用在挂载阶段就会白屏。
function readList(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function writeList(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* 存储不可用时降级为「仅当前会话有效」，不影响页面使用 */
  }
}

function useStoredList(key) {
  const [value, setValue] = useState(() => readList(key));
  useEffect(() => { writeList(key, value); }, [key, value]);
  return [value, setValue];
}

function routeFromLocation() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const match = path.match(/^\/guide\/([^/]+)$/);
  if (match) return { name: 'guide', id: match[1] };
  if (path === '/practice') return { name: 'practice' };
  if (path === '/favorites') return { name: 'favorites' };
  if (path === '/') return { name: 'home' };
  return { name: 'not-found' };
}

function useRoute() {
  const [route, setRoute] = useState(routeFromLocation);
  useEffect(() => {
    const update = () => setRoute(routeFromLocation());
    addEventListener('popstate', update);
    return () => removeEventListener('popstate', update);
  }, []);
  return route;
}

function go(path) {
  history.pushState({}, '', path);
  dispatchEvent(new PopStateEvent('popstate'));
  scrollTo({ top: 0, behavior: 'smooth' });
}

function Link({ href, children, className = '', ...props }) {
  return <a href={href} className={className} onClick={(event) => {
    if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      event.preventDefault();
      go(href);
    }
  }} {...props}>{children}</a>;
}

function Logo() {
  return <span className="logo-mark" aria-hidden="true"><i/><b/></span>;
}

function Icon({ name }) {
  const common = { viewBox: '0 0 24 24', 'aria-hidden': true };
  const paths = {
    code: <><path d="m8 7-5 5 5 5"/><path d="m16 7 5 5-5 5"/><path d="m14 4-4 16"/></>,
    paint: <><path d="M4 5h10a3 3 0 0 1 0 6H8a2 2 0 0 0-2 2v6"/><path d="M6 19v2"/><path d="M16 8h4v9a2 2 0 0 1-2 2h-3"/></>,
    device: <><rect x="3" y="5" width="18" height="13" rx="2"/><path d="M8 21h8M12 18v3"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
    cloud: <path d="M7 18h11a4 4 0 0 0 .3-8A6.5 6.5 0 0 0 6 8.6 4.7 4.7 0 0 0 7 18Z"/>,
    branch: <><circle cx="6" cy="5" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="8" r="2"/><path d="M6 7v10M8 7c3 0 3 1 3 4s2 4 5 4M11 11c0-2 2-3 5-3"/></>,
    person: <><circle cx="12" cy="5" r="2"/><path d="M5 9h14M12 7v13M8 20l4-6 4 6"/></>,
    form: <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h4"/></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function Header({ route }) {
  const items = [
    ['/', '入门指南', route.name === 'home' || route.name === 'guide'],
    ['/practice', '练习', route.name === 'practice'],
    ['/favorites', '我的收藏', route.name === 'favorites'],
  ];
  return <header className="site-header"><div className="shell header-inner">
    <Link href="/" className="brand" aria-label="起站首页"><Logo/><span>起站</span></Link>
    <nav aria-label="主要导航">{items.map(([href, label, active]) => <Link key={href} href={href} className={active ? 'active' : ''} aria-current={active ? 'page' : undefined}>{label}</Link>)}</nav>
  </div></header>;
}

function FavoriteButton({ guide, favorites, setFavorites }) {
  const active = favorites.includes(guide.id);
  return <button className={`favorite-button ${active ? 'active' : ''}`} type="button" aria-label={`${active ? '取消收藏' : '收藏'} ${guide.title}`} aria-pressed={active} onClick={(event) => {
    event.preventDefault();
    event.stopPropagation();
    setFavorites(active ? favorites.filter((id) => id !== guide.id) : [...favorites, guide.id]);
  }}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3.7 2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8L12 3.7Z"/></svg></button>;
}

function GuideRow({ guide, favorites, setFavorites, completed }) {
  return <article className="guide-row">
    <Link href={`/guide/${guide.id}`} className="guide-row-main">
      <span className="guide-icon"><Icon name={guide.icon}/></span>
      <span className="guide-copy"><strong>{guide.title}</strong><span>{guide.summary}</span></span>
      <span className={`completed-mark ${completed.includes(guide.id) ? '' : 'is-placeholder'}`}>{completed.includes(guide.id) ? '已学' : ''}</span>
    </Link>
    <FavoriteButton guide={guide} favorites={favorites} setFavorites={setFavorites}/>
    <Link href={`/guide/${guide.id}`} className="row-arrow" aria-label="打开概念详情">→</Link>
  </article>;
}

function Progress({ completed }) {
  const count = completed.length;
  return <section className="progress-strip" aria-label="学习进度">
    <strong>学习进度 <span>（本地保存）</span></strong>
    <div className="progress-track"><i style={{ width: `${count / guides.length * 100}%` }}/></div>
    <b>{count} / {guides.length} 已完成</b>
    <p>循序渐进，把知识变成可以动手做的网页。</p>
  </section>;
}

function Home({ favorites, setFavorites, completed }) {
  return <main>
    <section className="hero shell"><div className="hero-copy">
      <h1>看懂 AI 建站的<span>关键一步</span></h1>
      <p>用简短解释、可操作示例和小练习，把陌生术语变成真正能用的能力。</p>
      <div className="hero-actions"><Link className="primary-action" href="/guide/html">开始学习 <span>→</span></Link><Link className="secondary-action" href="/practice">做个小练习</Link></div>
    </div><div className="hero-art"><img src="/qizhan-hero.png" width="1448" height="1086" fetchpriority="high" decoding="async" alt="学习者沿着台阶走向一个可以操作的网页"/></div></section>
    <div className="shell"><Progress completed={completed}/></div>
    <section className="guide-section shell"><div className="section-heading"><div><h2>从这 8 个关键概念开始</h2><p>每个概念都能在真实建站过程中派上用场。</p></div><span>{completed.length ? `已经完成 ${completed.length} 个` : '建议按顺序学习'}</span></div>
      <div className="guide-grid">{guides.map((guide) => <GuideRow key={guide.id} guide={guide} favorites={favorites} setFavorites={setFavorites} completed={completed}/>)}</div>
    </section>
  </main>;
}

function Favorites({ favorites, setFavorites, completed }) {
  const saved = guides.filter((guide) => favorites.includes(guide.id));
  return <main className="inner-page shell"><header className="page-heading"><p>只保存在当前浏览器</p><h1>我的收藏</h1><div>把准备回看的概念放在这里，不需要登录。</div></header>
    {saved.length ? <div className="guide-grid favorites-grid">{saved.map((guide) => <GuideRow key={guide.id} guide={guide} favorites={favorites} setFavorites={setFavorites} completed={completed}/>)}</div> : <section className="empty-state"><h2>还没有收藏</h2><p>在概念列表中点击星标，稍后可以从这里继续学习。</p><Link className="primary-action" href="/">浏览入门指南 →</Link></section>}
  </main>;
}

function Check({ guide, completed, setCompleted }) {
  const [choice, setChoice] = useState(null);
  const answered = choice !== null;
  const correct = choice === guide.answer;
  useEffect(() => setChoice(null), [guide.id]);
  return <section className="knowledge-check"><h2>现在检查一下</h2><p>{guide.question}</p><div className="answer-list">{guide.options.map((option, index) => <button key={option} type="button" className={answered && index === guide.answer ? 'correct' : answered && index === choice ? 'wrong' : ''} disabled={answered} onClick={() => {
    setChoice(index);
    if (index === guide.answer && !completed.includes(guide.id)) setCompleted([...completed, guide.id]);
  }}><span>{String.fromCharCode(65 + index)}</span>{option}</button>)}</div>
    {answered && <div className={`answer-feedback ${correct ? 'success' : 'retry'}`} role="status"><strong>{correct ? '答对了，这一节已完成。' : '这次还差一步。'}</strong><p>{guide.feedback}</p>{!correct && <button type="button" onClick={() => setChoice(null)}>重新选择</button>}</div>}
  </section>;
}

function GuideDetail({ guide, favorites, setFavorites, completed, setCompleted }) {
  if (!guide || !Array.isArray(guide.steps) || !Array.isArray(guide.options)) return <NotFound/>;
  const next = guides.find((item) => item.order === guide.order + 1);
  return <main className="detail-page shell"><div className="detail-top"><Link href="/" className="back-link">← 返回入门指南</Link><FavoriteButton guide={guide} favorites={favorites} setFavorites={setFavorites}/></div>
    <article className="detail-article"><header><span className="detail-number">{String(guide.order).padStart(2, '0')}</span><div className="detail-icon"><Icon name={guide.icon}/></div><h1>{guide.title}</h1><p>{guide.intro}</p></header>
      <section><h2>为什么你需要知道它</h2><p>{guide.why}</p></section>
      <section><h2>动手时按这三步</h2><ol>{guide.steps.map((step) => <li key={step}>{step}</li>)}</ol></section>
      <section><h2>看一个最小例子</h2><pre><code>{guide.example}</code></pre></section>
      <Check guide={guide} completed={completed} setCompleted={setCompleted}/>
      <nav className="detail-next">{next ? <Link href={`/guide/${next.id}`}><span>下一节</span><strong>{next.title} →</strong></Link> : <Link href="/practice"><span>八节完成后</span><strong>进入综合练习 →</strong></Link>}</nav>
    </article>
  </main>;
}

function Practice({ completed, setCompleted }) {
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState(null);
  const guide = guides[index];
  const correct = choice === guide.answer;
  const finish = index === guides.length - 1;
  return <main className="practice-page shell"><header className="page-heading"><p>8 个真实情境题</p><h1>小练习</h1><div>答题记录保存在当前浏览器。做错可以立即重试。</div></header>
    <section className="practice-card"><div className="practice-progress"><span>第 {index + 1} 题 / 共 {guides.length} 题</span><i><b style={{ width: `${(index + 1) / guides.length * 100}%` }}/></i></div><span className="practice-topic">{guide.title}</span><h2>{guide.question}</h2><div className="answer-list">{guide.options.map((option, optionIndex) => <button key={option} type="button" className={choice !== null && optionIndex === guide.answer ? 'correct' : choice !== null && optionIndex === choice ? 'wrong' : ''} disabled={choice !== null} onClick={() => {
      setChoice(optionIndex);
      if (optionIndex === guide.answer && !completed.includes(guide.id)) setCompleted([...completed, guide.id]);
    }}><span>{String.fromCharCode(65 + optionIndex)}</span>{option}</button>)}</div>{choice !== null && <div className={`answer-feedback ${correct ? 'success' : 'retry'}`}><strong>{correct ? '回答正确' : '再想一想'}</strong><p>{guide.feedback}</p>{correct ? <button type="button" onClick={() => { if (finish) go('/'); else { setIndex(index + 1); setChoice(null); } }}>{finish ? '回到入门指南' : '下一题 →'}</button> : <button type="button" onClick={() => setChoice(null)}>重新选择</button>}</div>}</section>
  </main>;
}

function NotFound() {
  return <main className="inner-page shell"><section className="empty-state"><h1>这个页面还没有准备好</h1><p>回到入门指南，从一个可以完成的小概念开始。</p><Link className="primary-action" href="/">返回首页 →</Link></section></main>;
}

// 兜底错误边界：任何未预料的渲染异常都应显示可操作的提示页，
// 而不是留下整页空白（此前 /guide/<未知 id> 会直接白屏）。
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error, info) {
    console.error('[qizhan] render error', error, info?.componentStack);
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return <main className="inner-page shell"><section className="empty-state"><h1>页面加载出错了</h1><p>刷新页面即可重试。如果问题持续出现，可以回到入门指南继续学习。</p><a className="primary-action" href="/">返回首页 →</a></section></main>;
  }
}

function Footer() {
  return <footer className="site-footer"><div className="shell"><span><Logo/><strong>起站</strong> · AI 建站入门试用版</span><p>进度与收藏只保存在你的浏览器中。</p></div></footer>;
}

export default function App() {
  const route = useRoute();
  const [favorites, setFavorites] = useStoredList(FAVORITES_KEY);
  const [completed, setCompleted] = useStoredList(COMPLETED_KEY);
  useEffect(() => {
    const title = route.name === 'guide' ? `${findGuide(route.id)?.title || '概念'}｜起站` : route.name === 'practice' ? '小练习｜起站' : route.name === 'favorites' ? '我的收藏｜起站' : '起站｜AI 建站入门';
    document.title = title;
  }, [route]);
  const content = useMemo(() => {
    if (route.name === 'home') return <Home favorites={favorites} setFavorites={setFavorites} completed={completed}/>;
    if (route.name === 'favorites') return <Favorites favorites={favorites} setFavorites={setFavorites} completed={completed}/>;
    if (route.name === 'guide') return <GuideDetail guide={findGuide(route.id)} favorites={favorites} setFavorites={setFavorites} completed={completed} setCompleted={setCompleted}/>;
    if (route.name === 'practice') return <Practice completed={completed} setCompleted={setCompleted}/>;
    return <NotFound/>;
  }, [route, favorites, completed]);
  return <div className="app"><Header route={route}/><ErrorBoundary>{content}</ErrorBoundary><Footer/></div>;
}
