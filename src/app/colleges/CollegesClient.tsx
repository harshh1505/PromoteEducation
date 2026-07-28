'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import {
  Search, MapPin, ChevronDown, ChevronRight, ChevronLeft,
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
  cover_image?: string | null
  image_url?: string | null
  established?: number | null
}

// ── CONSTANTS ─────────────────────────────────────────────────────────────────

const POPULAR_SEARCHES = ['IIT Delhi', 'MBA', 'Computer Science', 'Bangalore', 'Medical Colleges', 'B.Tech']

const CATEGORY_CONFIG = [
  { label: 'Top Engineering Colleges', stream: 'Engineering', icon: Building2, color: 'from-blue-600/85 to-blue-950/95', accent: 'bg-blue-500' },
  { label: 'Top MBA Colleges', stream: 'Management', icon: Briefcase, color: 'from-emerald-600/85 to-emerald-950/95', accent: 'bg-emerald-500' },
  { label: 'Top Medical Colleges', stream: 'Medical', icon: Heart, color: 'from-rose-600/85 to-rose-950/95', accent: 'bg-rose-500' },
  { label: 'Top Law Colleges', stream: 'Law', icon: Scale, color: 'from-amber-600/85 to-amber-950/95', accent: 'bg-amber-500' },
  { label: 'Top Government Colleges', stream: '__government__', icon: Landmark, color: 'from-indigo-600/85 to-indigo-950/95', accent: 'bg-indigo-500' },
]

const STREAM_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  Engineering:  { bg: 'bg-blue-50',    text: 'text-blue-700',   dot: 'bg-blue-500' },
  Medical:      { bg: 'bg-rose-50',    text: 'text-rose-700',   dot: 'bg-rose-500' },
  Management:   { bg: 'bg-emerald-50', text: 'text-emerald-700',dot: 'bg-emerald-500' },
  Law:          { bg: 'bg-amber-50',   text: 'text-amber-700',  dot: 'bg-amber-500' },
  Pharmacy:     { bg: 'bg-purple-50',  text: 'text-purple-700', dot: 'bg-purple-500' },
  Architecture: { bg: 'bg-orange-50',  text: 'text-orange-700', dot: 'bg-orange-500' },
  Science:      { bg: 'bg-cyan-50',    text: 'text-cyan-700',   dot: 'bg-cyan-500' },
  Commerce:     { bg: 'bg-teal-50',    text: 'text-teal-700',   dot: 'bg-teal-500' },
  Arts:         { bg: 'bg-pink-50',    text: 'text-pink-700',   dot: 'bg-pink-500' },
  default:      { bg: 'bg-slate-100',  text: 'text-slate-600',  dot: 'bg-slate-400' },
}

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'ranking', label: 'NIRF Ranking' },
  { value: 'package_desc', label: 'Highest Package' },
  { value: 'fee_asc', label: 'Lowest Fee' },
]

// ── MAIN PAGE COMPONENT ───────────────────────────────────────────────────────

