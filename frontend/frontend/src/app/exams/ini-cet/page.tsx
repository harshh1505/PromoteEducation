import type { Metadata } from 'next'
import Link from 'next/link'
import ExamBlogPage, { ExamInfo } from '@/components/pages/exams/ExamBlogPage'

export const metadata: Metadata = {
  title: 'INI CET 2026 — Eligibility, Syllabus, Dates & Preparation Guide',
  description: 'The ultimate guide to INI CET 2026. Detailed eligibility, full syllabus, exam pattern, important dates, and expert preparation strategies for MD/MS admission at AIIMS, JIPMER, and PGIMER.',
  keywords: ['INI CET', 'INI CET 2026', 'AIIMS PG', 'MD MS admission', 'INI CET syllabus', 'INI CET eligibility'],
  alternates: { canonical: 'https://promoteducation.com/exams/ini-cet' }
}

const exam: ExamInfo = {
  slug: 'ini-cet',
  title: 'INI CET',
  fullName: 'Institute of National Importance Combined Entrance Test',
  stream: 'Medical',
  color: '#059669',
  conductedBy: (
    <a href="https://aiimsexams.ac.in" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">
      AIIMS New Delhi
    </a>
  ),
  mode: 'Computer Based Test (CBT)',
  frequency: 'Twice a year (January & July sessions)',
  duration: '3 Hours (180 Minutes)',
  totalMarks: '200',
  sections: ['Pre-Clinical', 'Para-Clinical', 'Clinical Subjects'],
  eligibility: [
    'MBBS degree from an institution recognized by the National Medical Commission (NMC)',
    'Minimum 55% aggregate marks for General/OBC/EWS candidates',
    'Minimum 50% aggregate marks for SC/ST candidates',
    'Completion of mandatory 12-month rotating internship before the cutoff date',
    'Valid permanent or provisional registration with NMC or State Medical Council',
  ],
  importantDates: [
    { label: 'Jan Session Registration', date: 'September 2025' },
    { label: 'Jan Session Exam', date: 'November 2025' },
    { label: 'Jul Session Registration', date: 'March 2026' },
    { label: 'Jul Session Exam', date: 'May 2026' },
    { label: 'Result Declaration', date: 'June 2026' },
  ],
  syllabus: [
    { subject: 'Pre-Clinical', topics: ['Anatomy', 'Physiology', 'Biochemistry'] },
    { subject: 'Para-Clinical', topics: ['Pathology', 'Microbiology', 'Pharmacology', 'Forensic Medicine', 'Community Medicine (PSM)'] },
    { subject: 'Clinical (Medicine)', topics: ['General Medicine', 'Psychiatry', 'Dermatology', 'Radiology'] },
    { subject: 'Clinical (Surgery)', topics: ['General Surgery', 'Orthopaedics', 'ENT', 'Ophthalmology', 'Anaesthesia'] },
    { subject: 'Clinical (OBG & Paeds)', topics: ['Obstetrics & Gynaecology', 'Paediatrics'] },
  ],
  preparationTips: [
    'INI CET has a strong emphasis on image-based questions — practice clinical imaging from textbooks and online platforms like Marrow',
    'Focus on Pre-clinical subjects in the first phase; AIIMS PG is known to test these deeply',
    'Previous AIIMS PG papers (2010–2024) are the best practice material for pattern familiarity',
    'Clinical subjects carry the highest weightage — allocate at least 60% of your study time to them',
    'Attempt at least 200 high-quality MCQs daily and review every incorrect answer thoroughly',
    'Last 3 weeks: switch entirely to grand tests and revision; avoid starting any new topic',
  ],
  topColleges: [
    'AIIMS New Delhi', 'AIIMS Rishikesh', 'AIIMS Jodhpur', 'AIIMS Bhubaneswar',
    'JIPMER Puducherry', 'PGIMER Chandigarh', 'NIMHANS Bangalore', 'SCTIMST Trivandrum',
    'AIIMS Kalyani', 'AIIMS Patna'
  ],
  description: (
    <>
      INI CET is the unified entrance examination for postgraduate medical admissions at all Institutes of National Importance, including all{' '}
      <Link href="/colleges/aiims-kalyani" className="text-emerald-600 font-medium hover:underline">AIIMS campuses</Link>,{' '}
      JIPMER, and PGIMER. It is considered more rigorous than{' '}
      <Link href="/exams/neet-pg" className="text-emerald-600 font-medium hover:underline">NEET PG</Link>{' '}
      due to its emphasis on clinical reasoning, image-based questions, and recent advances in medicine. Explore our expert guides on{' '}
      <Link href="/articles/ini-cet-eligibility-2026" className="text-emerald-600 font-medium hover:underline">INI CET 2026 eligibility</Link>{' '}
      and the{' '}
      <Link href="/articles/ini-cet-syllabus-2026" className="text-emerald-600 font-medium hover:underline">complete syllabus breakdown</Link>.
    </>
  ),
  relatedArticles: [
    { title: 'INI CET 2026 Eligibility Criteria', href: '/articles/ini-cet-eligibility-2026' },
    { title: 'Complete Syllabus Breakdown', href: '/articles/ini-cet-syllabus-2026' },
    { title: 'Exam Pattern & Marking Scheme', href: '/articles/ini-cet-exam-pattern' },
    { title: 'INI CET vs NEET PG: Key Differences', href: '/articles/ini-cet-vs-neet-pg' },
    { title: 'Best Coaching Centres for INI CET', href: '/articles/best-ini-cet-coaching' },
    { title: 'High-Yield Topics for INI CET', href: '/articles/ini-cet-high-yield-topics' },
    { title: 'AIIMS PG Seat Matrix 2026', href: '/articles/aiims-pg-seat-matrix' },
    { title: 'Post-PG Career & Salary Guide', href: '/articles/post-pg-medical-career' },
  ],
}

export default function Page() {
  return <ExamBlogPage exam={exam} />
}
