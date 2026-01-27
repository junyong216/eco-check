"use client";

import Link from "next/link";
import AdSense from "@/components/AdSense";

const investorGuides = [
  { id: 1, title: "고금리 시대의 자산 배분 전략", desc: "기준금리가 높은 수준을 유지할 때는 현금 흐름이 우수한 기업과 채권형 자산의 매력도가 높아집니다. 금리 사이클을 읽는 법을 익혀보세요.", tag: "Strategy" },
  { id: 2, title: "시장의 심리, 공포와 탐욕 지수", desc: "모두가 탐욕에 빠졌을 때 경계하고, 모두가 공포에 질렸을 때 기회를 찾는 역발상 투자의 핵심은 객관적인 데이터 분석에서 시작됩니다.", tag: "Psychology" },
  { id: 3, title: "분산 투자의 기술: 포트폴리오 최적화", desc: "단순히 종목을 나누는 것을 넘어, 상관관계가 낮은 자산군에 분산하여 하락장에서도 내 자산을 지키는 방어 기법을 알아봅니다.", tag: "Risk" },
  { id: 4, title: "워렌 버핏의 가치투자 철학", desc: "위대한 기업을 적절한 가격에 사는 법. 기업의 내재 가치를 계산하고 안전마진을 확보하는 장기 투자자의 핵심 원칙을 정리했습니다.", tag: "Legend" },
  { id: 5, title: "세계 금융의 심장, '월가' 완벽 이해하기", desc: "뉴욕의 작은 거리 Wall Street가 어떻게 전 세계 돈의 흐름을 결정하게 되었을까요? 거대 자본이 움직이는 메커니즘을 쉽게 풀어드립니다.", tag: "Finance" },
  { id: 6, title: "제2의 월급, 배당주 투자의 기초", desc: "주가 시세 차익을 넘어 기업의 이익을 공유받는 배당 투자! 지속 가능한 현금 흐름을 만드는 배당 성장주 선별법을 알아봅니다.", tag: "Income" }
];

export default function GuidePage() {
  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      <main className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <header className="mb-20 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 italic uppercase text-red-600">
            Investment <span style={{ color: "var(--text-main)" }}>Guide</span>
          </h1>
          <p className="text-lg md:text-xl font-bold opacity-70 break-keep" style={{ color: "var(--text-sub)" }}>
            시장의 소음을 이기는 불스아이만의 <span className="text-red-600">정기 투자 인사이트</span>
          </p>
        </header>

        <div className="mb-16"><AdSense slot="1122334455" format="auto" /></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {investorGuides.map((guide) => (
            <div key={guide.id} className="flex flex-col">
              <Link href={`/guide/${guide.id}`} className="group cursor-pointer">
                <div className="aspect-video mb-6 overflow-hidden rounded-[32px] bg-gray-100 dark:bg-gray-800 border-2 transition-all group-hover:border-red-600 group-hover:shadow-2xl flex items-center justify-center relative" style={{ borderColor: "var(--border-color)" }}>
                  <div className="text-red-600 font-black text-3xl opacity-10 group-hover:opacity-100 transition-all italic uppercase tracking-tighter">{guide.tag}</div>
                  <div className="absolute bottom-4 right-6 text-red-600 font-black text-xs opacity-0 group-hover:opacity-100 transition-all">READ MORE →</div>
                </div>
                <div className="px-2">
                  <span className="text-red-600 font-black text-[10px] uppercase tracking-[0.2em] mb-3 block">{guide.tag} Insight</span>
                  <h3 className="text-2xl font-black mb-4 group-hover:text-red-600 transition-colors leading-tight break-keep" style={{ color: "var(--text-main)" }}>{guide.title}</h3>
                  <p className="text-[15px] font-medium leading-relaxed opacity-70 break-keep" style={{ color: "var(--text-sub)" }}>{guide.desc}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-32 pb-12">
          <Link href="/" className="inline-block px-12 py-5 bg-red-600 text-white rounded-full font-black text-lg hover:bg-red-700 transition shadow-2xl hover:-translate-y-1">메인으로 돌아가기</Link>
        </div>
      </main>
    </div>
  );
}