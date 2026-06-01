'use client'

import React, { useState, useEffect } from 'react'
import { X, BookOpen, Download, Mail, Phone, User, Shield, CheckCircle2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const hasSeen = localStorage.getItem('seen_exit_intent')
    if (hasSeen === 'true') return

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 50) {
        setIsOpen(true)
        localStorage.setItem('seen_exit_intent', 'true')
        document.removeEventListener('mouseleave', handleMouseLeave)
      }
    }

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      if (scrollPercent > 70) {
        setIsOpen(true)
        localStorage.setItem('seen_exit_intent', 'true')
        window.removeEventListener('scroll', handleScroll)
      }
    }

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

  const handleClose = () => setIsOpen(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !phone) { alert('Please fill in all fields.'); return }
    if (phone.length < 10) { alert('Please enter a valid 10-digit phone number.'); return }

    setIsSubmitting(true)
    try {
      const { error } = await supabase.from('leads').insert([{
        full_name: name,
        email: email,
        phone: phone,
        city: 'Downloaded PDF Guide',
        stream: 'General Inquiry / PDF Guide',
        college_name: '2026 Admission Guide PDF',
        source: 'Exit Intent Guide Download Form',
        status: 'new'
      }])

      if (error) throw error
      setIsSuccess(true)

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

  const inputCls = "w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-[#38b6ff] focus:bg-white focus:ring-4 focus:ring-[#38b6ff]/8 transition-all"

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-300">
      
      <div className="relative bg-white w-full max-w-sm rounded-[28px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="bg-slate-900 px-7 py-8 relative overflow-hidden">
          <button onClick={handleClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/15 rounded-full transition-all z-20">
            <X size={14} className="text-white" />
          </button>
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#38b6ff]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/15 border border-red-500/20 text-[10px] font-bold text-red-400 uppercase tracking-widest mb-4">
              <BookOpen size={10} />
              Free Admission Gift
            </div>
            <h3 className="text-xl font-black text-white leading-tight">
              Get the 2026 College<br />Admission Guide PDF
            </h3>
            <p className="text-slate-400 text-[11px] mt-2 leading-relaxed">
              Includes cutoffs, fees structure, and direct quota counseling secrets.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="py-6 text-center space-y-3 animate-in zoom-in-95 duration-500">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                <Download size={26} className="animate-bounce" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Preparing Download...</h3>
              <p className="text-slate-400 text-xs leading-relaxed max-w-[240px] mx-auto">
                Your <strong className="text-slate-700">2026 Admissions Handbook PDF</strong> will open in a new tab now.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Your Name</label>
                <div className="relative group">
                  <User size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#38b6ff] transition-colors pointer-events-none" />
                  <input required type="text" placeholder="Student Name*" value={name}
                    onChange={(e) => setName(e.target.value)} className={inputCls} />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Email Address</label>
                <div className="relative group">
                  <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#38b6ff] transition-colors pointer-events-none" />
                  <input required type="email" placeholder="Email Address*" value={email}
                    onChange={(e) => setEmail(e.target.value)} className={inputCls} />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Phone Number</label>
                <div className="relative group">
                  <Phone size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#38b6ff] transition-colors pointer-events-none" />
                  <input required type="tel" placeholder="Phone Number*" value={phone}
                    onChange={(e) => setPhone(e.target.value)} className={inputCls} />
                </div>
              </div>

              <button type="submit" disabled={isSubmitting}
                className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] disabled:opacity-60 mt-1">
                {isSubmitting ? 'Sending...' : (
                  <><Download size={13} /> Email Me The PDF Guide</>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                <Shield size={10} />
                <span>100% Secure. We never share your email address.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
