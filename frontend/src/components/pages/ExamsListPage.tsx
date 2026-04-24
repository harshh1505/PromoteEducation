'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowRight, GraduationCap, Stethoscope, Briefcase, Scale, Palette, FlaskConical, BookOpen, Users, Calendar } from 'lucide-react'

const allExams = [
  {
    name: 'JEE Main', fullName: 'Joint Entrance Examination Main', stream: 'Engineering',
    icon: GraduationCap, applicants: '12L+', slug: 'jee-main', color: '#3A7BD5',
    date: 'Jan & Apr 2026', conductedBy: <a href="https://nta.ac.in" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-sky-500 transition-colors">NTA</a>,
  },
  {
    name: 'JEE Advanced', fullName: 'Joint Entrance Examination Advanced', stream: 'Engineering',
    icon: GraduationCap, applicants: '2.5L+', slug: 'jee-advanced', color: '#2563eb',
    date: 'May 2026', conductedBy: <a href="https://jeeadv.ac.in" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-600 transition-colors">IITs</a>,
  },
  {
    name: 'NEET UG', fullName: 'National Eligibility cum Entrance Test', stream: 'Medical',
    icon: Stethoscope, applicants: '20L+', slug: 'neet-ug', color: '#1DB87A',
    date: 'May 2026', conductedBy: <a href="https://nta.ac.in" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-green-600 transition-colors">NTA</a>,
  },
  {
    name: 'CAT', fullName: 'Common Admission Test', stream: 'Management',
    icon: Briefcase, applicants: '2.8L+', slug: 'cat', color: '#8B6A1F',
    date: 'Nov 2025', conductedBy: <a href="https://iimcat.ac.in" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[#8B6A1F] transition-colors">IIMs</a>,
  },
  {
    name: 'GATE', fullName: 'Graduate Aptitude Test in Engineering', stream: 'Engineering',
    icon: FlaskConical, applicants: '8L+', slug: 'gate', color: '#6d28d9',
    date: 'Feb 2026', conductedBy: <a href="https://gate2024.iisc.ac.in" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-purple-600 transition-colors">IISc & IITs</a>,
  },
  {
    name: 'CLAT', fullName: 'Common Law Admission Test', stream: 'Law',
    icon: Scale, applicants: '70K+', slug: 'clat', color: '#7A3AD5',
    date: 'Dec 2025', conductedBy: <a href="https://consortiumofnlus.ac.in" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-purple-500 transition-colors">NLU Consortium</a>,
  },
  {
    name: 'NIFT', fullName: 'National Institute of Fashion Technology Entrance', stream: 'Design',
    icon: Palette, applicants: '40K+', slug: 'nift', color: '#D55A30',
    date: 'Jan 2026', conductedBy: <a href="https://nift.ac.in" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[#D55A30] transition-colors">NIFT</a>,
  },
  {
    name: 'CUET UG', fullName: 'Common University Entrance Test', stream: 'General',
    icon: BookOpen, applicants: '14L+', slug: 'cuet-ug', color: '#0891b2',
    date: 'May 2026', conductedBy: <a href="https://nta.ac.in" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-cyan-600 transition-colors">NTA</a>,
  },
]

export default function ExamsListPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-32 pb-20">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap size={20} className="text-sky-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-sky-500">Exam Center</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-medium text-slate-900 tracking-tight mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Top Entrance <span className="italic text-slate-400">Exams</span> in India
          </h1>
          <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            Complete guide to India's most competitive entrance examinations. Click on any exam for detailed information on eligibility, syllabus, dates, and preparation strategy.
          </p>
        </div>

        {/* Exam Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allExams.map((exam) => {
            const Icon = exam.icon
            return (
              <div
                key={exam.slug}
                className="group relative bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${exam.color}10`, border: `1px solid ${exam.color}20` }}
                  >
                    <Icon size={24} style={{ color: exam.color }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-sky-600 transition-colors">
                        <Link href={`/exams/${exam.slug}`} className="after:absolute after:inset-0">
                          {exam.name}
                        </Link>
                      </h2>
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex-shrink-0 relative z-10"
                        style={{ background: `${exam.color}10`, color: exam.color }}
                      >
                        {exam.stream}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 mb-4">{exam.fullName}</p>

                    <div className="flex items-center gap-6 text-xs text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Users size={12} />
                        <span>{exam.applicants} applicants</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        <span>{exam.date}</span>
                      </div>
                      <span className="text-slate-300">·</span>
                      <span className="font-medium relative z-10">{exam.conductedBy}</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 pt-1">
                    <ArrowRight size={18} className="text-sky-500" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      <Footer />
    </div>
  )
}
