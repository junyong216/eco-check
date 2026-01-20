import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // 혹시 숨겨야 할 관리자 페이지 등이 있다면 추가
    },
    sitemap: 'https://your-domain.com/sitemap.xml', // 👈 본인 도메인으로 수정!
  };
}