'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Trophy, Filter, Star, MapPin, Building2, TrendingUp, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function RankingsPageContent() {
  const [colleges, setColleges] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  const categories = ['All', 'Engineering', 'Medical', 'Management', 'Law', 'Design']

  useEffect(() => {
    async function fetchRankings() {
      setLoading(true)
      let query = supabase
        .from('colleges')
        .select('*')
        .order('ranking', { ascending: true })

      if (filter !== 'All') {
        query = query.eq('stream', filter)
      }

      const { data, error } = await query
      if (!error && data) {
        setColleges(data)
      }
      setLoading(false)
    }
    fetchRankings()
  }, [filter])

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-32 pb-20">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={20} className="text-gold" />
            <span className="text-xs font-bold uppercase tracking-widest text-gold">2024 NIRF & Global Rankings</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-medium text-ink tracking-tight mb-6">
            India's <span className="text-gold-dark italic">Top Ranked</span> Institutions
          </h1>
          <p className="text-lg text-ink-3 max-w-2xl leading-relaxed">
            Discover the most prestigious colleges across various disciplines, ranked by academic excellence, placements, and infrastructure.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 border whitespace-nowrap",
                filter === cat 
                  ? "bg-midnight text-white border-midnight shadow-lg" 
                  : "bg-white text-ink-3 border-border hover:border-gold hover:text-ink"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Legend / Info */}
        <div className="mb-6 p-4 rounded-xl bg-gold/5 border border-gold/10 flex items-start gap-3">
          <Info size={16} className="text-gold-dark mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gold-dark leading-relaxed">
            Our proprietary ranking algorithm combines NIRF data, student feedback, and placement transparency to give you a realistic "Value for Money" score alongside traditional ranks.
          </p>
        </div>

        {/* Rankings Table/List */}
        <div className="space-y-4">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
              <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-ink-3">Calculating rankings...</p>
            </div>
          ) : colleges.length > 0 ? (
            colleges.map((college, index) => (
              <div 
                key={college.id}
                className="group p-5 md:p-6 rounded-2xl bg-white border border-border shadow-sm hover:shadow-xl hover:border-gold/30 transition-all duration-300 flex flex-col md:flex-row md:items-center gap-6"
              >
                {/* Rank Number */}
                <div className="flex items-center gap-4 md:w-24 border-b md:border-b-0 md:border-r border-border pb-4 md:pb-0">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm",
                    index === 0 ? "bg-gold text-midnight shadow-lg shadow-gold/20" :
                    index === 1 ? "bg-slate-200 text-slate-700" :
                    index === 2 ? "bg-orange-100 text-orange-700" :
                    "bg-surface-2 text-ink-3"
                  )}>
                    #{college.ranking || index + 1}
                  </div>
                  <TrendingUp size={14} className="text-success md:hidden lg:block opacity-40" />
                </div>

                {/* College Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-lg font-medium text-ink group-hover:text-gold-dark transition-colors truncate max-w-md">
                      {college.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-ink-3">
                    <span className="flex items-center gap-1.5"><MapPin size={12} className="text-gold" /> {college.location}, {college.state}</span>
                    <span className="flex items-center gap-1.5"><Building2 size={12} className="text-gold" /> {college.stream}</span>
                    <span className="flex items-center gap-1.5 text-success font-medium"><Star size={12} fill="currentColor" /> {college.rating || '4.8'}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-8 md:w-64">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-ink-4 tracking-widest mb-1">Avg package</p>
                    <p className="text-sm font-medium text-ink">₹{college.avg_ctc || '18.5'}L</p>
                  </div>
                  <div className="text-right md:text-left">
                    <p className="text-[10px] uppercase font-bold text-ink-4 tracking-widest mb-1">Total Fees</p>
                    <p className="text-sm font-medium text-ink">₹{college.fees || '2.5'}L</p>
                  </div>
                </div>

                {/* Action */}
                <button className="md:ml-4 px-6 py-2 border border-border rounded-pill text-xs font-bold text-ink hover:bg-midnight hover:text-white hover:border-midnight transition-all">
                  View Detail
                </button>
              </div>
            ))
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-border rounded-3xl bg-white shadow-sm">
                <p className="text-ink-4 italic">No colleges found in this category.</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-16 text-center">
            <p className="text-xs text-ink-4">
                Showing {colleges.length} top ranked institutions. Data is updated every admission cycle.
            </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
