'use client'

import React from 'react'

export default function CounselorWidget() {
  const handleClick = () => {
    if (typeof document !== 'undefined') {
      document.dispatchEvent(new CustomEvent('open-consultation-modal'))
    }
  }

  return (
    <div className="bg-slate-50 border border-slate-100 rounded-[28px] p-6 relative overflow-hidden shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300">
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-100/50 rounded-full blur-xl pointer-events-none" />
      
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Counselling open
        </span>
      </div>
      
      <h3 className="text-slate-900 font-extrabold text-base mb-2">
        Need personalized advice?
      </h3>
      
      <p className="text-slate-500 text-xs font-medium mb-5 leading-relaxed font-body">
        Talk to our certified career advisors to map out your target colleges and admission strategy.
      </p>
      
      <button 
        onClick={handleClick}
        className="w-full py-3 bg-[#111111] hover:bg-slate-800 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        Connect with advisor
      </button>
    </div>
  )
}
