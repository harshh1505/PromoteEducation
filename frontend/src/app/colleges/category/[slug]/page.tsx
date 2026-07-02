import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 86400

interface College {
  id: string
  name: string
  slug: string
  location: string
  state: string
  stream: string
  nirf_rank: number
  rating: number
  total_fee: string
  avg_package: number
}

// 🔥 Helper to parse "stream-in-location" slugs
function parseSlug(slug: string) {
  const parts = slug.split('-in-')
  if (parts.length < 2) return null
  
  return {
    stream: parts[0].replace(/-/g, ' '),
    location: parts[1].replace(/-/g, ' ')
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const query = parseSlug(resolvedParams.slug)
  if (!query) return notFound()

  // Fetch colleges matching stream AND location/state
  const { data: colleges, error } = await supabase
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
          <p className="text-slate-600 mb-8">We couldn't find any {query.stream} colleges in {query.location} yet. Try exploring other regions!</p>
          <Link href="/colleges" className="inline-block bg-sky-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-sky-700 transition-all">
            Explore All Colleges
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: colleges?.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: c.name,
              url: `https://yourdomain.com/colleges/${c.slug}`,
            })),
          }),
        }}
      />
      {/* HERO SECTION */}
      <section className="bg-slate-900 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-sky-500/10 text-sky-400 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-sky-500/20 uppercase tracking-wider">
            Category Guide 2026
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 capitalize leading-tight">
            Best {query.stream} Colleges in <span className="text-sky-400">{query.location}</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Discover and compare the top-rated {query.stream} institutions in {query.location} based on rankings, placements, fees, and student reviews.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* MAIN LIST */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-900">
                {colleges.length} {query.stream} Colleges Found
              </h2>
              <div className="text-sm text-slate-500 font-medium">Sorted by Rank</div>
            </div>

            {colleges.map((college) => (
              <Link 
                key={college.id} 
                href={`/colleges/${college.slug}`}
                className="block bg-white border border-slate-100 p-6 rounded-2xl hover:shadow-xl transition-all group hover:border-sky-100"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {college.nirf_rank && (
                        <span className="bg-amber-50 text-amber-600 text-xs font-bold px-2 py-1 rounded border border-amber-100 uppercase">
                          NIRF #{college.nirf_rank}
                        </span>
                      )}
                      <span className="bg-sky-50 text-sky-600 text-xs font-bold px-2 py-1 rounded border border-sky-100 uppercase">
                        {college.stream}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors mb-2">
                      {college.name}
                    </h3>
                    <p className="text-slate-500 font-medium flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {college.location}, {college.state}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-6 md:text-right border-t md:border-t-0 pt-4 md:pt-0 border-slate-50">
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Total Fee</p>
                      <p className="text-slate-900 font-bold">{college.total_fee || 'TBD'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Avg Package</p>
                      <p className="text-sky-600 font-bold">₹{college.avg_package || 'N/A'} LPA</p>
                    </div>
                    <div className="hidden md:block">
                      <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white group-hover:bg-sky-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* SIDEBAR */}
          <div className="space-y-8">
            <div className="bg-white border border-slate-100 p-6 rounded-2xl">
              <h4 className="text-lg font-bold text-slate-900 mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {['Admission 2026', 'Fee Structure', 'Cutoff Trends', 'Placements 2025'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-600 hover:text-sky-600 font-medium flex items-center justify-between group">
                      {link}
                      <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-sky-600 p-8 rounded-2xl text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="text-2xl font-bold mb-4">Need Career Guidance?</h4>
                <p className="text-sky-100 mb-6 leading-relaxed">Talk to our experts and find the perfect college matching your profile and budget.</p>
                <button className="w-full bg-white text-sky-600 py-4 rounded-xl font-bold shadow-lg hover:bg-sky-50 transition-colors uppercase tracking-wider text-sm">
                  Get Free Counselling
                </button>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            </div>
          </div>

        </div>
      </div>
      {/* Internal Links (Traffic Magnet) */}
      <section className="max-w-6xl mx-auto px-6 pb-20 border-t border-slate-100 pt-16">
        <h2 className="text-xl font-bold mb-8 text-slate-900 flex items-center gap-2">
          <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          Explore by Location
        </h2>
        <div className="flex flex-wrap gap-x-12 gap-y-4">
          <Link href={`/colleges/${query.stream.replace(/\s+/g, '-').toLowerCase()}-in-delhi`} className="text-sky-600 hover:text-sky-700 font-bold text-sm transition-colors uppercase tracking-wide">
            {query.stream} in Delhi
          </Link>
          <Link href={`/colleges/${query.stream.replace(/\s+/g, '-').toLowerCase()}-in-mumbai`} className="text-sky-600 hover:text-sky-700 font-bold text-sm transition-colors uppercase tracking-wide">
            {query.stream} in Mumbai
          </Link>
          <Link href={`/colleges/${query.stream.replace(/\s+/g, '-').toLowerCase()}-in-bangalore`} className="text-sky-600 hover:text-sky-700 font-bold text-sm transition-colors uppercase tracking-wide">
            {query.stream} in Bangalore
          </Link>
          <Link href={`/colleges/${query.stream.replace(/\s+/g, '-').toLowerCase()}-in-pune`} className="text-sky-600 hover:text-sky-700 font-bold text-sm transition-colors uppercase tracking-wide">
            {query.stream} in Pune
          </Link>
        </div>
      </section>
    </div>
  )
}
