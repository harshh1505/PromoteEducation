'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Users, BookOpen, Target, FileText, CheckCircle2, ChevronRight, GraduationCap, Stethoscope, Briefcase, Scale, Palette, FlaskConical, HelpCircle } from 'lucide-react'
import Script from 'next/script'

export interface ExamInfo {
  title: string
  fullName: string
  stream: string
  color: string
  conductedBy: React.ReactNode
  mode: React.ReactNode
  frequency: React.ReactNode
  duration: React.ReactNode
  totalMarks: React.ReactNode
  sections: string[]
  eligibility: string[]
  importantDates: { label: string; date: string }[]
  syllabus: { subject: string; topics: string[] }[]
  preparationTips: string[]
  topColleges: string[]
  description: React.ReactNode
  relatedArticles?: { title: string; href: string }[]
  slug: string
}

export default function ExamBlogPage({ exam }: { exam: ExamInfo }) {
  if (!exam) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Exam Not Found</h1>
            <p className="text-slate-500 mb-8">We couldn't find information about this exam.</p>
            <Link href="/exams" className="text-sky-500 font-bold hover:underline">← Back to all exams</Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is the eligibility for ${exam.title}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": exam.eligibility.join(' ')
        }
      },
      {
        "@type": "Question",
        "name": `Who conducts ${exam.title}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": exam.conductedBy
        }
      }
    ]
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Script
        id="exam-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Navbar />

      {/* Hero Banner */}
      <div
        className="pt-28 pb-16 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${exam.color}08 0%, ${exam.color}03 50%, white 100%)` }}
      >
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <Link href="/exams" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors mb-8 uppercase tracking-wider">
            <ArrowLeft size={14} /> All Exams
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
              style={{ background: `${exam.color}12`, color: exam.color, border: `1px solid ${exam.color}20` }}
            >
              {exam.stream}
            </span>
            <span className="text-xs text-slate-400 font-medium">|</span>
            <span className="text-xs text-slate-400 font-medium">Updated April 2026</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            {exam.title}
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
            {exam.fullName} — Complete guide with eligibility, syllabus, dates, and preparation strategy.
          </p>

          {/* Quick Stats */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Users, label: 'Conducted by', value: exam.conductedBy },
              { icon: Clock, label: 'Duration', value: exam.duration },
              { icon: Target, label: 'Total Marks', value: exam.totalMarks },
              { icon: BookOpen, label: 'Mode', value: exam.mode },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl p-4 border border-slate-100 bg-white/80 backdrop-blur-sm"
              >
                <stat.icon size={16} className="text-slate-400 mb-2" />
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</div>
                <div className="text-sm font-semibold text-slate-800 leading-tight">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16 w-full">

        {/* About */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">About {exam.title}</h2>
          <div className="text-slate-600 leading-relaxed text-[15px]">{exam.description}</div>
        </section>

        {/* Eligibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Eligibility Criteria</h2>
          <div className="space-y-3">
            {exam.eligibility.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Important Dates */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Important Dates</h2>
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            {exam.importantDates.map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-6 py-4 ${i !== exam.importantDates.length - 1 ? 'border-b border-slate-100' : ''} hover:bg-slate-50 transition-colors`}
              >
                <div className="flex items-center gap-3">
                  <Calendar size={14} style={{ color: exam.color }} />
                  <span className="text-sm font-medium text-slate-700">{item.label}</span>
                </div>
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: `${exam.color}10`, color: exam.color }}
                >
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Exam Pattern */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Exam Pattern & Syllabus</h2>
          <div className="space-y-6">
            {exam.syllabus.map((section, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 overflow-hidden">
                <div
                  className="px-6 py-4 font-bold text-sm"
                  style={{ background: `${exam.color}08`, color: exam.color, borderBottom: `1px solid ${exam.color}15` }}
                >
                  {section.subject}
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {section.topics.map((topic, j) => (
                      <span
                        key={j}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-100"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Preparation Tips */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Preparation Tips</h2>
          <div className="space-y-4">
            {exam.preparationTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: `${exam.color}10`, color: exam.color }}
                >
                  {i + 1}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed pt-1">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Top Colleges */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Top Colleges Accepting {exam.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {exam.topColleges.map((college, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-400 flex-shrink-0">
                  {i + 1}
                </div>
                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">{college}</span>
                <ChevronRight size={14} className="text-slate-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </section>
        
        {/* Comprehensive Guides - SEO Cluster */}
        {exam.relatedArticles && exam.relatedArticles.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Comprehensive Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exam.relatedArticles.map((article, i) => (
                <Link
                  key={i}
                  href={article.href}
                  className="p-5 rounded-2xl border border-slate-100 bg-white hover:border-[#0b57d0]/30 hover:shadow-md transition-all group flex items-center justify-between"
                >
                  <div>
                    <div className="text-[10px] font-bold text-[#0b57d0] uppercase tracking-wider mb-1">Deep Dive</div>
                    <div className="text-sm font-semibold text-slate-800 group-hover:text-[#0b57d0] transition-colors">{article.title}</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#0b57d0]/10 transition-colors">
                    <ChevronRight size={16} className="text-slate-400 group-hover:text-[#0b57d0] transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="rounded-3xl p-10 text-center border border-slate-200 bg-gradient-to-br from-slate-50 to-white">
          <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Ready to start your {exam.title} journey?</h3>
          <p className="text-sm text-slate-500 mb-8 max-w-md mx-auto">
            Explore top colleges, compare programs, and find the best fit for your career goals.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/rankings"
              className="px-8 py-3.5 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 active:scale-[0.98]"
            >
              Explore Top Colleges
            </Link>
            <Link
              href="/exams"
              className="px-8 py-3.5 bg-white text-slate-700 rounded-2xl text-sm font-bold border border-slate-200 hover:border-slate-300 transition-all active:scale-[0.98]"
            >
              View All Exams
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
