'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { supabase } from '@/lib/supabase'
import {
  ArrowRight, BookOpen, Clock, Eye, TrendingUp, Star,
  ChevronRight, Search, Filter, Tag, Users, Flame,
  GraduationCap, Code, Briefcase, FlaskConical, Globe,
  Cpu, BarChart3, Layers, Award, Zap, MessageCircle,
  Calendar, User, ArrowUpRight, Bookmark, Share2,
  ChevronDown, Play, FileText, Hash, Trophy, Target,
  Lightbulb, Building, MapPin, DollarSign, CheckCircle, Sparkles,
  Compass, Send
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────

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

type ResourceCard = {
  icon: string
  title: string
  description: string
  cta: string
  color: string
  bg: string
  border: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: 'all', label: 'All Articles', icon: Layers, count: 240 },
  { id: 'admission', label: 'Admission Guide', icon: GraduationCap, count: 48 },
  { id: 'branches', label: 'Branch Deep-Dives', icon: Code, count: 36 },
  { id: 'colleges', label: 'Institute Reviews', icon: Building, count: 52 },
  { id: 'exams', label: 'GATE & Entrance', icon: FileText, count: 29 },
  { id: 'career', label: 'Careers & Salaries', icon: Briefcase, count: 44 },
  { id: 'campus', label: 'Campus Life', icon: Users, count: 31 },
]

const LEVEL_CONFIG: Record<string, { label: string; color: string; bg: string; ring: string }> = {
  beginner: { label: 'B.Tech Base', color: '#10b981', bg: '#ecfdf5', ring: '#a7f3d0' },
  intermediate: { label: 'GATE Prep', color: '#0ea5e9', bg: '#f0f9ff', ring: '#bae6fd' },
  advanced: { label: 'M.Tech Build', color: '#8b5cf6', bg: '#f5f3ff', ring: '#ddd6fe' },
  expert: { label: 'Research/Industry', color: '#f59e0b', bg: '#fffbeb', ring: '#fde68a' },
}

const FEATURED_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'The Ultimate M.Tech Admission Guide 2026: From GATE to Your Dream Institute',
    excerpt: 'Everything you need to know — GATE strategy, COAP & CCMT counseling rounds, cutoff trends, and how to build your institute preference list smartly.',
    category: 'Admission Guide',
    tag: 'Must Read',
    readTime: '18 min read',
    date: 'Apr 20, 2026',
    author: 'Ritesh Rastogi',
    authorRole: 'MD & Founder',
    views: '1.2L',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop',
    isHot: true,
    isFeatured: true,
    level: 'beginner',
  },
  {
    id: '2',
    title: 'M.Tech CSE vs AI vs Data Science: Which Specialization Has the Best ROI in 2026?',
    excerpt: 'A data-driven comparison of placements, salaries, research scope, and demand across top M.Tech specializations.',
    category: 'Branch Deep-Dives',
    tag: 'Data Report',
    readTime: '14 min read',
    date: 'Apr 18, 2026',
    author: 'Aman Rastogi',
    authorRole: 'Managing Director',
    views: '87K',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
    isFeatured: true,
    level: 'beginner',
  },
  {
    id: '3',
    title: 'IIT vs NIT for M.Tech: An Honest 2026 Comparison',
    excerpt: 'Faculty, research labs, stipends, placements, and which institute tier makes the most sense for your GATE score.',
    category: 'Institute Reviews',
    tag: 'Deep Analysis',
    readTime: '22 min read',
    date: 'Apr 15, 2026',
    author: 'Somnath Ghosh',
    authorRole: 'Head of Operations',
    views: '2.1L',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop',
    isHot: true,
    isFeatured: true,
    level: 'beginner',
  },
]

