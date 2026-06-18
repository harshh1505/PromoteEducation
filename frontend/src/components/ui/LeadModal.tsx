'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { X, CheckCircle2, Loader2, User, Mail, Phone, MapPin, GraduationCap, Building2, Lock, Eye, EyeOff, ArrowRight, Shield, Check } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface LeadModalProps {
  isOpen: boolean
  onClose: () => void
  collegeName: string
  collegeLogo?: string
  stream?: string
  collegeId?: string
}

const InputField = ({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType
  label: string
  children: React.ReactNode
}) => (
  <div className="space-y-1.5">
    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">{label}</label>
    <div className="relative group">
      <Icon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#38b6ff] transition-colors pointer-events-none z-10" />
      {children}
    </div>
  </div>
)

const inputCls = "w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-[#38b6ff] focus:bg-white focus:ring-4 focus:ring-[#38b6ff]/8 transition-all"

export default function LeadModal({ isOpen, onClose, collegeName, collegeLogo, stream, collegeId }: LeadModalProps) {
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    state: '',
    city: '',
    course: stream || '',
    college: collegeName || '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [agreed, setAgreed] = useState(true)

  useEffect(() => {
    if (collegeName) {
      setFormData(prev => ({ ...prev, college: collegeName }))
    }
  }, [collegeName])



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
        city: formData.city,
        stream: formData.course || stream,
        college_name: formData.college || collegeName,
        source: `lead_form_message: ${formData.message} | State: ${formData.state}`,
        status: 'new'
      }])

      if (error) throw error
      localStorage.setItem('lead_captured', 'true')
      setIsSuccess(true)
      
      setTimeout(() => {
        onClose()
        setIsSuccess(false)
        if (collegeId) router.push(`/colleges/${collegeId}`)
        else router.push('/')
      }, 1800)
    } catch (err: any) {
      console.error('Registration error:', err)
      alert(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-3 md:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto modal-overlay">
        <div className="relative bg-white w-full max-w-5xl rounded-[28px] overflow-hidden shadow-2xl flex flex-col lg:flex-row animate-in zoom-in-95 duration-300 my-auto mx-auto" style={{ maxHeight: 'calc(100dvh - 1.5rem)' }}>
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 min-w-[44px] min-h-[44px] flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-full transition-all z-50"
          >
            <X size={16} className="text-slate-500" />
          </button>

          {isSuccess ? (
            <div className="w-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/10">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Plan Created!</h3>
              <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                Your admission request for <strong className="text-slate-700">{formData.college || collegeName}</strong> is registered. A counselor will contact you shortly.
              </p>
            </div>
          ) : (
            <>
              {/* Left Panel — hidden on mobile to give form full space */}
              <div className="hidden lg:flex w-full lg:w-[42%] bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:24px_24px] bg-white p-8 md:p-10 flex-col justify-between relative overflow-hidden shrink-0 border-r border-slate-100">
                {/* Glow blobs */}
                <div className="absolute top-0 right-0 w-56 h-56 bg-indigo-50/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-50/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 text-[10px] font-black text-slate-800 uppercase tracking-widest">
                    Admissions Open 2026
                  </div>

                  <div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-[1.1] tracking-tighter font-display">
                      Plan your admission <br />
                      the right way.
                    </h2>
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed mt-5 font-medium">
                      Get expert guidance, compare the best colleges, and secure your seat without confusion. Fill in your details and we'll help you take the next step with clarity and confidence.
                    </p>
                  </div>

                  {/* Horizontal Divider */}
                  <div className="h-[1px] bg-slate-150 my-6" />

                  {/* Bullet points side-by-side grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-2.5">
                      <div className="w-4.5 h-4.5 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5 border border-indigo-100/50">
                        <Check size={10} className="text-indigo-600 stroke-[3.5px]" />
                      </div>
                      <span className="text-slate-650 text-[11px] md:text-xs font-bold leading-snug">
                        Right course & college based on your profile
                      </span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="w-4.5 h-4.5 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5 border border-indigo-100/50">
                        <Check size={10} className="text-indigo-600 stroke-[3.5px]" />
                      </div>
                      <span className="text-slate-650 text-[11px] md:text-xs font-bold leading-snug">
                        Simple guidance from application to admission
                      </span>
                    </div>
                  </div>

                  {/* Horizontal Divider */}
                  <div className="h-[1px] bg-slate-150 my-6" />
                </div>

                <div className="relative z-10 mt-8">
                  <a 
                    href="tel:+919900116101"
                    className="inline-flex w-full items-center justify-center gap-2 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-extrabold text-xs rounded-2xl shadow-sm transition-all"
                  >
                    Talk to a Counsellor
                  </a>
                </div>
              </div>

              {/* Right Panel — form scrollable on mobile */}
              <div className="flex-1 p-5 md:p-8 bg-white overflow-y-auto" style={{ maxHeight: 'calc(100dvh - 2rem)', WebkitOverflowScrolling: 'touch' }}>
                <div className="mb-5">
                  <p className="text-[10px] font-bold text-[#38b6ff] uppercase tracking-widest mb-1">Quick Registration</p>
                  <h3 className="text-xl font-black text-slate-900">Fill in your details</h3>
                </div>

                {collegeName && (
                  <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100 mb-5">
                    <div className="w-9 h-9 bg-white rounded-xl overflow-hidden flex items-center justify-center shrink-0 border border-slate-100">
                      <img 
                        src={collegeLogo || `https://ui-avatars.com/api/?name=${collegeName}&background=random`} 
                        alt="college" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Applying For</p>
                      <h4 className="text-sm font-bold text-slate-800 truncate">{collegeName}</h4>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField icon={User} label="Full Name">
                      <input required type="text" placeholder="Student Name*" className={inputCls}
                        value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    </InputField>
                    <InputField icon={Mail} label="Email">
                      <input required type="email" placeholder="Email Address*" className={inputCls}
                        value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    </InputField>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField icon={Phone} label="Phone Number">
                      <input required type="tel" placeholder="Phone Number*" className={inputCls}
                        value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                    </InputField>
                    <InputField icon={MapPin} label="State">
                      <select required className={inputCls + " appearance-none cursor-pointer"}
                        value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})}>
                        <option value="">Select State*</option>
                        {['West Bengal','Karnataka','Delhi','Maharashtra','Tamil Nadu','Uttar Pradesh','Gujarat','Haryana','Telangana','Rajasthan','Other'].map(st => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </InputField>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField icon={MapPin} label="City">
                      <input required type="text" placeholder="Current City*" className={inputCls}
                        value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                    </InputField>
                    <InputField icon={GraduationCap} label="Interested Course">
                      <select required className={inputCls + " appearance-none cursor-pointer"}
                        value={formData.course} onChange={(e) => setFormData({...formData, course: e.target.value})}>
                        <option value="">Choose Course*</option>
                        <option value="B.Tech">B.Tech (Engineering)</option>
                        <option value="MBA">MBA (Management)</option>
                        <option value="MBBS">MBBS (Medical)</option>
                        <option value="BDS">BDS (Dental)</option>
                        <option value="B.Sc Nursing">B.Sc Nursing</option>
                        <option value="Law">Law (LLB/BALLB)</option>
                        <option value="Other">Other Course</option>
                      </select>
                    </InputField>
                  </div>

                  <InputField icon={Building2} label="Interested College">
                    <input required type="text" placeholder="College Name*" className={inputCls}
                      value={formData.college} onChange={(e) => setFormData({...formData, college: e.target.value})} />
                  </InputField>



                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Any Questions?</label>
                    <textarea rows={2} placeholder="Type your questions or queries here..."
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-[#38b6ff] focus:bg-white focus:ring-4 focus:ring-[#38b6ff]/8 transition-all resize-none"
                      value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="flex items-center h-5 mt-0.5">
                      <input id="terms-lead" type="checkbox" required checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="w-4 h-4 text-[#38b6ff] bg-white border-slate-300 rounded focus:ring-[#38b6ff] cursor-pointer" />
                    </div>
                    <label htmlFor="terms-lead" className="text-[10px] text-slate-400 leading-normal cursor-pointer select-none">
                      I agree to receive communications from Promote Education via email/call/SMS and accept the{' '}
                      <a href="/terms" className="text-[#38b6ff] font-bold hover:underline">Terms & Conditions</a>
                    </label>
                  </div>

                  <button type="submit" disabled={isSubmitting || !agreed}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-2xl font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]">
                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : (
                      <><span>Get Your Admission Plan</span><ArrowRight size={16} /></>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                    <Shield size={10} />
                    <span>Your information is secure. <a href="/privacy-policy" className="text-[#38b6ff] hover:underline">Privacy Policy</a></span>
                  </div>


                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
