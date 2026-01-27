"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    darkMode: true,
    marketAlert: true,
    newsLetter: false, // 이게 '가이드 우선 표시' 스위치입니다
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedMarketAlert = localStorage.getItem("marketAlert");
    const savedNewsLetter = localStorage.getItem("newsLetter");

    setSettings({
      darkMode: savedTheme === "dark" || savedTheme === null,
      marketAlert: savedMarketAlert !== "false",
      newsLetter: savedNewsLetter === "true",
    });
  }, []);

  const toggleSetting = (key: keyof typeof settings) => {
    const newValue = !settings[key];
    setSettings((prev) => ({ ...prev, [key]: newValue }));

    if (key === "darkMode") {
      const theme = newValue ? "dark" : "light";
      localStorage.setItem("theme", theme);
      document.documentElement.classList.toggle("dark", newValue);
      document.documentElement.setAttribute("data-theme", theme);
    } else {
      localStorage.setItem(key, String(newValue));
    }
  };

  const resetAllData = () => {
    if (confirm("모든 설정과 저장된 데이터를 초기화할까요?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <header className="mb-16">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 italic uppercase text-red-600">Settings</h1>
          <p className="text-lg font-bold opacity-60" style={{ color: "var(--text-sub)" }}>로컬 투자 환경 설정</p>
        </header>

        <section className="mb-12">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-red-600 mb-6 border-b pb-2" style={{ borderColor: "var(--border-color)" }}>Visual</h2>
          <div className="flex items-center justify-between py-4">
            <div>
              <h3 className="text-xl font-bold">다크 모드</h3>
              <p className="text-sm opacity-50">어두운 테마 사용</p>
            </div>
            <button onClick={() => toggleSetting('darkMode')} className={`w-14 h-8 rounded-full transition-all flex items-center px-1 ${settings.darkMode ? 'bg-red-600 justify-end' : 'bg-gray-300 justify-start'}`}>
              <div className="w-6 h-6 bg-white rounded-full shadow-md" />
            </button>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-red-600 mb-6 border-b pb-2" style={{ borderColor: "var(--border-color)" }}>Experience</h2>
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">시장 지표 요약 보기</h3>
                <p className="text-sm opacity-50">홈 화면 상단 지수 표시</p>
              </div>
              <button onClick={() => toggleSetting('marketAlert')} className={`w-14 h-8 rounded-full transition-all flex items-center px-1 ${settings.marketAlert ? 'bg-red-600 justify-end' : 'bg-gray-300 justify-start'}`}>
                <div className="w-6 h-6 bg-white rounded-full shadow-md" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">전문가 가이드 우선 표시</h3>
                <p className="text-sm opacity-50">뉴스보다 가이드 버튼을 앞에 배치</p>
              </div>
              <button onClick={() => toggleSetting('newsLetter')} className={`w-14 h-8 rounded-full transition-all flex items-center px-1 ${settings.newsLetter ? 'bg-red-600 justify-end' : 'bg-gray-300 justify-start'}`}>
                <div className="w-6 h-6 bg-white rounded-full shadow-md" />
              </button>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-red-600 mb-6 border-b pb-2" style={{ borderColor: "var(--border-color)" }}>Storage</h2>
          <button onClick={resetAllData} className="w-full text-left py-4 px-6 rounded-2xl border font-bold text-red-600/70 hover:text-red-600 hover:border-red-600 transition-colors" style={{ borderColor: "var(--border-color)" }}>캐시 및 설정 초기화</button>
        </section>

        <div className="text-center">
          <Link href="/" className="inline-block px-10 py-4 bg-red-600 text-white rounded-full font-black hover:bg-red-700 transition">적용 완료 및 홈으로</Link>
        </div>
      </main>
    </div>
  );
}