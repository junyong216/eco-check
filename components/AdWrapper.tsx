"use client";

import React from "react";

interface AdWrapperProps {
  children: React.ReactNode;
  minHeight: string;
  label?: boolean;
}

export default function AdWrapper({ children, minHeight, label = true }: AdWrapperProps) {
  return (
    <div className="w-full my-8 md:my-16 flex flex-col items-center">
      {label && (
        <div className="flex items-center gap-2 mb-3 opacity-30 select-none">
          <span className="h-[1px] w-4 bg-current"></span>
          <span className="text-[10px] font-black tracking-[0.3em] uppercase">
            Advertisement
          </span>
          <span className="h-[1px] w-4 bg-current"></span>
        </div>
      )}
      
      <div 
        className="w-full max-w-5xl overflow-hidden rounded-[28px] md:rounded-[48px] border-2 flex items-center justify-center transition-all relative group"
        style={{ 
          minHeight: minHeight, 
          backgroundColor: "var(--ad-bg)", 
          borderColor: "var(--border-color)" 
        }}
      >
        {/* 광고 로딩 전 배경 애니메이션 (스켈레톤 느낌) */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none" />
        
        {/* 실제 광고 컴포넌트 */}
        <div className="w-full relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}