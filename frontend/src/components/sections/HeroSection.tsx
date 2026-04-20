'use client'

import { useState, useEffect } from 'react'
import { Search, ArrowRight, TrendingUp } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const trendingSearches = ['JEE Main 2025', 'Top MBA Colleges', 'NEET Cutoff', 'Engineering Colleges Delhi']

export default function HeroSection() {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // Live search from Supabase
  useEffect(() => {
    const searchColleges = async () => {
      if (query.length < 2) {
        setResults([])
        return
      }
      
      setLoading(true)
      const { data, error } = await supabase
        .from('colleges')
        .select('name, location, state, stream')
        .or(`name.ilike.%${query}%,location.ilike.%${query}%,stream.ilike.%${query}%`)
        .limit(6)

      if (!error && data) {
        setResults(data)
      }
      setLoading(false)
    }

    const timer = setTimeout(searchColleges, 300)
    return () => clearTimeout(timer)
  }, [query])

  return (
    <section
      className="relative min-h-[90vh] flex flex-col justify-center pt-14"
      style={{ background: 'var(--midnight)' }}
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(201,168,76,0.4) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(201,168,76,0.4) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Gold accent line top */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-40"
        style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-8">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-6 animate-on-load stagger-1">
              <div className="w-5 h-px" style={{ background: 'var(--gold)' }} />
              <span
                className="text-xs font-medium tracking-wider uppercase"
                style={{ color: 'var(--gold)', letterSpacing: '0.1em' }}
              >
                India's most trusted college guide
              </span>
            </div>

            {/* H1 */}
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-medium leading-none mb-6 text-white animate-on-load stagger-2"
              style={{
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.04em',
                lineHeight: 1.1,
              }}
            >
              Your dream college,
              <br />
              <span className="gold-shimmer">found with clarity.</span>
            </h1>

            {/* Subtext */}
            <p
              className="text-base md:text-lg mb-10 max-w-xl animate-on-load stagger-3"
              style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}
            >
              Compare rankings, fees, placements and real student reviews across 50,000+ colleges — all in one place.
            </p>

            {/* Search Bar container */}
            <div className="max-w-xl">
              <div className="relative mb-6 animate-on-load stagger-4">
                <div
                  className="flex items-center gap-3 px-5 py-3.5 transition-all duration-200 shadow-xl"
                  style={{
                    background: focused ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.94)',
                    borderRadius: '999px',
                    border: focused ? '1.5px solid var(--gold)' : '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <Search size={16} style={{ color: 'var(--ink-3)', flexShrink: 0 }} />
                  <input
                    type="text"
                    placeholder="Search colleges, locations or streams…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setTimeout(() => setFocused(false), 200)}
                    className="flex-1 bg-transparent text-sm outline-none"
                    style={{ color: 'var(--ink)', fontSize: '14px' }}
                  />
                  <button
                    className="flex items-center gap-1.5 px-6 py-2.5 text-sm font-medium transition-all duration-150 hover:brightness-110 active:scale-95 flex-shrink-0"
                    style={{
                      background: 'var(--gold)',
                      color: 'var(--midnight)',
                      borderRadius: '999px',
                    }}
                  >
                    Search
                    <ArrowRight size={13} />
                  </button>
                </div>

                {/* Suggestions dropdown */}
                {focused && query.length >= 2 && (
                  <div
                    className="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden z-10"
                    style={{
                      background: 'white',
                      border: '0.5px solid var(--border)',
                      boxShadow: '0 8px 32px rgba(13,13,20,0.12)',
                    }}
                  >
                    <div className="px-4 py-2.5 border-b flex justify-between items-center" style={{ borderColor: 'var(--border)' }}>
                      <span className="text-xs font-medium" style={{ color: 'var(--ink-3)' }}>
                        {loading ? 'Searching...' : results.length > 0 ? 'Search results' : 'No results found'}
                      </span>
                    </div>
                    {results.map((res) => (
                      <button
                        key={res.name}
                        className="w-full flex flex-col px-4 py-3 text-left hover:bg-surface-2 transition-colors duration-100 group"
                        onMouseDown={() => setQuery(res.name)}
                      >
                        <div className="flex items-center gap-2">
                          <Search size={12} className="text-ink-4 group-hover:text-action" />
                          <span className="text-sm font-medium text-ink">{res.name}</span>
                        </div>
                        <div className="text-[11px] ml-5 text-ink-3">
                          {res.stream} • {res.location}, {res.state}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Trending */}
              <div className="flex flex-wrap items-center gap-2 animate-on-load stagger-5">
                <div className="flex items-center gap-1.5 mr-1">
                  <TrendingUp size={12} style={{ color: 'var(--gold)' }} />
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Trending:</span>
                </div>
                {trendingSearches.map((t) => (
                  <button
                    key={t}
                    className="text-xs px-3 py-1 rounded-pill transition-all duration-150 hover:bg-white/10"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      color: 'rgba(255,255,255,0.55)',
                      border: '0.5px solid rgba(255,255,255,0.1)',
                      borderRadius: '999px',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Cards (Right) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col gap-4 animate-on-load stagger-3">
            {[
              { label: 'Avg package', value: '₹18.5L', sub: 'IIT Bombay CSE 2024', positive: true, offset: '0px' },
              { label: 'Match score', value: '92%', sub: 'Based on your profile', positive: true, offset: '24px' },
              { label: 'Open seats', value: '124', sub: 'AIIMS Delhi MBBS', positive: false, offset: '0px' },
            ].map((card) => (
              <div
                key={card.label}
                className="p-4 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderColor: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(16px)',
                  marginLeft: card.offset,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                }}
              >
                <div className="text-[10px] uppercase tracking-wider font-semibold mb-1" style={{ color: 'var(--gold-muted)' }}>
                  {card.label}
                </div>
                <div className="text-2xl font-medium text-white mb-1" style={{ letterSpacing: '-0.02em' }}>
                  {card.value}
                </div>
                <div className="text-xs flex items-center gap-1.5" style={{ color: card.positive ? 'var(--success)' : 'rgba(255,255,255,0.4)' }}>
                  {card.positive && <div className="w-1 h-1 rounded-full bg-success" />}
                  {card.sub}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(transparent, var(--surface))' }}
      />
    </section>
  )
}
