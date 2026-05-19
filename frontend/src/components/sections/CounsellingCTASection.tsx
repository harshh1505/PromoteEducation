'use client'

import React, { useState } from 'react'
import { PhoneCall, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react'
import LeadModal from '@/components/ui/LeadModal'

export default function CounsellingCTASection() {
  const [showModal, setShowModal] = useState(false)

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,46,168,0.25),transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 left-10 w-72 h-72 bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        
        {/* Sparkle badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-sky-400 uppercase tracking-widest mb-6">
          <Sparkles size={14} className="text-sky-400 animate-spin-slow" />
          Limited Slots for 2026 Admissions
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight leading-tight font-display">
          Ready to Secure Your <br className="hidden md:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-350 to-indigo-500">Dream College Admission?</span>
        </h2>

        {/* Subtitle */}
        <p className="text-white/60 font-medium text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed">
          Skip the confusion of cutoffs and quotas. Connect with senior education consultants for complete choice filling and seat allocation support.
        </p>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto px-8 py-4.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white hover:from-sky-600 hover:to-indigo-700 transition-all font-bold text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-sky-500/10 hover:-translate-y-0.5 active:scale-98"
          >
            <PhoneCall size={14} />
            Book Free Counselling
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Security / Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-white/40 text-[10px] uppercase font-bold tracking-widest border-t border-white/5 pt-8">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>100% Free Consultation</span>
          </div>
          <span className="hidden sm:inline text-white/10">•</span>
          <div>Over 12,000+ Students Guided</div>
          <span className="hidden sm:inline text-white/10">•</span>
          <div>Direct Partner Support</div>
        </div>

      </div>

      <LeadModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        collegeName=""
      />
    </section>
  )
}
