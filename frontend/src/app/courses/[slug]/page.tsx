import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { 
  GraduationCap, Clock, Banknote, BookOpen, TrendingUp, Building2, 
  ArrowRight, MapPin, CheckCircle2, Check 
} from 'lucide-react'

export const revalidate = 86400

// Helper to determine college stream based on course category
function getCollegeStreamForCourseCategory(category: string): string {
  const cat = category.toLowerCase();
  if (cat.includes('engineering') || cat.includes('architecture') || cat.includes('computer applications') || cat.includes('design')) {
    return 'Engineering';
  }
  if (cat.includes('medical') || cat.includes('health') || cat.includes('pharmacy')) {
    return 'Medical';
  }
  if (cat.includes('management') || cat.includes('commerce') || cat.includes('hospitality')) {
    return 'Management';
  }
  if (cat.includes('law')) {
    return 'Law';
  }
  return '';
}

// Format currency
function formatFee(feeText: string | null | undefined) {
  if (!feeText) return 'N/A'
  return feeText
}

export async function generateStaticParams() {
  const { data: courses } = await supabase.from('courses').select('slug')
  return (courses || [])
    .filter(c => c.slug)
    .map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: any) {
  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!course) return { title: 'Course Not Found' }

  return {
    title: `${course.degree} in ${course.course_name} 2026: Details, Scope & Colleges | Promote Education`,
    description: `Explore ${course.degree} in ${course.course_name} — duration, eligibility, average salary, career scope, and top colleges in India.`,
  }
}

