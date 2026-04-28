'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, GraduationCap, ArrowRight } from 'lucide-react'
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

const getOptimizedUrl = (url: string) => {
  return url.replace('/object/public/', '/render/image/public/') + '?width=1920&quality=80&format=webp';
}

const localFallbacks = [
  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1523050853064-802160043f21?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1498243639391-f1f074e04996?auto=format&fit=crop&q=80&w=1920"
]

export default function HeroSection() {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [nextSlide, setNextSlide] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [focused, setFocused] = useState(false)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({})

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
      const next = (currentSlide + 1) % carouselImages.length;
      setNextSlide(next);
      setTimeout(() => {
        setCurrentSlide(next);
        setIsTransitioning(false);
      }, 1000);
    }, 6000)
    return () => clearInterval(interval)
  }, [currentSlide])

  useEffect(() => {
    const searchColleges = async () => {
      if (query.length < 2) {
        setResults([])
        return
      }
      const { data, error } = await supabase
        .from('colleges')
        .select('id, slug, name, location, stream')
        .or(`name.ilike.%${query}%,location.ilike.%${query}%,stream.ilike.%${query}%`)
        .limit(5)

      if (!error && data) setResults(data)
    }
    const timer = setTimeout(searchColleges, 300)
    return () => clearTimeout(timer)
  }, [query])

  const getCurrentImageUrl = (idx: number) => {
    const url = carouselImages[idx];
    if (imageErrors[idx]) return localFallbacks[idx % localFallbacks.length];
    return getOptimizedUrl(url);
  };

  const popularSearches = [
    { label: 'IIT Admissions', query: 'iit' },
    { label: 'Medical Colleges', query: 'medical' },
    { label: 'MBA', query: 'management' },
  ]

  return (
    <section className="relative w-full bg-surface overflow-hidden">
      <div className="absolute inset-0 h-[500px] md:h-[600px]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/10 to-white/40 z-10" />
          <img 
            src={localFallbacks[0]}
            alt="Campus"
            className="w-full h-full object-cover"
          />
        </div>

        <div 
          className={cn(
            "absolute inset-0 transition-all duration-[3000ms] ease-in-out",
            !isTransitioning ? "opacity-100 z-10" : "opacity-0 z-10"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/10 to-white/40 z-10" />
          {imagesLoaded[currentSlide] && (
            <img 
              src={getCurrentImageUrl(currentSlide)}
              alt={`Campus ${currentSlide + 1}`}
              className="w-full h-full object-cover animate-ken-burns"
            />
          )}
        </div>

        <div 
          className={cn(
            "absolute inset-0 transition-all duration-1000 ease-in-out",
            isTransitioning ? "opacity-100 z-20" : "opacity-0 z-0"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/10 to-white/40 z-10" />
          {imagesLoaded[nextSlide] && (
            <img 
              src={getCurrentImageUrl(nextSlide)}
              alt={`Campus ${nextSlide + 1}`}
              className="w-full h-full object-cover animate-ken-burns"
            />
          )}
        </div>
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-ink tracking-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Find Your Dream <span className="text-action font-semibold">College</span>
          </h1>
          
          <p className="text-ink-2 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Get honest reviews, accurate cutoffs, and personalized admissions guidance.
          </p>

          <div className="relative max-w-2xl mx-auto mb-6">
            <div className={cn(
              "flex items-center gap-3 bg-white rounded-xl md:rounded-2xl shadow-lg border transition-all duration-200",
              focused ? "ring-2 ring-action/20 border-action/30" : "border-slate-200"
            )}>
              <div className="pl-4 text-slate-400">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search college, course, or exam..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 200)}
                className="flex-1 py-4 md:py-5 text-base text-slate-800 outline-none placeholder:text-slate-400 bg-transparent"
              />
              <button className="mr-2 px-6 py-2.5 bg-action text-white font-medium rounded-lg hover:bg-action/90 transition-colors">
                Search
              </button>
            </div>

            {focused && results.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50">
                {results.map((res) => (
                  <button
                    key={res.id}
                    onClick={() => router.push(`/colleges/${res.slug}`)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left border-b border-slate-100 last:border-0"
                  >
                    <MapPin size={16} className="text-slate-400" />
                    <div>
                      <div className="font-medium text-slate-800">{res.name}</div>
                      <div className="text-xs text-slate-500">{res.stream} • {res.location}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-ink-3">
            <span>Popular:</span>
            {popularSearches.map((item, i) => (
              <button
                key={i}
                onClick={() => setQuery(item.query)}
                className="px-3 py-1 bg-white/80 rounded-full border border-slate-200 hover:bg-white hover:border-action/30 hover:text-action transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <button 
            onClick={() => router.push('/colleges')}
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-ink text-white font-medium rounded-xl hover:bg-midnight transition-colors shadow-lg"
          >
            Browse All Colleges
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8 md:gap-12 text-center">
          <div>
            <div className="text-2xl md:text-3xl font-semibold text-ink">6000+</div>
            <div className="text-sm text-ink-3">Institutes</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-semibold text-ink">50+</div>
            <div className="text-sm text-ink-3">Entrance Exams</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-semibold text-ink">200+</div>
            <div className="text-sm text-ink-3">Student Reviews</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-ken-burns {
          animation: kenBurns 20s ease-in-out infinite alternate;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-ken-burns { animation: none; }
        }
      `}</style>
    </section>
  )
}