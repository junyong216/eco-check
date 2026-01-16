"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import DarkModeToggle from "@/components/DarkModeToggle";

// --- 메뉴 데이터 ---
const menuData = {
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
  ]
};

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" }
} as const;

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } }
} as const;

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [exchangeRate, setExchangeRate] = useState({ rate: "---", change: "+0.0" });
  const [fearGreed, setFearGreed] = useState({ value: 0, label: "" });

  useEffect(() => {
    fetchMarketData();
  }, []);

  const fetchMarketData = async () => {
    setIsLoading(true);
    try {
      const exResponse = await fetch("https://open.er-api.com/v6/latest/USD");
      const exData = await exResponse.json();
      const krwRate = exData.rates.KRW.toFixed(1);

      const fgResponse = await fetch("https://api.alternative.me/fng/");
      const fgData = await fgResponse.json();
      const value = parseInt(fgData.data[0].value);
      
      let label = "중립";
      if (value <= 25) label = "극단적 공포";
      else if (value <= 45) label = "공포";
      else if (value <= 55) label = "중립";
      else if (value <= 75) label = "탐욕";
      else label = "극단적 탐욕";

      setExchangeRate({ rate: krwRate, change: "+2.5" });
      setFearGreed({ value: value, label: label });
    } catch (error) {
      console.error("데이터 로드 실패:", error);
      setExchangeRate({ rate: "연결실패", change: "0" });
    } finally {
      setIsLoading(false);
    }
  };

  const executeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    window.open(`https://search.naver.com/search.naver?query=${encodeURIComponent(searchTerm + " 주가")}`, "_blank");
  };

  return (
    <div className="min-h-screen font-sans overflow-x-hidden transition-colors duration-300" 
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      
      {/* --- 네비게이션 바 --- */}
      <nav className="h-16 border-b flex items-center justify-between px-4 md:px-8 sticky top-0 z-[100] transition-colors shadow-sm" 
        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
        
        <div className="flex items-center gap-4">
          <Link href="/" className="font-black text-xl md:text-2xl text-blue-600 tracking-tighter">ECO_CHECK</Link>
          <DarkModeToggle />
        </div>

        <div className="flex items-center h-full gap-2 md:gap-6">
          <div className="hidden lg:flex gap-6 text-[15px] font-black h-full">
            {/* 뉴스 */}
            <div className="relative group flex items-center h-full px-2">
              <Link href="/news" className="group-hover:text-blue-600 flex items-center gap-1">뉴스 <span className="text-[10px] opacity-40 group-hover:rotate-180 transition-transform">▼</span></Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all pt-2">
                <div className="w-44 rounded-2xl border shadow-2xl p-2 bg-white dark:bg-slate-900" style={{ borderColor: "var(--border-color)" }}>
                  {menuData.news.map((item) => (
                    <a key={item.name} href={`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(item.query)}`} target="_blank" className="block px-4 py-2.5 rounded-xl text-[13px] hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 transition" style={{ color: "var(--text-main)" }}>{item.name}</a>
                  ))}
                </div>
              </div>
            </div>
            {/* 증권 */}
            <div className="relative group flex items-center h-full px-2">
              <Link href="/stock" className="group-hover:text-blue-600 flex items-center gap-1">증권 <span className="text-[10px] opacity-40 group-hover:rotate-180 transition-transform">▼</span></Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all pt-2">
                <div className="w-40 rounded-2xl border shadow-2xl p-2 bg-white dark:bg-slate-900" style={{ borderColor: "var(--border-color)" }}>
                  {menuData.stock.map((item) => <Link key={item.name} href={item.href} className="block px-4 py-2.5 rounded-xl text-[13px] hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 transition" style={{ color: "var(--text-main)" }}>{item.name}</Link>)}
                </div>
              </div>
            </div>
            {/* 용어사전 */}
            <div className="relative group flex items-center h-full px-2">
              <Link href="/dictionary" className="group-hover:text-blue-600 flex items-center gap-1">용어사전 <span className="text-[10px] opacity-40 group-hover:rotate-180 transition-transform">▼</span></Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all pt-2">
                <div className="w-40 rounded-2xl border shadow-2xl p-2 bg-white dark:bg-slate-900" style={{ borderColor: "var(--border-color)" }}>
                  {menuData.dict.map((cat) => <Link key={cat} href={`/dictionary?cat=${cat}`} className="block px-4 py-2.5 rounded-xl text-[13px] hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 transition" style={{ color: "var(--text-main)" }}>{cat}</Link>)}
                </div>
              </div>
            </div>
            {/* 추천 */}
            <div className="relative group flex items-center h-full px-2">
              <Link href="/recommend" className="group-hover:text-blue-600 flex items-center gap-1">추천 <span className="text-[10px] opacity-40 group-hover:rotate-180 transition-transform">▼</span></Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all pt-2">
                <div className="w-40 rounded-2xl border shadow-2xl p-2 bg-white dark:bg-slate-900" style={{ borderColor: "var(--border-color)" }}>
                  {menuData.recommend.map((item) => <Link key={item.name} href={item.href} className="block px-4 py-2.5 rounded-xl text-[13px] hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 transition" style={{ color: "var(--text-main)" }}>{item.name}</Link>)}
                </div>
              </div>
            </div>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none z-[110]">
            <div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
            <div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
            <div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
          </button>
        </div>
      </nav>

      {/* --- 모바일 메뉴 --- */}
      <div className={`fixed inset-x-0 transition-all duration-500 ease-in-out overflow-hidden shadow-2xl z-[90] ${isMenuOpen ? 'max-h-screen border-b opacity-100' : 'max-h-0 opacity-0'}`}
           style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)", top: '64px' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 p-10">
          <div>
            <div className="text-blue-600 font-black text-xs mb-4 uppercase tracking-widest">뉴스</div>
            <div className="flex flex-col gap-3">
              {menuData.news.map((item) => <a key={item.name} href={`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(item.query)}`} target="_blank" className="text-[14px] font-bold" style={{ color: "var(--text-main)" }}>{item.name}</a>)}
            </div>
          </div>
          <div>
            <div className="text-blue-600 font-black text-xs mb-4 uppercase tracking-widest">증권</div>
            <div className="flex flex-col gap-3">
              {menuData.stock.map((item) => <Link key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)} className="text-[14px] font-bold" style={{ color: "var(--text-main)" }}>{item.name}</Link>)}
            </div>
          </div>
          <div>
            <div className="text-blue-600 font-black text-xs mb-4 uppercase tracking-widest">용어사전</div>
            <div className="flex flex-col gap-3">
              {menuData.dict.map((cat) => <Link key={cat} href={`/dictionary?cat=${cat}`} onClick={() => setIsMenuOpen(false)} className="text-[14px] font-bold" style={{ color: "var(--text-main)" }}>{cat}</Link>)}
            </div>
          </div>
          <div>
            <div className="text-blue-600 font-black text-xs mb-4 uppercase tracking-widest">추천</div>
            <div className="flex flex-col gap-3">
              {menuData.recommend.map((item) => <Link key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)} className="text-[14px] font-bold" style={{ color: "var(--text-main)" }}>{item.name}</Link>)}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-24">
        {/* --- 히어로 이미지 섹션 (흐림 및 모바일 최적화) --- */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full h-[450px] md:h-[600px] rounded-[30px] md:rounded-[60px] overflow-hidden mb-12 md:mb-28 shadow-2xl group"
        >
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
            style={{ 
              backgroundImage: `url('/hero-bg.png')`,
              filter: "blur(8px) brightness(0.5)" 
            }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-black text-white mb-4 md:mb-6 tracking-tighter leading-[1.1] drop-shadow-2xl"
            >
              성공적인 투자를 위한<br/>
              <span className="text-blue-500 inline-block mt-2">스마트 경제 지표</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-white/80 font-bold text-sm md:text-xl max-w-[280px] md:max-w-xl drop-shadow-lg leading-relaxed"
            >
              실시간 데이터로 포착하는<br className="md:hidden" /> 금융의 흐름, ECO_CHECK
            </motion.p>
          </div>
        </motion.section>

        {/* --- 검색창 섹션 --- */}
        <div className="max-w-2xl mx-auto mb-16 md:mb-28 px-2">
          <form onSubmit={executeSearch} className="relative group">
            <input type="text" placeholder="종목명 검색" className="w-full h-14 md:h-20 px-6 md:px-10 rounded-full border-2 focus:border-blue-500 shadow-xl transition-all outline-none text-sm md:text-base" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)", color: "var(--text-main)" }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <button type="submit" className="absolute right-2 top-2 bottom-2 px-5 md:px-10 bg-blue-600 text-white rounded-full font-black text-xs md:text-base hover:bg-blue-700 transition-colors">검색</button>
          </form>
        </div>

        {/* --- 실시간 데이터 지표 --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 md:mb-28">
          {isLoading ? (
            <div className="col-span-2 py-10 text-center font-black animate-pulse text-blue-600">데이터 로드 중...</div>
          ) : (
            <>
              <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="p-8 md:p-14 rounded-[32px] md:rounded-[48px] border shadow-sm hover:shadow-xl transition-all" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                <h3 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-4 md:mb-8">USD / KRW</h3>
                <div className="text-4xl md:text-8xl font-black text-blue-600 tracking-tighter">{exchangeRate.rate}<span className="text-lg ml-2 opacity-30" style={{ color: "var(--text-main)" }}>KRW</span></div>
              </motion.div>
              <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="p-8 md:p-14 rounded-[32px] md:rounded-[48px] border shadow-sm hover:shadow-xl transition-all" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                <h3 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-4 md:mb-8">FEAR & GREED</h3>
                <div className="flex items-baseline gap-3"><span className="text-4xl md:text-8xl font-black tracking-tighter">{fearGreed.value}</span><span className="text-lg md:text-3xl font-black text-orange-500 italic uppercase">{fearGreed.label}</span></div>
              </motion.div>
            </>
          )}
        </div>

        {/* --- 퀵메뉴 --- */}
        <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-16 md:mt-28">
          {['news', 'stock', 'dictionary', 'recommend'].map((path) => (
            <motion.div key={path} variants={fadeInUp}>
              <Link href={`/${path}`} className="block py-6 md:py-8 rounded-2xl border text-center font-black text-sm md:text-lg hover:border-blue-500 hover:text-blue-600 hover:shadow-lg transition-all uppercase" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                {path === 'dictionary' ? '용어사전' : path === 'recommend' ? '추천' : path === 'news' ? '뉴스' : '증권'}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </main>
      
      {/* --- 명언 섹션 --- */}
      <motion.section 
        variants={fadeInUp}
        initial="initial"
        whileInView="whileInView" 
        className="py-16 md:py-24 border-y text-center relative" 
        style={{ borderColor: "var(--border-color)" }}
      >
        <p className="text-lg md:text-4xl font-black leading-snug mb-6 px-6" style={{ color: "var(--text-main)" }}>
          "투자의 제1원칙은<br className="md:hidden"/> 결코 돈을 잃지 않는 것이다.<br/> 제2원칙은 제1원칙을<br className="md:hidden"/> 잊지 않는 것이다."
        </p>
        <span className="font-black text-xs md:text-sm uppercase tracking-widest text-blue-600">Warren Buffett</span>
      </motion.section>

      {/* --- 푸터 --- */}
      <footer className="py-12 md:py-20 border-t" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="font-black text-xl text-blue-600 mb-6 tracking-tighter">ECO_CHECK</div>
          <div className="flex justify-center gap-4 md:gap-6 mb-8 text-[11px] md:text-[13px] font-bold opacity-70">
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">개인정보 처리방침</Link>
            <Link href="/terms" className="hover:text-blue-600 transition-colors">이용약관</Link>
          </div>
          <p className="text-[9px] md:text-[10px] font-black tracking-[0.3em] opacity-30 uppercase">© 2026 ECO_CHECK. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}