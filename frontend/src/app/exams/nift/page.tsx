import type { Metadata } from 'next'
import Link from 'next/link'
import ExamBlogPage, { ExamInfo } from '@/components/pages/ExamBlogPage'

export const metadata: Metadata = {
  title: 'NIFT 2026 — Eligibility, Syllabus, Dates & Preparation Tips',
  description: 'Complete guide to National Institute of Fashion Technology (NIFT) Entrance Exam 2026. Get eligibility criteria, syllabus, exam dates, and preparation tips.',
  alternates: {
    canonical: 'https://promoteducation.com/exams/nift'
  }
}

const exam: ExamInfo = {
  slug: 'nift',
  title: 'NIFT',
  fullName: 'National Institute of Fashion Technology Entrance Exam',
  stream: 'Design',
  color: '#D55A30',
  conductedBy: <a href="https://nift.ac.in" target="_blank" rel="noopener noreferrer" className="hover:underline">National Institute of Fashion Technology (NIFT)</a>,
  mode: 'Computer Based Test + Studio Test',
  frequency: 'Once a year',
  duration: '3 Hours (CAT) + Studio Test',
  totalMarks: 'Varies',
  sections: ['Creative Ability Test (CAT)', 'General Ability Test (GAT)', 'Situation Test'],
  eligibility: [
    'For B.Des: Passed 12th from any stream',
    'For B.FTech: Passed 12th with Physics, Chemistry, Maths',
    'For M.Des/MFM: Bachelor\'s degree in relevant field',
    'No age limit',
  ],
  importantDates: [
    { label: 'Registration Opens', date: 'October 2025' },
    { label: 'Exam Date (CAT/GAT)', date: 'January 2026' },
    { label: 'Situation Test', date: 'March 2026' },
    { label: 'Result', date: 'April 2026' },
  ],
  syllabus: [
    { subject: 'Creative Ability Test', topics: ['Drawing', 'Illustration', 'Design Composition', 'Color Theory', 'Creative Thinking'] },
    { subject: 'General Ability Test', topics: ['Quantitative Ability', 'Communication', 'English Comprehension', 'Analytical Ability', 'GK'] },
    { subject: 'Situation Test', topics: ['3D Model Making', 'Material Handling', 'Innovation', 'Presentation'] },
  ],
  preparationTips: [
    'Practice sketching and drawing daily — speed and creativity matter',
    'Study color theory, design principles, and fashion history',
    'For GAT, focus on English comprehension and analytical reasoning',
    'Practice making 3D models for the Situation Test',
    'Follow fashion magazines and design blogs for inspiration',
    'Study previous NIFT entrance papers for pattern understanding',
  ],
  topColleges: [
    'NIFT Delhi', 'NIFT Mumbai', 'NIFT Bangalore', 'NIFT Hyderabad', 'NIFT Chennai',
    'NIFT Kolkata', 'NID Ahmedabad', 'Pearl Academy', 'Symbiosis Institute of Design', 'MIT Institute of Design'
  ],
  description: (
    <>
      NIFT entrance exam is the gateway to India's most prestigious fashion and design institute — National Institute of Fashion Technology. The exam tests both creative and analytical abilities through a unique combination of CAT and GAT. For a deeper dive, check our <Link href="/articles/nift-syllabus-2026" className="text-[#D55A30] font-medium hover:underline">detailed NIFT syllabus</Link> and the <Link href="/articles/nift-eligibility-2026" className="text-[#D55A30] font-medium hover:underline">latest eligibility criteria</Link>.
    </>
  ),
  relatedArticles: [
    { title: 'NIFT 2026 Eligibility Criteria', href: '/articles/nift-eligibility-2026' },
    { title: 'Detailed CAT & GAT Syllabus', href: '/articles/nift-syllabus-2026' },
    { title: 'Exam Pattern & Selection', href: '/articles/nift-exam-pattern' },
    { title: 'Best Preparation Books', href: '/articles/best-books-nift' },
    { title: 'Preparation Strategy', href: '/articles/nift-preparation-strategy' },
    { title: 'NIFT vs NID vs UCEED', href: '/articles/nift-vs-nid-uceed' },
    { title: 'Top NIFT Campuses', href: '/articles/colleges-accepting-nift' },
  ]
}

export default function Page() {
  return <ExamBlogPage exam={exam} />
}
