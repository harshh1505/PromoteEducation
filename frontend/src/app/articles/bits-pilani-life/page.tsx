import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowLeft, Share2, Clock, Calendar, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Life at BITS Pilani Campus, Culture & Placements | Promote Education',
  description: 'An insider look at campus life at BITS Pilani — from world-class infrastructure and BITS Apogee festival to placement statistics and practice school (internship) programmes.',
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
              <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-md">Campus Life</span>
              <div className="flex items-center gap-2 text-slate-400 text-[11px] font-medium">
                <Calendar size={12} /> April 25, 2026
                <span className="w-1 h-1 rounded-full bg-slate-200" />
                <Clock size={12} /> 8 min read
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-8">
              Life at BITS Pilani<br /><span className="text-slate-400">Campus, Culture & Placements</span>
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
              <p className="text-slate-700 text-[15px] leading-relaxed mb-0">An insider look at campus life at BITS Pilani — from world-class infrastructure and BITS Apogee festival to placement statistics and practice school (internship) programmes.</p>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Campus Infrastructure</h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
{[['Area','4000+ acres (Pilani)'],['Hostels','Fully residential campus'],['Labs','300+ research labs'],['Library','2L+ volume collection'],['Sports','25+ sports facilities'],['Startups','BITS TBI incubator'],].map(([l,v])=>(<div key={l} className="p-5 rounded-2xl bg-slate-50 border border-slate-100"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{l}</p><p className="text-sm font-black text-slate-900 mb-0">{v}</p></div>))}
</div>
            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Placements 2024–25</h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-100 mb-8"><table className="w-full text-sm"><thead><tr className="bg-slate-900 text-white"><th className="p-4 text-left font-black">Metric</th><th className="p-4 text-center font-black">Pilani</th><th className="p-4 text-center font-black">Goa</th></tr></thead><tbody className="divide-y divide-slate-50">
{[['Highest Package','₹2.05 Cr (Int'l)','₹1.8 Cr (Int'l)'],['Average Package','₹21.4 LPA','₹19.8 LPA'],['Placement %','98%+','96%+'],['Top Recruiters','Google, Microsoft, Goldman Sachs','Qualcomm, Samsung, Cisco'],].map(([m,p,g])=>(<tr key={m} className="hover:bg-slate-50"><td className="p-4 font-bold text-slate-700">{m}</td><td className="p-4 text-center text-sky-600 font-bold">{p}</td><td className="p-4 text-center text-slate-500">{g}</td></tr>))}
</tbody></table></div>
            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Related Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
{[{title:'BITS Pilani Cutoffs',href:'/articles/bits-pilani-cutoff'},{title:'BITSAT Eligibility',href:'/articles/bitsat-eligibility'},{title:'BITSAT vs JEE Main',href:'/articles/bitsat-vs-jee'},{title:'Direct Admission',href:'/articles/bits-direct-admission'}].map(l=>(
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
