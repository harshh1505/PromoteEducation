import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowLeft, Share2, Clock, Calendar, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Top Colleges Accepting XAT Complete List for 2026 | Promote Education',
  description: 'The definitive list of top MBA colleges accepting XAT scores in 2026. Includes XLRI, SPJIMR, IMT, XIMB, GIM, and 150+ other B-schools with their cutoff percentiles and key programme details.',
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
              <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-md">Colleges</span>
              <div className="flex items-center gap-2 text-slate-400 text-[11px] font-medium">
                <Calendar size={12} /> April 25, 2026
                <span className="w-1 h-1 rounded-full bg-slate-200" />
                <Clock size={12} /> 8 min read
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-8">
              Top Colleges Accepting XAT<br /><span className="text-slate-400">Complete List for 2026</span>
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
              <p className="text-slate-700 text-[15px] leading-relaxed mb-0">The definitive list of top MBA colleges accepting XAT scores in 2026. Includes XLRI, SPJIMR, IMT, XIMB, GIM, and 150+ other B-schools with their cutoff percentiles and key programme details.</p>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Tier 1: Premier XAT Colleges</h2>
            <div className="space-y-3 mb-8">{[{name:"XLRI Jamshedpur",prog:"HRM & BM",cutoff:"94-96%ile",avg:"₹28-34 LPA"},
{name:"SPJIMR Mumbai",prog:"PGDM",cutoff:"90-93%ile",avg:"₹26 LPA"},
{name:"IMT Ghaziabad",prog:"PGDM",cutoff:"85-88%ile",avg:"₹18 LPA"},
{name:"XIMB Bhubaneswar",prog:"MBA (BM/HRM)",cutoff:"83-86%ile",avg:"₹16 LPA"},
{name:"GIM Goa",prog:"PGDM",cutoff:"80-83%ile",avg:"₹14.5 LPA"},
].map(c=>(<div key={c.name} className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100"><div><div className="font-black text-slate-900 text-sm">{c.name}</div><div className="text-[12px] text-slate-500">{c.prog}</div></div><div className="text-right"><div className="text-[11px] font-black text-amber-600">{c.cutoff}</div><div className="text-[11px] text-slate-400">{c.avg}</div></div></div>))}</div>

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
