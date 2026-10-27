'use client'

import { useEffect, useRef, useState } from 'react'
import { ExternalLink, RotateCcw, Play } from 'lucide-react'

interface ReelItem {
  id: string
  url: string
  embedUrl: string
}

const REELS: ReelItem[] = [
  {
    id: 'DWYv-IoAZ0J',
    url: 'https://www.instagram.com/reel/DWYv-IoAZ0J/',
    embedUrl: 'https://www.instagram.com/reel/DWYv-IoAZ0J/embed/',
  },
  {
    id: 'DVx5WONgdtH',
    url: 'https://www.instagram.com/reel/DVx5WONgdtH/',
    embedUrl: 'https://www.instagram.com/reel/DVx5WONgdtH/embed/',
  },
  {
    id: 'DTiKcc-gWP4',
    url: 'https://www.instagram.com/reel/DTiKcc-gWP4/',
    embedUrl: 'https://www.instagram.com/reel/DTiKcc-gWP4/embed/',
  },
  {
    id: 'DSJ9rWCAQnc',
    url: 'https://www.instagram.com/reel/DSJ9rWCAQnc/',
    embedUrl: 'https://www.instagram.com/reel/DSJ9rWCAQnc/embed/',
  },
  {
    id: 'DXJgAczATQp',
    url: 'https://www.instagram.com/reel/DXJgAczATQp/',
    embedUrl: 'https://www.instagram.com/reel/DXJgAczATQp/embed/',
  },
  {
    id: 'DW6EfY-gYKA',
    url: 'https://www.instagram.com/reel/DW6EfY-gYKA/',
    embedUrl: 'https://www.instagram.com/reel/DW6EfY-gYKA/embed/',
  },
]

const YOUTUBE_VIDEOS = [
  {
    id: 'cnTT4_dV2Ys',
    title: 'Promote Education - Our Mission & Impact',
    url: 'https://www.youtube.com/embed/cnTT4_dV2Ys'
  },
  {
    id: 'NkhcoEVXFa8',
    title: 'Event Highlights: Seminars & Academic Conclaves',
    url: 'https://www.youtube.com/embed/NkhcoEVXFa8'
  }
]

function ReelCard({ reel }: { reel: ReelItem }) {
  const [key, setKey] = useState(0)

  return (
    <div
      className="group relative rounded-xl sm:rounded-2xl overflow-hidden shadow-sm bg-slate-900"
      style={{
        border: '0.5px solid var(--border)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.06)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Reel Container - Compact 9:16 aspect ratio */}
      <div className="relative w-full overflow-hidden" style={{ paddingBottom: '177.78%' }}>
        <iframe
          key={key}
          src={reel.embedUrl}
          className="absolute border-0"
          style={{
            width: '136%',
            height: 'calc(100% + 300px)',
            top: '-50px',
            left: '-18%',
            border: 'none',
          }}
          scrolling="no"
          allow="autoplay; encrypted-media"
          title={`Instagram Reel ${reel.id}`}
        />

        {/* Permanent Replay Button - Sized extra small */}
        <button
          onClick={() => setKey((k) => k + 1)}
          className="absolute top-2 right-2 z-10 w-5.5 h-5.5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full backdrop-blur-md bg-black/30 text-white/90 hover:bg-black/60 border border-white/20 transition-all shadow-sm"
          title="Reset/Replay Reel"
        >
          <RotateCcw size={10} />
        </button>

        {/* Permanent Open Link - Sized extra small */}
        <a
          href={reel.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-2 right-2 z-10 w-5.5 h-5.5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full backdrop-blur-md bg-black/30 text-white/80 hover:bg-black/60 border border-white/20 transition-all shadow-sm"
          title="Watch on Instagram"
        >
          <ExternalLink size={10} />
        </a>
      </div>
    </div>
  )
}

export default function MoreFromUsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="more-from-us"
      className="py-12"
      style={{ background: 'var(--surface)' }}
    >
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Instagram Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 max-w-[1100px] mx-auto">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              More from our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600">Instagram</span>
            </h2>
            <p className="mt-2 text-slate-500 text-sm max-w-lg">
              Explore daily updates, success stories, and expert tips to help you choose the right educational path.
            </p>
          </div>

          <a
            href="https://www.instagram.com/promote_education/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 shrink-0"
            style={{
              background: 'linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)',
              color: '#fff',
              boxShadow: '0 4px 15px rgba(253, 29, 29, 0.2)',
            }}
          >
            Follow @promote_education
          </a>
        </div>

        {/* Reels Grid - Compact, centered with generous spacing between reels */}
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-6">
            {REELS.map((reel, index) => (
              <div
                key={reel.id}
                className="transition-all duration-700"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <ReelCard reel={reel} />
              </div>
            ))}
          </div>
        </div>

        {/* YouTube Section */}
        <div className="mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600">YouTube Content</span>
              </h3>
            </div>
            <p className="text-slate-500 text-sm max-w-sm">
              Watch our detailed institutional reviews, admission guides, and exclusive event highlights.
            </p>
          </div>

          {/* Video Slider */}
          <div className="relative group/slider">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 no-scrollbar -mx-6 px-6">
              {YOUTUBE_VIDEOS.map((video) => (
                <div
                  key={video.id}
                  className="flex-shrink-0 w-[85vw] md:w-[750px] snap-center"
                >
                  <div className="relative aspect-video rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 bg-black">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`${video.url}?rel=0&modestbranding=1`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="mt-6 px-4">
                    <h4 className="text-xl font-medium text-slate-900 tracking-tight">{video.title}</h4>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Featured Feature</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Swipe Indicator (Visible on Mobile) */}
            <div className="flex justify-center gap-2 mt-4 md:hidden">
              <div className="w-8 h-1 rounded-full bg-sky-500" />
              <div className="w-2 h-1 rounded-full bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
