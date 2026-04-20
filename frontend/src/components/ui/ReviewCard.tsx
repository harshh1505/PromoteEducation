import { CheckCircle, ThumbsUp, ThumbsDown } from 'lucide-react'
import type { Review } from '@/types'

interface ReviewCardProps {
  review: Review
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-4 card-hover"
      style={{
        background: 'var(--surface)',
        border: '0.5px solid var(--border)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0"
            style={{
              background: 'var(--surface-2)',
              color: 'var(--ink-2)',
              border: '0.5px solid var(--border)',
            }}
          >
            {review.initials}
          </div>
          <div>
            <div className="text-sm font-medium" style={{ color: 'var(--ink)', letterSpacing: '-0.01em' }}>
              {review.studentName}
            </div>
            <div className="text-xs" style={{ color: 'var(--ink-3)' }}>
              {review.course} · {review.year}
            </div>
          </div>
        </div>

        {/* Stars */}
        <div className="flex gap-0.5 flex-shrink-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full"
              style={{
                background: i < review.rating ? 'var(--gold)' : 'var(--surface-3)',
              }}
            />
          ))}
        </div>
      </div>

      {/* College badge */}
      <div
        className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-pill self-start"
        style={{
          background: 'var(--midnight)',
          color: 'rgba(255,255,255,0.7)',
          borderRadius: '999px',
        }}
      >
        {review.college}
        {review.verified && (
          <CheckCircle size={9} style={{ color: 'var(--success)' }} />
        )}
      </div>

      {/* Review text */}
      <p
        className="text-sm leading-relaxed"
        style={{
          color: 'var(--ink-2)',
          display: '-webkit-box',
          WebkitLineClamp: 4,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {review.reviewText}
      </p>

      {/* Pros & Cons */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="flex items-center gap-1 text-xs font-medium mb-1.5" style={{ color: 'var(--success)' }}>
            <ThumbsUp size={10} />
            Pros
          </div>
          <ul className="flex flex-col gap-1">
            {review.pros.slice(0, 2).map((p) => (
              <li key={p} className="text-xs" style={{ color: 'var(--ink-3)' }}>
                · {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex items-center gap-1 text-xs font-medium mb-1.5" style={{ color: '#E24B4A' }}>
            <ThumbsDown size={10} />
            Cons
          </div>
          <ul className="flex flex-col gap-1">
            {review.cons.slice(0, 2).map((c) => (
              <li key={c} className="text-xs" style={{ color: 'var(--ink-3)' }}>
                · {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div
        className="flex items-center gap-1.5 pt-1"
        style={{ borderTop: '0.5px solid var(--border)' }}
      >
        <CheckCircle size={10} style={{ color: 'var(--success)' }} />
        <span className="text-xs" style={{ color: 'var(--ink-3)' }}>Verified student</span>
      </div>
    </div>
  )
}
