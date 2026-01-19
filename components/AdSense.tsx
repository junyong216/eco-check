"use client";

import { useEffect, useRef } from "react";

interface AdSenseProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  responsive?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdSense({ 
  slot, 
  format = "auto", 
  responsive = "true",
  style = { display: "block" }
}: AdSenseProps) {
  const adLoaded = useRef(false);

  useEffect(() => {
    // 광고가 중복으로 푸시되는 것을 방지하기 위한 가드
    if (adLoaded.current) return;

    try {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adLoaded.current = true;
      }
    } catch (err) {
      // 이미 로드되었거나 에러 발생 시 경고 출력 (개발 시 유용)
      console.warn("AdSense logic handled:", err);
    }
  }, [slot]); 

  return (
    <div 
      key={slot} // 슬롯이 변경되면 컴포넌트를 완전히 새로 그려서 광고 유닛을 갱신합니다.
      className="adsense-container w-full overflow-hidden flex justify-center my-6" 
      style={{ minHeight: "100px", backgroundColor: "var(--ad-bg)", borderRadius: "12px" }}
    >
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-3737116795159579"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}