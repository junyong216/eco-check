import { MetadataRoute } from 'next';

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://your-domain.com'; // 👈 실제 도메인 주소로 꼭 바꾸세요!

  // 나중에 뉴스나 사전 데이터가 많아지면 여기서 API로 가져와서 동적으로 생성할 수도 있습니다.
  const routes = [
    '',
    '/news',
    '/stock',
    '/dictionary',
    '/recommend',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const, // 뉴스/증권이 있으니 매일 확인하도록 유도
    priority: route === '' ? 1 : 0.8, // 홈은 우선순위 1, 나머지는 0.8
  }));

  return routes;
}