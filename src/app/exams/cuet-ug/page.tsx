import type { Metadata } from 'next'
import Link from 'next/link'
import ExamBlogPage, { ExamInfo } from '@/components/pages/exams/ExamBlogPage'

export const metadata: Metadata = {
  title: 'CUET UG 2026 — Eligibility, Syllabus, Dates & Preparation Tips',
  description: 'Complete guide to Common University Entrance Test (CUET UG) 2026. Get eligibility criteria, syllabus, exam dates, preparation tips, and top universities.',
  alternates: {
    canonical: 'https://promoteducation.com/exams/cuet-ug'
  }
}

const exam: ExamInfo = {
  slug: 'cuet-ug',
  title: 'CUET UG',
  fullName: 'Common University Entrance Test Undergraduate',
  stream: 'General',
  color: '#059669',
  conductedBy: <a href="https://nta.ac.in" target="_blank" rel="noopener noreferrer" className="hover:underline">National Testing Agency (NTA)</a>,
  mode: 'Computer Based Test (CBT)',
  frequency: 'Once a year (May)',
  duration: 'Varies by subject combination',
  totalMarks: 'Varies',
  sections: ['Language Test', 'Domain Specific Subjects', 'General Test'],
  eligibility: [
    'Passed Class 12th or equivalent from a recognized board',
    'No upper age limit for appearing in CUET UG',
    'University-specific eligibility criteria must be met',
    'Final year students are also eligible',
  ],
  importantDates: [
    { label: 'Registration Window', date: 'February - March 2026' },
    { label: 'Exam Dates', date: 'May 2026' },
    { label: 'Result Declaration', date: 'June 2026' },
    { label: 'Counselling Starts', date: 'July 2026' },
  ],
  syllabus: [
    { subject: 'Section IA & IB (Languages)', topics: ['Reading Comprehension', 'Literary Aptitude', 'Vocabulary'] },
    { subject: 'Section II (Domain)', topics: ['Strictly based on Class 12 NCERT syllabus (27 subjects available)'] },
    { subject: 'Section III (General Test)', topics: ['GK', 'Current Affairs', 'General Mental Ability', 'Numerical Ability', 'Logical Reasoning'] },
  ],
  preparationTips: [
    'Focus 100% on Class 12 NCERT for domain subjects',
    'Read newspapers daily to improve reading speed for the language section',
    'Maintain a daily routine for General Knowledge and Current Affairs',
    'Practice time management for the CBT format — some subjects have 45 min and some 60 min',
    'Use mock tests to get familiar with the interface of the NTA computer-based exam',
    'Analyze university subject requirements before choosing your combinations',
  ],
  topColleges: [
    'University of Delhi', 'Banaras Hindu University', 'Jawaharlal Nehru University',
    'Jamia Millia Islamia', 'Aligarh Muslim University', 'University of Allahabad',
    'Ambedkar University Delhi', 'TISS Mumbai', 'Visva-Bharati University', 'Pondicherry University'
  ],
  description: (
    <>
      CUET UG (Common University Entrance Test – Undergraduate) has transformed admissions in India by introducing a standardized system for central and participating universities. It ensures fair evaluation and equal opportunity for students across different boards. For deeper insights, explore our <Link href="/articles/cuet-ug-syllabus-2026" className="text-[#059669] font-medium hover:underline">detailed CUET syllabus</Link> and the <Link href="/articles/cuet-ug-eligibility-2026" className="text-[#059669] font-medium hover:underline">latest eligibility requirements</Link>.
    </>
  ),
  relatedArticles: [
    { title: 'CUET UG 2026 Eligibility', href: '/articles/cuet-ug-eligibility-2026' },
    { title: 'Full Syllabus Breakdown', href: '/articles/cuet-ug-syllabus-2026' },
    { title: 'Exam Pattern & Marking', href: '/articles/cuet-ug-exam-pattern' },
    { title: 'Best Preparation Books', href: '/articles/best-books-cuet-ug' },
    { title: 'Preparation Strategy', href: '/articles/cuet-ug-preparation-strategy' },
    { title: 'CUET vs JEE vs NEET', href: '/articles/cuet-ug-vs-jee-neet' },
    { title: 'Top CUET Universities', href: '/articles/colleges-accepting-cuet-ug' },
  ]
}

export default function Page() {
  return <ExamBlogPage exam={exam} />
}
