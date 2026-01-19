import "./globals.css";
// 폰트 최적화를 위해 Next.js 내장 폰트 사용 추천
import { Inter } from "next/font/google"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BULL'S EYE - 스마트 경제 지표",
  description: "실시간 금융 지표 및 경제 뉴스",
  // 파비콘이나 뷰포트 설정을 여기에 추가할 수 있습니다.
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: 다크모드 전환 시 클래스 불일치 경고 방지
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}