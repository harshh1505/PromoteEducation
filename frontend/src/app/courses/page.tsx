'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { 
  Search, ArrowRight, Clock, Briefcase, Sparkles, Filter, ChevronDown, GraduationCap 
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

const CATEGORY_MAPPINGS: Record<string, string> = {
  'Engineering & Technology': 'Engineering',
  'Medical': 'Medical',
  'Allied Health Sciences': 'Allied Health',
  'Pharmacy': 'Pharmacy',
  'Science': 'Science',
  'Commerce & Finance': 'Commerce',
  'Management': 'Management',
  'Computer Applications': 'Computing',
  'Arts & Humanities': 'Arts',
  'Law': 'Law',
  'Design & Media': 'Design',
  'Architecture & Planning': 'Architecture',
  'Hospitality & Tourism': 'Hospitality'
}

function CoursesPageContent() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('q') || ''
  
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(initialSearch)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All')
  const [sortBy, setSortBy] = useState('name')

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
        
        if (error) throw error
        if (data) {
          setCourses(data)
        }
      } catch (err) {
        console.error('Error fetching courses:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  // Extract unique categories and sort them
  const categories = useMemo(() => {
    const cats = new Set(courses.map(c => c.category).filter(Boolean))
    return ['All', ...Array.from(cats).sort()]
  }, [courses])

  // Filtered courses
  const filteredCourses = useMemo(() => {
    let result = courses.filter(c => {
      const matchesSearch = !search || 
        c.course_name.toLowerCase().includes(search.toLowerCase()) ||
        c.degree.toLowerCase().includes(search.toLowerCase()) ||
        (c.career_domain && c.career_domain.toLowerCase().includes(search.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory
      
      let matchesLevel = true
      if (selectedLevel !== 'All') {
        matchesLevel = c.level === selectedLevel
      }

      return matchesSearch && matchesCategory && matchesLevel
    })

    if (sortBy === 'name') {
      result.sort((a, b) => a.course_name.localeCompare(b.course_name))
    } else if (sortBy === 'duration') {
      result.sort((a, b) => (Number(b.duration_years) || 0) - (Number(a.duration_years) || 0))
    }

    return result
  }, [courses, search, selectedCategory, selectedLevel, sortBy])

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      <Navbar />

      <div className="relative flex-1">
        {/* Repeating grid CSS background to match homepage/modals */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-80" />
        
        {/* Decorative Blurs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/40 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute top-[30%] left-0 w-[400px] h-[400px] bg-sky-50/30 rounded-full blur-[120px] -z-10 pointer-events-none" />

        <main className="max-w-[1440px] mx-auto w-full px-6 pt-32 pb-20 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-12 animate-in fade-in slide-in-from-top-6 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 text-[10px] font-black text-slate-800 uppercase tracking-widest mb-6">
            Course Directory 2026
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black text-slate-900 leading-[1.08] tracking-tighter mb-5 font-display">
            Find the program that <br />
            defines your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600">career trajectory</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium max-w-xl">
            Explore UG & PG courses, structural durations, and potential career opportunities across top Indian universities.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white/80 backdrop-blur-md border border-slate-100 rounded-3xl p-5 mb-10 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search courses by name, degree, or careers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-150 rounded-2xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all outline-none"
              />
            </div>

            {/* Level Toggle & Sort */}
            <div className="flex gap-3 w-full md:w-auto flex-shrink-0">
              <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-150 w-full md:w-auto">
                {['All', 'UG', 'PG'].map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all w-full text-center whitespace-nowrap ${
                      selectedLevel === lvl 
                        ? 'bg-white text-slate-950 shadow-sm border border-slate-250/20' 
                        : 'text-slate-400 hover:text-slate-800'
                    }`}
                  >
                    {lvl === 'All' ? 'All Levels' : lvl}
                  </button>
                ))}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-150 text-slate-700 text-xs font-bold rounded-xl px-4 py-2.5 outline-none cursor-pointer focus:border-indigo-500 transition-all"
              >
                <option value="name">Sort by Name</option>
                <option value="duration">Sort by Duration</option>
              </select>
            </div>

          </div>

          {/* Dynamic Categories Tab Scroller */}
          <div className="border-t border-slate-100 pt-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest whitespace-nowrap rounded-xl transition-all border ${
                    selectedCategory === cat 
                      ? 'bg-slate-950 border-slate-950 text-white shadow-sm' 
                      : 'bg-white border-slate-200/80 text-slate-500 hover:text-slate-900 hover:border-slate-350'
                  }`}
                >
                  {cat === 'All' ? 'All Streams' : (CATEGORY_MAPPINGS[cat] || cat)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="border border-slate-100 rounded-3xl overflow-hidden shadow-sm bg-white animate-pulse">
            <div className="bg-slate-50/50 h-12 border-b border-slate-100" />
            <div className="divide-y divide-slate-100">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-16 flex items-center justify-between px-6 gap-6">
                  <div className="h-4 bg-slate-100 rounded w-1/3" />
                  <div className="h-4 bg-slate-100 rounded w-1/5" />
                  <div className="h-4 bg-slate-100 rounded w-10" />
                  <div className="h-4 bg-slate-100 rounded w-12" />
                  <div className="h-4 bg-slate-100 rounded w-1/4" />
                  <div className="h-7 bg-slate-100 rounded w-16" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Tabular Format */}
            <div className="overflow-x-auto bg-white border border-slate-100 rounded-3xl shadow-sm">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Course & Degree</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Stream / Category</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Level</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Duration</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Career Domains</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/60">
                  {filteredCourses.map(course => (
                    <tr key={course.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100/50 px-2.5 py-0.5 rounded uppercase shrink-0">
                            {course.degree}
                          </span>
                          <span className="font-extrabold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors leading-tight">
                            {course.course_name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500 font-bold uppercase tracking-wider">
                        {CATEGORY_MAPPINGS[course.category] || course.category}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[9px] font-bold text-slate-400 bg-slate-50 border border-slate-150 px-2 py-0.5 rounded uppercase">
                          {course.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-600 font-semibold">
                        {course.duration_years ? `${course.duration_years} Years` : '—'}
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500 font-medium max-w-xs truncate">
                        {course.career_domain || '—'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/courses/${course.slug || course.id}`}
                          className="inline-flex items-center gap-1.5 py-2 px-3 bg-slate-50 hover:bg-slate-950 hover:text-white border border-slate-150 text-slate-700 font-extrabold text-[10px] uppercase tracking-wider rounded-lg transition-all"
                        >
                          Explore
                          <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredCourses.length === 0 && (
              <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl mt-6 shadow-sm">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                  <Search size={24} className="text-slate-400" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-1">No courses matched your search</h3>
                <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Try adjusting your text query or category filter to find related courses.
                </p>
              </div>
            )}
          </>
        )}
      </main>
      </div>

      <Footer />
    </div>
  )
}

export default function CoursesPage() {
  return (
    <Suspense fallback={<div>Loading courses...</div>}>
      <CoursesPageContent />
    </Suspense>
  )
}
