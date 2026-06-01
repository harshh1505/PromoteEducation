'use client'

import { useState } from 'react'
import { X, User, Mail, Phone, GraduationCap, Loader2, CheckCircle2, TrendingUp, Users, Check } from 'lucide-react'

interface CounsellingModalProps {
  isOpen: boolean
  onClose: () => void
}

// Replace with your actual Google Form Action URL and Entry IDs
// To find these: 
// 1. View your Google Form
// 2. Inspect the form element to get the 'action' URL
// 3. Inspect each input element to get the 'name' (e.g., entry.123456)
const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse"
const FIELD_IDS = {
  name: "entry.111111111",
  email: "entry.222222222",
  phone: "entry.333333333",
  stream: "entry.444444444",
  preferredCollege: "entry.555555555",
  message: "entry.666666666"
}

const inputCls = "w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-[#38b6ff] focus:bg-white focus:ring-4 focus:ring-[#38b6ff]/8 transition-all"
const selectCls = inputCls + " appearance-none cursor-pointer"

export default function CounsellingModal({ isOpen, onClose }: CounsellingModalProps) {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    try {
      await fetch(GOOGLE_FORM_ACTION, { method: 'POST', mode: 'no-cors', body: formData })
      setSubmitted(true)
      setTimeout(() => {
        onClose()
        setSubmitted(false)
      }, 3000)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert("Submission failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative w-full max-w-3xl bg-white rounded-[28px] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300 z-10">
        
        {/* Left Panel */}
        <div className="md:w-[38%] bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:24px_24px] bg-white p-8 flex flex-col justify-between relative overflow-hidden shrink-0 border-r border-slate-100">
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-50/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-6">
              <TrendingUp className="text-indigo-600" size={20} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 leading-tight mb-3">
              Expert<br />Counselling
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-6 font-medium">
              Join 50k+ students who found their right career path with our experts.
            </p>
            <div className="space-y-3">
              {[
                { text: 'Admission Support' },
                { text: 'Scholarship Guide' },
                { text: 'Career Roadmap' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-slate-650">
                  <div className="w-4.5 h-4.5 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100/50">
                    <Check size={10} className="text-indigo-600 stroke-[3.5px]" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-8">
            <div className="flex -space-x-2 mb-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                  <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="User" />
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
              Trusted by 2M+<br />Aspirants Yearly
            </p>
          </div>
        </div>

        {/* Right Panel — Form */}
        <div className="flex-1 p-7 md:p-9">
          <button onClick={onClose} className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-full transition-all z-50">
            <X size={16} className="text-slate-500" />
          </button>

          {submitted ? (
            <div className="py-16 flex flex-col items-center text-center animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/10">
                <CheckCircle2 size={36} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">Application Received!</h2>
              <p className="text-sm text-slate-400">An expert counselor will reach out to you within 24 hours.</p>
            </div>
          ) : (
            <>
              <div className="mb-7">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-[2px] bg-[#38b6ff] rounded-full" />
                  <span className="text-[10px] font-bold text-[#38b6ff] uppercase tracking-widest">Free Session</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-1">Apply for Guidance</h2>
                <p className="text-sm text-slate-400">Professional admission support in minutes.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Full Name</label>
                    <div className="relative group">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#38b6ff] transition-colors pointer-events-none" size={14} />
                      <input name={FIELD_IDS.name} type="text" required placeholder="John Doe" className={inputCls} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Phone</label>
                    <div className="relative group">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#38b6ff] transition-colors pointer-events-none" size={14} />
                      <input name={FIELD_IDS.phone} type="tel" required placeholder="+91 00000 00000" className={inputCls} />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#38b6ff] transition-colors pointer-events-none" size={14} />
                    <input name={FIELD_IDS.email} type="email" required placeholder="hello@example.com" className={inputCls} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Selected Stream</label>
                  <div className="relative group">
                    <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#38b6ff] transition-colors pointer-events-none" size={14} />
                    <select name={FIELD_IDS.stream} required className={selectCls}>
                      <option value="">Choose Course Category</option>
                      <option value="Engineering">Engineering & Tech</option>
                      <option value="Medical">Medical & Sciences</option>
                      <option value="Management">Management (MBA)</option>
                      <option value="Law">Legal Studies</option>
                      <option value="Other">Other Disciplines</option>
                    </select>
                  </div>
                </div>

                <button type="submit" disabled={loading}
                  className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-900/10 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-2">
                  {loading ? <Loader2 className="animate-spin" size={16} /> : (
                    <>Submit Application <TrendingUp size={14} /></>
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
