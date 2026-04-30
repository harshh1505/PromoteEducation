import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const revalidate = 86400

export async function generateStaticParams() {
  const { data } = await supabase
    .from('colleges')
    .select('slug')
    .order('nirf_rank', { ascending: true })
    .limit(30)

  if (!data) return []

  const pairs = []
  for (let i = 0; i < data.length - 1; i++) {
    pairs.push({
      slug: `${data[i].slug}-vs-${data[i+1].slug}`
    })
  }

  return pairs
}

function parseSlug(slug: string) {
  const parts = slug.split('-vs-')
  if (parts.length !== 2) return null

  return {
    college1: parts[0],
    college2: parts[1],
  }
}

async function getCollegeBySlug(slug: string) {
  const { data } = await supabase
    .from('colleges')
    .select('*')
    .eq('slug', slug)
    .single()

  return data
}

function getWinner(c1: any, c2: any) {
  if (!c1 || !c2) return null

  const r1 = c1.nirf_rank || 999
  const r2 = c2.nirf_rank || 999

  if (r1 < r2) return c1.name
  if (r2 < r1) return c2.name

  const p1 = c1.avg_package || 0
  const p2 = c2.avg_package || 0

  if (p1 > p2) return c1.name
  if (p2 > p1) return c2.name

  return "Both are comparable"
}

export async function generateMetadata({ params }: any) {
  const parsed = parseSlug(params.slug)
  if (!parsed) return { title: 'Comparison' }

  return {
    title: `${parsed.college1.replace(/-/g, ' ').toUpperCase()} vs ${parsed.college2.replace(/-/g, ' ').toUpperCase()} 2026 Comparison`,
    description: `Compare ${parsed.college1} and ${parsed.college2} based on fees, placements, rankings, and admission process.`,
  }
}

