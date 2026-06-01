import { getMasterCourseBySlug, getAllMasterCourses } from '@/lib/data/masterCourses'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { supabase } from '@/lib/supabase'
import { 
  GraduationCap, Clock, BookOpen, Building2, 
  ArrowRight, MapPin, Search, ChevronRight
} from 'lucide-react'

export const revalidate = 86400

export async function generateStaticParams() {
  const courses = getAllMasterCourses()
  return courses.map(c => ({ masterSlug: c.slug }))
}

export async function generateMetadata({ params }: any) {
  const course = getMasterCourseBySlug(params.masterSlug)
  if (!course) return { title: 'Course Not Found' }

  return {
    title: `${course.shortName} (${course.fullName}) Courses, Colleges & Scope | Promote Education`,
    description: `Explore the ${course.shortName} degree program. Find all specialisations, eligibility criteria, duration, and top colleges offering ${course.fullName}.`,
  }
}

export default async function MasterCoursePage({ params }: any) {
  const course = getMasterCourseBySlug(params.masterSlug)
  
  if (!course) {
    return notFound()
  }

  // Fetch top colleges for this stream
  const { data: colleges } = await supabase
    .from('colleges')
    .select('*')
    .eq('stream', course.stream)
    .order('nirf_rank', { ascending: true, nullsFirst: false })
    .limit(4)

  const matchingColleges = colleges || []

  // Fetch a sample of popular specialisations
  const { data: specialisations } = await supabase
    .from('courses')
    .select('slug, course_name, duration_years, career_domain')
    .ilike('degree', `%${course.shortName}%`)
    .limit(6)

  const matchingSpecs = specialisations || []

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden flex flex-col">
      <Navbar />

      <div className="relative flex-1">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-80" />
        
        {/* Decorative Blurs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/30 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-50/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

        {/* ── HERO SECTION ── */}
        <section className="pt-32 pb-16 border-b border-slate-100 bg-white/50 relative z-10">
          <div className="w-full max-w-7xl mx-auto px-6">
            
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 overflow-x-auto whitespace-nowrap">
              <Link href="/master-courses" className="hover:text-slate-900 transition-colors">Master Courses</Link>
              <span>/</span>
              <span className="text-indigo-600">{course.shortName}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Course details */}
              <div className="lg:col-span-8 space-y-6">
                
                <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-[9px] font-black text-slate-800 uppercase tracking-widest">
                  {course.level} MASTER PROGRAM
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-[1.08] font-display">
                  {course.fullName} <span className="text-indigo-600">({course.shortName})</span>
                </h1>

                <p className="text-slate-500 text-base md:text-lg leading-relaxed font-medium max-w-2xl">
                  {course.description}
                </p>

                {/* Primary CTA - The Specialisations Button */}
                <div className="pt-6 pb-2">
                  <Link
                    href={`/courses?q=${course.shortName}`}
                    className="inline-flex items-center justify-center gap-3 py-4 px-8 bg-slate-950 hover:bg-slate-850 text-white font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-slate-950/20 transition-all hover:-translate-y-1"
                  >
                    <Search size={18} />
                    View All {course.shortName} Specialisations
                  </Link>
                </div>

                {/* Quick stats grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
                  {[
                    { icon: Clock, label: 'Duration', value: course.duration },
                    { icon: GraduationCap, label: 'Level', value: course.level },
                    { icon: BookOpen, label: 'Stream', value: course.stream },
                    { icon: Building2, label: 'Top Colleges', value: `${matchingColleges.length}+` },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                      <stat.icon size={16} className="text-indigo-600 mb-2" />
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{stat.label}</p>
                      <p className="font-extrabold text-slate-900 text-xs md:text-sm">{stat.value}</p>
                    </div>
                  ))}
                </div>

              </div>

              {/* Right Column: Feature Info */}
              <div className="lg:col-span-4 bg-white/80 backdrop-blur-md border border-slate-100 rounded-3xl p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/30 rounded-full blur-2xl pointer-events-none" />
                
                <h3 className="text-xl font-black text-slate-900 mb-3 font-display">Why choose {course.shortName}?</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-8 font-medium">
                  This degree opens up numerous career pathways. Specialise in high-demand domains and study at India's top institutions to secure your future.
                </p>

                <div className="space-y-4">
                  <Link
                    href="/counselling"
                    className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-indigo-50 border border-slate-150 hover:border-indigo-150 rounded-2xl transition-all group"
                  >
                    <div>
                      <p className="text-[10px] font-black text-indigo-600 uppercase tracking-wider mb-0.5">Free Advice</p>
                      <p className="text-sm font-bold text-slate-900">Get Admission Guidance</p>
                    </div>
                    <ArrowRight size={16} className="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </Link>

                  <Link
                    href={`/courses?q=${course.shortName}`}
                    className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-emerald-50 border border-slate-150 hover:border-emerald-150 rounded-2xl transition-all group"
                  >
                    <div>
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-wider mb-0.5">Explore</p>
                      <p className="text-sm font-bold text-slate-900">Compare Specialisations</p>
                    </div>
                    <ArrowRight size={16} className="text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── POPULAR SPECIALISATIONS ── */}
        {matchingSpecs.length > 0 && (
          <section className="py-20 relative z-10 bg-slate-50/50 border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight font-display mb-2">
                    Popular {course.shortName} Specialisations
                  </h2>
                  <p className="text-slate-500 font-medium">Explore specific domains within this degree.</p>
                </div>
                <Link
                  href={`/courses?q=${course.shortName}`}
                  className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700 transition-colors bg-indigo-50 px-4 py-2 rounded-full"
                >
                  See All Specialisations <ArrowRight size={12} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchingSpecs.map((spec) => (
                  <Link
                    key={spec.slug}
                    href={`/courses/${spec.slug}`}
                    className="group bg-white border border-slate-150 rounded-3xl p-6 hover:shadow-lg hover:border-indigo-150 transition-all flex flex-col h-full"
                  >
                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">
                      {spec.course_name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mb-6 flex-1 line-clamp-2">
                      {spec.career_domain || `Focus on specialized fields in ${course.stream}.`}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Clock size={12} /> {spec.duration_years ? `${spec.duration_years} Years` : course.duration}
                      </span>
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── TOP COLLEGES ── */}
        {matchingColleges.length > 0 && (
          <section className="py-20 relative z-10">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight font-display mb-2">
                    Top Colleges for {course.shortName}
                  </h2>
                  <p className="text-slate-500 font-medium">Leading institutions offering this program.</p>
                </div>
                <Link
                  href="/colleges"
                  className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700 transition-colors bg-indigo-50 px-4 py-2 rounded-full"
                >
                  See All Colleges <ArrowRight size={12} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {matchingColleges.map((college) => (
                  <Link
                    key={college.slug}
                    href={`/colleges/${college.slug}`}
                    className="group bg-white border border-slate-150 rounded-2xl p-6 hover:shadow-md hover:border-slate-300 transition-all flex items-center gap-6"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-150 font-black text-xs shrink-0 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-150 transition-colors">
                      {college.nirf_rank ? `#${college.nirf_rank}` : '—'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-extrabold text-slate-900 truncate mb-1 group-hover:text-indigo-600 transition-colors">
                        {college.name}
                      </h3>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider truncate">
                        <span className="flex items-center gap-1"><MapPin size={10} /> {college.location}</span>
                        <span className="text-slate-200">•</span>
                        <span>{college.ownership}</span>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

      </div>
      <Footer />
    </div>
  )
}
