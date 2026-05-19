'use client'

import React, { useState, useEffect } from 'react'
import { X, BookOpen, Download, Mail, Phone, User, ShieldCheck } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    // Check if user already saw or submitted the exit intent
    const hasSeen = localStorage.getItem('seen_exit_intent')
    if (hasSeen === 'true') return

    // Desktop: Track mouse movement
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 50) { // Mouse moving towards address bar
        setIsOpen(true)
        localStorage.setItem('seen_exit_intent', 'true')
        document.removeEventListener('mouseleave', handleMouseLeave)
      }
    }

    // Mobile: Trigger after deep scroll (70% scroll)
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      if (scrollPercent > 70) {
        setIsOpen(true)
        localStorage.setItem('seen_exit_intent', 'true')
        window.removeEventListener('scroll', handleScroll)
      }
    }

    // Delay initialization to avoid instant popups
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
      window.addEventListener('scroll', handleScroll)
    }, 8000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !phone) {
      alert('Please fill in all fields.')
      return
    }
    if (phone.length < 10) {
      alert('Please enter a valid 10-digit phone number.')
      return
    }

    setIsSubmitting(true)
    try {
      const { error } = await supabase
        .from('leads')
        .insert([
          {
            full_name: name,
            email: email,
            phone: phone,
            city: 'Downloaded PDF Guide',
            stream: 'General Inquiry / PDF Guide',
            college_name: '2026 Admission Guide PDF',
            source: 'Exit Intent Guide Download Form',
            status: 'new'
          }
        ])

      if (error) throw error
      setIsSuccess(true)

      // Auto download link (using a public mock guide)
      setTimeout(() => {
        window.open('https://cnfmhdlkdjgnaqhngpin.supabase.co/storage/v1/object/public/college_images/guide_preview.pdf', '_blank')
        setIsOpen(false)
      }, 1500)
    } catch (err: any) {
      console.error('Error submitting exit lead:', err)
      alert('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-lg rounded-[36px] overflow-hidden shadow-2xl p-6 md:p-8 animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-all duration-300"
        >
          <X size={16} className="text-slate-500" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-500">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <Download size={28} className="animate-bounce" />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-900">Guide Preparing for Download...</h3>
            <p className="text-slate-500 text-xs md:text-sm font-semibold max-w-xs mx-auto leading-relaxed">
              We have saved your details. Your <strong>2026 Admissions Handbook PDF</strong> will open in a new tab now.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Header / Offer */}
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-[10px] font-black text-red-500 uppercase tracking-widest mb-3.5">
                <BookOpen size={11} />
                Free Admission Gift
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
                Get the 2026 College <br />Admission Guide PDF
              </h3>
              <p className="text-slate-400 font-semibold text-[11px] md:text-xs max-w-xs mx-auto mt-2 leading-relaxed">
                Includes cutoffs, admission protocols, fees structure, and direct quota counseling secrets.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="relative">
                <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  required
                  type="text"
                  placeholder="Your Name*"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-xs font-semibold outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all text-slate-800"
                />
              </div>

              <div className="relative">
                <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  required
                  type="email"
                  placeholder="Email Address*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-xs font-semibold outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all text-slate-800"
                />
              </div>

              <div className="relative">
                <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  required
                  type="tel"
                  placeholder="Phone Number*"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-xs font-semibold outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all text-slate-800"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#111] hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 mt-2"
              >
                {isSubmitting ? 'Sending...' : 'Email Me The PDF Guide'}
                <Download size={14} />
              </button>
            </form>

            {/* Privacy Shield */}
            <div className="flex items-center justify-center gap-1.5 text-[9px] text-slate-400 border-t border-slate-100 pt-4">
              <ShieldCheck size={11} className="text-slate-400" />
              <span>100% Secure. We never share your email address.</span>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}
