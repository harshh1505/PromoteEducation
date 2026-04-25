import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowLeft, Share2, Clock, Calendar, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'INI CET 2026 Eligibility Criteria — Complete Breakdown | Promote Education',
  description: 'Complete INI CET 2026 eligibility guide. Learn the MBBS qualification rule, 55%/50% aggregate requirement, internship cutoff date, and registration with NMC for AIIMS PG admissions.',
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
              <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-md">Eligibility</span>
              <div className="flex items-center gap-2 text-slate-400 text-[11px] font-medium">
                <Calendar size={12} /> April 25, 2026
                <span className="w-1 h-1 rounded-full bg-slate-200" />
                <Clock size={12} /> 7 min read
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-8">
              INI CET 2026<br /><span className="text-slate-400">Eligibility Criteria</span>
            </h1>
            <div className="flex items-center justify-between py-6 border-y border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">PE</div>
                <div>
                  <div className="text-sm font-black text-slate-900">Promote Education Editorial</div>
                  <div className="text-[11px] text-slate-400 font-medium">Verified by Medical Experts</div>
                </div>
              </div>
              <button className="p-2.5 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all border border-transparent hover:border-slate-100"><Share2 size={18} /></button>
            </div>
          </header>

          <article className="prose prose-slate max-w-none">
            <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 mb-12">
              <h3 className="text-lg font-black text-slate-900 mb-3 mt-0">Executive Summary</h3>
              <p className="text-slate-700 text-[15px] leading-relaxed mb-0">
                INI CET 2026 eligibility requires an MBBS degree with a minimum aggregate of <strong>55% (General/OBC/EWS)</strong> or <strong>50% (SC/ST)</strong>, plus completion of a 12-month rotating internship before the cutoff date. This guide explains every requirement in detail.
              </p>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Core Requirements</h2>
            <div className="space-y-4 mb-12">
              {[
                { title: 'MBBS Degree', desc: 'A valid MBBS degree (or MDS for Dental courses) from an institution recognized by the National Medical Commission (NMC) or Dental Council of India (DCI).' },
                { title: 'Minimum Aggregate Marks', desc: 'General/OBC/EWS candidates need 55% aggregate in MBBS. SC/ST candidates require 50%. This is calculated across all professional examinations.' },
                { title: 'Internship Completion', desc: 'The mandatory 12-month rotating internship must be completed before the exam cutoff date (typically March 31 for the July session).' },
                { title: 'Medical Council Registration', desc: 'Valid permanent or provisional registration with NMC or any recognized State Medical Council is mandatory.' },
                { title: 'Foreign Nationals', desc: 'Foreign nationals must provide proof of registration with their home country medical council and a valid Indian student visa.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-6 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all bg-white">
                  <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-black text-slate-900 mb-1">{item.title}</div>
                    <p className="text-[14px] text-slate-500 leading-relaxed mb-0">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Percentage Rule Explained</h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-100 mb-12">
              <table className="w-full text-sm">
                <thead><tr className="bg-slate-900 text-white">
                  <th className="p-4 text-left font-black">Category</th>
                  <th className="p-4 text-center font-black">Min. Aggregate</th>
                  <th className="p-4 text-center font-black">Relaxation Available</th>
                </tr></thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    ['General', '55%', 'None'],
                    ['OBC (Non-Creamy Layer)', '55%', 'None'],
                    ['EWS', '55%', 'None'],
                    ['SC', '50%', '5% relaxation'],
                    ['ST', '50%', '5% relaxation'],
                    ['PwBD (Benchmark Disability)', '45%', 'Case-by-case'],
                  ].map(([cat, pct, rel]) => (
                    <tr key={cat} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-800">{cat}</td>
                      <td className="p-4 text-center font-black text-emerald-600">{pct}</td>
                      <td className="p-4 text-center text-slate-500">{rel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="my-12 p-10 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px]" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-3">Important Note on Internship Cutoff</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-0">
                  The internship completion cutoff differs by session. For the <strong>July 2026 session</strong>, the cutoff is typically <strong>March 31, 2026</strong>. Candidates who complete their internship after this date must wait for the next session. Always check the official AIIMS notification for exact dates.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Related Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'INI CET Complete Syllabus', href: '/articles/ini-cet-syllabus-2026' },
                { title: 'INI CET vs NEET PG', href: '/articles/ini-cet-vs-neet-pg' },
                { title: 'AIIMS PG Seat Matrix 2026', href: '/articles/aiims-pg-seat-matrix' },
                { title: 'Best Coaching for INI CET', href: '/articles/best-ini-cet-coaching' },
              ].map(link => (
                <Link key={link.href} href={link.href} className="p-5 rounded-2xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50 transition-all group">
                  <div className="text-sm font-black text-slate-900 group-hover:text-emerald-700">{link.title} →</div>
                </Link>
              ))}
            </div>
          </article>

          <div className="mt-16 pt-16 border-t border-slate-100 text-center">
            <h3 className="text-2xl font-black text-slate-900 mb-3">Get INI CET Alerts</h3>
            <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto">Stay updated with the latest INI CET notifications and preparation guides.</p>
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
