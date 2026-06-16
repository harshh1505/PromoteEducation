import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowLeft, Share2, Clock, Calendar, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Best Coaching for INI CET Online & Offline Options in 2026 | Promote Education',
  description: 'Top coaching platforms and institutes for INI CET 2026 preparation. Comparison of Marrow, PrepLadder, DAMS, and Medicovision with fee structures, faculty quality, and student success rates.',
}

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/exams/ini-cet" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-900 transition-all mb-10 uppercase tracking-widest">
            <ArrowLeft size={14} /> Back to INI CET
          </Link>
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-md">Resources</span>
              <div className="flex items-center gap-2 text-slate-400 text-[11px] font-medium">
                <Calendar size={12} /> April 25, 2026
                <span className="w-1 h-1 rounded-full bg-slate-200" />
                <Clock size={12} /> 7 min read
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-8">
              Best Coaching for INI CET<br /><span className="text-slate-400">Online & Offline Options in 2026</span>
            </h1>
            <div className="flex items-center justify-between py-6 border-y border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">PE</div>
                <div>
                  <div className="text-sm font-black text-slate-900">Promote Education Editorial</div>
                  <div className="text-[11px] text-slate-400 font-medium">Verified by Academic Experts</div>
                </div>
              </div>
              <button className="p-2.5 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all"><Share2 size={18} /></button>
            </div>
          </header>
          <article className="prose prose-slate max-w-none">
            <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 mb-12">
              <h3 className="text-lg font-black text-slate-900 mb-3 mt-0">Executive Summary</h3>
              <p className="text-slate-700 text-[15px] leading-relaxed mb-0">Top coaching platforms and institutes for INI CET 2026 preparation. Comparison of Marrow, PrepLadder, DAMS, and Medicovision with fee structures, faculty quality, and student success rates.</p>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Top Online Platforms</h2>
            <div className="space-y-3 mb-8">{[{name:"Marrow",highlight:"Most comprehensive image bank; India's largest PG medical platform",fee:"₹25,000–40,000/yr"},
{name:"PrepLadder",highlight:"Best for structured subject-wise learning; excellent faculty",fee:"₹20,000–35,000/yr"},
{name:"DAMS (Delhi Academy of Medical Sciences)",highlight:"Strongest for AIIMS-specific INI CET pattern; offline + online",fee:"₹50,000–80,000 (classroom)"},
{name:"Medicovision",highlight:"Excellent for Para-clinical subjects and image-based questions",fee:"₹15,000–25,000/yr"},
].map(c=>(<div key={c.name} className="p-5 rounded-2xl bg-slate-50 border border-slate-100"><div className="flex items-center justify-between mb-2"><span className="font-black text-slate-900 text-sm">{c.name}</span><span className="text-[11px] font-bold text-emerald-600">{c.fee}</span></div><p className="text-[13px] text-slate-500 mb-0">{c.highlight}</p></div>))}</div>

            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Self-Study vs Coaching</h2>
            <p className="text-slate-600 leading-relaxed mb-4">Many INI CET toppers have cracked the exam through self-study using Marrow + standard textbooks. Coaching is most valuable for: (1) structured timetables, (2) grand tests with national-level peer comparison, and (3) motivation. If you are disciplined, a good online platform + PYQs is sufficient.</p>

            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Related Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
{[{title:'INI CET Eligibility',href:'/articles/ini-cet-eligibility-2026'},{title:'INI CET Syllabus',href:'/articles/ini-cet-syllabus-2026'},{title:'INI CET vs NEET PG',href:'/articles/ini-cet-vs-neet-pg'},{title:'AIIMS Seat Matrix',href:'/articles/aiims-pg-seat-matrix'}].map(l=>(
<Link key={l.href} href={l.href} className="p-5 rounded-2xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50 transition-all group"><div className="text-sm font-black text-slate-900 group-hover:text-emerald-700">{l.title} →</div></Link>))}
</div>

          </article>
          <div className="mt-16 pt-16 border-t border-slate-100 text-center">
            <h3 className="text-2xl font-black text-slate-900 mb-3">Get Exam Alerts</h3>
            <div className="flex max-w-md mx-auto gap-2">
              <input type="email" placeholder="Enter your email" className="flex-1 px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
              <button className="px-7 py-3.5 bg-slate-900 text-white text-sm font-bold rounded-2xl hover:bg-emerald-600 transition-all">Subscribe</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
