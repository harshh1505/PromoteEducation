'use client'

import React, { useState, useEffect } from 'react'
import { X, Mail, Phone, User, Download, CheckCircle2, Loader2, Info, Share2, Bell, ArrowRight, Shield, Check } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type ModalMode = 'brochure' | 'details' | 'share' | 'remind'

const MODAL_CONFIG: Record<ModalMode, {
  title: string
  highlight: string
  description: (name: string) => string
  buttonText: string
  buttonIcon: React.ReactNode
  source: string
  accentColor: string
}> = {
  brochure: {
    title: 'Download',
    highlight: 'Brochure',
    description: (name) => `Enter your details to receive the official brochure and fee structure for ${name}.`,
    buttonText: 'Send Me the Brochure',
    buttonIcon: <Download size={16} />,
    source: 'brochure_download',
    accentColor: '#38b6ff',
  },
  details: {
    title: 'View',
    highlight: 'College Details',
    description: (name) => `Enter your details to unlock the full profile, placement stats, and reviews for ${name}.`,
    buttonText: 'View Full Details',
    buttonIcon: <Info size={16} />,
    source: 'college_details',
    accentColor: '#38b6ff',
  },
  share: {
    title: 'Share',
    highlight: 'College Info',
    description: (name) => `Enter your details to share the profile of ${name} with friends and family.`,
    buttonText: 'Share Now',
    buttonIcon: <Share2 size={16} />,
    source: 'share_college',
    accentColor: '#38b6ff',
  },
  remind: {
    title: 'Set',
    highlight: 'Exam Reminder',
    description: (name) => `Enter your details and we'll remind you about important dates and deadlines for ${name}.`,
    buttonText: 'Set Reminder',
    buttonIcon: <Bell size={16} />,
    source: 'exam_reminder',
    accentColor: '#38b6ff',
  },
}

interface BrochureModalProps {
  isOpen: boolean
  onClose: () => void
  collegeName: string
  collegeId?: string
  stream: string
  mode?: ModalMode
  targetUrl?: string
}

const inputCls = "w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-[#38b6ff] focus:bg-white focus:ring-4 focus:ring-[#38b6ff]/8 transition-all"