export default function CollegesClient({
  initialColleges,
  initialBdsCollegeIds,
  initialMbbsCollegeIds,
  initialBtechCollegeIds = [],
  initialMtechCollegeIds = [],
  initialMbaCollegeIds = []
}: {
  initialColleges: DbCollege[]
  initialBdsCollegeIds: string[]
  initialMbbsCollegeIds: string[]
  initialBtechCollegeIds?: string[]
  initialMtechCollegeIds?: string[]
  initialMbaCollegeIds?: string[]
}) {
  const [colleges, setColleges] = useState<DbCollege[]>(initialColleges)
  const [isLoading, setIsLoading] = useState(false)

  // Filter state
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStreams, setSelectedStreams] = useState<string[]>([])
  const [selectedState, setSelectedState] = useState('All')
  const [selectedCity, setSelectedCity] = useState('All')
  const [selectedOwnerships, setSelectedOwnerships] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('popular')
  const [bdsCollegeIds] = useState<Set<string>>(new Set(initialBdsCollegeIds))
  const [mbbsCollegeIds] = useState<Set<string>>(new Set(initialMbbsCollegeIds))
  const [btechCollegeIds] = useState<Set<string>>(new Set(initialBtechCollegeIds))
  const [mtechCollegeIds] = useState<Set<string>>(new Set(initialMtechCollegeIds))
  const [mbaCollegeIds] = useState<Set<string>>(new Set(initialMbaCollegeIds))

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

  // ── DERIVED DATA ──────────────────────────────────────────────────────────

  const uniqueStreams = useMemo(() => {
    const list = Array.from(new Set(colleges.map(c => c.stream))).filter(Boolean)
    
    // Replace "Medical" with separate "MBBS" and "BDS" filters
    const medIdx = list.indexOf('Medical')
    if (medIdx !== -1) {
      list.splice(medIdx, 1)
    }
    const hasMbbs = mbbsCollegeIds.size > 0 || colleges.some(c => c.stream === 'Medical')
    if (hasMbbs && !list.includes('MBBS')) {
      list.push('MBBS')
    }
    const hasBds = bdsCollegeIds.size > 0 || colleges.some(c => c.stream === 'BDS')
    if (hasBds && !list.includes('BDS')) {
      list.push('BDS')
    }
    // Remove raw 'BDS' if it came from stream values (we already added it above)
    const rawBdsIdx = list.indexOf('BDS')
    if (rawBdsIdx !== -1 && list.filter(x => x === 'BDS').length > 1) {
      list.splice(rawBdsIdx, 1)
    }

    // Replace "Engineering" with separate "B.Tech" and "M.Tech" filters
    const engIdx = list.indexOf('Engineering')
    if (engIdx !== -1) {
      list.splice(engIdx, 1)
    }
    if (btechCollegeIds.size > 0 && !list.includes('B.Tech')) {
      list.push('B.Tech')
    }
    if (mtechCollegeIds.size > 0 && !list.includes('M.Tech')) {
      list.push('M.Tech')
    }

    // Replace "Management" with "MBA" filter
    const mgmtIdx = list.indexOf('Management')
    if (mgmtIdx !== -1) {
      list.splice(mgmtIdx, 1)
    }
    if (mbaCollegeIds.size > 0 && !list.includes('MBA')) {
      list.push('MBA')
    }

    return list.sort()
  }, [colleges, bdsCollegeIds, mbbsCollegeIds, btechCollegeIds, mtechCollegeIds, mbaCollegeIds])

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
      if (c.stream && c.stream !== 'Medical' && c.stream !== 'Engineering' && c.stream !== 'Management' && c.stream !== 'BDS') {
        counts[c.stream] = (counts[c.stream] || 0) + 1
      }
    })
    // MBBS: merge course-based IDs + stream='Medical'
    const mbbsSet = new Set([...mbbsCollegeIds, ...colleges.filter(c => c.stream === 'Medical').map(c => c.id)])
    if (mbbsSet.size > 0) counts['MBBS'] = mbbsSet.size
    // BDS: merge course-based IDs + stream='BDS'
    const bdsSet = new Set([...bdsCollegeIds, ...colleges.filter(c => c.stream === 'BDS').map(c => c.id)])
    if (bdsSet.size > 0) counts['BDS'] = bdsSet.size
    if (btechCollegeIds.size > 0) {
      counts['B.Tech'] = btechCollegeIds.size
    }
    if (mtechCollegeIds.size > 0) {
      counts['M.Tech'] = mtechCollegeIds.size
    }
    if (mbaCollegeIds.size > 0) {
      counts['MBA'] = mbaCollegeIds.size
    }
    return counts
  }, [colleges, bdsCollegeIds, mbbsCollegeIds, btechCollegeIds, mtechCollegeIds, mbaCollegeIds])

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
            return mbbsCollegeIds.has(college.id) || college.stream === 'Medical'
          }
          if (stream === 'BDS') {
            return bdsCollegeIds.has(college.id) || college.stream === 'BDS'
          }
          if (stream === 'B.Tech') {
            return btechCollegeIds.has(college.id)
          }
          if (stream === 'M.Tech') {
            return mtechCollegeIds.has(college.id)
          }
          if (stream === 'MBA') {
            return mbaCollegeIds.has(college.id)
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
  }, [colleges, searchQuery, selectedStreams, selectedState, selectedCity, selectedOwnerships, bdsCollegeIds, mbbsCollegeIds, btechCollegeIds, mtechCollegeIds, mbaCollegeIds])

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
      <section className="relative overflow-hidden pt-24 lg:pt-[88px] border-b border-slate-100" style={{ background: 'linear-gradient(135deg, #eef3ff 0%, #f0f7ff 40%, #f5f0ff 100%)' }}>
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -bottom-16 -right-16 w-72 h-72 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute top-1/2 left-1/3 w-48 h-48 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }} />

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-8 py-6 lg:py-5">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-0">

            {/* Left — Headline */}
            <div className="w-full lg:w-[25%] lg:pr-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 text-[11px] font-bold rounded-full mb-3 tracking-wide uppercase">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                10,000+ Colleges
              </div>
              <h1
                className="text-2xl lg:text-[28px] font-bold text-[#071A44] leading-snug tracking-tight mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Find Colleges That<br className="hidden lg:block" /> Match Your Goals
              </h1>
              <p className="text-[13px] text-slate-500 leading-relaxed">
                Compare fees, placements, courses &amp; rankings across India's top institutions.
              </p>
            </div>

            {/* Center — Search */}
            <div className="w-full lg:w-[38%] lg:px-4">
              <div className="relative group">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                <input
                  type="text"
                  placeholder="Search colleges, courses, exams, cities..."
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setVisibleCount(20) }}
                  className="w-full pl-11 pr-5 py-3.5 bg-white border-2 border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100/60 shadow-sm transition-all duration-200"
                />
              </div>
              <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                <span className="text-[11px] text-slate-400 font-medium italic">Popular:</span>
                {POPULAR_SEARCHES.map(chip => (
                  <button
                    key={chip}
                    onClick={() => { setSearchQuery(chip); setVisibleCount(20) }}
                    className="px-2.5 py-1 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full text-[11px] font-semibold text-slate-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-150"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Right — Illustration */}
            <div className="hidden lg:flex w-[37%] items-center justify-end">
              <svg viewBox="0 0 480 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-h-[240px] drop-shadow-sm" aria-hidden="true">
                {/* Sky background */}
                <rect width="480" height="260" rx="20" fill="url(#skyGrad)"/>
                <defs>
                  <linearGradient id="skyGrad" x1="0" y1="0" x2="480" y2="260" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#eef3ff"/>
                    <stop offset="100%" stopColor="#f5f0ff"/>
                  </linearGradient>
                  <linearGradient id="buildingGrad" x1="160" y1="60" x2="160" y2="200" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#e0e7ff"/>
                    <stop offset="100%" stopColor="#c7d2fe"/>
                  </linearGradient>
                  <linearGradient id="domeGrad" x1="200" y1="40" x2="200" y2="90" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#818cf8"/>
                    <stop offset="100%" stopColor="#6366f1"/>
                  </linearGradient>
                </defs>

                {/* Floating clouds */}
                <ellipse cx="60" cy="45" rx="38" ry="14" fill="white" opacity="0.7"/>
                <ellipse cx="90" cy="38" rx="28" ry="12" fill="white" opacity="0.7"/>
                <ellipse cx="380" cy="30" rx="32" ry="11" fill="white" opacity="0.6"/>
                <ellipse cx="410" cy="24" rx="22" ry="10" fill="white" opacity="0.6"/>

                {/* Ground */}
                <rect x="0" y="195" width="480" height="65" rx="0" fill="#e0e7ff" opacity="0.4"/>
                <rect x="0" y="210" width="480" height="50" rx="0" fill="#c7d2fe" opacity="0.3"/>

                {/* Main university building */}
                <rect x="140" y="90" width="200" height="115" rx="4" fill="url(#buildingGrad)" stroke="#a5b4fc" strokeWidth="1.5"/>
                {/* Windows row 1 */}
                {[155,185,215,245,275,305].map((x,i) => (
                  <rect key={i} x={x} y="105" width="18" height="22" rx="3" fill="#818cf8" opacity="0.6"/>
                ))}
                {/* Windows row 2 */}
                {[155,185,215,245,275,305].map((x,i) => (
                  <rect key={i} x={x} y="140" width="18" height="22" rx="3" fill="#818cf8" opacity="0.4"/>
                ))}
                {/* Door */}
                <rect x="223" y="165" width="34" height="40" rx="4" fill="#6366f1" opacity="0.7"/>
                <rect x="223" y="165" width="34" height="18" rx="4" fill="#4f46e5" opacity="0.5"/>
                {/* Dome */}
                <ellipse cx="240" cy="90" rx="32" ry="10" fill="#a5b4fc"/>
                <path d="M208 90 Q240 50 272 90" fill="url(#domeGrad)"/>
                {/* Flag */}
                <line x1="240" y1="50" x2="240" y2="30" stroke="#6366f1" strokeWidth="2"/>
                <path d="M240 30 L255 36 L240 42Z" fill="#f59e0b"/>
                {/* Pillars */}
                {[158,188,272,302].map((x,i) => (
                  <rect key={i} x={x} y="160" width="8" height="45" rx="2" fill="#a5b4fc" opacity="0.8"/>
                ))}

                {/* Left small building */}
                <rect x="55" y="130" width="75" height="75" rx="3" fill="#ddd6fe" stroke="#a78bfa" strokeWidth="1"/>
                {[63,85,107].map((x,i) => (
                  <rect key={i} x={x} y="143" width="14" height="18" rx="2" fill="#7c3aed" opacity="0.4"/>
                ))}
                {[63,85,107].map((x,i) => (
                  <rect key={i} x={x} y="173" width="14" height="18" rx="2" fill="#7c3aed" opacity="0.3"/>
                ))}
                <rect x="82" y="190" width="22" height="15" rx="2" fill="#6d28d9" opacity="0.5"/>
                {/* Triangle roof left */}
                <path d="M50 132 L92.5 108 L135 132Z" fill="#c4b5fd" opacity="0.9"/>

                {/* Right small building */}
                <rect x="350" y="125" width="80" height="80" rx="3" fill="#d1fae5" stroke="#6ee7b7" strokeWidth="1"/>
                {[358,378,398].map((x,i) => (
                  <rect key={i} x={x} y="138" width="14" height="18" rx="2" fill="#059669" opacity="0.4"/>
                ))}
                {[358,378,398].map((x,i) => (
                  <rect key={i} x={x} y="168" width="14" height="18" rx="2" fill="#059669" opacity="0.3"/>
                ))}
                <rect x="376" y="186" width="22" height="19" rx="2" fill="#047857" opacity="0.5"/>
                <path d="M345 127 L390 104 L435 127Z" fill="#a7f3d0" opacity="0.9"/>

                {/* Trees */}
                <circle cx="120" cy="185" r="18" fill="#34d399" opacity="0.7"/>
                <rect x="117" y="193" width="6" height="12" rx="2" fill="#6b7280"/>
                <circle cx="355" cy="182" r="16" fill="#34d399" opacity="0.7"/>
                <rect x="352" y="190" width="6" height="12" rx="2" fill="#6b7280"/>
                <circle cx="440" cy="188" r="14" fill="#6ee7b7" opacity="0.6"/>
                <rect x="437" y="195" width="6" height="10" rx="2" fill="#6b7280"/>
                <circle cx="40" cy="190" r="13" fill="#6ee7b7" opacity="0.6"/>
                <rect x="37" y="197" width="6" height="9" rx="2" fill="#6b7280"/>

                {/* Floating graduation caps */}
                <g transform="translate(28,18) rotate(-12)">
                  <rect x="0" y="4" width="24" height="5" rx="1" fill="#4f46e5"/>
                  <path d="M12 0 L24 4 L12 8 L0 4Z" fill="#6366f1"/>
                  <line x1="24" y1="4" x2="28" y2="12" stroke="#f59e0b" strokeWidth="1.5"/>
                  <circle cx="28" cy="13" r="2" fill="#f59e0b"/>
                </g>
                <g transform="translate(420,10) rotate(8)">
                  <rect x="0" y="4" width="22" height="5" rx="1" fill="#7c3aed"/>
                  <path d="M11 0 L22 4 L11 8 L0 4Z" fill="#8b5cf6"/>
                  <line x1="22" y1="4" x2="26" y2="11" stroke="#f59e0b" strokeWidth="1.5"/>
                  <circle cx="26" cy="12" r="2" fill="#f59e0b"/>
                </g>
                <g transform="translate(445,55) rotate(-5)">
                  <rect x="0" y="4" width="20" height="4" rx="1" fill="#2563eb"/>
                  <path d="M10 0 L20 4 L10 7 L0 4Z" fill="#3b82f6"/>
                  <line x1="20" y1="4" x2="23" y2="10" stroke="#f59e0b" strokeWidth="1.5"/>
                  <circle cx="23" cy="11" r="1.5" fill="#f59e0b"/>
                </g>

                {/* Foreground: student with book */}
                <g transform="translate(22,155)">
                  {/* Body */}
                  <circle cx="16" cy="6" r="8" fill="#fbbf24"/>
                  <rect x="8" y="14" width="16" height="22" rx="4" fill="#6366f1"/>
                  {/* Book */}
                  <rect x="20" y="20" width="18" height="13" rx="2" fill="#f0fdf4" stroke="#34d399" strokeWidth="1"/>
                  <line x1="29" y1="20" x2="29" y2="33" stroke="#86efac" strokeWidth="1"/>
                </g>

                {/* Foreground: student with laptop */}
                <g transform="translate(415,152)">
                  <circle cx="18" cy="6" r="8" fill="#fb923c"/>
                  <rect x="10" y="14" width="16" height="22" rx="4" fill="#0ea5e9"/>
                  {/* Laptop */}
                  <rect x="0" y="24" width="22" height="13" rx="2" fill="#e0e7ff" stroke="#818cf8" strokeWidth="1"/>
                  <rect x="2" y="26" width="18" height="9" rx="1" fill="#c7d2fe"/>
                  <rect x="0" y="36" width="22" height="3" rx="1" fill="#a5b4fc"/>
                </g>

                {/* Stars / sparkles */}
                <path d="M320 28 L322 22 L324 28 L330 30 L324 32 L322 38 L320 32 L314 30Z" fill="#f59e0b" opacity="0.7"/>
                <path d="M85 22 L86.5 17 L88 22 L93 23.5 L88 25 L86.5 30 L85 25 L80 23.5Z" fill="#a78bfa" opacity="0.7"/>
                <circle cx="180" cy="20" r="3" fill="#f472b6" opacity="0.5"/>
                <circle cx="460" cy="80" r="2.5" fill="#34d399" opacity="0.5"/>
                <circle cx="10" cy="120" r="2" fill="#818cf8" opacity="0.4"/>

                {/* Path / walkway */}
                <path d="M190 205 Q240 200 290 205 L280 260 L200 260Z" fill="#e0e7ff" opacity="0.5"/>
              </svg>
            </div>

          </div>
        </div>
      </section>

      {/* ── CATEGORY DISCOVERY ────────────────────────────────────────────── */}
      <section className="border-b border-slate-100 pt-5 pb-6 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
              Explore by Category
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollCategories('left')}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all duration-150"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scrollCategories('right')}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all duration-150"
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
                    "relative flex-shrink-0 w-[220px] h-[130px] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-xl",
                    isActive ? "ring-2 ring-white ring-offset-2 scale-[1.03] shadow-xl" : "shadow-md"
                  )}
                >
                  <Image
                    src="/images/campus-placeholder.png"
                    alt={cat.label}
                    fill
                    priority
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={cn("absolute inset-0 bg-gradient-to-t transition-opacity duration-300", cat.color, "group-hover:opacity-90")} />
                  {/* shimmer on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)' }} />
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-md bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Icon size={13} className="text-white" />
                      </div>
                      <span className="text-sm font-bold text-white leading-tight drop-shadow">{cat.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/80 font-semibold">{count.toLocaleString()}+ Colleges</span>
                      {isActive && <span className="text-[10px] px-1.5 py-0.5 bg-white/30 backdrop-blur-sm rounded-full text-white font-bold">Active</span>}
                    </div>
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
          <aside className="w-full lg:w-[268px] flex-shrink-0 hidden lg:block">
            <div className="sticky top-28 rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 0 1.5px #e2e8f0, 0 4px 24px -4px rgba(99,102,241,0.10)' }}>

              {/* ── HEADER ── */}
              <div className="flex items-center justify-between px-5 py-4" style={{ background: 'linear-gradient(135deg,#4f46e5 0%,#7c3aed 60%,#2563eb 100%)' }}>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <SlidersHorizontal size={15} className="text-white/80" />
                  Refine Results
                  {hasActiveFilters && (
                    <span className="w-5 h-5 bg-white/25 text-white text-[10px] font-black rounded-full flex items-center justify-center border border-white/30">
                      {selectedStreams.length + selectedOwnerships.length + (selectedState !== 'All' ? 1 : 0)}
                    </span>
                  )}
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-[11px] font-bold text-white/80 hover:text-white px-2.5 py-1 bg-white/15 hover:bg-white/25 rounded-lg transition-all duration-150 border border-white/20"
                  >
                    Reset ✕
                  </button>
                )}
              </div>

              <div className="bg-white">
                {/* Location */}
                <FilterSection
                  title="Location"
                  icon={<MapPin size={14} />}
                  accentColor="blue"
                  isOpen={openSections.location}
                  onToggle={() => toggleSection('location')}
                >
                  <div className="space-y-2.5">
                    <FilterSelect
                      value={selectedState}
                      options={['All', ...uniqueStates]}
                      onChange={val => { setSelectedState(val); setSelectedCity('All'); setVisibleCount(20) }}
                      placeholder="All States"
                    />
                    <FilterSelect
                      value={selectedCity}
                      options={['All', ...uniqueCities]}
                      onChange={val => { setSelectedCity(val); setVisibleCount(20) }}
                      placeholder="All Cities"
                    />
                  </div>
                </FilterSection>

                {/* Course / Stream */}
                <FilterSection
                  title="Course / Stream"
                  icon={<GraduationCap size={14} />}
                  accentColor="violet"
                  isOpen={openSections.stream}
                  onToggle={() => toggleSection('stream')}
                >
                  <div className="space-y-1.5">
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
                  accentColor="emerald"
                  isOpen={openSections.ownership}
                  onToggle={() => toggleSection('ownership')}
                >
                  <div className="space-y-1.5">
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

              {/* ── FOOTER ── */}
              {hasActiveFilters && (
                <div className="px-5 py-3 border-t border-slate-100 bg-gradient-to-r from-blue-50 to-violet-50 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    {selectedStreams.length + selectedOwnerships.length + (selectedState !== 'All' ? 1 : 0)} filter{(selectedStreams.length + selectedOwnerships.length + (selectedState !== 'All' ? 1 : 0)) > 1 ? 's' : ''} active
                  </span>
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              )}
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
                <strong className="text-slate-900 font-bold">{sortedColleges.length.toLocaleString()}</strong>
                <span className="text-slate-400"> colleges found</span>
                {hasActiveFilters && (
                  <span className="ml-2 text-[11px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-semibold border border-blue-100">Filtered</span>
                )}
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
                  <div className="flex justify-center mt-10">
                    <button
                      onClick={() => setVisibleCount(prev => prev + 20)}
                      className="group px-8 py-3 bg-white border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 shadow-sm flex items-center gap-2"
                    >
                      Load More Colleges
                      <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform duration-200" />
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

