"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import DarkModeToggle from "@/components/DarkModeToggle";
import AdSense from "@/components/AdSense";

// --- 데이터 100% 원본 유지 ---
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

function StockContent() {
  const searchParams = useSearchParams();
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [myList, setMyList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("brokers");
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const [indices, setIndices] = useState({
    kospi: { price: "---", change: "0.00", percent: "0.00%", isUp: true },
    nasdaq: { price: "---", change: "0.00", percent: "0.00%", isUp: true }
  });

  const fetchStockIndices = async () => {
    try {
      const res = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://query1.finance.yahoo.com/v8/finance/chart/^KS11?interval=1d&range=1d"));
      const nRes = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://query1.finance.yahoo.com/v8/finance/chart/^IXIC?interval=1d&range=1d"));
      const kRaw = await res.json();
      const nRaw = await nRes.json();
      const kData = JSON.parse(kRaw.contents);
      const nData = JSON.parse(nRaw.contents);

      if (kData.chart?.result && nData.chart?.result) {
        const kMeta = kData.chart.result[0].meta;
        const nMeta = nData.chart.result[0].meta;
        const kPrice = kMeta.regularMarketPrice || 0;
        const kPrev = kMeta.previousClose || kMeta.chartPreviousClose || kPrice;
        const kDiff = kPrice - kPrev;
        const kPercent = kPrev !== 0 ? (kDiff / kPrev) * 100 : 0;
        const nPrice = nMeta.regularMarketPrice || 0;
        const nPrev = nMeta.previousClose || nMeta.chartPreviousClose || nPrice;
        const nDiff = nPrice - nPrev;
        const nPercent = nPrev !== 0 ? (nDiff / nPrev) * 100 : 0;

        setIndices({
          kospi: { price: kPrice === 0 ? "---" : kPrice.toLocaleString(undefined, { minimumFractionDigits: 2 }), change: (kDiff > 0 ? "+" : "") + kDiff.toFixed(2), percent: (kDiff > 0 ? "+" : "") + kPercent.toFixed(2) + "%", isUp: kDiff >= 0 },
          nasdaq: { price: nPrice === 0 ? "---" : nPrice.toLocaleString(undefined, { minimumFractionDigits: 2 }), change: (nDiff > 0 ? "+" : "") + nDiff.toFixed(2), percent: (nDiff > 0 ? "+" : "") + nPercent.toFixed(2) + "%", isUp: nDiff >= 0 }
        });

        const now = new Date();
        setLastUpdated(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`);
      }
    } catch (e) { console.error(e); } finally { setIsLoading(false); }
  };

  useEffect(() => {
    const savedList = localStorage.getItem("ecoCheck_myList");
    if (savedList) setMyList(JSON.parse(savedList));
    fetchStockIndices();
    const intervalId = setInterval(fetchStockIndices, 60000);
    const tab = searchParams.get("tab");
    if (tab === "guide") setActiveTab("accounts");
    else if (tab === "list") setActiveTab("brokers");
    return () => clearInterval(intervalId);
  }, [searchParams]);

  const brokers = [
    { name: "미래에셋증권", link: "https://securities.miraeasset.com/", desc: "국내 최대 자기자본 보유" },
    { name: "한국투자증권", link: "https://www.truefriend.com/", desc: "국내외 투자금융 강자" },
    { name: "NH투자증권", link: "https://www.nhqv.com/", desc: "나무증권 등 편리한 플랫폼" },
    { name: "KB증권", link: "https://www.kbsec.com/", desc: "금융그룹 연계 서비스 강점" },
    { name: "메리츠증권", link: "https://www.meritzsec.com/", desc: "높은 수익률 및 기업금융 특화" },
    { name: "삼성증권", link: "https://www.samsungpop.com/", desc: "신뢰도 높은 자산관리 브랜드" },
    { name: "하나증권", link: "https://www.hanaw.com/", desc: "종합 자산관리 전문성" },
    { name: "키움증권", link: "https://www.kiwoom.com/", desc: "개인 투자자 점유율 독보적 1위" },
    { name: "신한투자증권", link: "https://www.shinhansec.com/", desc: "신한금융그룹 통합 서비스" },
    { name: "대신증권", link: "https://www.daishin.com/", desc: "전통의 명문, 크레온 플랫폼" },
    { name: "교보증권", link: "https://www.iprovest.com/", desc: "국내 1호 증권사, 안정적 운영" },
    { name: "유안타증권", link: "https://www.myasset.com/", desc: "티레이더 등 특화 시스템" },
    { name: "한화투자증권", link: "https://www.hanwhawm.com/", desc: "STEPS 등 친절한 투자 앱" },
    { name: "현대차증권", link: "https://www.hmsec.com/", desc: "현대차그룹 연계 퇴직연금 강점" },
    { name: "아이엠증권", link: "https://www.imstock.com/", desc: "DGB금융그룹 계열 증권사" },
    { name: "IBK투자증권", link: "https://www.ibks.com/", desc: "중소기업 지원 및 정책금융 특화" },
    { name: "신영증권", link: "https://www.shinyoung.com/", desc: "가치투자 및 자산승계 전문" },
    { name: "LS증권", link: "https://www.ls-sec.co.kr/", desc: "이베스트투자증권의 새 이름" },
    { name: "BNK투자증권", link: "https://www.bnkfn.co.kr/", desc: "동남권 최대 금융그룹 계열" },
    { name: "유진투자증권", link: "https://www.eugenefn.com/", desc: "강소 증권사로서의 맞춤형 서비스" }
  ];

  const accounts = [
    { type: "CMA", name: "종합자산관리계좌", desc: "하루만 맡겨도 이자가 붙어 비상금 보관에 최적화된 수시 입출금 계좌입니다." },
    { type: "ISA", name: "개인종합관리계좌", desc: "한 계좌에서 주식, 펀드 등을 운용하며 '절세 혜택'을 누리는 만능 재테크 통장입니다." },
    { type: "IRP", name: "개인형 퇴직연금", desc: "소득이 있는 person이라면 필수! 노후 준비와 연말정산 세액공제 혜택을 받습니다." },
    { type: "연금저축", name: "연금저축펀드", desc: "IRP보다 운용이 자유롭고, 세액공제를 받으며 ETF 등에 장기 투자하기 좋습니다." },
    { type: "외화계좌", name: "외화/해외주식계좌", desc: "미국 주식 등 해외 투자를 위해 달러를 보유하고 거래를 할 수 있는 계좌입니다." },
    { type: "위탁계좌", name: "일반 주식계좌", desc: "제한 없이 자유롭게 국내외 주식을 매매할 수 있는 가장 기본적인 투자 계좌입니다." }
  ];

  const addToMyList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    if (myList.includes(searchTerm.trim())) { alert("이미 리스트에 있는 종목입니다."); return; }
    const newList = [searchTerm.trim(), ...myList];
    setMyList(newList);
    localStorage.setItem("ecoCheck_myList", JSON.stringify(newList));
    setSearchTerm("");
  };

  const removeFromList = (term: string) => {
    const newList = myList.filter((item) => item !== term);
    setMyList(newList);
    localStorage.setItem("ecoCheck_myList", JSON.stringify(newList));
  };

  const handleSearch = (term: string) => {
    window.open(`https://search.naver.com/search.naver?query=${encodeURIComponent(term + " 주가")}`, "_blank");
  };

  return (
    <div className="min-h-screen font-sans overflow-x-hidden transition-colors duration-300" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>

      {/* --- 네비게이션 (모든 페이지 공용) --- */}
      <nav className="h-16 border-b flex items-center justify-between px-4 md:px-8 sticky top-0 z-[300] transition-colors shadow-sm"
        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>

        <div className="flex items-center gap-4">
          <Link href="/" className="font-black text-xl md:text-2xl text-red-600 tracking-tighter italic">BULL'S EYE</Link>
          <DarkModeToggle />
        </div>

        <div className="flex items-center h-full font-black text-[15px]">
          {/* [PC용 메뉴] gap-8로 모든 페이지 간격 통일 */}
          <div className="hidden lg:flex items-center h-full gap-8 mr-6">

            {/* 뉴스 */}
            <div className="relative h-full flex items-center group" onMouseEnter={() => setOpenDropdown('news')} onMouseLeave={() => setOpenDropdown(null)}>
              <span className="flex items-center gap-1 cursor-pointer transition-colors"
                style={{ color: openDropdown === 'news' ? '#dc2626' : 'var(--text-main)' }}>
                뉴스 <span className={`text-[10px] transition-transform duration-300 ${openDropdown === 'news' ? 'rotate-180' : ''}`}>▼</span>
              </span>
              <div className={`absolute top-16 left-1/2 -translate-x-1/2 w-44 py-2 rounded-2xl border shadow-2xl transition-all ${openDropdown === 'news' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                <Link href="/news" className="block px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition text-[13px] font-bold" style={{ color: "var(--text-main)" }}>뉴스 홈</Link>
                {newsCategories.map(cat => (
                  <a key={cat.id} href={`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(cat.query)}`} target="_blank" className="block px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition text-[13px]" style={{ color: "var(--text-main)" }}>{cat.name}</a>
                ))}
              </div>
            </div>

            {/* 증권 (증권 홈 삭제) */}
            <div className="relative h-full flex items-center group" onMouseEnter={() => setOpenDropdown('stock')} onMouseLeave={() => setOpenDropdown(null)}>
              <span className="flex items-center gap-1 cursor-pointer transition-colors"
                style={{ color: openDropdown === 'stock' ? '#dc2626' : 'var(--text-main)' }}>
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
              <span className="flex items-center gap-1 cursor-pointer transition-colors"
                style={{ color: openDropdown === 'dict' ? '#dc2626' : 'var(--text-main)' }}>
                용어사전 <span className={`text-[10px] transition-transform duration-300 ${openDropdown === 'dict' ? 'rotate-180' : ''}`}>▼</span>
              </span>
              <div className={`absolute top-16 left-1/2 -translate-x-1/2 w-44 py-2 rounded-2xl border shadow-2xl transition-all ${openDropdown === 'dict' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                {dictCategories.map(cat => (
                  <Link key={cat} href={`/dictionary?cat=${cat}`} className="block px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition text-[13px]" style={{ color: "var(--text-main)" }}>{cat}</Link>
                ))}
              </div>
            </div>

            {/* 추천 */}
            <div className="relative h-full flex items-center group" onMouseEnter={() => setOpenDropdown('recommend')} onMouseLeave={() => setOpenDropdown(null)}>
              <span className="flex items-center gap-1 cursor-pointer transition-colors"
                style={{ color: openDropdown === 'recommend' ? '#dc2626' : 'var(--text-main)' }}>
                추천 <span className={`text-[10px] transition-transform duration-300 ${openDropdown === 'recommend' ? 'rotate-180' : ''}`}>▼</span>
              </span>
              <div className={`absolute top-16 left-1/2 -translate-x-1/2 w-44 py-2 rounded-2xl border shadow-2xl transition-all ${openDropdown === 'recommend' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                <Link href="/recommend?tab=books" className="block px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition text-[13px] font-bold" style={{ color: "var(--text-main)" }}>추천 도서</Link>
                <Link href="/recommend?tab=videos" className="block px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition text-[13px] font-bold" style={{ color: "var(--text-main)" }}>추천 영상</Link>
              </div>
            </div>
          </div>

          <button onClick={() => setIsFullMenuOpen(!isFullMenuOpen)} className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none z-[310]">
            <div className={`w-6 h-0.5 transition-all duration-300 ${isFullMenuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
            <div className={`w-6 h-0.5 transition-all duration-300 ${isFullMenuOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
            <div className={`w-6 h-0.5 transition-all duration-300 ${isFullMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
          </button>
        </div>

        {/* --- 전체 메뉴 레이어 --- */}
        <AnimatePresence>
          {isFullMenuOpen && (
            <>
              {/* 🔴 배경 레이어: 클릭 시 메뉴 닫힘 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFullMenuOpen(false)}
                className="fixed inset-0 bg-black/20 dark:bg-black/50 z-[240] backdrop-blur-[2px]"
              />

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-x-0 top-16 z-[250] overflow-hidden shadow-2xl border-b"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}
              >
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

      <main className="max-w-5xl mx-auto px-5 py-12">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 italic uppercase break-keep" style={{ color: "var(--text-main)" }}>Market_Watch</h1>
          <form onSubmit={addToMyList} className="relative max-w-2xl group mb-10">
            <input type="text" placeholder="관심 종목 추가 (예: 삼성전자)" className="w-full h-16 pl-6 pr-24 md:pr-32 rounded-2xl border-2 focus:border-red-600 shadow-xl outline-none transition-all text-sm md:text-base" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)", color: "var(--text-main)" }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <button type="submit" className="absolute right-2 top-2 h-12 px-5 md:px-8 bg-red-600 text-white rounded-xl font-black hover:bg-red-700 transition text-sm md:text-base">ADD</button>
          </form>

          <div className="my-10">
            <AdSense slot="9988776655" format="auto" />
          </div>

          {myList.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {myList.map((term, i) => (
                <div key={i} className="flex items-center border-2 rounded-xl pl-5 pr-2 py-2 hover:border-red-600 transition group cursor-pointer" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                  <span onClick={() => handleSearch(term)} className="font-black mr-3 text-sm tracking-tight">{term}</span>
                  <button onClick={() => removeFromList(term)} className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-black hover:bg-red-500 hover:text-white transition">✕</button>
                </div>
              ))}
            </div>
          )}
        </header>

        <div className="flex justify-between items-end mb-4 px-2">
          <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.3em]">Live Market Indices</h2>
          {lastUpdated && <span className="text-[10px] font-bold opacity-40 uppercase">Last Sync: {lastUpdated}</span>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="p-10 rounded-[40px] shadow-2xl border-t-8 border-red-600 relative overflow-hidden" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
            <div className="text-[11px] font-black mb-6 tracking-widest opacity-50 uppercase">KOSPI Composite</div>
            <div className="text-5xl font-black mb-2 tracking-tighter">{indices.kospi.price}</div>
            <div className={`text-lg font-bold flex items-center gap-1 ${indices.kospi.isUp ? 'text-red-500' : 'text-blue-500'}`}>
              {indices.kospi.isUp ? '▲' : '▼'} {indices.kospi.change} ({indices.kospi.percent})
            </div>
          </div>
          <div className="p-10 rounded-[40px] shadow-2xl border-t-8 border-red-600 relative overflow-hidden" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
            <div className="text-[11px] font-black mb-6 tracking-widest opacity-50 uppercase">NASDAQ 100</div>
            <div className="text-5xl font-black mb-2 tracking-tighter">{indices.nasdaq.price}</div>
            <div className={`text-lg font-bold flex items-center gap-1 ${indices.nasdaq.isUp ? 'text-red-500' : 'text-blue-500'}`}>
              {indices.nasdaq.isUp ? '▲' : '▼'} {indices.nasdaq.change} ({indices.nasdaq.percent})
            </div>
          </div>
        </div>

        <div className="p-2 md:p-10 rounded-[48px] border-2 shadow-sm mb-12" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
          <div className="flex gap-2 p-2 rounded-3xl mb-10 w-fit" style={{ backgroundColor: "var(--bg-color)", border: "1px solid var(--border-color)" }}>
            <button onClick={() => setActiveTab("brokers")} className={`px-8 py-3 rounded-2xl font-black text-sm transition-all ${activeTab === "brokers" ? "shadow-md" : ""}`} style={{ backgroundColor: activeTab === "brokers" ? "var(--card-bg)" : "transparent", color: activeTab === "brokers" ? "#dc2626" : "var(--text-sub)" }}>증권사 목록</button>
            <button onClick={() => setActiveTab("accounts")} className={`px-8 py-3 rounded-2xl font-black text-sm transition-all ${activeTab === "accounts" ? "shadow-md" : ""}`} style={{ backgroundColor: activeTab === "accounts" ? "var(--card-bg)" : "transparent", color: activeTab === "accounts" ? "#dc2626" : "var(--text-sub)" }}>계좌 가이드</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab === "brokers" ? brokers.map((b, i) => (
              <div key={i} className="contents">
                <a href={b.link} target="_blank" rel="noopener noreferrer"
                  className="p-8 border-2 rounded-[32px] hover:border-red-600 transition group flex justify-between items-center"
                  style={{ backgroundColor: "var(--bg-color)", borderColor: "var(--border-color)" }}>
                  <div>
                    <h4 className="font-black text-lg mb-1 group-hover:text-red-600 transition-colors" style={{ color: "var(--text-main)" }}>{b.name}</h4>
                    <p className="text-[10px] font-bold opacity-50 uppercase" style={{ color: "var(--text-sub)" }}>{b.desc}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all transform group-hover:rotate-45">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                  </div>
                </a>
                {(i + 1) % 6 === 0 && (
                  <div className="col-span-1 sm:col-span-2 lg:col-span-3 my-4">
                    <AdSense slot="4433221100" format="fluid" />
                  </div>
                )}
              </div>
            )) : accounts.map((a, i) => (
              <div key={i} className="p-8 border-2 rounded-[32px] relative overflow-hidden group hover:border-red-600 transition" style={{ backgroundColor: "var(--bg-color)", borderColor: "var(--border-color)" }}>
                <div className="absolute -right-4 -top-4 text-6xl font-black opacity-[0.03] group-hover:text-red-600 transition-colors uppercase select-none">{a.type}</div>
                <span className="text-[11px] font-black text-red-600 uppercase mb-4 block tracking-widest">{a.type}</span>
                <h4 className="font-black mb-4 text-2xl" style={{ color: "var(--text-main)" }}>{a.name}</h4>
                <p className="text-sm font-bold leading-relaxed opacity-70" style={{ color: "var(--text-sub)" }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-20 pb-12">
          <Link href="/" className="inline-block px-12 py-5 bg-red-600 text-white rounded-full font-black text-lg hover:bg-red-700 transition shadow-xl">홈으로 돌아가기</Link>
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

export default function StockPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-black animate-pulse text-red-600">LOADING MARKET DATA...</div>}>
      <StockContent />
    </Suspense>
  );
}