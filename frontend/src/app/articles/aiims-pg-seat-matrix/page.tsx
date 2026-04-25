import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowLeft, Share2, Clock, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AIIMS PG Seat Matrix 2026 — All Campuses | Promote Education',
  description: 'Complete seat intake breakdown for MD, MS, and DM/M.Ch programs across all AIIMS campuses for the 2026 session. Includes JIPMER and PGIMER seat data.',
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
              <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-md">Admission</span>
              <div className="flex items-center gap-2 text-slate-400 text-[11px] font-medium">
                <Calendar size={12} /> April 25, 2026
                <span className="w-1 h-1 rounded-full bg-slate-200" />
                <Clock size={12} /> 7 min read
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-8">AIIMS PG Seat Matrix 2026 — All Campuses</h1>
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
              <p className="text-slate-700 text-[15px] leading-relaxed mb-0">Complete seat intake breakdown for MD, MS, and DM/M.Ch programs across all AIIMS campuses for the 2026 session. Includes JIPMER and PGIMER seat data.</p>
            </div>
            
            <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">AIIMS New Delhi Seats (Key Departments)</h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-100 mb-8"><table className="w-full text-sm"><thead><tr className="bg-slate-900 text-white"><th className="p-4 text-left">Department</th><th className="p-4 text-center">MD/MS Seats</th><th className="p-4 text-center">DM/MCh Seats</th></tr></thead><tbody className="divide-y divide-slate-50">{[['General Medicine','8','—'],['General Surgery','6','—'],['Paediatrics','6','2 (Paeds Card)'],['OBG','5','—'],['Anaesthesiology','10','—'],['Radiology','5','—'],['Cardiology','—','4'],['Neurology','—','3']].map(([d,m,s])=>(<tr key={d} className="hover:bg-slate-50"><td className="p-4 font-bold text-slate-700">{d}</td><td className="p-4 text-center font-black text-emerald-600">{m}</td><td className="p-4 text-center text-slate-500">{s}</td></tr>))}</tbody></table></div>

            <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Other INI Institutes</h2>
            <div className="grid grid-cols-2 gap-4 mb-8">{[['JIPMER Puducherry','~250 PG seats'],['PGIMER Chandigarh','~300 PG seats'],['NIMHANS Bangalore','~150 PG seats'],['SCTIMST Trivandrum','~80 PG seats'],].map(([inst,seats])=>(<div key={inst} className="p-5 rounded-2xl bg-slate-50 border border-slate-100"><div className="font-black text-slate-900 text-sm mb-1">{inst}</div><div className="text-emerald-600 font-bold text-sm">{seats}</div></div>))}</div>

            <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Related Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><Link key="/articles/ini-cet-eligibility-2026" href="/articles/ini-cet-eligibility-2026" className="p-5 rounded-2xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50 transition-all group"><div className="text-sm font-black text-slate-900 group-hover:text-emerald-700">INI CET Eligibility →</div></Link><Link key="/articles/ini-cet-vs-neet-pg" href="/articles/ini-cet-vs-neet-pg" className="p-5 rounded-2xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50 transition-all group"><div className="text-sm font-black text-slate-900 group-hover:text-emerald-700">INI CET vs NEET PG →</div></Link><Link key="/articles/post-pg-medical-career" href="/articles/post-pg-medical-career" className="p-5 rounded-2xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50 transition-all group"><div className="text-sm font-black text-slate-900 group-hover:text-emerald-700">Post-PG Career Guide →</div></Link><Link key="/articles/best-ini-cet-coaching" href="/articles/best-ini-cet-coaching" className="p-5 rounded-2xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50 transition-all group"><div className="text-sm font-black text-slate-900 group-hover:text-emerald-700">Best Coaching →</div></Link></div>

          </article>
          <div className="mt-16 pt-16 border-t border-slate-100 text-center">
            <h3 className="text-2xl font-black text-slate-900 mb-3">Get Exam Alerts</h3>
            <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto">Stay updated with the latest notifications and expert guides.</p>
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
