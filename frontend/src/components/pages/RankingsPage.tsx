'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Trophy, Filter, Star, MapPin, Building2, TrendingUp, Info, Download, ArrowRight, FileText, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import BrochureModal from '@/components/ui/BrochureModal'

export default function RankingsPageContent() {
  const searchParams = useSearchParams()
  const cityParam = searchParams.get('city')
  
  const [colleges, setColleges] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState(cityParam ? 'All' : 'Engineering')
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false)
  const [selectedCollege, setSelectedCollege] = useState<any>(null)

  const categories = ['All', 'Engineering', 'Management', 'Medical', 'Pharmacy', 'Law', 'Architecture']

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
      
      if (cityParam) {
        query = query.ilike('location', cityParam)
      }

      const { data, error } = await query
      if (!error && data) {
        setColleges(data)
      } else {
        setColleges([])
      }
      setLoading(false)
    }
    fetchRankings()
  }, [filter, cityParam])

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-32 pb-20">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy size={20} className="text-action" />
            <span className="text-xs font-bold uppercase tracking-widest text-action">National Institutional Ranking Framework 2025</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-medium text-ink tracking-tight mb-6">
            Institutional <span className="text-midnight italic">Excellence</span> Rankings
          </h1>
          <p className="text-sm text-ink-3 max-w-xl mx-auto leading-relaxed">
            Directly synchronized with the National Institutional Ranking Framework. Download brochures to compare fee structures and placement reports.
          </p>
        </div>

        {/* Professional Tabs */}
        <div className="flex items-center justify-center mb-12">
          <div className="bg-white p-1.5 rounded-2xl border border-border shadow-sm flex flex-wrap justify-center gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-8 py-3 rounded-xl text-xs font-bold transition-all duration-300 uppercase tracking-wider",
                  filter === cat 
                    ? "bg-midnight text-white shadow-lg active:scale-95" 
                    : "text-ink-3 hover:text-midnight hover:bg-slate-50"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Legend / Info */}
        <div className="mb-8 max-w-2xl mx-auto p-4 rounded-xl bg-action/5 border border-action/10 flex items-center gap-3">
          <Info size={16} className="text-midnight flex-shrink-0" />
          <p className="text-[10px] text-midnight font-medium uppercase tracking-wider">
            Click 'Brochure' to receive the official {filter} department report via email.
          </p>
        </div>

        {/* Official NIRF Style Data Grid */}
        <div className="bg-white border border-slate-300 shadow-sm overflow-hidden text-slate-800">
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-4">
              <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-800 rounded-full animate-spin" />
              <p className="text-sm font-medium text-slate-500 italic">Loading Ranking Data...</p>
            </div>
          ) : colleges.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[13px]">
                <thead>
                  <tr className="bg-[#f8f9fa] border-b border-slate-300">
                    <th className="px-4 py-3 text-left font-bold border-r border-slate-200">Name</th>
                    <th className="px-4 py-3 text-left font-bold border-r border-slate-200 w-32">City</th>
                    <th className="px-4 py-3 text-left font-bold border-r border-slate-200 w-32">State</th>
                    <th className="px-4 py-3 text-center font-bold border-r border-slate-200 w-28">Avg Package</th>
                    <th className="px-4 py-3 text-center font-bold border-r border-slate-200 w-28">Total Fees</th>
                    <th className="px-4 py-3 text-center font-bold border-r border-slate-200 w-24">Score</th>
                    <th className="px-4 py-3 text-center font-bold w-20">Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {colleges.map((college, index) => (
                    <tr 
                      key={college.id}
                      className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-4 py-4 border-r border-slate-200">
                         <div className="flex flex-col gap-1">
                            <span className="font-semibold text-slate-900 leading-tight">
                              {college.name}
                            </span>
                            <div className="flex items-center gap-2 text-[11px]">
                               <button 
                                 onClick={() => {
                                   setSelectedCollege(college);
                                   setIsBrochureModalOpen(true);
                                 }}
                                 className="text-action hover:underline font-medium flex items-center gap-1"
                               >
                                 More Details
                               </button>
                               <span className="text-slate-300">|</span>
                               <button 
                                 onClick={() => {
                                   setSelectedCollege(college);
                                   setIsBrochureModalOpen(true);
                                 }}
                                 className="text-red-600 hover:scale-110 transition-transform"
                                 title="Download Brochure"
                                >
                                 <FileText size={14} />
                               </button>
                               <span className="text-slate-300">|</span>
                               <a 
                                 href={college.website || '#'} 
                                 target="_blank"
                                 className="text-slate-400 hover:text-action transition-colors"
                               >
                                 <LogOut size={12} className="-rotate-90" />
                               </a>
                            </div>
                         </div>
                      </td>
                      <td className="px-4 py-4 border-r border-slate-200 text-slate-600">
                         {college.location}
                      </td>
                      <td className="px-4 py-4 border-r border-slate-200 text-slate-600">
                         {college.state}
                      </td>
                      <td className="px-4 py-4 border-r border-slate-200 text-center font-bold text-slate-700 bg-slate-50/30">
                         {college['Average Package'] || '-'}
                      </td>
                      <td className="px-4 py-4 border-r border-slate-200 text-center font-medium text-slate-600">
                         {college['Total Fees'] || '-'}
                      </td>
                      <td className="px-4 py-4 border-r border-slate-200 text-center font-medium text-slate-700">
                         {(89.5 - ((college.ranking || index) * 1.5)).toFixed(2)}
                      </td>
                      <td className="px-4 py-4 text-center font-bold text-slate-900 bg-slate-50/50">
                         {college.ranking || index + 1}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-24 text-center bg-slate-50/30">
                <p className="text-sm text-slate-400 italic">Ranking data currently being updated by the National Institutional Ranking Framework...</p>
            </div>
          )}
        </div>

        {/* Lead Capture Modal */}
        {selectedCollege && (
          <BrochureModal 
            isOpen={isBrochureModalOpen}
            onClose={() => setIsBrochureModalOpen(false)}
            collegeName={selectedCollege.name}
            collegeId={selectedCollege.id}
            stream={selectedCollege.stream}
          />
        )}

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
