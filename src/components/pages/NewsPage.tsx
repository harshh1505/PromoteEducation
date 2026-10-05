'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import {
  Calendar,
  ArrowRight,
  TrendingUp,
  Bell,
  MessageSquare,
  Share2,
  Eye,
  Search,
  Sparkles,
  Flame,
  CheckCircle2,
  Clock,
  ChevronRight,
  Send,
  ExternalLink
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { resolveImageUrl } from '@/lib/utils'

const ITEMS_PER_PAGE = 12

export interface NewsItem {
  id: string | number
  isLive?: boolean
  title: string
  synopsis?: string
  author: string
  date: string
  comments?: string
  shares?: string
  views: string
  numericViews: number
  image: string
  slug: string
  category: string
  readTime: string
}

export default function NewsPageContent({
  initialArticles,
  initialEduArticles
}: {
  initialArticles: any[]
  initialEduArticles: any[]
}) {
  const detectCategory = (title: string, synopsis?: string): string => {
    const text = `${title} ${synopsis || ''}`.toLowerCase()
    if (text.includes('neet') || text.includes('mbbs') || text.includes('medical') || text.includes('nmc') || text.includes('anm') || text.includes('gnm') || text.includes('jenpas')) {
      return 'Medical'
    }
    if (text.includes('jee') || text.includes('iit') || text.includes('gate') || text.includes('b.tech') || text.includes('engineering') || text.includes('wbjee') || text.includes('bitsat')) {
      return 'Engineering'
    }
    if (text.includes('cat') || text.includes('mba') || text.includes('mat') || text.includes('snap') || text.includes('xat') || text.includes('b-school')) {
      return 'Management'
    }
    if (text.includes('clat') || text.includes('law') || text.includes('ailet') || text.includes('nlu')) {
      return 'Law'
    }
    if (text.includes('counselling') || text.includes('mcc') || text.includes('allotment') || text.includes('seat')) {
      return 'Counselling'
    }
    return 'General'
  }

  const mapArticle = (item: any): NewsItem => {
    const viewsNum = Number(item.views) || 0
    return {
      id: item.id || item.slug,
      isLive: item.is_live,
      title: item.heading || item.title || '',
      synopsis: item.synopsis || '',
      author: item.editor || 'Education Desk',
      date: item.published_at
        ? new Date(item.published_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })
        : 'Recent',
      comments: item.comments_count > 0 ? String(item.comments_count) : undefined,
      shares: item.shares_count > 0 ? String(item.shares_count) : undefined,
      views: viewsNum >= 1000 ? `${(viewsNum / 1000).toFixed(1)}K` : String(viewsNum),
      numericViews: viewsNum,
      image: resolveImageUrl(item.featured_image) || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
      slug: item.slug,
      category: detectCategory(item.heading || item.title || '', item.synopsis),
      readTime: '3 min read'
    }
  }

  const [articles, setArticles] = useState<NewsItem[]>(initialArticles.map(mapArticle))
  const [eduArticles] = useState<any[]>(initialEduArticles)
  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(initialArticles.length >= ITEMS_PER_PAGE)

  // Interactive controls
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)

  // Quick subscribe widget
  const [subPhone, setSubPhone] = useState('')
  const [subDone, setSubDone] = useState(false)

  const categories = ['All', 'Medical', 'Engineering', 'Management', 'Counselling', 'Law']

  // Filtered list
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchCat = selectedCategory === 'All' || art.category === selectedCategory
      const query = searchQuery.toLowerCase().trim()
      const matchSearch =
        !query ||
        art.title.toLowerCase().includes(query) ||
        (art.synopsis && art.synopsis.toLowerCase().includes(query)) ||
        art.category.toLowerCase().includes(query)
      return matchCat && matchSearch
    })
  }, [articles, selectedCategory, searchQuery])

  // Client-side pagination to fetch subsequent pages
  async function loadMoreNews() {
    if (loadingMore) return
    setLoadingMore(true)
    try {
      const nextPage = page + 1
      const start = (nextPage - 1) * ITEMS_PER_PAGE
      const end = start + ITEMS_PER_PAGE - 1

      const { data, error } = await supabase
        .from('news_articles')
        .select('id, slug, heading, synopsis, editor, published_at, created_at, comments_count, shares_count, views, featured_image, is_live')
        .eq('is_live', true)
        .order('published_at', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false })
        .range(start, end)

      if (error) throw error

      if (data && data.length > 0) {
        setArticles((prev) => [...prev, ...data.map(mapArticle)])
        setPage(nextPage)
        if (data.length < ITEMS_PER_PAGE) {
          setHasMore(false)
        }
      } else {
        setHasMore(false)
      }
    } catch (err) {
      console.error('Error fetching more news:', err)
    } finally {
      setLoadingMore(false)
    }
  }

  const handleShare = (slug: string, title: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const url = `https://promoteducation.com/news/${slug}`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${title} - Read more on Promote Education: ${url}`)
      setCopiedSlug(slug)
      setTimeout(() => setCopiedSlug(null), 2500)
    }
  }

  const handleSubSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!subPhone) return
    setSubDone(true)
  }

  // Segment articles for Bento showcase
  const heroArticle = filteredArticles[0]
  const secondArticle = filteredArticles[1]
  const thirdArticle = filteredArticles[2]
  const fourthArticle = filteredArticles[3]
  const remainingArticles = filteredArticles.slice(4)

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] font-body text-slate-900 selection:bg-sky-500 selection:text-white">
      <Navbar />

      {/* ─────────────────────────────────────────────────────────────
          HERO & LIVE WIRE HEADER (CLEAN LIGHT THEME)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-10 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto w-full overflow-hidden">
        {/* Soft Background Accents */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Live News Ticker Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 text-xs font-semibold mb-6 shadow-sm">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
            <span className="text-sky-600 font-bold uppercase tracking-wider text-[11px]">
              Education Wire:
            </span>
            <span className="text-slate-600 font-medium truncate max-w-xs sm:max-w-md">
              Real-time entrance exam notifications, seat matrices & counselling updates
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-[2px] bg-sky-500" />
                <span className="text-[11px] font-black text-sky-600 uppercase tracking-[0.2em]">
                  National Education Intelligence
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.06] mb-4">
                Academic News <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-cyan-600">
                  Curated & Verified.
                </span>
              </h1>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
                Stay updated with breaking admission cycles, government notifications, paper analyses, and exam deadlines across Indian higher education.
              </p>
            </div>

            {/* Action Link */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/alerts"
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 hover:bg-sky-600 text-white text-xs font-bold shadow-md shadow-slate-900/10 transition-all"
              >
                <Bell size={14} />
                Admission Alerts Hub
              </Link>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              SEARCH & STREAM FILTER BAR (LIGHT THEME)
          ───────────────────────────────────────────────────────────── */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm mb-10 flex flex-col md:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80 lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by exam, college, or topic..."
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Stream Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full pb-1 md:pb-0 scrollbar-none">
              <span className="text-xs text-slate-400 uppercase tracking-widest font-bold hidden xl:inline-block mr-1">
                Filter:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat === 'All' ? 'All Stories' : cat}
                </button>
              ))}
            </div>

            <div className="text-xs font-medium text-slate-500 whitespace-nowrap ml-auto hidden sm:block">
              Showing <span className="font-bold text-slate-900">{filteredArticles.length}</span> articles
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT: BENTO OR PINTEREST VIEW (LIGHT THEME)
      ───────────────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 pb-20">
        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200/90 shadow-sm my-10">
            <Sparkles size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No matching news articles</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
              No articles match your current search and stream filters. Try resetting the filter to explore all updates.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All')
                setSearchQuery('')
              }}
              className="px-6 py-2.5 rounded-xl bg-sky-600 text-white font-bold text-xs hover:bg-sky-500 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* ═══════════════════════════════════════════════════════════
             SIGNATURE BENTO GRID (LIGHT PALETTE)
          ════════════════════════════════════════════════════════════ */
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Top Primary Bento Cluster (4 Columns Layout) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Bento Card 1: HERO SPOTLIGHT (Spans 2 cols, 2 rows on large) */}
              {heroArticle && (
                <div className="md:col-span-2 lg:row-span-2 relative group rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-900 shadow-xl flex flex-col justify-end min-h-[480px] lg:min-h-[560px] p-6 sm:p-10 transition-all duration-500 hover:shadow-2xl">
                  <Image
                    src={heroArticle.image}
                    alt={heroArticle.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Photo Scrim for perfect text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/20" />

                  {/* Top Badges */}
                  <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                    <div className="flex items-center gap-2">
                      <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-sky-500 text-white shadow-lg shadow-sky-500/30">
                        Lead Story
                      </span>
                      {heroArticle.isLive && (
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-rose-500 text-white animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-white" /> Live
                        </span>
                      )}
                    </div>
                    <button
                      onClick={(e) => handleShare(heroArticle.slug, heroArticle.title, e)}
                      className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-slate-900 transition-colors"
                      title="Share Article"
                    >
                      <Share2 size={14} />
                    </button>
                  </div>

                  {/* Bottom Content */}
                  <div className="relative z-10 text-white">
                    <div className="flex items-center gap-3 text-xs text-sky-300 font-bold mb-3">
                      <span>{heroArticle.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-200">
                        <Calendar size={13} className="text-sky-400" />
                        {heroArticle.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-200">
                        <Eye size={13} className="text-sky-400" />
                        {heroArticle.views} Reads
                      </span>
                    </div>

                    <Link href={`/news/${heroArticle.slug}`} className="block">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-4 group-hover:text-sky-300 transition-colors">
                        {heroArticle.title}
                      </h2>
                    </Link>

                    {heroArticle.synopsis && (
                      <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed line-clamp-2 mb-6">
                        {heroArticle.synopsis}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-white/20">
                      <span className="text-xs text-slate-300">
                        By <strong className="text-white">{heroArticle.author}</strong>
                      </span>
                      <Link
                        href={`/news/${heroArticle.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 group-hover:text-sky-300 transition-colors"
                      >
                        Read Full Story <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Bento Card 2: SECONDARY FOCUS (1 col, 1 row - Light) */}
              {secondArticle && (
                <div className="group rounded-3xl overflow-hidden border border-slate-200/90 bg-white p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-sky-300 relative shadow-sm">
                  <div>
                    <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-4 bg-slate-100">
                      <Image
                        src={secondArticle.image}
                        alt={secondArticle.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-white/95 backdrop-blur-md text-sky-700 shadow-sm border border-slate-100">
                        {secondArticle.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                      <Calendar size={12} className="text-slate-400" />
                      <span>{secondArticle.date}</span>
                    </div>

                    <Link href={`/news/${secondArticle.slug}`}>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug">
                        {secondArticle.title}
                      </h3>
                    </Link>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 text-[11px] flex items-center gap-1">
                      <Eye size={12} className="text-sky-600" /> {secondArticle.views}
                    </span>
                    <Link
                      href={`/news/${secondArticle.slug}`}
                      className="text-xs font-bold text-sky-600 hover:text-sky-700 inline-flex items-center gap-1"
                    >
                      Read <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              )}

              {/* Bento Card 3: INTERACTIVE WHATSAPP SUBSCRIBE BOX (Light Emerald Palette) */}
              <div className="rounded-3xl border border-emerald-200/90 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/60 p-6 flex flex-col justify-between relative overflow-hidden shadow-sm">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                    <Bell size={18} />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-1.5">
                    WhatsApp News Desk
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Get breaking entrance notices & deadline alerts directly on WhatsApp.
                  </p>

                  {subDone ? (
                    <div className="p-4 rounded-2xl bg-emerald-100/70 border border-emerald-300 text-center">
                      <CheckCircle2 size={24} className="text-emerald-700 mx-auto mb-1" />
                      <div className="text-xs font-bold text-emerald-800">Subscribed!</div>
                      <div className="text-[11px] text-emerald-700">You will receive priority bulletins.</div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubSubmit} className="space-y-2.5">
                      <input
                        type="tel"
                        required
                        value={subPhone}
                        onChange={(e) => setSubPhone(e.target.value)}
                        placeholder="+91 Mobile Number"
                        className="w-full bg-white border border-emerald-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
                      >
                        <Send size={12} />
                        Get Free WhatsApp Alerts
                      </button>
                    </form>
                  )}
                </div>

                <div className="text-[10px] text-slate-400 pt-3 border-t border-emerald-100 mt-2">
                  🔒 Zero spam. Instant unsubscribe anytime.
                </div>
              </div>

              {/* Bento Card 4: THIRD FOCUS CARD (1 col, 1 row - Light) */}
              {thirdArticle && (
                <div className="group rounded-3xl overflow-hidden border border-slate-200/90 bg-white p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-sky-300 relative shadow-sm">
                  <div>
                    <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-4 bg-slate-100">
                      <Image
                        src={thirdArticle.image}
                        alt={thirdArticle.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-white/95 backdrop-blur-md text-sky-700 shadow-sm border border-slate-100">
                        {thirdArticle.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                      <Calendar size={12} className="text-slate-400" />
                      <span>{thirdArticle.date}</span>
                    </div>

                    <Link href={`/news/${thirdArticle.slug}`}>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug">
                        {thirdArticle.title}
                      </h3>
                    </Link>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 text-[11px] flex items-center gap-1">
                      <Eye size={12} className="text-sky-600" /> {thirdArticle.views}
                    </span>
                    <Link
                      href={`/news/${thirdArticle.slug}`}
                      className="text-xs font-bold text-sky-600 hover:text-sky-700 inline-flex items-center gap-1"
                    >
                      Read <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              )}

              {/* Bento Card 5: METRIC / VERIFIED DESK (Light Indigo) */}
              <div className="rounded-3xl border border-indigo-200/90 bg-gradient-to-br from-indigo-50/70 via-white to-sky-50/60 p-6 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800 mb-4">
                    <Flame size={12} className="text-amber-500" />
                    Coverage Milestone
                  </div>
                  <div className="text-3xl font-black text-slate-900 mb-1">
                    2.4M+
                  </div>
                  <div className="text-xs font-bold text-sky-600 mb-2">
                    Aspirants Reading Monthly
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Covering JEE Main, NEET UG, CAT, GATE, CLAT, NIFT & 50+ central counselling portals.
                  </p>
                </div>

                <Link
                  href="/counselling"
                  className="inline-flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-sm transition-all text-xs font-bold text-slate-800 group"
                >
                  <span>Explore Counselling Guides</span>
                  <ArrowRight size={14} className="text-sky-600 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Middle Section: Modular Bento Grid of Remaining News */}
            <div className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Sparkles size={20} className="text-sky-600" />
                  Latest Educational Feed
                </h2>
                <span className="text-xs text-slate-500 font-medium">
                  Updated around the clock
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {remainingArticles.map((article) => (
                  <article
                    key={article.id}
                    className="group rounded-3xl border border-slate-200/90 bg-white p-6 flex flex-col justify-between transition-all duration-300 hover:border-sky-300 hover:-translate-y-1 hover:shadow-xl shadow-sm relative"
                  >
                    <div>
                      {/* Thumbnail Container */}
                      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-5 bg-slate-100 flex items-center justify-center">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Badges on image */}
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-white/95 backdrop-blur-md text-sky-800 border border-slate-200 shadow-sm">
                            {article.category}
                          </span>
                          {article.isLive && (
                            <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-rose-600 text-white animate-pulse">
                              Live
                            </span>
                          )}
                        </div>

                        <button
                          onClick={(e) => handleShare(article.slug, article.title, e)}
                          className="absolute top-3 right-3 p-2 rounded-xl bg-white/90 backdrop-blur-md text-slate-600 hover:text-slate-900 hover:bg-white border border-slate-200 transition-colors shadow-sm"
                          title="Share"
                        >
                          <Share2 size={13} />
                        </button>
                      </div>

                      {/* Article Metadata */}
                      <div className="flex items-center gap-3 text-xs text-slate-500 mb-2.5">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} className="text-slate-400" />
                          {article.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} className="text-slate-400" />
                          {article.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <Link href={`/news/${article.slug}`}>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug mb-3">
                          {article.title}
                        </h3>
                      </Link>

                      {/* Synopsis snippet if present */}
                      {article.synopsis && (
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4 font-normal">
                          {article.synopsis}
                        </p>
                      )}
                    </div>

                    {/* Bottom Metadata & Link */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <Eye size={12} className="text-sky-600" /> {article.views}
                        </span>
                        {article.comments && (
                          <span className="flex items-center gap-1">
                            <MessageSquare size={12} className="text-sky-600" /> {article.comments}
                          </span>
                        )}
                      </div>

                      <Link
                        href={`/news/${article.slug}`}
                        className="inline-flex items-center gap-1 font-bold text-xs text-sky-600 hover:text-sky-700 transition-colors"
                      >
                        Read Story <ArrowRight size={13} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            LOAD MORE PAGINATION
        ───────────────────────────────────────────────────────────── */}
        {hasMore && (
          <div className="flex justify-center mt-16 mb-20">
            <button
              onClick={loadMoreNews}
              disabled={loadingMore}
              className="px-8 py-4 bg-slate-900 hover:bg-sky-600 disabled:bg-slate-400 text-white transition-all font-bold text-xs uppercase tracking-widest rounded-full shadow-lg shadow-slate-900/10 flex items-center gap-2 group"
            >
              {loadingMore ? 'Fetching More News...' : 'Load More Articles'}
              <ArrowRight
                size={14}
                className={`group-hover:translate-x-1 transition-transform ${loadingMore ? 'animate-pulse' : ''}`}
              />
            </button>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            IN-DEPTH EDUCATIONAL GUIDES (FEATURED BLOGS - LIGHT THEME)
        ───────────────────────────────────────────────────────────── */}
        {eduArticles.length > 0 && (
          <section className="pt-12 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">
                  Editorial Analysis
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  In-Depth Career & Admission Guides
                </h2>
              </div>
              <Link
                href="/blogs"
                className="hidden sm:inline-flex items-center gap-2 text-xs font-bold text-sky-600 hover:text-sky-700"
              >
                Browse All Guides <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {eduArticles.map((article) => {
                const link = `/blogs/${article.slug}`
                return (
                  <div
                    key={article.id}
                    className="p-6 rounded-3xl border border-slate-200 bg-white group hover:border-sky-300 hover:shadow-xl transition-all flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <div className="w-full aspect-[16/10] rounded-2xl bg-slate-100 mb-5 overflow-hidden relative">
                        <Image
                          src={resolveImageUrl(article.featured_image) || 'https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?w=400'}
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          alt={article.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 350px"
                        />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2 leading-tight group-hover:text-sky-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      {article.summary && (
                        <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                          {article.summary}
                        </p>
                      )}
                    </div>
                    <Link
                      href={link}
                      className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-sky-600 group-hover:gap-3 transition-all mt-4 self-start"
                    >
                      Read Full Guide <ArrowRight size={14} />
                    </Link>
                  </div>
                )
              })}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
