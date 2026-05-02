'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { supabase } from '@/lib/supabase'
import {
  Code2, Stethoscope, ChevronRight, Search, Filter,
  SlidersHorizontal, ArrowUpDown, AlertCircle, Loader2,
  TrendingDown, TrendingUp, Building2, MapPin
} from 'lucide-react'

// ── Stream Config ──────────────────────────────────────────────────────────────

const STREAM_CONFIG = {
  engineering: {
    label: 'Engineering',
    icon: Code2,
    exams: ['JEE Main', 'JEE Advanced', 'BITSAT', 'MHT CET', 'AP EAMCET', 'KCET', 'WBJEE'],
    courses: ['B.Tech (CSE)', 'B.Tech (ECE)', 'B.Tech (ME)', 'B.Tech (CE)', 'B.Tech (EE)', 'B.Tech (IT)', 'B.Tech (AI & ML)', 'B.Tech (Chemical)', 'B.Arch', 'B.E.'],
    categories: ['Open / General', 'OBC-NCL', 'SC', 'ST', 'EWS', 'PwD'],
    collegeTypes: ['IIT', 'NIT', 'IIIT', 'Government', 'Deemed', 'Private'],
    quotas: ['All India Quota (AIQ)', 'Home State Quota', 'Other State Quota', 'Management Quota', 'NRI Quota'],
    states: ['All India', 'Delhi', 'Maharashtra', 'Tamil Nadu', 'Karnataka', 'Uttar Pradesh', 'West Bengal', 'Rajasthan', 'Telangana', 'Andhra Pradesh', 'Kerala', 'Gujarat', 'Punjab', 'Haryana', 'Madhya Pradesh'],
    years: ['2025', '2024'],
    rankLabel: 'JoSAA/CSAB Rank',
    emptyHint: 'Try selecting a college type like "IIT" or "NIT" for best results.',
  },
  medical: {
    label: 'Medical',
    icon: Stethoscope,
    exams: ['NEET UG', 'NEET PG', 'INI CET', 'AIIMS Entrance'],
    courses: ['MBBS', 'BDS', 'BAMS', 'BHMS', 'BUMS', 'BSMS', 'B.SC. NURSING', 'B.PHARM', 'B.V.SC AND A.H', 'B.SC IN POULTRY PRODUCTION'],
    categories: ['EWS', 'OBC', 'OBC PwD', 'Open', 'SC', 'ST'],
    collegeTypes: ['Govt.', 'Private', 'Govt. Aided', 'Central Inst./University'],
    quotas: ['All India quota', 'ESIC Quota', 'State Quota'],
    states: [
      'All India', 'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
    ],
    years: ['2025', '2024'],
    rankLabel: 'NEET Rank',
    emptyHint: 'Try selecting "Govt." college type with "All India quota" for AIIMS and top government MBBS seats.',
  },
}

type StreamKey = keyof typeof STREAM_CONFIG

// ── Filter State ───────────────────────────────────────────────────────────────

type Filters = {
  exam: string
  year: string
  course: string
  collegeType: string
  state: string
  quota: string
  college: string
  category: string
}

const DEFAULT_FILTERS: Filters = {
  exam: '', year: '', course: '', collegeType: '',
  state: '', quota: '', college: '', category: '',
}

// ── Cutoff Result Type ─────────────────────────────────────────────────────────

