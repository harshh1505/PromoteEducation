'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { 
  Code2, Stethoscope, ChevronRight, TrendingUp, 
  Search, ShieldCheck, Zap, ArrowRight,
  GraduationCap, Building2, Landmark, Sparkles
} from 'lucide-react'

const STREAMS = [
  {
    id: 'medical',
    title: 'Medical Sciences',
    subtitle: 'High Precision NEET Analysis',
    icon: Stethoscope,
    description: 'Explore verified cutoff ranks for AIIMS, Govt. Colleges, and Private institutions across 28 states. Optimized for 2024-25 counselling.',
    stats: ['150K+ Records', 'Real-time Stats'],
    color: 'emerald',
    href: '/cutoffs/medical',
    features: ['State-wise Analysis', 'Category Filtering', 'Round-wise Trends']
  },
  {
    id: 'engineering',
    title: 'Engineering & Tech',
    subtitle: 'JoSAA & CSAB Intelligence',
    icon: Code2,
    description: 'A dedicated engine for IIT, NIT, and IIIT branch-wise cutoffs. Predict your college based on JEE Main and Advanced ranks.',
    stats: ['IIT/NIT Focus', 'Branch Insights'],
    color: 'sky',
    href: '/cutoffs/engineering',
    features: ['Branch Comparison', 'Opening/Closing Ranks', 'Seat Allotment Data']
  }
]

export default function CutoffsPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFF] text-slate-900 overflow-x-hidden selection:bg-sky-100 selection:text-sky-900">
      <Navbar />

      {/* ── HIGH-END HERO ────────────────────────────────────────── */}
      <section className="relative pt-40 pb-28 bg-white overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 opacity-50" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-50 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 opacity-40" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-slate-900 text-white rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-10 shadow-xl shadow-slate-900/20">
              <Sparkles size={14} className="text-sky-400" />
              The Intelligence Hub
            </div>
            
            <h1 className="text-6xl sm:text-8xl font-[850] text-slate-900 tracking-[-0.04em] leading-[0.9] mb-10">
              Admissions. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-emerald-600 italic font-medium tracking-normal">Data-First.</span>
            </h1>
            
            <p className="text-2xl text-slate-500 leading-relaxed max-w-2xl mb-14 font-medium tracking-tight">
              A professional-grade engine for analyzing historical cutoff trends. Navigate the complexity of admissions with verified, structured data.
            </p>

            <div className="flex flex-wrap gap-8 items-center pt-8 border-t border-slate-100">
               <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">PE</div>
                  ))}
               </div>
               <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Trusted by <span className="text-slate-900">50K+ Students</span> Yearly</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STREAM SELECTION CARDS ──────────────────────────────── */}
      <section className="py-32 relative z-10">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-20">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-12 bg-sky-600 rounded-full" />
              <div>
                <h2 className="text-4xl font-[850] text-slate-900 tracking-tight">Select Stream</h2>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-1">Navigate to your dashboard</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {STREAMS.map((stream) => {
              const Icon = stream.icon
              const isSky = stream.color === 'sky'
              return (
                <Link 
                  key={stream.id} 
                  href={stream.href}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-slate-900 translate-x-2 translate-y-2 rounded-[3rem] opacity-5 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-500" />
                  
                  <div className="relative bg-white border border-slate-100 rounded-[3rem] p-12 h-full shadow-[0_30px_100px_rgba(0,0,0,0.03)] group-hover:shadow-[0_40px_120px_rgba(0,0,0,0.08)] group-hover:border-slate-200 transition-all duration-500">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between mb-12">
                        <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center ${isSky ? 'bg-sky-50 text-sky-600' : 'bg-emerald-50 text-emerald-600'} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                          <Icon size={40} strokeWidth={1.5} />
                        </div>
                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${isSky ? 'bg-sky-50/50 border-sky-100 text-sky-600' : 'bg-emerald-50/50 border-emerald-100 text-emerald-600'}`}>
                          {stream.subtitle}
                        </div>
                      </div>

                      <h3 className="text-5xl font-[850] text-slate-900 tracking-[-0.03em] mb-6 group-hover:text-sky-600 transition-colors">
                        {stream.title}
                      </h3>
                      
                      <p className="text-slate-500 text-lg leading-relaxed font-medium mb-10">
                        {stream.description}
                      </p>

                      <div className="space-y-4 mb-12">
                        {stream.features.map(f => (
                          <div key={f} className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isSky ? 'bg-sky-100 text-sky-600' : 'bg-emerald-100 text-emerald-600'}`}>
                               <ChevronRight size={10} strokeWidth={4} />
                            </div>
                            <span className="text-sm font-bold text-slate-600 tracking-tight">{f}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-10 border-t border-slate-50">
                        <div className="flex gap-10">
                           {stream.stats.map(s => (
                             <div key={s} className="flex flex-col">
                               <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Status</span>
                               <span className="text-xs font-black text-slate-900 tracking-widest uppercase">{s}</span>
                             </div>
                           ))}
                        </div>
                        <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center text-white transition-all duration-500 ${isSky ? 'bg-slate-900 group-hover:bg-sky-600' : 'bg-slate-900 group-hover:bg-emerald-600'}`}>
                          <ArrowRight size={24} strokeWidth={2.5} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── DARK FEATURES BENTO ────────────────────────────────── */}
      <section className="py-40 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-600 rounded-full blur-[150px] opacity-20" />
           <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[150px] opacity-20" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
           <div className="max-w-3xl mb-24">
              <h2 className="text-4xl sm:text-6xl font-[850] text-white tracking-tight leading-[1.1] mb-8">
                Designed for <br />
                <span className="text-sky-400">High-Stake</span> Decisions.
              </h2>
              <p className="text-xl text-slate-400 font-medium leading-relaxed">
                We collect and structure admission data from 1,200+ official sources to ensure you have the most accurate guidance for your career.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                { title: 'Official Data', icon: Landmark, desc: 'Every rank and score is verified against MCC, JoSAA, and State counselling archives.' },
                { title: 'Trend Analysis', icon: TrendingUp, desc: 'View 3-year historical trends to predict opening and closing ranks for the upcoming cycle.' },
                { title: 'Expert Support', icon: GraduationCap, desc: 'Get personalized choice-filling assistance from our network of expert counselors.' }
              ].map((item, idx) => (
                <div key={idx} className="group">
                  <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8 text-sky-400 group-hover:bg-sky-400 group-hover:text-white transition-all duration-500">
                    <item.icon size={28} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4">{item.title}</h4>
                  <p className="text-slate-500 font-medium leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
