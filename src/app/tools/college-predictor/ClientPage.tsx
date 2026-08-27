'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import {
  Search, MapPin, SlidersHorizontal, ArrowUpDown, AlertCircle, Loader2,
  TrendingUp, Building2, Landmark, ChevronRight, ChevronDown, CheckCircle2,
  GraduationCap, Phone, Mail, User, Sparkles, Calendar, ArrowLeft, Heart, Info, DollarSign
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

// Predefined lists for inputs
const COURSES = ['MBBS', 'BDS']
const CATEGORIES = ['Open', 'OBC', 'SC', 'ST', 'EWS']
const QUOTAS = ['All India quota', 'State Quota']
const STATES = [
  'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 
  'Chandigarh', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 
  'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 
  'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
  'Uttarakhand', 'West Bengal'
]

interface CutoffRow {
  rank: number
  marks: number | null
  course: string
  category: string
  quota: string
  state: string
  year: number
  round: number
  college_id: string
  college_type: string
  colleges: {
    id: string
    name: string
    short_name: string | null
    location: string
    state: string
    type: string | null
    total_fee: string | null
    nirf_rank: number | null
    avg_package: number | null
    highest_package: number | null
    established: number | null
  } | null
}

interface MatchResult {
  collegeId: string
  name: string
  shortName: string
  location: string
  state: string
  type: string
  totalFee: string
  nirfRank: number | null
  established: number | null
  latestCutoffRank: number
  latestCutoffMarks: number | null
  latestYear: number
  latestRound: number
  chance: 'safe' | 'target' | 'reach'
  trendData: { year: number; rank: number }[]
}

