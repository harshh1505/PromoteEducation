'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { supabase } from '@/lib/supabase'
import {
  Clock, Eye, ArrowRight, Star, Search, Flame, CheckCircle,
  Layers, GraduationCap, Code, Building, FileText, Briefcase, Users
} from 'lucide-react'
import { cn } from '@/lib/utils'
import LeadGate from '@/components/ui/LeadGate'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface JourneyStage {
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  title: string
  subtitle: string
  description: string
  articles: number
  icon: React.ComponentType<any>
  topics: string[]
  extendedInfo: string
}

export interface ResourceTool {
  icon: React.ComponentType<any>
  title: string
  description: string
  cta: string
  colorClass: string
  bgClass: string
  borderClass: string
  benefits: string[]
}

export interface SpecialtyItem {
  icon: React.ComponentType<any>
  title: string
  count: string
  textClass: string
  description: string
  scope: string
  recruiters: string
}

export interface TestimonialItem {
  quote: string
  name: string
  detail: string
  avatar: string
}

export interface CourseHubTemplateProps {
  courseId: string
  streamName: string
  hubName: string
  heroTitle: string
  heroGradient: string
  heroSubtitle: string
  searchPlaceholder: string
  trendingTopics: string[]
  stats: Array<{
    value: string
    label: string
    icon: React.ComponentType<any>
  }>
  journeyLevels: JourneyStage[]
  freeResources: ResourceTool[]
  testimonials: TestimonialItem[]
  specialties: SpecialtyItem[]
  specialtiesTitle: string
  specialtiesSubtitle: string
  studentVisual: {
    imageUrl: string
    avatarName: string
    goalTitle: string
    activePrepLabel: string
    overlayText: string
    overlaySub: string
  }
}

