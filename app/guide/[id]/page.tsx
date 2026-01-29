import Link from "next/link";
import AdSense from "@/components/AdSense";

const guideContents: Record<string, { title: string; tag: string; content: string[] }> = {
  "1": {
    title: "고금리 시대의 자산 배분 전략", tag: "Strategy", content: [
      "고금리 환경에서는 안전 자산의 매력도가 높아지지만, 동시에 현금 흐름이 탄탄한 기업들에게는 기회가 됩니다.",
      "첫째, 부채 비율이 낮고 유보율이 높은 종목을 선별해야 합니다. 이자 비용 부담이 적은 기업은 하락장에서도 버틸 체력이 있습니다.",
      "둘째, 채권 혼합형 포트폴리오를 고려하세요. 금리 정점론이 나올 때 채권 가격의 상승 흐름을 타는 전략이 유효합니다.",
      "마지막으로, 분할 매수를 통해 변동성에 대응하십시오. 한 번에 모든 자산을 투입하기보다 시기를 나누는 것이 심리적 안정감을 줍니다."
    ]
  },
  "2": {
    title: "시장의 심리, 공포와 탐욕 지수", tag: "Psychology", content: [
      "시장은 이성보다 감정에 의해 움직일 때가 많습니다. 공포와 탐욕 지수는 이를 수치화한 지표입니다.",
      "지수가 20 미만인 '극단적 공포' 구간에서는 대중이 패닉 셀에 빠져 있을 확률이 높습니다. 이때가 진정한 가치 투자자에게는 매수 적기일 수 있습니다.",
      "반대로 80 이상의 '극단적 탐욕' 구간에서는 거품을 경계해야 합니다. 누구나 수익을 자랑할 때가 가장 위험한 시점임을 잊지 마세요.",
      "지표를 맹신하기보다, 본인의 투자 원칙을 지키는 보조 도구로 활용하는 것이 핵심입니다."
    ]
  },
  "3": {
    title: "분산 투자의 기술: 포트폴리오 최적화", tag: "Risk", content: [
      "진정한 분산은 상관관계가 낮은 자산군을 조합하는 것입니다. 주식, 채권, 금 등 성격이 다른 자산에 자금을 배분하십시오.",
      "정기적인 리밸런싱을 통해 수익이 난 자산은 팔고 하락한 자산은 사서 목표 비중을 유지하는 습관이 중요합니다.",
      "잘 관리된 포트폴리오는 시장보다 훨씬 편안한 수익률을 제공합니다."
    ]
  },
  "4": {
    title: "워렌 버핏의 가치투자 철학", tag: "Legend", content: [
      "위대한 기업을 적절한 가격에 사서 영원히 보유하는 것이 핵심입니다. 독점적 해자를 가진 기업인지 먼저 확인하십시오.",
      "가격이 가치보다 저렴할 때 발생하는 '안전마진'을 확보하는 것이 투자 성공의 절반 이상을 결정합니다.",
      "완벽히 이해하지 못하는 비즈니스 모델에는 투자하지 않는 것이 버핏식 철학의 시작입니다."
    ]
  },
  "5": {
    title: "세계 금융의 심장, '월가' 완벽 이해하기", tag: "Finance", content: [
      "월스트리트는 전 세계 자본의 흐름을 결정하는 거대한 네트워크입니다. 연준의 결정과 자산 이동을 주시해야 합니다.",
      "매크로 지표뿐만 아니라 '스마트 머니'가 어디로 향하는지 추적하는 눈이 필요합니다.",
      "불스아이는 월가의 복잡한 언어를 쉬운 데이터로 번역하여 전달합니다."
    ]
  },
  "6": {
    title: "제2의 월급, 배당주 투자의 기초", tag: "Income", content: [
      "시간에 투자하여 복리 효과를 극대화하는 가장 강력한 방법입니다. '배당 성장주'에 주목하십시오.",
      "단순히 시가배당률이 높은 곳보다, 이익 성장이 동반되어 배당을 꾸준히 늘릴 수 있는 기업을 선별해야 합니다.",
      "배당금을 재투자하는 것만으로도 장기 수익률은 기하급수적으로 차이가 납니다."
    ]
  },
  "7": {
    title: "미국 주식 시장의 3대 지수 완벽 정복",
    tag: "Global",
    content: [
      "미국 주식 시장을 이해하기 위해서는 시장을 대표하는 3대 지수인 S&P 500, 나스닥(NASDAQ), 다우 존스(Dow Jones)를 먼저 알아야 합니다.",
      "첫째, S&P 500은 미국 상장 기업 중 우량주 500개를 선별한 지수로, 기관 투자자들이 가장 신뢰하는 시장 지표입니다. 전반적인 미국 경제의 체력을 보여줍니다.",
      "둘째, 나스닥은 기술주와 성장주 중심의 지수입니다. 금리에 민감하게 반응하며, 혁신 기업들의 성과를 가장 빠르게 반영하는 특징이 있습니다.",
      "셋째, 다우 지수는 전통적인 산업군 30개 종목을 평균한 것으로 시장의 역사와 전통을 상징합니다. 각 지수의 흐름을 비교하며 매크로 환경을 분석하는 습관이 중요합니다."
    ]
  },
  "8": {
    title: "AI 혁명과 반도체 사이클의 이해",
    tag: "Tech",
    content: [
      "인공지능(AI)은 단순한 테마를 넘어 거대한 산업 패러다임의 전환을 불러오고 있습니다. 그리고 그 중심에는 '반도체'가 있습니다.",
      "첫째, AI 학습에 필수적인 GPU와 고대역폭메모리(HBM)의 수요 폭발에 주목하십시오. 하드웨어 인프라가 갖춰진 뒤에 소프트웨어 서비스가 꽃피우게 됩니다.",
      "둘째, 반도체는 업황의 굴곡이 있는 '사이클 산업'입니다. 재고 수준과 공급망 변화를 읽어 저점에서 매수하고 고점에서 수익을 실현하는 호흡이 필요합니다.",
      "마지막으로, 빅테크 기업들의 자본 지출(CAPEX) 규모를 추적하십시오. 그들의 투자가 어디로 향하는지가 다음 상승장의 강력한 힌트가 됩니다."
    ]
  }
};

