'use client'

import React, { useState, useEffect } from 'react'
import { X, CheckCircle2, Loader2, User, Mail, Phone, MapPin, GraduationCap, Building2, Lock, Eye, EyeOff, MessageSquare, ShieldCheck } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import AuthModal from './AuthModal'

interface LeadModalProps {
  isOpen: boolean
  onClose: () => void
  collegeName: string
  collegeLogo?: string
  stream?: string
  collegeId?: string
}

export default function LeadModal({ isOpen, onClose, collegeName, collegeLogo, stream, collegeId }: LeadModalProps) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    state: '',
    city: '',
    course: stream || '',
    college: collegeName || '',
    message: '',
    password: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [agreed, setAgreed] = useState(true) // Auto-agreed as per modern standard or check default

  useEffect(() => {
    if (collegeName) {
      setFormData(prev => ({
        ...prev,
        college: collegeName
      }))
    }
  }, [collegeName])

  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        setFormData(prev => ({
          ...prev,
          name: user.user_metadata?.full_name || '',
          email: user.email || ''
        }))
      }
    }
    if (isOpen) checkUser()
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        setFormData(prev => ({
          ...prev,
          name: session.user.user_metadata?.full_name || prev.name,
          email: session.user.email || prev.email
        }))
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 1. If not logged in, try to sign up
      if (!user) {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password || Math.random().toString(36).slice(-10),
          options: {
            data: {
              full_name: formData.name,
              phone: formData.phone,
              city: formData.city
            },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          }
        })
        if (authError) throw authError
      }

      // 2. Insert into leads table
      const { error } = await supabase
        .from('leads')
        .insert([
          {
            full_name: formData.name,
            email: formData.email,
            phone: formData.phone,
            city: formData.city,
            stream: formData.course || stream,
            college_name: formData.college || collegeName,
            source: `lead_form_message: ${formData.message} | State: ${formData.state}`,
            status: 'new'
          }
        ])

      if (error) throw error
      
      localStorage.setItem('lead_captured', 'true')
      setIsSuccess(true)
      
      // 3. Redirect to college page after a short delay
      setTimeout(() => {
        onClose()
        setIsSuccess(false)
        if (collegeId) {
          router.push(`/colleges/${collegeId}`)
        } else {
          router.push('/')
        }
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
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-6 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto">
        
        {/* Modal Container */}
        <div className="relative bg-white w-full max-w-6xl rounded-[32px] overflow-hidden shadow-2xl flex flex-col lg:flex-row animate-in zoom-in-95 duration-300 my-8">
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-all duration-300 z-50 shadow-sm"
          >
            <X size={20} className="text-slate-500" />
          </button>

          {isSuccess ? (
            <div className="w-full min-h-[450px] flex flex-col items-center justify-center text-center p-12 animate-in zoom-in-95 duration-500">
               <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 size={40} />
               </div>
               <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">Plan Created Successfully!</h3>
               <p className="text-slate-500 text-sm max-w-md leading-relaxed">
                 Your customized admission request for <strong>{formData.college || collegeName}</strong> has been registered. An expert counselor will contact you shortly.
               </p>
            </div>
          ) : (
            <>
              {/* Left Side: Layout Matching Image */}
              <div className="w-full lg:w-[48%] bg-[#FAF9F6] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden shrink-0 border-r border-slate-100">
                <div className="relative z-10 space-y-6">
                  {/* Badge */}
                  <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-black text-slate-800 uppercase tracking-widest">
                    Admissions Open 2026
                  </div>

                  {/* Heading */}
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
                    Plan your admission<br />the right way.
                  </h2>

                  {/* Description */}
                  <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
                    Get expert guidance, compare the best colleges, and secure your seat without confusion. Fill in your details and we’ll help you take the next step with clarity and confidence.
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-4 pt-4 border-t border-slate-200">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 size={14} className="text-indigo-600" />
                      </div>
                      <span className="text-slate-700 text-xs md:text-sm font-semibold">
                        Right course & college based on your profile
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 size={14} className="text-indigo-600" />
                      </div>
                      <span className="text-slate-700 text-xs md:text-sm font-semibold">
                        Simple guidance from application to admission
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Left Button: WhatsApp or Call trigger */}
                <div className="relative z-10 mt-10 lg:mt-16">
                  <a 
                    href="tel:+919900116101"
                    className="inline-flex w-full items-center justify-center py-4 bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-400 font-bold text-sm rounded-xl transition-all shadow-sm"
                  >
                    Talk to a Counsellor
                  </a>
                </div>

                {/* Decorative grid pattern */}
                <div className="absolute inset-0 opacity-5 pointer-events-none" 
                  style={{
                    backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
                    backgroundSize: '16px 16px'
                  }}
                />
              </div>

              {/* Right Side: Sleek Card Layout matching form request */}
              <div className="flex-1 p-8 md:p-10 bg-white relative max-h-[90vh] overflow-y-auto">
                <div className="bg-slate-50/50 border border-slate-100 rounded-3xl p-6 md:p-8 space-y-6">
                  
                  {/* College Quick Info Banner */}
                  {collegeName && (
                    <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl overflow-hidden p-1 flex items-center justify-center shrink-0">
                        <img 
                          src={collegeLogo || `https://ui-avatars.com/api/?name=${collegeName}&background=random`} 
                          alt="college" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Applying For</p>
                        <h4 className="text-sm font-bold text-slate-800 truncate leading-snug">{collegeName}</h4>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Grid Row 1: Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Name</label>
                        <div className="relative group">
                          <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input 
                            required
                            type="text"
                            placeholder="Student Name*"
                            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs md:text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all placeholder:text-slate-300 font-medium"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Email</label>
                        <div className="relative group">
                          <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input 
                            required
                            type="email"
                            placeholder="Email Address*"
                            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs md:text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all placeholder:text-slate-300 font-medium"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Grid Row 2: Phone & State */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Phone Number</label>
                        <div className="relative group">
                          <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input 
                            required
                            type="tel"
                            placeholder="Phone Number*"
                            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs md:text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all placeholder:text-slate-300 font-medium"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">State</label>
                        <div className="relative group">
                          <MapPin size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                          <select 
                            required
                            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs md:text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all appearance-none cursor-pointer text-slate-700 font-medium"
                            value={formData.state}
                            onChange={(e) => setFormData({...formData, state: e.target.value})}
                          >
                            <option value="">Select State*</option>
                            {['West Bengal', 'Karnataka', 'Delhi', 'Maharashtra', 'Tamil Nadu', 'Uttar Pradesh', 'Gujarat', 'Haryana', 'Telangana', 'Rajasthan', 'Other'].map(st => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Grid Row 3: City & Interested Course */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">City</label>
                        <div className="relative group">
                          <MapPin size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input 
                            required
                            type="text"
                            placeholder="Current City*"
                            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs md:text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all placeholder:text-slate-300 font-medium"
                            value={formData.city}
                            onChange={(e) => setFormData({...formData, city: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Interested Course</label>
                        <div className="relative group">
                          <GraduationCap size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                          <select 
                            required
                            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs md:text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all appearance-none cursor-pointer text-slate-700 font-medium"
                            value={formData.course}
                            onChange={(e) => setFormData({...formData, course: e.target.value})}
                          >
                            <option value="">Choose Course*</option>
                            <option value="B.Tech">B.Tech (Engineering)</option>
                            <option value="MBA">MBA (Management)</option>
                            <option value="MBBS">MBBS (Medical)</option>
                            <option value="BDS">BDS (Dental)</option>
                            <option value="B.Sc Nursing">B.Sc Nursing</option>
                            <option value="Law">Law (LLB/BALLB)</option>
                            <option value="Other">Other Course</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Grid Row 4: Interested College */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Interested College</label>
                      <div className="relative group">
                        <Building2 size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          required
                          type="text"
                          placeholder="College Name*"
                          className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs md:text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all placeholder:text-slate-300 font-medium"
                          value={formData.college}
                          onChange={(e) => setFormData({...formData, college: e.target.value})}
                        />
                      </div>
                    </div>

                    {/* Password input for non-logged in users (cleanly integrated) */}
                    {!user && (
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Create Password (to check admission status)</label>
                        <div className="relative">
                          <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input 
                            required
                            type={showPassword ? "text" : "password"}
                            placeholder="Choose Password*"
                            className="w-full pl-11 pr-12 py-3 bg-white border border-slate-200 rounded-xl text-xs md:text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all placeholder:text-slate-300 font-medium"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                          />
                          <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                          >
                            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Grid Row 5: Any Questions? */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Any Questions?</label>
                      <div className="relative">
                        <textarea 
                          rows={3}
                          placeholder="Type your questions or queries here..."
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs md:text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all placeholder:text-slate-300 font-medium resize-none"
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                        />
                      </div>
                    </div>

                    {/* Terms Checklist (Subtle & clean) */}
                    <div className="flex items-start gap-2.5 px-1 mt-1">
                      <div className="flex items-center h-5 mt-0.5">
                        <input 
                          id="terms-lead"
                          type="checkbox"
                          required
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                          className="w-4 h-4 text-indigo-600 bg-white border-slate-300 rounded focus:ring-indigo-500 transition-all cursor-pointer"
                        />
                      </div>
                      <label htmlFor="terms-lead" className="text-[10px] text-slate-400 leading-normal cursor-pointer select-none">
                        I agree to receive communications from Promote Education via email/call/SMS and accept the 
                        <a href="/terms" className="text-red-500 font-black hover:underline mx-1">Terms & Conditions</a>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit"
                      disabled={isSubmitting || !agreed}
                      className="w-full bg-[#3B2EA8] hover:bg-[#2D2190] text-white py-4 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-600/15 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] mt-2 text-center"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'Get Your Admission Plan'}
                    </button>

                    {/* Lock Secure Footer text */}
                    <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 mt-4 pt-2 border-t border-slate-100">
                      <Lock size={11} className="text-slate-400" />
                      <span>Your information is secure. Read our <a href="/privacy-policy" className="text-indigo-600 underline hover:text-indigo-700">Privacy Policy</a> for details.</span>
                    </div>

                    {/* Pre-registered Login option */}
                    {!user && (
                      <div className="text-center pt-2">
                        <p className="text-xs text-slate-500">
                          Already Registered? <button type="button" onClick={() => setShowAuthModal(true)} className="text-indigo-600 font-bold hover:underline">Login Now</button>
                        </p>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  )
}