type Article = {
  id: string
  title: string
  excerpt: string
  category: string
  tag: string
  readTime: string
  date: string
  author: string
  authorRole: string
  views: string
  image: string
  isHot?: boolean
  isFeatured?: boolean
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const LEVEL_CONFIG: Record<string, { label: string; textClass: string; bgClass: string; borderClass: string }> = {
  beginner: { label: 'Class 10–12', textClass: 'text-emerald-700', bgClass: 'bg-emerald-50', borderClass: 'border-emerald-200/60' },
  intermediate: { label: 'Aspirant', textClass: 'text-sky-700', bgClass: 'bg-sky-50', borderClass: 'border-sky-200/60' },
  advanced: { label: 'Undergrad Student', textClass: 'text-violet-700', bgClass: 'bg-violet-50', borderClass: 'border-violet-200/60' },
  expert: { label: 'Career / PG Track', textClass: 'text-amber-700', bgClass: 'bg-amber-50', borderClass: 'border-amber-200/60' },
}

const LevelBadge = ({ level, courseId }: { level: Article['level']; courseId: string }) => {
  const cfg = LEVEL_CONFIG[level]
  if (!cfg) return null
  
  // Customize beginner/advanced label slightly for non-btech
  let label = cfg.label
  if (courseId === 'mba') {
    if (level === 'beginner') label = 'UG Base'
    if (level === 'advanced') label = 'MBA Student'
    if (level === 'expert') label = 'Business Leader'
  } else if (courseId === 'mbbs') {
    if (level === 'intermediate') label = 'NEET Aspirant'
    if (level === 'advanced') label = 'MBBS Student'
    if (level === 'expert') label = 'Clinical PG / MD'
  } else if (courseId === 'mtech') {
    if (level === 'beginner') label = 'UG Student'
    if (level === 'intermediate') label = 'GATE Aspirant'
    if (level === 'advanced') label = 'M.Tech Scholar'
  } else if (courseId === 'bds') {
    if (level === 'intermediate') label = 'NEET Aspirant'
    if (level === 'advanced') label = 'BDS Student'
  } else if (courseId === 'bsc-nursing') {
    if (level === 'intermediate') label = 'Nursing Aspirant'
    if (level === 'advanced') label = 'Nursing Student'
  }
  
  return (
    <span className={cn(
      'text-[9px] font-extrabold px-2.5 py-0.5 rounded-full tracking-wider border whitespace-nowrap uppercase',
      cfg.textClass, cfg.bgClass, cfg.borderClass
    )}>
      {label}
    </span>
  )
}

const TagBadge = ({ tag, hot }: { tag: string; hot?: boolean }) => (
  <span className={cn(
    'text-[9px] font-extrabold px-2.5 py-0.5 rounded-full tracking-wider uppercase inline-flex items-center gap-1 border',
    hot 
      ? 'bg-rose-50 text-rose-700 border-rose-200/60' 
      : 'bg-slate-50 text-slate-650 border-slate-200/60'
  )}>
    {hot && <Flame size={10} className="fill-rose-700 text-rose-700 animate-pulse" />}{tag}
  </span>
)

const ArticleCard = ({ article, streamName, courseId }: { article: Article; streamName: string; courseId: string }) => {
  return (
    <LeadGate 
      collegeName={article.title} 
      stream={streamName}
      targetUrl={`/articles/${article.id}`}
    >
      <article className="group bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full">
        <div className="aspect-video overflow-hidden relative bg-slate-100 shrink-0">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-4 left-4 flex gap-1.5 z-10">
            <TagBadge tag={article.tag} hot={article.isHot} />
          </div>
          <div className="absolute top-4 right-4 z-10">
            <LevelBadge level={article.level} courseId={courseId} />
          </div>
        </div>
        <div className="p-6 flex flex-col flex-1 justify-between">
          <div>
            <p className="text-[10px] font-black text-sky-600 tracking-widest uppercase mb-2">
              {article.category}
            </p>
            <h3 className="text-base font-extrabold text-slate-900 leading-snug mb-3 group-hover:text-sky-600 transition-colors line-clamp-2">
              {article.title}
            </h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6 line-clamp-2">
              {article.excerpt}
            </p>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center text-white text-[10px] font-extrabold shadow-sm">
                {article.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-800 leading-tight">{article.author}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{article.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-slate-400 font-medium">
              <span className="flex items-center gap-1">
                <Clock size={11} />{article.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Eye size={11} />{article.views}
              </span>
            </div>
          </div>
        </div>
      </article>
    </LeadGate>
  )
}

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialItem }) => (
  <div className="bg-white border border-slate-100 rounded-3xl p-8 flex flex-col hover:shadow-md transition-all duration-300">
    <div className="flex gap-0.5 mb-5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
      ))}
    </div>
    <p className="text-slate-600 text-sm leading-relaxed italic mb-6 flex-1">
      "{testimonial.quote}"
    </p>
    <div className="flex items-center gap-3 mt-auto">
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center text-white text-xs font-extrabold shadow-sm">
        {testimonial.avatar}
      </div>
      <div>
        <p className="text-xs font-bold text-slate-900 leading-snug">{testimonial.name}</p>
        <p className="text-[10px] text-slate-400">{testimonial.detail}</p>
      </div>
    </div>
  </div>
)

// ─── Reusable Course Hub Template Component ───────────────────────────────────

