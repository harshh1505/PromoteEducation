'use client'

import { useState } from 'react'
import { X, ChevronRight, ChevronLeft, GraduationCap, Laptop, Stethoscope, Briefcase, Scale, Palette, Heart, MapPin, IndianRupee, Zap, Trees, Building2, Trophy, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GoalModalProps {
  isOpen: boolean
  onClose: () => void
}

const steps = [
  { id: 1, title: 'Desired Field', subtitle: 'What are you passionate about?' },
  { id: 2, title: 'Specializations', subtitle: 'Specific areas of interest' },
  { id: 3, title: 'Campus Vibe', subtitle: 'What kind of life do you want?' },
  { id: 4, title: 'Location & Budget', subtitle: 'Financial preferences' },
  { id: 5, title: 'Academic Profile', subtitle: 'Where are you currently?' },
  { id: 6, title: 'Recommendations', subtitle: 'Your best-fit academic paths' },
]

const academicStages = ['Class 12th', 'Final Year Student', 'Graduate', 'Working Professional']
const entranceExams = ['JEE Mains/Adv', 'NEET-UG', 'CAT/MAT', 'CLAT', 'GATE', 'None/Other']

const fields = [
  { id: 'eng', label: 'Engineering', icon: Laptop, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'med', label: 'Medical', icon: Stethoscope, color: 'text-red-500', bg: 'bg-red-50' },
  { id: 'mgmt', label: 'Management', icon: Briefcase, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: 'law', label: 'Law', icon: Scale, color: 'text-slate-700', bg: 'bg-slate-50' },
  { id: 'design', label: 'Design', icon: Palette, color: 'text-pink-500', bg: 'bg-pink-50' },
  { id: 'arts', label: 'Humanities', icon: Heart, color: 'text-purple-500', bg: 'bg-purple-50' },
]

const specializations: any = {
  eng: ['Computer Science', 'AI & Data Science', 'Robotics', 'Mechanical', 'Civil', 'Electronics'],
  med: ['MBBS', 'Dental', 'Pharmacy', 'Nursing', 'Ayurveda', 'Physiotherapy'],
  mgmt: ['Marketing', 'Finance', 'HR', 'International Business', 'Operations', 'Digital Marketing'],
}

const vibes = [
  { id: 'green', label: 'Green Campus', sub: 'Eco-friendly & peaceful', icon: Trees },
  { id: 'urban', label: 'Urban Life', sub: 'City center & connectivity', icon: Building2 },
  { id: 'research', label: 'Research Heavy', sub: 'Innovation & labs focus', icon: Zap },
  { id: 'sports', label: 'Sports Excellence', sub: 'State-of-the-art facilities', icon: Trophy },
]

const cities = ['Kolkata', 'Bangalore', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad', 'Chennai']

export default function GoalModal({ isOpen, onClose }: GoalModalProps) {
  const [step, setStep] = useState(1)
  const [selections, setSelections] = useState<any>({
    fields: [],
    interests: [],
    vibes: [],
    budget: 500000,
    cities: [],
    stage: '',
    exams: [],
  })

  const nextStep = () => setStep(prev => Math.min(prev + 1, 6))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const toggleField = (fieldId: string) => {
    setSelections((prev: any) => ({
      ...prev,
      fields: prev.fields.includes(fieldId) 
        ? prev.fields.filter((i: string) => i !== fieldId)
        : [...prev.fields, fieldId]
    }))
  }

  const toggleInterest = (interest: string) => {
    setSelections((prev: any) => ({
      ...prev,
      interests: prev.interests.includes(interest) 
        ? prev.interests.filter((i: string) => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const toggleVibe = (vibeId: string) => {
    setSelections((prev: any) => ({
      ...prev,
      vibes: prev.vibes.includes(vibeId) 
        ? prev.vibes.filter((i: string) => i !== vibeId)
        : [...prev.vibes, vibeId]
    }))
  }

  const toggleCity = (city: string) => {
    setSelections((prev: any) => ({
      ...prev,
      cities: prev.cities.includes(city) 
        ? prev.cities.filter((i: string) => i !== city)
        : [...prev.cities, city]
    }))
  }

  const toggleExam = (exam: string) => {
    setSelections((prev: any) => ({
      ...prev,
      exams: prev.exams.includes(exam) 
        ? prev.exams.filter((i: string) => i !== exam)
        : [...prev.exams, exam]
    }))
  }

  const getCombinedSpecializations = () => {
    let combined: string[] = []
    selections.fields.forEach((f: string) => {
      combined = [...combined, ...(specializations[f] || [])]
    })
    return combined.length > 0 ? Array.from(new Set(combined)) : ['General']
  }

  const getRecommendations = () => {
    const recs = []
    if (selections.fields.includes('eng')) {
      recs.push({
        title: 'Computer Science & AI',
        justification: `Based on your interest in ${selections.interests.join(', ') || 'Technology'} and preference for ${selections.vibes.includes('urban') ? 'Metro hubs' : 'Innovative campuses'}, this stream offers the highest ROI in your budget of ₹${(selections.budget / 100000).toFixed(0)}L.`,
        link: '/colleges?search=Computer Science'
      })
    }
    if (selections.fields.includes('mgmt')) {
      recs.push({
        title: 'Strategic Management',
        justification: `Your academic profile as a ${selections.stage} aligns perfectly with top-tier MBA programs in ${selections.cities[0] || 'Tier-1 cities'}. Great for networking and corporate exposure.`,
        link: '/colleges?search=MBA'
      })
    }
    if (selections.fields.includes('med')) {
      recs.push({
        title: 'Clinical Research & Medicine',
        justification: `Given your focus on ${selections.vibes.includes('research') ? 'Research-heavy' : 'Healthcare'} environments, you should target institutions with strong clinical rotations and hospital attachments.`,
        link: '/colleges?search=MBBS'
      })
    }
    // Fallback if none match
    if (recs.length === 0) {
      recs.push({
        title: 'Professional Studies',
        justification: 'Based on your diverse interests, we suggest exploring multi-disciplinary universities that offer flexibility between major and minor streams.',
        link: '/colleges'
      })
    }
    return recs
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-5xl rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row relative animate-in zoom-in-95 duration-500">
        
        {/* Left Side: Progress & Info */}
        <div className="w-full md:w-80 bg-slate-900 p-8 text-white flex flex-col justify-between relative overflow-hidden shrink-0">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
                <GraduationCap size={32} className="text-sky-500" />
                <span className="text-sm font-black tracking-widest text-sky-400">GOAL WIZARD</span>
            </div>
            <div className="space-y-6">
              {steps.map((s) => (
                <div key={s.id} className="flex gap-4 items-center">
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-black transition-all",
                    step === s.id ? "bg-sky-500 border-sky-500 text-white" : 
                    step > s.id ? "bg-emerald-500 border-emerald-500 text-white" : "border-white/20 text-white/20"
                  )}>
                    {step > s.id ? '✓' : s.id}
                  </div>
                  <div className={cn(
                    "transition-all",
                    step === s.id ? "opacity-100" : "opacity-40"
                  )}>
                    <p className="text-[10px] font-bold uppercase tracking-widest">{s.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative z-10 pt-12">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[10px] font-black uppercase tracking-widest text-sky-500 mb-2">Smart Matching</p>
                <p className="text-[11px] font-medium text-white/40 leading-relaxed italic">
                  "Our algorithm analyzes your interests and budget to recommend the most favourable academic paths for your career."
                </p>
            </div>
          </div>

          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-sky-500/10 rounded-full blur-3xl" />
        </div>

        {/* Right Side: Step Content */}
        <div className="flex-1 p-8 md:p-12 flex flex-col max-h-[90vh] overflow-y-auto">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
          >
            <X size={20} />
          </button>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{steps[step-1].title}</h2>
            <p className="text-slate-500 font-medium">{steps[step-1].subtitle}</p>
          </div>

          <div className="flex-1 min-h-0">
            {step === 1 && (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 animate-in slide-in-from-bottom-4 duration-500">
                {fields.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => toggleField(f.id)}
                    className={cn(
                      "flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all group",
                      selections.fields.includes(f.id) ? "border-sky-500 bg-sky-50 shadow-lg shadow-sky-500/5" : "border-slate-100 hover:border-sky-200 hover:bg-slate-50"
                    )}
                  >
                    <div className={cn("w-12 h-12 rounded-2xl mb-4 flex items-center justify-center transition-transform group-hover:scale-110", f.bg, f.color)}>
                      <f.icon size={24} />
                    </div>
                    <span className="text-sm font-bold text-slate-900">{f.label}</span>
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-wrap gap-3">
                  {getCombinedSpecializations().map((spec: string) => (
                    <button
                      key={spec}
                      onClick={() => toggleInterest(spec)}
                      className={cn(
                        "px-6 py-3 rounded-2xl text-sm font-bold border-2 transition-all",
                        selections.interests.includes(spec) 
                          ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/20" 
                          : "border-slate-100 text-slate-600 hover:border-slate-200"
                      )}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-4 duration-500">
                {vibes.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => toggleVibe(v.id)}
                    className={cn(
                      "flex items-center gap-5 p-5 rounded-3xl border-2 transition-all text-left",
                      selections.vibes.includes(v.id) ? "border-sky-500 bg-sky-50" : "border-slate-100 hover:border-slate-200"
                    )}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-sky-500 border border-slate-100">
                      <v.icon size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{v.label}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{v.sub}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-500 pb-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Course Budget</label>
                    <span className="text-lg font-black text-sky-600">
                      {selections.budget >= 5000000 ? "₹50L+" : `₹${(selections.budget / 100000).toFixed(1)}L`}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="100000" 
                    max="5000000" 
                    step="100000"
                    value={selections.budget}
                    onChange={(e) => setSelections({ ...selections, budget: Number(e.target.value) })}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-sky-500"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-300">
                    <span>₹1.0L</span>
                    <span>₹50L+</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Target Cities</label>
                  <div className="flex flex-wrap gap-2">
                    {cities.map((city) => (
                      <button
                        key={city}
                        onClick={() => toggleCity(city)}
                        className={cn(
                          "px-4 py-2 rounded-xl text-xs font-bold border transition-all",
                          selections.cities.includes(city) 
                            ? "bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-500/20" 
                            : "border-slate-100 text-slate-600 hover:bg-slate-50"
                        )}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Status</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {academicStages.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelections({ ...selections, stage: s })}
                        className={cn(
                          "p-4 rounded-2xl border-2 text-sm font-bold transition-all text-left",
                          selections.stage === s ? "border-sky-500 bg-sky-50" : "border-slate-100 hover:border-slate-200"
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Exams Planning / Appeared</label>
                  <div className="flex flex-wrap gap-2">
                    {entranceExams.map((e) => (
                      <button
                        key={e}
                        onClick={() => toggleExam(e)}
                        className={cn(
                          "px-4 py-2 rounded-xl text-xs font-bold border transition-all",
                          selections.exams.includes(e) 
                            ? "bg-slate-900 border-slate-900 text-white" 
                            : "border-slate-100 text-slate-600 hover:bg-slate-50"
                        )}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-6 animate-in zoom-in-95 duration-500">
                <div className="p-6 bg-emerald-50 rounded-[32px] border border-emerald-100 flex items-center gap-5">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
                        <Zap size={24} fill="currentColor" />
                    </div>
                    <div>
                        <h4 className="text-emerald-900 font-bold tracking-tight">Personalized Matches Ready!</h4>
                        <p className="text-emerald-700/70 text-xs font-medium">We've identified {getRecommendations().length} high-potential streams for you.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {getRecommendations().map((rec, i) => (
                    <div key={i} className="p-6 md:p-8 rounded-[32px] border-2 border-slate-100 bg-white hover:border-sky-500/30 transition-all group">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            {rec.title} <ArrowRight size={16} className="text-sky-500 group-hover:translate-x-2 transition-transform" />
                          </h3>
                          <p className="text-slate-500 text-sm leading-relaxed max-w-xl font-medium">
                            {rec.justification}
                          </p>
                        </div>
                        <a 
                          href={rec.link}
                          className="px-6 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-slate-800 transition-all text-center shrink-0 shadow-xl shadow-slate-900/10 active:scale-95"
                        >
                          View Colleges
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-12 flex items-center justify-between pt-8 border-t border-slate-100">
            <button 
              onClick={prevStep}
              className={cn(
                "flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors",
                step === 1 && "invisible"
              )}
            >
              <ChevronLeft size={16} /> Back
            </button>
            
            {step < 6 ? (
              <button 
                onClick={nextStep}
                disabled={(step === 1 && selections.fields.length === 0) || (step === 5 && !selections.stage)}
                className="px-8 py-3 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-slate-800 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {step === 5 ? 'Generate Recommendations' : 'Continue'} <ChevronRight size={16} />
              </button>
            ) : (
              <button 
                onClick={onClose}
                className="px-10 py-3 bg-sky-500 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-sky-400 transition-all flex items-center gap-2 active:scale-95 shadow-xl shadow-sky-500/20"
              >
                Finish & Explore <Zap size={16} fill="white" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
