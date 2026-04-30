import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { GraduationCap, Clock, Banknote, BookOpen, TrendingUp, Building2, ArrowRight, CheckCircle2, Star, BarChart3, MapPin } from 'lucide-react'

export const revalidate = 86400

// ─── Course Master Data ───────────────────────────────────────────────────────

const COURSE_DATA: Record<string, {
  name: string
  fullName: string
  stream: string
  duration: string
  level: string
  entrance: string[]
  eligibility: string
  avgSalary: string
  topSalary: string
  careers: string[]
  skills: string[]
  description: string
  color: string
  accent: string
  icon: string
  dbQuery: string   // partial name to query from courses table
}> = {
  'btech-computer-science': {
    name: 'B.Tech CSE',
    fullName: 'B.Tech in Computer Science & Engineering',
    stream: 'Engineering',
    duration: '4 Years',
    level: 'Undergraduate',
    entrance: ['JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE'],
    eligibility: 'Class 12 with PCM, minimum 75% aggregate',
    avgSalary: '₹8–25 LPA',
    topSalary: '₹80+ LPA',
    careers: ['Software Engineer', 'Data Scientist', 'Product Manager', 'ML Engineer', 'DevOps Engineer'],
    skills: ['Programming', 'Data Structures', 'System Design', 'Cloud Computing', 'Machine Learning'],
    description: 'B.Tech in Computer Science & Engineering is the most sought-after undergraduate engineering degree in India. It covers algorithms, software systems, databases, AI, and emerging technologies.',
    color: '#0284c7',
    accent: '#e0f2fe',
    icon: '💻',
    dbQuery: 'CSE',
  },
  'btech-ai-ml': {
    name: 'B.Tech AI & ML',
    fullName: 'B.Tech in Artificial Intelligence & Machine Learning',
    stream: 'Engineering',
    duration: '4 Years',
    level: 'Undergraduate',
    entrance: ['JEE Main', 'BITSAT', 'VITEEE', 'State CETs'],
    eligibility: 'Class 12 with PCM, minimum 75% aggregate',
    avgSalary: '₹10–28 LPA',
    topSalary: '₹1 Cr+',
    careers: ['AI/ML Engineer', 'Data Scientist', 'NLP Engineer', 'Research Scientist', 'Computer Vision Engineer'],
    skills: ['Python', 'Deep Learning', 'Statistics', 'TensorFlow', 'Computer Vision'],
    description: 'A specialised engineering program focused on building intelligent systems. Graduates are among the highest paid in the Indian tech industry.',
    color: '#0284c7',
    accent: '#e0f2fe',
    icon: '🤖',
    dbQuery: 'AI',
  },
  'mbbs': {
    name: 'MBBS',
    fullName: 'Bachelor of Medicine & Bachelor of Surgery',
    stream: 'Medical',
    duration: '5.5 Years',
    level: 'Undergraduate',
    entrance: ['NEET UG', 'AIIMS Entrance', 'INI CET'],
    eligibility: 'Class 12 with PCB, minimum 50% aggregate (40% for SC/ST)',
    avgSalary: '₹6–50 LPA',
    topSalary: '₹2 Cr+ (Super-Specialist)',
    careers: ['General Physician', 'Surgeon', 'Specialist Doctor', 'Medical Researcher', 'Hospital Administrator'],
    skills: ['Clinical Diagnosis', 'Surgery', 'Pharmacology', 'Patient Care', 'Medical Research'],
    description: 'MBBS is the foundational medical degree in India, required to practice as a doctor. It\'s one of the most respected and competitive degrees, with NEET UG as the gateway exam.',
    color: '#0284c7',
    accent: '#e0f2fe',
    icon: '🩺',
    dbQuery: 'MBBS',
  },
  'bds': {
    name: 'BDS',
    fullName: 'Bachelor of Dental Surgery',
    stream: 'Medical',
    duration: '5 Years',
    level: 'Undergraduate',
    entrance: ['NEET UG'],
    eligibility: 'Class 12 with PCB, minimum 50% aggregate',
    avgSalary: '₹4–15 LPA',
    topSalary: '₹50+ LPA (Private Practice)',
    careers: ['Dentist', 'Oral Surgeon', 'Orthodontist', 'Dental Researcher', 'Academic'],
    skills: ['Oral Surgery', 'Orthodontics', 'Patient Care', 'Dental Radiology', 'Prosthodontics'],
    description: 'BDS is India\'s premier dental degree. Admissions are through NEET UG and the course includes clinical training in all major dental specializations.',
    color: '#0284c7',
    accent: '#e0f2fe',
    icon: '🦷',
    dbQuery: 'BDS',
  },
  'mba': {
    name: 'MBA',
    fullName: 'Master of Business Administration',
    stream: 'Management',
    duration: '2 Years',
    level: 'Postgraduate',
    entrance: ['CAT', 'XAT', 'GMAT', 'MAT', 'SNAP'],
    eligibility: 'Graduation in any discipline with minimum 50% marks',
    avgSalary: '₹8–30 LPA',
    topSalary: '₹1.5 Cr (IIM Average)',
    careers: ['Management Consultant', 'Investment Banker', 'Product Manager', 'Entrepreneur', 'Marketing Director'],
    skills: ['Strategic Thinking', 'Finance', 'Marketing', 'Leadership', 'Data Analysis'],
    description: 'MBA is the gateway to leadership roles across industries. India\'s IIMs are globally ranked and produce the country\'s top business leaders.',
    color: '#0284c7',
    accent: '#e0f2fe',
    icon: '💼',
    dbQuery: 'MBA',
  },
  'mtech': {
    name: 'M.Tech',
    fullName: 'Master of Technology',
    stream: 'Engineering',
    duration: '2 Years',
    level: 'Postgraduate',
    entrance: ['GATE'],
    eligibility: 'B.Tech / B.E. in relevant engineering discipline',
    avgSalary: '₹8–20 LPA',
    topSalary: '₹50+ LPA (Research Track)',
    careers: ['Research Engineer', 'Design Engineer', 'Senior Software Engineer', 'Academic', 'DRDO/ISRO Scientist'],
    skills: ['Advanced Engineering', 'Research Methodology', 'Specialised Domain', 'Technical Writing'],
    description: 'M.Tech is the flagship postgraduate engineering program at IITs, NITs, and IIITs. GATE score is the universal admission criterion.',
    color: '#0284c7',
    accent: '#e0f2fe',
    icon: '⚙️',
    dbQuery: 'M.Tech',
  },
  'bsc-nursing': {
    name: 'B.Sc Nursing',
    fullName: 'Bachelor of Science in Nursing',
    stream: 'Medical',
    duration: '4 Years',
    level: 'Undergraduate',
    entrance: ['AIIMS Nursing', 'NEET UG', 'State CETs'],
    eligibility: 'Class 12 with PCB, minimum 45% aggregate',
    avgSalary: '₹3–8 LPA',
    topSalary: '₹25+ LPA (International)',
    careers: ['Staff Nurse', 'ICU Nurse', 'Nurse Educator', 'Clinical Research Coordinator', 'International Nursing'],
    skills: ['Patient Care', 'Medical Procedures', 'Clinical Assessment', 'Emergency Response', 'Healthcare Communication'],
    description: 'B.Sc Nursing is a professional degree producing registered nurses for hospitals, clinics, and community health. Government nursing seats are highly competitive.',
    color: '#0284c7',
    accent: '#e0f2fe',
    icon: '🏥',
    dbQuery: 'Nursing',
  },
  'llb': {
    name: 'LLB',
    fullName: 'Bachelor of Legislative Law',
    stream: 'Law',
    duration: '3 Years',
    level: 'Undergraduate',
    entrance: ['CLAT', 'AILET', 'LSAT India'],
    eligibility: 'Graduation in any discipline',
    avgSalary: '₹5–25 LPA',
    topSalary: '₹1 Cr+ (Senior Advocate)',
    careers: ['Advocate', 'Corporate Lawyer', 'Judge', 'Legal Consultant', 'Public Prosecutor'],
    skills: ['Legal Research', 'Drafting', 'Argumentation', 'Criminal Law', 'Corporate Law'],
    description: 'LLB (3-year) is for graduates who wish to enter the legal profession. NLUs and Delhi University Law Faculty are the top destinations.',
    color: '#0284c7',
    accent: '#e0f2fe',
    icon: '⚖️',
    dbQuery: 'LLB',
  },
}