export default function CourseHubTemplate({
  courseId,
  streamName,
  hubName,
  heroTitle,
  heroGradient,
  heroSubtitle,
  searchPlaceholder,
  trendingTopics,
  stats,
  journeyLevels,
  freeResources,
  testimonials,
  specialties,
  specialtiesTitle,
  specialtiesSubtitle,
  studentVisual
}: CourseHubTemplateProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeLevel, setActiveLevel] = useState<string | null>(null)
  const [activeToolIndex, setActiveToolIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(8)
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)

  // Map categories filters list dynamically based on courseId
  // In database, the main category might be btech, mba, mbbs, mtech, bds, bsc-nursing etc.
  const categoriesList = [
    { id: 'all', label: 'All Articles', icon: Layers },
    { id: 'admission', label: courseId === 'mba' ? 'B-School Admission' : 'Admission Guide', icon: GraduationCap },
    { id: 'branches', label: courseId === 'mba' ? 'MBA Specializations' : courseId === 'mbbs' || courseId === 'bds' ? 'Clinical Fields' : 'Course Specialties', icon: Code },
    { id: 'colleges', label: courseId === 'mba' ? 'B-School Reviews' : 'College Reviews', icon: Building },
    { id: 'exams', label: courseId === 'mba' ? 'CAT & Entrance' : courseId === 'mbbs' || courseId === 'bds' ? 'NEET & Medical' : 'Entrance Exams', icon: FileText },
    { id: 'career', label: 'Careers & Salaries', icon: Briefcase },
    { id: 'campus', label: 'Campus Life', icon: Users },
  ]

  useEffect(() => {
    async function loadArticles() {
      try {
        setIsLoading(true)
        const dbCategory = courseId === 'bsc-nursing' ? 'bsc nursing' : courseId
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('category', dbCategory)
          .order('created_at', { ascending: false })

        if (error) throw error
        
        if (data) {
          const mappedArticles: Article[] = data.map(item => ({
            id: item.id,
            title: item.title,
            excerpt: item.excerpt,
            category: item.sub_category || item.category,
            tag: item.tag || '',
            readTime: item.read_time || '',
            date: item.date || '',
            author: item.author || '',
            authorRole: item.author_role || '',
            views: item.views || '0',
            image: item.image || '',
            isHot: item.is_hot,
            isFeatured: item.is_featured,
            level: item.level || 'beginner'
          }))
          setArticles(mappedArticles)
        }
      } catch (err: any) {
        console.error(`[Supabase] Error loading ${courseId} articles:`, err)
        setFetchError(err.message || 'Failed to connect to database')
      } finally {
        setIsLoading(false)
      }
    }
    loadArticles()
  }, [courseId])

  const filteredArticles = articles.filter(a => {
    const activeCategoryLabel = categoriesList.find(c => c.id === activeCategory)?.label || ''
    
    // Fuzzy matching for category types
    const catMatch = activeCategory === 'all' || 
      a.category.toLowerCase().includes(activeCategoryLabel.toLowerCase().replace(' articles', '').replace(' & entrance', '').replace(' admission', '').trim()) ||
      activeCategoryLabel.toLowerCase().includes(a.category.toLowerCase().trim())
      
    const levelMatch = !activeLevel || a.level === activeLevel
    const searchMatch = !searchQuery || 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    
    return catMatch && levelMatch && searchMatch
  })

  const featuredArticles = articles.filter(a => a.isFeatured)

  return (
    <main className="min-h-screen bg-slate-50/50 text-slate-800 relative font-sans">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-200/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-[120px] -z-10 pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="text-[10px] font-black text-sky-600 tracking-[0.25em] uppercase animate-pulse">
                  {hubName}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[62px] font-black text-slate-900 leading-[1.08] tracking-tighter mb-6">
                {heroTitle} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-teal-500 to-indigo-600">
                  {heroGradient}
                </span>
              </h1>

              <p className="text-slate-500 text-base md:text-lg max-w-xl leading-relaxed mb-10 font-medium">
                {heroSubtitle}
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl shadow-lg shadow-slate-150/20 rounded-2xl border border-slate-100 bg-white p-2 flex items-center gap-2 mb-10 hover:border-slate-200 transition-all duration-300">
                <Search size={18} className="text-slate-400 ml-3 shrink-0" />
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full text-slate-800 bg-transparent text-sm placeholder:text-slate-400 focus:outline-none py-3"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-xs font-bold text-slate-400 hover:text-slate-650 px-2"
                  >
                    Clear
                  </button>
                )}
                <button className="bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs uppercase tracking-[0.1em] px-6 py-3.5 rounded-xl transition-all duration-200 shrink-0">
                  Go
                </button>
              </div>

              {/* Trending tags */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] text-slate-450 font-extrabold uppercase tracking-wider mr-2">
                  Trending:
                </span>
                {trendingTopics.map(t => (
                  <button
                    key={t}
                    onClick={() => setSearchQuery(t)}
                    className="text-xs px-4 py-2 rounded-full border border-slate-150/70 text-slate-650 bg-white hover:border-slate-350 hover:shadow-sm transition-all duration-200 font-semibold"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Visual Container with Student Image & Floating Cards */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[400px] aspect-[4/5] bg-slate-900 rounded-[40px] shadow-2xl overflow-visible p-3 flex items-end">
                <div className="absolute inset-0 rounded-[40px] overflow-hidden m-3">
                  <img
                    src={studentVisual.imageUrl}
                    alt="Course Student"
                    className="w-full h-full object-cover filter brightness-[0.9] contrast-[1.02]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none" />
                </div>

                <div className="absolute bottom-6 inset-x-0 text-center z-20 px-6 pointer-events-none">
                  <p className="text-white/60 text-[9px] font-black uppercase tracking-[0.2em] mb-0.5">
                    {studentVisual.overlayText}
                  </p>
                  <p className="text-white text-xs font-bold tracking-wide">
                    {studentVisual.overlaySub}
                  </p>
                </div>

                {/* Floating Badge 1: Top Left */}
                <div className="absolute -left-10 top-12 bg-white border border-slate-100 rounded-2xl p-4 shadow-xl w-48 hover:scale-105 transition-transform duration-300 z-30">
                  <span className="text-[8px] font-black tracking-widest text-sky-600 uppercase block mb-1">Career Goal</span>
                  <span className="text-slate-800 text-xs font-extrabold block">{studentVisual.goalTitle}</span>
                  <span className="text-slate-400 text-[10px] font-semibold block mt-0.5">{studentVisual.avatarName}</span>
                </div>

                {/* Floating Badge 2: Bottom Right */}
                <div className="absolute -right-6 bottom-20 bg-white border border-slate-100 rounded-2xl p-4 shadow-xl w-44 hover:scale-105 transition-transform duration-300 z-30">
                  <span className="text-[8px] font-black tracking-widest text-emerald-600 uppercase block mb-1">Active Prep</span>
                  <span className="text-slate-800 text-xs font-extrabold block">{studentVisual.activePrepLabel}</span>
                  <span className="text-slate-400 text-[10px] font-semibold block mt-0.5">Choice Order Locked</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-slate-200/50">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <s.icon size={15} className="text-sky-500" />
                  <span className="text-2xl font-extrabold text-slate-900 leading-none">
                    {s.value}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOURNEY (TIMELINE FORMAT) ─────────────────────────────────────────── */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="mb-16">
            <span className="text-[10px] font-black text-sky-600 tracking-[0.25em] uppercase mb-2 block">
              CHRONOLOGICAL TIMELINE
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
              The {streamName} Lifecycle
            </h2>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl leading-relaxed font-medium">
              A comprehensive progression track mapping out your study stages and checkpoints from foundation to launching your industry career.
            </p>
          </div>

          <div className="relative border-l border-slate-150 ml-4 md:ml-8 space-y-16 py-4">
            {journeyLevels.map((jl, index) => {
              const JourneyIcon = jl.icon
              const isSelected = activeLevel === jl.level
              return (
                <div 
                  key={jl.level} 
                  onClick={() => setActiveLevel(isSelected ? null : jl.level)}
                  className="relative pl-8 md:pl-12 group cursor-pointer transition-all duration-300"
                >
                  {/* Timeline bullet line node */}
                  <div className={cn(
                    "absolute -left-[17px] top-1.5 w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-sm transition-all duration-300",
                    isSelected 
                      ? "bg-slate-900 border-slate-900 text-white scale-110" 
                      : "bg-white border-sky-500 text-sky-600 group-hover:bg-slate-900 group-hover:border-slate-900 group-hover:text-white"
                  )}>
                    <JourneyIcon size={13} />
                  </div>

                  <div className={cn(
                    "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start rounded-3xl p-6 md:p-8 border transition-all duration-300",
                    isSelected 
                      ? "bg-slate-900 text-white border-slate-900 shadow-xl" 
                      : "bg-transparent border-transparent hover:bg-slate-50/50 hover:border-slate-100"
                  )}>
                    <div className="lg:col-span-4">
                      <span className={cn(
                        "text-[9px] font-black tracking-widest uppercase mb-1.5 block",
                        isSelected ? "text-sky-400" : "text-sky-600"
                      )}>
                        Stage 0{index + 1} • {jl.subtitle}
                      </span>
                      <h3 className={cn("text-lg md:text-xl font-extrabold mb-3", isSelected ? "text-white" : "text-slate-900")}>
                        {jl.title}
                      </h3>
                      <span className={cn(
                        "text-[9px] font-black px-2.5 py-0.5 rounded-full border whitespace-nowrap uppercase tracking-wider",
                        isSelected 
                          ? "bg-white/10 text-white border-white/20" 
                          : "bg-slate-100 text-slate-650 border-slate-200"
                      )}>
                        {jl.articles} Focus Guides
                      </span>
                    </div>

                    <div className="lg:col-span-8 space-y-4">
                      <p className={cn("text-sm leading-relaxed font-bold", isSelected ? "text-slate-100" : "text-slate-800")}>
                        {jl.description}
                      </p>
                      <p className={cn("text-xs md:text-sm leading-relaxed font-medium", isSelected ? "text-slate-355" : "text-slate-500")}>
                        {jl.extendedInfo}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {jl.topics.map(t => (
                          <span 
                            key={t} 
                            className={cn(
                              "text-[10px] px-3 py-1 rounded-full border font-semibold whitespace-nowrap",
                              isSelected 
                                ? "bg-white/5 border-white/10 text-slate-355" 
                                : "bg-white border-slate-100 text-slate-550"
                            )}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── RESOURCES (SPLIT TOOLKIT PANEL) ──────────────────────────────────── */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="mb-16 text-center lg:text-left">
            <span className="text-[10px] font-black text-sky-600 tracking-[0.25em] uppercase mb-3 block">
              PREPARATION RESOURCE CENTER
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Interactive {streamName} Tools
            </h2>
            <p className="text-slate-500 text-sm md:text-base max-w-xl leading-relaxed mt-2 font-medium">
              Select a utility resource from the interactive manager panel to preview its comprehensive features and download options.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Selection Column */}
            <div className="lg:col-span-5 flex flex-col gap-3 justify-center">
              {freeResources.map((res, i) => {
                const ToolIcon = res.icon
                const isActive = activeToolIndex === i
                return (
                  <button
                    key={i}
                    onClick={() => setActiveToolIndex(i)}
                    className={cn(
                      "w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-center gap-4",
                      isActive 
                        ? "bg-white border-slate-200 shadow-lg -translate-x-1" 
                        : "bg-transparent border-transparent hover:bg-white/40 hover:border-slate-100"
                    )}
                  >
                    <div className={cn(
                      "p-3 rounded-xl border flex items-center justify-center shrink-0 shadow-sm transition-all duration-300",
                      isActive ? "bg-slate-900 border-slate-900 text-white" : "bg-white border-slate-100 text-sky-500"
                    )}>
                      <ToolIcon size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 mb-0.5">{res.title}</h3>
                      <p className="text-slate-500 text-xs line-clamp-1">{res.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Right Display Panel */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-150/10 flex flex-col justify-between h-full relative overflow-hidden">
                <div className="absolute -right-16 -top-16 w-48 h-48 bg-sky-100/30 rounded-full blur-3xl pointer-events-none" />

                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[10px] font-black text-sky-600 tracking-wider uppercase bg-sky-50 border border-sky-100 px-3 py-1 rounded-full">
                      Active Toolkit Component
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 mb-3">
                    {freeResources[activeToolIndex].title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8">
                    {freeResources[activeToolIndex].description}
                  </p>

                  <div className="mb-8">
                    <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-4">What's included:</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {freeResources[activeToolIndex].benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-slate-650 font-medium">
                          <CheckCircle size={13} className="text-sky-500 mt-0.5 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <LeadGate 
                  collegeName={freeResources[activeToolIndex].title} 
                  stream={streamName}
                  mode="brochure"
                >
                  <button className={cn(
                    "px-8 py-4 text-white border-none rounded-xl text-xs font-bold tracking-[0.1em] uppercase flex items-center gap-2 w-fit transition-all duration-300 shadow-md",
                    freeResources[activeToolIndex].colorClass
                  )}>
                    {freeResources[activeToolIndex].cta} <ArrowRight size={14} />
                  </button>
                </LeadGate>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTICLES (INSIGHTS SECTION) ───────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-2">
              <Star size={18} className="fill-amber-400 text-amber-400" />
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Editor's Picks
              </h2>
            </div>
            <Link 
              href="/articles" 
              className="group inline-flex items-center gap-1 text-xs font-bold text-sky-600 uppercase tracking-widest hover:text-sky-700 transition-colors"
            >
              View All <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Featured Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
            {isLoading ? (
              <>
                <div className="lg:col-span-2 rounded-3xl bg-slate-50 min-h-[400px] animate-pulse" />
                <div className="rounded-3xl bg-slate-50 min-h-[400px] animate-pulse" />
              </>
            ) : (
              <>
                {/* Large Featured Card */}
                {featuredArticles.length > 0 && (
                  <div className="lg:col-span-2">
                    <LeadGate 
                      collegeName={featuredArticles[0].title} 
                      stream={streamName}
                      targetUrl={`/articles/${featuredArticles[0].id}`}
                    >
                      <article className="group relative rounded-3xl overflow-hidden cursor-pointer bg-slate-950 min-h-[460px] h-full flex flex-col justify-end p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300">
                        <img 
                          src={featuredArticles[0].image} 
                          alt={featuredArticles[0].title}
                          className="w-full h-full object-cover opacity-50 group-hover:scale-102 group-hover:opacity-60 transition-all duration-700 absolute inset-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />
                        
                        <div className="relative z-10">
                          <div className="flex flex-wrap gap-2 mb-4">
                            <TagBadge tag={featuredArticles[0].tag || 'Featured'} hot={featuredArticles[0].isHot} />
                            <LevelBadge level={featuredArticles[0].level} courseId={courseId} />
                          </div>
                          
                          <p className="text-[10px] font-black text-sky-400 tracking-widest uppercase mb-2">
                            {featuredArticles[0].category}
                          </p>
                          
                          <h3 className="text-xl md:text-3xl font-extrabold text-white leading-tight mb-4 group-hover:text-sky-350 transition-colors line-clamp-2">
                            {featuredArticles[0].title}
                          </h3>
                          
                          <p className="text-slate-355 text-xs md:text-sm leading-relaxed mb-6 max-w-2xl line-clamp-2">
                            {featuredArticles[0].excerpt}
                          </p>

                          <div className="flex items-center justify-between pt-6 border-t border-white/10">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white text-[10px] font-bold">
                                {featuredArticles[0].author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </div>
                              <div>
                                <p className="text-[11px] font-bold text-white leading-tight">{featuredArticles[0].author}</p>
                                <p className="text-[10px] text-white/50 mt-0.5">{featuredArticles[0].date}</p>
                              </div>
                            </div>
                            <div className="flex gap-4 text-[10px] text-white/60 font-medium">
                              <span className="flex items-center gap-1">
                                <Clock size={11} />{featuredArticles[0].readTime}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye size={11} />{featuredArticles[0].views}
                              </span>
                            </div>
                          </div>
                        </div>
                      </article>
                    </LeadGate>
                  </div>
                )}

                {/* Second Featured Card */}
                {featuredArticles.length > 1 && (
                  <div>
                    <LeadGate 
                      collegeName={featuredArticles[1].title} 
                      stream={streamName}
                      targetUrl={`/articles/${featuredArticles[1].id}`}
                    >
                      <article className="group relative rounded-3xl overflow-hidden cursor-pointer bg-slate-950 min-h-[460px] h-full flex flex-col justify-end p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                        <img 
                          src={featuredArticles[1].image} 
                          alt={featuredArticles[1].title}
                          className="w-full h-full object-cover opacity-50 group-hover:scale-102 group-hover:opacity-60 transition-all duration-700 absolute inset-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />
                        
                        <div className="relative z-10">
                          <div className="flex flex-wrap gap-2 mb-4">
                            <TagBadge tag={featuredArticles[1].tag || 'Featured'} hot={featuredArticles[1].isHot} />
                            <LevelBadge level={featuredArticles[1].level} courseId={courseId} />
                          </div>
                          
                          <p className="text-[10px] font-black text-sky-400 tracking-widest uppercase mb-2">
                            {featuredArticles[1].category}
                          </p>
                          
                          <h3 className="text-xl font-extrabold text-white leading-snug mb-3 group-hover:text-sky-355 transition-colors line-clamp-2">
                            {featuredArticles[1].title}
                          </h3>
                          
                          <p className="text-slate-355 text-xs leading-relaxed mb-6 line-clamp-2">
                            {featuredArticles[1].excerpt}
                          </p>

                          <div className="flex items-center justify-between pt-6 border-t border-white/10">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white text-[9px] font-bold">
                                {featuredArticles[1].author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </div>
                              <div>
                                <p className="text-[10px] font-bold text-white leading-tight">{featuredArticles[1].author}</p>
                                <p className="text-[9px] text-white/50 mt-0.5">{featuredArticles[1].date}</p>
                              </div>
                            </div>
                            <span className="text-[9px] text-white/60 font-semibold">{featuredArticles[1].readTime}</span>
                          </div>
                        </div>
                      </article>
                    </LeadGate>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Regular Insights Section */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
              {streamName} Insights
            </h2>
            <p className="text-slate-500 text-xs md:text-sm font-medium">
              Filter articles by category or click on the tags to customize your feed.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar justify-start md:justify-center">
            {categoriesList.map(cat => {
              const isActive = activeCategory === cat.id
              const Icon = cat.icon
              return (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setVisibleCount(8); }}
                  className={cn(
                    "flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 border",
                    isActive 
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm" 
                      : "bg-white hover:bg-slate-50 text-slate-650 border-slate-150/70 hover:border-slate-200"
                  )}
                >
                  <Icon size={13} />
                  {cat.label}
                </button>
              )
            })}
          </div>

          {/* Article Cards Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-3xl bg-slate-50 min-h-[340px]" />
              ))}
            </div>
          ) : (
            <>
              {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredArticles.slice(0, visibleCount).map(a => (
                    <ArticleCard key={a.id} article={a} streamName={streamName} courseId={courseId} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200/60 max-w-lg mx-auto">
                  <Search size={32} className="mx-auto text-slate-300 mb-4" />
                  <h3 className="text-base font-bold text-slate-800 mb-1">No articles found</h3>
                  <p className="text-xs text-slate-400">Try adjusting your category or search query.</p>
                </div>
              )}
              
              {filteredArticles.length > visibleCount && (
                <div className="text-center mt-12">
                  <button
                    onClick={() => setVisibleCount(prev => prev + 8)}
                    className="px-10 py-4 bg-white border border-slate-150 hover:border-slate-250 hover:shadow-sm text-slate-850 font-bold rounded-2xl text-xs uppercase tracking-widest transition-all duration-200"
                  >
                    Load More Articles
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50/30 border-t border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <span className="text-[10px] font-black text-sky-600 tracking-[0.25em] uppercase mb-3 block">
              STUDENT CORNER
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Verified Student Stories
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SPECIALTIES COMPARISON TABULAR MATRIX ──────────────────────────────── */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="mb-16 text-center lg:text-left">
            <span className="text-[10px] font-black text-sky-600 tracking-[0.25em] uppercase mb-3 block">
              SPECIALIZATION & FIELD MATRIX
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              {specialtiesTitle}
            </h2>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl leading-relaxed mt-2 font-medium">
              {specialtiesSubtitle}
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-100 rounded-3xl bg-white shadow-xl shadow-slate-100/30">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-150">
                  <th className="p-6 text-xs font-black uppercase text-slate-400 tracking-wider w-1/5">Field / Specialization</th>
                  <th className="p-6 text-xs font-black uppercase text-slate-400 tracking-wider w-2/5">Core Focus & Knowledge</th>
                  <th className="p-6 text-xs font-black uppercase text-slate-400 tracking-wider w-1/5">Typical Career Pathways</th>
                  <th className="p-6 text-xs font-black uppercase text-slate-400 tracking-wider w-1/5">Top Placement Recruiters</th>
                </tr>
              </thead>
              <tbody>
                {specialties.map((g, i) => {
                  const SpecialtyIcon = g.icon
                  return (
                    <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors last:border-0">
                      <td className="p-6">
                        <div className="flex items-center gap-3.5">
                          <div className={cn(
                            "p-2.5 rounded-xl border flex items-center justify-center shrink-0 shadow-sm",
                            g.textClass, "bg-white border-slate-100"
                          )}>
                            <SpecialtyIcon size={16} />
                          </div>
                          <div>
                            <span className="text-sm font-extrabold text-slate-900 block">{g.title}</span>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wide">{g.count}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
                          {g.description}
                        </p>
                      </td>
                      <td className="p-6">
                        <span className="text-slate-800 text-xs font-semibold leading-relaxed block">
                          {g.scope}
                        </span>
                      </td>
                      <td className="p-6">
                        <span className="text-slate-550 text-xs font-semibold block">
                          {g.recruiters}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
