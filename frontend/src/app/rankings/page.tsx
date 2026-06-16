'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import {
  Search, MapPin, ChevronDown, Download, Info, Building2, Scale, Navigation, Medal, X
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface DbCollege {
  id: string
  slug: string
  name: string
  location: string
  state: string
  stream: string
  ranking?: number | null
  total_fee?: string | null
  avg_ctc?: string | null
  ownership?: string | null
  type?: string | null
  established?: number | null
}

export default function RankingsPage() {
  const [colleges, setColleges] = useState<DbCollege[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedColleges, setSelectedColleges] = useState<Set<string>>(new Set())

  // Filters State
  const [stream, setStream] = useState('Engineering')
  const [location, setLocation] = useState('All India')
  const [instituteType, setInstituteType] = useState('All')
  const [ownership, setOwnership] = useState('All')
  const [fees, setFees] = useState('All')
  const [sortBy, setSortBy] = useState('NIRF Ranking')

  // Dynamic filter dropdown list options
  const [streamsList, setStreamsList] = useState<string[]>(['Engineering'])
  const [locationsList, setLocationsList] = useState<string[]>(['All India'])
  const [ownershipsList, setOwnershipsList] = useState<string[]>(['All'])
  const [typesList, setTypesList] = useState<string[]>(['All'])

  // Dropdown open states
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  
  // Compare Modal state
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false)

  useEffect(() => {
    async function loadColleges() {
      try {
        setIsLoading(true)
        const { data, error } = await supabase
          .from('colleges')
          .select('*')
          .eq('is_active', true)
          .order('ranking', { ascending: true })

        if (error) throw error
        if (data) {
          setColleges(data)

          // Extract unique dropdown lists dynamically
          const streams = Array.from(new Set(data.map(c => c.stream).filter(Boolean))).sort() as string[]
          setStreamsList(['All', ...streams])

          const states = Array.from(new Set(data.map(c => c.state).filter(Boolean))).sort() as string[]
          setLocationsList(['All India', ...states])

          const ownerships = Array.from(new Set(data.map(c => c.ownership).filter(Boolean))).sort() as string[]
          setOwnershipsList(['All', ...ownerships])

          const types = Array.from(new Set(data.map(c => c.type).filter(Boolean))).sort() as string[]
          const capTypes = types.map(t => t.charAt(0).toUpperCase() + t.slice(1))
          setTypesList(['All', ...capTypes])
        }
      } catch (err) {
        console.error('Error loading colleges:', err)
      } finally {
        setIsLoading(false)
      }
    }
    loadColleges()
  }, [])

  const toggleCompare = (id: string) => {
    setSelectedColleges(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) newSet.delete(id)
      else if (newSet.size < 4) newSet.add(id)
      return newSet
    })
  }

  const clearFilters = () => {
    setStream('Engineering')
    setLocation('All India')
    setInstituteType('All')
    setOwnership('All')
    setFees('All')
    setSortBy('NIRF Ranking')
  }

  // Helper parsers for filtering & sorting
  const parseFee = (feeStr: string | null | undefined): number | null => {
    if (!feeStr) return null
    const clean = feeStr.replace(/[^0-9.]/g, '')
    const num = parseFloat(clean)
    if (isNaN(num)) return null
    return num
  }

  const parsePackage = (packageStr: string | null | undefined): number => {
    if (!packageStr) return 0
    const clean = packageStr.replace(/[^0-9.]/g, '')
    const num = parseFloat(clean)
    if (isNaN(num)) return 0
    return num
  }

  // Client-side filtering
  const filteredColleges = colleges.filter(college => {
    // Stream Filter
    if (stream !== 'All') {
      if (!college.stream || !college.stream.toLowerCase().includes(stream.toLowerCase())) {
        return false
      }
    }

    // Location Filter
    if (location !== 'All India') {
      const matchState = college.state && college.state.toLowerCase() === location.toLowerCase()
      const matchCity = college.location && college.location.toLowerCase() === location.toLowerCase()
      if (!matchState && !matchCity) {
        return false
      }
    }

    // Institute Type Filter
    if (instituteType !== 'All') {
      if (!college.type || college.type.toLowerCase() !== instituteType.toLowerCase()) {
        return false
      }
    }

    // Ownership Filter
    if (ownership !== 'All') {
      if (!college.ownership || college.ownership.toLowerCase() !== ownership.toLowerCase()) {
        return false
      }
    }

    // Fees Filter
    if (fees !== 'All') {
      const feeVal = parseFee(college.total_fee)
      if (feeVal === null) return false
      if (fees === 'Under 1 Lakh' && feeVal >= 1.0) return false
      if (fees === '1 - 2 Lakhs' && (feeVal < 1.0 || feeVal > 2.0)) return false
      if (fees === '2 - 5 Lakhs' && (feeVal < 2.0 || feeVal > 5.0)) return false
      if (fees === 'Above 5 Lakhs' && feeVal <= 5.0) return false
    }

    return true
  })

  // Client-side sorting
  const sortedColleges = [...filteredColleges].sort((a, b) => {
    if (sortBy === 'NIRF Ranking') {
      const rankA = a.ranking || 999999
      const rankB = b.ranking || 999999
      return rankA - rankB
    }
    if (sortBy === 'Average Package') {
      const packageA = parsePackage(a.avg_ctc)
      const packageB = parsePackage(b.avg_ctc)
      return packageB - packageA
    }
    if (sortBy === 'Fees (Low to High)') {
      const feeA = parseFee(a.total_fee) ?? 999999
      const feeB = parseFee(b.total_fee) ?? 999999
      return feeA - feeB
    }
    if (sortBy === 'Fees (High to Low)') {
      const feeA = parseFee(a.total_fee) ?? -1
      const feeB = parseFee(b.total_fee) ?? -1
      return feeB - feeA
    }
    return 0
  })

  // Podium logic: Render only if we have at least 3 colleges matching current filters
  const showPodium = sortedColleges.length >= 3
  const top3 = showPodium ? sortedColleges.slice(0, 3) : []
  const restColleges = showPodium ? sortedColleges.slice(3) : sortedColleges

  return (
    <main className="min-h-screen bg-white font-sans text-slate-800 pb-20 relative">
      <Navbar />

      {/* Global Click-away Backdrop for custom dropdowns */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setActiveDropdown(null)} 
        />
      )}

      {/* ── BREADCRUMB & HERO ──────────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-8 pt-28 pb-6">
        <div className="text-[13px] text-blue-600 font-medium mb-3 flex items-center gap-2">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="text-slate-300">{'>'}</span>
          <Link href="/rankings" className="hover:underline">Rankings</Link>
          <span className="text-slate-300">{'>'}</span>
          <span className="text-slate-500">{stream === 'All' ? 'Colleges' : `${stream} Colleges`} in India</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 h-auto md:h-[180px]">
          <div className="w-full md:w-[60%] lg:w-[55%] pt-2">
            <h1 className="text-[32px] font-bold text-[#071A44] leading-tight mb-2 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Top {stream === 'All' ? '' : `${stream} `}Colleges in India 2026
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed mb-4 max-w-xl">
              Discover the best {stream === 'All' ? '' : `${stream.toLowerCase()} `}colleges in India based on NIRF 2025 rankings, placement performance, faculty quality, infrastructure and more.
            </p>
            <div className="flex items-center gap-3">
              <button className="h-10 px-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium rounded text-xs transition-colors flex items-center gap-2">
                <Download size={14} /> Download Full Ranking Report (PDF)
              </button>
              <button className="h-10 px-4 bg-white hover:bg-slate-50 text-blue-600 font-medium rounded text-xs transition-colors flex items-center gap-2 border border-slate-200">
                <Info size={14} /> Methodology
              </button>
            </div>
          </div>
          
          <div className="hidden md:flex md:w-[40%] lg:w-[45%] h-full items-center justify-end relative">
             <Image
               src="/illustrations/university-ranking-hero.svg"
               alt="University Campus Illustration"
               width={700}
               height={300}
               priority
               className="w-full h-auto object-contain"
             />
          </div>
        </div>
      </section>

      {/* ── HORIZONTAL FILTER STRIP ────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-white border-y border-slate-200 mb-6 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-8 py-3 md:py-0 md:h-20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <FilterSelect 
              icon={<Building2 size={16} />} 
              label="Stream" 
              value={stream} 
              options={streamsList}
              isOpen={activeDropdown === 'stream'}
              onToggle={() => setActiveDropdown(activeDropdown === 'stream' ? null : 'stream')}
              onSelect={setStream}
            />
            <div className="w-px h-8 bg-slate-200 mx-1 flex-shrink-0 hidden lg:block" />
            <FilterSelect 
              icon={<MapPin size={16} />} 
              label="Location" 
              value={location} 
              options={locationsList}
              isOpen={activeDropdown === 'location'}
              onToggle={() => setActiveDropdown(activeDropdown === 'location' ? null : 'location')}
              onSelect={setLocation}
            />
            <div className="w-px h-8 bg-slate-200 mx-1 flex-shrink-0 hidden lg:block" />
            <FilterSelect 
              icon={<Building2 size={16} />} 
              label="Institute Type" 
              value={instituteType} 
              options={typesList}
              isOpen={activeDropdown === 'type'}
              onToggle={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')}
              onSelect={setInstituteType}
            />
            <div className="w-px h-8 bg-slate-200 mx-1 flex-shrink-0 hidden lg:block" />
            <FilterSelect 
              icon={<Building2 size={16} />} 
              label="Ownership" 
              value={ownership} 
              options={ownershipsList}
              isOpen={activeDropdown === 'ownership'}
              onToggle={() => setActiveDropdown(activeDropdown === 'ownership' ? null : 'ownership')}
              onSelect={setOwnership}
            />
            <div className="w-px h-8 bg-slate-200 mx-1 flex-shrink-0 hidden lg:block" />
            <FilterSelect 
              icon={<Building2 size={16} />} 
              label="Fees (Annual)" 
              value={fees} 
              options={['All', 'Under 1 Lakh', '1 - 2 Lakhs', '2 - 5 Lakhs', 'Above 5 Lakhs']}
              isOpen={activeDropdown === 'fees'}
              onToggle={() => setActiveDropdown(activeDropdown === 'fees' ? null : 'fees')}
              onSelect={setFees}
            />
            <div className="w-px h-8 bg-slate-200 mx-1 flex-shrink-0 hidden lg:block" />
            <FilterSelect 
              icon={<Building2 size={16} />} 
              label="Sort By" 
              value={sortBy} 
              options={['NIRF Ranking', 'Average Package', 'Fees (Low to High)', 'Fees (High to Low)']}
              isOpen={activeDropdown === 'sort'}
              onToggle={() => setActiveDropdown(activeDropdown === 'sort' ? null : 'sort')}
              onSelect={setSortBy}
            />
          </div>

          <button onClick={clearFilters} className="flex items-center gap-2 h-12 px-6 border border-slate-200 rounded text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors whitespace-nowrap flex-shrink-0 self-start md:self-auto">
            <Search size={14} className="rotate-90 text-slate-400" /> Clear Filters
          </button>
          
        </div>
      </div>

      {/* ── TOP 3 PODIUM ───────────────────────────────────────────────────── */}
      {showPodium && !isLoading && (
        <section className="max-w-[1440px] mx-auto px-8 mb-6 animate-in fade-in duration-300">
          <div className="flex flex-col lg:flex-row items-end gap-4 justify-center">
            
            {/* Rank 2 (Left) */}
            <div className="w-full lg:w-[32%] order-2 lg:order-1 relative">
              <PodiumCard 
                college={top3[1]} 
                rank={2} 
                type="silver" 
                isCompared={selectedColleges.has(top3[1].id)}
                onCompareToggle={toggleCompare}
              />
            </div>

            {/* Title & Rank 1 (Center) */}
            <div className="w-full lg:w-[36%] order-1 lg:order-2 flex flex-col items-center">
              <div className="mb-2 text-center w-full flex items-center justify-center gap-2">
                <Medal size={20} className="text-amber-500" />
                <h2 className="text-xl font-bold text-[#071A44]" style={{ fontFamily: 'var(--font-display)' }}>Top 3 Colleges</h2>
              </div>
              <p className="text-slate-500 text-xs mb-3 text-center">Overall Ranking 2026</p>
              <div className="w-full">
                <PodiumCard 
                  college={top3[0]} 
                  rank={1} 
                  type="gold" 
                  isCenter 
                  isCompared={selectedColleges.has(top3[0].id)}
                  onCompareToggle={toggleCompare}
                />
              </div>
            </div>

            {/* Rank 3 (Right) */}
            <div className="w-full lg:w-[32%] order-3 lg:order-3 relative">
              <PodiumCard 
                college={top3[2]} 
                rank={3} 
                type="bronze" 
                isCompared={selectedColleges.has(top3[2].id)}
                onCompareToggle={toggleCompare}
              />
            </div>

          </div>
        </section>
      )}

      {/* ── RANKINGS TABLE ─────────────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-8 pb-10 flex items-start gap-6 relative">
        <div className="flex-1 overflow-hidden border border-slate-200 rounded-t-lg bg-white">
          {/* Table Header */}
          <div className="bg-[#071A44] h-12 flex items-center text-white px-6">
             <div className="w-16 flex-shrink-0 text-xs font-semibold uppercase tracking-wider text-white/80">Rank</div>
             <div className="flex-1 min-w-[280px] text-xs font-semibold uppercase tracking-wider text-white/80">College</div>
             <div className="w-[120px] text-xs font-semibold uppercase tracking-wider text-white/80 text-center">Ownership</div>
             <div className="w-[140px] text-xs font-semibold uppercase tracking-wider text-white/80 text-center">Average Package</div>
             <div className="w-[140px] text-xs font-semibold uppercase tracking-wider text-white/80 text-center">Total Fees (Annual)</div>
             <div className="w-[120px] text-xs font-semibold uppercase tracking-wider text-white/80 text-center">Location</div>
             <div className="w-20 text-xs font-semibold uppercase tracking-wider text-white/80 text-right">Compare</div>
          </div>

          {/* Table Body */}
          {isLoading ? (
            <div className="py-10 text-center text-slate-500 font-medium">Loading rankings...</div>
          ) : sortedColleges.length === 0 ? (
            <div className="py-10 text-center text-slate-500 font-medium">No colleges found matching the selected filters.</div>
          ) : (
            <div className="flex flex-col">
              {restColleges.map((college) => (
                <div key={college.id} className="min-h-[64px] flex items-center border-b border-slate-200 px-6 hover:bg-[#F8FAFC] transition-colors duration-200">
                   
                   {/* Rank */}
                   <div className="w-16 flex-shrink-0 text-xl font-bold text-[#071A44]">
                     {college.ranking ? `#${college.ranking}` : '-'}
                   </div>

                   {/* College Name & Logo */}
                   <div className="flex-1 min-w-[280px] flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center bg-white flex-shrink-0">
                         <Building2 size={20} className="text-slate-300" />
                      </div>
                      <div>
                        <Link href={`/colleges/${college.slug}`} className="text-[15px] font-bold text-[#071A44] hover:text-blue-600 transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                          {college.name}
                        </Link>
                        <p className="text-xs text-slate-500 mt-0.5">{college.location}, {college.state}</p>
                      </div>
                   </div>

                   {/* Ownership */}
                   <div className="w-[120px] text-center">
                     <span className="text-[13px] font-medium text-slate-600">
                       {college.ownership || '-'}
                     </span>
                   </div>

                   {/* Average Package */}
                   <div className="w-[140px] text-center">
                     <span className="text-[14px] font-semibold text-slate-800">
                       {college.avg_ctc || '-'}
                     </span>
                   </div>

                   {/* Total Fees */}
                   <div className="w-[140px] text-center">
                     <span className="text-[14px] font-semibold text-slate-800">
                       {college.total_fee || '-'}
                     </span>
                   </div>

                   {/* Location */}
                   <div className="w-[120px] text-center text-[13px] text-slate-600">
                     {college.location}
                   </div>

                   {/* Compare */}
                   <div className="w-20 flex justify-end items-center">
                     <label className="flex items-center gap-2 cursor-pointer group">
                       <input 
                         type="checkbox" 
                         className="w-4 h-4 border-slate-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                         checked={selectedColleges.has(college.id)}
                         onChange={() => toggleCompare(college.id)}
                       />
                       <span className="text-xs text-slate-500 group-hover:text-slate-800">Compare</span>
                     </label>
                   </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── STICKY COMPARE WIDGET ────────────────────────────────────────── */}
        <div className="w-[120px] flex-shrink-0 sticky top-32">
           <div className="border border-slate-200 rounded-lg bg-white p-5 flex flex-col items-center justify-center min-h-[160px] shadow-sm">
             <Scale size={24} className="text-[#071A44] mb-3" />
             <p className="text-[13px] font-bold text-[#071A44] mb-3">Compare</p>
             <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-sm mb-4">
               {selectedColleges.size}
             </div>
             <button 
               onClick={() => setIsCompareModalOpen(true)}
               disabled={selectedColleges.size < 2}
               className={cn(
                 "w-full py-2.5 rounded text-[13px] font-bold transition-all",
                 selectedColleges.size >= 2 
                  ? "bg-[#2563EB] text-white hover:bg-[#1D4ED8] cursor-pointer" 
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
               )}
             >
               View Compare
             </button>
           </div>
        </div>
      </section>

      {/* ── SIDE-BY-SIDE COMPARE MODAL ─────────────────────────────────────── */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto flex flex-col border border-slate-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#071A44] text-white rounded-t-lg">
              <div className="flex items-center gap-2">
                <Scale size={20} />
                <h3 className="text-lg font-bold">College Comparison</h3>
              </div>
              <button 
                onClick={() => setIsCompareModalOpen(false)}
                className="text-white/80 hover:text-white text-sm font-semibold hover:bg-white/10 px-3 py-1.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
              >
                <X size={16} /> Close
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-4 pr-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-1/5">Metrics</th>
                    {Array.from(selectedColleges).map(id => {
                      const college = colleges.find(c => c.id === id)
                      if (!college) return null
                      return (
                        <th key={id} className="py-4 px-4 text-[15px] font-bold text-[#071A44] w-1/4">
                          {college.name}
                        </th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  <tr>
                    <td className="py-4 pr-4 font-bold text-slate-500">NIRF Rank</td>
                    {Array.from(selectedColleges).map(id => {
                      const college = colleges.find(c => c.id === id)
                      return (
                        <td key={id} className="py-4 px-4 font-semibold text-slate-900">
                          {college?.ranking ? `#${college.ranking}` : '-'}
                        </td>
                      )
                    })}
                  </tr>
                  <tr>
                    <td className="py-4 pr-4 font-bold text-slate-500">Average Package</td>
                    {Array.from(selectedColleges).map(id => {
                      const college = colleges.find(c => c.id === id)
                      return (
                        <td key={id} className="py-4 px-4 text-emerald-600 font-bold">
                          {college?.avg_ctc || '-'}
                        </td>
                      )
                    })}
                  </tr>
                  <tr>
                    <td className="py-4 pr-4 font-bold text-slate-500">Total Fees (Annual)</td>
                    {Array.from(selectedColleges).map(id => {
                      const college = colleges.find(c => c.id === id)
                      return (
                        <td key={id} className="py-4 px-4 text-slate-700 font-medium">
                          {college?.total_fee || '-'}
                        </td>
                      )
                    })}
                  </tr>
                  <tr>
                    <td className="py-4 pr-4 font-bold text-slate-500">Location</td>
                    {Array.from(selectedColleges).map(id => {
                      const college = colleges.find(c => c.id === id)
                      return (
                        <td key={id} className="py-4 px-4 text-slate-600">
                          {college ? `${college.location}, ${college.state}` : '-'}
                        </td>
                      )
                    })}
                  </tr>
                  <tr>
                    <td className="py-4 pr-4 font-bold text-slate-500">Ownership</td>
                    {Array.from(selectedColleges).map(id => {
                      const college = colleges.find(c => c.id === id)
                      return (
                        <td key={id} className="py-4 px-4 text-slate-600">
                          {college?.ownership || '-'}
                        </td>
                      )
                    })}
                  </tr>
                  <tr>
                    <td className="py-4 pr-4 font-bold text-slate-500">Action</td>
                    {Array.from(selectedColleges).map(id => {
                      const college = colleges.find(c => c.id === id)
                      if (!college) return null
                      return (
                        <td key={id} className="py-4 px-4">
                          <Link 
                            href={`/colleges/${college.slug}`}
                            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700 transition-colors"
                          >
                            View Details
                          </Link>
                        </td>
                      )
                    })}
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}

// ── SUBCOMPONENTS ──────────────────────────────────────────────────────────

function FilterSelect({
  icon,
  label,
  value,
  options,
  isOpen,
  onToggle,
  onSelect
}: {
  icon: React.ReactNode
  label: string
  value: string
  options: string[]
  isOpen: boolean
  onToggle: () => void
  onSelect: (val: string) => void
}) {
  return (
    <div className="relative min-w-[140px] z-40 select-none">
      <div 
        onClick={onToggle}
        className="flex items-start gap-3 px-2 py-1 cursor-pointer group"
      >
        <div className="text-slate-400 mt-1">{icon}</div>
        <div className="flex-1">
          <p className="text-[11px] font-medium text-slate-500 mb-0.5">{label}</p>
          <div className="flex items-center justify-between gap-4">
            <span className="text-[13px] font-bold text-[#071A44] whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">
              {value}
            </span>
            <ChevronDown size={14} className={cn("text-slate-400 group-hover:text-slate-800 transition-transform", isOpen && "rotate-180")} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-md shadow-lg py-1 z-50 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onSelect(option)
                onToggle()
              }}
              className={cn(
                "w-full text-left px-4 py-2 text-sm transition-colors hover:bg-slate-50 text-slate-700 cursor-pointer",
                value === option && "bg-blue-50 text-blue-600 font-semibold"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function PodiumCard({ 
  college, 
  rank, 
  type, 
  isCenter,
  isCompared,
  onCompareToggle
}: { 
  college: DbCollege
  rank: number
  type: 'gold'|'silver'|'bronze'
  isCenter?: boolean
  isCompared: boolean
  onCompareToggle: (id: string) => void
}) {
  
  const colors = {
    gold: { border: 'border-amber-400', badge: 'bg-gradient-to-br from-amber-300 to-amber-500', shadow: 'shadow-amber-100/50' },
    silver: { border: 'border-slate-300', badge: 'bg-gradient-to-br from-slate-200 to-slate-400', shadow: 'shadow-slate-200/50' },
    bronze: { border: 'border-orange-300', badge: 'bg-gradient-to-br from-orange-300 to-orange-500', shadow: 'shadow-orange-100/50' }
  }

  const c = colors[type]

  return (
    <div className={cn(
      "bg-white rounded-lg p-4 relative flex flex-col items-center text-center transition-all",
      isCenter ? `border-2 ${c.border} shadow-lg ${c.shadow} py-5` : `border border-slate-200`
    )}>
      
      {/* Medal Badge */}
      <div className="absolute -top-3 -left-3 flex flex-col items-center">
        <div className={cn("w-8 h-8 rounded-full text-white font-bold text-base flex items-center justify-center shadow-md z-10", c.badge)}>
          {rank}
        </div>
        <div className="flex gap-1 mt-[-5px]">
          <div className={cn("w-2 h-3 bg-opacity-80 clip-ribbon", c.badge)} style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%)' }} />
          <div className={cn("w-2 h-3 bg-opacity-80 clip-ribbon", c.badge)} style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%)' }} />
        </div>
      </div>

      <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center bg-white mb-2 flex-shrink-0">
         <Building2 size={18} className="text-[#071A44]/20" />
      </div>

      <Link href={`/colleges/${college.slug}`} className="text-sm font-bold text-[#071A44] leading-tight mb-0.5 hover:text-blue-600 transition-colors truncate w-full max-w-[200px]" style={{ fontFamily: 'var(--font-display)' }}>
        {college.name}
      </Link>
      <p className="text-[11px] text-slate-500 mb-3 truncate w-full max-w-[200px]">{college.location}, {college.state}</p>

      <div className="flex items-center justify-center gap-4 w-full mb-4 divide-x divide-slate-100 border-t border-slate-100 pt-3">
        <div className="px-1 text-center">
          <p className="text-[9px] uppercase font-semibold text-slate-400 mb-0.5">NIRF Rank</p>
          <p className="text-[13px] font-bold text-slate-800">{college.ranking || '-'}</p>
        </div>
        <div className="px-1 text-center">
          <p className="text-[9px] uppercase font-semibold text-slate-400 mb-0.5">Avg Package</p>
          <p className="text-[13px] font-bold text-slate-800">{college.avg_ctc || '-'}</p>
        </div>
        <div className="px-1 text-center hidden xl:block">
          <p className="text-[9px] uppercase font-semibold text-slate-400 mb-0.5">Total Fees</p>
          <p className="text-[13px] font-bold text-slate-800">{college.total_fee || '-'}</p>
        </div>
      </div>

      <div className="w-full flex items-center gap-2">
        <Link href={`/colleges/${college.slug}`} className="flex-1 h-9 flex items-center justify-center text-xs font-bold text-amber-500 border border-amber-200 rounded hover:bg-amber-50 transition-colors group whitespace-nowrap">
          Details <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
        </Link>
        <button 
          onClick={() => onCompareToggle(college.id)}
          className={cn(
            "h-9 px-3 border rounded text-xs font-bold flex items-center justify-center transition-colors cursor-pointer whitespace-nowrap",
            isCompared 
              ? "bg-[#2563EB] border-[#2563EB] text-white hover:bg-[#1D4ED8]" 
              : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
          )}
        >
          Compare
        </button>
      </div>

    </div>
  )
}
