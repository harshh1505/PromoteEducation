'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { 
  GraduationCap, BookOpen, Building2, Users, 
  ArrowRight, CheckCircle2, HelpCircle, MapPin, 
  Star, Share2, Download, Heart, Info, Briefcase, Globe 
} from 'lucide-react'
import BrochureModal from '@/components/ui/BrochureModal'
import { useLeadCapture } from '@/hooks/useLeadCapture'

export default function MedicalCollegeKolkataPage() {
  const { isAuthorized } = useLeadCapture()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'brochure' | 'details' | 'share' | 'remind'>('brochure')

  const handleAction = (mode: 'brochure' | 'details' | 'share' | 'remind') => {
    if (isAuthorized && mode !== 'share') {
      if (mode === 'brochure') alert('Brochure sent to your email!')
      if (mode === 'details') alert('Application form opened!')
      return
    }
    setModalMode(mode)
    setIsModalOpen(true)
  }

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-20">
        <div className="h-[400px] md:h-[500px] relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop" 
            className="w-full h-full object-cover"
            alt="Medical College Kolkata Campus"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative -mt-40 pb-12">
          <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">
            <div className="p-8 md:p-12 flex flex-col md:flex-row gap-10 items-start md:items-end">
              <div className="w-28 h-28 md:w-36 md:h-36 bg-white rounded-3xl shadow-xl p-4 flex-shrink-0 -mt-20 md:-mt-24 border border-slate-100 ring-8 ring-white">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2V_f6_9v4_8_8_8_8_8&s" 
                  className="w-full h-full object-contain"
                  alt="Medical College Kolkata Logo"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-4 py-1.5 bg-sky-100 text-sky-700 text-[11px] font-black uppercase tracking-[0.2em] rounded-full">
                    Medical
                  </span>
                  <span className="px-4 py-1.5 bg-amber-100 text-amber-700 text-[11px] font-black uppercase tracking-[0.2em] rounded-full">
                    Government
                  </span>
                  <div className="flex items-center gap-1 text-emerald-600 text-xs font-black uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    <CheckCircle2 size={14} /> Verified
                  </div>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter leading-tight">
                  Medical College Kolkata
                </h1>
                
                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-slate-500 text-sm font-bold">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-sky-500" />
                    Kolkata, West Bengal
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={18} className="text-amber-500 fill-amber-500" />
                    4.8 / 5.0 Rating
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={18} className="text-slate-400" />
                    Estb. 1835
                  </div>
                </div>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <button 
                  onClick={() => handleAction('details')}
                  className="flex-1 md:flex-none px-10 py-4 bg-sky-500 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-sky-400 transition-all shadow-xl shadow-sky-500/20 active:scale-95"
                >
                  Apply Online
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto px-4 pb-32">
        <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm text-center">
            <h2 className="text-2xl font-black text-slate-900 mb-4">Historical Excellence</h2>
            <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
                As Asia's oldest medical institution, Medical College Kolkata continues to lead in healthcare and research. Detailed insights for 2026 admissions are being updated.
            </p>
            <div className="mt-12 py-20 border-2 border-dashed border-slate-100 rounded-[40px]">
                <p className="text-slate-300 font-bold italic italic">Detailed 2026 Insights Coming Soon...</p>
            </div>
        </div>
      </div>

      <Footer />
      
      <BrochureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        collegeName="Medical College Kolkata"
        collegeId="wb-med-2"
        stream="Medical"
        mode={modalMode}
      />
    </main>
  )
}
