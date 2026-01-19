import type { NextConfig } from "next";
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  // 정적 내보내기(export) 환경에서 불필요하거나 충돌나는 파일 제외
  buildExcludes: [/middleware-manifest\.json$/, /_next\/static\/.*\.map$/],
});

const nextConfig: NextConfig = {
  // 1. Capacitor 앱 배포를 위한 정적 추출 (out 폴더 생성)
  output: "export",
  
  // 2. 하이브리드 앱 내 경로 인식을 위한 설정
  // 모든 경로 끝에 /를 붙여 index.html 구조를 명확히 함
  trailingSlash: true, 

  // 3. 이미지 최적화 비활성화 (정적 추출 시 필수)
  images: {
    unoptimized: true,
  },

  reactStrictMode: false,

  // 4. Webpack 엔진 유지 (PWA 호환성)
  webpack: (config: any) => {
    return config;
  },
};

export default withPWA(nextConfig);