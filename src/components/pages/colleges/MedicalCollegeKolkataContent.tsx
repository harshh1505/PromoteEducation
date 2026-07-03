'use client'
// Trigger re-save

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { 
  GraduationCap, BookOpen, Building2, Users, 
  ArrowRight, CheckCircle2, HelpCircle, MapPin, 
  Star, Share2, Download, Heart, Info, Briefcase, Globe, FileText,
  Search, ShieldCheck, Award
} from 'lucide-react'
import BrochureModal from '@/components/ui/BrochureModal'
import { useLeadCapture } from '@/hooks/useLeadCapture'
import { cn } from '@/lib/utils'
import { featuredColleges } from '@/lib/data/featuredColleges'
import Link from 'next/link'

export default function MedicalCollegeKolkataContent() {
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
    { id: 'admission', label: 'Admission Process' },
    { id: 'cutoff', label: 'NEET Cutoff' },
    { id: 'courses', label: 'Courses & Fees' },
    { id: 'ranking', label: 'Rankings' },
    { id: 'research', label: 'Research & Innovation' },
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
                <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-sm">
                  Legacy Institution
                </span>
                <span className="text-slate-400 text-xs font-medium">Updated: April 25, 2026</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[0.95] mb-8">
                Medical College <span className="text-sky-500 italic">Kolkata</span>
              </h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                A legacy since 1835: The comprehensive 2026 guide to admissions, cutoffs, and academic excellence at Asia's oldest medical school.
              </p>
            </div>
            <div className="flex items-center gap-4 pb-2">
                <div className="text-right hidden md:block">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">NIRF Medical #41</p>
                    <p className="text-sm font-bold text-slate-900">Estb. 1835 · West Bengal</p>
                </div>
                <button 
                  onClick={() => handleAction('details')}
                  className="px-8 py-4 bg-slate-900 text-white font-bold text-sm rounded-full hover:bg-sky-500 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
                >
                  Apply for 2026
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

              <div className="space-y-12 px-4 pt-10 border-t border-slate-100">
                
                {/* Institutional Badge */}
                <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                        <ShieldCheck size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-indigo-900 uppercase tracking-widest">Historical Landmark</p>
                        <p className="text-[11px] text-indigo-700 font-medium leading-tight italic">Established in 1835</p>
                    </div>
                </div>

                {/* Quick Performance Stats */}
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Institutional Fact Sheet</p>
                    <div className="space-y-6">
                        {[
                            { label: "Founded", value: "Feb 20, 1835", icon: Globe },
                            { label: "Approval", value: "NMC (National)", icon: CheckCircle2 },
                            { label: <Link href="/colleges" className="hover:text-sky-500 transition-colors">NIRF Rank</Link>, value: "41 (India)", icon: Star },
                            { label: "State Standing", value: "#2 in WB", icon: Award }
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

                {/* Also Read Section (Filtered for West Bengal) */}
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Also Read</p>
                    <div className="space-y-6">
                        {featuredColleges
                            .filter(c => c.state === 'West Bengal' && c.id !== 'medical-college-kolkata')
                            .slice(0, 3)
                            .map((c, i) => (
                            <Link 
                                key={c.id} 
                                href={`/colleges/${c.id}`}
                                className="group block"
                            >
                                <p className="text-[10px] font-black text-sky-500 uppercase tracking-widest mb-1 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                                    <FileText size={10} /> Experts View
                                </p>
                                <p className="text-xs font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                                    {c.name}: 2026 Direct Admission Guide
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Expert Guidance Box */}
                <div className="p-6 bg-slate-900 rounded-3xl text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/20 rounded-full blur-2xl" />
                    <p className="text-[9px] font-black text-sky-400 uppercase tracking-widest mb-4">Promote Education Exclusive</p>
                    <h4 className="text-sm font-black mb-2">Struggling with choice filling?</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed mb-6">Get professional assistance for WBMCC and MCC centralized counselling.</p>
                    <button className="w-full py-3 bg-white text-slate-900 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-sky-50 transition-all">
                        Connect with expert
                    </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Article Content */}
          <article className="lg:col-span-9 space-y-24 pb-32">
            
            {/* Overview Section */}
            <section id="overview" className="scroll-mt-32">
              <h2 className="text-4xl font-black mb-10 text-slate-900 tracking-tight leading-tight">
                Calcutta Medical College: <br/>
                <span className="text-slate-400">The Pioneer of Modern Medicine in Asia</span>
              </h2>
              <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed space-y-6">
                <p>
                  <strong>Medical College Kolkata</strong>, historically known as <em>Calcutta Medical College</em>, stands as an architectural and academic landmark in the heart of <Link href="/colleges" className="text-sky-600 hover:underline">West Bengal</Link>. Established in <strong>1835</strong>, it was the first institution in Asia to teach modern medicine.
                </p>
                <p>
                  The institution's legacy is defined by its illustrious alumni who have shaped the history of Indian healthcare. Notable figures like <strong>Dr. Bidhan Chandra Roy</strong> (2nd CM of West Bengal), <strong>David Hare</strong> (Founder of Hare School), and <strong>Upendranath Brahmachari</strong> (Discoverer of the treatment for Kala-azar) are products of this prestigious institution.
                </p>
                <div className="bg-slate-50 p-8 border-l-4 border-slate-900 my-10">
                    <p className="m-0 text-slate-900 font-bold italic">
                        "Admissions at Medical College Kolkata officially commenced on February 20, 1835, marking the dawn of standardized medical education in the subcontinent."
                    </p>
                </div>
              </div>
            </section>

            {/* Admission Process Section */}
            <section id="admission" className="scroll-mt-32">
              <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">Admission Protocol 2026</h2>
              <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed space-y-8">
                <p>
                  While thousands of aspirants dream of a seat at Calcutta Medical College, the selection remains rigorous due to extremely limited seat capacity. Admissions are 100% merit-based, governed by national-level entrance scores.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
                    <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 mb-4">
                            <span className="font-black text-sm">UG</span>
                        </div>
                        <h4 className="font-black text-slate-900 mb-2 uppercase tracking-wide text-sm"><Link href="/courses" className="hover:text-sky-500">MBBS Admissions</Link></h4>
                        <p className="text-[13px] text-slate-500 leading-relaxed">
                            Requires a qualifying rank in the <Link href="/exams/neet-ug" className="text-sky-600 font-bold hover:underline">NEET UG</Link> examination, followed by centralized counselling.
                        </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
                            <span className="font-black text-sm">PG</span>
                        </div>
                        <h4 className="font-black text-slate-900 mb-2 uppercase tracking-wide text-sm"><Link href="/courses" className="hover:text-sky-500">MD/MS Admissions</Link></h4>
                        <p className="text-[13px] text-slate-500 leading-relaxed">
                            Qualified candidates must pass the <Link href="/exams/neet-pg" className="text-sky-600 font-bold hover:underline">NEET PG</Link> exam to secure seats in various clinical and non-clinical specialities.
                        </p>
                    </div>
                </div>

                <div className="space-y-6 pt-10">
                    <h3 className="text-xl font-bold text-slate-900">Step-by-Step Selection:</h3>
                    <ol className="not-prose space-y-4">
                        {[
                            { step: "Examination", desc: <>Qualify for <Link href="/exams/neet-ug" className="text-sky-600 font-bold hover:underline">NEET UG</Link> with a high national percentile.</> },
                            { step: "Registration", desc: <>Register on the <a href="https://mcc.nic.in/" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">MCC (All India Quota)</a> or <a href="https://wbmcc.nic.in/" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">WBMCC (State Quota)</a> portals.</> },
                            { step: "Choice Filling", desc: <>Select '<Link href="/colleges/medical-college-kolkata" className="text-sky-600 hover:underline">Medical College Kolkata</Link>' as your first preference during the window.</> },
                            { step: "Seat Allotment", desc: "Based on rank, category, and availability, seats are assigned to candidates." }
                        ].map((s, i) => (
                            <li key={i} className="flex gap-4">
                                <span className="font-black text-slate-200 text-3xl leading-none">0{i+1}</span>
                                <div>
                                    <p className="font-black text-slate-900 uppercase text-[11px] tracking-widest mb-1">{s.step}</p>
                                    <p className="text-sm text-slate-500">{s.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
              </div>
            </section>

            {/* Cutoff Section */}
            <section id="cutoff" className="scroll-mt-32">
              <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">NEET Cutoff Insights</h2>
              <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                Historically, Medical College Kolkata maintains one of the highest cutoffs in West Bengal and Eastern India.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                      <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Historical Benchmarks</h3>
                      <div className="space-y-4">
                          <div className="flex justify-between items-center py-3 border-b border-slate-50">
                              <span className="text-sm font-bold text-slate-600">General Category</span>
                              <span className="text-sm font-black text-slate-900">~586</span>
                          </div>
                          <div className="flex justify-between items-center py-3 border-b border-slate-50">
                              <span className="text-sm font-bold text-slate-600">ST Category</span>
                              <span className="text-sm font-black text-slate-900">~485</span>
                          </div>
                          <div className="flex justify-between items-center py-3 border-b border-slate-50">
                              <span className="text-sm font-bold text-slate-600">Safe Score (Historical)</span>
                              <span className="text-sm font-black text-emerald-600">680+</span>
                          </div>
                      </div>
                  </div>
                  <div className="p-8 bg-slate-900 rounded-3xl text-white">
                      <p className="text-[10px] font-black text-sky-400 uppercase tracking-widest mb-6">2026 Estimations</p>
                      <div className="space-y-8">
                          <div>
                              <p className="text-[11px] text-slate-400 uppercase tracking-widest mb-2">All India Quota (AIQ)</p>
                              <p className="text-3xl font-black">635+</p>
                          </div>
                          <div className="pt-8 border-t border-white/10">
                              <p className="text-[11px] text-slate-400 uppercase tracking-widest mb-2">State Quota (West Bengal)</p>
                              <p className="text-3xl font-black text-sky-400">570+</p>
                          </div>
                      </div>
                  </div>
              </div>
            </section>

            {/* Courses & Fees Section */}
            <section id="courses" className="scroll-mt-32">
              <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">Academic Portfolio & Fee Structure</h2>
              <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed mb-12">
                <p>
                  The institution offers a wide spectrum of programs including <Link href="/courses" className="text-sky-600 hover:underline">Undergraduate</Link>, <Link href="/courses" className="text-sky-600 hover:underline">Postgraduate Degree courses</Link>, Para-medical, and Nursing specialties.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div>
                      <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-sky-500" />
                        Top PG Specialties
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                          {[
                              "MS ANATOMY", "MS ENT", "MD GYNAE+OBST", "MS ORTHOPEDICS", 
                              "MD FSM", "MS GENERAL SURGERY", "MD PSYCHIATRY", "MD ANAESTHESIA",
                              "MD MICROBIOLOGY", "MD PEDIATRICS", "MS OPHTHALMOLOGY", "MD DERMATOLOGY"
                          ].map((item, i) => (
                              <div key={i} className="flex items-center gap-2">
                                  <div className="w-1 h-1 rounded-full bg-slate-300" />
                                  <Link href="/courses" className="text-[11px] font-black text-slate-600 uppercase tracking-wide hover:text-sky-500 transition-colors">{item}</Link>
                              </div>
                          ))}
                      </div>
                  </div>
                  <div>
                      <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-indigo-500" />
                        Para-Medical Courses
                      </h3>
                      <div className="space-y-3">
                          {[
                              "D OPT (Optometry)", "DRD (Radiography)", "DCLT (Cath Lab)", 
                              "DNEP (Neuro Electro Physiology)", "DRT DPFT (Perfusion Tech)", "ECG (Electrocardiography)"
                          ].map((item, i) => (
                              <div key={i} className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-700">
                                  {item}
                              </div>
                          ))}
                      </div>
                  </div>
              </div>

              <div className="mt-20 p-10 bg-slate-50 border border-slate-200 rounded-sm">
                  <div className="max-w-2xl">
                      <h3 className="text-2xl font-black mb-4">Investment in Excellence</h3>
                      <p className="text-slate-500 leading-relaxed mb-8">
                          Being a public state-run institution, Medical College Kolkata offers premium medical education at a highly subsidized rate.
                      </p>
                      <div className="flex items-baseline gap-4">
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Average Annual Fee:</span>
                          <span className="text-4xl font-black text-slate-900">₹19,000 — ₹48,000</span>
                      </div>
                  </div>
              </div>
            </section>

            {/* Ranking Section */}
            <section id="ranking" className="scroll-mt-32">
              <h2 className="text-3xl font-black mb-10 text-slate-900 tracking-tight">Institutional Rankings</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-8 border border-slate-100 rounded-3xl text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">NIRF India 2024</p>
                      <p className="text-5xl font-black text-slate-900 mb-2">#41</p>
                      <p className="text-xs font-bold text-slate-500">National <Link href="/colleges" className="hover:text-sky-500">Medical Ranking</Link></p>
                  </div>
                  <div className="p-8 border border-slate-100 rounded-3xl text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">West Bengal State</p>
                      <p className="text-5xl font-black text-sky-500 mb-2">#02</p>
                      <p className="text-xs font-bold text-slate-500">Best Medical College</p>
                  </div>
                  <div className="p-8 bg-slate-900 rounded-3xl text-center text-white">
                      <p className="text-[10px] font-black text-sky-400 uppercase tracking-widest mb-4">Accreditation</p>
                      <p className="text-2xl font-black mb-2">NMC Approved</p>
                      <p className="text-xs font-medium text-slate-400 leading-relaxed">National Medical Commission Certified</p>
                  </div>
              </div>
            </section>

            {/* Research Section */}
            <section id="research" className="scroll-mt-32">
                <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">Research & Innovation Hub</h2>
                <p className="text-lg text-slate-500 mb-12 leading-relaxed">
                    Continuing its 190-year legacy of clinical research, the institution maintains multiple specialized committees.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        "MRU COMMITTEE", "Regional Geriatric Committee", 
                        "Scientific Advisory Committee", "Curriculum Committee"
                    ].map((c, i) => (
                        <div key={i} className="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center justify-center text-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sky-500 shadow-sm">
                                <Info size={14} />
                            </div>
                            <span className="text-[10px] font-black text-slate-900 leading-tight uppercase tracking-wider">{c}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="scroll-mt-32 pt-20 border-t border-slate-100">
                <h2 className="text-3xl font-black mb-12 text-slate-900 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-12">
                    {[
                        { 
                            q: "What is a safe score for Medical College Kolkata?", 
                            a: <>Historically, a score of 680+ in <Link href="/exams/neet-ug" className="text-sky-600 font-bold hover:underline">NEET UG</Link> is considered safe for General category admission under All India Quota.</> 
                        },
                        { 
                            q: "How many seats are available for <Link href='/courses' className='hover:underline'>MBBS</Link>?", 
                            a: <>Seat allocation is determined annually by the <a href="https://www.nmc.org.in/" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">NMC</a>. For precise 2026 intake, please refer to the latest <a href="https://mcc.nic.in/" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">MCC</a> or <a href="https://wbmcc.nic.in/" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">WBMCC</a> notifications.</> 
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
                <h2 className="text-3xl font-black text-slate-900 mb-6">Start Your Medical Journey</h2>
                <p className="text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed">
                    Navigating the admissions for Asia's oldest medical college requires structured guidance and strategic choice filling.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button 
                        onClick={() => handleAction('brochure')}
                        className="px-10 py-4 bg-slate-900 text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-lg shadow-slate-900/10 hover:bg-sky-500 transition-all"
                    >
                        Download MCK Brochure
                    </button>
                    <button 
                        onClick={() => handleAction('remind')}
                        className="px-10 py-4 bg-white border border-slate-200 text-slate-900 font-bold text-xs uppercase tracking-widest rounded-full hover:bg-slate-50 transition-all"
                    >
                        Talk to a Counselor
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
        collegeName="Medical College Kolkata"
        collegeId="medical-college-kolkata"
        stream="Medical"
        mode={modalMode}
      />
    </main>
  )
}
