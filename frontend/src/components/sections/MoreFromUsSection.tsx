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
      className="group relative rounded-2xl overflow-hidden shadow-sm bg-slate-100"
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
      {/* Reel Container - 9:16 aspect ratio */}
      <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
        <iframe
          key={key}
          src={reel.embedUrl}
          className="absolute inset-0 w-full h-full scale-[1.35] origin-center"
          frameBorder="0"
          scrolling="no"
          allow="autoplay; encrypted-media"
          style={{ border: 'none' }}
          title={`Instagram Reel ${reel.id}`}
        />

        {/* Permanent Replay Button - To reset from end-screen */}
        <button
          onClick={() => setKey((k) => k + 1)}
          className="absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md bg-black/20 text-white hover:bg-black/40 border border-white/20 transition-all shadow-lg"
          title="Reset/Replay Reel"
        >
          <RotateCcw size={14} />
        </button>

        {/* Permanent Open Link */}
        <a
          href={reel.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-3 z-10 p-2 rounded-full backdrop-blur-md bg-white/10 text-white/80 border border-white/20 hover:bg-white/20 transition-colors"
          title="Watch on Instagram"
        >
          <ExternalLink size={14} />
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
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
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)',
              color: '#fff',
              boxShadow: '0 4px 15px rgba(253, 29, 29, 0.2)',
            }}
          >
            Follow @promote_education
          </a>
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
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

          {/* Video Grid */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 pb-8">
              {YOUTUBE_VIDEOS.map((video) => (
                <div
                  key={video.id}
                  className="w-full"
                >
                  <div className="relative aspect-video rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl border border-slate-200 bg-black group-hover:shadow-2xl transition-all">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`${video.url}?rel=0&modestbranding=1`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="mt-6 px-2">
                    <h4 className="text-xl font-bold text-slate-900 tracking-tight">{video.title}</h4>
                    <div className="mt-1 flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Featured Video</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
