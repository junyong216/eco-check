"use client";

import { useState } from "react";
import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";
import AdSense from "@/components/AdSense";

// --- 네비게이션 데이터 ---
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <main className="min-h-screen font-sans transition-colors duration-300" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      
      {/* --- 네비게이션 (전체 페이지 통일 버전) --- */}
      <nav className="h-16 border-b flex items-center justify-between px-4 md:px-8 sticky top-0 z-[300] shadow-sm transition-colors" 
           style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
        
        <div className="flex items-center gap-4">
          <Link href="/" className="font-black text-xl md:text-2xl text-red-600 tracking-tighter italic">BULL'S EYE</Link>
          <DarkModeToggle />
        </div>

        <div className="flex items-center h-full gap-4 md:gap-8 font-black text-[15px]">
          {/* [PC 메뉴] */}
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

            {/* 추천 */}
            <div className="relative h-full flex items-center group" onMouseEnter={() => setOpenDropdown('recommend')} onMouseLeave={() => setOpenDropdown(null)}>
              <Link href="/recommend" className="flex items-center gap-1 hover:text-red-600 transition-colors">
                추천 <span className={`text-[10px] transition-transform duration-300 ${openDropdown === 'recommend' ? 'rotate-180' : ''}`}>▼</span>
              </Link>
              <div className={`absolute top-16 left-1/2 -translate-x-1/2 w-40 py-2 rounded-2xl border shadow-2xl transition-all ${openDropdown === 'recommend' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
                   style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                {recommendTabs.map((tab) => (
                  <Link key={tab.slug} href={`/recommend?tab=${tab.slug}`} className="block px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition text-[13px]" style={{ color: "var(--text-main)" }}>{tab.name}</Link>
                ))}
              </div>
            </div>
          </div>

          {/* 햄버거 버튼 */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none z-[310]">
            <div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
            <div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
            <div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
          </button>
        </div>

        {/* --- 햄버거 전체 메뉴 --- */}
        <div className={`fixed inset-x-0 top-16 transition-all duration-500 ease-in-out overflow-hidden shadow-2xl z-[250] ${isMenuOpen ? 'max-h-screen border-b opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
             style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 p-10 font-bold">
            <div>
              <div className="text-red-600 font-black text-xs mb-4 uppercase tracking-widest border-b pb-2">뉴스</div>
              <div className="flex flex-col gap-3">
                {newsCategories.map((cat) => (
                  <a key={cat.id} href={`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(cat.query)}`} target="_blank" className="text-[14px] hover:text-red-600" style={{ color: "var(--text-main)" }}>{cat.name}</a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-red-600 font-black text-xs mb-4 uppercase tracking-widest border-b pb-2">증권</div>
              <div className="flex flex-col gap-3">
                <Link href="/stock?tab=list" onClick={() => setIsMenuOpen(false)} className="text-[14px] hover:text-red-600" style={{ color: "var(--text-main)" }}>증권사 목록</Link>
                <Link href="/stock?tab=guide" onClick={() => setIsMenuOpen(false)} className="text-[14px] hover:text-red-600" style={{ color: "var(--text-main)" }}>계좌 가이드</Link>
              </div>
            </div>
            <div>
              <div className="text-red-600 font-black text-xs mb-4 uppercase tracking-widest border-b pb-2">용어사전</div>
              <div className="flex flex-col gap-3">
                {dictCategories.map((cat) => (
                  <Link key={cat} href={`/dictionary?cat=${cat}`} onClick={() => setIsMenuOpen(false)} className="text-[14px] hover:text-red-600" style={{ color: "var(--text-main)" }}>{cat}</Link>
                ))}
              </div>
            </div>
            <div>
              <div className="text-red-600 font-black text-xs mb-4 uppercase tracking-widest border-b pb-2">추천</div>
              <div className="flex flex-col gap-3">
                {recommendTabs.map((tab) => (
                  <Link key={tab.slug} href={`/recommend?tab=${tab.slug}`} onClick={() => setIsMenuOpen(false)} className="text-[14px] hover:text-red-600" style={{ color: "var(--text-main)" }}>{tab.name}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

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

      <footer className="py-16 text-center opacity-40 text-[10px] font-black tracking-[0.5em] border-t uppercase" style={{ borderColor: "var(--border-color)" }}>
        © 2026 BULL'S EYE. ALL RIGHTS RESERVED.
      </footer>
    </main>
  );
}