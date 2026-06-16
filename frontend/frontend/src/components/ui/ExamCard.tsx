import { Calendar, Bell, Users } from 'lucide-react'
import type { Exam } from '@/types'

const streamColors: Record<string, { bg: string; text: string; border: string }> = {
  Engineering: { bg: 'rgba(58,123,213,0.08)', text: '#3A7BD5', border: 'rgba(58,123,213,0.2)' },
  Medical: { bg: 'rgba(29,184,122,0.08)', text: '#1DB87A', border: 'rgba(29,184,122,0.2)' },
  MBA: { bg: 'rgba(201,168,76,0.1)', text: '#8B6A1F', border: 'rgba(201,168,76,0.25)' },
  Law: { bg: 'rgba(122,58,213,0.08)', text: '#7A3AD5', border: 'rgba(122,58,213,0.2)' },
  Design: { bg: 'rgba(213,90,48,0.08)', text: '#D55A30', border: 'rgba(213,90,48,0.2)' },
}

interface ExamCardProps {
  exam: Exam
}

export default function ExamCard({ exam }: ExamCardProps) {
  const color = streamColors[exam.stream] || streamColors['Engineering']

  return (
    <div
      className="flex-shrink-0 w-64 rounded-xl p-4 card-hover flex flex-col gap-3"
      style={{
        background: 'var(--surface)',
        border: '0.5px solid var(--border)',
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-medium text-base mb-0.5" style={{ color: 'var(--ink)', letterSpacing: '-0.01em' }}>
            {exam.name}
          </h3>
          <p className="text-xs leading-snug" style={{ color: 'var(--ink-3)' }}>
            {exam.fullName}
          </p>
        </div>
        <span
          className="text-xs px-2.5 py-1 rounded-pill flex-shrink-0 font-medium"
          style={{ background: color.bg, color: color.text, border: `0.5px solid ${color.border}`, borderRadius: '999px' }}
        >
          {exam.stream}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--ink-3)' }}>
          <Calendar size={11} style={{ flexShrink: 0 }} />
          <span>{exam.date}</span>
        </div>
        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--ink-3)' }}>
          <Users size={11} style={{ flexShrink: 0 }} />
          <span>{exam.applicants} applicants · {exam.conductedBy}</span>
        </div>
      </div>

      <div style={{ height: '0.5px', background: 'var(--border)' }} />

      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs mb-0.5" style={{ color: 'var(--ink-3)' }}>Registration deadline</div>
          <div
            className="text-xs font-medium px-2.5 py-1 rounded-pill inline-block"
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
          className="flex items-center gap-1 text-xs transition-colors duration-150 hover:opacity-70"
          style={{ color: 'var(--action)' }}
        >
          <Bell size={11} />
          Remind me
        </button>
      </div>
    </div>
  )
}