const ARTICLES: Article[] = [
  {
    id: '4',
    title: 'GATE 2026 Paper Analysis: Subject-wise Difficulty & Score Predictor',
    excerpt: 'Detailed breakdown with expected cutoffs for IITs, NITs, and rank prediction.',
    category: 'GATE & Entrance',
    tag: 'Breaking',
    readTime: '8 min',
    date: 'Apr 21, 2026',
    author: 'Prothoma Ghosh',
    authorRole: 'Head Tele-Counselor',
    views: '56K',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop',
    isHot: true,
    level: 'beginner',
  },
  {
    id: '5',
    title: 'Top M.Tech Colleges in India 2026: IITs, NITs & Beyond',
    excerpt: 'Placement stats, stipend details, and research infrastructure comparison.',
    category: 'Institute Reviews',
    tag: 'Rankings',
    readTime: '12 min',
    date: 'Apr 19, 2026',
    author: 'Ritu Choudhury',
    authorRole: 'Media Head',
    views: '1.4L',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop',
    level: 'beginner',
  },
  {
    id: '6',
    title: 'AI & Machine Learning in M.Tech: Is It Worth It in 2026?',
    excerpt: 'Analyzing the curriculum, research funding, and industrial application of AI in higher ed.',
    category: 'Branch Deep-Dives',
    tag: 'Trending',
    readTime: '10 min',
    date: 'Apr 17, 2026',
    author: 'Aman Rastogi',
    authorRole: 'Managing Director',
    views: '94K',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=600&auto=format&fit=crop',
    isHot: true,
    level: 'intermediate',
  },
  {
    id: '7',
    title: 'CCMT & COAP Counseling 2026: Complete Strategy Guide',
    excerpt: 'Step-by-step navigation through the M.Tech admission counseling process.',
    category: 'Admission Guide',
    tag: 'Strategy',
    readTime: '15 min',
    date: 'Apr 16, 2026',
    author: 'Ritesh Rastogi',
    authorRole: 'MD & Founder',
    views: '78K',
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=600&auto=format&fit=crop',
    level: 'intermediate',
  },
  {
    id: '8',
    title: 'M.Tech Salary in India 2026: IIT vs NIT vs Private',
    excerpt: 'CTC breakdown for post-graduate engineers across different sectors.',
    category: 'Careers & Salaries',
    tag: 'Data',
    readTime: '11 min',
    date: 'Apr 14, 2026',
    author: 'Somnath Ghosh',
    authorRole: 'Head of Operations',
    views: '2.8L',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop',
    level: 'advanced',
  },
  {
    id: '9',
    title: 'First Year M.Tech Survival Guide: What No One Tells You',
    excerpt: 'Managing course work, teaching assistantships, and beginning your research.',
    category: 'Campus Life',
    tag: 'Guide',
    readTime: '9 min',
    date: 'Apr 12, 2026',
    author: 'Prothoma Ghosh',
    authorRole: 'Head Tele-Counselor',
    views: '1.1L',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=600&auto=format&fit=crop',
    level: 'advanced',
  },
  {
    id: '10',
    title: 'M.Tech vs Job After B.Tech: What Pays More?',
    excerpt: 'A multi-year analysis of earnings potential for B.Tech vs M.Tech paths.',
    category: 'Careers & Salaries',
    tag: 'Analysis',
    readTime: '13 min',
    date: 'Apr 11, 2026',
    author: 'Aman Rastogi',
    authorRole: 'Managing Director',
    views: '67K',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    level: 'expert',
  },
  {
    id: '11',
    title: 'Research vs Industry: Career Paths After M.Tech',
    excerpt: 'Choosing between a corporate job, PSU role, or pursuing a PhD.',
    category: 'Careers & Salaries',
    tag: 'Career Map',
    readTime: '16 min',
    date: 'Apr 9, 2026',
    author: 'Ritu Choudhury',
    authorRole: 'Media Head',
    views: '1.9L',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
    level: 'expert',
  },
  {
    id: '12',
    title: 'M.Tech + PhD Integrated Programs: Are They Worth It?',
    excerpt: 'Detailed look at MS-PhD dual degrees in IITs and leading private institutes.',
    category: 'Admission Guide',
    tag: 'Special',
    readTime: '10 min',
    date: 'Apr 7, 2026',
    author: 'Ritesh Rastogi',
    authorRole: 'MD & Founder',
    views: '45K',
    image: 'https://images.unsplash.com/photo-1613312328068-c9b6b76c9e8a?q=80&w=600&auto=format&fit=crop',
    level: 'intermediate',
  },
]

