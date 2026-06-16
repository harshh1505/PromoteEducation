import type { Metadata } from 'next'
import Link from 'next/link'
import ExamBlogPage, { ExamInfo } from '@/components/pages/exams/ExamBlogPage'

export const metadata: Metadata = {
  title: 'JEE Advanced 2026 — Eligibility, Syllabus, Dates & Preparation Tips',
  description: 'Complete guide to Joint Entrance Examination Advanced (JEE Advanced) 2026. Get eligibility criteria, syllabus, exam dates, preparation tips, and top IITs.',
  alternates: {
    canonical: 'https://promoteducation.com/exams/jee-advanced'
  }
}

const exam: ExamInfo = {
  slug: 'jee-advanced',
  title: 'JEE Advanced',
  fullName: 'Joint Entrance Examination Advanced',
  stream: 'Engineering',
  color: '#2563eb',
  conductedBy: <a href="https://jeeadv.ac.in" target="_blank" rel="noopener noreferrer" className="hover:underline">IITs (Rotational basis)</a>,
  mode: 'Computer Based Test (CBT)',
  frequency: 'Once a year',
  duration: '3 Hours per paper (2 Papers)',
  totalMarks: '360 (180 each paper)',
  sections: ['Physics', 'Chemistry', 'Mathematics'],
  eligibility: [
    'Must qualify JEE Main (Top 2,50,000 rank holders)',
    'Should have scored 75% in Class 12th (65% for SC/ST)',
    'Must be among the top 20 percentile in respective board',
    'Maximum 2 attempts in consecutive years',
  ],
  importantDates: [
    { label: 'JEE Main Result', date: 'April 2026' },
    { label: 'Registration Starts', date: 'April 2026' },
    { label: 'Exam Date', date: 'May 2026' },
    { label: 'Result Declaration', date: 'June 2026' },
    { label: 'JoSAA Counselling', date: 'June 2026' },
  ],
  syllabus: [
    { subject: 'Physics', topics: ['Mechanics', 'Thermal Physics', 'Electricity & Magnetism', 'Optics', 'Modern Physics'] },
    { subject: 'Chemistry', topics: ['Physical Chemistry', 'Inorganic Chemistry', 'Organic Chemistry (Reaction Mechanisms)'] },
    { subject: 'Mathematics', topics: ['Algebra', 'Trigonometry', 'Analytical Geometry', 'Differential Calculus', 'Integral Calculus', 'Vectors'] },
  ],
  preparationTips: [
    'Focus on deep conceptual understanding rather than rote learning',
    'Solve multiple-concept questions where one problem involves Physics, Math, and Chemistry',
    'Analyze previous 10 years\' JEE Advanced papers to understand the depth of questions',
    'Maintain a consistent 6-hour sitting habit to match the exam day duration',
    'Physics: Practice I.E. Irodov for challenging mechanics problems',
    'Mathematics: Use the Cengage series to build advanced problem-solving speed',
  ],
  topColleges: [
    'IIT Bombay', 'IIT Delhi', 'IIT Madras', 'IIT Kanpur', 'IIT Kharagpur',
    'IIT Roorkee', 'IIT Guwahati', 'IIT Hyderabad', 'IIT Indore', 'IIT Gandhinagar'
  ],
  description: (
    <>
      JEE Advanced is considered one of the toughest entrance examinations in the world. It is the sole gateway for admission to all 23 Indian Institutes of Technology (IITs). Only the top 2,50,000 rank holders of JEE Main are eligible to appear for this exam. For deeper insights, check our <Link href="/articles/jee-advanced-syllabus-2026" className="text-[#2563eb] font-medium hover:underline">detailed Advanced syllabus</Link> and the <Link href="/articles/jee-advanced-eligibility-2026" className="text-[#2563eb] font-medium hover:underline">specific IIT eligibility criteria</Link>.
    </>
  ),
  relatedArticles: [
    { title: 'JEE Advanced 2026 Eligibility', href: '/articles/jee-advanced-eligibility-2026' },
    { title: 'Detailed PCM Syllabus', href: '/articles/jee-advanced-syllabus-2026' },
    { title: 'Exam Pattern & Marking', href: '/articles/jee-advanced-exam-pattern' },
    { title: 'Best Preparation Books', href: '/articles/best-books-jee-advanced' },
    { title: 'Preparation Strategy', href: '/articles/jee-advanced-preparation-strategy' },
    { title: 'JEE Main vs Advanced', href: '/articles/jee-main-vs-jee-advanced' },
    { title: 'Top IITs in India', href: '/articles/colleges-accepting-jee-advanced' },
  ]
}

export default function Page() {
  return <ExamBlogPage exam={exam} />
}