export default async function Page({ params }: any) {
  const parsed = parseSlug(params.slug)
  if (!parsed) return notFound()

  const c1 = await getCollegeBySlug(parsed.college1)
  const c2 = await getCollegeBySlug(parsed.college2)

  if (!c1 || !c2) {
    return (
      <>
        <Navbar />
        <div className="p-10 pt-48 pb-32 max-w-6xl mx-auto text-center min-h-[60vh]">
          <h1 className="text-3xl font-bold mb-4 text-slate-900">Comparison Data Missing</h1>
          <p className="text-slate-600 mb-8 text-balance max-w-lg mx-auto">We couldn't find the exact data for these colleges. This happens if the college slugs have changed or the comparison is invalid.</p>
          <Link href="/colleges" className="inline-block bg-sky-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-sky-500 transition-all shadow-lg shadow-sky-100">
            Explore All Colleges
          </Link>
        </div>
        <Footer />
      </>
    )
  }

  const winner = getWinner(c1, c2)

  // Fetch AI-generated comparison content
  const { data: comp } = await supabase
    .from('comparisons')
    .select('content')
    .eq('slug', params.slug)
    .single()

  const aiContent = comp?.content as any

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
        
        {/* STEP 1: HERO SECTION */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sky-600 font-bold text-xs uppercase tracking-widest mb-3">
            <span className="w-8 h-px bg-sky-600"></span>
            Comparison Guide 2026
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
            {c1.name} vs {c2.name}
          </h1>
          <p className="text-slate-500 max-w-2xl text-lg leading-relaxed">
            {aiContent?.overview || `A comprehensive side-by-side analysis of placements, rankings, fees, and campus life to help you choose between ${c1.short_name || c1.name} and ${c2.short_name || c2.name}.`}
          </p>
        </div>

        {/* STEP 3: QUICK VERDICT */}
        <div className="mb-8 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">Expert Verdict</p>
            <p className="text-emerald-900 text-lg font-bold leading-tight">
              Best Choice: <span className="text-emerald-700 underline decoration-emerald-200 decoration-2 underline-offset-4">{winner}</span>
            </p>
          </div>
        </div>

        {/* PROS & CONS (NEW) */}
        {aiContent?.pros && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">✓</span> Why Choose {c1.name}
              </h3>
              <ul className="space-y-2">
                {aiContent.pros[c1.name]?.map((pro: string, i: number) => (
                  <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span> {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">✓</span> Why Choose {c2.name}
              </h3>
              <ul className="space-y-2">
                {aiContent.pros[c2.name]?.map((pro: string, i: number) => (
                  <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span> {pro}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* STEP 2: WINNER CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* College 1 Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 -mr-16 -mt-16 rounded-full group-hover:bg-sky-50 transition-colors"></div>
            <div className="relative">
              <h2 className="font-bold text-xl text-slate-900 mb-2">{c1.name}</h2>
              <p className="text-sm text-slate-400 font-medium flex items-center gap-1.5 mb-6">
                <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {c1.location}, {c1.state}
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                  <span className="text-slate-500 text-sm">NIRF Rank</span>
                  <span className="font-bold text-slate-900">#{c1.nirf_rank || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                  <span className="text-slate-500 text-sm">Avg Package</span>
                  <span className="font-bold text-sky-600">₹{c1.avg_package || 'N/A'} LPA</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Placement</span>
                  <span className="font-bold text-slate-900">{c1.placement_rate || 'N/A'}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* College 2 Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 -mr-16 -mt-16 rounded-full group-hover:bg-sky-50 transition-colors"></div>
            <div className="relative">
              <h2 className="font-bold text-xl text-slate-900 mb-2">{c2.name}</h2>
              <p className="text-sm text-slate-400 font-medium flex items-center gap-1.5 mb-6">
                <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {c2.location}, {c2.state}
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                  <span className="text-slate-500 text-sm">NIRF Rank</span>
                  <span className="font-bold text-slate-900">#{c2.nirf_rank || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                  <span className="text-slate-500 text-sm">Avg Package</span>
                  <span className="font-bold text-sky-600">₹{c2.avg_package || 'N/A'} LPA</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Placement</span>
                  <span className="font-bold text-slate-900">{c2.placement_rate || 'N/A'}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 4: DETAILED COMPARISON TABLE */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-400">Comparison Criteria</th>
                  <th className="p-5 text-slate-900 font-bold text-center border-l border-slate-100/50">{c1.short_name || 'College A'}</th>
                  <th className="p-5 text-slate-900 font-bold text-center border-l border-slate-100/50">{c2.short_name || 'College B'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 font-semibold text-slate-700 text-sm">Ownership</td>
                  <td className="p-5 text-slate-600 text-sm text-center border-l border-slate-100/50">{c1.ownership}</td>
                  <td className="p-5 text-slate-600 text-sm text-center border-l border-slate-100/50">{c2.ownership}</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 font-semibold text-slate-700 text-sm">NIRF 2026 Ranking</td>
                  <td className="p-5 text-slate-900 font-bold text-sm text-center border-l border-slate-100/50">#{c1.nirf_rank || 'N/A'}</td>
                  <td className="p-5 text-slate-900 font-bold text-sm text-center border-l border-slate-100/50">#{c2.nirf_rank || 'N/A'}</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 font-semibold text-slate-700 text-sm">Average CTC</td>
                  <td className="p-5 text-sky-600 font-bold text-sm text-center border-l border-slate-100/50">₹{c1.avg_package || 'N/A'} LPA</td>
                  <td className="p-5 text-sky-600 font-bold text-sm text-center border-l border-slate-100/50">₹{c2.avg_package || 'N/A'} LPA</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 font-semibold text-slate-700 text-sm">Highest Package</td>
                  <td className="p-5 text-slate-600 text-sm text-center border-l border-slate-100/50">₹{c1.highest_package || 'N/A'} LPA</td>
                  <td className="p-5 text-slate-600 text-sm text-center border-l border-slate-100/50">₹{c2.highest_package || 'N/A'} LPA</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 font-semibold text-slate-700 text-sm">Placement Rate</td>
                  <td className="p-5 text-slate-600 text-sm text-center border-l border-slate-100/50">{c1.placement_rate || 'N/A'}%</td>
                  <td className="p-5 text-slate-600 text-sm text-center border-l border-slate-100/50">{c2.placement_rate || 'N/A'}%</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 font-semibold text-slate-700 text-sm">Established</td>
                  <td className="p-5 text-slate-600 text-sm text-center border-l border-slate-100/50">{c1.established}</td>
                  <td className="p-5 text-slate-600 text-sm text-center border-l border-slate-100/50">{c2.established}</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 font-semibold text-slate-700 text-sm">Location</td>
                  <td className="p-5 text-slate-600 text-sm text-center border-l border-slate-100/50">{c1.location}</td>
                  <td className="p-5 text-slate-600 text-sm text-center border-l border-slate-100/50">{c2.location}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* STEP 5: AI SUMMARY SECTION */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <span className="bg-sky-50 text-sky-600 text-[10px] font-black uppercase px-2 py-1 rounded tracking-tighter">AI Analysis</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            Which is Better: {c1.short_name || c1.name} or {c2.short_name || c2.name}?
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 leading-relaxed text-lg italic">
              {aiContent?.verdict || `
                "Both ${c1.name} and ${c2.name} are premier institutions in India. 
                ${c1.nirf_rank < c2.nirf_rank 
                  ? ` ${c1.name} holds a superior position in the NIRF 2026 rankings, suggesting a stronger overall academic reputation.`
                  : ` ${c2.name} holds a higher spot in the current NIRF rankings, reflecting its recent performance across key parameters.`
                } 
                ${Math.abs((c1.avg_package || 0) - (c2.avg_package || 0)) < 2 
                  ? ` Their placement figures are very similar, making the choice more about location and specific branch preference.` 
                  : (c1.avg_package > c2.avg_package 
                      ? ` ${c1.name} offers a significant advantage in terms of ROI with a higher average CTC of ₹${c1.avg_package} LPA.`
                      : ` ${c2.name} is currently leading in placement outcomes with an average package of ₹${c2.avg_package} LPA.`
                    )
                } 
                Ultimately, your decision should prioritize your preferred course of study and the alumni strength of each campus."
              `}
            </p>
          </div>
        </div>

        {/* STEP 6: INTERNAL LINKING */}
        <div className="border-t border-slate-200 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm text-slate-400 font-medium">Ready to take the next step? Explore individual profiles:</div>
          <div className="flex gap-4">
            <Link 
              href={`/colleges/${c1.slug}`} 
              className="bg-white border border-slate-200 px-6 py-3 rounded-xl text-sm font-bold text-slate-700 hover:border-sky-300 hover:text-sky-600 transition-all shadow-sm"
            >
              View Full Profile: {c1.short_name || c1.name}
            </Link>
            <Link 
              href={`/colleges/${c2.slug}`} 
              className="bg-white border border-slate-200 px-6 py-3 rounded-xl text-sm font-bold text-slate-700 hover:border-sky-300 hover:text-sky-600 transition-all shadow-sm"
            >
              View Full Profile: {c2.short_name || c2.name}
            </Link>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  )
}