"use client";

import { useState, useEffect, useRef } from "react"; // ✅ useRef 통합
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion"; // ✅ AnimatePresence 추가
import AdSense from "@/components/AdSense";

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

// ✅ 연관검색어 데이터베이스
const stockKeywords = [
  // --- 국장 (KOSPI / KOSPI2) ---
  "삼성전자", "SK하이닉스", "LG에너지솔루션", "삼성바이오로직스", "현대차", "기아", "셀트리온", "POSCO홀딩스", "NAVER", "카카오",
  "삼성SDI", "LG화학", "KB금융", "신한지주", "포스코퓨처엠", "에코프로", "에코프로비엠", "현대모비스", "삼성물산", "카카오뱅크",
  "SK이노베이션", "LG전자", "두산에너빌리티", "HMM", "크래프톤", "메리츠금융지주", "HD현대중공업", "한화오션", "대한항공", "포스코인터내셔널",
  
  // --- 미장 (USA - Big Tech & Growth) ---
  "엔비디아", "테슬라", "애플", "마이크로소프트", "구글", "아마존", "메타", "넷플릭스", "어도비", "세일즈포스",
  "AMD", "인텔", "퀄컴", "브로드컴", "ASML", "TSMC", "팔란티어", "아이온큐", "유니티", "코인베이스",
  "버크셔해더웨이", "일라이릴리", "노보노디스크", "비자", "마스터카드", "JP모건", "뱅크오브아메리카", "엑슨모빌", "코카콜라", "펩시",
  "스타벅스", "디즈니", "에어비앤비", "우버", "리비안", "루시드", "슈퍼마이크로컴퓨터", "암홀딩스", "스노우플레이크", "크라우드스트라이크",

  // --- ETF & 지수 ---
  "코스피", "코스닥", "나스닥", "S&P500", "다우존스", "필라델피아반도체", "SOXL", "TQQQ", "SQQQ", "SCHD",
  "JEPI", "TSLY", "NVDA", "QQQ", "SPY", "VOO", "VTI", "ARKK", "KODEX 200", "TIGER 차이나전기차",

  // --- 가상자산 (Crypto) ---
  "비트코인", "이더리움", "리플", "솔라나", "도지코인", "에이다", "아발란체", "폴카닷", "체인링크", "시바이누",

  // --- 경제 지표 및 원자재 ---
  "환율", "달러인덱스", "원달러환율", "엔화", "유로화", "국제유가", "WTI", "금 시세", "은 시세", "구리 가격",
  "미국 금리", "CPI", "소비자물가지수", "연준", "FOMC", "실업률", "경기침체", "반도체 전망", "2차전지", "초전도체"
];

