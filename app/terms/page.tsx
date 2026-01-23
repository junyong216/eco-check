"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion"; // 애니메이션 추가
import DarkModeToggle from "@/components/DarkModeToggle";
import AdSense from "@/components/AdSense";
import AdWrapper from "@/components/AdWrapper";

// --- 네비게이션 데이터 (통일된 데이터셋) ---
const newsCategories = [
  { id: "market", name: "시장지표", query: "시장지표" },
  { id: "interest", name: "금리이슈", query: "금리전망" },
  { id: "stock", name: "주식뉴스", query: "주식시황" },
  { id: "crypto", name: "가상자산", query: "비트코인" },
  { id: "realestate", name: "부동산", query: "부동산전망" },
  { id: "global", name: "해외경제", query: "글로벌경제" },
];
const dictCategories = ["전체", "주식기초", "재무제표", "거시경제", "투자전략"];
const recommendTabs = [
  { name: "추천 도서", slug: "books" },
  { name: "추천 영상", slug: "videos" }
];

export default function Terms() {
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false); // 변수명 통일
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div className="min-h-screen font-sans transition-colors duration-300" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>

      <main className="max-w-3xl mx-auto px-6 py-24">
        <header className="mb-16">
          <div className="text-red-600 font-black text-xs tracking-[0.3em] uppercase mb-4">Legal Notice</div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter italic uppercase" style={{ color: "var(--text-main)" }}>Terms of Service</h1>
          <p className="text-sm font-bold opacity-50 uppercase tracking-widest" style={{ color: "var(--text-sub)" }}>이용약관 및 투자 책임 면책 고지</p>
        </header>

        <AdWrapper minHeight="200px">
          <AdSense slot="1234567890" format="auto" />
        </AdWrapper>
        
        <div className="space-y-16 leading-relaxed mt-16">
          <section>
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3" style={{ color: "var(--text-main)" }}>
              <span className="text-red-600 text-sm">01.</span> 서비스의 목적
            </h2>
            <p className="text-[15px] md:text-[16px] font-bold leading-8 opacity-80" style={{ color: "var(--text-sub)" }}>
              본 서비스(BULL'S EYE)는 사용자에게 실시간 경제 지표, 환율 정보, 금융 용어 등 주요 경제 데이터를 제공하여 합리적인 경제적 의사결정을 돕는 것을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3 text-red-600">
              <span className="text-red-600 text-sm">02.</span> 투자 책임 면책 조항
            </h2>
            <div className="p-8 rounded-[32px] border-2 border-red-600 bg-red-50/50 dark:bg-red-900/10">
              <p className="text-[15px] font-black leading-8 text-red-600 mb-2">
                [경고] 본 서비스에서 제공하는 모든 데이터는 투자 참고용입니다.
              </p>
              <p className="text-[15px] font-bold leading-8" style={{ color: "var(--text-main)" }}>
                어떠한 경우에도 본 서비스의 정보는 투자 결과에 대한 법적 책임 소재의 증빙 자료로 사용될 수 없습니다. 모든 투자 결정의 최종 책임은 사용자 본인에게 있음을 명시합니다.
              </p>
            </div>
          </section>

          <AdWrapper minHeight="100px">
            <AdSense slot="0987654321" format="horizontal" />
          </AdWrapper>

          <section>
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3" style={{ color: "var(--text-main)" }}>
              <span className="text-red-600 text-sm">03.</span> 데이터의 정확성 및 광고 게재
            </h2>
            <p className="text-[15px] md:text-[16px] font-bold leading-8 opacity-80" style={{ color: "var(--text-sub)" }}>
              운영자는 정보의 정확성을 위해 노력하나 외부 API의 오류 등으로 실제 데이터와 차이가 발생할 수 있습니다. 또한, 본 서비스는 무료 운영을 위해 구글 애드센스 등 제3자 광고를 게재하며 관련 쿠키를 사용할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3" style={{ color: "var(--text-main)" }}>
              <span className="text-red-600 text-sm">04.</span> 서비스의 변경 및 중단
            </h2>
            <p className="text-[15px] md:text-[16px] font-bold leading-8 opacity-80" style={{ color: "var(--text-sub)" }}>
              운영자는 시스템 성능 개선 또는 서버 유지보수를 위해 사전 고지 없이 서비스 내용을 변경하거나 일시적으로 중단할 수 있습니다.
            </p>
          </section>

          <div className="pt-10 border-t border-dashed" style={{ borderColor: "var(--border-color)" }}>
            <p className="text-xs font-black opacity-40 uppercase tracking-[0.2em]">Effective Date: 2026. 01. 20</p>
          </div>
        </div>

        <div className="mt-24 text-center">
          <Link href="/" className="inline-block px-12 py-5 bg-red-600 text-white rounded-full font-black text-lg hover:bg-red-700 transition shadow-xl hover:-translate-y-1">홈으로 돌아가기</Link>
        </div>
      </main>

      <footer className="py-12 border-t text-center" style={{ borderColor: "var(--border-color)" }}>
        <div className="flex justify-center gap-6 mb-4 text-[10px] font-black text-red-600/50 uppercase tracking-widest">
          <Link href="/privacy" className="hover:text-red-600 transition">개인정보 처리방침</Link>
          <Link href="/terms" className="hover:text-red-600 transition">이용약관</Link>
        </div>
        <div className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-40" style={{ color: "var(--text-sub)" }}>
          © 2026 BULL'S EYE. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}