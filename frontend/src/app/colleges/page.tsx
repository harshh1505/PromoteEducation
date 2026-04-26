import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export const revalidate = 86400

export const metadata = {
  title: 'Top Colleges in India 2026: Rankings, Fees & Placements',
  description: 'Explore the best engineering, medical, and management colleges in India. Compare rankings, fee structures, and placement statistics for 2026.',
}

export default async function CollegesListPage() {
  // Fetch up to 100 colleges, starting with Engineering
  const { data: colleges, error } = await supabase
    .from('colleges')
    .select('*')
    .eq('stream', 'Engineering')
    .order('nirf_rank', { ascending: true, nullsFirst: false })
    .limit(500)

  if (error) {
    console.error('Error fetching colleges:', error)
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
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 pt-32 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Top Engineering Colleges in India <span className="text-sky-600">2026</span>
          </h1>
          <p className="text-slate-500 max-w-2xl leading-relaxed">
            A comprehensive list of India's leading engineering institutions ranked by NIRF and academic excellence. Explore fees, placements, and admission details for each.
          </p>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges?.map((college) => (
            <Link 
              key={college.id} 
              href={`/colleges/${college.slug}`}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all group flex flex-col h-full"
            >
              <div className="p-6 flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-sky-50 text-sky-600 text-[10px] font-bold px-2 py-0.5 rounded border border-sky-100 uppercase tracking-wider">
                    {college.stream}
                  </span>
                  {college.nirf_rank && (
                    <span className="text-slate-400 text-[10px] font-bold uppercase">NIRF #{college.nirf_rank}</span>
                  )}
                </div>
                
                <h2 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors mb-2 leading-snug">
                  {college.name}
                </h2>
                <p className="text-sm text-slate-500 flex items-center gap-1.5 mb-6">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {college.location}, {college.state}
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Total Fee</p>
                    <p className="text-slate-900 font-bold text-sm">{college.total_fee || 'TBD'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Avg Package</p>
                    <p className="text-sky-600 font-bold text-sm">₹{college.avg_package || 'N/A'} LPA</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 p-4 text-center border-t border-slate-100 group-hover:bg-sky-600 transition-colors">
                <span className="text-xs font-bold text-slate-600 group-hover:text-white uppercase tracking-widest">View Full Details</span>
              </div>
            </Link>
          ))}
        </div>

        {(!colleges || colleges.length === 0) && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No colleges found matching your criteria.</p>
          </div>
        )}
      </main>

      {/* FOOTER CALL-TO-ACTION */}
      <section className="bg-slate-900 py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Can't find what you're looking for?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto leading-relaxed">
            Our education experts are here to help you find the perfect college matching your profile, budget, and career goals.
          </p>
          <button className="bg-sky-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-sky-700 transition-all shadow-xl uppercase tracking-wider text-sm">
            Speak to a Counselor
          </button>
        </div>
      </section>
      {/* STEP 3: POPULAR COMPARISONS */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          Featured Comparisons
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {colleges?.slice(0, 12).map((c1, i) => {
            const c2 = colleges[i + 1]
            if (!c2) return null
            return (
              <Link
                key={i}
                href={`/compare/${c1.slug}-vs-${c2.slug}`}
                className="bg-white border border-slate-100 p-5 rounded-2xl text-sm font-semibold text-slate-600 hover:text-sky-600 hover:border-sky-200 hover:shadow-lg transition-all flex items-center justify-between group"
              >
                <span className="truncate">{c1.name} vs {c2.name}</span>
                <span className="text-slate-200 group-hover:text-sky-500 group-hover:translate-x-1 transition-all">→</span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Internal Links (Traffic Magnet) */}
      <section className="max-w-6xl mx-auto px-6 pb-20 pt-10">
        <h2 className="text-xl font-bold mb-6 text-slate-900">Explore by Stream & Location</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          <Link href="/colleges/engineering-in-delhi" className="text-sky-600 hover:text-sky-700 font-semibold text-sm">
            Engineering in Delhi
          </Link>
          <Link href="/colleges/engineering-in-mumbai" className="text-sky-600 hover:text-sky-700 font-semibold text-sm">
            Engineering in Mumbai
          </Link>
          <Link href="/colleges/mbbs-in-india" className="text-sky-600 hover:text-sky-700 font-semibold text-sm">
            MBBS in India
          </Link>
          <Link href="/colleges/law-in-india" className="text-sky-600 hover:text-sky-700 font-semibold text-sm">
            Law in India
          </Link>
        </div>
      </section>
    </div>
  )
}
