import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { 
  GraduationCap, Clock, BookOpen, Building2, 
  ArrowRight, MapPin, CheckCircle2, Check, Star, Award, ShieldCheck, Globe, HelpCircle 
} from 'lucide-react'

export const dynamic = 'force-static'
export const dynamicParams = false

const degreeMap: Record<string, string> = {
  'btech': 'B.Tech',
  'mtech': 'M.Tech',
  'mba': 'MBA',
  'mbbs': 'MBBS',
  'bds': 'BDS',
  'bsc-nursing': 'B.Sc.',
  'ba-llb': 'B.A. LL.B.',
  'llm': 'LL.M.',
  'bpharm': 'B.Pharm',
  'mpharm': 'M.Pharm',
  'march': 'M.Arch',
  'be': 'B.E.',
  'msc': 'M.Sc.',
  'phd': 'Ph.D.'
};

function getCourseDuration(degree: string): number {
  const deg = (degree || '').toLowerCase();
  if (deg.includes('mbbs')) return 5.5;
  if (deg.includes('bds')) return 5;
  if (deg.includes('b.a. ll.b') || deg.includes('ll.b') && deg.includes('b.a')) return 5;
  if (deg.includes('b.tech') || deg.includes('b.e') || deg.includes('b.pharm') || deg.includes('b.arch') || deg.includes('bsc') || deg.includes('b.sc')) return 4;
  if (deg.includes('m.tech') || deg.includes('mba') || deg.includes('m.sc') || deg.includes('ll.m') || deg.includes('m.pharm') || deg.includes('m.arch') || deg.includes('md') || deg.includes('ms')) return 2;
  if (deg.includes('ph.d') || deg.includes('doctor')) return 3;
  return 3;
}

export async function generateStaticParams() {
  return [
    { degreeSlug: 'btech' },
    { degreeSlug: 'mtech' },
    { degreeSlug: 'mba' },
    { degreeSlug: 'mbbs' },
    { degreeSlug: 'bds' },
    { degreeSlug: 'bsc-nursing' },
    { degreeSlug: 'ba-llb' },
    { degreeSlug: 'llm' },
    { degreeSlug: 'bpharm' },
    { degreeSlug: 'mpharm' },
    { degreeSlug: 'march' },
    { degreeSlug: 'be' },
    { degreeSlug: 'msc' },
    { degreeSlug: 'phd' }
  ];
}

export async function generateMetadata({ params }: any) {
  const resolvedParams = await params
  const degreeSlugLower = resolvedParams.degreeSlug.toLowerCase();
  const degreeName = degreeMap[degreeSlugLower] || resolvedParams.degreeSlug.toUpperCase();

  const { data: catalogCourses } = await supabase
    .from('course_catalog')
    .select('id')
    .eq('degree', degreeName)
    .limit(1);

  if (!catalogCourses || catalogCourses.length === 0) {
    return { title: 'Degree Not Found' }
  }

  return {
    title: `${degreeName} Courses, Colleges & Scope 2026 | Promote Education`,
    description: `Explore the ${degreeName} degree program. Find all specialisations, eligibility criteria, duration, and top colleges offering ${degreeName} in India.`,
  }
}

