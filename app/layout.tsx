import "./globals.css";
import { Noto_Sans_KR } from "next/font/google"; // 한글 전용 폰트로 교체 제안
import { Metadata, Viewport } from "next"; // Viewport 분리 (Next.js 14+ 권장)
import Navbar from "@/components/Navbar";

// 한글의 굵기(Black, Bold)를 가장 잘 표현하는 폰트 설정
const notoSanKR = Noto_Sans_KR({ 
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"], // font-medium, bold, black을 위해 수치 지정
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
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "BULL'S EYE 메인 미리보기",
      },
    ],
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

// Next.js 최신 버전에서는 viewport를 metadata와 분리하는 것을 권장합니다.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#dc2626", // 서비스의 포인트 컬러인 레드(Red-600) 적용
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={notoSanKR.className}>
        {/* Navbar를 감싸는 최소한의 wrapper 추가 (선택사항이나 구조상 안정적임) */}
        <div className="flex flex-col min-h-screen">
          <Navbar /> 
          <main className="flex-grow">
            {children}
          </main>
        </div>

        {/* 서비스 워커 등록 스크립트 */}
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