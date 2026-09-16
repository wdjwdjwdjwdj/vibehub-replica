const env = import.meta.env;
const independent = env.VITE_SITE_INDEPENDENT === 'true';
const siteName = env.VITE_SITE_NAME || 'VibeHub';

export const SITE = {
  name: siteName,
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
    x: env.VITE_SITE_X || (independent ? '' : 'https://x.com/I_am_oil_oil'),
    xiaohongshu: env.VITE_SITE_XIAOHONGSHU || (independent ? '' : 'https://www.xiaohongshu.com/user/profile/5f4dfecb000000000100571d'),
    email: env.VITE_SITE_EMAIL || (independent ? '' : 'mailto:zhihuang.oiloil@gmail.com'),
    contribution: env.VITE_SITE_CONTRIBUTION_URL || (independent ? '' : 'https://my.feishu.cn/share/base/shrcnxcYfvOPpNtF0c1Vv3oBXGb'),
  },
};
