import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowLeft, Share2, Clock, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'INI CET High-Yield Topics: What Actually Gets Asked | Promote Education',
  description: 'Data-driven analysis of the most frequently tested topics in INI CET from 2019–2025. Focus on these high-yield chapters to maximize your score efficiently.',
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
              <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-md">Strategy</span>
              <div className="flex items-center gap-2 text-slate-400 text-[11px] font-medium">
                <Calendar size={12} /> April 25, 2026
                <span className="w-1 h-1 rounded-full bg-slate-200" />
                <Clock size={12} /> 9 min read
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-8">INI CET High-Yield Topics: What Actually Gets Asked</h1>
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
              <p className="text-slate-700 text-[15px] leading-relaxed mb-0">Data-driven analysis of the most frequently tested topics in INI CET from 2019–2025. Focus on these high-yield chapters to maximize your score efficiently.</p>
            </div>
            
            <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Top High-Yield Topics</h2>
            <div className="space-y-3 mb-8">{[['Pathology','Tumour markers, Haematological disorders, Immunohistochemistry images'],['Medicine','ECG interpretation, Cardiology recent guidelines, Nephrology'],['Radiology','Chest X-rays, CT Brain, MRI Spine — image-heavy in every paper'],['Pharmacology','Mechanism-based questions, New drug approvals, Drug reactions'],['Microbiology','TORCH infections, Immunology of vaccines, recent COVID data'],['Surgery','Surgical anatomy, Pre-op assessments, GI emergencies'],].map(([sub,tip])=>(<div key={sub} className="p-5 rounded-2xl bg-slate-50 border border-slate-100"><span className="text-[11px] font-black text-emerald-600 uppercase tracking-widest">{sub}</span><p className="text-[14px] text-slate-600 mt-1 mb-0">{tip}</p></div>))}</div>

            <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">The Image Bank Strategy</h2>
            <p className="text-slate-600 leading-relaxed">INI CET consistently tests 40-50 image-based questions. Build a dedicated image bank of: <strong>Radiology</strong> (CXR patterns, CT Brain, MRI findings), <strong>Histopathology slides</strong> (tumour patterns, inflammatory lesions), and <strong>Clinical photographs</strong> (dermatology rashes, ophthalmology fundus). Marrow's 'Image Marathon' series is highly recommended.</p>

            <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Related Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><Link key="/articles/ini-cet-syllabus-2026" href="/articles/ini-cet-syllabus-2026" className="p-5 rounded-2xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50 transition-all group"><div className="text-sm font-black text-slate-900 group-hover:text-emerald-700">Complete INI CET Syllabus →</div></Link><Link key="/articles/ini-cet-exam-pattern" href="/articles/ini-cet-exam-pattern" className="p-5 rounded-2xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50 transition-all group"><div className="text-sm font-black text-slate-900 group-hover:text-emerald-700">Exam Pattern Analysis →</div></Link><Link key="/articles/best-ini-cet-coaching" href="/articles/best-ini-cet-coaching" className="p-5 rounded-2xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50 transition-all group"><div className="text-sm font-black text-slate-900 group-hover:text-emerald-700">Best Coaching Centres →</div></Link><Link key="/articles/aiims-pg-seat-matrix" href="/articles/aiims-pg-seat-matrix" className="p-5 rounded-2xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50 transition-all group"><div className="text-sm font-black text-slate-900 group-hover:text-emerald-700">AIIMS Seat Matrix →</div></Link></div>

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
