import { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "BULL'S EYE의 개인정보처리방침입니다. 이용자의 소중한 정보를 보호하기 위한 가이드라인을 확인하세요.",
  // 법적 고지 페이지는 검색 로봇이 굳이 널리 퍼뜨릴 필요는 없으므로 follow는 하되 index는 선택사항입니다.
  // 보통은 그대로 둡니다.
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}