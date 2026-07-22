'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import {
  Search, MapPin, ChevronDown, ChevronUp, ChevronRight, ChevronLeft,
  Building2, Heart, Star, GraduationCap, Scale, Briefcase,
  Landmark, X, ArrowRight, SlidersHorizontal
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ── TYPES ─────────────────────────────────────────────────────────────────────

interface DbCollege {
  id: string
  slug: string
  name: string
  short_name?: string | null
  location: string
  state: string
  stream: string
  ranking?: number | null
  total_fee?: string | null
  avg_ctc?: string | null
  ownership?: string | null
  type?: string | null
  established?: number | null
  cover_image?: string | null
  image_url?: string | null
}

// ── CONSTANTS ─────────────────────────────────────────────────────────────────

const POPULAR_SEARCHES = ['IIT Delhi', 'MBA', 'Computer Science', 'Bangalore', 'Medical Colleges', 'B.Tech']

const CATEGORY_CONFIG = [
  { label: 'Top Engineering Colleges', stream: 'Engineering', icon: Building2, color: 'from-blue-600/80 to-blue-900/90' },
  { label: 'Top MBA Colleges', stream: 'Management', icon: Briefcase, color: 'from-emerald-600/80 to-emerald-900/90' },
  { label: 'Top Medical Colleges', stream: 'Medical', icon: Heart, color: 'from-rose-600/80 to-rose-900/90' },
  { label: 'Top Law Colleges', stream: 'Law', icon: Scale, color: 'from-amber-600/80 to-amber-900/90' },
  { label: 'Top Government Colleges', stream: '__government__', icon: Landmark, color: 'from-indigo-600/80 to-indigo-900/90' },
]

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'ranking', label: 'NIRF Ranking' },
  { value: 'package_desc', label: 'Highest Package' },
  { value: 'fee_asc', label: 'Lowest Fee' },
]

// ── MAIN PAGE COMPONENT ───────────────────────────────────────────────────────

