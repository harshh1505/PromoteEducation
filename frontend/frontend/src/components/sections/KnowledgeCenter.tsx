'use client'

import { GraduationCap, BookOpen, Building2, Users, ArrowRight, CheckCircle2, Info, Star, HelpCircle, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function KnowledgeCenter() {
  const faqs = [
    {
      q: "Is AIIMS Kalyani a good choice for MBBS?",
      a: "Yes, AIIMS Kalyani is one of the top emerging AIIMS institutes in West Bengal, India, offering world-class infrastructure and faculty."
    },
    {
      q: "What is the admission process for AIIMS Kalyani MBBS?",
      a: <>Admission to AIIMS Kalyani MBBS is based on <Link href="/exams/neet-ug" className="text-sky-600 font-bold hover:underline">NEET-UG</Link> scores, followed by centralized counselling conducted by the Medical Counselling Committee (MCC).</>
    }
  ]

  const courses = [
    { name: "MBBS", eligibility: "Class 12 (PCB + English) with 60% (Gen/OBC)", entrance: <Link href="/exams/neet-ug" className="hover:underline">NEET-UG</Link> },
    { name: "B.Sc. Nursing (Hons.)", eligibility: "Class 12 (PCB + English) with 55% (Gen/OBC)", entrance: <Link href="/exams/aiims-entrance" className="hover:underline">AIIMS B.Sc Entrance</Link> },
    { name: "MD / MS", eligibility: "MBBS degree + 1-year internship", entrance: <Link href="/exams/ini-cet" className="hover:underline">INI-CET</Link> },
    { name: "DM / M.Ch", eligibility: "MD/MS in relevant specialty", entrance: <Link href="/exams/ini-ss" className="hover:underline">INI-SS</Link> },
    { name: "Ph.D. Programs", eligibility: "MD/MS/M.Sc or equivalent", entrance: "Entrance + Interview" }
  ]

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="knowledge-center">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-sky-50 rounded-full blur-[120px] -z-10 opacity-50" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-indigo-50 rounded-full blur-[120px] -z-10 opacity-50" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-12 h-0.5 bg-sky-500" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">Featured Insight</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-6 leading-[1.1]">
            Comprehensive Guide to <span className="text-sky-500">AIIMS Kalyani</span> Admissions 2026
          </h2>
          <p className="text-slate-600 text-lg font-medium leading-relaxed">
            Everything you need to know about AIIMS Kalyani courses, admission process, and infrastructure. Established under PMSSY, redefining healthcare in Eastern India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Overview */}
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-700 leading-loose">
                <strong>AIIMS Kalyani</strong> has been one of India’s most promising institutions since its establishment in 2018 under the <span className="text-sky-600 font-semibold">Pradhan Mantri Swasthya Suraksha Yojana (PMSSY)</span>. 
                The institution has redefined medical education in Eastern India with its advanced healthcare facilities, world-class academics, and research-driven environment.
              </p>
              
              <div className="my-8 p-6 bg-slate-50 border-l-4 border-sky-500 rounded-r-2xl flex gap-4">
                <MapPin className="text-sky-500 shrink-0" />
                <div>
                  <h4 className="text-slate-900 font-bold mb-1">Campus Location</h4>
                  <p className="text-sm text-slate-600 m-0">Basantapur, Kalyani, Nadia district, West Bengal. Spanning over 179 acres and just 50 kms from Kolkata.</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6">AIIMS Kalyani Courses & Eligibility</h3>
              <div className="overflow-hidden border border-slate-200 rounded-2xl shadow-sm mb-10">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="p-4 font-bold text-slate-900 text-sm">Course Name</th>
                      <th className="p-4 font-bold text-slate-900 text-sm">Eligibility Criteria</th>
                      <th className="p-4 font-bold text-slate-900 text-sm">Entrance Exam</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {courses.map((course, i) => (
                      <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 font-bold text-slate-800">{course.name}</td>
                        <td className="p-4 text-slate-600">{course.eligibility}</td>
                        <td className="p-4 font-semibold text-sky-600">{course.entrance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6">AIIMS Kalyani Admission Process</h3>
              <p className="text-slate-700 leading-loose">
                The competition for the <strong>AIIMS Kalyani admission process</strong> is unimaginably competitive. 
                For undergraduate programs like MBBS, students must qualify for <Link href="/exams/neet-ug" className="text-sky-600 font-bold hover:underline">NEET-UG</Link> followed by centralized MCC counselling. 
                Postgraduate candidates (MD/MS) need to clear the <Link href="/exams/ini-cet" className="text-sky-600 font-bold hover:underline">INI-CET</Link>, while superspeciality courses require <Link href="/exams/ini-ss" className="text-sky-600 font-bold hover:underline">INI-SS</Link> qualification.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Building2 className="text-sky-500" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">Advanced Infrastructure</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">Modern simulation centers, smart classrooms, and a fully operational super-speciality hospital for hands-on clinical experience.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Star className="text-indigo-500" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">Academic Excellence</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">Focus on evidence-based learning, interdisciplinary collaborations, and active participation in national medical research.</p>
                </div>
              </div>
            </div>

            {/* Career Opportunities */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Career Opportunities & Placements</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Compulsory Rotating Internships",
                  "Postgraduate Research Pathways",
                  "Central Government Medical Services",
                  "International Medical Fellowship Prep"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
                    <span className="text-sm font-bold text-emerald-900">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <HelpCircle className="text-sky-500" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                    <h4 className="font-bold text-slate-900 mb-2">{faq.q}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar / CTA Column */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              {/* Call to Action Box */}
              <div className="p-8 rounded-3xl bg-midnight text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-sky-500 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <h4 className="text-xl font-bold mb-4 relative z-10">Need Admission Guidance?</h4>
                <p className="text-white/70 text-sm mb-6 relative z-10 leading-relaxed">
                  Our expert counselors have helped thousands of students secure seats in top medical colleges like AIIMS Kalyani.
                </p>
                <button className="w-full py-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 group">
                  Get Free Counselling
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="mt-6 flex items-center gap-3 text-white/50 text-xs font-medium">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full bg-slate-700 border border-midnight" />
                    ))}
                  </div>
                  Join 10k+ successful students
                </div>
              </div>

              {/* Quick Info Sidebar */}
              <div className="p-6 rounded-3xl border border-slate-200 bg-white">
                <h4 className="font-bold text-slate-900 mb-4 px-2">Admission Highlights</h4>
                <div className="space-y-4">
                  {[
                    { label: "Founded", value: "2018" },
                    { label: "Status", value: "Institute of National Importance" },
                    { label: "Campus Size", value: "179 Acres" },
                    { label: "State", value: "West Bengal" },
                    { label: "Entrance", value: <>NEET-UG / INI-CET</> }
                  ].map((info, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                      <span className="text-xs font-medium text-slate-500">{info.label}</span>
                      <span className="text-xs font-bold text-slate-900">{info.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
