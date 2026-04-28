'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Star } from 'lucide-react'
import TestimonialCard from '@/components/ui/TestimonialCard'
import { supabase } from '@/lib/supabase'
import type { Testimonial } from '@/types'

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    async function fetchTestimonials() {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('year', { ascending: false })
      
      if (error) {
        console.error('Error fetching testimonials:', error)
      } else {
        const mappedData = (data || []).map((r: any) => ({
          ...r,
          studentName: r.student_name,
          college: r.college_name,
          reviewText: r.review_text,
        }))
        setTestimonials(mappedData)
      }
      setLoading(false)
    }
    fetchTestimonials()
  }, [])

  const displayedTestimonials = showAll ? testimonials : testimonials.slice(0, 3)

  return (
    <section id="testimonials" className="py-20" style={{ background: 'var(--surface)' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-px" style={{ background: 'var(--gold)' }} />
              <span className="text-xs font-medium tracking-wider uppercase" style={{ color: 'var(--gold)', letterSpacing: '0.1em' }}>
                Success Stories
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-medium"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em', color: 'var(--ink)' }}
            >
              What our students say
            </h2>
            <p className="mt-1.5 text-sm" style={{ color: 'var(--ink-3)' }}>
              Real reviews from students who got admitted through our counseling
            </p>
          </div>

          {/* Trust stat */}
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl flex-shrink-0"
            style={{ background: 'var(--surface-2)', border: '0.5px solid var(--border)' }}
          >
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} fill="var(--gold)" style={{ color: 'var(--gold)' }} />
              ))}
            </div>
            <div>
              <div className="text-sm font-medium" style={{ color: 'var(--ink)', letterSpacing: '-0.01em' }}>4.8 / 5.0</div>
              <div className="text-xs" style={{ color: 'var(--ink-3)' }}>verified reviews</div>
            </div>
          </div>
        </div>

        {/* Dynamically switching between Marquee and Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-50">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 rounded-xl bg-surface-2 animate-pulse" />
            ))}
          </div>
        ) : showAll ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-on-load">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        ) : (
          /* Infinite Scroller for Default View */
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee-slow hover:[animation-play-state:paused]">
              {[...testimonials, ...testimonials, ...testimonials].map((testimonial, idx) => (
                <div key={`${testimonial.id}-${idx}`} className="mx-4 w-[350px] flex-shrink-0">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          </div>
        )}

        {/* CTA */}
        {!showAll && testimonials.length > 3 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="flex items-center gap-1.5 text-sm font-medium px-6 py-2.5 rounded-pill transition-all duration-150 hover:bg-slate-50"
              style={{
                border: '0.5px solid var(--border)',
                color: 'var(--ink-2)',
                borderRadius: '999px',
              }}
            >
              View all testimonials
              <ArrowRight size={14} />
            </button>
          </div>
        )}

      </div>
    </section>
  )
}
