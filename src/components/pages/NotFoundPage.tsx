'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Search,
  Home,
  Building2,
  Compass,
  BarChart3,
  Newspaper,
  Phone,
  ArrowRight,
  Headphones,
  BookOpen
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CounsellingModal from '@/components/ui/CounsellingModal'

export default function NotFoundPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [isCounsellingOpen, setIsCounsellingOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/colleges?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const quickLinks = [
    {
      title: 'Explore Colleges',
      description: 'Discover 50,000+ colleges with verified fees, placements & NIRF ranks.',
      href: '/colleges',
      icon: Building2,
      accent: 'text-sky-600 bg-sky-50 border-sky-100 group-hover:bg-sky-600 group-hover:text-white',
    },
    {
      title: 'College Predictor',
      description: 'Predict your admission chances based on your NEET & JEE ranks.',
      href: '/tools/college-predictor',
      icon: Compass,
      accent: 'text-indigo-600 bg-indigo-50 border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white',
    },
    {
      title: 'Cutoffs 2026',
      description: 'Check round-wise opening and closing cutoffs across top institutions.',
      href: '/cutoffs',
      icon: BarChart3,
      accent: 'text-amber-600 bg-amber-50 border-amber-100 group-hover:bg-amber-600 group-hover:text-white',
    },
    {
      title: 'Latest News & Alerts',
      description: 'Stay ahead with breaking education news, exam dates & circulars.',
      href: '/news',
      icon: Newspaper,
      badge: 'Live',
      accent: 'text-red-600 bg-red-50 border-red-100 group-hover:bg-red-600 group-hover:text-white',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-sky-100 selection:text-sky-900">
      <Navbar />

      <main className="flex-1 relative overflow-hidden py-16 md:py-24 flex items-center justify-center">
        {/* Decorative Background Elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-sky-200/40 via-indigo-100/30 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-sky-100/40 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-sm text-slate-600 text-xs font-bold mb-6">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Error 404 • Page Not Found</span>
          </div>

          {/* Big Visual 404 */}
          <div className="relative mb-6 select-none">
            <h1 className="text-8xl sm:text-9xl md:text-[140px] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-slate-900 via-slate-800 to-sky-700/60 drop-shadow-sm">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
              <BookOpen size={180} className="text-sky-900" />
            </div>
          </div>

          {/* Heading & Subtitle */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 font-display">
            Lost on Campus? Let&apos;s Get You Back on Track.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8">
            The page or resource you are looking for doesn&apos;t exist, has been moved, or took an unexpected detour.
          </p>

          {/* Interactive Search Bar */}
          <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-10">
            <div className="relative flex items-center shadow-lg shadow-slate-200/50 rounded-2xl bg-white border border-slate-200 focus-within:border-sky-500 focus-within:ring-4 focus-within:ring-sky-500/10 transition-all">
              <div className="pl-4 text-slate-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search colleges, exams, courses or cutoffs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3.5 pl-3 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
              />
              <button
                type="submit"
                className="mr-1.5 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xl shadow-sm transition-colors active:scale-95"
              >
                Search
              </button>
            </div>
          </form>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-slate-900/10 hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
            >
              <Home size={15} />
              Back to Home
            </Link>

            <button
              onClick={() => setIsCounsellingOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-sky-500/20 hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
            >
              <Headphones size={15} />
              Free Counselling
            </button>

            <a
              href="tel:+919900116101"
              className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 active:scale-95"
            >
              <Phone size={14} className="text-sky-500" />
              +91 99001 16101
            </a>
          </div>

          {/* Recommended Destinations */}
          <div className="text-left pt-6 border-t border-slate-200/80">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 text-center mb-6">
              Popular Destinations You Might Be Looking For
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickLinks.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group relative flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-sky-300 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300 shrink-0 ${item.accent}`}
                    >
                      <Icon size={20} />
                    </div>

                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors">
                          {item.title}
                        </h3>
                        {item.badge && (
                          <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="text-slate-300 group-hover:text-sky-500 group-hover:translate-x-1 transition-all">
                      <ArrowRight size={16} />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <CounsellingModal
        isOpen={isCounsellingOpen}
        onClose={() => setIsCounsellingOpen(false)}
      />
    </div>
  )
}
