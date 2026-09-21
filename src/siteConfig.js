const env = import.meta.env;
const independent = env.VITE_SITE_INDEPENDENT === 'true';
const siteName = env.VITE_SITE_NAME || 'VibeHub';

// 品牌字标：原站 Header 为 `Vibe` + 强调的 `Hub` 两段，hover 时切换到 tagline。
// 品牌名未确认前保持原站基线；独立品牌可通过环境变量覆盖。
const vibeBrand = /^Vibe(.+)$/.exec(siteName);

export const SITE = {
  name: siteName,
  brandLead: env.VITE_SITE_BRAND_LEAD || (vibeBrand ? 'Vibe' : siteName),
  brandTail: env.VITE_SITE_BRAND_TAIL || (vibeBrand ? vibeBrand[1] : ''),
  tagline: env.VITE_SITE_TAGLINE_ZH || 'Vibe Coding 术语图鉴',
  taglineEn: env.VITE_SITE_TAGLINE_EN || 'Your Vibe Coding Guide',
  descriptor: env.VITE_SITE_DESCRIPTOR || 'Vibe Coding Terms',
  description: env.VITE_SITE_DESCRIPTION || `${siteName} — a visual guide to Vibe Coding terms, practice, and working interface examples.`,
  logoPath: env.VITE_SITE_LOGO || '/assets/vh-logo.png',
  faviconPath: env.VITE_SITE_FAVICON || '/assets/vh-logo.png',
  independent,
  footer: {
    wordmark: env.VITE_SITE_FOOTER_WORDMARK || (independent ? siteName : 'oil'),
    partner: {
      name: env.VITE_SITE_PARTNER_NAME || (independent ? '' : 'oil 欧呦'),
      headerName: env.VITE_SITE_PARTNER_HEADER_NAME || (independent ? (env.VITE_SITE_PARTNER_NAME || siteName) : 'Oil'),
      url: env.VITE_SITE_PARTNER_URL || (independent ? '' : 'https://oiloil.org/'),
      logoPath: env.VITE_SITE_PARTNER_LOGO || (independent ? '' : '/assets/oil-favicon.png'),
    },
    github: env.VITE_SITE_GITHUB || (independent ? '' : 'https://github.com/oil-oil'),
    githubLabel: env.VITE_SITE_GITHUB_LABEL || (independent ? '' : '@oil-oil'),
    x: env.VITE_SITE_X || (independent ? '' : 'https://x.com/I_am_oil_oil'),
    xiaohongshu: env.VITE_SITE_XIAOHONGSHU || (independent ? '' : 'https://www.xiaohongshu.com/user/profile/5f4dfecb000000000100571d'),
    // 原站 Footer 的小红书条目在中英双语下名称与说明文案不同
    xiaohongshuName: env.VITE_SITE_XIAOHONGSHU_NAME_ZH || (independent ? '' : '小红书'),
    xiaohongshuNameEn: env.VITE_SITE_XIAOHONGSHU_NAME_EN || (independent ? '' : 'Xiaohongshu'),
    xiaohongshuDetail: env.VITE_SITE_XIAOHONGSHU_DETAIL_ZH || (independent ? '' : 'oil 的小红书主页'),
    xiaohongshuDetailEn: env.VITE_SITE_XIAOHONGSHU_DETAIL_EN || (independent ? '' : 'oil on Xiaohongshu'),
    email: env.VITE_SITE_EMAIL || (independent ? '' : 'mailto:zhihuang.oiloil@gmail.com'),
    contribution: env.VITE_SITE_CONTRIBUTION_URL || (independent ? '' : 'https://my.feishu.cn/share/base/shrcnxcYfvOPpNtF0c1Vv3oBXGb'),
  },
};
