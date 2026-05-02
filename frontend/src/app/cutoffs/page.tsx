'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Code2, Stethoscope, ChevronRight, Clock, BookOpen, TrendingUp, AlertCircle, Search, Filter } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type Stream = 'engineering' | 'medical'

const STREAMS = [
  {
    id: 'engineering' as Stream,
    label: 'Engineering',
    icon: Code2,
    badge: 'JEE Main · JEE Advanced · BITSAT',
    description: 'Cutoffs for IITs, NITs, IIITs and top private engineering colleges based on JEE Main, JEE Advanced, and state-level entrance exams.',
    color: 'sky',
    exams: ['JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE', 'MHT CET'],
  },
  {
    id: 'medical' as Stream,
    label: 'Medical',
    icon: Stethoscope,
    badge: 'NEET UG · NEET PG · INI CET',
    description: 'Cutoffs for AIIMS, government medical colleges, deemed universities and private MBBS/BDS seats based on NEET UG and PG scores.',
    color: 'sky',
    exams: ['NEET UG', 'NEET PG', 'INI CET', 'AIIMS Entrance', 'JIPMER'],
  },
]

export default function CutoffsPage() {
  const [activeStream, setActiveStream] = useState<Stream>('engineering')

  const active = STREAMS.find(s => s.id === activeStream)!

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 border-b border-slate-100 bg-gradient-to-br from-sky-50 via-white to-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 sm:mb-8">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-sky-600">Cutoffs</span>
          </div>

          {/* Heading */}
          <div className="max-w-3xl mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-100 text-sky-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
              <TrendingUp size={12} />
              Yearly Cutoff Data
            </div>
            <h1
              className="font-black text-slate-900 tracking-tight leading-[1.1] mb-4"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              College Cutoffs{' '}
              <span className="text-sky-600">Year-wise</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
              Previous year cutoff ranks and scores for top colleges across Engineering and Medical streams. Use this to shortlist colleges based on your rank.
            </p>
          </div>

          {/* Stream Selector Tabs */}
          <div className="flex gap-3 sm:gap-4 flex-wrap">
            {STREAMS.map(stream => {
              const Icon = stream.icon
              const isActive = activeStream === stream.id
              return (
                <Link
                  key={stream.id}
                  href={`/cutoffs/${stream.id}`}
                  onClick={() => setActiveStream(stream.id)}
                  className={`flex items-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl font-black text-sm transition-all border-2 ${
                    isActive
                      ? 'bg-sky-600 text-white border-sky-600 shadow-lg shadow-sky-600/20'
                      : 'bg-white text-slate-600 border-slate-100 hover:border-sky-200 hover:text-sky-600'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-white' : 'text-sky-500'} />
                  {stream.label}
                  <ChevronRight size={14} className={isActive ? 'text-white/70' : 'text-slate-300'} />
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── STREAM INFO BANNER ────────────────────────────────── */}
      <section className="bg-white border-b border-slate-100 py-6 sm:py-8">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-sky-600 mb-1">
                {active.label} Cutoffs
              </p>
              <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">
                {active.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {active.exams.map(exam => (
                <span
                  key={exam}
                  className="px-3 py-1.5 bg-sky-50 text-sky-700 rounded-xl text-xs font-black border border-sky-100"
                >
                  {exam}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTENT AREA ──────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {activeStream === 'engineering' && (
            <EngineeringContent />
          )}

          {activeStream === 'medical' && (
            <MedicalContent />
          )}

        </div>
      </section>

      <Footer />
    </div>
  )
}

// ── Engineering Content ────────────────────────────────────────────────────────
function EngineeringContent() {
  return (
    <ComingSoon
      stream="Engineering"
      icon={Code2}
      description="JEE Main, JEE Advanced, BITSAT and state exam cutoffs for IITs, NITs, IIITs and top private colleges will be available here."
      bullets={[
        'JEE Main 2026 — IIT & NIT opening/closing ranks by category',
        'JEE Advanced 2026 — IIT cutoffs by branch and category',
        'BITSAT 2026 — BITS Pilani, Hyderabad & Goa cutoffs',
        'State CETs — MHT CET, AP EAMCET, KCET and more',
      ]}
    />
  )
}

// ── Medical Content ────────────────────────────────────────────────────────────
function MedicalContent() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    year: '',
    state: '',
    college: '',
    category: '',
    quota: '',
  })

  // Options for filters (you could also fetch these dynamically)
  const YEARS = [2025, 2024, 2023]
  const STATES = ['West Bengal', 'Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh']
  const CATEGORIES = ['Open', 'OBC', 'SC', 'ST', 'EWS']
  const QUOTAS = ['State', 'All India']

  useEffect(() => {
    async function fetchCutoffs() {
      setLoading(true)
      let query = supabase
        .from('cutoffs')
        .select(`
          *,
          colleges!inner(name),
          exams!inner(name)
        `)
        .eq('exams.name', 'NEET')

      if (filters.year) query = query.eq('year', filters.year)
      if (filters.state) query = query.ilike('state', `%${filters.state}%`)
      if (filters.category) query = query.eq('category', filters.category)
      if (filters.quota) query = query.eq('quota', filters.quota)
      if (filters.college) query = query.ilike('colleges.name', `%${filters.college}%`)

      query = query.order('year', { ascending: false }).order('rank', { ascending: true }).limit(200)

      const { data: cutoffsData, error } = await query
      if (error) {
        console.error('Error fetching cutoffs:', error)
      } else {
        setData(cutoffsData || [])
      }
      setLoading(false)
    }

    fetchCutoffs()
  }, [filters])

  return (
    <div className="space-y-8">
      {/* Filters Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Filter size={20} className="text-sky-600" />
          <h3 className="text-lg font-black text-slate-900 tracking-tight">Filter Medical Cutoffs</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search College Name..."
              value={filters.college}
              onChange={e => setFilters(prev => ({ ...prev, college: e.target.value }))}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
            />
          </div>

          <select
            value={filters.year}
            onChange={e => setFilters(prev => ({ ...prev, year: e.target.value }))}
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
          >
            <option value="">All Years</option>
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </select>

          <select
            value={filters.state}
            onChange={e => setFilters(prev => ({ ...prev, state: e.target.value }))}
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
          >
            <option value="">All States</option>
            {STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select
            value={filters.category}
            onChange={e => setFilters(prev => ({ ...prev, category: e.target.value }))}
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">College</th>
                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Quota / Cat</th>
                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">State</th>
                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider text-right">Round</th>
                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider text-right">Rank</th>
                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider text-right">Year</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-sky-600 border-t-transparent rounded-full animate-spin" />
                      Loading cutoffs...
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    No cutoffs found matching your criteria.
                  </td>
                </tr>
              ) : (
                data.map((row) => (
                  <tr key={row.id} className="hover:bg-sky-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 text-sm max-w-md truncate" title={row.colleges?.name}>
                        {row.colleges?.name}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{row.college_type}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                        {row.course}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      <div>{row.quota}</div>
                      <div className="text-xs text-slate-400 font-medium">{row.category}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{row.state}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 text-right">Round {row.round}</td>
                    <td className="px-6 py-4 text-sm font-black text-slate-900 text-right">
                      {row.rank.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 text-right">{row.year}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ── Coming Soon Placeholder ────────────────────────────────────────────────────
function ComingSoon({
  stream,
  icon: Icon,
  description,
  bullets,
}: {
  stream: string
  icon: any
  description: string
  bullets: string[]
}) {
  return (
    <div className="max-w-3xl mx-auto text-center">
      {/* Icon */}
      <div className="w-20 h-20 bg-sky-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-sky-100">
        <Icon size={36} className="text-sky-500" />
      </div>

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-amber-100">
        <Clock size={12} />
        Coming Soon
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 tracking-tight">
        {stream} Cutoffs
      </h2>
      <p className="text-slate-500 text-base sm:text-lg leading-relaxed mb-10">
        {description}
      </p>

      {/* Preview bullets */}
      <div className="bg-sky-50 border border-sky-100 rounded-3xl p-8 text-left mb-10">
        <div className="flex items-center gap-2 mb-5">
          <AlertCircle size={14} className="text-sky-600" />
          <p className="text-xs font-black uppercase tracking-widest text-sky-600">
            What's coming
          </p>
        </div>
        <ul className="space-y-3">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
              <span className="w-5 h-5 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/counseling"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-sky-600 text-white rounded-2xl font-black text-sm hover:bg-sky-700 transition-all"
        >
          <BookOpen size={16} />
          Get Expert Guidance
        </Link>
        <Link
          href="/colleges"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-slate-700 rounded-2xl font-black text-sm border border-slate-200 hover:border-sky-300 hover:text-sky-600 transition-all"
        >
          Browse Colleges
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  )
}
