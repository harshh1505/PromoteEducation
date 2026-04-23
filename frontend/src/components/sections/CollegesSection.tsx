'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Verified } from 'lucide-react'
import CollegeCard from '@/components/ui/CollegeCard'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import type { College, Stream } from '@/types'

export const featuredColleges: College[] = [
  {
    id: 'engineering-1',
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
    id: 'med-1',
    name: 'AIIMS Kalyani',
    location: 'Kalyani',
    state: 'West Bengal',
    stream: 'Medical',
    type: 'government',
    avgCTC: 'N/A',
    totalFee: '0.05',
    verified: true,
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Zz8z9X_v8Q9yF_X_Xw&s',
    numCourses: 12,
    establishmentYear: 2019,
    rating: 4.9
  },
  {
    id: 'med-2',
    name: 'Medical College Kolkata',
    location: 'Kolkata',
    state: 'West Bengal',
    stream: 'Medical',
    type: 'government',
    avgCTC: 'N/A',
    totalFee: '0.15',
    verified: true,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2V_f6_9v4_8_8_8_8_8&s',
    numCourses: 28,
    establishmentYear: 1835,
    rating: 4.8
  },
  {
    id: 'med-3',
    name: 'IPGMER, Kolkata',
    location: 'Kolkata',
    state: 'West Bengal',
    stream: 'Medical',
    type: 'government',
    avgCTC: 'N/A',
    totalFee: '0.12',
    verified: true,
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0N9rV099XW-k0uO3v9X_v8Q9yF_X_Xw&s',
    numCourses: 22,
    establishmentYear: 1707,
    rating: 4.7
  },
  {
    id: 'med-4',
    name: 'RG Kar Medical College',
    location: 'Kolkata',
    state: 'West Bengal',
    stream: 'Medical',
    type: 'government',
    avgCTC: 'N/A',
    totalFee: '0.15',
    verified: true,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2V_f6_9v4_8_8_8_8_8&s',
    numCourses: 15,
    establishmentYear: 1886,
    rating: 4.5
  },
  {
    id: 'med-5',
    name: 'Nilratan Sircar Medical College',
    location: 'Kolkata',
    state: 'West Bengal',
    stream: 'Medical',
    type: 'government',
    avgCTC: 'N/A',
    totalFee: '0.12',
    verified: true,
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0N9rV099XW-k0uO3v9X_v8Q9yF_X_Xw&s',
    numCourses: 18,
    establishmentYear: 1873,
    rating: 4.6
  },
  {
    id: 'med-6',
    name: 'KPC Medical College & Hospital',
    location: 'Kolkata',
    state: 'West Bengal',
    stream: 'Medical',
    type: 'private',
    avgCTC: 'N/A',
    totalFee: '45.00',
    verified: true,
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Zz8z9X_v8Q9yF_X_Xw&s',
    numCourses: 10,
    establishmentYear: 2006,
    rating: 4.4
  },
  {
    id: 'med-7',
    name: 'SKS Medical College',
    location: 'Durgapur',
    state: 'West Bengal',
    stream: 'Medical',
    type: 'private',
    avgCTC: 'N/A',
    totalFee: '38.50',
    verified: true,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2V_f6_9v4_8_8_8_8_8&s',
    numCourses: 8,
    establishmentYear: 2023,
    rating: 4.1
  },
  {
    id: 'med-8',
    name: 'JIS School of Medical Science',
    location: 'Howrah',
    state: 'West Bengal',
    stream: 'Medical',
    type: 'private',
    avgCTC: 'N/A',
    totalFee: '42.00',
    verified: true,
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0N9rV099XW-k0uO3v9X_v8Q9yF_X_Xw&s',
    numCourses: 10,
    establishmentYear: 2023,
    rating: 4.2
  },
  {
    id: 'med-9',
    name: 'GOURI DEVI INSTITUTE OF MEDICAL SCIENCES',
    location: 'Durgapur',
    state: 'West Bengal',
    stream: 'Medical',
    type: 'private',
    avgCTC: 'N/A',
    totalFee: '40.00',
    verified: true,
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Zz8z9X_v8Q9yF_X_Xw&s',
    numCourses: 12,
    establishmentYear: 2016,
    rating: 4.3
  },
  {
    id: 'med-10',
    name: 'IQ City Medical College Hospital',
    location: 'Durgapur',
    state: 'West Bengal',
    stream: 'Medical',
    type: 'private',
    avgCTC: 'N/A',
    totalFee: '40.00',
    verified: true,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2V_f6_9v4_8_8_8_8_8&s',
    numCourses: 15,
    establishmentYear: 2013,
    rating: 4.4
  },
  {
    id: 'med-11',
    name: 'ICARE Institute of Medical Science',
    location: 'Haldia',
    state: 'West Bengal',
    stream: 'Medical',
    type: 'private',
    avgCTC: 'N/A',
    totalFee: '35.00',
    verified: true,
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0N9rV099XW-k0uO3v9X_v8Q9yF_X_Xw&s',
    numCourses: 12,
    establishmentYear: 2011,
    rating: 4.3
  },
  {
    id: 'med-12',
    name: 'SANAKA MEDICAL COLLEGE (SRIMS)',
    location: 'Durgapur',
    state: 'West Bengal',
    stream: 'Medical',
    type: 'private',
    avgCTC: 'N/A',
    totalFee: '38.00',
    verified: true,
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Zz8z9X_v8Q9yF_X_Xw&s',
    numCourses: 10,
    establishmentYear: 2020,
    rating: 4.2
  },
  {
    id: 'med-13',
    name: 'JIMS HOSPITAL - CENTRAL CAMPUS',
    location: 'Kolkata',
    state: 'West Bengal',
    stream: 'Medical',
    type: 'private',
    avgCTC: 'N/A',
    totalFee: '45.00',
    verified: true,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2V_f6_9v4_8_8_8_8_8&s',
    numCourses: 14,
    establishmentYear: 2016,
    rating: 4.4
  },
]

