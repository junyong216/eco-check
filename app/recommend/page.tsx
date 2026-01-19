"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";
import AdSense from "@/components/AdSense";

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

function RecommendContent() {
  const [activeTab, setActiveTab] = useState("books");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "books" || tab === "videos") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const books = [
    { title: "돈의 속성", author: "김승호", desc: "최상위 부자가 말하는 돈에 대한 태도와 75가지 경제 철학을 담은 필독서입니다.", link: "https://product.kyobobook.co.kr/detail/S000001913217" },
    { title: "부자 아빠 가난한 아빠 1", author: "로버트 기요사키", desc: "자산과 부채의 차이를 명확히 하고 경제적 자유를 향한 로드맵을 제시합니다.", link: "https://product.kyobobook.co.kr/detail/S000001772245" },
    { title: "현명한 투자자", author: "벤자민 그레이엄", desc: "워런 버핏의 스승이자 가치 투자 원칙을 정립한 투자의 고전입니다.", link: "https://product.kyobobook.co.kr/detail/S000216669456" },
    { title: "자본주의 시대 최소한의 경제 공부", author: "백억남(김욱현)", desc: "경제의 흐름을 이해하는 순간 당신 앞에 선명한 기회가 보이기 시작합니다.", link: "https://product.kyobobook.co.kr/detail/S000218687476" },
    { title: "시대예보: 핵개인의 시대", author: "송길영", desc: "변화하는 사회 속에서 경제적, 사회적 자립을 고민하는 이들을 위한 깊은 통찰.", link: "https://product.kyobobook.co.kr/detail/S000209151495" },
    { title: "EBS 다큐프라임 자본주의", author: "EBS 자본주의 제작팀", desc: "우리가 살아가는 자본주의 시스템의 본질과 금융의 진실을 날카롭게 파헤칩니다.", link: "https://product.kyobobook.co.kr/detail/S000000848997" }
  ];

  const videos = [
    { title: "슈카월드", channel: "YouTube", desc: "어려운 경제 이슈를 유쾌하고 깊이 있게 풀어주는 국내 1위 경제 채널입니다.", link: "https://www.youtube.com/@syukaworld" },
    { title: "삼프로TV", channel: "YouTube", desc: "국내외 금융 전문가들의 정교한 시장 분석을 매일 아침 만날 수 있습니다.", link: "https://www.youtube.com/@3protv" },
    { title: "월급쟁이부자들", channel: "YouTube", desc: "현실적인 재테크와 내 집 마련을 위한 실전 노하우를 아낌없이 공유합니다.", link: "https://www.youtube.com/@weolbu_official" },
    { title: "소수몽키", channel: "YouTube", desc: "미국 주식과 배당주 투자를 초보자도 이해하기 쉽게 설명해 주는 채널입니다.", link: "https://www.youtube.com/@sosumonkey" },
    { title: "신사임당", channel: "YouTube", desc: "대한민국에서 지금 가장 뜨거운 '이슈'를 신사임당의 시선으로 분석합니다.", link: "https://www.youtube.com/@CH%EC%8B%A0%EC%82%AC%EC%9E%84%EB%8B%B9" },
    { title: "내일은 투자왕", channel: "YouTube", desc: "투자 철학과 멘탈 관리, 시장을 꿰뚫어 보는 통찰력을 길러줍니다.", link: "https://www.youtube.com/@%EA%B9%80%EB%8B%A8%ED%85%8C" }
  ];

  return (
    <div className="min-h-screen font-sans transition-colors duration-300" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      
      {/* --- 네비게이션 상단바 --- */}
      <nav className="h-16 border-b flex items-center justify-between px-4 md:px-8 sticky top-0 z-[200] transition-colors" 
           style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
        
        <div className="flex items-center gap-4">
          <Link href="/" className="font-black text-xl md:text-2xl text-red-600 tracking-tighter italic">BULL'S EYE</Link>
          <DarkModeToggle />
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none relative z-[210]">
          <div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
          <div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
          <div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
        </button>
        
        {/* --- 📢 드롭다운 메뉴 레이어 (수정됨) --- */}
        <div className={`fixed inset-x-0 top-16 transition-all duration-500 ease-in-out z-[190] overflow-hidden shadow-2xl ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
             style={{ backgroundColor: "var(--card-bg)", borderBottom: "1px solid var(--border-color)" }}>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 p-10 font-bold">
            <div>
              <div className="text-red-600 text-xs mb-4 uppercase tracking-widest font-black">뉴스</div>
              <div className="flex flex-col gap-3">
                {newsCategories.map((cat) => (
                  <a key={cat.id} href={`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(cat.query)}`} target="_blank" className="text-[14px] hover:text-red-600 transition" style={{ color: "var(--text-main)" }}>{cat.name}</a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-red-600 text-xs mb-4 uppercase tracking-widest font-black">증권</div>
              <div className="flex flex-col gap-3 text-[14px]">
                <Link href="/stock?tab=list" onClick={() => setIsMenuOpen(false)} className="hover:text-red-600 transition">증권사 목록</Link>
                <Link href="/stock?tab=guide" onClick={() => setIsMenuOpen(false)} className="hover:text-red-600 transition">계좌 가이드</Link>
              </div>
            </div>
            <div>
              <div className="text-red-600 text-xs mb-4 uppercase tracking-widest font-black">용어사전</div>
              <div className="flex flex-col gap-3 text-[14px]">
                {dictCategories.map((cat) => (
                  <Link key={cat} href={`/dictionary?cat=${cat}`} onClick={() => setIsMenuOpen(false)} className="hover:text-red-600 transition">{cat}</Link>
                ))}
              </div>
            </div>
            <div>
              <div className="text-red-600 text-xs mb-4 uppercase tracking-widest font-black">추천</div>
              <div className="flex flex-col gap-3 text-[14px]">
                {recommendTabs.map((tab) => (
                  <button key={tab.slug} onClick={() => { setActiveTab(tab.slug); setIsMenuOpen(false); }} className="text-left hover:text-red-600 transition">{tab.name}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative z-10">
        <header className="mb-16 text-center md:text-left px-2">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 italic" style={{ color: "var(--text-main)" }}>Bulls_Pick</h1>
          <p className="text-lg font-bold mb-10 opacity-70" style={{ color: "var(--text-sub)" }}>당신의 인사이트를 완성할 베스트 도서와 인기 영상을 큐레이션했습니다.</p>
          <div className="flex gap-4 justify-center md:justify-start">
            <button onClick={() => setActiveTab("books")} className={`px-10 py-4 rounded-full font-black text-base transition-all ${activeTab === "books" ? "bg-red-600 text-white shadow-xl scale-105" : "border"}`} style={{ backgroundColor: activeTab === "books" ? "" : "var(--card-bg)", color: activeTab === "books" ? "#ffffff" : "var(--text-sub)", borderColor: activeTab === "books" ? "transparent" : "var(--border-color)" }}>추천 도서</button>
            <button onClick={() => setActiveTab("videos")} className={`px-10 py-4 rounded-full font-black text-base transition-all ${activeTab === "videos" ? "bg-red-600 text-white shadow-xl scale-105" : "border"}`} style={{ backgroundColor: activeTab === "videos" ? "" : "var(--card-bg)", color: activeTab === "videos" ? "#ffffff" : "var(--text-sub)", borderColor: activeTab === "videos" ? "transparent" : "var(--border-color)" }}>추천 영상</button>
          </div>
        </header>

        {/* 광고 영역 */}
        <div className="mb-16">
          <AdSense slot="5544332211" format="auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(activeTab === "books" ? books : videos).map((item, i) => (
            <div key={i} className="flex flex-col h-full">
              <a href={item.link} target="_blank" rel="noopener noreferrer" 
                 className="p-10 rounded-[40px] border shadow-sm hover:shadow-2xl hover:border-red-500 transition-all group flex flex-col justify-between h-full min-h-[360px]" 
                 style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[11px] font-black text-red-600 uppercase tracking-[0.2em]">{"author" in item ? "KYOBO BEST" : "YOUTUBE CHANNEL"}</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-all text-red-600 transform translate-x-2 group-hover:translate-x-0">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                    </div>
                  </div>
                  <h4 className="font-black mb-3 text-2xl md:text-3xl group-hover:text-red-600 transition-colors leading-tight break-keep" style={{ color: "var(--text-main)" }}>{item.title}</h4>
                  <p className="text-[13px] font-black mb-6 uppercase tracking-wide opacity-60" style={{ color: "var(--text-sub)" }}>{"author" in item ? item.author : item.channel}</p>
                  <p className="text-[15px] font-bold leading-relaxed opacity-80" style={{ color: "var(--text-sub)" }}>{item.desc}</p>
                </div>
                <div className="mt-10 pt-6 border-t transition-colors group-hover:border-red-200" style={{ borderColor: "var(--border-color)" }}>
                  <span className="text-[12px] font-black group-hover:text-red-600 transition uppercase tracking-tighter" style={{ color: "var(--text-sub)" }}>컨텐츠 보러가기 →</span>
                </div>
              </a>
              {(i + 1) % 3 === 0 && (
                <div className="mt-8">
                  <AdSense slot="1122334455" format="fluid" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-24 pb-12">
          <Link href="/" className="inline-block px-14 py-6 bg-red-600 text-white rounded-full font-black text-xl hover:bg-red-700 transition shadow-2xl hover:-translate-y-1">홈으로 돌아가기</Link>
        </div>
      </main>

      <footer className="py-12 text-center text-[10px] font-bold tracking-widest border-t uppercase" style={{ color: "var(--text-sub)", borderColor: "var(--border-color)" }}>© 2026 BULL'S EYE. ALL RIGHTS RESERVED.</footer>
    </div>
  );
}

export default function RecommendPage() {
  return <Suspense fallback={<div className="p-20 text-center font-black animate-pulse text-red-600">콘텐츠를 불러오는 중...</div>}><RecommendContent /></Suspense>;
}