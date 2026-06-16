import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowLeft, Share2, Clock, Calendar, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Direct Admission at BITS The Board Topper Policy Explained | Promote Education',
  description: 'BITS Pilani offers guaranteed direct admission to first-rank holders of any recognized Central or State board in India, regardless of their BITSAT score. Learn who qualifies, how to apply, and which programme you can choose.',
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
              <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-md">Admission</span>
              <div className="flex items-center gap-2 text-slate-400 text-[11px] font-medium">
                <Calendar size={12} /> April 25, 2026
                <span className="w-1 h-1 rounded-full bg-slate-200" />
                <Clock size={12} /> 5 min read
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-8">
              Direct Admission at BITS<br /><span className="text-slate-400">The Board Topper Policy Explained</span>
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
              <p className="text-slate-700 text-[15px] leading-relaxed mb-0">BITS Pilani offers guaranteed direct admission to first-rank holders of any recognized Central or State board in India, regardless of their BITSAT score. Learn who qualifies, how to apply, and which programme you can choose.</p>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Who Qualifies?</h2>
            <div className="space-y-4 mb-8">
{[{t:'First Rank in 10+2 Board',d:'You must be the single overall first-rank holder in the Science stream of your board. Co-rank holders (two students with the same marks) are also eligible.'},
{t:'Recognized Boards Only',d:'CBSE, ISC, and all State Boards recognized by COBSE (Council of Boards of School Education) qualify. Home-schooled candidates are not eligible.'},
{t:'Any Programme Choice',d:'Qualifying toppers may choose any B.E., B.Tech, B.Pharm, or MSc programme at any BITS campus (Pilani, Goa, or Hyderabad) based on availability.'},
].map((item,i)=>(<div key={i} className="flex items-start gap-4 p-6 rounded-2xl border border-slate-100 bg-white"><CheckCircle2 size={20} className="text-sky-500 shrink-0 mt-0.5" /><div><div className="text-sm font-black text-slate-900 mb-1">{item.t}</div><p className="text-[14px] text-slate-500 mb-0">{item.d}</p></div></div>))}
</div>
            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">How to Apply</h2>
            <p className="text-slate-600 leading-relaxed mb-4">Board toppers must register on the BITS Admissions portal and upload their board result and rank certificate issued by the board authority. BITS verifies the claim directly with the board. The process typically happens in June–July after results are declared.</p>
            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Related Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
{[{title:'BITSAT Eligibility',href:'/articles/bitsat-eligibility'},{title:'BITS Pilani Cutoffs',href:'/articles/bits-pilani-cutoff'},{title:'Campus Life at BITS',href:'/articles/bits-pilani-life'},{title:'BITSAT vs JEE Main',href:'/articles/bitsat-vs-jee'}].map(l=>(
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
