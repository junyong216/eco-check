"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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

// ✅ 데이터베이스 대폭 확장 (한글명, 영문, 티커, 별칭 포함)
const stockKeywords = [
  // --- 미장 (USA - Big Tech & Growth) ---
  { name: "엔비디아", alias: ["nvidia", "nvda", "엔비", "nvdia"] },
  { name: "테슬라", alias: ["tesla", "tsla", "테슬"] },
  { name: "애플", alias: ["apple", "aapl", "아이폰"] },
  { name: "마이크로소프트", alias: ["microsoft", "msft", "마소"] },
  { name: "구글", alias: ["google", "googl", "알파벳", "alphabet"] },
  { name: "아마존", alias: ["amazon", "amzn"] },
  { name: "메타", alias: ["meta", "fb", "페이스북", "facebook"] },
  { name: "넷플릭스", alias: ["netflix", "nflx"] },
  { name: "어도비", alias: ["adobe", "adbe"] },
  { name: "세일즈포스", alias: ["salesforce", "crm"] },
  { name: "AMD", alias: ["암드", "리사수", "advanced micro devices"] },
  { name: "인텔", alias: ["intel", "intc"] },
  { name: "퀄컴", alias: ["qualcomm", "qcom"] },
  { name: "브로드컴", alias: ["broadcom", "avgo"] },
  { name: "ASML", alias: ["노광장비", "에이에스엠엘"] },
  { name: "TSMC", alias: ["tsm", "대만반도체"] },
  { name: "팔란티어", alias: ["palantir", "pltr", "팔란"] },
  { name: "아이온큐", alias: ["ionq", "양자컴퓨터"] },
  { name: "유니티", alias: ["unity", "u"] },
  { name: "코인베이스", alias: ["coinbase", "coin"] },
  { name: "버크셔해더웨이", alias: ["brk", "워렌버핏", "버핏"] },
  { name: "일라이릴리", alias: ["lly", "비만치료제"] },
  { name: "노보노디스크", alias: ["nvo"] },
  { name: "비자", alias: ["visa", "v"] },
  { name: "마스터카드", alias: ["mastercard", "ma"] },
  { name: "JP모건", alias: ["jpmorgan", "jpm"] },
  { name: "뱅크오브아메리카", alias: ["boa", "bac"] },
  { name: "엑슨모빌", alias: ["exxon", "xom"] },
  { name: "코카콜라", alias: ["cocacola", "ko"] },
  { name: "펩시", alias: ["pepsi", "pep"] },
  { name: "스타벅스", alias: ["starbucks", "sbux", "스벅"] },
  { name: "디즈니", alias: ["disney", "dis"] },
  { name: "에어비앤비", alias: ["airbnb", "abnb"] },
  { name: "우버", alias: ["uber"] },
  { name: "리비안", alias: ["rivian", "rivn"] },
  { name: "루시드", alias: ["lucid", "lcid"] },
  { name: "슈퍼마이크로컴퓨터", alias: ["smci", "슈마컴"] },
  { name: "암홀딩스", alias: ["arm"] },
  { name: "스노우플레이크", alias: ["snowflake", "snow"] },
  { name: "크라우드스트라이크", alias: ["crowdstrike", "crwd"] },
  { name: "델 테크놀로지", alias: ["dell"] },
  { name: "오라클", alias: ["oracle", "orcl"] },

  // --- 국장 (KOSPI / KOSDAQ) ---
  { name: "삼성전자", alias: ["samsung", "삼전", "sec"] },
  { name: "SK하이닉스", alias: ["skhynix", "하이닉스", "sk"] },
  { name: "LG에너지솔루션", alias: ["lg엔솔", "엔솔"] },
  { name: "삼성바이오로직스", alias: ["삼바", "biologics"] },
  { name: "현대차", alias: ["hyundai", "현대자동차"] },
  { name: "기아", alias: ["kia"] },
  { name: "셀트리온", alias: ["celltrion", "서정진"] },
  { name: "POSCO홀딩스", alias: ["포스코", "posco", "포항제철"] },
  { name: "NAVER", alias: ["naver", "네이버"] },
  { name: "카카오", alias: ["kakao"] },
  { name: "삼성SDI", alias: ["sdi", "삼성에스디아이"] },
  { name: "LG화학", alias: ["lgchem", "엘화"] },
  { name: "KB금융", alias: ["kb금융지주", "리딩뱅크"] },
  { name: "신한지주", alias: ["신한금융"] },
  { name: "포스코퓨처엠", alias: ["futurem"] },
  { name: "에코프로", alias: ["ecopro", "이차전지"] },
  { name: "에코프로비엠", alias: ["ecoprobm"] },
  { name: "현대모비스", alias: ["mobis"] },
  { name: "삼성물산", alias: ["물산"] },
  { name: "카카오뱅크", alias: ["카뱅"] },
  { name: "SK이노베이션", alias: ["이노"] },
  { name: "LG전자", alias: ["엘전"] },
  { name: "두산에너빌리티", alias: ["원전", "두산에너"] },
  { name: "HMM", alias: ["흠", "현대상선"] },
  { name: "크래프톤", alias: ["배그", "krafton"] },
  { name: "메리츠금융지주", alias: ["메리츠"] },
  { name: "HD현대중공업", alias: ["현중"] },
  { name: "한화오션", alias: ["대우조선해양"] },
  { name: "대한항공", alias: ["koreanair"] },
  { name: "포스코인터내셔널", alias: ["포인"] },
  { name: "한미반도체", alias: ["한미"] },
  { name: "알테오젠", alias: ["alteogen"] },
  { name: "HLB", alias: ["에이치엘비"] },

  // --- ETF & 지수 ---
  { name: "코스피", alias: ["kospi", "국장"] },
  { name: "코스닥", alias: ["kosdaq"] },
  { name: "나스닥", alias: ["nasdaq", "ndx", "나스닥지수"] },
  { name: "S&P500", alias: ["snp500", "에스앤피", "spy", "voo"] },
  { name: "다우존스", alias: ["dow", "다우"] },
  { name: "필라델피아반도체", alias: ["반도체지수", "sox"] },
  { name: "SOXL", alias: ["반도체3배", "속슬"] },
  { name: "TQQQ", alias: ["나스닥3배", "티큐"] },
  { name: "SQQQ", alias: ["나스닥인버스", "숏"] },
  { name: "SCHD", alias: ["슈드", "배당주"] },
  { name: "JEPI", alias: ["제피"] },
  { name: "TSLY", alias: ["테슬리"] },

  // --- 가상자산 (Crypto) ---
  { name: "비트코인", alias: ["btc", "bitcoin", "코인"] },
  { name: "이더리움", alias: ["eth", "ethereum"] },
  { name: "리플", alias: ["xrp", "ripple"] },
  { name: "솔라나", alias: ["solana", "sol"] },
  { name: "도지코인", alias: ["doge"] },
  { name: "에이다", alias: ["ada"] },

  // --- 경제 지표 및 원자재 ---
  { name: "환율", alias: ["usd", "달러", "exchange", "원달러"] },
  { name: "엔화", alias: ["jpy", "엔화환율", "일본"] },
  { name: "국제유가", alias: ["wti", "oil", "기름값"] },
  { name: "금 시세", alias: ["gold", "금값"] },
  { name: "은 시세", alias: ["silver", "은값"] },
  { name: "구리 가격", alias: ["copper"] },
  { name: "미국 금리", alias: ["fomc", "fed", "연준", "금리"] },
  { name: "CPI", alias: ["소비자물가지수", "물가"] },
  { name: "2차전지", alias: ["배터리", "battery"] },
  { name: "초전도체", alias: ["lk99"] }
];

