'use client'

import { useState, useEffect } from 'react'
import { Search, GraduationCap, BookOpen, Award, CheckCircle2, TrendingUp, Users, ArrowRight } from 'lucide-react'
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
  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1523050853064-802160043f21?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1498243639391-f1f074e04996?auto=format&fit=crop&q=80&w=1920"
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [nextSlide, setNextSlide] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(false)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({})

  // Preload all images on mount
  useEffect(() => {
    carouselImages.forEach((url, idx) => {
      const img = new Image();
      img.src = getOptimizedUrl(url);
      img.onload = () => {
        setImagesLoaded(prev => ({ ...prev, [idx]: true }));
      };
      img.onerror = () => {
        setImageErrors(prev => ({ ...prev, [idx]: true }));
      };
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      // Set next slide index
      const next = (currentSlide + 1) % carouselImages.length;
      setNextSlide(next);
      
      // After crossfade duration, update current slide and reset transition
      setTimeout(() => {
        setCurrentSlide(next);
        setIsTransitioning(false);
      }, 1000); // Match transition duration
      
    }, 6000) // Change every 6 seconds
    return () => clearInterval(interval)
  }, [currentSlide])

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

  // Get the current image URL
  const getCurrentImageUrl = (idx: number) => {
    const url = carouselImages[idx];
    if (imageErrors[idx]) return localFallbacks[idx % localFallbacks.length];
    return getOptimizedUrl(url);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center py-20 md:py-0 bg-black">
      
      {/* Background Carousel with Crossfade + Ken Burns Effect */}
      <div className="absolute inset-0 bg-black">
        {/* Base Placeholder Image (Visible immediately) */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90 z-10" />
          <img 
            src={localFallbacks[0]}
            alt="Promote Education Campus"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        {/* Current Image */}
        <div 
          className={cn(
            "absolute inset-0 transition-all duration-[3000ms] ease-in-out",
            !isTransitioning ? "opacity-100 z-10" : "opacity-0 z-10"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90 z-10" />
          {imagesLoaded[currentSlide] && (
            <img 
              src={getCurrentImageUrl(currentSlide)}
              alt={`College Campus ${currentSlide + 1}`}
              className="w-full h-full object-cover animate-ken-burns"
              style={{ imageRendering: 'auto' }}
            />
          )}
        </div>

        {/* Next Image (fading in) */}
        <div 
          className={cn(
            "absolute inset-0 transition-all duration-1000 ease-in-out",
            isTransitioning ? "opacity-100 z-20" : "opacity-0 z-0"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90 z-10" />
          {imagesLoaded[nextSlide] && (
            <img 
              src={getCurrentImageUrl(nextSlide)}
              alt={`College Campus ${nextSlide + 1}`}
              className="w-full h-full object-cover animate-ken-burns"
              style={{ imageRendering: 'auto' }}
            />
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-30 max-w-4xl w-full px-6 flex flex-col items-center justify-center translate-y-4 md:translate-y-10">

    <div className="w-full px-6 md:px-10 py-8 md:py-10 rounded-[40px] bg-white/[0.02] backdrop-blur-sm border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-700 text-center">

      <div className="mb-6 flex flex-col items-center">
        {/* Hero Logo */}
        <div className="mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white/20 overflow-hidden bg-white shadow-2xl relative mx-auto">
            <img
              src="/images/PromoteEducationLogo.png"
              alt="Promote Education"
              className="w-full h-full object-contain scale-[1.2] -translate-y-[2px]" />
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
            <stat.icon size={12} className="text-amber-400" />
            {stat.label}
          </div>
        ))}
      </div>

      {/* Combined Search Bar */}
      <div className="relative max-w-4xl mx-auto mb-6 group">
        <div className={cn(
          "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 p-2 sm:p-1 rounded-[24px] sm:rounded-full shadow-2xl transition-all duration-300",
          focused ? "bg-white ring-4 ring-amber-400/20" : "bg-white/95"
        )}>
          <div className="flex items-center flex-1">
            <div className="pl-4 sm:pl-5 text-gray-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search Colleges, Courses, Exams..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 200)}
              className="flex-1 bg-transparent px-2 py-3 sm:py-2.5 text-xs sm:text-sm font-medium text-gray-800 outline-none border-none placeholder:text-gray-400" />
          </div>
          <button className="px-8 py-3 sm:py-2.5 bg-blue-600 text-white text-xs sm:text-sm font-bold rounded-[18px] sm:rounded-full hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-600/20">
            Search
          </button>
        </div>

        {/* Search Results Dropdown */}
        {focused && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-gray-100 animate-in slide-in-from-top-2 duration-200 z-[60]">
            {results.map((res, i) => (
              <button
                key={i}
                className="w-full flex flex-col items-start px-5 md:px-6 py-3 md:py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 text-left"
              >
                <span className="text-xs md:text-sm font-bold text-gray-800">{res.name}</span>
                <span className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-wider">{res.stream} • {res.location}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
        <button className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-blue-600 text-white text-sm font-bold rounded-xl md:rounded-2xl hover:bg-blue-700 hover:-translate-y-1 transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2">
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
          <badge.icon size={16} className="text-amber-400 group-hover:scale-125 transition-transform" />
          {badge.label}
        </div>
      ))}
    </div>

  </div><style jsx>{`
        @keyframes kenBurns {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.1);
          }
        }
        .animate-ken-burns {
          animation: kenBurns 20s ease-in-out infinite alternate;
        }
      `}</style>
    </section>
  )
}