import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowLeft, Share2, Clock, Calendar, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'XAT vs CAT Which MBA Exam Should You Take? | Promote Education',
  description: 'A definitive comparison of XAT and CAT 2026 — difficulty level, section-wise differences, college coverage, and expert advice on which exam to prioritize based on your target B-schools.',
}

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/exams/xat" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-900 transition-all mb-10 uppercase tracking-widest">
            <ArrowLeft size={14} /> Back to XAT
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
              XAT vs CAT<br /><span className="text-slate-400">Which MBA Exam Should You Take?</span>
            </h1>
            <div className="flex items-center justify-between py-6 border-y border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold">PE</div>
                <div>
                  <div className="text-sm font-black text-slate-900">Promote Education Editorial</div>
                  <div className="text-[11px] text-slate-400 font-medium">Verified by Academic Experts</div>
                </div>
              </div>
              <button className="p-2.5 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all"><Share2 size={18} /></button>
            </div>
          </header>
          <article className="prose prose-slate max-w-none">
            <div className="bg-amber-50 border border-amber-100 rounded-3xl p-8 mb-12">
              <h3 className="text-lg font-black text-slate-900 mb-3 mt-0">Executive Summary</h3>
              <p className="text-slate-700 text-[15px] leading-relaxed mb-0">A definitive comparison of XAT and CAT 2026 — difficulty level, section-wise differences, college coverage, and expert advice on which exam to prioritize based on your target B-schools.</p>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Head-to-Head Comparison</h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-100 mb-8"><table className="w-full text-sm"><thead><tr className="bg-slate-900 text-white"><th className="p-4 text-left font-black">Parameter</th><th className="p-4 text-center font-black">XAT</th><th className="p-4 text-center font-black">CAT</th></tr></thead><tbody className="divide-y divide-slate-50">{[["Exam Date","Jan (first Sunday)","Nov (last Sunday)"],["Duration","3 hrs 10 min","2 hrs"],["Unique Section","Decision Making","None"],["Essay Writing","Yes (for some)","No"],["Colleges","160+ (incl. XLRI)","1200+ IIMs & others"],["Difficulty","Tougher in Quant & VARC","Moderate-Tough"],["Negative Marking","-0.25","-1/3"],].map(([p,x,c])=>(<tr key={p} className="hover:bg-slate-50"><td className="p-4 font-bold text-slate-700">{p}</td><td className="p-4 text-center text-amber-600 font-bold">{x}</td><td className="p-4 text-center text-slate-500">{c}</td></tr>))}</tbody></table></div>

            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Should You Take Both?</h2>
            <p className="text-slate-600 leading-relaxed mb-4">Yes — almost all serious MBA aspirants appear for both CAT and XAT. CAT is held in November and XAT in January, so there is no conflict. Many candidates use their CAT preparation as the foundation and spend December-January focusing on XAT-specific sections (Decision Making and Essay Writing).</p>

            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Related Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
{[{title:'XAT Eligibility',href:'/articles/xat-eligibility'},{title:'Decision Making Guide',href:'/articles/xat-decision-making-guide'},{title:'XLRI Selection Process',href:'/articles/xat-selection-process'},{title:'XAT vs CAT',href:'/articles/xat-vs-cat-comparison'}].map(l=>(
<Link key={l.href} href={l.href} className="p-5 rounded-2xl border border-slate-100 hover:border-amber-300 hover:bg-amber-50 transition-all group"><div className="text-sm font-black text-slate-900 group-hover:text-amber-700">{l.title} →</div></Link>))}
</div>

          </article>
          <div className="mt-16 pt-16 border-t border-slate-100 text-center">
            <h3 className="text-2xl font-black text-slate-900 mb-3">Get Exam Alerts</h3>
            <div className="flex max-w-md mx-auto gap-2">
              <input type="email" placeholder="Enter your email" className="flex-1 px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all" />
              <button className="px-7 py-3.5 bg-slate-900 text-white text-sm font-bold rounded-2xl hover:bg-amber-600 transition-all">Subscribe</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