export default function CollegesPage() {
  const [colleges, setColleges] = useState<DbCollege[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Filter state
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStreams, setSelectedStreams] = useState<string[]>([])
  const [selectedState, setSelectedState] = useState('All')
  const [selectedCity, setSelectedCity] = useState('All')
  const [selectedOwnerships, setSelectedOwnerships] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('popular')
  const [bdsCollegeIds, setBdsCollegeIds] = useState<Set<string>>(new Set())
  const [mbbsCollegeIds, setMbbsCollegeIds] = useState<Set<string>>(new Set())

  // UI state
  const [compareList, setCompareList] = useState<string[]>([])
  const [savedList, setSavedList] = useState<Set<string>>(new Set())
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [visibleCount, setVisibleCount] = useState(20)

  // Collapsible sidebar sections
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    location: true,
    stream: true,
    ownership: true,
  })

  // Category scroll
  const categoryScrollRef = React.useRef<HTMLDivElement>(null)

  // ── DATA LOADING ──────────────────────────────────────────────────────────

  useEffect(() => {
    async function loadColleges() {
      try {
        setIsLoading(true)
        const [collegesRes, bdsRes, mbbsRes] = await Promise.all([
          supabase
            .from('colleges')
            .select('*')
            .eq('is_active', true)
            .order('ranking', { ascending: true }),
          supabase
            .from('courses')
            .select('college_id')
            .eq('course_catalog_id', '9de59697-8f3b-48b0-9032-37b077cc9fe3'),
          supabase
            .from('courses')
            .select('college_id')
            .eq('course_catalog_id', 'f35ba06c-bd5c-42f8-be1d-376833eaeb08')
        ])

        if (collegesRes.error) throw collegesRes.error

        if (collegesRes.data) setColleges(collegesRes.data)
        if (bdsRes.data) {
          setBdsCollegeIds(new Set(bdsRes.data.map((c: any) => c.college_id)))
        }
        if (mbbsRes.data) {
          setMbbsCollegeIds(new Set(mbbsRes.data.map((c: any) => c.college_id)))
        }
      } catch (err) {
        console.error('Error loading colleges:', err)
      } finally {
        setIsLoading(false)
      }
    }
    loadColleges()
  }, [])

  // ── DERIVED DATA ──────────────────────────────────────────────────────────

  const uniqueStreams = useMemo(() => {
    const list = Array.from(new Set(colleges.map(c => c.stream))).filter(Boolean)
    
    // Replace "Medical" with separate "MBBS" and "BDS" filters
    const medIdx = list.indexOf('Medical')
    if (medIdx !== -1) {
      list.splice(medIdx, 1)
    }
    
    if (mbbsCollegeIds.size > 0 && !list.includes('MBBS')) {
      list.push('MBBS')
    }
    if (bdsCollegeIds.size > 0 && !list.includes('BDS')) {
      list.push('BDS')
    }
    return list.sort()
  }, [colleges, bdsCollegeIds, mbbsCollegeIds])

  const uniqueStates = useMemo(() =>
    Array.from(new Set(colleges.map(c => c.state))).filter(Boolean).sort()
  , [colleges])

  const uniqueCities = useMemo(() => {
    const filtered = selectedState === 'All'
      ? colleges
      : colleges.filter(c => c.state === selectedState)
    return Array.from(new Set(filtered.map(c => c.location))).filter(Boolean).sort()
  }, [colleges, selectedState])

  const streamCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    colleges.forEach(c => {
      if (c.stream && c.stream !== 'Medical') {
        counts[c.stream] = (counts[c.stream] || 0) + 1
      }
    })
    if (mbbsCollegeIds.size > 0) {
      counts['MBBS'] = mbbsCollegeIds.size
    }
    if (bdsCollegeIds.size > 0) {
      counts['BDS'] = bdsCollegeIds.size
    }
    return counts
  }, [colleges, bdsCollegeIds, mbbsCollegeIds])

  const ownershipCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    colleges.forEach(c => {
      if (c.ownership) {
        const normalized = c.ownership.charAt(0).toUpperCase() + c.ownership.slice(1).toLowerCase()
        counts[normalized] = (counts[normalized] || 0) + 1
      }
    })
    return counts
  }, [colleges])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    CATEGORY_CONFIG.forEach(cat => {
      if (cat.stream === '__government__') {
        counts[cat.stream] = colleges.filter(c =>
          c.ownership?.toLowerCase().includes('government')
        ).length
      } else {
        counts[cat.stream] = colleges.filter(c => c.stream === cat.stream).length
      }
    })
    return counts
  }, [colleges])

  // ── FILTER LOGIC ──────────────────────────────────────────────────────────

  const parseFeeNumeric = (feeStr: string | null | undefined): number => {
    if (!feeStr) return 9999999
    const cleaned = feeStr.toLowerCase().replace(/[^0-9.]/g, '')
    const num = parseFloat(cleaned)
    if (isNaN(num)) return 9999999
    if (feeStr.toLowerCase().includes('lakh')) return num * 100000
    return num
  }

  const parsePackageNumeric = (pkg: string | null | undefined): number => {
    if (!pkg) return 0
    const cleaned = pkg.toLowerCase().replace(/[^0-9.]/g, '')
    const num = parseFloat(cleaned)
    if (isNaN(num)) return 0
    return num
  }

  const filteredColleges = useMemo(() => {
    return colleges.filter(college => {
      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        const matchesName = college.name.toLowerCase().includes(q)
        const matchesShort = college.short_name?.toLowerCase().includes(q)
        const matchesLocation = college.location.toLowerCase().includes(q)
        const matchesStream = college.stream.toLowerCase().includes(q)
        if (!matchesName && !matchesShort && !matchesLocation && !matchesStream) return false
      }

      // Stream filter
      if (selectedStreams.length > 0) {
        const matchesStream = selectedStreams.some(stream => {
          if (stream === 'MBBS') {
            return mbbsCollegeIds.has(college.id)
          }
          if (stream === 'BDS') {
            return bdsCollegeIds.has(college.id)
          }
          return college.stream === stream
        })
        if (!matchesStream) return false
      }

      // State filter
      if (selectedState !== 'All' && college.state !== selectedState) return false

      // City filter
      if (selectedCity !== 'All' && college.location !== selectedCity) return false

      // Ownership filter
      if (selectedOwnerships.length > 0) {
        const normalized = college.ownership?.charAt(0).toUpperCase() + (college.ownership?.slice(1).toLowerCase() || '')
        if (!selectedOwnerships.includes(normalized)) return false
      }

      return true
    })
  }, [colleges, searchQuery, selectedStreams, selectedState, selectedCity, selectedOwnerships])

  const sortedColleges = useMemo(() => {
    return [...filteredColleges].sort((a, b) => {
      if (sortBy === 'ranking') return (a.ranking ?? 9999) - (b.ranking ?? 9999)
      if (sortBy === 'package_desc') return parsePackageNumeric(b.avg_ctc) - parsePackageNumeric(a.avg_ctc)
      if (sortBy === 'fee_asc') return parseFeeNumeric(a.total_fee) - parseFeeNumeric(b.total_fee)
      // 'popular' — ranked first, then by name
      const aScore = a.ranking ? a.ranking : 9999
      const bScore = b.ranking ? b.ranking : 9999
      return aScore - bScore
    })
  }, [filteredColleges, sortBy])

  const displayedColleges = sortedColleges.slice(0, visibleCount)

  // ── HANDLERS ──────────────────────────────────────────────────────────────

  const toggleStream = (stream: string) => {
    setSelectedStreams(prev =>
      prev.includes(stream) ? prev.filter(s => s !== stream) : [...prev, stream]
    )
    setVisibleCount(20)
  }

  const toggleOwnership = (own: string) => {
    setSelectedOwnerships(prev =>
      prev.includes(own) ? prev.filter(o => o !== own) : [...prev, own]
    )
    setVisibleCount(20)
  }

  const toggleCompare = (id: string) => {
    setCompareList(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      if (prev.length >= 4) return prev
      return [...prev, id]
    })
  }

  const toggleSave = (id: string) => {
    setSavedList(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedStreams([])
    setSelectedState('All')
    setSelectedCity('All')
    setSelectedOwnerships([])
    setVisibleCount(20)
  }

  const handleCategoryClick = (stream: string) => {
    if (stream === '__government__') {
      setSelectedStreams([])
      setSelectedOwnerships(['Government'])
    } else {
      setSelectedOwnerships([])
      setSelectedStreams([stream])
    }
    setVisibleCount(20)
    // Scroll to results
    document.getElementById('results-area')?.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const amount = direction === 'left' ? -300 : 300
      categoryScrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
    }
  }

  const hasActiveFilters = selectedStreams.length > 0 || selectedState !== 'All' || selectedCity !== 'All' || selectedOwnerships.length > 0

  // ── RENDER ────────────────────────────────────────────────────────────────

  return (
    <main className="min-h-screen bg-white font-sans text-slate-800">
      <Navbar />

      {/* ── HERO SECTION ──────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-[#eef3ff] to-white pt-24 lg:pt-[88px] border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-6 lg:py-5">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-0">

            {/* Left — Headline */}
            <div className="w-full lg:w-[25%] lg:pr-6">
              <h1
                className="text-2xl lg:text-[28px] font-bold text-[#071A44] leading-snug tracking-tight mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Find Colleges That<br className="hidden lg:block" /> Match Your Goals
              </h1>
              <p className="text-[13px] text-slate-500 leading-relaxed">
                Explore 10,000+ colleges across India. Compare fees, placements, courses, rankings and reviews to choose the right college.
              </p>
            </div>

            {/* Center — Search */}
            <div className="w-full lg:w-[38%] lg:px-4">
              <div className="relative group">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search colleges, courses, exams, cities..."
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setVisibleCount(20) }}
                  className="w-full pl-11 pr-5 py-3 bg-white border border-slate-300 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-sm transition-all"
                />
              </div>
              <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                <span className="text-[11px] text-slate-400 font-medium italic">Popular searches:</span>
                {POPULAR_SEARCHES.map(chip => (
                  <button
                    key={chip}
                    onClick={() => { setSearchQuery(chip); setVisibleCount(20) }}
                    className="px-2.5 py-1 bg-white border border-slate-200 rounded text-[11px] font-medium text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Right — Illustration */}
            <div className="hidden lg:flex w-[37%] items-center justify-end">
              <Image
                src="/illustrations/colleges-hero.png"
                alt="Campus Illustration"
                width={420}
                height={220}
                priority
                className="w-full max-h-[190px] object-contain object-right opacity-90 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY DISCOVERY ────────────────────────────────────────────── */}
      <section className="border-b border-slate-100 pt-4 pb-5 bg-white">

        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
              Explore by Category
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollCategories('left')}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-300 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scrollCategories('right')}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-300 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div
            ref={categoryScrollRef}
            className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2"
          >
            {CATEGORY_CONFIG.map(cat => {
              const Icon = cat.icon
              const count = categoryCounts[cat.stream] || 0
              const isActive = cat.stream === '__government__'
                ? selectedOwnerships.includes('Government')
                : selectedStreams.includes(cat.stream)

              return (
                <button
                  key={cat.stream}
                  onClick={() => handleCategoryClick(cat.stream)}
                  className={cn(
                    "relative flex-shrink-0 w-[220px] h-[120px] rounded-xl overflow-hidden group cursor-pointer transition-all",
                    isActive && "ring-2 ring-blue-500 ring-offset-2"
                  )}
                >
                  <Image
                    src="/images/campus-placeholder.png"
                    alt={cat.label}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={cn("absolute inset-0 bg-gradient-to-t", cat.color)} />
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={16} className="text-white/80" />
                      <span className="text-sm font-bold text-white leading-tight">{cat.label}</span>
                    </div>
                    <span className="text-xs text-white/70 font-medium">
                      {count.toLocaleString()}+ Colleges
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── RESULTS AREA (SIDEBAR + GRID) ─────────────────────────────────── */}
      <div id="results-area" className="max-w-[1440px] mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ── LEFT SIDEBAR FILTERS ──────────────────────────────────────── */}
          <aside className="w-full lg:w-[260px] flex-shrink-0 hidden lg:block">
            <div className="sticky top-28 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <SlidersHorizontal size={14} className="text-slate-400" />
                  Filters
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Location */}
              <FilterSection
                title="Location"
                icon={<MapPin size={14} />}
                isOpen={openSections.location}
                onToggle={() => toggleSection('location')}
              >
                <div className="space-y-2.5">
                  <FilterSelect
                    value={selectedState}
                    options={['All', ...uniqueStates]}
                    onChange={val => { setSelectedState(val); setSelectedCity('All'); setVisibleCount(20) }}
                    placeholder="Select State"
                  />
                  <FilterSelect
                    value={selectedCity}
                    options={['All', ...uniqueCities]}
                    onChange={val => { setSelectedCity(val); setVisibleCount(20) }}
                    placeholder="Select City"
                  />
                </div>
              </FilterSection>

              {/* Course / Stream */}
              <FilterSection
                title="Course / Stream"
                icon={<GraduationCap size={14} />}
                isOpen={openSections.stream}
                onToggle={() => toggleSection('stream')}
              >
                <div className="space-y-2">
                  {uniqueStreams.slice(0, 10).map(stream => (
                    <FilterCheckbox
                      key={stream}
                      label={stream}
                      count={streamCounts[stream] || 0}
                      checked={selectedStreams.includes(stream)}
                      onChange={() => toggleStream(stream)}
                    />
                  ))}
                </div>
              </FilterSection>

              {/* Ownership */}
              <FilterSection
                title="Ownership Type"
                icon={<Landmark size={14} />}
                isOpen={openSections.ownership}
                onToggle={() => toggleSection('ownership')}
              >
                <div className="space-y-2">
                  {['Government', 'Private', 'Deemed'].map(own => (
                    <FilterCheckbox
                      key={own}
                      label={own}
                      count={ownershipCounts[own] || 0}
                      checked={selectedOwnerships.includes(own)}
                      onChange={() => toggleOwnership(own)}
                    />
                  ))}
                </div>
              </FilterSection>
            </div>
          </aside>

          {/* ── MOBILE FILTER BUTTON ──────────────────────────────────────── */}
          <div className="lg:hidden w-full flex items-center gap-3 mb-2">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 shadow-sm"
            >
              <SlidersHorizontal size={16} />
              Filters
              {hasActiveFilters && (
                <span className="w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {selectedStreams.length + selectedOwnerships.length + (selectedState !== 'All' ? 1 : 0)}
                </span>
              )}
            </button>
            <div className="flex-1" />
            <SortSelect value={sortBy} onChange={setSortBy} />
          </div>

          {/* ── RIGHT — RESULTS ───────────────────────────────────────────── */}
          <div className="flex-1 w-full min-w-0">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-slate-600 font-medium">
                <strong className="text-slate-900 font-bold">{sortedColleges.length.toLocaleString()}</strong> Colleges Found
              </p>
              <div className="hidden lg:block">
                <SortSelect value={sortBy} onChange={setSortBy} />
              </div>
            </div>

            {/* Card Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden animate-pulse">
                    <div className="aspect-[16/10] bg-slate-100" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-slate-100 rounded w-3/4" />
                      <div className="h-3 bg-slate-100 rounded w-1/2" />
                      <div className="h-3 bg-slate-100 rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : sortedColleges.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                  {displayedColleges.map(college => (
                    <CollegeCard
                      key={college.id}
                      college={college}
                      isCompared={compareList.includes(college.id)}
                      isSaved={savedList.has(college.id)}
                      onToggleCompare={() => toggleCompare(college.id)}
                      onToggleSave={() => toggleSave(college.id)}
                    />
                  ))}
                </div>

                {visibleCount < sortedColleges.length && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={() => setVisibleCount(prev => prev + 20)}
                      className="px-8 py-3 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:border-blue-400 hover:text-blue-600 transition-colors shadow-sm"
                    >
                      Load More Colleges
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white border border-slate-200 rounded-xl p-16 text-center">
                <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={22} className="text-slate-400" />
                </div>
                <p className="text-base font-bold text-slate-900 mb-1">No colleges found</p>
                <p className="text-sm text-slate-500 mb-4">Try adjusting your filters to see more results.</p>
                <button
                  onClick={clearAllFilters}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── MOBILE FILTER DRAWER ──────────────────────────────────────────── */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-[360px] bg-white shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 sticky top-0 bg-white z-10">
              <h2 className="text-base font-bold text-slate-900">Filters</h2>
              <button onClick={() => setShowMobileFilters(false)} className="p-1.5 text-slate-400 hover:text-slate-700">
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-1">
              <FilterSection title="Location" icon={<MapPin size={14} />} isOpen={true} onToggle={() => {}}>
                <div className="space-y-2.5">
                  <FilterSelect value={selectedState} options={['All', ...uniqueStates]} onChange={val => { setSelectedState(val); setSelectedCity('All') }} placeholder="Select State" />
                  <FilterSelect value={selectedCity} options={['All', ...uniqueCities]} onChange={val => setSelectedCity(val)} placeholder="Select City" />
                </div>
              </FilterSection>
              <FilterSection title="Course / Stream" icon={<GraduationCap size={14} />} isOpen={true} onToggle={() => {}}>
                <div className="space-y-2">
                  {uniqueStreams.slice(0, 8).map(stream => (
                    <FilterCheckbox key={stream} label={stream} count={streamCounts[stream] || 0} checked={selectedStreams.includes(stream)} onChange={() => toggleStream(stream)} />
                  ))}
                </div>
              </FilterSection>
              <FilterSection title="Ownership Type" icon={<Landmark size={14} />} isOpen={true} onToggle={() => {}}>
                <div className="space-y-2">
                  {['Government', 'Private', 'Deemed'].map(own => (
                    <FilterCheckbox key={own} label={own} count={ownershipCounts[own] || 0} checked={selectedOwnerships.includes(own)} onChange={() => toggleOwnership(own)} />
                  ))}
                </div>
              </FilterSection>
            </div>
            <div className="sticky bottom-0 bg-white border-t border-slate-100 px-5 py-4 flex gap-3">
              <button onClick={clearAllFilters} className="flex-1 py-3 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600">
                Clear All
              </button>
              <button onClick={() => setShowMobileFilters(false)} className="flex-1 py-3 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── STICKY COMPARE BAR ────────────────────────────────────────────── */}
      {compareList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-3 flex items-center gap-4">
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center">
                <Building2 size={18} className="text-slate-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Compare Colleges</p>
                <p className="text-[11px] text-slate-400">Add up to 4 colleges to compare</p>
              </div>
            </div>

            <div className="flex-1 flex items-center gap-3 overflow-x-auto no-scrollbar">
              {Array.from({ length: 4 }).map((_, i) => {
                const collegeId = compareList[i]
                const college = collegeId ? colleges.find(c => c.id === collegeId) : null

                return college ? (
                  <div key={i} className="flex-shrink-0 flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg min-w-[160px]">
                    <span className="text-xs font-semibold text-blue-800 truncate max-w-[120px]">{college.short_name || college.name}</span>
                    <button onClick={() => toggleCompare(college.id)} className="text-blue-400 hover:text-blue-600 flex-shrink-0">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div key={i} className="flex-shrink-0 flex items-center justify-center px-4 py-2 border border-dashed border-slate-300 rounded-lg text-xs font-medium text-slate-400 min-w-[140px]">
                    + Add College
                  </div>
                )
              })}
            </div>

            <Link
              href={`/compare?colleges=${compareList.map(id => colleges.find(c => c.id === id)?.slug).filter(Boolean).join(',')}`}
              className="flex-shrink-0 px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              Compare Now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}

// ── SUBCOMPONENTS ─────────────────────────────────────────────────────────────

function FilterSection({
  title, icon, isOpen, onToggle, children
}: {
  title: string
  icon: React.ReactNode
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="border-b border-slate-100 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <span className="text-slate-400">{icon}</span>
          {title}
        </span>
        {isOpen ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
      </button>
      {isOpen && <div className="px-5 pb-4">{children}</div>}
    </div>
  )
}

function FilterSelect({
  value, options, onChange, placeholder
}: {
  value: string
  options: string[]
  onChange: (val: string) => void
  placeholder: string
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 appearance-none cursor-pointer focus:outline-none focus:bg-white focus:border-blue-500 transition-all hover:bg-white"
      >
        {options.map(opt => (
          <option key={opt} value={opt}>
            {opt === 'All' ? placeholder : opt}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
    </div>
  )
}

function FilterCheckbox({
  label, count, checked, onChange
}: {
  label: string
  count: number
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="flex items-center justify-between cursor-pointer group py-0.5">
      <div className="flex items-center gap-2.5">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="peer w-4 h-4 border border-slate-300 rounded text-blue-600 cursor-pointer appearance-none checked:bg-blue-600 checked:border-blue-600 transition-all"
          />
          <svg className="absolute w-3 h-3 pointer-events-none hidden peer-checked:block text-white left-0.5 top-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{label}</span>
      </div>
      <span className="text-xs text-slate-400 font-medium">({count.toLocaleString()})</span>
    </label>
  )
}

function SortSelect({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Sort By:</span>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 appearance-none cursor-pointer focus:outline-none focus:border-blue-500 shadow-sm transition-all"
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>
    </div>
  )
}

function CollegeCard({
  college, isCompared, isSaved, onToggleCompare, onToggleSave
}: {
  college: DbCollege
  isCompared: boolean
  isSaved: boolean
  onToggleCompare: () => void
  onToggleSave: () => void
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden group hover:shadow-md transition-all duration-200">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={college.image_url || "/images/campus-placeholder.png"}
          alt={college.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/images/campus-placeholder.png";
          }}
        />

        {/* Save Button */}
        <button
          onClick={onToggleSave}
          className={cn(
            "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm",
            isSaved
              ? "bg-red-500 text-white"
              : "bg-white/90 text-slate-400 hover:text-red-500"
          )}
        >
          <Heart size={16} fill={isSaved ? 'currentColor' : 'none'} />
        </button>

        {/* NIRF Badge */}
        {college.ranking && college.ranking > 0 && (
          <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-blue-600 text-white text-[11px] font-bold rounded-md shadow-md">
            NIRF #{college.ranking}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <Link
          href={`/colleges/${college.slug}`}
          className="block text-sm font-bold text-slate-900 leading-tight mb-1.5 hover:text-blue-600 transition-colors line-clamp-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {college.name}
        </Link>

        <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
          <MapPin size={12} className="text-slate-400 flex-shrink-0" />
          <span className="truncate">{college.location}, {college.state}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star size={13} className="text-amber-400" fill="currentColor" />
          <span className="text-xs font-bold text-slate-800">4.{Math.floor(Math.random() * 3 + 5)}</span>
          <span className="text-[11px] text-slate-400 font-medium">({(Math.floor(Math.random() * 20 + 5) / 10).toFixed(1)}K reviews)</span>
        </div>

        {/* Metrics */}
        <div className="flex items-center gap-0 border-t border-slate-100 pt-3 mb-3">
          <div className="flex-1 text-center border-r border-slate-100 last:border-r-0">
            <p className="text-xs font-bold text-slate-800">{college.avg_ctc || '—'}</p>
            <p className="text-[10px] text-slate-400 font-medium">Avg Package</p>
          </div>
          <div className="flex-1 text-center border-r border-slate-100 last:border-r-0">
            <p className="text-xs font-bold text-slate-800">{college.total_fee || '—'}</p>
            <p className="text-[10px] text-slate-400 font-medium">Avg Fees</p>
          </div>
          <div className="flex-1 text-center">
            <p className="text-xs font-bold text-slate-800">{college.established || '—'}</p>
            <p className="text-[10px] text-slate-400 font-medium">Est. Year</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href={`/colleges/${college.slug}`}
            className="flex-1 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors text-center"
          >
            View Details
          </Link>
          <button
            onClick={onToggleCompare}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 border rounded-lg text-xs font-semibold transition-colors",
              isCompared
                ? "bg-blue-50 border-blue-200 text-blue-700"
                : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"
            )}
          >
            <div className={cn(
              "w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0",
              isCompared ? "bg-blue-600 border-blue-600" : "border-slate-300"
            )}>
              {isCompared && (
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            Compare
          </button>
        </div>
      </div>
    </div>
  )
}
