'use client'

import { useState, useMemo } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { 
  ArrowRight, Search, Filter, GraduationCap, 
  Stethoscope, Briefcase, Scale, Palette, 
  BookOpen, Users, Calendar, ArrowUpDown,
  ChevronDown, LayoutGrid, Cpu, Compass,
  ShieldCheck, ArrowLeft, Send
} from 'lucide-react'
import { cn } from '@/lib/utils'

const allExams = [
  {
    name: 'JEE Main', fullName: 'Joint Entrance Examination Main', stream: 'Engineering',
    icon: GraduationCap, applicants: '12L+', slug: 'jee-main', color: 'sky',
    date: 'Jan & Apr 2026', status: 'Upcoming'
  },
  {
    name: 'NEET UG', fullName: 'National Eligibility cum Entrance Test', stream: 'Medical',
    icon: Stethoscope, applicants: '20L+', slug: 'neet-ug', color: 'emerald',
    date: 'May 2026', status: 'Open'
  },
  {
    name: 'CAT', fullName: 'Common Admission Test', stream: 'Management',
    icon: Briefcase, applicants: '2.8L+', slug: 'cat', color: 'amber',
    date: 'Nov 2025', status: 'Closed'
  },
  {
    name: 'GATE', fullName: 'Graduate Aptitude Test in Engineering', stream: 'Engineering',
    icon: Cpu, applicants: '8L+', slug: 'gate', color: 'violet',
    date: 'Feb 2026', status: 'Upcoming'
  },
  {
    name: 'CLAT', fullName: 'Common Law Admission Test', stream: 'Law',
    icon: Scale, applicants: '70K+', slug: 'clat', color: 'indigo',
    date: 'Dec 2025', status: 'Closed'
  },
  {
    name: 'NIFT', fullName: 'NIFT Entrance Examination', stream: 'Design',
    icon: Palette, applicants: '40K+', slug: 'nift', color: 'rose',
    date: 'Jan 2026', status: 'Upcoming'
  },
  {
    name: 'CUET UG', fullName: 'Common University Entrance Test', stream: 'General',
    icon: BookOpen, applicants: '14L+', slug: 'cuet-ug', color: 'cyan',
    date: 'May 2026', status: 'Upcoming'
  },
  // Add a few more to make pagination make sense visually
  {
    name: 'BITSAT', fullName: 'BITS Admission Test', stream: 'Engineering',
    icon: GraduationCap, applicants: '3L+', slug: 'bitsat', color: 'sky',
    date: 'June 2026', status: 'Upcoming'
  },
  {
    name: 'XAT', fullName: 'Xavier Aptitude Test', stream: 'Management',
    icon: Briefcase, applicants: '1L+', slug: 'xat', color: 'amber',
    date: 'Jan 2026', status: 'Upcoming'
  },
  {
    name: 'AIIMS Nursing', fullName: 'AIIMS B.Sc Nursing Entrance', stream: 'Medical',
    icon: Stethoscope, applicants: '1L+', slug: 'aiims-entrance', color: 'emerald',
    date: 'June 2026', status: 'Upcoming'
  }
]

const streams = [
  { name: 'All', icon: LayoutGrid, colorClass: 'text-white', activeBg: 'bg-[#1d4ed8]', textClass: 'text-white' },
  { name: 'Medical', icon: Stethoscope, colorClass: 'text-emerald-500', activeBg: 'bg-emerald-500', textClass: 'text-slate-600' },
  { name: 'Engineering', icon: Cpu, colorClass: 'text-blue-500', activeBg: 'bg-blue-500', textClass: 'text-slate-600' },
  { name: 'Management', icon: Briefcase, colorClass: 'text-amber-500', activeBg: 'bg-amber-500', textClass: 'text-slate-600' },
  { name: 'Law', icon: Scale, colorClass: 'text-indigo-500', activeBg: 'bg-indigo-500', textClass: 'text-slate-600' },
  { name: 'Design', icon: Palette, colorClass: 'text-rose-500', activeBg: 'bg-rose-500', textClass: 'text-slate-600' },
  { name: 'General', icon: Compass, colorClass: 'text-slate-500', activeBg: 'bg-slate-500', textClass: 'text-slate-600' }
]

