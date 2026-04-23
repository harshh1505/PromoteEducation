'use client'

import React, { useState } from 'react'
import { X, Mail, Phone, User, Download, CheckCircle2, Loader2, Info, Share2, Bell } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type ModalMode = 'brochure' | 'details' | 'share' | 'remind'

const MODAL_CONFIG: Record<ModalMode, {
  title: string
  highlight: string
  description: (name: string) => string
  buttonText: string
  buttonIcon: React.ReactNode
  source: string
}> = {
  brochure: {
    title: 'Download',
    highlight: 'Brochure',
    description: (name) => `Enter your details to receive the official brochure and fee structure for ${name}.`,
    buttonText: 'Send Me the Brochure',
    buttonIcon: <Download size={18} />,
    source: 'brochure_download',
  },
  details: {
    title: 'View',
    highlight: 'College Details',
    description: (name) => `Enter your details to unlock the full profile, placement stats, and reviews for ${name}.`,
    buttonText: 'View Full Details',
    buttonIcon: <Info size={18} />,
    source: 'college_details',
  },
  share: {
    title: 'Share',
    highlight: 'College Info',
    description: (name) => `Enter your details to share the profile of ${name} with friends and family.`,
    buttonText: 'Share Now',
    buttonIcon: <Share2 size={18} />,
    source: 'share_college',
  },
  remind: {
    title: 'Set',
    highlight: 'Exam Reminder',
    description: (name) => `Enter your details and we'll remind you about important dates and deadlines for ${name}.`,
    buttonText: 'Set Reminder',
    buttonIcon: <Bell size={18} />,
    source: 'exam_reminder',
  },
}

interface BrochureModalProps {
  isOpen: boolean
  onClose: () => void
  collegeName: string
  collegeId?: string
  stream: string
  mode?: ModalMode
}

export default function BrochureModal({ isOpen, onClose, collegeName, collegeId, stream, mode = 'brochure' }: BrochureModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const config = MODAL_CONFIG[mode]

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('leads')
        .insert([
          {
            full_name: formData.name,
            email: formData.email,
            phone: formData.phone,
            ...(collegeId ? { college_id: collegeId } : {}),
            college_name: collegeName,
            stream: stream,
            source: config.source
          }
        ])

      if (error) throw error
      setIsSuccess(true)

      if (mode === 'details') {
        // Redirect to college detail page after a brief success message
        setTimeout(() => {
          const slug = collegeName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
          window.location.href = `/college/${slug}`
        }, 1500)
      } else if (mode === 'share') {
        // Trigger native share after success
        const shareUrl = `${window.location.origin}/college/${collegeName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
        setTimeout(async () => {
          if (navigator.share) {
            try {
              await navigator.share({
                title: collegeName,
                text: `Check out ${collegeName} on Promote Education — rankings, fees, placements & more.`,
                url: shareUrl,
              })
            } catch {
              // User cancelled or share failed — silently ignore
            }
          } else {
            // Fallback: copy to clipboard
            await navigator.clipboard.writeText(shareUrl)
            alert('Link copied to clipboard!')
          }
          onClose()
          setIsSuccess(false)
          setFormData({ name: '', email: '', phone: '' })
        }, 1500)
      } else {
        // Brochure / Remind: auto-close after success
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
    <div className="fixed inset-0 z-[100] bg-white animate-in slide-in-from-bottom duration-500 flex flex-col md:flex-row overflow-hidden">
      {/* Left Sidebar - Branding & Value Prop */}
      <div className="hidden md:flex w-1/3 bg-slate-900 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 rounded-full bg-sky-500 blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 rounded-full bg-emerald-500 blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center font-black text-white italic">P</div>
            <span className="text-lg font-black text-white uppercase tracking-widest">Promote Education</span>
          </div>

          <h2 className="text-4xl font-medium text-white leading-tight mb-6">
            Unlock Your <span className="text-sky-400">Dream Career</span> at {collegeName}
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed font-medium">
            Join thousands of successful students who found their perfect academic match through our expert counseling.
          </p>
        </div>

        <div className="relative z-10 space-y-6">
          {[
            'Official Brochure & Fee Structure',
            'Placement Statistics 2024-25',
            'Exclusive Scholarship Guidance',
            '1-on-1 Expert Counseling Session'
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-slate-300">
              <div className="w-5 h-5 rounded-full bg-sky-500/20 flex items-center justify-center">
                <CheckCircle2 size={12} className="text-sky-400" />
              </div>
              <span className="text-sm font-bold uppercase tracking-wider">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar - Form Area */}
      <div className="flex-1 bg-white relative flex flex-col justify-center items-center p-8 md:p-20 overflow-y-auto">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-3 hover:bg-slate-50 rounded-full transition-all group z-50"
        >
          <X size={24} className="text-slate-400 group-hover:text-slate-900 group-hover:rotate-90 transition-all duration-300" />
        </button>

        <div className="w-full max-w-lg">
          {isSuccess ? (
            <div className="text-center animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/10">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4">
                {mode === 'details' ? 'Redirecting...' : mode === 'share' ? 'Sharing...' : 'Request Successful!'}
              </h3>
              <p className="text-slate-500 text-lg leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: successMessages[mode] }} />
            </div>
          ) : (
            <>
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-[2px] bg-sky-500" />
                  <span className="text-[11px] font-black text-sky-500 uppercase tracking-[0.2em]">Personalized Admissions</span>
                </div>
                <h3 className="text-4xl font-black text-slate-900 mb-4 leading-tight">
                  {config.title} <span className="text-sky-500 italic">{config.highlight}</span>
                </h3>
                <p className="text-slate-500 text-lg font-medium leading-relaxed">
                  {config.description(collegeName)}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Student Full Name</label>
                    <div className="relative group">
                      <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sky-500 transition-colors" />
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. Aryan Singh" 
                        className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:bg-white focus:border-sky-500/30 transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Official Email Address</label>
                    <div className="relative group">
                      <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sky-500 transition-colors" />
                      <input 
                        required
                        type="email" 
                        placeholder="aryan@gmail.com" 
                        className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:bg-white focus:border-sky-500/30 transition-all"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Contact Mobile Number</label>
                    <div className="relative group">
                      <Phone size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sky-500 transition-colors" />
                      <input 
                        required
                        type="tel" 
                        placeholder="+91 99XXXXXX01" 
                        className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:bg-white focus:border-sky-500/30 transition-all"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2 px-2 mt-2">
                  <div className="flex items-center h-5 mt-0.5">
                    <input 
                      id="terms-brochure"
                      type="checkbox"
                      required
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="w-4 h-4 text-sky-600 bg-white border-slate-300 rounded focus:ring-sky-500 transition-all cursor-pointer"
                    />
                  </div>
                  <label htmlFor="terms-brochure" className="text-[10px] text-slate-500 font-bold leading-normal cursor-pointer select-none uppercase tracking-wider">
                    I agree to receive info via call/SMS/email and accept the 
                    <a href="/terms" className="text-sky-500 hover:underline mx-1">Terms & Conditions</a>
                  </label>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting || !agreed}
                  className="w-full bg-slate-900 text-white py-6 rounded-[32px] font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> Processing...
                    </>
                  ) : (
                    <>
                      {config.buttonIcon} {config.buttonText}
                    </>
                  )}
                </button>
              </form>
              
            </>
          )}
        </div>
      </div>
    </div>
  )
}