export default async function DegreeHubPage({ params }: any) {
  const resolvedParams = await params
  const degreeSlugLower = resolvedParams.degreeSlug.toLowerCase();
  const degreeName = degreeMap[degreeSlugLower] || resolvedParams.degreeSlug.toUpperCase();

  // 1. Fetch the master course details from catalog
  const { data: catalogCourses, error } = await supabase
    .from('course_catalog')
    .select('*')
    .eq('degree', degreeName);

  if (error || !catalogCourses || catalogCourses.length === 0) {
    return notFound()
  }

  // Map category stream for college matching
  let streamMatch = 'Engineering'
  if (degreeSlugLower === 'mba' || degreeSlugLower === 'bba') {
    streamMatch = 'Management'
  } else if (degreeSlugLower === 'mbbs' || degreeSlugLower === 'bds' || degreeSlugLower === 'medical-pg') {
    streamMatch = 'Medical'
  } else if (degreeSlugLower === 'bca' || degreeSlugLower === 'mca') {
    streamMatch = 'Computer Applications'
  } else if (degreeSlugLower === 'llb' || degreeSlugLower === 'llm' || degreeSlugLower === 'ba-llb') {
    streamMatch = 'Law'
  } else if (degreeSlugLower === 'bpharm' || degreeSlugLower === 'mpharm') {
    streamMatch = 'Pharmacy'
  } else if (degreeSlugLower === 'march' || degreeSlugLower === 'barch') {
    streamMatch = 'Architecture'
  }

  // 2. Fetch top colleges for this stream
  const { data: colleges } = await supabase
    .from('colleges')
    .select('*')
    .eq('stream', streamMatch)
    .order('nirf_rank', { ascending: true, nullsFirst: false })
    .limit(5)

  const matchingColleges = colleges || []

  // Create virtual masterCourse
  const displayTitle = degreeName === 'MBBS' 
    ? 'Bachelor of Medicine and Bachelor of Surgery' 
    : degreeName === 'BDS'
      ? 'Bachelor of Dental Surgery'
      : `${degreeName} Degree Programs`;

  const durationYears = getCourseDuration(degreeName);
  const durationText = `${durationYears} Years`;

  const masterCourse = {
    id: degreeSlugLower,
    name: displayTitle,
    slug: degreeSlugLower,
    level: catalogCourses[0].level || 'UG',
    duration_years: durationYears,
    description: `Explore admissions, core tracks, eligibility requirements, and professional scope for ${degreeName} courses in India.`
  };

  const matchingSpecs = catalogCourses.map(c => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    career_domain: c.career_domain
  }));

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'specialisations', label: 'Specialisations' },
    { id: 'admission', label: 'Admission Protocol' },
    { id: 'colleges', label: 'Top Colleges' },
    { id: 'faq', label: 'FAQs' },
  ]

  const faqs = [
    {
      q: `What is the duration of a standard ${degreeName} course?`,
      a: `A standard ${displayTitle} (${degreeName}) program is typically completed over ${durationText} of full-time academic study.`
    },
    {
      q: `What are the popular specialisations in ${degreeName}?`,
      a: matchingSpecs.length > 0 
        ? `Popular paths include ${matchingSpecs.slice(0, 3).map(s => s.name).join(', ')}, and more.` 
        : `Various specialization tracks are available depending on the university and domain interests.`
    },
    {
      q: `How do I secure admission to top ${degreeName} colleges?`,
      a: `Admission is primarily based on national or state-level entrance examinations (e.g. JEE for B.Tech, CAT for MBA, NEET for MBBS) followed by centralized counselling sessions.`
    }
  ]

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* ── EDITORIAL HEADER ── */}
      <header className="pt-32 pb-16 bg-slate-50 border-b border-slate-100 relative overflow-hidden">
        {/* Glowing Blurs */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-50/50 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-emerald-50/30 rounded-full blur-[80px] -z-10" />

        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex-1">
              
              {/* Badge row */}
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-sm">
                  {masterCourse.level} DEGREE
                </span>
                <span className="px-3 py-1 bg-sky-50 text-sky-650 border border-sky-100 text-[10px] font-black uppercase tracking-widest rounded-sm">
                  {streamMatch}
                </span>
                <span className="text-slate-400 text-xs font-medium">
                  Updated 2026 Guidance
                </span>
              </div>

              {/* Title — large editorial */}
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[0.95] mb-8 font-display">
                {displayTitle.split(' ').length > 2 ? (
                  <>
                    {displayTitle.split(' ').slice(0, -1).join(' ')}{' '}
                    <span className="text-sky-500 italic">{displayTitle.split(' ').slice(-1)}</span>
                  </>
                ) : (
                  <><span className="text-sky-500 italic">{displayTitle}</span></>
                )}
              </h1>

              {/* Description */}
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                {masterCourse.description || `Explore detailed specialisations, career outcomes, eligibility criteria, and leading Indian colleges offering ${masterCourse.name}.`}
              </p>
            </div>

            {/* Right: Quick CTA */}
            <div className="flex items-center gap-4 pb-2">
              <Link
                href="/counselling"
                className="px-8 py-4 bg-slate-900 hover:bg-sky-500 text-white font-bold text-sm rounded-full transition-all shadow-xl shadow-slate-900/10 active:scale-95"
              >
                Get Admission Help
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
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Course Fact Sheet</p>
                  <div className="space-y-5">
                    {[
                      { label: 'Academic Level', value: masterCourse.level === 'UG' ? 'Undergraduate (UG)' : 'Postgraduate (PG)', icon: Globe },
                      { label: 'Duration', value: durationText, icon: Clock },
                      { label: 'Stream', value: streamMatch, icon: BookOpen },
                      { label: 'Specialisations Listed', value: `${matchingSpecs.length} Tracks`, icon: GraduationCap },
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

                {/* Counselling Card */}
                <div className="p-6 bg-slate-900 rounded-3xl text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/20 rounded-full blur-2xl" />
                  <p className="text-[9px] font-black text-sky-400 uppercase tracking-widest mb-4">Admissions 2026</p>
                  <h4 className="text-sm font-black mb-2">Confused about choices?</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed mb-6">
                    Get custom recommendation reports, college comparison grids, and guidance based on your rank and career goal.
                  </p>
                  <Link 
                    href="/counselling"
                    className="block w-full py-3 text-center bg-white text-slate-900 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-sky-50 transition-all"
                  >
                    Connect with advisor
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
                About {masterCourse.slug.toUpperCase()}: <span className="text-slate-400">Foundation & Scope</span>
              </h2>
              <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed space-y-6">
                <p>
                  The {masterCourse.name} program is designed to build a strong base of domain knowledge, theoretical frameworks, and practical applications. 
                  Across the fields of {streamMatch.toLowerCase()}, students are prepared to tackle modern industrial challenges, lead innovation, and build specialized skill sets.
                </p>
                <p>
                  Throughout this academic track, candidates engage in structured lab sessions, internships, research modules, and industrial case studies tailored to their chosen specialization.
                </p>
              </div>
            </section>

            {/* SPECIALISATIONS */}
            <section id="specialisations" className="scroll-mt-32 pt-16 border-t border-slate-100">
              <h2 className="text-3xl font-black mb-4 text-slate-900 tracking-tight">Available Specialisations</h2>
              <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                Choose a specialization pathway to explore details, job roles, salary potential, and top matching colleges.
              </p>

              {matchingSpecs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {matchingSpecs.map((spec) => (
                    <Link
                      key={spec.slug}
                      href={`/courses/${masterCourse.slug}/${spec.slug}`}
                      className="group bg-white border border-slate-150 rounded-3xl p-6 hover:shadow-lg hover:border-indigo-150 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100/40 px-2 py-0.5 rounded uppercase">
                            {masterCourse.slug.toUpperCase()}
                          </span>
                        </div>
                        <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">
                          {spec.name}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium line-clamp-2 mb-6">
                          {spec.career_domain || 'Explore advanced research and industrial application domains.'}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                          Learn More
                        </span>
                        <ArrowRight size={14} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center text-slate-400 italic bg-slate-50 rounded-2xl border border-slate-100">
                  Specialisation lists are being synchronized. Check back shortly for core branches.
                </div>
              )}
            </section>

            {/* ADMISSION PROTOCOL */}
            <section id="admission" className="scroll-mt-32 pt-16 border-t border-slate-100">
              <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">Admission Protocol 2026</h2>
              <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed space-y-6">
                <p>
                  Entry into premier {masterCourse.slug.toUpperCase()} programs across India is governed by standard institutional criteria:
                </p>
                <div className="not-prose space-y-4 my-8">
                  {[
                    { title: 'Eligibility Criteria', desc: masterCourse.level === 'UG' ? 'Successful completion of Higher Secondary (10+2) with minimum required scores in core subjects.' : 'Completion of a relevant undergraduate degree from a recognized university.' },
                    { title: 'Selection Criteria', desc: 'Valid scores in national-level entrance tests combined with category rankings, counseling sessions, or direct merit evaluations.' },
                    { title: 'Counselling Process', desc: 'Centralized counselling runs in rounds (such as JoSAA, MCC, or state-specific bodies) where choices are filled and seats allotted.' }
                  ].map((item, i) => (
                    <div key={i} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                      <h4 className="font-black text-slate-900 text-sm mb-1 uppercase tracking-wide">{item.title}</h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* TOP COLLEGES */}
            <section id="colleges" className="scroll-mt-32 pt-16 border-t border-slate-100">
              <h2 className="text-3xl font-black mb-4 text-slate-900 tracking-tight">Top Colleges for {masterCourse.slug.toUpperCase()}</h2>
              <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                Leading institutions offering accredited {masterCourse.name} programs.
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

                      <ArrowRight size={16} className="text-slate-355 group-hover:text-slate-650 group-hover:translate-x-0.5 transition-all flex-shrink-0 hidden md:block" />
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
