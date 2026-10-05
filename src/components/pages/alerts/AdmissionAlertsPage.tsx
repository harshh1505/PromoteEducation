'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Bell,
  Calendar,
  Clock,
  ExternalLink,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Share2,
  Sparkles,
  Filter,
  GraduationCap,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  HelpCircle,
  BookmarkCheck,
  PhoneCall
} from 'lucide-react'
import CounsellingModal from '@/components/ui/CounsellingModal'
import {
  ADMISSION_ALERTS,
  URGENT_DEADLINES,
  COUNSELLING_BOARDS,
  ROADMAP_TIMELINE,
  AdmissionAlert
} from '@/data/admissionAlertsData'

export default function AdmissionAlertsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedType, setSelectedType] = useState<string>('All')
  const [selectedUrgency, setSelectedUrgency] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [counsellingModalOpen, setCounsellingModalOpen] = useState<boolean>(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(0)

  // Subscription modal / widget state
  const [subPhone, setSubPhone] = useState('')
  const [subEmail, setSubEmail] = useState('')
  const [subSelectedExam, setSubSelectedExam] = useState('JEE Main & Advanced')
  const [subStatus, setSubStatus] = useState<'idle' | 'success'>('idle')
  const [copiedAlertId, setCopiedAlertId] = useState<string | null>(null)

  const categories = ['All', 'Engineering', 'Medical', 'Management', 'Law', 'Design', 'Scholarships']
  const types = ['All', 'Application', 'Admit Card', 'Exam Date', 'Counselling', 'Result']

  // Filtered alerts
  const filteredAlerts = useMemo(() => {
    return ADMISSION_ALERTS.filter((alert) => {
      const matchesCategory = selectedCategory === 'All' || alert.category === selectedCategory
      const matchesType = selectedType === 'All' || alert.type === selectedType
      const matchesUrgency =
        selectedUrgency === 'All' ||
        (selectedUrgency === 'urgent' && (alert.urgency === 'urgent' || alert.urgency === 'closing_soon')) ||
        alert.urgency === selectedUrgency

      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !query ||
        alert.title.toLowerCase().includes(query) ||
        alert.examName.toLowerCase().includes(query) ||
        alert.authority.toLowerCase().includes(query) ||
        alert.summary.toLowerCase().includes(query) ||
        alert.category.toLowerCase().includes(query)

      return matchesCategory && matchesType && matchesUrgency && matchesSearch
    })
  }, [selectedCategory, selectedType, selectedUrgency, searchQuery])

  const handleShare = (alert: AdmissionAlert) => {
    const shareText = `🚨 ${alert.title}\n📅 Deadline/Date: ${alert.deadline}\nCheck details on Promote Education: https://promoteducation.com/alerts`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText)
      setCopiedAlertId(alert.id)
      setTimeout(() => setCopiedAlertId(null), 2500)
    }
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!subPhone && !subEmail) return
    setSubStatus('success')
  }

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-body selection:bg-sky-500 selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          TOP LIVE STATUS TICKER
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-sky-900 via-indigo-950 to-slate-900 text-white text-xs sm:text-sm py-2.5 px-4 sticky top-0 z-30 shadow-md border-b border-sky-800/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="flex h-2.5 w-2.5 relative flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-sky-400 uppercase tracking-wider text-[11px]">Live Bulletin:</span>
            <span className="text-slate-200 truncate">
              2027 Session Updates: CAT Admit Cards Live • CLAT Registration Closes Nov 15 • JEE Main Notice Out
            </span>
          </div>
          <button
            onClick={() => setCounsellingModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-white px-3 py-1 rounded-full transition-colors flex-shrink-0"
          >
            <PhoneCall size={12} />
            Free Admission Desk
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        {/* ─────────────────────────────────────────────────────────────
            HERO HEADER SECTION
        ───────────────────────────────────────────────────────────── */}
        <section className="mb-12">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-sky-950 p-8 sm:p-12 text-white border border-slate-800 shadow-2xl">
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 -mb-16 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-sky-300 uppercase tracking-wider mb-6">
                <Sparkles size={14} className="text-sky-400" />
                Admission Season 2027 Official Monitor
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-6">
                Real-Time <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-300">Admission & Exam Alerts</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg font-normal leading-relaxed mb-8">
                Never miss an application deadline, correction window, admit card release, or counseling round. 
                Track authenticated updates for Engineering, Medical, MBA, Law, and Design directly from NTA, MCC, JoSAA, and premier universities.
              </p>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                  <div className="text-2xl sm:text-3xl font-black text-sky-400">14+</div>
                  <div className="text-xs text-slate-400 mt-1 font-medium">Closing This Month</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
                  <div className="text-xs text-slate-400 mt-1 font-medium">Verified Portals</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">30+</div>
                  <div className="text-xs text-slate-400 mt-1 font-medium">National Exams</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                  <div className="text-2xl sm:text-3xl font-black text-purple-400">24/7</div>
                  <div className="text-xs text-slate-400 mt-1 font-medium">Counselling Help</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            URGENT / CLOSING SOON SPOTLIGHT
        ───────────────────────────────────────────────────────────── */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-600">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  High Priority: Deadlines Closing Soon
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Time-critical registration windows and admit card milestones for the 2027 admission session
                </p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {URGENT_DEADLINES.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 border border-rose-200/80 shadow-md shadow-rose-500/5 hover:shadow-xl hover:border-rose-400 transition-all duration-300 flex flex-col justify-between relative group"
              >
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                    {item.daysLeft ? `${item.daysLeft} Days Left` : item.status}
                  </span>
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    {item.category}
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-rose-600 transition-colors">
                    {item.exam}
                  </h3>
                  <p className="text-xs font-medium text-slate-600 line-clamp-2 mb-4">
                    {item.event}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-slate-500">Target Date:</span>
                    <span className="font-bold text-slate-800">{item.deadline}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={item.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-900 text-white hover:bg-rose-600 text-xs font-bold transition-colors"
                    >
                      Official Portal
                      <ExternalLink size={12} />
                    </a>
                    {item.guideUrl && (
                      <Link
                        href={item.guideUrl}
                        className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                      >
                        Guide
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SEARCH & COMPREHENSIVE FILTER BAR
        ───────────────────────────────────────────────────────────── */}
        <section className="mb-8 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-lg shadow-slate-900/5">
          {/* Search Input */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by exam name (JEE, NEET, CAT, CLAT...), organizing body, or topic..."
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Stream Category Filters */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1.5">
              <Filter size={14} /> Stream:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Alert Type Filters */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">
              Alert Type:
            </span>
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedType === t
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {t}
              </button>
            ))}

            <div className="ml-auto flex items-center gap-2 pt-2 sm:pt-0">
              <button
                onClick={() => setSelectedUrgency(selectedUrgency === 'urgent' ? 'All' : 'urgent')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  selectedUrgency === 'urgent'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                }`}
              >
                <AlertTriangle size={13} />
                Closing Soon Only
              </button>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            MAIN ALERTS FEED & SIDEBAR LAYOUT
        ───────────────────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Feed of Filtered Alerts (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-black text-slate-900">
                Latest Admission Updates ({filteredAlerts.length})
              </h2>
              <span className="text-xs text-slate-500">
                Sorted by most recent notifications
              </span>
            </div>

            {filteredAlerts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
                <Bell size={40} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-lg font-black text-slate-900 mb-2">No matching alerts found</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                  Try adjusting your search query or reset stream and type filters to view other available entrance exams.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All')
                    setSelectedType('All')
                    setSelectedUrgency('All')
                    setSearchQuery('')
                  }}
                  className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-sky-600 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredAlerts.map((alert) => (
                <article
                  key={alert.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all group"
                >
                  {/* Card Header Metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-sky-100 text-sky-800">
                        {alert.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
                        {alert.type}
                      </span>
                      {alert.badge && (
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${
                            alert.urgency === 'urgent' || alert.urgency === 'closing_soon'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {alert.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <Clock size={13} />
                      {alert.postedDate}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-2 group-hover:text-sky-600 transition-colors leading-snug">
                    {alert.title}
                  </h3>

                  {/* Organizing Authority */}
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-4">
                    <ShieldCheck size={14} className="text-sky-500" />
                    <span>Organizing Body: <strong>{alert.authority}</strong></span>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {alert.summary}
                  </p>

                  {/* Key Highlights Bullet Points */}
                  {alert.keyHighlights && alert.keyHighlights.length > 0 && (
                    <div className="bg-slate-50 rounded-2xl p-4 mb-5 border border-slate-100">
                      <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Crucial Notice Points:
                      </div>
                      <ul className="space-y-1.5">
                        {alert.keyHighlights.map((point, idx) => (
                          <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                            <CheckCircle2 size={14} className="text-sky-500 mt-0.5 flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Dates & Action Bar */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                        Application / Milestone Date
                      </span>
                      <span className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5 mt-0.5">
                        <Calendar size={14} className="text-sky-600" />
                        {alert.deadline}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => handleShare(alert)}
                        title="Copy alert information"
                        className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                      >
                        <Share2 size={16} />
                      </button>
                      {copiedAlertId === alert.id && (
                        <span className="text-xs font-bold text-emerald-600 animate-in fade-in">
                          Copied!
                        </span>
                      )}

                      {alert.examUrl && (
                        <Link
                          href={alert.examUrl}
                          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                        >
                          Exam Guide
                        </Link>
                      )}

                      <a
                        href={alert.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-sky-600 text-white text-xs font-bold transition-all shadow-sm"
                      >
                        Official Notice
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Right Column: Sticky Subscription & Quick Tools Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Interactive WhatsApp / SMS Alert Box */}
            <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-3xl p-6 sm:p-7 border border-emerald-800/40 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 blur-2xl rounded-full pointer-events-none" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                  <MessageCircle size={24} />
                </div>

                <h3 className="text-xl font-black tracking-tight mb-2">
                  Instant WhatsApp Alerts
                </h3>
                <p className="text-xs text-emerald-200/80 mb-6 leading-relaxed">
                  Get real-time notifications on WhatsApp for registration start dates, admit cards, and counselling choice locking. Zero spam.
                </p>

                {subStatus === 'success' ? (
                  <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-2xl p-5 text-center">
                    <CheckCircle2 size={32} className="text-emerald-400 mx-auto mb-2" />
                    <h4 className="text-sm font-bold text-white mb-1">Alert Activated!</h4>
                    <p className="text-xs text-emerald-200">
                      You will receive critical updates for {subSelectedExam} straight to your WhatsApp and inbox.
                    </p>
                    <button
                      onClick={() => setSubStatus('idle')}
                      className="mt-4 text-xs font-semibold text-emerald-300 underline"
                    >
                      Subscribe for another exam
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-emerald-200 mb-1.5">
                        Target Entrance Exam
                      </label>
                      <select
                        value={subSelectedExam}
                        onChange={(e) => setSubSelectedExam(e.target.value)}
                        className="w-full bg-slate-900/80 border border-emerald-700/60 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                      >
                        <option value="JEE Main & Advanced">JEE Main & Advanced 2027</option>
                        <option value="NEET UG Medical">NEET UG 2027 (MBBS/BDS)</option>
                        <option value="CAT / XAT MBA">CAT & XAT 2027 (IIMs & XLRI)</option>
                        <option value="CLAT Law">CLAT 2027 (National Law Univs)</option>
                        <option value="GATE Engineering">GATE 2027 (IITs & PSUs)</option>
                        <option value="BITSAT">BITSAT 2027</option>
                        <option value="All National Exams">All National Entrance Exams</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-emerald-200 mb-1.5">
                        WhatsApp Mobile Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={subPhone}
                        onChange={(e) => setSubPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-slate-900/80 border border-emerald-700/60 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-emerald-200 mb-1.5">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={subEmail}
                        onChange={(e) => setSubEmail(e.target.value)}
                        placeholder="student@example.com"
                        className="w-full bg-slate-900/80 border border-emerald-700/60 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                    >
                      <Bell size={14} />
                      Activate Free Alerts
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Direct Counselling Consultation Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
                <GraduationCap size={20} />
              </div>
              <h3 className="text-base font-black text-slate-900 mb-1">
                Confused About Choice Locking?
              </h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Connect with Promote Education certified admission counselors for 1-on-1 guidance on JoSAA, MCC, and state quota seat matrices.
              </p>
              <button
                onClick={() => setCounsellingModalOpen(true)}
                className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                Book 1-on-1 Guidance
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Central Counseling Portals Quick Directory */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 mb-3 flex items-center gap-2">
                <BookmarkCheck size={16} className="text-sky-600" />
                Key Seat Allocation Portals
              </h3>
              <div className="space-y-3">
                {COUNSELLING_BOARDS.map((board) => (
                  <a
                    key={board.name}
                    href={board.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-100 hover:border-sky-200 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-slate-900 group-hover:text-sky-600">
                        {board.name}
                      </span>
                      <ExternalLink size={12} className="text-slate-400 group-hover:text-sky-600" />
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1 mb-1">
                      {board.fullForm}
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-semibold text-slate-700">{board.exam}</span>
                      <span className="text-emerald-700 font-bold">{board.status}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            ADMISSION SEASON 2027 TIMELINE ROADMAP
        ───────────────────────────────────────────────────────────── */}
        <section className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black text-sky-600 uppercase tracking-widest">
              Session 2027 Roadmap
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-3">
              National Admission Cycle at a Glance
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Key quarter-by-quarter milestones for engineering, medical, management, and law admissions.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROADMAP_TIMELINE.map((step, idx) => (
              <div
                key={step.quarter}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-sky-100 text-sky-800 mb-3">
                    Phase 0{idx + 1}
                  </div>
                  <h3 className="text-base font-black text-slate-900 mb-1">
                    {step.quarter}
                  </h3>
                  <div className="text-xs font-bold text-sky-600 mb-4">
                    {step.title}
                  </div>
                  <ul className="space-y-2 mb-4">
                    {step.items.map((item, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            FREQUENTLY ASKED QUESTIONS ACCORDION
        ───────────────────────────────────────────────────────────── */}
        <section className="mb-16 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-3">
              <HelpCircle size={24} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">
              Frequently Asked Questions About Admission Deadlines
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Crucial advice on application windows, correction policies, and counselling rounds
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'What should I do if I miss the application deadline for an entrance exam?',
                a: 'Most premier exams (such as JEE Main, NEET UG, CAT, and CLAT) announce a late-fee correction/registration window of 2 to 5 days following the primary deadline. However, this is not guaranteed for every session. If the final window has passed, look for alternate entrance exams with active deadlines (e.g. state CETs, university-specific exams like BITSAT, VITEEE, SRMJEEE, SLAT) or subsequent sessions.'
              },
              {
                q: 'Can I change my exam city or category during the Application Correction Window?',
                a: 'Yes, most testing bodies like NTA, IITs, and AIIMS offer an Application Correction Window. Permitted changes usually include test city choices, category (General/OBC/SC/ST/EWS), photograph/signature re-upload, and educational qualification details. Note that changing category from reserved to unreserved may require paying the fee difference.'
              },
              {
                q: 'How does Central Seat Allotment (JoSAA / MCC) choice-locking work?',
                a: 'During national counseling, candidates must fill out and lock their preferred branch and college combinations before the notified deadline. If you do not manually lock your choices, the counseling software will automatically lock your last saved choices upon deadline expiry. Once locked, choices cannot be reshuffled for that particular allotment round.'
              },
              {
                q: 'Are the exam dates listed on Promote Education officially verified?',
                a: 'Yes. All alerts, dates, and bulletins published on Promote Education are cross-referenced directly from official notices issued by the National Testing Agency (NTA), Medical Counselling Committee (MCC), Joint Seat Allocation Authority (JoSAA), Consortium of NLUs, and relevant examination authorities.'
              },
              {
                q: 'How do WhatsApp alerts work and is there any charge?',
                a: 'Our Admission Alerts service is 100% free of charge. Once you enter your target entrance exam and WhatsApp number, our system pings you with verified announcements whenever registration opens, admit cards drop, results are declared, or critical counselling choice-locking deadlines approach.'
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 bg-slate-50 hover:bg-slate-100/80 transition-colors"
                >
                  <span className="text-sm font-bold text-slate-900">{faq.q}</span>
                  {activeFaq === index ? (
                    <ChevronUp size={18} className="text-slate-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-slate-500 flex-shrink-0" />
                  )}
                </button>
                {activeFaq === index && (
                  <div className="p-5 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            BOTTOM CALL-TO-ACTION BANNER
        ───────────────────────────────────────────────────────────── */}
        <section className="rounded-3xl bg-gradient-to-r from-sky-600 to-indigo-700 p-8 sm:p-12 text-white text-center shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-black mb-3">
            Need Personalized College & Seat Choice Guidance?
          </h2>
          <p className="text-sky-100 text-xs sm:text-sm max-w-xl mx-auto mb-6">
            Get your rank evaluated by experienced counselors. We help you build optimal JoSAA, MCC, and State CET choice-filling lists based on historical cutoffs and category reservation quotas.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setCounsellingModalOpen(true)}
              className="px-8 py-3.5 rounded-2xl bg-white text-slate-900 font-bold text-xs sm:text-sm hover:bg-sky-50 transition-colors shadow-lg shadow-black/10"
            >
              Talk to an Admission Counselor
            </button>
            <Link
              href="/tools/college-predictor"
              className="px-8 py-3.5 rounded-2xl bg-sky-950/40 border border-white/20 text-white font-bold text-xs sm:text-sm hover:bg-sky-950/60 transition-colors"
            >
              Try AI College Predictor
            </Link>
          </div>
        </section>
      </main>

      {/* Counselling Lead Modal */}
      <CounsellingModal
        isOpen={counsellingModalOpen}
        onClose={() => setCounsellingModalOpen(false)}
      />
    </div>
  )
}
