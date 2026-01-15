"use client";

import Link from "next/link";

const newsItems = [
  { 
    id: 1,
    category: "Economy", 
    title: "오늘의 주요 경제 지표 뉴스", 
    desc: "금리, 물가, 고용 등 시장의 방향을 결정짓는 핵심 경제 지표 소식입니다.",
    link: "https://search.naver.com/search.naver?where=news&query=경제지표&sm=tab_opt&sort=1"
  },
  { 
    id: 2, 
    category: "FX", 
    title: "실시간 원/달러 환율 전망 기사", 
    desc: "환율 변동의 원인과 전문가들의 향후 전망 리포트를 모아보세요.",
    link: "https://search.naver.com/search.naver?where=news&query=%EC%9B%90%EB%8B%AC%EB%9F%AC+%ED%99%98%EC%9C%A8&sm=tab_opt&sort=1"
  },
  { 
    id: 3, 
    category: "Crypto", 
    title: "비트코인·가상자산 최신 뉴스", 
    desc: "비트코인 시황과 공포 탐욕 지수 관련 최신 분석 기사를 확인하세요.",
    link: "https://search.naver.com/search.naver?where=news&query=%EB%B9%84%ED%8A%B8%EC%BD%94%EC%9D%B8&sm=tab_opt&sort=1"
  },
];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 font-sans overflow-x-hidden">
      {/* 증권 페이지와 동일한 네비게이션 구조 */}
      <nav className="h-16 border-b bg-white flex items-center justify-between px-4 md:px-8 sticky top-0 z-50 shadow-sm">
        <Link href="/" className="font-black text-xl md:text-2xl text-blue-600 tracking-tighter">ECO_CHECK</Link>
        <div className="flex gap-5 md:gap-10 text-[14px] md:text-base font-black text-slate-900">
          <Link href="/news" className="text-blue-600">뉴스</Link>
          <Link href="/stock" className="hover:text-blue-600 transition">증권</Link>
          <Link href="/dictionary" className="hover:text-blue-600 transition">용어사전</Link>
        </div>
      </nav>

      {/* 증권 페이지와 동일한 본문 너비 (max-w-5xl) */}
      <main className="max-w-5xl mx-auto px-5 py-12 md:py-20">
        <header className="mb-10 md:mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">Market News</h1>
          <p className="text-slate-500 font-medium text-sm md:text-base italic">실시간 시장 트렌드 분석</p>
        </header>

        <div className="space-y-6">
          {newsItems.map((item) => (
            <a 
              key={item.id} 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block bg-white p-8 md:p-10 rounded-[32px] md:rounded-[40px] border border-slate-200 shadow-xl hover:border-blue-500 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full font-mono">
                  {item.category}
                </span>
                <span className="text-blue-500 text-xs font-bold group-hover:underline">실시간 뉴스 보기 →</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition tracking-tight">
                {item.title}
              </h2>
              <p className="text-slate-500 leading-relaxed font-medium opacity-80">{item.desc}</p>
            </a>
          ))}
        </div>

        <div className="mt-20 text-center pb-12">
          <Link href="/" className="inline-block px-8 md:px-10 py-3 md:py-4 bg-blue-600 text-white rounded-full font-black text-sm md:text-base hover:bg-blue-700 transition shadow-lg">홈으로 돌아가기</Link>
        </div>
      </main>

      <footer className="py-12 text-center text-slate-400 text-[10px] font-bold tracking-widest uppercase border-t border-slate-200 bg-white/30">© 2026 ECO_CHECK. ALL RIGHTS RESERVED.</footer>
    </div>
  );
}