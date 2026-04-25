import type { Metadata } from 'next'
import Link from 'next/link'
import ExamBlogPage, { ExamInfo } from '@/components/pages/exams/ExamBlogPage'

export const metadata: Metadata = {
  title: 'JEE Main 2026 — Eligibility, Syllabus, Dates & Preparation Tips',
  description: 'Complete guide to Joint Entrance Examination Main (JEE Main) 2026. Get eligibility criteria, syllabus, exam dates, preparation tips, cut-offs, and top colleges accepting JEE Main scores.',
  alternates: {
    canonical: 'https://promoteducation.com/exams/jee-main'
  }
}

const exam: ExamInfo = {
  slug: 'jee-main',
  title: 'JEE Main',
  fullName: 'Joint Entrance Examination Main',
  stream: 'Engineering',
  color: '#3A7BD5',
  conductedBy: <a href="https://jeemain.nta.nic.in/" target="_blank" rel="noopener noreferrer" className="text-[#0b57d0] hover:underline">National Testing Agency (NTA)</a>,
  mode: 'Computer Based Test (CBT)',
  frequency: 'Twice a year (January & April)',
  duration: '3 Hours',
  totalMarks: '300',
  sections: ['Physics', 'Chemistry', 'Mathematics'],
  eligibility: [
    'Passed 12th or equivalent with Physics, Chemistry, and Mathematics',
    'No age limit for appearing in JEE Main',
    'Candidates can attempt for 3 consecutive years',
    'Minimum 75% in 12th board (for NITs/IIITs admission)',
  ],
  importantDates: [
    { label: 'Session 1 Registration', date: 'November 2025' },
    { label: 'Session 1 Exam', date: 'January 2026' },
    { label: 'Session 1 Result', date: 'February 2026' },
    { label: 'Session 2 Registration', date: 'February 2026' },
    { label: 'Session 2 Exam', date: 'April 2026' },
    { label: 'Session 2 Result', date: 'May 2026' },
  ],
  syllabus: [
    { subject: 'Physics', topics: ['Mechanics', 'Thermodynamics', 'Electrodynamics', 'Optics', 'Modern Physics', 'Waves & Oscillations'] },
    { subject: 'Chemistry', topics: ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Environmental Chemistry', 'Biomolecules'] },
    { subject: 'Mathematics', topics: ['Algebra', 'Calculus', 'Coordinate Geometry', 'Trigonometry', 'Statistics & Probability', 'Vectors & 3D'] },
  ],
  preparationTips: [
    'Start with NCERT textbooks — they form the foundation of 60% of the paper',
    'Solve previous year papers (last 10 years) to understand the exam pattern',
    'Focus on time management — practice solving 90 questions in 180 minutes',
    'Keep a formula sheet and revise it daily during the last month',
    'Take at least 2 full-length mock tests every week in the last 3 months',
    'Focus on your weak areas but don\'t neglect strong topics',
  ],
  topColleges: [
    'IIT Bombay', 'IIT Delhi', 'IIT Madras', 'IIT Kanpur', 'IIT Kharagpur',
    'NIT Trichy', 'NIT Warangal', 'NIT Surathkal', 'IIIT Hyderabad', 'BITS Pilani'
  ],
  description: (
    <>
      JEE Main is the gateway to India's top engineering institutions including NITs, IIITs, and other government-funded technical institutions. It is also the qualifying exam for <a href="https://josaa.nic.in/" target="_blank" rel="noopener noreferrer" className="text-[#0b57d0] font-medium hover:underline">JoSAA counselling</a>, which manages admissions to premier technical institutes. For more details, check our guides on the <Link href="/articles/jee-main-exam-pattern" className="text-[#0b57d0] font-medium hover:underline">JEE Main 2026 exam pattern</Link> and the <Link href="/articles/jee-main-syllabus-2026" className="text-[#0b57d0] font-medium hover:underline">latest syllabus weightage</Link>.
    </>
  ),
  relatedArticles: [
    { title: 'Eligibility Criteria 2026', href: '/articles/jee-main-eligibility-2026' },
    { title: 'Syllabus & Weightage', href: '/articles/jee-main-syllabus-2026' },
    { title: 'Exam Pattern & Marking', href: '/articles/jee-main-exam-pattern' },
    { title: 'Best Preparation Books', href: '/articles/best-books-jee-main' },
    { title: 'Preparation Strategy', href: '/articles/jee-main-preparation-strategy' },
    { title: 'JEE vs Advanced vs BITSAT', href: '/articles/jee-main-vs-advanced-bitsat' },
    { title: 'Top Colleges Accepting Scores', href: '/articles/colleges-accepting-jee-main' },
  ],
}

export default function Page() {
  return <ExamBlogPage exam={exam} />
}
