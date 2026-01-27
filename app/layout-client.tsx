"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import DarkModeToggle from "@/components/DarkModeToggle";

// --- 타입 정의 ---
interface MenuItem {
  name: string;
  href?: string;
  query?: string;
}

interface MenuData {
  news: MenuItem[];
  stock: MenuItem[];
  dict: string[];
  recommend: MenuItem[];
  guide: MenuItem[]; // 투자가이드 섹션
}

// --- 데이터 ---
const menuData: MenuData = {
  news: [
    { name: "시장지표", query: "시장지표" },
    { name: "금리이슈", query: "금리전망" },
    { name: "주식뉴스", query: "주식시황" },
    { name: "가상자산", query: "비트코인" },
    { name: "부동산", query: "부동산전망" },
    { name: "해외경제", query: "글로벌경제" },
  ],
  stock: [
    { name: "증권사 목록", href: "/stock?tab=list" },
    { name: "계좌 가이드", href: "/stock?tab=guide" },
  ],
  dict: ["전체", "주식기초", "재무제표", "거시경제", "투자전략"],
  recommend: [
    { name: "추천 도서", href: "/recommend?tab=books" },
    { name: "추천 영상", href: "/recommend?tab=videos" },
  ],
  guide: [
    { name: "투자가이드 홈", href: "/guide" }
  ]
};

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      <nav className="h-16 border-b flex items-center justify-between px-4 md:px-8 sticky top-0 z-[300] shadow-sm" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
        <div className="flex items-center gap-4">
          <Link href="/" className="font-black text-xl md:text-2xl text-red-600 tracking-tighter italic">BULL'S EYE</Link>
          <DarkModeToggle />
        </div>

        {/* 데스크탑 메뉴 영역 */}
        <div className="flex items-center h-full gap-6 font-black text-[14px]">
          <div className="hidden lg:flex gap-6 h-full items-center">
            {(Object.keys(menuData) as Array<keyof MenuData>).map((key) => {
              // 메뉴 이름 매핑
              const menuNames = { news: '뉴스', stock: '증권', dict: '용어사전', recommend: '추천', guide: '투자가이드' };
              const displayName = menuNames[key];

              return (
                <div 
                  key={key} 
                  className="relative flex items-center h-full px-2" 
                  onMouseEnter={() => setOpenDropdown(key)} 
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {/* 모든 메뉴에 화살표(▼) 추가 및 폰트 통일 */}
                  <div className="flex items-center gap-1 cursor-pointer hover:text-red-600 transition-colors">
                    {key === 'guide' ? (
                      <Link href="/guide">{displayName}</Link>
                    ) : (
                      <span>{displayName}</span>
                    )}
                    <span className={`text-[10px] transition-transform duration-200 ${openDropdown === key ? 'rotate-180' : ''}`}>▼</span>
                  </div>

                  <AnimatePresence>
                    {openDropdown === key && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: 5 }} 
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                      >
                        <div className="w-40 rounded-2xl border shadow-2xl p-2 bg-[var(--card-bg)]" style={{ borderColor: "var(--border-color)" }}>
                          {(menuData[key] as any[]).map((item: any) => {
                            const label = typeof item === 'string' ? item : item.name;
                            const href = typeof item === 'string' ? `/dictionary?cat=${item}` : item.href;
                            
                            return item.query ? (
                              <a key={label} href={`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(item.query)}`} target="_blank" className="block px-4 py-2 rounded-xl text-[13px] hover:text-red-600 transition font-bold" style={{ color: "var(--text-main)" }}>{label}</a>
                            ) : (
                              <Link key={label} href={href || "/"} onClick={closeMenu} className="block px-4 py-2 rounded-xl text-[13px] hover:text-red-600 transition font-bold" style={{ color: "var(--text-main)" }}>{label}</Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 z-[310] relative">
            <div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
            <div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
            <div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
          </button>
        </div>
      </nav>

      {/* 모바일/햄버거 전체 메뉴 레이어 */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 z-[250] shadow-2xl overflow-hidden border-b-2"
            style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)", top: '64px' }}
          >
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 p-10">
              {(Object.entries(menuData) as [keyof MenuData, (MenuItem[] | string[])][]).map(([key, items]) => {
                const menuNames = { news: '뉴스', stock: '증권', dict: '용어사전', recommend: '추천', guide: '투자가이드' };
                return (
                  <div key={key}>
                    <div className="text-red-600 font-black text-[11px] mb-4 uppercase tracking-widest border-b pb-1" style={{ borderColor: "var(--border-color)" }}>
                      {menuNames[key]}
                    </div>
                    <div className="flex flex-col gap-2.5">
                      {items.map((item: any) => {
                        const label = typeof item === 'string' ? item : item.name;
                        const href = typeof item === 'string' ? `/dictionary?cat=${item}` : (item.href || "/");
                        return (
                          <Link 
                            key={label} 
                            href={href} 
                            onClick={closeMenu} 
                            className="text-[14px] font-bold hover:text-red-600 transition-colors"
                          >
                            {label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-grow">
        {children}
      </div>

      <footer className="py-16 border-t-2 text-center" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
        <div className="font-black text-2xl text-red-600 mb-4 italic">BULL'S EYE</div>
        <p className="text-[10px] font-bold opacity-30 tracking-[0.4em]">© 2026 BULL'S EYE. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}