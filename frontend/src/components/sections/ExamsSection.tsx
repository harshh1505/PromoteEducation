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

        {/* Horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto scroll-container pb-2">
          {loading ? (
            [1, 2, 3, 4].map(i => (
              <div key={i} className="flex-shrink-0 w-64 h-48 rounded-xl bg-surface-3 animate-pulse" />
            ))
          ) : (
            <>
              {exams.map((exam) => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
              {/* View all card */}
              <div
                className="flex-shrink-0 w-56 rounded-xl p-4 flex flex-col items-center justify-center gap-3 card-hover cursor-pointer"
                style={{
                  border: '0.5px dashed var(--border-mid)',
                  background: 'transparent',
                }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: 'var(--surface-3)' }}
                >
                  <ArrowRight size={15} style={{ color: 'var(--ink-3)' }} />
                </div>
                <span className="text-sm text-center" style={{ color: 'var(--ink-3)' }}>
                  View all 500+ exams
                </span>
              </div>
            </>
          )}
        </div>

      </div>
    </section>
  )
}
