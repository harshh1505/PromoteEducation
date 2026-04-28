'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, ArrowRight, Sparkles } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

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
    { label: 'MBA Programs', query: 'management' },
  ]

  return (
    <section className="relative w-full bg-[var(--surface)] overflow-hidden min-h-[600px] flex items-center">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface)]/80 via-transparent to-[var(--surface)] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--surface)] via-transparent to-[var(--surface)]/40 z-10" />
        
        {/* Slides */}
        <div 
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            !isTransitioning ? "opacity-40" : "opacity-0"
          )}
        >
          <img 
            src={getCurrentImageUrl(currentSlide)}
            alt="Campus"
            className="w-full h-full object-cover animate-ken-burns grayscale-[20%]"
          />
        </div>
        <div 
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            isTransitioning ? "opacity-40" : "opacity-0"
          )}
        >
          <img 
            src={getCurrentImageUrl(nextSlide)}
            alt="Campus"
            className="w-full h-full object-cover animate-ken-burns grayscale-[20%]"
          />
        </div>
      </div>

      <Container className="relative z-20 py-20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--action)]/10 text-[var(--action)] text-sm font-medium mb-6 animate-on-load">
            <Sparkles size={16} />
            India's Most Trusted Admission Portal
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-[var(--ink)] tracking-tight mb-6 animate-on-load stagger-1" style={{ fontFamily: 'var(--font-display)' }}>
            Find Your Dream <br />
            <span className="text-[var(--action)] font-semibold italic">Academic Future</span>
          </h1>
          
          <p className="text-[var(--ink-2)] text-xl md:text-2xl max-w-2xl mb-10 animate-on-load stagger-2">
            Get honest reviews, accurate cutoffs, and personalized admissions guidance from experts.
          </p>

          <div className="relative max-w-2xl mb-8 animate-on-load stagger-3">
            <div className={cn(
              "flex items-center gap-3 bg-white/70 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl border transition-all duration-300 p-2",
              focused ? "ring-4 ring-[var(--action)]/10 border-[var(--action)]/30" : "border-white/50"
            )}>
              <div className="pl-4 text-[var(--ink-4)]">
                <Search size={22} />
              </div>
              <input
                type="text"
                placeholder="Search college, course, or exam..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 200)}
                className="flex-1 py-4 md:py-5 text-lg text-[var(--ink)] outline-none placeholder:text-[var(--ink-4)] bg-transparent"
              />
              <Button size="lg" className="hidden md:flex">
                Search
              </Button>
            </div>

            {focused && results.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-4 bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-[var(--border)] overflow-hidden z-50 animate-on-load">
                {results.map((res) => (
                  <button
                    key={res.id}
                    onClick={() => router.push(`/colleges/${res.slug}`)}
                    className="w-full flex items-center gap-4 px-6 py-4 hover:bg-[var(--action)]/5 transition-all text-left border-b border-[var(--border)]/50 last:border-0 group"
                  >
                    <div className="p-2 rounded-lg bg-[var(--surface-2)] group-hover:bg-[var(--action)]/10 transition-colors">
                      <MapPin size={18} className="text-[var(--ink-3)] group-hover:text-[var(--action)]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--ink)] group-hover:text-[var(--action)] transition-colors">{res.name}</div>
                      <div className="text-sm text-[var(--ink-3)]">{res.stream} • {res.location}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--ink-3)] animate-on-load stagger-4">
            <span className="font-medium">Popular:</span>
            {popularSearches.map((item, i) => (
              <button
                key={i}
                onClick={() => setQuery(item.query)}
                className="px-4 py-2 bg-white/50 backdrop-blur-md rounded-full border border-white/50 hover:bg-[var(--action)] hover:text-white hover:border-[var(--action)] transition-all duration-300"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-6 animate-on-load stagger-5">
            <Button size="lg" className="group" onClick={() => router.push('/colleges')}>
              Explore Colleges
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              Compare Exams
            </Button>
          </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes kenBurns {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.1) translate(-2%, -2%); }
        }
        .animate-ken-burns {
          animation: kenBurns 20s ease-in-out infinite alternate;
        }
      `}</style>
    </section>
  )
}
