'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, ExternalLink, Calendar, Users, Bell, GraduationCap, Stethoscope, Briefcase, Scale, Palette, FlaskConical, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Exam } from '@/types'
import { useLeadCapture } from '@/hooks/useLeadCapture'
import BrochureModal from '@/components/ui/BrochureModal'

const topExams = [
  { name: 'JEE Main', fullName: 'Joint Entrance Examination Main', stream: 'Engineering', icon: GraduationCap, applicants: '12L+', slug: 'jee-main', applyLink: 'https://jeemain.nta.nic.in/' },
  { name: 'JEE Advanced', fullName: 'Joint Entrance Examination Advanced', stream: 'Engineering', icon: GraduationCap, applicants: '2.5L+', slug: 'jee-advanced', applyLink: 'https://jeeadv.ac.in/' },
  { name: 'NEET UG', fullName: 'National Eligibility cum Entrance Test', stream: 'Medical', icon: Stethoscope, applicants: '20L+', slug: 'neet-ug', applyLink: 'https://neet.nta.nic.in/' },
  { name: 'CAT', fullName: 'Common Admission Test', stream: 'Management', icon: Briefcase, applicants: '2.8L+', slug: 'cat', applyLink: 'https://iimcat.ac.in/' },
  { name: 'GATE', fullName: 'Graduate Aptitude Test in Engineering', stream: 'Engineering', icon: FlaskConical, applicants: '8L+', slug: 'gate', applyLink: 'https://gate2025.iitr.ac.in/' },
  { name: 'CLAT', fullName: 'Common Law Admission Test', stream: 'Law', icon: Scale, applicants: '70K+', slug: 'clat', applyLink: 'https://consortiumofnlus.ac.in/' },
  { name: 'NIFT', fullName: 'National Institute of Fashion Technology', stream: 'Design', icon: Palette, applicants: '40K+', slug: 'nift', applyLink: 'https://nift.ac.in/' },
  { name: 'CUET UG', fullName: 'Common University Entrance Test', stream: 'General', icon: BookOpen, applicants: '14L+', slug: 'cuet-ug', applyLink: 'https://cuet.nta.nic.in/' },
]

const streamColors: Record<string, { bg: string; text: string; border: string }> = {
  Engineering: { bg: 'rgba(58,123,213,0.08)', text: '#3A7BD5', border: 'rgba(58,123,213,0.2)' },
  Medical: { bg: 'rgba(29,184,122,0.08)', text: '#1DB87A', border: 'rgba(29,184,122,0.2)' },
  Management: { bg: 'rgba(201,168,76,0.1)', text: '#8B6A1F', border: 'rgba(201,168,76,0.25)' },
  MBA: { bg: 'rgba(201,168,76,0.1)', text: '#8B6A1F', border: 'rgba(201,168,76,0.25)' },
  Law: { bg: 'rgba(122,58,213,0.08)', text: '#7A3AD5', border: 'rgba(122,58,213,0.2)' },
  Design: { bg: 'rgba(213,90,48,0.08)', text: '#D55A30', border: 'rgba(213,90,48,0.2)' },
  General: { bg: 'rgba(8,145,178,0.08)', text: '#0891b2', border: 'rgba(8,145,178,0.2)' },
}

