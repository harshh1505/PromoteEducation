import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export const revalidate = 86400

export const metadata = {
  title: 'Top Engineering Colleges in India 2026: NIRF Rankings & Fees',
  description:
    'Explore the best engineering colleges in India. Compare NIRF rankings, placements, and fee structures for IITs, NITs, and top private institutions.',
}

export default async function EngineeringCollegesPage() {
  const { data: colleges, error } = await supabase
    .from('colleges')
    .select(
      'id, name, slug, location, state, stream, nirf_rank, avg_package, total_fee'
    )
    .eq('stream', 'Engineering')
    .order('nirf_rank', { ascending: true, nullsFirst: false })
    .limit(500)

  if (error) {
    console.error('Error fetching engineering colleges:', error)
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

      {/* Header */}
      <section className="bg-slate-900 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-sky-500/10 text-sky-400 px-4 py-2 rounded-full text-xs font-bold mb-6 border border-sky-500/20 uppercase tracking-widest">
            Expert Ranking 2026
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Best Engineering Colleges in <span className="text-sky-400">India</span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            Compare India's premier engineering institutions based on rankings, placements, and infrastructure.
          </p>
        </div>
      </section>

      {/* SEO Content */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-4">
          Engineering Colleges in India – Overview
        </h2>
        <p className="text-slate-600 leading-relaxed">
          Engineering colleges in India include IITs, NITs, and leading private universities. Admissions are primarily based on JEE Main and JEE Advanced. These institutions offer strong academic programs, placement opportunities, and exposure to research and innovation.
        </p>
      </section>

      {/* List */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            Showing {colleges?.length || 0} Engineering Colleges
          </h2>
          <span className="text-sm font-semibold text-slate-400">
            Sorted by NIRF Rank
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {colleges?.map((college) => (
            <Link
              key={college.id}
              href={`/colleges/${college.slug}`}
              className="bg-white border p-6 rounded-2xl hover:shadow-xl transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  {college.nirf_rank && (
                    <span className="bg-amber-50 text-amber-600 text-xs font-bold px-2 py-1 rounded">
                      NIRF #{college.nirf_rank}
                    </span>
                  )}
                  <span className="bg-slate-50 text-slate-500 text-xs font-bold px-2 py-1 rounded uppercase">
                    {college.stream}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600">
                  {college.name}
                </h3>

                <p className="text-slate-500 text-sm mt-1">
                  {college.location}, {college.state}
                </p>
              </div>

              <div className="flex items-center gap-8 md:text-right">
                <div className="hidden sm:block">
                  <p className="text-xs text-slate-400 font-bold mb-1">
                    Avg Package
                  </p>
                  <p className="text-sky-600 font-bold">
                    ₹{college.avg_package || 'N/A'} LPA
                  </p>
                </div>

                <div className="hidden sm:block">
                  <p className="text-xs text-slate-400 font-bold mb-1">
                    Total Fee
                  </p>
                  <p className="text-slate-900 font-bold">
                    {college.total_fee || 'TBD'}
                  </p>
                </div>

                <div className="bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-sky-600">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* STEP 3: POPULAR COMPARISONS */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Popular Engineering Comparisons
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {colleges?.slice(0, 12).map((c1, i) => {
            const c2 = colleges[i + 1]
            if (!c2) return null
            return (
              <Link
                key={i}
                href="/#compare-section"
                className="bg-white border border-slate-100 p-5 rounded-2xl text-sm font-semibold text-slate-600 hover:text-sky-600 hover:border-sky-200 hover:shadow-lg transition-all flex items-center justify-between group"
              >
                <span>{c1.name} <span className="text-slate-300 mx-1 font-normal">vs</span> {c2.name}</span>
                <span className="text-slate-200 group-hover:text-sky-500 group-hover:translate-x-1 transition-all">→</span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Internal Links */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-xl font-bold mb-4">Explore by Location</h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/colleges/engineering-in-delhi" className="text-blue-600 underline">
            Engineering Colleges in Delhi
          </Link>
          <Link href="/colleges/engineering-in-mumbai" className="text-blue-600 underline">
            Engineering Colleges in Mumbai
          </Link>
          <Link href="/colleges/engineering-in-bangalore" className="text-blue-600 underline">
            Engineering Colleges in Bangalore
          </Link>
        </div>
      </section>

    </div>
  )
}