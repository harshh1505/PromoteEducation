import type { Metadata } from 'next'
import Link from 'next/link'
import ExamBlogPage, { ExamInfo } from '@/components/pages/exams/ExamBlogPage'

export const metadata: Metadata = {
  title: 'XAT 2026 — Eligibility, Syllabus, Exam Pattern & Preparation Guide',
  description: 'Complete guide to XAT 2026 by XLRI Jamshedpur. Detailed eligibility, Decision Making strategy, section-wise syllabus, XLRI cutoffs, and expert preparation tips for India\'s top MBA entrance.',
  keywords: ['XAT', 'XAT 2026', 'XLRI', 'MBA entrance', 'XAT syllabus', 'XAT eligibility', 'Decision Making XAT'],
  alternates: { canonical: 'https://promoteducation.com/exams/xat' }
}

const exam: ExamInfo = {
  slug: 'xat',
  title: 'XAT',
  fullName: 'Xavier Aptitude Test',
  stream: 'Management',
  color: '#d97706',
  conductedBy: (
    <a href="https://xatonline.in" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">
      XLRI Jamshedpur (on behalf of XAMI)
    </a>
  ),
  mode: 'Computer Based Test (CBT)',
  frequency: 'Once a year (First Sunday of January)',
  duration: '3 Hours 10 Minutes',
  totalMarks: '100 (Scaled)',
  sections: ['Verbal & Logical Ability (VARC)', 'Decision Making (DM)', 'Quantitative Aptitude & Data Interpretation (QADI)', 'General Knowledge (GK)'],
  eligibility: [
    'Bachelor\'s degree in any discipline from a recognized university',
    'Final year undergraduate students are eligible to apply',
    'No minimum percentage requirement — all graduates may apply',
    'No age limit for XAT registration',
    'Working professionals with a bachelor\'s degree are also eligible',
  ],
  importantDates: [
    { label: 'Registration Opens', date: 'July 2025' },
    { label: 'Registration Closes', date: 'November 2025' },
    { label: 'Admit Card Download', date: 'December 2025' },
    { label: 'Exam Date', date: '5 January 2026' },
    { label: 'Result Declaration', date: 'January 2026' },
  ],
  syllabus: [
    { subject: 'Decision Making (DM)', topics: ['Ethical Dilemmas', 'Managerial Decisions', 'Financial Decisions', 'Scenario Analysis', 'Group Situations', 'Analytical Reasoning'] },
    { subject: 'Verbal & Logical Ability', topics: ['Reading Comprehension (complex passages)', 'Poetry & Abstract Passages', 'Para-Jumbles', 'Critical Reasoning', 'Fact-Inference-Judgement'] },
    { subject: 'Quant & Data Interpretation', topics: ['Arithmetic', 'Algebra (high difficulty)', 'Number System', 'Geometry', 'Data Tables', 'Bar Graphs', 'Venn Diagrams'] },
    { subject: 'General Knowledge', topics: ['Current Affairs (6 months)', 'Business & Economy', 'Science & Technology', 'Awards & Honours', 'Indian Constitution'] },
  ],
  preparationTips: [
    'Decision Making is the game-changer in XAT — it cannot be cracked by formula; practice ethical dilemmas from XLRI past papers',
    'XAT Reading Comprehension includes poetry and philosophical passages — read The Hindu editorial, Classic literature excerpts daily',
    'XAT Quant is tougher than CAT Quant — expect higher difficulty in Number Theory and Geometry; use Arun Sharma for Advanced problems',
    'GK is not used for percentile but matters for XLRI GD-PI shortlists — read business news for the last 6 months',
    'The Essay Writing section (for some institutes) is separate — practice writing structured 250-word essays on current topics',
    'Set a strict sectional time limit during mocks: 70 mins for VARC, 60 mins for DM, 55 mins for QA',
  ],
  topColleges: [
    'XLRI Jamshedpur (HRM & BM)', 'SPJIMR Mumbai', 'IMT Ghaziabad',
    'XIMB Bhubaneswar', 'GIM Goa', 'TAPMI Manipal',
    'LIBA Chennai', 'IRMA Anand', 'XISS Ranchi', 'XIM University Bhubaneswar',
  ],
  description: (
    <>
      XAT is one of India's most prestigious and intellectually challenging MBA entrance examinations, conducted by{' '}
      <a href="https://xlri.ac.in" target="_blank" rel="noopener noreferrer" className="text-amber-600 font-medium hover:underline">XLRI Jamshedpur</a>{' '}
      for over 70 years. Its signature{' '}
      <Link href="/articles/xat-decision-making-guide" className="text-amber-600 font-medium hover:underline">Decision Making section</Link>{' '}
      is unique among all MBA entrance exams and demands ethical reasoning skills that no other exam tests. XAT scores are accepted by 160+ top B-schools and is the best alternative to{' '}
      <Link href="/exams/cat" className="text-amber-600 font-medium hover:underline">CAT</Link>.{' '}
      Begin with our guide on{' '}
      <Link href="/articles/xat-eligibility" className="text-amber-600 font-medium hover:underline">XAT 2026 eligibility</Link>{' '}
      and the{' '}
      <Link href="/articles/xat-selection-process" className="text-amber-600 font-medium hover:underline">XLRI selection process</Link>.
    </>
  ),
  relatedArticles: [
    { title: 'XAT 2026 Eligibility & Registration Guide', href: '/articles/xat-eligibility' },
    { title: 'Decision Making: The Ultimate Strategy Guide', href: '/articles/xat-decision-making-guide' },
    { title: 'XAT Exam Pattern & Sectional Analysis', href: '/articles/xat-exam-pattern' },
    { title: 'XLRI Jamshedpur Selection Process', href: '/articles/xat-selection-process' },
    { title: 'XAT vs CAT: Which Should You Take?', href: '/articles/xat-vs-cat-comparison' },
    { title: 'XLRI HRM vs BM: Which Program?', href: '/articles/xlri-hrm-vs-bm' },
    { title: 'Top 10 Colleges Accepting XAT Score', href: '/articles/top-colleges-xat' },
    { title: 'How to Write a Winning XAT Essay', href: '/articles/xat-essay-writing' },
  ],
}

export default function Page() {
  return <ExamBlogPage exam={exam} />
}
