'use client'

import { useState } from 'react'
import { X, User, Mail, Phone, MessageSquare, GraduationCap, Loader2, Building2, CheckCircle2, TrendingUp } from 'lucide-react'

interface CounsellingModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CounsellingModal({ isOpen, onClose }: CounsellingModalProps) {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

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

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    try {
      // Using no-cors because Google Forms doesn't support CORS for direct POST from JS
      // This will 'fail' the fetch but the data will still be sent
      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      })
      
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-midnight/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-ink-3 hover:text-ink transition-colors z-10"
        >
          <X size={24} />
        </button>

        {submitted ? (
          <div className="px-8 py-20 text-center">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
               <Loader2 className="animate-pulse" size={40} />
            </div>
            <h2 className="text-2xl font-medium text-ink mb-2">Application Received!</h2>
            <p className="text-ink-3">An expert counselor will reach out to you within 24 hours.</p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="md:w-1/3 bg-slate-900 p-8 text-white flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#38b6ff]/20 flex items-center justify-center mb-6">
                  <Star className="text-[#38b6ff]" size={20} />
                </div>
                <h3 className="text-2xl font-medium leading-tight mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                  Expert <span className="text-[#38b6ff] italic">Counseling</span>
                </h3>
                <p className="text-xs text-white/50 leading-relaxed mb-6">
                  Join 50k+ students who found their right career path with our experts.
                </p>
                <div className="space-y-4">
                   {[
                     { text: 'Admission Support', icon: CheckCircle2 },
                     { text: 'Scholarship Guide', icon: CheckCircle2 },
                     { text: 'Career Roadmap', icon: CheckCircle2 }
                   ].map((item, i) => (
                     <div key={i} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-white/70">
                        <item.icon size={12} className="text-[#38b6ff]" />
                        {item.text}
                     </div>
                   ))}
                </div>
              </div>
              <div className="mt-8">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="User" />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-white/40 mt-3 font-medium uppercase tracking-widest leading-loose">Trusted by 2M+ <br/> Aspirants Yearly</p>
              </div>
            </div>

            {/* Form */}
            <div className="flex-1 p-10">
              <div className="mb-10">
                <h2 className="text-3xl font-medium text-slate-900 tracking-tight mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  Apply for Guidance
                </h2>
                <p className="text-sm text-slate-500 font-medium">Professional admission support in minutes.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                      <input
                        name={FIELD_IDS.name}
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:border-[#38b6ff] focus:bg-white outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                      <input
                        name={FIELD_IDS.phone}
                        type="tel"
                        required
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:border-[#38b6ff] focus:bg-white outline-none transition-all"
                        placeholder="+91 00000 00000"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <input
                      name={FIELD_IDS.email}
                      type="email"
                      required
                      placeholder="hello@example.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:border-[#38b6ff] focus:bg-white outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Selected Stream</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <select
                      name={FIELD_IDS.stream}
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:border-[#38b6ff] focus:bg-white outline-none appearance-none transition-all cursor-pointer"
                    >
                      <option value="">Choose Course Category</option>
                      <option value="Engineering">Engineering & Tech</option>
                      <option value="Medical">Medical & Sciences</option>
                      <option value="Management">Management (MBA)</option>
                      <option value="Law">Legal Studies</option>
                      <option value="Other">Other Disciplines</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#38b6ff] text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-6 shadow-xl shadow-[#38b6ff]/20"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : (
                    <>Submit Application <TrendingUp size={16} /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Star({ className, size }: { className?: string, size?: number }) {
  return (
    <svg 
      className={className} 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
