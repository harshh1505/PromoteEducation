'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { supabase } from '@/lib/supabase'
import {
  Lightbulb, Building, MapPin, DollarSign, CheckCircle,
  GraduationCap, Code, Briefcase, FlaskConical, Globe,
  Cpu, BarChart3, Layers, Award, Zap,
  Calendar, User, ArrowUpRight, Bookmark, Share2,
  ChevronDown, Play, FileText, Hash, Trophy, Target, Compass,
  Users, Clock, Eye, ArrowRight, Star, Search, Flame, Stethoscope
} from 'lucide-react'
import { cn } from '@/lib/utils'
import LeadGate from '@/components/ui/LeadGate'

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
  { id: 'all', label: 'All Articles', icon: Layers, count: 260 },
  { id: 'admission', label: 'Admission Guide', icon: GraduationCap, count: 52 },
  { id: 'specializations', label: 'Specializations', icon: Stethoscope, count: 38 },
  { id: 'colleges', label: 'College Reviews', icon: Building, count: 60 },
  { id: 'exams', label: 'NEET & Entrance', icon: FileText, count: 34 },
  { id: 'career', label: 'Careers & Salaries', icon: Briefcase, count: 46 },
  { id: 'campus', label: 'Campus Life', icon: Users, count: 30 },
]

const LEVEL_CONFIG: Record<string, { label: string; color: string; bg: string; ring: string }> = {
  beginner: { label: 'Class 10–12', color: '#10b981', bg: '#ecfdf5', ring: '#a7f3d0' },
  intermediate: { label: 'NEET Aspirant', color: '#0ea5e9', bg: '#f0f9ff', ring: '#bae6fd' },
  advanced: { label: 'MBBS Student', color: '#8b5cf6', bg: '#f5f3ff', ring: '#ddd6fe' },
  expert: { label: 'PG / Career', color: '#f59e0b', bg: '#fffbeb', ring: '#fde68a' },
}

const JOURNEY_LEVELS = [
  {
    level: 'beginner' as const,
    title: 'The Foundation',
    subtitle: 'Class 10 – 12',
    description: 'PCB stream selection, understanding MBBS, NEET basics, and building the right mindset for medicine.',
    articles: 52,
    icon: '🌱',
    topics: ['PCB Stream Choice', 'What is MBBS?', 'NEET vs AIIMS vs JIPMER', 'Biology Deep Dive', 'Study Plans'],
  },
  {
    level: 'intermediate' as const,
    title: 'NEET Aspirant',
    subtitle: 'The Grind',
    description: 'Exam strategy, college shortlisting, MCC counseling navigation, and state quota application mastery.',
    articles: 68,
    icon: '⚡',
    topics: ['NEET UG Strategy', 'Physics & Chemistry Prep', 'MCC Counseling', 'State Quota vs AIQ', 'Documents & Verification'],
  },
  {
    level: 'advanced' as const,
    title: 'MBBS Student',
    subtitle: 'The Clinic',
    description: 'Pre-clinical year survival, clinical postings, USMLE/PLAB prep, electives, and internship excellence.',
    articles: 74,
    icon: '🩺',
    topics: ['Pre-Clinical Strategy', 'Clinical Postings', 'USMLE Step 1 Prep', 'Research & Publications', 'Internship Guide'],
  },
  {
    level: 'expert' as const,
    title: 'Post MBBS',
    subtitle: 'The Calling',
    description: 'NEET-PG strategy, MD/MS/Diploma choices, super-specialization pathways, and international medicine options.',
    articles: 66,
    icon: '🚀',
    topics: ['NEET-PG 2026', 'MD vs MS Choice', 'USMLE Pathway', 'Hospital Jobs', 'Research Fellowship'],
  },
]

const TRENDING_TOPICS = [
  'NEET 2026', 'AIIMS Delhi', 'PG Entrance', 'USMLE Step 1',
  'Stipend Updates', 'MD vs MS', 'Super Specialty', 'Bond Policy',
  'NEET-PG 2026', 'MBBS Fees', 'Deemed Universities', 'NRI Quota',
]

const STATS = [
  { value: '260+', label: 'Clinical Articles', icon: FileText },
  { value: '3.1L+', label: 'Monthly Readers', icon: Users },
  { value: '60+', label: 'Medical College Reviews', icon: Building },
  { value: '18+', label: 'Years of Data', icon: BarChart3 },
]

const FREE_RESOURCES: ResourceCard[] = [
  {
    icon: '📋',
    title: 'College Preference List Tool',
    description: 'Interactive tool to rank medical colleges based on your NEET rank, state quota eligibility, and specialization interest.',
    cta: 'Build Your List',
    color: '#0284c7',
    bg: '#f0f9ff',
    border: '#bae6fd',
  },
  {
    icon: '📊',
    title: 'Cutoff Analyzer 2025',
    description: 'Download previous year NEET cutoffs for all government, deemed, and private medical colleges in a single spreadsheet.',
    cta: 'Download Excel',
    color: '#059669',
    bg: '#ecfdf5',
    border: '#a7f3d0',
  },
  {
    icon: '🎯',
    title: 'Specialization Selector Quiz',
    description: 'A 12-question quiz that recommends MD/MS specializations based on your interests, aptitude, and lifestyle preferences.',
    cta: 'Take Quiz',
    color: '#7c3aed',
    bg: '#f5f3ff',
    border: '#ddd6fe',
  },
  {
    icon: '📝',
    title: 'MCC Counseling Checklist',
    description: 'Comprehensive checklist for MCC AIQ counseling documents, round timelines, stray vacancy rounds, and bond details.',
    cta: 'Get Checklist',
    color: '#d97706',
    bg: '#fffbeb',
    border: '#fde68a',
  },
]

