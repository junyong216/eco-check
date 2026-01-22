import { Metadata } from "next";

export const metadata: Metadata = {
  title: "증권사 혜택 및 계좌 개설 가이드",
  description: "국내 주요 증권사별 수수료 혜택 비교와 주식 계좌 개설 방법을 상세히 안내해 드립니다.",
  openGraph: {
    title: "증권 가이드 | BULL'S EYE",
    description: "나에게 맞는 증권사 찾기 및 계좌 개설 가이드",
    url: "https://bullseye-check.vercel.app/stock",
  },
};

export default function StockLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}