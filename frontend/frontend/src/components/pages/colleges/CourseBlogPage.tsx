'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Target, CheckCircle2, ChevronRight, GraduationCap, Building2, Star, Users, ArrowRight, Briefcase, ArrowUpRight } from 'lucide-react'
import { CourseInfo } from '@/types/courses'

interface CourseBlogPageProps {
  course: CourseInfo
  slug: string
}

export default function CourseBlogPage({ course, slug }: CourseBlogPageProps) {
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Course Not Found</h1>
            <p className="text-slate-500 mb-8">We couldn't find information about this course.</p>
            <Link href="/" className="text-sky-500 font-bold hover:underline">← Back to home</Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <article className="min-h-screen flex flex-col bg-white font-sans" itemScope itemType="https://schema.org/Course">
      <Navbar />

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800;900&family=Playfair+Display:wght@700;900&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'DM Sans', sans-serif; }
      ` }} />

      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": course.title,
            "description": course.description,
            "provider": {
              "@type": "Organization",
              "name": "Promote Education",
              "sameAs": "https://promoteducation.in"
            },
            "courseCode": slug.toUpperCase(),
            "hasCourseInstance": {
              "@type": "CourseInstance",
              "courseMode": "Full-time",
              "duration": course.duration
            }
          })
        }}
      />

      {/* ── HERO SECTION ──────────────────────────────────────────────────────── */}
      <div className="pt-40 pb-24 relative overflow-hidden bg-white">
        {/* Engineering Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        {/* Soft Background Accents */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[120px] opacity-20" 
          style={{ background: course.color }} />
        <div className="absolute top-1/2 -left-24 w-64 h-64 rounded-full blur-[100px] opacity-10 bg-indigo-500" />

        <div className="max-w-[1340px] mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-8">
                <span className="px-4 py-1.5 rounded-full bg-slate-100 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border border-slate-200">
                  Academic Hub 2026
                </span>
                <div className="h-[1px] w-12 bg-slate-200" />
              </div>

              <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-[0.9] mb-8">
                Mastering<br />
                <span style={{ color: course.color }}>{course.title}.</span>
              </h1>

              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mb-12">
                {course.fullName}. A comprehensive guide to admissions, career paths, and the future of {course.title} in the global landscape.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="px-10 py-5 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95">
                  Book Counselling →
                </button>
                <button className="px-10 py-5 rounded-2xl bg-white border-2 border-slate-100 text-slate-900 font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95">
                  Download Guide
                </button>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-slate-50 rounded-[40px] p-10 border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-500">
                  <course.icon size={80} style={{ color: course.color }} />
                </div>
                
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-10">Course Fast-Facts</h3>
                
                <div className="space-y-8">
                  {[
                    { label: 'Duration', value: course.duration, icon: BookOpen },
                    { label: 'Avg Salary', value: course.avgSalary, icon: Users },
                    { label: 'Academic Level', value: course.level, icon: GraduationCap },
                  ].map((fact, i) => (
                    <div key={i} className="flex gap-5 items-center">
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center" style={{ color: course.color }}>
                        <fact.icon size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{fact.label}</p>
                        <p className="text-lg font-extrabold text-slate-900 leading-none">{fact.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENT BODY ──────────────────────────────────────────────────────── */}
      <main className="max-w-[1340px] mx-auto px-8 py-24">
        
        {/* Overview & Eligibility */}
        <div className="grid lg:grid-cols-12 gap-20 mb-32">
          <div className="lg:col-span-7">
            <h2 className="font-display text-4xl font-black text-slate-900 mb-8 tracking-tight">Stream Overview</h2>
            <p className="text-lg text-slate-600 leading-relaxed font-medium mb-12">
              {course.description}
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-8">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Admission Eligibility</h3>
                <div className="flex-1 h-[1px] bg-slate-100" />
              </div>
              <div className="grid gap-4">
                {course.eligibility.map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-sky-200 transition-all group">
                    <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-sky-500 shadow-sm group-hover:bg-sky-500 group-hover:text-white transition-all">
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">Requirement {i+1}</p>
                      <p className="text-sm font-bold text-slate-700 leading-relaxed">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-32 p-10 rounded-[48px] bg-slate-900 text-white overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <h3 className="text-3xl font-black mb-4 leading-tight">Apply for 2026 Batch</h3>
                <p className="text-slate-400 text-sm font-medium mb-10 leading-relaxed">Get early access to scholarship notifications and admission alerts for {course.title}.</p>
                <div className="space-y-4">
                  <input className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl text-sm font-medium focus:outline-none focus:border-sky-500 transition-colors" placeholder="your@email.com" />
                  <button className="w-full py-5 bg-sky-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-sky-400 transition-all shadow-xl shadow-sky-500/20 active:scale-95">
                    Join Counselling Waitlist
                  </button>
                </div>
              </div>
              <Target size={200} className="absolute -bottom-20 -right-20 text-white/5 rotate-12 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Specializations - Grid Style */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl font-black text-slate-900 mb-4 tracking-tight">Deep Specializations</h2>
            <p className="text-slate-500 font-medium">Choose your path with precision and market-aligned expertise.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(course.specializationDetails || course.topSpecializations).map((spec: any, i: number) => {
              const isDetailed = typeof spec === 'object'
              return (
                <div key={i} className="p-10 rounded-[40px] border-2 border-slate-50 bg-white hover:border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 group-hover:text-white group-hover:bg-slate-900 transition-all mb-8">
                    <span className="text-lg font-black">{i + 1}</span>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
                    {isDetailed ? spec.title : spec}
                  </h4>
                  {isDetailed && (
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                      {spec.description}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Curriculum & Roles */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <section>
            <h2 className="font-display text-4xl font-black text-slate-900 mb-12 tracking-tight">Academic Timeline</h2>
            <div className="space-y-12">
              {course.curriculum.map((item: { year: string; subjects: string[] }, i: number) => (
                <div key={i} className="relative pl-12 border-l-2 border-slate-100 last:border-l-0">
                  <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-white border-4 border-slate-900" />
                  <span className="text-[10px] font-black text-sky-500 uppercase tracking-[0.2em] mb-2 block">{item.year}</span>
                  <h4 className="text-2xl font-black text-slate-900 mb-6">{item.year} Focus</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.subjects.map((sub: string, j: number) => (
                      <span key={j} className="px-5 py-2 rounded-xl bg-slate-50 text-slate-600 text-xs font-bold border border-slate-100">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-slate-900 rounded-[56px] p-16 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-display text-4xl font-black mb-6 tracking-tight">Career Paths</h2>
              <p className="text-slate-400 font-medium mb-12 max-w-sm leading-relaxed">Strategic roles offered by top MNCs and research organizations globally for {course.title} graduates.</p>
              
              <div className="grid gap-6">
                {course.topRoles.map((role: string, i: number) => (
                  <div key={i} className="flex items-center gap-5 p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group">
                    <div className="w-10 h-10 rounded-2xl bg-sky-500 flex items-center justify-center text-white shadow-lg">
                      <Briefcase size={18} />
                    </div>
                    <span className="text-sm font-black tracking-widest uppercase">{role}</span>
                    <ArrowUpRight size={16} className="ml-auto text-white/20 group-hover:text-white transition-all" />
                  </div>
                ))}
              </div>
            </div>
            <GraduationCap size={300} className="absolute -bottom-32 -right-32 text-white/5 rotate-12 pointer-events-none" />
          </section>
        </div>

      </main>

      <Footer />
    </article>
  )
}
