"use client";

import Link from "next/link";

const economicTerms = [
  { term: "공포와 탐욕 지수", definition: "투자 심리를 나타내는 지표로, 0에 가까울수록 극단적 공포를, 100에 가까울수록 극단적 낙관을 의미합니다." },
  { term: "환율 (Exchange Rate)", definition: "한 나라의 화폐와 다른 나라 화폐의 교환 비율입니다. 보통 1달러당 원화 가격으로 표시합니다." },
  { term: "금리 (Interest Rate)", definition: "빌려준 돈에 대한 이자율입니다. 중앙은행이 금리를 올리면 시장의 돈이 줄어들어 물가가 잡힙니다." },
  { term: "인플레이션", definition: "물가가 지속적으로 상승하여 화폐 가치가 떨어지는 현상을 말합니다." },
  { term: "데드캣 바운스", definition: "주가가 급락하다가 잠깐 소폭 반등하는 현상으로, 하락장에서 일시적인 회복을 의미합니다." },
  { term: "FOMC", definition: "미국의 중앙은행인 연방준비제도(Fed) 내에서 통화정책을 결정하는 회의입니다." },
  { term: "스태그플레이션", definition: "경기 불황과 물가 상승이 동시에 발생하는 최악의 경제 상태를 뜻합니다." },
  { term: "양적 완화", definition: "중앙은행이 시장에 돈을 직접 풀어서 경기를 부양시키는 정책입니다." },
];

export default function DictionaryPage() {
  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 font-sans overflow-x-hidden">
      <nav className="h-16 border-b bg-white flex items-center justify-between px-4 md:px-8 sticky top-0 z-50 shadow-sm">
        <Link href="/" className="font-black text-xl md:text-2xl text-blue-600 tracking-tighter">ECO_CHECK</Link>
        <div className="flex gap-5 md:gap-10 text-[14px] md:text-base font-black text-slate-900">
          <Link href="/news" className="hover:text-blue-600 transition">뉴스</Link>
          <Link href="/stock" className="hover:text-blue-600 transition">증권</Link>
          <Link href="/dictionary" className="text-blue-600">용어사전</Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-5 py-12 md:py-20">
        <header className="mb-10 md:mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">용어사전</h1>
          <p className="text-slate-500 font-medium text-sm md:text-base">초보 투자자를 위한 핵심 경제 용어 해설</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
          {economicTerms.map((item, index) => (
            <div key={index} className="p-8 md:p-10 bg-white rounded-[32px] md:rounded-[40px] shadow-xl border border-slate-200 hover:border-blue-500 transition-all group">
              <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 mb-3 tracking-tight">
                {item.term}
              </h2>
              <p className="text-slate-500 leading-relaxed text-sm md:text-base font-medium opacity-80">
                {item.definition}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center pb-12">
          <Link href="/" className="inline-block px-8 md:px-10 py-3 md:py-4 bg-blue-600 text-white rounded-full font-black text-sm md:text-base hover:bg-blue-700 transition shadow-lg">홈으로 돌아가기</Link>
        </div>
      </main>

      <footer className="py-12 text-center text-slate-400 text-[10px] font-bold tracking-widest uppercase border-t border-slate-200 bg-white/30">© 2026 ECO_CHECK. ALL RIGHTS RESERVED.</footer>
    </div>
  );
}