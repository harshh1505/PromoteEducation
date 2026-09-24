'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { fixMarkdownBold } from '@/lib/utils'
import LeadModal from '@/components/ui/LeadModal'
import { 
  GraduationCap, Clock, Award, CheckCircle2, ChevronRight, ArrowRight, 
  Building2, Briefcase, TrendingUp, HelpCircle, FileText, Calendar, 
  IndianRupee, ShieldCheck, Check, Sparkles, BookOpen, MapPin, ChevronDown
} from 'lucide-react'
import type { CourseData } from '@/lib/courseService'

interface CourseClientProps {
  course: CourseData
  colleges: any[]
}

export default function CourseClient({ course, colleges }: CourseClientProps) {
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('Admission Guidance')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  const handleOpenModal = (title: string) => {
    setModalTitle(title)
    setShowLeadModal(true)
  }

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-slate-50/60 font-body text-slate-900 selection:bg-indigo-600 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden border-b border-slate-200/80 bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/30 via-slate-50/20 to-white pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Dynamic Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-bold text-slate-600 mb-8 uppercase tracking-widest flex-wrap">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <ChevronRight size={12} className="text-slate-500" />
            <Link href="/courses" className="hover:text-slate-900 transition-colors">Courses</Link>
            <ChevronRight size={12} className="text-slate-500" />
            <span className="text-indigo-600 font-black">{course.short_name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700">
                  {course.category}
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                  {course.degree_type}
                </span>
                {course.mode && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {course.mode}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-[52px] font-black text-slate-900 tracking-tight leading-[1.1] font-display">
                {course.course_name} <span className="text-indigo-600">({course.short_name})</span>
              </h1>

              <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed max-w-3xl">
                {course.short_description}
              </p>

              {/* Quick Info Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 shadow-sm">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                    <Clock size={12} className="text-indigo-600" /> Duration
                  </div>
                  <div className="text-sm md:text-base font-extrabold text-slate-900">{course.duration}</div>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 shadow-sm">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                    <IndianRupee size={12} className="text-emerald-600" /> Avg Fees
                  </div>
                  <div className="text-sm md:text-base font-extrabold text-slate-900">{course.average_fees}</div>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 shadow-sm">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                    <TrendingUp size={12} className="text-indigo-600" /> Avg Salary
                  </div>
                  <div className="text-sm md:text-base font-extrabold text-slate-900">{course.starting_salary || '₹5 - 8 LPA'}</div>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 shadow-sm">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                    <Sparkles size={12} className="text-amber-500" /> Top Salary
                  </div>
                  <div className="text-sm md:text-base font-extrabold text-slate-900">{course.top_salary || '₹35+ LPA'}</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-4 pt-4 flex-wrap">
                <button
                  onClick={() => handleOpenModal(`Apply for ${course.short_name} Admission 2026`)}
                  className="px-8 py-4 bg-slate-950 hover:bg-indigo-600 text-white font-extrabold text-xs uppercase tracking-widest rounded-2xl transition-all shadow-md flex items-center gap-2 group"
                >
                  Apply For Admission
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => handleOpenModal(`Download ${course.short_name} Brochure & Syllabus`)}
                  className="px-6 py-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-extrabold text-xs uppercase tracking-widest rounded-2xl transition-all shadow-sm flex items-center gap-2"
                >
                  <FileText size={14} />
                  Download Syllabus Guide
                </button>
              </div>
            </div>

            {/* Right Card / Key Highlights */}
            {course.key_highlights && course.key_highlights.length > 0 && (
              <div className="lg:col-span-4 bg-slate-50 border border-slate-200/90 rounded-3xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
                  <Award size={16} className="text-indigo-600" />
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">
                    Quick Key Highlights
                  </h3>
                </div>

                <div className="space-y-3.5">
                  {course.key_highlights.map((h, i) => (
                    <div key={i} className="flex justify-between items-start gap-4 text-xs pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                      <span className="font-bold text-slate-400">{h.label}</span>
                      <span className="font-extrabold text-slate-900 text-right">{h.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 bg-white/70 -mx-6 -mb-6 p-6 rounded-b-3xl">
                  <div className="text-[11px] font-semibold text-slate-500 mb-3">
                    Need advice choosing between top colleges and specialisations for {course.short_name}?
                  </div>
                  <button
                    onClick={() => handleOpenModal(`Free Counselling: ${course.short_name}`)}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[10px] uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    Talk to Academic Advisor
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        
        {/* Section 1: Overview & Detailed Scope */}
        {course.long_description && (
          <section className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-12 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-6 font-display flex items-center gap-3">
              <BookOpen className="text-indigo-600" size={28} />
              About {course.course_name} ({course.short_name})
            </h2>
            <div className="prose prose-slate max-w-none prose-p:text-slate-600 prose-p:leading-relaxed prose-p:text-base prose-strong:text-slate-900">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {fixMarkdownBold(course.long_description)}
              </ReactMarkdown>
            </div>
          </section>
        )}

        {/* Section 2: Course Details & Eligibility Matrix */}
        <section className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-12 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-8 font-display flex items-center gap-3">
            <ShieldCheck className="text-emerald-600" size={28} />
            {course.short_name} Admission & Eligibility Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-6">
              <div className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-3 flex items-center gap-2">
                <CheckCircle2 size={16} /> Eligibility Criteria
              </div>
              <p className="text-sm md:text-base font-semibold text-slate-700 leading-relaxed">
                {course.eligibility}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-6">
              <div className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-3 flex items-center gap-2">
                <GraduationCap size={16} /> Admission Process
              </div>
              <p className="text-sm md:text-base font-semibold text-slate-700 leading-relaxed">
                {course.admission_process}
              </p>
            </div>
          </div>

          {/* Admission Documents & Dates Checklist */}
          {course.admission_details && (
            <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {course.admission_details.counselling_info && (
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-2">
                    Counseling & Seat Allocation
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {course.admission_details.counselling_info}
                  </p>
                </div>
              )}

              {course.admission_details.documents_required && course.admission_details.documents_required.length > 0 && (
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-3">
                    Key Documents Required
                  </h4>
                  <ul className="space-y-2">
                    {course.admission_details.documents_required.map((doc, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                        <Check size={14} className="text-emerald-500 shrink-0" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Section 3: Popular Specialisations */}
        {course.specialisations && course.specialisations.length > 0 && (
          <section className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-12 shadow-sm">
            <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 block mb-2">
                  High-Demand Tracks
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-display">
                  Top {course.short_name} Specialisations
                </h2>
              </div>
              <button
                onClick={() => handleOpenModal(`Specialisation Choice in ${course.short_name}`)}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1"
              >
                Find Best Fit For Your Rank <ArrowRight size={12} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {course.specialisations.map((spec, i) => (
                <div 
                  key={i} 
                  className="bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-indigo-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-md group"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-sm mb-4 border border-indigo-100 group-hover:scale-105 transition-transform">
                    0{i + 1}
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">
                    {spec.name}
                  </h3>
                  {spec.description && (
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      {spec.description}
                    </p>
                  )}
                  <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    {spec.duration && <span className="font-semibold text-slate-400">{spec.duration}</span>}
                    {spec.avg_salary && <span className="font-extrabold text-emerald-600">{spec.avg_salary}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 4: Career Opportunities & Top Recruiters */}
        {course.careers && course.careers.length > 0 && (
          <section className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-12 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 block mb-2">
              Career Roadmap
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-8 font-display">
              Career Scope, Job Roles & Placement Packages
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {course.careers.map((career, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200/70 rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">{career.job_role}</h3>
                      {career.industry && (
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                          {career.industry}
                        </div>
                      )}
                    </div>
                    {career.avg_salary && (
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-extrabold text-xs rounded-full border border-emerald-100">
                        {career.avg_salary}
                      </span>
                    )}
                  </div>

                  {career.description && (
                    <p className="text-xs text-slate-600 leading-relaxed mb-4 mt-2">
                      {career.description}
                    </p>
                  )}

                  {career.top_recruiters && career.top_recruiters.length > 0 && (
                    <div className="pt-3 border-t border-slate-200/60">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                        Top Hiring Firms:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {career.top_recruiters.map((r, rIdx) => (
                          <span key={rIdx} className="text-[10px] font-bold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Placement highlights banner */}
            {course.placement_details && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center md:text-left">
                  <div className="text-xs font-bold uppercase tracking-widest text-indigo-300">
                    Highest Placement Benchmark
                  </div>
                  <div className="text-2xl font-black">
                    {course.placement_details.highest_package || '₹50+ LPA'}
                  </div>
                  <div className="text-xs text-slate-400">
                    Average placement rate: {course.placement_details.placement_rate || '85%+'} across accredited universities
                  </div>
                </div>

                <button
                  onClick={() => handleOpenModal(`Placement Report: ${course.short_name}`)}
                  className="px-6 py-3 bg-white text-slate-900 hover:bg-indigo-50 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shrink-0"
                >
                  View Full Placement Report
                </button>
              </div>
            )}
          </section>
        )}

        {/* Section 5: Major Entrance Exams */}
        {course.exams && course.exams.length > 0 && (
          <section className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-12 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 block mb-2">
              National & State Gateways
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-8 font-display">
              Entrance Exams for {course.short_name} (2026)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {course.exams.map((exam, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {exam.exam_level || 'National'}
                      </span>
                      {exam.exam_date && (
                        <span className="text-[10px] text-slate-400 font-semibold">
                          {exam.exam_date}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 mb-1">
                      {exam.exam_name}
                    </h3>
                    {exam.conducting_body && (
                      <div className="text-[11px] text-slate-400 font-medium mb-3">
                        By {exam.conducting_body}
                      </div>
                    )}
                    {exam.description && (
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {exam.description}
                      </p>
                    )}
                  </div>

                  {exam.exam_slug && (
                    <Link
                      href={`/exams/${exam.exam_slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-indigo-600 hover:text-indigo-800 transition-colors mt-4 pt-3 border-t border-slate-200/60"
                    >
                      Exam Dates & Syllabus <ArrowRight size={12} />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 6: Fee Structure Breakdown */}
        {course.fee_details && Object.keys(course.fee_details).length > 0 && (
          <section className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-12 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 block mb-2">
              Financial Breakdown
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-8 font-display">
              Estimated Fee Structure for {course.short_name}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {course.fee_details.tuition_fees && (
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/70">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Tuition Fees</div>
                  <div className="text-base font-black text-slate-900">{course.fee_details.tuition_fees}</div>
                </div>
              )}
              {course.fee_details.hostel_fees && (
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/70">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Hostel & Mess</div>
                  <div className="text-base font-black text-slate-900">{course.fee_details.hostel_fees}</div>
                </div>
              )}
              {course.fee_details.exam_fees && (
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/70">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Exam & Lab Charges</div>
                  <div className="text-base font-black text-slate-900">{course.fee_details.exam_fees}</div>
                </div>
              )}
              {course.fee_details.total_estimated_cost && (
                <div className="bg-emerald-50/60 p-6 rounded-2xl border border-emerald-200/60">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 mb-1">Total Estimated Cost</div>
                  <div className="text-base font-black text-emerald-900">{course.fee_details.total_estimated_cost}</div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Section 7: Top Colleges Offering This Course */}
        {colleges && colleges.length > 0 && (
          <section className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-12 shadow-sm">
            <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 block mb-2">
                  Accredited Institutions
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-display">
                  Top Colleges Offering {course.short_name}
                </h2>
              </div>
              <Link 
                href="/colleges" 
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1"
              >
                Browse All Indian Colleges <ArrowRight size={12} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {colleges.map((c: any) => (
                <Link
                  key={c.id}
                  href={`/colleges/${c.slug}`}
                  className="bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-slate-300 rounded-2xl p-6 transition-all hover:shadow-md group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      {c.ranking && (
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          Rank #{c.ranking}
                        </span>
                      )}
                      <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                        <MapPin size={12} /> {c.state || c.location}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2 line-clamp-2">
                      {c.name}
                    </h3>

                    <div className="flex items-center gap-4 text-xs pt-3 border-t border-slate-100">
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase">Avg Package</div>
                        <div className="font-extrabold text-slate-900">{c.avg_ctc || '₹7.5 LPA'}</div>
                      </div>
                      {c.total_fee && (
                        <div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase">Total Fee</div>
                          <div className="font-extrabold text-slate-900">{c.total_fee}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1 text-xs font-extrabold text-indigo-600 mt-4 group-hover:translate-x-0.5 transition-transform">
                    View Cutoffs & Details <ArrowRight size={12} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Section 8: Frequently Asked Questions */}
        {course.faqs && course.faqs.length > 0 && (
          <section className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-12 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 block mb-2">
              Common Inquiries
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-8 font-display flex items-center gap-3">
              <HelpCircle className="text-indigo-600" size={28} />
              Frequently Asked Questions About {course.short_name}
            </h2>

            <div className="space-y-4">
              {course.faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index
                return (
                  <div 
                    key={index} 
                    className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full text-left p-5 md:p-6 bg-slate-50/50 hover:bg-slate-50 flex items-center justify-between gap-4 font-extrabold text-slate-900 text-sm md:text-base transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-indigo-600 font-black">Q.</span>
                        {faq.question}
                      </span>
                      <ChevronDown 
                        size={18} 
                        className={`text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} 
                      />
                    </button>
                    {isOpen && (
                      <div className="p-5 md:p-6 pt-0 bg-slate-50/50 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Section 9: Related Courses */}
        {course.related_courses && course.related_courses.length > 0 && (
          <section className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
              Explore Related Degree Courses & Alternatives
            </h3>
            <div className="flex flex-wrap gap-3">
              {course.related_courses.map((rc, idx) => (
                <Link
                  key={idx}
                  href={`/courses/${rc.slug}`}
                  className="px-4 py-2.5 bg-slate-50 hover:bg-indigo-600 hover:text-white border border-slate-200 text-slate-700 font-extrabold text-xs rounded-xl transition-all flex items-center gap-2"
                >
                  <span>{rc.name} ({rc.short_name})</span>
                  <ArrowRight size={12} />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Section 10: Final Counseling CTA Banner */}
        <section className="p-8 md:p-12 rounded-3xl bg-slate-900 text-white relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
              Admission Helpline 2026
            </span>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight font-display">
              Unsure which college to pick for {course.short_name}?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Connect directly with our senior counseling team to match your entrance rank, budget, and location preferences with accredited universities.
            </p>
            <div className="pt-2">
              <button
                onClick={() => handleOpenModal(`Academic Consultation: ${course.short_name}`)}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs uppercase tracking-widest rounded-2xl transition-all shadow-md flex items-center gap-2"
              >
                Book Free Consultation Session
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      {/* Lead capture modal */}
      <LeadModal
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        collegeName={`${course.course_name} (${course.short_name})`}
        stream={course.category}
      />
    </div>
  )
}
