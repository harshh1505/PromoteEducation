'use client'

import { useState, useMemo } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { 
  ArrowRight, Search, Filter, GraduationCap, 
  Stethoscope, Briefcase, Scale, Palette, 
  FlaskConical, BookOpen, Users, Calendar,
  TrendingUp, ExternalLink, ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

const allExams = [
  {
    name: 'JEE Main', fullName: 'Joint Entrance Examination Main', stream: 'Engineering',
    icon: GraduationCap, applicants: '12L+', slug: 'jee-main', color: 'sky',
    date: 'Jan & Apr 2026', status: 'Upcoming', conductedBy: 'NTA'
  },
  {
    name: 'NEET UG', fullName: 'National Eligibility cum Entrance Test', stream: 'Medical',
    icon: Stethoscope, applicants: '20L+', slug: 'neet-ug', color: 'emerald',
    date: 'May 2026', status: 'Open', conductedBy: 'NTA'
  },
  {
    name: 'CAT', fullName: 'Common Admission Test', stream: 'Management',
    icon: Briefcase, applicants: '2.8L+', slug: 'cat', color: 'amber',
    date: 'Nov 2025', status: 'Closed', conductedBy: 'IIMs'
  },
  {
    name: 'GATE', fullName: 'Graduate Aptitude Test in Engineering', stream: 'Engineering',
    icon: FlaskConical, applicants: '8L+', slug: 'gate', color: 'violet',
    date: 'Feb 2026', status: 'Upcoming', conductedBy: 'IISc'
  },
  {
    name: 'CLAT', fullName: 'Common Law Admission Test', stream: 'Law',
    icon: Scale, applicants: '70K+', slug: 'clat', color: 'indigo',
    date: 'Dec 2025', status: 'Closed', conductedBy: 'NLU'
  },
  {
    name: 'NIFT', fullName: 'NIFT Entrance Examination', stream: 'Design',
    icon: Palette, applicants: '40K+', slug: 'nift', color: 'rose',
    date: 'Jan 2026', status: 'Upcoming', conductedBy: 'NIFT'
  },
  {
    name: 'CUET UG', fullName: 'Common University Entrance Test', stream: 'General',
    icon: BookOpen, applicants: '14L+', slug: 'cuet-ug', color: 'cyan',
    date: 'May 2026', status: 'Upcoming', conductedBy: 'NTA'
  },
  {
    name: 'INI CET', fullName: 'INI Combined Entrance Test', stream: 'Medical',
    icon: Stethoscope, applicants: '1.5L+', slug: 'ini-cet', color: 'emerald',
    date: 'Nov 2025', status: 'Closed', conductedBy: 'AIIMS'
  },
  {
    name: 'XAT', fullName: 'Xavier Aptitude Test', stream: 'Management',
    icon: Briefcase, applicants: '1L+', slug: 'xat', color: 'amber',
    date: 'Jan 2026', status: 'Upcoming', conductedBy: 'XLRI'
  },
  {
    name: 'BITSAT', fullName: 'BITS Admission Test', stream: 'Engineering',
    icon: GraduationCap, applicants: '3L+', slug: 'bitsat', color: 'sky',
    date: 'June 2026', status: 'Upcoming', conductedBy: 'BITS'
  },
  {
    name: 'NEET PG', fullName: 'NEET for Postgraduates', stream: 'Medical',
    icon: Stethoscope, applicants: '2L+', slug: 'neet-pg', color: 'emerald',
    date: 'June 2026', status: 'Upcoming', conductedBy: 'NBE'
  },
  {
    name: 'VITEEE', fullName: 'VIT Engineering Entrance Exam', stream: 'Engineering',
    icon: GraduationCap, applicants: '2.5L+', slug: 'viteee', color: 'sky',
    date: 'Apr 2026', status: 'Upcoming', conductedBy: 'VIT'
  },
  {
    name: 'SNAP', fullName: 'Symbiosis National Aptitude Test', stream: 'Management',
    icon: Briefcase, applicants: '80K+', slug: 'snap', color: 'amber',
    date: 'Dec 2025', status: 'Closed', conductedBy: 'Symbiosis'
  },
  {
    name: 'NATA', fullName: 'National Aptitude Test in Architecture', stream: 'Design',
    icon: Palette, applicants: '50K+', slug: 'nata', color: 'rose',
    date: 'Apr-July 2026', status: 'Upcoming', conductedBy: 'CoA'
  },
  {
    name: 'LSAT India', fullName: 'Law School Admission Test India', stream: 'Law',
    icon: Scale, applicants: '30K+', slug: 'lsat-india', color: 'indigo',
    date: 'Jan & May 2026', status: 'Upcoming', conductedBy: 'LSAC'
  },
  {
    name: 'COMEDK', fullName: 'COMEDK UGET', stream: 'Engineering',
    icon: GraduationCap, applicants: '80K+', slug: 'comedk', color: 'sky',
    date: 'May 2026', status: 'Upcoming', conductedBy: 'COMEDK'
  },
  {
    name: 'AIIMS Nursing', fullName: 'AIIMS B.Sc Nursing Entrance', stream: 'Medical',
    icon: Stethoscope, applicants: '1L+', slug: 'aiims-entrance', color: 'emerald',
    date: 'June 2026', status: 'Upcoming', conductedBy: 'AIIMS'
  },
  {
    name: 'NMAT', fullName: 'NMAT by GMAC', stream: 'Management',
    icon: Briefcase, applicants: '90K+', slug: 'nmat', color: 'amber',
    date: 'Oct-Dec 2025', status: 'Closed', conductedBy: 'GMAC'
  },
  {
    name: 'UCEED', fullName: 'Undergraduate Common Entrance Exam for Design', stream: 'Design',
    icon: Palette, applicants: '15K+', slug: 'uceed', color: 'rose',
    date: 'Jan 2026', status: 'Upcoming', conductedBy: 'IITB'
  },
  {
    name: 'AILET', fullName: 'All India Law Entrance Test', stream: 'Law',
    icon: Scale, applicants: '20K+', slug: 'ailet', color: 'indigo',
    date: 'Dec 2025', status: 'Closed', conductedBy: 'NLU Delhi'
  },
  {
    name: 'WBJEE', fullName: 'West Bengal Joint Entrance Examination', stream: 'Engineering',
    icon: GraduationCap, applicants: '1L+', slug: 'wbjee', color: 'sky',
    date: 'Apr 2026', status: 'Upcoming', conductedBy: 'WBJEEB'
  },
  {
    name: 'INI SS', fullName: 'INI Super-Specialty Entrance Test', stream: 'Medical',
    icon: Stethoscope, applicants: '20K+', slug: 'ini-ss', color: 'emerald',
    date: 'Oct 2025', status: 'Closed', conductedBy: 'AIIMS'
  },
  {
    name: 'MAT', fullName: 'Management Aptitude Test', stream: 'Management',
    icon: Briefcase, applicants: '1.5L+', slug: 'mat', color: 'amber',
    date: 'Feb & May 2026', status: 'Upcoming', conductedBy: 'AIMA'
  },
  {
    name: 'NID DAT', fullName: 'NID Design Aptitude Test', stream: 'Design',
    icon: Palette, applicants: '25K+', slug: 'nid-dat', color: 'rose',
    date: 'Dec 2025', status: 'Closed', conductedBy: 'NID'
  },
  {
    name: 'MH CET Law', fullName: 'Maharashtra Common Entrance Test for Law', stream: 'Law',
    icon: Scale, applicants: '40K+', slug: 'mhcet-law', color: 'indigo',
    date: 'Apr 2026', status: 'Upcoming', conductedBy: 'CET Cell'
  },
  {
    name: 'SRMJEEE', fullName: 'SRM Joint Engineering Entrance Exam', stream: 'Engineering',
    icon: GraduationCap, applicants: '1.5L+', slug: 'srmjeee', color: 'sky',
    date: 'Apr-June 2026', status: 'Upcoming', conductedBy: 'SRM'
  },
  {
    name: 'JIPMER Nursing', fullName: 'JIPMER B.Sc Nursing Entrance', stream: 'Medical',
    icon: Stethoscope, applicants: '40K+', slug: 'jipmer-nursing', color: 'emerald',
    date: 'July 2026', status: 'Upcoming', conductedBy: 'JIPMER'
  },
  {
    name: 'CMAT', fullName: 'Common Management Admission Test', stream: 'Management',
    icon: Briefcase, applicants: '70K+', slug: 'cmat', color: 'amber',
    date: 'May 2026', status: 'Upcoming', conductedBy: 'NTA'
  },
  {
    name: 'CEED', fullName: 'Common Entrance Exam for Design', stream: 'Design',
    icon: Palette, applicants: '10K+', slug: 'ceed', color: 'rose',
    date: 'Jan 2026', status: 'Upcoming', conductedBy: 'IITB'
  },
  {
    name: 'SLAT', fullName: 'Symbiosis Law Admission Test', stream: 'Law',
    icon: Scale, applicants: '25K+', slug: 'slat', color: 'indigo',
    date: 'May 2026', status: 'Upcoming', conductedBy: 'Symbiosis'
  },
  {
    name: 'MHT CET', fullName: 'Maharashtra Common Entrance Test', stream: 'Engineering',
    icon: GraduationCap, applicants: '6L+', slug: 'mht-cet', color: 'sky',
    date: 'Apr-May 2026', status: 'Upcoming', conductedBy: 'CET Cell'
  }
]

const streams = ['All', 'Medical', 'Engineering', 'Management', 'Law', 'Design', 'General']

export default function ExamsListPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStream, setSelectedStream] = useState('All')
  const [visibleCount, setVisibleCount] = useState(10)

  const filteredExams = useMemo(() => {
    return allExams.filter(exam => {
      const matchesSearch = exam.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            exam.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStream = selectedStream === 'All' || exam.stream === selectedStream
      return matchesSearch && matchesStream
    })
  }, [searchTerm, selectedStream])

  const displayedExams = useMemo(() => {
    return filteredExams.slice(0, visibleCount)
  }, [filteredExams, visibleCount])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Minimalist Hero */}
        <section className="pt-28 pb-12 bg-[var(--surface-2)] border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-medium text-[var(--ink)] mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                        Entrance Exams <span className="text-[var(--action)]">2026</span>
                    </h1>
                    <p className="text-sm text-[var(--ink-2)] max-w-lg">
                        Browse India's major entrance exams. Filter by stream and get direct links.
                    </p>
                </div>
                <div className="w-full md:w-80 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ink-4)]" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search exams..."
                        className="w-full pl-10 pr-4 py-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm text-[var(--ink)] focus:ring-1 focus:ring-[var(--action)]/30 outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="py-3 bg-[var(--surface)] border-b border-[var(--border)]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center gap-2 overflow-x-auto">
                    {streams.map((stream) => (
                        <button
                            key={stream}
                            onClick={() => setSelectedStream(stream)}
                            className={cn(
                                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
                                selectedStream === stream 
                                    ? "bg-[var(--action)] text-white" 
                                    : "text-[var(--ink-2)] hover:bg-[var(--surface-2)]"
                            )}
                        >
                            {stream}
                        </button>
                    ))}
                </div>
            </div>
        </section>

        {/* List Table */}
        <section className="py-8">
            <div className="max-w-7xl mx-auto px-6">
                {/* Desktop Table Header */}
                <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 mb-2 text-[10px] font-bold text-[var(--ink-4)] uppercase tracking-widest border-b border-[var(--border)]">
                    <div className="col-span-4">Examination</div>
                    <div className="col-span-2 text-center">Stream</div>
                    <div className="col-span-2 text-center">Applicants</div>
                    <div className="col-span-2 text-center">Exam Date</div>
                    <div className="col-span-1 text-center">Status</div>
                    <div className="col-span-1 text-right">Action</div>
                </div>

                {/* Exam Rows */}
                <div className="space-y-2">
                    {displayedExams.length > 0 ? (
                        displayedExams.map((exam) => (
                            <Link 
                                key={exam.slug}
                                href={`/exams/${exam.slug}`}
                                className="group lg:grid lg:grid-cols-12 items-center gap-4 px-5 py-4 bg-white border border-[var(--border)]/50 lg:border-none rounded-xl hover:shadow-md transition-all"
                            >
                                {/* Exam Info */}
                                <div className="col-span-4 flex items-center gap-4">
                                    <div className={cn(
                                        "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform",
                                        exam.color === 'sky' ? 'bg-sky-50 text-sky-600' : 
                                        exam.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                                        exam.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                                        exam.color === 'violet' ? 'bg-violet-50 text-violet-600' :
                                        exam.color === 'rose' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-600'
                                    )}>
                                        <exam.icon size={16} />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-sm font-semibold text-[var(--ink)] group-hover:text-[var(--action)] transition-colors">{exam.name}</h3>
                                        <p className="text-xs text-[var(--ink-3)] truncate">{exam.fullName}</p>
                                    </div>
                                </div>

                                {/* Stream (Mobile hidden column labels) */}
                                <div className="col-span-2 text-center hidden lg:block">
                                    <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--ink-3)] bg-[var(--surface-2)] px-2 py-1 rounded">
                                        {exam.stream}
                                    </span>
                                </div>

                                {/* Applicants */}
                                <div className="col-span-2 text-center hidden lg:flex flex-col items-center">
                                    <div className="flex items-center gap-1 text-[var(--ink-2)]">
                                        <Users size={12} />
                                        <span className="text-xs font-medium">{exam.applicants}</span>
                                    </div>
                                </div>

                                {/* Date */}
                                <div className="col-span-2 text-center hidden lg:flex flex-col items-center">
                                    <div className="flex items-center gap-1 text-[var(--ink)]">
                                        <Calendar size={12} className="text-[var(--action)]" />
                                        <span className="text-xs font-medium">{exam.date}</span>
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="col-span-1 text-center hidden lg:block">
                                    <span className={cn(
                                        "px-2 py-0.5 rounded-full text-[10px] font-medium",
                                        exam.status === 'Open' ? 'bg-emerald-100 text-emerald-700' :
                                        exam.status === 'Closed' ? 'bg-[var(--surface-2)] text-[var(--ink-4)]' : 'bg-sky-100 text-sky-700'
                                    )}>
                                        {exam.status}
                                    </span>
                                </div>

                                {/* Mobile Metadata Summary */}
                                <div className="lg:hidden flex items-center justify-between mt-3 pt-3 border-t border-[var(--border)] text-xs text-[var(--ink-3)]">
                                    <div className="flex items-center gap-3">
                                        <span className="font-medium">{exam.applicants}</span>
                                        <span className="font-medium text-[var(--ink)]">{exam.date}</span>
                                    </div>
                                    <span className={cn(
                                        "px-2 py-0.5 rounded-full font-medium",
                                        exam.status === 'Open' ? 'bg-emerald-100 text-emerald-700' :
                                        exam.status === 'Closed' ? 'bg-[var(--surface-2)] text-[var(--ink-4)]' : 'bg-sky-100 text-sky-700'
                                    )}>
                                        {exam.status}
                                    </span>
                                </div>

                                {/* Action */}
                                <div className="col-span-1 text-right hidden lg:block">
                                    <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--action)] text-white opacity-0 group-hover:opacity-100 transition-all">
                                        <ChevronRight size={14} />
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="bg-[var(--surface-2)] rounded-xl p-16 text-center border border-[var(--border)]">
                            <Search size={32} className="mx-auto text-[var(--ink-4)] mb-4" />
                            <h3 className="text-base font-semibold text-[var(--ink)] mb-1">No matches found</h3>
                            <p className="text-sm text-[var(--ink-3)]">Try adjusting your filters or search term.</p>
                        </div>
                    )}
                </div>

                {/* View More Button */}
                {filteredExams.length > visibleCount && (
                    <div className="mt-8 text-center">
                        <button 
                            onClick={() => setVisibleCount(prev => prev + 10)}
                            className="px-6 py-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-xs font-medium text-[var(--ink-2)] hover:bg-[var(--action)] hover:text-white hover:border-[var(--action)] transition-all"
                        >
                            View More
                        </button>
                    </div>
                )}

                {/* Footer Stats */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-[var(--ink-4)]">
                        Showing {displayedExams.length} of {filteredExams.length} examinations
                    </p>
                </div>
            </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
