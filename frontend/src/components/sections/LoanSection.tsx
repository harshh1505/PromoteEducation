'use client'

import React, { useState, useEffect } from 'react'
import { IndianRupee, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'

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

const benefits = [
  'Zero processing fee on partner banks',
  'Assistance with Student Credit Card scheme',
  'Quick approvals within 48 hours',
  'Guidance on scholarship applications',
]

export default function LoanSection() {
  const [fees, setFees] = useState(1200000)
  const [amount, setAmount] = useState(1000000)
  const [rate, setRate] = useState(8.5)
  const [tenure, setTenure] = useState(120)

  const [emi, setEmi] = useState(0)
  const [totalRepay, setTotalRepay] = useState(0)
  const [interestPayable, setInterestPayable] = useState(0)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [incomeRange, setIncomeRange] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (amount > fees) setAmount(fees)
  }, [fees])

  useEffect(() => {
    const r = rate / 12 / 100
    const n = tenure
    const emiCalc = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const monthlyEmi = isNaN(emiCalc) || !isFinite(emiCalc) ? 0 : Math.round(emiCalc)
    setEmi(monthlyEmi)
    setTotalRepay(monthlyEmi * n)
    setInterestPayable(Math.max(0, monthlyEmi * n - amount))
  }, [amount, rate, tenure])

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val)

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone || !city || !incomeRange) { alert('Please fill in all fields.'); return }
    if (phone.length < 10) { alert('Please enter a valid 10-digit phone number.'); return }
    setIsSubmitting(true)
    try {
      const { error } = await supabase.from('leads').insert([{
        full_name: name,
        email: 'loan-lead@promoteeducation.org',
        phone, city,
        stream: 'Finance / Loan Enquiry',
        college_name: 'Education Loan Assistance',
        source: `Loan Calculator Lead Form | Income: ${incomeRange} | Fees: ${fees} | Loan: ${amount}`,
        status: 'new'
      }])
      if (error) throw error
      setIsSuccess(true)
      setName(''); setPhone(''); setCity(''); setIncomeRange('')
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (err: any) {
      console.error(err)
      alert('Could not submit enquiry. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="loan-calculator-section" className="py-12 bg-white relative overflow-hidden">
      {/* Subtle decorative blobs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-100/60 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
            Plan Your Education Loan &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">EMI Instantly</span>
          </h2>
          <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed">
            Estimate monthly payments, repayment totals, and get free expert assistance to secure low-interest student loans.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left: Calculator */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-[32px] p-6 md:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="text-sm font-black text-slate-800 uppercase tracking-wider">EMI Estimator</span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-100">Starting 8.5% p.a.</span>
            </div>

            <div className="space-y-6">
              {/* College Fees */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">
                  <label>College Fees (Total Program Cost)</label>
                  <span className="text-slate-800 font-extrabold">{formatCurrency(fees)}</span>
                </div>
                <input type="range" min="100000" max="10000000" step="50000" value={fees}
                  onChange={(e) => setFees(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-sky-500" />
              </div>

              {/* Loan Amount */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">
                  <label>Loan Amount (Required)</label>
                  <span className="text-slate-800 font-extrabold">{formatCurrency(amount)}</span>
                </div>
                <input type="range" min="50000" max={fees} step="50000" value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-sky-500" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Interest Rate */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">
                    <label>Interest Rate (p.a.)</label>
                    <span className="text-slate-800 font-extrabold">{rate}%</span>
                  </div>
                  <input type="range" min="7" max="15" step="0.1" value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-sky-500" />
                </div>

                {/* Tenure */}
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-3 uppercase tracking-wider">Tenure (Years)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[3, 5, 7, 10].map((yr) => (
                      <button key={yr} onClick={() => setTenure(yr * 12)}
                        className={cn("py-2.5 text-xs font-bold rounded-xl border transition-all",
                          tenure === yr * 12
                            ? "bg-sky-600 text-white border-sky-600 shadow-md"
                            : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                        )}>
                        {yr} yr
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Output Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4 text-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">Monthly EMI</span>
                <div className="text-xl font-black text-slate-800">
                  {formatCurrency(emi)}<span className="text-xs font-medium text-slate-400">/mo</span>
                </div>
              </div>
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 text-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">Total Repayment</span>
                <div className="text-xl font-black text-slate-800">{formatCurrency(totalRepay)}</div>
              </div>
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">Interest Payable</span>
                <div className="text-xl font-black text-emerald-700">{formatCurrency(interestPayable)}</div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Finance Benefits</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-600">
                {benefits.map(b => (
                  <div key={b} className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-sky-500 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Lead Capture */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-[32px] p-6 md:p-8 shadow-xl relative">
            <div className="mb-6">
              <h4 className="text-lg md:text-xl font-extrabold text-slate-900 mb-2">Want help getting low-interest loans?</h4>
              <p className="text-slate-500 text-xs font-medium leading-relaxed">
                Connect with our banking partners and secure loan options with fast-tracked approvals.
              </p>
            </div>

            {isSuccess ? (
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center animate-in zoom-in-95 duration-300">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={24} />
                </div>
                <h5 className="text-slate-900 font-extrabold text-sm mb-1">Enquiry Submitted!</h5>
                <p className="text-slate-500 text-xs font-semibold">Our Education Finance Advisor will contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitLead} className="space-y-3.5">
                <input required type="text" placeholder="Your Name*" value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 rounded-xl px-4 py-3.5 text-base md:text-sm font-semibold outline-none text-slate-800 placeholder:text-slate-300 transition-all" />
                <input required type="tel" placeholder="Phone Number*" value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 rounded-xl px-4 py-3.5 text-base md:text-sm font-semibold outline-none text-slate-800 placeholder:text-slate-300 transition-all" />
                <input required type="text" placeholder="Your City*" value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-white border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 rounded-xl px-4 py-3.5 text-base md:text-sm font-semibold outline-none text-slate-800 placeholder:text-slate-300 transition-all" />
                <select required value={incomeRange}
                  onChange={(e) => setIncomeRange(e.target.value)}
                  className="w-full bg-white border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 rounded-xl px-4 py-3.5 text-base md:text-sm font-semibold outline-none text-slate-505 transition-all cursor-pointer appearance-none">
                  <option value="">Family Income Range*</option>
                  <option value="< 3 LPA">Under ₹3 Lakhs</option>
                  <option value="3 - 6 LPA">₹3 Lakhs – ₹6 Lakhs</option>
                  <option value="6 - 10 LPA">₹6 Lakhs – ₹10 Lakhs</option>
                  <option value="> 10 LPA">Above ₹10 Lakhs</option>
                </select>
                <button type="submit" disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:shadow-lg hover:shadow-sky-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                  {isSubmitting ? 'Submitting...' : 'Get Loan Assistance'}
                  <ArrowRight size={14} />
                </button>
              </form>
            )}

            <div className="flex items-center justify-center gap-1.5 text-[9px] text-slate-400 mt-4 pt-3 border-t border-slate-200">
              <ShieldCheck size={11} />
              <span>We share your data only with verified partner banks.</span>
            </div>
          </div>

        </div>

        {/* Bank Partner Logos */}
        <div className="mt-14 border-t border-slate-100 pt-10">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center mb-8">Partnered with leading education finance banks</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {banks.map((bank) => (
              <div key={bank.name}
                className="bg-white border border-slate-100 rounded-5xl p-3.5 h-24 flex items-center justify-center shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 hover:border-slate-200">
                <img src={bank.logo} alt={bank.name} className="max-h-20 max-w-full object-contain" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