export default async function CourseSlugPage({ params }: any) {
  // Fetch course details
  const { data: course, error } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (error || !course) {
    return notFound()
  }

  // Get matching stream for colleges query
  const matchingStream = getCollegeStreamForCourseCategory(course.category)
  
  // Query matching colleges
  let collegesQuery = supabase.from('colleges').select('*')
  if (matchingStream) {
    collegesQuery = collegesQuery.eq('stream', matchingStream)
  }
  const { data: colleges } = await collegesQuery
    .order('nirf_rank', { ascending: true, nullsFirst: false })
    .limit(8)

  const matchingColleges = colleges || []

  // Dynamic description
  const description = `This course provides comprehensive training in ${course.course_name}. Students will cover advanced principles of ${course.category} and build high-demand skills to enter career pathways such as ${course.career_domain || 'specialized professional roles'}.`

  // Format careers list
  const careers = course.career_domain 
    ? course.career_domain.split(',').map((c: string) => c.trim()) 
    : [course.category, 'Academic Researcher', 'Professional Consultant']

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      <Navbar />

      <div className="relative flex-1">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-80" />
        
        {/* Glow Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/30 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-50/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

        {/* ── HERO SECTION ── */}
        <section className="pt-32 pb-16 border-b border-slate-100 bg-white/50 relative z-10">
          <div className="w-full max-w-7xl mx-auto px-6">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 overflow-x-auto whitespace-nowrap">
            <Link href="/courses" className="hover:text-slate-900 transition-colors">Courses</Link>
            <span>/</span>
            <span className="text-indigo-600">{course.category}</span>
            <span>/</span>
            <span className="text-slate-650">{course.degree}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* Left Column: Course details */}
            <div className="lg:col-span-2 space-y-6">
              
              <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-[9px] font-black text-slate-800 uppercase tracking-widest">
                {course.level} PROGRAM
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[1.08] font-display">
                {course.degree} in {course.course_name}
              </h1>

              <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium max-w-2xl">
                {description}
              </p>

              {/* Quick stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {[
                  { icon: Clock, label: 'Duration', value: course.duration_years ? `${course.duration_years} Years` : 'N/A' },
                  { icon: GraduationCap, label: 'Level', value: course.level },
                  { icon: BookOpen, label: 'Category', value: matchingStream || 'General' },
                  { icon: Building2, label: 'Colleges Listed', value: `${matchingColleges.length}+` },
                ].map((stat, i) => (
                  <div key={i} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                    <stat.icon size={16} className="text-indigo-600 mb-2" />
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{stat.label}</p>
                    <p className="font-extrabold text-slate-900 text-xs md:text-sm">{stat.value}</p>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column: Admission CTA Form (Clean matching the modal left panel) */}
            <div className="bg-white/80 backdrop-blur-md border border-slate-100 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Guidance 2026</span>
              </div>

              <h3 className="text-lg font-black text-slate-900 mb-2 font-display">Apply for Admissions</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6 font-medium">
                Get direct expert counselling, comparison matrices, and support from application to enrollment.
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-150 flex items-start gap-3">
                  <div className="w-4.5 h-4.5 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100/50 mt-0.5">
                    <Check size={10} className="text-indigo-600 stroke-[3.5px]" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-wider mb-0.5">Free Support</h4>
                    <p className="text-[11px] text-slate-500 font-medium">Zero charges for counselling and assistance.</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-150 flex items-start gap-3">
                  <div className="w-4.5 h-4.5 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100/50 mt-0.5">
                    <Check size={10} className="text-indigo-600 stroke-[3.5px]" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-wider mb-0.5">Verify Placements</h4>
                    <p className="text-[11px] text-slate-500 font-medium">Access verified salaries and company logs.</p>
                  </div>
                </div>

                <Link
                  href="/counselling"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-slate-950 hover:bg-slate-850 text-white font-extrabold text-[11px] uppercase tracking-wider rounded-2xl shadow-sm transition-all"
                >
                  Book Free Call <ArrowRight size={13} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── DETAILS & SCOPE ── */}
      <section className="py-16 bg-slate-50/50 border-b border-slate-100 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Career opportunities */}
            <div className="bg-white border border-slate-150 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                  <TrendingUp size={18} className="text-indigo-600" />
                </div>
                <h3 className="text-lg font-black text-slate-900 font-display">Career Scope & Domains</h3>
              </div>
              <div className="space-y-3">
                {careers.map((career: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-150/40">
                    <span className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center text-xs font-black text-indigo-600 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-bold text-slate-800">{career}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Program specifications */}
            <div className="bg-white border border-slate-150 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  <BookOpen size={18} className="text-emerald-600" />
                </div>
                <h3 className="text-lg font-black text-slate-900 font-display">Key Course Metrics</h3>
              </div>
              <div className="space-y-4 text-xs font-medium text-slate-600">
                <div className="flex justify-between py-2.5 border-b border-slate-100">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Academic Degree</span>
                  <span className="font-extrabold text-slate-900">{course.degree}</span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-slate-100">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Level of Study</span>
                  <span className="font-extrabold text-slate-900">{course.level === 'UG' ? 'Undergraduate (UG)' : 'Postgraduate (PG)'}</span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-slate-100">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Duration (Years)</span>
                  <span className="font-extrabold text-slate-900">{course.duration_years ? `${course.duration_years} Years` : '—'}</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Career Sector</span>
                  <span className="font-extrabold text-slate-900">{course.category}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── TOP COLLEGES MATCHING THE COURSE ── */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest mb-2 text-indigo-600">Dynamic Matching</p>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight font-display">
                Top Colleges for {course.course_name}
              </h2>
            </div>
            <Link
              href="/colleges"
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-950 transition-colors"
            >
              Explore All Colleges <ArrowRight size={12} />
            </Link>
          </div>

          {matchingColleges.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {matchingColleges.map((college, i) => (
                <Link
                  key={college.slug}
                  href={`/colleges/${college.slug}`}
                  className="group bg-white border border-slate-100 rounded-2xl p-6 hover:border-slate-250 hover:shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all flex flex-col md:flex-row md:items-center gap-6"
                >
                  <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center font-black text-xs md:text-sm bg-slate-50 text-slate-400 border border-slate-150 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-150 transition-colors">
                    {college.nirf_rank ? `#${college.nirf_rank}` : '—'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors mb-1 text-sm md:text-base">
                      {college.name}
                    </h3>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="flex items-center gap-1 text-[11px] text-slate-400 font-semibold">
                        <MapPin size={10} /> {college.location}, {college.state}
                      </span>
                      <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-slate-50 border border-slate-150/65 text-slate-500">
                        {college.ownership}
                      </span>
                    </div>
                  </div>

                  {college.total_fee && (
                    <div className="text-right flex-shrink-0">
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Est. Total Fees</p>
                      <p className="font-extrabold text-slate-900 text-xs md:text-sm">{formatFee(college.total_fee)}</p>
                    </div>
                  )}

                  {college.avg_package && (
                    <div className="text-right flex-shrink-0">
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Avg Placement</p>
                      <p className="font-extrabold text-indigo-600 text-xs md:text-sm">
                        ₹{college.avg_package} LPA
                      </p>
                    </div>
                  )}

                  <ArrowRight size={16} className="text-slate-350 group-hover:text-slate-650 group-hover:translate-x-0.5 transition-all flex-shrink-0 hidden md:block" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50/50 rounded-3xl border border-slate-150">
              <h3 className="text-lg font-black text-slate-900 mb-1">Colleges Syncing</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                We are currently indexing academic fees and matching records for this specialized track.
              </p>
            </div>
          )}
        </div>
      </section>
      </div>

      <Footer />
    </div>
  )
}
