'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { IndianRupee, Calculator, Clock, TrendingUp, Info, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function LoanCalculatorPageContent() {
  const [amount, setAmount] = useState(1000000)
  const [interest, setInterest] = useState(9.5)
  const [tenure, setTenure] = useState(10) // years

  const [emi, setEmi] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)

  useEffect(() => {
    const P = amount
    const r = interest / 12 / 100
    const n = tenure * 12

    if (r === 0) {
      setEmi(P / n)
      setTotalPayment(P)
      setTotalInterest(0)
      return
    }

    const emiCalc = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const totalPay = emiCalc * n
    
    setEmi(Math.round(emiCalc))
    setTotalPayment(Math.round(totalPay))
    setTotalInterest(Math.round(totalPay - P))
  }, [amount, interest, tenure])

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val)
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-32 pb-20">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Calculator size={20} className="text-gold" />
            <span className="text-xs font-bold uppercase tracking-widest text-gold-dark">Financial Planning Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-medium text-ink tracking-tight mb-6">
            Education <span className="text-gold-dark italic">Loan Calculator</span>
          </h1>
          <p className="text-lg text-ink-3 leading-relaxed">
            Estimate your monthly repayments and plan your education budget with precision. 
            Know exactly how much your degree will cost over time.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr,400px] gap-8">
          
          {/* Controls */}
          <div className="space-y-8 p-8 md:p-10 bg-white rounded-[32px] border border-border shadow-sm">
            
            {/* Amount */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-ink uppercase tracking-wider flex items-center gap-2">
                  <IndianRupee size={16} className="text-gold" /> Loan Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-4 text-sm font-medium">₹</span>
                  <input 
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-32 pl-7 pr-3 py-1.5 bg-surface-2 border border-border rounded-lg text-sm font-bold text-ink focus:border-gold outline-none text-right"
                  />
                </div>
              </div>
              <input 
                type="range"
                min="100000"
                max="10000000"
                step="50000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-surface-2 rounded-lg appearance-none cursor-pointer accent-midnight transition-all"
              />
              <div className="flex justify-between text-[10px] font-bold text-ink-4 tracking-tighter">
                <span>₹1 LAKH</span>
                <span>₹1 CRORE</span>
              </div>
            </div>

            {/* Interest */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-ink uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp size={16} className="text-gold" /> Interest Rate (P.A)
                </label>
                <div className="relative">
                  <input 
                    type="number"
                    step="0.1"
                    value={interest}
                    onChange={(e) => setInterest(Number(e.target.value))}
                    className="w-24 px-3 py-1.5 bg-surface-2 border border-border rounded-lg text-sm font-bold text-ink focus:border-gold outline-none text-right"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-4 text-xs font-medium">%</span>
                </div>
              </div>
              <input 
                type="range"
                min="1"
                max="20"
                step="0.1"
                value={interest}
                onChange={(e) => setInterest(Number(e.target.value))}
                className="w-full h-2 bg-surface-2 rounded-lg appearance-none cursor-pointer accent-midnight transition-all"
              />
              <div className="flex justify-between text-[10px] font-bold text-ink-4 tracking-tighter">
                <span>1%</span>
                <span>20%</span>
              </div>
            </div>

            {/* Tenure */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-ink uppercase tracking-wider flex items-center gap-2">
                  <Clock size={16} className="text-gold" /> Loan Tenure (Years)
                </label>
                <div className="relative">
                  <input 
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-24 px-3 py-1.5 bg-surface-2 border border-border rounded-lg text-sm font-bold text-ink focus:border-gold outline-none text-right"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-4 text-[10px] font-medium font-sans">YRS</span>
                </div>
              </div>
              <input 
                type="range"
                min="1"
                max="20"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-2 bg-surface-2 rounded-lg appearance-none cursor-pointer accent-midnight transition-all"
              />
              <div className="flex justify-between text-[10px] font-bold text-ink-4 tracking-tighter">
                <span>1 YEAR</span>
                <span>20 YEARS</span>
              </div>
            </div>

            <div className="pt-6 border-t border-border mt-8 flex items-start gap-3">
              <Info size={16} className="text-ink-4 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-ink-3 leading-relaxed">
                Standard education loans in India usually include a moratorium period (course duration + 1 year) before EMIs start. Interest may still accrue during this time.
              </p>
            </div>
          </div>

          {/* Results Sidebar */}
          <div className="space-y-6">
            <div className="p-8 rounded-[32px] bg-midnight text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-[60px] -mr-16 -mt-16" />
               
               <p className="text-[10px] uppercase font-bold text-white/40 tracking-widest mb-2">Monthly EMI</p>
               <h2 className="text-4xl font-medium mb-8 leading-none" style={{ color: 'var(--gold)' }}>
                 {formatCurrency(emi)}
               </h2>

               <div className="space-y-4">
                 <div className="flex items-center justify-between pb-3 border-b border-white/10">
                   <span className="text-xs text-white/50">Principal Amount</span>
                   <span className="text-sm font-medium">{formatCurrency(amount)}</span>
                 </div>
                 <div className="flex items-center justify-between pb-3 border-b border-white/10">
                   <span className="text-xs text-white/50">Total Interest</span>
                   <span className="text-sm font-medium">{formatCurrency(totalInterest)}</span>
                 </div>
                 <div className="flex items-center justify-between pt-2">
                   <span className="text-xs font-bold text-gold/80 uppercase">Total Payable</span>
                   <span className="text-lg font-bold">{formatCurrency(totalPayment)}</span>
                 </div>
               </div>
            </div>

            <div className="p-6 rounded-[24px] bg-white border border-border shadow-sm">
               <h4 className="text-xs font-bold text-ink uppercase tracking-widest mb-6">Payment Breakdown</h4>
               <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1 h-3 rounded-full bg-surface-2 overflow-hidden flex">
                    <div 
                      className="h-full bg-midnight" 
                      style={{ width: `${(amount / totalPayment) * 100}%` }}
                    />
                    <div 
                      className="h-full bg-gold" 
                      style={{ width: `${(totalInterest / totalPayment) * 100}%` }}
                    />
                  </div>
               </div>
               <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-midnight" />
                    <span className="text-ink-3">Principal</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-gold" />
                    <span className="text-gold-dark">Interest</span>
                  </div>
               </div>
            </div>

            <button
               onClick={() => window.location.href = '/dashboard'}
               className="w-full group py-4 px-6 rounded-2xl bg-white border border-border hover:border-gold hover:shadow-lg transition-all flex items-center justify-between"
            >
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-surface-2 rounded-xl group-hover:bg-gold group-hover:text-midnight transition-colors">
                    <TrendingUp size={18} />
                  </div>
                  <div className="text-left">
                     <p className="text-[10px] font-bold text-ink-4 uppercase tracking-widest mb-0.5">Planning Tools</p>
                     <p className="text-xs font-medium text-ink">Save and Compare Loans</p>
                  </div>
               </div>
               <ArrowRight size={16} className="text-ink-4 group-hover:text-gold transition-colors" />
            </button>
          </div>

        </div>

        {/* Informational Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {[
            { title: 'Moratorium Period', desc: 'Typically the course duration plus 6-12 months. Most banks don\'t require EMI during this time.' },
            { title: 'Tax Benefits', desc: 'Interest paid on education loans is deductible under Section 80E of the Income Tax Act.' },
            { title: 'No Collateral', desc: 'Loans up to ₹7.5 Lakhs usually do not require any collateral or third-party guarantee.' }
          ].map((card, i) => (
            <div key={i} className="p-6 rounded-2xl bg-surface-2 border border-border/50">
               <h4 className="text-sm font-bold text-ink mb-2">{card.title}</h4>
               <p className="text-xs text-ink-3 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
