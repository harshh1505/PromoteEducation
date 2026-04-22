'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Users, BookOpen, Target, FileText, CheckCircle2, ChevronRight, GraduationCap, Stethoscope, Briefcase, Scale, Palette, FlaskConical } from 'lucide-react'

interface ExamInfo {
  title: string
  fullName: string
  stream: string
  color: string
  conductedBy: string
  mode: string
  frequency: string
  duration: string
  totalMarks: string
  sections: string[]
  eligibility: string[]
  importantDates: { label: string; date: string }[]
  syllabus: { subject: string; topics: string[] }[]
  preparationTips: string[]
  topColleges: string[]
  description: string
}

const examDatabase: Record<string, ExamInfo> = {
  'jee-main': {
    title: 'JEE Main',
    fullName: 'Joint Entrance Examination Main',
    stream: 'Engineering',
    color: '#3A7BD5',
    conductedBy: 'National Testing Agency (NTA)',
    mode: 'Computer Based Test (CBT)',
    frequency: 'Twice a year (January & April)',
    duration: '3 Hours',
    totalMarks: '300',
    sections: ['Physics', 'Chemistry', 'Mathematics'],
    eligibility: [
      'Passed 12th or equivalent with Physics, Chemistry, and Mathematics',
      'No age limit for appearing in JEE Main',
      'Candidates can attempt for 3 consecutive years',
      'Minimum 75% in 12th board (for NITs/IIITs admission)',
    ],
    importantDates: [
      { label: 'Session 1 Registration', date: 'November 2025' },
      { label: 'Session 1 Exam', date: 'January 2026' },
      { label: 'Session 1 Result', date: 'February 2026' },
      { label: 'Session 2 Registration', date: 'February 2026' },
      { label: 'Session 2 Exam', date: 'April 2026' },
      { label: 'Session 2 Result', date: 'May 2026' },
    ],
    syllabus: [
      { subject: 'Physics', topics: ['Mechanics', 'Thermodynamics', 'Electrodynamics', 'Optics', 'Modern Physics', 'Waves & Oscillations'] },
      { subject: 'Chemistry', topics: ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Environmental Chemistry', 'Biomolecules'] },
      { subject: 'Mathematics', topics: ['Algebra', 'Calculus', 'Coordinate Geometry', 'Trigonometry', 'Statistics & Probability', 'Vectors & 3D'] },
    ],
    preparationTips: [
      'Start with NCERT textbooks — they form the foundation of 60% of the paper',
      'Solve previous year papers (last 10 years) to understand the exam pattern',
      'Focus on time management — practice solving 90 questions in 180 minutes',
      'Keep a formula sheet and revise it daily during the last month',
      'Take at least 2 full-length mock tests every week in the last 3 months',
      'Focus on your weak areas but don\'t neglect strong topics',
    ],
    topColleges: [
      'IIT Bombay', 'IIT Delhi', 'IIT Madras', 'IIT Kanpur', 'IIT Kharagpur',
      'NIT Trichy', 'NIT Warangal', 'NIT Surathkal', 'IIIT Hyderabad', 'BITS Pilani'
    ],
    description: 'JEE Main is the gateway to India\'s top engineering institutions including NITs, IIITs, and other government-funded technical institutions. It is also the qualifying exam for JEE Advanced, which is required for admission to the Indian Institutes of Technology (IITs). Conducted by NTA, JEE Main is held twice a year, giving candidates the opportunity to improve their scores.',
  },
  'jee-advanced': {
    title: 'JEE Advanced',
    fullName: 'Joint Entrance Examination Advanced',
    stream: 'Engineering',
    color: '#2563eb',
    conductedBy: 'IITs (Rotational basis)',
    mode: 'Computer Based Test (CBT)',
    frequency: 'Once a year',
    duration: '3 Hours per paper (2 Papers)',
    totalMarks: '360 (180 each paper)',
    sections: ['Physics', 'Chemistry', 'Mathematics'],
    eligibility: [
      'Must qualify JEE Main (Top 2,50,000 rank holders)',
      'Should have scored 75% in Class 12th (65% for SC/ST)',
      'Maximum 2 attempts in consecutive years',
      'Age limit: 25 years (30 for SC/ST/PwD)',
    ],
    importantDates: [
      { label: 'Registration Opens', date: 'April 2026' },
      { label: 'Exam Date', date: 'May 2026' },
      { label: 'Result Declaration', date: 'June 2026' },
      { label: 'Counselling (JoSAA)', date: 'June-July 2026' },
    ],
    syllabus: [
      { subject: 'Physics', topics: ['General Physics', 'Mechanics', 'Thermal Physics', 'Electricity & Magnetism', 'Optics', 'Modern Physics'] },
      { subject: 'Chemistry', topics: ['Physical Chemistry', 'Inorganic Chemistry', 'Organic Chemistry'] },
      { subject: 'Mathematics', topics: ['Algebra', 'Trigonometry', 'Analytical Geometry', 'Differential Calculus', 'Integral Calculus', 'Vectors'] },
    ],
    preparationTips: [
      'Master concepts from JEE Main level first before moving to Advanced',
      'Practice problems from Irodov (Physics), MS Chouhan (Organic), and SL Loney (Maths)',
      'Focus heavily on problem-solving speed and accuracy',
      'Study the pattern — JEE Advanced has unique question types (matrix match, integer type)',
      'Revise all formulae and shortcuts regularly',
      'Take full-length mock tests simulating 6-hour exam conditions',
    ],
    topColleges: [
      'IIT Bombay', 'IIT Delhi', 'IIT Madras', 'IIT Kanpur', 'IIT Kharagpur',
      'IIT Roorkee', 'IIT Guwahati', 'IIT Hyderabad', 'IIT BHU', 'IIT Indore'
    ],
    description: 'JEE Advanced is considered one of the toughest entrance examinations in the world. It is the sole gateway for admission to all 23 Indian Institutes of Technology (IITs). Only the top 2,50,000 rank holders of JEE Main are eligible to appear for this exam. The exam tests deep conceptual understanding and problem-solving abilities in Physics, Chemistry, and Mathematics.',
  },
  'neet-ug': {
    title: 'NEET UG',
    fullName: 'National Eligibility cum Entrance Test (Undergraduate)',
    stream: 'Medical',
    color: '#1DB87A',
    conductedBy: 'National Testing Agency (NTA)',
    mode: 'Pen and Paper (OMR based)',
    frequency: 'Once a year',
    duration: '3 Hours 20 Minutes',
    totalMarks: '720',
    sections: ['Physics', 'Chemistry', 'Biology (Botany + Zoology)'],
    eligibility: [
      'Passed or appearing in Class 12th with Physics, Chemistry, Biology/Biotechnology',
      'Minimum 50% aggregate in PCB (40% for SC/ST/OBC)',
      'Minimum age: 17 years at the time of admission',
      'No upper age limit (as per Supreme Court ruling)',
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
    description: 'NEET UG is the single national-level entrance examination for admission to MBBS, BDS, AYUSH, and nursing courses across India. With over 20 lakh applicants each year, it is one of the most competitive exams in the country. The exam is conducted in offline mode (pen and paper) with 200 questions from Physics, Chemistry, and Biology.',
  },
  'cat': {
    title: 'CAT',
    fullName: 'Common Admission Test',
    stream: 'Management',
    color: '#8B6A1F',
    conductedBy: 'IIMs (Rotational basis)',
    mode: 'Computer Based Test (CBT)',
    frequency: 'Once a year (November)',
    duration: '2 Hours',
    totalMarks: '198',
    sections: ['VARC', 'DILR', 'Quantitative Ability'],
    eligibility: [
      'Bachelor\'s degree with minimum 50% (45% for SC/ST/PwD)',
      'Final year students can also apply',
      'No age limit to appear for CAT',
      'No limit on number of attempts',
    ],
    importantDates: [
      { label: 'Registration Opens', date: 'August 2025' },
      { label: 'Last Date to Apply', date: 'September 2025' },
      { label: 'Admit Card', date: 'October 2025' },
      { label: 'Exam Date', date: 'November 2025' },
      { label: 'Result', date: 'January 2026' },
    ],
    syllabus: [
      { subject: 'VARC', topics: ['Reading Comprehension', 'Para Summary', 'Para Jumbles', 'Odd Sentence', 'Critical Reasoning'] },
      { subject: 'DILR', topics: ['Puzzles', 'Tables', 'Pie Charts', 'Bar Graphs', 'Logical Reasoning', 'Data Sufficiency'] },
      { subject: 'Quantitative Ability', topics: ['Arithmetic', 'Algebra', 'Number System', 'Geometry', 'Mensuration', 'Modern Math'] },
    ],
    preparationTips: [
      'Start with basic concepts of Quant and build speed through daily practice',
      'Read newspapers and editorials daily to improve VARC score',
      'Practice DILR sets from previous CAT papers and SimCATs',
      'Time management is key — learn to skip difficult questions strategically',
      'Take at least 40-50 full-length mocks before the exam',
      'Analyze each mock test thoroughly — understanding errors is more important than taking more tests',
    ],
    topColleges: [
      'IIM Ahmedabad', 'IIM Bangalore', 'IIM Calcutta', 'IIM Lucknow', 'IIM Kozhikode',
      'IIM Indore', 'FMS Delhi', 'MDI Gurgaon', 'SPJIMR Mumbai', 'XLRI Jamshedpur'
    ],
    description: 'CAT is the most prestigious management entrance exam in India, conducted by the IIMs on a rotational basis. It is the gateway to 20+ IIMs and over 1,200 B-schools across India. The exam tests candidates on Verbal Ability, Data Interpretation, Logical Reasoning, and Quantitative Ability. A good CAT score can transform your career trajectory significantly.',
  },
  'gate': {
    title: 'GATE',
    fullName: 'Graduate Aptitude Test in Engineering',
    stream: 'Engineering',
    color: '#6d28d9',
    conductedBy: 'IISc Bangalore & IITs (jointly)',
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
    description: 'GATE is a national-level examination for admission to M.Tech/M.E./PhD programs in IITs, IISc, NITs, and other top institutions. GATE scores are also used by many PSUs (like ONGC, BHEL, NTPC, IOCL) for recruitment. With 30 subject papers, GATE covers a wide range of engineering and science disciplines.',
  },
  'clat': {
    title: 'CLAT',
    fullName: 'Common Law Admission Test',
    stream: 'Law',
    color: '#7A3AD5',
    conductedBy: 'Consortium of NLUs',
    mode: 'Computer Based Test (CBT)',
    frequency: 'Once a year (December)',
    duration: '2 Hours',
    totalMarks: '150',
    sections: ['English', 'Current Affairs & GK', 'Legal Reasoning', 'Logical Reasoning', 'Quantitative Techniques'],
    eligibility: [
      'For UG: Passed 12th with min 45% (40% for SC/ST)',
      'For PG: LLB degree with min 50%',
      'No age limit for appearing in CLAT',
      'No limit on attempts',
    ],
    importantDates: [
      { label: 'Registration Opens', date: 'August 2025' },
      { label: 'Last Date to Apply', date: 'October 2025' },
      { label: 'Exam Date', date: 'December 2025' },
      { label: 'Result', date: 'January 2026' },
      { label: 'Counselling', date: 'February 2026' },
    ],
    syllabus: [
      { subject: 'English Language', topics: ['Reading Comprehension', 'Grammar', 'Vocabulary', 'Sentence Correction'] },
      { subject: 'Legal Reasoning', topics: ['Legal Principles', 'Passages on Law', 'Constitutional Law Basics', 'Legal Awareness'] },
      { subject: 'Logical Reasoning', topics: ['Analogies', 'Series', 'Syllogisms', 'Critical Reasoning', 'Arguments'] },
    ],
    preparationTips: [
      'Read The Hindu and Indian Express daily for Current Affairs',
      'Legal Reasoning is passage-based — practice reading legal passages quickly',
      'Focus on comprehension skills rather than rote learning',
      'Solve CLAT previous papers to understand the pattern',
      'Start GK preparation 6 months before the exam',
      'Take weekly mock tests and maintain a current affairs notebook',
    ],
    topColleges: [
      'NLSIU Bangalore', 'NALSAR Hyderabad', 'NLU Delhi', 'WBNUJS Kolkata', 'NLU Jodhpur',
      'GNLU Gandhinagar', 'RMNLU Lucknow', 'HNLU Raipur', 'NUSRL Ranchi', 'NLIU Bhopal'
    ],
    description: 'CLAT is the unified national-level entrance examination for admission to undergraduate (UG) and postgraduate (PG) law programs at 22 National Law Universities (NLUs) across India. The exam is comprehension-based, testing a candidate\'s ability to read and analyze passages in English, Legal Reasoning, Logical Reasoning, and more.',
  },
  'nift': {
    title: 'NIFT',
    fullName: 'National Institute of Fashion Technology Entrance Exam',
    stream: 'Design',
    color: '#D55A30',
    conductedBy: 'NIFT',
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
    description: 'NIFT entrance exam is the gateway to India\'s most prestigious fashion and design institute — National Institute of Fashion Technology. The exam tests both creative and analytical abilities through a unique combination of Creative Ability Test (drawing/design), General Ability Test (aptitude), and Situation Test (hands-on 3D model making).',
  },
  'cuet-ug': {
    title: 'CUET UG',
    fullName: 'Common University Entrance Test (Undergraduate)',
    stream: 'General',
    color: '#0891b2',
    conductedBy: 'National Testing Agency (NTA)',
    mode: 'Computer Based Test (CBT)',
    frequency: 'Once a year',
    duration: '45 min per section (up to 3 hours 15 min)',
    totalMarks: 'Varies by combination',
    sections: ['Language', 'Domain-specific Subjects', 'General Test'],
    eligibility: [
      'Passed or appearing in Class 12th from any recognized board',
      'Eligibility criteria varies by university and program',
      'No age limit to appear for CUET',
      'No limit on attempts',
    ],
    importantDates: [
      { label: 'Registration Opens', date: 'February 2026' },
      { label: 'Last Date to Apply', date: 'March 2026' },
      { label: 'Exam Dates', date: 'May 2026' },
      { label: 'Result', date: 'June 2026' },
      { label: 'Counselling', date: 'July 2026' },
    ],
    syllabus: [
      { subject: 'Language Section', topics: ['Reading Comprehension', 'Vocabulary', 'Grammar', 'Literary Aptitude'] },
      { subject: 'Domain Subjects', topics: ['Based on Class 12 NCERT — 27 subjects available including Physics, Chemistry, Economics, History, etc.'] },
      { subject: 'General Test', topics: ['General Knowledge', 'Current Affairs', 'Quantitative Reasoning', 'Logical Reasoning', 'Numerical Ability'] },
    ],
    preparationTips: [
      'NCERT books are sufficient for domain subjects — read them thoroughly',
      'Practice reading comprehension for the language section daily',
      'Stay updated with current affairs for the General Test',
      'Choose your domain subjects wisely — pick your strongest Class 12 subjects',
      'Take NTA\'s official mock tests available on their website',
      'Focus on accuracy — there is negative marking',
    ],
    topColleges: [
      'Delhi University', 'JNU', 'BHU', 'Jamia Millia Islamia', 'Aligarh Muslim University',
      'Allahabad University', 'Tezpur University', 'Pondicherry University', 'Sikkim University', 'Central University of Kerala'
    ],
    description: 'CUET UG is a national-level entrance test for admission to undergraduate programs at all Central Universities, many State Universities, and several private universities across India. Introduced in 2022, it has standardized the admission process, replacing individual university entrance exams. With 14 lakh+ applicants, it is now one of the largest entrance exams in India.',
  },
}

export default function ExamBlogPage({ slug }: { slug: string }) {
  const exam = examDatabase[slug]

  if (!exam) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Exam Not Found</h1>
            <p className="text-slate-500 mb-8">We couldn't find information about this exam.</p>
            <Link href="/exams" className="text-sky-500 font-bold hover:underline">← Back to all exams</Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Banner */}
      <div
        className="pt-28 pb-16 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${exam.color}08 0%, ${exam.color}03 50%, white 100%)` }}
      >
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <Link href="/exams" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors mb-8 uppercase tracking-wider">
            <ArrowLeft size={14} /> All Exams
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
              style={{ background: `${exam.color}12`, color: exam.color, border: `1px solid ${exam.color}20` }}
            >
              {exam.stream}
            </span>
            <span className="text-xs text-slate-400 font-medium">|</span>
            <span className="text-xs text-slate-400 font-medium">Updated April 2026</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            {exam.title}
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
            {exam.fullName} — Complete guide with eligibility, syllabus, dates, and preparation strategy.
          </p>

          {/* Quick Stats */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Users, label: 'Conducted by', value: exam.conductedBy },
              { icon: Clock, label: 'Duration', value: exam.duration },
              { icon: Target, label: 'Total Marks', value: exam.totalMarks },
              { icon: BookOpen, label: 'Mode', value: exam.mode },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl p-4 border border-slate-100 bg-white/80 backdrop-blur-sm"
              >
                <stat.icon size={16} className="text-slate-400 mb-2" />
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</div>
                <div className="text-sm font-semibold text-slate-800 leading-tight">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16 w-full">

        {/* About */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">About {exam.title}</h2>
          <p className="text-slate-600 leading-relaxed text-[15px]">{exam.description}</p>
        </section>

        {/* Eligibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Eligibility Criteria</h2>
          <div className="space-y-3">
            {exam.eligibility.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Important Dates */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Important Dates</h2>
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            {exam.importantDates.map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-6 py-4 ${i !== exam.importantDates.length - 1 ? 'border-b border-slate-100' : ''} hover:bg-slate-50 transition-colors`}
              >
                <div className="flex items-center gap-3">
                  <Calendar size={14} style={{ color: exam.color }} />
                  <span className="text-sm font-medium text-slate-700">{item.label}</span>
                </div>
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: `${exam.color}10`, color: exam.color }}
                >
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Exam Pattern */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Exam Pattern & Syllabus</h2>
          <div className="space-y-6">
            {exam.syllabus.map((section, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 overflow-hidden">
                <div
                  className="px-6 py-4 font-bold text-sm"
                  style={{ background: `${exam.color}08`, color: exam.color, borderBottom: `1px solid ${exam.color}15` }}
                >
                  {section.subject}
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {section.topics.map((topic, j) => (
                      <span
                        key={j}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-100"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Preparation Tips */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Preparation Tips</h2>
          <div className="space-y-4">
            {exam.preparationTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: `${exam.color}10`, color: exam.color }}
                >
                  {i + 1}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed pt-1">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Top Colleges */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Top Colleges Accepting {exam.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {exam.topColleges.map((college, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-400 flex-shrink-0">
                  {i + 1}
                </div>
                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">{college}</span>
                <ChevronRight size={14} className="text-slate-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl p-10 text-center border border-slate-200 bg-gradient-to-br from-slate-50 to-white">
          <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Ready to start your {exam.title} journey?</h3>
          <p className="text-sm text-slate-500 mb-8 max-w-md mx-auto">
            Explore top colleges, compare programs, and find the best fit for your career goals.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/rankings"
              className="px-8 py-3.5 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 active:scale-[0.98]"
            >
              Explore Top Colleges
            </Link>
            <Link
              href="/exams"
              className="px-8 py-3.5 bg-white text-slate-700 rounded-2xl text-sm font-bold border border-slate-200 hover:border-slate-300 transition-all active:scale-[0.98]"
            >
              View All Exams
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
