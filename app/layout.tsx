import "./globals.css";
import { Inter } from "next/font/google"; 
import { Metadata } from "next"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BULL'S EYE - 스마트 경제 지표",
  description: "실시간 금융 지표 및 경제 뉴스",
  manifest: "/manifest.json",
  verification: {
    google: "l-yo6JfY6p6TB-5Hg2rN9VjGa8oU6LehgDM3caKaycY",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        {children}

        {/* --- 여기 추가: 서비스 워커 등록 스크립트 --- */}
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
        {/* -------------------------------------- */}
      </body>
    </html>
  );
}