type CutoffRow = {
  id: string
  course: string
  category: string
  quota: string
  state: string
  college_type: string
  rank: number
  marks: number | null
  year: number
  round: number
  colleges: {
    name: string
    slug: string
    location: string
    state: string
    ownership: string
    nirf_rank: number | null
  }
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function CutoffSlugPage({ params }: { params: { slug: string } }) {
  const slug = params.slug as StreamKey
  const config = STREAM_CONFIG[slug]
  if (!config) return notFound()

  const Icon = config.icon

  const [filters, setFilters] = useState<Filters>({ ...DEFAULT_FILTERS, exam: config.exams[0] })
  const [results, setResults] = useState<CutoffRow[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [sortField, setSortField] = useState<'rank' | 'round'>('rank')
  const [sortAsc, setSortAsc] = useState(true)
  const [dbOptions, setDbOptions] = useState({
    colleges: [] as string[],
    years: [] as string[],
    courses: [] as string[],
    collegeTypes: [] as string[],
    states: [] as string[],
    quotas: [] as string[],
    categories: [] as string[]
  })

  useEffect(() => {
    async function fetchOptions() {
      // Fetch all unique options from the cutoffs table
      // Note: Assumes new schema (course, state, quota, category, college_type)
      const { data } = await supabase
        .from('cutoffs')
        .select(`
          year, course, state, quota, category, college_type,
          colleges (name)
        `)
        .limit(10000)

      if (data) {
        const unique = (key: string) => 
          Array.from(new Set(data.map(d => String((d as any)[key])).filter(Boolean))).sort()

        setDbOptions({
          colleges: Array.from(new Set(data.map((d: any) => d.colleges?.name).filter(Boolean))).sort() as string[],
          years: unique('year').sort((a, b) => Number(b) - Number(a)), // descending
          courses: unique('course'),
          collegeTypes: unique('college_type'),
          states: unique('state'),
          quotas: unique('quota'),
          categories: unique('category')
        })
      }
    }
    fetchOptions()
  }, [])

  const setFilter = (key: keyof Filters, value: string) =>
    setFilters(prev => ({ ...prev, [key]: value }))

  const handleSearch = useCallback(async () => {
    setLoading(true)
    setSearched(true)

    try {
      let query = supabase
        .from('cutoffs')
        .select(`
          id, course, category, quota, state, college_type,
          rank, marks, year, round,
          colleges!inner ( name, slug, location, state, ownership, nirf_rank )
        `)
        .order(sortField, { ascending: sortAsc })
        .limit(50)

      // Apply filters that map to existing schema
      if (filters.year)     query = query.eq('year', parseInt(filters.year))
      if (filters.course)   query = query.ilike('course', `%${filters.course}%`)
      if (filters.category) query = query.ilike('category', `%${filters.category}%`)
      if (filters.quota)    query = query.ilike('quota', `%${filters.quota}%`)
      if (filters.collegeType) query = query.ilike('college_type', `%${filters.collegeType}%`)
      if (filters.state && filters.state !== 'All India') query = query.ilike('state', `%${filters.state}%`)
      if (filters.college)  query = query.eq('colleges.name', filters.college)

      // TODO: Add more filter columns once schema is extended (exam, stream)

      const { data, error } = await query
      if (error) throw error

      let rows = (data || []).filter(r => r.colleges) as unknown as CutoffRow[]

      // Deduplicate rows (in case the database has duplicate entries from multiple seed runs)
      const uniqueRowsMap = new Map()
      for (const r of rows) {
        const key = `${r.colleges.name}-${r.course}-${r.category}-${r.quota}-${r.round}-${r.year}-${r.rank}`
        if (!uniqueRowsMap.has(key)) {
          uniqueRowsMap.set(key, r)
        }
      }
      rows = Array.from(uniqueRowsMap.values())

      setResults(rows)
    } catch (err) {
      console.error('[Cutoffs] Query error:', err)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [filters, sortField, sortAsc])

  const toggleSort = (field: 'rank' | 'round') => {
    if (sortField === field) setSortAsc(p => !p)
    else { setSortField(field); setSortAsc(true) }
  }

  const resetFilters = () => {
    setFilters({ ...DEFAULT_FILTERS, exam: config.exams[0] })
    setResults([])
    setSearched(false)
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-10 border-b border-slate-100 bg-gradient-to-br from-sky-50 via-white to-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/cutoffs" className="hover:text-slate-600 transition-colors">Cutoffs</Link>
            <ChevronRight size={12} />
            <span className="text-sky-600">{config.label}</span>
          </div>

          <div className="flex items-start gap-4 mb-2">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-sky-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Icon size={24} className="text-sky-600" />
            </div>
            <div>
              <h1
                className="font-black text-slate-900 tracking-tight leading-tight"
                style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}
              >
                {config.label} Cutoffs
                <span className="text-sky-600"> Year-wise</span>
              </h1>
              <p className="text-slate-500 text-sm sm:text-base mt-1">
                Search cutoff ranks by exam, year, course, college type, state, quota, and category.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTER PANEL ────────────────────────────────────────── */}
      <section className="py-8 sm:py-10 bg-white border-b border-slate-100">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-2 mb-6">
            <SlidersHorizontal size={16} className="text-sky-600" />
            <h2 className="font-black text-slate-900 text-sm uppercase tracking-widest">Filter Cutoffs</h2>
          </div>

          {/* Grid of filters — mirrors the image exactly */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

            {/* Exam (Assuming Exam is not dynamic or you can fetch it if needed, using config for now) */}
            <FilterSelect
              label="Exam"
              value={filters.exam}
              onChange={v => setFilter('exam', v)}
              options={config.exams}
              placeholder="Select Exam"
            />

            {/* Year */}
            <FilterSelect
              label="Year"
              value={filters.year}
              onChange={v => setFilter('year', v)}
              options={dbOptions.years.length > 0 ? dbOptions.years : config.years}
              placeholder="Select Year"
            />

            {/* Course */}
            <FilterSelect
              label="Course"
              value={filters.course}
              onChange={v => setFilter('course', v)}
              options={dbOptions.courses.length > 0 ? dbOptions.courses : config.courses}
              placeholder="Select Course"
            />

            {/* College Type */}
            <FilterSelect
              label="College Type"
              value={filters.collegeType}
              onChange={v => setFilter('collegeType', v)}
              options={dbOptions.collegeTypes.length > 0 ? dbOptions.collegeTypes : config.collegeTypes}
              placeholder="Select College Type"
            />

            {/* State */}
            <FilterSelect
              label="State / Looking For Cutoff In"
              value={filters.state}
              onChange={v => setFilter('state', v)}
              options={dbOptions.states.length > 0 ? dbOptions.states : config.states}
              placeholder="Select State"
            />

            {/* Quota */}
            <FilterSelect
              label="Counselling / Quota"
              value={filters.quota}
              onChange={v => setFilter('quota', v)}
              options={dbOptions.quotas.length > 0 ? dbOptions.quotas : config.quotas}
              placeholder="Select Quota"
            />

            {/* College */}
            <FilterSelect
              label="College"
              value={filters.college}
              onChange={v => setFilter('college', v)}
              options={dbOptions.colleges}
              placeholder="Select College"
            />

            {/* Category */}
            <FilterSelect
              label="Your Category"
              value={filters.category}
              onChange={v => setFilter('category', v)}
              options={dbOptions.categories.length > 0 ? dbOptions.categories : config.categories}
              placeholder="Select Category"
            />
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-8 py-3.5 bg-sky-600 text-white rounded-2xl font-black text-sm hover:bg-sky-700 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-sky-600/20"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
              {loading ? 'Searching...' : 'View Cut Off'}
            </button>
            {searched && (
              <button
                onClick={resetFilters}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-slate-600 rounded-2xl font-black text-sm border border-slate-200 hover:border-sky-300 hover:text-sky-600 transition-all"
              >
                <Filter size={14} />
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── RESULTS ─────────────────────────────────────────────── */}
      <section className="py-10 sm:py-14">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Not yet searched */}
          {!searched && !loading && (
            <EmptyState
              icon={<SlidersHorizontal size={40} className="text-sky-300" />}
              title="Select your filters above"
              subtitle={`Choose your exam, year, course and category, then click "View Cut Off" to see ${config.label.toLowerCase()} cutoff ranks.`}
              hint={config.emptyHint}
            />
          )}

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 size={40} className="text-sky-500 animate-spin" />
              <p className="text-slate-400 font-bold text-sm">Fetching cutoff data...</p>
            </div>
          )}

          {/* No results */}
          {searched && !loading && results.length === 0 && (
            <EmptyState
              icon={<AlertCircle size={40} className="text-amber-400" />}
              title="No cutoffs found"
              subtitle="Try adjusting your filters — remove some constraints like state or college type to broaden the results."
              hint={config.emptyHint}
            />
          )}

          {/* Results table */}
          {searched && !loading && results.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-sky-600 mb-1">
                    {config.label} · {filters.year || 'All Years'}
                  </p>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    {results.length} Cutoff{results.length !== 1 ? 's' : ''} Found
                  </h2>
                </div>
                <div className="text-xs text-slate-400 font-medium hidden sm:block">
                  Sorted by {sortField === 'rank' ? 'Rank' : 'Round'} · {sortAsc ? '↑' : '↓'}
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">College Type</th>
                      <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">College Name</th>
                      <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Course</th>
                      <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
                      <SortableHeader
                        label="Rank"
                        field="rank"
                        current={sortField}
                        asc={sortAsc}
                        onClick={() => toggleSort('rank')}
                      />
                      <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Marks</th>
                      <SortableHeader
                        label="Round"
                        field="round"
                        current={sortField}
                        asc={sortAsc}
                        onClick={() => toggleSort('round')}
                      />
                      <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Year</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {results.map((row, i) => (
                      <tr
                        key={row.id}
                        className={`transition-colors hover:bg-sky-50/40 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}
                      >
                        <td className="px-5 py-4">
                          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">{row.college_type}</span>
                        </td>
                        <td className="px-5 py-4">
                          <Link href={`/colleges/${row.colleges.slug}`} className="group">
                            <p className="font-black text-slate-900 group-hover:text-sky-600 transition-colors text-sm leading-tight">
                              {row.colleges.name}
                            </p>
                            <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                              <MapPin size={9} />{row.colleges.location}
                              {row.colleges.nirf_rank && <span className="ml-1 text-sky-500">· NIRF #{row.colleges.nirf_rank}</span>}
                            </p>
                          </Link>
                        </td>
                        <td className="px-5 py-4">
                          <span className="font-bold text-slate-700 text-xs">{row.course}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="px-2.5 py-1 bg-sky-50 text-sky-700 rounded-lg text-[10px] font-black border border-sky-100 whitespace-nowrap">
                            {row.category}
                          </span>
                          <div className="text-[10px] text-slate-400 mt-1 font-medium">{row.quota}</div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1 text-emerald-600 font-black text-sm">
                            <TrendingUp size={12} />
                            {row.rank.toLocaleString('en-IN')}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          {row.marks ? (
                            <span className="text-sm font-black text-slate-700">{row.marks}</span>
                          ) : (
                            <span className="text-sm font-medium text-slate-300">-</span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-xs font-black text-slate-600">
                          Rd {row.round}
                        </td>
                        <td className="px-5 py-4 text-xs font-black text-slate-500">
                          {row.year}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function FilterSelect({
  label, value, onChange, options, placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-black uppercase tracking-widest text-slate-500">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 font-medium bg-white focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all appearance-none cursor-pointer"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
      >
        <option value="">{placeholder}</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  )
}

function SortableHeader({ label, field, current, asc, onClick }: {
  label: string
  field: string
  current: string
  asc: boolean
  onClick: () => void
}) {
  const active = current === field
  return (
    <th
      className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 cursor-pointer hover:text-sky-600 transition-colors select-none"
      onClick={onClick}
    >
      <div className="flex items-center gap-1">
        {label}
        <ArrowUpDown size={10} className={active ? 'text-sky-500' : 'text-slate-300'} />
        {active && <span className="text-sky-500">{asc ? '↑' : '↓'}</span>}
      </div>
    </th>
  )
}

function EmptyState({ icon, title, subtitle, hint }: {
  icon: React.ReactNode
  title: string
  subtitle: string
  hint?: string
}) {
  return (
    <div className="text-center py-20 max-w-lg mx-auto">
      <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-5 border border-slate-100">
        {icon}
      </div>
      <h3 className="text-xl font-black text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-4">{subtitle}</p>
      {hint && (
        <div className="inline-flex items-start gap-2 px-4 py-3 bg-sky-50 text-sky-700 rounded-xl text-xs font-medium text-left border border-sky-100">
          <AlertCircle size={12} className="mt-0.5 flex-shrink-0" />
          {hint}
        </div>
      )}
    </div>
  )
}
