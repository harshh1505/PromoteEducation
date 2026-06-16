'use client'

import { useEffect, useState } from 'react'
import { Activity, Users, FileText, Star, MapPin, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PulseItem {
  type: 'brochure' | 'viewing' | 'review' | 'apply'
  name?: string
  city?: string
  college?: string
  count?: number
  stream?: string
  rating?: number
  icon: any
}

const activities: PulseItem[] = [
  { type: 'brochure', name: 'Ankit Sharma', city: 'Delhi', college: 'IIT Delhi', icon: FileText },
  { type: 'viewing', count: 42, stream: 'MBA', icon: Users },
  { type: 'review', rating: 5, college: 'IEM Kolkata', icon: Star },
  { type: 'brochure', name: 'Priya Das', city: 'Kolkata', college: 'Heritage Institute', icon: FileText },
  { type: 'viewing', count: 128, stream: 'Engineering', icon: Users },
  { type: 'apply', name: 'Rahul Varma', city: 'Mumbai', college: 'BITS Pilani', icon: Zap },
  { type: 'viewing', count: 85, stream: 'Medical', icon: Users },
  { type: 'brochure', name: 'Sneha Reddy', city: 'Bangalore', college: 'RV College', icon: FileText },
]

export default function LivePulse() {
  const [pulseData, setPulseData] = useState<PulseItem[]>(activities)
  const [mounted, setMounted] = useState(false)

  // Simulation of "Live" updates
  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      // Rotate the array to simulate movement
      setPulseData((prev) => {
        const next = [...prev]
        const first = next.shift()
        if (first) next.push(first)
        return next
      })
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full bg-slate-900 py-3.5 border-y border-white/5 overflow-hidden relative group">
      {/* Background Glows */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-10" />
      
      <div className="flex items-center gap-12 animate-marquee-slow whitespace-nowrap px-10">
        {[...pulseData, ...pulseData].map((item, i) => (
          <div 
            key={i} 
            className="flex items-center gap-3 group/item cursor-default"
          >
            <div className={cn(
              "w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-500",
              item.type === 'brochure' ? "bg-sky-500/15 text-sky-400" :
              item.type === 'viewing' ? "bg-emerald-500/15 text-emerald-400" :
              item.type === 'review' ? "bg-amber-500/15 text-amber-400" :
              "bg-purple-500/15 text-purple-400"
            )}>
              <item.icon size={13} />
            </div>

            <div className="flex flex-col">
              <div className="text-[11px] font-medium text-white/80 flex items-center gap-1.5">
                {item.type === 'brochure' && (
                  <>
                    <span className="text-white font-semibold">{item.name}</span>
                    <span className="text-white/30">from</span>
                    <span className="text-sky-400 flex items-center gap-1"><MapPin size={10} /> {item.city}</span>
                    <span className="text-white/30">requested brochure for</span>
                    <span className="text-white font-semibold">{item.college}</span>
                  </>
                )}
                {item.type === 'viewing' && (
                  <>
                    <span className="text-emerald-400 font-semibold">
                      {mounted ? (item.count || 0) + Math.floor(Math.random() * 10) : item.count}
                    </span>
                    <span className="text-white/30">students viewing</span>
                    <span className="text-white font-semibold">{item.stream} Colleges</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
                  </>
                )}
                {item.type === 'review' && (
                  <>
                    <span className="text-white/30">5-star review for</span>
                    <span className="text-white font-semibold">{item.college}</span>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[1,2,3,4,5].map(s => <Star key={s} size={8} fill="currentColor" />)}
                    </div>
                  </>
                )}
                {item.type === 'apply' && (
                  <>
                    <span className="text-white font-semibold">{item.name}</span>
                    <span className="text-white/30">started application for</span>
                    <span className="text-purple-400 font-semibold">{item.college}</span>
                    <Zap size={10} className="text-purple-400" />
                  </>
                )}
              </div>
              <span className="text-[8px] font-medium uppercase tracking-[0.15em] text-white/15">Just now</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
