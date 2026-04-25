import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowLeft, Share2, Clock, Calendar, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: '30-Day BITSAT Sprint The Final Month Strategy | Promote Education',
  description: 'A phase-by-phase 30-day preparation plan for BITSAT 2026. Week-wise breakdown of high-weightage chapters, mock test schedule, and the final 48-hour revision plan used by BITS toppers.',
}

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/exams/bitsat" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-900 transition-all mb-10 uppercase tracking-widest">
            <ArrowLeft size={14} /> Back to BITSAT
          </Link>
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-md">Strategy</span>
              <div className="flex items-center gap-2 text-slate-400 text-[11px] font-medium">
                <Calendar size={12} /> April 25, 2026
                <span className="w-1 h-1 rounded-full bg-slate-200" />
                <Clock size={12} /> 12 min read
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-8">
              30-Day BITSAT Sprint<br /><span className="text-slate-400">The Final Month Strategy</span>
            </h1>
            <div className="flex items-center justify-between py-6 border-y border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white text-xs font-bold">PE</div>
                <div>
                  <div className="text-sm font-black text-slate-900">Promote Education Editorial</div>
                  <div className="text-[11px] text-slate-400 font-medium">Verified by Academic Experts</div>
                </div>
              </div>
              <button className="p-2.5 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all"><Share2 size={18} /></button>
            </div>
          </header>
          <article className="prose prose-slate max-w-none">
            <div className="bg-sky-50 border border-sky-100 rounded-3xl p-8 mb-12">
              <h3 className="text-lg font-black text-slate-900 mb-3 mt-0">Executive Summary</h3>
              <p className="text-slate-700 text-[15px] leading-relaxed mb-0">A phase-by-phase 30-day preparation plan for BITSAT 2026. Week-wise breakdown of high-weightage chapters, mock test schedule, and the final 48-hour revision plan used by BITS toppers.</p>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Week 1: High-Yield Topic Blitz</h2>
            <div className="space-y-3 mb-8">
{[['Physics Priority','Electrostatics, Modern Physics, Current Electricity, Kinematics — appear in every paper'],['Chemistry Priority','Organic Chemistry (GOC, Named Reactions), Chemical Bonding, Electrochemistry'],['Maths Priority','Coordinate Geometry, Calculus (Definite Integrals), Probability, Complex Numbers'],['English & LR','Practice 30 LR questions and 10 English questions daily — do not skip this'],].map(([t,d])=>(<div key={t} className="p-5 rounded-2xl bg-slate-50 border border-slate-100"><div className="text-sm font-black text-slate-900 mb-1">{t}</div><p className="text-[13px] text-slate-500 mb-0">{d}</p></div>))}
</div>
            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Week 2–3: Mock Test Marathon</h2>
            <p className="text-slate-600 leading-relaxed mb-4">Take <strong>one full-length mock test daily</strong> at the exact time slot of your actual BITSAT exam. Immediately after each test, spend 2 hours reviewing every wrong and skipped question. Track your accuracy and speed separately.</p>
<p className="text-slate-600 leading-relaxed">Target: 110+ correct answers with 90%+ accuracy before Week 4 begins.</p>
            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Week 4: Consolidation & Final Push</h2>
            <p className="text-slate-600 leading-relaxed mb-4">Stop learning new topics. Focus exclusively on: (1) formula sheet revision, (2) high-error-rate topics from your mock test analysis, and (3) 2 full-length mocks per day. Sleep 7+ hours — reaction time and accuracy drop sharply with fatigue.</p>
            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Related Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
{[{title:'Bonus Question Strategy',href:'/articles/bitsat-bonus-questions'},{title:'English & LR Guide',href:'/articles/bitsat-english-lr'},{title:'BITS Pilani Cutoffs',href:'/articles/bits-pilani-cutoff'},{title:'BITSAT Eligibility',href:'/articles/bitsat-eligibility'}].map(l=>(
  <Link key={l.href} href={l.href} className="p-5 rounded-2xl border border-slate-100 hover:border-sky-300 hover:bg-sky-50 transition-all group">
    <div className="text-sm font-black text-slate-900 group-hover:text-sky-700">{l.title} →</div>
  </Link>
))}
</div>
          </article>
          <div className="mt-16 pt-16 border-t border-slate-100 text-center">
            <h3 className="text-2xl font-black text-slate-900 mb-3">Get Exam Alerts</h3>
            <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto">Stay updated with the latest notifications and expert preparation guides.</p>
            <div className="flex max-w-md mx-auto gap-2">
              <input type="email" placeholder="Enter your email" className="flex-1 px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all" />
              <button className="px-7 py-3.5 bg-slate-900 text-white text-sm font-bold rounded-2xl hover:bg-sky-600 transition-all">Subscribe</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
