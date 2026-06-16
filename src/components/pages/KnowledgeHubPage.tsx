'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { supabase } from '@/lib/supabase'
import {
  Lightbulb, Building, MapPin, DollarSign, CheckCircle,
  Compass, Send, Flame, Clock, Eye, ArrowRight, Search
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

interface KnowledgeHubPageProps {
  stream: string
  courseTitle: string
  heroTagline: React.ReactNode
  categories: { id: string; label: string; icon: any; count: number }[]
  journeyLevels: {
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
    title: string
    subtitle: string
    description: string
    articles: number
    icon: string
    topics: string[]
  }[]
  levelConfig: Record<string, { label: string; color: string; bg: string; ring: string }>
  stats: { value: string; label: string; icon: any }[]
  trendingTopics: string[]
  featuredResources: ResourceCard[]
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const LevelBadge = ({ level, config }: { level: Article['level']; config: any }) => {
  const cfg = config[level] || config.beginner
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

const ArticleCard = ({ article, levelConfig }: { article: Article; levelConfig: any }) => {
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
          <LevelBadge level={article.level} config={levelConfig} />
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

// ─── Main Component ───────────────────────────────────────────────────────────

export default function KnowledgeHubPage({
  stream,
  courseTitle,
  heroTagline,
  categories,
  journeyLevels,
  levelConfig,
  stats,
  trendingTopics,
  featuredResources
}: KnowledgeHubPageProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeLevel, setActiveLevel] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(8)
  const [email, setEmail] = useState('')
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
          .eq('stream', stream)
          .order('created_at', { ascending: false })

        if (error) throw error
        
        if (data) {
          const mappedArticles: Article[] = data.map(item => ({
            id: item.id,
            title: item.title,
            excerpt: item.excerpt,
            category: item.category,
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
        console.error(`[Supabase] Error loading ${courseTitle} articles:`, err)
        setFetchError(err.message || 'Failed to connect to database')
      } finally {
        setIsLoading(false)
      }
    }
    loadArticles()
  }, [stream, courseTitle])

  const filteredArticles = articles.filter(a => {
    const activeCategoryLabel = categories.find(c => c.id === activeCategory)?.label || ''
    
    const catMatch = activeCategory === 'all' || 
      a.category.toLowerCase().includes(activeCategoryLabel.toLowerCase().replace(' articles', '').replace('s', '')) ||
      activeCategoryLabel.toLowerCase().includes(a.category.toLowerCase().replace('s', ''))
      
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
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        @media (min-width: 768px) {
          .stats-grid { grid-template-columns: repeat(4, 1fr); gap: 0; }
        }
        @media (max-width: 767px) {
          .stats-item {
            border-right: none !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }
        @media (max-width: 1023px) {
          .featured-hero-card {
            grid-row: auto !important;
            min-height: 400px !important;
          }
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

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '840px' }}>
            <div className="hero-fade" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <div style={{ width: '36px', height: '1px', background: '#0ea5e9' }} />
              <span style={{
                fontSize: '11px', fontWeight: 700, color: '#0284c7',
                letterSpacing: '0.3em', textTransform: 'uppercase'
              }}>
                {courseTitle} Knowledge Hub
              </span>
            </div>

            <h1 className="font-display hero-fade" style={{
              fontSize: 'clamp(40px, 6vw, 80px)', color: '#0b2b44',
              lineHeight: 0.95, letterSpacing: '-0.02em', marginBottom: '28px',
            }}>
              {heroTagline}
            </h1>

            <p className="hero-fade" style={{
              fontSize: '17px', color: '#4b6b84', lineHeight: 1.75,
              maxWidth: '640px', marginBottom: '40px'
            }}>
              Expert insights, career roadmaps, and data-driven guides to navigate your {courseTitle} journey.
              Curated by industry leaders and academic pioneers.
            </p>

            <div className="hero-fade" style={{ position: 'relative', maxWidth: '600px', marginBottom: '40px' }}>
              <Search size={18} style={{
                position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)',
                color: '#4b6b84', pointerEvents: 'none',
              }} />
              <input
                className="search-input"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={`Search ${courseTitle} articles...`}
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

            <div className="hero-fade" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#4b6b84', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Trending:
              </span>
              {trendingTopics.map((topic, i) => (
                <button key={i} className="tag-chip" style={{
                  fontSize: '11px', fontWeight: 600, color: '#0284c7',
                  padding: '4px 14px', borderRadius: '99px', background: '#ffffff',
                  border: '1px solid #d9ecfa', cursor: 'pointer'
                }}>
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="container" style={{ marginTop: '64px', position: 'relative', zIndex: 1 }}>
          <div className="stats-grid" style={{
            borderTop: '1px solid #d9ecfa', paddingTop: '40px',
          }}>
            {stats.map((s, i) => (
              <div key={i} className="stats-item" style={{
                paddingRight: '32px',
                borderRight: i < stats.length - 1 ? '1px solid #d9ecfa' : 'none',
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
      <section style={{ padding: '100px 0', background: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px' }}>
            <h2 className="section-title font-display" style={{ marginBottom: '16px' }}>The {courseTitle} Roadmap</h2>
            <p style={{ fontSize: '15px', color: '#4b6b84', lineHeight: 1.6 }}>
              From initial curiosity to high-growth career paths — navigate every stage of your 
              {courseTitle} journey with tailored resources.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {journeyLevels.map((lvl, i) => (
              <div key={i} className="level-card" style={{
                padding: '32px', borderRadius: '24px', background: '#f8fafc',
                border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column'
              }}
              onClick={() => setActiveLevel(activeLevel === lvl.level ? null : lvl.level)}
              >
                <div style={{ fontSize: '40px', marginBottom: '20px' }}>{lvl.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0b2b44', marginBottom: '4px' }}>{lvl.title}</h3>
                <p style={{ fontSize: '11px', fontWeight: 700, color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
                  {lvl.subtitle}
                </p>
                <p style={{ fontSize: '13px', color: '#4b6b84', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
                  {lvl.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {lvl.topics.slice(0, 3).map((t, j) => (
                    <span key={j} style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', padding: '2px 8px', background: '#f1f5f9', borderRadius: '4px' }}>
                      {t}
                    </span>
                  ))}
                </div>
                <button style={{
                  width: '100%', padding: '12px', borderRadius: '10px',
                  background: activeLevel === lvl.level ? '#0b2b44' : '#ffffff',
                  color: activeLevel === lvl.level ? '#ffffff' : '#0b2b44',
                  border: '1.5px solid #e2e8f0', fontSize: '12px', fontWeight: 700,
                  transition: 'all 0.2s', cursor: 'pointer'
                }}>
                  {activeLevel === lvl.level ? 'Selected' : 'Explore Path'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ──────────────────────────────────────────────────────────── */}
      <section style={{ padding: '100px 0', background: '#f4f9fd' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
            <div>
              <h2 className="section-title font-display">Editor's Picks</h2>
              <p style={{ fontSize: '15px', color: '#4b6b84', marginTop: '4px' }}>Must-read articles for every {courseTitle} student.</p>
            </div>
            <button style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              fontSize: '13px', fontWeight: 700, color: '#0284c7',
              padding: '10px 20px', borderRadius: '10px', background: '#ffffff',
              border: '1.5px solid #d9ecfa', cursor: 'pointer'
            }}>
              View All <ArrowRight size={14} />
            </button>
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
                    <TagBadge tag={articles.filter(a => a.isFeatured)[0].tag} hot={articles.filter(a => a.isFeatured)[0].isHot} />
                    <LevelBadge level={articles.filter(a => a.isFeatured)[0].level} config={levelConfig} />
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
                      <TagBadge tag={a.tag} hot={a.isHot} />
                      <LevelBadge level={a.level} config={levelConfig} />
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
        </div>
      </section>

      {/* ── KNOWLEDGE BASE (Articles) ─────────────────────────────────────────── */}
      <section style={{ padding: '80px 0', background: '#f4f9fd' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 className="section-title font-display">Knowledge Base</h2>
            <p style={{ fontSize: '15px', color: '#4b6b84', marginTop: '8px' }}>
              India's most detailed {courseTitle} articles, guides and reviews.
            </p>
          </div>

          <div style={{ width: '100%' }}>
            {/* Category tabs */}
            <div style={{
              display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px',
              marginBottom: '36px', scrollbarWidth: 'none', justifyContent: 'center'
            }}>
              {categories.map(cat => {
                const isActive = activeCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    className="cat-pill"
                    onClick={() => { setActiveCategory(cat.id); setVisibleCount(8); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      padding: '9px 20px', borderRadius: '99px', border: 'none',
                      fontSize: '12px', fontWeight: 700, letterSpacing: '0.03em',
                      fontFamily: "'DM Sans', sans-serif",
                      background: isActive ? '#0ea5e9' : '#ffffff',
                      color: isActive ? '#fff' : '#4b6b84',
                      boxShadow: isActive ? '0 4px 14px rgba(14,165,233,0.25)' : '0 1px 4px rgba(0,0,0,0.04)',
                      transition: 'all 0.2s',
                    }}
                  >
                    <cat.icon size={13} />
                    {cat.label}
                    <span style={{
                      fontSize: '10px', padding: '1px 6px', borderRadius: '99px',
                      background: isActive ? 'rgba(255,255,255,0.2)' : '#e6f2fc',
                      color: isActive ? 'rgba(255,255,255,0.8)' : '#4b6b84',
                    }}>
                      {cat.count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Active filters display */}
            {(activeLevel || searchQuery) && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                marginBottom: '32px', flexWrap: 'wrap', justifyContent: 'center'
              }}>
                <span style={{ fontSize: '12px', color: '#4b6b84', fontWeight: 500 }}>
                  Showing {filteredArticles.length} results
                </span>
                {activeLevel && (
                  <span style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    fontSize: '11px', padding: '4px 12px', borderRadius: '99px',
                    background: '#f0f9ff', border: '1px solid #bae6fd', color: '#0284c7', fontWeight: 600
                  }}>
                    {levelConfig[activeLevel]?.label || activeLevel}
                    <button onClick={() => setActiveLevel(null)}
                      style={{
                        background: 'none', border: 'none', color: '#0284c7',
                        cursor: 'pointer', fontSize: '14px', lineHeight: 1
                      }}>×</button>
                  </span>
                )}
                {searchQuery && (
                  <span style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    fontSize: '11px', padding: '4px 12px', borderRadius: '99px',
                    background: '#f0f9ff', border: '1px solid #bae6fd', color: '#0284c7', fontWeight: 600
                  }}>
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery('')}
                      style={{
                        background: 'none', border: 'none', color: '#0284c7',
                        cursor: 'pointer', fontSize: '14px', lineHeight: 1
                      }}>×</button>
                  </span>
                )}
              </div>
            )}

            {/* Error State */}
            {fetchError && (
              <div style={{
                padding: '16px', background: '#fef2f2', border: '1px solid #fecaca',
                borderRadius: '12px', color: '#991b1b', marginBottom: '32px',
                display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px'
              }}>
                <Flame size={18} />
                <p><strong>Database Error:</strong> {fetchError}. Please check your RLS policies and environment variables.</p>
              </div>
            )}

            {/* Articles grid */}
            {isLoading ? (
              <div className="responsive-grid-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} style={{ borderRadius: '16px', background: '#e6f2fc', minHeight: '320px', animation: `pulse 2s infinite ${i * 0.1}s` }} />
                ))}
              </div>
            ) : filteredArticles.length > 0 ? (
              <>
                <div className="responsive-grid-4" style={{ marginBottom: '48px' }}>
                  {filteredArticles.slice(0, visibleCount).map(a => (
                    <ArticleCard key={a.id} article={a} levelConfig={levelConfig} />
                  ))}
                </div>

                {filteredArticles.length > visibleCount && (
                  <div style={{ textAlign: 'center' }}>
                    <button
                      onClick={() => setVisibleCount(prev => prev + 8)}
                      style={{
                        padding: '16px 48px', background: '#ffffff', border: '1.5px solid #d9ecfa',
                        borderRadius: '12px', fontSize: '13px', fontWeight: 700, color: '#0b2b44',
                        cursor: 'pointer', letterSpacing: '0.05em', transition: 'all 0.2s',
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      Load More Articles
                    </button>
                  </div>
                )}
              </>
            ) : fetchError ? (
              <div style={{
                textAlign: 'center', padding: '60px 24px', background: '#fef2f2',
                borderRadius: '20px', border: '1px solid #fecaca'
              }}>
                <Flame size={40} style={{ color: '#ef4444', marginBottom: '16px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#991b1b', marginBottom: '8px' }}>
                  Database Connection Issue
                </h3>
                <p style={{ fontSize: '14px', color: '#b91c1c', maxWidth: '400px', margin: '0 auto' }}>
                  {fetchError}. This usually happens if Row Level Security (RLS) is active but no public read policy is defined.
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  style={{
                    marginTop: '20px', padding: '10px 20px', background: '#ef4444',
                    color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Retry Connection
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <p style={{ fontSize: '48px', marginBottom: '16px' }}>📚</p>
                <p style={{ fontSize: '18px', fontWeight: 700, color: '#0b2b44', marginBottom: '8px' }}>
                  No articles found
                </p>
                <p style={{ fontSize: '14px', color: '#4b6b84' }}>
                  Try a different search or category filter.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── RESOURCES ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: '100px 0', background: '#ffffff' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '2px', background: '#0ea5e9' }} />
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              Free Tools & Downloads
            </span>
          </div>
          <h2 className="section-title font-display" style={{ marginBottom: '48px' }}>
            Premium Resources for {courseTitle} Students
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {featuredResources.map((res, i) => (
              <ResourceCardComponent key={i} resource={res} />
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ────────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 0', background: '#0b2b44', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', right: '-100px', top: '-100px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '32px', padding: '60px', textAlign: 'center', backdropFilter: 'blur(10px)'
          }}>
            <h2 className="font-display" style={{ fontSize: '36px', color: '#ffffff', marginBottom: '16px' }}>
              Stay Ahead in {courseTitle}
            </h2>
            <p style={{ fontSize: '16px', color: '#94a3b8', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
              Join 25,000+ students receiving weekly insights on admissions, 
              placements, and career trends.
            </p>
            <div style={{ display: 'flex', maxWidth: '500px', margin: '0 auto', gap: '12px' }}>
              <input
                className="newsletter-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  flex: 1, padding: '16px 24px', borderRadius: '14px',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  color: '#ffffff', fontSize: '14px'
                }}
              />
              <button style={{
                padding: '16px 32px', background: '#0ea5e9', color: '#ffffff',
                border: 'none', borderRadius: '14px', fontWeight: 700,
                fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s'
              }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
