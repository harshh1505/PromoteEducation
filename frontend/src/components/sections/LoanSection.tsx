'use client'

import React, { useState, useEffect } from 'react'
import { IndianRupee, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const banks = [
  { name: 'SBI', logo: 'https://companieslogo.com/img/orig/SBIN.NS-02f82998.png?t=1633512396' },
  { name: 'HDFC Bank', logo: 'https://companieslogo.com/img/orig/HDB-639a0470.png?t=1633439401' },
  { name: 'ICICI Bank', logo: 'https://companieslogo.com/img/orig/IBN-57db8905.png?t=1648043534' },
  { name: 'Axis Bank', logo: 'https://companieslogo.com/img/orig/AXISBANK.NS-95e2639d.png?t=1633501726' },
  { name: 'Kotak Bank', logo: 'https://companieslogo.com/img/orig/KOTAKBANK.NS-4739199d.png?t=1633509172' },
  { name: 'PNB', logo: 'https://companieslogo.com/img/orig/PNB.NS-6a84eb6c.png?t=1633514781' },
  { name: 'Canara Bank', logo: 'https://companieslogo.com/img/orig/CANBK.NS-47f3ae21.png?t=1633503254' },
  { name: 'Bank of India', logo: 'https://companieslogo.com/img/orig/BANKINDIA.NS-59d4948a.png?t=1633502598' },
]

export default function LoanSection() {
  const [amount, setAmount] = useState(1000000)
  const [rate, setRate] = useState(8.5)
  const [tenure, setTenure] = useState(120) // in months
  const [emi, setEmi] = useState(0)

  useEffect(() => {
    const r = rate / 12 / 100
    const n = tenure
    const emiCalc = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    setEmi(Math.round(emiCalc))
  }, [amount, rate, tenure])

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val)
  }

  return (
    <section className="py-16 bg-[#0f172a]" style={{ background: 'var(--midnight)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Branding & Bank Logos */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-bold text-white mb-4 tracking-tight leading-tight">
              Simple Education <span className="text-white/60">Financing.</span>
            </h2>
            <p className="text-white/50 text-base mb-10 max-w-md font-normal leading-relaxed">
              Find the best interest rates from India's leading banks. Transparent processing with zero hidden charges.
            </p>

            <div className="grid grid-cols-4 gap-3 max-w-lg">
              {banks.map((bank) => (
                <div 
                  key={bank.name} 
                  className="bg-white/[0.03] border border-white/5 rounded-xl p-3 h-14 flex items-center justify-center grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                >
                  <img src={bank.logo} alt={bank.name} className="max-h-5 max-w-full object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Compact Calculator */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <span className="text-sm font-bold text-ink uppercase tracking-wider">EMI Estimator</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase">Lowest: 8.5%</span>
              </div>

              {/* Sliders Area */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold text-ink-3 mb-2">
                    <label>LOAN AMOUNT</label>
                    <span className="text-ink">{formatCurrency(amount)}</span>
                  </div>
                  <input 
                    type="range" min="100000" max="10000000" step="50000" value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-midnight"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-ink-3 mb-2">
                    <label>INTEREST RATE (P.A)</label>
                    <span className="text-ink">{rate}%</span>
                  </div>
                  <input 
                    type="range" min="7" max="15" step="0.1" value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-midnight"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-ink-3 block mb-3 uppercase">TENURE (YEARS)</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[3, 5, 7, 10].map((yr) => (
                      <button
                        key={yr}
                        onClick={() => setTenure(yr * 12)}
                        className={cn(
                          "py-2 text-xs font-bold rounded-lg border transition-all",
                          tenure === yr * 12 
                            ? "bg-midnight text-white border-midnight" 
                            : "bg-white text-ink-3 border-slate-200 hover:border-midnight/30"
                        )}
                      >
                        {yr}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Result Area */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-ink-4 uppercase tracking-widest mb-1">Monthly Payable</p>
                    <div className="text-2xl font-bold text-midnight tracking-tight">
                      {formatCurrency(emi)}<span className="text-sm font-normal text-ink-4">/mo</span>
                    </div>
                  </div>
                  <div className="text-emerald-600">
                     <CheckCircle2 size={24} strokeWidth={3} />
                  </div>
                </div>
              </div>

              <button className="w-full py-3 bg-midnight text-white text-xs font-bold rounded-xl hover:bg-midnight/90 transition-all shadow-md active:scale-[0.98]">
                APPLY FOR LOAN
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
