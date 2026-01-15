"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function StockPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [indices, setIndices] = useState({
    kospi: { price: "---", change: "0.00", percent: "0.00%", isUp: true },
    nasdaq: { price: "---", change: "0.00", percent: "0.00%", isUp: true }
  });

  useEffect(() => {
    fetchStockIndices();
  }, []);

  const fetchStockIndices = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://query1.finance.yahoo.com/v8/finance/chart/^KS11?interval=1d"));
      const nRes = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://query1.finance.yahoo.com/v8/finance/chart/^IXIC?interval=1d"));
      
      const kRaw = await res.json();
      const nRaw = await nRes.json();
      const kData = JSON.parse(kRaw.contents);
      const nData = JSON.parse(nRaw.contents);

      const kMeta = kData.chart.result[0].meta;
      const nMeta = nData.chart.result[0].meta;

      const kPrice = kMeta.regularMarketPrice || 0;
      const kPrevClose = kMeta.previousClose || kPrice;
      const nPrice = nMeta.regularMarketPrice || 0;
      const nPrevClose = nMeta.previousClose || nPrice;

      const kDiffValue = (kPrice - kPrevClose).toFixed(2);
      const kRatioValue = ((parseFloat(kDiffValue) / kPrevClose) * 100).toFixed(2);
      const nDiffValue = (nPrice - nPrevClose).toFixed(2);
      const nRatioValue = ((parseFloat(nDiffValue) / nPrevClose) * 100).toFixed(2);

      setIndices({
        kospi: { price: kPrice.toLocaleString(), change: (parseFloat(kDiffValue) > 0 ? "+" : "") + kDiffValue, percent: (parseFloat(kRatioValue) > 0 ? "+" : "") + kRatioValue + "%", isUp: parseFloat(kDiffValue) >= 0 },
        nasdaq: { price: nPrice.toLocaleString(), change: (parseFloat(nDiffValue) > 0 ? "+" : "") + nDiffValue, percent: (parseFloat(nRatioValue) > 0 ? "+" : "") + nRatioValue + "%", isUp: parseFloat(nDiffValue) >= 0 }
      });
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) return;
    window.open(`https://search.naver.com/search.naver?query=${encodeURIComponent(searchTerm + " 주가")}`, "_blank");
  };

  const SkeletonCard = () => (
    <div className="p-8 md:p-10 bg-white rounded-[32px] md:rounded-[40px] shadow-xl border border-slate-200 animate-pulse min-h-[200px]">
      <div className="h-3 w-24 bg-slate-200 rounded mb-6"></div>
      <div className="h-12 w-40 bg-slate-200 rounded mb-6"></div>
      <div className="h-5 w-32 bg-slate-100 rounded"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 font-sans overflow-x-hidden">
      <nav className="h-16 border-b bg-white flex items-center justify-between px-4 md:px-8 sticky top-0 z-50 shadow-sm">
        <Link href="/" className="font-black text-xl md:text-2xl text-blue-600 tracking-tighter">ECO_CHECK</Link>
        <div className="flex gap-5 md:gap-10 text-[14px] md:text-base font-black text-slate-900">
          <Link href="/news" className="hover:text-blue-600">뉴스</Link>
          <Link href="/stock" className="text-blue-600">증권</Link>
          <Link href="/dictionary" className="hover:text-blue-600">용어사전</Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-5 py-12 md:py-20">
        <header className="mb-10 md:mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">Stock Market</h1>
          <p className="text-slate-500 font-medium text-sm md:text-base">전 세계 주요 지수를 실시간으로 연동하여 제공합니다.</p>
          <form onSubmit={handleSearch} className="relative mt-8 md:mt-10 max-w-2xl mx-auto md:mx-0">
            <input type="text" placeholder="종목명 검색 (예: 삼성전자)" className="w-full h-16 md:h-18 px-6 md:px-8 rounded-full border-2 border-slate-200 focus:border-blue-500 focus:outline-none text-base md:text-lg font-medium shadow-lg bg-white" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <button type="submit" className="absolute right-2 top-2 h-12 md:h-14 px-5 md:px-8 bg-blue-600 text-white rounded-full font-bold text-sm md:text-base">검색</button>
          </form>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
          {isLoading ? (
            <><SkeletonCard /><SkeletonCard /></>
          ) : (
            <>
              <div className="p-8 md:p-10 bg-white rounded-[32px] md:rounded-[40px] shadow-xl border border-slate-200">
                <div className="text-slate-400 text-[10px] md:text-xs font-black mb-4 uppercase tracking-widest font-mono">KOSPI INDEX</div>
                <div className="text-5xl md:text-6xl font-black tracking-tighter text-slate-800">{indices.kospi.price}</div>
                <div className={`mt-4 font-bold text-lg md:text-xl flex items-center gap-2 ${indices.kospi.isUp ? 'text-red-500' : 'text-blue-600'}`}>
                  <span>{indices.kospi.isUp ? "▲" : "▼"} {indices.kospi.change}</span>
                  <span className="text-xs md:text-sm opacity-80">({indices.kospi.percent})</span>
                </div>
              </div>
              <div className="p-8 md:p-10 bg-white rounded-[32px] md:rounded-[40px] shadow-xl border border-slate-200">
                <div className="text-slate-400 text-[10px] md:text-xs font-black mb-4 uppercase tracking-widest font-mono">NASDAQ INDEX</div>
                <div className="text-5xl md:text-6xl font-black tracking-tighter text-slate-800">{indices.nasdaq.price}</div>
                <div className={`mt-4 font-bold text-lg md:text-xl flex items-center gap-2 ${indices.nasdaq.isUp ? 'text-red-500' : 'text-blue-600'}`}>
                  <span>{indices.nasdaq.isUp ? "▲" : "▼"} {indices.nasdaq.change}</span>
                  <span className="text-xs md:text-sm opacity-80">({indices.nasdaq.percent})</span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="bg-white/50 p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-slate-200 mb-12">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">자주 찾는 종목</h3>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {["삼성전자", "SK하이닉스", "현대차","엔비디아", "테슬라", "애플", "마이크로소프트"].map((item) => (
              <button key={item} onClick={() => window.open(`https://search.naver.com/search.naver?query=${encodeURIComponent(item + " 주가")}`, "_blank")} className="px-4 md:px-6 py-2 md:py-3 bg-white border border-slate-200 rounded-full text-[12px] md:text-sm font-bold text-slate-600 hover:text-blue-600 transition shadow-sm">#{item}</button>
            ))}
          </div>
        </div>

        <div className="text-center pb-12">
          <Link href="/" className="inline-block px-8 md:px-10 py-3 md:py-4 bg-blue-600 text-white rounded-full font-black text-sm md:text-base hover:bg-blue-700 transition shadow-lg">홈으로 돌아가기</Link>
        </div>
      </main>

      <footer className="py-12 text-center text-slate-400 text-[10px] font-bold tracking-widest uppercase border-t border-slate-200 bg-white/30">© 2026 ECO_CHECK. ALL RIGHTS RESERVED.</footer>
    </div>
  );
}