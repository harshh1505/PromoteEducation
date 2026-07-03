'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Verified } from 'lucide-react'
import CollegeCard from '@/components/ui/CollegeCard'
import LeadModal from '@/components/ui/LeadModal'
import { useLeadCapture } from '@/hooks/useLeadCapture'
import ReviewModal from '@/components/ui/ReviewModal'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import type { College, Stream } from '@/types'
import { useRouter } from 'next/navigation'
import { featuredColleges } from '@/lib/data/featuredColleges'

export default function CollegesSection() {
  const router = useRouter()
  const [activeStream, setActiveStream] = useState<string>('All')
  const [page, setPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(4)
  
  // Modal states
  const [leadCollege, setLeadCollege] = useState<College | null>(null)
  const [reviewCollege, setReviewCollege] = useState<College | null>(null)

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

  const { isAuthorized } = useLeadCapture()

  const handleOpenLead = async (college: College) => {
    if (isAuthorized) {
      // If authorized (via localStorage or session), redirect directly
      router.push(`/colleges/${college.id}`)
    } else {
      // If not authorized, open lead modal
      setLeadCollege(college)
    }
  }

  return (
    <section id="colleges" className="py-12 relative overflow-hidden bg-white">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-8">
        
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            Find the best colleges for you
          </h2>
          <p className="text-slate-500 text-base max-w-2xl mx-auto">
            We help you compare, shortlist, and secure admission in the best colleges that align with your future goals.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveStream(f.value)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shrink-0",
                  activeStream === f.value 
                    ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20" 
                    : "bg-slate-50 border border-slate-200 text-slate-600 hover:border-sky-300 hover:text-sky-600"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
             <button 
                onClick={prevPage}
                className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-400 hover:bg-sky-50 hover:text-sky-500 hover:border-sky-200 transition-all active:scale-90"
             >
                <ChevronLeft size={18} />
             </button>
             <button 
                onClick={nextPage}
                className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-400 hover:bg-sky-50 hover:text-sky-500 hover:border-sky-200 transition-all active:scale-90"
             >
                <ChevronRight size={18} />
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
                    <CollegeCard 
                      college={college} 
                      onOpenLead={handleOpenLead}
                      onOpenReview={(c) => setReviewCollege(c)}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full py-24 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-200">
                  <p className="text-slate-400 font-medium">No colleges found in this category.</p>
                </div>
              )}
           </div>
        </div>

        {/* Pagination Dots */}
        <div className="mt-10 flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
                <div 
                    key={i} 
                    className={cn(
                        "h-2 rounded-full transition-all duration-500",
                        page === i ? "w-8 bg-sky-500" : "w-2 bg-slate-200"
                    )} 
                />
            ))}
        </div>

        {/* Explore All CTA */}
        <div className="mt-10 text-center">
          <p className="text-slate-400 text-sm mb-4">Explore a wide range of colleges across India and abroad.</p>
          <a href="/colleges" className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all">
            Explore All Colleges <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Section-level Modals to escape stacking context issues */}
      <LeadModal 
        isOpen={!!leadCollege}
        onClose={() => setLeadCollege(null)}
        collegeName={leadCollege?.name || ''}
        collegeLogo={leadCollege?.logo}
        stream={leadCollege?.stream || ''}
        collegeId={leadCollege?.id}
      />

      <ReviewModal 
        isOpen={!!reviewCollege}
        onClose={() => setReviewCollege(null)}
        collegeName={reviewCollege?.name || ''}
      />

      <style jsx>{`
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  )
}