export default function ExamsSection() {
  const { isAuthorized } = useLeadCapture()
  const [upcomingExams, setUpcomingExams] = useState<Exam[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function fetchExams() {
      const { data, error } = await supabase.from('exams').select('*')
      if (!error) {
        setUpcomingExams((data || []).map((e: any) => ({
          ...e,
          fullName: e.full_name,
          date: e.exam_date,
          registrationDeadline: e.registration_deadline,
        })))
      }
      setLoading(false)
    }
    fetchExams()
  }, [])

  const handleRemindClick = (exam: Exam) => {
    if (isAuthorized) {
      alert(`Reminder set for ${exam.name}! We'll notify you of any updates.`)
      return
    }
    setSelectedExam(exam)
    setIsModalOpen(true)
  }

  const handleDetailsClick = (e: React.MouseEvent, exam: any) => {
    e.preventDefault()
    if (isAuthorized) {
      window.location.href = `/exams/${exam.slug}`
      return
    }
    setSelectedExam({
      id: exam.slug,
      name: exam.name,
      fullName: exam.fullName,
      stream: exam.stream,
      date: 'TBA',
      registrationDeadline: 'TBA',
      applicants: exam.applicants,
      conductedBy: 'TBA'
    } as Exam)
    setIsModalOpen(true)
  }

  return (
    <section id="exams" className="py-20" style={{ background: 'var(--surface-2)' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-px" style={{ background: 'var(--gold)' }} />
              <span className="text-[10px] md:text-xs font-bold tracking-wider uppercase" style={{ color: 'var(--gold)', letterSpacing: '0.1em' }}>
                Entrance exams
              </span>
            </div>
            <h2
              className="text-3xl md:text-5xl font-medium leading-tight"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em', color: 'var(--ink)' }}
            >
              Top exams in India
            </h2>
            <p className="mt-2 text-xs md:text-sm max-w-2xl" style={{ color: 'var(--ink-3)' }}>
              Eligibility, dates, preparation guides & direct apply links for every major exam.
            </p>
          </div>
          <Link
            href="/exams"
            className="flex items-center gap-1.5 text-xs md:text-sm font-bold transition-all duration-150 hover:opacity-80 self-start md:self-auto"
            style={{ color: 'var(--action)' }}
          >
            View all exams
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Top Exams — Marquee */}
        <div className="relative mb-14 overflow-hidden">
          <div className="flex animate-marquee-slow hover:[animation-play-state:paused]">
            {[...topExams, ...topExams, ...topExams].map((exam, idx) => {
              const Icon = exam.icon
              return (
                <div key={`${exam.slug}-${idx}`} className="flex-shrink-0 mx-2">
                  <div
                    className="w-56 rounded-xl p-4 card-hover flex flex-col gap-2.5"
                    style={{ background: 'var(--surface)', border: '0.5px solid var(--border)' }}
                  >
                    {/* Top row */}
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--gold-light)' }}>
                        <Icon size={15} style={{ color: 'var(--gold-dark)' }} />
                      </div>
                      <span
                        className="text-[9px] font-medium px-2 py-0.5"
                        style={{
                          background: 'var(--gold-light)',
                          color: 'var(--gold-dark)',
                          border: '0.5px solid var(--border)',
                          borderRadius: '999px',
                        }}
                      >
                        {exam.stream}
                      </span>
                    </div>

                    {/* Name */}
                    <div>
                      <Link href={`/exams/${exam.slug}`} className="hover:opacity-80 transition-opacity">
                        <h3 className="font-medium text-sm mb-0.5" style={{ color: 'var(--ink)', letterSpacing: '-0.01em' }}>
                          {exam.name}
                        </h3>
                      </Link>
                      <p className="text-[10px] leading-snug line-clamp-1" style={{ color: 'var(--ink-3)' }}>
                        {exam.fullName}
                      </p>
                    </div>

                    {/* Applicants */}
                    <div className="flex items-center gap-1.5 text-[10px]" style={{ color: 'var(--ink-4)' }}>
                      <Users size={10} />
                      {exam.applicants} applicants
                    </div>

                    <div style={{ height: '0.5px', background: 'var(--border)' }} />

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleDetailsClick(e, exam)}
                        className="flex-1 text-center text-[10px] font-medium py-1.5 rounded-lg transition-colors duration-150"
                        style={{ color: 'var(--action)', background: 'var(--surface-2)' }}
                      >
                        Details
                      </button>
                      <a
                        href={exam.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 flex items-center justify-center gap-1 text-[10px] font-medium py-1.5 rounded-lg text-white transition-opacity duration-150 hover:opacity-90"
                        style={{ background: 'var(--midnight)' }}
                      >
                        Apply <ExternalLink size={9} />
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
        </div>

        {/* Upcoming Exams from DB */}
        {(loading || upcomingExams.length > 0) && (
          <>
            <div className="flex items-center gap-2 mb-5">
              <Calendar size={14} style={{ color: 'var(--gold)' }} />
              <span className="text-xs font-medium tracking-wider uppercase" style={{ color: 'var(--ink-3)', letterSpacing: '0.08em' }}>
                Upcoming Deadlines
              </span>
            </div>

            <div className="relative overflow-hidden">
              <div className="flex animate-marquee hover:[animation-play-state:paused]">
                {loading ? (
                  [1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="flex-shrink-0 w-64 h-40 rounded-xl bg-white/50 border border-slate-100 mx-2 animate-pulse" />
                  ))
                ) : (
                  [...upcomingExams, ...upcomingExams, ...upcomingExams].map((exam, idx) => {
                    const color = streamColors[exam.stream] || streamColors['Engineering']
                    return (
                      <div key={`upcoming-${exam.id}-${idx}`} className="flex-shrink-0 mx-2">
                        <div
                          className="w-64 rounded-xl p-4 card-hover flex flex-col gap-3"
                          style={{ background: 'var(--surface)', border: '0.5px solid var(--border)' }}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-medium text-sm mb-0.5" style={{ color: 'var(--ink)', letterSpacing: '-0.01em' }}>
                                {exam.name}
                              </h3>
                              <p className="text-[10px] leading-snug" style={{ color: 'var(--ink-3)' }}>
                                {exam.fullName}
                              </p>
                            </div>
                            <span
                              className="text-[9px] px-2 py-0.5 flex-shrink-0 font-medium"
                              style={{ background: color.bg, color: color.text, border: `0.5px solid ${color.border}`, borderRadius: '999px' }}
                            >
                              {exam.stream}
                            </span>
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-2 text-[10px]" style={{ color: 'var(--ink-3)' }}>
                              <Calendar size={10} style={{ flexShrink: 0 }} />
                              <span>{exam.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px]" style={{ color: 'var(--ink-3)' }}>
                              <Users size={10} style={{ flexShrink: 0 }} />
                              <span>{exam.applicants} applicants · {exam.conductedBy}</span>
                            </div>
                          </div>

                          <div style={{ height: '0.5px', background: 'var(--border)' }} />

                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-[9px] mb-0.5" style={{ color: 'var(--ink-4)' }}>Registration deadline</div>
                              <div
                                className="text-[10px] font-medium px-2 py-0.5 inline-block"
                                style={{
                                  background: 'var(--gold-light)',
                                  color: 'var(--gold-dark)',
                                  border: '0.5px solid var(--gold-muted)',
                                  borderRadius: '999px',
                                }}
                              >
                                {exam.registrationDeadline}
                              </div>
                            </div>
                            <button
                              onClick={() => handleRemindClick(exam)}
                              className="flex items-center gap-1 text-[10px] transition-colors duration-150 hover:opacity-70"
                              style={{ color: 'var(--action)' }}
                            >
                              <Bell size={10} />
                              Remind
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>

              {/* Fade edges */}
              <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
            </div>
          </>
        )}

      </div>

      {selectedExam && (
        <BrochureModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          collegeName={selectedExam.name}
          stream={selectedExam.stream || 'General'}
          mode={selectedExam.conductedBy === 'TBA' ? 'details' : 'remind'}
          targetUrl={selectedExam.conductedBy === 'TBA' ? `/exams/${selectedExam.id}` : undefined}
        />
      )}
    </section>
  )
}