const JOURNEY_LEVELS = [
  {
    level: 'beginner' as const,
    title: 'B.Tech Student',
    subtitle: 'The Base',
    description: 'Understanding M.Tech, GATE basics, and planning early.',
    articles: 48,
    icon: '🌱',
    topics: ['Why M.Tech?', 'GATE Overview', 'B.Tech CGPA Importance', 'Research Mindset', 'Goal Setting'],
  },
  {
    level: 'intermediate' as const,
    title: 'GATE Aspirant',
    subtitle: 'The Grind',
    description: 'Preparation strategy, mock tests, and subject mastery.',
    articles: 64,
    icon: '⚡',
    topics: ['Syllabus Breakdown', 'Best Books', 'Revision Strategy', 'Mock Test Analysis', 'Time Management'],
  },
  {
    level: 'advanced' as const,
    title: 'M.Tech Student',
    subtitle: 'The Build',
    description: 'Research work, thesis, internships, and specialization.',
    articles: 71,
    icon: '🔬',
    topics: ['Literature Review', 'Thesis Writing', 'Lab Work', 'TA Duties', 'Publication Guide'],
  },
  {
    level: 'expert' as const,
    title: 'Post M.Tech',
    subtitle: 'The Launch',
    description: 'Placements, PhD, research careers, and industry roles.',
    articles: 57,
    icon: '🚀',
    topics: ['Industry Placements', 'PhD in India/Abroad', 'Research Labs', 'PSU through GATE', 'Entrepreneurship'],
  },
]

const TRENDING_TOPICS = [
  'GATE 2026', 'IIT M.Tech', 'COAP', 'CCMT',
  'AI M.Tech', 'GATE Cutoff', 'Research Careers', 'PhD India',
]

const STATS = [
  { value: '240+', label: 'Expert Articles', icon: FileText },
  { value: '2.8L+', label: 'Monthly Readers', icon: Users },
  { value: '50+', label: 'Institute Reviews', icon: Building },
  { value: '15+', label: 'Years of Data', icon: BarChart3 },
]

const FREE_RESOURCES: ResourceCard[] = [
  {
    icon: '📋',
    title: 'Institute Preference Tool',
    description: 'Rank IITs and NITs based on your GATE score, specialization interest, and stipend.',
    cta: 'Build Your List',
    color: '#0284c7',
    bg: '#f0f9ff',
    border: '#bae6fd',
  },
  {
    icon: '📊',
    title: 'Cutoff Analyzer 2025',
    description: 'Download previous year GATE cutoffs for all top institutes in one click.',
    cta: 'Download Excel',
    color: '#059669',
    bg: '#ecfdf5',
    border: '#a7f3d0',
  },
  {
    icon: '🎯',
    title: 'Specialization Quiz',
    description: 'Recommendations based on your B.Tech branch and career aspirations.',
    cta: 'Take Quiz',
    color: '#7c3aed',
    bg: '#f5f3ff',
    border: '#ddd6fe',
  },
  {
    icon: '📝',
    title: 'COAP/CCMT Checklist',
    description: 'Comprehensive checklist for M.Tech counseling documents and timelines.',
    cta: 'Get Checklist',
    color: '#d97706',
    bg: '#fffbeb',
    border: '#fde68a',
  },
]

