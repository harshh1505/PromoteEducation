import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReviewForm from '@/components/sections/ReviewForm'
import QuestionForm from '@/components/sections/QuestionForm'

// ===============================
// SETTINGS
// ===============================
export const dynamicParams = true
export const revalidate = 86400

// STEP 3 & 4: DYNAMIC ROUTING & STATIC GENERATION
export async function generateStaticParams() {
  const streams = ['engineering', 'medical', 'management', 'law']
  const cities = ['delhi', 'mumbai', 'bangalore', 'pune', 'hyderabad', 'chennai', 'kolkata']
  const fees = [500000, 1000000, 2000000]
  const packages = [5, 10, 20]

  const pages: { slug: string }[] = []

  // 1. Category Pages
  streams.forEach(s => pages.push({ slug: s }))

  // 2. Location Pages
  streams.forEach(s => {
    cities.forEach(c => pages.push({ slug: `${s}-in-${c}` }))
  })

  // 3. Fee Filter Pages
  streams.forEach(s => {
    fees.forEach(f => pages.push({ slug: `${s}-under-${f}` }))
  })

  // 4. Package Filter Pages
  streams.forEach(s => {
    packages.forEach(p => pages.push({ slug: `${s}-with-${p}-lpa` }))
  })

  // 5. Individual Colleges (ALL colleges for prebuild)
  const { data: colleges } = await supabase.from('colleges').select('slug')
  colleges?.forEach(c => {
    if (c.slug && typeof c.slug === 'string') {
      pages.push({ slug: c.slug })
    }
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
  id: string
  slug: string
  name: string
  short_name: string           // e.g. "IIT" — shown in logo box
  location: string
  state: string
  established: number
  ownership: string            // "Government (Central)" | "Private" | "Deemed" etc.
  stream: string               // "Engineering" | "Management" | "Medical" etc.
  description: string
  nirf_rank: number
  naac_grade: string           // "A++" | "A+" | "A" etc.
  naac_cgpa: number            // e.g. 3.61
  campus_size: string          // e.g. "320 Acres"
  total_students: number
  faculty_count: number
  phd_scholars: number
  international_students: number
  research_publications: number
  avg_package: number          // in LPA
  highest_package: number      // in LPA — store as LPA (e.g. 280 = 2.8 Cr)
  placement_rate: number       // percentage, e.g. 94
  total_offers: number
  companies_visited: number
  affiliation: string          // e.g. "Autonomous / UGC"
  entrance_exam: string        // primary entrance exam name
  rating: number               // e.g. 4.7
  review_count: number
  video_url?: string
  facilities?: string[]
  official_website?: string
  contact_email?: string
  meta_title?: string
  meta_description?: string
  content?: {
    overview: string
    why_choose: string
    placements: string
    campus_life: string
    admission: string
    faqs?: { question: string; answer: string }[]
  }
  faqs?: { question: string; answer: string }[]
}

interface CategoryQuery {
  stream: string
  location: string
}

function parseSlug(slug: string): CategoryQuery | null {
  const parts = slug.split('-in-')
  if (parts.length < 2) return null
  return {
    stream: parts[0].replace(/-/g, ' '),
    location: parts[1].replace(/-/g, ' ')
  }
}

type Course = {
  id: string
  college_id: string
  name: string
  fees: number                 // total course fees in INR
  duration: string             // e.g. "4 Years"
  eligibility: string          // e.g. "JEE Advanced · 10+2 PCM ≥75%"
  is_popular: boolean          // highlights row in table
}

type Placement = {
  id: string
  college_id: string
  year: number
  avg_package: number          // LPA
  highest_package: number      // LPA
  placement_rate: number       // %
  total_offers: number
  companies_visited: number
  recruiters: string[]         // array of company names
}

type Cutoff = {
  id: string
  college_id: string
  branch: string
  category: string             // "General" | "OBC-NCL" | "SC" | "ST" | "EWS"
  gender: string               // "Gender-Neutral" | "Female-Only"
  opening_rank: number
  closing_rank: number
  year: number
}

type Ranking = {
  id: string
  college_id: string
  agency: string               // "NIRF Engineering" | "QS Asia" | "THE" etc.
  rank: string                 // string to support "401–500" ranges
  year: number
}

type FAQ = {
  id: string
  college_id: string
  question: string
  answer: string
  created_at: string
}

type Review = {
  id: string
  college_id: string
  user_name: string
  rating: number
  comment: string
  user_tag: string
  is_verified: boolean
}

type GalleryItem = {
  id: string
  college_id: string
  image_url: string
  caption: string
  category: string
}

type Scholarship = {
  id: string
  college_id: string
  name: string
  amount: string
  eligibility: string
}

type ImportantDate = {
  id: string
  college_id: string
  event_name: string
  event_date: string
}

type SimilarCollege = {
  name: string
  slug: string
  location: string
  state: string
  nirf_rank: number
}

// ===============================
// DATA FETCHING
// ===============================
async function getCollegeData(slug: string) {
  const { data: college, error } = await supabase
    .from('colleges')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !college) return null

  const [courses, placements, cutoffs, rankings, faqs, reviews, gallery, scholarships, important_dates] = await Promise.all([
    supabase
      .from('courses')
      .select('*')
      .eq('college_id', college.id)
      .order('is_popular', { ascending: false })
      .order('fees', { ascending: false }),

    supabase
      .from('placements')
      .select('*')
      .eq('college_id', college.id)
      .order('year', { ascending: false })
      .limit(1),

    supabase
      .from('cutoffs')
      .select('*')
      .eq('college_id', college.id)
      .order('year', { ascending: false })
      .order('closing_rank', { ascending: true }),

    supabase
      .from('rankings')
      .select('*')
      .eq('college_id', college.id)
      .order('year', { ascending: false }),

    supabase
      .from('faqs')
      .select('*')
      .eq('college_id', college.id)
      .order('created_at', { ascending: true }),

    supabase
      .from('reviews')
      .select('*')
      .eq('college_id', college.id)
      .order('created_at', { ascending: false }),

    supabase
      .from('gallery')
      .select('*')
      .eq('college_id', college.id)
      .order('sort_order', { ascending: true })
      .limit(5),

    supabase
      .from('scholarships')
      .select('*')
      .eq('college_id', college.id),

    supabase
      .from('important_dates')
      .select('*')
      .eq('college_id', college.id)
      .order('event_date', { ascending: true }),
  ])

  return {
    college: college as College,
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

// ===============================
// CATEGORY SEARCH (Traffic Magnet)
// ===============================

async function CategoryView({ slug }: { slug: string }) {
  const query = parseSlug(slug)
  if (!query) return notFound()

  const { data: colleges } = await supabase
    .from('colleges')
    .select('*')
    .ilike('stream', `%${query.stream}%`)
    .or(`location.ilike.%${query.location}%,state.ilike.%${query.location}%`)
    .order('nirf_rank', { ascending: true, nullsFirst: false })

  if (!colleges || colleges.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">No colleges found</h1>
          <p className="text-slate-600 mb-8">We couldn't find any {query.stream} colleges in {query.location} yet.</p>
          <Link href="/colleges" className="inline-block bg-sky-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-sky-700">
            Explore All Colleges
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: colleges.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: c.name,
              url: `https://promoteeducation.in/colleges/${c.slug}`,
            })),
          }),
        }}
      />
      <section className="bg-slate-900 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 capitalize leading-tight">
            Best {query.stream} Colleges in <span className="text-sky-400">{query.location}</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Compare top-rated {query.stream} institutions in {query.location} for 2026 admissions.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {colleges.map((college) => (
            <Link key={college.id} href={`/colleges/${college.slug}`} className="block bg-white border border-slate-100 p-6 rounded-2xl hover:shadow-lg transition-all group">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex gap-2 mb-2">
                    <span className="bg-amber-50 text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-100">NIRF #{college.nirf_rank || 'NA'}</span>
                    <span className="bg-sky-50 text-sky-600 text-[10px] font-bold px-2 py-0.5 rounded border border-sky-100 uppercase">{college.stream}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">{college.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{college.location}, {college.state}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Avg Package</p>
                  <p className="text-sky-600 font-bold">₹{college.avg_package || 'N/A'} LPA</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="bg-white border border-slate-100 p-6 rounded-2xl h-fit sticky top-24">
          <h4 className="text-lg font-bold text-slate-900 mb-4">Quick Guidance</h4>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed text-balance">Get help choosing the right {query.stream} college in {query.location} based on your rank and budget.</p>
          <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all text-sm uppercase tracking-wide">Talk to Experts</button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-lg font-bold mb-4">Explore More</h2>
        <div className="flex gap-4 flex-wrap">
          <Link href={`/colleges/${query.stream.replace(/\s+/g, '-').toLowerCase()}`} className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm text-slate-600 hover:text-sky-600 hover:border-sky-200 transition-all">
            All {query.stream} Colleges
          </Link>
          <Link href="/colleges" className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm text-slate-600 hover:text-sky-600 hover:border-sky-200 transition-all">
            All Colleges
          </Link>
          <Link href="/exams" className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm text-slate-600 hover:text-sky-600 hover:border-sky-200 transition-all">
            Entrance Exams
          </Link>
        </div>
      </div>
    </div>
  )
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
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params

  if (slug.includes('-in-')) {
    const query = parseSlug(slug)
    if (query) {
      return {
        title: `Top ${query.stream} Colleges in ${query.location} 2026`,
        description: `Explore best ${query.stream} colleges in ${query.location}. Check fees, placements, rankings and admission details.`,
      }
    }
  }

  const data = await getCollegeData(slug)
  if (!data) return { title: 'College Not Found' }

  const { college } = data
  const title = college.meta_title || `${college.name} ${new Date().getFullYear()}: Fees, Cutoff, Placements, Ranking`
  const description = college.meta_description || `${college.name}, ${college.location} — NIRF #${college.nirf_rank}. Check ${college.stream} courses, fees, placement stats (avg ₹${college.avg_package} LPA), cutoffs, and admission 2026.`

  return {
    title,
    description,
    openGraph: { title, description, type: 'website' },
  }
}

async function getSimilarColleges(college: any) {
  // SMART MATCHING: Same stream + Same state for relevance
  const { data } = await supabase
    .from("colleges")
    .select("name, slug, location, stream, nirf_rank")
    .neq("id", college.id)
    .eq("stream", college.stream)
    .ilike("state", `%${college.state}%`) // Step 4: Local relevance
    .order("nirf_rank", { ascending: true })
    .limit(4)

  return data || []
}

// ===============================
// PAGE
// ===============================
async function ListingPage({ slug, type }: { slug: string, type: string }) {
  const clean = (s: string) => s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  
  let title = ""
  let query = supabase.from('colleges').select('*')
  let stream = ""
  let location = ""
  let filterVal = 0

  // 1. PARSE SLUG DETAILS
  if (type === 'location') {
    const parts = slug.split('-in-')
    stream = parts[0]
    location = parts[1]
    title = `Best ${clean(stream)} Colleges in ${clean(location)} 2026`
    query = query.ilike('stream', stream).ilike('location', `%${location}%`)
  } else if (type === 'fee') {
    const parts = slug.split('-under-')
    stream = parts[0]
    filterVal = parseInt(parts[1])
    title = `Best ${clean(stream)} Colleges Under ₹${filterVal.toLocaleString()} Fees`
    query = query.ilike('stream', stream).lte('total_fee', filterVal)
  } else if (type === 'package') {
    const parts = slug.split('-with-')
    stream = parts[0]
    filterVal = parseInt(parts[1].replace('-lpa', ''))
    title = `Top ${clean(stream)} Colleges with ₹${filterVal} LPA+ Average Package`
    query = query.ilike('stream', stream).gte('avg_package', filterVal)
  } else if (type === 'category') {
    stream = slug
    title = `Best ${clean(stream)} Colleges in India 2026: Rankings & Fees`
    query = query.ilike('stream', stream)
  }

  const { data: colleges } = await query.order('nirf_rank', { ascending: true, nullsFirst: false }).limit(20)

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
          {title}
        </h1>
        
        <p className="text-lg text-slate-500 mb-12 max-w-3xl leading-relaxed">
          Explore the top-rated {stream} institutions {location ? `in ${clean(location)}` : 'in India'}. 
          Our 2026 guide covers detailed placement statistics, NIRF rankings, and fee structures to help you make an informed decision.
        </p>

        <div className="grid grid-cols-1 gap-6 mb-16">
          {colleges?.map((c) => (
            <Link key={c.id} href={`/colleges/${c.slug}`} className="bg-white border border-slate-100 p-6 rounded-2xl hover:shadow-xl transition-all group flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <div className="flex gap-2 mb-3">
                  <span className="bg-amber-50 text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-100">NIRF #{c.nirf_rank || 'NA'}</span>
                  <span className="bg-sky-50 text-sky-600 text-[10px] font-bold px-2 py-0.5 rounded border border-sky-100 uppercase">{c.stream}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">{c.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{c.location}, {c.state}</p>
              </div>
              <div className="flex items-center gap-8 text-right">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Avg Package</p>
                  <p className="text-sky-600 font-bold text-lg">₹{c.avg_package || 'N/A'} LPA</p>
                </div>
                <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center group-hover:bg-sky-600 transition-colors">→</div>
              </div>
            </Link>
          ))}
        </div>

        {/* SEO INTERNAL LINKS */}
        <div className="pt-10 border-t border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Explore More Comparisons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {colleges?.slice(0, 6).map((c1, i) => {
              const c2 = colleges[i + 1]
              if (!c2) return null
              return (
                <Link key={i} href={`/compare/${c1.slug}-vs-${c2.slug}`} className="text-sm text-sky-600 hover:underline">
                  {c1.name} vs {c2.name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default async function CollegePage({ params }: any) {
  const pageInfo = parsePageType(params.slug)

  // 🏛️ HANDLE LISTING PAGES (Category, Location, Filters)
  if (pageInfo.type !== 'college') {
    return <ListingPage slug={params.slug} type={pageInfo.type} />
  }

  // 🎓 HANDLE INDIVIDUAL COLLEGE PROFILE
  const data = await getCollegeData(params.slug)
  if (!data) return notFound()

  const { college, courses, placement, cutoffs, rankings, faqs: dbFaqs, reviews, gallery, scholarships, important_dates } = data
  const similarColleges = await getSimilarColleges(college)

  // 1. General/Smart FAQs (Always present, auto-generated from stats)
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
        ? `${college.name} holds NIRF Rank #${college.nirf_rank} in the ${college.stream || 'Engineering'} category${college.naac_grade ? ` and has a NAAC Grade of ${college.naac_grade}` : ''}.`
        : `${college.name} is a recognized institution in ${college.location}, known for its academic excellence in ${college.stream || 'higher education'}.`
    },
  ]

  // 2. Custom FAQs (From Supabase 'faqs' table)
  const customFaqs = dbFaqs.map(f => ({ q: f.question, a: f.answer }))

  // 3. Combined List (General first, then Custom)
  const displayFaqs = [...generalFaqs, ...customFaqs]

  return (
    <div className="min-h-screen" style={{ background: '#f8fafc', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '14px', color: '#1e293b', lineHeight: 1.6 }}>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollegeOrUniversity',
          name: college.name,
          url: `https://yoursite.in/colleges/${college.slug}`,
          address: { '@type': 'PostalAddress', addressLocality: college.location, addressRegion: college.state, addressCountry: 'IN' },
          description: college.description,
        })
      }} />

      {/* FAQ Schema */}
      {college.faqs && college.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: college.faqs.map((faq: any) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
      )}

      {/* ── HEADER ── */}
      <header style={{ position: 'relative', color: '#fff', padding: '18px 24px 0', overflow: 'hidden' }}>

        {/* CAROUSEL BACKGROUND */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
          {gallery.length > 0 ? (
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              {gallery.map((img, idx) => (
                <div
                  key={img.id}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `linear-gradient(to bottom, rgba(26,53,87,0.85), rgba(26,53,87,0.95)), url(${img.image_url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0,
                    animation: `heroFade ${gallery.length * 5}s infinite`,
                    animationDelay: `${idx * 5}s`
                  }}
                />
              ))}
              <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes heroFade {
                  0% { opacity: 0; }
                  5% { opacity: 1; }
                  20% { opacity: 1; }
                  25% { opacity: 0; }
                  100% { opacity: 0; }
                }
              `}} />
            </div>
          ) : (
            <div style={{ width: '100%', height: '100%', background: '#1a3557' }} />
          )}
        </div>

        {/* Content Overlay */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb */}
          <div style={{ fontSize: '11px', color: '#8eaeca', marginBottom: '10px', display: 'flex', gap: '4px' }}>
            <Link href="/" style={{ color: '#8eaeca', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <Link href="/colleges" style={{ color: '#8eaeca', textDecoration: 'none' }}>Colleges</Link>
            <span>›</span>
            <Link href={`/colleges?stream=${college.stream}`} style={{ color: '#8eaeca', textDecoration: 'none' }}>{college.stream}</Link>
            <span>›</span>
            <span style={{ color: '#c5d8ed' }}>{college.name}</span>
          </div>

          {/* College identity */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', paddingBottom: '16px' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '8px', background: '#fff', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px', fontWeight: 800, color: '#1a3557', border: '2px solid rgba(255,255,255,0.2)',
              lineHeight: 1, textAlign: 'center', padding: '4px',
            }}>
              {college.short_name}
            </div>

            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '19px', fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: '8px' }}>
                {college.name}
              </h1>

              {/* Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                {college.nirf_rank && (
                  <span style={{ background: '#e67e00', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '3px', textTransform: 'uppercase' as const, letterSpacing: '0.3px' }}>
                    NIRF #{college.nirf_rank}
                  </span>
                )}
                {[college.ownership, college.stream, `${college.location}, ${college.state}`].filter(Boolean).map((p) => (
                  <span key={p} style={{ background: 'rgba(255,255,255,0.12)', color: '#c5d8ed', fontSize: '10px', fontWeight: 600, padding: '3px 8px', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.15)', textTransform: 'uppercase' as const, letterSpacing: '0.3px' }}>
                    {p}
                  </span>
                ))}
              </div>

              {/* Rating */}
              {college.rating && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#8eaeca' }}>
                  <span style={{ color: '#f5a623', letterSpacing: '-1px', fontSize: '13px' }}>
                    {'★'.repeat(Math.round(college.rating))}{'☆'.repeat(5 - Math.round(college.rating))}
                  </span>
                  <span style={{ fontWeight: 700, color: '#fff', fontSize: '14px' }}>{college.rating}</span>
                  <span>/ 5</span>
                  {college.review_count && <span>· {college.review_count.toLocaleString('en-IN')} reviews</span>}
                  <span style={{ background: '#eaf6ef', color: '#1a7a42', fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: '3px' }}>✓ Verified Data</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <nav style={{ display: 'flex', gap: 0, background: '#152d49', overflow: 'auto', borderTop: '1px solid rgba(255,255,255,0.08)', marginLeft: '-24px', marginRight: '-24px', paddingLeft: '24px' }}>
          {['Overview', 'Courses & Fees', 'Placements', 'Cutoffs', `Admission ${new Date().getFullYear() + 1}`, 'Reviews', 'Gallery'].map((tab, i) => (
            <a
              key={tab}
              href={`#${tab.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              style={{
                padding: '11px 16px', fontSize: '12px', fontWeight: 600,
                color: i === 0 ? '#fff' : '#8eaeca', whiteSpace: 'nowrap' as const,
                borderBottom: i === 0 ? '2px solid #e67e00' : '2px solid transparent',
                textDecoration: 'none', display: 'block',
              }}
            >
              {tab}
            </a>
          ))}
        </nav>
      </header>

      {/* ── STATS STRIP ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', background: '#fff', borderBottom: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
        {[
          { label: 'Avg Package', val: college.avg_package ? formatPackage(college.avg_package) : 'N/A', icon: '💰' },
          { label: 'Highest Package', val: college.highest_package ? formatPackage(college.highest_package) : 'N/A', icon: '🚀' },
          { label: 'Total Courses', val: courses.length || '—', icon: '📚' },
          { label: 'Placement Rate', val: college.placement_rate ? `${college.placement_rate}%` : 'N/A', icon: '📈' },
        ].map((s, i) => (
          <div key={i} style={{ padding: '20px 16px', borderRight: i < 3 ? '1px solid #f1f5f9' : 'none', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '4px' }}>{s.label}</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <span style={{ fontSize: '14px', opacity: 0.8 }}>{s.icon}</span> {s.val}
            </div>
          </div>
        ))}
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', padding: '32px 16px', maxWidth: '1240px', margin: '0 auto' }}>

        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0 }}>
          {/* OVERVIEW */}
          <section id="overview" style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden', padding: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px', color: '#0f172a' }}>About {college.name}</h2>
            <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.7, marginBottom: '24px' }}>{college.content?.overview || college.description}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', padding: '20px', background: '#f8fafc', borderRadius: '12px' }}>
              {[
                { label: 'Established', val: college.established },
                { label: 'Ownership', val: college.ownership },
                { label: 'Affiliation', val: college.affiliation },
                { label: 'Campus Size', val: college.campus_size },
              ].filter(item => item.val).map((item) => (
                <div key={item.label}>
                  <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>{item.label}</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>{item.val}</div>
                </div>
              ))}
            </div>
          </section>

          {college.content?.why_choose && (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">Why Choose {college.name}</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{college.content.why_choose}</p>
              <p className="text-sm">
                Explore more <a href={`/colleges/${college.stream?.toLowerCase()}`} className="text-sky-600 font-semibold hover:underline">top {college.stream} colleges</a> and compare their academic ratings.
              </p>
            </section>
          )}

          {college.content?.placements && (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">Placement Insights</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{college.content.placements}</p>
              <p className="text-sm">
                Discover <a href="/colleges/placements" className="text-sky-600 font-semibold hover:underline">placement trends</a> across top institutions and see how {college.name} stacks up.
              </p>
            </section>
          )}

          {college.content?.campus_life && (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">Campus Life</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{college.content.campus_life}</p>
              <p className="text-sm">
                Check out <a href="/campus-facilities" className="text-sky-600 font-semibold hover:underline">campus facilities</a> and student reviews for {college.stream} students.
              </p>
            </section>
          )}

          {college.content?.admission && (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">Admission Process</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{college.content.admission}</p>
              <p className="text-sm">
                Stay updated with <a href="/exams" className="text-sky-600 font-semibold hover:underline">upcoming entrance exam dates</a> and admission deadlines for 2026.
              </p>
            </section>
          )}

          {college.faqs && college.faqs.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">FAQs</h2>
              <div className="space-y-6">
                {college.faqs.map((faq: any, i: number) => (
                  <div key={i}>
                    <p className="font-semibold text-slate-900 mb-2">{faq.question}</p>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}



          {/* COURSES */}
          <section id="courses-fees" style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 800 }}>Courses & Fees</h2>
            </div>
            <div style={{ padding: '0 24px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '2px solid #f1f5f9' }}>
                    <th style={{ padding: '16px 12px', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Course</th>
                    <th style={{ padding: '16px 12px', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Total Fees</th>
                    <th style={{ padding: '16px 12px', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Eligibility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {courses.map((c) => (
                    <tr key={c.id} style={{ background: c.is_popular ? '#fcfaff' : 'transparent' }}>
                      <td style={{ padding: '20px 12px' }}>
                        <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>{c.name}</div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{c.duration}</div>
                      </td>
                      <td style={{ padding: '20px 12px', fontWeight: 800, color: '#0f172a' }}>{formatFees(c.fees)}</td>
                      <td style={{ padding: '20px 12px', color: '#475569', fontSize: '13px' }}>{c.eligibility}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Placements */}
          <section id="placements" style={{ background: '#fff', borderRadius: '10px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <div style={{ padding: '13px 16px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '14px', fontWeight: 700 }}>Placement Report {placement?.year ?? new Date().getFullYear() - 1}</h2>
              {college.placement_rate && (
                <span style={{ background: '#e67e00', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '3px' }}>
                  {college.placement_rate}% Placed
                </span>
              )}
            </div>
            <div style={{ padding: '14px 16px' }}>
              {placement ? (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                    {[
                      { label: 'Average CTC', val: formatPackage(placement.avg_package) },
                      { label: 'Highest CTC', val: formatPackage(placement.highest_package) },
                      { label: 'Companies Visited', val: placement.companies_visited ? `${placement.companies_visited}+` : '—' },
                      { label: 'Total Offers', val: placement.total_offers?.toLocaleString('en-IN') ?? '—' },
                    ].map((s) => (
                      <div key={s.label} style={{ padding: '12px 14px', background: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                        <div style={{ fontSize: '20px', fontWeight: 800, lineHeight: 1.1 }}>{s.val}</div>
                        <div style={{ fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '0.4px', color: '#6b7280', fontWeight: 600, marginTop: '2px' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {placement.recruiters?.length > 0 && (
                    <>
                      <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.8px', color: '#6b7280', marginBottom: '8px' }}>Top Recruiters</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '6px' }}>
                        {placement.recruiters.map((r) => (
                          <span key={r} style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '4px 10px', fontSize: '11px', fontWeight: 600, color: '#4b5563' }}>
                            {r}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af', fontStyle: 'italic' }}>Placement audit for the current session is in progress.</div>
              )}
            </div>
          </section>

          {/* CUTOFFS */}
          <section id="cutoffs" style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 800 }}>Cutoffs 2024</h2>
              <span style={{ fontSize: '12px', background: '#f1f5f9', padding: '4px 10px', borderRadius: '6px', fontWeight: 600, color: '#475569' }}>JoSAA Round 6</span>
            </div>
            <div style={{ padding: '0 24px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '2px solid #f1f5f9' }}>
                    <th style={{ padding: '16px 12px', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Branch</th>
                    <th style={{ padding: '16px 12px', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Category</th>
                    <th style={{ padding: '16px 12px', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Closing Rank</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {cutoffs.map((ct) => (
                    <tr key={ct.id}>
                      <td style={{ padding: '18px 12px', fontWeight: 700, color: '#0f172a' }}>{ct.branch}</td>
                      <td style={{ padding: '18px 12px', color: '#64748b' }}>{ct.category} ({ct.gender})</td>
                      <td style={{ padding: '18px 12px', fontWeight: 800, color: '#1a7a42' }}>{ct.closing_rank}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* GALLERY */}
          <section id="gallery" style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 800 }}>Campus Gallery</h2>
            </div>
            <div style={{ padding: '24px', display: 'flex', gap: '16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
              {gallery.length > 0 ? gallery.map((img) => (
                <div key={img.id} style={{ flexShrink: 0, width: '280px' }}>
                  <img src={img.image_url} alt={img.caption} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }} />
                  {img.caption && <div style={{ fontSize: '12px', color: '#64748b', marginTop: '10px', fontWeight: 500 }}>{img.caption}</div>}
                </div>
              )) : (
                <div style={{ padding: '20px', color: '#94a3b8', fontStyle: 'italic' }}>Images of the campus are being uploaded.</div>
              )}
            </div>
          </section>

          {/* CAMPUS VIDEO */}
          {college.video_url && (
            <section id="campus-tour" style={{ background: '#fff', borderRadius: '10px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
              <div style={{ padding: '13px 16px', borderBottom: '1px solid #e5e7eb' }}>
                <h2 style={{ fontSize: '14px', fontWeight: 700 }}>Campus Tour Video</h2>
              </div>
              <div style={{ padding: '16px' }}>
                <iframe
                  width="100%"
                  height="400"
                  src={college.video_url}
                  title="Campus Tour"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ borderRadius: '8px' }}
                ></iframe>
              </div>
            </section>
          )}

          {/* SCHOLARSHIPS */}
          {scholarships.length > 0 && (
            <section id="scholarships" style={{ background: '#fff', borderRadius: '10px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
              <div style={{ padding: '13px 16px', borderBottom: '1px solid #e5e7eb' }}>
                <h2 style={{ fontSize: '14px', fontWeight: 700 }}>Scholarships & Financial Aid</h2>
              </div>
              <div style={{ padding: '16px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead style={{ background: '#f9fafb' }}>
                    <tr>
                      <th style={{ padding: '10px', textAlign: 'left', color: '#6b7280' }}>Scholarship Name</th>
                      <th style={{ padding: '10px', textAlign: 'left', color: '#6b7280' }}>Amount</th>
                      <th style={{ padding: '10px', textAlign: 'left', color: '#6b7280' }}>Eligibility</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {scholarships.map((s) => (
                      <tr key={s.id}>
                        <td style={{ padding: '12px 10px', fontWeight: 700 }}>{s.name}</td>
                        <td style={{ padding: '12px 10px', color: '#1a7a42', fontWeight: 600 }}>{s.amount}</td>
                        <td style={{ padding: '12px 10px', color: '#4b5563' }}>{s.eligibility}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* REVIEWS */}
          <section id="reviews" style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 800 }}>Student Reviews</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#f59e0b' }}>★ {college.rating}</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>({college.review_count} reviews)</span>
              </div>
            </div>
            <div style={{ padding: '8px 24px' }}>
              {reviews.length > 0 ? reviews.map((r) => (
                <div key={r.id} style={{ borderBottom: '1px solid #f1f5f9', padding: '24px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#1e293b' }}>{r.user_name[0]}</div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{r.user_name}</div>
                        <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>{r.user_tag}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: '#f59e0b', fontSize: '12px', fontWeight: 700 }}>★ {r.rating}</div>
                      {r.is_verified && <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 700, marginTop: '2px' }}>✓ Verified</div>}
                    </div>
                  </div>
                  <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, margin: 0 }}>{r.comment}</p>
                </div>
              )) : (
                <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af', fontStyle: 'italic' }}>Be the first to review {college.name}!</div>
              )}

              <div style={{ padding: '24px 0' }}>
                <ReviewForm collegeId={college.id} />
              </div>
            </div>
          </section>

          {/* FAQS */}
          <section id="faqs" style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 800 }}>FAQs</h2>
            </div>
            <div style={{ padding: '8px 24px' }}>
              {displayFaqs.map((f, i) => (
                <div key={i} style={{ borderBottom: i < displayFaqs.length - 1 ? '1px solid #f1f5f9' : 'none', padding: '20px 0' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '8px', display: 'flex', gap: '12px' }}>
                    <span style={{ color: '#f59e0b', fontWeight: 900 }}>Q.</span>
                    {f.q}
                  </div>
                  <div style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, paddingLeft: '28px' }}>{f.a}</div>
                </div>
              ))}
              <div style={{ padding: '16px 0' }}>
                <QuestionForm collegeId={college.id} />
              </div>
            </div>
          </section>

          {similarColleges.length > 0 && (
            <section className="mb-10 pt-16 border-t border-slate-100">
              <h2 className="text-2xl font-semibold mb-8">
                Similar Colleges
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {similarColleges.map((c: any) => (
                  <a
                    key={c.slug}
                    href={`/colleges/${c.slug}`}
                    className="border border-slate-100 p-6 rounded-2xl hover:shadow-lg transition-all hover:border-sky-100 group"
                  >
                    <h3 className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors mb-2">{c.name}</h3>
                    <p className="text-sm text-slate-400 font-medium">{c.location}</p>
                  </a>
                ))}
              </div>
            </section>
          )}
          
{/* Comparison Section (Automated) */}
{similarColleges.length > 0 && (
  <section className="pt-16 border-t border-slate-100">
    <h2 className="text-xl font-bold mb-6 text-slate-900 flex items-center gap-2">
      <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
      Compare {college.short_name || college.name} with Similar Colleges
    </h2>
    <div className="flex flex-col gap-3">
      {similarColleges.map((c: any) => (
        <Link 
          key={c.slug} 
          href={`/compare/${college.slug}-vs-${c.slug}`}
          className="text-sky-600 hover:text-sky-700 font-medium flex items-center gap-2 group transition-all"
        >
          <span className="w-1.5 h-1.5 bg-sky-600 rounded-full opacity-40 group-hover:opacity-100 transition-opacity"></span>
          Compare {college.name} vs {c.name}
        </Link>
      ))}
    </div>
  </section>
)}

        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

          {/* Important Dates */}
          {important_dates.length > 0 && (
            <div style={{ background: '#fff', borderRadius: '10px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
              <div style={{ padding: '11px 14px', borderBottom: '1px solid #e5e7eb', background: '#fff8f0' }}>
                <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#c45c00' }}>Important Dates 2026</h2>
              </div>
              <div style={{ padding: '10px 14px' }}>
                {important_dates.map((d) => (
                  <div key={d.event_name} style={{ borderBottom: '1px solid #f3f4f6', padding: '10px 0' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#1a3557' }}>{d.event_name}</div>
                    <div style={{ fontSize: '13px', fontWeight: 700, marginTop: '2px' }}>
                      {new Date(d.event_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Card */}
          <div style={{ background: '#1a3557', borderRadius: '10px', padding: '16px', color: '#fff' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>Apply for Admissions {new Date().getFullYear() + 1}</h3>
            <p style={{ fontSize: '11px', color: '#8eaeca', marginBottom: '12px', lineHeight: 1.5 }}>Get free counselling and know your admission chances.</p>
            <button style={{ display: 'block', width: '100%', background: '#e67e00', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', marginBottom: '8px' }}>
              Check Admission Eligibility
            </button>
            <button style={{ display: 'block', width: '100%', background: 'transparent', color: '#8eaeca', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '5px', padding: '9px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
              Download Brochure (PDF)
            </button>
          </div>

          {/* Rankings */}
          {rankings.length > 0 && (
            <div style={{ background: '#fff', borderRadius: '10px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
              <div style={{ padding: '11px 14px', borderBottom: '1px solid #e5e7eb' }}>
                <h2 style={{ fontSize: '14px', fontWeight: 700 }}>Rankings & Accreditation</h2>
              </div>
              {rankings.map((r) => (
                <div key={r.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderBottom: '1px solid #f3f4f6' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600 }}>{r.agency}</div>
                    <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '1px' }}>{r.year}</div>
                  </div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: '#1a3557' }}>{r.rank}</div>
                </div>
              ))}
              {college.naac_grade && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600 }}>NAAC Grade</div>
                    <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '1px' }}>{new Date().getFullYear()}</div>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#1a3557' }}>{college.naac_grade}</div>
                </div>
              )}
            </div>
          )}

          {/* Similar Colleges Sidebar */}
          {similarColleges.length > 0 && (
            <div style={{ background: '#fff', borderRadius: '10px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
              <div style={{ padding: '11px 14px', borderBottom: '1px solid #e5e7eb' }}>
                <h2 style={{ fontSize: '14px', fontWeight: 700 }}>Compare Colleges</h2>
              </div>
              <div style={{ padding: '4px 14px' }}>
                {similarColleges.map((c: any) => (
                  <Link key={c.slug} href={`/colleges/${c.slug}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f3f4f6', textDecoration: 'none' }}>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: '#1a5fa8', lineHeight: 1.3 }}>{c.name}</div>
                      <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '2px' }}>{c.location}</div>
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#6b7280', whiteSpace: 'nowrap' as const }}>#{c.nirf_rank}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Quick Facts */}
          <div style={{ background: '#fff', borderRadius: '10px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <div style={{ padding: '11px 14px', borderBottom: '1px solid #e5e7eb' }}>
              <h2 style={{ fontSize: '14px', fontWeight: 700 }}>Quick Facts</h2>
            </div>
            <div style={{ padding: '4px 14px' }}>
              {[
                { label: 'Total Students', val: college.total_students?.toLocaleString('en-IN') },
                { label: 'Faculty Strength', val: college.faculty_count ? `${college.faculty_count}+` : null },
                { label: 'Ph.D. Scholars', val: college.phd_scholars?.toLocaleString('en-IN') },
                { label: 'International Students', val: college.international_students },
                { label: 'Research Publications', val: college.research_publications ? `${college.research_publications.toLocaleString('en-IN')}+` : null },
              ].filter((f) => f.val).map((f) => (
                <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
                  <span style={{ fontSize: '12px', color: '#4b5563' }}>{f.label}</span>
                  <span style={{ fontSize: '12px', fontWeight: 700 }}>{f.val}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}