export default function BrochureModal({ 
  isOpen, 
  onClose, 
  collegeName, 
  collegeId, 
  stream, 
  mode = 'brochure', 
  targetUrl 
}: BrochureModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const config = MODAL_CONFIG[mode]

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('body-modal-open')
    } else {
      document.body.classList.remove('body-modal-open')
    }
    return () => document.body.classList.remove('body-modal-open')
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase.from('leads').insert([{
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        ...(collegeId ? { college_id: collegeId } : {}),
        college_name: collegeName,
        stream: stream,
        source: config.source
      }])

      if (error) throw error
      setIsSuccess(true)
      localStorage.setItem('lead_captured', 'true')

      if (mode === 'details') {
        setTimeout(() => {
          if (targetUrl) window.location.href = targetUrl
          else {
            const slug = collegeName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            window.location.href = `/colleges/${slug}`
          }
        }, 1500)
      } else if (mode === 'share') {
        const shareUrl = `${window.location.origin}/colleges/${collegeName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
        setTimeout(async () => {
          if (navigator.share) {
            try { await navigator.share({ title: collegeName, text: `Check out ${collegeName} on Promote Education — rankings, fees, placements & more.`, url: shareUrl }) } catch {}
          } else {
            await navigator.clipboard.writeText(shareUrl)
            alert('Link copied to clipboard!')
          }
          onClose()
          setIsSuccess(false)
          setFormData({ name: '', email: '', phone: '' })
        }, 1500)
      } else {
        setTimeout(() => {
          onClose()
          setIsSuccess(false)
          setFormData({ name: '', email: '', phone: '' })
        }, 2500)
      }
    } catch (err) {
      console.error('Lead capture error:', err)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const successMessages: Record<ModalMode, string> = {
    brochure: `We've sent the official brochure of <strong>${collegeName}</strong> to your email. Our counselor will contact you shortly.`,
    details: `Redirecting you to the full profile of <strong>${collegeName}</strong>...`,
    share: `Preparing to share <strong>${collegeName}</strong>...`,
    remind: `Reminder set! We'll notify you about all important dates for <strong>${collegeName}</strong>.`,
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-3 md:p-6 overflow-y-auto modal-overlay">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl bg-white rounded-[28px] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300 z-10 my-auto" style={{ maxHeight: 'calc(100dvh - 1.5rem)' }}>
        
        {/* Left Panel */}
        <div className="hidden md:flex w-[38%] bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:24px_24px] bg-white p-8 flex flex-col justify-between relative overflow-hidden shrink-0 border-r border-slate-100">
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-50/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-8">
              <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-white italic text-sm shadow-sm">P</div>
              <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Promote Education</span>
            </div>

            <h2 className="text-2xl font-black text-slate-900 leading-tight mb-3 font-display">
              Unlock Your<br />Dream Career<br />at {collegeName}
            </h2>
            <p className="text-slate-500 text-xs leading-relaxed font-medium">
              Join thousands of successful students who found their perfect match.
            </p>
          </div>

          <div className="relative z-10 space-y-3">
            {['Official Brochure & Fees', 'Placement Stats 2025', 'Scholarship Guidance', 'Expert Counselling'].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-slate-650">
                <div className="w-4.5 h-4.5 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100/50">
                  <Check size={10} className="text-indigo-600 stroke-[3.5px]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel — Form */}
        <div className="flex-1 p-5 md:p-10 relative overflow-y-auto" style={{ maxHeight: 'calc(100dvh - 2rem)', WebkitOverflowScrolling: 'touch' }}>
          <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 min-w-[44px] min-h-[44px] flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-full transition-all z-50">
            <X size={16} className="text-slate-500" />
          </button>

          {isSuccess ? (
            <div className="text-center py-14 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/10">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">
                {mode === 'details' ? 'Redirecting...' : mode === 'share' ? 'Sharing...' : 'Request Successful!'}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto" dangerouslySetInnerHTML={{ __html: successMessages[mode] }} />
            </div>
          ) : (
            <>
              <div className="mb-7">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-[2px] bg-[#38b6ff] rounded-full" />
                  <span className="text-[10px] font-bold text-[#38b6ff] uppercase tracking-widest">Personalized Admissions</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  {config.title} <span className="text-[#38b6ff]">{config.highlight}</span>
                </h3>
                <p className="text-slate-400 text-sm mt-1.5 leading-relaxed">{config.description(collegeName)}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Student Full Name</label>
                  <div className="relative group">
                    <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#38b6ff] transition-colors pointer-events-none" />
                    <input required type="text" placeholder="e.g. Aryan Singh" className={inputCls}
                      value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Email Address</label>
                  <div className="relative group">
                    <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#38b6ff] transition-colors pointer-events-none" />
                    <input required type="email" placeholder="aryan@gmail.com" className={inputCls}
                      value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Mobile Number</label>
                  <div className="relative group">
                    <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#38b6ff] transition-colors pointer-events-none" />
                    <input required type="tel" placeholder="+91 99XXXXXX01" className={inputCls}
                      value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-1">
                  <div className="flex items-center h-5 mt-0.5">
                    <input id="terms-brochure" type="checkbox" required checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="w-4 h-4 text-[#38b6ff] bg-white border-slate-300 rounded focus:ring-[#38b6ff] cursor-pointer" />
                  </div>
                  <label htmlFor="terms-brochure" className="text-[10px] text-slate-400 leading-normal cursor-pointer select-none">
                    I agree to receive info via call/SMS/email and accept the{' '}
                    <a href="/terms" className="text-[#38b6ff] font-bold hover:underline">Terms & Conditions</a>
                  </label>
                </div>

                <button type="submit" disabled={isSubmitting || !agreed}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] shadow-xl shadow-slate-900/10">
                  {isSubmitting ? (
                    <><Loader2 size={16} className="animate-spin" /> Processing...</>
                  ) : (
                    <>{config.buttonIcon} {config.buttonText}</>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-1">
                  <Shield size={10} />
                  <span>Your information is 100% secure and private.</span>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
