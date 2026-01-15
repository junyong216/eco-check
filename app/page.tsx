"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [exchangeRate, setExchangeRate] = useState({ rate: "---", change: "0.0" });
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
      setExchangeRate({ rate: krwRate, change: "+2.5" });

      const fgResponse = await fetch("https://api.alternative.me/fng/");
      const fgData = await fgResponse.json();
      const value = parseInt(fgData.data[0].value);
      
      let label = "중립";
      if (value <= 25) label = "극단적 공포";
      else if (value <= 45) label = "공포";
      else if (value <= 55) label = "중립";
      else if (value <= 75) label = "탐욕";
      else label = "극단적 탐욕";

      setFearGreed({ value: value, label: label });
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  const executeSearch = (keyword: string) => {
    const searchUrl = `https://search.naver.com/search.naver?query=${encodeURIComponent(keyword + " 주가")}`;
    window.open(searchUrl, "_blank");
  };

  const SkeletonCard = () => (
    <div className="p-8 md:p-12 bg-white rounded-[32px] md:rounded-[40px] border border-slate-200 shadow-lg flex flex-col justify-center min-h-[200px] md:min-h-[250px] animate-pulse">
      <div className="h-3 w-20 bg-slate-200 rounded mb-6"></div>
      <div className="h-12 w-32 bg-slate-200 rounded mb-4"></div>
      <div className="h-4 w-24 bg-slate-100 rounded"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 font-sans overflow-x-hidden">
      {/* 네비게이션: 강조된 디자인 */}
      <nav className="h-16 border-b bg-white flex items-center justify-between px-4 md:px-8 sticky top-0 z-50 shadow-sm">
        <Link href="/" className="font-black text-xl md:text-2xl text-blue-600 tracking-tighter">ECO_CHECK</Link>
        <div className="flex gap-5 md:gap-10 text-[14px] md:text-base font-black text-slate-900">
          <Link href="/news" className="hover:text-blue-600 transition-colors">뉴스</Link>
          <Link href="/stock" className="hover:text-blue-600 transition-colors">증권</Link>
          <Link href="/dictionary" className="hover:text-blue-600 transition-colors">용어사전</Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-5 py-12 md:py-20">
        <section className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-6xl font-black mb-8 tracking-tighter leading-[1.15] text-slate-800">
            성공적인 투자를 위한<br/>
            <span className="text-blue-600">스마트한 경제 지표.</span>
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <form onSubmit={(e) => { e.preventDefault(); executeSearch(searchTerm); }} className="relative mb-6">
              <input 
                type="text" 
                placeholder="종목명 검색 (예: 삼성전자)"
                className="w-full h-16 md:h-20 px-6 md:px-10 rounded-full border-2 border-slate-200 focus:border-blue-500 focus:outline-none text-base md:text-xl font-medium shadow-xl bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="absolute right-2 md:right-4 top-2 md:top-4 h-12 md:h-12 px-5 md:px-8 bg-blue-600 text-white rounded-full font-bold text-sm md:text-base">검색</button>
            </form>
            <div className="flex flex-wrap justify-center gap-2 px-2">
              <span className="text-slate-400 text-[10px] md:text-xs font-bold mr-1 self-center uppercase tracking-widest">Trending</span>
              {["삼성전자", "엔비디아", "테슬라", "비트코인"].map((item) => (
                <button key={item} onClick={() => executeSearch(item)} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] md:text-[13px] font-bold text-slate-500 hover:text-blue-600 transition-all shadow-sm">#{item}</button>
              ))}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-24">
          {isLoading ? (
            <><SkeletonCard /><SkeletonCard /></>
          ) : (
            <>
              <div className="p-8 md:p-12 bg-white rounded-[32px] md:rounded-[40px] border border-slate-200 shadow-lg flex flex-col justify-center min-h-[200px] md:min-h-[250px]">
                <h3 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 md:mb-6 font-mono font-black">USD / KRW (실시간)</h3>
                <div className="flex items-baseline gap-2 md:gap-3">
                  <span className="text-5xl md:text-7xl font-black text-blue-600 tracking-tighter">{exchangeRate.rate}</span>
                  <span className="text-slate-800 font-bold text-xl md:text-3xl">원</span>
                </div>
                <div className="flex items-center gap-2 mt-4 text-red-500 font-bold text-sm md:text-lg font-black">전일대비 변동중</div>
              </div>

              <div className="p-8 md:p-12 bg-white rounded-[32px] md:rounded-[40px] border border-slate-200 shadow-lg flex flex-col justify-center min-h-[200px] md:min-h-[250px]">
                <h3 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 md:mb-6 font-mono font-black">FEAR & GREED (실시간)</h3>
                <div className="flex items-baseline gap-3 md:gap-4">
                  <span className="text-5xl md:text-7xl font-black text-slate-800 tracking-tighter">{fearGreed.value}</span>
                  <span className="text-orange-500 font-black text-xl md:text-3xl italic">{fearGreed.label}</span>
                </div>
                <div className="h-3 md:h-4 w-full bg-slate-100 rounded-full mt-6 md:mt-8 overflow-hidden">
                  <div className="h-full bg-orange-500" style={{ width: `${fearGreed.value}%` }}></div>
                </div>
              </div>
            </>
          )}
        </div>

        <section className="py-16 md:py-24 border-t border-slate-300 text-center relative overflow-hidden">
          <div className="text-[80px] md:text-[120px] font-serif text-black absolute top-0 left-1/2 -translate-x-1/2 select-none font-black opacity-10">“</div>
          <div className="relative z-10 pt-8">
            <p className="text-lg md:text-3xl font-serif italic text-black mb-8 px-4 leading-relaxed font-bold break-keep">
              투자의 제1원칙은 결코 돈을 잃지 않는 것이다.<br className="hidden md:block"/>
              제2원칙은 제1원칙을 잊지 않는 것이다.
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="h-[1px] w-8 md:w-12 bg-black opacity-30"></div>
              <span className="font-black text-black uppercase tracking-widest text-[10px] md:text-xs">워런 버핏 (Warren Buffett)</span>
              <div className="h-[1px] w-8 md:w-12 bg-black opacity-30"></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 md:py-16 bg-slate-200/50 border-t border-slate-300 mt-10 md:mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-slate-500 text-[9px] md:text-[10px] font-bold tracking-[0.1em] md:tracking-[0.2em] uppercase text-center md:text-left">© 2026 ECO_CHECK. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-6 md:gap-10">
              <Link href="/privacy" className="text-slate-500 text-[10px] md:text-[11px] font-bold hover:text-black uppercase tracking-widest transition">개인정보</Link>
              <Link href="/terms" className="text-slate-500 text-[10px] md:text-[11px] font-bold hover:text-black uppercase tracking-widest transition">이용약관</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}