"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import DarkModeToggle from "@/components/DarkModeToggle";

// --- 공통 데이터 관리 ---
const newsCategories = [
  { id: "market", name: "시장지표", query: "시장지표" },
  { id: "interest", name: "금리이슈", query: "금리전망" },
  { id: "stock", name: "주식뉴스", query: "주식시황" },
  { id: "crypto", name: "가상자산", query: "비트코인" },
  { id: "realestate", name: "부동산", query: "부동산전망" },
  { id: "global", name: "해외경제", query: "글로벌경제" },
];

const dictCategories = ["전체", "주식기초", "재무제표", "거시경제", "투자전략", "미국/해외주식", "지수/상품"];

const recommendTabs = [
  { name: "추천 도서", slug: "books" },
  { name: "추천 영상", slug: "videos" }
];

export default function Navbar() {
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // 메뉴 클릭 시 닫기 함수
  const closeMenu = () => setIsFullMenuOpen(false);

  return (
    <nav className="h-16 border-b flex items-center justify-between px-4 md:px-8 sticky top-0 z-[300] transition-colors shadow-sm"
      style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>

      {/* 로고 & 다크모드 */}
      <div className="flex items-center gap-4">
        <Link href="/" className="font-black text-xl md:text-2xl text-red-600 tracking-tighter italic">
          BULL'S EYE
        </Link>
        <DarkModeToggle />
      </div>

      {/* 메뉴 영역 */}
      <div className="flex items-center h-full">
        {/* [PC] 상단 가로 메뉴 - 크기 15px, 굵게 */}
        <div className="hidden lg:flex items-center h-full gap-8 mr-6 font-black text-[15px]">

          {/* 뉴스 */}
          <div className="relative h-full flex items-center"
            onMouseEnter={() => setOpenDropdown('news')} onMouseLeave={() => setOpenDropdown(null)}>
            <span className="flex items-center gap-1 cursor-pointer transition-colors"
              style={{ color: openDropdown === 'news' ? '#dc2626' : 'var(--text-main)' }}>
              뉴스 <span className={`text-[10px] transition-transform ${openDropdown === 'news' ? 'rotate-180' : ''}`}>▼</span>
            </span>
            <div className={`absolute top-16 left-1/2 -translate-x-1/2 w-48 py-2 rounded-2xl border shadow-2xl transition-all ${openDropdown === 'news' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
              style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
              <Link href="/news" className="block px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 text-[14px] font-bold" style={{ color: "var(--text-main)" }}>뉴스 홈</Link>
              {newsCategories.map(cat => (
                <a key={cat.id} href={`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(cat.query)}`} target="_blank"
                  className="block px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 text-[14px] font-medium" style={{ color: "var(--text-main)" }}>{cat.name}</a>
              ))}
            </div>
          </div>

          {/* 증권 */}
          <div className="relative h-full flex items-center"
            onMouseEnter={() => setOpenDropdown('stock')} onMouseLeave={() => setOpenDropdown(null)}>
            <span className="flex items-center gap-1 cursor-pointer transition-colors"
              style={{ color: openDropdown === 'stock' ? '#dc2626' : 'var(--text-main)' }}>
              증권 <span className={`text-[10px] transition-transform ${openDropdown === 'stock' ? 'rotate-180' : ''}`}>▼</span>
            </span>
            <div className={`absolute top-16 left-1/2 -translate-x-1/2 w-48 py-2 rounded-2xl border shadow-2xl transition-all ${openDropdown === 'stock' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
              style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
              <Link href="/stock?tab=list" className="block px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 text-[14px] font-bold" style={{ color: "var(--text-main)" }}>증권사 목록</Link>
              <Link href="/stock?tab=guide" className="block px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 text-[14px] font-bold" style={{ color: "var(--text-main)" }}>계좌 가이드</Link>
            </div>
          </div>

          {/* 용어사전 */}
          <div className="relative h-full flex items-center"
            onMouseEnter={() => setOpenDropdown('dict')} onMouseLeave={() => setOpenDropdown(null)}>
            <span className="flex items-center gap-1 cursor-pointer transition-colors"
              style={{ color: openDropdown === 'dict' ? '#dc2626' : 'var(--text-main)' }}>
              용어사전 <span className={`text-[10px] transition-transform ${openDropdown === 'dict' ? 'rotate-180' : ''}`}>▼</span>
            </span>
            <div className={`absolute top-16 left-1/2 -translate-x-1/2 w-52 py-2 rounded-2xl border shadow-2xl transition-all ${openDropdown === 'dict' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
              style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
              {dictCategories.map(cat => (
                <Link key={cat} href={`/dictionary?cat=${encodeURIComponent(cat)}`}
                  className="block px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 text-[14px] font-medium whitespace-nowrap" style={{ color: "var(--text-main)" }}>{cat}</Link>
              ))}
            </div>
          </div>

          {/* 추천 */}
          <div className="relative h-full flex items-center"
            onMouseEnter={() => setOpenDropdown('recommend')} onMouseLeave={() => setOpenDropdown(null)}>
            <span className="flex items-center gap-1 cursor-pointer transition-colors"
              style={{ color: openDropdown === 'recommend' ? '#dc2626' : 'var(--text-main)' }}>
              추천 <span className={`text-[10px] transition-transform ${openDropdown === 'recommend' ? 'rotate-180' : ''}`}>▼</span>
            </span>
            <div className={`absolute top-16 left-1/2 -translate-x-1/2 w-48 py-2 rounded-2xl border shadow-2xl transition-all ${openDropdown === 'recommend' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
              style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
              <Link href="/recommend?tab=books" className="block px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 text-[14px] font-bold" style={{ color: "var(--text-main)" }}>추천 도서</Link>
              <Link href="/recommend?tab=videos" className="block px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 text-[14px] font-bold" style={{ color: "var(--text-main)" }}>추천 영상</Link>
            </div>
          </div>
        </div>

        {/* 햄버거 버튼 (모바일/전체메뉴용) */}
        <button onClick={() => setIsFullMenuOpen(!isFullMenuOpen)} className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none z-[310]">
          <div className={`w-6 h-0.5 transition-all ${isFullMenuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
          <div className={`w-6 h-0.5 transition-all ${isFullMenuOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
          <div className={`w-6 h-0.5 transition-all ${isFullMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
        </button>
      </div>

      {/* 전체 메뉴 레이어 (모바일 & 확장 메뉴) */}
      <AnimatePresence>
        {isFullMenuOpen && (
          <>
            {/* 배경 흐림 처리 */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeMenu}
              className="fixed inset-0 bg-black/20 dark:bg-black/60 z-[240] backdrop-blur-[4px]" />

            {/* 메뉴판 */}
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 top-16 z-[250] overflow-hidden shadow-2xl border-b"
              style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>

              <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 p-10">
                {/* 뉴스 섹션 */}
                <div>
                  <div className="text-red-600 font-black text-xs mb-4 border-b border-red-600 pb-2 uppercase tracking-widest">뉴스</div>
                  <div className="flex flex-col gap-3 font-bold text-[14px]">
                    <Link href="/news" onClick={closeMenu} className="hover:text-red-600 transition-colors" style={{ color: "var(--text-main)" }}>뉴스 홈</Link>
                    {newsCategories.map(cat => (
                      <a key={cat.id} href={`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(cat.query)}`}
                        target="_blank" onClick={closeMenu} className="hover:text-red-600 transition-colors font-medium" style={{ color: "var(--text-main)" }}>{cat.name}</a>
                    ))}
                  </div>
                </div>

                {/* 증권 섹션 */}
                <div>
                  <div className="text-red-600 font-black text-xs mb-4 border-b border-red-600 pb-2 uppercase tracking-widest">증권</div>
                  <div className="flex flex-col gap-3 font-bold text-[14px]">
                    <Link href="/stock?tab=list" onClick={closeMenu} className="hover:text-red-600 transition-colors" style={{ color: "var(--text-main)" }}>증권사 목록</Link>
                    <Link href="/stock?tab=guide" onClick={closeMenu} className="hover:text-red-600 transition-colors" style={{ color: "var(--text-main)" }}>계좌 가이드</Link>
                  </div>
                </div>

                {/* 용어사전 섹션 */}
                <div>
                  <div className="text-red-600 font-black text-xs mb-4 border-b border-red-600 pb-2 uppercase tracking-widest">용어사전</div>
                  <div className="flex flex-col gap-3 font-bold text-[14px]">
                    {dictCategories.map(cat => (
                      <Link key={cat} href={`/dictionary?cat=${encodeURIComponent(cat)}`} onClick={closeMenu} className="hover:text-red-600 transition-colors font-medium" style={{ color: "var(--text-main)" }}>{cat}</Link>
                    ))}
                  </div>
                </div>

                {/* 추천 섹션 */}
                <div>
                  <div className="text-red-600 font-black text-xs mb-4 border-b border-red-600 pb-2 uppercase tracking-widest">추천</div>
                  <div className="flex flex-col gap-3 font-bold text-[14px]">
                    {recommendTabs.map(tab => (
                      <Link key={tab.slug} href={`/recommend?tab=${tab.slug}`} onClick={closeMenu} className="hover:text-red-600 transition-colors" style={{ color: "var(--text-main)" }}>{tab.name}</Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}