import { Metadata } from "next";

export const metadata: Metadata = {
  title: "경제 용어사전", // 결과: 경제 용어사전 | BULL'S EYE
  description: "주식 기초부터 재무제표, 거시경제까지 초보 투자자가 꼭 알아야 할 필수 경제 용어를 쉽게 설명해 드립니다.",
  openGraph: {
    title: "경제 용어사전 | BULL'S EYE",
    description: "어려운 투자 용어를 한눈에 파악하는 스마트 사전",
    url: "https://bullseye-check.vercel.app/dictionary",
  },
};

export default function DictionaryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}