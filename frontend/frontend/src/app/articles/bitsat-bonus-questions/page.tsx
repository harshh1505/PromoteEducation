import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowLeft, Share2, Clock, Calendar, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'The Bonus Question Strategy How to Score 390+ | Promote Education',
  description: 'BITSAT\'s bonus questions are the ultimate secret weapon. If you complete all 130 questions, you unlock 12 additional questions that can push your score past 390. Learn exactly when to attempt them and when not to.',
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
                <Clock size={12} /> 8 min read
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-8">
              The Bonus Question Strategy<br /><span className="text-slate-400">How to Score 390+</span>
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
              <p className="text-slate-700 text-[15px] leading-relaxed mb-0">BITSAT's bonus questions are the ultimate secret weapon. If you complete all 130 questions, you unlock 12 additional questions that can push your score past 390. Learn exactly when to attempt them and when not to.</p>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">How the Bonus Section Works</h2>
            <div className="space-y-4 mb-8">
{[
  {t:'Step 1: Complete All 130 Questions', d:'You must answer ALL 130 questions in the standard paper without skipping any. If you skip even one, the bonus section will not be offered.'},
  {t:'Step 2: Opt In — With No Going Back', d:'Once you click Proceed to Bonus Questions, you CANNOT return to edit your previous 130 answers. This is the point of no return.'},
  {t:'Step 3: 12 Additional Questions', d:'You get 4 extra questions each from Physics, Chemistry, and Mathematics/Biology. These questions are typically harder than the main paper.'},
].map((item,i) => (
  <div key={i} className="flex items-start gap-4 p-6 rounded-2xl border border-slate-100 bg-white">
    <CheckCircle2 size={20} className="text-sky-500 shrink-0 mt-0.5" />
    <div>
      <div className="text-sm font-black text-slate-900 mb-1">{item.t}</div>
      <p className="text-[14px] text-slate-500 mb-0">{item.d}</p>
    </div>
  </div>
))}
</div>
            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">When Should You Attempt Bonus?</h2>
            <p className="text-slate-600 leading-relaxed mb-6">Attempt bonus questions <strong>only if:</strong> (1) you have finished all 130 with at least 20 minutes remaining, (2) you are confident about 90%+ of your answers, and (3) you are targeting 340+ for top branches. If your accuracy is below 85%, the risk of -1 marks on bonus questions may reduce your net score.</p>
            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Related Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
{[{title:'BITSAT Eligibility', href:'/articles/bitsat-eligibility'},{title:'BITSAT vs JEE Main',href:'/articles/bitsat-vs-jee'},{title:'English & LR Guide',href:'/articles/bitsat-english-lr'},{title:'30-Day Sprint Plan',href:'/articles/bitsat-crash-course'}].map(l=>(
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
