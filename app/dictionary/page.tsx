"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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

function DictionaryContent() {
  const searchParams = useSearchParams();
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("전체");

  const terms = [
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
    { category: "재무제표", word: "PER", desc: "주가수익비율. 기업이 버는 돈에 비해 주가가 얼마나 높게 평가되었는지 보여주는 지표입니다." },
    { category: "재무제표", word: "ROE", desc: "자기자본이익률. 기업이 주주의 돈을 활용해 얼마나 효율적으로 이익을 냈는지 보여줍니다." },
    { category: "재무제표", word: "PBR", desc: "주가순자산비율. 주가가 기업이 가진 자산 가치에 비해 몇 배로 거래되는지 나타냅니다." },
    { category: "재무제표", word: "영업이익", desc: "기업이 순수하게 장사를 해서 남긴 이익입니다. 매출에서 모든 비용을 뺀 핵심 성적표입니다." },
    { category: "재무제표", word: "EPS", desc: "주당순이익. 기업이 벌어들인 순이익을 총 발행 주식 수로 나눈 값입니다. 주식 1주당 이익을 얼마나 창출했는지를 나타내는 핵심 수익성 지표입니다." },
    { category: "재무제표", word: "부채비율", desc: "타인의 자본과 내 자본의 비율을 뜻합니다. 보통 100% 이하를 우량하다고 보며, 기업이 재무적으로 얼마나 안전한지를 판단하는 기준이 됩니다." },
    { category: "재무제표", word: "영업이익률", desc: "매출액 대비 영업이익의 비중입니다. 기업이 장사를 얼마나 효율적으로 잘했는지, 경쟁력이 얼마나 있는지를 보여주는 성적표입니다." },
    { category: "재무제표", word: "유동비율", desc: "1년 안에 현금화할 수 있는 자산이 부채보다 얼마나 많은지 나타냅니다. 기업의 단기 지급 능력을 평가할 때 사용합니다." },
    { category: "재무제표", word: "잉여현금흐름(FCF)", desc: "기업이 영업 활동을 하고 세금과 설비 투자비를 뺀 뒤 남은 순수한 현금입니다. 배당금의 원천이 되기도 하는 아주 중요한 데이터입니다." },
    { category: "거시경제", word: "금리", desc: "돈의 가격입니다. 금리가 오르면 시장에 도는 돈이 줄어들어 보통 주가에는 악영향을 줍니다." },
    { category: "거시경제", word: "인플레이션", desc: "물가가 지속적으로 오르는 현상입니다. 내 돈의 구매력이 예전보다 낮아짐을 의미합니다." },
    { category: "거시경제", word: "환율", desc: "우리나라 돈과 다른 나라 돈의 교환 비율입니다. 수출입 기업의 이익에 직접적인 영향을 줍니다." },
    { category: "거시경제", word: "GDP", desc: "국내총생산. 일정 기간 동안 한 나라 안에서 만들어진 모든 서비스와 재화의 합계입니다." },
    { category: "거시경제", word: "스태그플레이션", desc: "경기 침체(Stagnation)와 물가 상승(Inflation)이 동시에 발생하는 현상입니다. 경제 성장은 멈췄는데 물가만 올라 서민 경제에 가장 치명적인 상황을 말합니다." },
    { category: "거시경제", word: "양적완화", desc: "중앙은행이 시장에 직접 돈을 풀어 경기 침체를 막는 정책입니다. 기준 금리를 낮춰도 효과가 없을 때 사용하는 마지막 카드로 통화량을 강제로 늘리는 방식입니다." },
    { category: "거시경제", word: "테이퍼링", desc: "수도꼭지를 잠그듯 양적완화 정책의 규모를 서서히 줄여나가는 것을 의미합니다. 시장에 풀린 돈을 회수하기 전, 속도를 조절하는 전조 현상으로 통합니다." },
    { category: "거시경제", word: "기저효과", desc: "비교 대상인 이전 수치가 너무 낮거나 높아서, 현재 수치가 실제보다 훨씬 좋아지거나 나빠 보이는 착시 현상을 말합니다." },
    { category: "거시경제", word: "FED (연준)", desc: "미국의 중앙은행인 연방준비제도를 뜻합니다. 전 세계 달러의 공급량을 조절하기 때문에 이들의 금리 결정은 한국 증시에도 막대한 영향을 미칩니다." },
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
    { category: "투자전략", word: "롱 (Long) & 숏 (Short)", desc: "주가가 오를 것에 투자하는 것을 '롱(매수)', 주가가 내려갈 것에 투자하는 것을 '숏(공매도/매도)'이라고 합니다. 선물거래에서는 시장의 상승과 하락 양방향 모두에 투자하여 수익을 낼 수 있는 기회가 있습니다." },
    { category: "투자전략", word: "레버리지 (Leverage)", desc: "지렛대라는 뜻으로, 실제 가진 돈보다 몇 배 더 많은 금액을 투자하는 기법입니다. 수익이 나면 배로 벌지만, 반대로 주가가 조금만 반대로 움직여도 원금을 모두 잃을 수 있는 '청산'의 위험이 있습니다." }
  ];

  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat && dictCategories.includes(cat)) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  const filteredTerms = terms.filter(item => {
    const matchesSearch = item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "전체" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => a.word.localeCompare(b.word, 'ko'));

  return (
    <div className="min-h-screen font-sans transition-colors duration-300" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>

      {/* --- 네비게이션 (모든 페이지 공용) --- */}
      <nav className="h-16 border-b flex items-center justify-between px-4 md:px-8 sticky top-0 z-[300] transition-colors shadow-sm"
        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>

        <div className="flex items-center gap-4">
          <Link href="/" className="font-black text-xl md:text-2xl text-red-600 tracking-tighter italic">BULL'S EYE</Link>
          <DarkModeToggle />
        </div>

        <div className="flex items-center h-full font-black text-[15px]">
          {/* [PC용 메뉴] gap-8로 모든 페이지 간격 통일 */}
          <div className="hidden lg:flex items-center h-full gap-8 mr-6">

            {/* 뉴스 */}
            <div className="relative h-full flex items-center group" onMouseEnter={() => setOpenDropdown('news')} onMouseLeave={() => setOpenDropdown(null)}>
              <span className="flex items-center gap-1 cursor-pointer transition-colors"
                style={{ color: openDropdown === 'news' ? '#dc2626' : 'var(--text-main)' }}>
                뉴스 <span className={`text-[10px] transition-transform duration-300 ${openDropdown === 'news' ? 'rotate-180' : ''}`}>▼</span>
              </span>
              <div className={`absolute top-16 left-1/2 -translate-x-1/2 w-44 py-2 rounded-2xl border shadow-2xl transition-all ${openDropdown === 'news' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                <Link href="/news" className="block px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition text-[13px] font-bold" style={{ color: "var(--text-main)" }}>뉴스 홈</Link>
                {newsCategories.map(cat => (
                  <a key={cat.id} href={`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(cat.query)}`} target="_blank" className="block px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition text-[13px]" style={{ color: "var(--text-main)" }}>{cat.name}</a>
                ))}
              </div>
            </div>

            {/* 증권 (증권 홈 삭제) */}
            <div className="relative h-full flex items-center group" onMouseEnter={() => setOpenDropdown('stock')} onMouseLeave={() => setOpenDropdown(null)}>
              <span className="flex items-center gap-1 cursor-pointer transition-colors"
                style={{ color: openDropdown === 'stock' ? '#dc2626' : 'var(--text-main)' }}>
                증권 <span className={`text-[10px] transition-transform duration-300 ${openDropdown === 'stock' ? 'rotate-180' : ''}`}>▼</span>
              </span>
              <div className={`absolute top-16 left-1/2 -translate-x-1/2 w-44 py-2 rounded-2xl border shadow-2xl transition-all ${openDropdown === 'stock' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                <Link href="/stock?tab=list" className="block px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition text-[13px] font-bold" style={{ color: "var(--text-main)" }}>증권사 목록</Link>
                <Link href="/stock?tab=guide" className="block px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition text-[13px] font-bold" style={{ color: "var(--text-main)" }}>계좌 가이드</Link>
              </div>
            </div>

            {/* 용어사전 */}
            <div className="relative h-full flex items-center group" onMouseEnter={() => setOpenDropdown('dict')} onMouseLeave={() => setOpenDropdown(null)}>
              <span className="flex items-center gap-1 cursor-pointer transition-colors"
                style={{ color: openDropdown === 'dict' ? '#dc2626' : 'var(--text-main)' }}>
                용어사전 <span className={`text-[10px] transition-transform duration-300 ${openDropdown === 'dict' ? 'rotate-180' : ''}`}>▼</span>
              </span>
              <div className={`absolute top-16 left-1/2 -translate-x-1/2 w-44 py-2 rounded-2xl border shadow-2xl transition-all ${openDropdown === 'dict' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                {dictCategories.map(cat => (
                  <Link key={cat} href={`/dictionary?cat=${cat}`} className="block px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition text-[13px]" style={{ color: "var(--text-main)" }}>{cat}</Link>
                ))}
              </div>
            </div>

            {/* 추천 */}
            <div className="relative h-full flex items-center group" onMouseEnter={() => setOpenDropdown('recommend')} onMouseLeave={() => setOpenDropdown(null)}>
              <span className="flex items-center gap-1 cursor-pointer transition-colors"
                style={{ color: openDropdown === 'recommend' ? '#dc2626' : 'var(--text-main)' }}>
                추천 <span className={`text-[10px] transition-transform duration-300 ${openDropdown === 'recommend' ? 'rotate-180' : ''}`}>▼</span>
              </span>
              <div className={`absolute top-16 left-1/2 -translate-x-1/2 w-44 py-2 rounded-2xl border shadow-2xl transition-all ${openDropdown === 'recommend' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                <Link href="/recommend?tab=books" className="block px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition text-[13px] font-bold" style={{ color: "var(--text-main)" }}>추천 도서</Link>
                <Link href="/recommend?tab=videos" className="block px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition text-[13px] font-bold" style={{ color: "var(--text-main)" }}>추천 영상</Link>
              </div>
            </div>
          </div>

          <button onClick={() => setIsFullMenuOpen(!isFullMenuOpen)} className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none z-[310]">
            <div className={`w-6 h-0.5 transition-all duration-300 ${isFullMenuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
            <div className={`w-6 h-0.5 transition-all duration-300 ${isFullMenuOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
            <div className={`w-6 h-0.5 transition-all duration-300 ${isFullMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
          </button>
        </div>

        {/* --- 전체 메뉴 레이어 (증권 페이지와 동일) --- */}
        <AnimatePresence>
          {isFullMenuOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsFullMenuOpen(false)}
                className="fixed inset-0 bg-black/20 dark:bg-black/50 z-[240] backdrop-blur-[2px]" />
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-x-0 top-16 z-[250] overflow-hidden shadow-2xl border-b"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 p-10 font-bold">
                  <div>
                    <div className="text-red-600 font-black text-xs mb-4 uppercase tracking-widest border-b border-red-600 pb-2">뉴스</div>
                    <div className="flex flex-col gap-3">
                      <Link href="/news" onClick={() => setIsFullMenuOpen(false)} className="text-[14px] font-bold hover:text-red-600" style={{ color: "var(--text-main)" }}>뉴스 홈</Link>
                      {newsCategories.map(cat => (
                        <a key={cat.id} href={`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(cat.query)}`} target="_blank" className="text-[14px] hover:text-red-600" style={{ color: "var(--text-main)" }}>{cat.name}</a>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-red-600 font-black text-xs mb-4 uppercase tracking-widest border-b border-red-600 pb-2">증권</div>
                    <div className="flex flex-col gap-3 text-[14px]">
                      <Link href="/stock?tab=list" onClick={() => setIsFullMenuOpen(false)} className="hover:text-red-600" style={{ color: "var(--text-main)" }}>증권사 목록</Link>
                      <Link href="/stock?tab=guide" onClick={() => setIsFullMenuOpen(false)} className="hover:text-red-600" style={{ color: "var(--text-main)" }}>계좌 가이드</Link>
                    </div>
                  </div>
                  <div>
                    <div className="text-red-600 font-black text-xs mb-4 uppercase tracking-widest border-b border-red-600 pb-2">용어사전</div>
                    <div className="flex flex-col gap-3 text-[14px]">
                      {dictCategories.map(cat => (
                        <Link key={cat} href={`/dictionary?cat=${cat}`} onClick={() => setIsFullMenuOpen(false)} className="hover:text-red-600" style={{ color: "var(--text-main)" }}>{cat}</Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-red-600 font-black text-xs mb-4 uppercase tracking-widest border-b border-red-600 pb-2">추천</div>
                    <div className="flex flex-col gap-3 text-[14px]">
                      {recommendTabs.map(tab => (
                        <Link key={tab.slug} href={`/recommend?tab=${tab.slug}`} onClick={() => setIsFullMenuOpen(false)} className="hover:text-red-600" style={{ color: "var(--text-main)" }}>{tab.name}</Link>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* --- 메인 콘텐츠 --- */}
      <main className="max-w-5xl mx-auto px-5 py-12 md:py-20">
        <header className="mb-16 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-black mb-10 tracking-tight italic uppercase" style={{ color: "var(--text-main)" }}>Dictionary</h1>
          <div className="relative max-w-2xl mx-auto md:mx-0 group">
            <input
              type="text"
              placeholder="투자 용어를 검색하세요 (예: PER, 금리)"
              className="w-full h-16 md:h-20 px-8 rounded-3xl border-2 focus:border-red-600 shadow-xl outline-none text-base font-bold transition-all"
              style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)", color: "var(--text-main)" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="mt-12 mb-10">
            <AdSense slot="1122334455" format="fluid" />
          </div>

          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {dictCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-2xl font-black text-sm transition-all ${activeCategory === cat ? "bg-red-600 text-white shadow-xl scale-105" : "border opacity-60 hover:opacity-100"}`}
                style={{ backgroundColor: activeCategory === cat ? "" : "var(--card-bg)", color: activeCategory === cat ? "#fff" : "var(--text-sub)", borderColor: "var(--border-color)" }}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTerms.map((item, i) => (
            <div key={i} className="p-8 rounded-[32px] border shadow-sm hover:shadow-2xl hover:border-red-500 transition-all group flex flex-col justify-between" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
              <div>
                <span className="text-[11px] font-black text-red-600 mb-4 block uppercase tracking-[0.2em]">{item.category}</span>
                <h4 className="font-black mb-4 text-2xl group-hover:text-red-600 transition-colors tracking-tight">{item.word}</h4>
                <p className="text-[15px] font-bold opacity-70 leading-relaxed break-keep" style={{ color: "var(--text-sub)" }}>{item.desc}</p>
              </div>
            </div>
          ))}
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
        <div className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-40" style={{ color: "var(--text-sub)" }}>
          © 2026 BULL'S EYE. ALL RIGHTS RESERVED.
        </div>
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