export default function ExamsListPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStream, setSelectedStream] = useState('All')
  
  // Dummy pagination state for visual demo
  const [currentPage, setCurrentPage] = useState(1)

  const filteredExams = useMemo(() => {
    return allExams.filter(exam => {
      const matchesSearch = exam.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            exam.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStream = selectedStream === 'All' || exam.stream === selectedStream
      return matchesSearch && matchesStream
    })
  }, [searchTerm, selectedStream])

  // In a real app we would slice based on currentPage, but we'll show first 6 for demo
  const displayedExams = filteredExams.slice(0, 6)

  return (
    <div className="flex flex-col min-h-screen bg-[#fafbfc]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      <main className="flex-1">
        {/* ── HERO SECTION ── */}
        <section className="pt-32 pb-24 bg-[#f8fafc] border-b border-slate-100 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[100px] opacity-60 -mr-40 -mt-40 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-center">
              
              {/* Left Side: Content */}
              <div className="flex-1 w-full text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-[#f0f9ff] text-[#0ea5e9] text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                  <ShieldCheck size={14} /> ENTRANCE EXAMS 2026
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                  Find the Right Exam.<br/>
                  <span className="text-[#0ea5e9]">Shape Your Future.</span>
                </h1>
                <p className="text-slate-500 font-medium text-lg max-w-lg mx-auto lg:mx-0">
                  Explore India's major entrance exams across streams. Filter, compare and get important details—all in one place.
                </p>
              </div>

              {/* Right Side: Stats Card & Search */}
              <div className="flex-1 w-full max-w-2xl relative mt-10 lg:mt-0">
                {/* Decorative Dashed Line with Paper Plane */}
                <div className="absolute -top-16 -right-4 w-64 h-32 hidden md:block pointer-events-none text-[#1d4ed8]/30">
                  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 90 Q 50 20 180 30" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" fill="none" />
                    <g transform="translate(180, 25) rotate(15)">
                      <path d="M-5 -5 L15 5 L-5 15 L0 5 Z" fill="#1d4ed8" />
                    </g>
                  </svg>
                </div>

                <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 relative mb-8 lg:mb-0">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 pb-6 border-b border-slate-50">
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <BookOpen size={20} />
                      </div>
                      <div>
                        <p className="font-black text-slate-900 leading-none mb-1">50+</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Exams Covered</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Users size={20} />
                      </div>
                      <div>
                        <p className="font-black text-slate-900 leading-none mb-1">10L+</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Students Guided</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <p className="font-black text-slate-900 leading-none mb-1">100%</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Trusted Info</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <p className="font-black text-slate-900 leading-none mb-1">Updated</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Real-time Updates</p>
                      </div>
                    </div>

                  </div>

                  {/* Integrated Search Bar in the card to match design */}
                  <div className="pt-6">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text"
                        placeholder="Search exams by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none text-slate-900 font-medium text-sm placeholder:text-slate-400 focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all"
                      />
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── FILTER CHIPS ── */}
        <section className="pt-8 pb-4 bg-[#fafbfc]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
                {streams.map((stream) => {
                  const isActive = selectedStream === stream.name
                  return (
                    <button
                      key={stream.name}
                      onClick={() => setSelectedStream(stream.name)}
                      className={cn(
                        "flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all border",
                        isActive 
                          ? `${stream.activeBg} text-white border-transparent shadow-md` 
                          : `bg-white border-slate-200 ${stream.textClass} hover:border-[#1d4ed8] hover:text-[#1d4ed8]`
                      )}
                    >
                      <stream.icon size={16} className={isActive ? 'text-white' : stream.colorClass} />
                      {stream.name}
                    </button>
                  )
                })}
              </div>

              <button className="flex items-center gap-2 px-4 py-2 text-slate-600 font-bold text-sm rounded-xl hover:bg-slate-100 transition-colors shrink-0">
                <Filter size={16} /> Filters
              </button>

            </div>
          </div>
        </section>

        {/* ── LIST TABLE ── */}
        <section className="py-6 pb-20">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Table Header */}
            <div className="hidden lg:grid grid-cols-12 gap-4 px-8 pb-4 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">
              <div className="col-span-4 flex items-center gap-1 cursor-pointer hover:text-slate-600 transition-colors">
                EXAMINATION <ArrowUpDown size={12} />
              </div>
              <div className="col-span-2 text-center">STREAM</div>
              <div className="col-span-2 text-center">APPLICANTS</div>
              <div className="col-span-2 text-center">EXAM DATE</div>
              <div className="col-span-1 text-center">STATUS</div>
              <div className="col-span-1 text-right">ACTION</div>
            </div>

            {/* Table Rows */}
            <div className="space-y-4">
              {displayedExams.length > 0 ? (
                displayedExams.map((exam) => (
                  <Link 
                    key={exam.slug}
                    href={`/exams/${exam.slug}`}
                    className="group lg:grid lg:grid-cols-12 items-center gap-4 px-6 lg:px-8 py-5 bg-white border border-slate-100 rounded-3xl hover:border-blue-200 shadow-sm hover:shadow-md transition-all cursor-pointer block"
                  >
                    {/* Examination Column */}
                    <div className="col-span-4 flex items-center gap-4 mb-4 lg:mb-0">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform",
                        exam.color === 'sky' ? 'bg-sky-50 text-sky-600' : 
                        exam.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                        exam.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                        exam.color === 'violet' ? 'bg-violet-50 text-violet-600' :
                        exam.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                        exam.color === 'rose' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-600'
                      )}>
                        <exam.icon size={20} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-[15px] font-black text-slate-900 group-hover:text-[#1d4ed8] transition-colors">{exam.name}</h3>
                        <p className="text-xs text-slate-500 font-medium truncate">{exam.fullName}</p>
                      </div>
                    </div>

                    {/* Stream Pill */}
                    <div className="col-span-2 text-center hidden lg:block">
                      <span className={cn(
                        "text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full inline-block",
                        exam.stream === 'Engineering' ? 'bg-blue-50 text-blue-600' :
                        exam.stream === 'Medical' ? 'bg-emerald-50 text-emerald-600' :
                        exam.stream === 'Management' ? 'bg-amber-50 text-amber-600' :
                        exam.stream === 'Law' ? 'bg-indigo-50 text-indigo-600' :
                        exam.stream === 'Design' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-600'
                      )}>
                        {exam.stream}
                      </span>
                    </div>

                    {/* Applicants */}
                    <div className="col-span-2 lg:flex justify-center items-center gap-2 hidden text-slate-700">
                      <Users size={16} className="text-slate-400" /> 
                      <span className="font-bold text-sm">{exam.applicants}</span>
                    </div>

                    {/* Date */}
                    <div className="col-span-2 lg:flex justify-center items-center gap-2 hidden text-slate-700">
                      <Calendar size={16} className="text-[#0ea5e9]" /> 
                      <span className="font-bold text-sm">{exam.date}</span>
                    </div>

                    {/* Status */}
                    <div className="col-span-1 text-center hidden lg:block">
                      <span className={cn(
                        "px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-block",
                        exam.status === 'Open' ? 'bg-[#dcfce7] text-[#166534]' :
                        exam.status === 'Closed' ? 'bg-slate-100 text-slate-500' : 
                        'bg-[#e0f2fe] text-[#0369a1]'
                      )}>
                        {exam.status}
                      </span>
                    </div>

                    {/* Action Arrow */}
                    <div className="col-span-1 text-right hidden lg:block">
                      {/* 
                        The CAT exam in the screenshot has a solid blue background for the arrow, 
                        the others have a faint outline. We'll replicate this visual style loosely based on hover state 
                        or specifically if exam is CAT to match the mockup perfectly. 
                      */}
                      <div className={cn(
                        "inline-flex items-center justify-center w-10 h-10 rounded-full transition-all ml-auto",
                        exam.slug === 'cat' 
                          ? 'bg-[#1d4ed8] text-white' 
                          : 'bg-[#f8fafc] text-slate-400 group-hover:bg-[#1d4ed8] group-hover:text-white'
                      )}>
                        <ArrowRight size={18} />
                      </div>
                    </div>

                    {/* Mobile Only: Meta */}
                    <div className="lg:hidden grid grid-cols-2 gap-4 mt-2 pt-4 border-t border-slate-100">
                       <div className="flex items-center gap-2 text-slate-700">
                         <Calendar size={14} className="text-[#0ea5e9]" /> 
                         <span className="font-bold text-xs">{exam.date}</span>
                       </div>
                       <div className="flex items-center justify-end">
                         <span className={cn(
                          "px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                          exam.status === 'Open' ? 'bg-[#dcfce7] text-[#166534]' :
                          exam.status === 'Closed' ? 'bg-slate-100 text-slate-500' : 
                          'bg-[#e0f2fe] text-[#0369a1]'
                        )}>
                          {exam.status}
                        </span>
                       </div>
                    </div>

                  </Link>
                ))
              ) : (
                <div className="bg-white rounded-3xl p-16 text-center border border-slate-100">
                  <Search size={32} className="mx-auto text-slate-300 mb-4" />
                  <h3 className="text-base font-bold text-slate-900 mb-1">No matches found</h3>
                  <p className="text-sm text-slate-500">Try adjusting your filters or search term.</p>
                </div>
              )}
            </div>

            {/* ── PAGINATION ── */}
            {displayedExams.length > 0 && (
              <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-200 pt-8">
                
                <div className="text-xs font-bold text-slate-500 order-2 md:order-1">
                  Showing 1 to {displayedExams.length} of 50+ exams
                </div>
                
                <div className="flex items-center gap-2 order-1 md:order-2">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1d4ed8] text-white font-bold text-xs shadow-md">
                    1
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 font-bold text-xs hover:border-[#1d4ed8] hover:text-[#1d4ed8] transition-colors">
                    2
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 font-bold text-xs hover:border-[#1d4ed8] hover:text-[#1d4ed8] transition-colors">
                    3
                  </button>
                  <span className="w-8 flex items-center justify-center text-slate-400 font-bold tracking-widest">
                    ...
                  </span>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 font-bold text-xs hover:border-[#1d4ed8] hover:text-[#1d4ed8] transition-colors">
                    9
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-[#1d4ed8] hover:border-[#1d4ed8] transition-colors ml-1">
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 order-3 md:order-3 cursor-pointer hover:text-slate-800">
                  Show 10 per page <ChevronDown size={14} />
                </div>
                
              </div>
            )}

          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
