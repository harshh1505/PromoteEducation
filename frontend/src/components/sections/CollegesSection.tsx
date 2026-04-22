'use client'

import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import CollegeCard from '@/components/ui/CollegeCard'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import type { College, Stream } from '@/types'

const featuredColleges: College[] = [
  {
    id: '1',
    name: 'IEM Kolkata',
    location: 'Kolkata',
    state: 'West Bengal',
    stream: 'Engineering',
    type: 'private',
    avgCTC: '12.8',
    totalFee: '9.45',
    verified: true,
    image: 'https://cnfmhdlkdjgnaqhngpin.supabase.co/storage/v1/object/public/college_images/iemKolkata.jpg',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0N9rV099XW-k0uO3v9X_v8Q9yF_X_Xw&s',
    numCourses: 24,
    establishmentYear: 1989,
    rating: 4.6
  },
  {
    id: '2',
    name: 'Heritage Institute of Technology',
    location: 'Kolkata',
    state: 'West Bengal',
    stream: 'Engineering',
    type: 'private',
    avgCTC: '10.8',
    totalFee: '6.95',
    verified: true,
    image: 'https://cnfmhdlkdjgnaqhngpin.supabase.co/storage/v1/object/public/college_images/hitKolkata.jpg',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2V_f6_9v4_8_8_8_8_8&s',
    numCourses: 18,
    establishmentYear: 2001,
    rating: 4.4
  },
  // Add more colleges here
]

export default function CollegesSection() {
  const [activeStream, setActiveStream] = useState<string>('All')

  const filters = [
    { label: 'All', value: 'All' },
    { label: 'Engineering', value: 'Engineering' },
    { label: 'Management', value: 'Management' },
    { label: 'Medical', value: 'Medical' },
    { label: 'Pharmacy', value: 'Pharmacy' },
    { label: 'Law', value: 'Law' },
    { label: 'Architecture', value: 'Architecture' }
  ]

  const filteredColleges = featuredColleges.filter(c => 
    activeStream === 'All' || c.stream === activeStream
  )

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
              Our Top-Ranked Colleges
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Carefully curated selection of India's most prestigious institutions based on academic excellence and placement records.
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredColleges.length > 0 ? (
            filteredColleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center rounded-[32px] bg-slate-50 border border-dashed border-slate-200">
              <p className="text-slate-400 italic font-medium">No colleges found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
