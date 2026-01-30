"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AdSense from "@/components/AdSense";

// --- 데이터 (원본 유지) ---
const brokers = [
  { name: "미래에셋증권", link: "https://securities.miraeasset.com/", desc: "국내 최대 자기자본 보유" },
  { name: "한국투자증권", link: "https://www.truefriend.com/", desc: "국내외 투자금융 강자" },
  { name: "NH투자증권", link: "https://www.nhqv.com/", desc: "나무증권 등 편리한 플랫폼" },
  { name: "KB증권", link: "https://www.kbsec.com/", desc: "금융그룹 연계 서비스 강점" },
  { name: "메리츠증권", link: "https://home.imeritz.com/", desc: "높은 수익률 및 기업금융 특화" },
  { name: "삼성증권", link: "https://www.samsungpop.com/", desc: "신뢰도 높은 자산관리 브랜드" },
  { name: "하나증권", link: "https://www.hanaw.com/", desc: "종합 자산관리 전문성" },
  { name: "키움증권", link: "https://www.kiwoom.com/", desc: "개인 투자자 점유율 독보적 1위" },
  { name: "신한투자증권", link: "https://www.shinhansec.com/", desc: "신한금융그룹 통합 서비스" },
  { name: "대신증권", link: "https://www.daishin.com/", desc: "전통의 명문, 크레온 플랫폼" },
  { name: "교보증권", link: "https://www.iprovest.com/", desc: "국내 1호 증권사, 안정적 운영" },
  { name: "유안타증권", link: "https://www.myasset.com/", desc: "티레이더 등 특화 시스템" },
  { name: "한화투자증권", link: "https://www.hanwhawm.com/", desc: "STEPS 등 친절한 투자 앱" },
  { name: "현대차증권", link: "https://www.hmsec.com/", desc: "현대차그룹 연계 퇴직연금 강점" },
  { name: "아이엠증권", link: "https://www.imfnsec.com/", desc: "DGB금융그룹 계열 증권사" },
  { name: "IBK투자증권", link: "https://www.ibks.com/", desc: "중소기업 지원 및 정책금융 특화" },
  { name: "신영증권", link: "https://www.shinyoung.com/", desc: "가치투자 및 자산승계 전문" },
  { name: "LS증권", link: "https://www.ls-sec.co.kr/", desc: "이베스트투자증권의 새 이름" },
  { name: "BNK투자증권", link: "https://www.bnkfn.co.kr/", desc: "동남권 최대 금융그룹 계열" },
  { name: "유진투자증권", link: "https://www.eugenefn.com/", desc: "강소 증권사로서의 맞춤형 서비스" }
];

const accounts = [
  { type: "CMA", name: "종합자산관리계좌", desc: "하루만 맡겨도 이자가 붙어 비상금 보관에 최적화된 수시 입출금 계좌입니다." },
  { type: "ISA", name: "개인종합관리계좌", desc: "한 계좌에서 주식, 펀드 등을 운용하며 '절세 혜택'을 누리는 만능 재테크 통장입니다." },
  { type: "IRP", name: "개인형 퇴직연금", desc: "소득이 있는 사람이라면 필수! 노후 준비와 연말정산 세액공제 혜택을 받습니다." },
  { type: "연금저축", name: "연금저축펀드", desc: "IRP보다 운용이 자유롭고, 세액공제를 받으며 ETF 등에 장기 투자하기 좋습니다." },
  { type: "외화계좌", name: "외화/해외주식계좌", desc: "미국 주식 등 해외 투자를 위해 달러를 보유하고 거래를 할 수 있는 계좌입니다." },
  { type: "위탁계좌", name: "일반 주식계좌", desc: "제한 없이 자유롭게 국내외 주식을 매매할 수 있는 가장 기본적인 투자 계좌입니다." }
];

