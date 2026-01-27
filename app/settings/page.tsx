"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    darkMode: false, 
    marketAlert: false,
    newsLetter: false,
  });
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 마운트 직후에만 실행 (모바일 브라우저 캐시 방지)
    const savedTheme = localStorage.getItem("theme");
    const savedMarketAlert = localStorage.getItem("marketAlert");
    const savedNewsLetter = localStorage.getItem("newsLetter");
    
    // 현재 실제 적용된 테마 확인
    const isDark = document.documentElement.classList.contains("dark");

    setSettings({
      darkMode: savedTheme ? savedTheme === "dark" : isDark,
      marketAlert: savedMarketAlert !== "false",
      newsLetter: savedNewsLetter === "true",
    });

    setMounted(true);
  }, []);

  const toggleSetting = (key: keyof typeof settings) => {
    const newValue = !settings[key];
    setSettings((prev) => ({ ...prev, [key]: newValue }));

    if (key === "darkMode") {
      const theme = newValue ? "dark" : "light";
      localStorage.setItem("theme", theme);
      document.documentElement.classList.toggle("dark", newValue);
    } else {
      localStorage.setItem(key, String(newValue));
    }
  };

  // ✅ [핵심] 마운트 전에는 아예 버튼을 '투명' 처리하는 컴포넌트
  const ToggleSwitch = ({ id }: { id: keyof typeof settings }) => {
    // 마운트 전에는 빈 공간만 유지 (깜빡임 원천 차단)
    if (!mounted) return <div className="w-14 h-8 bg-gray-200/50 rounded-full animate-pulse" />;

    return (
      <button 
        onClick={() => toggleSetting(id)} 
        className={`w-14 h-8 rounded-full transition-all duration-300 flex items-center px-1 ${
          settings[id] ? 'bg-red-600 justify-end' : 'bg-gray-300 justify-start'
        }`}
      >
        <div className="w-6 h-6 bg-white rounded-full shadow-md" />
      </button>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      <main className="max-w-3xl mx-auto px-6 py-16">
        <header className="mb-16">
          <h1 className="text-5xl font-black italic uppercase text-red-600">Settings</h1>
        </header>

        <section className="mb-12">
          <h2 className="text-xs font-black text-red-600 mb-6 border-b pb-2" style={{ borderColor: "var(--border-color)" }}>Visual</h2>
          <div className="flex items-center justify-between py-4">
            <div>
              <h3 className="text-xl font-bold">다크 모드</h3>
              <p className="text-sm opacity-50">어두운 테마 사용</p>
            </div>
            {/* ✅ 컴포넌트 호출 */}
            <ToggleSwitch id="darkMode" />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xs font-black text-red-600 mb-6 border-b pb-2" style={{ borderColor: "var(--border-color)" }}>Experience</h2>
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">시장 지표 요약 보기</h3>
                <p className="text-sm opacity-50">홈 화면 상단 지수 표시</p>
              </div>
              <ToggleSwitch id="marketAlert" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">전문가 가이드 우선 표시</h3>
                <p className="text-sm opacity-50">뉴스보다 가이드 버튼을 앞에 배치</p>
              </div>
              <ToggleSwitch id="newsLetter" />
            </div>
          </div>
        </section>

        <div className="text-center mt-12">
          <Link href="/" className="inline-block px-10 py-4 bg-red-600 text-white rounded-full font-black">적용 완료</Link>
        </div>
      </main>
    </div>
  );
}