'use client'

import { UserCheck, Video, Building2, IndianRupee, ArrowRight, ShieldCheck, Target, GraduationCap } from 'lucide-react'
import { cn } from '@/lib/utils'

const features = [
  {
    title: 'Mentorship & Career Readiness',
    desc: 'We go beyond academics to prepare students for real-world challenges. Our mentorship programs bridge the gap between classroom learning and professional excellence.',
    icon: Target,
    color: 'text-blue-500',
    bg: 'bg-blue-50'
  },
  {
    title: 'Scholarship & Financial Aid',
    desc: 'Cost should never be a barrier to quality education. We provide end-to-end assistance in securing scholarships and affordable educational financing for all.',
    icon: IndianRupee,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    title: 'Career Counseling & Guidance',
    desc: 'Navigating through countless career paths can be overwhelming. Our experts provide data-driven profile assessments to identify your ideal trajectory.',
    icon: UserCheck,
    color: 'text-purple-500',
    bg: 'bg-purple-50'
  },
  {
    title: 'Admission Support',
    desc: 'Securing a seat in your dream college requires strategic planning. We simplify the complex admission process from documentation to final enrollment.',
    icon: ShieldCheck,
    color: 'text-amber-500',
    bg: 'bg-amber-50'
  },
  {
    title: 'Course & University Selection',
    desc: 'Choosing the right course shapes your future. We help you select institutions that offer the best mix of infrastructure, faculty, and placement records.',
    icon: GraduationCap,
    color: 'text-sky-500',
    bg: 'bg-sky-50'
  },
  {
    title: 'Free Digital Consultation',
    desc: 'Connect with our expert counselors from the comfort of your home. We offer free video consultations to resolve all your academic and career queries.',
    icon: Video,
    color: 'text-rose-500',
    bg: 'bg-rose-50'
  }
]

export default function WhyChooseUsSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-slate-50/50 -skew-y-3 origin-top-left" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-[2px] bg-sky-500" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-sky-500">Why Partner With Us</span>
            <div className="w-8 h-[2px] bg-sky-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-medium text-slate-900 tracking-tight mb-6">
            Everything You Need to <span className="text-sky-500 italic">Succeed</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            We bridge the gap between your aspirations and the right academic institutions with data-driven guidance and unwavering support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="group p-8 rounded-[32px] bg-white border border-slate-100 hover:border-sky-500/30 hover:shadow-2xl hover:shadow-sky-500/5 transition-all duration-500 flex flex-col h-full border-b-4 border-b-slate-100 hover:border-b-sky-500"
            >
              <div className={cn(
                "w-14 h-14 rounded-2xl mb-8 flex items-center justify-center transition-transform group-hover:scale-110 duration-500",
                feature.bg,
                feature.color
              )}>
                <feature.icon size={28} />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-sky-600 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-slate-500 text-sm leading-relaxed font-medium mb-8">
                {feature.desc}
              </p>

              <div className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-sky-500 transition-colors">
                Learn More <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Success Metrics Overlay (Optional/Bonus) */}
        <div className="mt-20 flex flex-wrap justify-center gap-12 border-t border-slate-100 pt-16">
            <div className="text-center">
                <p className="text-3xl font-black text-slate-900 mb-1">98%</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Student Satisfaction</p>
            </div>
            <div className="w-px h-12 bg-slate-100 hidden md:block" />
            <div className="text-center">
                <p className="text-3xl font-black text-slate-900 mb-1">10k+</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Successful Admissions</p>
            </div>
            <div className="w-px h-12 bg-slate-100 hidden md:block" />
            <div className="text-center">
                <p className="text-3xl font-black text-slate-900 mb-1">24/7</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Expert Support</p>
            </div>
        </div>
      </div>
    </section>
  )
}
