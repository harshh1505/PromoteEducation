import { ArrowRight, GitCompare } from 'lucide-react'
import Link from 'next/link'

const compareData = {
  colleges: ['IIT Bombay', 'IIT Delhi'],
  rows: [
    { label: 'Annual fees', values: ['₹2.2L / yr', '₹2.1L / yr'] },
    { label: 'Avg package', values: ['₹18.5 LPA', '₹17.2 LPA'] },
    { label: 'JEE cutoff', values: ['98.5+ percentile', '98.2+ percentile'] },
    { label: 'NIRF rank', values: ['#1', '#2'] },
    { label: 'Hostel', values: ['Available', 'Available'] },
    { label: 'NAAC grade', values: ['A++', 'A++'] },
  ],
}

export default function CompareSection() {
  return (
    <section className="py-20" style={{ background: 'var(--surface-2)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left text */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-4 h-px" style={{ background: 'var(--gold)' }} />
              <span className="text-xs font-medium tracking-wider uppercase" style={{ color: 'var(--gold)', letterSpacing: '0.1em' }}>
                Side-by-side comparison
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-medium mb-4"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em', color: 'var(--ink)' }}
            >
              Compare colleges,<br />make confident choices.
            </h2>
            <p className="text-sm mb-6" style={{ color: 'var(--ink-3)', lineHeight: 1.7 }}>
              Fees, placements, cutoffs, hostel, faculty — everything side by side. Add up to 4 colleges and share the comparison with parents.
            </p>
            <ul className="flex flex-col gap-2 mb-8">
              {[
                'Real-time fee & scholarship data',
                'Placement breakdowns by company & role',
                'Student satisfaction scores',
                'Parent-friendly PDF export',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: 'var(--ink-2)' }}
                >
                  <div
                    className="w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: 'var(--gold)' }}
                  />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/compare"
              className="flex items-center gap-2 text-sm font-medium transition-colors duration-150 hover:opacity-80 w-fit"
              style={{ color: 'var(--action)' }}
            >
              <GitCompare size={15} />
              Start comparing
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Right — comparison table preview */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: '0.5px solid var(--border)', background: 'var(--surface)' }}
          >
            {/* Table header */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: '1fr 1fr 1fr',
                background: 'var(--midnight)',
                padding: '16px 20px',
              }}
            >
              <div className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Metric
              </div>
              {compareData.colleges.map((c) => (
                <div key={c} className="text-sm font-medium text-white" style={{ letterSpacing: '-0.01em' }}>
                  {c}
                </div>
              ))}
            </div>

            {/* Rows */}
            {compareData.rows.map((row, i) => (
              <div
                key={row.label}
                className="grid"
                style={{
                  gridTemplateColumns: '1fr 1fr 1fr',
                  padding: '12px 20px',
                  borderTop: '0.5px solid var(--border)',
                  background: i % 2 === 0 ? 'var(--surface)' : 'var(--surface-2)',
                }}
              >
                <div className="text-xs" style={{ color: 'var(--ink-3)' }}>{row.label}</div>
                {row.values.map((v, vi) => (
                  <div
                    key={vi}
                    className="text-sm font-medium"
                    style={{ color: 'var(--ink)', letterSpacing: '-0.01em' }}
                  >
                    {v}
                  </div>
                ))}
              </div>
            ))}

            {/* Add college button */}
            <div
              className="px-5 py-4 flex items-center justify-center gap-2 cursor-pointer transition-colors duration-150 hover:bg-surface-2"
              style={{ borderTop: '0.5px solid var(--border)' }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-lg"
                style={{ background: 'var(--surface-2)', color: 'var(--ink-3)' }}
              >
                +
              </div>
              <span className="text-sm" style={{ color: 'var(--ink-3)' }}>Add another college</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
