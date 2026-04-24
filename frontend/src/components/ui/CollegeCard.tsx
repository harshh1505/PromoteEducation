import { ArrowRight, MapPin, CheckCircle, Star, Download, GitCompare, ChevronRight } from 'lucide-react'
import type { College } from '@/types'
import { formatCTC, formatFee, cn } from '@/lib/utils'
import { useState } from 'react'
import LeadModal from './LeadModal'
import ReviewModal from './ReviewModal'

interface CollegeCardProps {
  college: College
  onOpenLead?: (college: College) => void
  onOpenReview?: (college: College) => void
}

export default function CollegeCard({ college, onOpenLead, onOpenReview }: CollegeCardProps) {

  return (
    <>
      <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full border-b-4 border-b-slate-100 hover:border-b-sky-500">
        
        {/* Visual Header - Collegedunia style */}
        <div className="aspect-[16/8] relative overflow-hidden">
          <img 
            src={college.image || 'https://images.unsplash.com/photo-1562774053-701939374585?w=800'} 
            alt={college.name} 
            className="w-full h-full object-cover transition-opacity duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1562774053-701939374585?w=800'; // Reliable Unsplash Fallback
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
          
          {/* Top Badges */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <div className="bg-sky-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md shadow-lg">
              {college.rating || '4.5'}/5
            </div>
          </div>

          {/* Content Overlay */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white p-1 flex-shrink-0 shadow-xl">
                <img 
                  src={college.logo || `https://ui-avatars.com/api/?name=${college.name}&background=random`} 
                  alt="logo" 
                  className="w-full h-full rounded-full object-contain"
                />
            </div>
            <div className="min-w-0">
                <h3 className="text-white font-bold text-sm leading-tight line-clamp-1">
                  {college.name}
                </h3>
                <p className="text-white/70 text-[10px] flex items-center gap-1 mt-0.5">
                  <MapPin size={10} /> {college.location}, {college.state} | {college.type}
                </p>
            </div>
          </div>
        </div>

        {/* Main Info Section */}
        <div className="p-4 flex flex-col flex-1">
          
          {/* Course & Fees info */}
          <div className="flex justify-between items-start mb-4">
            <div>
                <p className="text-[11px] font-bold text-slate-900 line-clamp-1 mb-1">
                  {college.stream} Program
                </p>
                <p className="text-sky-600 font-black text-sm">
                  {formatFee(college.totalFee)} <span className="text-slate-400 text-[10px] font-medium">Total Fees</span>
                </p>
            </div>
            <div className="text-right flex flex-col items-end">
                <div className="flex items-center gap-0.5 text-amber-500 mb-0.5">
                  <Star size={12} fill="currentColor" />
                  <span className="text-xs font-bold text-slate-900">{college.rating || '4.5'}</span>
                </div>
                <button 
                  onClick={() => onOpenReview?.(college)}
                  className="text-[9px] text-sky-600 font-black uppercase tracking-tighter hover:underline"
                >
                  Rate & Review
                </button>
            </div>
          </div>

          <div className="h-px bg-slate-100 mb-4" />

          {/* Stats Row - AdmissionCampus style */}
          <div className="grid grid-cols-2 gap-4 mb-5 border-l-2 border-l-sky-500/20 pl-3">
            <div>
                <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">No. of Courses</p>
                <p className="text-xs font-black text-slate-800">{college.numCourses || '12'}</p>
            </div>
            <div className="border-l border-slate-100 pl-4">
                <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Estb. Year</p>
                <p className="text-xs font-black text-slate-800">{college.establishmentYear || '1998'}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-auto space-y-2">
            <button 
              onClick={() => onOpenLead?.(college)}
              className="w-full py-2.5 border border-sky-500 text-sky-600 text-[10px] md:text-[11px] font-black uppercase tracking-widest rounded-lg hover:bg-sky-50 transition-colors flex items-center justify-center gap-2"
            >
              Read more <ChevronRight size={14} />
            </button>
            
            <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => onOpenLead?.(college)}
                  className="py-2.5 border border-slate-200 text-slate-600 text-[9px] md:text-[10px] font-bold rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
                >
                  Brochure <Download size={12} />
                </button>
                <button 
                  onClick={() => onOpenLead?.(college)}
                  className="py-2.5 bg-slate-900 text-white text-[9px] md:text-[10px] font-bold rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  Apply Now <ArrowRight size={12} />
                </button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}