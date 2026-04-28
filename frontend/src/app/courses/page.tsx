'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { 
  Stethoscope, Briefcase, Code, FlaskConical, Award,
  ChevronDown, Search, Filter, ArrowRight, Calendar, BookOpen, TrendingUp
} from 'lucide-react'

const COURSE_STREAMS = [
  { id: 'engineering', name: 'Engineering/Technology', icon: Code, color: '#0ea5e9' },
  { id: 'medical', name: 'Medical', icon: Stethoscope, color: '#ef4444' },
  { id: 'management', name: 'Management', icon: Briefcase, color: '#f59e0b' },
  { id: 'arts', name: 'Arts', icon: BookOpen, color: '#10b981' },
  { id: 'science', name: 'Science', icon: FlaskConical, color: '#8b5cf6' },
  { id: 'commerce', name: 'Commerce', icon: TrendingUp, color: '#06b6d4' },
  { id: 'law', name: 'Law', icon: Award, color: '#f97316' },
  { id: 'others', name: 'Others', icon: ChevronDown, color: '#64748b' },
]

const MOCK_COURSES = [
  // Engineering/Technology
  { id: 1, slug: 'btech-computer-science', name: 'B.E/B.Tech in Computer Science', stream: 'engineering', duration: '4 Years', eligibility: 'JEE Main, Class 12 with PCM', career: 'Software Engineer, Data Scientist', avgSalary: '₹8-25 LPA' },
  { id: 2, slug: 'btech-ai-ml', name: 'B.E/B.Tech in Artificial Intelligence & ML', stream: 'engineering', duration: '4 Years', eligibility: 'JEE Main, Class 12 with PCM', career: 'AI/ML Engineer, Data Scientist', avgSalary: '₹10-28 LPA' },
  { id: 3, slug: 'btech-electronics', name: 'B.E/B.Tech in Electronics Engineering', stream: 'engineering', duration: '4 Years', eligibility: 'JEE Main, Class 12 with PCM', career: 'Electronics Engineer, VLSI Designer', avgSalary: '₹6-20 LPA' },
  { id: 4, slug: 'btech-mechanical', name: 'B.E/B.Tech in Mechanical Engineering', stream: 'engineering', duration: '4 Years', eligibility: 'JEE Main, Class 12 with PCM', career: 'Mechanical Engineer, Design Engineer', avgSalary: '₹5-15 LPA' },
  { id: 5, slug: 'btech-civil', name: 'B.E/B.Tech in Civil Engineering', stream: 'engineering', duration: '4 Years', eligibility: 'JEE Main, Class 12 with PCM', career: 'Civil Engineer, Structural Engineer', avgSalary: '₹4-12 LPA' },
  { id: 6, slug: 'btech-electrical', name: 'B.E/B.Tech in Electrical Engineering', stream: 'engineering', duration: '4 Years', eligibility: 'JEE Main, Class 12 with PCM', career: 'Electrical Engineer, Power Engineer', avgSalary: '₹5-15 LPA' },
  { id: 7, slug: 'mtech-data-science', name: 'M.Tech in Data Science', stream: 'engineering', duration: '2 Years', eligibility: 'GATE, B.Tech', career: 'Data Scientist, ML Engineer', avgSalary: '₹10-35 LPA' },
  
  // Medical
  { id: 8, slug: 'mbbs', name: 'MBBS', stream: 'medical', duration: '5.5 Years', eligibility: 'NEET UG, Class 12 with PCB', career: 'Doctor, Specialist', avgSalary: '₹6-50 LPA' },
  { id: 9, slug: 'bds', name: 'BDS', stream: 'medical', duration: '5 Years', eligibility: 'NEET UG, Class 12 with PCB', career: 'Dentist, Oral Surgeon', avgSalary: '₹4-15 LPA' },
  { id: 10, slug: 'bsc-nursing', name: 'B.Sc in Nursing', stream: 'medical', duration: '4 Years', eligibility: 'Class 12 with PCB', career: 'Nurse, Healthcare Admin', avgSalary: '₹3-8 LPA' },
  { id: 11, slug: 'bpharm', name: 'B.Pharm', stream: 'medical', duration: '4 Years', eligibility: 'NEET/Class 12 with PCB', career: 'Pharmacist, Drug Inspector', avgSalary: '₹3-10 LPA' },
  
  // Management
  { id: 12, slug: 'mba', name: 'MBA', stream: 'management', duration: '2 Years', eligibility: 'CAT/MAT, Graduation', career: 'Manager, CEO', avgSalary: '₹8-30 LPA' },
  { id: 13, slug: 'bba', name: 'BBA', stream: 'management', duration: '3 Years', eligibility: 'Class 12', career: 'Manager, Entrepreneur', avgSalary: '₹4-15 LPA' },
  { id: 14, slug: 'bcom', name: 'B.Com', stream: 'commerce', duration: '3 Years', eligibility: 'Class 12 Commerce', career: 'Accountant, CA', avgSalary: '₹3-12 LPA' },
  
  // Science
  { id: 15, slug: 'bsc-physics', name: 'B.Sc in Physics', stream: 'science', duration: '3 Years', eligibility: 'Class 12 with PCMB', career: 'Researcher, Teacher', avgSalary: '₹3-12 LPA' },
  { id: 16, slug: 'bsc-chemistry', name: 'B.Sc in Chemistry', stream: 'science', duration: '3 Years', eligibility: 'Class 12 with PCMB', career: 'Researcher, Chemist', avgSalary: '₹3-12 LPA' },
  { id: 17, slug: 'msc-chemistry', name: 'M.Sc in Chemistry', stream: 'science', duration: '2 Years', eligibility: 'B.Sc Chemistry', career: 'Researcher, Chemist', avgSalary: '₹4-12 LPA' },
  
  // Law
  { id: 18, slug: 'llb', name: 'LLB', stream: 'law', duration: '3 Years', eligibility: 'CLAT, Class 12', career: 'Lawyer, Judge', avgSalary: '₹5-25 LPA' },
  { id: 19, slug: 'ba-llb', name: 'BA LLB', stream: 'law', duration: '5 Years', eligibility: 'CLAT, Class 12', career: 'Corporate Lawyer, Judge', avgSalary: '₹6-30 LPA' },
  
  // Arts
  { id: 20, slug: 'ba-economics', name: 'B.A. in Economics', stream: 'arts', duration: '3 Years', eligibility: 'Class 12', career: 'Economist, Analyst', avgSalary: '₹4-15 LPA' },
  { id: 21, slug: 'ba-english', name: 'B.A. in English', stream: 'arts', duration: '3 Years', eligibility: 'Class 12', career: 'Writer, Teacher', avgSalary: '₹3-10 LPA' },
  
  // Others
  { id: 22, slug: 'bca', name: 'BCA', stream: 'others', duration: '3 Years', eligibility: 'Class 12', career: 'Programmer, Web Developer', avgSalary: '₹4-12 LPA' },
  { id: 23, slug: 'bsc-computer-science', name: 'B.Sc in Computer Science', stream: 'others', duration: '3 Years', eligibility: 'Class 12 with PCM', career: 'Developer, IT Analyst', avgSalary: '₹4-15 LPA' },
]

