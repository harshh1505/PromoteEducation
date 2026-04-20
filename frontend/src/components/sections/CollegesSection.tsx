'use client'

import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import CollegeCard from '@/components/ui/CollegeCard'
import { streamFilters } from '@/lib/data'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import type { College, Stream } from '@/types'

export default function CollegesSection() {
  const [colleges, setColleges] = useState<College[]>([])
  const [activeStream, setActiveStream] = useState<Stream>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchColleges() {
      setLoading(true)
      let query = supabase.from('colleges').select('*')
      
      if (activeStream !== 'all') {
        query = query.ilike('stream', activeStream)
      }

      const { data, error } = await query.order('rank', { ascending: true })

      if (error) {
        console.error('Error fetching colleges:', error)
      } else {
        const mappedData = (data || []).map((c: any) => ({
          ...c,
          rankingBody: c.ranking_body,
          avgCTC: c.avg_ctc,
          highestCTC: c.highest_ctc,
          cutoffExam: c.cutoff_exam,
          totalFee: c.total_fee,
          matchScore: c.match_score,
          admissionChance: c.admission_chance,
        }))
        setColleges(mappedData)
      }
      setLoading(false)
    }

    fetchColleges()
  }, [activeStream])

  return (
    <section id="colleges" className="py-20" style={{ background: 'var(--surface)' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-px" style={{ background: 'var(--gold)' }} />
              <span className="text-xs font-medium tracking-wider uppercase" style={{ color: 'var(--gold)', letterSpacing: '0.1em' }}>
                NIRF 2024
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-medium"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em', color: 'var(--ink)' }}
            >
              Top ranked colleges
            </h2>
            <p className="mt-1.5 text-sm" style={{ color: 'var(--ink-3)' }}>
              Based on NIRF 2024 rankings, placement data & verified student reviews
            </p>
          </div>
          <button
            className="hidden md:flex items-center gap-1.5 text-sm font-medium transition-all duration-150 hover:opacity-80 flex-shrink-0"
            style={{ color: 'var(--action)' }}
          >
            View all colleges
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto scroll-container pb-1">
          {streamFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveStream(f.value as Stream)}
              className={cn(
                'text-sm px-4 py-1.5 rounded-pill flex-shrink-0 transition-all duration-150',
              )}
              style={{
                borderRadius: '999px',
                background: activeStream === f.value ? 'var(--midnight)' : 'var(--surface-2)',
                color: activeStream === f.value ? 'white' : 'var(--ink-2)',
                border: activeStream === f.value ? '0.5px solid var(--midnight)' : '0.5px solid var(--border)',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-50">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 rounded-xl bg-surface-2 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {colleges.length > 0
              ? colleges.map((college) => (
                  <CollegeCard key={college.id} college={college} showMatch={true} />
                ))
              : (
                <div
                  className="col-span-3 text-center py-16 rounded-xl"
                  style={{ background: 'var(--surface-2)', border: '0.5px solid var(--border)' }}
                >
                  <p style={{ color: 'var(--ink-3)' }}>No colleges found for this stream yet.</p>
                </div>
              )
            }
          </div>
        )}

        {/* Mobile view all */}
        <div className="mt-8 flex justify-center md:hidden">
          <button
            className="flex items-center gap-1.5 text-sm font-medium px-6 py-2.5 rounded-pill transition-all duration-150"
            style={{
              border: '0.5px solid var(--border)',
              color: 'var(--ink-2)',
              borderRadius: '999px',
            }}
          >
            View all colleges
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </section>
  )
}
