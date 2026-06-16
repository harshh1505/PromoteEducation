'use client'

import { useState } from 'react'
import { Plus, Minus, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { cn } from '@/lib/utils'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "How does Promote Education help in college selection?",
    answer: "Promote Education provides a comprehensive discovery platform where you can compare colleges based on NIRF rankings, placement statistics, fee structures, and genuine student reviews. Our AI-driven search and filtering tools help you narrow down the best institutions tailored to your career goals and budget."
  },
  {
    question: "What types of colleges are listed on this page?",
    answer: "We list over multiple colleges across India, covering major professional programmes like MBBS, B.Tech (Engineering) and MBA. Every college profile provides key info — course offerings, fees, cut-offs, admission process and more."
  },
  {
    question: "How do I find the best college for my course and city?",
    answer: "Use our filtering tool to sort by course (e.g., MBBS, B.Tech, MBA), location (e.g., Kolkata, Bangalore), fees & rankings. Then compare two or more colleges side-by-side and book a free counselling session with our expert team for personalised guidance."
  },
  {
    question: "What is the typical fee range for these colleges?",
    answer: "Fees vary widely depending on course type, college category (government/private) and location. For example, MBBS in India’s private colleges may cost significantly more than engineering courses in state universities. We provide estimated fees in each college profile and our counsellors help you understand payment/loan options."
  },
  {
    question: "Do all listed colleges accept national entrance exams like NEET or JEE?",
    answer: "Admission eligibility depends on course and institution. For medical programmes like MBBS/BDS, the preparation of NEET‑UG is mandatory. For engineering courses (B.Tech) many colleges accept JEE or state-board exams. Our team will guide you on the required exam and quota for each college."
  },
  {
    question: "Can I filter colleges by quota (state quota, all-India quota, management quota)?",
    answer: "Yes. Each college profile indicates the quotas available (government quota, management/management-quota seats, NRI quota where applicable). During counselling, we help clarify how these quotas affect your chances and fee structure."
  },
  {
    question: "Are the college details up to date?",
    answer: "We continuously update our college database each admission cycle. However, we recommend verifying critical data (cut-offs, fees, documentation) directly with the college or admission office, as changes may happen due to regulatory updates and seat-matrix revisions."
  },
  {
    question: "What happens after I shortlist a college?",
    answer: "Once you shortlist a college, our service supports you in: eligibility check, document preparation, application submission, counselling registration, seat allotment tracking, and finally enrolment. You’ll receive regular updates and one-on-one support until you join the college."
  },
  {
    question: "Can I change my shortlisted college later?",
    answer: "Yes — many admission processes allow multiple rounds of counselling or revision of choices. Our team advises on when to finalise or revise your preferences based on seat availability, cut-offs and your priorities."
  },
  {
    question: "Do you assist with scholarships and financial aid?",
    answer: "Absolutely. We advise on scholarship eligibility, application deadlines and documentation, including government schemes and college-specific aid. For high-fee programmes (e.g., private MBBS, international collaborations) we also guide you on education loans and instalment options."
  },
  {
    question: "Is location (city/state) important when choosing a college?",
    answer: "Yes — location influences cost of living, language/medium of instruction, commute, campus culture and job-placement opportunities. Because we have expertise in regions like Kolkata and Bangalore, we can help you choose a college that fits your academic goals and location preference."
  },
  {
    question: "How do I compare two colleges effectively?",
    answer: "Use our comparison checklist: Course availability & specialisations, Fee structure & deposit model, Placement records & alumni network, Faculty credentials & infrastructure, Location & accessibility, and Accreditation & approvals (UGC, AICTE, NMC etc). We provide this data and our counsellors help you interpret it to make an informed decision."
  },
  {
    question: "What if I don’t get a seat in my preferred college?",
    answer: "Don’t worry — we’ll support you with Plan-B options. This may include applying for other colleges having seats still open, considering next-year drop with better preparation, or switching to related courses (e.g., allied health, DSP, engineering) that keep your career trajectory moving forward."
  },
  {
    question: "Do you only cover Indian colleges or also abroad?",
    answer: "Our primary focus is on Indian colleges for MBBS, B.Tech and MBA across various states. However, we can also guide on select international college partnerships and collaboration programmes, especially if you’re interested in studying abroad."
  },
  {
    question: "How soon should I start shortlisting colleges?",
    answer: "It’s best to begin early — ideally after your 12th board results or entrance exam plans. Starting early gives you time to research courses, understand fees, attend counselling sessions and complete documentation. Late applications often limit your choices."
  },
  {
    question: "How do I book a counselling session with Promote Education?",
    answer: "Simply click on the “Book Free Consultation” button on this page or fill the enquiry form. One of our certified counsellors will contact you within 24 hours and guide you through the next steps."
  },
  {
    question: "What are the eligibility criteria for MBBS admission?",
    answer: "You must have completed 10+2 with Physics, Chemistry, Biology (PCB) and English as core subjects, with at least 50% marks (40% for reserved categories). You must also qualify the NEET-UG exam."
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-slate-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-[2px] bg-sky-500" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-sky-400">Help Center</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-medium text-white tracking-tight mb-6">
            Frequently Asked <span className="text-sky-400">Questions</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl font-medium leading-relaxed">
            Find answers to common questions about admissions, college comparisons, and how to use our platform effectively.
          </p>
        </div>
        
        {/* Abstract Background Elements */}
        <HelpCircle size={300} className="absolute -bottom-20 -right-20 text-white/5 rotate-12" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-sky-500/10 to-transparent" />
      </section>

      {/* FAQ Content */}
      <section className="py-24 max-w-4xl mx-auto px-6">
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div 
              key={index}
              className={cn(
                "group bg-white rounded-3xl border transition-all duration-300 overflow-hidden",
                openIndex === index ? "border-sky-500 shadow-xl shadow-sky-500/5" : "border-slate-200 hover:border-slate-300"
              )}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left"
              >
                <span className={cn(
                  "text-lg font-bold transition-colors",
                  openIndex === index ? "text-sky-600" : "text-slate-900 group-hover:text-slate-700"
                )}>
                  {faq.question}
                </span>
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                  openIndex === index ? "bg-sky-500 text-white rotate-180" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                )}>
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>
              
              <div className={cn(
                "px-6 md:px-8 transition-all duration-500 ease-in-out overflow-hidden",
                openIndex === index ? "max-h-[500px] pb-8 opacity-100" : "max-h-0 opacity-0"
              )}>
                <p className="text-slate-500 leading-relaxed font-medium">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions? */}
        <div className="mt-20 p-8 md:p-12 rounded-[40px] bg-slate-900 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="relative z-10 text-center md:text-left">
              <h3 className="text-3xl font-bold mb-2">Still have questions?</h3>
              <p className="text-white/60 font-medium">Can't find the answer you're looking for? Please chat to our friendly team.</p>
           </div>
           <button className="relative z-10 px-8 py-4 bg-sky-500 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-sky-400 transition-all flex items-center gap-3 active:scale-95 shadow-xl shadow-sky-500/20">
              Get in Touch <MessageCircle size={18} />
           </button>
           
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(56,182,255,0.15),transparent)]" />
        </div>
      </section>

      <Footer />
    </main>
  )
}