const topQuotes = [
  { text: "투자란 원금의 안전과 만족스러운 수익을 약속하는 것이다.", author: "Benjamin Graham" },
  { text: "인내심은 주식 시장에서 승리하기 위한 가장 강력한 무기다.", author: "Warren Buffett" },
  { text: "위험은 자신이 무엇을 하는지 모르는 데서 온다.", author: "Peter Lynch" },
  { text: "시장의 변동성을 친구로 삼고, 어리석음에서 이익을 얻어라.", author: "Warren Buffett" },
  { text: "남들이 겁을 먹고 있을 때 욕심을 부리고, 남들이 욕심을 부릴 때 겁을 먹어라.", author: "Warren Buffett" }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1); // ✅ 키보드 선택 전용 인덱스
  const searchRef = useRef<HTMLDivElement>(null);

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

    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ 검색어 입력 시 로직
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setSelectedIndex(-1); // 입력 시 선택 초기화

    if (value.trim().length > 0) {
      const filtered = stockKeywords
        .filter(item => 
          item.name.toLowerCase().includes(value) || 
          item.alias.some(a => a.toLowerCase().includes(value))
        )
        .map(item => item.name)
        .slice(0, 10);
      
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // ✅ 키보드 제어 핸들러 추가
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault(); // 커서 이동 방지
      setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      if (selectedIndex !== -1) {
        e.preventDefault();
        const selectedTerm = suggestions[selectedIndex];
        executeSearch(undefined, selectedTerm);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const executeSearch = (e?: React.FormEvent, term?: string) => {
    if (e) e.preventDefault();
    const query = term || searchTerm;
    if (!query.trim()) return;

    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
    setShowSuggestions(false);
    setSelectedIndex(-1);
    setSearchTerm(query);

    window.open(`https://search.naver.com/search.naver?query=${encodeURIComponent(query)}`, "_blank");
  };

  const removeSearch = (e: React.MouseEvent, term: string) => {
    e.stopPropagation();
    const updated = recentSearches.filter(s => s !== term);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  // ✅ 전체 삭제 기능 추가
  const clearAllHistory = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
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
      let label = value <= 25 ? "극단적 공포" : value <= 45 ? "공포" : value <= 55 ? "중립" : value <= 75 ? "탐욕" : "극단적 탐욕";
      setExchangeRate({ rate: krwRate, change: "+2.5" });
      setFearGreed({ value, label });
    } catch (error) {
      setExchangeRate({ rate: "Error", change: "0" });
    } finally {
      setIsLoading(false);
    }
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
      <main className="max-w-6xl mx-auto px-4 pt-4 md:pt-12 pb-8 md:pb-24 relative z-10 w-full">

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 md:mb-10 text-center px-4">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 block mb-2">🎯Today's Insight</span>
          <p className="text-base md:text-xl font-bold italic opacity-90 mb-1">"{dailyQuote.text}"</p>
          <span className="text-[11px] font-black opacity-40 uppercase tracking-widest">— {dailyQuote.author}</span>
        </motion.div>

        <motion.section initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full h-[400px] md:h-[600px] rounded-[30px] md:rounded-[60px] overflow-hidden mb-12 md:mb-28 shadow-2xl group">
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: `url('/hero-bg.png')`, filter: "blur(2px) brightness(0.4)" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <motion.h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 md:mb-6 tracking-tighter italic uppercase">HIT THE <br /><span className="text-red-600 inline-block mt-2">Bull's Eye</span></motion.h2>
          </div>
        </motion.section>

        {/* ✅ 검색창 섹션 (키보드 이벤트 대응) */}
        <div className="max-w-2xl mx-auto mb-16 md:mb-28 px-2 relative" ref={searchRef}>
          <form onSubmit={(e) => executeSearch(e)} className="relative group mb-8 z-30">
            <input
              type="text"
              placeholder="종목명 또는 티커 검색 (ex. naver, nvda, 테슬)"
              className="w-full h-14 md:h-20 px-6 md:px-10 rounded-full border-2 focus:border-red-600 shadow-xl transition-all outline-none text-sm md:text-base font-bold"
              style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)", color: "var(--text-main)" }}
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => searchTerm.trim() && setShowSuggestions(true)}
            />
            <button type="submit" className="absolute right-2 top-2 bottom-2 px-6 md:px-10 bg-red-600 text-white rounded-full font-black hover:bg-red-700 transition-all hover:scale-95">검색</button>
          </form>

          {/* 자동완성 제안 목록 */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-16 md:top-24 left-0 right-0 z-20 rounded-[24px] border-2 shadow-2xl overflow-hidden mt-2" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                {suggestions.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => executeSearch(undefined, item)}
                    onMouseEnter={() => setSelectedIndex(idx)} // 마우스 호버 시 인덱스 동기화
                    className={`w-full text-left px-8 py-4 font-bold transition-all border-b last:border-none text-sm md:text-base ${
                      selectedIndex === idx ? "bg-red-600 text-white" : "hover:bg-red-600/10 hover:text-red-600"
                    }`}
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    🔍 <span className="ml-2">{item}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* 최근 검색어 & 전체 삭제 버튼 */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {recentSearches.map((tag) => (
                <div key={tag} className="relative group">
                  <button onClick={() => executeSearch(undefined, tag)} className="pl-4 pr-9 py-2 rounded-full border text-[12px] md:text-[13px] font-bold transition-all hover:border-red-600 hover:text-red-600" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)", color: "var(--text-sub)" }}># {tag}</button>
                  <button onClick={(e) => removeSearch(e, tag)} className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center rounded-full bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white transition-all text-[8px]">✕</button>
                </div>
              ))}
            </div>
            {recentSearches.length > 0 && (
              <button onClick={clearAllHistory} className="text-[10px] font-black uppercase tracking-widest text-red-600/50 hover:text-red-600 transition-all underline underline-offset-4">전체 삭제</button>
            )}
          </div>
        </div>

        {/* 지표 데이터 섹션 */}
        {showMarketData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {isLoading ? (
              <div className="col-span-full py-20 text-center font-black animate-pulse text-red-600 uppercase italic">Targeting Market Data...</div>
            ) : (
              <>
                <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="p-10 md:p-14 rounded-[40px] border-2 hover:border-red-600 transition-all group" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-6 opacity-60">USD / KRW</h3>
                  <div className="text-5xl md:text-7xl font-black text-red-600 tracking-tighter">{exchangeRate.rate} <span className="text-lg opacity-30 italic" style={{ color: "var(--text-main)" }}>KRW</span></div>
                </motion.div>
                <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="p-10 md:p-14 rounded-[40px] border-2 hover:border-red-600 transition-all group relative" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-6 opacity-60">Market Sentiment</h3>
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

        {/* 메뉴 버튼 그리드 */}
        <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-20">
          {sortedButtons.map((item) => (
            <motion.div key={item.id} variants={fadeInUp}>
              <Link href={`/${item.id}`} className="block py-8 rounded-[24px] border-2 text-center font-black text-base md:text-lg transition-all uppercase italic tracking-tighter hover:border-red-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                {item.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </main>

      <motion.section variants={fadeInUp} initial="initial" whileInView="whileInView" className="py-24 border-y-2 text-center relative overflow-hidden" style={{ borderColor: "var(--border-color)" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[15rem] font-black opacity-[0.02] italic select-none pointer-events-none uppercase">Patience</div>
        <p className="relative z-10 text-xl md:text-4xl font-black leading-tight mb-8 px-6 italic tracking-tighter">
          "주식 시장은 인내심 없는 사람의 돈을<br /> 인내심 있는 사람에게 옮기는 정교한 도구이다."
        </p>
        <span className="relative z-10 font-black text-sm uppercase tracking-[0.5em] text-red-600">— Warren Buffett</span>
      </motion.section>

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