'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { 
  GraduationCap, BookOpen, Building2, Users, 
  ArrowRight, CheckCircle2, HelpCircle, MapPin, 
  Star, Share2, Download, Heart, Info, Briefcase, Globe, FileText, Clock
} from 'lucide-react'
import BrochureModal from '@/components/ui/BrochureModal'
import { useLeadCapture } from '@/hooks/useLeadCapture'
import { cn } from '@/lib/utils'
import { featuredColleges } from '@/lib/data/featuredColleges'
import Link from 'next/link'

export default function AIIMSKalyaniContent() {
  const { isAuthorized } = useLeadCapture()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'brochure' | 'details' | 'share' | 'remind'>('brochure')

  const handleAction = (mode: 'brochure' | 'details' | 'share' | 'remind') => {
    if (isAuthorized && mode !== 'share') {
      if (mode === 'brochure') alert('Brochure sent to your email!')
      if (mode === 'details') alert('Application form opened!')
      return
    }
    setModalMode(mode)
    setIsModalOpen(true)
  }

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'courses', label: 'Courses & Eligibility' },
    { id: 'admission', label: 'Admission Process' },
    { id: 'facilities', label: 'Infrastructure' },
    { id: 'student-life', label: 'Student Life' },
    { id: 'careers', label: 'Placements' },
    { id: 'faq', label: 'FAQs' },
  ]

  return (
    <main className="min-h-screen bg-white text-slate-900" style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}>
      <Navbar />

      {/* Google Fonts */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400;1,9..40,600&family=DM+Serif+Display:ital@0;1&display=swap');
      `}} />

      {/* Editorial Header */}
      <header className="pt-32 pb-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-sm">
                  Medical Excellence
                </span>
                <span className="text-slate-400 text-xs font-medium">Updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[0.95] mb-8" style={{ fontFamily: '"DM Serif Display", serif' }}>
                AIIMS <span className="text-sky-500 italic">Kalyani</span>
              </h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                The ultimate guide to courses, admission criteria, and academic infrastructure for the {new Date().getFullYear() + 1} intake.
              </p>
            </div>
            <div className="flex items-center gap-4 pb-2">
                <div className="text-right hidden md:block">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">National Importance</p>
                    <p className="text-sm font-bold text-slate-900">Estb. 2018 · West Bengal</p>
                </div>
                <button 
                  onClick={() => handleAction('details')}
                  className="px-8 py-4 bg-slate-900 text-white font-bold text-sm rounded-full hover:bg-sky-500 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
                >
                  Start Admission
                </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content Layout */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          
          {/* Navigation Sidebar (Desktop Only) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32 space-y-12">
              <nav className="space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 px-4">In this guide</p>
                {sections.map(s => (
                  <a 
                    key={s.id} 
                    href={`#${s.id}`}
                    className="block px-4 py-2.5 text-[13px] font-bold text-slate-400 hover:text-sky-500 hover:translate-x-1 transition-all border-l-2 border-transparent hover:border-sky-500"
                  >
                    {s.label}
                  </a>
                ))}
              </nav>

              {/* Sidebar Highlights */}
              <div className="space-y-12 px-4 pt-10 border-t border-slate-100">
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                        <CheckCircle2 size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-emerald-900 uppercase tracking-widest">Verified Institution</p>
                        <p className="text-[11px] text-emerald-700 font-medium leading-tight italic">Verified by Promote Education</p>
                    </div>
                </div>

                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Quick Performance</p>
                    <div className="space-y-6">
                        {[
                            { label: "Estb. Year", value: "2018", icon: Globe },
                            { label: "Campus Size", value: "179 Acres", icon: MapPin },
                            { label: "NIRF Rank", value: "Top Tier", icon: Star },
                            { label: "Seat Count", value: "125 (MBBS)", icon: Users }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                                    <item.icon size={14} />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{item.label}</p>
                                    <p className="text-xs font-black text-slate-900">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 bg-slate-900 rounded-3xl text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/20 rounded-full blur-2xl" />
                    <p className="text-[9px] font-black text-sky-400 uppercase tracking-widest mb-4">Key Deadlines {new Date().getFullYear() + 1}</p>
                    <div className="space-y-4">
                        <div className="border-l-2 border-sky-500 pl-3">
                            <p className="text-[10px] font-black text-white uppercase">NEET UG {new Date().getFullYear() + 1}</p>
                            <p className="text-[11px] text-slate-400">Expected: May {new Date().getFullYear() + 1}</p>
                        </div>
                        <div className="border-l-2 border-slate-700 pl-3">
                            <p className="text-[10px] font-black text-white uppercase">Counselling Starts</p>
                            <p className="text-[11px] text-slate-400">Expected: July {new Date().getFullYear() + 1}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Admission Status</p>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-sm font-black text-slate-900">Open for {new Date().getFullYear() + 1}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">Applications for MBBS & B.Sc Nursing are currently being processed via centralized portals.</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Article Content */}
          <article className="lg:col-span-9 space-y-24 pb-32">
            
            <section id="overview" className="scroll-mt-32">
              <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight" style={{ fontFamily: '"DM Serif Display", serif' }}>Institutional Foundation</h2>
              <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed space-y-6">
                <p>
                  Established in <strong>2018</strong> as a beacon of medical progress, <strong>AIIMS Kalyani</strong> was founded under the prestigious <em>Pradhan Mantri Swasthya Suraksha Yojana (PMSSY)</em>. Located in the Nadia district of West Bengal, the institution spans a massive <strong>179-acre campus</strong> designed to meet the growing healthcare demands of Eastern India.
                </p>
                <p>
                  As an <strong>Institute of National Importance</strong>, AIIMS Kalyani is more than just a college; it is a specialized healthcare ecosystem where academic rigor meets clinical innovation.
                </p>
              </div>
            </section>

            <section id="courses" className="scroll-mt-32">
              <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight" style={{ fontFamily: '"DM Serif Display", serif' }}>Academic Portfolio & Eligibility</h2>
              <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                The academic structure at AIIMS Kalyani is divided into three tiers: Undergraduate, Postgraduate, and Super-Speciality research.
              </p>
              <div className="space-y-12">
                <div>
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-sky-500" />
                    Undergraduate Programs
                  </h3>
                  <div className="border-t border-slate-100 divide-y divide-slate-50">
                    {[
                      { name: "MBBS", marks: "60% for Gen/OBC (PCB + English), 50% for SC/ST", exam: "NEET UG" },
                      { name: "B.Sc. Nursing (Hons.)", marks: "55% aggregate for Gen/OBC, 50% for SC/ST", exam: "AIIMS Entrance" }
                    ].map((c, i) => (
                      <div key={i} className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <p className="font-bold text-slate-900 text-lg mb-1">{c.name}</p>
                          <p className="text-sm text-slate-400 font-medium">{c.marks}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-black text-sky-500 uppercase tracking-widest">{c.exam}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section id="admission" className="scroll-mt-32">
              <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight" style={{ fontFamily: '"DM Serif Display", serif' }}>Admission Protocol</h2>
              <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed space-y-8">
                <p>
                  Securing a seat at AIIMS Kalyani is a multi-step journey that begins with national-level entrance examinations.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 not-prose py-8">
                    <div className="space-y-4">
                        <div className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">01</span>
                            Examination Phase
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Candidates must achieve a qualifying percentile in NEET UG for MBBS or INI CET for postgraduate programs.
                        </p>
                    </div>
                </div>
              </div>
            </section>

            <section id="faq" className="scroll-mt-32 pt-20 border-t border-slate-100">
                <h2 className="text-3xl font-black mb-12 text-slate-900 tracking-tight" style={{ fontFamily: '"DM Serif Display", serif' }}>Frequently Asked Questions</h2>
                <div className="space-y-12">
                    {[
                        { q: "Is AIIMS Kalyani a good choice for MBBS?", a: "Yes, AIIMS Kalyani is recognized as one of India's top emerging medical institutions." },
                        { q: "How competitive is the admission process?", a: "Extremely. Only the top rankers in national entrance exams secure seats." }
                    ].map((faq, i) => (
                        <div key={i}>
                            <h4 className="text-lg font-black text-slate-900 mb-3">{faq.q}</h4>
                            <p className="text-slate-500 leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>

          </article>
        </div>
      </div>

      <Footer />
      
      <BrochureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        collegeName="AIIMS Kalyani"
        collegeId="aiims-kalyani"
        stream="Medical"
        mode={modalMode}
      />
    </main>
  )
}
