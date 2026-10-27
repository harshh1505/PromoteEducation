'use client'

import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight, Bot } from 'lucide-react'

const PLACEHOLDERS = [
  "Ask AI: 'Can I get Govt MBBS with 45k rank in NEET?'",
  "Ask AI: 'Which B.Tech colleges have highest packages?'",
  "Ask AI: 'What are the fees for AIIMS vs KMC Manipal?'",
  "Ask AI: 'Compare private vs deemed medical colleges'",
  "Ask our AI Counselor anything — I have every answer..."
]

const QUICK_CHIPS = [
  { icon: '🎯', label: 'NEET Cutoffs', query: 'What NEET rank is needed for Govt MBBS?' },
  { icon: '💼', label: 'Highest Packages', query: 'Which colleges offer the highest placement packages?' },
  { icon: '🏛️', label: 'College Fees', query: 'What are the fees and cutoff for deemed medical universities?' },
]

export default function HeroAIChatBar({ className = '' }: { className?: string }) {
  const [query, setQuery] = useState('')
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [fade, setFade] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Rotate through meaningful questions every 3.8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length)
        setFade(true)
      }, 250)
    }, 3800)
    return () => clearInterval(interval)
  }, [])

  // Scroll listener: transition to fixed bottom-right when scrolled past the hero top
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return
      // When scrolled down > 260px, switch to fixed bottom-right overlay
      if (window.scrollY > 260) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = (e?: React.FormEvent, directQuery?: string) => {
    if (e) e.preventDefault()
    const q = (directQuery || query).trim()

    // Dispatch custom event to trigger ChatAssistant
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-ai-chat', {
          detail: { query: q || undefined }
        })
      )
    }

    if (directQuery || query) {
      setQuery('')
    }
  }

  // Common Bar Content (Search input + Bot icon + Ask button)
  const renderSearchBar = (isFixed: boolean) => (
    <div className="relative group w-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500/30 via-indigo-500/30 to-teal-500/30 rounded-2xl blur-xs opacity-85 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <form
        onSubmit={(e) => handleSubmit(e)}
        className="relative flex items-center bg-white rounded-2xl p-1.5 shadow-2xl shadow-slate-900/15 border border-slate-200/90 group-hover:border-sky-400 transition-all duration-200"
      >
        {/* Left AI Bot Icon */}
        <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900 text-sky-400 ml-0.5 flex-shrink-0 shadow-xs">
          <Bot size={17} />
        </div>

        {/* Input with dynamic placeholder */}
        <div className="relative flex-1 px-2.5 min-w-0">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={fade ? PLACEHOLDERS[placeholderIndex] : ""}
            className="w-full bg-transparent text-xs sm:text-[13px] font-semibold text-slate-800 placeholder:text-slate-400 placeholder:font-medium focus:outline-none tracking-tight truncate transition-opacity duration-200"
          />
        </div>

        {/* Compact Ask AI Action Button */}
        <button
          type="submit"
          className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-700 hover:from-sky-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md shadow-sky-600/30 active:scale-95 transition-all flex-shrink-0"
        >
          <span>Ask</span>
          <ArrowRight size={13} strokeWidth={2.5} />
        </button>
      </form>
    </div>
  )

  return (
    <>
      {/* 1. SCROLLED STATE: Rendered directly into document.body via Portal to guarantee z-[9999] overlay on top of every element */}
      {isScrolled && mounted && createPortal(
        <div className="fixed bottom-6 right-4 sm:right-6 z-[9999] w-[calc(100vw-2rem)] sm:w-[380px] max-w-[400px] animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto">
          {renderSearchBar(true)}
        </div>,
        document.body
      )}

      {/* 2. INITIAL UN-SCROLLED STATE: Positioned right above the carousel, strictly overlaid with relative z-[35] */}
      <div className={`relative z-[35] w-full max-w-[340px] md:max-w-[420px] ${className}`}>
        {/* Placeholder spacer when fixed, to prevent any carousel jump */}
        {isScrolled ? (
          <div className="w-full h-[78px] mb-4 pointer-events-none" />
        ) : (
          <>
            {/* Top Mini Badge */}
            <div className="flex items-center justify-between px-2 mb-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/95 backdrop-blur-md rounded-full border border-sky-100 shadow-2xs">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-800">
                  AI Counselor
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 truncate">
                Verified 950+ Colleges
              </span>
            </div>

            {/* The Search Bar Box */}
            {renderSearchBar(false)}

            {/* Suggested Quick Chips */}
            <div className="flex items-center gap-1.5 mt-2 px-1 overflow-x-auto no-scrollbar">
              {QUICK_CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSubmit(undefined, chip.query)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-full text-[10px] font-bold text-slate-600 hover:text-sky-700 shadow-2xs whitespace-nowrap transition-colors"
                >
                  <span>{chip.icon}</span>
                  <span>{chip.label}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}
