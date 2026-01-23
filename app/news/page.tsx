"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import DarkModeToggle from "@/components/DarkModeToggle";
import AdSense from "@/components/AdSense";

// --- 데이터 100% 원본 유지 ---
const newsCategories = [
  { id: "market", name: "시장지표", query: "시장지표", category: "Market" },
  { id: "interest", name: "금리이슈", query: "금리전망", category: "Interest" },
  { id: "stock", name: "주식뉴스", query: "주식시황", category: "Stock" },
  { id: "crypto", name: "가상자산", query: "비트코인", category: "Crypto" },
  { id: "realestate", name: "부동산", query: "부동산전망", category: "Estate" },
  { id: "global", name: "해외경제", query: "글로벌경제", category: "Global" },
];

const dictCategories = ["전체", "주식기초", "재무제표", "거시경제", "투자전략"];

const recommendTabs = [
  { name: "추천 도서", slug: "books" },
  { name: "추천 영상", slug: "videos" }
];

const investorGuides = [
  {
    id: 1,
    title: "고금리 시대의 자산 배분 전략",
    desc: "기준금리가 높은 수준을 유지할 때는 현금 흐름이 우수한 기업과 채권형 자산의 매력도가 높아집니다. 불스아이와 함께 금리 사이클을 읽는 법을 익혀보세요.",
    tag: "Strategy"
  },
  {
    id: 2,
    title: "시장의 심리, 공포와 탐욕 지수",
    desc: "모두가 탐욕에 빠졌을 때 경계하고, 모두가 공포에 질렸을 때 기회를 찾는 역발상 투자의 핵심은 객관적인 데이터 분석에서 시작됩니다.",
    tag: "Psychology"
  },
  {
    id: 3,
    title: "분산 투자의 기술: 포트폴리오 최적화",
    desc: "단순히 종목을 나누는 것을 넘어, 상관관계가 낮은 자산군에 분산하여 하락장에서도 내 자산을 지키는 방어 기법을 알아봅니다.",
    tag: "Risk"
  },
  {
    id: 4,
    title: "워렌 버핏의 가치투자 철학",
    desc: "위대한 기업을 적절한 가격에 사는 법. 기업의 내재 가치를 계산하고 안전마진을 확보하는 장기 투자자의 핵심 원칙을 정리했습니다.",
    tag: "Legend"
  }
];

export default function NewsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div className="min-h-screen font-sans overflow-x-hidden transition-colors duration-300" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>

      <main className="max-w-5xl mx-auto px-5 py-12 md:py-20">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 italic" style={{ color: "var(--text-main)" }}>Bull's Eye <span className="text-red-600">News</span>Insights</h1>
          <p className="font-medium text-sm md:text-base italic" style={{ color: "var(--text-sub)" }}>황소의 눈으로 시장의 핵심 맥락을 짚어냅니다.</p>
        </header>

        <div className="mb-12">
          <AdSense slot="9988776655" format="auto" />
        </div>

        {/* --- 뉴스 카드 섹션 --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {newsCategories.map((cat, index) => (
            <div key={cat.id} className="contents">
              <a
                href={`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(cat.query)}&sort=1`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-8 rounded-[32px] md:rounded-[40px] shadow-xl border hover:border-red-500 transition-all group flex flex-col justify-between"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">{cat.category}</span>
                    <span className="text-red-500 text-[10px] font-black group-hover:underline uppercase tracking-tighter italic">Focus Target →</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-black mb-4 tracking-tight" style={{ color: "var(--text-main)" }}>
                    {cat.name} 핵심 브리핑
                  </h2>
                  <p className="text-sm md:text-base font-bold opacity-80 mb-6 break-keep" style={{ color: "var(--text-sub)" }}>
                    불스아이가 선별한 {cat.name} 관련 시장의 소음을 제거한 최신 뉴스를 확인해 보세요.
                  </p>
                </div>
                <div className="text-[11px] font-bold font-mono text-red-600/50 uppercase tracking-widest">BULL'S EYE AUTO-CURATION</div>
              </a>

              {index === 3 && (
                <div className="col-span-1 md:col-span-2 my-4">
                  <AdSense slot="1234567890" format="fluid" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* --- 스마트 투자자 가이드 섹션 --- */}
        <section className="mt-32 pt-20 border-t" style={{ borderColor: "var(--border-color)" }}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-red-600 mb-2">🎯 스마트 투자자 가이드</h2>
              <p className="font-bold opacity-60 text-sm">초보부터 고수까지, 시장을 이기는 핵심 인사이트</p>
            </div>
            <div className="text-sm font-black text-red-600/50 italic">TOTAL {investorGuides.length} GUIDES</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {investorGuides.map((guide) => (
              <div
                key={guide.id}
                className="group p-8 rounded-[32px] border transition-all hover:shadow-2xl hover:-translate-y-1"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}
              >
                <span className="inline-block text-[10px] font-black text-red-600 border border-red-600 px-2 py-0.5 rounded mb-4 uppercase tracking-tighter">
                  {guide.tag}
                </span>
                <h3 className="text-xl font-black mb-4 group-hover:text-red-600 transition-colors" style={{ color: "var(--text-main)" }}>
                  {guide.title}
                </h3>
                <p className="text-sm md:text-[15px] font-medium leading-relaxed opacity-70 break-keep" style={{ color: "var(--text-sub)" }}>
                  {guide.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-20">
          <AdSense slot="0099887766" format="auto" />
        </div>

        <div className="text-center mt-24 pb-12">
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