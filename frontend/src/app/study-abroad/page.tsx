import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { 
  Sparkles, 
  Mail, 
  Instagram, 
  Linkedin, 
  Youtube, 
  MessageCircle,
  GraduationCap,
  Globe,
  FileText,
  Star
} from 'lucide-react'

// ─────────────────────────────────────────────
// SEO METADATA — Next.js App Router
// ─────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Study Abroad Coming Soon | Promote Education',
  description: 'We are building something exceptional to help you study at the world\'s best universities. Get early access and updates.',
  openGraph: {
    title: 'Study Abroad Coming Soon | Promote Education',
    description: 'Personalized guidance. End-to-end support. Global opportunities.',
    type: 'website',
  },
}

export default function StudyAbroadPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD] text-slate-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      <main className="flex-1 pt-32 pb-8 relative overflow-hidden flex flex-col justify-center">
        {/* Background gradient blur */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#e0f2fe] rounded-full blur-[150px] opacity-40 -mr-40 -mt-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            
            {/* ── LEFT COLUMN: CONTENT ── */}
            <div className="flex-1 max-w-xl w-full pt-4 lg:pt-0">

              <h1 className="text-5xl md:text-[4rem] font-black tracking-tight leading-[1.1] mb-4 text-slate-900">
                Your Global Future<br />
                <span className="text-[#0ea5e9]">Starts Here.</span>
              </h1>

              {/* Blue Divider Line */}
              <div className="w-16 h-1 bg-[#0ea5e9] rounded-full mb-4" />

              <div className="space-y-2 mb-6 text-slate-500 font-medium text-lg leading-relaxed max-w-md">
                <p>
                  We're building something exceptional to help you study at the world's best universities.
                </p>
                <p>
                  Personalized guidance. End-to-end support. Global opportunities.
                </p>
              </div>

              {/* Newsletter Card */}
              <div className="bg-white border border-slate-100 rounded-3xl p-5 sm:p-6 shadow-xl shadow-slate-200/40 mb-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#f0f9ff] rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
                
                <h3 className="text-base font-black text-slate-900 mb-1 relative z-10">Be the first to know when we launch!</h3>
                <p className="text-xs text-slate-500 font-medium mb-4 relative z-10">Get early access, updates & exclusive benefits.</p>
                
                <div className="flex flex-col sm:flex-row gap-2 relative z-10">
                  <div className="relative flex-1">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="email" 
                      placeholder="Enter your email address" 
                      className="w-full pl-10 pr-4 py-3 bg-[#f0f4f8] border border-transparent rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0ea5e9] focus:ring-4 focus:ring-[#0ea5e9]/10 transition-all"
                    />
                  </div>
                  <button 
                    type="button" 
                    className="px-8 py-3 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold text-sm rounded-xl transition-colors shrink-0 shadow-md shadow-blue-500/20"
                  >
                    Notify Me
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-bold text-slate-500">Follow us for updates</span>
                <div className="flex gap-2">
                  <a href="https://instagram.com/promote_education" className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
                    <Instagram size={14} />
                  </a>
                  <a href="https://linkedin.com/company/promote-education-pvt-ltd" className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-[#0a66c2] transition-colors">
                    <Linkedin size={14} />
                  </a>
                  <a href="https://youtube.com/@PromoteEducationOfficial" className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-[#ff0000] transition-colors">
                    <Youtube size={14} />
                  </a>
                  <a href="https://wa.me/919900116101" className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-[#25d366] transition-colors">
                    <MessageCircle size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN: IMAGE ── */}
            <div className="flex-1 w-full flex justify-center lg:justify-end relative">
              {/* Decorative dashed circle line placeholder */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square rounded-full border border-dashed border-slate-200 pointer-events-none" />
              
              <div className="relative w-full max-w-lg z-10">
                <img 
                  src="/images/study_abroad_landmarks.png" 
                  alt="Global Travel and Study" 
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* ── BOTTOM STATS / FEATURES BANNER ── */}
          <div className="mt-8 lg:mt-10 relative z-20">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-200/50 border border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                
                <div className="flex items-start gap-4 sm:px-6 first:pl-0 pt-6 sm:pt-0 first:pt-0">
                  <div className="w-12 h-12 rounded-full bg-[#f0f9ff] flex items-center justify-center text-[#0ea5e9] shrink-0 border border-[#e0f2fe]">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 mb-1">Top Global Universities</h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Partnered with 500+ institutions worldwide</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 sm:px-6 pt-6 sm:pt-0">
                  <div className="w-12 h-12 rounded-full bg-[#f0f9ff] flex items-center justify-center text-[#3b82f6] shrink-0 border border-[#e0f2fe]">
                    <Globe size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 mb-1">End-to-End Support</h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">From shortlisting to visa, we handle it all</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 sm:px-6 pt-6 sm:pt-0">
                  <div className="w-12 h-12 rounded-full bg-[#f0f9ff] flex items-center justify-center text-[#6366f1] shrink-0 border border-[#e0f2fe]">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 mb-1">Personalized Guidance</h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Expert counselors for your unique profile</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 sm:px-6 pt-6 sm:pt-0 last:pr-0">
                  <div className="w-12 h-12 rounded-full bg-[#f0f9ff] flex items-center justify-center text-[#8b5cf6] shrink-0 border border-[#e0f2fe]">
                    <Star size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 mb-1">Higher Success Rate</h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Proven strategies for better admit outcomes</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
