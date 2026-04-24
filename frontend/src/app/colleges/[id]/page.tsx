'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { 
  MapPin, Star, GraduationCap, Building2, 
  Calendar, Users, Award, CheckCircle2, 
  ArrowRight, Download, Share2, Heart,
  Info, BookOpen, Briefcase, Globe
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { featuredColleges } from '@/components/sections/CollegesSection'
import { useLeadCapture } from '@/hooks/useLeadCapture'
import BrochureModal from '@/components/ui/BrochureModal'
import type { College } from '@/types'

export default function CollegeDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const { isAuthorized } = useLeadCapture()
  const [college, setCollege] = useState<College | null>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'brochure' | 'details'>('brochure')

  useEffect(() => {
    if (id) {
      const found = featuredColleges.find(c => c.id === id)
      if (found) setCollege(found)
    }
  }, [id])

  const handleAction = (mode: 'brochure' | 'details') => {
    if (isAuthorized) {
      if (mode === 'brochure') alert('Brochure sent to your email!')
      if (mode === 'details') alert('Application form opened!')
      return
    }
    setModalMode(mode)
    setIsModalOpen(true)
  }

  if (!college) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 font-medium">Loading college details...</p>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'courses', label: 'Courses & Fees', icon: GraduationCap },
    { id: 'admission', label: 'Admission 2026', icon: BookOpen },
    { id: 'placements', label: 'Placements', icon: Briefcase },
    { id: 'campus', label: 'Campus Life', icon: Globe },
  ]

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-20">
        <div className="h-[300px] md:h-[400px] relative overflow-hidden">
          <img 
            src={college.image || 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200'} 
            className="w-full h-full object-cover"
            alt="Campus"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative -mt-32 pb-12">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
            <div className="p-6 md:p-10 flex flex-col md:flex-row gap-8 items-start md:items-end">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl shadow-lg p-3 flex-shrink-0 -mt-16 md:-mt-20 border border-slate-100">
                <img 
                  src={college.logo || `https://ui-avatars.com/api/?name=${college.name}&background=random`} 
                  className="w-full h-full object-contain"
                  alt="Logo"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-sky-100 text-sky-700 text-[10px] font-black uppercase tracking-widest rounded-full">
                    {college.stream}
                  </span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest rounded-full">
                    {college.type}
                  </span>
                  {college.verified && (
                    <span className="flex items-center gap-1 text-green-600 text-xs font-bold">
                      <CheckCircle2 size={14} /> Verified
                    </span>
                  )}
                </div>
                
                <h1 className="text-2xl md:text-4xl font-black text-slate-900 mb-3 leading-tight">
                  {college.name}
                </h1>
                
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-500 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-sky-500" />
                    {college.location}, {college.state}
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-amber-500 fill-amber-500" />
                    {college.rating || '4.5'} Rating
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-slate-400" />
                    Estb. {college.establishmentYear}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <button 
                  onClick={() => handleAction('details')}
                  className="flex-1 md:flex-none px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
                >
                  Apply Now
                </button>
                <button className="p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
                  <Heart size={20} className="text-slate-400" />
                </button>
                <button className="p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
                  <Share2 size={20} className="text-slate-400" />
                </button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-t border-slate-100 px-6 overflow-x-auto scrollbar-hide">
              <div className="flex gap-8">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "py-5 text-sm font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-2",
                      activeTab === tab.id 
                        ? "border-sky-500 text-sky-600" 
                        : "border-transparent text-slate-400 hover:text-slate-600"
                    )}
                  >
                    <tab.icon size={16} />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <Info size={24} className="text-sky-500" />
                About {college.name}
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed">
                  {college.name} is one of the premier institutions for {college.stream} in {college.state}. 
                  Established in {college.establishmentYear}, it has consistently ranked among the top colleges in India 
                  for its academic excellence, state-of-the-art infrastructure, and outstanding placement record.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  {[
                    { label: 'Courses Offered', value: `${college.numCourses}+ Programs`, icon: GraduationCap },
                    { label: 'Avg Placement', value: college.avgCTC || 'N/A', icon: Briefcase },
                    { label: 'Student Body', value: '5,000+ Active', icon: Users },
                    { label: 'Accreditation', value: 'NAAC A++', icon: Award },
                  ].map((stat, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-sky-500">
                        <stat.icon size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{stat.label}</p>
                        <p className="text-sm font-black text-slate-900">{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <GraduationCap size={24} className="text-sky-500" />
                Popular Programs
              </h2>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="p-5 border border-slate-100 rounded-2xl hover:border-sky-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-slate-900">Bachelor of {college.stream}</h4>
                      <p className="text-xs text-slate-500 mt-1">4 Years · Full Time</p>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Annual Fee</p>
                        <p className="text-sm font-black text-sky-600">₹{college.totalFee}L</p>
                      </div>
                      <button className="text-sky-600 font-bold text-sm flex items-center gap-1 hover:underline">
                        Details <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white">
              <h3 className="text-lg font-black mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => handleAction('brochure')}
                  className="w-full py-4 bg-sky-500 text-white font-bold rounded-xl hover:bg-sky-400 transition-all flex items-center justify-center gap-2"
                >
                  <Download size={18} /> Download Brochure
                </button>
                <button className="w-full py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/10">
                  Talk to Counselor
                </button>
              </div>
            </div>

            {/* Admission Stats */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-6">Admission Info</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-slate-500">Eligibility</p>
                  <p className="text-sm font-bold text-slate-900">10+2 with 50%</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-slate-500">Entrance Exam</p>
                  <p className="text-sm font-bold text-sky-600">JEE / NEET</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-slate-500">Application Status</p>
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded">OPEN</span>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-100">
                <p className="text-xs text-slate-400 italic text-center">
                  Last updated on April 20, 2026
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <Footer />
      {college && (
        <BrochureModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          collegeName={college.name}
          collegeId={college.id}
          stream={college.stream}
          mode={modalMode}
        />
      )}
    </main>
  )
}
