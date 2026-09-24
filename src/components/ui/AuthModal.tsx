'use client'

import { useState, useEffect } from 'react'
import { X, Mail, User, Phone, Loader2, ArrowRight, Shield } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

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

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error: insertError } = await supabase.from('leads').insert([{
        full_name: name,
        email: email,
        phone: phone,
        source: 'auth_modal_quick_inquiry',
        status: 'new'
      }])
      if (insertError) throw insertError

      localStorage.setItem('lead_captured', 'true')
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        onClose()
      }, 1500)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputCls = "w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-[#38b6ff] focus:bg-white focus:ring-4 focus:ring-[#38b6ff]/8 transition-all"

  return (
    <div className="fixed inset-0 z-[110] flex items-start md:items-center justify-center p-3 md:p-4 overflow-y-auto modal-overlay">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose} />
      
      <div className="relative w-full max-w-sm bg-white rounded-[28px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 z-10 my-auto">
        
        {/* Header */}
        <div className="bg-slate-900 px-8 py-8 text-white relative overflow-hidden">
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 min-w-[44px] min-h-[44px] flex items-center justify-center bg-white/10 hover:bg-white/15 rounded-full transition-all z-20">
            <X size={14} />
          </button>
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#38b6ff]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-[2px] bg-[#38b6ff] rounded-full" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#38b6ff]">Promote Education</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              Connect With Us
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Speak with top education experts for admissions guidance
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-6">
              <p className="text-emerald-600 font-bold text-sm">Thank you! Our expert counsellors will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#38b6ff] transition-colors pointer-events-none" size={14} />
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                    className={inputCls} placeholder="Your Full Name" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Email address</label>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#38b6ff] transition-colors pointer-events-none" size={14} />
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    className={inputCls} placeholder="name@example.com" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Phone Number</label>
                <div className="relative group">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#38b6ff] transition-colors pointer-events-none" size={14} />
                  <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)}
                    className={inputCls} placeholder="+91 98765 43210" />
                </div>
              </div>

              {error && (
                <div className="text-xs text-red-500 bg-red-50 p-3 rounded-2xl border border-red-100">
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading}
                className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white text-sm font-black rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 active:scale-[0.98] disabled:opacity-50">
                {loading ? <Loader2 className="animate-spin" size={16} /> : (
                  <>Get Free Guidance <ArrowRight size={14} /></>
                )}
              </button>
            </form>
          )}

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 mt-4 pt-4 border-t border-slate-100">
            <Shield size={10} />
            <span>Your information is 100% confidential</span>
          </div>
        </div>
      </div>
    </div>
  )
}
