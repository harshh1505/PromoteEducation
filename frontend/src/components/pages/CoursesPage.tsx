'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { GraduationCap, ArrowRight, Code, HeartPulse, Scale, Palette, Briefcase, Microscope } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function CoursesPageContent() {
  const [activeCategory, setActiveCategory] = useState('All')

  const courseCategories = [
    { title: 'Engineering', count: '450+', icon: Code, color: 'text-blue-500' },
    { title: 'Medical', count: '120+', icon: HeartPulse, color: 'text-red-500' },
    { title: 'Management', count: '300+', icon: Briefcase, color: 'text-gold' },
    { title: 'Law', count: '80+', icon: Scale, color: 'text-slate-600' },
    { title: 'Design', count: '150+', icon: Palette, color: 'text-pink-500' },
    { title: 'Science', count: '400+', icon: Microscope, color: 'text-green-500' },
  ]

  const featuredCourses = [
    { name: 'Computer Science Engineering', duration: '4 Years', level: 'UG', colleges: '3,200+' },
    { name: 'Master of Business Administration', duration: '2 Years', level: 'PG', colleges: '1,500+' },
    { name: 'Bachelor of Medicine (MBBS)', duration: '5.5 Years', level: 'UG', colleges: '600+' },
    { name: 'Product Design', duration: '4 Years', level: 'UG', colleges: '200+' },
    { name: 'Data Science & AI', duration: '2 Years', level: 'PG', colleges: '450+' },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-32 pb-20">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap size={20} className="text-gold" />
            <span className="text-xs font-bold uppercase tracking-widest text-gold-dark">Curated Learning Paths</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-medium text-ink tracking-tight mb-6">
            Find the <span className="text-gold-dark italic">perfect course</span> for your career.
          </h1>
          <p className="text-lg text-ink-3 leading-relaxed">
            Browse through thousands of undergraduate and postgraduate programs. Filter by stream, duration, and future job prospects.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
          {courseCategories.map((cat) => (
            <button 
              key={cat.title}
              className="p-6 rounded-2xl bg-white border border-border shadow-sm hover:border-gold hover:shadow-lg transition-all group"
            >
              <div className={cn("inline-flex p-3 rounded-xl bg-surface-2 mb-4 group-hover:scale-110 transition-transform", cat.color)}>
                <cat.icon size={24} />
              </div>
              <h3 className="text-sm font-bold text-ink mb-1">{cat.title}</h3>
              <p className="text-[10px] text-ink-4 uppercase tracking-widest">{cat.count} Courses</p>
            </button>
          ))}
        </div>

        {/* Featured Courses Table */}
        <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
          <div className="p-8 border-b border-border">
            <h2 className="text-xl font-medium text-ink">Trending Courses 2024</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-2">
                  <th className="text-left py-4 px-8 text-[10px] uppercase font-bold text-ink-4 tracking-widest">Course Name</th>
                  <th className="text-left py-4 px-8 text-[10px] uppercase font-bold text-ink-4 tracking-widest">Typical Duration</th>
                  <th className="text-left py-4 px-8 text-[10px] uppercase font-bold text-ink-4 tracking-widest">Level</th>
                  <th className="text-left py-4 px-8 text-[10px] uppercase font-bold text-ink-4 tracking-widest">Total Colleges</th>
                  <th className="text-left py-4 px-8 text-[10px] uppercase font-bold text-ink-4 tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {featuredCourses.map((course) => (
                  <tr key={course.name} className="hover:bg-surface-2 transition-colors group">
                    <td className="py-5 px-8">
                       <span className="text-sm font-medium text-ink group-hover:text-gold-dark transition-colors">{course.name}</span>
                    </td>
                    <td className="py-5 px-8 text-sm text-ink-3">{course.duration}</td>
                    <td className="py-5 px-8">
                       <span className="inline-block px-2 py-0.5 rounded bg-surface-3 text-[10px] font-bold text-ink-2">{course.level}</span>
                    </td>
                    <td className="py-5 px-8 text-sm text-ink-3">{course.colleges}</td>
                    <td className="py-5 px-8">
                      <button className="flex items-center gap-1 text-xs font-bold text-action hover:gap-2 transition-all">
                        View Colleges <ArrowRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 p-12 rounded-[40px] bg-midnight text-white text-center shadow-2xl relative overflow-hidden">
           <div className="relative z-10">
              <h2 className="text-3xl font-medium mb-4">Not sure which course is for you?</h2>
              <p className="text-white/50 mb-8 max-w-xl mx-auto">Take our Brainstorming Test to discover your strengths and find the ideal career path for your personality.</p>
              <button 
                onClick={() => window.location.href = '/dashboard'}
                className="px-8 py-3 bg-gold text-midnight font-bold rounded-pill hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-gold/20"
              >
                Start Brainstorming Test
              </button>
           </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
