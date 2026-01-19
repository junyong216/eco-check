"use client";

import { useState } from "react";
import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";
import AdSense from "@/components/AdSense";

// --- 네비게이션 데이터 (일관성 유지) ---
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div className="min-h-screen font-sans transition-colors duration-300" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      
      {/* --- 통합 네비게이션 --- */}
      <nav className="h-16 border-b flex items-center justify-between px-4 md:px-8 sticky top-0 z-[300] shadow-sm transition-colors" 
           style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
        
        <div className="flex items-center gap-4">
          <Link href="/" className="font-black text-xl md:text-2xl text-red-600 tracking-tighter italic">BULL'S EYE</Link>
          <DarkModeToggle />
        </div>

        <div className="flex items-center h-full gap-4 md:gap-8 font-black text-[15px]">
          <div className="hidden lg:flex items-center h-full gap-8 mr-4">
            {/* 뉴스 */}
            <div className="relative h-full flex items-center group" onMouseEnter={() => setOpenDropdown('news')} onMouseLeave={() => setOpenDropdown(null)}>
              <Link href="/news" className="flex items-center gap-1 hover:text-red-600 transition-colors">
                뉴스 <span className={`text-[10px] transition-transform duration-300 ${openDropdown === 'news' ? 'rotate-180' : ''}`}>▼</span>
              </Link>
              <div className={`absolute top-16 left-1/2 -translate-x-1/2 w-44 py-2 rounded-2xl border shadow-2xl transition-all ${openDropdown === 'news' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
                   style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                {newsCategories.map((cat) => (
                  <a key={cat.id} href={`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(cat.query)}`} target="_blank" className="block px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition text-[13px]" style={{ color: "var(--text-main)" }}>{cat.name}</a>
                ))}
              </div>
            </div>

            {/* 증권 */}
            <div className="relative h-full flex items-center group" onMouseEnter={() => setOpenDropdown('stock')} onMouseLeave={() => setOpenDropdown(null)}>
              <Link href="/stock" className="flex items-center gap-1 hover:text-red-600 transition-colors">
                증권 <span className={`text-[10px] transition-transform duration-300 ${openDropdown === 'stock' ? 'rotate-180' : ''}`}>▼</span>
              </Link>
              <div className={`absolute top-16 left-1/2 -translate-x-1/2 w-40 py-2 rounded-2xl border shadow-2xl transition-all ${openDropdown === 'stock' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
                   style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                <Link href="/stock?tab=list" className="block px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition text-[13px]" style={{ color: "var(--text-main)" }}>증권사 목록</Link>
                <Link href="/stock?tab=guide" className="block px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition text-[13px]" style={{ color: "var(--text-main)" }}>계좌 가이드</Link>
              </div>
            </div>

            {/* 용어사전 */}
            <div className="relative h-full flex items-center group" onMouseEnter={() => setOpenDropdown('dict')} onMouseLeave={() => setOpenDropdown(null)}>
              <Link href="/dictionary" className="flex items-center gap-1 hover:text-red-600 transition-colors">
                용어사전 <span className={`text-[10px] transition-transform duration-300 ${openDropdown === 'dict' ? 'rotate-180' : ''}`}>▼</span>
              </Link>
              <div className={`absolute top-16 left-1/2 -translate-x-1/2 w-40 py-2 rounded-2xl border shadow-2xl transition-all ${openDropdown === 'dict' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
                   style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                {dictCategories.map((cat) => (
                  <Link key={cat} href={`/dictionary?cat=${cat}`} className="block px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition text-[13px]" style={{ color: "var(--text-main)" }}>{cat}</Link>
                ))}
              </div>
            </div>
            
            <Link href="/recommend" className="hover:text-red-600 transition-colors">추천</Link>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none z-[310]">
            <div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
            <div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
            <div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
          </button>
        </div>

        {/* 햄버거 메뉴 */}
        <div className={`fixed inset-x-0 top-16 transition-all duration-500 ease-in-out overflow-hidden shadow-2xl z-[250] ${isMenuOpen ? 'max-h-screen border-b opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
             style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 p-10 font-bold">
            {/* ... 햄버거 내부 데이터 생략 (동일한 구조 유지) ... */}
            <div>
              <div className="text-red-600 font-black text-xs mb-4 uppercase tracking-widest border-b pb-2">서비스 메뉴</div>
              <div className="flex flex-col gap-3">
                <Link href="/news" onClick={() => setIsMenuOpen(false)} className="text-[14px]" style={{ color: "var(--text-main)" }}>뉴스 홈</Link>
                <Link href="/stock" onClick={() => setIsMenuOpen(false)} className="text-[14px]" style={{ color: "var(--text-main)" }}>증권 가이드</Link>
                <Link href="/dictionary" onClick={() => setIsMenuOpen(false)} className="text-[14px]" style={{ color: "var(--text-main)" }}>경제 용어사전</Link>
                <Link href="/recommend" onClick={() => setIsMenuOpen(false)} className="text-[14px]" style={{ color: "var(--text-main)" }}>불스아이 추천</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-24">
        <header className="mb-16">
          <div className="text-red-600 font-black text-xs tracking-[0.3em] uppercase mb-4">Legal Notice</div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter italic uppercase" style={{ color: "var(--text-main)" }}>Terms of Service</h1>
          <p className="text-sm font-bold opacity-50 uppercase tracking-widest" style={{ color: "var(--text-sub)" }}>이용약관 및 투자 책임 면책 고지</p>
        </header>

        <div className="mb-16">
          <AdSense slot="1234567890" format="auto" />
        </div>
        
        <div className="space-y-16 leading-relaxed">
          <section className="relative">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3" style={{ color: "var(--text-main)" }}>
              <span className="text-red-600 text-sm">01.</span> 서비스의 목적
            </h2>
            <p className="text-[15px] md:text-[16px] font-bold leading-8 opacity-80" style={{ color: "var(--text-sub)" }}>
              본 서비스(BULL'S EYE)는 사용자에게 공포탐욕지수, 실시간 지수, 환율 정보 등 주요 경제 지표를 직관적으로 제공하고, 올바른 경제 지식 함양을 돕는 것을 목적으로 합니다.
            </p>
          </section>

          <section className="relative">
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

          <div className="my-16">
            <AdSense slot="0987654321" format="horizontal" />
          </div>

          <section className="relative">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3" style={{ color: "var(--text-main)" }}>
              <span className="text-red-600 text-sm">03.</span> 데이터의 정확성
            </h2>
            <p className="text-[15px] md:text-[16px] font-bold leading-8 opacity-80" style={{ color: "var(--text-sub)" }}>
              본 서비스는 외부 공신력 있는 API를 통해 데이터를 제공받으나, 네트워크 환경이나 기술적 오류로 인해 실제 시장 데이터와 미세한 차이가 발생할 수 있습니다. 운영자는 데이터의 절대적 정확성을 보장하지 않습니다.
            </p>
          </section>

          <section className="relative">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3" style={{ color: "var(--text-main)" }}>
              <span className="text-red-600 text-sm">04.</span> 서비스의 중단 및 변경
            </h2>
            <p className="text-[15px] md:text-[16px] font-bold leading-8 opacity-80" style={{ color: "var(--text-sub)" }}>
              운영자는 더 나은 서비스 제공을 위한 시스템 점검, 서버 교체 등 필요한 경우 사전 고지 없이 서비스의 일부 또는 전부를 중단하거나 업데이트할 수 있습니다.
            </p>
          </section>

          <div className="pt-10 border-t border-dashed" style={{ borderColor: "var(--border-color)" }}>
            <p className="text-xs font-black opacity-40 uppercase tracking-[0.2em]">Effective Date: 2026. 01. 15</p>
          </div>
        </div>

        <div className="mt-16">
          <AdSense slot="1122334455" format="auto" />
        </div>

        <div className="mt-24 text-center">
          <Link href="/" className="inline-block px-12 py-5 bg-red-600 text-white rounded-full font-black text-lg hover:bg-red-700 transition shadow-xl hover:-translate-y-1">홈으로 돌아가기</Link>
        </div>
      </main>

      <footer className="py-12 text-center text-[10px] font-black tracking-[0.3em] opacity-30 uppercase border-t" style={{ borderColor: "var(--border-color)" }}>
        © 2026 BULL'S EYE. LEGAL DEPT.
      </footer>
    </div>
  );
}