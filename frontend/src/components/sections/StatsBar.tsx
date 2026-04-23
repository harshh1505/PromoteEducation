const stats = [
  { value: '6000+', label: 'Institutions' },
  { value: '200+', label: 'Student reviews' },
  { value: '50+', label: 'Entrance exams' },
  { value: '10,000+', label: 'Monthly students' },
]

export default function StatsBar() {
  return (
    <section className="overflow-hidden" style={{ background: 'var(--surface-2)', borderTop: '0.5px solid var(--border)', borderBottom: '0.5px solid var(--border)' }}>
      <div className="w-full max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x" style={{ '--tw-divide-opacity': 1 } as React.CSSProperties}>
          {stats.map((stat, i) => (
            <div key={i} className="text-center md:px-8">
              <div
                className="text-2xl md:text-3xl font-medium mb-1"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)', letterSpacing: '-0.03em' }}
              >
                {stat.value}
              </div>
              <div className="text-sm" style={{ color: 'var(--ink-3)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
