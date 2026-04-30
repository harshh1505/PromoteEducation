'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { 
  Stethoscope, Briefcase, Code, FlaskConical, Award,
  ChevronDown, Search, Filter, ArrowRight, Calendar, BookOpen, TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'

const COURSE_STREAMS = [
  { id: 'engineering', name: 'Engineering', icon: Code, color: 'var(--action)' },
  { id: 'medical', name: 'Medical', icon: Stethoscope, color: 'var(--error)' },
  { id: 'management', name: 'Management', icon: Briefcase, color: 'var(--gold-muted)' },
  { id: 'arts', name: 'Arts', icon: BookOpen, color: 'var(--success)' },
  { id: 'science', name: 'Science', icon: FlaskConical, color: '#8b5cf6' },
  { id: 'commerce', name: 'Commerce', icon: TrendingUp, color: '#06b6d4' },
  { id: 'law', name: 'Law', icon: Award, color: '#f97316' },
]

const MOCK_COURSES = [
  { id: 1, slug: 'btech-computer-science', name: 'B.E/B.Tech in Computer Science', stream: 'engineering', duration: '4 Years', eligibility: 'JEE Main, Class 12 with PCM', career: 'Software Engineer, Data Scientist', avgSalary: '₹8-25 LPA' },
  { id: 2, slug: 'btech-ai-ml', name: 'B.E/B.Tech in Artificial Intelligence & ML', stream: 'engineering', duration: '4 Years', eligibility: 'JEE Main, Class 12 with PCM', career: 'AI/ML Engineer, Data Scientist', avgSalary: '₹10-28 LPA' },
  { id: 3, slug: 'btech-electronics', name: 'B.E/B.Tech in Electronics Engineering', stream: 'engineering', duration: '4 Years', eligibility: 'JEE Main, Class 12 with PCM', career: 'Electronics Engineer, VLSI Designer', avgSalary: '₹6-20 LPA' },
  { id: 4, slug: 'btech-mechanical', name: 'B.E/B.Tech in Mechanical Engineering', stream: 'engineering', duration: '4 Years', eligibility: 'JEE Main, Class 12 with PCM', career: 'Mechanical Engineer, Design Engineer', avgSalary: '₹5-15 LPA' },
  { id: 8, slug: 'mbbs', name: 'MBBS', stream: 'medical', duration: '5.5 Years', eligibility: 'NEET UG, Class 12 with PCB', career: 'Doctor, Specialist', avgSalary: '₹6-50 LPA' },
  { id: 9, slug: 'bds', name: 'BDS', stream: 'medical', duration: '5 Years', eligibility: 'NEET UG, Class 12 with PCB', career: 'Dentist, Oral Surgeon', avgSalary: '₹4-15 LPA' },
  { id: 12, slug: 'mba', name: 'MBA', stream: 'management', duration: '2 Years', eligibility: 'CAT/MAT, Graduation', career: 'Manager, CEO', avgSalary: '₹8-30 LPA' },
  { id: 13, slug: 'bba', name: 'BBA', stream: 'management', duration: '3 Years', eligibility: 'Class 12', career: 'Manager, Entrepreneur', avgSalary: '₹4-15 LPA' },
  { id: 18, slug: 'llb', name: 'LLB', stream: 'law', duration: '3 Years', eligibility: 'CLAT, Class 12', career: 'Lawyer, Judge', avgSalary: '₹5-25 LPA' },
]

