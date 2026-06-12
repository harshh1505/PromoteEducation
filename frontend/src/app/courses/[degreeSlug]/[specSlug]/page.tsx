import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { 
  GraduationCap, Clock, BookOpen, Building2, 
  ArrowRight, MapPin, Check, Star, Award, ShieldCheck, Globe, HelpCircle, Briefcase, TrendingUp
} from 'lucide-react'

export const revalidate = 86400

export async function generateStaticParams() {
  const { data: specs } = await supabase
    .from('course_specializations')
    .select('slug, master_courses(slug)')

  return (specs || [])
    .filter(s => {
      const mc = Array.isArray(s.master_courses) ? s.master_courses[0] : s.master_courses;
      return s.slug && mc?.slug;
    })
    .map((s) => {
      const mc = Array.isArray(s.master_courses) ? s.master_courses[0] : s.master_courses;
      return {
        degreeSlug: mc.slug,
        specSlug: s.slug,
      };
    })
}

export async function generateMetadata({ params }: any) {
  const { data: masterCourse } = await supabase
    .from('master_courses')
    .select('*')
    .eq('slug', params.degreeSlug)
    .single()

  const { data: spec } = await supabase
    .from('course_specializations')
    .select('*')
    .eq('slug', params.specSlug)
    .eq('master_course_id', masterCourse?.id || '')
    .single()

  if (!masterCourse || !spec) return { title: 'Specialisation Not Found' }

  return {
    title: `${masterCourse.slug.toUpperCase()} in ${spec.name} 2026: Details, Scope & Colleges | Promote Education`,
    description: `Explore ${masterCourse.slug.toUpperCase()} in ${spec.name} — duration, eligibility, average salary, career scope, and top colleges in India.`,
  }
}

