'use client'

import Link from 'next/link'
import { UserCheck, Video, Building2, IndianRupee, ArrowRight, ShieldCheck, Target, GraduationCap, Clock, Zap, Heart, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const features = [
  {
    title: 'Personalized Career Roadmap',
    desc: 'We guide every student based on goals, budget, and academic background for better career decisions.',
    icon: Target,
    color: 'from-sky-400 to-blue-500',
    href: '/mentorship'
  },
  {
    title: 'Direct Admission Assistance',
    desc: 'Secure your seat in top colleges through management quota with a simple and stress-free admission process.',
    icon: ShieldCheck,
    color: 'from-emerald-400 to-teal-500',
    href: '/admission-support'
  },
  {
    title: 'India & Study Abroad Support',
    desc: 'Get expert help for admissions in India and abroad with the right college and course selection guidance.',
    icon: GraduationCap,
    color: 'from-purple-400 to-indigo-500',
    href: '/counseling'
  },
  {
    title: 'Complete End-to-End Process',
    desc: 'From college selection to documentation and final admission, we handle every step with complete support.',
    icon: Zap,
    color: 'from-amber-400 to-orange-500',
    href: '/selection'
  },
  {
    title: 'Experienced Counsellors',
    desc: 'Our expert team provides honest advice and proven strategies to help you choose the right career path.',
    icon: UserCheck,
    color: 'from-rose-400 to-pink-500',
    href: '/counseling'
  },
  {
    title: 'Fast & Hassle-Free Admission',
    desc: 'Avoid delays and confusion with our smooth process designed for quick, simple, and stress-free admissions.',
    icon: Clock,
    color: 'from-cyan-400 to-sky-500',
    href: '/consultation'
  },
  {
    title: 'Transparent Guidance',
    desc: 'We ensure clear communication with no hidden charges, giving you a reliable and trustworthy experience.',
    icon: Heart,
    color: 'from-violet-400 to-purple-500',
    href: '/about'
  },
  {
    title: 'Dedicated Student Support',
    desc: 'Our team stays connected at every step to ensure your admission process is completed without any issues.',
    icon: Video,
    color: 'from-blue-400 to-indigo-500',
    href: '/consultation'
  }
]

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-50 rounded-full blur-[150px] opacity-50" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-[150px] opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-100 mb-6">
            <CheckCircle2 size={14} className="text-sky-500" />
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Why Students Trust Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            From India to abroad, we simplify your<br className="hidden md:block" /> entire admission journey
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Expert guidance and guaranteed support at every step of your educational journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <Link 
              key={i} 
              href={feature.href}
              className="group p-6 rounded-2xl bg-white border border-slate-100 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-500 flex flex-col h-full"
            >
              <div className={cn(
                "w-12 h-12 rounded-xl mb-5 flex items-center justify-center text-white bg-gradient-to-br transition-transform group-hover:scale-110 group-hover:shadow-lg duration-500",
                feature.color
              )}>
                <feature.icon size={22} />
              </div>
              
              <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors leading-snug">
                {feature.title}
              </h3>
              
              <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">
                {feature.desc}
              </p>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 group-hover:text-sky-500 transition-colors mt-auto">
                Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
