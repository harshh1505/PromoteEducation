import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReviewForm from '@/components/sections/ReviewForm'
import QuestionForm from '@/components/sections/QuestionForm'
import ScrollReveal from '@/components/ui/ScrollReveal'
import {
  Globe, CheckCircle2, Star, Award, ShieldCheck,
  FileText, Info, MapPin, BookOpen, Users, Building2
} from 'lucide-react'

// ===============================
// SETTINGS
// ===============================
export const dynamicParams = true
export const revalidate = 86400

export async function generateStaticParams() {
  const streams = ['engineering', 'medical', 'management', 'law']
  const cities = ['delhi', 'mumbai', 'bangalore', 'pune', 'hyderabad', 'chennai', 'kolkata']
  const fees = [500000, 1000000, 2000000]
  const packages = [5, 10, 20]
  const pages: { slug: string }[] = []

  streams.forEach(s => pages.push({ slug: s }))
  streams.forEach(s => cities.forEach(c => pages.push({ slug: `${s}-in-${c}` })))
  streams.forEach(s => fees.forEach(f => pages.push({ slug: `${s}-under-${f}` })))
  streams.forEach(s => packages.forEach(p => pages.push({ slug: `${s}-with-${p}-lpa` })))

  const { data: colleges } = await supabase.from('colleges').select('slug')
  colleges?.forEach(c => {
    if (c.slug && typeof c.slug === 'string') pages.push({ slug: c.slug })
  })

  return pages
}

function parsePageType(slug: string) {
  const s = slug.toLowerCase()
  if (s.includes('-in-')) return { type: 'location' }
  if (s.includes('-under-')) return { type: 'fee' }
  if (s.includes('-with-')) return { type: 'package' }
  const streams = ['engineering', 'medical', 'management', 'law', 'science', 'pharmacy', 'dental', 'architecture']
  if (streams.includes(s)) return { type: 'category' }
  return { type: 'college' }
}

// ===============================
// TYPES
// ===============================
type College = {
  id: string; slug: string; name: string; short_name: string
  location: string; state: string; established: number; ownership: string
  stream: string; description: string; nirf_rank: number; naac_grade: string
  naac_cgpa: number; campus_size: string; total_students: number
  faculty_count: number; phd_scholars: number; international_students: number
  research_publications: number; avg_package: number; highest_package: number
  placement_rate: number; total_offers: number; companies_visited: number
  affiliation: string; entrance_exam: string; rating: number; review_count: number
  video_url?: string; facilities?: string[]; official_website?: string
  contact_email?: string; meta_title?: string; meta_description?: string
  content?: {
    overview: string; why_choose: string; placement_insights: string
    campus_life: string; admission: string
    faqs?: { question: string; answer: string }[]
    placements?: Placement | null; rankings?: Ranking[]; reviews?: Review[]
    courses?: Course[]; cutoffs?: Cutoff[]; gallery?: GalleryItem[]
    scholarships?: Scholarship[]; important_dates?: ImportantDate[]
    selection_steps?: { step: string; desc: string }[]
  }
}

function safeArray<T>(data: T[] | undefined | null): T[] {
  return Array.isArray(data) ? data : []
}

interface CategoryQuery { stream: string; location: string }

function parseSlug(slug: string): CategoryQuery | null {
  const parts = slug.split('-in-')
  if (parts.length < 2) return null
  return { stream: parts[0].replace(/-/g, ' '), location: parts[1].replace(/-/g, ' ') }
}

type Course = { id: string; college_id: string; name: string; fees: number; duration: string; eligibility: string; is_popular: boolean }
type Placement = { id: string; college_id: string; year: number; avg_package: number; highest_package: number; placement_rate: number; total_offers: number; companies_visited: number; recruiters: string[] }
type Cutoff = { id: string; college_id: string; branch: string; category: string; gender: string; opening_rank: number; closing_rank: number; year: number }
type Ranking = { id: string; college_id: string; agency: string; rank: string; year: number }
type FAQ = { id: string; college_id: string; question: string; answer: string; created_at: string }
type Review = { id: string; college_id: string; user_name: string; rating: number; comment: string; user_tag: string; is_verified: boolean }
type GalleryItem = { id: string; college_id: string; image_url: string; caption: string; category: string }
type Scholarship = { id: string; college_id: string; name: string; amount: string; eligibility: string }
type ImportantDate = { id: string; college_id: string; event_name: string; event_date: string }

