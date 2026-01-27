import { Metadata } from "next";

export const metadata: Metadata = {
  title: "실전 투자 가이드 & 전략",
  description: "초보 투자자부터 전문가까지, 불스아이가 제안하는 시장 필승 전략과 자산 배분 가이드를 확인하세요.",
  openGraph: {
    title: "실전 투자 가이드 & 전략 | BULL'S EYE",
    description: "시장의 정곡을 찌르는 투자 인사이트, 불스아이 투자 가이드",
    url: "https://bullseye-check.vercel.app/guide",
  },
};

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}