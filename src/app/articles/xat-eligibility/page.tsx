import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowLeft, Share2, Clock, Calendar, CheckCircle2, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'XAT 2026 Eligibility & Registration Guide | Promote Education',
  description: 'Complete XAT 2026 eligibility guide. No minimum percentage, open to all graduates and final-year students. Learn registration steps, fees, and important deadlines for XLRI Jamshedpur admission.',
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
              <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-md">Eligibility</span>
              <div className="flex items-center gap-2 text-slate-400 text-[11px] font-medium">
                <Calendar size={12} /> April 25, 2026
                <span className="w-1 h-1 rounded-full bg-slate-200" />
                <Clock size={12} /> 6 min read
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-8">
              XAT 2026<br /><span className="text-slate-400">Eligibility & Registration</span>
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
              <p className="text-slate-700 text-[15px] leading-relaxed mb-0">
                XAT 2026 has one of the <strong>most inclusive eligibility criteria</strong> among MBA entrance exams — any graduate from any discipline can apply, with no minimum percentage requirement. Final-year students can also register. The exam is conducted on the <strong>first Sunday of January</strong> every year.
              </p>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Eligibility Requirements</h2>
            <div className="space-y-4 mb-12">
              {[
                { title: "Bachelor's Degree (Any Stream)", desc: "A bachelor's degree in any discipline (Arts, Science, Commerce, Engineering, Medicine, Law) from a recognized university is required. There is no restriction on the stream." },
                { title: 'No Minimum Percentage', desc: 'XAT does not specify any minimum percentage in graduation. This makes it accessible to all graduates, unlike some other MBA exams that require 50% or 60%.' },
                { title: 'Final Year Students', desc: 'Students in their final year of graduation are eligible to register for XAT. However, if shortlisted, they must complete their degree before joining the MBA programme.' },
                { title: 'No Age Limit', desc: 'There is no upper or lower age limit to appear for XAT. Working professionals of any age can register.' },
                { title: 'Foreign Nationals', desc: 'Foreign nationals with an equivalent bachelor\'s degree from a recognized international institution may apply. XLRI also considers GMAT scores for international applicants.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-6 rounded-2xl border border-slate-100 hover:border-amber-200 transition-all bg-white">
                  <CheckCircle2 size={20} className="text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-black text-slate-900 mb-1">{item.title}</div>
                    <p className="text-[14px] text-slate-500 leading-relaxed mb-0">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Important Dates 2026</h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-100 mb-12">
              <table className="w-full text-sm">
                <thead><tr className="bg-slate-900 text-white">
                  <th className="p-4 text-left font-black">Event</th>
                  <th className="p-4 text-center font-black">Date</th>
                  <th className="p-4 text-center font-black">Status</th>
                </tr></thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    ['Registration Opens', 'July 2025', 'Closed'],
                    ['Last Date to Register', 'November 30, 2025', 'Closed'],
                    ['Admit Card Download', 'December 20, 2025', 'Available'],
                    ['XAT 2026 Exam Date', 'January 4, 2026', 'Completed'],
                    ['Result Declaration', 'January 31, 2026', 'Declared'],
                    ['XLRI Shortlist Release', 'February 2026', 'Upcoming'],
                  ].map(([event, date, status]) => (
                    <tr key={event} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-800">{event}</td>
                      <td className="p-4 text-center text-slate-600">{date}</td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${status === 'Upcoming' ? 'bg-sky-100 text-sky-700' : status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="my-12 p-10 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px]" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-3">XAT vs CAT Eligibility</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-0">
                  Both XAT and <Link href="/exams/cat" className="text-amber-400 hover:underline">CAT</Link> have similar eligibility — any graduate can apply with no minimum percentage. The key difference: XAT is conducted once a year (January) while CAT is in November. Most serious MBA aspirants appear for both. XAT scores are accepted by 160+ B-schools including XLRI, SPJIMR, and IMT.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Related Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Decision Making Strategy', href: '/articles/xat-decision-making-guide' },
                { title: 'XAT Exam Pattern', href: '/articles/xat-exam-pattern' },
                { title: 'XLRI Selection Process', href: '/articles/xat-selection-process' },
                { title: 'XAT vs CAT Comparison', href: '/articles/xat-vs-cat-comparison' },
              ].map(link => (
                <Link key={link.href} href={link.href} className="p-5 rounded-2xl border border-slate-100 hover:border-amber-300 hover:bg-amber-50 transition-all group">
                  <div className="text-sm font-black text-slate-900 group-hover:text-amber-700">{link.title} →</div>
                </Link>
              ))}
            </div>
          </article>

          <div className="mt-16 pt-16 border-t border-slate-100 text-center">
            <h3 className="text-2xl font-black text-slate-900 mb-3">Get XAT Alerts</h3>
            <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto">Stay updated with XAT 2026 notifications and XLRI shortlist updates.</p>
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
