'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { 
  GraduationCap, BookOpen, Building2, Users, 
  ArrowRight, CheckCircle2, HelpCircle, MapPin, 
  Star, Share2, Download, Heart, Info, Briefcase, Globe, FileText
} from 'lucide-react'
import BrochureModal from '@/components/ui/BrochureModal'
import { useLeadCapture } from '@/hooks/useLeadCapture'
import { cn } from '@/lib/utils'
import { featuredColleges } from '@/components/sections/CollegesSection'
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
    <main className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />

      {/* Editorial Header */}
      <header className="pt-32 pb-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-midnight text-white text-[10px] font-bold uppercase tracking-widest rounded-sm">
                  Medical Excellence
                </span>
                <span className="text-slate-400 text-xs font-medium">Updated: April 25, 2026</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[0.95] mb-8">
                AIIMS <span className="text-sky-500 italic">Kalyani</span>
              </h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                The ultimate guide to courses, admission criteria, and academic infrastructure for the 2026 intake.
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

              {/* Sidebar Highlights - Filling the "Empty" space */}
              <div className="space-y-12 px-4 pt-10 border-t border-slate-100">
                
                {/* Trust Badge */}
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                        <CheckCircle2 size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-emerald-900 uppercase tracking-widest">Verified Institution</p>
                        <p className="text-[11px] text-emerald-700 font-medium leading-tight italic">Verified by Promote Education</p>
                    </div>
                </div>

                {/* Performance Stats */}
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Quick Performance</p>
                    <div className="space-y-6">
                        {[
                            { label: "Estb. Year", value: "2018", icon: Globe },
                            { label: "Campus Size", value: "179 Acres", icon: MapPin },
                            { label: <Link href="/colleges" className="hover:text-sky-500 transition-colors">NIRF Rank</Link>, value: "Top Tier", icon: Star },
                            { label: "Seat Count", value: <>125 (<Link href="/courses" className="hover:text-sky-500 transition-colors">MBBS</Link>)</>, icon: Users }
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

                {/* Important Dates */}
                <div className="p-6 bg-slate-900 rounded-3xl text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/20 rounded-full blur-2xl" />
                    <p className="text-[9px] font-black text-sky-400 uppercase tracking-widest mb-4">Key Deadlines 2026</p>
                    <div className="space-y-4">
                        <div className="border-l-2 border-sky-500 pl-3">
                            <p className="text-[10px] font-black text-white uppercase"><Link href="/exams/neet-ug" className="hover:text-sky-400 transition-colors">NEET UG 2026</Link></p>
                            <p className="text-[11px] text-slate-400">Expected: May 2026</p>
                        </div>
                        <div className="border-l-2 border-slate-700 pl-3">
                            <p className="text-[10px] font-black text-white uppercase">Counselling Starts</p>
                            <p className="text-[11px] text-slate-400">Expected: July 2026</p>
                        </div>
                    </div>
                </div>

                {/* Admission Status */}
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Admission Status</p>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-sm font-black text-slate-900">Open for 2026</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">Applications for <Link href="/courses" className="text-slate-900 font-bold hover:underline">MBBS & B.Sc Nursing</Link> are currently being processed via centralized portals.</p>
                </div>

                {/* Action Box */}
                <div className="p-6 bg-sky-50 rounded-2xl border border-sky-100">
                    <HelpCircle size={20} className="text-sky-500 mb-3" />
                    <p className="text-xs font-black text-slate-900 mb-2">Need Help?</p>
                    <p className="text-[11px] text-slate-500 leading-relaxed mb-4">Get personalized admission support from our expert counselors.</p>
                    <button className="text-[11px] font-black text-sky-600 uppercase tracking-widest hover:underline">
                        Talk to expert
                    </button>
                </div>

                {/* Also Read Section */}
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Also Read</p>
                    <div className="space-y-6">
                        {featuredColleges
                            .filter((c: any) => c.state === 'West Bengal' && c.id !== 'aiims-kalyani')
                            .slice(0, 3)
                            .map((c: any, i: number) => (
                            <Link 
                                key={c.id} 
                                href={`/colleges/${c.id}`}
                                className="group block"
                            >
                                <p className="text-[10px] font-black text-sky-500 uppercase tracking-widest mb-1 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                                    <FileText size={10} /> Insights
                                </p>
                                <p className="text-xs font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                                    {c.name}: Complete Admission Guide 2026
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Exam Hub Section */}
                <div className="pt-10 border-t border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Top Medical Exams</p>
                    <div className="space-y-4">
                        {[
                            { name: <Link href="/exams/neet-ug" className="hover:text-sky-500">NEET UG</Link>, type: "Undergraduate", diff: "High" },
                            { name: <Link href="/exams/ini-cet" className="hover:text-sky-500">INI CET</Link>, type: "Postgraduate", diff: "Extreme" },
                            { name: <Link href="/exams/ini-ss" className="hover:text-sky-500">INI SS</Link>, type: "Super-Spec", diff: "Extreme" },
                            { name: <Link href="/exams/aiims-entrance" className="hover:text-sky-500">AIIMS Nursing</Link>, type: "Nursing", diff: "Moderate" }
                        ].map((exam, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 group hover:border-sky-200 transition-all">
                                <div>
                                    <p className="text-[10px] font-black text-slate-900">{exam.name}</p>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{exam.type}</p>
                                </div>
                                <span className={cn(
                                    "text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest",
                                    exam.diff === 'Extreme' ? "bg-red-50 text-red-600" : 
                                    exam.diff === 'High' ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                                )}>
                                    {exam.diff}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Student Resources (Blogs) Section */}
                <div className="pt-10 border-t border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Student Resources</p>
                    <div className="space-y-8">
                        {[
                            { title: "MBBS: India vs Abroad – The 2026 Comparison", slug: "india-vs-abroad-mbbs" },
                            { title: "Future Prospects After MBBS: Beyond Clinical Practice", slug: "future-prospects-after-mbbs" },
                            { title: "The Rise of Private Medical Education in India", slug: "private-medical-colleges-rise" }
                        ].map((blog, i) => (
                            <div key={i} className="group cursor-pointer">
                                <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-2 group-hover:text-sky-500 transition-colors">Expert Article</p>
                                <h4 className="text-xs font-bold text-slate-900 group-hover:underline leading-relaxed decoration-sky-500 underline-offset-4 transition-all">
                                    {blog.title}
                                </h4>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Decorative Bottom Design - Filling the remaining space */}
                <div className="pt-20 space-y-12">

                    {/* Abstract Hand-Coded Art Element */}
                    <div className="px-4 space-y-4 opacity-20 group">
                        <div className="h-[1px] w-full bg-slate-200" />
                        <div className="flex justify-between items-center">
                            <div className="flex gap-1">
                                {[1,2,3,4].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-300" />)}
                            </div>
                            <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Promote Education · 2026</span>
                        </div>
                        <div className="h-[1px] w-1/2 bg-slate-200" />
                    </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Article Content */}
          <article className="lg:col-span-9 space-y-24 pb-32">
            
            {/* Overview Section */}
            <section id="overview" className="scroll-mt-32">
              <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">Institutional Foundation</h2>
              <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed space-y-6">
                <p>
                  Established in <strong>2018</strong> as a beacon of medical progress, <strong><Link href="/colleges/aiims-kalyani" className="text-slate-900 hover:text-sky-500 transition-colors">AIIMS Kalyani</Link></strong> was founded under the prestigious <em>Pradhan Mantri Swasthya Suraksha Yojana (PMSSY)</em>. Located in the Nadia district of West Bengal, the institution spans a massive <strong>179-acre campus</strong> designed to meet the growing healthcare demands of Eastern India.
                </p>
                <p>
                  As an <strong>Institute of National Importance</strong>, AIIMS Kalyani is more than just a college; it is a specialized healthcare ecosystem where academic rigor meets clinical innovation. The campus is strategically located 50 kms from Kolkata, ensuring seamless connectivity for students and patients alike.
                </p>
              </div>
            </section>

            {/* Courses Table Section */}
            <section id="courses" className="scroll-mt-32">
              <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">Academic Portfolio & Eligibility</h2>
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
                      { 
                        name: <Link href="/courses" className="hover:underline">MBBS</Link>, 
                        marks: "60% for Gen/OBC (PCB + English), 50% for SC/ST", 
                        exam: <Link href="/exams/neet-ug" className="hover:underline">NEET UG</Link> 
                      },
                      { 
                        name: <Link href="/courses" className="hover:underline">B.Sc. Nursing (Hons.)</Link>, 
                        marks: "55% aggregate for Gen/OBC, 50% for SC/ST", 
                        exam: <Link href="/exams/aiims-entrance" className="hover:underline">AIIMS Entrance</Link> 
                      }
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

                <div>
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-indigo-500" />
                    Postgraduate & Super-Speciality
                  </h3>
                  <div className="border-t border-slate-100 divide-y divide-slate-50">
                    {[
                      { name: <Link href="/courses" className="hover:text-indigo-500">MD / MS Programs</Link>, req: <><Link href="/courses" className="text-slate-900 font-bold hover:underline">MBBS</Link> + 1 Year Internship</>, exam: <Link href="/exams/ini-cet" className="text-indigo-600 font-bold hover:underline">INI CET</Link> },
                      { name: <Link href="/courses" className="hover:text-indigo-500">DM / M.Ch</Link>, req: "Postgraduate Specialization", exam: <Link href="/exams/ini-ss" className="text-indigo-600 font-bold hover:underline">INI SS</Link> },
                      { name: "Ph.D. Research", req: <><Link href="/courses" className="text-slate-900 font-bold hover:underline">MD/MS/M.Sc</Link> in relevant field</>, exam: "Entrance + Interview" }
                    ].map((c, i) => (
                      <div key={i} className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <p className="font-bold text-slate-900 text-lg mb-1">{c.name}</p>
                          <p className="text-sm text-slate-400 font-medium">{c.req}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-black text-indigo-500 uppercase tracking-widest">{c.exam}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Admission Process Section */}
            <section id="admission" className="scroll-mt-32">
              <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">Admission Protocol</h2>
              <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed space-y-8">
                <p>
                  Securing a seat at AIIMS Kalyani is a multi-step journey that begins with national-level entrance examinations. The process is strictly merit-based and varies by program level:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 not-prose py-8">
                    <div className="space-y-4">
                        <div className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">01</span>
                            Examination Phase
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Candidates must achieve a qualifying percentile in <Link href="/exams/neet-ug" className="text-slate-900 font-bold hover:underline">NEET UG</Link> for MBBS or <Link href="/exams/ini-cet" className="text-slate-900 font-bold hover:underline">INI CET</Link> for postgraduate programs.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">02</span>
                            Counselling & Seat Allocation
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Qualified students participate in the <a href="https://mcc.nic.in/" target="_blank" rel="noopener noreferrer" className="text-slate-900 font-bold hover:underline">MCC Centralized Counselling</a> where seats are allocated based on rank and preference.
                        </p>
                    </div>
                </div>
                <div className="p-8 bg-slate-950 text-white rounded-sm">
                    <p className="m-0 text-lg italic font-serif leading-relaxed opacity-90">
                        "The AIIMS Kalyani admission process is highly competitive due to the institution's growing reputation and limited seat capacity."
                    </p>
                </div>
              </div>
            </section>

            {/* Infrastructure Section */}
            <section id="facilities" className="scroll-mt-32">
              <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">World-Class Infrastructure</h2>
              <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
                <p>
                  The infrastructure at AIIMS Kalyani is built to support the next generation of medical practitioners. Key highlights of the 179-acre campus include:
                </p>
                <ul className="not-prose grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 mt-10">
                    {[
                        "Advanced Research Laboratories",
                        "High-Fidelity Simulation Centers",
                        "Digital Smart Classrooms",
                        "Modern Central Library",
                        "Fully Operational Super-Speciality Hospital",
                        "Independent Hostel Blocks",
                        "Comprehensive Sports Facilities"
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-4 py-2 border-b border-slate-50">
                            <CheckCircle2 size={16} className="text-sky-500 shrink-0" />
                            <span className="text-sm font-bold text-slate-700">{item}</span>
                        </li>
                    ))}
                </ul>
              </div>
            </section>

            {/* Student Life Section */}
            <section id="student-life" className="scroll-mt-32">
                <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">Academic Life & Culture</h2>
                <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
                    <p>
                        Beyond the intensive curriculum, students at AIIMS Kalyani are encouraged to engage in a vibrant campus life that balances clinical training with holistic development. This includes participation in:
                    </p>
                    <p className="font-bold text-slate-900">
                        Cultural Festivals · Sports Activities · Medical Conferences · Social Outreach · National Research Projects
                    </p>
                </div>
            </section>

            {/* Placements Section */}
            <section id="careers" className="scroll-mt-32">
                <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">Career Growth & Placements</h2>
                <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
                    <p>
                        Graduates from AIIMS Kalyani are highly sought after in the healthcare sector. The institution provides mandatory rotating internships within its super-speciality hospital, offering exposure to diverse clinical scenarios.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-8">
                        {["Research Paths", "Government Services", "International Pathways", "Postgraduate Specialization"].map((tag, i) => (
                            <span key={i} className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-sm border border-slate-200">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="scroll-mt-32 pt-20 border-t border-slate-100">
                <h2 className="text-3xl font-black mb-12 text-slate-900 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-12">
                    {[
                        { 
                            q: "Is AIIMS Kalyani a good choice for MBBS?", 
                            a: "Yes, AIIMS Kalyani is recognized as one of India's top emerging medical institutions, offering world-class faculty and clinical exposure." 
                        },
                        { 
                            q: "How competitive is the admission process?", 
                            a: <>Extremely. Only the top rankers in national entrance exams like <Link href="/exams/neet-ug" className="text-slate-900 font-bold hover:underline">NEET UG</Link> and <Link href="/exams/ini-cet" className="text-slate-900 font-bold hover:underline">INI CET</Link> secure seats at AIIMS Kalyani.</> 
                        },
                        {
                            q: "Who governs the admission and seat intake?",
                            a: <>Seat intake is monitored by the <a href="https://www.nmc.org.in/" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">National Medical Commission (NMC)</a>, and admissions are conducted via <a href="https://mcc.nic.in/" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">MCC</a> centralized counselling.</>
                        }
                    ].map((faq, i) => (
                        <div key={i}>
                            <h4 className="text-lg font-black text-slate-900 mb-3">{faq.q}</h4>
                            <p className="text-slate-500 leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-slate-50 p-12 rounded-sm border border-slate-100 text-center">
                <h2 className="text-3xl font-black text-slate-900 mb-6">Securing Your Future</h2>
                <p className="text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed">
                    Understanding the AIIMS Kalyani courses and admission process is the first step toward a prestigious medical career.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button 
                        onClick={() => handleAction('brochure')}
                        className="px-10 py-4 bg-slate-900 text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-lg shadow-slate-900/10 hover:bg-sky-500 transition-all"
                    >
                        Request Admission Brochure
                    </button>
                    <button className="px-10 py-4 bg-white border border-slate-200 text-slate-900 font-bold text-xs uppercase tracking-widest rounded-full hover:bg-slate-50 transition-all">
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
        collegeName="AIIMS Kalyani"
        collegeId="aiims-kalyani"
        stream="Medical"
        mode={modalMode}
      />
    </main>
  )
}