const stockKeywords = [
  // --- 미장 (USA - Big Tech & Growth) ---
  { name: "엔비디아", alias: ["nvidia", "nvda", "엔비", "nvdia"] },
  { name: "테슬라", alias: ["tesla", "tsla", "테슬"] },
  { name: "애플", alias: ["apple", "aapl", "아이폰"] },
  { name: "마이크로소프트", alias: ["microsoft", "msft", "마소"] },
  { name: "구글", alias: ["google", "googl", "알파벳", "alphabet"] },
  { name: "아마존", alias: ["amazon", "amzn"] },
  { name: "메타", alias: ["meta", "fb", "페이스북", "facebook"] },
  { name: "넷플릭스", alias: ["netflix", "nflx"] },
  { name: "어도비", alias: ["adobe", "adbe"] },
  { name: "세일즈포스", alias: ["salesforce", "crm"] },
  { name: "AMD", alias: ["암드", "리사수", "advanced micro devices"] },
  { name: "인텔", alias: ["intel", "intc"] },
  { name: "퀄컴", alias: ["qualcomm", "qcom"] },
  { name: "브로드컴", alias: ["broadcom", "avgo"] },
  { name: "ASML", alias: ["노광장비", "에이에스엠엘"] },
  { name: "TSMC", alias: ["tsm", "대만반도체"] },
  { name: "팔란티어", alias: ["palantir", "pltr", "팔란"] },
  { name: "아이온큐", alias: ["ionq", "양자컴퓨터"] },
  { name: "유니티", alias: ["unity", "u"] },
  { name: "코인베이스", alias: ["coinbase", "coin"] },
  { name: "버크셔해더웨이", alias: ["brk", "워렌버핏", "버핏"] },
  { name: "일라이릴리", alias: ["lly", "비만치료제"] },
  { name: "노보노디스크", alias: ["nvo"] },
  { name: "비자", alias: ["visa", "v"] },
  { name: "마스터카드", alias: ["mastercard", "ma"] },
  { name: "JP모건", alias: ["jpmorgan", "jpm"] },
  { name: "뱅크오브아메리카", alias: ["boa", "bac"] },
  { name: "엑슨모빌", alias: ["exxon", "xom"] },
  { name: "코카콜라", alias: ["cocacola", "ko"] },
  { name: "펩시", alias: ["pepsi", "pep"] },
  { name: "스타벅스", alias: ["starbucks", "sbux", "스벅"] },
  { name: "디즈니", alias: ["disney", "dis"] },
  { name: "에어비앤비", alias: ["airbnb", "abnb"] },
  { name: "우버", alias: ["uber"] },
  { name: "리비안", alias: ["rivian", "rivn"] },
  { name: "루시드", alias: ["lucid", "lcid"] },
  { name: "슈퍼마이크로컴퓨터", alias: ["smci", "슈마컴"] },
  { name: "암홀딩스", alias: ["arm"] },
  { name: "스노우플레이크", alias: ["snowflake", "snow"] },
  { name: "크라우드스트라이크", alias: ["crowdstrike", "crwd"] },
  { name: "델 테크놀로지", alias: ["dell"] },
  { name: "오라클", alias: ["oracle", "orcl"] },
  { name: "어플라이드 머티어리얼즈", alias: ["amat", "어플라이드"] },
  { name: "램리서치", alias: ["lrcx"] },
  { name: "KLA", alias: ["kla", "klac"] },
  { name: "버버틱", alias: ["vertiv", "vrt", "데이터센터냉각"] },
  { name: "이튼", alias: ["eaton", "etn", "전력인프라"] },
  { name: "로블록스", alias: ["roblox", "rblx", "메타버스"] },
  { name: "쇼피파이", alias: ["shopify", "shop"] },
  { name: "쿠팡", alias: ["coupang", "cpng"] },
  { name: "레딧", alias: ["reddit", "rddt"] },
  { name: "뉴스케일파워", alias: ["smr", "소형원자로"] },
  { name: "오클로", alias: ["oklo", "샘알트만원전"] },
  { name: "콘스텔레이션 에너지", alias: ["ceg", "원자력"] },
  { name: "퍼스트솔라", alias: ["fslr", "태양광"] },

  // --- 국장 (KOSPI / KOSDAQ) ---
  { name: "삼성전자", alias: ["samsung", "삼전", "sec"] },
  { name: "SK하이닉스", alias: ["skhynix", "하이닉스", "sk"] },
  { name: "LG에너지솔루션", alias: ["lg엔솔", "엔솔"] },
  { name: "삼성바이오로직스", alias: ["삼바", "biologics"] },
  { name: "현대차", alias: ["hyundai", "현대자동차"] },
  { name: "기아", alias: ["kia"] },
  { name: "셀트리온", alias: ["celltrion", "서정진"] },
  { name: "POSCO홀딩스", alias: ["포스코", "posco", "포항제철"] },
  { name: "NAVER", alias: ["naver", "네이버"] },
  { name: "카카오", alias: ["kakao"] },
  { name: "삼성SDI", alias: ["sdi", "삼성에스디아이"] },
  { name: "LG화학", alias: ["lgchem", "엘화"] },
  { name: "KB금융", alias: ["kb금융지주", "리딩뱅크"] },
  { name: "신한지주", alias: ["신한금융"] },
  { name: "포스코퓨처엠", alias: ["futurem"] },
  { name: "에코프로", alias: ["ecopro", "이차전지"] },
  { name: "에코프로비엠", alias: ["ecoprobm"] },
  { name: "현대모비스", alias: ["mobis"] },
  { name: "삼성물산", alias: ["물산"] },
  { name: "카카오뱅크", alias: ["카뱅"] },
  { name: "SK이노베이션", alias: ["이노"] },
  { name: "LG전자", alias: ["엘전"] },
  { name: "두산에너빌리티", alias: ["원전", "두산에너"] },
  { name: "HMM", alias: ["흠", "현대상선"] },
  { name: "크래프톤", alias: ["배그", "krafton"] },
  { name: "메리츠금융지주", alias: ["메리츠"] },
  { name: "HD현대중공업", alias: ["현중"] },
  { name: "한화오션", alias: ["대우조선해양"] },
  { name: "대한항공", alias: ["koreanair"] },
  { name: "포스코인터내셔널", alias: ["포인"] },
  { name: "한미반도체", alias: ["한미"] },
  { name: "알테오젠", alias: ["alteogen"] },
  { name: "HLB", alias: ["에이치엘비"] },
  { name: "삼성생명", alias: ["생명", "삼성금융"] },
  { name: "LG생활건강", alias: ["엘생", "엘지생건"] },
  { name: "고려아연", alias: ["영풍", "zinc"] },
  { name: "한화에어로스페이스", alias: ["방산", "에어로", "K방산"] },
  { name: "LIG넥스원", alias: ["방위산업", "넥스원"] },
  { name: "엔켐", alias: ["전해액", "enchem"] },
  { name: "리노공업", alias: ["반도체검사", "leeno"] },
  { name: "한미약품", alias: ["한미사이언스"] },
  { name: "유한양행", alias: ["렉라자", "yuhan"] },
  { name: "제룡전기", alias: ["변압기", "전력기기"] },
  { name: "HD현대일렉트릭", alias: ["현대일렉", "변압기대장"] },
  { name: "한국전력", alias: ["한전", "kepco"] },
  { name: "금융지주", alias: ["배당주", "저PBR", "밸류업"] },
  { name: "삼성전자우", alias: ["삼전우", "우선주", "삼성전자우선주"] },
  { name: "삼성전기", alias: ["전기", "mlcc", "semco"] },
  { name: "삼성SDS", alias: ["에스디에스", "sds", "it서비스"] },
  { name: "삼성생명", alias: ["생명", "삼성금융"] },
  { name: "삼성화재", alias: ["화재", "애니카"] },
  { name: "삼성증권", alias: ["증권", "삼성팝", "pop"] },
  { name: "삼성카드", alias: ["카드"] },
  { name: "삼성중공업", alias: ["삼중", "조선주", "중공업"] },
  { name: "삼성엔지니어링", alias: ["삼엔", "삼성E&A", "플랜트"] },
  { name: "삼성중앙", alias: ["삼성중"] }, // 줄임말 대응
  { name: "호텔신라", alias: ["신라", "이부진", "면세점"] },
  { name: "제일기획", alias: ["제일", "광고"] },
  { name: "에스원", alias: ["세콤", "secom", "보안"] },
  { name: "삼성콘텐츠", alias: ["삼성"] }, // 검색 범용성 확보
  { name: "신세계", alias: ["백화점", "신세계백화점", "명품"] },
  { name: "이마트", alias: ["emart", "정용진", "마트", "슥"] },

  // --- ETF & 지수 ---
  { name: "코스피", alias: ["kospi", "국장"] },
  { name: "코스닥", alias: ["kosdaq"] },
  { name: "나스닥", alias: ["nasdaq", "ndx", "나스닥지수"] },
  { name: "S&P500", alias: ["snp500", "에스앤피", "spy", "voo"] },
  { name: "다우존스", alias: ["dow", "다우"] },
  { name: "필라델피아반도체", alias: ["반도체지수", "sox"] },
  { name: "SOXL", alias: ["반도체3배", "속슬"] },
  { name: "TQQQ", alias: ["나스닥3배", "티큐"] },
  { name: "SQQQ", alias: ["나스닥인버스", "숏"] },
  { name: "SCHD", alias: ["슈드", "배당주"] },
  { name: "JEPI", alias: ["제피"] },
  { name: "TSLY", alias: ["테슬리"] },
  { name: "NVDL", alias: ["엔비디아2배", "엔비디아레버리지"] },
  { name: "TSLL", alias: ["테슬라2배", "테슬라레버리지"] },
  { name: "USD", alias: ["반도체2배"] }, // SOXL보다 변동성 적어 인기
  { name: "FNGU", alias: ["팡구", "빅테크3배"] },
  { name: "BULZ", alias: ["불즈", "빅테크3배"] },
  { name: "CONL", alias: ["코인베이스2배", "비트코인ETF"] },
  { name: "YINN", alias: ["중국3배", "중국레버리지"] },
  { name: "YANG", alias: ["중국인버스", "중국숏"] },
  { name: "TLT", alias: ["미국채20년", "미국채권"] },
  { name: "TMF", alias: ["국채3배", "채권레버리지"] },
  { name: "TMV", alias: ["채권인버스", "금리상승"] },
  { name: "O", alias: ["리얼티인컴", "월배당주", "부동산"] },
  { name: "QYLD", alias: ["나스닥커버드콜"] },
  { name: "JEPQ", alias: ["제피큐", "나스닥월배당"] },
  { name: "KODEX 200", alias: ["코덱스", "삼성자산운용"] },
  { name: "TIGER 차이나전기차", alias: ["차전", "타이거"] },
  { name: "KODEX 레버리지", alias: ["국장레버리지", "122630"] },
  { name: "KODEX 인버스", alias: ["국장숏", "곱버스", "114800"] },
  { name: "KODEX CD금리", alias: ["파킹형", "금리형ETF"] },
  { name: "TIGER 미국S&P500", alias: ["타이거스앤피"] },

  // --- 가상자산 (Crypto) ---
  { name: "비트코인", alias: ["btc", "bitcoin", "코인"] },
  { name: "이더리움", alias: ["eth", "ethereum"] },
  { name: "리플", alias: ["xrp", "ripple"] },
  { name: "솔라나", alias: ["solana", "sol"] },
  { name: "도지코인", alias: ["doge"] },
  { name: "에이다", alias: ["ada"] },

  // --- 경제 지표 및 원자재 ---
  { name: "환율", alias: ["usd", "달러", "exchange", "원달러"] },
  { name: "엔화", alias: ["jpy", "엔화환율", "일본"] },
  { name: "국제유가", alias: ["wti", "oil", "기름값"] },
  { name: "금 시세", alias: ["gold", "금값"] },
  { name: "은 시세", alias: ["silver", "은값"] },
  { name: "구리 가격", alias: ["copper"] },
  { name: "미국 금리", alias: ["fomc", "fed", "연준", "금리"] },
  { name: "CPI", alias: ["소비자물가지수", "물가"] },
  { name: "2차전지", alias: ["배터리", "battery"] },
  { name: "초전도체", alias: ["lk99"] }
];

