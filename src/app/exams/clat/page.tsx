import type { Metadata } from 'next'
import Link from 'next/link'
import ExamBlogPage, { ExamInfo } from '@/components/pages/exams/ExamBlogPage'

export const metadata: Metadata = {
  title: 'CLAT 2026 — Eligibility, Syllabus, Dates & Preparation Tips',
  description: 'Complete guide to Common Law Admission Test (CLAT) 2026. Get eligibility criteria, syllabus, exam dates, preparation tips, and top NLUs.',
  alternates: {
    canonical: 'https://promoteducation.com/exams/clat'
  }
}

const exam: ExamInfo = {
  slug: "clat",
  title: 'CLAT',
  fullName: 'Common Law Admission Test',
  stream: 'Law',
  color: '#7A3AD5',
  conductedBy: <a href="https://consortiumofnlus.ac.in" target="_blank" rel="noopener noreferrer" className="hover:underline">Consortium of NLUs</a>,
  mode: 'Computer Based Test (CBT)',
  frequency: 'Once a year (December)',
  duration: '2 Hours',
  totalMarks: '150',
  sections: ['English', 'Current Affairs & GK', 'Legal Reasoning', 'Logical Reasoning', 'Quantitative Techniques'],
  eligibility: [
    'For UG: Passed 12th with min 45% (40% for SC/ST)',
    'For PG: LLB degree with min 50%',
    'No upper age limit for appearing in CLAT',
    'Final year students are also eligible to apply',
  ],
  importantDates: [
    { label: 'Notification Release', date: 'July 2025' },
    { label: 'Registration Starts', date: 'July 2025' },
    { label: 'Last Date to Apply', date: 'November 2025' },
    { label: 'Exam Date', date: 'December 2025' },
    { label: 'Result Declaration', date: 'January 2026' },
  ],
  syllabus: [
    { subject: 'English Language', topics: ['Reading Comprehension', 'Inference-based questions', 'Vocabulary', 'Grammar'] },
    { subject: 'Legal Reasoning', topics: ['Legal Principles', 'Fact-based scenarios', 'Constitutional Law', 'Torts', 'Contracts', 'Crimes'] },
    { subject: 'Logical Reasoning', topics: ['Analytical Reasoning', 'Critical Reasoning', 'Arguments & Conclusions', 'Puzzles'] },
    { subject: 'Quantitative Techniques', topics: ['Data Interpretation', 'Basic Mathematics (Class 10 level)', 'Ratios', 'Percentages'] },
  ],
  preparationTips: [
    'Read newspapers like The Hindu or Indian Express daily to build comprehension speed',
    'Master the art of reading between the lines for the Legal and Logical sections',
    'Practice at least 5-10 reading comprehension passages daily',
    'Stay updated with legal news and landmark judgments of the Supreme Court',
    'Solve previous year papers to understand the shift towards comprehension-based questions',
    'Take mock tests in the actual exam time slot to build peak mental focus',
  ],
  topColleges: [
    'NLSIU Bangalore', 'NALSAR Hyderabad', 'WBNUJS Kolkata', 'NLU Jodhpur', 'GNLU Gandhinagar',
    'NLIU Bhopal', 'RMLNLU Lucknow', 'HNLU Raipur', 'RGNUL Patiala', 'CNLU Patna'
  ],
  description: (
    <>
      Common Law Admission Test (CLAT) is the most sought-after entrance exam for law aspirants in India. It is the centralized gateway for admission to 22 National Law Universities (NLUs) and over 60 other law schools. For deeper insights, explore our <Link href="/articles/clat-syllabus-2026" className="text-[#7A3AD5] font-medium hover:underline">detailed CLAT syllabus</Link> and the <Link href="/articles/clat-eligibility-2026" className="text-[#7A3AD5] font-medium hover:underline">latest eligibility requirements</Link>.
    </>
  ),
  relatedArticles: [
    { title: 'CLAT 2026 Eligibility Criteria', href: '/articles/clat-eligibility-2026' },
    { title: 'Detailed Sectional Syllabus', href: '/articles/clat-syllabus-2026' },
    { title: 'Exam Pattern & Marking', href: '/articles/clat-exam-pattern' },
    { title: 'Best Preparation Books', href: '/articles/best-books-clat' },
    { title: 'Preparation Strategy', href: '/articles/clat-preparation-strategy' },
    { title: 'CLAT vs AILET vs LSAT', href: '/articles/clat-vs-ailet-lsat' },
    { title: 'Top NLUs in India', href: '/articles/colleges-accepting-clat' },
  ]
}

export default function Page() {
  return <ExamBlogPage exam={exam} />
}
