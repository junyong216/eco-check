"use client";

import { useEffect } from "react";
import { App } from "@capacitor/app";
import Link from "next/link";
import "./globals.css";

function AppHandler() {
  useEffect(() => {
    const init = async () => {
      await App.addListener('backButton', ({ canGoBack }) => {
        if (canGoBack) {
          window.history.back();
        } else {
          App.exitApp();
        }
      });
    };
    init();
    return () => { App.removeAllListeners(); };
  }, []);
  return null;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <title>불스아이 (BULL'S EYE) - 경제의 정곡을 찌르다</title>
        <meta name="description" content="실시간 경제 지표 및 투자 인사이트 큐레이션" />
        
        {/* PWA 설정: 테마 컬러를 불스아이 레드(#e11d48)로 변경 */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#e11d48" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        
        {/* 구글 애드센스 스크립트 */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3737116795159579"
          crossOrigin="anonymous"
        ></script>

        {/* 다크모드 초기화 스크립트 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="antialiased transition-colors duration-300">
        <AppHandler />
        
        {/* 콘텐츠 영역 */}
        {children}

        {/* 하단 푸터 영역: BULL'S EYE 브랜드 적용 */}
        <footer className="p-10 text-center opacity-50 text-[10px] font-bold tracking-widest uppercase border-t mt-20" style={{ borderColor: "var(--border-color)" }}>
          <p>© 2026 BULL'S EYE. ALL RIGHTS RESERVED.</p>
          <Link href="/privacy" className="underline mt-3 inline-block hover:text-red-600 transition">
            개인정보처리방침 (Privacy Policy)
          </Link>
        </footer>
      </body>
    </html>
  );
}