const topQuotes = [
  { text: "투자란 원금의 안전과 만족스러운 수익을 약속하는 것이다.", author: "Benjamin Graham" },
  { text: "인내심은 주식 시장에서 승리하기 위한 가장 강력한 무기다.", author: "Warren Buffett" },
  { text: "위험은 자신이 무엇을 하는지 모르는 데서 온다.", author: "Peter Lynch" },
  { text: "시장의 변동성을 친구로 삼고, 어리석음에서 이익을 얻어라.", author: "Warren Buffett" },
  { text: "남들이 겁을 먹고 있을 때 욕심을 부리고, 남들이 욕심을 부릴 때 겁을 먹어라.", author: "Warren Buffett" },
  { text: "투자의 성공 여부는 시장이 얼마나 오르느냐가 아니라, 당신이 얼마나 침착함을 유지하느냐에 달려 있다.", author: "Benjamin Graham" },
  { text: "가장 뛰어난 투자자는 차트가 아니라, 자기 자신의 감정을 가장 잘 읽는 사람이다.", author: "Peter Lynch" }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]); // ✅ 추가
  const [showSuggestions, setShowSuggestions] = useState(false); // ✅ 추가
  const searchRef = useRef<HTMLDivElement>(null); // ✅ 추가
  
  const [isLoading, setIsLoading] = useState(true);
  const [exchangeRate, setExchangeRate] = useState({ rate: "---", change: "+0.0" });
  const [fearGreed, setFearGreed] = useState({ value: 0, label: "로딩 중" });

  const [isGuideFirst, setIsGuideFirst] = useState(false);
  const [showMarketData, setShowMarketData] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [dailyQuote, setDailyQuote] = useState({ text: "", author: "" });
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const savedMarketAlert = localStorage.getItem("marketAlert");
    const savedGuideSetting = localStorage.getItem("newsLetter") === "true";
    const savedSearches = JSON.parse(localStorage.getItem("recentSearches") || "[]");

    setShowMarketData(savedMarketAlert !== "false");
    setIsGuideFirst(savedGuideSetting);
    setRecentSearches(savedSearches);
    setDailyQuote(topQuotes[Math.floor(Math.random() * topQuotes.length)]);

    fetchMarketData();
    setMounted(true);

    // ✅ 외부 클릭 시 연관검색어 창 닫기
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ 실시간 검색어 입력 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim().length > 0) {
      const filtered = stockKeywords
        .filter(item => item.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5); 
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

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

  const executeSearch = (e?: React.FormEvent, term?: string) => {
    if (e) e.preventDefault();
    const query = term || searchTerm;
    if (!query.trim()) return;

    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
    setShowSuggestions(false); // ✅ 검색 실행 시 창 닫기

    window.open(`https://search.naver.com/search.naver?query=${encodeURIComponent(query + " 주가")}`, "_blank");
  };

  const removeSearch = (e: React.MouseEvent, term: string) => {
    e.stopPropagation();
    const updated = recentSearches.filter(s => s !== term);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

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

  if (!mounted) return <div className="min-h-screen" style={{ backgroundColor: "var(--bg-color)" }} />;

  return (
    <div className="min-h-[100dvh] flex flex-col transition-colors duration-300" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      <main className="max-w-6xl mx-auto px-4 pt-4 md:pt-12 pb-8 md:pb-24 relative z-10">

        {/* 상단 명언 위젯 */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 md:mb-10 text-center px-4">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 block mb-2">🎯Today's Insight</span>
          <p className="text-base md:text-xl font-bold italic opacity-90 mb-1">"{dailyQuote.text}"</p>
          <span className="text-[11px] font-black opacity-40 uppercase tracking-widest">— {dailyQuote.author}</span>
        </motion.div>

        {/* 히어로 섹션 */}
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full h-[400px] md:h-[600px] rounded-[30px] md:rounded-[60px] overflow-hidden mb-12 md:mb-28 shadow-2xl group"
        >
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
            style={{ backgroundImage: `url('/hero-bg.png')`, filter: "blur(2px) brightness(0.4)" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <motion.h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 md:mb-6 tracking-tighter italic uppercase">
              HIT THE <br />
              <span className="text-red-600 inline-block mt-2">Bull's Eye</span>
            </motion.h2>
          </div>
        </motion.section>

        {/* ✅ 통합 검색창 (연관검색어 기능 탑재) */}
        <div className="max-w-2xl mx-auto mb-16 md:mb-28 px-2 relative" ref={searchRef}>
          <form onSubmit={(e) => executeSearch(e)} className="relative group mb-8 z-30">
            <input
              type="text"
              placeholder="종목명 또는 지표 검색"
              className="w-full h-14 md:h-20 px-6 md:px-10 rounded-full border-2 focus:border-red-600 shadow-xl transition-all outline-none text-sm md:text-base font-bold"
              style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)", color: "var(--text-main)" }}
              value={searchTerm}
              onChange={handleInputChange} // ✅ 실시간 필터링 적용
              onFocus={() => searchTerm.trim() && setShowSuggestions(true)}
            />
            <button type="submit" className="absolute right-2 top-2 bottom-2 px-6 md:px-10 bg-red-600 text-white rounded-full font-black hover:bg-red-700 transition-all hover:scale-95">
              검색
            </button>
          </form>

          {/* ✅ 연관검색어 드롭다운 레이어 */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-16 md:top-24 left-0 right-0 z-20 rounded-[24px] border-2 shadow-2xl overflow-hidden mt-2"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}
              >
                {suggestions.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSearchTerm(item);
                      executeSearch(undefined, item);
                    }}
                    className="w-full text-left px-8 py-4 hover:bg-red-600/10 hover:text-red-600 font-bold transition-colors border-b last:border-none text-sm md:text-base"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    🔍 <span className="ml-2">{item}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* 최근 검색어 */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {recentSearches.length > 0 ? (
              recentSearches.map((tag) => (
                <div key={tag} className="relative group">
                  <button
                    onClick={() => executeSearch(undefined, tag)}
                    className="pl-4 pr-9 py-2 rounded-full border text-[12px] md:text-[13px] font-bold transition-all hover:border-red-600 hover:text-red-600"
                    style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)", color: "var(--text-sub)" }}
                  >
                    # {tag}
                  </button>
                  <button 
                    onClick={(e) => removeSearch(e, tag)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center rounded-full bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white transition-all text-[8px]"
                  >
                    ✕
                  </button>
                </div>
              ))
            ) : (
              <p className="text-[11px] font-bold opacity-30 uppercase tracking-widest">No Recent Searches</p>
            )}
          </div>
        </div>

        {/* 지표 데이터 및 나머지 하단 섹션 (기존 코드 유지) */}
        {showMarketData && (
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
        )}

        <div className="my-10"><AdSense slot="1234567890" format="fluid" /></div>

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

      {/* 하단 버핏 섹션 (기존 유지) */}
      <motion.section variants={fadeInUp} initial="initial" whileInView="whileInView" className="py-24 border-y-2 text-center relative overflow-hidden" style={{ borderColor: "var(--border-color)" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[15rem] font-black opacity-[0.02] italic select-none pointer-events-none uppercase">Patience</div>
        <p className="relative z-10 text-xl md:text-4xl font-black leading-tight mb-8 px-6 italic tracking-tighter">
          "주식 시장은 인내심 없는 사람의 돈을<br /> 인내심 있는 사람에게 옮기는 정교한 도구이다."
        </p>
        <span className="relative z-10 font-black text-sm uppercase tracking-[0.5em] text-red-600">— Warren Buffett</span>
      </motion.section>

      {/* 푸터 (기존 유지) */}
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
          </div>
        </div>
        <div className="text-center pt-8 border-t border-white/5 opacity-30 text-[10px] font-bold tracking-[0.4em]">
          © 2026 BULL'S EYE. TARGET YOUR WEALTH. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}