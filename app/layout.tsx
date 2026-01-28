import "./globals.css";
import { Noto_Sans_KR } from "next/font/google";
import { Metadata, Viewport } from "next";
import Navbar from "@/components/Navbar";
import Script from "next/script";

// 1. variable 설정을 추가하여 CSS와 연동을 강화합니다.
const notoSanKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans-kr", // CSS 변수 선언
});

export const metadata: Metadata = {
  title: {
    default: "BULL'S EYE - 스마트 경제 지표 & 투자 가이드",
    template: "%s | BULL'S EYE",
  },
  description: "실시간 금융 지표, 경제 뉴스, 주식 용어사전 및 투자 가이드를 제공합니다. 성공 투자의 과녁을 명중시키세요.",
  keywords: ["경제지표", "실시간환율", "주식뉴스", "금리전망", "재무제표공부", "부동산전망"],
  manifest: "/manifest.json",
  metadataBase: new URL('https://bullseye-check.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "BULL'S EYE - 스마트 경제 데이터 허브",
    description: "투자자를 위한 실시간 경제 지표와 쉬운 용어사전",
    url: "https://bullseye-check.vercel.app",
    siteName: "BULL'S EYE",
    locale: "ko_KR",
    type: "website",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "BULL'S EYE 메인 미리보기" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BULL'S EYE - 스마트 경제 데이터 허브",
    description: "차트를 꿰뚫는 황소의 통찰력",
    images: ["/opengraph-image.png"],
  },
  verification: {
    google: "l-yo6JfY6p6TB-5Hg2rN9VjGa8oU6LehgDM3caKaycY",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // PWA에서 입력창 포커스 시 화면 확대 방지 (앱 느낌 강조)
  userScalable: false,
  themeColor: "#dc2626",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning className={notoSanKR.variable}>
      <head>
        {/* 2. 구글 애드센스 승인 코드 삽입 */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3737116795159579"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={notoSanKR.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
        </div>

        {/* 서비스 워커 스크립트 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(reg) {
                    console.log('Service Worker registered');
                  }).catch(function(err) {
                    console.log('Service Worker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}