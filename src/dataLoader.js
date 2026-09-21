/**
 * 大数据文件的按需加载器。
 *
 * 背景：termAnatomy / referenceDetails 这类纯数据文件体积大（289KB / 947KB），
 * 但只在进入详情页时才需要。静态 import 会把它们全部塞进主包，拖慢首屏。
 *
 * 做法：动态 import + 模块级缓存，保证：
 *   1. 同一份数据只请求一次（缓存 Promise，避免并发重复请求）
 *   2. 首次进入详情页时预加载，用户滚动到对应区块通常已就绪
 */

let anatomyModule = null;
let anatomyPromise = null;

/** 加载 termAnatomy（术语组成结构数据） */
export const loadAnatomy = () => {
  if (anatomyModule) return Promise.resolve(anatomyModule);
  if (!anatomyPromise) {
    anatomyPromise = import('./termAnatomy.js')
      .then((mod) => {
        anatomyModule = mod;
        return mod;
      })
      .catch((error) => {
        // 加载失败不阻断页面：清掉 Promise 以便下次重试
        anatomyPromise = null;
        throw error;
      });
  }
  return anatomyPromise;
};

/** 取某术语的 anatomy parts；未加载完时返回空数组（调用方应保留 fallback） */
export const getAnatomyParts = (id) => {
  if (!anatomyModule) return [];
  return anatomyModule.anatomyFor(id)?.parts || [];
};

/** 供外部判断是否已就绪 */
export const isAnatomyReady = () => Boolean(anatomyModule);

let detailsModule = null;
let detailsPromise = null;

/**
 * 加载 termDetails（详情页专属字段：tagline / prompt / options / demoText 等，约 867KB）。
 * 卡片（TermCard）只需要 title + quote，那部分在静态的 termBasics 里，不受此影响。
 */
export const loadTermDetails = () => {
  if (detailsModule) return Promise.resolve(detailsModule);
  if (!detailsPromise) {
    detailsPromise = import('./termDetails.js')
      .then((mod) => {
        detailsModule = mod;
        return mod;
      })
      .catch((error) => {
        detailsPromise = null;
        throw error;
      });
  }
  return detailsPromise;
};

/** 已加载则返回 termDetails 数据，否则 null */
export const getTermDetails = () => detailsModule?.termDetails || null;

export const isTermDetailsReady = () => Boolean(detailsModule);
