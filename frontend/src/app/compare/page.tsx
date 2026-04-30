'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ArrowRightLeft, Sparkles, ChevronRight, Check, Trophy, TrendingUp } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { cn } from '@/lib/utils'

export default function CompareLandingPage() {
  const router = useRouter()
  const [col1, setCol1] = useState<any>(null)
  const [col2, setCol2] = useState<any>(null)
  const [query1, setQuery1] = useState('')
  const [query2, setQuery2] = useState('')
  const [results1, setResults1] = useState<any[]>([])
  const [results2, setResults2] = useState<any[]>([])
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [activeSearch, setActiveSearch] = useState<1 | 2 | null>(null)

  // Search Logic for College 1
  useEffect(() => {
    const search = async () => {
      if (query1.length < 2) { setResults1([]); return; }
      setLoading1(true)
      const { data } = await supabase
        .from('colleges')
        .select('name, slug, location')
        .ilike('name', `%${query1}%`)
        .limit(5)
      setResults1(data || [])
      setLoading1(false)
    }
    const timer = setTimeout(search, 300)
    return () => clearTimeout(timer)
  }, [query1])

  // Search Logic for College 2
  useEffect(() => {
    const search = async () => {
      if (query2.length < 2) { setResults2([]); return; }
      setLoading2(true)
      const { data } = await supabase
        .from('colleges')
        .select('name, slug, location')
        .ilike('name', `%${query2}%`)
        .limit(5)
      setResults2(data || [])
      setLoading2(false)
    }
    const timer = setTimeout(search, 300)
    return () => clearTimeout(timer)
  }, [query2])

  const handleCompare = () => {
    if (col1 && col2) {
      router.push(`/compare/${col1.slug}-vs-${col2.slug}`)
    }
  }

  const getLogo = (c: any) => {
    return c.logo || c.logo_url || `https://ui-avatars.com/api/?name=${c.name}&background=0D9488&color=fff`
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-50 text-sky-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-sky-100 shadow-sm">
              <Sparkles size={14} className="animate-pulse" />
              Smart Comparison Tool
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
              Compare Colleges Side-by-Side
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Make informed decisions by comparing rankings, placements, fees, and campus life of India's top institutions.
            </p>
          </div>

          {/* Comparison Search Cards */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center mb-20">
            
            {/* VS Badge (Desktop) */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-16 h-16 bg-white rounded-full border-4 border-slate-50 shadow-2xl flex items-center justify-center">
                <span className="font-black text-slate-900 text-xl tracking-tighter italic">VS</span>
              </div>
            </div>

            {/* College 1 Search */}
            <div className={cn(
              "bg-white p-8 rounded-[40px] border-2 transition-all duration-500",
              col1 ? "border-sky-500 shadow-2xl shadow-sky-500/10" : "border-slate-100 shadow-sm"
            )}>
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Choice One</span>
                {col1 && <Check className="text-sky-500" size={20} />}
              </div>

              {col1 ? (
                <div className="text-center py-6">
                  <div className="w-24 h-24 bg-slate-50 rounded-3xl mx-auto mb-6 flex items-center justify-center p-4 border border-slate-100 shadow-inner overflow-hidden">
                    <img src={getLogo(col1)} alt={col1.name} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">{col1.name}</h3>
                  <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">{col1.location}</p>
                  <button 
                    onClick={() => setCol1(null)}
                    className="mt-6 text-xs font-black text-rose-500 uppercase tracking-widest hover:text-rose-600 transition-colors"
                  >
                    Change Selection
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 focus-within:border-sky-500 focus-within:bg-white transition-all group">
                    <Search className="text-slate-400 group-focus-within:text-sky-500 transition-colors" size={20} />
                    <input 
                      type="text"
                      placeholder="Type college name..."
                      value={query1}
                      onChange={(e) => setQuery1(e.target.value)}
                      onFocus={() => setActiveSearch(1)}
                      className="bg-transparent border-none outline-none text-slate-900 font-bold placeholder:text-slate-300 w-full"
                    />
                  </div>

                  {activeSearch === 1 && results1.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-20">
                      {results1.map((res) => (
                        <button
                          key={res.slug}
                          onClick={() => { setCol1(res); setResults1([]); setActiveSearch(null); }}
                          className="w-full flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors text-left border-b border-slate-50 last:border-0"
                        >
                          <div className="w-10 h-10 bg-slate-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                            <img src={getLogo(res)} alt={res.name} className="w-full h-full object-contain" />
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900">{res.name}</p>
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{res.location}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* College 2 Search */}
            <div className={cn(
              "bg-white p-8 rounded-[40px] border-2 transition-all duration-500",
              col2 ? "border-emerald-500 shadow-2xl shadow-emerald-500/10" : "border-slate-100 shadow-sm"
            )}>
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Choice Two</span>
                {col2 && <Check className="text-emerald-500" size={20} />}
              </div>

              {col2 ? (
                <div className="text-center py-6">
                  <div className="w-24 h-24 bg-slate-50 rounded-3xl mx-auto mb-6 flex items-center justify-center p-4 border border-slate-100 shadow-inner overflow-hidden">
                    <img src={getLogo(col2)} alt={col2.name} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">{col2.name}</h3>
                  <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">{col2.location}</p>
                  <button 
                    onClick={() => setCol2(null)}
                    className="mt-6 text-xs font-black text-rose-500 uppercase tracking-widest hover:text-rose-600 transition-colors"
                  >
                    Change Selection
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 focus-within:border-emerald-500 focus-within:bg-white transition-all group">
                    <Search className="text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                    <input 
                      type="text"
                      placeholder="Type college name..."
                      value={query2}
                      onChange={(e) => setQuery2(e.target.value)}
                      onFocus={() => setActiveSearch(2)}
                      className="bg-transparent border-none outline-none text-slate-900 font-bold placeholder:text-slate-300 w-full"
                    />
                  </div>

                  {activeSearch === 2 && results2.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-20">
                      {results2.map((res) => (
                        <button
                          key={res.slug}
                          onClick={() => { setCol2(res); setResults2([]); setActiveSearch(null); }}
                          className="w-full flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors text-left border-b border-slate-50 last:border-0"
                        >
                          <div className="w-10 h-10 bg-slate-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                            <img src={getLogo(res)} alt={res.name} className="w-full h-full object-contain" />
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900">{res.name}</p>
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{res.location}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>

          {/* Compare Button */}
          <div className="text-center">
            <button
              onClick={handleCompare}
              disabled={!col1 || !col2}
              className={cn(
                "group px-12 py-5 rounded-full font-black text-sm uppercase tracking-[0.2em] transition-all duration-500 shadow-2xl",
                col1 && col2 
                  ? "bg-slate-900 text-white hover:bg-black hover:scale-105 shadow-slate-200" 
                  : "bg-slate-100 text-slate-300 cursor-not-allowed shadow-none"
              )}
            >
              <div className="flex items-center gap-3">
                Compare Now
                <ArrowRightLeft size={18} className="group-hover:rotate-180 transition-transform duration-500" />
              </div>
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-32">
            {[
              { label: 'Top Colleges', value: '1,000+', icon: Trophy },
              { label: 'Real Placements', value: '2026 Data', icon: TrendingUp },
              { label: 'Detailed Specs', value: '20+ metrics', icon: Sparkles },
              { label: 'User Trusted', value: '50k+ users', icon: Check },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="w-10 h-10 bg-slate-50 rounded-xl mx-auto mb-4 flex items-center justify-center text-sky-500">
                  <stat.icon size={20} />
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-1">{stat.value}</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
