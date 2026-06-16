import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowLeft, Share2, Clock, Calendar, AlertTriangle, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'BITS Pilani Campus-Wise Cutoff Trends 2021–2025 | Promote Education',
  description: 'BITSAT cutoff scores for Computer Science, Electronics, and Mechanical at BITS Pilani, Goa, and Hyderabad campuses. Historical trends from 2021 to 2025 with 2026 predictions.',
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
              <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-md">Analysis</span>
              <div className="flex items-center gap-2 text-slate-400 text-[11px] font-medium">
                <Calendar size={12} /> April 25, 2026
                <span className="w-1 h-1 rounded-full bg-slate-200" />
                <Clock size={12} /> 10 min read
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-8">
              BITS Pilani<br /><span className="text-slate-400">Cutoff Trends 2021–2025</span>
            </h1>
            <div className="flex items-center justify-between py-6 border-y border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white text-xs font-bold">PE</div>
                <div>
                  <div className="text-sm font-black text-slate-900">Promote Education Editorial</div>
                  <div className="text-[11px] text-slate-400 font-medium">Data-Verified by our Research Team</div>
                </div>
              </div>
              <button className="p-2.5 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all"><Share2 size={18} /></button>
            </div>
          </header>

          <article className="prose prose-slate max-w-none">
            <div className="bg-sky-50 border border-sky-100 rounded-3xl p-8 mb-12">
              <h3 className="text-lg font-black text-slate-900 mb-3 mt-0">Executive Summary</h3>
              <p className="text-slate-700 text-[15px] leading-relaxed mb-0">
                BITS Pilani's Computer Science cutoff has risen consistently — from 315 in 2021 to <strong>331 in 2024</strong>. Goa campus CSE sits around 305–315, while Hyderabad CSE is 295–305. Competition is intensifying each year. This guide breaks down cutoffs branch-wise and campus-wise, with 2026 predictions.
              </p>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">BITS Pilani (Main Campus) Cutoffs</h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-100 mb-12">
              <table className="w-full text-sm">
                <thead><tr className="bg-slate-900 text-white">
                  <th className="p-4 text-left font-black">Branch</th>
                  <th className="p-4 text-center font-black">2022</th>
                  <th className="p-4 text-center font-black">2023</th>
                  <th className="p-4 text-center font-black">2024</th>
                  <th className="p-4 text-center font-black">2026 (Est.)</th>
                </tr></thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    ['Computer Science (B.E.)', '318', '325', '331', '335–340'],
                    ['Electronics & Comm.', '290', '295', '298', '300–308'],
                    ['Electrical & Electronics', '278', '282', '285', '288–295'],
                    ['Chemical Engineering', '238', '242', '244', '245–252'],
                    ['Mechanical Engineering', '240', '243', '246', '248–255'],
                    ['Mathematics & Computing', '310', '316', '321', '325–330'],
                    ['B.Pharm', '185', '190', '195', '198–205'],
                  ].map(([branch, y22, y23, y24, pred]) => (
                    <tr key={branch} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-800">{branch}</td>
                      <td className="p-4 text-center text-slate-500">{y22}</td>
                      <td className="p-4 text-center text-slate-500">{y23}</td>
                      <td className="p-4 text-center font-bold text-slate-700">{y24}</td>
                      <td className="p-4 text-center font-black text-sky-600">{pred}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">BITS Goa & Hyderabad Cutoffs (2024)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                { campus: 'BITS Goa', color: 'sky', rows: [['CSE', '312'], ['EEE', '278'], ['Chemical', '225'], ['Mechanical', '228']] },
                { campus: 'BITS Hyderabad', color: 'violet', rows: [['CSE', '302'], ['ECE', '268'], ['Chemical', '215'], ['Mechanical', '220']] },
              ].map(({ campus, color, rows }) => (
                <div key={campus} className="rounded-2xl border border-slate-100 overflow-hidden">
                  <div className={`p-4 bg-${color}-50 border-b border-${color}-100`}>
                    <h3 className={`text-sm font-black text-${color}-700 mb-0 mt-0`}>{campus}</h3>
                  </div>
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-slate-50">
                      {rows.map(([branch, cutoff]) => (
                        <tr key={branch} className="hover:bg-slate-50">
                          <td className="p-3 text-slate-700 font-medium">{branch}</td>
                          <td className={`p-3 text-right font-black text-${color}-600`}>{cutoff}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>

            <div className="my-12 p-10 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 blur-[100px]" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-3">Why Cutoffs Are Rising</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-0">
                  BITS cutoffs have risen 15–20 points over 4 years due to: (1) increased visibility of BITS placements (₹50L+ packages), (2) stronger coaching preparation, and (3) more students targeting BITS after losing JEE interest. For 2026, target <strong>340+ for Pilani CSE</strong> to be safe.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Related Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'BITSAT 2026 Eligibility', href: '/articles/bitsat-eligibility' },
                { title: 'Bonus Question Strategy', href: '/articles/bitsat-bonus-questions' },
                { title: 'BITSAT vs JEE Main', href: '/articles/bitsat-vs-jee' },
                { title: '30-Day BITSAT Sprint', href: '/articles/bitsat-crash-course' },
              ].map(link => (
                <Link key={link.href} href={link.href} className="p-5 rounded-2xl border border-slate-100 hover:border-sky-300 hover:bg-sky-50 transition-all group">
                  <div className="text-sm font-black text-slate-900 group-hover:text-sky-700">{link.title} →</div>
                </Link>
              ))}
            </div>
          </article>

          <div className="mt-16 pt-16 border-t border-slate-100 text-center">
            <h3 className="text-2xl font-black text-slate-900 mb-3">Get BITSAT Alerts</h3>
            <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto">Receive cutoff updates and expert preparation guides in your inbox.</p>
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