function StockContent() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<{ name: string, alias: string[] }[]>([]);
  const [myList, setMyList] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1); // 키보드 선택 위치 저장
  const [activeTab, setActiveTab] = useState("brokers");
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const [indices, setIndices] = useState({
    kospi: { price: "---", change: "0.00", percent: "0.00%", isUp: true },
    nasdaq: { price: "---", change: "0.00", percent: "0.00%", isUp: true }
  });

  // 자동완성 필터링 엔진
  useEffect(() => {
    const trimmed = searchTerm.trim().toLowerCase();
    if (!trimmed) {
      setSuggestions([]);
      return;
    }
    const filtered = stockKeywords.filter(s =>
      s.name.toLowerCase().includes(trimmed) ||
      s.alias.some(a => a.toLowerCase().includes(trimmed))
    ).slice(0, 8);
    setSuggestions(filtered);
  }, [searchTerm]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault(); // 스크롤 방지
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0) {
        e.preventDefault();
        handleSelectSuggestion(suggestions[selectedIndex].name);
      }
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setSelectedIndex(-1);
    }
  };

  // 검색어 바뀔 때마다 선택 초기화 (자동완성 필터링 useEffect 안에 넣어도 됨)
  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchTerm]);

  const fetchStockIndices = async () => {
    try {
      // 1. 앱(정적 추출) 환경에서는 내부 API를 못 쓰므로 외부 프록시(allorigins)를 활용합니다.
      const kUrl = encodeURIComponent("https://query1.finance.yahoo.com/v8/finance/chart/^KS11?interval=1d&range=1d");
      const nUrl = encodeURIComponent("https://query1.finance.yahoo.com/v8/finance/chart/^IXIC?interval=1d&range=1d");

      const [kRes, nRes] = await Promise.all([
        fetch(`https://api.allorigins.win/get?url=${kUrl}`),
        fetch(`https://api.allorigins.win/get?url=${nUrl}`)
      ]);

      const kRaw = await kRes.json();
      const nRaw = await nRes.json();

      // allorigins는 응답을 'contents'라는 문자열에 담아주므로 JSON.parse가 필요합니다.
      const kData = JSON.parse(kRaw.contents);
      const nData = JSON.parse(nRaw.contents);

      const updateIndex = (data: any) => {
        const meta = data?.chart?.result?.[0]?.meta;
        if (!meta) return null;
        const price = meta.regularMarketPrice || 0;
        const prev = meta.chartPreviousClose || meta.previousClose || price;
        const diff = price - prev;
        const percent = prev !== 0 ? (diff / prev) * 100 : 0;

        return {
          price: price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
          change: (diff > 0 ? "+" : "") + diff.toFixed(2),
          percent: (diff > 0 ? "+" : "") + percent.toFixed(2) + "%",
          isUp: diff >= 0
        };
      };

      const kospiResult = updateIndex(kData);
      const nasdaqResult = updateIndex(nData);

      if (kospiResult && nasdaqResult) {
        setIndices({ kospi: kospiResult, nasdaq: nasdaqResult });
        setLastUpdated(new Date().toLocaleTimeString('ko-KR', { hour12: false }));
      }
    } catch (e) {
      console.error("데이터 로드 실패:", e);
    }
  };

  useEffect(() => {
    const savedList = localStorage.getItem("ecoCheck_myList");
    if (savedList) setMyList(JSON.parse(savedList));
    fetchStockIndices();
    const intervalId = setInterval(fetchStockIndices, 60000);

    const tab = searchParams.get("tab");
    if (tab === "guide") setActiveTab("accounts");
    else if (tab === "list") setActiveTab("brokers");

    return () => clearInterval(intervalId);
  }, [searchParams]);

  const handleSelectSuggestion = (name: string) => {
    if (myList.includes(name)) {
      alert("이미 리스트에 있는 종목입니다.");
    } else {
      const newList = [name, ...myList];
      setMyList(newList);
      localStorage.setItem("ecoCheck_myList", JSON.stringify(newList));
    }
    setSearchTerm("");
    setSuggestions([]);
  };

  const removeFromList = (term: string) => {
    const newList = myList.filter((item) => item !== term);
    setMyList(newList);
    localStorage.setItem("ecoCheck_myList", JSON.stringify(newList));
  };

  const clearAllList = () => {
    if (window.confirm("관심 종목 리스트를 모두 비우시겠습니까?")) {
      setMyList([]);
      localStorage.removeItem("ecoCheck_myList");
    }
  };

  const handleSearch = (term: string) => {
    window.open(`https://search.naver.com/search.naver?query=${encodeURIComponent(term + " 주가")}`, "_blank");
  };

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      <main className="max-w-5xl mx-auto px-5 py-12">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 italic uppercase italic">Market_Watch</h1>

          <div className="relative max-w-2xl group mb-10">
            <form onSubmit={(e) => {
              e.preventDefault();
              // suggestions가 있고 선택된 게 있다면 그걸 추가, 아니면 현재 입력값 추가
              if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                handleSelectSuggestion(suggestions[selectedIndex].name);
              } else if (searchTerm.trim()) {
                handleSelectSuggestion(searchTerm.trim());
              }
            }}>
              <input
                type="text"
                placeholder="관심 종목 추가 (예: 삼성전자)"
                className="w-full h-16 pl-6 pr-24 md:pr-32 rounded-2xl border-2 focus:border-red-600 shadow-xl outline-none transition-all text-sm md:text-base"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)", color: "var(--text-main)" }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown} // 키보드 핸들러 연결
                autoComplete="off"
              />
              <button type="submit" className="absolute right-2 top-2 h-12 px-5 md:px-8 bg-red-600 text-white rounded-xl font-black hover:bg-red-700 transition text-sm md:text-base">
                ADD
              </button>
            </form> {/* ✅ 여기서 폼을 닫아줘야 합니다! */}

            {/* 자동완성 레이어 */}
            {suggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-2 rounded-2xl border-2 shadow-2xl overflow-hidden"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                {suggestions.map((s, i) => (
                  <div key={i}
                    onClick={() => handleSelectSuggestion(s.name)}
                    className={`px-6 py-4 flex justify-between items-center cursor-pointer transition-colors border-b last:border-0
            ${selectedIndex === i ? "bg-red-50 dark:bg-red-900/40" : "hover:bg-red-50 dark:hover:bg-red-900/20"}`}
                    style={{ borderColor: "var(--border-color)" }}>
                    <span className={`font-black text-sm ${selectedIndex === i ? "text-red-600 dark:text-red-400" : ""}`}>
                      {s.name}
                    </span>
                    <span className="text-[10px] font-bold opacity-40 uppercase">{s.alias[0]}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="my-10"><AdSense slot="9988776655" format="auto" /></div>

          {myList.length > 0 && (
            <div className="mt-10">
              {/* 헤더 부분: 타이틀과 전체삭제 버튼 */}
              <div className="flex justify-between items-center mb-4 px-1">
                <span className="text-[10px] font-black text-red-600/60 uppercase tracking-widest">My Watchlist</span>
                <button
                  onClick={clearAllList}
                  className="text-[10px] font-black opacity-40 hover:opacity-100 hover:text-red-600 transition uppercase underline underline-offset-4"
                >
                  전체삭제
                </button>
              </div>

              {/* 기존 종목 칩(Chip) 리스트 */}
              <div className="flex flex-wrap gap-3">
                {myList.map((term, i) => (
                  <div key={i} className="flex items-center border-2 rounded-xl pl-5 pr-2 py-2 hover:border-red-600 transition group cursor-pointer" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                    <span onClick={() => handleSearch(term)} className="font-black mr-3 text-sm tracking-tight">{term}</span>
                    <button
                      onClick={() => removeFromList(term)}
                      /* ✅ 메인 페이지와 동일한 로직: bg-red-600/10와 명시적 text 컬러 사용 */
                      className="w-6 h-6 ml-2 flex items-center justify-center rounded-full bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white transition-all text-[10px] font-black"
                    >
                      <span className="leading-none" style={{ color: 'inherit' }}>✕</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </header>

        <div className="flex justify-between items-end mb-4 px-2">
          <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.3em]">Live Market Indices</h2>
          {lastUpdated && <span className="text-[10px] font-bold opacity-40 uppercase">Last Sync: {lastUpdated}</span>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {[
            { label: "KOSPI Composite", data: indices.kospi },
            { label: "NASDAQ 100", data: indices.nasdaq }
          ].map((idx, i) => (
            <div key={i} className="p-10 rounded-[40px] shadow-2xl border-t-8 border-red-600" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
              <div className="text-[11px] font-black mb-6 tracking-widest opacity-50 uppercase">{idx.label}</div>
              <div className="text-[32px] md:text-5xl font-black mb-2 tracking-tighter whitespace-nowrap">{idx.data.price}</div>
              <div className={`text-lg font-bold flex items-center gap-1 ${idx.data.isUp ? 'text-red-500' : 'text-blue-500'}`}>
                {idx.data.isUp ? '▲' : '▼'} {idx.data.change} ({idx.data.percent})
              </div>
            </div>
          ))}
        </div>

        <div className="p-2 md:p-10 rounded-[48px] border-2 shadow-sm mb-12" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
          <div className="flex gap-2 p-2 rounded-3xl mb-10 w-fit" style={{ backgroundColor: "var(--bg-color)", border: "1px solid var(--border-color)" }}>
            <button onClick={() => setActiveTab("brokers")} className={`px-8 py-3 rounded-2xl font-black text-sm transition-all ${activeTab === "brokers" ? "shadow-md text-red-600 bg-[var(--card-bg)]" : "text-[var(--text-sub)] bg-transparent"}`}>증권사 목록</button>
            <button onClick={() => setActiveTab("accounts")} className={`px-8 py-3 rounded-2xl font-black text-sm transition-all ${activeTab === "accounts" ? "shadow-md text-red-600 bg-[var(--card-bg)]" : "text-[var(--text-sub)] bg-transparent"}`}>계좌 가이드</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab === "brokers" ? brokers.map((b, i) => (
              <div key={i} className="contents">
                <a href={b.link} target="_blank" rel="noopener noreferrer"
                  className="p-8 border-2 rounded-[32px] hover:border-red-600 transition group flex justify-between items-center"
                  style={{ backgroundColor: "var(--bg-color)", borderColor: "var(--border-color)" }}>
                  <div>
                    <h4 className="font-black text-lg mb-1 group-hover:text-red-600 transition-colors">{b.name}</h4>
                    <p className="text-[10px] font-bold opacity-50 uppercase">{b.desc}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-red-600 transition-all transform group-hover:rotate-45">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      /* svg 클래스는 비워두거나 transition만 줍니다 */
                      className="transition-colors"
                    >
                      <path
                        d="M7 17L17 7M17 7H7M17 7V17"
                        /* 1. 기본 stroke를 명시 (fallback) */
                        stroke="#475569"
                        /* 2. Tailwind 클래스로 상황별 색상 강제 지정 */
                        className="!stroke-slate-600 dark:!stroke-slate-300 group-hover:!stroke-white transition-colors"
                        /* 3. 인라인 스타일로 상속 원천 차단 */
                        style={{ stroke: 'inherit' }}
                      />
                    </svg>
                  </div>
                </a>
                {(i + 1) % 6 === 0 && <div className="col-span-full my-4"><AdSense slot="4433221100" format="fluid" /></div>}
              </div>
            )) : accounts.map((a, i) => (
              <div key={i} className="p-8 border-2 rounded-[32px] relative overflow-hidden group hover:border-red-600 transition" style={{ backgroundColor: "var(--bg-color)", borderColor: "var(--border-color)" }}>
                <div className="absolute -right-4 -top-4 text-6xl font-black opacity-[0.03] group-hover:text-red-600 transition-colors uppercase">{a.type}</div>
                <span className="text-[11px] font-black text-red-600 uppercase mb-4 block tracking-widest">{a.type}</span>
                <h4 className="font-black mb-4 text-2xl">{a.name}</h4>
                <p className="text-sm font-bold leading-relaxed opacity-70" style={{ color: "var(--text-sub)" }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-20 pb-12">
          <Link href="/" className="inline-block px-12 py-5 bg-red-600 text-white rounded-full font-black text-lg hover:bg-red-700 transition shadow-xl">홈으로 돌아가기</Link>
        </div>
      </main>

      <footer className="py-12 border-t text-center" style={{ borderColor: "var(--border-color)" }}>
        <div className="flex justify-center gap-6 mb-4 text-[10px] font-black text-red-600/50 uppercase tracking-widest">
          <Link href="/privacy" className="hover:text-red-600 transition">개인정보 처리방침</Link>
          <Link href="/terms" className="hover:text-red-600 transition">이용약관</Link>
        </div>
        <div className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-40">© 2026 BULL'S EYE. ALL RIGHTS RESERVED.</div>
      </footer>
    </div>
  );
}

export default function StockPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-black animate-pulse text-red-600 uppercase">Loading Market Data...</div>}>
      <StockContent />
    </Suspense>
  );
}