'use client'

import React, { useState, useEffect } from 'react'
import { Phone, MessageCircle, GitCompare, ArrowRight, UserCheck } from 'lucide-react'
import LeadModal from '@/components/ui/LeadModal'

export default function StickyCROElements() {
  const [showModal, setShowModal] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Scroll visibility for counselling floating buttons
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleWhatsAppClick = () => {
    const phoneNumber = '918218032826' // User's requested phone number
    const text = encodeURIComponent("Hi, I want to discuss college admission opportunities and expert counselling support. Can you help me?")
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank')
  }

  const scrollToCompare = (e: React.MouseEvent) => {
    e.preventDefault()
    const compareSec = document.getElementById('compare-section')
    if (compareSec) {
      compareSec.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = '/#compare-section'
    }
  }

  return (
    <>
      {/* 1. Sticky WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-20 md:bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group flex items-center gap-2"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle size={24} className="fill-white" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out font-bold text-xs uppercase tracking-wider text-white whitespace-nowrap">
          Chat Admissions
        </span>
      </button>

      {/* 2. Desktop Floating Counselling Side-Tab (visible after scroll) */}
      <button
        onClick={() => setShowModal(true)}
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-[#3B2EA8] hover:bg-[#2C218B] text-white py-3 px-5 rounded-l-2xl shadow-2xl transition-all duration-300 hover:pr-7 items-center gap-2 cursor-pointer font-bold text-xs uppercase tracking-widest hidden md:flex origin-right transform ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        <Phone size={14} className="animate-pulse" />
        <span>Free Counselling</span>
      </button>

      {/* 3. Sticky Mobile Bottom CTAs */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3.5 flex gap-3 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] md:hidden">
        <button
          onClick={scrollToCompare}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black uppercase tracking-wider rounded-xl transition-all active:scale-[0.98]"
        >
          <GitCompare size={14} />
          Compare
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-indigo-600/10 active:scale-[0.98]"
        >
          <UserCheck size={14} />
          Counselling
        </button>
      </div>

      {/* Global Lead capture Modal */}
      <LeadModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        collegeName=""
      />
    </>
  )
}
