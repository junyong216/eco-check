"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import DarkModeToggle from "@/components/DarkModeToggle";

const newsCategories = [
  { id: "market", name: "시장지표", query: "시장지표" },
  { id: "interest", name: "금리이슈", query: "금리전망" },
  { id: "stock", name: "주식뉴스", query: "주식시황" },
  { id: "crypto", name: "가상자산", query: "비트코인" },
  { id: "realestate", name: "부동산", query: "부동산전망" },
  { id: "global", name: "해외경제", query: "글로벌경제" },
];

const dictCategories = ["전체", "주식기초", "재무제표", "거시경제", "투자전략", "미국주식 / 해외투자", "지수 / 상품"];

const recommendTabs = [
  { name: "추천 도서", slug: "books" },
  { name: "추천 영상", slug: "videos" }
];

export default function Navbar() {
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="h-16 border-b flex items-center justify-between px-4 md:px-8 sticky top-0 z-[300] transition-colors shadow-sm"
      style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>

      <div className="flex items-center gap-4">
        <Link href="/" className="font-black text-xl md:text-2xl text-red-600 tracking-tighter italic">BULL'S EYE</Link>
        <DarkModeToggle />
      </div>

      <div className="flex items-center h-full font-black text-[15px]">
        <div className="hidden lg:flex items-center h-full gap-8 mr-6">
          {/* 뉴스 드롭다운 */}
          <div className="relative h-full flex items-center" onMouseEnter={() => setOpenDropdown('news')} onMouseLeave={() => setOpenDropdown(null)}>
            <span className="flex items-center gap-1 cursor-pointer transition-colors" style={{ color: openDropdown === 'news' ? '#dc2626' : 'var(--text-main)' }}>
              뉴스 <span className={`text-[10px] transition-transform ${openDropdown === 'news' ? 'rotate-180' : ''}`}>▼</span>
            </span>
            <div className={`absolute top-16 left-1/2 -translate-x-1/2 w-44 py-2 rounded-2xl border shadow-2xl transition-all ${openDropdown === 'news' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
              style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
              <Link href="/news" className="block px-5 py-2.5 hover:text-red-600 text-[13px] font-bold" style={{ color: "var(--text-main)" }}>뉴스 홈</Link>
              {newsCategories.map(cat => (
                <a key={cat.id} href={`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(cat.query)}`} target="_blank" className="block px-5 py-2.5 hover:text-red-600 text-[13px]" style={{ color: "var(--text-main)" }}>{cat.name}</a>
              ))}
            </div>
          </div>

          {/* 증권 드롭다운 */}
          <div className="relative h-full flex items-center" onMouseEnter={() => setOpenDropdown('stock')} onMouseLeave={() => setOpenDropdown(null)}>
            <span className="flex items-center gap-1 cursor-pointer transition-colors" style={{ color: openDropdown === 'stock' ? '#dc2626' : 'var(--text-main)' }}>
              증권 <span className={`text-[10px] transition-transform ${openDropdown === 'stock' ? 'rotate-180' : ''}`}>▼</span>
            </span>
            <div className={`absolute top-16 left-1/2 -translate-x-1/2 w-44 py-2 rounded-2xl border shadow-2xl transition-all ${openDropdown === 'stock' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
              style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
              <Link href="/stock?tab=list" className="block px-5 py-2.5 hover:text-red-600 text-[13px] font-bold" style={{ color: "var(--text-main)" }}>증권사 목록</Link>
              <Link href="/stock?tab=guide" className="block px-5 py-2.5 hover:text-red-600 text-[13px] font-bold" style={{ color: "var(--text-main)" }}>계좌 가이드</Link>
            </div>
          </div>

          {/* 용어사전 드롭다운 */}
          <div className="relative h-full flex items-center" onMouseEnter={() => setOpenDropdown('dict')} onMouseLeave={() => setOpenDropdown(null)}>
            <span className="flex items-center gap-1 cursor-pointer transition-colors" style={{ color: openDropdown === 'dict' ? '#dc2626' : 'var(--text-main)' }}>
              용어사전 <span className={`text-[10px] transition-transform ${openDropdown === 'dict' ? 'rotate-180' : ''}`}>▼</span>
            </span>
            <div className={`absolute top-16 left-1/2 -translate-x-1/2 w-44 py-2 rounded-2xl border shadow-2xl transition-all ${openDropdown === 'dict' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
              style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
              {dictCategories.map(cat => (
                <Link key={cat} href={`/dictionary?cat=${cat}`} className="block px-5 py-2.5 hover:text-red-600 text-[13px] whitespace-nowrap" style={{ color: "var(--text-main)" }}>{cat}</Link>
              ))}
            </div>
          </div>

          {/* 추천 드롭다운 */}
          <div className="relative h-full flex items-center" onMouseEnter={() => setOpenDropdown('recommend')} onMouseLeave={() => setOpenDropdown(null)}>
            <span className="flex items-center gap-1 cursor-pointer transition-colors" style={{ color: openDropdown === 'recommend' ? '#dc2626' : 'var(--text-main)' }}>
              추천 <span className={`text-[10px] transition-transform ${openDropdown === 'recommend' ? 'rotate-180' : ''}`}>▼</span>
            </span>
            <div className={`absolute top-16 left-1/2 -translate-x-1/2 w-44 py-2 rounded-2xl border shadow-2xl transition-all ${openDropdown === 'recommend' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
              style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
              <Link href="/recommend?tab=books" className="block px-5 py-2.5 hover:text-red-600 text-[13px] font-bold" style={{ color: "var(--text-main)" }}>추천 도서</Link>
              <Link href="/recommend?tab=videos" className="block px-5 py-2.5 hover:text-red-600 text-[13px] font-bold" style={{ color: "var(--text-main)" }}>추천 영상</Link>
            </div>
          </div>
        </div>

        {/* 햄버거 버튼 */}
        <button onClick={() => setIsFullMenuOpen(!isFullMenuOpen)} className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none z-[310]">
          <div className={`w-6 h-0.5 transition-all ${isFullMenuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
          <div className={`w-6 h-0.5 transition-all ${isFullMenuOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
          <div className={`w-6 h-0.5 transition-all ${isFullMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
        </button>
      </div>

      {/* 전체 메뉴 레이어 */}
      <AnimatePresence>
        {isFullMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsFullMenuOpen(false)}
              className="fixed inset-0 bg-black/20 dark:bg-black/50 z-[240] backdrop-blur-[2px]" />
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="fixed inset-x-0 top-16 z-[250] overflow-hidden shadow-2xl border-b"
              style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
              <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 p-10 font-bold">
                {/* 각 섹션 반복... (뉴스, 증권, 용어사전, 추천) */}
                <div>
                  <div className="text-red-600 font-black text-xs mb-4 border-b border-red-600 pb-2">뉴스</div>
                  <div className="flex flex-col gap-3 text-[14px]">
                    <Link href="/news" onClick={() => setIsFullMenuOpen(false)} style={{ color: "var(--text-main)" }}>뉴스 홈</Link>
                    {newsCategories.map(cat => <a key={cat.id} href={`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(cat.query)}`} target="_blank" style={{ color: "var(--text-main)" }}>{cat.name}</a>)}
                  </div>
                </div>
                <div>
                  <div className="text-red-600 font-black text-xs mb-4 border-b border-red-600 pb-2">증권</div>
                  <div className="flex flex-col gap-3 text-[14px]">
                    <Link href="/stock?tab=list" onClick={() => setIsFullMenuOpen(false)} style={{ color: "var(--text-main)" }}>증권사 목록</Link>
                    <Link href="/stock?tab=guide" onClick={() => setIsFullMenuOpen(false)} style={{ color: "var(--text-main)" }}>계좌 가이드</Link>
                  </div>
                </div>
                <div>
                  <div className="text-red-600 font-black text-xs mb-4 border-b border-red-600 pb-2">용어사전</div>
                  <div className="flex flex-col gap-3 text-[14px]">
                    {dictCategories.map(cat => <Link key={cat} href={`/dictionary?cat=${cat}`} onClick={() => setIsFullMenuOpen(false)} style={{ color: "var(--text-main)" }}>{cat}</Link>)}
                  </div>
                </div>
                <div>
                  <div className="text-red-600 font-black text-xs mb-4 border-b border-red-600 pb-2">추천</div>
                  <div className="flex flex-col gap-3 text-[14px]">
                    {recommendTabs.map(tab => <Link key={tab.slug} href={`/recommend?tab=${tab.slug}`} onClick={() => setIsFullMenuOpen(false)} style={{ color: "var(--text-main)" }}>{tab.name}</Link>)}
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