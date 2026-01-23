"use client";

import { useState } from "react";
import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";
import AdSense from "@/components/AdSense";
import { motion, AnimatePresence } from "framer-motion"; // 애니메이션 추가

// --- 네비게이션 데이터 (통일) ---
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

export default function Privacy() {
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false); // 변수명 통일
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <main className="min-h-screen font-sans transition-colors duration-300" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>

      {/* --- 본문 콘텐츠 --- */}
      <div className="max-w-3xl mx-auto px-6 py-20">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight italic" style={{ color: "var(--text-main)" }}>개인정보 처리방침</h1>
          <p className="font-bold opacity-60 break-keep">BULL'S EYE 서비스 이용과 관련하여 귀하의 개인정보가 어떻게 보호되는지 안내해 드립니다.</p>
        </header>

        <div className="mb-12">
          <AdSense slot="7766554433" format="auto" />
        </div>

        <section className="p-8 md:p-12 rounded-[40px] border shadow-lg space-y-12 leading-relaxed transition-colors"
          style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>

          <div>
            <h2 className="text-xl md:text-2xl font-black mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-red-600 rounded-full"></span>
              1. 수집하는 개인정보 항목
            </h2>
            <p className="opacity-80 font-bold">BULL'S EYE는 별도의 회원가입 없이 이용 가능한 서비스로, 사용자의 직접적인 개인정보(이름, 연락처 등)를 수집하지 않습니다. 다만, 서비스 이용 과정에서 쿠키나 접속 로그와 같은 기술적 정보가 생성될 수 있습니다.</p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-black mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-red-600 rounded-full"></span>
              2. 개인정보의 이용 목적
            </h2>
            <p className="opacity-80 font-bold">수집된 기술적 정보는 서비스 개선, 통계 분석, 그리고 사용자 경험 최적화를 위해서만 사용됩니다.</p>
          </div>

          <div className="p-8 rounded-[32px] border bg-red-50/30 dark:bg-red-900/10 border-red-200 dark:border-red-900/50">
            <h2 className="text-xl font-black text-red-600 mb-4 flex items-center gap-2">
              <span className="text-2xl">📢</span> 3. 광고 식별자 및 쿠키 사용 고지
            </h2>
            <p className="text-sm md:text-base font-bold opacity-90 leading-relaxed">
              본 서비스는 맞춤형 광고 제공을 위해 <strong>Google AdMob 및 AdSense</strong>를 활용합니다.
              이 과정에서 Google은 쿠키를 사용하여 사용자의 이전 방문 기록을 바탕으로 광고를 게재합니다.
              사용자는 Google의 광고 설정이나 기기 설정을 통해 맞춤형 광고를 해제할 수 있습니다.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-black mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-red-600 rounded-full"></span>
              4. 외부 링크 관련 고지
            </h2>
            <p className="opacity-80 font-bold">본 서비스는 외부 사이트(네이버 뉴스, 증권 정보 등)로의 링크를 포함하고 있습니다. 이동된 외부 사이트의 개인정보처리방침은 해당 사이트의 정책을 따르며, BULL'S EYE의 정책과 무관합니다.</p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-black mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-red-600 rounded-full"></span>
              5. 개인정보의 보유 및 파기
            </h2>
            <p className="opacity-80 font-bold">BULL'S EYE는 수집된 정보를 서버에 저장하지 않으며, 서비스 개선 목적의 통계 데이터는 목적 달성 시 즉시 파기합니다.</p>
          </div>
        </section>

        <div className="mt-20 text-center">
          <Link href="/" className="inline-block px-14 py-6 bg-red-600 text-white rounded-full font-black text-xl hover:bg-red-700 transition shadow-2xl hover:-translate-y-1">홈으로 돌아가기</Link>
        </div>
      </div>

      <footer className="py-12 border-t text-center" style={{ borderColor: "var(--border-color)" }}>
        <div className="flex justify-center gap-6 mb-4 text-[10px] font-black text-red-600/50 uppercase tracking-widest">
          <Link href="/privacy" className="hover:text-red-600 transition">개인정보 처리방침</Link>
          <Link href="/terms" className="hover:text-red-600 transition">이용약관</Link>
        </div>
        <div className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-40" style={{ color: "var(--text-sub)" }}>
          © 2026 BULL'S EYE. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </main>
  );
}