export default function CollegesSection() {
  const [activeStream, setActiveStream] = useState<string>('All')
  const [page, setPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(4)

  // Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1)
      else if (window.innerWidth < 1024) setItemsPerPage(2)
      else setItemsPerPage(4)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const filters = [
    { label: 'All', value: 'All' },
    { label: 'Engineering', value: 'Engineering' },
    { label: 'Medical', value: 'Medical' },
    { label: 'Management', value: 'Management' },
  ]

  const filteredColleges = featuredColleges.filter(c => 
    activeStream === 'All' || c.stream === activeStream
  )

  const totalPages = Math.ceil(filteredColleges.length / itemsPerPage)
  const currentColleges = filteredColleges.slice(page * itemsPerPage, (page + 1) * itemsPerPage)

  const nextPage = () => setPage((prev) => (prev + 1) % totalPages)
  const prevPage = () => setPage((prev) => (prev - 1 + totalPages) % totalPages)

  // Reset page when filter changes
  useEffect(() => {
    setPage(0)
  }, [activeStream])

  // Auto-slide logic
  useEffect(() => {
    if (totalPages <= 1) return

    const interval = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages)
    }, 5000) // Slide every 5 seconds

    return () => clearInterval(interval)
  }, [totalPages, activeStream])

  return (
    <section id="colleges" className="py-24 bg-slate-50/50 overflow-x-hidden">
      <div className="w-full max-w-[1600px] mx-auto px-6">
        
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-[2px] bg-sky-500" />
            <span className="text-[11px] font-black text-sky-500 uppercase tracking-[0.2em]">Featured Selection</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium text-slate-900 tracking-tight mb-3">
             Explore <span className="text-sky-500 italic">Top Institutions</span>
          </h2>
          <p className="text-slate-500 font-medium max-w-xl leading-relaxed">
            Discover prestigious colleges categorized by NIRF rankings, placement records, and infrastructure.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveStream(f.value)}
                className={cn(
                  "px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 shrink-0",
                  activeStream === f.value 
                    ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20" 
                    : "bg-white border border-slate-200 text-slate-500 hover:border-slate-400"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0">
             <button 
                onClick={prevPage}
                className="p-3 rounded-full bg-white border border-slate-200 text-slate-400 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm active:scale-90"
             >
                <ChevronLeft size={20} />
             </button>
             <button 
                onClick={nextPage}
                className="p-3 rounded-full bg-white border border-slate-200 text-slate-400 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm active:scale-90"
             >
                <ChevronRight size={20} />
             </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
           <div 
             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 ease-in-out"
             key={`${activeStream}-${page}`}
             style={{ animation: 'slideRight 0.6s cubic-bezier(0.23, 1, 0.32, 1)' }}
           >
              {currentColleges.length > 0 ? (
                currentColleges.map((college) => (
                  <div key={college.id} className="transform transition-transform hover:-translate-y-2 duration-300">
                    <CollegeCard college={college} />
                  </div>
                ))
              ) : (
                <div className="col-span-full py-32 text-center rounded-[40px] bg-white border-2 border-dashed border-slate-100">
                  <p className="text-slate-300 font-bold italic">No colleges found in this category.</p>
                </div>
              )}
           </div>
        </div>

        <div className="mt-16 flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
                <div 
                    key={i} 
                    className={cn(
                        "h-1.5 rounded-full transition-all duration-500",
                        page === i ? "w-8 bg-sky-500" : "w-2 bg-slate-200"
                    )} 
                />
            ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  )
}