const SECTION_ACCENT: Record<string, { dot: string; badge: string; icon: string; border: string }> = {
  blue:    { dot: 'bg-blue-500',   badge: 'bg-blue-100 text-blue-700',   icon: 'text-blue-500',   border: 'border-blue-200' },
  violet:  { dot: 'bg-violet-500', badge: 'bg-violet-100 text-violet-700', icon: 'text-violet-500', border: 'border-violet-200' },
  emerald: { dot: 'bg-emerald-500',badge: 'bg-emerald-100 text-emerald-700',icon: 'text-emerald-500',border: 'border-emerald-200' },
}

const CHECKBOX_STREAM_COLORS: Record<string, { active: string; dot: string; badge: string }> = {
  'Engineering': { active: 'bg-blue-50 border-blue-300',   dot: 'bg-blue-500',   badge: 'text-blue-700 bg-blue-100' },
  'B.Tech':      { active: 'bg-blue-50 border-blue-300',   dot: 'bg-blue-400',   badge: 'text-blue-700 bg-blue-100' },
  'M.Tech':      { active: 'bg-sky-50 border-sky-300',     dot: 'bg-sky-500',    badge: 'text-sky-700 bg-sky-100' },
  'MBBS':        { active: 'bg-rose-50 border-rose-300',   dot: 'bg-rose-500',   badge: 'text-rose-700 bg-rose-100' },
  'BDS':         { active: 'bg-pink-50 border-pink-300',   dot: 'bg-pink-500',   badge: 'text-pink-700 bg-pink-100' },
  'Medical':     { active: 'bg-rose-50 border-rose-300',   dot: 'bg-rose-500',   badge: 'text-rose-700 bg-rose-100' },
  'MBA':         { active: 'bg-emerald-50 border-emerald-300', dot: 'bg-emerald-500', badge: 'text-emerald-700 bg-emerald-100' },
  'Management':  { active: 'bg-emerald-50 border-emerald-300', dot: 'bg-emerald-500', badge: 'text-emerald-700 bg-emerald-100' },
  'Law':         { active: 'bg-amber-50 border-amber-300', dot: 'bg-amber-500',  badge: 'text-amber-700 bg-amber-100' },
  'Pharmacy':    { active: 'bg-purple-50 border-purple-300',dot: 'bg-purple-500',badge: 'text-purple-700 bg-purple-100' },
  'Architecture':{ active: 'bg-orange-50 border-orange-300',dot: 'bg-orange-500',badge: 'text-orange-700 bg-orange-100' },
  'Government':  { active: 'bg-indigo-50 border-indigo-300',dot: 'bg-indigo-500',badge: 'text-indigo-700 bg-indigo-100' },
  'Private':     { active: 'bg-violet-50 border-violet-300',dot: 'bg-violet-500',badge: 'text-violet-700 bg-violet-100' },
  'Deemed':      { active: 'bg-teal-50 border-teal-300',  dot: 'bg-teal-500',   badge: 'text-teal-700 bg-teal-100' },
  default:       { active: 'bg-slate-50 border-slate-300', dot: 'bg-slate-500',  badge: 'text-slate-700 bg-slate-100' },
}

