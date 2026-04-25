import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowLeft, Share2, Clock, Calendar, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'INI CET 2026 Complete Syllabus Breakdown | Promote Education',
  description: 'Subject-wise INI CET syllabus for 2026. Pre-clinical, Para-clinical, and Clinical subjects with high-yield topic weightage analysis for AIIMS, JIPMER, and PGIMER PG admissions.',
}

export default function Page() {
  const syllabus = [
    {
      subject: 'Pre-Clinical Subjects',
      weight: '~20%',
      color: 'sky',
      topics: [
        { name: 'Anatomy', detail: 'Gross Anatomy, Embryology, Neuroanatomy, Histology' },
        { name: 'Physiology', detail: 'Cardiovascular, Respiratory, Renal, Neurophysiology, Endocrine' },
        { name: 'Biochemistry', detail: 'Enzymology, Metabolism, Molecular Biology, Clinical Biochemistry' },
      ]
    },
    {
      subject: 'Para-Clinical Subjects',
      weight: '~30%',
      color: 'violet',
      topics: [
        { name: 'Pathology', detail: 'General Pathology, Systemic Pathology, Haematology, Histopathology images' },
        { name: 'Microbiology', detail: 'Bacteriology, Virology, Mycology, Parasitology, Immunology' },
        { name: 'Pharmacology', detail: 'General Principles, Systemic Pharmacology, Drug interactions, Recent drugs' },
        { name: 'Forensic Medicine', detail: 'Thanatology, Toxicology, Medical Jurisprudence' },
        { name: 'Community Medicine (PSM)', detail: 'Epidemiology, Biostatistics, Health Programs, Environment' },
      ]
    },
    {
      subject: 'Clinical — Medicine & Allied',
      weight: '~30%',
      color: 'emerald',
      topics: [
        { name: 'General Medicine', detail: 'Cardiology, Pulmonology, Nephrology, Neurology, GI, Endocrinology' },
        { name: 'Psychiatry', detail: 'Major disorders, DSM-5 criteria, Psychopharmacology' },
        { name: 'Dermatology', detail: 'Common skin disorders, STIs, Drug reactions' },
        { name: 'Radiology', detail: 'X-ray, CT, MRI interpretations — image-heavy in INI CET' },
      ]
    },
    {
      subject: 'Clinical — Surgery & Allied',
      weight: '~20%',
      color: 'rose',
      topics: [
        { name: 'General Surgery', detail: 'GI Surgery, Oncology, Trauma, Vascular Surgery' },
        { name: 'Orthopaedics', detail: 'Fractures, Joints, Bone tumors, Spine' },
        { name: 'ENT', detail: 'Ear diseases, Nose & Throat, Audiometry' },
        { name: 'Ophthalmology', detail: 'Eye anatomy, Common disorders, LASIK, Retina' },
        { name: 'OBG & Paediatrics', detail: 'Obstetrics, Gynaecology, Neonatology, Paediatric emergencies' },
      ]
    },
  ]

  const colorMap: Record<string, string> = {
    sky: 'bg-sky-50 border-sky-200 text-sky-700',
    violet: 'bg-violet-50 border-violet-200 text-violet-700',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    rose: 'bg-rose-50 border-rose-200 text-rose-700',
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/exams/ini-cet" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-900 transition-all mb-10 uppercase tracking-widest">
            <ArrowLeft size={14} /> Back to INI CET
          </Link>
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-md">Syllabus</span>
              <div className="flex items-center gap-2 text-slate-400 text-[11px] font-medium">
                <Calendar size={12} /> April 25, 2026
                <span className="w-1 h-1 rounded-full bg-slate-200" />
                <Clock size={12} /> 12 min read
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-8">
              INI CET 2026<br /><span className="text-slate-400">Complete Syllabus</span>
            </h1>
            <div className="flex items-center justify-between py-6 border-y border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">PE</div>
                <div>
                  <div className="text-sm font-black text-slate-900">Promote Education Editorial</div>
                  <div className="text-[11px] text-slate-400 font-medium">Verified by Medical Experts</div>
                </div>
              </div>
              <button className="p-2.5 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all"><Share2 size={18} /></button>
            </div>
          </header>

          <article className="prose prose-slate max-w-none">
            <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 mb-12">
              <h3 className="text-lg font-black text-slate-900 mb-3 mt-0">Executive Summary</h3>
              <p className="text-slate-700 text-[15px] leading-relaxed mb-0">
                INI CET 2026 tests all subjects from your MBBS curriculum with a strong clinical bias. 
                Clinical subjects (Medicine, Surgery, OBG, Paeds) account for approximately <strong>50% of the paper</strong>, 
                Para-clinicals contribute ~30%, and Pre-clinicals ~20%. 
                Image-based questions are a hallmark of INI CET — prepare extensively for radiology and histopathology slides.
              </p>
            </div>

            {syllabus.map((section, i) => (
              <div key={i} className="mb-14">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black text-slate-900 mt-0 mb-0">{section.subject}</h2>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-black border ${colorMap[section.color]}`}>
                    Weightage: {section.weight}
                  </span>
                </div>
                <div className="space-y-3">
                  {section.topics.map((t, j) => (
                    <div key={j} className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2 mb-1">
                        <BookOpen size={14} className="text-slate-400" />
                        <span className="text-sm font-black text-slate-900">{t.name}</span>
                      </div>
                      <p className="text-[13px] text-slate-500 ml-5 mb-0">{t.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="my-12 p-10 bg-slate-900 rounded-[2.5rem] text-white">
              <h3 className="text-xl font-bold mb-3">High-Yield INI CET Insight</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-0">
                INI CET is notorious for image-based questions — radiology X-rays, CT findings, histopathology slides, and clinical photographs. 
                These can account for 20-25% of the paper. Platforms like Marrow, PrepLadder, and DAMS provide curated image banks. 
                Also read our guide on{' '}
                <Link href="/articles/ini-cet-high-yield-topics" className="text-sky-400 hover:underline">high-yield topics for INI CET</Link>.
              </p>
            </div>

            <h2 className="text-2xl font-black text-slate-900 mb-6">Related Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'INI CET 2026 Eligibility', href: '/articles/ini-cet-eligibility-2026' },
                { title: 'INI CET High-Yield Topics', href: '/articles/ini-cet-high-yield-topics' },
                { title: 'INI CET vs NEET PG', href: '/articles/ini-cet-vs-neet-pg' },
                { title: 'AIIMS PG Seat Matrix 2026', href: '/articles/aiims-pg-seat-matrix' },
              ].map(link => (
                <Link key={link.href} href={link.href} className="p-5 rounded-2xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50 transition-all group">
                  <div className="text-sm font-black text-slate-900 group-hover:text-emerald-700">{link.title} →</div>
                </Link>
              ))}
            </div>
          </article>

          <div className="mt-16 pt-16 border-t border-slate-100 text-center">
            <h3 className="text-2xl font-black text-slate-900 mb-3">Download INI CET Syllabus PDF</h3>
            <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto">Get the complete syllabus PDF with topic weightage directly in your inbox.</p>
            <div className="flex max-w-md mx-auto gap-2">
              <input type="email" placeholder="Enter your email" className="flex-1 px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
              <button className="px-7 py-3.5 bg-slate-900 text-white text-sm font-bold rounded-2xl hover:bg-emerald-600 transition-all">Get PDF</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
