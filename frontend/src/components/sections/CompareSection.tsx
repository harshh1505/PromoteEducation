'use client'

import { useState, useEffect, useRef } from 'react'
import { GitCompare, Check, Search, ChevronDown, Lock, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import LeadModal from '@/components/ui/LeadModal'

interface CollegeCompareInfo {
  name: string
  slug: string
  fees: string
  avgPackage: string
  highestPackage: string
  placementRate: string
  hostelFees: string
  roi: string
  scholarships: string
  campusSize: string
  rankings: string
}

const defaultColleges: Record<string, CollegeCompareInfo> = {
  'iit-bombay': { name: 'IIT Bombay', slug: 'iit-bombay', fees: '₹2.2L / yr', avgPackage: '₹23.5 LPA', highestPackage: '₹1.68 Cr', placementRate: '95%', hostelFees: '₹32k / yr', roi: 'Excellent (10.6x)', scholarships: 'MHRD, Merit-cum-Means', campusSize: '550 Acres', rankings: '#3 NIRF Engineering' },
  'iit-delhi': { name: 'IIT Delhi', slug: 'iit-delhi', fees: '₹2.1L / yr', avgPackage: '₹20.5 LPA', highestPackage: '₹2.0 Cr', placementRate: '92%', hostelFees: '₹30k / yr', roi: 'Excellent (9.7x)', scholarships: 'Merit-cum-Means, MCM', campusSize: '320 Acres', rankings: '#2 NIRF Engineering' },
  'bits-pilani': { name: 'BITS Pilani', slug: 'bits-pilani', fees: '₹5.5L / yr', avgPackage: '₹16.5 LPA', highestPackage: '₹60.7 LPA', placementRate: '94%', hostelFees: '₹45k / yr', roi: 'High (3.0x)', scholarships: 'MCN Scholarships, Merit', campusSize: '328 Acres', rankings: '#25 NIRF Engineering' },
  'bits-goa': { name: 'BITS Goa', slug: 'bits-goa', fees: '₹5.5L / yr', avgPackage: '₹13.8 LPA', highestPackage: '₹75 LPA', placementRate: '91%', hostelFees: '₹45k / yr', roi: 'High (2.5x)', scholarships: 'MCN Scholarships, Merit', campusSize: '180 Acres', rankings: '#62 NIRF Engineering' },
  'iim-ahmedabad': { name: 'IIM Ahmedabad', slug: 'iim-ahmedabad', fees: '₹25.0L (Total)', avgPackage: '₹33.0 LPA', highestPackage: '₹1.15 Cr', placementRate: '100%', hostelFees: 'Included in fees', roi: 'Outstanding (1.3x)', scholarships: 'IIMA Special Needs, Aditya Birla', campusSize: '106 Acres', rankings: '#1 NIRF Management' },
  'iim-bangalore': { name: 'IIM Bangalore', slug: 'iim-bangalore', fees: '₹24.5L (Total)', avgPackage: '₹30.2 LPA', highestPackage: '₹95 LPA', placementRate: '100%', hostelFees: 'Included in fees', roi: 'Outstanding (1.2x)', scholarships: 'Citi, IIMB Financial Aid', campusSize: '100 Acres', rankings: '#2 NIRF Management' },
  'aiims-delhi': { name: 'AIIMS New Delhi', slug: 'aiims-delhi', fees: '₹6k (Total)', avgPackage: '₹12.0 LPA', highestPackage: '₹25 LPA', placementRate: '99%', hostelFees: '₹2k / yr', roi: 'Infinite ROI', scholarships: 'Inspire, AIIMS Scholarships', campusSize: '115 Acres', rankings: '#1 NIRF Medical' },
  'vit-vellore': { name: 'VIT Vellore', slug: 'vit-vellore', fees: '₹1.98L / yr', avgPackage: '₹8.5 LPA', highestPackage: '₹1.02 Cr', placementRate: '88%', hostelFees: '₹80k / yr', roi: 'Medium (4.2x)', scholarships: 'VITGV, Merit Scholarship', campusSize: '372 Acres', rankings: '#11 NIRF Engineering' },
}

function SearchableDropdown({ label, selected, options, onSelect }: {
  label: string
  selected: CollegeCompareInfo
  options: CollegeCompareInfo[]
  onSelect: (college: CollegeCompareInfo) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredOptions = options.filter(opt => opt.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div ref={dropdownRef} className="relative flex-1">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1">{label}</label>
      <button onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-white border border-slate-200 rounded-2xl px-5 py-4 text-left font-bold text-slate-800 text-sm hover:bg-slate-50 transition-all focus:ring-2 focus:ring-sky-500/10 outline-none">
        <span className="truncate pr-2">{selected.name}</span>
        <ChevronDown size={16} className={`text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3 bg-slate-50">
            <Search size={14} className="text-slate-400 shrink-0" />
            <input type="text" placeholder="Search college..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold text-slate-700 outline-none placeholder:text-slate-300" />
          </div>
          <div className="max-h-60 overflow-y-auto py-1">
            {filteredOptions.length > 0 ? filteredOptions.map(opt => (
              <button key={opt.slug} onClick={() => { onSelect(opt); setIsOpen(false); setSearch('') }}
                className="w-full flex items-center justify-between px-5 py-3 text-left font-semibold text-xs text-slate-700 hover:bg-slate-50 transition-colors">
                <span>{opt.name}</span>
                {selected.slug === opt.slug && <Check size={14} className="text-sky-500" />}
              </button>
            )) : (
              <div className="px-5 py-4 text-xs font-medium text-slate-400 text-center">No colleges found</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function CompareSection() {
  const [collegeA, setCollegeA] = useState<CollegeCompareInfo>(defaultColleges['iit-bombay'])
  const [collegeB, setCollegeB] = useState<CollegeCompareInfo>(defaultColleges['iit-delhi'])
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [showCounsellingModal, setShowCounsellingModal] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [course, setCourse] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('comparison_unlocked') === 'true') setIsUnlocked(true)
  }, [])

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !phone || !course) { alert('Please fill in all fields.'); return }
    if (phone.length < 10) { alert('Please enter a valid 10-digit phone number.'); return }
    setIsSubmitting(true)
    try {
      const { error } = await supabase.from('leads').insert([{
        full_name: name, email, phone,
        city: 'Unknown (Compare Tool)', stream: course,
        college_name: `${collegeA.name} vs ${collegeB.name}`,
        source: 'College Comparison Tool Unlock Form', status: 'new'
      }])
      if (error) throw error
      localStorage.setItem('comparison_unlocked', 'true')
      setIsUnlocked(true)
    } catch (err: any) {
      console.error(err)
      alert('Could not submit form. Please check your network and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const comparisonRows = [
    { label: 'Annual Tuition Fees', key: 'fees' as keyof CollegeCompareInfo },
    { label: 'Average Package (CTC)', key: 'avgPackage' as keyof CollegeCompareInfo },
    { label: 'Highest Package (CTC)', key: 'highestPackage' as keyof CollegeCompareInfo, lock: true },
    { label: 'Placement Percentage', key: 'placementRate' as keyof CollegeCompareInfo, lock: true },
    { label: 'Hostel Fees', key: 'hostelFees' as keyof CollegeCompareInfo, lock: true },
    { label: 'Return on Investment', key: 'roi' as keyof CollegeCompareInfo, lock: true },
    { label: 'Available Scholarships', key: 'scholarships' as keyof CollegeCompareInfo, lock: true },
    { label: 'Campus Size', key: 'campusSize' as keyof CollegeCompareInfo, lock: true },
    { label: 'NIRF Ranking', key: 'rankings' as keyof CollegeCompareInfo, lock: true },
  ]

  const collegesList = Object.values(defaultColleges)

  return (
    <section id="compare-section" className="py-12 bg-gradient-to-b from-slate-50 to-slate-100 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-indigo-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-sky-200/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-black text-slate-900 leading-tight mb-4 font-display">
            Compare Colleges <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">Without Confusion</span>
          </h2>
          <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed">
            Choose any two institutions and review fees, placements, scholarships, and ROI metrics side by side.
          </p>
        </div>

        {/* Side-by-side layout: Table (left 8 cols) | Unlock Card (right 4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* LEFT: Dropdowns + Comparison Table */}
          <div className="lg:col-span-8 space-y-4">

            {/* Dropdowns */}
            <div className="bg-white/80 border border-slate-200 rounded-[28px] p-5 shadow-lg flex flex-col md:flex-row gap-4 items-center">
              <SearchableDropdown label="Compare College A" selected={collegeA} options={collegesList} onSelect={setCollegeA} />
              <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-500 text-xs shrink-0 self-center md:mt-5">VS</div>
              <SearchableDropdown label="Compare College B" selected={collegeB} options={collegesList} onSelect={setCollegeB} />
            </div>

            {/* Comparison Table */}
            <div className="bg-white border border-slate-200 rounded-[28px] overflow-hidden shadow-xl">
              <div className="grid grid-cols-12 bg-slate-900 text-white font-extrabold text-xs uppercase tracking-wider py-4 px-5 md:px-7">
                <div className="col-span-4 text-slate-400">Metrics</div>
                <div className="col-span-4 text-center truncate px-2">{collegeA.name}</div>
                <div className="col-span-4 text-center truncate px-2">{collegeB.name}</div>
              </div>
              <div className="divide-y divide-slate-100">
                {comparisonRows.map((row, idx) => {
                  const isLockedRow = row.lock && !isUnlocked
                  return (
                    <div key={row.label}
                      className={`grid grid-cols-12 py-4 px-5 md:px-7 items-center text-xs md:text-sm font-semibold transition-all ${
                        idx % 2 === 0 ? 'bg-slate-50/40' : 'bg-white'
                      } ${isLockedRow ? 'blur-[4px] select-none pointer-events-none opacity-40' : ''}`}>
                      <div className="col-span-4 text-slate-500">{row.label}</div>
                      <div className="col-span-4 text-center text-slate-800 font-bold px-2">{collegeA[row.key]}</div>
                      <div className="col-span-4 text-center text-slate-800 font-bold px-2">{collegeB[row.key]}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Post-unlock counselling banner */}
            {isUnlocked && (
              <div className="bg-indigo-900 text-white rounded-[24px] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl animate-in zoom-in-95 duration-500">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="text-amber-400 shrink-0" size={14} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-200">Expert Counselling</span>
                  </div>
                  <h4 className="text-base font-extrabold mb-0.5">Get Professional Analysis on these Colleges</h4>
                  <p className="text-indigo-200/80 text-xs font-semibold">Book a free one-on-one consultation with our experts.</p>
                </div>
                <button onClick={() => setShowCounsellingModal(true)}
                  className="px-5 py-3 bg-white text-indigo-900 hover:bg-slate-100 transition-all font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-lg shrink-0">
                  Book Free Counselling <ArrowRight size={13} />
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: Unlock Form Card (sticky alongside table) */}
          <div className="lg:col-span-4">
            {!isUnlocked ? (
              <div className="bg-white border border-slate-200 rounded-[28px] p-6 shadow-xl lg:sticky lg:top-24">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-full flex items-center justify-center shrink-0">
                    <Lock size={17} />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 leading-snug">Unlock Full Comparison</h4>
                    <p className="text-[11px] text-slate-400 font-semibold mt-0.5">ROI, scholarships, hostel & rankings</p>
                  </div>
                </div>

                <form onSubmit={handleUnlock} className="space-y-3">
                  <input required type="text" placeholder="Your Name*" value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all text-slate-800 placeholder:text-slate-300" />
                  <input required type="tel" placeholder="Phone Number*" value={phone} onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all text-slate-800 placeholder:text-slate-300" />
                  <input required type="email" placeholder="Email Address*" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all text-slate-800 placeholder:text-slate-300" />
                  <select required value={course} onChange={(e) => setCourse(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all appearance-none cursor-pointer text-slate-500">
                    <option value="">Preferred Course*</option>
                    <option value="B.Tech">B.Tech (Engineering)</option>
                    <option value="MBA">MBA (Management)</option>
                    <option value="MBBS">MBBS (Medical)</option>
                    <option value="BDS">BDS (Dental)</option>
                    <option value="B.Sc Nursing">B.Sc Nursing</option>
                    <option value="Other">Other</option>
                  </select>

                  <button type="submit" disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#3B2EA8] hover:bg-[#2C218B] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2 disabled:opacity-50 mt-1">
                    {isSubmitting ? 'Submitting...' : 'Unlock Report Now'}
                    <ArrowRight size={14} />
                  </button>
                </form>

                <div className="flex items-center justify-center gap-1.5 text-[9px] text-slate-400 mt-4 pt-3 border-t border-slate-100">
                  <ShieldCheck size={11} />
                  <span>Your privacy is protected. Standard terms apply.</span>
                </div>
              </div>
            ) : (
              <div className="bg-indigo-50 border border-indigo-100 rounded-[28px] p-6 shadow-lg lg:sticky lg:top-24 text-center animate-in zoom-in-95 duration-500">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={22} />
                </div>
                <h4 className="text-sm font-extrabold text-slate-900 mb-1">Report Unlocked!</h4>
                <p className="text-xs text-slate-500 font-semibold mb-4 leading-relaxed">You can now view all metrics including ROI, scholarships, and hostel data.</p>
                <button onClick={() => setShowCounsellingModal(true)}
                  className="w-full py-3 bg-[#3B2EA8] text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2">
                  Book Free Counselling <ArrowRight size={13} />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      <LeadModal
        isOpen={showCounsellingModal}
        onClose={() => setShowCounsellingModal(false)}
        collegeName={`${collegeA.name} vs ${collegeB.name}`}
        stream={course || 'Engineering'}
      />
    </section>
  )
}
