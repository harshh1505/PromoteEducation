import type { Metadata } from 'next'
import Link from 'next/link'
import ExamBlogPage, { ExamInfo } from '@/components/pages/exams/ExamBlogPage'

export const metadata: Metadata = {
  title: 'CAT 2026 — Eligibility, Syllabus, Dates & Preparation Tips',
  description: 'Complete guide to Common Admission Test (CAT) 2026. Get eligibility criteria, syllabus, exam dates, preparation tips, and top B-schools like IIMs.',
  alternates: {
    canonical: 'https://promoteducation.com/exams/cat'
  }
}

const exam: ExamInfo = {
  slug: 'cat',
  title: 'CAT',
  fullName: 'Common Admission Test',
  stream: 'Management',
  color: '#8B6A1F',
  conductedBy: <a href="https://iimcat.ac.in" target="_blank" rel="noopener noreferrer" className="hover:underline">IIMs (Rotational basis)</a>,
  mode: 'Computer Based Test (CBT)',
  frequency: 'Once a year (November)',
  duration: '2 Hours',
  totalMarks: '198',
  sections: ['VARC', 'DILR', 'Quantitative Ability'],
  eligibility: [
    'Bachelor\'s degree with minimum 50% (45% for SC/ST/PwD)',
    'Final year students can also apply',
    'No age limit',
    'Work experience is not mandatory but preferred by many IIMs',
  ],
  importantDates: [
    { label: 'Notification Release', date: 'July 2026' },
    { label: 'Registration Window', date: 'August - September 2026' },
    { label: 'Admit Card Release', date: 'October 2026' },
    { label: 'Exam Date', date: 'November 2026' },
    { label: 'Result Declaration', date: 'January 2027' },
  ],
  syllabus: [
    { subject: 'VARC', topics: ['Reading Comprehension', 'Para Jumbles', 'Para Summary', 'Sentence Correction', 'Odd One Out'] },
    { subject: 'DILR', topics: ['Data Arrangement', 'Puzzles', 'Bar Graphs', 'Line Charts', 'Venn Diagrams', 'Binary Logic'] },
    { subject: 'Quantitative Ability', topics: ['Arithmetic', 'Algebra', 'Geometry', 'Mensuration', 'Number Systems', 'Modern Maths'] },
  ],
  preparationTips: [
    'Reading habits are non-negotiable for VARC — read diverse topics daily',
    'Focus on Arithmetic as it carries nearly 40-50% weightage in QA',
    'DILR requires solving different types of sets — don\'t stick to one type',
    'Take at least 20-30 full-length mock tests before the actual exam',
    'Analysis of mock tests is more important than taking them',
    'Improve your speed in calculation and logical thinking',
  ],
  topColleges: [
    'IIM Ahmedabad', 'IIM Bangalore', 'IIM Calcutta', 'IIM Lucknow', 'IIM Indore',
    'IIM Kozhikode', 'FMS Delhi', 'SPJIMR Mumbai', 'MDI Gurgaon', 'XLRI (via XAT/CAT for some programs)'
  ],
  description: (
    <>
      CAT is the most prestigious management entrance exam in India, conducted by the IIMs on a rotational basis. It is the gateway to 20+ IIMs and over 1,200 B-schools across India. For more deep-dives, explore our <Link href="/articles/cat-syllabus-2026" className="text-[#8B6A1F] font-medium hover:underline">detailed CAT syllabus</Link> and the <Link href="/articles/cat-eligibility-2026" className="text-[#8B6A1F] font-medium hover:underline">latest eligibility requirements</Link>.
    </>
  ),
  relatedArticles: [
    { title: 'CAT 2026 Eligibility Criteria', href: '/articles/cat-eligibility-2026' },
    { title: 'Detailed Sectional Syllabus', href: '/articles/cat-syllabus-2026' },
    { title: 'Exam Pattern & Marking', href: '/articles/cat-exam-pattern' },
    { title: 'Best Preparation Books', href: '/articles/best-books-cat' },
    { title: 'Preparation Strategy', href: '/articles/cat-preparation-strategy' },
    { title: 'CAT vs XAT vs GMAT', href: '/articles/cat-vs-xat-gmat' },
    { title: 'Top MBA Colleges', href: '/articles/colleges-accepting-cat' },
  ]
}

export default function Page() {
  return <ExamBlogPage exam={exam} />
}
