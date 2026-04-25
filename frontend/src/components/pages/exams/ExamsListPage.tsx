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
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar />

      <main className="flex-1">
        {/* Minimalist Hero */}
        <section className="pt-32 pb-12 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none mb-4">
                        Exams <span className="text-slate-400 font-medium italic">Database</span>
                    </h1>
                    <p className="text-sm text-slate-500 font-medium max-w-lg">
                        Browse through India's largest collection of entrance examinations. Filter by stream, search by name, and get direct admission links.
                    </p>
                </div>
                <div className="w-full md:w-96 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Quick Search..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="py-4 bg-white sticky top-20 z-40 border-b border-slate-100 shadow-sm shadow-slate-100/20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                    {streams.map((stream) => (
                        <button
                            key={stream}
                            onClick={() => setSelectedStream(stream)}
                            className={cn(
                                "px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all",
                                selectedStream === stream 
                                    ? "bg-slate-900 text-white shadow-md" 
                                    : "bg-white text-slate-400 hover:text-slate-900"
                            )}
                        >
                            {stream}
                        </button>
                    ))}
                </div>
            </div>
        </section>

        {/* List Table */}
        <section className="py-12">
            <div className="max-w-7xl mx-auto px-6">
                {/* Desktop Table Header */}
                <div className="hidden lg:grid grid-cols-12 gap-4 px-8 py-4 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">
                    <div className="col-span-4">Examination</div>
                    <div className="col-span-2 text-center">Stream</div>
                    <div className="col-span-2 text-center">Applicants</div>
                    <div className="col-span-2 text-center">Exam Date</div>
                    <div className="col-span-1 text-center">Status</div>
                    <div className="col-span-1 text-right">Action</div>
                </div>

                {/* Exam Rows */}
                <div className="space-y-1">
                    {displayedExams.length > 0 ? (
                        displayedExams.map((exam) => (
                            <Link 
                                key={exam.slug}
                                href={`/exams/${exam.slug}`}
                                className="group lg:grid lg:grid-cols-12 items-center gap-4 px-8 py-5 bg-white border border-slate-100 lg:border-none lg:bg-transparent hover:bg-white hover:shadow-xl hover:shadow-slate-200/40 rounded-2xl transition-all"
                            >
                                {/* Exam Info */}
                                <div className="col-span-4 flex items-center gap-5">
                                    <div className={cn(
                                        "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform",
                                        exam.color === 'sky' ? 'bg-sky-50 text-sky-600' : 
                                        exam.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                                        exam.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                                        exam.color === 'violet' ? 'bg-violet-50 text-violet-600' :
                                        exam.color === 'rose' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-600'
                                    )}>
                                        <exam.icon size={20} />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-sm font-black text-slate-900 group-hover:text-sky-600 transition-colors leading-none mb-1">{exam.name}</h3>
                                        <p className="text-[11px] text-slate-400 truncate font-medium">{exam.fullName}</p>
                                    </div>
                                </div>

                                {/* Stream (Mobile hidden column labels) */}
                                <div className="col-span-2 text-center hidden lg:block">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-50 px-3 py-1 rounded-md">
                                        {exam.stream}
                                    </span>
                                </div>

                                {/* Applicants */}
                                <div className="col-span-2 text-center hidden lg:flex flex-col items-center">
                                    <div className="flex items-center gap-1.5 text-slate-600">
                                        <Users size={12} />
                                        <span className="text-[11px] font-bold">{exam.applicants}</span>
                                    </div>
                                    <p className="text-[9px] text-slate-300 font-black uppercase tracking-widest leading-none mt-1">Aspirants</p>
                                </div>

                                {/* Date */}
                                <div className="col-span-2 text-center hidden lg:flex flex-col items-center">
                                    <div className="flex items-center gap-1.5 text-slate-900">
                                        <Calendar size={12} className="text-sky-500" />
                                        <span className="text-[11px] font-black">{exam.date}</span>
                                    </div>
                                    <p className="text-[9px] text-slate-300 font-black uppercase tracking-widest leading-none mt-1">Timeline</p>
                                </div>

                                {/* Status */}
                                <div className="col-span-1 text-center hidden lg:block">
                                    <span className={cn(
                                        "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                                        exam.status === 'Open' ? 'bg-emerald-100 text-emerald-700' :
                                        exam.status === 'Closed' ? 'bg-slate-100 text-slate-400' : 'bg-sky-100 text-sky-700'
                                    )}>
                                        {exam.status}
                                    </span>
                                </div>

                                {/* Mobile Metadata Summary */}
                                <div className="lg:hidden flex items-center justify-between mt-4 pt-4 border-t border-slate-50 text-[10px] text-slate-400">
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold">{exam.applicants}</span>
                                        <span className="font-bold text-slate-900">{exam.date}</span>
                                    </div>
                                    <span className={cn(
                                        "px-2 py-0.5 rounded-full font-black uppercase tracking-widest",
                                        exam.status === 'Open' ? 'bg-emerald-100 text-emerald-700' :
                                        exam.status === 'Closed' ? 'bg-slate-100 text-slate-400' : 'bg-sky-100 text-sky-700'
                                    )}>
                                        {exam.status}
                                    </span>
                                </div>

                                {/* Action */}
                                <div className="col-span-1 text-right hidden lg:block">
                                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                                        <ChevronRight size={14} />
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="bg-white rounded-3xl p-20 text-center border border-slate-100">
                            <Search size={40} className="mx-auto text-slate-200 mb-6" />
                            <h3 className="text-lg font-black text-slate-900 mb-2">No matches found</h3>
                            <p className="text-sm text-slate-400">Try adjusting your filters or search term.</p>
                        </div>
                    )}
                </div>

                {/* View More Button */}
                {filteredExams.length > visibleCount && (
                    <div className="mt-12 text-center">
                        <button 
                            onClick={() => setVisibleCount(prev => prev + 10)}
                            className="px-10 py-4 bg-white border border-slate-200 rounded-full text-xs font-black uppercase tracking-widest text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-xl shadow-slate-200/50"
                        >
                            View More Exams
                        </button>
                    </div>
                )}

                {/* Footer Stats */}
                <div className="mt-12 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Showing {displayedExams.length} of {filteredExams.length} examinations · Updated April 25, 2026
                    </p>
                </div>
            </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
