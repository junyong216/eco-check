"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion"; // Framer Motion 추가
import DarkModeToggle from "@/components/DarkModeToggle";
import AdSense from "@/components/AdSense"; 

// --- 네비게이션용 데이터 ---
const newsCategories = [
  { id: "market", name: "시장지표", query: "시장지표" },
  { id: "interest", name: "금리이슈", query: "금리전망" },
  { id: "stock", name: "주식뉴스", query: "주식시황" },
  { id: "crypto", name: "가상자산", query: "비트코인" },
  { id: "realestate", name: "부동산", query: "부동산전망" },
  { id: "global", name: "해외경제", query: "글로벌경제" },
];
const dictionaryCategories = ["전체", "주식기초", "재무제표", "거시경제", "투자전략"];
const recommendTabs = [
  { name: "추천 도서", slug: "books" },
  { name: "추천 영상", slug: "videos" }
];

function DictionaryContent() {
  const searchParams = useSearchParams();
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("전체");

  // --- 용어 데이터 (기존 데이터 유지) ---
  const terms = [
    { category: "주식기초", word: "예수금", desc: "주식 거래를 위해 계좌에 넣어둔 현금입니다. 주식을 사기 전 대기 중인 돈이라고 보면 됩니다." },
    { category: "주식기초", word: "배당금", desc: "회사가 이익을 내서 주주들에게 그 결실을 나눠주는 현금 보너스입니다." },
    { category: "주식기초", word: "시가총액", desc: "주가에 총 발행 주식 수를 곱한 금액으로, 그 회사의 실제 시장 가치를 말합니다." },
    { category: "주식기초", word: "호가", desc: "주식을 팔거나 사고 싶은 가격을 시장에 미리 부르는 것을 말합니다." },
    { category: "재무제표", word: "PER", desc: "주가수익비율. 기업이 버는 돈에 비해 주가가 얼마나 높게 평가되었는지 보여주는 지표입니다." },
    { category: "재무제표", word: "ROE", desc: "자기자본이익률. 기업이 주주의 돈을 활용해 얼마나 효율적으로 이익을 냈는지 보여줍니다." },
    { category: "재무제표", word: "PBR", desc: "주가순자산비율. 주가가 기업이 가진 자산 가치에 비해 몇 배로 거래되는지 나타냅니다." },
    { category: "재무제표", word: "영업이익", desc: "기업이 순수하게 장사를 해서 남긴 이익입니다. 매출에서 모든 비용을 뺀 핵심 성적표입니다." },
    { category: "거시경제", word: "금리", desc: "돈의 가격입니다. 금리가 오르면 시장에 도는 돈이 줄어들어 보통 주가에는 악영향을 줍니다." },
    { category: "거시경제", word: "인플레이션", desc: "물가가 지속적으로 오르는 현상입니다. 내 돈의 구매력이 예전보다 낮아짐을 의미합니다." },
    { category: "거시경제", word: "환율", desc: "우리나라 돈과 다른 나라 돈의 교환 비율입니다. 수출입 기업의 이익에 직접적인 영향을 줍니다." },
    { category: "거시경제", word: "GDP", desc: "국내총생산. 일정 기간 동안 한 나라 안에서 만들어진 모든 서비스와 재화의 합계입니다." },
    { category: "투자전략", word: "분할매수", desc: "리스크를 줄이기 위해 주식을 한 번에 다 사지 않고, 여러 번에 나누어 담는 전략입니다." },
    { category: "투자전략", word: "포트폴리오", desc: "분산 투자를 위해 내 자산을 여러 종목이나 자산군(주식, 채권 등)에 나누어 담은 리스트입니다." },
    { category: "투자전략", word: "손절매", desc: "더 큰 손해를 막기 위해 내가 산 가격보다 낮은 가격이라도 과감히 주식을 파는 것입니다." },
    { category: "투자전략", word: "익절", desc: "수익이 난 상태에서 주식을 팔아 실제로 내 주머니에 이익을 확정 짓는 행위입니다." }
  ];

  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat && dictionaryCategories.includes(cat)) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  const filteredTerms = terms.filter(item => {
    const matchesSearch = item.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "전체" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen font-sans transition-colors duration-300" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      
      {/* --- 네비게이션 --- */}
      <nav className="h-16 border-b flex items-center justify-between px-4 md:px-8 sticky top-0 z-[300] shadow-sm transition-colors" 
           style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
        
        <div className="flex items-center gap-4">
          <Link href="/" className="font-black text-xl md:text-2xl text-red-600 tracking-tighter italic">BULL'S EYE</Link>
          <DarkModeToggle />
        </div>

        <div className="flex items-center h-full font-black text-[15px]">
          {/* [PC 메뉴] */}
          <div className="hidden md:flex items-center h-full gap-8 mr-6">
            <div className="relative h-full flex items-center group" onMouseEnter={() => setOpenDropdown('news')} onMouseLeave={() => setOpenDropdown(null)}>
              <button className="flex items-center gap-1 hover:text-red-600 transition-colors">
                뉴스 <span className={`text-[10px] transition-transform duration-300 ${openDropdown === 'news' ? 'rotate-180' : ''}`}>▼</span>
              </button>
              <div className={`absolute top-16 left-0 w-44 py-2 rounded-xl shadow-xl border bg-[var(--card-bg)] border-[var(--border-color)] transition-all ${openDropdown === 'news' ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}>
                {newsCategories.map(cat => (
                  <a key={cat.id} href={`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(cat.query)}`} target="_blank" className="block px-5 py-2 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 text-[13px]"> {cat.name}</a>
                ))}
              </div>
            </div>

            <div className="relative h-full flex items-center group" onMouseEnter={() => setOpenDropdown('stock')} onMouseLeave={() => setOpenDropdown(null)}>
              <button className="flex items-center gap-1 hover:text-red-600 transition-colors">
                증권 <span className={`text-[10px] transition-transform duration-300 ${openDropdown === 'stock' ? 'rotate-180' : ''}`}>▼</span>
              </button>
              <div className={`absolute top-16 left-0 w-40 py-2 rounded-xl shadow-xl border bg-[var(--card-bg)] border-[var(--border-color)] transition-all ${openDropdown === 'stock' ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}>
                <Link href="/stock?tab=list" className="block px-5 py-2 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 text-[13px]">증권사 목록</Link>
                <Link href="/stock?tab=guide" className="block px-5 py-2 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 text-[13px]">계좌 가이드</Link>
              </div>
            </div>

            <div className="relative h-full flex items-center group" onMouseEnter={() => setOpenDropdown('dict')} onMouseLeave={() => setOpenDropdown(null)}>
              <button className="flex items-center gap-1 text-red-600">
                용어사전 <span className={`text-[10px] transition-transform duration-300 ${openDropdown === 'dict' ? 'rotate-180' : ''}`}>▼</span>
              </button>
              <div className={`absolute top-16 left-0 w-40 py-2 rounded-xl shadow-xl border bg-[var(--card-bg)] border-[var(--border-color)] transition-all ${openDropdown === 'dict' ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}>
                {dictionaryCategories.map(cat => (
                  <Link key={cat} href={`/dictionary?cat=${cat}`} className="block px-5 py-2 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 text-[13px]">{cat}</Link>
                ))}
              </div>
            </div>

            <div className="relative h-full flex items-center group" onMouseEnter={() => setOpenDropdown('recommend')} onMouseLeave={() => setOpenDropdown(null)}>
              <button className="flex items-center gap-1 hover:text-red-600 transition-colors">
                추천 <span className={`text-[10px] transition-transform duration-300 ${openDropdown === 'recommend' ? 'rotate-180' : ''}`}>▼</span>
              </button>
              <div className={`absolute top-16 right-0 w-40 py-2 rounded-xl shadow-xl border bg-[var(--card-bg)] border-[var(--border-color)] transition-all ${openDropdown === 'recommend' ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}>
                {recommendTabs.map(tab => (
                  <Link key={tab.slug} href={`/recommend?tab=${tab.slug}`} className="block px-5 py-2 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 text-[13px]">{tab.name}</Link>
                ))}
              </div>
            </div>
          </div>

          <button onClick={() => setIsFullMenuOpen(!isFullMenuOpen)} className="p-2 hover:text-red-600 transition-colors z-[310]">
             <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
               {isFullMenuOpen ? <path d="M18 6L6 18M6 6l12 12"/> : <><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></>}
             </svg>
          </button>
        </div>

        {/* --- 전체 메뉴 (수정됨: height auto 적용) --- */}
        <AnimatePresence>
          {isFullMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 top-16 z-[250] overflow-hidden bg-[var(--card-bg)] border-b border-[var(--border-color)] shadow-2xl"
            >
              <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 p-8 md:p-10 font-bold">
                <div>
                  <div className="text-red-600 text-xs mb-4 uppercase tracking-widest border-b pb-2">뉴스</div>
                  <div className="flex flex-col gap-3">
                    {newsCategories.map(cat => (
                      <a key={cat.id} href={`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(cat.query)}`} target="_blank" className="text-[15px] hover:text-red-600" style={{ color: "var(--text-main)" }}>{cat.name}</a>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-red-600 text-xs mb-4 uppercase tracking-widest border-b pb-2">증권</div>
                  <div className="flex flex-col gap-3 text-[15px]">
                    <Link href="/stock?tab=list" onClick={() => setIsFullMenuOpen(false)} className="hover:text-red-600" style={{ color: "var(--text-main)" }}>증권사 목록</Link>
                    <Link href="/stock?tab=guide" onClick={() => setIsFullMenuOpen(false)} className="hover:text-red-600" style={{ color: "var(--text-main)" }}>계좌 가이드</Link>
                  </div>
                </div>
                <div>
                  <div className="text-red-600 text-xs mb-4 uppercase tracking-widest border-b pb-2">용어사전</div>
                  <div className="flex flex-col gap-3 text-[15px]">
                    {dictionaryCategories.map(cat => (
                      <Link key={cat} href={`/dictionary?cat=${cat}`} onClick={() => setIsFullMenuOpen(false)} className="hover:text-red-600" style={{ color: "var(--text-main)" }}>{cat}</Link>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-red-600 text-xs mb-4 uppercase tracking-widest border-b pb-2">추천</div>
                  <div className="flex flex-col gap-3 text-[15px]">
                    {recommendTabs.map(tab => (
                      <Link key={tab.slug} href={`/recommend?tab=${tab.slug}`} onClick={() => setIsFullMenuOpen(false)} className="hover:text-red-600" style={{ color: "var(--text-main)" }}>{tab.name}</Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- 메인 콘텐츠 --- */}
      <main className="max-w-5xl mx-auto px-5 py-12 md:py-20">
        <header className="mb-16 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-black mb-10 tracking-tight italic" style={{ color: "var(--text-main)" }}>Bull's Dictionary</h1>
          <div className="relative max-w-2xl mx-auto md:mx-0 group">
            <input 
              type="text" 
              placeholder="투자 용어를 검색하세요 (예: PER, 금리)" 
              className="w-full h-16 md:h-20 px-8 rounded-full border-2 focus:border-red-600 shadow-xl outline-none text-base font-bold transition-all" 
              style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)", color: "var(--text-main)" }} 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>

          <div className="mt-12 mb-10">
            <AdSense slot="1122334455" format="fluid" />
          </div>

          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {dictionaryCategories.map((cat) => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)} 
                className={`px-8 py-3 rounded-full font-black text-sm transition-all ${activeCategory === cat ? "bg-red-600 text-white shadow-xl scale-105" : "border opacity-60 hover:opacity-100"}`} 
                style={{ backgroundColor: activeCategory === cat ? "" : "var(--card-bg)", color: activeCategory === cat ? "#fff" : "var(--text-sub)", borderColor: "var(--border-color)" }}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTerms.map((item, i) => (
            <div key={i} className="p-8 rounded-[32px] border shadow-sm hover:shadow-2xl hover:border-red-500 transition-all group flex flex-col justify-between" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
              <div>
                <span className="text-[11px] font-black text-red-600 mb-4 block uppercase tracking-[0.2em]">{item.category}</span>
                <h4 className="font-black mb-4 text-2xl group-hover:text-red-600 transition-colors tracking-tight">{item.word}</h4>
                <p className="text-[15px] font-bold opacity-70 leading-relaxed break-keep" style={{ color: "var(--text-sub)" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <AdSense slot="5544332211" format="auto" />
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-32 opacity-30 font-black text-2xl italic uppercase tracking-tighter">No Results Found.</div>
        )}

        <div className="text-center mt-24">
          <Link href="/" className="inline-block px-14 py-6 bg-red-600 text-white rounded-full font-black text-xl hover:bg-red-700 transition shadow-2xl hover:-translate-y-1">홈으로 돌아가기</Link>
        </div>
      </main>

      <footer className="py-16 text-center text-[10px] font-black tracking-[0.5em] border-t uppercase opacity-40">© 2026 BULL'S EYE. ALL RIGHTS RESERVED.</footer>
    </div>
  );
}

export default function DictionaryPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-black animate-pulse text-red-600 italic">Targeting Data...</div>}>
      <DictionaryContent />
    </Suspense>
  );
}