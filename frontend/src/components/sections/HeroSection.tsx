'use client'

import { useState, useEffect } from 'react'
import { Star, ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import LeadModal from '@/components/ui/LeadModal'

const avatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100&h=100",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=100&h=100"
]
const platformTools = [
  { name: 'College Predictor', icon: '🎯', href: '/colleges' },
  { name: 'Compare Colleges', icon: '📊', href: '/#compare-section' },
  { name: 'Loan Calculator', icon: '💵', href: '/#loan-calculator-section' },
  { name: 'AI Brainstorm', icon: '💡', href: '/tools/brainstorm' },
  { name: 'Course Directory', icon: '🎓', href: '/courses' },
  { name: 'NIRF Rankings', icon: '🏆', href: '/rankings' },
  { name: 'Entrance Exams', icon: '📚', href: '/exams' },
  { name: 'Admission Support', icon: '🤝', href: '/admission-support' },
]

const carouselItems = [
  {
    name: 'Amity University, Noida',
    slug: 'amity-university-noida',
    image: 'https://cnfmhdlkdjgnaqhngpin.supabase.co/storage/v1/object/public/college_images/Hero%20Carousel/amitynoida.jpg'
  },
  {
    name: 'BITS Goa',
    slug: 'bits-goa',
    image: 'https://cnfmhdlkdjgnaqhngpin.supabase.co/storage/v1/object/public/college_images/Hero%20Carousel/bitsgoa.webp'
  },
  {
    name: 'COEP Technological University, Pune',
    slug: 'coep-pune',
    image: 'https://cnfmhdlkdjgnaqhngpin.supabase.co/storage/v1/object/public/college_images/Hero%20Carousel/coepPune.jpg'
  },
  {
    name: 'MIT WPU, Pune',
    slug: 'mit-wpu',
    image: 'https://cnfmhdlkdjgnaqhngpin.supabase.co/storage/v1/object/public/college_images/Hero%20Carousel/mitwpu.webp'
  },
  {
    name: 'Parul University, Vadodara',
    slug: 'parul-university',
    image: 'https://cnfmhdlkdjgnaqhngpin.supabase.co/storage/v1/object/public/college_images/Hero%20Carousel/parulUniversity.webp'
  },
  {
    name: 'Sapthagiri College of Engineering, Bangalore',
    slug: 'sapthagiri-college-of-engineering',
    image: 'https://cnfmhdlkdjgnaqhngpin.supabase.co/storage/v1/object/public/college_images/Hero%20Carousel/sapthagiriNps.webp'
  }
]

const localFallbacks = [
  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1523050853064-802160043f21?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1498243639391-f1f074e04996?auto=format&fit=crop&q=80&w=800"
]

const getOptimizedUrl = (url: string) => {
  return url.replace('/object/public/', '/render/image/public/') + '?width=800&quality=80&format=webp';
}

