'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import {
  Search, MapPin, ChevronDown, Building2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLeadCapture } from '@/hooks/useLeadCapture'
import LeadModal from '@/components/ui/LeadModal'
import ReviewModal from '@/components/ui/ReviewModal'
import { useRouter } from 'next/navigation'

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

export default function CollegesListPage() {
  const router = useRouter()
  const { isAuthorized } = useLeadCapture()

  const [colleges, setColleges] = useState<DbCollege[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Filters State
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('All Colleges')
  const [selectedState, setSelectedState] = useState('All States')
  const [selectedCity, setSelectedCity] = useState('All Cities')
  
  const [selectedCourseTypes, setSelectedCourseTypes] = useState<string[]>([])
  const [selectedOwnerships, setSelectedOwnerships] = useState<string[]>([])
  
  const [sortBy, setSortBy] = useState('NIRF Ranking') 

  // Modals state
  const [selectedCollege, setSelectedCollege] = useState<DbCollege | null>(null)
  const [reviewCollege, setReviewCollege] = useState<DbCollege | null>(null)

  useEffect(() => {
    async function loadColleges() {
      try {
        setIsLoading(true)
        const { data, error } = await supabase
          .from('colleges')
          .select('*')
          .eq('is_active', true)
          .limit(500)

        if (error) throw error
        if (data) setColleges(data)
      } catch (err) {
        console.error('Error loading colleges:', err)
      } finally {
        setIsLoading(false)
      }
    }
    loadColleges()
  }, [])

  const uniqueStreams = Array.from(new Set(colleges.map(c => c.stream))).filter(Boolean)
  const uniqueStates = Array.from(new Set(colleges.map(c => c.state))).filter(Boolean).sort()
  const uniqueCities = Array.from(new Set(colleges.map(c => c.location))).filter(Boolean).sort()

  const topTabs = ['All Colleges', ...uniqueStreams, 'More']

  const handleCourseTypeChange = (stream: string) => {
    setSelectedCourseTypes(prev => 
      prev.includes(stream) ? prev.filter(s => s !== stream) : [...prev, stream]
    )
  }

  const handleOwnershipChange = (own: string) => {
    setSelectedOwnerships(prev => 
      prev.includes(own) ? prev.filter(o => o !== own) : [...prev, own]
    )
  }

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedState('All States')
    setSelectedCity('All Cities')
    setSelectedCourseTypes([])
    setSelectedOwnerships([])
  }

  // Helper to parse fees numerically for sorting
  const parseFeeNumeric = (feeStr: string | null | undefined): number => {
    if (!feeStr) return 9999999
    const cleaned = feeStr.toLowerCase().replace(/[^0-9.]/g, '')
    const num = parseFloat(cleaned)
    if (isNaN(num)) return 9999999
    if (feeStr.toLowerCase().includes('lakh')) return num * 100000
    return num
  }

  // Filter & Sort Logic
  const filteredColleges = colleges.filter(college => {
    const matchesSearch = !searchQuery || 
      college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (college.short_name && college.short_name.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesTab = activeTab === 'All Colleges' || activeTab === 'More' || college.stream === activeTab
    
    const matchesState = selectedState === 'All States' || college.state === selectedState
    const matchesCity = selectedCity === 'All Cities' || college.location === selectedCity
    
    const matchesCourseType = selectedCourseTypes.length === 0 || selectedCourseTypes.includes(college.stream)
    const matchesOwnership = selectedOwnerships.length === 0 || 
      (college.ownership && selectedOwnerships.some(o => college.ownership!.toLowerCase().includes(o.toLowerCase())))

    return matchesSearch && matchesTab && matchesState && matchesCity && matchesCourseType && matchesOwnership
  })

  const sortedColleges = [...filteredColleges].sort((a, b) => {
    if (sortBy === 'NIRF Ranking') {
      return (a.nirf_rank ?? 9999) - (b.nirf_rank ?? 9999)
    }
    if (sortBy === 'Average Package') {
      return (b.avg_package ?? 0) - (a.avg_package ?? 0)
    }
    if (sortBy === 'Lowest Fee') {
      return parseFeeNumeric(a.total_fee) - parseFeeNumeric(b.total_fee)
    }
    return 0
  })

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      {/* ── BREADCRUMBS & HERO ────────────────────────────────────────────────── */}
      <div className="bg-white pt-32 pb-0 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <div className="text-xs text-blue-600 font-medium mb-5 flex items-center gap-2">
            <Link href="/" className="hover:text-blue-800 transition-colors">Home</Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500">Colleges</span>
          </div>

          <h1 className="text-4xl lg:text-[40px] font-bold text-slate-900 tracking-tight mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Explore Top Colleges in India
          </h1>
          <p className="text-slate-500 text-[15px] max-w-2xl leading-relaxed mb-10">
            Discover the most prestigious institutions. Filter by rankings, fees, and packages to find the perfect match for your educational journey.
          </p>

          {/* Top Tabs */}
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
            {topTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "pb-4 text-[14px] font-semibold whitespace-nowrap transition-all border-b-[3px] relative -bottom-[1px]",
                  activeTab === tab 
                    ? "border-blue-600 text-blue-700" 
                    : "border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300"
                )}
              >
                {tab}
                {tab === 'More' && <ChevronDown size={14} className="inline ml-1" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT (SIDEBAR + LIST) ─────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* LEFT SIDEBAR FILTERS */}
          <div className="w-full lg:w-[260px] flex-shrink-0 bg-white border border-slate-200/80 shadow-sm shadow-slate-100 rounded-xl p-5 hidden lg:block">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <h2 className="text-[15px] font-bold text-slate-900 uppercase tracking-wide">Filters</h2>
              <button onClick={clearAllFilters} className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                Clear All
              </button>
            </div>

            {/* Search */}
            <div className="mb-8">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Search</h3>
              <div className="relative group">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Find by name..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Location */}
            <div className="mb-8">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                Location
              </h3>
              <div className="space-y-3">
                <div className="relative">
                  <select
                    value={selectedState}
                    onChange={e => setSelectedState(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 appearance-none cursor-pointer focus:outline-none focus:bg-white focus:border-blue-500 transition-all hover:bg-slate-100"
                  >
                    <option value="All States">All States</option>
                    {uniqueStates.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    value={selectedCity}
                    onChange={e => setSelectedCity(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 appearance-none cursor-pointer focus:outline-none focus:bg-white focus:border-blue-500 transition-all hover:bg-slate-100"
                  >
                    <option value="All Cities">All Cities</option>
                    {uniqueCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Course Type */}
            <div className="mb-8">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Course Type</h3>
              <div className="space-y-3.5">
                {uniqueStreams.slice(0, 6).map(stream => (
                  <label key={stream} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCourseTypes.includes(stream)}
                        onChange={() => handleCourseTypeChange(stream)}
                        className="peer w-4 h-4 border-slate-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer appearance-none checked:bg-blue-600 checked:border-blue-600 transition-all"
                      />
                      <svg className="absolute w-3 h-3 pointer-events-none hidden peer-checked:block text-white left-0.5 top-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{stream}</span>
                  </label>
                ))}
                {uniqueStreams.length > 6 && (
                  <button className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors mt-2">
                    + View More
                  </button>
                )}
              </div>
            </div>

            {/* Ownership */}
            <div className="mb-2">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Ownership</h3>
              <div className="space-y-3.5">
                {['Government', 'Private', 'Deemed'].map(own => (
                  <label key={own} className="flex items-center gap-3 cursor-pointer group">
                     <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedOwnerships.includes(own)}
                        onChange={() => handleOwnershipChange(own)}
                        className="peer w-4 h-4 border-slate-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer appearance-none checked:bg-blue-600 checked:border-blue-600 transition-all"
                      />
                      <svg className="absolute w-3 h-3 pointer-events-none hidden peer-checked:block text-white left-0.5 top-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{own}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT LIST VIEW */}
          <div className="flex-1 w-full">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm text-slate-500 font-medium">
                Showing <strong className="text-slate-900 font-bold">{Math.min(20, sortedColleges.length)}</strong> of <strong className="text-slate-900 font-bold">{sortedColleges.length}</strong> colleges
              </span>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest hidden sm:inline-block">Sort By:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="pl-4 pr-10 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 appearance-none cursor-pointer focus:outline-none focus:border-blue-500 hover:border-slate-300 shadow-sm transition-all"
                  >
                    <option value="NIRF Ranking">NIRF Ranking</option>
                    <option value="Average Package">Average Package</option>
                    <option value="Lowest Fee">Lowest Fee</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* List */}
            {isLoading ? (
              <div className="bg-white border border-slate-200/80 shadow-sm shadow-slate-100 rounded-xl p-8">
                <div className="animate-pulse flex flex-col gap-10">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex gap-6 items-center">
                      <div className="w-16 h-16 bg-slate-100 rounded-full" />
                      <div className="flex-1 space-y-3">
                        <div className="h-5 bg-slate-100 rounded w-1/3" />
                        <div className="h-4 bg-slate-100 rounded w-1/4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : sortedColleges.length > 0 ? (
              <div className="bg-white border border-slate-200/80 shadow-sm shadow-slate-100 rounded-xl overflow-hidden flex flex-col divide-y divide-slate-100">
                {sortedColleges.map((college, index) => (
                  <div key={college.id} className="p-6 md:p-8 hover:bg-[#f8fafc] transition-colors duration-200 flex flex-col xl:flex-row items-start xl:items-center gap-6 group">
                    
                    {/* Number + Logo + Main Details Container */}
                    <div className="flex-1 min-w-0 flex items-start gap-5 w-full">
                        {/* Number */}
                        <div className="w-6 pt-1 text-center hidden sm:block">
                           <span className="text-[26px] font-bold text-slate-300 group-hover:text-blue-500 transition-colors leading-none" style={{ fontFamily: 'var(--font-display)' }}>
                             {index + 1}
                           </span>
                        </div>

                        {/* Logo */}
                        <div className="w-[68px] h-[68px] rounded-full border border-slate-200 flex-shrink-0 flex items-center justify-center bg-white shadow-sm overflow-hidden p-3 mt-1">
                           <Building2 size={28} className="text-slate-300" />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2 group-hover:text-blue-700 transition-colors cursor-pointer" style={{ fontFamily: 'var(--font-display)' }}>
                            {college.name}
                          </h3>
                          <div className="flex items-center gap-1.5 text-sm font-medium text-slate-500 mb-4">
                            <MapPin size={15} className="text-slate-400" />
                            {college.location}, {college.state}
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {college.stream && (
                              <span className="px-3.5 py-1.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full border border-slate-200/60">
                                {college.stream}
                              </span>
                            )}
                            {college.ownership && (
                              <span className="px-3.5 py-1.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full border border-slate-200/60">
                                {college.ownership}
                              </span>
                            )}
                          </div>
                        </div>
                    </div>

                    {/* Stats Columns & Button Container */}
                    <div className="flex flex-col md:flex-row items-start md:items-center w-full xl:w-auto gap-6 xl:gap-10 pl-0 sm:pl-[104px] xl:pl-0 mt-4 xl:mt-0">
                        {/* Stats */}
                        <div className="flex items-start gap-8 md:gap-12 w-full md:w-auto justify-between md:justify-start">
                          <div className="text-left min-w-[70px]">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">NIRF Rank</p>
                            <p className="text-base font-black text-slate-800">{college.nirf_rank ? `#${college.nirf_rank}` : '-'}</p>
                          </div>
                          <div className="text-left min-w-[110px]">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Avg Package</p>
                            <p className="text-base font-black text-slate-800">{college.avg_package ? `₹${college.avg_package.toFixed(2)} LPA` : '-'}</p>
                          </div>
                          <div className="text-left min-w-[90px] hidden sm:block">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Total Fee</p>
                            <p className="text-base font-black text-slate-800">{college.total_fee || '-'}</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="w-full md:w-[150px] flex-shrink-0 mt-2 md:mt-0">
                          <Link
                            href={`/colleges/${college.slug}`}
                            className="block w-full py-3 px-5 bg-white border-2 border-blue-600 text-blue-700 text-[14px] font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 text-center shadow-sm"
                          >
                            View Details
                          </Link>
                        </div>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-slate-200/80 shadow-sm rounded-xl p-20 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={24} className="text-slate-400" />
                </div>
                <p className="text-[17px] font-bold text-slate-900 mb-1">No colleges found</p>
                <p className="text-sm font-medium text-slate-500">Try adjusting your filters to see more results.</p>
              </div>
            )}
          </div>

        </div>
      </div>

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
