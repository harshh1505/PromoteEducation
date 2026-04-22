import { ArrowRight, GitCompare, MapPin, CheckCircle } from 'lucide-react'
import type { College } from '@/types'
import { formatCTC, formatFee } from '@/lib/utils'

interface CollegeCardProps {
  college: College
}

export default function CollegeCard({ college }: CollegeCardProps) {
  return (
    <div className="group bg-white rounded-[32px] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 flex flex-col h-full hover:-translate-y-2">
      {/* Visual Header / Rank Badge */}
      <div className="aspect-[16/9] bg-slate-50 relative overflow-hidden">
        <div className="absolute top-4 right-4 z-10 bg-slate-900 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
          Rank #{college.ranking}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-0" />
        
        {/* Stream & Logo Representation */}
        <div className="absolute bottom-4 left-6 z-10 flex items-center gap-3">
           <div className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center p-2">
              <span className="text-slate-900 font-black text-sm">{college.name.charAt(0)}</span>
           </div>
           <div className="flex flex-col">
              <span className="text-[10px] font-bold text-sky-500 uppercase tracking-widest">{college.stream}</span>
           </div>
        </div>
      </div>

      <div className="p-6 pt-2 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1 leading-tight group-hover:text-sky-500 transition-colors">
          {college.name}
        </h3>
        
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-6">
          <MapPin size={12} className="text-sky-500" />
          {college.location}, {college.state}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
           <div className="bg-slate-50 p-3 rounded-2xl">
              <p className="text-[9px] uppercase font-bold text-slate-400 tracking-widest mb-1">Avg Package</p>
              <p className="text-sm font-black text-slate-800">{formatCTC(college.avgCTC)}</p>
           </div>
           <div className="bg-slate-50 p-3 rounded-2xl">
              <p className="text-[9px] uppercase font-bold text-slate-400 tracking-widest mb-1">Annual Fee</p>
              <p className="text-sm font-black text-slate-800">{formatFee(college.totalFee)}</p>
           </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
           <button className="text-xs font-black uppercase tracking-widest text-slate-900 hover:text-sky-500 transition-colors flex items-center gap-2 group/btn">
             View College <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
           </button>
           {college.verified && (
             <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                <CheckCircle size={12} /> Verified
             </div>
           )}
        </div>
      </div>
    </div>
  )
}