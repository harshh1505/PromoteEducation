'use client'
import { useState, useEffect, useCallback, useMemo, use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { supabase } from '@/lib/supabase'
import {
  Code2, Stethoscope, ChevronRight, Search, Filter,
  SlidersHorizontal, ArrowUpDown, AlertCircle, Loader2,
  TrendingUp, Building2, MapPin,
  ArrowLeft, Download, Share2, Info,
  Sparkles, GraduationCap, Calendar, BookOpen
} from 'lucide-react'

// ── Stream Config ──────────────────────────────────────────────────────────────

const STREAM_CONFIG = {
  engineering: {
    label: 'Engineering',
    theme: 'sky',
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
    theme: 'emerald',
    icon: Stethoscope,
    exams: ['NEET UG', 'NEET PG', 'INI CET', 'AIIMS Entrance'],
    courses: ['MBBS', 'BDS', 'BAMS', 'BHMS', 'BUMS', 'BSMS', 'B.SC. NURSING', 'B.PHARM', 'B.V.SC AND A.H', 'B.SC IN POULTRY PRODUCTION'],
    categories: ['EWS', 'OBC', 'OBC PwD', 'Open', 'SC', 'ST'],
    collegeTypes: ['Govt.', 'Private', 'Govt. Aided', 'Central Inst./University'],
    quotas: ['All India quota', 'ESIC Quota', 'State Quota', 'Open Seat Quota'],
    states: [
      'All India', 'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
    ],
    years: ['2025', '2024'],
    rankLabel: 'NEET Rank',
    emptyHint: 'Try selecting "Govt." college type with "All India quota" for AIIMS and top government MBBS seats.',
  },
}

type StreamKey = keyof typeof STREAM_CONFIG

// ── Types ─────────────────────────────────────────────────────────────────────

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

type CutoffRow = {
  id: string
  course: string
  category: string
  quota: string
  state: string
  college_type: string
  college_name: string
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

// ── Distinct Value Fetcher via RPC ────────────────────────────────────────────
//
// Calls the `get_cutoff_distinct` Postgres function which runs a single
// SELECT DISTINCT query server-side — one round trip, no pagination loop,
// no max_rows truncation. Returns every distinct value for the requested
// column with all upstream filters already applied in the database.
//
async function fetchDistinctValues(
  targetColumn: string,
  appliedFilters: Partial<Filters>
): Promise<string[]> {
  const { data, error } = await supabase.rpc('get_cutoff_distinct', {
    p_field:        targetColumn,
    p_year:         appliedFilters.year        ? parseInt(appliedFilters.year) : null,
    p_course:       appliedFilters.course       ?? null,
    p_college_type: appliedFilters.collegeType  ?? null,
    p_state:        appliedFilters.state        ?? null,
    p_quota:        appliedFilters.quota        ?? null,
    p_college_name: appliedFilters.college      ?? null,
    p_category:     appliedFilters.category     ?? null,
  })

  if (error) {
    console.error('[fetchDistinctValues] RPC error:', error.message)
    return []
  }

  // RPC returns [{ val: "..." }, ...] — extract and drop nulls
  return (data as { val: string }[])
    .map(r => r.val)
    .filter(Boolean)
}

// ── Page Component ────────────────────────────────────────────────────────────

export default function CutoffSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const slug = resolvedParams.slug as StreamKey
  const config = STREAM_CONFIG[slug]
  if (!config) return notFound()

  const Icon = config.icon
  const themeColor = config.theme === 'sky' ? 'sky' : 'emerald'

  const [filters, setFilters] = useState<Filters>({ ...DEFAULT_FILTERS, exam: config.exams[0] })
  const [results, setResults] = useState<CutoffRow[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [sortField, setSortField] = useState<'rank' | 'round'>('rank')
  const [sortAsc, setSortAsc] = useState(true)

  // Per-dropdown option lists
  const [optYears, setOptYears] = useState<string[]>([])
  const [optCourses, setOptCourses] = useState<string[]>([])
  const [optCollegeTypes, setOptCollegeTypes] = useState<string[]>([])
  const [optStates, setOptStates] = useState<string[]>([])
  const [optQuotas, setOptQuotas] = useState<string[]>([])
  const [optColleges, setOptColleges] = useState<string[]>([])
  const [optCategories, setOptCategories] = useState<string[]>([])

  // ── Cascading Dropdown Effects ─────────────────────────────────────────────
  // Each effect fires only when its parent filter changes, passes the currently
  // selected upstream filters to fetchDistinctValues so the DB does the
  // filtering, and we just collect distinct values from the results.

  // Year — depends on: exam (no DB column, just a UI gate)
  useEffect(() => {
    if (!filters.exam) { setOptYears([]); return }
    fetchDistinctValues('year', {}).then(setOptYears)
  }, [filters.exam])

  // Course — depends on: year
  useEffect(() => {
    if (!filters.year) { setOptCourses([]); return }
    fetchDistinctValues('course', { year: filters.year }).then(setOptCourses)
  }, [filters.year])

  // College type — depends on: year + course
  useEffect(() => {
    if (!filters.course) { setOptCollegeTypes([]); return }
    fetchDistinctValues('college_type', {
      year: filters.year,
      course: filters.course,
    }).then(setOptCollegeTypes)
  }, [filters.course])

  // State — depends on: year + course + collegeType
  useEffect(() => {
    if (!filters.collegeType) { setOptStates([]); return }
    fetchDistinctValues('state', {
      year: filters.year,
      course: filters.course,
      collegeType: filters.collegeType,
    }).then(setOptStates)
  }, [filters.collegeType])

  // Quota — depends on: year + course + collegeType + state
  useEffect(() => {
    if (!filters.state) { setOptQuotas([]); return }
    fetchDistinctValues('quota', {
      year: filters.year,
      course: filters.course,
      collegeType: filters.collegeType,
      state: filters.state,
    }).then(setOptQuotas)
  }, [filters.state])

  // College — depends on: year + course + collegeType + state + quota
  useEffect(() => {
    if (!filters.quota) { setOptColleges([]); return }
    fetchDistinctValues('college_name', {
      year: filters.year,
      course: filters.course,
      collegeType: filters.collegeType,
      state: filters.state,
      quota: filters.quota,
    }).then(setOptColleges)
  }, [filters.quota])

  // Category — depends on: all upstream filters + college
  useEffect(() => {
    if (!filters.college) { setOptCategories([]); return }
    fetchDistinctValues('category', {
      year: filters.year,
      course: filters.course,
      collegeType: filters.collegeType,
      state: filters.state,
      quota: filters.quota,
      college: filters.college,
    }).then(setOptCategories)
  }, [filters.college])

  const dbOptions = {
    years: optYears,
    courses: optCourses,
    collegeTypes: optCollegeTypes,
    states: optStates,
    quotas: optQuotas,
    colleges: optColleges,
    categories: optCategories,
  }

  // ── Filter Cascade Reset ───────────────────────────────────────────────────
  // When a parent filter changes, clear all downstream selections so the user
  // is not left with stale/impossible combinations.

  const setFilter = useCallback((key: keyof Filters, value: string) => {
    const order: (keyof Filters)[] = ['exam', 'year', 'course', 'collegeType', 'state', 'quota', 'college', 'category']
    const idx = order.indexOf(key)
    setFilters(prev => {
      const next = { ...prev, [key]: value }
      order.slice(idx + 1).forEach(k => { next[k] = '' })
      return next
    })
  }, [])

  // ── Search Handler ─────────────────────────────────────────────────────────
  // All filters are applied server-side before the query hits the network.
  // `.limit(100)` keeps the response fast — users never need 10,000 raw rows,
  // they need the right ~50-100 rows for their specific filter combination.

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
        .limit(100)

      // Server-side filters — DB does the work, not the browser
      if (filters.year)        query = query.eq('year', parseInt(filters.year))
      if (filters.course)      query = query.eq('course', filters.course)
      if (filters.category)    query = query.eq('category', filters.category)
      if (filters.collegeType) query = query.eq('college_type', filters.collegeType)
      if (filters.quota)       query = query.ilike('quota', `%${filters.quota}%`)
      if (filters.state && filters.state !== 'All India') query = query.eq('state', filters.state)
      if (filters.college)     query = query.ilike('colleges.name', `%${filters.college}%`)

      const { data, error } = await query
      if (error) throw error

      // Deduplicate on the client (catches any duplicate rows from multi-round data)
      const seen = new Map<string, CutoffRow>()
      for (const r of (data || []) as unknown as CutoffRow[]) {
        if (!r.colleges) continue
        const key = `${r.colleges.name}-${r.course}-${r.category}-${r.quota}-${r.round}-${r.year}-${r.rank}`
        if (!seen.has(key)) seen.set(key, r)
      }
      setResults(Array.from(seen.values()))
    } catch (err) {
      console.error('[Cutoffs] Query error:', err)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [filters, sortField, sortAsc])

  const resetFilters = () => {
    setFilters({ ...DEFAULT_FILTERS, exam: config.exams[0] })
    setResults([])
    setSearched(false)
  }

  const toggleSort = (field: 'rank' | 'round') => {
    if (sortField === field) setSortAsc(p => !p)
    else { setSortField(field); setSortAsc(true) }
  }

  const stats = useMemo(() => {
    if (results.length === 0) return null
    const ranks = results.map(r => r.rank)
    return { bestRank: Math.min(...ranks), lastRank: Math.max(...ranks), count: results.length }
  }, [results])

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-sky-100 selection:text-sky-900">
      <Navbar />

      {/* ── HEADER ──────────────────────────────────────────────── */}
      <div className="pt-32 pb-8 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <Link href="/cutoffs" className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-sky-600 transition-all">
              <ArrowLeft size={12} strokeWidth={3} />
              College Cutoffs
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-3xl">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 ${themeColor === 'sky' ? 'bg-sky-50 text-sky-600' : 'bg-emerald-50 text-emerald-600'}`}>
                <Sparkles size={12} strokeWidth={3} />
                Live Data Repository
              </div>
              <h1 className="text-4xl sm:text-6xl font-[850] tracking-tight text-slate-900 leading-[1.1]">
                {config.label} <span className={`text-transparent bg-clip-text bg-gradient-to-r ${themeColor === 'sky' ? 'from-sky-600 to-indigo-600' : 'from-emerald-600 to-teal-600'}`}>Analytics</span>
              </h1>
            </div>

            {stats && (
              <div className="flex gap-10 items-center">
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Records</p>
                  <p className="text-3xl font-[850] text-slate-900 leading-none">{stats.count}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Top Rank</p>
                  <p className={`text-3xl font-[850] leading-none ${themeColor === 'sky' ? 'text-sky-600' : 'text-emerald-600'}`}>{stats.bestRank.toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── FILTER CONSOLE ────────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <SlidersHorizontal size={18} strokeWidth={2.5} className={themeColor === 'sky' ? 'text-sky-600' : 'text-emerald-600'} />
              <h2 className="text-sm font-black text-slate-900 tracking-widest uppercase">Filter Dashboard</h2>
            </div>
            <button onClick={resetFilters} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-red-500 transition-all underline underline-offset-4 decoration-2">Reset All</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8">
            <SelectField label="Entrance Exam"    value={filters.exam}        onChange={(v: string) => setFilter('exam', v)}        options={config.exams}          placeholder="All Exams"    theme={themeColor} />
            <SelectField label="Academic Year"    value={filters.year}        onChange={(v: string) => setFilter('year', v)}        options={dbOptions.years}       placeholder="All Years"    theme={themeColor} disabled={!filters.exam} />
            <SelectField label="Desired Course"   value={filters.course}      onChange={(v: string) => setFilter('course', v)}      options={dbOptions.courses}     placeholder="All Courses"  theme={themeColor} disabled={!filters.year} />
            <SelectField label="College Type"     value={filters.collegeType} onChange={(v: string) => setFilter('collegeType', v)} options={dbOptions.collegeTypes} placeholder="All Types"    theme={themeColor} disabled={!filters.course} />
            <SelectField label="State / Territory" value={filters.state}      onChange={(v: string) => setFilter('state', v)}       options={dbOptions.states}      placeholder="All States"   theme={themeColor} disabled={!filters.collegeType} />
            <SelectField label="Counselling Quota" value={filters.quota}       onChange={(v: string) => setFilter('quota', v)}       options={dbOptions.quotas}      placeholder="All Quotas"   theme={themeColor} disabled={!filters.state} />
            <SelectField label="Specific College" value={filters.college}     onChange={(v: string) => setFilter('college', v)}     options={dbOptions.colleges}    placeholder="All Colleges" theme={themeColor} disabled={!filters.quota} />
            <SelectField label="Your Category"    value={filters.category}    onChange={(v: string) => setFilter('category', v)}    options={dbOptions.categories}  placeholder="All Categories" theme={themeColor} disabled={!filters.college} />
            <div className="flex items-end sm:col-span-2 lg:col-span-4 mt-2">
              <button
                onClick={handleSearch}
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-[0.98] ${themeColor === 'sky' ? 'bg-slate-900 text-white hover:bg-sky-600 shadow-xl shadow-sky-600/10' : 'bg-slate-900 text-white hover:bg-emerald-600 shadow-xl shadow-emerald-600/10'} disabled:opacity-50`}
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} strokeWidth={2.5} />}
                {loading ? 'Processing...' : 'Search Cutoffs'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── RESULTS TABLE ─────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {!searched && !loading ? (
          <WelcomeHero theme={themeColor} icon={Icon} label={config.label} />
        ) : loading ? (
          <TableLoading theme={themeColor} />
        ) : results.length === 0 ? (
          <NoDataFound theme={themeColor} />
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-[850] text-slate-900 tracking-tight">Intelligence Feed</h3>
                <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest">Matched Institutional Data Profiles</p>
              </div>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:border-slate-400 transition-all shadow-sm">
                <Download size={14} /> Export CSV
              </button>
            </div>

            <div className="bg-white border border-slate-300 shadow-sm overflow-hidden text-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[13px]">
                  <thead>
                    <tr className="bg-[#f8f9fa] border-b border-slate-300">
                      <th className="px-4 py-3 text-center font-bold border-r border-slate-200 w-24 cursor-pointer group select-none hover:bg-slate-100 transition-colors" onClick={() => toggleSort('rank')}>
                        <div className="flex items-center justify-center gap-1.5">
                          {config.rankLabel} <ArrowUpDown size={12} className={sortField === 'rank' ? (themeColor === 'sky' ? 'text-sky-600' : 'text-emerald-600') : 'text-slate-300'} />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left font-bold border-r border-slate-200 min-w-[280px]">College Name & Location</th>
                      <th className="px-4 py-3 text-left font-bold border-r border-slate-200 w-40">Course</th>
                      <th className="px-4 py-3 text-left font-bold border-r border-slate-200 w-44">Category / Quota</th>
                      <th className="px-4 py-3 text-center font-bold border-r border-slate-200 w-24">Marks</th>
                      <th className="px-4 py-3 text-center font-bold border-r border-slate-200 w-24 cursor-pointer group select-none hover:bg-slate-100 transition-colors" onClick={() => toggleSort('round')}>
                        <div className="flex items-center justify-center gap-1.5">
                          Round <ArrowUpDown size={12} className={sortField === 'round' ? (themeColor === 'sky' ? 'text-sky-600' : 'text-emerald-600') : 'text-slate-300'} />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-center font-bold w-20">Year</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((row) => (
                      <tr key={row.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-5 text-center font-bold text-slate-900 border-r border-slate-200 bg-slate-50/50 tabular-nums">
                          {row.rank.toLocaleString()}
                        </td>
                        <td className="px-6 py-5 border-r border-slate-200">
                          <div className="flex flex-col gap-1">
                            <Link href={`/colleges/${row.colleges.slug}`} className="font-semibold text-slate-900 hover:text-action transition-colors leading-tight">
                              {row.colleges.name}
                            </Link>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                              <span className="flex items-center gap-1"><MapPin size={10} /> {row.colleges.location}, {row.colleges.state}</span>
                              <span className="text-slate-300">|</span>
                              <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-bold uppercase rounded">{row.college_type}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-5 border-r border-slate-200 font-medium text-slate-700">{row.course}</td>
                        <td className="px-4 py-5 border-r border-slate-200">
                          <div className="flex flex-col gap-0.5">
                            <span className={`text-[11px] font-bold uppercase tracking-wide ${themeColor === 'sky' ? 'text-sky-700' : 'text-emerald-700'}`}>{row.category}</span>
                            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{row.quota}</span>
                          </div>
                        </td>
                        <td className="px-4 py-5 border-r border-slate-200 text-center font-bold text-slate-700 bg-slate-50/30 tabular-nums">{row.marks || '—'}</td>
                        <td className="px-4 py-5 border-r border-slate-200 text-center font-medium text-slate-600">Round {row.round}</td>
                        <td className="px-4 py-5 text-center font-bold text-slate-400">{row.year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function SelectField({ label, value, onChange, options, placeholder, theme, disabled }: any) {
  return (
    <div className={`space-y-2.5 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">{label}</label>
      <div className="relative group">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full pl-5 pr-12 py-4 bg-[#F8FAFC] border border-slate-200/60 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 transition-all appearance-none cursor-pointer group-hover:border-slate-300 ${theme === 'sky' ? 'focus:ring-sky-100 focus:border-sky-300' : 'focus:ring-emerald-100 focus:border-emerald-300'}`}
        >
          <option value="">{placeholder}</option>
          {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
        </select>
        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300 group-hover:text-slate-400 transition-colors">
          <ChevronRight size={14} strokeWidth={3} className="rotate-90" />
        </div>
      </div>
    </div>
  )
}

function WelcomeHero({ theme, icon: Icon, label }: any) {
  return (
    <div className="text-center py-32 bg-white rounded-[4rem] border border-slate-200 shadow-2xl shadow-slate-200/10">
      <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl ${theme === 'sky' ? 'bg-sky-50 text-sky-600 shadow-sky-600/10' : 'bg-emerald-50 text-emerald-600 shadow-emerald-600/10'}`}>
        <Icon size={48} strokeWidth={1.5} />
      </div>
      <h2 className="text-4xl font-[850] text-slate-900 tracking-tight mb-4">Start Your Exploration</h2>
      <p className="text-xl text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
        Configure your {label.toLowerCase()} profile in the console above to see detailed opening and closing ranks.
      </p>
    </div>
  )
}

function TableLoading({ theme }: any) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Loader2 size={32} className={`animate-spin ${theme === 'sky' ? 'text-sky-600' : 'text-emerald-600'}`} />
        <h3 className="text-xl font-[850] text-slate-900 tracking-tight">Accessing Database...</h3>
      </div>
      <div className="bg-white border border-slate-200 rounded-[2rem] h-[500px] animate-pulse" />
    </div>
  )
}

function NoDataFound({ theme }: any) {
  return (
    <div className="text-center py-32 bg-white rounded-[4rem] border border-slate-200">
      <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-8 text-amber-500">
        <AlertCircle size={40} strokeWidth={2} />
      </div>
      <h3 className="text-3xl font-[850] text-slate-900 tracking-tight mb-4">No Matching Profiles</h3>
      <p className="text-lg text-slate-500 font-medium max-w-sm mx-auto leading-relaxed mb-10">
        We couldn't find records matching this combination. Try broadening your filters or checking a different year.
      </p>
      <button onClick={() => window.location.reload()} className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20">
        Refresh Dashboard
      </button>
    </div>
  )
}