export default async function SpecialisationPage({ params }: any) {
  // 1. Fetch the master course
  const { data: masterCourse } = await supabase
    .from('master_courses')
    .select('*')
    .eq('slug', params.degreeSlug)
    .single()

  if (!masterCourse) {
    return notFound()
  }

  // 2. Fetch the specialization detail
  const { data: spec } = await supabase
    .from('course_specializations')
    .select('*')
    .eq('slug', params.specSlug)
    .eq('master_course_id', masterCourse.id)
    .single()

  if (!spec) {
    return notFound()
  }

  // Map stream for college match
  let streamMatch = 'Engineering'
  if (masterCourse.slug === 'mba' || masterCourse.slug === 'bba') {
    streamMatch = 'Management'
  } else if (masterCourse.slug === 'mbbs' || masterCourse.slug === 'medical-pg') {
    streamMatch = 'Medical'
  } else if (masterCourse.slug === 'bca' || masterCourse.slug === 'mca') {
    streamMatch = 'Computer Applications'
  } else if (masterCourse.slug === 'llb' || masterCourse.slug === 'llm') {
    streamMatch = 'Law'
  }

  // 3. Fetch matching colleges
  const { data: colleges } = await supabase
    .from('colleges')
    .select('*')
    .eq('stream', streamMatch)
    .order('nirf_rank', { ascending: true, nullsFirst: false })
    .limit(5)

  const matchingColleges = colleges || []

  // Careers list
  const careers = spec.career_domain 
    ? spec.career_domain.split(',').map((c: string) => c.trim()) 
    : ['Academic Researcher', 'Professional Consultant', 'Domain Expert']

  const durationText = masterCourse.duration_years ? `${masterCourse.duration_years} Years` : '3-4 Years'

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'careers', label: 'Career Scope' },
    { id: 'syllabus', label: 'Syllabus & Core Areas' },
    { id: 'colleges', label: 'Accredited Colleges' },
    { id: 'faq', label: 'FAQs' },
  ]

  const faqs = [
    {
      q: `What is the entry eligibility for ${masterCourse.slug.toUpperCase()} in ${spec.name}?`,
      a: masterCourse.level === 'UG'
        ? `Candidates must complete Higher Secondary (10+2) with Physics, Chemistry, and Mathematics (or equivalent depending on the stream) from a recognized board.`
        : `Candidates require a valid bachelor's degree in a relevant discipline with required aggregate scores.`
    },
    {
      q: `What are the average starting packages for graduates of this program?`,
      a: `Depending on the college tier and individual performance, starting salaries average between ₹5 LPA to ₹18 LPA, with top domestic and international offers going significantly higher.`
    },
    {
      q: `What key skills are gained during this specialisation?`,
      a: `Students develop strong analytical capabilities, domain-specific programming/operative expertise, problem-solving, and advanced project design principles.`
    }
  ]

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* ── EDITORIAL HEADER ── */}
      <header className="pt-32 pb-16 bg-slate-50 border-b border-slate-100 relative overflow-hidden">
        {/* Glowing Blurs */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-50/50 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-sky-50/30 rounded-full blur-[80px] -z-10" />

        <div className="max-w-5xl mx-auto px-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 overflow-x-auto whitespace-nowrap">
            <Link href="/courses" className="hover:text-slate-900 transition-colors">Courses</Link>
            <span>/</span>
            <Link href={`/courses/${masterCourse.slug}`} className="hover:text-slate-900 transition-colors">{masterCourse.slug.toUpperCase()}</Link>
            <span>/</span>
            <span className="text-indigo-600">{spec.name}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex-1">
              
              {/* Badge row */}
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-sm">
                  SPECIALISATION Track
                </span>
                <span className="px-3 py-1 bg-indigo-50 text-indigo-650 border border-indigo-100 text-[10px] font-black uppercase tracking-widest rounded-sm">
                  {masterCourse.slug.toUpperCase()}
                </span>
              </div>

              {/* Title — large editorial */}
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[0.95] mb-8 font-display">
                {spec.name.split(' ').length > 2 ? (
                  <>
                    {spec.name.split(' ').slice(0, -1).join(' ')}{' '}
                    <span className="text-sky-500 italic">{spec.name.split(' ').slice(-1)}</span>
                  </>
                ) : (
                  <><span className="text-sky-500 italic">{spec.name}</span></>
                )}
              </h1>

              {/* Description */}
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                A highly requested specialization within {masterCourse.name}. Explore core training, career domains, structures, and leading universities.
              </p>
            </div>

            {/* Right: Quick CTA */}
            <div className="flex items-center gap-4 pb-2">
              <Link
                href="/counselling"
                className="px-8 py-4 bg-slate-900 hover:bg-indigo-650 text-white font-bold text-sm rounded-full transition-all shadow-xl shadow-slate-900/10 active:scale-95"
              >
                Apply for 2026
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── CONTENT LAYOUT ── */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* ── LEFT SIDEBAR ── */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32 space-y-12">
              
              {/* Section nav */}
              <nav className="space-y-1">
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

              <div className="space-y-10 px-4 pt-10 border-t border-slate-100">
                {/* Fact Sheet */}
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Program Metrics</p>
                  <div className="space-y-5">
                    {[
                      { label: 'Degree type', value: masterCourse.slug.toUpperCase(), icon: Globe },
                      { label: 'Study Format', value: 'Full Time', icon: Clock },
                      { label: 'Eligibility', value: masterCourse.level === 'UG' ? '12th Class Pass' : 'Graduation', icon: ShieldCheck },
                      { label: 'Entrance Exams', value: 'JEE / CAT / NEET / CETs', icon: BookOpen },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 flex-shrink-0">
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

                {/* Counselling Box */}
                <div className="p-6 bg-slate-900 rounded-3xl text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/20 rounded-full blur-2xl" />
                  <p className="text-[9px] font-black text-sky-400 uppercase tracking-widest mb-4">Admissions Guide 2026</p>
                  <h4 className="text-sm font-black mb-2">Advisors On Standby</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed mb-6">
                    Connect with our professional academic consultants to check fee waivers, direct seats, and cutoffs.
                  </p>
                  <Link 
                    href="/counselling"
                    className="block w-full py-3 text-center bg-white text-slate-900 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-sky-50 transition-all"
                  >
                    Get Free Advice
                  </Link>
                </div>
              </div>

            </div>
          </aside>

          {/* ── MAIN CONTENT AREA ── */}
          <article className="lg:col-span-9 space-y-24 pb-32">
            
            {/* OVERVIEW */}
            <section id="overview" className="scroll-mt-32">
              <h2 className="text-4xl font-black mb-10 text-slate-900 tracking-tight leading-tight">
                Overview of {spec.name}: <span className="text-slate-400">Curriculum & Objectives</span>
              </h2>
              <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed space-y-6">
                <p>
                  Specializing in {spec.name} under the {masterCourse.slug.toUpperCase()} track provides an advanced pathway to mastering technical methodologies. 
                  Students are trained in critical core areas, with emphasis on practical experimentation, industry research, and modern standards.
                </p>
                <p>
                  The study model is heavily project-oriented, ensuring that candidates don't just learn theoretical algorithms but apply them directly to solve physical and digital problems.
                </p>
              </div>
            </section>

            {/* CAREERS */}
            <section id="careers" className="scroll-mt-32 pt-16 border-t border-slate-100">
              <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">Career Scope & Roles</h2>
              <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                Graduates of {masterCourse.slug.toUpperCase()} in {spec.name} are highly recruited across top multinational firms and research facilities.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Career opportunities */}
                <div className="bg-white border border-slate-150 rounded-3xl p-6 md:p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                      <TrendingUp size={18} className="text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 font-display">Target Roles</h3>
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

                {/* Salary scope */}
                <div className="bg-white border border-slate-150 rounded-3xl p-6 md:p-8 shadow-sm justify-between flex flex-col">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                        <Briefcase size={18} className="text-emerald-600" />
                      </div>
                      <h3 className="text-lg font-black text-slate-900 font-display">Placement Insights</h3>
                    </div>
                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium mb-6">
                      Graduates receive premium placement support. Average starting packages range from ₹6 LPA to ₹15 LPA, with outliers scaling to ₹40 LPA+ for top engineering and management graduates.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-center">
                    <p className="text-2xl font-black text-slate-900">₹8.5 LPA</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Median CTC</p>
                  </div>
                </div>

              </div>
            </section>

            {/* SYLLABUS */}
            <section id="syllabus" className="scroll-mt-32 pt-16 border-t border-slate-100">
              <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">Syllabus & Core Areas</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white border border-slate-100 rounded-2xl overflow-hidden">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Year</th>
                      <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Core Subjects & Lab Focus</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { year: 'Year 1', subjects: 'Basic Engineering/Management concepts, Mathematics, Computer Systems, introductory labs.' },
                      { year: 'Year 2', subjects: 'Advanced theories, Data structures, Specialized algorithms, core stream subjects, design seminars.' },
                      { year: 'Year 3', subjects: 'Elective specialization tracks, system design, research methodology, minor project works.' },
                      { year: 'Year 4', subjects: 'Industrial training, internship logs, thesis submission, and major graduation projects.' },
                    ].map((item, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-5 font-black text-slate-900 text-sm">{item.year}</td>
                        <td className="px-6 py-5 text-sm text-slate-500 leading-relaxed">{item.subjects}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ACCREDITED COLLEGES */}
            <section id="colleges" className="scroll-mt-32 pt-16 border-t border-slate-100">
              <h2 className="text-3xl font-black mb-4 text-slate-900 tracking-tight">Accredited Colleges</h2>
              <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                Explore colleges offering specialized tracks under the {streamMatch} stream.
              </p>

              {matchingColleges.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {matchingColleges.map((college) => (
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
                <div className="p-12 text-center text-slate-400 italic bg-slate-50 rounded-2xl border border-slate-100">
                  No colleges matched the stream parameters. Check general directory for listings.
                </div>
              )}
            </section>

            {/* FAQS */}
            <section id="faq" className="scroll-mt-32 pt-16 border-t border-slate-100">
              <h2 className="text-3xl font-black mb-10 text-slate-900 tracking-tight">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl">
                    <div className="flex gap-4 items-start">
                      <HelpCircle size={18} className="text-indigo-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm md:text-base mb-2">{faq.q}</h4>
                        <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </article>

        </div>
      </div>

      <Footer />
    </main>
  )
}
