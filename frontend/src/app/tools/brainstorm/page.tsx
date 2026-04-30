'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { supabase } from '@/lib/supabase'
import {
  Brain,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  BarChart3,
  Target,
  Lightbulb,
  Loader2,
  Sparkles
} from 'lucide-react'
import {
  Radar as RadarRaw,
  RadarChart as RadarChartRaw,
  PolarGrid as PolarGridRaw,
  PolarAngleAxis as PolarAngleAxisRaw,
  ResponsiveContainer as ResponsiveContainerRaw,
  PolarRadiusAxis as PolarRadiusAxisRaw
} from 'recharts'

const Radar = RadarRaw as any
const RadarChart = RadarChartRaw as any
const PolarGrid = PolarGridRaw as any
const PolarAngleAxis = PolarAngleAxisRaw as any
const ResponsiveContainer = ResponsiveContainerRaw as any
const PolarRadiusAxis = PolarRadiusAxisRaw as any


// ─────────────────────────────────────────────────────────────────────────────
// TYPES & MOCK DATA (In production, fetch these from Supabase)
// ─────────────────────────────────────────────────────────────────────────────

interface Option {
  id: string
  text: string
  weights: Record<string, number>
  nextQuestionId?: string
}

interface Question {
  id: string
  category: string
  text: string
  options: Option[]
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────


// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function BrainstormPage() {
  const [step, setStep] = useState(0) // 0: Intro, 1+: Questions, 99: Results
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [scores, setScores] = useState<Record<string, number>>({})
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [aiReport, setAiReport] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [colleges, setColleges] = useState<any[]>([])
  const [profileData, setProfileData] = useState<any>(null)
  const [dataSource, setDataSource] = useState<'loading' | 'database' | 'fallback'>('loading')

  // Base URL for PDF links
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://promoteeducation.in'

  // Fetch real questions from Supabase
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('/api/brainstorm/questions')
        const data = await res.json()

