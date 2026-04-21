'use client'

import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import CollegeCard from '@/components/ui/CollegeCard'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import type { College, Stream } from '@/types'

export default function CollegesSection() {
  const [colleges, setColleges] = useState<College[]>([])
  const [activeStream, setActiveStream] = useState<string>('All')
  const [loading, setLoading] = useState(true)

  const filters = [
    { label: 'All', value: 'All' },
    { label: 'Engineering', value: 'Engineering' },
    { label: 'Management', value: 'Management' },
    { label: 'Medical', value: 'Medical' },
    { label: 'Pharmacy', value: 'Pharmacy' },
    { label: 'Law', value: 'Law' },
    { label: 'Architecture', value: 'Architecture' }
  ]

  useEffect(() => {
    async function fetchColleges() {
      setLoading(true)
      let query = supabase.from('colleges').select('*')
      if (activeStream !== 'All') {
        query = query.ilike('stream', activeStream)
      }
      const { data, error } = await query.order('ranking', { ascending: true }).limit(6)
      if (!error) {
        setColleges((data || []).map((c: any) => ({
          ...c,
          rankingBody: 'NIRF 2025',
          avgCTC: c['Average Package'],
          totalFee: c['Total Fees'],
        })))
      }
      setLoading(false)
    }
    fetchColleges()
  }, [activeStream])

  return (
    <section id="colleges" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-[2px] bg-sky-500" />
              <span className="text-[11px] font-bold text-sky-500 uppercase tracking-[0.2em]">NIRF 2025</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium text-slate-900 tracking-tight mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Top ranked colleges
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Based on National Institutional Ranking Framework 2025 listings and placement records.
            </p>
          </div>
          <button 
            onClick={() => window.location.href = '/rankings'}
            className="flex items-center gap-1.5 text-sm font-bold text-sky-500 hover:opacity-80 transition-all self-end"
          >
            View all colleges <ArrowRight size={16} />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-10 overflow-x-auto no-scrollbar py-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveStream(f.value)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                activeStream === f.value 
                  ? "bg-slate-900 text-white shadow-lg" 
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-[4/5] rounded-[32px] bg-slate-50 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {colleges.length > 0 ? (
              colleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center rounded-[32px] bg-slate-50 border border-dashed border-slate-200">
                <p className="text-slate-400 italic font-medium">Synchronizing latest ranking data...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
