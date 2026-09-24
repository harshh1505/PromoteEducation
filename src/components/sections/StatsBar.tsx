'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 12000, suffix: '+', label: 'Students Placed' },
  { value: 6000, suffix: '+', label: 'Partner Colleges' },
  { value: 98, suffix: '%', label: 'Success Rate' },
  { value: 25000, suffix: '+', label: 'Counselling Sessions' },
]

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  // Start with target so server-rendered HTML contains actual real numbers for search engines (e.g. 12,000+, 98%)
  const [count, setCount] = useState(target)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    // Respect user's reduced motion preference
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          
          const duration = 1800
          let startTimestamp: number | null = null

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp
            const elapsed = timestamp - startTimestamp
            const progress = Math.min(elapsed / duration, 1)

            // Smooth ease-out cubic curve: 1 - (1 - progress)^3
            const easeOut = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(target * easeOut))

            if (progress < 1) {
              requestAnimationFrame(step)
            } else {
              setCount(target)
            }
          }

          // Reset to 0 and trigger smooth count-up once in viewport
          setCount(0)
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
      {count.toLocaleString()}{suffix}
    </div>
  )
}

export default function StatsBar() {
  return (
    <section className="py-10 md:py-12 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-sky-50 rounded-full blur-[120px] opacity-60" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-50 rounded-full blur-[120px] opacity-60" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            Numbers that tell our story
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto">
            Our numbers showcase the trust, success, and results we deliver every year.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="text-center p-6 rounded-2xl hover:bg-sky-50/50 transition-colors duration-300">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <div className="text-sm text-slate-500 mt-2 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