function FilterSection({
  title, icon, accentColor = 'blue', isOpen, onToggle, children
}: {
  title: string
  icon: React.ReactNode
  accentColor?: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  const accent = SECTION_ACCENT[accentColor] || SECTION_ACCENT.blue
  return (
    <div className="border-b border-slate-100 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-slate-50/80 transition-colors duration-150 group"
      >
        <span className="flex items-center gap-2.5 text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
          <span className={cn("w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-200",
            isOpen ? cn('bg-opacity-100', accent.badge) : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
          )}>
            <span className={cn('transition-colors duration-200', isOpen ? accent.icon : 'text-slate-400')}>{icon}</span>
          </span>
          {title}
        </span>
        <span className={cn(
          'w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300',
          isOpen ? cn(accent.badge, 'rotate-180') : 'bg-slate-100 text-slate-400'
        )}>
          <ChevronDown size={12} />
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: isOpen ? '600px' : '0', opacity: isOpen ? 1 : 0 }}
      >
        <div className="px-5 pb-4 pt-1">{children}</div>
      </div>
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
  const isActive = value !== 'All'
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className={cn(
          "w-full px-3.5 py-2.5 border rounded-xl text-sm appearance-none cursor-pointer focus:outline-none focus:ring-3 transition-all duration-200 font-medium",
          isActive
            ? 'bg-blue-50 border-blue-300 text-blue-800 focus:ring-blue-100 focus:border-blue-500'
            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white hover:border-slate-300 focus:ring-blue-100 focus:border-blue-400 focus:bg-white'
        )}
      >
        {options.map(opt => (
          <option key={opt} value={opt}>
            {opt === 'All' ? placeholder : opt}
          </option>
        ))}
      </select>
      <ChevronDown size={13} className={cn('absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors', isActive ? 'text-blue-500' : 'text-slate-400')} />
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
  const style = CHECKBOX_STREAM_COLORS[label] || CHECKBOX_STREAM_COLORS.default
  return (
    <label
      className={cn(
        'flex items-center justify-between cursor-pointer rounded-xl px-3 py-2.5 border transition-all duration-200 group select-none',
        checked
          ? cn(style.active, 'shadow-sm')
          : 'border-transparent hover:border-slate-200 hover:bg-slate-50'
      )}
    >
      <div className="flex items-center gap-2.5">
        {/* Custom checkbox */}
        <div className={cn(
          'relative w-4.5 h-4.5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200',
          checked ? cn(style.dot, 'border-transparent') : 'border-slate-300 group-hover:border-slate-400 bg-white'
        )} style={{ width: 17, height: 17 }}>
          <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="sr-only"
          />
          {checked && (
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>

        {/* Dot + Label */}
        {!checked && <span className={cn('w-2 h-2 rounded-full flex-shrink-0', style.dot)} />}
        <span className={cn(
          'text-[13px] font-semibold transition-colors duration-150',
          checked ? 'text-slate-800' : 'text-slate-600 group-hover:text-slate-800'
        )}>
          {label}
        </span>
      </div>

      {/* Count badge */}
      <span className={cn(
        'text-[10px] font-bold px-1.5 py-0.5 rounded-md transition-all duration-200',
        checked ? style.badge : 'text-slate-400 bg-slate-100'
      )}>
        {count.toLocaleString()}
      </span>
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
  const streamStyle = STREAM_COLORS[college.stream] || STREAM_COLORS.default
  const charSum = college.name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const rating = (4.3 + (charSum % 6) / 10).toFixed(1)
  const reviews = (0.5 + (charSum % 21) / 10).toFixed(1)

  return (
    <div
      className={cn(
        'relative bg-white rounded-3xl overflow-hidden flex flex-col transition-all duration-300 cursor-pointer',
        'border border-slate-200/80',
        'hover:-translate-y-2 hover:shadow-2xl group',
        isCompared && 'ring-2 ring-blue-500 ring-offset-2'
      )}
      style={{ boxShadow: '0 2px 16px -4px rgba(15,23,42,0.08)' }}
    >
      {/* ── IMAGE ── */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <img
          src={college.image_url || '/images/campus-placeholder.png'}
          alt={college.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            const t = e.target as HTMLImageElement
            if (!t.src.endsWith('/images/campus-placeholder.png')) t.src = '/images/campus-placeholder.png'
          }}
        />

        {/* Dark vignette that slides in on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 via-[#0f172a]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Shimmer sweep */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)', transform: 'translateX(-100%)', animation: 'none' }}
        />

        {/* Stream pill — top left */}
        <div className={cn(
          'absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md border border-white/40 shadow-lg transition-all duration-300 group-hover:scale-105',
          streamStyle.bg, streamStyle.text
        )}>
          <span className={cn('w-1.5 h-1.5 rounded-full animate-pulse', streamStyle.dot)} />
          {college.stream || 'General'}
        </div>

        {/* Save / Wishlist — top right */}
        <button
          onClick={onToggleSave}
          className={cn(
            'absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg',
            isSaved
              ? 'bg-red-500 text-white scale-110'
              : 'bg-white/90 backdrop-blur-sm text-slate-400 hover:text-red-500 hover:scale-110 hover:bg-white'
          )}
        >
          <Heart size={15} fill={isSaved ? 'currentColor' : 'none'} className={isSaved ? 'animate-bounce' : ''} />
        </button>

        {/* NIRF badge — bottom left */}
        {college.ranking && college.ranking > 0 && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-black text-white shadow-xl transition-all duration-300 group-hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)' }}>
            <Star size={10} fill="currentColor" className="text-amber-300" />
            NIRF #{college.ranking}
          </div>
        )}
      </div>

      {/* ── BODY ── */}
      <div className="flex flex-col flex-1 p-4 pb-3">

        {/* Name */}
        <Link
          href={`/colleges/${college.slug}`}
          className="block text-[13.5px] font-extrabold text-slate-900 leading-snug mb-1 hover:text-blue-600 transition-colors duration-150 line-clamp-2 group-hover:text-blue-700"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {college.name}
        </Link>

        {/* Location */}
        <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-2.5 font-medium">
          <MapPin size={11} className="text-slate-400 flex-shrink-0" />
          <span className="truncate">{college.location}, {college.state}</span>
        </div>

        {/* Star rating */}
        <div className="flex items-center gap-1 mb-3.5">
          {[1,2,3,4,5].map(s => (
            <Star key={s} size={12}
              className={s <= Math.round(parseFloat(rating)) ? 'text-amber-400' : 'text-slate-200'}
              fill="currentColor"
            />
          ))}
          <span className="text-xs font-black text-slate-800 ml-1">{rating}</span>
          <span className="text-[10px] text-slate-400 font-semibold">({reviews}K reviews)</span>
        </div>

        {/* ── METRICS BAR — deep navy ── */}
        <div
          className="flex items-stretch rounded-2xl overflow-hidden mb-4 transition-all duration-300 group-hover:shadow-lg"
          style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1e293b 100%)' }}
        >
          {/* Avg Package */}
          <div className="flex-1 flex flex-col items-center justify-center py-3 px-1 border-r border-white/10 group/metric hover:bg-white/5 transition-colors duration-150">
            <p className="text-[12px] font-black text-white leading-none truncate w-full text-center">
              {college.avg_ctc || '—'}
            </p>
            <p className="text-[8.5px] font-bold uppercase tracking-widest mt-1.5 text-blue-300/80">
              Avg Pkg
            </p>
          </div>
          {/* Fees */}
          <div className="flex-1 flex flex-col items-center justify-center py-3 px-1 border-r border-white/10 hover:bg-white/5 transition-colors duration-150">
            <p className="text-[12px] font-black text-white leading-none truncate w-full text-center">
              {college.total_fee || '—'}
            </p>
            <p className="text-[8.5px] font-bold uppercase tracking-widest mt-1.5 text-emerald-300/80">
              Total Fees
            </p>
          </div>
          {/* Est. Year */}
          <div className="flex-1 flex flex-col items-center justify-center py-3 px-1 hover:bg-white/5 transition-colors duration-150">
            <p className="text-[12px] font-black text-white leading-none">
              {college.established || '—'}
            </p>
            <p className="text-[8.5px] font-bold uppercase tracking-widest mt-1.5 text-violet-300/80">
              Est. Year
            </p>
          </div>
        </div>

        {/* ── ACTIONS ── */}
        <div className="flex items-center gap-2 mt-auto">
          {/* View Details — animated arrow */}
          <Link
            href={`/colleges/${college.slug}`}
            className="flex-1 group/btn relative overflow-hidden flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12px] font-black text-white transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-px active:translate-y-0"
            style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #2563eb 100%)' }}
          >
            {/* Shimmer overlay */}
            <span className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)' }} />
            <span className="relative">View Details</span>
            <ArrowRight size={13} className="relative transition-transform duration-200 group-hover/btn:translate-x-1" />
          </Link>

          {/* Compare toggle */}
          <button
            onClick={onToggleCompare}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-[11px] font-bold transition-all duration-200 border-2',
              isCompared
                ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                : 'bg-white border-slate-200 text-slate-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50'
            )}
          >
            <div className={cn(
              'w-3.5 h-3.5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200',
              isCompared ? 'bg-white border-white' : 'border-slate-300'
            )}>
              {isCompared && (
                <svg className="w-2 h-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            {isCompared ? 'Added' : 'Compare'}
          </button>
        </div>
      </div>

      {/* Bottom accent line — slides in on hover */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 ease-out rounded-b-3xl"
        style={{ background: 'linear-gradient(90deg, #1d4ed8, #7c3aed, #059669)' }}
      />
    </div>
  )
}

