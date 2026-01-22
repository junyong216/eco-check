import { Metadata } from "next";

export const metadata: Metadata = {
  title: "투자자 추천 도서 & 영상",
  description: "성공적인 투자를 위해 불스아이가 엄선한 필독서와 유튜브 콘텐츠 리스트를 확인하세요.",
  openGraph: {
    title: "투자 추천 콘텐츠 | BULL'S EYE",
    description: "인사이트를 넓혀주는 최고의 투자 바이블 모음",
    url: "https://bullseye-check.vercel.app/recommend",
  },
};

export default function RecommendLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}