import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowLeft, Share2, Clock, Calendar, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'XAT Decision Making: The Ultimate Strategy Guide | Promote Education',
  description: 'Master the XAT Decision Making section — the most unique and feared section in any MBA entrance exam. Learn ethical dilemma frameworks, common question types, and expert solving strategies.',
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
              <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-md">Strategy</span>
              <div className="flex items-center gap-2 text-slate-400 text-[11px] font-medium">
                <Calendar size={12} /> April 25, 2026
                <span className="w-1 h-1 rounded-full bg-slate-200" />
                <Clock size={12} /> 12 min read
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-8">
              XAT Decision Making<br /><span className="text-slate-400">The Ultimate Strategy Guide</span>
            </h1>
            <div className="flex items-center justify-between py-6 border-y border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold">PE</div>
                <div>
                  <div className="text-sm font-black text-slate-900">Promote Education Editorial</div>
                  <div className="text-[11px] text-slate-400 font-medium">Strategy by XLRI Alumni</div>
                </div>
              </div>
              <button className="p-2.5 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all"><Share2 size={18} /></button>
            </div>
          </header>

          <article className="prose prose-slate max-w-none">
            <div className="bg-amber-50 border border-amber-100 rounded-3xl p-8 mb-12">
              <h3 className="text-lg font-black text-slate-900 mb-3 mt-0">Executive Summary</h3>
              <p className="text-slate-700 text-[15px] leading-relaxed mb-0">
                The Decision Making (DM) section is the <strong>most unique differentiator in XAT</strong>. It cannot be cracked by formula or memorization — it demands ethical reasoning, managerial judgment, and logical analysis. Most XLRI toppers say DM is where ranks are decided. This guide teaches you the frameworks that actually work.
              </p>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Types of Decision Making Questions</h2>
            <div className="space-y-4 mb-12">
              {[
                { title: 'Ethical Dilemmas', desc: 'Scenario where you must choose the "most ethical" or "least unethical" action. XLRI tests whether you can balance personal ethics with organizational constraints. The answer is rarely the most extreme option.' },
                { title: 'Managerial Decision Cases', desc: 'A business scenario (e.g., a manager must fire someone or cut costs) with 5–6 options. You must choose the most pragmatic, professionally sound decision — not the most "kind" one.' },
                { title: 'Financial/Analytical Decisions', desc: 'Data-heavy questions requiring you to analyze a financial situation or business data and decide the best course of action. Requires basic arithmetic and logical reasoning.' },
                { title: 'Group/Team Scenarios', desc: 'Situations involving conflict within teams or organizations. You must decide how the leader should respond — balancing fairness, efficiency, and morale.' },
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

            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">The XLRI DM Framework</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {[
                { step: '01', title: 'Identify the Stakeholders', desc: 'Who is affected? The individual, the organization, customers, society? Map all parties before choosing.' },
                { step: '02', title: 'Eliminate Extremes', desc: 'Options that are too harsh (fire everyone) or too lenient (ignore the problem) are almost never correct. The answer is usually balanced.' },
                { step: '03', title: 'Choose Process over Outcome', desc: 'XLRI values ethical process. Choose the option that follows due process, even if the outcome is uncertain.' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-3xl font-black text-slate-200 mb-3">{step}</div>
                  <div className="text-sm font-black text-slate-900 mb-2">{title}</div>
                  <p className="text-[13px] text-slate-500 leading-relaxed mb-0">{desc}</p>
                </div>
              ))}
            </div>

            <div className="my-12 p-10 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px]" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-3">How to Practice DM</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-0">
                  Solve all XAT papers from 2011 to 2025 — DM has been consistent in format. After each question, analyze <em>why</em> your answer was wrong, not just what the correct answer is. Read the Harvard Business Review and Economic Times editorials to build managerial intuition. XAT DM cannot be cracked by a formula; it is built over months of reading and reflection.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Related Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'XAT 2026 Eligibility', href: '/articles/xat-eligibility' },
                { title: 'XAT Exam Pattern', href: '/articles/xat-exam-pattern' },
                { title: 'XLRI Selection Process', href: '/articles/xat-selection-process' },
                { title: 'How to Write XAT Essay', href: '/articles/xat-essay-writing' },
              ].map(link => (
                <Link key={link.href} href={link.href} className="p-5 rounded-2xl border border-slate-100 hover:border-amber-300 hover:bg-amber-50 transition-all group">
                  <div className="text-sm font-black text-slate-900 group-hover:text-amber-700">{link.title} →</div>
                </Link>
              ))}
            </div>
          </article>

          <div className="mt-16 pt-16 border-t border-slate-100 text-center">
            <h3 className="text-2xl font-black text-slate-900 mb-3">Get XAT Study Material</h3>
            <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto">Receive curated DM practice sets and XLRI preparation guides in your inbox.</p>
            <div className="flex max-w-md mx-auto gap-2">
              <input type="email" placeholder="Enter your email" className="flex-1 px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all" />
              <button className="px-7 py-3.5 bg-slate-900 text-white text-sm font-bold rounded-2xl hover:bg-amber-600 transition-all">Get Guide</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
