import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowLeft, Share2, Clock, Calendar, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'BITSAT 2026 Eligibility — The 75-60 Rule Explained | Promote Education',
  description: 'Complete BITSAT 2026 eligibility guide. Learn the 75% aggregate rule, 60% per-subject rule, year-of-passing restriction, and the direct admission policy for board toppers at BITS Pilani.',
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
              <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-md">Eligibility</span>
              <div className="flex items-center gap-2 text-slate-400 text-[11px] font-medium">
                <Calendar size={12} /> April 25, 2026
                <span className="w-1 h-1 rounded-full bg-slate-200" />
                <Clock size={12} /> 7 min read
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-8">
              BITSAT 2026<br /><span className="text-slate-400">Eligibility Criteria</span>
            </h1>
            <div className="flex items-center justify-between py-6 border-y border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white text-xs font-bold">PE</div>
                <div>
                  <div className="text-sm font-black text-slate-900">Promote Education Editorial</div>
                  <div className="text-[11px] text-slate-400 font-medium">Verified by Academic Experts</div>
                </div>
              </div>
              <button className="p-2.5 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all border border-transparent hover:border-slate-100"><Share2 size={18} /></button>
            </div>
          </header>

          <article className="prose prose-slate max-w-none">
            <div className="bg-sky-50 border border-sky-100 rounded-3xl p-8 mb-12">
              <h3 className="text-lg font-black text-slate-900 mb-3 mt-0">Executive Summary</h3>
              <p className="text-slate-700 text-[15px] leading-relaxed mb-0">
                BITSAT 2026 eligibility is governed by the strict <strong>75-60 Rule</strong> — candidates must score at least <strong>75% aggregate</strong> in PCM and <strong>60% in each individual subject</strong>. Only students who passed boards in 2025 or are appearing in 2026 are eligible. Board toppers get direct admission, bypassing BITSAT entirely.
              </p>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Core Requirements</h2>
            <div className="space-y-4 mb-12">
              {[
                { title: 'The 75% Aggregate Rule', desc: 'Candidates must have secured a minimum of 75% aggregate marks in Physics, Chemistry, and Mathematics (or Biology for B.Pharm) in their 10+2 board examination.' },
                { title: 'The 60% Per-Subject Rule', desc: 'Additionally, a minimum of 60% in each of the three core subjects (Physics, Chemistry, Math/Biology) is required individually — even if your aggregate is above 75%.' },
                { title: 'Year of Passing', desc: 'Only students who passed 12th in 2025 or are appearing in 2026 are eligible. Candidates who passed in 2024 or earlier are NOT eligible for BITSAT 2026.' },
                { title: 'Required Subjects', desc: 'For B.E./B.Tech programmes: Physics, Chemistry, and Mathematics. For B.Pharm: Physics, Chemistry, and Biology (or Mathematics).' },
                { title: 'Direct Admission for Toppers', desc: 'First-rank holders (toppers) of any recognized Central or State board are offered direct admission to the programme of their choice at any BITS campus, regardless of their BITSAT score.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-6 rounded-2xl border border-slate-100 hover:border-sky-200 transition-all bg-white">
                  <CheckCircle2 size={20} className="text-sky-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-black text-slate-900 mb-1">{item.title}</div>
                    <p className="text-[14px] text-slate-500 leading-relaxed mb-0">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">The 75-60 Rule in Detail</h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-100 mb-12">
              <table className="w-full text-sm">
                <thead><tr className="bg-slate-900 text-white">
                  <th className="p-4 text-left font-black">Requirement</th>
                  <th className="p-4 text-center font-black">Threshold</th>
                  <th className="p-4 text-center font-black">Applies To</th>
                </tr></thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    ['Aggregate in PCM/PCB', '≥ 75%', 'All candidates'],
                    ['Physics (individual)', '≥ 60%', 'All candidates'],
                    ['Chemistry (individual)', '≥ 60%', 'All candidates'],
                    ['Maths or Biology (individual)', '≥ 60%', 'All candidates'],
                    ['Age Limit', 'No age bar', 'All candidates'],
                    ['Attempts Allowed', 'No restriction', 'All candidates'],
                  ].map(([req, val, scope]) => (
                    <tr key={req} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-800">{req}</td>
                      <td className="p-4 text-center font-black text-sky-600">{val}</td>
                      <td className="p-4 text-center text-slate-500">{scope}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="my-12 p-10 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 blur-[100px]" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-3">Important: Board Topper Admission</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-0">
                  If you are the <strong>first rank holder</strong> of your state or central board in Class 12 (Science stream), BITS Pilani offers you <strong>direct admission</strong> to any programme and campus of your choice — without appearing for BITSAT. This applies to all recognized boards including CBSE, ISC, and all State Boards. Learn more in our dedicated guide on{' '}
                  <Link href="/articles/bits-direct-admission" className="text-sky-400 hover:underline">direct admission for board toppers</Link>.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Related Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'BITS Pilani Campus-Wise Cutoffs', href: '/articles/bits-pilani-cutoff' },
                { title: 'Bonus Question Strategy', href: '/articles/bitsat-bonus-questions' },
                { title: 'BITSAT vs JEE Main', href: '/articles/bitsat-vs-jee' },
                { title: 'Direct Admission for Toppers', href: '/articles/bits-direct-admission' },
              ].map(link => (
                <Link key={link.href} href={link.href} className="p-5 rounded-2xl border border-slate-100 hover:border-sky-300 hover:bg-sky-50 transition-all group">
                  <div className="text-sm font-black text-slate-900 group-hover:text-sky-700">{link.title} →</div>
                </Link>
              ))}
            </div>
          </article>

          <div className="mt-16 pt-16 border-t border-slate-100 text-center">
            <h3 className="text-2xl font-black text-slate-900 mb-3">Get BITSAT Alerts</h3>
            <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto">Stay updated with BITSAT notifications and expert preparation guides.</p>
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
