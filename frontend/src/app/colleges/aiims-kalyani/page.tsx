'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { 
  GraduationCap, BookOpen, Building2, Users, 
  ArrowRight, CheckCircle2, HelpCircle, MapPin, 
  Star, Share2, Download, Heart, Info, Briefcase, Globe 
} from 'lucide-react'
import BrochureModal from '@/components/ui/BrochureModal'
import { useLeadCapture } from '@/hooks/useLeadCapture'
import { cn } from '@/lib/utils'

export default function AIIMSKalyaniPage() {
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

  const courses = [
    { name: "MBBS", eligibility: "Class 12 (PCB + English) with 60% (Gen/OBC)", entrance: "NEET-UG" },
    { name: "B.Sc. Nursing (Hons.)", eligibility: "Class 12 (PCB + English) with 55% (Gen/OBC)", entrance: "AIIMS B.Sc Entrance" },
    { name: "MD / MS", eligibility: "MBBS degree + 1-year internship", entrance: "INI-CET" },
    { name: "DM / M.Ch", eligibility: "MD/MS in relevant specialty", entrance: "INI-SS" },
    { name: "Ph.D. Programs", eligibility: "MD/MS/M.Sc or equivalent", entrance: "Entrance + Interview" }
  ]

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-20">
        <div className="h-[400px] md:h-[500px] relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop" 
            className="w-full h-full object-cover"
            alt="AIIMS Kalyani Campus"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative -mt-40 pb-12">
          <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">
            <div className="p-8 md:p-12 flex flex-col md:flex-row gap-10 items-start md:items-end">
              <div className="w-28 h-28 md:w-36 md:h-36 bg-white rounded-3xl shadow-xl p-4 flex-shrink-0 -mt-20 md:-mt-24 border border-slate-100 ring-8 ring-white">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Zz8z9X_v8Q9yF_X_Xw&s" 
                  className="w-full h-full object-contain"
                  alt="AIIMS Kalyani Logo"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-4 py-1.5 bg-sky-100 text-sky-700 text-[11px] font-black uppercase tracking-[0.2em] rounded-full">
                    Medical
                  </span>
                  <span className="px-4 py-1.5 bg-indigo-100 text-indigo-700 text-[11px] font-black uppercase tracking-[0.2em] rounded-full">
                    Institute of National Importance
                  </span>
                  <div className="flex items-center gap-1 text-emerald-600 text-xs font-black uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    <CheckCircle2 size={14} /> Verified
                  </div>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter leading-tight">
                  AIIMS Kalyani
                </h1>
                
                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-slate-500 text-sm font-bold">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-sky-500" />
                    Kalyani, West Bengal
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={18} className="text-amber-500 fill-amber-500" />
                    4.9 / 5.0 Rating
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={18} className="text-slate-400" />
                    Estb. 2018
                  </div>
                </div>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <button 
                  onClick={() => handleAction('details')}
                  className="flex-1 md:flex-none px-10 py-4 bg-sky-500 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-sky-400 transition-all shadow-xl shadow-sky-500/20 active:scale-95"
                >
                  Apply Online
                </button>
                <button className="p-4 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all text-slate-400 hover:text-rose-500 shadow-sm">
                  <Heart size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Deep Insights */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Structured Overview */}
            <section className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full blur-3xl -z-0 opacity-50" />
              <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
                  <Info size={20} />
                </div>
                Institutional Overview
              </h2>
              
              <div className="prose prose-slate max-w-none relative z-10">
                <p className="text-slate-600 leading-loose mb-8">
                  <strong>AIIMS Kalyani</strong> has been one of India’s most promising institutions since its establishment in 2018. It was founded under the <strong>Pradhan Mantri Swasthya Suraksha Yojana (PMSSY)</strong> by the Government of India. Undoubtedly, the institution has redefined medical education in Eastern India with its advanced healthcare facilities, world-class academics, and research-driven environment.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  {[
                    { label: 'Campus Area', value: '179 Acres', icon: Building2, color: 'text-sky-500' },
                    { label: 'NIRF Rank 2024', value: 'TBA', icon: Award, color: 'text-amber-500' },
                    { label: 'Focus Area', value: 'National Importance', icon: Star, color: 'text-indigo-500' }
                  ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 text-center group hover:bg-white hover:shadow-xl transition-all duration-500">
                      <stat.icon className={cn("mx-auto mb-3 group-hover:scale-125 transition-transform", stat.color)} size={24} />
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                      <p className="text-base font-black text-slate-900">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <p className="text-slate-600 leading-loose">
                  The college is recognised as an <strong>Institute of National Importance</strong> under the AIIMS Act to reinforce the infrastructure and medical education in West Bengal and the surrounding regions. The campus is located in Basantapur, Kalyani, and offers exceptional connectivity via road and rail.
                </p>
              </div>
            </section>

            {/* Courses & Eligibility Table */}
            <section className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                  <GraduationCap size={20} />
                </div>
                Courses & Eligibility 2026
              </h2>
              
              <div className="overflow-x-auto border border-slate-100 rounded-3xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="p-5 font-black text-slate-900 text-xs uppercase tracking-widest">Course Name</th>
                      <th className="p-5 font-black text-slate-900 text-xs uppercase tracking-widest">Eligibility Criteria</th>
                      <th className="p-5 font-black text-slate-900 text-xs uppercase tracking-widest text-center">Entrance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course, i) => (
                      <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                        <td className="p-5 font-black text-slate-800 text-sm">{course.name}</td>
                        <td className="p-5 text-slate-600 text-sm leading-relaxed">{course.eligibility}</td>
                        <td className="p-5 text-center">
                          <span className="px-4 py-1 bg-sky-50 text-sky-600 text-[10px] font-black rounded-full border border-sky-100 uppercase tracking-widest">
                            {course.entrance}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Infrastructure Insight */}
            <section className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                  <Building2 size={20} />
                </div>
                Infrastructure & Facilities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="prose prose-slate">
                  <p className="text-slate-600 leading-loose">
                    AIIMS Kalyani offers exceptional labs, advanced simulation centers and smart classrooms along with modern central library, sports complexes, separate hostel facilities, and a fully operational super-speciality hospital. This helps the aspirants gain hands-on clinical experience.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Central Library', icon: BookOpen },
                    { label: 'Smart Labs', icon: Building2 },
                    { label: 'Sports Complex', icon: Globe },
                    { label: 'Hostel Block', icon: Users }
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-2xl flex flex-col items-center gap-2 text-center">
                      <item.icon className="text-sky-500" size={20} />
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                  <HelpCircle size={20} />
                </div>
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {[
                  { q: "Is AIIMS Kalyani a good choice for MBBS?", a: "Yes, AIIMS Kalyani is one of the top emerging AIIMS institutes in West Bengal, India, offering world-class medical training." },
                  { q: "What is the admission process for MBBS?", a: "Admission is based on NEET-UG scores, followed by centralized counselling conducted by the Medical Counselling Committee (MCC)." }
                ].map((faq, i) => (
                  <div key={i} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                    <h4 className="font-black text-slate-900 mb-3">{faq.q}</h4>
                    <p className="text-sm text-slate-500 leading-loose">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              
              {/* Premium CTA Box */}
              <div className="bg-slate-950 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-sky-500/20 rounded-full blur-[80px]" />
                <h3 className="text-2xl font-black mb-6 leading-tight relative z-10">Secure Your Seat in <span className="text-sky-400">AIIMS Kalyani</span></h3>
                <p className="text-slate-400 text-sm mb-10 leading-relaxed relative z-10">
                  Get expert-led counseling guidance and personalized admission support from India's most trusted educational consultants.
                </p>
                <div className="space-y-4 relative z-10">
                  <button 
                    onClick={() => handleAction('brochure')}
                    className="w-full py-5 bg-sky-500 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-sky-400 transition-all shadow-xl shadow-sky-500/40 flex items-center justify-center gap-3 group"
                  >
                    <Download size={18} className="group-hover:translate-y-1 transition-transform" />
                    Download Brochure
                  </button>
                  <button className="w-full py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white/10 transition-all">
                    Talk to Counselor
                  </button>
                </div>
              </div>

              {/* Quick Info Sidebar */}
              <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 mb-6 px-2">Key Highlights</h3>
                <div className="space-y-4">
                  {[
                    { label: "Founded", value: "2018" },
                    { label: "Status", value: "Institute of National Importance" },
                    { label: "Campus Size", value: "179 Acres" },
                    { label: "State", value: "West Bengal" },
                    { label: "Entrance", value: "NEET-UG / INI-CET" }
                  ].map((info, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{info.label}</span>
                      <span className="text-xs font-black text-slate-900">{info.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      <BrochureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        collegeName="AIIMS Kalyani"
        collegeId="wb-med-1"
        stream="Medical"
        mode={modalMode}
      />
    </main>
  )
}
