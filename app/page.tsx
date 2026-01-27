"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AdSense from "@/components/AdSense";

// --- 애니메이션 설정 ---
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
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [exchangeRate, setExchangeRate] = useState({ rate: "---", change: "+0.0" });
  const [fearGreed, setFearGreed] = useState({ value: 0, label: "로딩 중" });
  const [isGuideFirst, setIsGuideFirst] = useState(false);

  useEffect(() => {
    fetchMarketData();
    // 뉴스레터/가이드 우선순위 설정 반영
    const savedSetting = localStorage.getItem("newsLetter") === "true";
    setIsGuideFirst(savedSetting);
  }, []);

  const fetchMarketData = async () => {
    setIsLoading(true);
    try {
      // 1. 환율 데이터 (USD/KRW)
      const exResponse = await fetch("https://open.er-api.com/v6/latest/USD");
      const exData = await exResponse.json();
      const krwRate = exData.rates.KRW.toFixed(1);

      // 2. 공포 & 탐욕 지수
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

  // --- 메인 메뉴 버튼 동적 정렬 ---
  const baseButtons = [
    { id: 'news', label: '뉴스' },
    { id: 'stock', label: '증권' },
    { id: 'dictionary', label: '용어사전' },
    { id: 'recommend', label: '추천' },
    { id: 'guide', label: '투자가이드' }
  ];

  const sortedButtons = isGuideFirst
    ? [baseButtons.find(b => b.id === 'guide')!, ...baseButtons.filter(b => b.id !== 'guide')]
    : baseButtons;

  return (
    <div className="min-h-[100dvh] flex flex-col transition-colors duration-300" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-24 relative z-10">

        {/* 히어로 섹션 */}
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full h-[450px] md:h-[600px] rounded-[30px] md:rounded-[60px] overflow-hidden mb-12 md:mb-28 shadow-2xl group"
        >
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
            style={{ backgroundImage: `url('/hero-bg.png')`, filter: "blur(2px) brightness(0.4)" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 md:mb-6 tracking-tighter italic uppercase"
            >
              HIT THE <br />
              <span className="text-red-600 inline-block mt-2">Bull's Eye</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-white/80 font-bold text-sm md:text-xl max-w-[280px] md:max-w-xl drop-shadow-lg leading-relaxed"
            >
              차트를 꿰뚫는 황소의 통찰력으로<br className="md:hidden" /> 금융의 정곡을 찌르다
            </motion.p>
          </div>
        </motion.section>

        {/* 통합 검색창 */}
        <div className="max-w-2xl mx-auto mb-16 md:mb-28 px-2">
          <form onSubmit={executeSearch} className="relative group mb-6">
            <input
              type="text"
              placeholder="종목명 또는 지표 검색"
              className="w-full h-14 md:h-20 px-6 md:px-10 rounded-full border-2 focus:border-red-600 shadow-xl transition-all outline-none text-sm md:text-base font-bold"
              style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)", color: "var(--text-main)" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="absolute right-2 top-2 bottom-2 px-6 md:px-10 bg-red-600 text-white rounded-full font-black hover:bg-red-700 transition-all hover:scale-95">
              검색
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {["삼성전자", "엔비디아", "금리전망", "환율", "비트코인"].map((tag) => (
              <button
                key={tag}
                onClick={() => window.open(`https://search.naver.com/search.naver?query=${encodeURIComponent(tag + " 주가")}`, "_blank")}
                className="px-4 py-1.5 md:px-5 md:py-2 rounded-full border text-[12px] md:text-[13px] font-bold transition-all hover:border-red-600 hover:text-red-600"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)", color: "var(--text-sub)" }}
              >
                # {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 지표 데이터 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {isLoading ? (
            <div className="col-span-full py-20 text-center font-black animate-pulse text-red-600 uppercase italic">Targeting Market Data...</div>
          ) : (
            <>
              <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView"
                className="p-10 md:p-14 rounded-[40px] border-2 hover:border-red-600 transition-all group"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-6 opacity-60 group-hover:opacity-100">USD / KRW</h3>
                <div className="text-5xl md:text-7xl font-black text-red-600 tracking-tighter">
                  {exchangeRate.rate} <span className="text-lg opacity-30 italic" style={{ color: "var(--text-main)" }}>KRW</span>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView"
                className="p-10 md:p-14 rounded-[40px] border-2 hover:border-red-600 transition-all group relative"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-6 opacity-60 group-hover:opacity-100">Market Sentiment</h3>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl md:text-7xl font-black tracking-tighter">{fearGreed.value}</span>
                  <span className="text-xl md:text-3xl font-black text-red-500 italic uppercase underline decoration-4 decoration-red-200">{fearGreed.label}</span>
                </div>
              </motion.div>
            </>
          )}
        </div>

        <div className="my-10"><AdSense slot="1234567890" format="fluid" /></div>

        {/* 동적 정렬 메인 버튼 */}
        <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-20">
          {sortedButtons.map((item) => (
            <motion.div key={item.id} variants={fadeInUp}>
              <Link
                href={`/${item.id}`}
                className={`block py-8 rounded-[24px] border-2 text-center font-black text-base md:text-lg transition-all uppercase italic tracking-tighter ${item.id === 'guide' && isGuideFirst ? 'border-red-600 text-red-600 bg-red-50 dark:bg-red-900/10' : ''
                  } hover:border-red-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10`}
                style={{ backgroundColor: "var(--card-bg)", borderColor: item.id === 'guide' && isGuideFirst ? "#dc2626" : "var(--border-color)" }}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <AdSense slot="0987654321" />
      </main>

      {/* 워렌 버핏 명언 섹션 */}
      <motion.section variants={fadeInUp} initial="initial" whileInView="whileInView" className="py-24 border-y-2 text-center relative overflow-hidden" style={{ borderColor: "var(--border-color)" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[15rem] font-black opacity-[0.02] italic select-none pointer-events-none uppercase">Patience</div>
        <p className="relative z-10 text-xl md:text-4xl font-black leading-tight mb-8 px-6 italic tracking-tighter">
          "주식 시장은 인내심 없는 사람의 돈을<br /> 인내심 있는 사람에게 옮기는 정교한 도구이다."
        </p>
        <span className="relative z-10 font-black text-sm uppercase tracking-[0.5em] text-red-600">— Warren Buffett</span>
      </motion.section>

      {/* 푸터 */}
      <footer className="py-16 md:py-24 pb-[calc(env(safe-area-inset-bottom)+2rem)]" style={{ backgroundColor: "var(--card-bg)", borderTop: "2px solid var(--border-color)" }}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="font-black text-3xl text-red-600 mb-6 tracking-tighter italic uppercase">BULL'S EYE</div>
            <p className="text-sm font-bold opacity-70 leading-relaxed max-w-md">
              BULL'S EYE는 복잡한 금융 데이터를 한눈에 꿰뚫는 투자 가이드입니다. 데이터의 정곡을 찔러 귀하의 자산이 목표점에 도달하도록 지원합니다.
            </p>
          </div>
          <div className="md:text-right flex flex-col md:items-end gap-2">
            <div className="text-[10px] font-black uppercase tracking-widest text-red-600">Contact</div>
            <div className="text-lg font-black">운영자 정준용</div>
            <a href="mailto:jjyong3872@naver.com" className="font-black hover:text-red-600 transition-colors">jjyong3872@naver.com</a>
            <div className="flex gap-4 mt-4 text-xs font-black opacity-40 uppercase">
              <Link href="/privacy" className="hover:text-red-600 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-red-600 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
        <div className="text-center pt-8 border-t border-white/5 opacity-30 text-[10px] font-bold tracking-[0.4em]">
          © 2026 BULL'S EYE. TARGET YOUR WEALTH. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}