const TESTIMONIALS = [
  {
    quote: "This blog single-handedly guided my MBBS admission journey. The MCC counseling guide saved me from making huge mistakes in choice filling.",
    name: "Neha Sharma",
    detail: "AIIMS New Delhi, MBBS '28",
    avatar: "NS",
  },
  {
    quote: "The specialization comparison articles helped me choose Radiology over a lower-ranked MD General Medicine seat. Best decision of my life.",
    name: "Arjun Pillai",
    detail: "Maulana Azad Medical College, '26",
    avatar: "AP",
  },
  {
    quote: "I was confused between deemed and government medical colleges. The college reviews and fee ROI analysis gave me absolute clarity. No regrets.",
    name: "Divya Menon",
    detail: "Grant Medical College, Mumbai, '27",
    avatar: "DM",
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
    <LeadGate 
      collegeName={article.title} 
      stream="MBBS"
      targetUrl={`/articles/${article.id}`}
    >
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
    </LeadGate>
  )
}

const ResourceCardComponent = ({ resource }: { resource: ResourceCard }) => (
  <LeadGate 
    collegeName={resource.title} 
    stream="MBBS"
    mode="brochure"
  >
    <div style={{
      background: resource.bg,
      borderRadius: '16px',
      padding: '28px',
      border: `1px solid ${resource.border}`,
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.25s',
      cursor: 'pointer',
      height: '100%'
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
  </LeadGate>
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

export default function MbbsBlogPage() {
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
          .eq('category', 'mbbs')
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
        console.error('[Supabase] Error loading MBBS articles:', err)
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
      a.category.toLowerCase().includes(activeCategoryLabel.toLowerCase().replace(' articles', '').replace(' & entrance', '').trim()) ||
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
                MBBS Knowledge Hub · 260+ Articles
              </span>
            </div>

            <h1 className="font-display hero-fade" style={{
              fontSize: 'clamp(40px, 6vw, 80px)', color: '#0b2b44',
              lineHeight: 0.95, letterSpacing: '-0.02em', marginBottom: '28px',
            }}>
              Mastering Medicine.<br />
              <em style={{ color: '#0284c7' }}>Your White Coat Awaits.</em>
            </h1>

            <p className="hero-fade" style={{
              fontSize: '17px', color: '#4b6b84', lineHeight: 1.75,
              marginBottom: '40px', maxWidth: '560px',
            }}>
              India's most comprehensive resource for NEET UG prep, clinical postings, and postgraduate medical roadmap.
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
                placeholder="Search NEET strategy, AIIMS vs MAMC, PG entrance..."
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
                Medical Roadmap
              </p>
              <h2 className="section-title font-display">
                The MBBS Journey — Aspirant to Specialist
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
              Clinical Toolkit
            </p>
            <h2 className="section-title font-display" style={{ marginBottom: '12px' }}>
              Free MBBS <span style={{ color: '#0284c7' }}>Preparation Tools</span>
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
                    <TagBadge tag={articles.filter(a => a.isFeatured)[0].tag || 'Featured'} hot={articles.filter(a => a.isFeatured)[0].isHot} />
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
                      <TagBadge tag={a.tag || 'Clinical'} hot={a.isHot} />
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

          <div style={{ textAlign: 'center', marginTop: '64px', marginBottom: '48px' }}>
            <h2 className="section-title font-display">Medical Insights</h2>
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
            <h2 className="section-title font-display">Medical Student Stories</h2>
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
            <h2 className="section-title font-display">Clinical Specializations</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { icon: '🫀', title: 'Cardiology', count: '42 articles', color: '#fee2e2', border: '#fca5a5', text: '#dc2626' },
              { icon: '🧠', title: 'Neurology', count: '31 articles', color: '#f0f9ff', border: '#bae6fd', text: '#0369a1' },
              { icon: '🦴', title: 'Orthopedics', count: '28 articles', color: '#ecfdf5', border: '#a7f3d0', text: '#059669' },
              { icon: '👶', title: 'Pediatrics', count: '35 articles', color: '#fdf4ff', border: '#e879f9', text: '#a21caf' },
              { icon: '🩺', title: 'Surgery', count: '39 articles', color: '#fffbeb', border: '#fde68a', text: '#d97706' },
              { icon: '🔬', title: 'Diagnostics', count: '22 articles', color: '#f0f9ff', border: '#bae6fd', text: '#0369a1' },
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