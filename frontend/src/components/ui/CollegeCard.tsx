import { ArrowRight, GitCompare, MapPin, CheckCircle } from 'lucide-react'
import type { College } from '@/types'
import { formatCTC, formatFee } from '@/lib/utils'
import MatchScoreRing from '@/components/ui/MatchScoreRing'

interface CollegeCardProps {
  college: College
  showMatch?: boolean
}

export default function CollegeCard({ college, showMatch = true }: CollegeCardProps) {
  return (
    <div
      className="rounded-xl overflow-hidden card-hover flex flex-col"
      style={{
        background: 'var(--surface)',
        border: '0.5px solid var(--border)',
      }}
    >
      {/* Dark header */}
      <div className="px-5 py-4" style={{ background: 'var(--midnight)' }}>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <MapPin size={10} />
            {college.location}, {college.state}
          </div>
          <div
            className="text-xs font-medium px-2.5 py-0.5 rounded-pill flex-shrink-0"
            style={{
              background: 'var(--gold)',
              color: 'var(--midnight)',
              borderRadius: '999px',
            }}
          >
            #{college.rank} {college.rankingBody}
          </div>
        </div>
        <h3 className="text-white font-medium text-base mb-0.5" style={{ letterSpacing: '-0.02em' }}>
          {college.name}
        </h3>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
          {college.stream}
        </p>
      </div>

      {/* Body */}
      <div className="px-5 py-4 flex flex-col gap-4 flex-1">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: formatCTC(college.avgCTC), label: 'Avg CTC' },
            { value: formatCTC(college.highestCTC), label: 'Highest' },
            { 
              value: college.cutoff, 
              label: college.cutoffExam ? `Cutoff (${college.cutoffExam})` : 'Cutoff' 
            },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-sm font-medium" style={{ color: 'var(--ink)', letterSpacing: '-0.01em' }}>
                {s.value}
              </div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--ink-3)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: '0.5px', background: 'var(--border)' }} />

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {college.type === 'government' && (
            <span
              className="text-xs px-2.5 py-1 rounded-pill font-medium"
              style={{
                background: 'var(--gold-light)',
                color: 'var(--gold-dark)',
                border: '0.5px solid var(--gold-muted)',
                borderRadius: '999px',
              }}
            >
              Govt. funded
            </span>
          )}
          {college.accreditation.slice(0, 2).map((a) => (
            <span
              key={a}
              className="text-xs px-2.5 py-1 rounded-pill"
              style={{
                background: 'var(--surface-2)',
                color: 'var(--ink-2)',
                border: '0.5px solid var(--border)',
                borderRadius: '999px',
              }}
            >
              {a}
            </span>
          ))}
          {college.verified && (
            <span
              className="text-xs px-2.5 py-1 rounded-pill flex items-center gap-1"
              style={{
                background: 'rgba(29,184,122,0.08)',
                color: 'var(--success)',
                border: '0.5px solid rgba(29,184,122,0.2)',
                borderRadius: '999px',
              }}
            >
              <CheckCircle size={10} />
              Verified
            </span>
          )}
        </div>

        {/* Match score + admission chance */}
        {showMatch && college.matchScore && (
          <>
            <div style={{ height: '0.5px', background: 'var(--border)' }} />
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <MatchScoreRing score={college.matchScore} size={44} />
                <div>
                  <div className="text-xs font-medium" style={{ color: 'var(--ink)' }}>Match score</div>
                  <div className="text-xs" style={{ color: 'var(--ink-3)' }}>Your profile fit</div>
                </div>
              </div>
              {college.admissionChance && (
                <div className="text-right">
                  <div className="text-xs mb-1" style={{ color: 'var(--ink-3)' }}>Admission chance</div>
                  <div className="flex items-center gap-1.5">
                    <div
                      className="h-1.5 w-20 rounded-full overflow-hidden"
                      style={{ background: 'var(--surface-3)' }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${college.admissionChance}%`,
                          background: college.admissionChance > 60
                            ? 'var(--success)'
                            : college.admissionChance > 35
                            ? 'var(--gold)'
                            : '#E24B4A',
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium" style={{ color: 'var(--ink)' }}>
                      {college.admissionChance}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between mt-auto pt-1">
          <button
            className="flex items-center gap-1 text-sm font-medium transition-colors duration-150 hover:opacity-80"
            style={{ color: 'var(--action)' }}
          >
            View details
            <ArrowRight size={13} />
          </button>
          <button
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-pill transition-all duration-150 hover:bg-surface-2"
            style={{
              color: 'var(--ink-2)',
              border: '0.5px solid var(--border)',
              borderRadius: '999px',
            }}
          >
            <GitCompare size={11} />
            Compare
          </button>
        </div>
      </div>
    </div>
  )
}
