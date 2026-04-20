'use client'

import React from 'react'
import { FileText, Download, Search, FileDown } from 'lucide-react'

const papers = [
  { year: '2025', exam: 'JEE Main', shift: 'Jan Session', size: '2.4 MB' },
  { year: '2025', exam: 'NEET UG', shift: 'Set A, B, C', size: '4.1 MB' },
  { year: '2024', exam: 'CAT', shift: 'All Slots', size: '1.8 MB' },
  { year: '2024', exam: 'JEE Advanced', shift: 'Paper 1 & 2', size: '5.2 MB' },
  { year: '2025', exam: 'CUET UG', shift: 'General Test', size: '1.2 MB' },
  { year: '2024', exam: 'UPSC CSE', shift: 'Prelims GS-1', size: '3.5 MB' },
]

export default function PYQSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-px bg-action" />
              <span className="text-xs font-bold text-action uppercase tracking-[0.2em]">Questions Bank</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-medium text-ink tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Master The <span className="text-midnight italic">Patterns</span>
            </h2>
          </div>
          
          <div className="relative md:w-80 group">
             <input 
               type="text" 
               placeholder="Search by exam or year..." 
               className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-action/20 focus:bg-white transition-all"
             />
             <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-4 group-focus-within:text-action transition-colors" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {papers.map((paper, idx) => (
            <div key={idx} className="flex items-center justify-between p-5 rounded-2xl border border-slate-100 bg-slate-50/30 hover:bg-white hover:border-action/20 hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm text-action group-hover:bg-action group-hover:text-white transition-all">
                  <FileText size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink">{paper.exam} {paper.year}</h4>
                  <p className="text-[10px] text-ink-3 uppercase font-bold tracking-widest">{paper.shift}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-bold text-ink-4">{paper.size}</span>
                <button className="p-2.5 bg-white rounded-full text-ink-4 hover:text-action hover:bg-action/10 transition-all">
                  <FileDown size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
           <p className="text-xs text-ink-4">
             Can't find what you're looking for? <button className="text-action font-bold hover:underline">Request a paper</button>
           </p>
        </div>

      </div>
    </section>
  )
}