const TESTIMONIALS = [
  {
    quote: "This blog guided my M.Tech journey from GATE prep to IIT admission.",
    name: "Sandeep Kumar",
    detail: "IIT Bombay, M.Tech CSE '27",
    avatar: "SK",
  },
  {
    quote: "The specialization guide helped me choose AI over traditional Data Science. Best career move.",
    name: "Megha Jain",
    detail: "IISc Bangalore, Research '26",
    avatar: "MJ",
  },
  {
    quote: "The COAP strategy guide was a life-saver during the frantic counseling rounds.",
    name: "Vikram Singh",
    detail: "IIT Delhi, EE '28",
    avatar: "VS",
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

const LevelBadge = ({ level }: { level: Article['level'] }) => {
  const cfg = LEVEL_CONFIG[level]
  return (
    <span style={{
      fontSize: '10px', fontWeight: 700, padding: '3px 10px',
      borderRadius: '99px', letterSpacing: '0.08em',
      color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.ring}`,
    }}>
      {cfg.label}
    </span>
  )
}

const TagBadge = ({ tag, hot }: { tag: string; hot?: boolean }) => (
  <span style={{
    fontSize: '10px', fontWeight: 800, padding: '3px 10px',
    borderRadius: '99px', letterSpacing: '0.1em', textTransform: 'uppercase',
    background: hot ? '#fee2e2' : '#f1f5f9',
    color: hot ? '#dc2626' : '#475569',
    display: 'inline-flex', alignItems: 'center', gap: '4px',
  }}>
    {hot && <Flame size={9} />}{tag}
  </span>
)

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <article
      className="group"
      style={{
        background: '#ffffff', borderRadius: '16px', overflow: 'hidden',
        border: '1px solid #e6f2fc', transition: 'all 0.3s',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(14,165,233,0.1)'
          ; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'none'
          ; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
      }}
    >
      <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
        <img src={article.image} alt={article.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }}
          className="group-hover:scale-105"
        />
        <div style={{
          position: 'absolute', top: '12px', left: '12px',
          display: 'flex', gap: '6px',
        }}>
          <TagBadge tag={article.tag} hot={article.isHot} />
        </div>
        <div style={{ position: 'absolute', bottom: '12px', right: '12px' }}>
          <LevelBadge level={article.level} />
        </div>
      </div>
      <div style={{ padding: '20px' }}>
        <p style={{
          fontSize: '10px', fontWeight: 700, color: '#0284c7', letterSpacing: '0.15em',
          textTransform: 'uppercase', marginBottom: '8px'
        }}>
          {article.category}
        </p>
        <h3 style={{
          fontSize: '15px', fontWeight: 700, color: '#0b2b44',
          lineHeight: 1.45, marginBottom: '10px',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}
          className="group-hover:text-sky-600 transition-colors"
        >
          {article.title}
        </h3>
        <p style={{
          fontSize: '13px', color: '#4b6b84', lineHeight: 1.65, marginBottom: '16px',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {article.excerpt}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '11px', fontWeight: 700, color: 'white',
            }}>
              {article.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#0b2b44', lineHeight: 1 }}>{article.author}</p>
              <p style={{ fontSize: '10px', color: '#4b6b84', marginTop: '2px' }}>{article.date}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '11px', color: '#4b6b84', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={11} />{article.readTime}
            </span>
            <span style={{ fontSize: '11px', color: '#4b6b84', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Eye size={11} />{article.views}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

const ResourceCardComponent = ({ resource }: { resource: ResourceCard }) => (
  <div style={{
    background: resource.bg,
    borderRadius: '16px',
    padding: '28px',
    border: `1px solid ${resource.border}`,
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.25s',
    cursor: 'pointer',
  }}
    className="hover:shadow-lg"
    onMouseEnter={e => {
      (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
        ; (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px ${resource.border}`
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
        ; (e.currentTarget as HTMLElement).style.boxShadow = 'none'
    }}
  >
    <div style={{ fontSize: '36px', marginBottom: '16px' }}>{resource.icon}</div>
    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0b2b44', marginBottom: '6px' }}>
      {resource.title}
    </h3>
    <p style={{ fontSize: '13px', color: '#4b6b84', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
      {resource.description}
    </p>
    <button style={{
      padding: '10px 20px',
      background: resource.color,
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '12px',
      fontWeight: 700,
      letterSpacing: '0.03em',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      width: 'fit-content',
      transition: 'all 0.2s',
    }}>
      {resource.cta} <ArrowRight size={14} />
    </button>
  </div>
)

const TestimonialCard = ({ testimonial }: { testimonial: typeof TESTIMONIALS[0] }) => (
  <div style={{
    background: '#ffffff',
    borderRadius: '16px',
    padding: '28px',
    border: '1px solid #e6f2fc',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.25s',
  }}
    className="hover:shadow-md"
  >
    <div style={{ marginBottom: '16px' }}>
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} style={{ fill: '#f59e0b', color: '#f59e0b', marginRight: '2px' }} />
      ))}
    </div>
    <p style={{ fontSize: '14px', color: '#334155', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '20px', flex: 1 }}>
      "{testimonial.quote}"
    </p>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{
        width: '36px', height: '36px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '13px', fontWeight: 700, color: 'white',
      }}>
        {testimonial.avatar}
      </div>
      <div>
        <p style={{ fontSize: '13px', fontWeight: 700, color: '#0b2b44' }}>{testimonial.name}</p>
        <p style={{ fontSize: '11px', color: '#4b6b84' }}>{testimonial.detail}</p>
      </div>
    </div>
  </div>
)

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MtechBlogPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeLevel, setActiveLevel] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(8)
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)

  useEffect(() => {
    async function loadArticles() {
      try {
        setIsLoading(true)
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('category', 'mtech')
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
        console.error('[Supabase] Error loading M.Tech articles:', err)
        setFetchError(err.message || 'Failed to connect to database')
      } finally {
        setIsLoading(false)
      }
    }
    loadArticles()
  }, [])

  const filteredArticles = articles.filter(a => {
    const activeCategoryLabel = CATEGORIES.find(c => c.id === activeCategory)?.label || ''
    
    const catMatch = activeCategory === 'all' || 
      a.category.toLowerCase().includes(activeCategoryLabel.toLowerCase().replace(' articles', '').replace('s', '').trim()) ||
      activeCategoryLabel.toLowerCase().includes(a.category.toLowerCase().trim())
      
    const levelMatch = !activeLevel || a.level === activeLevel
    const searchMatch = !searchQuery || 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    
    return catMatch && levelMatch && searchMatch
  })

  return (
    <main style={{ minHeight: '100vh', background: '#f4f9fd', fontFamily: "'DM Sans', sans-serif", overflowX: 'hidden' }}>
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');
        .font-display { font-family: 'Playfair Display', Georgia, serif; }
        .hero-fade { animation: fadeSlideUp 0.8s cubic-bezier(.16,1,.3,1) both; }
        .hero-fade:nth-child(2) { animation-delay: 0.1s; }
        .hero-fade:nth-child(3) { animation-delay: 0.2s; }
        .hero-fade:nth-child(4) { animation-delay: 0.3s; }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cat-pill { transition: all 0.2s; cursor: pointer; white-space: nowrap; }
        .cat-pill:hover { background: #e0f2fe; color: #0369a1; }
        .level-card { transition: all 0.25s; cursor: pointer; }
        .level-card:hover { transform: translateY(-4px); }
        .search-input:focus { outline: none; border-color: #0ea5e9; box-shadow: 0 0 0 3px rgba(14,165,233,0.1); }
        .tag-chip { transition: all 0.15s; cursor: pointer; }
        .tag-chip:hover { background: #0ea5e9; color: white; border-color: #0ea5e9; }
        .newsletter-input:focus { outline: none; border-color: #0ea5e9; }
        .hover\\:shadow-lg:hover { box-shadow: 0 12px 32px rgba(14,165,233,0.08); }
        .hover\\:shadow-md:hover { box-shadow: 0 8px 24px rgba(14,165,233,0.06); }
        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          width: 100%;
          box-sizing: border-box;
        }
        .section-title {
          font-size: clamp(28px, 4vw, 44px);
          color: #0b2b44;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .responsive-grid-4 {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 24px;
        }
        @media (min-width: 768px) {
          .responsive-grid-4 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .responsive-grid-4 { grid-template-columns: repeat(4, 1fr); }
        }
        .featured-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 1024px) {
          .featured-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 1023px) {
          .featured-hero-card {
            grid-row: auto !important;
            min-height: 400px !important;
          }
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        @media (min-width: 768px) {
          .stats-grid { grid-template-columns: repeat(4, 1fr); gap: 0; }
        }
      ` }} />

      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #e6f2fc 0%, #f0f7ff 50%, #f4f9fd 100%)',
        padding: '140px 0 80px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.03,
          backgroundImage: 'linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div style={{
          position: 'absolute', left: '-100px', top: '50%', transform: 'translateY(-50%)',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)', pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '840px' }}>
            <div className="hero-fade" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <div style={{ width: '36px', height: '1px', background: '#0ea5e9' }} />
              <span style={{
                fontSize: '11px', fontWeight: 700, color: '#0284c7',
                letterSpacing: '0.3em', textTransform: 'uppercase'
              }}>
                M.Tech Knowledge Hub · 240+ Articles
              </span>
            </div>

            <h1 className="font-display hero-fade" style={{
              fontSize: 'clamp(40px, 6vw, 80px)', color: '#0b2b44',
              lineHeight: 0.95, letterSpacing: '-0.02em', marginBottom: '28px',
            }}>
              Mastering Engineering Depth.<br />
              <em style={{ color: '#0284c7' }}>Your Specialization Starts Here.</em>
            </h1>

            <p className="hero-fade" style={{
              fontSize: '17px', color: '#4b6b84', lineHeight: 1.75,
              marginBottom: '40px', maxWidth: '560px',
            }}>
              From cracking GATE to landing top IIT/NIT M.Tech seats — India's most comprehensive M.Tech content platform.
            </p>

            {/* Search bar */}
            <div className="hero-fade" style={{ position: 'relative', maxWidth: '600px', marginBottom: '40px' }}>
              <Search size={18} style={{
                position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)',
                color: '#4b6b84', pointerEvents: 'none',
              }} />
              <input
                className="search-input"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search M.Tech articles..."
                style={{
                  width: '100%', padding: '16px 100px 16px 50px',
                  background: '#ffffff', border: '1px solid #d9ecfa',
                  borderRadius: '12px', fontSize: '14px', color: '#0b2b44',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />
              <button style={{
                position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)',
                padding: '10px 16px', background: '#0ea5e9', color: 'white',
                borderRadius: '8px', fontSize: '12px', fontWeight: 700,
                border: 'none', cursor: 'pointer', letterSpacing: '0.05em',
              }}>
                Go
              </button>
            </div>

            {/* Trending tags */}
            <div className="hero-fade" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: '#4b6b84', fontWeight: 600, alignSelf: 'center', marginRight: '4px' }}>
                Trending:
              </span>
              {TRENDING_TOPICS.map(t => (
                <button
                  key={t}
                  className="tag-chip"
                  onClick={() => setSearchQuery(t)}
                  style={{
                    fontSize: '11px', padding: '5px 14px', borderRadius: '99px',
                    border: '1px solid #d9ecfa', color: '#4b6b84',
                    background: '#ffffff', fontFamily: "'DM Sans', sans-serif",
                    cursor: 'pointer',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="container" style={{ marginTop: '64px', position: 'relative', zIndex: 1 }}>
          <div className="stats-grid" style={{
            borderTop: '1px solid #d9ecfa', paddingTop: '40px',
          }}>
            {STATS.map((s, i) => (
              <div key={i} className="stats-item" style={{
                paddingRight: '32px',
                borderRight: i < STATS.length - 1 ? '1px solid #d9ecfa' : 'none',
                paddingLeft: i > 0 ? '32px' : '0',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <s.icon size={14} style={{ color: '#0284c7' }} />
                  <p style={{
                    fontSize: '26px', fontWeight: 800, color: '#0b2b44',
                    fontFamily: "'Playfair Display', serif", lineHeight: 1
                  }}>
                    {s.value}
                  </p>
                </div>
                <p style={{
                  fontSize: '11px', color: '#4b6b84', fontWeight: 600,
                  letterSpacing: '0.1em', textTransform: 'uppercase'
                }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOURNEY ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: '72px 0', background: '#ffffff', borderBottom: '1px solid #e6f2fc' }}>
        <div className="container">
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '40px', flexWrap: 'wrap', gap: '16px'
          }}>
            <div>
              <p style={{
                fontSize: '11px', fontWeight: 700, color: '#0284c7',
                letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px'
              }}>
                Your Journey
              </p>
              <h2 className="section-title font-display">
                M.Tech Roadmap — B.Tech to Research
              </h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {JOURNEY_LEVELS.map((jl) => {
              const cfg = LEVEL_CONFIG[jl.level]
              const isActive = activeLevel === jl.level
              return (
                <div
                  key={jl.level}
                  className="level-card"
                  onClick={() => setActiveLevel(isActive ? null : jl.level)}
                  style={{
                    padding: '28px', borderRadius: '16px', cursor: 'pointer',
                    border: `1.5px solid ${isActive ? cfg.color : '#e6f2fc'}`,
                    background: isActive ? cfg.bg : '#fafbfc',
                    boxShadow: isActive ? `0 8px 32px ${cfg.ring}` : 'none',
                  }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>{jl.icon}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0b2b44' }}>{jl.title}</h3>
                    <span style={{
                      fontSize: '10px', fontWeight: 700, color: cfg.color,
                      background: cfg.bg, border: `1px solid ${cfg.ring}`,
                      padding: '2px 8px', borderRadius: '99px'
                    }}>
                      {jl.articles} articles
                    </span>
                  </div>
                  <p style={{
                    fontSize: '12px', fontWeight: 600, color: cfg.color,
                    textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px'
                  }}>
                    {jl.subtitle}
                  </p>
                  <p style={{ fontSize: '13px', color: '#4b6b84', lineHeight: 1.6, marginBottom: '16px' }}>
                    {jl.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {jl.topics.slice(0, 3).map(t => (
                      <span key={t} style={{
                        fontSize: '10px', padding: '3px 10px', borderRadius: '99px',
                        background: '#ffffff', border: '1px solid #d9ecfa', color: '#4b6b84', fontWeight: 500,
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── RESOURCES ────────────────────────────────────────────────────────── */}
      <section style={{ padding: '72px 0', background: '#f0f7ff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{
              fontSize: '11px', fontWeight: 700, color: '#0284c7',
              letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px'
            }}>
              Free Tools & Resources
            </p>
            <h2 className="section-title font-display" style={{ marginBottom: '12px' }}>
              Everything you need, <span style={{ color: '#0284c7' }}>completely free</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {FREE_RESOURCES.map((res, i) => (
              <ResourceCardComponent key={i} resource={res} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ARTICLES ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: '72px 0', background: '#ffffff' }}>
        <div className="container">
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '40px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Star size={18} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
              <h2 className="font-display" style={{
                fontSize: 'clamp(22px, 2.5vw, 30px)',
                color: '#0b2b44', letterSpacing: '-0.02em'
              }}>
                Editor's Picks
              </h2>
            </div>
            <Link href="/articles" style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              fontSize: '12px', fontWeight: 700, color: '#0284c7',
              letterSpacing: '0.05em', textTransform: 'uppercase'
            }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="featured-grid" style={{ marginBottom: '20px' }}>
            {/* Large hero card */}
            {isLoading ? (
              <div style={{
                gridRow: 'span 2', borderRadius: '20px', background: '#e6f2fc',
                minHeight: '480px', animation: 'pulse 2s infinite'
              }} />
            ) : articles.filter(a => a.isFeatured).length > 0 && (
              <article className="group featured-hero-card" style={{
                gridRow: 'span 2', borderRadius: '20px', overflow: 'hidden',
                position: 'relative', cursor: 'pointer', background: '#0b2b44',
                minHeight: '480px',
              }}>
                <img src={articles.filter(a => a.isFeatured)[0].image} alt={articles.filter(a => a.isFeatured)[0].title}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6,
                    position: 'absolute', inset: 0, transition: 'transform 0.6s, opacity 0.4s'
                  }}
                  className="group-hover:scale-105 group-hover:opacity-70"
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(11,43,68,0.98) 0%, rgba(11,43,68,0.5) 60%, transparent 100%)',
                }} />
                <div style={{
                  position: 'absolute', inset: 0, padding: '28px',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'
                }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                    <TagBadge tag={articles.filter(a => a.isFeatured)[0].tag || 'Must Read'} hot={articles.filter(a => a.isFeatured)[0].isHot} />
                    <LevelBadge level={articles.filter(a => a.isFeatured)[0].level} />
                  </div>
                  <p style={{
                    fontSize: '11px', fontWeight: 700, color: '#38bdf8',
                    letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '10px'
                  }}>
                    {articles.filter(a => a.isFeatured)[0].category}
                  </p>
                  <h2 className="font-display group-hover:text-sky-300 transition-colors"
                    style={{
                      fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#ffffff',
                      lineHeight: 1.2, letterSpacing: '-0.01em', marginBottom: '12px'
                    }}>
                    {articles.filter(a => a.isFeatured)[0].title}
                  </h2>
                  <p style={{
                    fontSize: '13px', color: '#94a3b8', lineHeight: 1.65, marginBottom: '20px',
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                  }}>
                    {articles.filter(a => a.isFeatured)[0].excerpt}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '28px', height: '28px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '10px', fontWeight: 700, color: 'white', flexShrink: 0
                      }}>
                        {articles.filter(a => a.isFeatured)[0].author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p style={{ fontSize: '12px', fontWeight: 600, color: '#e2e8f0' }}>
                          {articles.filter(a => a.isFeatured)[0].author}
                        </p>
                        <p style={{ fontSize: '10px', color: '#94a3b8' }}>{articles.filter(a => a.isFeatured)[0].date}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <span style={{ fontSize: '11px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={11} />{articles.filter(a => a.isFeatured)[0].readTime}
                      </span>
                      <span style={{ fontSize: '11px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Eye size={11} />{articles.filter(a => a.isFeatured)[0].views}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* Two stacked cards */}
            {isLoading ? (
              <>
                <div style={{ borderRadius: '16px', background: '#e6f2fc', minHeight: '230px', animation: 'pulse 2s infinite' }} />
                <div style={{ borderRadius: '16px', background: '#e6f2fc', minHeight: '230px', animation: 'pulse 2s infinite 0.2s' }} />
              </>
            ) : (
              articles.filter(a => a.isFeatured).slice(1, 3).map(a => (
                <article key={a.id} className="group" style={{
                  borderRadius: '16px', overflow: 'hidden', position: 'relative',
                  cursor: 'pointer', background: '#0b2b44', minHeight: '230px',
                }}>
                  <img src={a.image} alt={a.title}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5,
                      position: 'absolute', inset: 0, transition: 'transform 0.5s'
                    }}
                    className="group-hover:scale-105"
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(11,43,68,0.95) 0%, rgba(11,43,68,0.4) 70%, transparent 100%)',
                  }} />
                  <div style={{
                    position: 'absolute', inset: 0, padding: '20px',
                    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'
                  }}>
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
                      <TagBadge tag={a.tag || 'Rankings'} hot={a.isHot} />
                      <LevelBadge level={a.level} />
                    </div>
                    <p style={{
                      fontSize: '10px', fontWeight: 700, color: '#38bdf8',
                      letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '6px'
                    }}>
                      {a.category}
                    </p>
                    <h3 className="font-display group-hover:text-sky-300 transition-colors"
                      style={{
                        fontSize: '15px', color: '#ffffff',
                        lineHeight: 1.3, letterSpacing: '-0.01em', marginBottom: '8px',
                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                      }}>
                      {a.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{
                          width: '24px', height: '24px', borderRadius: '50%',
                          background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '9px', fontWeight: 700, color: 'white', flexShrink: 0
                        }}>
                          {a.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <p style={{ fontSize: '11px', color: '#e2e8f0' }}>{a.author}</p>
                      </div>
                      <span style={{ fontSize: '10px', color: '#94a3b8' }}>{a.readTime}</span>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 className="section-title font-display">M.Tech Knowledge Hub</h2>
          </div>

          <div style={{
            display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px',
            marginBottom: '36px', scrollbarWidth: 'none', justifyContent: 'center'
          }}>
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  className="cat-pill"
                  onClick={() => { setActiveCategory(cat.id); setVisibleCount(8); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '9px 20px', borderRadius: '99px', border: 'none',
                    fontSize: '12px', fontWeight: 700,
                    background: isActive ? '#0ea5e9' : '#ffffff',
                    color: isActive ? '#fff' : '#4b6b84',
                    boxShadow: isActive ? '0 4px 14px rgba(14,165,233,0.25)' : '0 1px 4px rgba(0,0,0,0.04)',
                    transition: 'all 0.2s',
                  }}
                >
                  <cat.icon size={13} />
                  {cat.label}
                </button>
              )
            })}
          </div>

          {isLoading ? (
            <div className="responsive-grid-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{ borderRadius: '16px', background: '#e6f2fc', minHeight: '320px', animation: 'pulse 2s infinite' }} />
              ))}
            </div>
          ) : (
            <>
              <div className="responsive-grid-4">
                {filteredArticles.slice(0, visibleCount).map(a => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
              {filteredArticles.length > visibleCount && (
                <div style={{ textAlign: 'center', marginTop: '48px' }}>
                  <button
                    onClick={() => setVisibleCount(prev => prev + 8)}
                    style={{
                      padding: '16px 48px', background: '#ffffff', border: '1.5px solid #d9ecfa',
                      borderRadius: '12px', fontSize: '13px', fontWeight: 700, color: '#0b2b44',
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
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
      <section style={{ padding: '72px 0', background: '#ffffff', borderTop: '1px solid #e6f2fc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 className="section-title font-display">Student Stories</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TOPIC DEEP DIVES ──────────────────────────────────────────────────── */}
      <section style={{ padding: '72px 0', background: '#f0f7ff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 className="section-title font-display">Complete Guides</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { icon: '📐', title: 'GATE Complete Guide', count: '28 articles', color: '#fee2e2', border: '#fca5a5', text: '#dc2626' },
              { icon: '🏛️', title: 'Top M.Tech Colleges', count: '52 reviews', color: '#f0f9ff', border: '#bae6fd', text: '#0369a1' },
              { icon: '💻', title: 'AI/ML M.Tech', count: '19 articles', color: '#ecfdf5', border: '#a7f3d0', text: '#059669' },
              { icon: '🎓', title: 'M.Tech vs MBA', count: '11 articles', color: '#fdf4ff', border: '#e879f9', text: '#a21caf' },
              { icon: '💰', title: 'Salary Reports', count: '24 articles', color: '#fffbeb', border: '#fde68a', text: '#d97706' },
              { icon: '🌍', title: 'PhD Abroad', count: '17 articles', color: '#f0f9ff', border: '#bae6fd', text: '#0369a1' },
            ].map((g, i) => (
              <div key={i} style={{
                padding: '24px', borderRadius: '14px', cursor: 'pointer',
                background: g.color, border: `1px solid ${g.border}`,
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}>
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{g.icon}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0b2b44', marginBottom: '4px' }}>{g.title}</h3>
                <p style={{ fontSize: '11px', fontWeight: 700, color: g.text, textTransform: 'uppercase' }}>{g.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