export async function generateStaticParams() {
  return Object.keys(COURSE_DATA).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: any) {
  const course = COURSE_DATA[params.slug]
  if (!course) return { title: 'Course Not Found' }
  return {
    title: `${course.fullName} 2026: Fees, Colleges, Salary & Scope | Promote Education`,
    description: `Explore ${course.fullName} — eligibility, top colleges, average salary ${course.avgSalary}, career scope, and admission 2026. India's #1 course guide.`,
  }
}

async function getCollegesForCourse(dbQuery: string) {
  const { data } = await supabase
    .from('courses')
    .select(`
      name,
      fees,
      duration,
      eligibility,
      colleges (
        id,
        name,
        slug,
        location,
        state,
        nirf_rank,
        avg_package,
        ownership
      )
    `)
    .ilike('name', `%${dbQuery}%`)
    .order('fees', { ascending: true })
    .limit(20)

  return (data || []).filter(c => c.colleges)
}

function formatFee(fee: number) {
  if (fee >= 100000) return `₹${(fee / 100000).toFixed(1)}L/yr`
  if (fee < 10000) return `₹${fee.toLocaleString('en-IN')}/yr`
  return `₹${(fee / 1000).toFixed(0)}K/yr`
}

export default async function CourseSlugPage({ params }: any) {
  const course = COURSE_DATA[params.slug]
  if (!course) return notFound()

  const offerings = await getCollegesForCourse(course.dbQuery)

  // Deduplicate colleges (same college might offer CSE multiple times)
  const seenSlugs = new Set<string>()
  const uniqueOfferings = offerings.filter(o => {
    const slug = (o.colleges as any)?.slug
    if (!slug || seenSlugs.has(slug)) return false
    seenSlugs.add(slug)
    return true
  })

  const sortedOfferings = uniqueOfferings.sort((a, b) => {
    const rankA = (a.colleges as any)?.nirf_rank || 999
    const rankB = (b.colleges as any)?.nirf_rank || 999
    return rankA - rankB
  })

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 border-b border-slate-100 bg-gradient-to-br from-sky-50 via-white to-white"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 sm:mb-8 overflow-x-auto whitespace-nowrap">
            <Link href="/courses" className="hover:text-slate-600 transition-colors flex-shrink-0">Courses</Link>
            <span className="flex-shrink-0">/</span>
            <span className="text-sky-600 flex-shrink-0">{course.stream}</span>
            <span className="flex-shrink-0">/</span>
            <span className="text-slate-600 flex-shrink-0">{course.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            {/* Left: Course Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg bg-sky-100 flex-shrink-0">
                  {course.icon}
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-2.5 sm:px-3 py-1 rounded-full bg-sky-100 text-sky-700 whitespace-nowrap">
                    {course.level} · {course.stream}
                  </span>
                </div>
              </div>

              <h1
                className="font-black text-slate-900 tracking-tight leading-[1.1] mb-3 sm:mb-4"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
              >
                {course.fullName}
              </h1>
              <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-2xl mb-6 sm:mb-8">
                {course.description}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { icon: Clock, label: 'Duration', value: course.duration },
                  { icon: Banknote, label: 'Avg Salary', value: course.avgSalary },
                  { icon: TrendingUp, label: 'Top Salary', value: course.topSalary },
                  { icon: Building2, label: 'Colleges', value: `${sortedOfferings.length}+` },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-sky-100 shadow-sm">
                    <stat.icon size={16} className="text-sky-600 mb-1.5 sm:mb-2" />
                    <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5 sm:mb-1">{stat.label}</p>
                    <p className="font-black text-slate-900 text-xs sm:text-sm">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Eligibility Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-xl p-6 sm:p-8 lg:sticky lg:top-28">
              <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400 mb-4 sm:mb-6">Admission 2026</h3>

              <div className="space-y-4 sm:space-y-5">
                <div>
                  <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 sm:mb-2">Eligibility</p>
                  <p className="text-sm font-medium text-slate-700 leading-relaxed">{course.eligibility}</p>
                </div>

                <div className="h-px bg-slate-100" />

                <div>
                  <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 sm:mb-3">Entrance Exams</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {course.entrance.map(exam => (
                      <span
                        key={exam}
                        className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black bg-sky-100 text-sky-700"
                      >
                        {exam}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-slate-100" />

                <div>
                  <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 sm:mb-3">Career Paths</p>
                  <div className="space-y-1.5">
                    {course.careers.slice(0, 4).map((c, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle2 size={12} className="text-sky-600 flex-shrink-0" />
                        {c}
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/counseling"
                  className="w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest text-white bg-sky-600 hover:bg-sky-700 transition-all mt-2"
                >
                  Get Free Counseling <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS & SCOPE ──────────────────────────────────────── */}
      <section className="py-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Skills */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-sky-100">
                  <BookOpen size={18} className="text-sky-600" />
                </div>
                <h2 className="font-black text-slate-900">Key Skills You'll Learn</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {course.skills.map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-sm font-bold text-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* All Careers */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-sky-100">
                  <TrendingUp size={18} className="text-sky-600" />
                </div>
                <h2 className="font-black text-slate-900">Career Opportunities</h2>
              </div>
              <div className="space-y-3">
                {course.careers.map((career, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-50">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs bg-sky-100 text-sky-700">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <span className="text-sm font-bold text-slate-800">{career}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOP COLLEGES ────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest mb-2 text-sky-600">
                2026 Rankings
              </p>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Top Colleges for {course.name}
              </h2>
            </div>
            <Link
              href="/colleges"
              className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>

          {sortedOfferings.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {sortedOfferings.slice(0, 12).map((offering, i) => {
                const college = offering.colleges as any
                return (
                  <Link
                    key={college.slug}
                    href={`/colleges/${college.slug}`}
                    className="group bg-white border border-slate-100 rounded-2xl p-6 hover:border-slate-200 hover:shadow-lg transition-all flex flex-col md:flex-row md:items-center gap-6"
                  >
                    {/* Rank badge */}
                    <div
                      className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center font-black text-sm"
                      style={{ background: i < 3 ? '#e0f2fe' : '#f8fafc', color: i < 3 ? '#0284c7' : '#94a3b8' }}
                    >
                      {college.nirf_rank ? `#${college.nirf_rank}` : `—`}
                    </div>

                    {/* College info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-slate-900 group-hover:text-sky-600 transition-colors mb-1 text-base">
                        {college.name}
                      </h3>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                          <MapPin size={10} /> {college.location}, {college.state}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                          {college.ownership}
                        </span>
                      </div>
                    </div>

                    {/* Course fee */}
                    <div className="text-right flex-shrink-0">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Annual Fee</p>
                      <p className="font-black text-slate-900 text-base">{formatFee(offering.fees)}</p>
                    </div>

                    {/* Avg package */}
                    {college.avg_package && (
                      <div className="text-right flex-shrink-0">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Avg Package</p>
                        <p className="font-black text-base text-sky-600">
                          ₹{college.avg_package} LPA
                        </p>
                      </div>
                    )}

                    <ArrowRight size={18} className="text-slate-300 group-hover:text-slate-600 transition-colors flex-shrink-0 hidden md:block" />
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100">
              <div className="text-4xl mb-4">{course.icon}</div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Data Loading</h3>
              <p className="text-slate-500">College data for this course will be available shortly.</p>
              <Link href="/colleges" className="inline-flex items-center gap-2 mt-6 font-bold text-sm text-sky-600 hover:underline">
                Browse All Colleges <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── RELATED COURSES ─────────────────────────────────────── */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Related Courses</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(COURSE_DATA)
              .filter(([slug]) => slug !== params.slug)
              .filter(([, data]) => data.stream === course.stream || data.level === course.level)
              .slice(0, 4)
              .map(([slug, data]) => (
                <Link
                  key={slug}
                  href={`/courses/${slug}`}
                  className="bg-white rounded-2xl p-5 border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all group"
                >
                  <div className="text-2xl mb-3">{data.icon}</div>
                  <h3 className="font-black text-slate-900 group-hover:text-sky-600 transition-colors text-sm mb-1">{data.name}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{data.duration} · {data.level}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
