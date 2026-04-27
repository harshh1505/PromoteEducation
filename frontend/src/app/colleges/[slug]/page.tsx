import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReviewForm from '@/components/sections/ReviewForm'
import QuestionForm from '@/components/sections/QuestionForm'
import ScrollReveal from '@/components/ui/ScrollReveal'

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
    placement_insights: string
    campus_life: string
    admission: string
    faqs?: { question: string; answer: string }[]
    placements?: Placement | null
    rankings?: Ranking[]
    reviews?: Review[]
    courses?: Course[]
    cutoffs?: Cutoff[]
    gallery?: GalleryItem[]
    scholarships?: Scholarship[]
    important_dates?: ImportantDate[]
  }
}

function safeArray<T>(data: T[] | undefined | null): T[] {
  return Array.isArray(data) ? data : []
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

  // Merge fetched data into college.content for the UI
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
// ── COMPONENTS ──
function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="bg-white/80 backdrop-blur-md border border-gray-200/60 rounded-2xl p-8 shadow-md hover:shadow-xl transition">
      <h2 className="text-xl font-semibold mb-4 text-slate-900">{title}</h2>
      <div className="text-slate-600 leading-relaxed">
        {children}
      </div>
    </div>
  )
}

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

  const { college, faqs: dbFaqs } = data
  const similarColleges = await getSimilarColleges(college)

  const courses = safeArray(college.content?.courses)
  const rankings = safeArray(college.content?.rankings)
  const reviews = safeArray(college.content?.reviews)
  const cutoffs = safeArray(college.content?.cutoffs)
  const gallery = safeArray(college.content?.gallery)
  const scholarships = safeArray(college.content?.scholarships)
  const important_dates = safeArray(college.content?.important_dates)

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

  // 3. Editorial FAQs (From college.content.faqs)
  const editorialFaqs = safeArray(college.content?.faqs).map(f => ({ q: f.question, a: f.answer }))

  // 4. Combined List (General first, then Editorial, then Custom)
  let displayFaqs = [...generalFaqs, ...editorialFaqs, ...customFaqs]

  // 5. Fallback FAQs if still low on content
  if (displayFaqs.length < 5) {
    displayFaqs = [
      ...displayFaqs,
      {
        q: `What is the admission process at ${college.name}?`,
        a: `Admission to ${college.name} is based on national-level entrance exams and merit depending on the course. Please check the official admission guidelines for the current session.`
      },
      {
        q: `How are placements at ${college.name}?`,
        a: `${college.name} offers good placement opportunities with reputed recruiters visit this college regularly. Placement statistics are updated periodically based on the latest batches.`
      }
    ]
  }

  // Schema FAQs (Editorial ones)
  const schemaFaqs = editorialFaqs.length > 0 ? editorialFaqs : displayFaqs.slice(0, 3)

  const overviewText = college.content?.overview || `${college.name} is a reputed institution located in ${college.location}, ${college.state}. It offers quality education and strong career opportunities for students in the ${college.stream} stream.`
  
  const displayGallery = gallery.length > 0 ? gallery : [{ id: 'default', image_url: '/default-college.jpg', caption: college.name, category: 'Campus' }] as GalleryItem[]


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <div className="max-w-7xl mx-auto px-6">

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
      {schemaFaqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: schemaFaqs.map((faq: any) => ({
                "@type": "Question",
                name: faq.q || faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.a || faq.answer,
                },
              })),
            }),
          }}
        />
      )}

      {/* ── HERO SECTION ── */}
      <header className="relative rounded-2xl overflow-hidden mt-6">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={displayGallery[0]?.image_url || '/default-college.jpg'}
            className="w-full h-full object-cover"
            alt={college.name}
          />
          <div className="absolute inset-0 backdrop-blur-md bg-slate-900/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 md:p-12 text-white">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          {/* Breadcrumb */}
          <div className="text-xs text-slate-300 mb-4 flex gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link> / 
            <Link href="/colleges" className="hover:text-white transition-colors">Colleges</Link> / 
            <span>{college.stream}</span> / 
            <span className="text-white font-medium">{college.name}</span>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Logo */}
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center font-bold text-slate-900 text-xl shadow-xl flex-shrink-0">
              {college.short_name}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight">
                {college.name}
              </h1>

              <div className="flex flex-wrap gap-3">
                {college.nirf_rank && (
                  <span className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    NIRF #{college.nirf_rank}
                  </span>
                )}
                <span className="bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {college.stream}
                </span>
                <span className="bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {college.location}, {college.state}
                </span>
                {college.ownership && (
                  <span className="bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {college.ownership}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      </header>

      {/* ── FLOATING NAV ── */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm mt-6 -mx-6 px-6 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex gap-8">
          {['Overview', 'Courses', 'Placements', 'Cutoffs', 'Reviews', 'Gallery', 'FAQs'].map((tab) => (
            <a
              key={tab}
              href={`#${tab.toLowerCase()}`}
              className="py-4 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition-all whitespace-nowrap"
            >
              {tab}
            </a>
          ))}
        </div>
      </nav>

      {/* ── STATS SECTION ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {[
          { label: 'Avg Package', val: college.avg_package ? formatPackage(college.avg_package) : 'N/A' },
          { label: 'Highest Package', val: college.highest_package ? formatPackage(college.highest_package) : 'N/A' },
          { label: 'Courses', val: courses.length || '—' },
          { label: 'Placement Rate', val: college.placement_rate ? `${college.placement_rate}%` : 'N/A' },
        ].map((s) => (
          <div key={s.label} className="bg-white/70 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-md text-center transition hover:scale-[1.02] hover:shadow-xl">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.label}</p>
            <p className="text-xl font-bold mt-1 text-slate-900">{s.val}</p>
          </div>
        ))}
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* LEFT COLUMN: PRIMARY CONTENT */}
          <div className="lg:col-span-2 space-y-8">
            
            <ScrollReveal>
              <Section title="Overview">
                <p className="max-w-3xl">{overviewText}</p>
              </Section>
            </ScrollReveal>

            {college.content?.why_choose && (
              <ScrollReveal>
                <Section title={`Why Choose ${college.name}`}>
                  {college.content.why_choose}
                </Section>
              </ScrollReveal>
            )}

            {college.content?.placement_insights && (
              <ScrollReveal>
                <Section title="Placement Insights">
                  {college.content.placement_insights}
                </Section>
              </ScrollReveal>
            )}

            {college.content?.campus_life && (
              <ScrollReveal>
                <Section title="Campus Life">
                  {college.content.campus_life}
                </Section>
              </ScrollReveal>
            )}

            <ScrollReveal>
              <Section title="Admission Process">
                <p>{college.content?.admission || `Admission to ${college.name} for 2026 is based on national entrance exams. The process typically involves an application phase, followed by entrance test results and centralized counselling.`}</p>
              </Section>
            </ScrollReveal>



            {/* COURSES & FEES */}
            <section id="courses-fees" className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Courses & Fees</h2>
              <div className="overflow-x-auto -mx-8">
                {courses.length > 0 ? (
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-left border-b border-slate-100">
                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Program</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Fees</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Eligibility</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {courses.map((c) => (
                        <tr key={c.id} className={c.is_popular ? "bg-blue-50/30" : ""}>
                          <td className="px-8 py-6">
                            <div className="font-bold text-slate-900 text-base">{c.name}</div>
                            <div className="text-xs text-slate-500 font-medium mt-1">{c.duration} Full Time</div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="font-bold text-slate-900">{formatFees(c.fees)}</div>
                            <div className="text-[10px] text-blue-600 font-bold uppercase mt-1">Total Course Fee</div>
                          </td>
                          <td className="px-8 py-6 text-sm text-slate-600 leading-relaxed max-w-xs">{c.eligibility}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="px-8 py-12 text-center text-gray-500 italic bg-slate-50 border-y border-slate-100">
                    Comprehensive course details are being updated. {college.name} offers specialized programs in {college.stream}.
                  </div>
                )}
              </div>
            </section>

            {/* PLACEMENTS */}
            <section id="placements" className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Placements {college.content?.placements?.year ?? '2025'}</h2>
                {college.placement_rate && (
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {college.placement_rate}% Placement Success
                  </span>
                )}
              </div>

              {college.content?.placements ? (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: 'Avg Package', val: formatPackage(college.content.placements.avg_package) },
                      { label: 'Highest Package', val: formatPackage(college.content.placements.highest_package) },
                      { label: 'Top Recruiters', val: college.content.placements.companies_visited ? `${college.content.placements.companies_visited}+` : '50+' },
                      { label: 'Total Offers', val: college.content.placements.total_offers?.toLocaleString('en-IN') ?? '—' },
                    ].map((s) => (
                      <div key={s.label} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="text-xl font-bold text-slate-900">{s.val}</div>
                        <div className="text-[10px] uppercase font-bold text-slate-500 mt-1">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {college.content.placements.recruiters?.length > 0 && (
                    <div className="pt-6 border-t border-slate-100">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Top Hiring Partners</h3>
                      <div className="flex flex-wrap gap-3">
                        {college.content.placements.recruiters.map((r) => (
                          <span key={r} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 shadow-sm">
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-500 italic py-10 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  Placement data is being verified. This college has a strong track record of corporate placements.
                </p>
              )}
            </section>

            {/* CUTOFFS */}
            <section id="cutoffs" className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Entrance Cutoffs</h2>
                <div className="text-[10px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded uppercase tracking-wide">Final Round Stats</div>
              </div>
              
              <div className="overflow-x-auto -mx-8">
                {cutoffs.length > 0 ? (
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-left border-b border-slate-100">
                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Specialization</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Closing Rank</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {cutoffs.map((ct) => (
                        <tr key={ct.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-8 py-5 font-bold text-slate-900">{ct.branch}</td>
                          <td className="px-8 py-5 text-sm text-slate-500 font-medium">{ct.category} ({ct.gender})</td>
                          <td className="px-8 py-5 text-right font-black text-blue-600 text-lg">{ct.closing_rank}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="px-8 py-12 text-center text-gray-500 italic bg-slate-50 border-y border-slate-100">
                    Latest entrance cutoffs will be published after the 2026 counseling results.
                  </div>
                )}
              </div>
            </section>

            {/* GALLERY */}
            <section id="gallery" className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Campus Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayGallery.map((img) => (
                  <div key={img.id} className="group relative overflow-hidden rounded-xl border border-slate-100 shadow-sm">
                    <img 
                      src={img.image_url} 
                      alt={img.caption} 
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    {img.caption && (
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                        <p className="text-[10px] font-bold text-white uppercase tracking-widest">{img.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
            {college.video_url && (
              <section id="campus-tour" className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Campus Tour</h2>
                <div className="aspect-video w-full overflow-hidden rounded-xl border border-slate-100">
                  <iframe
                    width="100%"
                    height="100%"
                    src={college.video_url}
                    title="Campus Tour"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </section>
            )}

            {/* SCHOLARSHIPS */}
            {scholarships.length > 0 && (
              <section id="scholarships" className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Scholarships & Aid</h2>
                <div className="overflow-x-auto -mx-8">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-left border-b border-slate-100">
                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Scholarship</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Eligibility</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {scholarships.map((s) => (
                        <tr key={s.id}>
                          <td className="px-8 py-6 font-bold text-slate-900">{s.name}</td>
                          <td className="px-8 py-6 text-blue-600 font-bold">{s.amount}</td>
                          <td className="px-8 py-6 text-sm text-slate-600 leading-relaxed">{s.eligibility}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* REVIEWS */}
            <section id="reviews" className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-bold text-slate-900">Student Experiences</h2>
                <div className="flex items-center gap-3">
                  <div className="flex text-yellow-400">
                    {[1,2,3,4,5].map(s => <span key={s}>★</span>)}
                  </div>
                  <span className="text-lg font-bold text-slate-900">{college.rating}</span>
                  <span className="text-sm text-slate-400 font-medium">({college.review_count} reviews)</span>
                </div>
              </div>
              
              <div className="space-y-12 mb-12">
                {college.content?.reviews && college.content.reviews.length > 0 ? college.content.reviews.map((r) => (
                  <div key={r.id} className="group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-900 text-lg uppercase">
                          {r.user_name[0]}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{r.user_name}</div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{r.user_tag}</div>
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full uppercase">
                        Rating {r.rating}/5
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed leading-relaxed pl-16">"{r.comment}"</p>
                  </div>
                )) : (
                  <p className="text-center text-gray-400 italic py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    Be the first to share your experience at {college.name}.
                  </p>
                )}
              </div>

              <div className="pt-10 border-t border-slate-100">
                <ReviewForm collegeId={college.id} />
              </div>
            </section>
            {/* FAQS */}
            <section id="faqs" className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
              <div className="space-y-10">
                {displayFaqs.map((f, i) => (
                  <div key={i} className="group">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex gap-3">
                      <span className="text-blue-600 font-black">Q.</span>
                      {f.q}
                    </h3>
                    <p className="text-slate-600 leading-relaxed leading-relaxed pl-8 border-l-2 border-slate-50 group-hover:border-blue-100 transition-colors">
                      {f.a}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 pt-10 border-t border-slate-100">
                <QuestionForm collegeId={college.id} />
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: SIDEBAR TOOLS */}
          <aside className="lg:col-span-1">
            <div className="space-y-6 sticky top-24 animate-fade-in">

              {/* 🔥 PRIMARY CTA */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl hover:scale-[1.02] transition text-white p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-2">
                  Admission Helper 2026
                </h3>

                <p className="text-sm text-slate-300 mb-5">
                  Get personalized college prediction, cutoff analysis & admission guidance.
                </p>

                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg hover:shadow-xl hover:scale-[1.03] transition py-3 rounded-xl font-semibold mb-3">
                  Check Eligibility
                </button>

                <button className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-xl text-sm transition text-slate-200">
                  Download Brochure
                </button>
              </div>


              {/* 📊 QUICK STATS (VERY IMPORTANT) */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-400 uppercase mb-4">
                  Quick Facts
                </h3>

                <div className="space-y-3 text-sm">
                  {[
                    { label: 'Location', val: `${college.location}, ${college.state}` },
                    { label: 'Established', val: college.established },
                    { label: 'Ownership', val: college.ownership },
                    { label: 'Avg Package', val: college.avg_package ? `₹${college.avg_package} LPA` : 'N/A' },
                    { label: 'NIRF Rank', val: college.nirf_rank || '—' },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between border-b border-slate-50 pb-2 last:border-0">
                      <span className="text-slate-500">{item.label}</span>
                      <span className="font-semibold text-slate-900">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>


              {/* 📅 IMPORTANT DATES */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-400 uppercase mb-4">
                  Important Dates
                </h3>

                {important_dates.length > 0 ? (
                  <div className="space-y-4">
                    {important_dates.slice(0, 3).map((d) => (
                      <div key={d.id} className="flex gap-3 items-center">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex flex-col items-center justify-center border border-slate-200 flex-shrink-0">
                          <span className="text-[10px] font-bold text-slate-500 uppercase">
                            {new Date(d.event_date).toLocaleString('en-IN', { month: 'short' })}
                          </span>
                          <span className="text-sm font-black text-slate-900 leading-none">
                            {new Date(d.event_date).getDate()}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-slate-700 leading-tight">
                          {d.event_name}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400 italic">
                    Dates will be updated soon
                  </p>
                )}
              </div>


              {/* 🏆 RANKINGS */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-400 uppercase mb-4">
                  Rankings
                </h3>

                {rankings.length > 0 ? (
                  <div className="space-y-3">
                    {rankings.slice(0, 3).map((r) => (
                      <div key={r.id} className="flex justify-between items-center">
                        <span className="text-sm text-slate-600 font-medium">{r.agency}</span>
                        <span className="font-black text-slate-900">#{r.rank}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400 italic">
                    Ranking data coming soon
                  </p>
                )}
              </div>


              {/* 🔗 RELATED COLLEGES (SEO GOLD) */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-400 uppercase mb-4">
                  Similar Colleges
                </h3>

                {similarColleges.length > 0 ? (
                  <div className="space-y-3">
                    {similarColleges.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/colleges/${c.slug}`}
                        className="block text-sm text-slate-700 hover:text-blue-600 font-medium transition-colors"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400 italic">
                    More colleges coming soon
                  </p>
                )}
              </div>


              {/* ⚔️ COMPARISONS (VERY IMPORTANT FOR SEO) */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-400 uppercase mb-4">
                  Compare
                </h3>

                {similarColleges.slice(0, 3).map((c) => (
                  <Link
                    key={c.slug}
                    href={`/compare/${college.slug}-vs-${c.slug}`}
                    className="block text-sm text-blue-600 hover:underline mb-2 last:mb-0 font-medium"
                  >
                    {college.short_name} vs {c.name}
                  </Link>
                ))}
              </div>

            </div>
          </aside>

        </div>
      </main>
    </div>
      </div>
  )
}

