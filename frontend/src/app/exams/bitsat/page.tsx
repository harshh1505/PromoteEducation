import type { Metadata } from 'next'
import Link from 'next/link'
import ExamBlogPage, { ExamInfo } from '@/components/pages/exams/ExamBlogPage'

export const metadata: Metadata = {
  title: 'BITSAT 2026 — Eligibility, Syllabus, Pattern & Preparation Guide',
  description: 'Complete guide to BITSAT 2026. Detailed eligibility (75-60 rule), full PCM syllabus, bonus question strategy, campus-wise cutoffs, and top preparation tips for BITS Pilani admission.',
  keywords: ['BITSAT', 'BITSAT 2026', 'BITS Pilani', 'BITS Goa', 'BITSAT syllabus', 'BITSAT eligibility', 'BITSAT cutoff'],
  alternates: { canonical: 'https://promoteducation.com/exams/bitsat' }
}

const exam: ExamInfo = {
  slug: 'bitsat',
  title: 'BITSAT',
  fullName: 'Birla Institute of Technology and Science Admission Test',
  stream: 'Engineering',
  color: '#0ea5e9',
  conductedBy: (
    <a href="https://www.bitsadmission.com" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">
      BITS Pilani (Autonomous Institute)
    </a>
  ),
  mode: 'Computer Based Test (CBT) — Online Proctored',
  frequency: 'Twice a year (May & June sessions)',
  duration: '3 Hours (180 Minutes)',
  totalMarks: '390 (+ 48 Bonus)',
  sections: ['Physics', 'Chemistry', 'English Proficiency & Logical Reasoning', 'Mathematics / Biology'],
  eligibility: [
    'Passed 10+2 or equivalent with Physics, Chemistry, and Mathematics (for Engineering) / Biology (for B.Pharm)',
    'Minimum 75% aggregate marks in Physics, Chemistry, and Maths/Biology — the "75% Rule"',
    'Minimum 60% marks in each of the three core subjects individually — the "60% Rule"',
    'Candidates appearing in the 2026 boards are eligible; students who passed before 2025 are NOT eligible',
    'First-rank holders (toppers) of any central or state board are offered direct admission irrespective of BITSAT score',
  ],
  importantDates: [
    { label: 'Application Form Opens', date: 'January 2026' },
    { label: 'Application Deadline', date: 'March 2026' },
    { label: 'Session 1 Exam', date: 'May 2026' },
    { label: 'Session 2 Exam', date: 'June 2026' },
    { label: 'Iteration 1 Admissions', date: 'July 2026' },
  ],
  syllabus: [
    { subject: 'Physics', topics: ['Units & Measurement', 'Kinematics', 'Newton\'s Laws of Motion', 'Work, Energy & Power', 'Gravitation', 'Thermodynamics', 'Electrostatics', 'Current Electricity', 'Magnetic Effects', 'Optics', 'Modern Physics'] },
    { subject: 'Chemistry', topics: ['States of Matter', 'Atomic Structure', 'Chemical Bonding', 'Thermodynamics', 'Equilibrium', 'Redox Reactions', 'Electrochemistry', 'Organic Chemistry', 'Aldehydes & Ketones', 'Coordination Compounds'] },
    { subject: 'Mathematics', topics: ['Complex Numbers', 'Matrices & Determinants', 'Permutations & Combinations', 'Binomial Theorem', 'Sequences & Series', 'Differential Calculus', 'Integral Calculus', 'Vectors', '3D Geometry', 'Probability'] },
    { subject: 'English & Logical Reasoning', topics: ['Synonyms & Antonyms', 'Reading Comprehension', 'Verbal Analogies', 'Word Formation', 'Series Completion', 'Figure Matrix', 'Non-Verbal Reasoning', 'Logical Deduction'] },
  ],
  preparationTips: [
    'BITSAT is a speed exam — you have just 82 seconds per question. Practice under strict timed conditions from day one',
    'The English & LR section is often ignored but accounts for 25 marks — it\'s your easiest opportunity for free marks',
    'Only opt for the 12 bonus questions if you finish the main 130 with 20+ minutes to spare — you cannot go back after clicking "Bonus"',
    'NCERT is the foundation for PCM; for BITSAT-specific difficulty, supplement with HC Verma (Physics) and DC Pandey (Chemistry)',
    'Take at least 30 full-length mock tests on a computer (not pen-paper) to simulate the actual exam interface',
    'Negative marking is -1 per wrong answer — target 95%+ accuracy before increasing speed',
  ],
  topColleges: [
    'BITS Pilani (Rajasthan)', 'BITS Goa', 'BITS Hyderabad',
    'Computer Science', 'Electronics & Communication', 'Mechanical Engineering',
    'Chemical Engineering', 'Electrical & Electronics', 'Mathematics & Computing',
  ],
  description: (
    <>
      BITSAT is the exclusive entrance test for the prestigious Birla Institute of Technology and Science (BITS), one of India's top-ranked private universities. Unlike{' '}
      <Link href="/exams/jee-main" className="text-sky-600 font-medium hover:underline">JEE Main</Link>,{' '}
      BITSAT is a pure speed test with unique features like the{' '}
      <Link href="/articles/bitsat-bonus-questions" className="text-sky-600 font-medium hover:underline">Bonus Question strategy</Link>{' '}
      and a special{' '}
      <Link href="/articles/bits-direct-admission" className="text-sky-600 font-medium hover:underline">direct admission policy for board toppers</Link>.{' '}
      Many JEE aspirants also target BITSAT as a strong alternative to NITs. Read our detailed guides on{' '}
      <Link href="/articles/bitsat-eligibility" className="text-sky-600 font-medium hover:underline">BITSAT 2026 eligibility</Link>{' '}
      and{' '}
      <Link href="/articles/bits-pilani-cutoff" className="text-sky-600 font-medium hover:underline">campus-wise cutoff trends</Link>.
    </>
  ),
  relatedArticles: [
    { title: 'BITSAT 2026 Eligibility — The 75-60 Rule', href: '/articles/bitsat-eligibility' },
    { title: 'Campus-Wise Cutoff Trends (2021–2025)', href: '/articles/bits-pilani-cutoff' },
    { title: 'Exam Pattern & Bonus Question Strategy', href: '/articles/bitsat-bonus-questions' },
    { title: 'BITSAT vs JEE Main: Key Differences', href: '/articles/bitsat-vs-jee' },
    { title: 'Mastering English & Logical Reasoning', href: '/articles/bitsat-english-lr' },
    { title: 'Direct Admission for Board Toppers', href: '/articles/bits-direct-admission' },
    { title: '30-Day BITSAT Sprint Strategy', href: '/articles/bitsat-crash-course' },
    { title: 'Campus Life & Placements at BITS', href: '/articles/bits-pilani-life' },
  ],
}

export default function Page() {
  return <ExamBlogPage exam={exam} />
}
