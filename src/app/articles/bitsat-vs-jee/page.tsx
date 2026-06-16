import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowLeft, Share2, Clock, Calendar, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'BITSAT vs JEE Main Key Differences in 2026 | Promote Education',
  description: 'A head-to-head comparison of BITSAT and JEE Main — exam pattern, difficulty level, syllabus differences, college quality, and which one to prioritize based on your target institutions.',
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
              <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-md">Comparison</span>
              <div className="flex items-center gap-2 text-slate-400 text-[11px] font-medium">
                <Calendar size={12} /> April 25, 2026
                <span className="w-1 h-1 rounded-full bg-slate-200" />
                <Clock size={12} /> 10 min read
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-8">
              BITSAT vs JEE Main<br /><span className="text-slate-400">Key Differences in 2026</span>
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
              <p className="text-slate-700 text-[15px] leading-relaxed mb-0">A head-to-head comparison of BITSAT and JEE Main — exam pattern, difficulty level, syllabus differences, college quality, and which one to prioritize based on your target institutions.</p>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Quick Comparison</h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-100 mb-8"><table className="w-full text-sm"><thead><tr className="bg-slate-900 text-white"><th className="p-4 text-left font-black">Parameter</th><th className="p-4 text-center font-black">BITSAT</th><th className="p-4 text-center font-black">JEE Main</th></tr></thead><tbody className="divide-y divide-slate-50">
{[['Conducting Body','BITS Pilani','NTA'],['Questions','130 (+12 bonus)','90'],['Duration','180 min','180 min'],['Type','Speed-based','Concept-based'],['Negative Marking','-1','-1'],['Attempts/Year','2','2'],['Colleges','BITS only','NITs, IIITs, GFTIs'],['Top Branch Cutoff','331+ (Pilani CSE)','99.5%ile+ (IIT-grade)'],].map(([p,b,j])=>(<tr key={p} className="hover:bg-slate-50"><td className="p-4 font-bold text-slate-700">{p}</td><td className="p-4 text-center font-black text-sky-600">{b}</td><td className="p-4 text-center text-slate-500">{j}</td></tr>))}
</tbody></table></div>
            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Which Should You Focus On?</h2>
            <p className="text-slate-600 leading-relaxed mb-4">If your goal is <strong>BITS Pilani</strong>, BITSAT must be your primary focus — the syllabi overlap significantly (both are PCM Class 11 & 12 level) but BITSAT rewards speed while JEE Main rewards depth. The English & LR section in BITSAT has no JEE equivalent — dedicate 2 hours per week to it specifically.</p>
<p className="text-slate-600 leading-relaxed">Most serious engineering aspirants appear for <strong>both</strong>. A JEE Main score secures NIT/IIIT seats as a backup while BITSAT targets BITS campuses.</p>
            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Related Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
{[{title:'BITSAT Eligibility',href:'/articles/bitsat-eligibility'},{title:'BITS Pilani Cutoffs',href:'/articles/bits-pilani-cutoff'},{title:'Bonus Question Strategy',href:'/articles/bitsat-bonus-questions'},{title:'30-Day Sprint',href:'/articles/bitsat-crash-course'}].map(l=>(
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
