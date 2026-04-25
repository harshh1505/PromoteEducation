'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { 
  ArrowRight, Calendar, CheckCircle2, 
  Clock, Download, FileText, GraduationCap, 
  HelpCircle, Info, MapPin, Search, 
  Share2, ShieldCheck, Star, Users,
  BookOpen, Award, Target, Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'
import BrochureModal from '@/components/ui/BrochureModal'
import { useLeadCapture } from '@/hooks/useLeadCapture'
import Link from 'next/link'

interface ExamEditorialContentProps {
  examData: {
    id: string
    name: string
    fullName: string
    stream: string
    conductedBy: string
    frequency: string
    duration: string
    totalMarks: string
    sections: { id: string; label: string }[]
    overview: string
    eligibility: string[]
    pattern: { label: string; value: string }[]
    dates: { event: string; date: string; status: 'upcoming' | 'closed' | 'open' }[]
    syllabus: { subject: string; topics: string[] }[]
    faqs: { q: string; a: string }[]
    highlights: { label: string; value: string; icon: string }[]
  }
}

const iconMap: Record<string, any> = {
  Clock, Award, Target, Users, Calendar, GraduationCap, BookOpen, Star, Zap, Info, MapPin
}

export default function ExamEditorialContent({ examData }: ExamEditorialContentProps) {
  const { isAuthorized } = useLeadCapture()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'brochure' | 'details' | 'share' | 'remind'>('brochure')

  const handleAction = (mode: 'brochure' | 'details' | 'share' | 'remind') => {
    if (isAuthorized && mode !== 'share') {
      if (mode === 'brochure') alert('Syllabus & Guide sent to your email!')
      if (mode === 'details') alert('Direct registration link opened!')
      return
    }
    setModalMode(mode)
    setIsModalOpen(true)
  }

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />

      {/* Editorial Header */}
      <header className="pt-32 pb-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-sm">
                  National Examination
                </span>
                <span className="text-slate-400 text-xs font-medium">Updated: April 2026</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[0.95] mb-8">
                {examData.name.split(' ').map((word, i) => (
                  <span key={i} className={i === 1 ? "text-sky-500 italic" : ""}>{word} </span>
                ))}
              </h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                {examData.fullName}: Everything you need to know about the 2026 session, including dates, eligibility, and preparation strategies.
              </p>
            </div>
            <div className="flex items-center gap-4 pb-2">
                <div className="text-right hidden md:block">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Conducted By</p>
                    <p className="text-sm font-bold text-slate-900">{examData.conductedBy}</p>
                </div>
                <button 
                  onClick={() => handleAction('details')}
                  className="px-8 py-4 bg-slate-900 text-white font-bold text-sm rounded-full hover:bg-sky-500 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
                >
                  Start Application
                </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content Layout */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          
          {/* Navigation Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32 space-y-12">
              <nav className="space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 px-4">Exam Guide</p>
                {examData.sections.map(s => (
                  <a 
                    key={s.id} 
                    href={`#${s.id}`}
                    className="block px-4 py-2.5 text-[13px] font-bold text-slate-400 hover:text-sky-500 hover:translate-x-1 transition-all border-l-2 border-transparent hover:border-sky-500"
                  >
                    {s.label}
                  </a>
                ))}
              </nav>

              <div className="space-y-12 px-4 pt-10 border-t border-slate-100">
                
                {/* Stats Grid */}
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Exam Snapshot</p>
                    <div className="space-y-6">
                        {examData.highlights.map((item, i) => {
                            const IconComponent = iconMap[item.icon] || Info
                            return (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                                    <IconComponent size={14} />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{item.label}</p>
                                    <p className="text-xs font-black text-slate-900">{item.value}</p>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                </div>

                {/* Important Dates Box */}
                <div className="p-6 bg-slate-900 rounded-3xl text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/20 rounded-full blur-2xl" />
                    <p className="text-[9px] font-black text-sky-400 uppercase tracking-widest mb-4">Official Timeline</p>
                    <div className="space-y-4">
                        {examData.dates.map((d, i) => (
                            <div key={i} className="flex justify-between items-start border-b border-white/5 pb-3 last:border-0 last:pb-0">
                                <div>
                                    <p className="text-[10px] text-white font-bold">{d.event}</p>
                                    <p className="text-[9px] text-slate-400 uppercase tracking-widest">{d.date}</p>
                                </div>
                                <span className={cn(
                                    "px-1.5 py-0.5 rounded text-[8px] font-black uppercase",
                                    d.status === 'open' ? 'bg-emerald-500 text-white' : 
                                    d.status === 'closed' ? 'bg-slate-700 text-slate-400' : 'bg-sky-500 text-white'
                                )}>
                                    {d.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Preparation CTA */}
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <Zap className="text-sky-500 mb-4" size={24} />
                    <h4 className="text-sm font-black mb-2">Need a study plan?</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed mb-6">Get expert preparation strategies and sample papers curated by top faculty.</p>
                    <button 
                        onClick={() => handleAction('brochure')}
                        className="w-full py-3 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-sky-500 transition-all"
                    >
                        Download Study Guide
                    </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Article Content */}
          <article className="lg:col-span-9 space-y-24 pb-32">
            
            {/* Overview */}
            <section id="overview" className="scroll-mt-32">
              <h2 className="text-4xl font-black mb-10 text-slate-900 tracking-tight leading-tight">
                About the <span className="text-slate-400">Examination</span>
              </h2>
              <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed space-y-6">
                <p dangerouslySetInnerHTML={{ __html: examData.overview }} />
              </div>
            </section>

            {/* Eligibility */}
            <section id="eligibility" className="scroll-mt-32">
              <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">Eligibility Criteria</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {examData.eligibility.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-sky-500 shadow-sm flex-shrink-0">
                      <CheckCircle2 size={14} />
                    </div>
                    <p className="text-sm font-bold text-slate-700 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Exam Pattern */}
            <section id="pattern" className="scroll-mt-32">
              <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">Examination Pattern</h2>
              <div className="bg-slate-900 rounded-3xl p-10 text-white grid grid-cols-2 md:grid-cols-4 gap-8">
                {examData.pattern.map((p, i) => (
                  <div key={i}>
                    <p className="text-[10px] font-black text-sky-400 uppercase tracking-widest mb-2">{p.label}</p>
                    <p className="text-2xl font-black">{p.value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Syllabus */}
            <section id="syllabus" className="scroll-mt-32">
              <h2 className="text-3xl font-black mb-10 text-slate-900 tracking-tight">Syllabus Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {examData.syllabus.map((s, i) => (
                  <div key={i}>
                    <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-3">
                      <div className="w-1.5 h-6 bg-sky-500" />
                      {s.subject}
                    </h3>
                    <ul className="space-y-3">
                      {s.topics.map((t, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                          <div className="w-1 h-1 rounded-full bg-slate-300" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="scroll-mt-32 pt-20 border-t border-slate-100">
                <h2 className="text-3xl font-black mb-12 text-slate-900 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-12">
                    {examData.faqs.map((faq, i) => (
                        <div key={i}>
                            <h4 className="text-lg font-black text-slate-900 mb-3">{faq.q}</h4>
                            <p className="text-slate-500 leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-slate-50 p-12 rounded-sm border border-slate-100 text-center">
                <h2 className="text-3xl font-black text-slate-900 mb-6">Prepare with the Best</h2>
                <p className="text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed">
                    Join thousands of aspirants who rely on Promote Education for accurate data and expert guidance.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button 
                        onClick={() => handleAction('brochure')}
                        className="px-10 py-4 bg-slate-900 text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-lg shadow-slate-900/10 hover:bg-sky-500 transition-all"
                    >
                        Get Syllabus PDF
                    </button>
                    <button 
                        onClick={() => handleAction('remind')}
                        className="px-10 py-4 bg-white border border-slate-200 text-slate-900 font-bold text-xs uppercase tracking-widest rounded-full hover:bg-slate-50 transition-all"
                    >
                        Talk to an Expert
                    </button>
                </div>
            </section>

          </article>
        </div>
      </div>

      <Footer />
      
      <BrochureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        collegeName={examData.name}
        collegeId={examData.id}
        stream={examData.stream}
        mode={modalMode}
      />
    </main>
  )
}