// ===============================
// DATA FETCHING
// ===============================
async function getCollegeData(slug: string) {
  const { data: college, error } = await supabase.from('colleges').select('*').eq('slug', slug).single()
  if (error || !college) return null

  const [courses, placements, cutoffs, rankings, faqs, reviews, gallery, scholarships, important_dates] = await Promise.all([
    supabase.from('courses').select('*').eq('college_id', college.id).order('is_popular', { ascending: false }).order('fees', { ascending: false }),
    supabase.from('placements').select('*').eq('college_id', college.id).order('year', { ascending: false }).limit(1),
    supabase.from('cutoffs').select('*').eq('college_id', college.id).order('year', { ascending: false }).order('closing_rank', { ascending: true }),
    supabase.from('rankings').select('*').eq('college_id', college.id).order('year', { ascending: false }),
    supabase.from('faqs').select('*').eq('college_id', college.id).order('created_at', { ascending: true }),
    supabase.from('reviews').select('*').eq('college_id', college.id).order('created_at', { ascending: false }),
    supabase.from('gallery').select('*').eq('college_id', college.id).order('sort_order', { ascending: true }).limit(5),
    supabase.from('scholarships').select('*').eq('college_id', college.id),
    supabase.from('important_dates').select('*').eq('college_id', college.id).order('event_date', { ascending: true }),
  ])

  const updatedCollege = {
    ...college,
    content: {
      ...college.content,
      placement_insights: college.content?.placements || '',
      placements: (placements.data?.[0] || null) as Placement | null,
      rankings: (rankings.data || []) as Ranking[],
      reviews: (reviews.data || []) as Review[],
      courses: (courses.data || []) as Course[],
      cutoffs: (cutoffs.data || []) as Cutoff[],
      gallery: (gallery.data || []) as GalleryItem[],
      scholarships: (scholarships.data || []) as Scholarship[],
      important_dates: (important_dates.data || []) as ImportantDate[],
    }
  }

  return {
    college: updatedCollege as College,
    courses: (courses.data || []) as Course[],
    placement: (placements.data?.[0] || null) as Placement | null,
    cutoffs: (cutoffs.data || []) as Cutoff[],
    rankings: (rankings.data || []) as Ranking[],
    faqs: (faqs.data || []) as FAQ[],
    reviews: (reviews.data || []) as Review[],
    gallery: (gallery.data || []) as GalleryItem[],
    scholarships: (scholarships.data || []) as Scholarship[],
    important_dates: (important_dates.data || []) as ImportantDate[],
  }
}

async function getSimilarColleges(college: College) {
  const { data } = await supabase
    .from('colleges')
    .select('name, slug, location, stream, nirf_rank')
    .neq('id', college.id)
    .eq('stream', college.stream)
    .ilike('state', `%${college.state}%`)
    .order('nirf_rank', { ascending: true })
    .limit(4)
  return data || []
}

// ===============================
// HELPERS
// ===============================
function formatPackage(lpa: number): string {
  if (lpa >= 100) return `₹${(lpa / 100).toFixed(1)} Cr`
  return `₹${lpa} LPA`
}

function formatFees(inr: number): string {
  if (inr >= 100000) return `₹${(inr / 100000).toFixed(2)}L`
  return `₹${inr.toLocaleString('en-IN')}`
}

// ===============================
// SEO METADATA
// ===============================
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (slug.includes('-in-')) {
    const query = parseSlug(slug)
    if (query) return {
      title: `Top ${query.stream} Colleges in ${query.location} 2026`,
      description: `Explore best ${query.stream} colleges in ${query.location}. Check fees, placements, rankings and admission details.`,
    }
  }
  const data = await getCollegeData(slug)
  if (!data) return { title: 'College Not Found' }
  const { college } = data
  const title = college.meta_title || `${college.name} 2026: Fees, Cutoff, Placements, Ranking`
  const description = college.meta_description || `${college.name}, ${college.location} — NIRF #${college.nirf_rank}. Check ${college.stream} courses, fees, placement stats, cutoffs, and admission 2026.`
  return { title, description, openGraph: { title, description, type: 'website' } }
}