export default function HeroSection() {
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [nextSlide, setNextSlide] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({})

  // Trigger auto pop up when page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLeadModal(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Preload all images on mount
  useEffect(() => {
    carouselItems.forEach((item, idx) => {
      const img = new Image();
      img.src = getOptimizedUrl(item.image);
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
      
      const next = (currentSlide + 1) % carouselItems.length;
      setNextSlide(next);
      
      setTimeout(() => {
        setCurrentSlide(next);
        setIsTransitioning(false);
      }, 1000);
      
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const getCurrentImageUrl = (idx: number) => {
    const item = carouselItems[idx];
    if (imageErrors[idx]) return localFallbacks[idx % localFallbacks.length];
    return getOptimizedUrl(item.image);
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-32 pb-24 md:py-36 flex items-center min-h-[90vh]">
      
      {/* Background Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-200/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">

          {/* Left Column: Extensive Copy, Form/Button & Admission Pill Tags */}
          <div className="lg:col-span-6 flex flex-col justify-center animate-in fade-in slide-in-from-left-6 duration-700">
            
            {/* Rating Badge */}
            <div className="inline-flex items-center gap-3 mb-8 bg-white border border-slate-100 py-2 px-4 rounded-full shadow-sm w-fit">
              <div className="flex -space-x-2">
                {avatars.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Student ${idx + 1}`}
                    className="w-7 h-7 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
                ))}
                <span className="text-slate-800 font-extrabold text-xs ml-1">5.0</span>
              </div>
              <span className="text-slate-400 font-medium text-xs border-l border-slate-150 pl-3">2,400+ happy students</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-[62px] font-black text-slate-900 leading-[1.08] tracking-tighter mb-6 font-display">
              Your career begins with <br className="hidden md:inline" />
              the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600">right admission</span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-500 text-base md:text-lg max-w-xl leading-relaxed mb-10 font-medium">
              Turn your dream into reality with the right guidance. We help you choose the best college, secure your admission, and start your journey with confidence.
            </p>

            {/* Sleek Primary CTA Button */}
            <div className="mb-12">
              <button
                onClick={() => setShowLeadModal(true)}
                className="px-10 py-5 bg-[#111111] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-850 hover:shadow-2xl hover:shadow-slate-950/20 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
              >
                Book free counselling
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Platform Tools Capsule List */}
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-4">OUR PLATFORM TOOLS</p>
              <div className="flex flex-wrap gap-2.5 max-w-xl">
                {platformTools.map(tool => (
                  <Link 
                    key={tool.name} 
                    href={tool.href}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-slate-100 hover:border-slate-200 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                  >
                    <span className="text-base leading-none">{tool.icon}</span>
                    <span className="text-slate-700 text-xs font-bold">{tool.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Container with College Images Carousel & Floating Info Cards */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end animate-in fade-in slide-in-from-right-6 duration-700">
            <div className="relative w-full max-w-[460px] aspect-[4/5] bg-slate-900 rounded-[48px] shadow-2xl overflow-visible flex items-end">
              
              {/* Stars decorative icon */}
              <div className="absolute top-10 right-10 text-amber-300/30 font-bold select-none text-2xl z-20">✦</div>
              <div className="absolute top-36 left-12 text-amber-300/20 font-bold select-none text-lg z-20">✦</div>

              {/* College Campus Images Carousel (Clipped inside rounded wrapper) */}
              <div className="absolute inset-0 rounded-[48px] overflow-hidden">
                {/* Current Slide */}
                <Link 
                  href={`/colleges/${carouselItems[currentSlide].slug}`}
                  className={`absolute inset-0 transition-opacity duration-[1000ms] ease-in-out z-10 ${
                    !isTransitioning ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={getCurrentImageUrl(currentSlide)}
                    alt={carouselItems[currentSlide].name}
                    className="w-full h-full object-cover animate-ken-burns filter brightness-[0.85] contrast-[1.05]"
                  />
                </Link>

                {/* Next Slide */}
                <Link 
                  href={`/colleges/${carouselItems[nextSlide].slug}`}
                  className={`absolute inset-0 transition-opacity duration-[1000ms] ease-in-out z-10 ${
                    isTransitioning ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={getCurrentImageUrl(nextSlide)}
                    alt={carouselItems[nextSlide].name}
                    className="w-full h-full object-cover animate-ken-burns filter brightness-[0.85] contrast-[1.05]"
                  />
                </Link>
                
                {/* Subtle dark gradient overlay to ensure text contrast and hide the green overlay film */}
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none z-20" />
                
                {/* College Name Label */}
                <div className="absolute bottom-20 inset-x-0 flex justify-center z-30 pointer-events-none">
                  <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white font-extrabold text-[12px] tracking-wide shadow-lg text-center max-w-[85%] truncate animate-pulse">
                    🏛️ {carouselItems[currentSlide].name}
                  </div>
                </div>

                {/* Click to Explore helper tag */}
                <div className="absolute bottom-14 inset-x-0 flex justify-center z-30 pointer-events-none">
                  <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-[8px] text-white/80 uppercase tracking-[0.25em] font-black border border-white/10">
                    Click to explore campus
                  </span>
                </div>
              </div>

              {/* Bottom Strip text inside container */}
              <div className="absolute bottom-6 inset-x-0 text-center z-25 px-6 pointer-events-none">
                <p className="text-white/60 text-[9px] font-black uppercase tracking-[0.2em] mb-0.5">
                  Trusted by students heading to
                </p>
                <p className="text-white text-xs font-bold tracking-wide">
                  MBBS · B.Tech · M.Tech · BBA · MBA
                </p>
              </div>

              {/* FLOATING CARD 1: Top Left */}
              <a 
                href="tel:+919900116101"
                className="absolute -left-12 top-10 bg-white border border-slate-100 rounded-[20px] p-5 shadow-xl w-60 hover:scale-105 transition-transform duration-300 pointer-events-auto z-30 block hover:border-sky-200"
              >
                <p className="text-slate-400 text-[9px] font-black tracking-widest uppercase mb-1">Student Guidance</p>
                <h4 className="text-slate-800 text-base font-extrabold hover:text-sky-600 transition-colors">+91 99001 16101</h4>
                <p className="text-slate-500 text-[11px] font-medium mt-0.5">Talk to Expert Counselors</p>
              </a>

              {/* FLOATING CARD 2: Top Right */}
              <div className="absolute -right-8 top-24 bg-white border border-slate-100 rounded-[20px] p-5 shadow-xl w-56 hover:scale-105 transition-transform duration-300 pointer-events-auto z-30">
                <p className="text-slate-400 text-[9px] font-black tracking-widest uppercase mb-1">Loan Assistance</p>
                <h4 className="text-slate-800 text-sm font-extrabold mb-2">Education Loan</h4>
                <span className="inline-block text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full">
                  Get Free Guidance
                </span>
              </div>

              {/* FLOATING CARD 3: Bottom Left */}
              <div className="absolute -left-10 bottom-24 bg-white border border-slate-100 rounded-[20px] p-5 shadow-xl w-64 hover:scale-105 transition-transform duration-300 pointer-events-auto z-30">
                <p className="text-slate-400 text-[9px] font-black tracking-widest uppercase mb-1">Begin Your Journey</p>
                <h4 className="text-slate-800 text-sm font-extrabold">Top Programs</h4>
                <p className="text-slate-500 text-[11px] font-medium mt-0.5 mb-2">MBBS · MBA · B.Tech · M.Tech</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                  <Check size={10} className="stroke-[3px]" /> Admissions Open
                </span>
              </div>

              {/* FLOATING CARD 4: Bottom Right */}
              <div className="absolute -right-10 bottom-12 bg-white border border-slate-100 rounded-[20px] p-5 shadow-xl w-56 hover:scale-105 transition-transform duration-300 pointer-events-auto z-30">
                <p className="text-slate-400 text-[9px] font-black tracking-widest uppercase mb-1">Course Guidance</p>
                <h4 className="text-slate-800 text-sm font-extrabold">Choose Your Path</h4>
                <p className="text-slate-500 text-[11px] font-medium mt-0.5">Diploma · UG · PG Courses</p>
              </div>

            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes kenBurns {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.15);
          }
        }
        .animate-ken-burns {
          animation: kenBurns 20s ease-in-out infinite alternate;
        }
      `}</style>

      <LeadModal
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        collegeName="Top Indian Universities"
        collegeLogo="https://ui-avatars.com/api/?name=Promote+Education&background=3B2EA8&color=fff"
        stream="All Streams"
      />
    </section>
  )
}