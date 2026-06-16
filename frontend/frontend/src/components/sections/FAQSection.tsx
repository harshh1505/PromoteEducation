'use client'

import { useState } from 'react'
import { Plus, Minus, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "How does Promote Education help in college selection?",
    answer: "We provide a comprehensive discovery platform where you can compare colleges based on NIRF rankings, placement statistics, fees, and campus life. Our expert counsellors help you narrow down the best choices tailored to your profile, budget, and long-term career goals."
  },
  {
    question: "Can I get admission through management or state quotas?",
    answer: "Yes, we guide students on all available admission quotas, including state counselling quotas, All India quotas (AIQ), and institutional management seats. We help you understand the eligibility, cutoff trends, and documentation required for each quota."
  },
  {
    question: "What support do you provide for education loans?",
    answer: "We assist you from step one in securing education loans and state student credit cards. We help prepare the required documentation, provide fee structure certificates, and connect you directly with partner banks like SBI, HDFC, and ICICI for fast-tracked approvals."
  },
  {
    question: "Are the placement statistics and fees shown verified?",
    answer: "We compile placement data, highest and average packages, and fee details from latest college disclosures, NIRF reports, and student surveys. While we try to maintain absolute accuracy, our counsellors verify current matrices directly with the admission blocks during choices locking."
  },
  {
    question: "How do I start my counselling process with you?",
    answer: "Simply click on any 'Book Free Counselling' button or register through our comparison/loan calculators. Our certified counselor will call you within 24 hours to schedule a session, analyze your entrance scores (JEE/NEET/CAT), and sketch a custom admission roadmap."
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-12 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-slate-200/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200/50 border border-slate-300/40 text-[10px] font-black text-slate-650 uppercase tracking-widest mb-4">
            <HelpCircle size={12} />
            Support Center
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 font-medium text-sm md:text-base max-w-lg mx-auto">
            Got questions about admissions, cutoffs, or loan applications? Find quick answers below.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div 
              key={index}
              className={cn(
                "group bg-white rounded-3xl border transition-all duration-300 overflow-hidden",
                openIndex === index ? "border-indigo-500 shadow-xl shadow-indigo-550/5" : "border-slate-200 hover:border-slate-300"
              )}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left outline-none"
              >
                <span className={cn(
                  "text-sm md:text-base font-bold transition-colors pr-4",
                  openIndex === index ? "text-indigo-650" : "text-slate-900 group-hover:text-slate-700"
                )}>
                  {faq.question}
                </span>
                <div className={cn(
                  "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all shrink-0",
                  openIndex === index ? "bg-indigo-500 text-white rotate-180" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                )}>
                  {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>
              
              <div className={cn(
                "px-6 md:px-8 transition-all duration-350 ease-in-out overflow-hidden",
                openIndex === index ? "max-h-[500px] pb-8 opacity-100" : "max-h-0 opacity-0"
              )}>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-semibold">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
