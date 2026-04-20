'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { 
  Calculator, 
  Target, 
  TrendingUp, 
  Brain, 
  ChevronRight,
  ArrowRight
} from 'lucide-react'

export default function ToolsPage() {
  const tools = [
    { 
      id: 'prob', 
      name: 'College Probability Calculator', 
      desc: 'Predict admission chances based on rank, category, and budget.',
      icon: Calculator, 
      color: 'var(--gold)',
      popular: true
    },
    { 
      id: 'pred', 
      name: 'College Predictor', 
      desc: 'Simple high-demand tool to find which colleges you can get.',
      icon: Target, 
      color: '#4ADE80',
      popular: true
    },
    { 
      id: 'roi', 
      name: 'ROI College Calculator', 
      desc: 'Compares real fees versus average placement returns to find value.',
      icon: TrendingUp, 
      color: '#60A5FA',
      popular: false
    },
    { 
      id: 'brain', 
      name: 'Brainstorming Test', 
      desc: 'A cognitive assessment to find the perfect stream and career match.',
      icon: Brain, 
      color: '#A855F7',
      popular: false
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-32 pb-20">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-gold" />
            <span className="text-xs font-bold uppercase tracking-widest text-gold">Student Toolkit</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-medium text-ink tracking-tight mb-6">
            Advanced tools for <span className="text-gold-dark italic">smarter</span> admissions.
          </h1>
          <p className="text-lg text-ink-3 leading-relaxed">
            Eliminate the guesswork in your college search. Use our data-driven calculators to predict your future and maximize your ROI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {tools.map((tool) => (
            <div 
              key={tool.id}
              className="group p-8 rounded-3xl bg-white border border-border shadow-sm hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
            >
              {tool.popular && (
                <div className="absolute top-6 right-6 px-3 py-1 bg-gold/10 text-gold-dark text-[10px] font-bold uppercase tracking-widest rounded-full">
                  Mostly Used
                </div>
              )}
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-lg"
                style={{ background: 'var(--midnight)', color: tool.color }}
              >
                <tool.icon size={28} />
              </div>
              <h3 className="text-xl font-medium text-ink mb-3 group-hover:text-gold-dark transition-colors">
                {tool.name}
              </h3>
              <p className="text-sm text-ink-3 mb-8 leading-relaxed">
                {tool.desc}
              </p>
              <button className="flex items-center gap-2 text-sm font-bold text-ink group-hover:gap-4 transition-all">
                Launch Tool <ArrowRight size={16} className="text-gold" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 rounded-[40px] bg-midnight text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[100px] -mr-32 -mt-32" />
          <div className="relative z-10 grid md:grid-cols-2 items-center gap-12">
            <div>
              <h2 className="text-3xl font-medium mb-4 tracking-tight">Access your personal reports</h2>
              <p className="text-white/60 mb-8 leading-relaxed">
                All results from these tools are saved to your private dashboard so you can compare them later or share them with your parents.
              </p>
              <button 
                onClick={() => window.location.href = '/dashboard'}
                className="px-8 py-3 bg-gold text-midnight font-bold rounded-pill hover:brightness-110 active:scale-95 transition-all"
              >
                Go to My Dashboard
              </button>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="w-full max-w-sm aspect-video bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center backdrop-blur-xl">
                 <div className="flex flex-col items-center gap-3">
                    <TrendingUp size={48} className="text-gold opacity-40" />
                    <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest">Premium Analytics</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
