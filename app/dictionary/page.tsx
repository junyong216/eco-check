"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AdSense from "@/components/AdSense";

const dictCategories = ["전체", "주식기초", "재무제표", "거시경제", "투자전략", "미국/해외주식", "지수/상품"];

function DictionaryContent() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("전체");

  const terms = [
    { category: "주식기초", word: "매수 & 매도", desc: "주식을 사는 것을 '매수', 주식을 파는 것을 '매도'라고 합니다. 투자의 가장 기본이 되는 첫걸음입니다." },
    { category: "주식기초", word: "예수금", desc: "주식 거래를 위해 계좌에 넣어둔 현금입니다. 주식을 사기 전 대기 중인 돈이라고 보면 됩니다." },
    { category: "주식기초", word: "배당금", desc: "회사가 이익을 내서 주주들에게 그 결실을 나눠주는 현금 보너스입니다." },
    { category: "주식기초", word: "시가총액", desc: "주가에 총 발행 주식 수를 곱한 금액으로, 그 회사의 실제 시장 가치를 말합니다." },
    { category: "주식기초", word: "호가", desc: "주식을 팔거나 사고 싶은 가격을 시장에 미리 부르는 것을 말합니다." },
    { category: "주식기초", word: "공매도", desc: "주가가 내려갈 것을 예상하고 주식을 빌려서 파는 전략입니다. 나중에 낮은 가격으로 다시 사서 갚으면 그 차액만큼 이익을 보는 구조입니다." },
    { category: "주식기초", word: "서킷브레이커", desc: "주가가 갑자기 폭락할 때 시장의 충격을 완화하기 위해 주식 매매를 일시적으로 완전히 정지시키는 제도입니다." },
    { category: "주식기초", word: "IPO", desc: "기업 공개. 비상장 기업이 외부 투자자에게 처음으로 주식을 공개하고 증권 시장에 상장하는 절차를 의미합니다." },
    { category: "주식기초", word: "증자", desc: "기업이 자본금을 늘리기 위해 새 주식을 발행하는 것입니다. 대가 없이 주면 무상증자, 돈을 받고 팔면 유상증자라고 합니다." },
    { category: "주식기초", word: "보호예수", desc: "상장 직후 대주주가 주식을 바로 팔아 치우지 못하도록 일정 기간 매도를 금지하는 제도입니다. 이 기간이 풀리면 매물이 쏟아질 수 있습니다." },
    { category: "주식기초", word: "ETF (상장지수펀드)", desc: "주식처럼 거래소에 상장되어 실시간으로 매매되는 펀드입니다. 여러 종목을 묶어 하나로 만든 '종합 선물 세트' 같아서, 한 번의 거래로 분산 투자 효과를 얻을 수 있는 것이 가장 큰 장점입니다." },
    { category: "주식기초", word: "반대매매", desc: "빌린 돈으로 산 주식의 가치가 일정 수준 이하로 떨어지면 증권사가 강제로 주식을 팔아버리는 것을 말합니다." },
    { category: "주식기초", word: "미수거래", desc: "전체 주식 대금의 일부만 내고 외상으로 주식을 사는 것으로, 보통 3일 안에 대금을 갚아야 합니다." },
    { category: "주식기초", word: "신용융자", desc: "증권사에서 돈을 빌려 주식을 사는 것으로, 미수거래보다 긴 기간 동안 이자를 내며 빌릴 수 있습니다." },
    { category: "주식기초", word: "VI (변동성 완화장치)", desc: "개별 종목의 주가가 갑자기 급변할 때 2분간 거래를 일시 중지시켜 과열을 식히는 제도입니다." },
    { category: "재무제표", word: "자기자본 (Equity)", desc: "기업의 총자산에서 빌린 돈(부채)을 뺀 순수한 회사의 자산입니다. 주주들이 실제로 소유하고 있는 몫을 의미합니다." },
    { category: "재무제표", word: "PER", desc: "주가수익비율. 기업이 버는 돈에 비해 주가가 얼마나 높게 평가되었는지 보여주는 지표입니다." },
    { category: "재무제표", word: "ROE", desc: "자기자본이익률. 기업이 주주의 돈을 활용해 얼마나 효율적으로 이익을 냈는지 보여줍니다." },
    { category: "재무제표", word: "PBR", desc: "주가순자산비율. 주가가 기업이 가진 자산 가치에 비해 몇 배로 거래되는지 나타냅니다." },
    { category: "재무제표", word: "영업이익", desc: "기업이 순수하게 장사를 해서 남긴 이익입니다. 매출에서 모든 비용을 뺀 핵심 성적표입니다." },
    { category: "재무제표", word: "EPS", desc: "주당순이익. 기업이 벌어들인 순이익을 총 발행 주식 수로 나눈 값입니다. 주식 1주당 이익을 얼마나 창출했는지를 나타내는 핵심 수익성 지표입니다." },
    { category: "재무제표", word: "부채비율", desc: "타인의 자본과 내 자본의 비율을 뜻합니다. 보통 100% 이하를 우량하다고 보며, 기업이 재무적으로 얼마나 안전한지를 판단하는 기준이 됩니다." },
    { category: "재무제표", word: "영업이익률", desc: "매출액 대비 영업이익의 비중입니다. 기업이 장사를 얼마나 효율적으로 잘했는지, 경쟁력이 얼마나 있는지를 보여주는 성적표입니다." },
    { category: "재무제표", word: "유동비율", desc: "1년 안에 현금화할 수 있는 자산이 부채보다 얼마나 많은지 나타냅니다. 기업의 단기 지급 능력을 평가할 때 사용합니다." },
    { category: "재무제표", word: "잉여현금흐름(FCF)", desc: "기업이 영업 활동을 하고 세금과 설비 투자비를 뺀 뒤 남은 순수한 현금입니다. 배당금의 원천이 되기도 하는 아주 중요한 데이터입니다." },
    { category: "재무제표", word: "가이던스", desc: "기업이 향후 실적에 대해 공식적으로 발표하는 예상 전망치로, 실제 실적보다 주가에 더 큰 영향을 주기도 합니다." },
    { category: "재무제표", word: "어닝 서프라이즈", desc: "기업의 실제 실적이 시장이 예상했던 기대치보다 훨씬 좋게 발표되는 것을 말합니다." },
    { category: "거시경제", word: "디플레이션", desc: "인플레이션과 반대로 물가가 지속적으로 하락하는 현상입니다. 소비가 위축되고 경제 활력이 떨어지는 신호로 해석됩니다." },
    { category: "거시경제", word: "금리", desc: "돈의 가격입니다. 금리가 오르면 시장에 도는 돈이 줄어들어 보통 주가에는 악영향을 줍니다." },
    { category: "거시경제", word: "인플레이션", desc: "물가가 지속적으로 오르는 현상입니다. 내 돈의 구매력이 예전보다 낮아짐을 의미합니다." },
    { category: "거시경제", word: "환율", desc: "우리나라 돈과 다른 나라 돈의 교환 비율입니다. 수출입 기업의 이익에 직접적인 영향을 줍니다." },
    { category: "거시경제", word: "GDP", desc: "국내총생산. 일정 기간 동안 한 나라 안에서 만들어진 모든 서비스와 재화의 합계입니다." },
    { category: "거시경제", word: "스태그플레이션", desc: "경기 침체(Stagnation)와 물가 상승(Inflation)이 동시에 발생하는 현상입니다. 경제 성장은 멈췄는데 물가만 올라 서민 경제에 가장 치명적인 상황을 말합니다." },
    { category: "거시경제", word: "양적완화", desc: "중앙은행이 시장에 직접 돈을 풀어 경기 침체를 막는 정책입니다. 기준 금리를 낮춰도 효과가 없을 때 사용하는 마지막 카드로 통화량을 강제로 늘리는 방식입니다." },
    { category: "거시경제", word: "테이퍼링", desc: "수도꼭지를 잠그듯 양적완화 정책의 규모를 서서히 줄여나가는 것을 의미합니다. 시장에 풀린 돈을 회수하기 전, 속도를 조절하는 전조 현상으로 통합니다." },
    { category: "거시경제", word: "기저효과", desc: "비교 대상인 이전 수치가 너무 낮거나 높아서, 현재 수치가 실제보다 훨씬 좋아지거나 나빠 보이는 착시 현상을 말합니다." },
    { category: "거시경제", word: "FED (연준)", desc: "미국의 중앙은행인 연방준비제도를 뜻합니다. 전 세계 달러의 공급량을 조절하기 때문에 이들의 금리 결정은 한국 증시에도 막대한 영향을 미칩니다." },
    { category: "거시경제", word: "CPI (소비자물가지수)", desc: "가정에서 소비하는 상품과 서비스의 가격 변동을 나타내며, 인플레이션을 판단하는 가장 중요한 지표입니다." },
    { category: "거시경제", word: "점도표", desc: "미국 연준 위원들이 예상하는 미래 금리 수준을 점으로 찍어 나타낸 표로, 금리 향방의 가이드가 됩니다." },
    { category: "거시경제", word: "FOMC", desc: "미국의 중앙은행인 연준(Fed)이 금리 결정 등 주요 통화 정책을 결정하는 정례 회의입니다." },
    { category: "거시경제", word: "베이비스텝 & 빅스텝", desc: "금리를 0.25%p 올리는 것을 베이비스텝, 0.5%p 올리는 것을 빅스텝이라고 부릅니다." },
    { category: "거시경제", word: "월가 (Wall Street)", desc: "미국 뉴욕에 있는 세계 금융의 중심지입니다. 주요 투자은행, 증권사, 거래소가 모여 있어 전 세계 돈의 흐름을 결정하는 상징적인 장소로 통합니다." },
    { category: "투자전략", word: "분할매수", desc: "리스크를 줄이기 위해 주식을 한 번에 다 사지 않고, 여러 번에 나누어 담는 전략입니다." },
    { category: "투자전략", word: "포트폴리오", desc: "분산 투자를 위해 내 자산을 여러 종목이나 자산군(주식, 채권 등)에 나누어 담은 리스트입니다." },
    { category: "투자전략", word: "손절매", desc: "더 큰 손해를 막기 위해 내가 산 가격보다 낮은 가격이라도 과감히 주식을 파는 것입니다." },
    { category: "투자전략", word: "익절", desc: "수익이 난 상태에서 주식을 팔아 실제로 내 주머니에 이익을 확정 짓는 행위입니다." },
    { category: "투자전략", word: "자산배분", desc: "주식, 채권, 금, 현금 등 성격이 다른 자산에 돈을 나누어 담아 리스크를 낮추고 수익의 안정성을 높이는 전략입니다." },
    { category: "투자전략", word: "복리효과", desc: "이자에 이자가 붙는 원리입니다. 시간이 갈수록 원금이 눈덩이처럼 불어나는 현상으로, 가치 투자의 가장 강력한 무기입니다." },
    { category: "투자전략", word: "모멘텀 투자", desc: "주가가 상승하는 추세를 타서 매매하는 방식입니다. 오르는 주식이 더 오를 것이라는 기대감에 투자하는 기법입니다." },
    { category: "투자전략", word: "배당성향", desc: "기업이 벌어들인 순이익 중 얼마를 주주에게 배당으로 주는지 나타내는 비율입니다. 이 비율이 높을수록 주주 환원에 적극적인 기업입니다." },
    { category: "투자전략", word: "안전마진", desc: "기업의 실제 가치보다 주가가 훨씬 낮게 거래될 때의 차이를 말합니다. 손실을 보지 않기 위해 확보하는 심리적, 수치적 여유분입니다." },
    { category: "투자전략", word: "선물거래 (Futures)", desc: "미래의 특정 시점에 정해진 가격으로 상품을 사고팔기로 약속하는 거래입니다. 주가 하락이 예상될 때 수익을 내는 '숏(Short)' 포지션이 가능하며, 적은 돈으로 큰 수익을 노리는 레버리지가 가능하지만 그만큼 손실 위험도 매우 큽니다." },
    { category: "투자전략", word: "롱 (Long) & 숏 (Short)", desc: "주가가 오를 것에 투자하는 것을 '롱(매수)', 주가가 내려갈 것에 투자하는 것을 '숏(공매도/매도)'이라고 합니다." },
    { category: "투자전략", word: "레버리지 (Leverage)", desc: "지렛대라는 뜻으로, 실제 가진 돈보다 몇 배 더 많은 금액을 투자하는 기법입니다." },
    { category: "투자전략", word: "커버드콜", desc: "주식을 보유하면서 동시에 콜옵션을 팔아 주가 하락 시 손실을 방어하고 추가 수익을 얻는 전략입니다." },
    { category: "투자전략", word: "디폴트", desc: "국가나 기업이 빌린 돈의 원금이나 이자를 정해진 기간 안에 갚지 못하는 채무불이행 상태를 말합니다." },
    { category: "투자전략", word: "리밸런싱", desc: "주가 변동으로 인해 변해버린 자산 비중을 다시 처음 계획했던 비율로 조정하는 작업입니다. 수익이 난 자산을 팔고 저평가된 자산을 사서 위험을 관리합니다." },
    { category: "미국/해외주식", word: "나스닥 (NASDAQ)", desc: "미국의 대표적인 IT/기술주 중심의 거래소입니다. 애플, 구글 등 혁신 기업들이 대거 상장되어 있습니다." },
    { category: "미국/해외주식", word: "다우 지수 (Dow Jones)", desc: "미국에서 가장 오래된 주가지수로, 대표적인 우량 기업 30개를 선정해 주가 평균을 산출합니다." },
    { category: "미국/해외주식", word: "양도소득세", desc: "해외 주식 투자로 얻은 수익이 연 250만 원을 넘을 경우, 초과 수익의 22%를 국가에 내는 세금입니다." },
    { category: "미국/해외주식", word: "서학개미", desc: "국내 주식 시장을 넘어 미국 등 해외 주식에 직접 투자하는 한국 개인 투자자들을 일컫는 말입니다." },
    { category: "미국/해외주식", word: "애프터마켓 (After Market)", desc: "정규 시장이 끝난 뒤에 열리는 시간 외 거래 시장입니다." },
    { category: "미국/해외주식", word: "나스닥 100", desc: "금융주를 제외하고 나스닥에 상장된 100개 우량 기술 기업의 주가를 모은 지수입니다." },
    { category: "미국/해외주식", word: "SCHD", desc: "재무가 탄탄하고 10년 이상 배당을 늘려온 미국 우량 기업에 투자하는 대표적인 배당 성장 ETF입니다." },
    { category: "미국/해외주식", word: "M7 (매그니피센트 7)", desc: "애플, MS, 아마존, 알파벳, 엔비디아, 메타, 테슬라 등 미국 증시를 이끄는 7대 빅테크 기업을 뜻합니다." },
    { category: "미국/해외주식", word: "SOXL / SOXS", desc: "미국 반도체 지수의 하루 변동폭을 각각 3배(수익) 또는 -3배(손실)로 추종하는 초고위험 ETF입니다." },
    { category: "미국/해외주식", word: "JEPI", desc: "주식 매도 옵션을 활용해 주가 변동성을 낮추고 높은 월배당금을 지급하는 커버드콜 전략의 ETF입니다." },
    { category: "미국/해외주식", word: "본장 & 프리마켓", desc: "미국 주식의 정규 거래 시간(본장)과 그 전후로 열리는 사전/사후 거래 시장을 말합니다." },
    { category: "미국/해외주식", word: "서머타임", desc: "미국의 낮 시간이 길어지는 기간 동안 주식 시장 개장과 마감 시간을 한 시간씩 앞당기는 제도입니다." },
    { category: "미국/해외주식", word: "QQQ", desc: "나스닥 100 지수를 그대로 추종하는 세계적인 ETF입니다." },
    { category: "미국/해외주식", word: "환차익 & 환차손", desc: "주가 변동과 별개로 환율 변동에 따라 얻는 이익이나 손해입니다. 주가가 올라도 달러 가치가 떨어지면 전체 수익이 줄어들 수 있습니다." },
    { category: "미국/해외주식", word: "세이프가드 (Safeguard)", desc: "특정 품목의 수입이 급증해 자국 산업에 피해가 우려될 때 수입을 제한하는 긴급 수입제한 조치입니다. 미국 정책에 따라 관련 종목 주가가 요동치기도 합니다." },
    { category: "지수/상품", word: "S&P 500", desc: "미국 우량 기업 500개의 주가를 모아 만든 지수입니다. 미국 경제의 실질적인 성적표입니다." },
    { category: "지수/상품", word: "원자재 (Commodity)", desc: "석유, 금, 구리, 농산물 등 가공되지 않은 기초 상품입니다." },
    { category: "지수/상품", word: "리츠 (REITs)", desc: "투자자들의 돈을 모아 부동산에 투자하고, 임대료 수익을 주주에게 배당으로 나눠주는 상품입니다." },
    { category: "지수/상품", word: "공포-탐욕 지수 (Fear & Greed Index)", desc: "시장의 심리 상태를 0(극도의 공포)에서 100(극도의 탐욕)까지 숫자로 나타낸 지수입니다." },
    { category: "지수/상품", word: "채권 (Bond)", desc: "정부나 기업이 돈을 빌리기 위해 발행하는 차용증입니다. 안전 자산으로 분류됩니다." },
    { category: "지수/상품", word: "필라델피아 반도체 지수", desc: "글로벌 반도체 설계 및 제조 관련 글로벌 기업 30개의 성적을 합친 지수입니다." },
    { category: "지수/상품", word: "VIX (공포지수)", desc: "시장의 불안감이 커질수록 수치가 올라가며, 향후 증시의 변동성을 예측하는 지표로 쓰입니다." },
    { category: "지수/상품", word: "나스닥100 레버리지 (TQQQ)", desc: "나스닥 100 지수의 하루 수익률을 3배로 추종하는 공격적인 투자 상품입니다." },
    { category: "지수/상품", word: "S&P500 인버스 (SH)", desc: "지수가 하락할 때 수익이 나도록 설계된 상품입니다." }
  ];

  useEffect(() => {
    const cat = searchParams.get("cat");
    const word = searchParams.get("word");
    if (cat && dictCategories.includes(cat)) setActiveCategory(cat);
    if (word) setSearchTerm(word);
  }, [searchParams]);

  const filteredTerms = terms
    .filter(item => {
      const matchesSearch = item.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           item.desc.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === "전체" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => a.word.localeCompare(b.word, 'ko'));

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      <main className="max-w-5xl mx-auto px-5 py-12 md:py-20">
        <header className="mb-16 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-black mb-10 tracking-tight italic uppercase" style={{ color: "var(--text-main)" }}>Dictionary</h1>
          <div className="relative max-w-2xl mx-auto md:mx-0">
            <input
              type="text"
              placeholder="투자 용어를 검색하세요 (예: PER, 금리)"
              className="w-full h-16 md:h-20 px-8 rounded-3xl border-2 focus:border-red-600 shadow-xl outline-none text-base font-bold transition-all"
              style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)", color: "var(--text-main)" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="mt-12 mb-10"><AdSense slot="1122334455" format="fluid" /></div>

          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {dictCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-2xl font-black text-sm transition-all ${activeCategory === cat ? "bg-red-600 text-white shadow-xl scale-105" : "border opacity-60 hover:opacity-100"}`}
                style={{ backgroundColor: activeCategory === cat ? "" : "var(--card-bg)", color: activeCategory === cat ? "#fff" : "var(--text-sub)", borderColor: "var(--border-color)" }}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTerms.length > 0 ? (
            filteredTerms.map((item, i) => (
              <div key={i} className="p-8 rounded-[32px] border shadow-sm hover:shadow-2xl hover:border-red-500 transition-all group flex flex-col justify-between" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                <div>
                  <span className="text-[11px] font-black text-red-600 mb-4 block uppercase tracking-[0.2em]">{item.category}</span>
                  <h4 className="font-black mb-4 text-2xl group-hover:text-red-600 transition-colors tracking-tight">{item.word}</h4>
                  <p className="text-[15px] font-bold opacity-70 leading-relaxed break-keep" style={{ color: "var(--text-sub)" }}>{item.desc}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-2xl font-black opacity-20 italic uppercase mb-4 text-red-600">No Terms Targeted</p>
              <button onClick={() => {setSearchTerm(""); setActiveCategory("전체");}} className="font-bold border-b border-red-600">모든 용어 보기</button>
            </div>
          )}
        </div>

        <div className="text-center mt-24">
          <Link href="/" className="inline-block px-14 py-6 bg-red-600 text-white rounded-full font-black text-xl hover:bg-red-700 transition shadow-2xl hover:-translate-y-1">홈으로 돌아가기</Link>
        </div>
      </main>

      <footer className="py-12 border-t text-center" style={{ borderColor: "var(--border-color)" }}>
        <div className="flex justify-center gap-6 mb-4 text-[10px] font-black text-red-600/50 uppercase tracking-widest">
          <Link href="/privacy" className="hover:text-red-600 transition">개인정보 처리방침</Link>
          <Link href="/terms" className="hover:text-red-600 transition">이용약관</Link>
        </div>
        <div className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-40" style={{ color: "var(--text-sub)" }}>© 2026 BULL'S EYE. ALL RIGHTS RESERVED.</div>
      </footer>
    </div>
  );
}

export default function DictionaryPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-black animate-pulse text-red-600 italic">Targeting Data...</div>}>
      <DictionaryContent />
    </Suspense>
  );
}