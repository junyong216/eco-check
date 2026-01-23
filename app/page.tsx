"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import DarkModeToggle from "@/components/DarkModeToggle";
import AdSense from "@/components/AdSense";

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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [exchangeRate, setExchangeRate] = useState({ rate: "---", change: "+0.0" });
  const [fearGreed, setFearGreed] = useState({ value: 0, label: "로딩 중" });

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
        
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-24 relative z-10">
        {/* 히어로 섹션 */}
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full h-[450px] md:h-[600px] rounded-[30px] md:rounded-[60px] overflow-hidden mb-12 md:mb-28 shadow-2xl group"
        >
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
            style={{
              backgroundImage: `url('/hero-bg.png')`,
              filter: "blur(4px) brightness(0.4)"
            }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 md:mb-6 tracking-tighter leading-[1.1] drop-shadow-2xl italic"
            >
              HIT THE <br />
              <span className="text-red-600 inline-block mt-2 uppercase">Bull's Eye</span>
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
            <button type="submit" className="absolute right-2 top-2 bottom-2 px-5 md:px-10 bg-red-600 text-white rounded-full font-black text-xs md:text-base hover:bg-red-700 transition-all hover:scale-95 active:scale-90">
              검색
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-2 md:gap-3 px-4">
            <span className="text-[11px] md:text-xs font-black uppercase tracking-widest opacity-40 mr-2 flex items-center" style={{ color: "var(--text-main)" }}>
              Trending:
            </span>
            {[
              { label: "삼성전자", query: "삼성전자 주가" },
              { label: "엔비디아", query: "엔비디아 주가" },
              { label: "금리전망", query: "미국 금리 전망" },
              { label: "환율", query: "원달러 환율" },
              { label: "비트코인", query: "비트코인 시세" },
            ].map((tag) => (
              <button
                key={tag.label}
                onClick={() => window.open(`https://search.naver.com/search.naver?query=${encodeURIComponent(tag.query)}`, "_blank")}
                className="px-4 py-1.5 md:px-5 md:py-2 rounded-full border text-[12px] md:text-[13px] font-bold transition-all hover:border-red-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
                style={{
                  backgroundColor: "var(--card-bg)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-sub)"
                }}
              >
                # {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* 지표 데이터 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 md:mb-20">
          {isLoading ? (
            <div className="col-span-2 py-20 text-center font-black animate-pulse text-red-600 uppercase tracking-widest italic">Targeting Market Data...</div>
          ) : (
            <>
              <motion.div
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                className="p-8 md:p-14 rounded-[32px] md:rounded-[48px] border-2 shadow-sm hover:shadow-2xl hover:border-red-600 transition-all group cursor-default"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}
              >
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-4 md:mb-8 text-red-600 group-hover:opacity-100 transition-opacity">Real-time USD / KRW</h3>
                <div className="text-5xl md:text-8xl font-black text-red-600 tracking-tighter group-hover:scale-105 transition-transform origin-left">
                  {exchangeRate.rate}
                  <span className="text-lg ml-2 opacity-30 italic" style={{ color: "var(--text-main)" }}>KRW</span>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                className="p-8 md:p-14 rounded-[32px] md:rounded-[48px] border-2 shadow-sm hover:shadow-2xl hover:border-red-600 transition-all group cursor-default relative" // relative 추가됨
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}
              >
                {/* 헤더 부분: 제목 + 물음표 아이콘 */}
                <div className="flex items-center gap-2 mb-4 md:mb-8">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 text-red-600 group-hover:opacity-100 transition-opacity">
                    Market Sentiment
                  </h3>

                  {/* 툴팁 컨테이너 */}
                  <div className="relative group/tooltip">
                    {/* 물음표 아이콘 버튼 */}
                    <div className="w-4 h-4 rounded-full border border-red-600/50 text-red-600 text-[10px] flex items-center justify-center font-bold cursor-help hover:bg-red-600 hover:text-white transition-all">
                      ?
                    </div>

                    {/* 실제 설명창 (Hover 시 나타남) */}
                    <div className="absolute bottom-full left-0 md:left-1/2 md:-translate-x-1/2 mb-3 w-64 p-5 rounded-[24px] shadow-2xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-[100] border backdrop-blur-md"
                      style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                      <p className="text-[13px] leading-relaxed font-bold break-keep" style={{ color: "var(--text-main)" }}>
                        <span className="text-red-600">[공포와 탐욕 지수]</span><br /><br />
                        0에 가까울수록 시장이 <span className="text-blue-500">겁에 질린 상태(매수 기회)</span>를, 100에 가까울수록 <span className="text-red-500">지나치게 낙관적인 상태(매도 주의)</span>를 의미합니다.
                      </p>
                      {/* 말풍선 꼬리 */}
                      <div className="absolute top-full left-4 md:left-1/2 md:-translate-x-1/2 border-8 border-transparent border-t-[var(--border-color)]" />
                    </div>
                  </div>
                </div>

                {/* 점수와 라벨 */}
                <div className="flex items-baseline gap-3 group-hover:scale-105 transition-transform origin-left">
                  <span className="text-5xl md:text-8xl font-black tracking-tighter">{fearGreed.value}</span>
                  <span className="text-xl md:text-3xl font-black text-red-500 italic uppercase underline decoration-4 decoration-red-200">
                    {fearGreed.label}
                  </span>
                </div>
              </motion.div>
            </>
          )}
        </div>

        <AdSense slot="1234567890" format="fluid" />

        <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-20">
          {[
            { id: 'news', label: '뉴스' },
            { id: 'stock', label: '증권' },
            { id: 'dictionary', label: '용어사전' },
            { id: 'recommend', label: '추천' }
          ].map((item) => (
            <motion.div key={item.id} variants={fadeInUp}>
              <Link href={`/${item.id}`} className="block py-8 md:py-12 rounded-[32px] border-2 text-center font-black text-lg md:text-xl hover:border-red-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 shadow-sm hover:shadow-xl transition-all uppercase italic tracking-tighter" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                {item.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <AdSense slot="0987654321" />
      </main>

      <motion.section variants={fadeInUp} initial="initial" whileInView="whileInView" className="py-24 md:py-32 border-y-2 text-center relative overflow-hidden" style={{ borderColor: "var(--border-color)" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[15rem] font-black opacity-[0.02] italic select-none pointer-events-none uppercase">Patience</div>
        <p className="relative z-10 text-xl md:text-5xl font-black leading-[1.3] mb-8 px-6 italic tracking-tighter" style={{ color: "var(--text-main)" }}>
          "주식 시장은 인내심 없는 사람의 돈을<br className="md:hidden" /> 인내심 있는 사람에게<br /> 옮기는 정교한 도구이다."
        </p>
        <span className="relative z-10 font-black text-sm md:text-base uppercase tracking-[0.5em] text-red-600">— Warren Buffett</span>
      </motion.section>

      <footer className="py-16 md:py-24 border-t-2" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start text-left md:text-left">
            <div>
              <div className="font-black text-3xl text-red-600 mb-6 tracking-tighter italic uppercase">BULL'S EYE</div>
              <p className="text-sm md:text-[15px] font-bold leading-relaxed opacity-70 mb-4 max-w-[520px]" style={{ color: "var(--text-main)" }}>
                BULL'S EYE는 복잡한 금융 데이터를 한눈에 꿰뚫는 투자 가이드입니다.
                실시간 시장 지표와 증권 정보, 용어 사전을 통해 올바른 투자를 돕고,
                데이터의 정곡을 찔러 자산이 목표(Bull's Eye)에 도달하도록 지원합니다.
              </p>
            </div>

            <div className="md:text-right flex flex-col md:items-end gap-1">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600 mb-1">Contact Us</div>

              {/* 이름: text-base/lg -> text-sm(14px)/base(16px) 로 한 단계 축소 */}
              <div className="text-sm md:text-base font-black" style={{ color: "var(--text-main)" }}>
                운영자 정준용
              </div>

              {/* 이메일: text-lg/xl -> text-sm(14px)/md(16px) 로 확실히 축소 */}
              <a href="mailto:jjyong3872@naver.com" className="text-sm md:text-base font-black hover:text-red-600 transition-colors break-all mb-3">
                jjyong3872@naver.com
              </a>

              <div className="flex gap-6 mt-1 text-[12px] font-black uppercase tracking-widest opacity-60">
                <Link href="/privacy" className="hover:text-red-600 transition-colors">개인정보 처리방침</Link>
                <Link href="/terms" className="hover:text-red-600 transition-colors">이용약관</Link>
              </div>
            </div>
          </div>

          <div className="border-t pt-10 text-center" style={{ borderColor: "var(--border-color)" }}>
            <p className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] opacity-30 uppercase">
              © 2026 BULL'S EYE. TARGET YOUR WEALTH. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}