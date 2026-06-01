'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import {
  Search, Filter, ArrowUpDown, GraduationCap, Building,
  CheckCircle2, MapPin, Star, Award, Layers,
  ChevronRight, ArrowRight, DollarSign,
  TrendingUp, HelpCircle, BookOpen
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLeadCapture } from '@/hooks/useLeadCapture'
import LeadModal from '@/components/ui/LeadModal'
import ReviewModal from '@/components/ui/ReviewModal'
import { useRouter } from 'next/navigation'

// ─── Interfaces ──────────────────────────────────────────────────────────────

interface DbCollege {
  id: string
  slug: string
  name: string
  short_name?: string | null
  location: string
  state: string
  stream: string
  nirf_rank?: number | null
  total_fee?: string | null
  avg_package?: number | null
  highest_package?: number | null
  rating?: number | null
  type?: string | null
  ownership?: string | null
  entrance_exam?: string | null
  verified: boolean
}

// Accent configuration per stream
const STREAM_ACCENTS: Record<string, { bg: string; text: string; border: string; accent: string }> = {
  Engineering: { bg: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-100', accent: 'sky' },
  Medical: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100', accent: 'rose' },
  Management: { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-100', accent: 'violet' },
  Pharmacy: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', accent: 'emerald' },
  Law: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', accent: 'amber' },
  Architecture: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-100', accent: 'teal' },
}

const DEFAULT_ACCENT = { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-100', accent: 'slate' }

export default function CollegesListPage() {
  const router = useRouter()
  const { isAuthorized } = useLeadCapture()

  const [colleges, setColleges] = useState<DbCollege[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)

  // Filters State
  const [searchQuery, setSearchQuery] = useState('')
  const [activeStream, setActiveStream] = useState('All')
  const [selectedState, setSelectedState] = useState('All')
  const [selectedOwnership, setSelectedOwnership] = useState('All')
  const [sortBy, setSortBy] = useState('rank') // rank, package, fee

  // Modals state
  const [selectedCollege, setSelectedCollege] = useState<DbCollege | null>(null)
  const [reviewCollege, setReviewCollege] = useState<DbCollege | null>(null)

  useEffect(() => {
    async function loadColleges() {
      try {
        setIsLoading(true)
        const { data, error } = await supabase
          .from('colleges')
          .select('id, slug, name, short_name, location, state, stream, nirf_rank, total_fee, avg_package, highest_package, rating, type, ownership, entrance_exam, verified')
          .eq('is_active', true)
          .limit(500)

        if (error) throw error

        if (data) {
          setColleges(data)
        }
      } catch (err: any) {
        console.error('Error loading colleges:', err)
        setFetchError(err.message || 'Failed to fetch colleges data')
      } finally {
        setIsLoading(false)
      }
    }
    loadColleges()
  }, [])

  // Dynamic filter arrays
  const uniqueStreams = ['All', ...Array.from(new Set(colleges.map(c => c.stream))).filter(Boolean)]
  const uniqueStates = ['All', ...Array.from(new Set(colleges.map(c => c.state))).filter(Boolean)].sort()
  const uniqueOwnerships = ['All', 'Government', 'Private']

  // Helper to parse fees numerically for sorting
  const parseFeeNumeric = (feeStr: string | null | undefined): number => {
    if (!feeStr) return 9999999
    // Try to extract lakhs or absolute numbers
    const cleaned = feeStr.toLowerCase().replace(/[^0-9.]/g, '')
    const num = parseFloat(cleaned)
    if (isNaN(num)) return 9999999
    if (feeStr.toLowerCase().includes('lakh')) {
      return num * 100000
    }
    return num
  }

  // Filter & Sort Logic
  const filteredColleges = colleges.filter(college => {
    const matchesSearch = !searchQuery || 
      college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (college.short_name && college.short_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      college.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.state.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStream = activeStream === 'All' || college.stream === activeStream
    const matchesState = selectedState === 'All' || college.state === selectedState
    const matchesOwnership = selectedOwnership === 'All' || 
      (college.ownership && college.ownership.toLowerCase().includes(selectedOwnership.toLowerCase())) ||
      (college.type && college.type.toLowerCase().includes(selectedOwnership.toLowerCase()))

    return matchesSearch && matchesStream && matchesState && matchesOwnership
  })

  // Sorting
  const sortedColleges = [...filteredColleges].sort((a, b) => {
    if (sortBy === 'rank') {
      const rankA = a.nirf_rank ?? 9999
      const rankB = b.nirf_rank ?? 9999
      return rankA - rankB
    }
    if (sortBy === 'package') {
      const pkgA = a.avg_package ?? 0
      const pkgB = b.avg_package ?? 0
      return pkgB - pkgA
    }
    if (sortBy === 'fee') {
      return parseFeeNumeric(a.total_fee) - parseFeeNumeric(b.total_fee)
    }
    return 0
  })

  // Dynamic statistics based on filtered results
  const totalVerified = filteredColleges.filter(c => c.verified).length
  const maxPackage = filteredColleges.reduce((max, c) => Math.max(max, c.avg_package || 0, c.highest_package || 0), 0)
  const avgPackage = filteredColleges.filter(c => c.avg_package).reduce((sum, c, _, arr) => sum + (c.avg_package || 0) / arr.length, 0)

  const handleOpenLead = (college: DbCollege) => {
    if (isAuthorized) {
      router.push(`/colleges/${college.slug}`)
    } else {
      setSelectedCollege(college)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50/50 text-slate-800 font-sans">
      <Navbar />

      {/* Dynamic Schema generation */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": sortedColleges.slice(0, 50).map((c, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": c.name,
              "url": `https://promoteeducation.org/colleges/${c.slug}`,
            })),
          }),
        }}
      />

      {/* ── HERO SECTION ──────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 border-b border-slate-100">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-200/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-[10px] font-black text-sky-600 tracking-[0.25em] uppercase">
                Directory Hub
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black text-slate-900 leading-[1.1] tracking-tighter mb-6">
              Top Colleges in India <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-teal-500 to-indigo-600">
                Rankings, Fees & Placements
              </span>
            </h1>

            <p className="text-slate-500 text-base md:text-lg max-w-2xl leading-relaxed font-medium">
              Explore and evaluate the finest universities in India. Filter by streams, states, and fee brackets to find the ideal match for your career objectives.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-slate-200/60 mt-12">
            <div>
              <p className="text-2xl font-black text-slate-900 leading-none mb-1">
                {isLoading ? '...' : filteredColleges.length}
              </p>
              <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Matching Institutes</span>
            </div>
            <div>
              <p className="text-2xl font-black text-emerald-600 leading-none mb-1">
                {isLoading ? '...' : maxPackage ? `₹${maxPackage.toFixed(1)} L` : 'N/A'}
              </p>
              <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Top CTC Package</span>
            </div>
            <div>
              <p className="text-2xl font-black text-sky-600 leading-none mb-1">
                {isLoading ? '...' : avgPackage ? `₹${avgPackage.toFixed(1)} L` : 'N/A'}
              </p>
              <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Average Package</span>
            </div>
            <div>
              <p className="text-2xl font-black text-indigo-600 leading-none mb-1">
                {isLoading ? '...' : `${totalVerified}`}
              </p>
              <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Verified Audits</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEARCH & FILTER DIRECTORY ENGINE ──────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          {/* Controls Bar */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xl shadow-slate-100/50 mb-10 flex flex-col gap-6">
            {/* Search + Selectors */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              {/* Search input */}
              <div className="lg:col-span-6 relative">
                <Search size={16} className="text-slate-400 absolute left-4.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by college name, short name, city or state..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-200 transition-all font-medium"
                />
              </div>

              {/* State Filter */}
              <div className="lg:col-span-2 relative">
                <select
                  value={selectedState}
                  onChange={e => setSelectedState(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 text-sm text-slate-800 focus:outline-none focus:border-slate-200 font-bold appearance-none cursor-pointer"
                >
                  <option value="All">All States</option>
                  {uniqueStates.filter(s => s !== 'All').map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              {/* Ownership Type */}
              <div className="lg:col-span-2 relative">
                <select
                  value={selectedOwnership}
                  onChange={e => setSelectedOwnership(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 text-sm text-slate-800 focus:outline-none focus:border-slate-200 font-bold appearance-none cursor-pointer"
                >
                  <option value="All">All Types</option>
                  <option value="Government">Government / Public</option>
                  <option value="Private">Private</option>
                </select>
              </div>

              {/* Sort selector */}
              <div className="lg:col-span-2 relative">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 text-sm text-slate-800 focus:outline-none focus:border-slate-200 font-bold appearance-none cursor-pointer"
                >
                  <option value="rank">Sort: NIRF Rank</option>
                  <option value="package">Sort: Avg Package</option>
                  <option value="fee">Sort: Low Course Fee</option>
                </select>
              </div>
            </div>

            {/* Stream tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar border-t border-slate-50 pt-4">
              {uniqueStreams.map(stream => {
                const isActive = activeStream === stream
                const count = stream === 'All' ? colleges.length : colleges.filter(c => c.stream === stream).length
                const accent = STREAM_ACCENTS[stream] || DEFAULT_ACCENT
                return (
                  <button
                    key={stream}
                    onClick={() => setActiveStream(stream)}
                    className={cn(
                      "flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 border",
                      isActive
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-white hover:bg-slate-50 text-slate-650 border-slate-150/70"
                    )}
                  >
                    <span>{stream}</span>
                    <span className={cn(
                      "text-[9px] px-1.5 py-0.5 rounded-full font-black",
                      isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                    )}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Directory Listings */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-3xl bg-slate-100 min-h-[350px]" />
              ))}
            </div>
          ) : fetchError ? (
            <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl max-w-lg mx-auto p-8 shadow-sm">
              <h3 className="text-lg font-bold text-rose-600 mb-2">Failed to load directory</h3>
              <p className="text-slate-500 text-sm">{fetchError}</p>
            </div>
          ) : sortedColleges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedColleges.map((college) => {
                const streamStyle = STREAM_ACCENTS[college.stream] || DEFAULT_ACCENT
                return (
                  <div
                    key={college.id}
                    className="bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-350 flex flex-col justify-between h-full group"
                  >
                    <div className="p-6 flex-1">
                      {/* Top badges */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={cn(
                          'text-[9px] font-black px-2.5 py-0.5 rounded-full tracking-wider uppercase border',
                          streamStyle.bg, streamStyle.text, streamStyle.border
                        )}>
                          {college.stream}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {college.verified && (
                            <span className="bg-emerald-50 text-emerald-600 text-[8px] font-black px-2 py-0.5 rounded-full border border-emerald-100 uppercase tracking-wider">
                              Verified
                            </span>
                          )}
                          {college.nirf_rank && (
                            <span className="text-slate-400 text-[9px] font-extrabold uppercase">
                              NIRF #{college.nirf_rank}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Name & Location */}
                      <h3 className="text-base md:text-lg font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors mb-2 leading-snug">
                        {college.name}
                      </h3>
                      
                      <p className="text-slate-550 text-xs flex items-center gap-1.5 mb-6">
                        <MapPin size={12} className="text-slate-400" />
                        {college.location}, {college.state}
                      </p>

                      {/* Info grid */}
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50 mb-6">
                        <div>
                          <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider mb-1">Total Fee</p>
                          <p className="text-slate-900 font-extrabold text-xs md:text-sm">
                            {college.total_fee || 'TBD'}
                          </p>
                        </div>
                        <div>
                          <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider mb-1">Avg Package</p>
                          <p className="text-sky-600 font-extrabold text-xs md:text-sm">
                            {college.avg_package ? `₹${college.avg_package} LPA` : 'N/A'}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {college.entrance_exam && (
                          <span className="bg-slate-50 border border-slate-100 text-[9px] font-black text-slate-500 px-2 py-1 rounded-lg">
                            Exam: {college.entrance_exam}
                          </span>
                        )}
                        {college.ownership && (
                          <span className="bg-slate-50 border border-slate-100 text-[9px] font-black text-slate-500 px-2 py-1 rounded-lg">
                            {college.ownership}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions bar */}
                    <div className="grid grid-cols-2 border-t border-slate-100 bg-slate-50/50">
                      <button
                        onClick={() => handleOpenLead(college)}
                        className="py-3.5 text-center text-[10px] font-black uppercase tracking-wider text-slate-600 hover:bg-sky-600 hover:text-white transition-colors border-r border-slate-100"
                      >
                        Get Counselor Help
                      </button>
                      <Link
                        href={`/colleges/${college.slug}`}
                        className="py-3.5 text-center text-[10px] font-black uppercase tracking-wider text-sky-600 hover:bg-sky-600 hover:text-white transition-colors"
                      >
                        Full Details
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-slate-100 rounded-[32px] max-w-lg mx-auto">
              <Search size={36} className="mx-auto text-slate-350 mb-4" />
              <h3 className="text-base font-extrabold text-slate-900 mb-1">No matches found</h3>
              <p className="text-xs text-slate-400">Try modifying your state, stream, or query filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── FEATURED COMPARISONS SECTION ───────────────────────────────────────── */}
      {!isLoading && sortedColleges.length > 1 && (
        <section className="py-16 bg-white border-y border-slate-100">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="mb-12">
              <span className="text-[10px] font-black text-sky-600 tracking-[0.25em] uppercase mb-2 block">
                Popular Head-to-Head
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Featured Comparisons
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedColleges.slice(0, 12).map((c1, i) => {
                const c2 = sortedColleges[i + 1]
                if (!c2) return null
                return (
                  <Link
                    key={i}
                    href="/#compare-section"
                    className="bg-slate-50 border border-slate-100/70 p-5 rounded-2xl text-xs md:text-sm font-extrabold text-slate-700 hover:text-sky-600 hover:border-sky-200 hover:bg-white hover:shadow-md transition-all flex items-center justify-between group"
                  >
                    <span className="truncate pr-4">{c1.name} vs {c2.name}</span>
                    <span className="text-slate-300 group-hover:text-sky-500 group-hover:translate-x-1.5 transition-all">
                      →
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── SEO TRAFFIC MAGNETS ────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50/20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <h3 className="text-sm font-black uppercase text-slate-405 tracking-wider mb-6">
            Explore by Stream & Location
          </h3>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <Link href="/colleges/engineering-in-delhi" className="text-sky-600 hover:text-sky-700 font-bold text-xs uppercase tracking-wider">
              Engineering in Delhi
            </Link>
            <Link href="/colleges/engineering-in-mumbai" className="text-sky-600 hover:text-sky-700 font-bold text-xs uppercase tracking-wider">
              Engineering in Mumbai
            </Link>
            <Link href="/colleges/mbbs-in-india" className="text-sky-600 hover:text-sky-700 font-bold text-xs uppercase tracking-wider">
              MBBS in India
            </Link>
            <Link href="/colleges/law-in-india" className="text-sky-600 hover:text-sky-700 font-bold text-xs uppercase tracking-wider">
              Law in India
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER CALL-TO-ACTION ──────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,182,255,0.08),transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-6">
            Can't find what you're looking for?
          </h2>
          <p className="text-slate-400 text-sm md:text-base mb-10 max-w-xl mx-auto leading-relaxed font-medium">
            Our education experts are here to help you find the perfect college matching your profile, budget, and career goals.
          </p>
          <button className="bg-sky-500 hover:bg-sky-600 text-white px-10 py-5 rounded-2xl font-bold hover:-translate-y-0.5 active:scale-95 transition-all shadow-xl shadow-sky-500/10 text-xs uppercase tracking-widest">
            Speak to a Counselor
          </button>
        </div>
      </section>

      <Footer />

      {/* Counselor lead modals */}
      {selectedCollege && (
        <LeadModal 
          isOpen={!!selectedCollege} 
          onClose={() => setSelectedCollege(null)} 
          collegeName={selectedCollege.name} 
          stream={selectedCollege.stream}
        />
      )}
      {reviewCollege && (
        <ReviewModal
          isOpen={!!reviewCollege}
          onClose={() => setReviewCollege(null)}
          collegeName={reviewCollege.name}
        />
      )}
    </main>
  )
}
