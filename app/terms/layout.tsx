import { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관",
  description: "BULL'S EYE 서비스 이용에 관한 약관 안내입니다. 서비스 이용 권리와 의무 사항을 확인하세요.",
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}