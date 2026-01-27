"use client";

import { useState } from "react";
import Link from "next/link";
import AdSense from "@/components/AdSense";

// --- 데이터 100% 원본 유지 ---
const newsCategories = [
  { id: "market", name: "시장지표", query: "시장지표", category: "Market" },
  { id: "interest", name: "금리이슈", query: "금리전망", category: "Interest" },
  { id: "stock", name: "주식뉴스", query: "주식시황", category: "Stock" },
  { id: "crypto", name: "가상자산", query: "비트코인", category: "Crypto" },
  { id: "realestate", name: "부동산", query: "부동산전망", category: "Estate" },
  { id: "global", name: "해외경제", query: "글로벌경제", category: "Global" },
];

export default function NewsPage() {
  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      <main className="max-w-5xl mx-auto px-5 py-12 md:py-20">
        
        {/* --- 헤더 섹션 --- */}
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 italic uppercase">
            Bull's Eye <span className="text-red-600">News</span> Insights
          </h1>
          <p className="font-bold text-sm md:text-base italic opacity-70" style={{ color: "var(--text-sub)" }}>
            황소의 눈으로 시장의 핵심 맥락을 짚어냅니다.
          </p>
        </header>

        {/* --- 상단 광고 --- */}
        <div className="mb-12">
          <AdSense slot="9988776655" format="auto" />
        </div>

        {/* --- 뉴스 카드 그리드 --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {newsCategories.map((cat, index) => (
            <div key={cat.id} className="contents">
              <a
                href={`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(cat.query)}&sort=1`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-8 md:p-10 rounded-[32px] md:rounded-[48px] shadow-xl border-2 hover:border-red-600 transition-all group flex flex-col justify-between h-full min-h-[300px]"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}
              >
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <span className="bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                      {cat.category}
                    </span>
                    <div className="text-red-600 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black mb-4 tracking-tighter leading-tight" style={{ color: "var(--text-main)" }}>
                    {cat.name} 핵심 브리핑
                  </h2>
                  <p className="text-[15px] font-bold opacity-70 mb-6 break-keep leading-relaxed" style={{ color: "var(--text-sub)" }}>
                    불스아이가 선별한 {cat.name} 관련 시장의 소음을 제거한 최신 뉴스를 확인해 보세요.
                  </p>
                </div>
                <div className="text-[11px] font-black font-mono text-red-600/40 uppercase tracking-[0.2em] pt-6 border-t" style={{ borderColor: "var(--border-color)" }}>
                  BULL'S EYE AUTO-CURATION
                </div>
              </a>

              {/* 4번째 카드(index 3) 이후 중간 광고 삽입 */}
              {index === 3 && (
                <div className="col-span-1 md:col-span-2 my-6">
                  <AdSense slot="1234567890" format="fluid" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* --- 하단 광고 --- */}
        <div className="mt-16">
          <AdSense slot="0099887766" format="auto" />
        </div>

        {/* --- 하단 버튼 --- */}
        <div className="text-center mt-20 pb-12">
          <Link href="/" className="inline-block px-14 py-6 bg-red-600 text-white rounded-full font-black text-xl hover:bg-red-700 transition shadow-2xl hover:-translate-y-1">
            홈으로 돌아가기
          </Link>
        </div>
      </main>

      {/* --- 푸터 --- */}
      <footer className="py-12 border-t text-center" style={{ borderColor: "var(--border-color)" }}>
        <div className="flex justify-center gap-6 mb-4 text-[10px] font-black text-red-600/50 uppercase tracking-widest">
          <Link href="/privacy" className="hover:text-red-600 transition">개인정보 처리방침</Link>
          <Link href="/terms" className="hover:text-red-600 transition">이용약관</Link>
        </div>
        <div className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-40">
          © 2026 BULL'S EYE. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}