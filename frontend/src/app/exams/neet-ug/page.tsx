import type { Metadata } from 'next'
import Link from 'next/link'
import ExamBlogPage, { ExamInfo } from '@/components/pages/ExamBlogPage'

export const metadata: Metadata = {
  title: 'NEET UG 2026 — Eligibility, Syllabus, Dates & Preparation Tips',
  description: 'Complete guide to National Eligibility cum Entrance Test (NEET UG) 2026. Get eligibility criteria, syllabus, exam dates, preparation tips, and top medical colleges.',
  alternates: {
    canonical: 'https://promoteducation.com/exams/neet-ug'
  }
}

const exam: ExamInfo = {
  slug: 'neet-ug',
  title: 'NEET UG',
  fullName: 'National Eligibility cum Entrance Test (Undergraduate)',
  stream: 'Medical',
  color: '#1DB87A',
  conductedBy: <a href="https://neet.nta.nic.in/" target="_blank" rel="noopener noreferrer" className="text-[#1DB87A] hover:underline">National Testing Agency (NTA)</a>,
  mode: 'Pen and Paper (OMR based)',
  frequency: 'Once a year',
  duration: '3 Hours 20 Minutes',
  totalMarks: '720',
  sections: ['Physics', 'Chemistry', 'Biology (Botany + Zoology)'],
  eligibility: [
    'Passed or appearing in Class 12th with Physics, Chemistry, Biology/Biotechnology',
    'Minimum 50% aggregate in PCB (40% for SC/ST/OBC)',
    'Minimum age: 17 years at the time of admission',
    'No upper age limit (as per latest ruling)',
  ],
  importantDates: [
    { label: 'Registration Opens', date: 'February 2026' },
    { label: 'Last Date to Apply', date: 'March 2026' },
    { label: 'Exam Date', date: 'May 2026' },
    { label: 'Result Declaration', date: 'June 2026' },
    { label: 'Counselling Begins', date: 'July 2026' },
  ],
  syllabus: [
    { subject: 'Physics', topics: ['Mechanics', 'Thermodynamics', 'Electrostatics', 'Current Electricity', 'Optics', 'Modern Physics', 'Magnetism'] },
    { subject: 'Chemistry', topics: ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Chemistry in Everyday Life'] },
    { subject: 'Biology', topics: ['Cell Biology', 'Genetics & Evolution', 'Human Physiology', 'Plant Physiology', 'Ecology', 'Biotechnology'] },
  ],
  preparationTips: [
    'NCERT is the Bible for NEET — read every line, diagram, and example',
    'Biology carries 360 marks — give it the maximum time in preparation',
    'Practice MCQs daily — aim for 200+ questions per day in the last 3 months',
    'Focus on high-weightage chapters: Human Physiology, Genetics, Chemical Bonding',
    'Maintain an error log and revise mistakes weekly',
    'Take mock tests every Sunday and analyze your performance carefully',
  ],
  topColleges: [
    'AIIMS New Delhi', 'JIPMER Puducherry', 'CMC Vellore', 'AFMC Pune', 'Maulana Azad Medical College',
    'King George Medical University', 'BHU Medical', 'Grant Medical College', 'Lady Hardinge Medical College', 'Kasturba Medical College'
  ],
  description: (
    <>
      NEET UG is the single national-level entrance examination for admission to MBBS, BDS, AYUSH, and nursing courses across India. With over 20 lakh applicants each year, it is the most competitive medical exam in the country. Admissions to central and state seats are managed through <a href="https://mcc.nic.in/" target="_blank" rel="noopener noreferrer" className="text-[#1DB87A] font-medium hover:underline">MCC counselling</a>. For more deep-dives, explore our <Link href="/articles/neet-syllabus-2026" className="text-[#1DB87A] font-medium hover:underline">NEET 2026 syllabus breakdown</Link> and the <Link href="/articles/neet-eligibility-2026" className="text-[#1DB87A] font-medium hover:underline">latest eligibility criteria</Link>.
    </>
  ),
  relatedArticles: [
    { title: 'NEET 2026 Eligibility Criteria', href: '/articles/neet-eligibility-2026' },
    { title: 'Detailed PCB Syllabus', href: '/articles/neet-syllabus-2026' },
    { title: 'Exam Pattern & Marking', href: '/articles/neet-exam-pattern' },
    { title: 'Best Preparation Books', href: '/articles/best-books-neet' },
    { title: 'Preparation Strategy', href: '/articles/neet-preparation-strategy' },
    { title: 'NEET vs AIIMS vs JIPMER', href: '/articles/neet-vs-aiims-jipmer' },
    { title: 'Top Medical Colleges', href: '/articles/colleges-accepting-neet' },
  ]
}

export default function Page() {
  return <ExamBlogPage exam={exam} />
}
