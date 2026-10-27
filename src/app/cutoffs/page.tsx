'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CounsellingModal from '@/components/ui/CounsellingModal'
import {
  Stethoscope,
  Code2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  GraduationCap,
  Compass,
  FileSpreadsheet,
  Award,
  ChevronRight,
  Search,
  Layers
} from 'lucide-react'

export default function CutoffsPage() {
  const [counsellingModalOpen, setCounsellingModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />

      {/* ── MAIN STREAM SELECTION VIEWPORT (Fits in one window) ──── */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 lg:pt-32 pb-8 flex-1 flex flex-col justify-center">
        
        {/* Header Strip */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-bold tracking-wider uppercase mb-3 shadow-sm">
            <FileSpreadsheet size={13} className="text-emerald-400" />
            Official Seat Allotment Archives • 2024–25
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Explore College Cutoffs
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            Select your academic stream below to view verified opening & closing ranks, category quotas (AIQ vs State), and round-wise seat allotments.
          </p>
        </div>

        {/* ── THE 2 STREAM PORTALS (PRIMARY AGENDA) ────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
          
          {/* MEDICAL CUTOFFS CARD */}
          <div className="bg-white rounded-2xl border-2 border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between relative group">
            <div className="absolute top-0 right-0 h-1.5 w-32 bg-emerald-500 rounded-tr-2xl" />

            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-700 shadow-sm group-hover:scale-105 transition-transform">
                  <Stethoscope size={28} strokeWidth={2} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
                  MCC & State DME
                </span>
              </div>

              {/* Title & Scope */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Medical Cutoffs
              </h2>
              <p className="text-sm font-semibold text-emerald-600 mt-1">
                NEET-UG & NEET-PG Admissions
              </p>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Verified opening and closing ranks for AIIMS, Government Medical Colleges, Central Universities, and Deemed Medical institutions.
              </p>

              {/* High-Level Feature Pills */}
              <div className="mt-5 space-y-2.5 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                  <span><strong>Courses:</strong> MBBS, BDS, BAMS, BHMS, B.Sc Nursing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                  <span><strong>Quotas:</strong> 15% All India Quota (AIQ) & 85% State Quotas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                  <span><strong>Rounds:</strong> Round 1, Round 2, Round 3 & Stray Vacancy</span>
                </div>
              </div>

              {/* Benchmark Highlight Sneak Peek */}
              <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">AIIMS New Delhi (MBBS)</span>
                  <span className="font-bold text-slate-900">General Closing Rank: #57</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                  Round 1
                </span>
              </div>
            </div>

            {/* Launch Button */}
            <Link
              href="/cutoffs/medical"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all group/btn"
            >
              <span>Explore Medical Cutoffs</span>
              <ArrowRight size={17} className="group-hover/btn:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          {/* ENGINEERING CUTOFFS CARD */}
          <div className="bg-white rounded-2xl border-2 border-slate-200 hover:border-sky-500 hover:shadow-xl transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between relative group">
            <div className="absolute top-0 right-0 h-1.5 w-32 bg-sky-500 rounded-tr-2xl" />

            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-700 shadow-sm group-hover:scale-105 transition-transform">
                  <Code2 size={28} strokeWidth={2} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 border border-sky-200/60 px-3 py-1 rounded-full">
                  JoSAA & CSAB
                </span>
              </div>

              {/* Title & Scope */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-sky-700 transition-colors">
                Engineering Cutoffs
              </h2>
              <p className="text-sm font-semibold text-sky-600 mt-1">
                JEE Main, JEE Advanced & BITSAT
              </p>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Branch-wise opening and closing ranks for 23 IITs, 31 NITs, 26 IIITs, GFTIs, and premier state engineering colleges.
              </p>

              {/* High-Level Feature Pills */}
              <div className="mt-5 space-y-2.5 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-sky-600 shrink-0" />
                  <span><strong>Branches:</strong> Computer Science (CSE), AI & DS, ECE, ME, CE</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-sky-600 shrink-0" />
                  <span><strong>Institutes:</strong> IITs, NITs, IIITs, BITS Pilani & State Top</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-sky-600 shrink-0" />
                  <span><strong>Pools:</strong> All India (AI), Home State (HS) & Female 20% Pool</span>
                </div>
              </div>

              {/* Benchmark Highlight Sneak Peek */}
              <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">IIT Bombay (B.Tech CSE)</span>
                  <span className="font-bold text-slate-900">General Closing Rank: #68</span>
                </div>
                <span className="text-[11px] font-bold text-sky-700 bg-sky-100/60 px-2 py-0.5 rounded">
                  Round 5
                </span>
              </div>
            </div>

            {/* Launch Button */}
            <Link
              href="/cutoffs/engineering"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-sky-600 text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all group/btn"
            >
              <span>Explore Engineering Cutoffs</span>
              <ArrowRight size={17} className="group-hover/btn:translate-x-1.5 transition-transform" />
            </Link>
          </div>

        </div>

        {/* ── TRUST & GUIDANCE FOOTNOTE DOCK ───────────────────────── */}
        <div className="bg-white rounded-xl border border-slate-200 px-5 py-3.5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-slate-500 text-[11px]">
            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-emerald-600" /> Sourced from MCC (mcc.nic.in) & JoSAA (josaa.nic.in) official archives
            </span>
            <span className="hidden md:inline text-slate-300">•</span>
            <span className="hidden md:inline">Includes Category (GEN, OBC, EWS, SC, ST, PwD) Quota Matrix</span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => setCounsellingModalOpen(true)}
              className="text-indigo-600 hover:text-indigo-800 font-bold text-xs flex items-center gap-1 transition-colors"
            >
              <Compass size={13} />
              <span>Need Choice Filling Help?</span>
            </button>
          </div>
        </div>

      </main>

      {/* ── OG SITE FOOTER ───────────────────────────────────────── */}
      <Footer />

      {/* Counselling Modal */}
      <CounsellingModal
        isOpen={counsellingModalOpen}
        onClose={() => setCounsellingModalOpen(false)}
      />
    </div>
  )
}

