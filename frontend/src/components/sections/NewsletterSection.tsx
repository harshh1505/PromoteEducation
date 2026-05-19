'use client'

import { useState } from 'react'
import { Mail, Phone, User, GraduationCap, Loader2, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function NewsletterSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', course: '' })
    }, 1500)
  }

  return (
    <section className="py-12 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
      {/* Decorative Illustrations - Subtle Vectors */}
      <div className="absolute left-0 bottom-0 w-32 md:w-48 opacity-20 pointer-events-none hidden lg:block">
         <img src="https://img.freepik.com/free-vector/hand-drawn-people-shouting-illustration_23-2149446394.jpg" alt="decor" className="w-full grayscale" />
      </div>
      <div className="absolute right-0 bottom-0 w-32 md:w-48 opacity-20 pointer-events-none hidden lg:block scale-x-[-1]">
         <img src="https://img.freepik.com/free-vector/hand-drawn-people-shouting-illustration_23-2149446394.jpg" alt="decor" className="w-full grayscale" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-[#002B5B] mb-2">Subscribe To Our News Letter</h2>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Get College Notifications, Exam Notifications And News Updates</p>
        </div>

        {status === 'success' ? (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-emerald-100 shadow-xl shadow-emerald-500/5 text-center animate-in zoom-in-95">
             <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send size={24} />
             </div>
             <h3 className="text-xl font-bold text-slate-900 mb-1">Successfully Subscribed!</h3>
             <p className="text-slate-500 text-sm">You'll start receiving the latest educational updates shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-3 md:p-2 rounded-[32px] shadow-2xl shadow-slate-200/60 border border-slate-100 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
              
              {/* Name Input */}
              <div className="flex-1 relative group">
                <User size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#002B5B] transition-colors" />
                <input 
                  required
                  type="text"
                  placeholder="Student Name*"
                  className="w-full pl-12 pr-4 py-4 bg-transparent text-sm font-bold text-slate-900 outline-none border-none placeholder:text-slate-400"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-slate-100" />
              </div>

              {/* Email Input */}
              <div className="flex-1 relative group">
                <Mail size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#002B5B] transition-colors" />
                <input 
                  required
                  type="email"
                  placeholder="Enter your email id*"
                  className="w-full pl-12 pr-4 py-4 bg-transparent text-sm font-bold text-slate-900 outline-none border-none placeholder:text-slate-400"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-slate-100" />
              </div>

              {/* Phone Input */}
              <div className="flex-1 relative group">
                <Phone size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#002B5B] transition-colors" />
                <input 
                  required
                  type="tel"
                  placeholder="Enter your mobile no*"
                  className="w-full pl-12 pr-4 py-4 bg-transparent text-sm font-bold text-slate-900 outline-none border-none placeholder:text-slate-400"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-slate-100" />
              </div>

              {/* Course Selection */}
              <div className="flex-1 relative group">
                <GraduationCap size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#002B5B] transition-colors pointer-events-none" />
                <select 
                  required
                  className="w-full pl-12 pr-10 py-4 bg-transparent text-sm font-bold text-slate-600 outline-none border-none appearance-none cursor-pointer"
                  value={formData.course}
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                >
                  <option value="">Choose your course*</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="MBA">MBA</option>
                  <option value="MBBS">MBBS</option>
                  <option value="BDS">BDS</option>
                  <option value="Law">Law</option>
                  <option value="Other">Other</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                   <Send size={12} className="rotate-90" />
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="bg-[#002B5B] text-white px-10 py-4 rounded-[24px] font-black text-sm uppercase tracking-widest hover:bg-[#001F42] transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-xl shadow-blue-900/10 min-w-[160px]"
              >
                {status === 'loading' ? <Loader2 className="animate-spin" size={18} /> : 'Submit'}
              </button>

            </div>
          </form>
        )}
      </div>
    </section>
  )
}
