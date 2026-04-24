import type { Metadata } from 'next'
import Link from 'next/link'
import ExamBlogPage, { ExamInfo } from '@/components/pages/ExamBlogPage'

export const metadata: Metadata = {
  title: 'GATE 2026 — Eligibility, Syllabus, Dates & Preparation Tips',
  description: 'Complete guide to Graduate Aptitude Test in Engineering (GATE) 2026. Get eligibility criteria, syllabus, exam dates, preparation tips, and top colleges for M.Tech.',
  alternates: {
    canonical: 'https://promoteducation.com/exams/gate'
  }
}

const exam: ExamInfo = {
  slug: 'gate',
  title: 'GATE',
  fullName: 'Graduate Aptitude Test in Engineering',
  stream: 'Engineering',
  color: '#6d28d9',
  conductedBy: <a href="https://gate2024.iisc.ac.in" target="_blank" rel="noopener noreferrer" className="hover:underline">IISc Bangalore & IITs (jointly)</a>,
  mode: 'Computer Based Test (CBT)',
  frequency: 'Once a year (February)',
  duration: '3 Hours',
  totalMarks: '100',
  sections: ['General Aptitude', 'Engineering Mathematics', 'Subject-specific'],
  eligibility: [
    'Bachelor\'s degree in Engineering/Technology/Architecture',
    'Master\'s degree in Science/Mathematics/Statistics/Computer Applications',
    'Final year students are also eligible',
    'No age limit',
  ],
  importantDates: [
    { label: 'Registration Opens', date: 'August 2025' },
    { label: 'Exam Dates', date: 'February 2026' },
    { label: 'Result', date: 'March 2026' },
    { label: 'Counselling (CCMT)', date: 'April 2026' },
  ],
  syllabus: [
    { subject: 'General Aptitude', topics: ['Verbal Ability', 'Quantitative Aptitude', 'Analytical Aptitude', 'Spatial Aptitude'] },
    { subject: 'Engineering Mathematics', topics: ['Linear Algebra', 'Calculus', 'Differential Equations', 'Complex Variables', 'Probability & Statistics'] },
    { subject: 'Core Subject', topics: ['Varies by paper — 30 subject papers available including CS, ECE, ME, CE, EE, CH, etc.'] },
  ],
  preparationTips: [
    'Identify your strongest subjects and focus on maximizing marks from them',
    'GATE rewards accuracy over speed — avoid negative marking',
    'Solve previous 15 years\' GATE papers subject-wise',
    'Join a test series and take weekly subject-wise tests',
    'Don\'t ignore General Aptitude — it\'s 15 easy marks',
    'Revise formulae and standard results regularly',
  ],
  topColleges: [
    'IISc Bangalore', 'IIT Bombay', 'IIT Delhi', 'IIT Madras', 'IIT Kanpur',
    'IIT Kharagpur', 'IIT Roorkee', 'IIT Guwahati', 'IIT Hyderabad', 'NIT Trichy'
  ],
  description: (
    <>
      GATE is a national-level examination for admission to M.Tech/M.E./PhD programs in IITs, IISc, NITs, and other top institutions. GATE scores are also used by many PSUs (like ONGC, BHEL, NTPC, IOCL) for recruitment. For more detailed insights, check the <Link href="/articles/gate-syllabus-2026" className="text-[#6d28d9] font-medium hover:underline">GATE 2026 syllabus</Link> and the <Link href="/articles/gate-eligibility-2026" className="text-[#6d28d9] font-medium hover:underline">latest eligibility requirements</Link>.
    </>
  ),
  relatedArticles: [
    { title: 'GATE 2026 Eligibility Criteria', href: '/articles/gate-eligibility-2026' },
    { title: 'Detailed Branch Syllabus', href: '/articles/gate-syllabus-2026' },
    { title: 'Exam Pattern & Marking', href: '/articles/gate-exam-pattern' },
    { title: 'Best Preparation Books', href: '/articles/best-books-gate' },
    { title: 'Preparation Strategy', href: '/articles/gate-preparation-strategy' },
    { title: 'GATE vs ESE vs CAT', href: '/articles/gate-vs-ese-cat' },
    { title: 'Top Colleges for M.Tech', href: '/articles/colleges-accepting-gate' },
  ]
}

export default function Page() {
  return <ExamBlogPage exam={exam} />
}