// ===============================
// CATEGORY VIEW
// ===============================
async function CategoryView({ slug }: { slug: string }) {
  const query = parseSlug(slug)
  if (!query) return notFound()
  const { data: colleges } = await supabase.from('colleges').select('*').ilike('stream', `%${query.stream}%`).or(`location.ilike.%${query.location}%,state.ilike.%${query.location}%`).order('nirf_rank', { ascending: true, nullsFirst: false })
  if (!colleges || colleges.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-black text-slate-900 mb-4">No colleges found</h1>
          <p className="text-slate-600 mb-8">We couldn't find any {query.stream} colleges in {query.location} yet.</p>
          <Link href="/colleges" className="inline-block bg-slate-900 text-white px-6 py-3 rounded-full font-bold hover:bg-sky-500 transition-all">Explore All Colleges</Link>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-white pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "ItemList", itemListElement: colleges.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, url: `https://promoteeducation.in/colleges/${c.slug}` })) }) }} />
      <section className="bg-slate-50 border-b border-slate-100 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-black text-slate-900 mb-4 capitalize leading-tight">Best {query.stream} Colleges in <span className="text-sky-500 italic">{query.location}</span></h1>
          <p className="text-lg text-slate-500 max-w-2xl">Compare top-rated {query.stream} institutions in {query.location} for 2026 admissions.</p>
        </div>
      </section>
      <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {colleges.map((college) => (
            <Link key={college.id} href={`/colleges/${college.slug}`} className="block bg-white border border-slate-100 p-6 rounded-2xl hover:shadow-lg transition-all group">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex gap-2 mb-2">
                    <span className="bg-slate-900 text-white text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-widest">NIRF #{college.nirf_rank || 'NA'}</span>
                    <span className="bg-sky-50 text-sky-600 text-[9px] font-black px-2 py-0.5 rounded-sm border border-sky-100 uppercase tracking-widest">{college.stream}</span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 group-hover:text-sky-500 transition-colors">{college.name}</h3>
                  <p className="text-sm text-slate-400 mt-1 font-medium">{college.location}, {college.state}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Avg Package</p>
                  <p className="text-sky-500 font-black">₹{college.avg_package || 'N/A'} LPA</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl h-fit sticky top-24">
          <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Quick Guidance</h4>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">Get help choosing the right {query.stream} college in {query.location} based on your rank and budget.</p>
          <button className="w-full bg-slate-900 text-white py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-sky-500 transition-all">Talk to Experts</button>
        </div>
      </div>
    </div>
  )
}

// ===============================
// LISTING PAGE
// ===============================
async function ListingPage({ slug, type }: { slug: string; type: string }) {
  const clean = (s: string) => s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  let title = '', stream = '', location = '', filterVal = 0
  let query = supabase.from('colleges').select('*')

  if (type === 'location') {
    const parts = slug.split('-in-')
    stream = parts[0]; location = parts[1]
    title = `Best ${clean(stream)} Colleges in ${clean(location)} 2026`
    query = query.ilike('stream', stream).ilike('location', `%${location}%`)
  } else if (type === 'fee') {
    const parts = slug.split('-under-')
    stream = parts[0]; filterVal = parseInt(parts[1])
    title = `Best ${clean(stream)} Colleges Under ₹${filterVal.toLocaleString()} Fees`
    query = query.ilike('stream', stream).lte('total_fee', filterVal)
  } else if (type === 'package') {
    const parts = slug.split('-with-')
    stream = parts[0]; filterVal = parseInt(parts[1].replace('-lpa', ''))
    title = `Top ${clean(stream)} Colleges with ₹${filterVal} LPA+ Average Package`
    query = query.ilike('stream', stream).gte('avg_package', filterVal)
  } else if (type === 'category') {
    stream = slug
    title = `Best ${clean(stream)} Colleges in India 2026: Rankings & Fees`
    query = query.ilike('stream', stream)
  }

  const { data: colleges } = await query.order('nirf_rank', { ascending: true, nullsFirst: false }).limit(20)

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-black text-slate-900 mb-6 leading-tight">{title}</h1>
        <p className="text-lg text-slate-500 mb-12 max-w-3xl leading-relaxed">
          Explore top-rated {stream} institutions {location ? `in ${clean(location)}` : 'in India'}. Our 2026 guide covers placement statistics, NIRF rankings, and fee structures.
        </p>
        <div className="grid grid-cols-1 gap-4 mb-16">
          {colleges?.map((c) => (
            <Link key={c.id} href={`/colleges/${c.slug}`} className="bg-white border border-slate-100 p-6 rounded-2xl hover:shadow-xl transition-all group flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <div className="flex gap-2 mb-3">
                  <span className="bg-slate-900 text-white text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-widest">NIRF #{c.nirf_rank || 'NA'}</span>
                  <span className="bg-sky-50 text-sky-600 text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-widest">{c.stream}</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 group-hover:text-sky-500 transition-colors">{c.name}</h3>
                <p className="text-sm text-slate-400 mt-1 font-medium">{c.location}, {c.state}</p>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Avg Package</p>
                  <p className="text-sky-500 font-black text-lg">₹{c.avg_package || 'N/A'} LPA</p>
                </div>
                <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center group-hover:bg-sky-500 transition-colors text-lg">→</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="pt-10 border-t border-slate-100">
          <h2 className="text-xl font-black text-slate-900 mb-6">Explore More Comparisons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {colleges?.slice(0, 6).map((c1, i) => {
              const c2 = colleges[i + 1]
              if (!c2) return null
              return <Link key={i} href="/#compare-section" className="text-sm text-sky-500 hover:underline font-medium">{c1.name} vs {c2.name}</Link>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// ===============================
// MAIN COLLEGE PAGE
// ===============================
export default async function CollegePage({ params }: any) {
  const resolvedParams = await params
  const pageInfo = parsePageType(resolvedParams.slug)
  if (pageInfo.type !== 'college') return <ListingPage slug={resolvedParams.slug} type={pageInfo.type} />

  const data = await getCollegeData(resolvedParams.slug)
  if (!data) return notFound()

  const { college, faqs: dbFaqs } = data
  const similarColleges = await getSimilarColleges(college)

  const courses = safeArray(college.content?.courses)
  const rankings = safeArray(college.content?.rankings)
  const cutoffs = safeArray(college.content?.cutoffs)
  const gallery = safeArray(college.content?.gallery)
  const scholarships = safeArray(college.content?.scholarships)
  const important_dates = safeArray(college.content?.important_dates)

  // Build navigation sections dynamically — only show tabs that have content
  const sections = [
    { id: 'overview', label: 'Overview' },
    ...(college.content?.why_choose ? [{ id: 'why-choose', label: `Why Choose` }] : []),
    { id: 'admission', label: 'Admission Process' },
    ...(college.content?.selection_steps && college.content.selection_steps.length > 0 ? [{ id: 'selection', label: 'Selection Steps' }] : []),
    ...(courses.length > 0 ? [{ id: 'courses', label: 'Courses & Fees' }] : []),
    ...(cutoffs.length > 0 ? [{ id: 'cutoffs', label: 'Cutoffs' }] : []),
    { id: 'rankings', label: 'Rankings' },
    ...(college.content?.placements || college.avg_package ? [{ id: 'placements', label: 'Placements' }] : []),
    ...(college.content?.campus_life ? [{ id: 'campus', label: 'Campus Life' }] : []),
    ...(gallery.length > 0 ? [{ id: 'gallery', label: 'Gallery' }] : []),
    { id: 'faq', label: 'FAQs' },
  ]

  // FAQ assembly
  const generalFaqs = [
    {
      q: `What is the average salary package at ${college.name}?`,
      a: college.avg_package
        ? `The average CTC for the latest batch was ${formatPackage(college.avg_package)}${college.highest_package ? `, with the highest package reaching ${formatPackage(college.highest_package)}` : ''}.`
        : `Placement statistics for ${college.name} are currently being updated for the latest academic session.`
    },
    {
      q: `Which entrance exam is required for admission to ${college.name}?`,
      a: college.entrance_exam
        ? `${college.name} primarily admits students through ${college.entrance_exam}. Eligibility and cutoffs vary by programme and category.`
        : `Admission to ${college.name} is based on national-level entrance exams. Please check the specific course eligibility for details.`
    },
    {
      q: `What is ${college.name}'s NIRF ranking?`,
      a: college.nirf_rank
        ? `${college.name} holds NIRF Rank #${college.nirf_rank} in the ${college.stream} category${college.naac_grade ? ` and has a NAAC Grade of ${college.naac_grade}` : ''}.`
        : `${college.name} is a recognized institution in ${college.location}, known for its academic excellence in ${college.stream}.`
    },
  ]

  const editorialFaqs = safeArray(college.content?.faqs).map(f => ({ q: f.question, a: f.answer }))
  const customFaqs = dbFaqs.map(f => ({ q: f.question, a: f.answer }))
  let displayFaqs = [...generalFaqs, ...editorialFaqs, ...customFaqs]

  if (displayFaqs.length < 4) {
    displayFaqs = [...displayFaqs,
      { q: `What is the admission process at ${college.name}?`, a: `Admission to ${college.name} is based on national-level entrance exams and merit. Please check the official admission guidelines for the current session.` },
      { q: `How are placements at ${college.name}?`, a: `${college.name} has strong placement outcomes with reputed recruiters visiting regularly. Placement statistics are updated periodically.` }
    ]
  }

  const schemaFaqs = editorialFaqs.length > 0 ? editorialFaqs : displayFaqs.slice(0, 3)
  const overviewText = college.content?.overview || `${college.name} is a premier institution located in ${college.location}, ${college.state}. Offering quality education and strong career opportunities in the ${college.stream} stream.`
  const displayGallery = gallery.length > 0 ? gallery : [{ id: 'default', image_url: '/default-college.jpg', caption: college.name, category: 'Campus' }] as GalleryItem[]

  // Determine badge label
  const badgeLabel = college.nirf_rank
    ? `NIRF ${college.stream} #${college.nirf_rank}`
    : college.naac_grade
      ? `NAAC ${college.naac_grade}`
      : college.ownership || 'Featured Institution'

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'CollegeOrUniversity',
          name: college.name, url: `https://promoteeducation.in/colleges/${college.slug}`,
          address: { '@type': 'PostalAddress', addressLocality: college.location, addressRegion: college.state, addressCountry: 'IN' },
          description: college.description,
        })
      }} />

      {schemaFaqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org", "@type": "FAQPage",
            mainEntity: schemaFaqs.map((faq: any) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } }))
          })
        }} />
      )}

      {/* ── EDITORIAL HEADER ── */}
      <header className="pt-32 pb-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex-1">

              {/* Badge row */}
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-sm">
                  {badgeLabel}
                </span>
                {college.naac_grade && college.nirf_rank && (
                  <span className="px-3 py-1 bg-sky-50 text-sky-600 border border-sky-100 text-[10px] font-black uppercase tracking-widest rounded-sm">
                    NAAC {college.naac_grade}
                  </span>
                )}
                <span className="text-slate-400 text-xs font-medium">
                  Updated: {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              {/* College name — large editorial */}
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[0.95] mb-8">
                {college.name.split(' ').length > 2 ? (
                  <>
                    {college.name.split(' ').slice(0, -1).join(' ')}{' '}
                    <span className="text-sky-500 italic">{college.name.split(' ').slice(-1)}</span>
                  </>
                ) : (
                  <><span className="text-sky-500 italic">{college.name}</span></>
                )}
              </h1>

              {/* Subtitle */}
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                {college.description
                  ? college.description.split('.').slice(0, 2).join('.') + '.'
                  : `The comprehensive 2026 guide to admissions, courses, and academic excellence at ${college.name}.`
                }
              </p>
            </div>

            {/* Right: quick meta + CTA */}
            <div className="flex items-center gap-4 pb-2">
              <div className="text-right hidden md:block">
                {college.nirf_rank && (
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">
                    NIRF #{college.nirf_rank}
                  </p>
                )}
                <p className="text-sm font-bold text-slate-900">
                  Estb. {college.established || '—'} · {college.state}
                </p>
              </div>
              <a
                href="#admission"
                className="px-8 py-4 bg-slate-900 text-white font-bold text-sm rounded-full hover:bg-sky-500 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
              >
                Apply for 2026
              </a>
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

                {/* Institution badge */}
                {(college.ownership || college.established) && (
                  <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-indigo-900 uppercase tracking-widest">
                        {college.ownership || 'Institution'}
                      </p>
                      {college.established && (
                        <p className="text-[11px] text-indigo-700 font-medium leading-tight italic">
                          Established in {college.established}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Fact Sheet */}
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Institutional Fact Sheet</p>
                  <div className="space-y-5">
                    {[
                      { label: 'Founded', value: college.established ? `${college.established}` : '—', icon: Globe },
                      { label: 'Affiliation', value: college.affiliation || college.ownership || '—', icon: CheckCircle2 },
                      ...(college.nirf_rank ? [{ label: 'NIRF Rank', value: `#${college.nirf_rank} (India)`, icon: Star }] : []),
                      ...(college.naac_grade ? [{ label: 'NAAC Grade', value: `${college.naac_grade}${college.naac_cgpa ? ` (${college.naac_cgpa})` : ''}`, icon: Award }] : []),
                      ...(college.campus_size ? [{ label: 'Campus', value: college.campus_size, icon: MapPin }] : []),
                      ...(college.total_students ? [{ label: 'Students', value: college.total_students.toLocaleString('en-IN'), icon: Users }] : []),
                      ...(college.entrance_exam ? [{ label: 'Entrance', value: college.entrance_exam, icon: BookOpen }] : []),
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

                {/* Also Read — same stream, same state */}
                {similarColleges.length > 0 && (
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Also Read</p>
                    <div className="space-y-5">
                      {similarColleges.slice(0, 3).map((c: any) => (
                        <Link key={c.slug} href={`/colleges/${c.slug}`} className="group block">
                          <p className="text-[10px] font-black text-sky-500 uppercase tracking-widest mb-1 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                            <FileText size={10} /> Expert View
                          </p>
                          <p className="text-xs font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                            {c.name}: 2026 Admission Guide
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Expert CTA */}
                <div className="p-6 bg-slate-900 rounded-3xl text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/20 rounded-full blur-2xl" />
                  <p className="text-[9px] font-black text-sky-400 uppercase tracking-widest mb-4">Promote Education Exclusive</p>
                  <h4 className="text-sm font-black mb-2">Need Admission Help?</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed mb-6">
                    Get personalized guidance for {college.entrance_exam || 'entrance exams'} and centralized counselling for {college.name}.
                  </p>
                  <button className="w-full py-3 bg-white text-slate-900 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-sky-50 transition-all">
                    Connect with Expert
                  </button>
                </div>

              </div>
            </div>
          </aside>

          {/* ── MAIN ARTICLE ── */}
          <article className="lg:col-span-9 space-y-24 pb-32">

            {/* OVERVIEW */}
            <section id="overview" className="scroll-mt-32">
              <h2 className="text-4xl font-black mb-10 text-slate-900 tracking-tight leading-tight">
                {college.short_name || college.name}:{' '}
                <span className="text-slate-400">
                  {college.stream === 'Medical'
                    ? 'A Premier Institution for Healthcare Excellence'
                    : `India's Leading ${college.stream} Institution`}
                </span>
              </h2>
              <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed space-y-6">
                <p>{overviewText}</p>
          
                {/* Facilities pills */}
                {college.facilities && college.facilities.length > 0 && (
                  <div className="not-prose mt-8">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Key Facilities</p>
                    <div className="flex flex-wrap gap-2">
                      {college.facilities.map((f: string, i: number) => (
                        <span key={i} className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-700">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* At-a-glance stats row */}
                {(college.faculty_count || college.phd_scholars || college.research_publications || college.international_students) && (
                  <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                    {[
                      { label: 'Faculty', val: college.faculty_count?.toLocaleString('en-IN'), show: !!college.faculty_count },
                      { label: 'PhD Scholars', val: college.phd_scholars?.toLocaleString('en-IN'), show: !!college.phd_scholars },
                      { label: 'Research Papers', val: college.research_publications?.toLocaleString('en-IN'), show: !!college.research_publications },
                      { label: 'Intl. Students', val: college.international_students?.toLocaleString('en-IN'), show: !!college.international_students },
                    ].filter(s => s.show).map((s, i) => (
                      <div key={i} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl text-center">
                        <p className="text-2xl font-black text-slate-900">{s.val}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{s.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* WHY CHOOSE */}
            {college.content?.why_choose && (
              <ScrollReveal>
                <section id="why-choose" className="scroll-mt-32">
                  <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">Why Choose {college.short_name || college.name}</h2>
                  <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
                    <p>{college.content.why_choose}</p>
                  </div>
                </section>
              </ScrollReveal>
            )}

            {/* ADMISSION PROCESS */}
            <section id="admission" className="scroll-mt-32 pt-16 border-t border-slate-100">
                <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">Admission Protocol 2026</h2>
                <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed space-y-8">
                  <p>
                    {college.content?.admission || `Admission to ${college.name} is highly competitive, governed by merit and national-level entrance examinations. The selection process is rigorous and merit-based.`}
                  </p>

                  {college.entrance_exam && (
                    <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 mb-4">
                          <span className="font-black text-sm">UG</span>
                        </div>
                        <h4 className="font-black text-slate-900 mb-2 uppercase tracking-wide text-sm">Undergraduate Admission</h4>
                        <p className="text-[13px] text-slate-500 leading-relaxed">
                          Requires a qualifying rank in <strong className="text-slate-700">{college.entrance_exam}</strong> examination, followed by centralized counselling.
                        </p>
                      </div>
                      <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
                          <span className="font-black text-sm">PG</span>
                        </div>
                        <h4 className="font-black text-slate-900 mb-2 uppercase tracking-wide text-sm">Postgraduate Admission</h4>
                        <p className="text-[13px] text-slate-500 leading-relaxed">
                          Postgraduate programmes require relevant entrance test scores. Eligibility varies by specialisation and intake year.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
            </section>

            {/* Step-by-step Selection - Standalone Section */}
            {college.content?.selection_steps && college.content.selection_steps.length > 0 && (
              <section id="selection" className="scroll-mt-32 pt-16 border-t border-slate-100">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-wider mb-10">Step-by-Step Selection</h3>
                  <div className="space-y-10">
                    {college.content.selection_steps.map((s: any, i: number) => (
                      <div key={i} className="flex gap-8 items-start group">
                        <span className="font-black text-slate-100 text-6xl leading-none flex-shrink-0 tabular-nums group-hover:text-sky-50 transition-colors duration-500">
                          0{i + 1}
                        </span>
                        <div className="pt-2">
                          <p className="font-black text-slate-900 uppercase text-xs tracking-[0.2em] mb-3">{s.step}</p>
                          <p className="text-[16px] text-slate-500 leading-relaxed font-medium max-w-2xl">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
            )}

            {/* COURSES & FEES */}
            {(courses.length > 0 || true) && (
              <ScrollReveal>
                <section id="courses" className="scroll-mt-32">
                  <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">Academic Portfolio & Fee Structure</h2>
                  <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                    {college.name} offers a range of programmes in {college.stream}.
                    {college.affiliation ? ` Affiliated to / approved by ${college.affiliation}.` : ''}
                  </p>

                  <div className="overflow-x-auto -mx-0">
                    {courses.length > 0 ? (
                      <table className="w-full border-collapse bg-white border border-slate-100 rounded-2xl overflow-hidden">
                        <thead>
                          <tr className="border-b border-slate-100 bg-slate-50">
                            <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Programme</th>
                            <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Fees</th>
                            <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Eligibility</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {courses.map((c) => (
                            <tr key={c.id} className={c.is_popular ? 'bg-sky-50/30' : 'hover:bg-slate-50 transition-colors'}>
                              <td className="px-6 py-5">
                                <div className="flex items-center gap-3">
                                  {c.is_popular && <span className="bg-sky-500 text-white text-[9px] font-black px-2 py-0.5 rounded-sm uppercase">Popular</span>}
                                  <div>
                                    <div className="font-black text-slate-900 text-sm">{c.name}</div>
                                    <div className="text-xs text-slate-400 font-medium mt-0.5">{c.duration} · Full Time</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-5">
                                <div className="font-black text-slate-900">{formatFees(c.fees)}</div>
                                <div className="text-[10px] text-sky-500 font-black uppercase mt-0.5">Total Course Fee</div>
                              </td>
                              <td className="px-6 py-5 text-sm text-slate-500 leading-relaxed max-w-xs">{c.eligibility}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="p-12 text-center text-slate-400 italic bg-slate-50 rounded-2xl border border-slate-100">
                        Comprehensive course details are being updated. {college.name} offers specialised programmes in {college.stream}.
                      </div>
                    )}
                  </div>
                </section>
              </ScrollReveal>
            )}

            {/* CUTOFFS */}
            {cutoffs.length > 0 && (
              <ScrollReveal>
                <section id="cutoffs" className="scroll-mt-32">
                  <h2 className="text-3xl font-black mb-4 text-slate-900 tracking-tight">Entrance Cutoffs</h2>
                  <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                    {college.name} maintains competitive cutoffs. The data below reflects the final round of the most recent counselling cycle.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white border border-slate-100 rounded-2xl overflow-hidden">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50">
                          <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Specialisation</th>
                          <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                          <th className="px-6 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Closing Rank</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {cutoffs.map((ct) => (
                          <tr key={ct.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-5 font-black text-slate-900 text-sm">{ct.branch}</td>
                            <td className="px-6 py-5 text-sm text-slate-400 font-medium">{ct.category} · {ct.gender}</td>
                            <td className="px-6 py-5 text-right font-black text-sky-500 text-lg">{ct.closing_rank.toLocaleString('en-IN')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </ScrollReveal>
            )}

            {/* RANKINGS */}
            <ScrollReveal>
              <section id="rankings" className="scroll-mt-32">
                <h2 className="text-3xl font-black mb-10 text-slate-900 tracking-tight">Institutional Rankings</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                  {/* NIRF card — always shown if available */}
                  {college.nirf_rank ? (
                    <div className="p-8 border border-slate-100 rounded-3xl text-center hover:shadow-lg transition">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">NIRF India 2024</p>
                      <p className="text-5xl font-black text-slate-900 mb-2">#{college.nirf_rank}</p>
                      <p className="text-xs font-bold text-slate-500">National {college.stream} Ranking</p>
                    </div>
                  ) : (
                    <div className="p-8 border border-dashed border-slate-200 rounded-3xl text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">NIRF Ranking</p>
                      <p className="text-sm font-bold text-slate-400 italic">Coming soon</p>
                    </div>
                  )}

                  {/* NAAC card */}
                  {college.naac_grade ? (
                    <div className="p-8 border border-slate-100 rounded-3xl text-center hover:shadow-lg transition">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">NAAC Accreditation</p>
                      <p className="text-5xl font-black text-sky-500 mb-2">{college.naac_grade}</p>
                      {college.naac_cgpa && <p className="text-xs font-bold text-slate-500">CGPA {college.naac_cgpa}</p>}
                    </div>
                  ) : (
                    <div className="p-8 border border-dashed border-slate-200 rounded-3xl text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">NAAC Grade</p>
                      <p className="text-sm font-bold text-slate-400 italic">To be updated</p>
                    </div>
                  )}

                  {/* Additional rankings from DB or ownership badge */}
                  {rankings.length > 0 ? (
                    <div className="p-8 bg-slate-900 rounded-3xl text-center text-white">
                      <p className="text-[10px] font-black text-sky-400 uppercase tracking-widest mb-4">{rankings[0].agency}</p>
                      <p className="text-5xl font-black mb-2">#{rankings[0].rank}</p>
                      <p className="text-xs font-medium text-slate-400">{rankings[0].year}</p>
                    </div>
                  ) : (
                    <div className="p-8 bg-slate-900 rounded-3xl text-center text-white">
                      <p className="text-[10px] font-black text-sky-400 uppercase tracking-widest mb-4">Approved By</p>
                      <p className="text-2xl font-black mb-2">{college.affiliation || college.ownership || 'NMC Approved'}</p>
                      <p className="text-xs font-medium text-slate-400">Nationally Recognised</p>
                    </div>
                  )}
                </div>
              </section>
            </ScrollReveal>

            {/* PLACEMENTS */}
            {(college.content?.placements || college.avg_package || college.placement_rate) && (
              <ScrollReveal>
                <section id="placements" className="scroll-mt-32">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                      Placements {college.content?.placements?.year ?? new Date().getFullYear() - 1}
                    </h2>
                    {college.placement_rate && (
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">
                        {college.placement_rate}% Placement Rate
                      </span>
                    )}
                  </div>

                  {college.content?.placements ? (
                    <>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                        {[
                          { label: 'Avg Package', val: formatPackage(college.content.placements.avg_package) },
                          { label: 'Highest Package', val: formatPackage(college.content.placements.highest_package) },
                          { label: 'Companies', val: college.content.placements.companies_visited ? `${college.content.placements.companies_visited}+` : '—' },
                          { label: 'Total Offers', val: college.content.placements.total_offers?.toLocaleString('en-IN') ?? '—' },
                        ].map((s) => (
                          <div key={s.label} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                            <div className="text-xl font-black text-slate-900">{s.val}</div>
                            <div className="text-[10px] uppercase font-black text-slate-400 mt-1">{s.label}</div>
                          </div>
                        ))}
                      </div>

                      {college.content.placements.recruiters?.length > 0 && (
                        <div className="pt-6 border-t border-slate-100">
                          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Top Hiring Partners</h3>
                          <div className="flex flex-wrap gap-3">
                            {college.content.placements.recruiters.map((r) => (
                              <span key={r} className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-sm font-bold text-slate-700 shadow-sm">
                                {r}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : college.avg_package ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: 'Avg Package', val: formatPackage(college.avg_package) },
                        { label: 'Highest Package', val: college.highest_package ? formatPackage(college.highest_package) : '—' },
                        { label: 'Placement Rate', val: college.placement_rate ? `${college.placement_rate}%` : '—' },
                        { label: 'Total Offers', val: college.total_offers?.toLocaleString('en-IN') ?? '—' },
                      ].map((s) => (
                        <div key={s.label} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                          <div className="text-xl font-black text-slate-900">{s.val}</div>
                          <div className="text-[10px] uppercase font-black text-slate-400 mt-1">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 italic py-10 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      Placement data is being verified and will be updated shortly.
                    </p>
                  )}
                </section>
              </ScrollReveal>
            )}

            {/* CAMPUS LIFE */}
            {college.content?.campus_life && (
              <ScrollReveal>
                <section id="campus" className="scroll-mt-32">
                  <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">Campus Life</h2>
                  <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
                    <p>{college.content.campus_life}</p>
                  </div>
                </section>
              </ScrollReveal>
            )}

            {/* SCHOLARSHIPS */}
            {scholarships.length > 0 && (
              <ScrollReveal>
                <section id="scholarships" className="scroll-mt-32">
                  <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">Scholarships & Financial Aid</h2>
                  <table className="w-full border-collapse bg-white border border-slate-100 rounded-2xl overflow-hidden">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50">
                        <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Scholarship</th>
                        <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                        <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Eligibility</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {scholarships.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-5 font-black text-slate-900 text-sm">{s.name}</td>
                          <td className="px-6 py-5 text-sky-500 font-black text-sm">{s.amount}</td>
                          <td className="px-6 py-5 text-sm text-slate-500 leading-relaxed">{s.eligibility}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </ScrollReveal>
            )}

            {/* GALLERY */}
            {gallery.length > 0 && (
              <ScrollReveal>
                <section id="gallery" className="scroll-mt-32">
                  <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">Campus Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {displayGallery.map((img) => (
                      <div key={img.id} className="group relative overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
                        <img src={img.image_url} alt={img.caption} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                        {img.caption && (
                          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                            <p className="text-[10px] font-black text-white uppercase tracking-widest">{img.caption}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              </ScrollReveal>
            )}

            {/* VIDEO TOUR */}
            {college.video_url && (
              <ScrollReveal>
                <section id="campus-tour" className="scroll-mt-32">
                  <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">Campus Tour</h2>
                  <div className="aspect-video w-full overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
                    <iframe width="100%" height="100%" src={college.video_url} title="Campus Tour" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  </div>
                </section>
              </ScrollReveal>
            )}

            {/* REVIEWS */}
            <ScrollReveal>
              <section id="reviews" className="scroll-mt-32">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Student Experiences</h2>
                  <div className="flex items-center gap-3">
                    <div className="flex text-yellow-400 text-sm">{[1,2,3,4,5].map(s => <span key={s}>★</span>)}</div>
                    <span className="text-base font-black text-slate-900">{college.rating}</span>
                    <span className="text-sm text-slate-400 font-medium">({college.review_count} reviews)</span>
                  </div>
                </div>

                <div className="space-y-10 mb-12">
                  {college.content?.reviews && college.content.reviews.length > 0
                    ? college.content.reviews.map((r) => (
                      <div key={r.id} className="group">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex gap-4 items-center">
                            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-900 text-base uppercase">
                              {r.user_name[0]}
                            </div>
                            <div>
                              <div className="font-black text-slate-900 text-sm">{r.user_name}</div>
                              {r.is_verified && <div className="text-[10px] text-emerald-500 font-black uppercase tracking-widest flex items-center gap-1 mt-0.5"><CheckCircle2 size={10} /> Verified</div>}
                              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{r.user_tag}</div>
                            </div>
                          </div>
                          <div className="px-3 py-1 bg-sky-50 text-sky-600 border border-sky-100 text-[10px] font-black rounded-full uppercase tracking-wide">
                            {r.rating}/5
                          </div>
                        </div>
                        <p className="text-slate-500 leading-relaxed pl-16 border-l-2 border-slate-50 group-hover:border-sky-100 transition-colors">
                          "{r.comment}"
                        </p>
                      </div>
                    ))
                    : (
                      <p className="text-center text-slate-400 italic py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        Be the first to share your experience at {college.name}.
                      </p>
                    )
                  }
                </div>

                <div className="pt-10 border-t border-slate-100">
                  <ReviewForm collegeId={college.id} />
                </div>
              </section>
            </ScrollReveal>

            {/* FAQS */}
            <ScrollReveal>
              <section id="faq" className="scroll-mt-32 pt-20 border-t border-slate-100">
                <h2 className="text-3xl font-black mb-12 text-slate-900 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-10">
                  {displayFaqs.map((f, i) => (
                    <div key={i}>
                      <h4 className="text-base font-black text-slate-900 mb-3 flex gap-3">
                        <span className="text-sky-500 font-black flex-shrink-0">Q.</span>
                        {f.q}
                      </h4>
                      <p className="text-slate-500 leading-relaxed pl-7 border-l-2 border-slate-50">
                        {f.a}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-12 pt-10 border-t border-slate-100">
                  <QuestionForm collegeId={college.id} />
                </div>
              </section>
            </ScrollReveal>

            {/* FINAL CTA */}
            <section className="bg-slate-50 p-12 rounded-sm border border-slate-100 text-center">
              <h2 className="text-3xl font-black text-slate-900 mb-6">Start Your Journey at {college.short_name || college.name}</h2>
              <p className="text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed">
                Navigating admissions for {college.name} requires structured guidance. Get expert help with {college.entrance_exam || 'entrance exams'} and counselling.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={college.official_website || '#'}
                  target={college.official_website ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="px-10 py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-full shadow-lg hover:bg-sky-500 transition-all"
                >
                  Download Brochure
                </a>
                <button className="px-10 py-4 bg-white border border-slate-200 text-slate-900 font-black text-xs uppercase tracking-widest rounded-full hover:bg-slate-50 transition-all">
                  Talk to a Counselor
                </button>
              </div>
            </section>

          </article>

          {/* ── RIGHT SIDEBAR (mobile only — stacks below on mobile) ── */}
          {/* On desktop the left sidebar handles nav. This right sidebar is hidden on lg since the left sidebar has the tools. */}
          {/* On mobile it renders below content. You can uncomment the aside below if you prefer a right sidebar on desktop too. */}
          {/*
          <aside className="lg:col-span-0">
          */}

        </div>
      </div>

    </main>
  )
}