        if (res.ok && data && data.length > 0) {
          console.log(`✅ Loaded ${data.length} questions from Database`)
          // Remap raw DB field names to the shape expected by the Question component
          const mapped = data.map((q: any) => ({
            id: q.id,
            category: q.category,
            text: q.question_text,
            options: (q.brainstorm_options || []).map((o: any) => ({
              id: o.id,
              text: o.option_text,
              weights: o.trait_weights || {},
              nextQuestionId: o.next_question_id,
            }))
          }))
          setQuestions(mapped)
          setDataSource('database')
        } else {
          console.warn('⚠️ Backend API returned empty or error, using Fallback.', data?.error)
          useFallback()
        }
      } catch (err) {
        console.error('❌ Network error calling API:', err)
        useFallback()
      }
    }

    const useFallback = () => {
      setDataSource('fallback')
      setQuestions([
        {
          id: '00000000-0000-0000-0000-000000000001',

          category: 'Interest',
          text: 'When solving a complex puzzle, do you prefer following a step-by-step manual or trying your own creative approach?',
          options: [
            { id: '00000000-0000-0000-0000-00000000001a', text: 'Step-by-step manual (Structured)', weights: { Investigative: 10, Conventional: 5 } },
            { id: '00000000-0000-0000-0000-00000000001b', text: 'My own creative approach (Abstract)', weights: { Artistic: 10, Investigative: 2 } }
          ]
        },
        {
          id: '00000000-0000-0000-0000-000000000002',
          category: 'Interest',
          text: 'In a group project, would you rather manage the deadlines and budget, or help teammates resolve conflicts and stay motivated?',
          options: [
            { id: '00000000-0000-0000-0000-00000000002a', text: 'Manage deadlines and budget', weights: { Enterprising: 10, Conventional: 5 } },
            { id: '00000000-0000-0000-0000-00000000002b', text: 'Help teammates and motivate', weights: { Social: 10, Artistic: 2 } }
          ]
        },
        {
          id: '00000000-0000-0000-0000-000000000003',
          category: 'Interest',
          text: 'Do you prefer working with your hands to build physical things, or working with data to analyze abstract theories?',
          options: [
            { id: '00000000-0000-0000-0000-00000000003a', text: 'Build physical things (Practical)', weights: { Realistic: 10, Conventional: 3 } },
            { id: '00000000-0000-0000-0000-00000000003b', text: 'Analyze abstract theories (Theoretical)', weights: { Investigative: 10, Artistic: 2 } }
          ]
        },
        {
          id: '00000000-0000-0000-0000-000000000004',
          category: 'Aptitude',
          text: 'If all A are B, and some B are C, can we conclude that some A are C?',
          options: [
            { id: '00000000-0000-0000-0000-00000000004a', text: 'Yes, definitely', weights: { Logical: 0 } },
            { id: '00000000-0000-0000-0000-00000000004b', text: 'No, not necessarily', weights: { Logical: 10, Analytical: 5 } },
            { id: '00000000-0000-0000-0000-00000000004c', text: 'Depends on the value of B', weights: { Logical: 5 } }
          ]
        },
        {
          id: '00000000-0000-0000-0000-000000000005',
          category: 'Personality',
          text: 'When making a financial decision, do you prioritize safety and small returns, or high-risk for high potential growth?',
          options: [
            { id: '00000000-0000-0000-0000-00000000005a', text: 'Safety and consistency', weights: { RiskAppetite: -5, Stability: 10 } },
            { id: '00000000-0000-0000-0000-00000000005b', text: 'High-risk, High-growth', weights: { RiskAppetite: 10, Entrepreneurial: 8 } }
          ]
        }
      ])
    }




    fetchQuestions()
  }, [])



  // Create a Supabase session row as soon as the test starts
  const createSession = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase
      .from('brainstorm_sessions')
      .insert({ user_id: user?.id ?? null, status: 'in_progress' })
      .select('id')
      .single()
    if (!error && data) setSessionId(data.id)
  }

  // Track full response detail (not just id) for DB persistence
  const [fullResponses, setFullResponses] = useState<Record<string, { optionId: string; weights: Record<string, number> }>>({})

  const handleAnswer = (questionId: string, optionId: string, weights: Record<string, number>, nextQuestionId?: string) => {
    setResponses(prev => ({ ...prev, [questionId]: optionId }))
    const newFullResponses = { ...fullResponses, [questionId]: { optionId, weights } }
    setFullResponses(newFullResponses)

    const newScores = { ...scores }
    Object.entries(weights).forEach(([trait, weight]) => {
      newScores[trait] = (newScores[trait] || 0) + weight
    })
    setScores(newScores)

    if (nextQuestionId) {
      const nextIndex = questions.findIndex(q => q.id === nextQuestionId)
      if (nextIndex !== -1) {
        setCurrentQuestionIndex(nextIndex)
        return
      }
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      finishTest(newScores, newFullResponses)
    }
  }

  const finishTest = async (finalScores: Record<string, number>, answeredResponses: Record<string, { optionId: string; weights: Record<string, number> }>) => {
    setIsAnalyzing(true)
    setStep(99)
    try {
      let activeSessionId = sessionId
      if (!activeSessionId) {
        const { data: { user } } = await supabase.auth.getUser()
        const { data } = await supabase
          .from('brainstorm_sessions')
          .insert({ user_id: user?.id ?? null, status: 'in_progress' })
          .select('id')
          .single()
        activeSessionId = data?.id ?? null
        setSessionId(activeSessionId)
      }

      if (!activeSessionId) throw new Error('Could not create session')

      const responseRows = Object.entries(answeredResponses).map(([questionId, { optionId, weights }]) => ({
        session_id: activeSessionId,
        question_id: questionId,
        option_id: optionId,
        trait_weights: weights,
      }))

      if (responseRows.length > 0) {
        await supabase.from('brainstorm_responses').insert(responseRows)
      }

      const res = await fetch('/api/brainstorm/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: activeSessionId })
      })
      const data = await res.json()
      setAiReport(data.interpretation)
      if (data.profile) setProfileData(data.profile)
      if (data.recommendations) setRecommendations(data.recommendations)
      if (data.colleges) setColleges(data.colleges)
    } catch (error) {
      console.error('Failed to finalize test:', error)
      setAiReport('We encountered an error generating your report. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const ip = profileData?.interest_profile
  // Helper to get score regardless of casing
  const getScore = (key: string) => {
    const k = key.toLowerCase();
    return ip?.[k] ?? scores[k] ?? scores[key] ?? 0;
  }

  const radarData = [
    { subject: 'Realistic', A: getScore('realistic'), fullMark: 100 },
    { subject: 'Investigative', A: getScore('investigative'), fullMark: 100 },
    { subject: 'Artistic', A: getScore('artistic'), fullMark: 100 },
    { subject: 'Social', A: getScore('social'), fullMark: 100 },
    { subject: 'Enterprising', A: getScore('enterprising'), fullMark: 100 },
    { subject: 'Conventional', A: getScore('conventional'), fullMark: 100 },
  ]

  if (step > 0 && step < 99 && questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
          <p className="text-slate-500 font-bold animate-pulse">Initializing your assessment engine...</p>
        </div>
        <Footer />
      </div>
    )
  }



  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sansSelection">
      <Navbar />

      {/* PRINT-SPECIFIC OVERRIDES: These only apply when downloading the PDF */}
      <style jsx global>{`
        @media print {
          /* 1. Hide navigation, footer, and the download button itself in the PDF */
          nav, footer, .print-hide, button {
            display: none !important;
          }
          
          /* 2. Reset page margins for a clean PDF look */
          main {
            padding-top: 20px !important; 
            margin: 0 !important;
            width: 100% !important;
            max-width: none !important;
          }
          
          /* 3. Ensure frames and colors are visible but subtle */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .bg-white {
            background: white !important;
          }
          
          .border-slate-100 {
            border: 1px solid #f1f5f9 !important;
          }
          
          .shadow-sm, .shadow-xl {
            box-shadow: none !important;
          }
          
          /* 4. Page Break Utility */
          .print-page-break {
            page-break-before: always !important;
            padding-top: 40px !important;
            break-inside: avoid !important;
          }
          
          .print-bold {
            font-weight: 900 !important;
            color: black !important;
          }
        }
      `}</style>

      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">

          {/* STEP 0: INTRO */}
          {step === 0 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm">
                <Brain size={40} />
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-slate-900">
                The Brainstorming <span className="text-indigo-600 italic">Test</span>
              </h1>
              <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                Discover your perfect academic fit using our hybrid RIASEC + Aptitude engine.
                Get a scientifically backed profile matched with AI-powered career insights.
              </p>
              <button
                onClick={() => {
                  setStep(1)
                  createSession()
                }}
                className="px-10 py-5 bg-indigo-600 text-white font-black text-xs uppercase tracking-widest rounded-full shadow-2xl hover:bg-indigo-500 transition-all flex items-center gap-3 mx-auto"
              >
                Start Assessment <ChevronRight size={16} />
              </button>

              <div className="mt-12 grid grid-cols-3 gap-8 pt-12 border-t border-slate-100 max-w-xl mx-auto">
                <div className="text-center">
                  <p className="text-sm font-black text-slate-900">15 mins</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Duration</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-black text-slate-900">12 Parameters</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Scientific Base</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-black text-slate-900">AI Report</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Detailed Insights</p>
                </div>
              </div>

              {/* Dev Status Badge */}
              <div className="mt-8 flex justify-center">
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border ${dataSource === 'database' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                    dataSource === 'fallback' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                      'bg-slate-50 text-slate-400 border-slate-100'
                  }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${dataSource === 'database' ? 'bg-emerald-500 animate-pulse' :
                      dataSource === 'fallback' ? 'bg-amber-500' : 'bg-slate-300'
                    }`} />
                  Engine Source: {dataSource}
                </div>
              </div>
            </motion.div>

          )}

          {/* STEP 1: QUESTIONS */}
          {step === 1 && questions.length > 0 && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full"
            >
              <div className="mb-12">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Question {currentQuestionIndex + 1} / {questions.length}</span>
                  <span className="text-xs font-bold text-slate-400">{questions[currentQuestionIndex].category}</span>
                </div>
                <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    className="h-full bg-indigo-600 rounded-full"
                  />
                </div>
              </div>

              <h2 className="text-3xl font-black text-slate-900 mb-10 leading-tight">
                {questions[currentQuestionIndex].text}
              </h2>

              <div className="space-y-4">
                {questions[currentQuestionIndex].options.map((opt: any) => (
                  <button
                    key={opt.id}
                    onClick={() => handleAnswer(questions[currentQuestionIndex].id, opt.id, opt.weights, opt.nextQuestionId)}
                    className="w-full p-6 text-left border-2 border-slate-100 rounded-2xl hover:border-indigo-600 hover:bg-indigo-50/30 transition-all group relative overflow-hidden"
                  >
                    <span className="relative z-10 font-bold text-slate-700 group-hover:text-indigo-700">{opt.text}</span>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight size={20} className="text-indigo-600" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 99: RESULTS */}
          {step === 99 && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12"
            >
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                  <CheckCircle2 size={14} /> Profile Generation Complete
                </div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Your Career <span className="text-indigo-600 italic">Signature</span></h1>
              </div>

              {/* TRAIT VISUALIZATION */}
              <div className="grid md:grid-cols-2 gap-8 items-center bg-white border border-slate-100 rounded-[40px] p-8 shadow-sm">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid stroke="#f1f5f9" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} />
                      <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar
                        name="Student"
                        dataKey="A"
                        stroke="#4f46e5"
                        strokeWidth={3}
                        fill="#4f46e5"
                        fillOpacity={0.4}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                    <BarChart3 size={20} className="text-indigo-600" /> Dominant Traits
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(ip || (Object.keys(scores).length > 0 ? scores : {}))
                      .sort(([, a], [, b]) => (b as number) - (a as number))
                      .filter(([k]) => ['realistic', 'investigative', 'artistic', 'social', 'enterprising', 'conventional'].includes(k.toLowerCase()))
                      .slice(0, 3)
                      .map(([trait, value], i) => (
                        <div key={trait}>
                          <div className="flex justify-between items-end mb-2">
                            <span className="text-sm font-black text-slate-700 capitalize">{trait}</span>
                            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Rank #{i + 1}</span>
                          </div>
                          <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min(value as number, 100)}%` }}
                              className="h-full bg-indigo-600 rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* AI INTERPRETATION */}
              <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black tracking-tight">Personalized Interpretation</h2>
                    <p className="text-[10px] text-indigo-300 font-black uppercase tracking-widest">Powered by Gemini AI</p>
                  </div>
                </div>

                {isAnalyzing ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="animate-spin text-indigo-400" size={40} />
                    <p className="text-indigo-200 font-bold animate-pulse">Analyzing your cognitive profile...</p>
                  </div>
                ) : (
                  <div className="prose prose-invert prose-slate max-w-none">
                    <div className="text-indigo-100 leading-relaxed font-medium space-y-6">
                      {aiReport ? (
                        <div dangerouslySetInnerHTML={{ __html: aiReport.replace(/\n/g, '<br/>') }} />
                      ) : (
                        "Failed to generate report. Please try again."
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* RECOMMENDATIONS */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="text-rose-500" />
                    <h3 className="font-black text-slate-900">Recommended Career Paths</h3>
                  </div>
                  <div className="space-y-3">
                    {recommendations.slice(0, 5).map((r, i) => (
                      <a
                        key={i}
                        href={`${baseUrl}/exams`}
                        className="block p-4 bg-slate-50 rounded-xl hover:bg-indigo-50 transition-colors no-underline"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-sm text-slate-700">{r.career}</span>
                          <span className="text-[10px] font-black text-rose-500">Match {Math.round(r.score / 10)}%</span>
                        </div>
                        {r.courses && r.courses.length > 0 && (
                          <div className="text-[10px] text-slate-400 font-bold uppercase">
                            Path: {r.courses.join(' • ')}
                          </div>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm print-page-break">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="text-indigo-500" />
                    <h3 className="font-black text-slate-900 print-bold">Personalized Interpretation</h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                      {(profileData?.ai_interpretation || aiReport || '').replace(/\*\*/g, '')}
                    </p>
                  </div>
                </div>
              </div>

              {/* RECOMMENDED COLLEGES */}
              {colleges.length > 0 && (
                <div className="bg-white border border-slate-100 rounded-[40px] p-10 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                        <BarChart3 size={20} />
                      </div>
                      <h2 className="text-xl font-black tracking-tight">Top College Matches</h2>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {colleges.slice(0, 4).map((c, i) => (
                      <a
                        key={i}
                        href={`${baseUrl}/colleges`}
                        className="group p-6 border border-slate-100 rounded-3xl hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/5 transition-all no-underline block"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-black text-slate-900 group-hover:text-emerald-600 transition-colors">{c.college}</h4>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{c.location}</p>
                          </div>
                          <div className="bg-emerald-50 px-3 py-1 rounded-full">
                            <span className="text-[10px] font-black text-emerald-600">ROI: {c.score}%</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-bold">
                            <span className="text-slate-400">Course</span>
                            <span className="text-slate-700">{c.course}</span>
                          </div>
                          <div className="flex justify-between text-[10px] font-bold">
                            <span className="text-slate-400">NIRF Rank</span>
                            <span className="text-slate-700">#{c.nirf_rank || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between text-[10px] font-bold">
                            <span className="text-slate-400">Avg. Package</span>
                            <span className="text-emerald-600">₹{c.avg_package} LPA</span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}



              {/* PDF REPORT FINALE (Visible in PDF) */}
              <div className="mt-20 pt-20 border-t border-slate-100 text-center">
                <blockquote className="text-2xl font-display italic text-slate-400 mb-10 px-10 leading-relaxed">
                  "The best way to predict your future is to create it."
                </blockquote>
                
                <div className="flex flex-col items-center gap-6">
                  <div className="flex gap-8">
                    <a href="https://instagram.com/promote_education" className="text-slate-400 hover:text-indigo-600 transition-colors">Instagram</a>
                    <a href="https://linkedin.com/company/promote-education-pvt-ltd" className="text-slate-400 hover:text-indigo-600 transition-colors">LinkedIn</a>
                    <a href="https://youtube.com/@PromoteEducationOfficial" className="text-slate-400 hover:text-indigo-600 transition-colors">YouTube</a>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-slate-50 px-6 py-3 rounded-full">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Connect with our experts:</span>
                    <a href="tel:+919900116101" className="text-sm font-bold text-slate-900">+91 99001 16101</a>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <a href="https://wa.me/919900116101" className="text-sm font-bold text-emerald-600">WhatsApp</a>
                  </div>
                  
                  <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest mt-4">
                    © 2026 Promote Education Technologies • <a href="https://www.promoteducation.com">www.promoteducation.com</a>
                  </p>
                </div>
              </div>

              <div className="flex justify-center pt-10 print-hide">
                <button
                  onClick={() => window.print()}
                  className="px-10 py-5 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-full hover:bg-slate-800 transition-all shadow-xl"
                >
                  Download Report PDF
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}
