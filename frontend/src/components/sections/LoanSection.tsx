'use client'

import React, { useState, useEffect } from 'react'
import { IndianRupee, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const banks = [
  { name: 'SBI', logo: 'https://static.vecteezy.com/system/resources/previews/020/336/141/non_2x/sbi-logo-sbi-icon-free-free-vector.jpg' },
  { name: 'HDFC Bank', logo: 'https://static.vecteezy.com/system/resources/previews/020/190/428/non_2x/hdfc-logo-hdfc-icon-free-free-vector.jpg' },
  { name: 'ICICI Bank', logo: 'https://static.vecteezy.com/system/resources/previews/020/190/435/non_2x/icici-logo-icici-icon-free-free-vector.jpg' },
  { name: 'Axis Bank', logo: 'https://brandlogos.net/wp-content/uploads/2014/12/axis_bank-logo-brandlogos.net_.png' },
  { name: 'Kotak Bank', logo: 'https://wp.logos-download.com/wp-content/uploads/2016/06/Kotak_Mahindra_Bank_logo.png?dl' },
  { name: 'PNB', logo: 'https://www.logoshape.com/wp-content/uploads/2024/02/punjab_national_bank-logo_logoshape.com_.png' },
  { name: 'Canara Bank', logo: 'https://crystalpng.com/wp-content/uploads/2025/11/Canara-Bank-Logo.png' },
  { name: 'Bank of India', logo: 'https://1000logos.net/wp-content/uploads/2021/06/Bank-of-India-logo.png' },
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

            <div className="grid grid-cols-4 gap-4 max-w-lg">
              {banks.map((bank) => (
                <div 
                  key={bank.name} 
                  className="bg-white rounded-2xl p-4 h-20 flex items-center justify-center transition-all duration-300 group shadow-sm hover:shadow-xl hover:shadow-white/10 hover:-translate-y-1 active:scale-95"
                >
                  <img 
                    src={bank.logo} 
                    alt={bank.name} 
                    className="max-h-15 max-w-full object-contain transition-all duration-500 scale-95 group-hover:scale-100" 
                  />
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
