'use client'

import { useState, useEffect } from 'react'
import { Search, ChevronLeft, ChevronRight, GraduationCap, BookOpen, Award, CheckCircle2, Target, TrendingUp, Users } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'

const carouselImages = [
  "https://cnfmhdlkdjgnaqhngpin.supabase.co/storage/v1/object/public/college_images/Hero%20Carousel/amitynoida.jpg",
  "https://cnfmhdlkdjgnaqhngpin.supabase.co/storage/v1/object/public/college_images/Hero%20Carousel/bitsgoa.webp",
  "https://cnfmhdlkdjgnaqhngpin.supabase.co/storage/v1/object/public/college_images/Hero%20Carousel/coepPune.jpg",
  "https://cnfmhdlkdjgnaqhngpin.supabase.co/storage/v1/object/public/college_images/Hero%20Carousel/mitwpu.webp",
  "https://cnfmhdlkdjgnaqhngpin.supabase.co/storage/v1/object/public/college_images/Hero%20Carousel/parulUniversity.webp",
  "https://cnfmhdlkdjgnaqhngpin.supabase.co/storage/v1/object/public/college_images/Hero%20Carousel/sapthagiriNps.webp"
]

// Optimization helper for Supabase Storage
const getOptimizedUrl = (url: string) => {
  return url.replace('/object/public/', '/render/image/public/') + '?width=1920&quality=80&format=webp';
}



const stats = [
  { label: '6000+ Institutions', icon: GraduationCap },
  { label: '50+ Entrance Exams', icon: BookOpen },
  { label: '200+ Student Reviews', icon: Award },
  { label: '10,000+ Monthly Students', icon: Users },
]

const trustBadges = [
  { label: 'Entrance Support', icon: CheckCircle2 },
  { label: 'Rank Prediction', icon: TrendingUp },
  { label: 'Direct Admissions', icon: Users },
  { label: 'Placement Stats', icon: Award },
]

