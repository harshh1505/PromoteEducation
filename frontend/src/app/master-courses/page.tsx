import { getAllMasterCourses } from '@/lib/data/masterCourses'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ArrowRight, GraduationCap, Clock, BookOpen } from 'lucide-react'

export const metadata = {
  title: 'Master Courses - Promote Education',
  description: 'Explore our comprehensive list of master courses, including B.Tech, MBA, MBBS, and more. Find the right degree program for your career path.'
}

export default function MasterCoursesIndex() {
  const courses = getAllMasterCourses()

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden flex flex-col">
      <Navbar />

      <div className="relative flex-1">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-80" />
        
        {/* Decorative Blurs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/40 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-50/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

        <main className="max-w-[1440px] mx-auto w-full px-6 pt-32 pb-20 relative z-10">
          
          {/* Header */}
          <div className="max-w-3xl mb-16 animate-in fade-in slide-in-from-top-6 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 text-[10px] font-black text-slate-800 uppercase tracking-widest mb-6">
              Degree Programs
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black text-slate-900 leading-[1.08] tracking-tighter mb-5 font-display">
              Explore Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600">Master Courses</span>
            </h1>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium max-w-xl">
              Browse our curated list of primary degree programs. Select a master course to explore its specialisations, top colleges, and admission criteria.
            </p>
          </div>

          {/* Grid of Master Courses */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link
                key={course.slug}
                href={`/master-courses/${course.slug}`}
                className="group bg-white/80 backdrop-blur-md border border-slate-150 rounded-3xl p-6 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center border border-indigo-100/50 group-hover:scale-110 transition-transform">
                    <GraduationCap size={20} className="text-indigo-600" />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {course.level}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                  {course.shortName}
                </h3>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4">
                  {course.fullName}
                </p>
                
                <p className="text-sm text-slate-500 leading-relaxed font-medium mb-6 flex-1 line-clamp-3">
                  {course.description}
                </p>

                <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-auto">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                      <Clock size={14} className="text-slate-400" /> {course.duration}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white text-slate-400 transition-colors">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
