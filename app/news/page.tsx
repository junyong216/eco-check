"use client";

import { useState } from "react";
import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";

// --- 네비게이션용 공통 데이터 ---
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

export default function NewsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans overflow-x-hidden transition-colors duration-300" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      
      {/* --- 상단 네비게이션 --- */}
      <nav className="h-16 border-b flex items-center justify-between px-4 md:px-8 sticky top-0 z-[100] shadow-sm transition-colors" 
           style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
        
        <div className="flex items-center gap-4">
          <Link href="/" className="font-black text-xl md:text-2xl text-red-600 tracking-tighter italic">BULL'S EYE</Link>
          <DarkModeToggle />
        </div>

        <div className="flex items-center h-full gap-4 md:gap-8">
          {/* 데스크톱 메뉴 */}
          <div className="hidden lg:flex gap-6 text-base font-black h-full">
            <div className="relative group flex items-center h-full px-1">
              <Link href="/news" className="text-red-600 flex items-center gap-1">뉴스 <span className="text-[10px] opacity-40 group-hover:rotate-180 transition-transform">▼</span></Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all pt-2 z-[110]">
                <div className="w-44 rounded-2xl border shadow-2xl p-2 bg-white dark:bg-slate-900" style={{ borderColor: "var(--border-color)" }}>
                  {newsCategories.map((cat) => (
                    <a key={cat.id} href={`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(cat.query)}&sort=1`} target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 rounded-xl text-[13px] hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition" style={{ color: "var(--text-main)" }}>{cat.name}</a>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative group flex items-center h-full px-1">
              <Link href="/stock" className="group-hover:text-red-600 transition flex items-center gap-1" style={{ color: "var(--text-main)" }}>증권 <span className="text-[10px] opacity-40 group-hover:rotate-180 transition-transform">▼</span></Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all pt-2 z-[110]">
                <div className="w-40 rounded-2xl border shadow-2xl p-2 bg-white dark:bg-slate-900" style={{ borderColor: "var(--border-color)" }}>
                  <Link href="/stock?tab=list" className="block px-4 py-2.5 rounded-xl text-[13px] hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition" style={{ color: "var(--text-main)" }}>증권사 목록</Link>
                  <Link href="/stock?tab=guide" className="block px-4 py-2.5 rounded-xl text-[13px] hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition" style={{ color: "var(--text-main)" }}>계좌 가이드</Link>
                </div>
              </div>
            </div>
            <div className="relative group flex items-center h-full px-1">
              <Link href="/dictionary" className="group-hover:text-red-600 transition flex items-center gap-1" style={{ color: "var(--text-main)" }}>용어사전 <span className="text-[10px] opacity-40 group-hover:rotate-180 transition-transform">▼</span></Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all pt-2 z-[110]">
                <div className="w-40 rounded-2xl border shadow-2xl p-2 bg-white dark:bg-slate-900" style={{ borderColor: "var(--border-color)" }}>
                  {dictCategories.map((cat) => (
                    <Link key={cat} href={`/dictionary?cat=${cat}`} className="block px-4 py-2.5 rounded-xl text-[13px] hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition" style={{ color: "var(--text-main)" }}>{cat}</Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative group flex items-center h-full px-1">
              <Link href="/recommend" className="group-hover:text-red-600 transition flex items-center gap-1" style={{ color: "var(--text-main)" }}>추천 <span className="text-[10px] opacity-40 group-hover:rotate-180 transition-transform">▼</span></Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all pt-2 z-[110]">
                <div className="w-40 rounded-2xl border shadow-2xl p-2 bg-white dark:bg-slate-900" style={{ borderColor: "var(--border-color)" }}>
                  {recommendTabs.map((tab) => (
                    <Link key={tab.slug} href={`/recommend?tab=${tab.slug}`} className="block px-4 py-2.5 rounded-xl text-[13px] hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition" style={{ color: "var(--text-main)" }}>{tab.name}</Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none z-[120]">
            <div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
            <div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
            <div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
          </button>
        </div>

        {/* 햄버거 메뉴 레이어 */}
        <div className={`absolute left-0 w-full transition-all duration-500 ease-in-out overflow-hidden shadow-2xl z-[90] ${isMenuOpen ? 'max-h-[100vh] border-b opacity-100' : 'max-h-0 opacity-0'}`}
             style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)", top: '64px' }}>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 p-10">
            <div>
              <div className="text-red-600 font-black text-xs mb-4 uppercase tracking-widest">뉴스</div>
              <div className="flex flex-col gap-3">
                {newsCategories.map((cat) => (
                  <a key={cat.id} href={`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(cat.query)}`} target="_blank" className="text-[14px] font-bold" style={{ color: "var(--text-main)" }}>{cat.name}</a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-red-600 font-black text-xs mb-4 uppercase tracking-widest">증권</div>
              <div className="flex flex-col gap-3">
                <Link href="/stock?tab=list" onClick={() => setIsMenuOpen(false)} className="text-[14px] font-bold" style={{ color: "var(--text-main)" }}>증권사 목록</Link>
                <Link href="/stock?tab=guide" onClick={() => setIsMenuOpen(false)} className="text-[14px] font-bold" style={{ color: "var(--text-main)" }}>계좌 가이드</Link>
              </div>
            </div>
            <div>
              <div className="text-red-600 font-black text-xs mb-4 uppercase tracking-widest">용어사전</div>
              <div className="flex flex-col gap-3">
                {dictCategories.map((cat) => (
                  <Link key={cat} href={`/dictionary?cat=${cat}`} onClick={() => setIsMenuOpen(false)} className="text-[14px] font-bold" style={{ color: "var(--text-main)" }}>{cat}</Link>
                ))}
              </div>
            </div>
            <div>
              <div className="text-red-600 font-black text-xs mb-4 uppercase tracking-widest">추천</div>
              <div className="flex flex-col gap-3">
                {recommendTabs.map((tab) => (
                  <Link key={tab.slug} href={`/recommend?tab=${tab.slug}`} onClick={() => setIsMenuOpen(false)} className="text-[14px] font-bold" style={{ color: "var(--text-main)" }}>{tab.name}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-5 py-12 md:py-20">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 italic" style={{ color: "var(--text-main)" }}>Bull's Eye Insights</h1>
          <p className="font-medium text-sm md:text-base italic" style={{ color: "var(--text-sub)" }}>황소의 눈으로 시장의 핵심 맥락을 짚어냅니다.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {newsCategories.map((cat) => (
            <a 
              key={cat.id} 
              href={`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(cat.query)}&sort=1`}
              target="_blank" 
              rel="noopener noreferrer"
              className="p-8 rounded-[32px] md:rounded-[40px] shadow-xl border hover:border-red-500 transition-all group"
              style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}
            >
              <div className="flex justify-between items-center mb-6">
                <span className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">{cat.category}</span>
                <span className="text-red-500 text-[10px] font-black group-hover:underline uppercase tracking-tighter italic">Focus Target →</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black mb-4 tracking-tight" style={{ color: "var(--text-main)" }}>
                {cat.name} 핵심 브리핑
              </h2>
              <p className="text-sm md:text-base font-bold opacity-80 mb-4" style={{ color: "var(--text-sub)" }}>
                불스아이가 선별한 {cat.name} 관련 시장의 소음을 제거한 최신 뉴스를 확인해 보세요.
              </p>
              <div className="text-[11px] font-bold font-mono text-red-600/50" style={{ opacity: 0.5 }}>BULL'S EYE AUTO-CURATION</div>
            </a>
          ))}
        </div>

        {/* --- 애드센스 승인용 정보성 콘텐츠 --- */}
        <section className="mt-32 pt-20 border-t" style={{ borderColor: "var(--border-color)" }}>
          <h2 className="text-3xl font-black mb-10 tracking-tight text-red-600" style={{ color: "var(--accent-color)" }}>🎯 스마트 투자자 가이드</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-base leading-relaxed" style={{ color: "var(--text-sub)" }}>
            <div className="space-y-4">
              <h3 className="text-xl font-bold" style={{ color: "var(--text-main)" }}>1. 고금리 시대의 자산 배분 전략</h3>
              <p>기준금리가 높은 수준을 유지할 때는 현금 흐름이 우수한 기업과 채권형 자산의 매력도가 높아집니다. 불스아이와 함께 금리 사이클을 읽는 법을 익혀보세요.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold" style={{ color: "var(--text-main)" }}>2. 시장의 심리, 공포와 탐욕 지수</h3>
              <p>모두가 탐욕에 빠졌을 때 경계하고, 모두가 공포에 질렸을 때 기회를 찾는 역발상 투자의 핵심은 객관적인 데이터 분석에서 시작됩니다.</p>
            </div>
          </div>
        </section>

        <div className="text-center mt-24 pb-12">
          <Link href="/" className="inline-block px-12 py-5 bg-red-600 text-white rounded-full font-black text-lg hover:bg-red-700 transition shadow-xl">홈으로 돌아가기</Link>
        </div>
      </main>

      <footer className="py-12 text-center text-[10px] font-bold tracking-widest border-t uppercase" style={{ color: "var(--text-sub)", borderColor: "var(--border-color)" }}>
        © 2026 BULL'S EYE. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}