export function generateStaticParams() {
  return Object.keys(guideContents).map((id) => ({ id: id }));
}

export default async function GuideDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const guide = guideContents[id] || guideContents["1"];

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <div className="mb-12">
          <Link href="/guide" className="text-sm font-black text-red-600 uppercase tracking-widest hover:opacity-70 transition-opacity">← Back to Guides</Link>
        </div>
        <header className="mb-12">
          <span className="inline-block px-3 py-1 border border-red-600 text-red-600 text-[10px] font-black uppercase tracking-tighter rounded mb-6">{guide.tag} Insight</span>
          <h1 className="text-4xl md:text-5xl font-black leading-[1.1] mb-8 break-keep">{guide.title}</h1>
          <div className="h-1 w-20 bg-red-600"></div>
        </header>
        <div className="my-12"><AdSense slot="5566778899" format="horizontal" /></div>
        <article className="prose prose-lg dark:prose-invert max-w-none">
          {guide.content.map((paragraph, index) => (
            <p key={index} className="text-lg md:text-xl leading-relaxed mb-8 font-medium opacity-90 break-keep">{paragraph}</p>
          ))}
        </article>
        <footer className="mt-24 pt-12 border-t text-center" style={{ borderColor: "var(--border-color)" }}>
          <p className="text-sm font-bold opacity-50 mb-8">본 콘텐츠는 불스아이의 주관적인 의견이며, 모든 투자의 책임은 본인에게 있습니다.</p>
          <Link href="/guide" className="px-10 py-4 border-2 border-red-600 text-red-600 font-black rounded-full hover:bg-red-600 hover:text-white transition-all shadow-lg hover:-translate-y-1">다른 가이드 더 읽기</Link>
        </footer>
      </main>
    </div>
  );
}