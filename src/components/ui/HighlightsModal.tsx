'use client'

import { useState, useEffect } from 'react'
import { X, Calendar, MapPin, CreditCard, Award, Sparkles, ShieldCheck } from 'lucide-react'

type HighlightsModalProps = {
  collegeName: string
  established: number | string
  accreditations: string
  location: string
  affiliation: string
  stateQuotaFee: string
  managementQuotaFee: string
  hostelFee: string
}

export default function HighlightsModal({
  collegeName,
  established,
  accreditations,
  location,
  affiliation,
  stateQuotaFee,
  managementQuotaFee,
  hostelFee
}: HighlightsModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Show popup 1.5 seconds after page loads
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg overflow-hidden rounded-[32px] bg-white border-2 shadow-2xl p-8 text-slate-800 animate-scale-up"
        style={{
          borderImage: 'linear-gradient(to bottom right, #6366f1, #0ea5e9, #10b981) 1',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.15)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-500 hover:text-slate-800 transition-all duration-200 z-55 cursor-pointer"
          style={{ zIndex: 60 }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="mb-6 relative">
          <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight text-slate-900 pr-8">
            {collegeName}
          </h3>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6 relative">
          {/* Estd Year */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-600">
              <Calendar size={16} />
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Established</p>
              <p className="text-xs font-bold text-slate-900">{established || '—'}</p>
            </div>
          </div>

          {/* Location */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600">
              <MapPin size={16} />
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Location</p>
              <p className="text-xs font-bold text-slate-900">{location || '—'}</p>
            </div>
          </div>

          {/* Affiliation */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3 col-span-2">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
              <ShieldCheck size={16} />
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Affiliation</p>
              <p className="text-xs font-bold text-slate-900">{affiliation || '—'}</p>
            </div>
          </div>

          {/* Accreditations */}
          {accreditations && accreditations !== '—' && (
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3 col-span-2">
              <div className="p-2 rounded-xl bg-indigo-100 text-indigo-600">
                <Award size={16} />
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Accreditation</p>
                <p className="text-xs font-bold text-slate-900">{accreditations}</p>
              </div>
            </div>
          )}

          {/* Detailed Fees Area */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 col-span-2 space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <CreditCard size={16} className="text-rose-500" />
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Fee Structure Details</p>
            </div>
            
            <div className="grid grid-cols-1 gap-2.5 text-xs text-slate-700">
              {(!managementQuotaFee || managementQuotaFee === '—' || managementQuotaFee === 'N/A' || managementQuotaFee.toLowerCase().includes('n/a') || managementQuotaFee.toLowerCase().includes('none')) ? (
                <div className="flex flex-col gap-0.5">
                  <div className="flex justify-between items-start">
                    <span className="text-slate-400 font-semibold">Total Fees:</span>
                    <span className="font-extrabold text-slate-900 text-right max-w-[70%]">
                      {stateQuotaFee.includes('(') ? stateQuotaFee.split('(')[1].replace(')', '').trim() : stateQuotaFee}
                    </span>
                  </div>
                  {stateQuotaFee.toLowerCase().includes('sem') && (
                    <div className="flex justify-between items-start text-[11px] text-slate-500 italic">
                      <span>Semester Fee:</span>
                      <span className="font-semibold">{stateQuotaFee.includes('(') ? stateQuotaFee.split('(')[0].trim() : stateQuotaFee}</span>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex justify-between items-start">
                      <span className="text-slate-400 font-semibold">State Quota:</span>
                      <span className="font-extrabold text-slate-900 text-right max-w-[70%]">
                        {stateQuotaFee.includes('(') ? stateQuotaFee.split('(')[1].replace(')', '').trim() : stateQuotaFee}
                      </span>
                    </div>
                    {stateQuotaFee.toLowerCase().includes('sem') && (
                      <div className="flex justify-between items-start text-[11px] text-slate-500 italic">
                        <span>Semester Fee:</span>
                        <span className="font-semibold">{stateQuotaFee.includes('(') ? stateQuotaFee.split('(')[0].trim() : stateQuotaFee}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-0.5 pt-1.5 border-t border-slate-100">
                    <div className="flex justify-between items-start">
                      <span className="text-slate-400 font-semibold">Mgmt Quota:</span>
                      <span className="font-extrabold text-slate-900 text-right max-w-[70%]">
                        {managementQuotaFee.includes('(') ? managementQuotaFee.split('(')[1].replace(')', '').trim() : managementQuotaFee}
                      </span>
                    </div>
                    {managementQuotaFee.toLowerCase().includes('sem') && (
                      <div className="flex justify-between items-start text-[11px] text-slate-500 italic">
                        <span>Semester Fee:</span>
                        <span className="font-semibold">{managementQuotaFee.includes('(') ? managementQuotaFee.split('(')[0].trim() : managementQuotaFee}</span>
                      </div>
                    )}
                  </div>
                </>
              )}
              <div className="flex justify-between items-start pt-2 border-t border-slate-200/60">
                <span className="text-slate-400 font-semibold">Hostel Fees:</span>
                <span className="font-extrabold text-emerald-600 text-right max-w-[70%]">{hostelFee || '—'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => setIsOpen(false)}
          className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all duration-250 shadow-md shadow-indigo-500/10 active:scale-[0.98]"
        >
          Explore Full Guide
        </button>
      </div>
    </div>
  )
}
