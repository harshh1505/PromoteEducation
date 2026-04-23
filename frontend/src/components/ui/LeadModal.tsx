'use client'

import React, { useState, useEffect } from 'react'
import { X, CheckCircle2, Loader2, User, Mail, Phone, MapPin, GraduationCap, Building2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

import AuthModal from './AuthModal'

interface LeadModalProps {
  isOpen: boolean
  onClose: () => void
  collegeName: string
  collegeLogo?: string
  stream: string
}

export default function LeadModal({ isOpen, onClose, collegeName, collegeLogo, stream }: LeadModalProps) {
  const [user, setUser] = useState<any>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    course: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [agreed, setAgreed] = useState(false)

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
    
    // Also listen for auth changes to update state immediately after login
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
      const { error } = await supabase
        .from('leads')
        .insert([
          {
            full_name: formData.name,
            email: formData.email,
            phone: formData.phone,
            city: formData.city,
            course: formData.course || stream,
            college_name: collegeName,
            source: 'college_lead_form'
          }
        ])

      if (error) throw error
      setIsSuccess(true)
      setTimeout(() => {
        onClose()
        setIsSuccess(false)
      }, 3000)
    } catch (err) {
      console.error('Lead capture error:', err)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300 overflow-y-auto">
        <div className="bg-white w-full max-w-4xl rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row relative animate-in zoom-in-95 duration-300 my-auto">
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-white/80 backdrop-blur-md hover:bg-slate-100 rounded-full transition-colors z-[40] shadow-sm"
          >
            <X size={18} className="text-slate-400" />
          </button>

          {/* Left Side: Info & Illustration - Hidden on tablet and below */}
          <div className="hidden lg:flex w-[40%] bg-slate-50 p-12 flex-col justify-between relative overflow-hidden shrink-0">
             <div className="relative z-10">
                <h2 className="text-3xl font-black text-slate-900 mb-4 leading-tight">Register Now</h2>
                <p className="text-slate-500 text-sm leading-relaxed max-w-[240px]">
                  Get access to college brochures, favourites and your personalized dashboard
                </p>
             </div>
             
             {/* Illustration Placeholder */}
             <div className="relative z-10 mt-8">
                <img 
                  src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg" 
                  alt="register" 
                  className="w-full h-auto mix-blend-multiply"
                />
             </div>

             {/* Decorative elements */}
             <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-sky-100/50 rounded-full blur-3xl" />
             <div className="absolute bottom-[-5%] left-[-5%] w-48 h-48 bg-amber-100/50 rounded-full blur-3xl" />
          </div>

          {/* Right Side: Form */}
          <div className="flex-1 p-6 md:p-10 lg:p-12 bg-[#F0FFF4]/30 relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            
            {isSuccess ? (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center py-12 animate-in zoom-in-95 duration-500">
                 <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={32} />
                 </div>
                 <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Success!</h3>
                 <p className="text-slate-600 px-4 md:px-8 text-xs md:text-sm">Your interest in <strong>{collegeName}</strong> has been registered. Our counselor will contact you shortly.</p>
              </div>
            ) : (
              <>
                {/* Header inside form */}
                <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                   <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-xl md:rounded-2xl shadow-sm border border-slate-100 p-1.5 md:p-2 flex items-center justify-center overflow-hidden">
                      <img 
                        src={collegeLogo || `https://ui-avatars.com/api/?name=${collegeName}&background=random`} 
                        alt="logo" 
                        className="w-full h-full object-contain" 
                      />
                   </div>
                   <div>
                      <h4 className="text-base md:text-lg font-black text-slate-900 leading-tight">Register Now</h4>
                      <p className="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest line-clamp-1">{collegeName}</p>
                   </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                   {/* Pre-filled College Field (Collegedunia Style) */}
                   <div className="relative">
                      <Building2 size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        readOnly
                        type="text"
                        className="w-full pl-10 pr-10 py-2.5 md:py-3 bg-white/50 border border-slate-200 rounded-xl text-xs md:text-sm text-slate-600 font-bold cursor-default"
                        value={collegeName}
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
                         <div className="w-px h-4 bg-slate-200 mx-1" />
                         <X size={12} className="text-slate-300" />
                      </div>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      <div className="relative">
                         <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                         <input 
                           required
                           type="text"
                           placeholder="Full Name*"
                           className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-white border border-slate-200 rounded-xl text-xs md:text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                           value={formData.name}
                           onChange={(e) => setFormData({...formData, name: e.target.value})}
                         />
                      </div>
                      <div className="relative">
                         <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                         <input 
                           required
                           type="email"
                           placeholder="Email Address*"
                           className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-white border border-slate-200 rounded-xl text-xs md:text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                           value={formData.email}
                           onChange={(e) => setFormData({...formData, email: e.target.value})}
                         />
                      </div>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      <div className="relative">
                         <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                         <input 
                           required
                           type="tel"
                           placeholder="Phone Number*"
                           className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-white border border-slate-200 rounded-xl text-xs md:text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                           value={formData.phone}
                           onChange={(e) => setFormData({...formData, phone: e.target.value})}
                         />
                      </div>
                      <div className="relative">
                         <MapPin size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                         <input 
                           required
                           type="text"
                           placeholder="Current City*"
                           className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-white border border-slate-200 rounded-xl text-xs md:text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                           value={formData.city}
                           onChange={(e) => setFormData({...formData, city: e.target.value})}
                         />
                      </div>
                   </div>

                   <div className="relative">
                      <GraduationCap size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <select 
                        required
                        className="w-full pl-10 pr-10 py-2.5 md:py-3 bg-white border border-slate-200 rounded-xl text-xs md:text-sm appearance-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all cursor-pointer font-medium text-slate-600"
                        value={formData.course}
                        onChange={(e) => setFormData({...formData, course: e.target.value})}
                      >
                         <option value="">Interested Course*</option>
                         <option value="B.Tech">B.Tech (Engineering)</option>
                         <option value="MBA">MBA (Management)</option>
                         <option value="MBBS">MBBS (Medical)</option>
                         <option value="B.Arch">B.Arch (Architecture)</option>
                         <option value="LLB">LLB (Law)</option>
                         <option value="Other">Other</option>
                      </select>
                   </div>

                   <div className="flex items-start gap-2 px-2 mt-4">
                      <div className="flex items-center h-5 mt-0.5">
                         <input 
                           id="terms-lead"
                           type="checkbox"
                           required
                           checked={agreed}
                           onChange={(e) => setAgreed(e.target.checked)}
                           className="w-4 h-4 text-green-600 bg-white border-slate-300 rounded focus:ring-green-500 transition-all cursor-pointer"
                         />
                      </div>
                      <label htmlFor="terms-lead" className="text-[10px] text-slate-500 leading-normal cursor-pointer select-none">
                        I agree to receive communications from Promote Education via email/call/SMS and accept the 
                        <a href="/terms" className="text-red-600 font-black hover:underline mx-1">Terms & Conditions</a>
                      </label>
                   </div>

                   <button 
                     type="submit"
                     disabled={isSubmitting || !agreed}
                     className="w-full bg-[#002B5B] text-white py-3.5 md:py-4 rounded-xl font-bold text-xs md:text-sm hover:bg-[#001F42] transition-all shadow-xl shadow-blue-900/10 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99] mt-4"
                   >
                      {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : 'Submit'}
                   </button>


                   {!user && (
                     <div className="pt-4 text-center border-t border-slate-100/50 mt-4">
                        <p className="text-[11px] text-slate-600">
                          Already Registered? <button type="button" onClick={() => setShowAuthModal(true)} className="text-red-600 font-black hover:underline">Login Now</button>
                        </p>
                     </div>
                   )}
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  )
}
