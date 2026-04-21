'use client'

import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import ExamCard from '@/components/ui/ExamCard'
import { supabase } from '@/lib/supabase'
import type { Exam } from '@/types'

export default function ExamsSection() {
  const [exams, setExams] = useState<Exam[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchExams() {
      const { data, error } = await supabase
        .from('exams')
        .select('*')
      
      if (error) {
        console.error('Error fetching exams:', error)
      } else {
        const mappedData = (data || []).map((e: any) => ({
          ...e,
          fullName: e.full_name,
          date: e.exam_date,
          registrationDeadline: e.registration_deadline,
        }))
        setExams(mappedData)
      }
      setLoading(false)
    }
    fetchExams()
  }, [])

  return (
    <section id="exams" className="py-20" style={{ background: 'var(--surface-2)' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-px" style={{ background: 'var(--gold)' }} />
              <span className="text-xs font-medium tracking-wider uppercase" style={{ color: 'var(--gold)', letterSpacing: '0.1em' }}>
                Entrance exams
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-medium"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em', color: 'var(--ink)' }}
            >
              Upcoming exams
            </h2>
            <p className="mt-1.5 text-sm" style={{ color: 'var(--ink-3)' }}>
              Stay on top of deadlines — never miss a registration window
            </p>
          </div>
          <button
            className="hidden md:flex items-center gap-1.5 text-sm font-medium transition-all duration-150 hover:opacity-80"
            style={{ color: 'var(--action)' }}
          >
            All exams
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Infinite Scroller */}
        <div className="relative">
          <div className="flex animate-marquee-slow hover:[animation-play-state:paused]">
            {loading ? (
              [1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="flex-shrink-0 w-72 h-44 rounded-2xl bg-white/50 border border-slate-100 mx-3 animate-pulse" />
              ))
            ) : (
              // Triple the array to ensure smooth infinite loop
              [...exams, ...exams, ...exams].map((exam, idx) => (
                <div key={`${exam.id}-${idx}`} className="mx-3">
                  <ExamCard exam={exam} />
                </div>
              ))
            )}
          </div>
          
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
        </div>

      </div>
    </section>
  )
}