export default function ClientPage() {
  const [isMounted, setIsMounted] = useState(false)

  // Step state: 0 for Lead Gate, 1 for Prediction Intake, 2 for Results
  const [step, setStep] = useState(0)

  // Step 0 Form State (Lead Collection)
  const [leadName, setLeadName] = useState('')
  const [leadEmail, setLeadEmail] = useState('')
  const [leadPhone, setLeadPhone] = useState('')
  const [isSubmittingLead, setIsSubmittingLead] = useState(false)
  const [leadError, setLeadError] = useState('')

  // Step 1 Form State (Academic Details)
  const [rank, setRank] = useState('')
  const [marks, setMarks] = useState('')
  const [course, setCourse] = useState('MBBS')
  const [category, setCategory] = useState('Open')
  const [quota, setQuota] = useState('All India quota')
  const [domicile, setDomicile] = useState('West Bengal')
  const [isProcessing, setIsProcessing] = useState(false)
  const [academicError, setAcademicError] = useState('')

  // Raw Database Results
  const [allCutoffs, setAllCutoffs] = useState<CutoffRow[]>([])
  
  // Computed Predictions
  const [predictions, setPredictions] = useState<MatchResult[]>([])
  
  // Expanded College ID for Detail View (Trend graph)
  const [expandedCollegeId, setExpandedCollegeId] = useState<string | null>(null)

  // Dashboard Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [filterState, setFilterState] = useState('All')
  const [filterType, setFilterType] = useState('All')
  const [filterChance, setFilterChance] = useState<'All' | 'safe' | 'target' | 'reach'>('All')
  const [showFilters, setShowFilters] = useState(false)

  // Domicile input visibility rule
  const showDomicileSelect = quota === 'State Quota'

  useEffect(() => {
    setIsMounted(true)
    const hasCaptured = typeof window !== 'undefined' && sessionStorage.getItem('predictor_lead_captured') === 'true'
    if (hasCaptured) {
      setStep(1)
    }
  }, [])

  // Handle lead capture submission
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLeadError('')

    if (!leadName.trim()) {
      setLeadError('Please enter your full name')
      return
    }
    if (!leadEmail.trim() || !/\S+@\S+\.\S+/.test(leadEmail)) {
      setLeadError('Please enter a valid email address')
      return
    }
    if (!leadPhone.trim() || leadPhone.length < 10) {
      setLeadError('Please enter a valid 10-digit phone number')
      return
    }

    setIsSubmittingLead(true)
    try {
      // 1. Check if a lead with same email or phone already exists
      const { data: existingLeads, error: checkError } = await supabase
        .from('leads')
        .select('id')
        .or(`email.eq.${leadEmail.trim()},phone.eq.${leadPhone.trim()}`)
        .limit(1)

      if (!checkError && existingLeads && existingLeads.length > 0) {
        console.log('Matching lead already exists. Bypassing insertion.')
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('predictor_lead_captured', 'true')
        }
        setStep(1)
        return
      }

      // 2. Save new lead if it does not exist, with a 1.5-second timeout fallback
      const insertPromise = supabase.from('leads').insert({
        full_name: leadName.trim(),
        email: leadEmail.trim(),
        phone: leadPhone.trim(),
        stream: 'Medical',
        source: 'college_predictor',
        status: 'new'
      })

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), 1500)
      )

      await Promise.race([insertPromise, timeoutPromise])
        .then((res: any) => {
          if (res && res.error) {
            console.warn('Lead insertion error:', res.error.message)
          } else {
            console.log('Lead saved successfully')
          }
        })
        .catch(err => {
          console.warn('Lead saving bypassed due to:', err.message)
        })

      if (typeof window !== 'undefined') {
        sessionStorage.setItem('predictor_lead_captured', 'true')
      }
      // Always proceed to step 1 (predictor form) so user is not blocked
      setStep(1)
    } catch (err: any) {
      console.warn('Lead submission bypassed:', err.message)
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('predictor_lead_captured', 'true')
      }
      setStep(1)
    } finally {
      setIsSubmittingLead(false)
    }
  }

  // Handle college prediction calculation
  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault()
    setAcademicError('')

    const parsedRank = parseInt(rank)
    if (isNaN(parsedRank) || parsedRank <= 0) {
      setAcademicError('Please enter a valid NEET Rank')
      return
    }

    setIsProcessing(true)
    try {
      // 1. Fetch historical cutoff data matching course and category
      const { data, error } = await supabase
        .from('cutoffs')
        .select(`
          rank,
          marks,
          course,
          category,
          quota,
          state,
          year,
          round,
          college_id,
          college_type,
          colleges (
            id,
            name,
            short_name,
            location,
            state,
            type,
            total_fee,
            nirf_rank,
            avg_package,
            highest_package,
            established
          )
        `)
        .eq('course', course)
        .eq('category', category)

      if (error) throw error

      if (!data || data.length === 0) {
        setAcademicError('No historical cutoff data found for the selected Course and Category.')
        setIsProcessing(false)
        return
      }

      const rows = data as unknown as CutoffRow[]
      setAllCutoffs(rows)

      // 2. Perform Prediction Match Analysis
      // Group rows by college ID to analyze latest cutoffs and historical trends
      const collegeGroups: Record<string, CutoffRow[]> = {}
      rows.forEach(row => {
        if (!row.college_id || !row.colleges) return

        // Apply Quota filter logic:
        // - For All India Quota, match only AIQ rows
        // - For State Quota, match State rows for the student's domicile state
        const rowQuotaLower = (row.quota || '').toLowerCase()
        const isAIQMatch = quota === 'All India quota' && (rowQuotaLower.includes('all india') || rowQuotaLower.includes('open seat'))
        const isStateMatch = quota === 'State Quota' && rowQuotaLower.includes('state') && row.state.toLowerCase() === domicile.toLowerCase()

        if (isAIQMatch || isStateMatch) {
          if (!collegeGroups[row.college_id]) {
            collegeGroups[row.college_id] = []
          }
          collegeGroups[row.college_id].push(row)
        }
      })

      const computedResults: MatchResult[] = []

      Object.entries(collegeGroups).forEach(([collegeId, records]) => {
        // Find latest cutoff details (highest year and round)
        const sortedRecords = [...records].sort((a, b) => {
          if (b.year !== a.year) return b.year - a.year
          return b.round - a.round
        })

        const latest = sortedRecords[0]
        const college = latest.colleges!

        // Probability chances
        // Safe: closing rank is 1.15 times user rank or more (e.g. closing is 15000, user is 12000)
        // Target: closing rank is close (within +/- 15% range)
        // Reach: closing rank is up to 30% lower (closing rank is 8400, user is 12000, stretch target)
        let chance: 'safe' | 'target' | 'reach' = 'target'
        if (latest.rank >= parsedRank * 1.15) {
          chance = 'safe'
        } else if (latest.rank >= parsedRank * 0.85) {
          chance = 'target'
        } else if (latest.rank >= parsedRank * 0.70) {
          chance = 'reach'
        } else {
          // If rank is much worse than closing cutoff rank, skip college (not matched)
          return
        }

        // Build historical trend data for line charts (average rank per year for that category/course/quota)
        const yearlyTrends: Record<number, number[]> = {}
        records.forEach(r => {
          if (!yearlyTrends[r.year]) yearlyTrends[r.year] = []
          yearlyTrends[r.year].push(r.rank)
        })

        const trendData = Object.entries(yearlyTrends).map(([yearStr, ranks]) => {
          // Use median or min rank as standard representation
          const avgRank = Math.round(ranks.reduce((sum, val) => sum + val, 0) / ranks.length)
          return {
            year: parseInt(yearStr),
            rank: avgRank
          }
        }).sort((a, b) => a.year - b.year)

        computedResults.push({
          collegeId,
          name: college.name,
          shortName: college.short_name || college.name.split(',')[0],
          location: college.location,
          state: college.state,
          type: latest.college_type || college.type || 'Govt.',
          totalFee: college.total_fee || 'N/A',
          nirfRank: college.nirf_rank,
          established: college.established,
          latestCutoffRank: latest.rank,
          latestCutoffMarks: latest.marks,
          latestYear: latest.year,
          latestRound: latest.round,
          chance,
          trendData
        })
      })

      // Sort matches: Safe first, then Target, then Reach (best rank requirements first)
      computedResults.sort((a, b) => {
        const order = { safe: 1, target: 2, reach: 3 }
        if (order[a.chance] !== order[b.chance]) {
          return order[a.chance] - order[b.chance]
        }
        return a.latestCutoffRank - b.latestCutoffRank
      })

      setPredictions(computedResults)
      setStep(2)
    } catch (err: any) {
      console.error('Prediction query failed:', err.message)
      setAcademicError('Failed to fetch prediction details. Please verify your connection.')
    } finally {
      setIsProcessing(false)
    }
  }

  // Filtered results memo
  const filteredPredictions = useMemo(() => {
    return predictions.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchState = filterState === 'All' || item.state.toLowerCase() === filterState.toLowerCase()
      
      let matchType = filterType === 'All'
      if (!matchType) {
        const itemTypeLower = (item.type || '').toLowerCase()
        const filterTypeLower = filterType.toLowerCase()

        if (filterTypeLower.startsWith('govt') && (itemTypeLower.startsWith('govt') || itemTypeLower.startsWith('central'))) {
          matchType = true
        } else if (filterTypeLower.startsWith('private') && itemTypeLower.startsWith('private')) {
          matchType = true
        } else if (filterTypeLower.startsWith('deemed') && itemTypeLower.startsWith('deemed')) {
          matchType = true
        }
      }

      const matchChance = filterChance === 'All' || item.chance === filterChance

      return matchSearch && matchState && matchType && matchChance
    })
  }, [predictions, searchQuery, filterState, filterType, filterChance])

  // Aggregate counts
  const counts = useMemo(() => {
    return {
      total: predictions.length,
      safe: predictions.filter(p => p.chance === 'safe').length,
      target: predictions.filter(p => p.chance === 'target').length,
      reach: predictions.filter(p => p.chance === 'reach').length
    }
  }, [predictions])

  // Get distinct states from predictions to populate filters
  const predictionStates = useMemo(() => {
    const states = predictions.map(p => p.state)
    return Array.from(new Set(states)).sort()
  }, [predictions])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      {/* ── HERO BANNER ────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-50 rounded-full blur-[100px] opacity-40 translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-50 rounded-full blur-[80px] opacity-30 -translate-x-1/4 translate-y-1/4" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-[900] tracking-tight text-slate-900 leading-none mb-4">
            NEET Medical College <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Predictor</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-500 font-medium md:text-lg">
            Find MBBS and BDS seat allotment options instantly based on 3-year historical cutoffs, domicile quotas, and categories.
          </p>
        </div>
      </section>

      {/* ── MULTI-STEP WIZARD CONTAINER ────────────────────────── */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {/* STEP 0: Lead Gate Form */}
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-md mx-auto"
            >
              <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-xl shadow-slate-100/50">
                <div className="text-center mb-8">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <GraduationCap size={28} />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Unlock College Predictor</h2>
                  <p className="text-slate-500 text-sm mt-1">Enter your details to generate your personalized college report.</p>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="lead-name" className="block text-xs font-black uppercase text-slate-400 tracking-wider mb-2">Full Name</label>
                    <div className="relative">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        id="lead-name"
                        type="text"
                        placeholder="John Doe"
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white text-slate-900 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-semibold transition-all duration-200 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="lead-email" className="block text-xs font-black uppercase text-slate-400 tracking-wider mb-2">Email Address</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        id="lead-email"
                        type="email"
                        placeholder="john@example.com"
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white text-slate-900 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-semibold transition-all duration-200 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="lead-phone" className="block text-xs font-black uppercase text-slate-400 tracking-wider mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        id="lead-phone"
                        type="tel"
                        placeholder="9876543210"
                        maxLength={10}
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white text-slate-900 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-semibold transition-all duration-200 outline-none"
                      />
                    </div>
                  </div>

                  {leadError && (
                    <div className="flex items-center gap-2.5 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-700 text-xs font-bold">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{leadError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmittingLead}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-emerald-600/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmittingLead ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <>
                        Get Started
                        <ChevronRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* STEP 1: Academic & Preferences intake */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-xl mx-auto"
            >
              <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-xl shadow-slate-100/50">
                <div className="flex items-center gap-3 mb-6">
                  <button 
                    onClick={() => setStep(0)} 
                    className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Academic Details</h2>
                    <p className="text-slate-500 text-xs mt-0.5">Please fill your NEET score profile details below.</p>
                  </div>
                </div>

                <form onSubmit={handlePredict} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="rank" className="block text-xs font-black uppercase text-slate-400 tracking-wider mb-2">NEET Rank (AIR)</label>
                      <input
                        id="rank"
                        type="number"
                        placeholder="e.g. 12450"
                        value={rank}
                        onChange={(e) => setRank(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white text-slate-900 rounded-2xl py-3.5 px-4 text-sm font-semibold transition-all duration-200 outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="marks" className="block text-xs font-black uppercase text-slate-400 tracking-wider mb-2">NEET Marks (Optional)</label>
                      <input
                        id="marks"
                        type="number"
                        placeholder="e.g. 620"
                        value={marks}
                        onChange={(e) => setMarks(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white text-slate-900 rounded-2xl py-3.5 px-4 text-sm font-semibold transition-all duration-200 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="course" className="block text-xs font-black uppercase text-slate-400 tracking-wider mb-2">Course Preference</label>
                      <select
                        id="course"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white text-slate-900 rounded-2xl py-3.5 px-4 text-sm font-bold transition-all duration-200 outline-none cursor-pointer"
                      >
                        {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="category" className="block text-xs font-black uppercase text-slate-400 tracking-wider mb-2">Category</label>
                      <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white text-slate-900 rounded-2xl py-3.5 px-4 text-sm font-bold transition-all duration-200 outline-none cursor-pointer"
                      >
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="quota" className="block text-xs font-black uppercase text-slate-400 tracking-wider mb-2">Seat Quota</label>
                      <select
                        id="quota"
                        value={quota}
                        onChange={(e) => setQuota(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white text-slate-900 rounded-2xl py-3.5 px-4 text-sm font-bold transition-all duration-200 outline-none cursor-pointer"
                      >
                        {QUOTAS.map(q => <option key={q} value={q}>{q}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="domicile" className="block text-xs font-black uppercase text-slate-400 tracking-wider mb-2">
                        {showDomicileSelect ? 'Domicile / Home State' : 'State Preference'}
                      </label>
                      <select
                        id="domicile"
                        value={domicile}
                        onChange={(e) => setDomicile(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white text-slate-900 rounded-2xl py-3.5 px-4 text-sm font-bold transition-all duration-200 outline-none cursor-pointer"
                      >
                        {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  {academicError && (
                    <div className="flex items-center gap-2.5 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-700 text-xs font-bold">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{academicError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-emerald-600/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <>
                        Predict My Colleges
                        <TrendingUp size={18} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Dashboard Results */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* TOP HEADER CONTROLS */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-tight">Predictions Generated</h3>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">NEET Rank: {rank} • {category} • {quota}</p>
                  </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                  <button
                    onClick={() => { setStep(1); setPredictions([]) }}
                    className="flex-1 md:flex-none border border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-semibold py-3 px-6 rounded-2xl transition-all duration-150 flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    <ArrowLeft size={16} />
                    Change Rank
                  </button>
                  <button
                    onClick={() => { 
                      const hasCaptured = typeof window !== 'undefined' && sessionStorage.getItem('predictor_lead_captured') === 'true'
                      setStep(hasCaptured ? 1 : 0)
                      setLeadName('')
                      setLeadEmail('')
                      setLeadPhone('')
                      setRank('')
                      setMarks('')
                      setPredictions([]) 
                    }}
                    className="flex-1 md:flex-none bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-150 flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    Reset Form
                  </button>
                </div>
              </div>

              {/* CHANCE CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                <div 
                  onClick={() => setFilterChance('All')}
                  className={`bg-white border p-6 rounded-3xl text-center shadow-sm cursor-pointer transition-all active:scale-[0.97] hover:shadow-md select-none ${
                    filterChance === 'All' ? 'border-slate-400 bg-slate-50/40 ring-1 ring-slate-400/20 shadow-md' : 'border-slate-100'
                  }`}
                >
                  <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Matched</h4>
                  <p className="text-4xl font-[900] text-slate-800">{counts.total}</p>
                  <span className="text-[10px] font-bold text-slate-400">colleges match profile</span>
                </div>
                <div 
                  onClick={() => setFilterChance(filterChance === 'safe' ? 'All' : 'safe')}
                  className={`bg-white border p-6 rounded-3xl text-center shadow-sm border-l-4 border-l-emerald-500 cursor-pointer transition-all active:scale-[0.97] hover:shadow-md select-none ${
                    filterChance === 'safe' ? 'border-emerald-300 bg-emerald-50/20 ring-1 ring-emerald-500/10 shadow-md' : 'border-slate-100'
                  }`}
                >
                  <h4 className="text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-1">Safe Option</h4>
                  <p className="text-4xl font-[900] text-emerald-600">{counts.safe}</p>
                  <span className="text-[10px] font-bold text-slate-400">High probability (&gt;85% chance)</span>
                </div>
                <div 
                  onClick={() => setFilterChance(filterChance === 'target' ? 'All' : 'target')}
                  className={`bg-white border p-6 rounded-3xl text-center shadow-sm border-l-4 border-l-sky-500 cursor-pointer transition-all active:scale-[0.97] hover:shadow-md select-none ${
                    filterChance === 'target' ? 'border-sky-300 bg-sky-50/20 ring-1 ring-sky-500/10 shadow-md' : 'border-slate-100'
                  }`}
                >
                  <h4 className="text-sky-600 text-[10px] font-black uppercase tracking-widest mb-1">Target Option</h4>
                  <p className="text-4xl font-[900] text-sky-600">{counts.target}</p>
                  <span className="text-[10px] font-bold text-slate-400">Moderate probability (50-85% chance)</span>
                </div>
                <div 
                  onClick={() => setFilterChance(filterChance === 'reach' ? 'All' : 'reach')}
                  className={`bg-white border p-6 rounded-3xl text-center shadow-sm border-l-4 border-l-amber-500 cursor-pointer transition-all active:scale-[0.97] hover:shadow-md select-none ${
                    filterChance === 'reach' ? 'border-amber-300 bg-amber-50/20 ring-1 ring-amber-500/10 shadow-md' : 'border-slate-100'
                  }`}
                >
                  <h4 className="text-amber-600 text-[10px] font-black uppercase tracking-widest mb-1">Reach / Stretch</h4>
                  <p className="text-4xl font-[900] text-amber-600">{counts.reach}</p>
                  <span className="text-[10px] font-bold text-slate-400">Low probability (Borderline chance)</span>
                </div>
              </div>

              {/* RESULTS GRID WITH FILTERS */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* SIDEBAR FILTERS (Col 1) */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                      <h4 className="font-black text-sm tracking-wide text-slate-900 uppercase">Filters</h4>
                      <SlidersHorizontal size={16} className="text-slate-400" />
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label htmlFor="search-col" className="block text-xs font-bold text-slate-400 mb-2 uppercase">Search College</label>
                        <div className="relative">
                          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            id="search-col"
                            type="text"
                            placeholder="Type college name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white text-slate-900 rounded-xl py-2.5 pl-10 pr-3 text-xs font-semibold outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="state-fil" className="block text-xs font-bold text-slate-400 mb-2 uppercase">Filter by State</label>
                        <select
                          id="state-fil"
                          value={filterState}
                          onChange={(e) => setFilterState(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl py-2.5 px-3 text-xs font-bold outline-none cursor-pointer"
                        >
                          <option value="All">All States</option>
                          {predictionStates.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="type-fil" className="block text-xs font-bold text-slate-400 mb-2 uppercase">College Type</label>
                        <select
                          id="type-fil"
                          value={filterType}
                          onChange={(e) => setFilterType(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl py-2.5 px-3 text-xs font-bold outline-none cursor-pointer"
                        >
                          <option value="All">All Types</option>
                          <option value="Govt.">Government Only</option>
                          <option value="Private">Private Only</option>
                          <option value="Deemed">Deemed Only</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* HIGH ROI CALL TO ACTION */}
                  <div className="bg-gradient-to-br from-emerald-600 to-teal-800 text-white rounded-[2rem] p-6 shadow-lg shadow-emerald-800/10 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-white/5 rounded-full blur-[40px] pointer-events-none" />
                    <GraduationCap size={44} className="mx-auto mb-4 text-emerald-200" />
                    <h4 className="text-lg font-black tracking-tight mb-2">Need Expert Help?</h4>
                    <p className="text-xs text-emerald-100 leading-relaxed mb-6 font-medium">
                      Get direct choice-filling planning and ROI matching support from our medical admission experts.
                    </p>
                    <a
                      href="/admission-support"
                      className="block bg-white text-emerald-700 hover:bg-emerald-50 active:scale-[0.98] font-bold py-3 rounded-2xl transition-all duration-150 text-xs shadow-lg shadow-slate-950/10 cursor-pointer"
                    >
                      Book Counseling Consultation
                    </a>
                  </div>
                </div>

                {/* COLLEGES LIST (Col 2-4) */}
                <div className="lg:col-span-3 space-y-5">
                  {filteredPredictions.length === 0 ? (
                    <div className="bg-white border border-slate-100 rounded-3xl p-16 text-center shadow-sm">
                      <AlertCircle size={44} className="mx-auto mb-4 text-slate-300" />
                      <h4 className="text-lg font-bold text-slate-800">No matching colleges found</h4>
                      <p className="text-slate-400 text-xs max-w-sm mx-auto mt-2 leading-relaxed">
                        Try resetting filters or checking All India quota for broader matches.
                      </p>
                    </div>
                  ) : (
                    filteredPredictions.map((item) => {
                      const isExpanded = expandedCollegeId === item.collegeId
                      const chanceColors = {
                        safe: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100', dot: 'bg-emerald-500' },
                        target: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-100', dot: 'bg-sky-500' },
                        reach: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100', dot: 'bg-amber-500' }
                      }
                      const activeColor = chanceColors[item.chance]

                      return (
                        <div
                          key={item.collegeId}
                          className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                          <div
                            onClick={() => setExpandedCollegeId(isExpanded ? null : item.collegeId)}
                            className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 cursor-pointer hover:bg-slate-50/50 transition-colors"
                          >
                            <div className="space-y-2.5 max-w-xl">
                              <div className="flex flex-wrap gap-2.5 items-center">
                                <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${activeColor.bg} ${activeColor.text} border ${activeColor.border}`}>
                                  {item.chance} chance
                                </span>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full">
                                  {item.type}
                                </span>
                                {item.nirfRank && (
                                  <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                                    NIRF #{item.nirfRank}
                                  </span>
                                )}
                              </div>
                              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">{item.name}</h3>
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-500">
                                <span className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-400" /> {item.location}, {item.state}</span>
                                {item.established && <span className="flex items-center gap-1.5"><Building2 size={14} className="text-slate-400" /> Estd. {item.established}</span>}
                              </div>
                            </div>

                            <div className="flex sm:flex-col items-start sm:items-end justify-between w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                              <div>
                                <span className="block text-[10px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Closing Cutoff Rank</span>
                                <span className="text-lg font-black text-slate-800">{item.latestCutoffRank.toLocaleString()}</span>
                              </div>
                              <div className="text-right flex items-center gap-1.5 text-xs text-emerald-600 font-bold sm:mt-2">
                                <span className="hidden sm:inline">Historical Trends</span>
                                <ChevronDown size={18} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                              </div>
                            </div>
                          </div>

                          {/* EXPANDED CONTENT: TREND GRAPH & DETAILS */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                exit={{ height: 0 }}
                                className="overflow-hidden bg-slate-50/50 border-t border-slate-100"
                              >
                                <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                  {/* Line graph of cutoffs */}
                                  <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                      <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-1.5">
                                        <TrendingUp size={14} className="text-emerald-600" /> 
                                        Closing Cutoff Trends
                                      </h4>
                                      <span className="text-[10px] font-bold text-slate-400">Lower is better</span>
                                    </div>

                                    <div className="h-56 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                                      {isMounted ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                          <LineChart data={item.trendData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                            <XAxis dataKey="year" stroke="#94A3B8" fontSize={11} fontWeight="bold" tickLine={false} axisLine={false} />
                                            <YAxis reversed stroke="#94A3B8" fontSize={11} fontWeight="bold" tickLine={false} axisLine={false} width={45} />
                                            <Tooltip
                                              contentStyle={{ background: '#0F172A', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                                              labelStyle={{ fontWeight: 'black', color: '#10B981', marginBottom: '4px' }}
                                            />
                                            <Line
                                              type="monotone"
                                              dataKey="rank"
                                              stroke="#10B981"
                                              strokeWidth={3}
                                              dot={{ r: 6, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }}
                                              activeDot={{ r: 8 }}
                                            />
                                          </LineChart>
                                        </ResponsiveContainer>
                                      ) : (
                                        <div className="h-full flex items-center justify-center text-slate-400 text-xs">Loading chart...</div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Quick facts & Stats */}
                                  <div className="space-y-5">
                                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-1.5">
                                      <Info size={14} className="text-emerald-600" /> 
                                      College Facts
                                    </h4>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
                                        <span className="block text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1 flex items-center gap-1"><DollarSign size={10} /> Total Fee</span>
                                        <span className="text-sm font-bold text-slate-700">{item.totalFee}</span>
                                      </div>
                                      <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
                                        <span className="block text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1 flex items-center gap-1"><Calendar size={10} /> Round Match</span>
                                        <span className="text-sm font-bold text-slate-700">Round {item.latestRound} ({item.latestYear})</span>
                                      </div>
                                    </div>

                                    <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-2xl p-5 space-y-3">
                                      <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                                        Your NEET AIR rank of <strong className="font-extrabold text-slate-900">{parseInt(rank).toLocaleString()}</strong> makes you a <strong className="font-extrabold text-slate-900">{item.chance.toUpperCase()}</strong> fit for {item.shortName}.
                                      </p>
                                      <a
                                        href="/admission-support"
                                        className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-bold hover:underline cursor-pointer"
                                      >
                                        Lock Seat Booking Support
                                        <ChevronRight size={14} />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}
