'use client'

import { useState } from 'react'
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react'
import MatchScoreRing from '@/components/ui/MatchScoreRing'

const questions = [
  { id: 'stream', label: 'Preferred stream?', options: ['Engineering', 'Medical', 'MBA', 'Law', 'Design'] },
  { id: 'budget', label: 'Annual budget?', options: ['< ₹1L', '₹1L–5L', '₹5L–15L', '₹15L+'] },
  { id: 'location', label: 'Preferred location?', options: ['Home state', 'Metro city', 'Any in India', 'Abroad too'] },
]

export default function AIMatchSection() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (questionId: string, option: string) => {
    const newAnswers = { ...answers, [questionId]: option }
    setAnswers(newAnswers)
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      setShowResult(true)
    }
  }

  const currentQ = questions[step]

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: 'var(--midnight)' }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Sparkles size={14} style={{ color: 'var(--gold)' }} />
              <span className="text-xs font-medium tracking-wider uppercase" style={{ color: 'var(--gold)', letterSpacing: '0.1em' }}>
                AI-powered matching
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-medium text-white mb-5"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em', lineHeight: 1.15 }}
            >
              Find colleges that{' '}
              <span className="gold-shimmer">match you.</span>
            </h2>
            <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
              Answer 5 quick questions and get a personalised list ranked by your admission chances, budget, and career goals — not just rankings.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {[
                'Personalised admission chance predictor',
                'Budget-filtered college shortlist',
                'Career outcome projections',
                'Parent-friendly fee comparison',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  <CheckCircle size={13} style={{ color: 'var(--success)', flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-pill text-sm font-medium transition-all duration-150 hover:brightness-110 active:scale-95"
              style={{ background: 'var(--gold)', color: 'var(--midnight)', borderRadius: '999px' }}
            >
              <Sparkles size={14} />
              Get my matches
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Right — interactive quiz card */}
          <div>
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '0.5px solid rgba(255,255,255,0.1)',
              }}
            >
              {!showResult ? (
                <div className="p-6">
                  {/* Progress */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      Question {step + 1} of {questions.length}
                    </span>
                    <div className="flex gap-1.5">
                      {questions.map((_, i) => (
                        <div
                          key={i}
                          className="h-1 rounded-full transition-all duration-300"
                          style={{
                            width: i <= step ? '20px' : '8px',
                            background: i <= step ? 'var(--gold)' : 'rgba(255,255,255,0.15)',
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-lg font-medium text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
                    {currentQ.label}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {currentQ.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleAnswer(currentQ.id, option)}
                        className="w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-150 hover:border-gold"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '0.5px solid rgba(255,255,255,0.1)',
                          color: 'rgba(255,255,255,0.8)',
                          borderRadius: '12px',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(201,168,76,0.1)'
                          e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Result card */
                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-pill mb-4" style={{ background: 'rgba(29,184,122,0.15)', color: 'var(--success)', border: '0.5px solid rgba(29,184,122,0.25)', borderRadius: '999px' }}>
                      <CheckCircle size={10} />
                      Match found
                    </div>
                    <h3 className="text-white font-medium text-lg mb-1" style={{ letterSpacing: '-0.02em' }}>
                      IIT Bombay
                    </h3>
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      B.Tech Computer Science
                    </p>
                  </div>

                  <div className="flex justify-center mb-6">
                    <div className="text-center">
                      <MatchScoreRing score={92} size={72} />
                      <div className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Match score</div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-5">
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span style={{ color: 'rgba(255,255,255,0.5)' }}>Admission chance</span>
                        <span style={{ color: 'var(--success)' }}>68%</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                        <div className="h-full rounded-full" style={{ width: '68%', background: 'var(--success)' }} />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {['Within budget', 'Stream match', 'Top placement'].map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-pill"
                        style={{
                          background: 'rgba(201,168,76,0.12)',
                          color: 'var(--gold)',
                          border: '0.5px solid rgba(201,168,76,0.25)',
                          borderRadius: '999px',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="flex-1 py-2.5 rounded-pill text-xs font-medium transition-all duration-150"
                      style={{ background: 'var(--gold)', color: 'var(--midnight)', borderRadius: '999px' }}
                    >
                      See all 12 matches
                    </button>
                    <button
                      onClick={() => { setStep(0); setAnswers({}); setShowResult(false) }}
                      className="px-4 py-2.5 rounded-pill text-xs transition-all duration-150"
                      style={{ border: '0.5px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)', borderRadius: '999px' }}
                    >
                      Redo
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