export default function CoursesPage() {
  const [search, setSearch] = useState('')
  const [selectedStream, setSelectedStream] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState('name')
  const [showFilters, setShowFilters] = useState(false)

  const filteredCourses = useMemo(() => {
    let courses = [...MOCK_COURSES]
    
    if (search) {
      courses = courses.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.slug.toLowerCase().includes(search.toLowerCase()) ||
        c.eligibility.toLowerCase().includes(search.toLowerCase()) ||
        c.career.toLowerCase().includes(search.toLowerCase())
      )
    }
    
    if (selectedStream) {
      courses = courses.filter(c => c.stream === selectedStream)
    }
    
    if (sortBy === 'name') {
      courses.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'duration') {
      courses.sort((a, b) => a.duration.localeCompare(b.duration))
    }
    
    return courses
  }, [search, selectedStream, sortBy])

  const getStreamColor = (stream: string) => {
    return COURSE_STREAMS.find(s => s.id === stream)?.color || '#64748b'
  }

  const getStreamName = (stream: string) => {
    return COURSE_STREAMS.find(s => s.id === stream)?.name || stream
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-surface">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-medium text-ink mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Explore <span className="text-action">Courses</span>
            </h1>
            <p className="text-ink-2 text-lg">
              Find the right course for your career from {MOCK_COURSES.length}+ courses.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search courses or colleges..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-action/20"
              />
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-600"
            >
              <Filter size={20} />
              Filters
            </button>

            <div className={`
              ${showFilters ? 'flex' : 'hidden'} lg:flex
              flex-wrap gap-3
            `}>
              <select
                value={selectedStream || ''}
                onChange={(e) => setSelectedStream(e.target.value || null)}
                className="px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-600 focus:outline-none"
              >
                <option value="">All Streams</option>
                {COURSE_STREAMS.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-600 focus:outline-none"
              >
                <option value="name">Sort by Name</option>
                <option value="duration">Sort by Duration</option>
              </select>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedStream(null)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${!selectedStream ? 'bg-action text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}
              `}
            >
              All
            </button>
            {COURSE_STREAMS.map(stream => (
              <button
                key={stream.id}
                onClick={() => setSelectedStream(stream.id)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedStream === stream.id 
                    ? 'text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}
                `}
                style={{ 
                  backgroundColor: selectedStream === stream.id ? stream.color : undefined,
                  color: selectedStream === stream.id ? 'white' : undefined 
                }}
              >
                {stream.name}
              </button>
            ))}
          </div>

          <div className="mb-4 text-sm text-ink-3">
            Showing {filteredCourses.length} of {MOCK_COURSES.length} courses
          </div>

          <div className="grid gap-4">
            {filteredCourses.map(course => (
              <div
                key={course.id}
                className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span 
                        className="text-xs font-medium px-2 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: getStreamColor(course.stream) }}
                      >
                        {getStreamName(course.stream)}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar size={12} /> {course.duration}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-ink mb-2">{course.name}</h3>
                    <div className="flex flex-col gap-1.5 text-sm text-ink-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 w-20">Eligibility:</span>
                        {course.eligibility}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 w-20">Career:</span>
                        {course.career}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 w-20">Avg Salary:</span>
                        <span className="text-action font-medium">{course.avgSalary}</span>
                      </div>
                    </div>
                  </div>

                  <Link 
                    href={`/courses/${course.slug}`}
                    className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-action text-white font-medium hover:bg-action/90 transition-colors"
                  >
                    View Details
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                <Search size={24} className="text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-ink mb-2">No courses found</h3>
              <p className="text-ink-2">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}