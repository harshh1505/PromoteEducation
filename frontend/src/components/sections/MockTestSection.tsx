'use client'

import React from 'react'
import { Play, ClipboardCheck, ArrowRight, ShieldCheck } from 'lucide-react'

const tests = [
  { name: 'JEE Main 2026', type: 'Full Syllabus', duration: '180 min', questions: '90', takers: '25k+' },
  { name: 'NEET UG 2026', type: 'Physics/Chem/Bio', duration: '200 min', questions: '200', takers: '40k+' },
  { name: 'CUET 2026', type: 'General Test', duration: '60 min', questions: '60', takers: '15k+' },
  { name: 'BITSAT 2026', type: 'Complete Pack', duration: '180 min', questions: '130', takers: '12k+' },
]

export default function MockTestSection() {
  return (
    <section className="py-20 bg-surface-2 border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-px bg-action" />
              <span className="text-xs font-bold text-action uppercase tracking-[0.2em]">Prep Center</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-medium text-ink tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Simulate <span className="text-action">Real Exam</span> Environment
            </h2>
          </div>
          <button className="flex items-center gap-2 text-ink font-bold text-sm hover:text-action transition-all">
             Browse 50+ Mock Tests <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tests.map((test) => (
            <div key={test.name} className="bg-white p-6 rounded-3xl border border-border hover:border-action/30 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-action/5 flex items-center justify-center text-action mb-6 transition-colors group-hover:bg-action group-hover:text-white">
                <ClipboardCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-ink mb-2">{test.name}</h3>
              <p className="text-xs text-ink-3 mb-6 uppercase tracking-wider font-bold">{test.type}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-[10px] text-ink-4 uppercase font-bold tracking-widest">Duration</p>
                  <p className="text-xs font-bold text-ink">{test.duration}</p>
                </div>
                <div>
                  <p className="text-[10px] text-ink-4 uppercase font-bold tracking-widest">Questions</p>
                  <p className="text-xs font-bold text-ink">{test.questions}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <span className="text-[10px] text-action font-bold uppercase tracking-widest flex items-center gap-1">
                  <ShieldCheck size={12} /> {test.takers} attempts
                </span>
                <button className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-action transition-colors shadow-lg active:scale-95">
                  <Play size={16} fill="currentColor" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