export default function CoursesPage() {
  const [search, setSearch] = useState('')
  const [selectedStream, setSelectedStream] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState('name')

  const filteredCourses = useMemo(() => {
    let courses = [...MOCK_COURSES]
    if (search) {
      courses = courses.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.eligibility.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (selectedStream) {
      courses = courses.filter(c => c.stream === selectedStream)
    }
    if (sortBy === 'name') courses.sort((a, b) => a.name.localeCompare(b.name))
    return courses
  }, [search, selectedStream, sortBy])

  const getStreamColor = (stream: string) => {
    return COURSE_STREAMS.find(s => s.id === stream)?.color || 'var(--ink-3)'
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-[var(--surface-2)] pt-28 pb-16 border-b border-[var(--border)]">
        <Container>
          <div className="max-w-2xl">
            <h1 className="text-2xl md:text-3xl font-medium text-[var(--ink)] mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Best Courses in India <span className="text-[var(--action)]">2026</span>
            </h1>
            <p className="text-[var(--ink-2)] text-base leading-relaxed">
              Explore eligibility, career scope, and average salary for all major undergraduate and postgraduate courses.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-[var(--surface)]">
        <Container>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 shrink-0">
              <div className="sticky top-24 space-y-6">
                <Card className="p-5 border-[var(--border)]/50">
                  <h3 className="text-xs font-bold text-[var(--ink)] uppercase tracking-wider mb-4">Search</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ink-4)]" size={16} />
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] focus:ring-1 focus:ring-[var(--action)]/30 outline-none transition-all"
                    />
                  </div>
                </Card>

                <Card className="p-5 border-[var(--border)]/50">
                  <h3 className="text-xs font-bold text-[var(--ink)] uppercase tracking-wider mb-4">Filter by Stream</h3>
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => setSelectedStream(null)}
                      className={`px-3 py-2 rounded-lg text-sm text-left transition-all ${!selectedStream ? 'bg-[var(--action)]/10 text-[var(--action)] font-medium' : 'text-[var(--ink-2)] hover:bg-[var(--surface-2)]'}`}
                    >
                      All Streams
                    </button>
                    {COURSE_STREAMS.map(stream => (
                      <button
                        key={stream.id}
                        onClick={() => setSelectedStream(stream.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-all ${selectedStream === stream.id ? 'bg-[var(--action)]/10 text-[var(--action)] font-medium' : 'text-[var(--ink-2)] hover:bg-[var(--surface-2)]'}`}
                      >
                        <stream.icon size={14} />
                        {stream.name}
                      </button>
                    ))}
                  </div>
                </Card>

                <Card className="p-5 bg-gradient-to-br from-[var(--action)] to-[var(--action)]/90 text-white border-none">
                  <h4 className="font-semibold text-sm mb-1">Need Guidance?</h4>
                  <p className="text-xs text-white/80 mb-4">Talk to experts for course selection.</p>
                  <Button variant="secondary" size="sm" className="w-full bg-white text-[var(--action)] hover:bg-white/90">
                    Book Free Call
                  </Button>
                </Card>
              </div>
            </aside>

            {/* Courses Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <div className="text-[var(--ink-3)] font-medium">
                  Showing <span className="text-[var(--ink)]">{filteredCourses.length}</span> Results
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-none text-[var(--ink-2)] font-medium focus:ring-0 cursor-pointer"
                >
                  <option value="name">Sort by Name</option>
                  <option value="salary">Sort by Salary</option>
                </select>
              </div>

              <div className="grid gap-4">
                {filteredCourses.map(course => (
                  <Card key={course.id} className="p-0 overflow-hidden border-[var(--border)]/50 group">
                    <Link href={`/courses/${course.slug}`} className="flex flex-col md:flex-row h-full no-underline">
                      <div className="flex-1 p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <span 
                            className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white"
                            style={{ backgroundColor: getStreamColor(course.stream) }}
                          >
                            {course.stream}
                          </span>
                          <span className="text-xs text-[var(--ink-3)] flex items-center gap-1 font-medium">
                            <Calendar size={12} /> {course.duration}
                          </span>
                        </div>
                        
                        <h3 className="text-base font-semibold text-[var(--ink)] mb-3 group-hover:text-[var(--action)] transition-colors">
                          {course.name}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div>
                            <div className="text-[var(--ink-4)] uppercase text-[9px] font-bold tracking-widest mb-0.5">Eligibility</div>
                            <div className="text-[var(--ink-2)] font-medium leading-relaxed">{course.eligibility}</div>
                          </div>
                          <div>
                            <div className="text-[var(--ink-4)] uppercase text-[9px] font-bold tracking-widest mb-0.5">Career</div>
                            <div className="text-[var(--ink-2)] font-medium leading-relaxed">{course.career}</div>
                          </div>
                        </div>
                      </div>

                      <div className="md:w-48 bg-[var(--surface-2)] p-5 flex flex-col justify-between border-l border-[var(--border)]/50 group-hover:bg-[var(--action)]/[0.02] transition-colors">
                        <div>
                          <div className="text-[var(--ink-4)] uppercase text-[9px] font-bold tracking-widest mb-0.5">Avg Salary</div>
                          <div className="text-lg font-bold text-[var(--action)]">{course.avgSalary}</div>
                        </div>
                        <div className="mt-4 w-full py-2 px-3 text-center text-xs font-bold bg-[var(--action)] text-white rounded-lg flex items-center justify-center gap-1">
                          Explore <ArrowRight size={12} />
                        </div>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>

              {filteredCourses.length === 0 && (
                <div className="text-center py-24 bg-[var(--surface-2)] rounded-3xl border-2 border-dashed border-[var(--border)]">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <Search size={32} className="text-[var(--ink-4)]" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--ink)] mb-2">No courses match your search</h3>
                  <p className="text-[var(--ink-3)]">Try adjusting your filters or search keywords.</p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  )
}
