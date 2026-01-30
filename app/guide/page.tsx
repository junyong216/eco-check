"use client";

import Link from "next/link";
import AdSense from "@/components/AdSense";

const investorGuides = [
  { id: 1, title: "고금리 시대의 자산 배분 전략", desc: "기준금리가 높은 수준을 유지할 때는 현금 흐름이 우수한 기업과 채권형 자산의 매력도가 높아집니다. 금리 사이클을 읽는 법을 익혀보세요.", tag: "Strategy" },
  { id: 2, title: "시장의 심리, 공포와 탐욕 지수", desc: "모두가 탐욕에 빠졌을 때 경계하고, 모두가 공포에 질렸을 때 기회를 찾는 역발상 투자의 핵심은 객관적인 데이터 분석에서 시작됩니다.", tag: "Psychology" },
  { id: 3, title: "분산 투자의 기술: 포트폴리오 최적화", desc: "단순히 종목을 나누는 것을 넘어, 상관관계가 낮은 자산군에 분산하여 하락장에서도 내 자산을 지키는 방어 기법을 알아봅니다.", tag: "Risk" },
  { id: 4, title: "워렌 버핏의 가치투자 철학", desc: "위대한 기업을 적절한 가격에 사는 법. 기업의 내재 가치를 계산하고 안전마진을 확보하는 장기 투자자의 핵심 원칙을 정리했습니다.", tag: "Legend" },
  { id: 5, title: "세계 금융의 심장, '월가' 완벽 이해하기", desc: "뉴욕의 작은 거리 Wall Street가 어떻게 전 세계 돈의 흐름을 결정하게 되었을까요? 거대 자본이 움직이는 메커니즘을 쉽게 풀어드립니다.", tag: "Finance" },
  { id: 6, title: "제2의 월급, 배당주 투자의 기초", desc: "주가 시세 차익을 넘어 기업의 이익을 공유받는 배당 투자! 지속 가능한 현금 흐름을 만드는 배당 성장주 선별법을 알아봅니다.", tag: "Income" },
  { id: 7, title: "미국 주식 시장의 3대 지수 완벽 정복", desc: "S&P500, 나스닥, 다우지수... 뉴스에서 매일 들리는 이 지수들이 내 계좌에 미치는 영향은? 글로벌 시장의 나침반을 읽는 법을 공개합니다.", tag: "Global" },
  { id: 8, title: "AI 혁명과 반도체 사이클의 이해", desc: "인공지능 시대의 쌀이라 불리는 반도체! 단순한 유행을 넘어 산업의 패러다임이 바뀌는 시점에서 우리가 주목해야 할 기술적 해자와 투자 포인트를 짚어봅니다.", tag: "Tech" },
  { id: 9, title: "투자의 종합 선물 세트, ETF 기초 가이드", desc: "개별 종목 선택이 어렵다면? 수십 개의 우량주를 한 번에 담는 ETF가 정답일 수 있습니다. 비용은 낮추고 분산 효과는 극대화하는 스마트한 투자법.", tag: "Passive" },
  { id: 10, title: "세금은 줄이고 수익은 높이는 절세 계좌 활용법", desc: "수익만큼 중요한 것이 내 지갑을 지키는 법입니다. ISA, IRP 등 정부가 주는 세제 혜택을 100% 활용하여 실질 수익률을 극대화하는 노하우를 소개합니다.", tag: "Tax" },
  { id: 11, title: "잠자는 동안에도 돈이 들어오는 배당주 투자", desc: "매달 월급처럼 들어오는 배당금의 매력! 하락장에서도 버틸 수 있는 힘이 되는 고배당주와 배당 성장주를 선별하는 기준과 포트폴리오 구성 전략을 알아봅니다.", tag: "Income" },
  { id: 12, title: "시장의 흔들림에 대처하는 투자 심리의 미학", desc: "투자는 결국 자신과의 싸움입니다. 공포에 사고 환희에 파는 역발상 투자자가 되기 위한 멘탈 관리법과 나만의 투자 원칙을 세우는 법을 공유합니다.", tag: "Mind" }
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
                <div className="aspect-video mb-6 overflow-hidden rounded-[32px] border-2 transition-all group-hover:border-red-600 group-hover:shadow-2xl flex items-center justify-center relative"
                  style={{
                    backgroundColor: "var(--card-bg)",
                    borderColor: "var(--border-color)"
                  }}>

                  {/* 카드 안의 큰 태그 글씨 */}
                  <div className="font-black text-3xl italic uppercase tracking-tighter transition-all opacity-20 group-hover:opacity-100"
                    style={{
                      // 이 한 줄이 핵심입니다. CSS 변수를 직접 박아서 PC/모바일 강제 통일!
                      color: "var(--accent-color)"
                    }}>
                    {guide.tag}
                  </div>

                  <div className="absolute bottom-4 right-6 text-red-600 font-black text-xs opacity-0 group-hover:opacity-100 transition-all">
                    READ MORE →
                  </div>
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
          <Link href="/" className="inline-block px-12 py-5 bg-red-600 text-white rounded-full font-black text-lg hover:bg-red-700 transition shadow-2xl hover:-translate-y-1">홈으로 돌아가기</Link>
        </div>
      </main>
    </div>
  );
}