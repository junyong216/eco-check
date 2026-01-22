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
      
      {/* --- 통합 네비게이션 (규격 완벽 통일) --- */}
      <nav className="h-16 border-b flex items-center justify-between px-4 md:px-8 sticky top-0 z-[300] shadow-sm transition-colors" 
           style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
        
        <div className="flex items-center gap-4">
          <Link href="/" className="font-black text-xl md:text-2xl text-red-600 tracking-tighter italic">BULL'S EYE</Link>
          <DarkModeToggle />
        </div>

        <div className="flex items-center h-full font-black text-[15px]">
          {/* [PC용 메뉴] gap-8로 간격 통일 */}
          <div className="hidden lg:flex items-center h-full gap-8 mr-6">
            
            {/* 뉴스 */}
            <div className="relative h-full flex items-center group" onMouseEnter={() => setOpenDropdown('news')} onMouseLeave={() => setOpenDropdown(null)}>
              <span className="flex items-center gap-1 cursor-pointer transition-colors" style={{ color: openDropdown === 'news' ? '#dc2626' : 'var(--text-main)' }}>
                뉴스 <span className={`text-[10px] transition-transform duration-300 ${openDropdown === 'news' ? 'rotate-180' : ''}`}>▼</span>
              </span>
              <div className={`absolute top-16 left-1/2 -translate-x-1/2 w-44 py-2 rounded-2xl border shadow-2xl transition-all ${openDropdown === 'news' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
                   style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                <Link href="/news" className="block px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition text-[13px] font-bold" style={{ color: "var(--text-main)" }}>뉴스 홈</Link>
                {newsCategories.map((cat) => (
                  <a key={cat.id} href={`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(cat.query)}`} target="_blank" className="block px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition text-[13px]" style={{ color: "var(--text-main)" }}>{cat.name}</a>
                ))}
              </div>
            </div>

            {/* 증권 */}
            <div className="relative h-full flex items-center group" onMouseEnter={() => setOpenDropdown('stock')} onMouseLeave={() => setOpenDropdown(null)}>
              <span className="flex items-center gap-1 cursor-pointer transition-colors" style={{ color: openDropdown === 'stock' ? '#dc2626' : 'var(--text-main)' }}>
                증권 <span className={`text-[10px] transition-transform duration-300 ${openDropdown === 'stock' ? 'rotate-180' : ''}`}>▼</span>
              </span>
              <div className={`absolute top-16 left-1/2 -translate-x-1/2 w-44 py-2 rounded-2xl border shadow-2xl transition-all ${openDropdown === 'stock' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
                   style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                <Link href="/stock?tab=list" className="block px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition text-[13px] font-bold" style={{ color: "var(--text-main)" }}>증권사 목록</Link>
                <Link href="/stock?tab=guide" className="block px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition text-[13px] font-bold" style={{ color: "var(--text-main)" }}>계좌 가이드</Link>
              </div>
            </div>

            {/* 용어사전 */}
            <div className="relative h-full flex items-center group" onMouseEnter={() => setOpenDropdown('dict')} onMouseLeave={() => setOpenDropdown(null)}>
              <span className="flex items-center gap-1 cursor-pointer transition-colors" style={{ color: openDropdown === 'dict' ? '#dc2626' : 'var(--text-main)' }}>
                용어사전 <span className={`text-[10px] transition-transform duration-300 ${openDropdown === 'dict' ? 'rotate-180' : ''}`}>▼</span>
              </span>
              <div className={`absolute top-16 left-1/2 -translate-x-1/2 w-44 py-2 rounded-2xl border shadow-2xl transition-all ${openDropdown === 'dict' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
                   style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                {dictCategories.map((cat) => (
                  <Link key={cat} href={`/dictionary?cat=${cat}`} className="block px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition text-[13px]" style={{ color: "var(--text-main)" }}>{cat}</Link>
                ))}
              </div>
            </div>

            {/* 추천 */}
            <div className="relative h-full flex items-center group" onMouseEnter={() => setOpenDropdown('recommend')} onMouseLeave={() => setOpenDropdown(null)}>
              <span className="flex items-center gap-1 cursor-pointer transition-colors" style={{ color: openDropdown === 'recommend' ? '#dc2626' : 'var(--text-main)' }}>
                추천 <span className={`text-[10px] transition-transform duration-300 ${openDropdown === 'recommend' ? 'rotate-180' : ''}`}>▼</span>
              </span>
              <div className={`absolute top-16 left-1/2 -translate-x-1/2 w-44 py-2 rounded-2xl border shadow-2xl transition-all ${openDropdown === 'recommend' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
                   style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                {recommendTabs.map((tab) => (
                  <Link key={tab.slug} href={`/recommend?tab=${tab.slug}`} className="block px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition text-[13px] font-bold" style={{ color: "var(--text-main)" }}>{tab.name}</Link>
                ))}
              </div>
            </div>
          </div>

          {/* 햄버거 버튼 */}
          <button onClick={() => setIsFullMenuOpen(!isFullMenuOpen)} className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none z-[310]">
            <div className={`w-6 h-0.5 transition-all duration-300 ${isFullMenuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
            <div className={`w-6 h-0.5 transition-all duration-300 ${isFullMenuOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
            <div className={`w-6 h-0.5 transition-all duration-300 ${isFullMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
          </button>
        </div>

        {/* --- 햄버거 전체 메뉴 (애니메이션 버전) --- */}
        <AnimatePresence>
          {isFullMenuOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsFullMenuOpen(false)}
                className="fixed inset-0 bg-black/20 dark:bg-black/50 z-[240] backdrop-blur-[2px]" />
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-x-0 top-16 z-[250] overflow-hidden shadow-2xl border-b"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 p-10 font-bold">
                  <div>
                    <div className="text-red-600 font-black text-xs mb-4 uppercase tracking-widest border-b border-red-600 pb-2">뉴스</div>
                    <div className="flex flex-col gap-3">
                      <Link href="/news" onClick={() => setIsFullMenuOpen(false)} className="text-[14px] font-bold hover:text-red-600" style={{ color: "var(--text-main)" }}>뉴스 홈</Link>
                      {newsCategories.map(cat => (
                        <a key={cat.id} href={`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(cat.query)}`} target="_blank" className="text-[14px] hover:text-red-600" style={{ color: "var(--text-main)" }}>{cat.name}</a>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-red-600 font-black text-xs mb-4 uppercase tracking-widest border-b border-red-600 pb-2">증권</div>
                    <div className="flex flex-col gap-3 text-[14px]">
                      <Link href="/stock?tab=list" onClick={() => setIsFullMenuOpen(false)} className="hover:text-red-600" style={{ color: "var(--text-main)" }}>증권사 목록</Link>
                      <Link href="/stock?tab=guide" onClick={() => setIsFullMenuOpen(false)} className="hover:text-red-600" style={{ color: "var(--text-main)" }}>계좌 가이드</Link>
                    </div>
                  </div>
                  <div>
                    <div className="text-red-600 font-black text-xs mb-4 uppercase tracking-widest border-b border-red-600 pb-2">용어사전</div>
                    <div className="flex flex-col gap-3 text-[14px]">
                      {dictCategories.map(cat => (
                        <Link key={cat} href={`/dictionary?cat=${cat}`} onClick={() => setIsFullMenuOpen(false)} className="hover:text-red-600" style={{ color: "var(--text-main)" }}>{cat}</Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-red-600 font-black text-xs mb-4 uppercase tracking-widest border-b border-red-600 pb-2">추천</div>
                    <div className="flex flex-col gap-3 text-[14px]">
                      {recommendTabs.map(tab => (
                        <Link key={tab.slug} href={`/recommend?tab=${tab.slug}`} onClick={() => setIsFullMenuOpen(false)} className="hover:text-red-600" style={{ color: "var(--text-main)" }}>{tab.name}</Link>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

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