const localFallbacks = [
  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1920", // College Campus
  "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1920", // University Building
  "https://images.unsplash.com/photo-1523050853064-802160043f21?auto=format&fit=crop&q=80&w=1920", // Library/Hall
  "https://images.unsplash.com/photo-1498243639391-f1f074e04996?auto=format&fit=crop&q=80&w=1920"  // Modern Campus
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(false)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  // Live search logic
  useEffect(() => {
    const searchColleges = async () => {
      if (query.length < 2) {
        setResults([])
        return
      }
      setLoading(true)
      const { data, error } = await supabase
        .from('colleges')
        .select('name, location, stream')
        .or(`name.ilike.%${query}%,location.ilike.%${query}%,stream.ilike.%${query}%`)
        .limit(5)

      if (!error && data) setResults(data)
      setLoading(false)
    }
    const timer = setTimeout(searchColleges, 300)
    return () => clearTimeout(timer)
  }, [query])

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center py-20 md:py-0 bg-slate-950">
      
      {/* Background Carousel */}
      {carouselImages.map((url, idx) => (
        <div
          key={idx}
          className={cn(
            "absolute inset-0 transition-all duration-[2500ms] ease-in-out",
            currentSlide === idx ? "opacity-100 scale-100" : "opacity-0 scale-110"
          )}
        >
          {/* Deep Gradient Overlay to hide artifacts and pop text */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/30 to-slate-900/80 z-10" />
          <img 
            src={imageErrors[idx] ? localFallbacks[idx % localFallbacks.length] : getOptimizedUrl(url)} 
            alt={`College Campus ${idx + 1}`} 
            className="w-full h-full object-cover" 
            style={{ imageRendering: 'auto' }}
            onError={() => setImageErrors(prev => ({ ...prev, [idx]: true }))}
            // @ts-ignore
            fetchpriority={currentSlide === idx ? "high" : "low"}
          />
        </div>
      ))}

      {/* Main Content Area - Pushed slightly below center for balance */}
      <div className="relative z-20 max-w-4xl w-full px-6 flex flex-col items-center justify-center translate-y-4 md:translate-y-10">
        
        <div className="w-full px-6 md:px-10 py-8 md:py-10 rounded-[40px] bg-white/[0.02] backdrop-blur-sm border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-700 text-center">
          
          <div className="mb-6 flex flex-col items-center">
            {/* Hero Logo */}
            <div className="mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white/20 overflow-hidden bg-white shadow-2xl relative mx-auto">
                <img
                  src="/images/PromoteEducationLogo.png"
                  alt="Promote Education"
                  className="w-full h-full object-contain scale-[1.2] -translate-y-[2px]"
                />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tighter leading-[1.1]">
              Top <span className="text-sky-400">Colleges in India 2026</span>
              <span className="block text-xl md:text-2xl font-medium text-white/90 mt-1">NIRF Rankings & Admissions</span>
            </h1>
            <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto font-medium leading-relaxed">
              Complete admission guidance for Engineering, Management, and Medical across India based on latest data.
            </p>
          </div>

          {/* Stats Chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-[10px] font-bold uppercase tracking-wider hover:bg-white/10 transition-colors"
              >
                <stat.icon size={12} className="text-gold" />
                {stat.label}
              </div>
            ))}
          </div>

          {/* Combined Search Bar */}
          <div className="relative max-w-4xl mx-auto mb-6 group">
             <div className={cn(
               "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 p-2 sm:p-1 rounded-[24px] sm:rounded-pill shadow-2xl transition-all duration-300",
               focused ? "bg-white ring-4 ring-gold/20" : "bg-white/95"
             )}>
                <div className="flex items-center flex-1">
                  <div className="pl-4 sm:pl-5 text-ink-4">
                    <Search size={18} />
                  </div>
                  <input 
                    type="text"
                    placeholder="Search Colleges, Courses, Exams..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setTimeout(() => setFocused(false), 200)}
                    className="flex-1 bg-transparent px-2 py-3 sm:py-2.5 text-xs sm:text-sm font-medium text-ink outline-none border-none placeholder:text-ink-4"
                  />
                </div>
                <button className="px-8 py-3 sm:py-2.5 bg-action text-white text-xs sm:text-sm font-bold rounded-[18px] sm:rounded-pill hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-action/20">
                   Search
                </button>
             </div>

             {/* Search Results Dropdown */}
             {focused && results.length > 0 && (
               <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-border animate-in slide-in-from-top-2 duration-200 z-[60]">
                  {results.map((res, i) => (
                    <button 
                      key={i}
                      className="w-full flex flex-col items-start px-5 md:px-6 py-3 md:py-4 hover:bg-surface-2 transition-colors border-b border-border last:border-0"
                    >
                       <span className="text-xs md:text-sm font-bold text-ink">{res.name}</span>
                       <span className="text-[9px] md:text-[10px] text-ink-3 uppercase tracking-wider">{res.stream} • {res.location}</span>
                    </button>
                  ))}
               </div>
             )}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <button className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-action text-white text-sm font-bold rounded-xl md:rounded-2xl hover:brightness-110 hover:-translate-y-1 transition-all shadow-xl shadow-action/30 flex items-center justify-center gap-2">
              Find Top Colleges
              <ArrowRight size={18} />
            </button>
            <button className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 text-white text-sm font-bold border border-white/30 rounded-xl md:rounded-2xl transition-all flex items-center justify-center gap-2">
              Counseling 2026
            </button>
          </div>
        </div>

        {/* Bottom Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mt-12">
           {trustBadges.map((badge, i) => (
             <div key={i} className="flex items-center gap-2 text-white/50 text-[11px] font-bold uppercase tracking-widest group cursor-default">
                <badge.icon size={16} className="text-gold group-hover:scale-125 transition-transform" />
                {badge.label}
             </div>
           ))}
        </div>

      </div>

    </section>
  )
}

function ArrowRight({ size }: { size: number }) {
  return <TrendingUp size={size} className="ml-1" />
}
