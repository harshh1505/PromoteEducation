import React from 'react'
import Link from 'next/link'
import { ExamInfo } from '@/components/pages/exams/ExamBlogPage'

export const examDatabase: Record<string, ExamInfo> = {
  'jee-main': {
    slug: 'jee-main',
    title: 'JEE Main',
    fullName: 'Joint Entrance Examination Main',
    stream: 'Engineering',
    color: '#3A7BD5',
    conductedBy: <a href="https://nta.ac.in" target="_blank" rel="noopener noreferrer" className="hover:underline">National Testing Agency (NTA)</a>,
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
    description: <>JEE Main is the gateway to India's top engineering institutions including NITs, IIITs, and other government-funded technical institutions. It is also the qualifying exam for <Link href="/exams/jee-advanced" className="text-[#3A7BD5] font-medium hover:underline">JEE Advanced</Link>, which is required for admission to the Indian Institutes of Technology (IITs). Candidates also frequently appear for <Link href="/exams/bitsat" className="text-[#3A7BD5] font-medium hover:underline">BITSAT</Link> and <Link href="/exams/viteee" className="text-[#3A7BD5] font-medium hover:underline">VITEEE</Link> as strong alternatives.</>,
    relatedArticles: [
      { title: 'JEE Main 2026 Eligibility', href: '/articles/jee-main-eligibility' },
      { title: 'NTA Exam Pattern & Marking', href: '/articles/jee-main-pattern' },
      { title: 'Best Books for JEE Preparation', href: '/articles/best-jee-books' },
      { title: 'JEE Main vs Advanced', href: '/articles/jee-main-vs-advanced' },
      { title: 'Top NITs Admission Guide', href: '/articles/nit-admission-guide' },
      { title: '3-Month Revision Timetable', href: '/articles/jee-revision-plan' },
      { title: 'Scholarships for JEE Aspirants', href: '/articles/jee-scholarships' },
      { title: 'Common Mistakes to Avoid', href: '/articles/jee-mistakes' }
    ]
  },
  'jee-advanced': {
    slug: 'jee-advanced',
    title: 'JEE Advanced',
    fullName: 'Joint Entrance Examination Advanced',
    stream: 'Engineering',
    color: '#2563eb',
    conductedBy: <a href="https://jeeadv.ac.in" target="_blank" rel="noopener noreferrer" className="hover:underline">IITs (Rotational basis)</a>,
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
    description: <>JEE Advanced is considered one of the toughest entrance examinations in the world. It is the sole gateway for admission to all 23 Indian Institutes of Technology (IITs). Only the top 2,50,000 rank holders of <Link href="/exams/jee-main" className="text-[#2563eb] font-medium hover:underline">JEE Main</Link> are eligible to appear for this exam. The exam tests deep conceptual understanding and problem-solving abilities in Physics, Chemistry, and Mathematics.</>,
    relatedArticles: [
      { title: 'JEE Advanced 2026 Eligibility', href: '/articles/jee-advanced-eligibility-2026' },
      { title: 'Detailed PCM Syllabus', href: '/articles/jee-advanced-syllabus-2026' },
      { title: 'Exam Pattern & Marking', href: '/articles/jee-advanced-exam-pattern' },
      { title: 'Best Preparation Books', href: '/articles/best-books-jee-advanced' },
      { title: 'Preparation Strategy', href: '/articles/jee-advanced-preparation-strategy' },
      { title: 'JEE Main vs Advanced', href: '/articles/jee-main-vs-jee-advanced' },
      { title: 'Top IITs in India', href: '/articles/colleges-accepting-jee-advanced' },
      { title: 'IIT Seat Matrix 2026', href: '/articles/iit-seat-matrix' }
    ]
  },
  'neet-ug': {
    slug: 'neet-ug',
    title: 'NEET UG',
    fullName: 'National Eligibility cum Entrance Test (Undergraduate)',
    stream: 'Medical',
    color: '#1DB87A',
    conductedBy: <a href="https://nta.ac.in" target="_blank" rel="noopener noreferrer" className="hover:underline">National Testing Agency (NTA)</a>,
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
    description: <>NEET UG is the single national-level entrance examination for admission to MBBS, BDS, AYUSH, and nursing courses across India. With over 20 lakh applicants each year, it is one of the most competitive exams in the country. Candidates also look at <Link href="/exams/ini-cet" className="text-[#1DB87A] font-medium hover:underline">INI CET</Link> for top-tier PG prospects. The exam is conducted in offline mode (pen and paper) with 200 questions from Physics, Chemistry, and Biology.</>,
    relatedArticles: [
      { title: 'NEET 2026 Eligibility Criteria', href: '/articles/neet-eligibility-2026' },
      { title: 'Detailed PCB Syllabus', href: '/articles/neet-syllabus-2026' },
      { title: 'Exam Pattern & Marking', href: '/articles/neet-exam-pattern' },
      { title: 'Best Preparation Books', href: '/articles/best-books-neet' },
      { title: 'Preparation Strategy', href: '/articles/neet-preparation-strategy' },
      { title: 'NEET vs AIIMS vs JIPMER', href: '/articles/neet-vs-aiims-jipmer' },
      { title: 'Top Medical Colleges', href: '/articles/colleges-accepting-neet' },
      { title: 'States with Lowest Cutoffs', href: '/articles/neet-low-cutoff-states' }
    ]
  },
  'cat': {
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
    description: <>CAT is the most prestigious management entrance exam in India, conducted by the IIMs. It is the primary gateway to 20+ IIMs and over 1,200 B-schools. Many top aspirants also appear for <Link href="/exams/xat" className="text-[#8B6A1F] font-bold hover:underline">XAT</Link> and <Link href="/exams/snap" className="text-[#8B6A1F] font-bold hover:underline">SNAP</Link> to maximize their chances at top-tier MBA programs.</>,
    relatedArticles: [
      { title: 'CAT 2026 Eligibility Criteria', href: '/articles/cat-eligibility-2026' },
      { title: 'Detailed Sectional Syllabus', href: '/articles/cat-syllabus-2026' },
      { title: 'Exam Pattern & Marking', href: '/articles/cat-exam-pattern' },
      { title: 'Best Preparation Books', href: '/articles/best-books-cat' },
      { title: 'Preparation Strategy', href: '/articles/cat-preparation-strategy' },
      { title: 'CAT vs XAT vs GMAT', href: '/articles/cat-vs-xat-gmat' },
      { title: 'Top MBA Colleges', href: '/articles/colleges-accepting-cat' },
      { title: 'Salary Packages after IIMs', href: '/articles/iim-placements' }
    ]
  },
  'gate': {
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
    description: <>GATE is a national-level examination for admission to M.Tech/M.E./PhD programs in IITs, IISc, and NITs. GATE scores are also used by many PSUs for recruitment. It serves as a natural progression for students who have cleared <Link href="/exams/jee-main" className="text-[#6d28d9] font-bold hover:underline">JEE Main</Link> or <Link href="/exams/bitsat" className="text-[#6d28d9] font-bold hover:underline">BITSAT</Link> in their undergraduate years.</>,
    relatedArticles: [
      { title: 'GATE 2026 Eligibility Criteria', href: '/articles/gate-eligibility-2026' },
      { title: 'Detailed Branch Syllabus', href: '/articles/gate-syllabus-2026' },
      { title: 'Exam Pattern & Marking', href: '/articles/gate-exam-pattern' },
      { title: 'Best Preparation Books', href: '/articles/best-books-gate' },
      { title: 'Preparation Strategy', href: '/articles/gate-preparation-strategy' },
      { title: 'GATE vs ESE vs CAT', href: '/articles/gate-vs-ese-cat' },
      { title: 'Top Colleges for M.Tech', href: '/articles/colleges-accepting-gate' },
      { title: 'PSU Recruitment through GATE', href: '/articles/psu-recruitment' }
    ]
  },
  'clat': {
    slug: 'clat',
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
    description: <>Common Law Admission Test (CLAT) is the unified national-level entrance examination for admission to 22 National Law Universities (NLUs) across India. Students also frequently target <Link href="/exams/ailet" className="text-[#7A3AD5] font-bold hover:underline">AILET</Link> for NLU Delhi and <Link href="/exams/lsat-india" className="text-[#7A3AD5] font-bold hover:underline">LSAT India</Link> for private law schools.</>,
    relatedArticles: [
      { title: 'CLAT 2026 Eligibility Criteria', href: '/articles/clat-eligibility-2026' },
      { title: 'Detailed Sectional Syllabus', href: '/articles/clat-syllabus-2026' },
      { title: 'Exam Pattern & Marking', href: '/articles/clat-exam-pattern' },
      { title: 'Best Preparation Books', href: '/articles/best-books-clat' },
      { title: 'Preparation Strategy', href: '/articles/clat-preparation-strategy' },
      { title: 'CLAT vs AILET vs LSAT', href: '/articles/clat-vs-ailet-lsat' },
      { title: 'Top NLUs in India', href: '/articles/colleges-accepting-clat' },
      { title: 'NLU Fee Structure Guide', href: '/articles/nlu-fees' }
    ]
  },
  'nift': {
    slug: 'nift',
    title: 'NIFT',
    fullName: 'National Institute of Fashion Technology Entrance Exam',
    stream: 'Design',
    color: '#D55A30',
    conductedBy: <a href="https://nift.ac.in" target="_blank" rel="noopener noreferrer" className="hover:underline">NIFT Official</a>,
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
    description: <>NIFT entrance exam is the gateway to India's most prestigious fashion and design institute. Many creative aspirants also appear for <Link href="/exams/uceed" className="text-[#D55A30] font-bold hover:underline">UCEED</Link> (for IIT Bombay/Guwahati) and <Link href="/exams/nid-dat" className="text-[#D55A30] font-bold hover:underline">NID DAT</Link> to expand their design career options.</>,
    relatedArticles: [
      { title: 'NIFT 2026 Eligibility Criteria', href: '/articles/nift-eligibility-2026' },
      { title: 'Detailed CAT & GAT Syllabus', href: '/articles/nift-syllabus-2026' },
      { title: 'Exam Pattern & Selection', href: '/articles/nift-exam-pattern' },
      { title: 'Best Preparation Books', href: '/articles/best-books-nift' },
      { title: 'Preparation Strategy', href: '/articles/nift-preparation-strategy' },
      { title: 'NIFT vs NID vs UCEED', href: '/articles/nift-vs-nid-uceed' },
      { title: 'Top NIFT Campuses', href: '/articles/colleges-accepting-nift' },
      { title: 'Portfolio Preparation Tips', href: '/articles/nift-portfolio-guide' }
    ]
  },
  'cuet-ug': {
    slug: 'cuet-ug',
    title: 'CUET UG',
    fullName: 'Common University Entrance Test (Undergraduate)',
    stream: 'General',
    color: '#0891b2',
    conductedBy: <a href="https://nta.ac.in" target="_blank" rel="noopener noreferrer" className="hover:underline">National Testing Agency (NTA)</a>,
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
    description: <>CUET UG is a national-level entrance test for admission to undergraduate programs at all Central Universities and many State Universities. It has standardized the admission process, replacing individual university tests. Candidates often look at <Link href="/exams/jee-main" className="text-[#0891b2] font-bold hover:underline">JEE Main</Link> or <Link href="/exams/neet-ug" className="text-[#0891b2] font-bold hover:underline">NEET UG</Link> for professional course options.</>,
    relatedArticles: [
      { title: 'CUET UG 2026 Eligibility', href: '/articles/cuet-ug-eligibility-2026' },
      { title: 'Full Syllabus Breakdown', href: '/articles/cuet-ug-syllabus-2026' },
      { title: 'Exam Pattern & Marking', href: '/articles/cuet-ug-exam-pattern' },
      { title: 'Best Preparation Books', href: '/articles/best-books-cuet-ug' },
      { title: 'Preparation Strategy', href: '/articles/cuet-ug-preparation-strategy' },
      { title: 'CUET vs JEE vs NEET', href: '/articles/cuet-ug-vs-jee-neet' },
      { title: 'Top CUET Universities', href: '/articles/colleges-accepting-cuet-ug' },
      { title: 'Domain Selection Guide', href: '/articles/cuet-domain-guide' }
    ]
  },
  'ini-cet': {
    slug: 'ini-cet',
    title: 'INI CET',
    fullName: 'Institute of National Importance Combined Entrance Test',
    stream: 'Medical',
    color: '#10b981',
    conductedBy: <a href="https://aiimsexams.ac.in" target="_blank" rel="noopener noreferrer" className="hover:underline">AIIMS New Delhi</a>,
    mode: 'Computer Based Test (CBT)',
    frequency: 'Twice a year (Jan & July)',
    duration: '3 Hours',
    totalMarks: '200',
    sections: ['Pre-clinical', 'Para-clinical', 'Clinical Subjects'],
    eligibility: [
      'MBBS degree from a recognized university',
      'Completed 1 year of compulsory rotating internship',
      'Minimum 55% for Gen/OBC/EWS (50% for SC/ST)'
    ],
    importantDates: [
      { label: 'Jan Session Registration', date: 'September 2025' },
      { label: 'Jan Session Exam', date: 'November 2025' },
      { label: 'July Session Exam', date: 'May 2026' }
    ],
    syllabus: [
      { subject: 'Pre-clinical', topics: ['Anatomy', 'Physiology', 'Biochemistry'] },
      { subject: 'Para-clinical', topics: ['Pathology', 'Microbiology', 'Pharmacology', 'Forensic Medicine', 'Community Medicine'] },
      { subject: 'Clinical', topics: ['Medicine', 'Surgery', 'OBG', 'Pediatrics', 'Ophthalmology', 'ENT', 'Orthopedics', 'Dermatology', 'Psychiatry', 'Radiology'] }
    ],
    preparationTips: [
      'Focus on image-based questions — they carry high weightage in INI CET',
      'Revise Pre-clinical subjects thoroughly during the first 3 months',
      'Take subject-wise tests to identify weak clinical areas',
      'Solve previous 5 years of AIIMS PG and JIPMER papers',
      'Last 15 days should be dedicated only to revision and mock tests'
    ],
    topColleges: ['AIIMS New Delhi', 'JIPMER Puducherry', 'PGIMER Chandigarh', 'NIMHANS Bangalore', 'SCTIMST Trivandrum'],
    description: <>INI CET is the common entrance for PG courses (MD/MS/M.Ch/DM) at Institutes of National Importance. It is considered tougher than <Link href="/exams/neet-pg" className="text-emerald-600 font-bold hover:underline">NEET PG</Link> due to its focus on clinical reasoning and research-based questions.</>,
    relatedArticles: [
      { title: 'INI CET 2026 Eligibility', href: '/articles/ini-cet-eligibility' },
      { title: 'AIIMS PG Seat Intake', href: '/articles/aiims-pg-seats' },
      { title: 'INI CET vs NEET PG', href: '/articles/ini-cet-vs-neet-pg' },
      { title: 'Best Coaching for INI CET', href: '/articles/best-pg-coaching' },
      { title: 'INI CET Syllabus PDF', href: '/articles/ini-cet-syllabus' },
      { title: 'Last Minute Revision Tips', href: '/articles/ini-cet-revision' },
      { title: 'Post-PG Salary Guide', href: '/articles/doctor-salaries' },
      { title: 'Top Clinical Branches', href: '/articles/pg-medical-branches' }
    ]
  },
  'ini-ss': {
    slug: 'ini-ss',
    title: 'INI SS',
    fullName: 'INI Super-Specialty Entrance Test',
    stream: 'Medical',
    color: '#059669',
    conductedBy: <a href="https://aiimsexams.ac.in" target="_blank" rel="noopener noreferrer" className="hover:underline">AIIMS New Delhi</a>,
    mode: 'Computer Based Test (CBT)',
    frequency: 'Twice a year',
    duration: '90 Minutes',
    totalMarks: '80',
    sections: ['Subject-specific (DM/M.Ch/MD Hospital Admin)'],
    eligibility: [
      'MD/MS degree from a recognized university',
      'Completed required residency by cutoff date',
      'Age limit: 35 years (Relaxation for SC/ST)'
    ],
    importantDates: [
      { label: 'Jan Session Exam', date: 'October 2025' },
      { label: 'July Session Exam', date: 'April 2026' }
    ],
    syllabus: [
      { subject: 'Medical/Surgical', topics: ['Core specialty subjects', 'Recent advances', 'Clinical cases', 'Imaging in SS'] }
    ],
    preparationTips: [
      'Focus on recent advances in your specialty',
      'Solve previous AIIMS SS and NEET SS papers',
      'Standard textbooks like Harrison/Bailey & Love are essential'
    ],
    topColleges: ['AIIMS New Delhi', 'PGIMER Chandigarh', 'JIPMER Puducherry'],
    description: <>INI SS is the entrance for DM, M.Ch, and MD Hospital Administration at Institutes of National Importance. It is the pinnacle of medical specialization in India.</>,
    relatedArticles: [
      { title: 'INI SS 2026 Eligibility', href: '/articles/ini-ss-eligibility' },
      { title: 'DM vs M.Ch: Which to choose?', href: '/articles/dm-vs-mch' },
      { title: 'INI SS Seat Matrix', href: '/articles/ini-ss-seats' },
      { title: 'Preparation Tips for SS', href: '/articles/ini-ss-prep' },
      { title: 'Top Super-specialty Centers', href: '/articles/top-ss-colleges' },
      { title: 'Life as a Senior Resident', href: '/articles/sr-life' },
      { title: 'Salary during DM/M.Ch', href: '/articles/ss-stipend' },
      { title: 'Recent Advances in Medicine', href: '/articles/medical-advances' }
    ]
  },
  'aiims-entrance': {
    slug: 'aiims-entrance',
    title: 'AIIMS Nursing',
    fullName: 'AIIMS B.Sc & M.Sc Nursing Entrance',
    stream: 'Medical',
    color: '#10b981',
    conductedBy: <a href="https://aiimsexams.ac.in" target="_blank" rel="noopener noreferrer" className="hover:underline">AIIMS New Delhi</a>,
    mode: 'Computer Based Test (CBT)',
    frequency: 'Once a year (June)',
    duration: '2 Hours',
    totalMarks: '100',
    sections: ['Physics', 'Chemistry', 'Biology', 'General Knowledge'],
    eligibility: [
      'Passed 12th with PCB with 55% aggregate (50% for SC/ST)',
      'Only female candidates for B.Sc (Hons) Nursing',
      'Minimum age: 17 years'
    ],
    importantDates: [
      { label: 'Basic Registration', date: 'March 2026' },
      { label: 'Final Registration', date: 'April 2026' },
      { label: 'Exam Date', date: 'June 2026' }
    ],
    syllabus: [
      { subject: 'Biology', topics: ['Cell Theory', 'Genetics', 'Human Physiology', 'Plant Physiology', 'Ecology'] },
      { subject: 'GK', topics: ['Current Affairs', 'General Policy', 'Scientific Research'] }
    ],
    preparationTips: [
      'Focus on NCERT Biology for 80% of the paper',
      'Practice basic Physics and Chemistry concepts from Class 11 & 12',
      'Don\'t ignore GK — it can be a rank booster',
      'Take AIIMS Nursing specific mock tests'
    ],
    topColleges: ['AIIMS New Delhi', 'AIIMS Rishikesh', 'AIIMS Jodhpur', 'AIIMS Bhubaneswar', 'AIIMS Kalyani'],
    description: <>AIIMS Nursing Entrance is the gateway to the prestigious nursing programs at various AIIMS institutes. It is widely considered the best nursing education in India.</>,
    relatedArticles: [
      { title: 'AIIMS Nursing 2026 Eligibility', href: '/articles/aiims-nursing-eligibility' },
      { title: 'How to register for AIIMS Nursing', href: '/articles/aiims-nursing-registration' },
      { title: 'AIIMS B.Sc Nursing Syllabus', href: '/articles/aiims-nursing-syllabus' },
      { title: 'Seat Matrix across all AIIMS', href: '/articles/aiims-nursing-seats' },
      { title: 'Best Books for Nursing Prep', href: '/articles/nursing-entrance-books' },
      { title: 'Career after B.Sc Nursing', href: '/articles/nursing-career' },
      { title: 'AIIMS Nursing Cutoffs 2025', href: '/articles/nursing-cutoff' },
      { title: 'Hostel Facilities at AIIMS', href: '/articles/aiims-hostel-life' }
    ]
  },
  'xat': {
    slug: 'xat',
    title: 'XAT',
    fullName: 'Xavier Aptitude Test',
    stream: 'Management',
    color: '#d97706',
    conductedBy: <a href="https://xatonline.in" target="_blank" rel="noopener noreferrer" className="hover:underline">XLRI Jamshedpur</a>,
    mode: 'Computer Based Test (CBT)',
    frequency: 'Once a year (January)',
    duration: '3 Hours 10 Minutes',
    totalMarks: '100',
    sections: ['Decision Making', 'VARC', 'Quant & DI', 'GK', 'Essay Writing'],
    eligibility: [
      'Bachelor\'s degree in any discipline',
      'Final year students are eligible to apply',
      'No specific minimum percentage required for XAT application'
    ],
    importantDates: [
      { label: 'Registration Opens', date: 'July 2025' },
      { label: 'Last Date to Apply', date: 'November 2025' },
      { label: 'Exam Date', date: 'January 2026' }
    ],
    syllabus: [
      { subject: 'Decision Making', topics: ['Ethical Dilemmas', 'Business Decisions', 'Financial Decisions', 'Scenario Analysis'] },
      { subject: 'VARC', topics: ['Reading Comprehension', 'Poetry', 'Vocabulary', 'Critical Reasoning'] },
      { subject: 'Quant & DI', topics: ['Arithmetic', 'Algebra', 'Number System', 'Data Interpretation'] }
    ],
    preparationTips: [
      'Decision Making is the differentiator in XAT — practice it daily',
      'XAT Quant is known to be tougher than CAT — focus on high-level algebra',
      'Read complex philosophical passages to improve VARC score',
      'Don\'t ignore GK — while not used for percentile, it matters in interviews',
      'Practice essay writing on current socioeconomic topics'
    ],
    topColleges: ['XLRI Jamshedpur', 'SPJIMR Mumbai', 'IMT Ghaziabad', 'XIMB Bhubaneswar', 'GIM Goa', 'TAPMI Manipal'],
    description: <>XAT is one of the oldest and most respected management entrance exams in India. Conducted by XLRI for over 70 years, it is the primary gateway to XLRI and 160+ other B-schools. It is often considered a great alternative to <Link href="/exams/cat" className="text-amber-600 font-bold hover:underline">CAT</Link>.</>,
    relatedArticles: [
      { title: 'XAT 2026 Eligibility Guide', href: '/articles/xat-eligibility' },
      { title: 'Decision Making Strategy', href: '/articles/xat-decision-making' },
      { title: 'XLRI Cutoff Trends', href: '/articles/xlri-cutoff' },
      { title: 'XAT vs CAT Comparison', href: '/articles/xat-vs-cat' },
      { title: 'XAT Selection Process', href: '/articles/xat-selection' },
      { title: 'How to Write XAT Essay', href: '/articles/xat-essay-guide' },
      { title: 'Top B-Schools accepting XAT', href: '/articles/xat-colleges' },
      { title: 'XAT Preparation Timetable', href: '/articles/xat-prep-plan' }
    ]
  },
  'bitsat': {
    slug: 'bitsat',
    title: 'BITSAT',
    fullName: 'BITS Admission Test',
    stream: 'Engineering',
    color: '#0ea5e9',
    conductedBy: <a href="https://bitsadmission.com" target="_blank" rel="noopener noreferrer" className="hover:underline">BITS Pilani</a>,
    mode: 'Computer Based Test (CBT)',
    frequency: 'Twice a year (May & June)',
    duration: '3 Hours',
    totalMarks: '390',
    sections: ['Physics', 'Chemistry', 'English & LR', 'Mathematics/Biology'],
    eligibility: [
      'Passed 12th with PCM/PCB with 75% aggregate',
      'Minimum 60% in each subject (P, C, M/B)',
      'Direct admission for board toppers'
    ],
    importantDates: [
      { label: 'Session 1 Exam', date: 'May 2026' },
      { label: 'Session 2 Exam', date: 'June 2026' },
      { label: 'Counselling Starts', date: 'July 2026' }
    ],
    syllabus: [
      { subject: 'English & LR', topics: ['Grammar', 'Vocabulary', 'Analogies', 'Logical Deduction', 'Reading Comprehension'] },
      { subject: 'Physics', topics: ['Units & Measurement', 'Kinematics', 'Newton\'s Laws', 'Work & Energy', 'Thermodynamics'] },
      { subject: 'Chemistry', topics: ['States of Matter', 'Atomic Structure', 'Chemical Bonding', 'Thermodynamics', 'Organic Chemistry'] }
    ],
    preparationTips: [
      'BITSAT is a speed test — you have 180 minutes for 130 questions',
      'English and Logical Reasoning are high-scoring — don\'t neglect them',
      'Accuracy is critical as BITSAT has negative marking (-1)',
      'Take at least 20-30 mock tests simulating the actual exam platform',
      'Master the concept of "Bonus Questions" if you finish early'
    ],
    topColleges: ['BITS Pilani', 'BITS Goa', 'BITS Hyderabad'],
    description: <>BITSAT is the exclusive entrance test for admission to the prestigious Birla Institute of Technology and Science (BITS). Many students take BITSAT as their primary alternative to <Link href="/exams/jee-main" className="text-sky-600 font-bold hover:underline">JEE Main</Link>.</>,
    relatedArticles: [
      { title: 'BITSAT 2026 Eligibility', href: '/articles/bitsat-eligibility' },
      { title: 'BITS Pilani Cutoff Trends', href: '/articles/bits-pilani-cutoff' },
      { title: 'English & LR Prep Guide', href: '/articles/bitsat-english-lr' },
      { title: 'BITSAT vs JEE Main', href: '/articles/bitsat-vs-jee' },
      { title: 'The Bonus Question Strategy', href: '/articles/bitsat-bonus-questions' },
      { title: 'Campus Life at Pilani', href: '/articles/bits-pilani-life' },
      { title: 'Direct Admission for Toppers', href: '/articles/bits-direct-admission' },
      { title: 'BITSAT 30-Day Crash Course', href: '/articles/bitsat-crash-course' }
    ]
  },
  'neet-pg': {
    slug: 'neet-pg',
    title: 'NEET PG',
    fullName: 'National Eligibility cum Entrance Test (Postgraduate)',
    stream: 'Medical',
    color: '#059669',
    conductedBy: <a href="https://natboard.edu.in" target="_blank" rel="noopener noreferrer" className="hover:underline">National Board of Examinations (NBE)</a>,
    mode: 'Computer Based Test (CBT)',
    frequency: 'Once a year (June)',
    duration: '3 Hours 30 Minutes',
    totalMarks: '800',
    sections: ['Pre-clinical', 'Para-clinical', 'Clinical Subjects'],
    eligibility: [
      'MBBS degree or Provisional MBBS Pass Certificate',
      'Permanent or provisional registration with NMC/SMC',
      'Completed 1 year of internship by the cutoff date'
    ],
    importantDates: [
      { label: 'Registration Opens', date: 'April 2026' },
      { label: 'Exam Date', date: 'June 2026' },
      { label: 'Result', date: 'July 2026' },
      { label: 'Counselling Begins', date: 'August 2026' }
    ],
    syllabus: [
      { subject: 'Part A', topics: ['Anatomy', 'Physiology', 'Biochemistry'] },
      { subject: 'Part B', topics: ['Pathology', 'Microbiology', 'Pharmacology', 'Forensic Medicine', 'Social and Preventive Medicine'] },
      { subject: 'Part C', topics: ['Medicine', 'Surgery', 'OBG', 'Pediatrics', 'Ophthalmology', 'ENT', 'Orthopedics', 'Psychiatry', 'Radiology', 'Dermatology'] }
    ],
    preparationTips: [
      'NEET PG is vast — start subject-wise revision at least 1 year before the exam',
      'Focus on high-yield topics from Marrow or Prepladder',
      'Practice at least 150-200 MCQs daily during the final 6 months',
      'Take Grand Tests (GTs) every 15 days to track your improvement',
      'Last 2 months should be focused exclusively on your "weak" subjects and GT analysis'
    ],
    topColleges: ['MAMC Delhi', 'VMMC Delhi', 'KGMU Lucknow', 'BJMC Ahmedabad', 'BMC Bangalore', 'MMC Chennai'],
    description: <>NEET PG is the single entrance examination for admission to MD/MS and PG Diploma courses in India. It covers all medical colleges except <Link href="/exams/ini-cet" className="text-emerald-600 font-bold hover:underline">INI CET</Link> institutes.</>,
    relatedArticles: [
      { title: 'NEET PG 2026 Eligibility', href: '/articles/neet-pg-eligibility' },
      { title: 'Expected Cutoffs 2026', href: '/articles/neet-pg-cutoff' },
      { title: 'NEET PG Syllabus PDF', href: '/articles/neet-pg-syllabus' },
      { title: 'Top Residency Programs', href: '/articles/top-md-ms-colleges' },
      { title: 'NEET PG vs USMLE', href: '/articles/neet-pg-vs-usmle' },
      { title: 'How to solve Clinical MCQs', href: '/articles/clinical-mcq-tips' },
      { title: 'Salary during Residency', href: '/articles/stipend-guide' },
      { title: 'Best Mobile Apps for PG Prep', href: '/articles/pg-prep-apps' }
    ]
  },
  'srmjeee': {
    slug: 'srmjeee',
    title: 'SRMJEEE',
    fullName: 'SRM Joint Engineering Entrance Examination',
    stream: 'Engineering',
    color: '#0ea5e9',
    conductedBy: <a href="https://srmist.edu.in" target="_blank" rel="noopener noreferrer" className="hover:underline">SRM Institute of Science and Technology</a>,
    mode: 'Remote Proctored Online Mode',
    frequency: 'Three phases (April-June)',
    duration: '2 Hours 30 Minutes',
    totalMarks: '125',
    sections: ['Physics', 'Chemistry', 'Maths/Biology', 'English', 'Aptitude'],
    eligibility: [
      'Passed 12th with PCM/PCB with 50% aggregate',
      'Minimum age: 17 years',
      'Direct admission for board toppers of selected boards'
    ],
    importantDates: [
      { label: 'Phase 1 Exam', date: 'April 2026' },
      { label: 'Phase 2 Exam', date: 'June 2026' }
    ],
    syllabus: [
      { subject: 'Maths', topics: ['Sets, Relations and Functions', 'Complex Numbers', 'Matrices and Determinants', 'Calculus'] },
      { subject: 'Physics', topics: ['Units and Measurement', 'Mechanics', 'Gravitation', 'Thermodynamics', 'Electricity'] }
    ],
    preparationTips: [
      'SRMJEEE is often conducted in remote proctored mode — ensure a stable internet connection',
      'The difficulty level is similar to JEE Main — focus on fundamentals',
      'Aptitude and English sections are easy scoring opportunities',
      'Take official SRM mock tests to understand the interface'
    ],
    topColleges: ['SRM Kattankulathur', 'SRM Ramapuram', 'SRM Vadapalani', 'SRM NCR Delhi'],
    description: <>SRMJEEE is the common entrance for admission to B.Tech programs in all campuses of SRMIST. It is a popular alternative for students also appearing for <Link href="/exams/viteee" className="text-sky-600 font-bold hover:underline">VITEEE</Link> and <Link href="/exams/jee-main" className="text-sky-600 font-bold hover:underline">JEE Main</Link>.</>,
    relatedArticles: [
      { title: 'SRMJEEE 2026 Eligibility', href: '/articles/srmjeee-eligibility' },
      { title: 'Campus Comparison: KTR vs Ramapuram', href: '/articles/srm-campus-comparison' },
      { title: 'SRM Placement Stats 2025', href: '/articles/srm-placements' },
      { title: 'Remote Proctored Exam Rules', href: '/articles/srmjeee-remote-proctoring' }
    ]
  },
  'mh-cet-law': {
    slug: 'mh-cet-law',
    title: 'MH CET Law',
    fullName: 'Maharashtra Common Entrance Test for Law',
    stream: 'Law',
    color: '#7c3aed',
    conductedBy: <a href="https://cetcell.mahacet.org" target="_blank" rel="noopener noreferrer" className="hover:underline">State CET Cell, Maharashtra</a>,
    mode: 'Computer Based Test (CBT)',
    frequency: 'Once a year (March-May)',
    duration: '2 Hours',
    totalMarks: '150',
    sections: ['Legal Aptitude', 'General Knowledge', 'Logical Reasoning', 'English', 'Maths'],
    eligibility: [
      'Passed 12th with 45% aggregate (40% for SC/ST)',
      'No upper age limit for 5-year LLB'
    ],
    importantDates: [
      { label: 'Registration Opens', date: 'January 2026' },
      { label: 'Exam Date', date: 'April 2026' }
    ],
    syllabus: [
      { subject: 'Legal Aptitude', topics: ['Legal Reasoning', 'Law of Torts', 'Contracts', 'Constitution'] },
      { subject: 'General Knowledge', topics: ['Current Affairs', 'History', 'Geography', 'Science'] }
    ],
    preparationTips: [
      'Focus on legal principles and reasoning',
      'Daily current affairs reading is essential',
      'Practice past year papers for pattern analysis'
    ],
    topColleges: ['GLC Mumbai', 'ILS Law College Pune', 'Government Law College'],
    description: <>MH CET Law is the primary gateway for admission to 5-year and 3-year LLB courses in Maharashtra. Many candidates also consider <Link href="/exams/clat" className="text-violet-600 font-bold hover:underline">CLAT</Link> for national-level law seats.</>,
    relatedArticles: [
      { title: 'MH CET Law 2026 Eligibility', href: '/articles/mh-cet-law-eligibility' },
      { title: 'Top Law Colleges in Maharashtra', href: '/articles/top-law-colleges-mh' },
      { title: 'Preparation Tips for Legal Aptitude', href: '/articles/legal-aptitude-guide' },
      { title: 'MH CET vs CLAT Comparison', href: '/articles/mh-cet-vs-clat' }
    ]
  },
  'nid-dat': {
    slug: 'nid-dat',
    title: 'NID DAT',
    fullName: 'NID Design Aptitude Test',
    stream: 'Design',
    color: '#db2777',
    conductedBy: <a href="https://admissions.nid.edu" target="_blank" rel="noopener noreferrer" className="hover:underline">National Institute of Design</a>,
    mode: 'Pen and Paper (OMR)',
    frequency: 'Once a year (January)',
    duration: '3 Hours',
    totalMarks: '100',
    sections: ['Creative Ability', 'General Ability'],
    eligibility: [
      'Passed 12th in any stream',
      'Age limit: 20 years for General category'
    ],
    importantDates: [
      { label: 'Registration Opens', date: 'October 2025' },
      { label: 'Prelims Exam', date: 'January 2026' }
    ],
    syllabus: [
      { subject: 'Creative Ability', topics: ['Sketching', 'Visualization', 'Color Theory', 'Design Principles'] },
      { subject: 'General Ability', topics: ['General Knowledge', 'English', 'Logical Reasoning'] }
    ],
    preparationTips: [
      'Practice sketching and observation skills daily',
      'Focus on creative problem solving',
      'Prepare for the Studio Test after clearing Prelims'
    ],
    topColleges: ['NID Ahmedabad', 'NID Bangalore', 'NID Gandhinagar'],
    description: <>NID DAT is the premier design entrance in India. For creative students, it is often a top priority alongside <Link href="/exams/uceed" className="text-pink-600 font-bold hover:underline">UCEED</Link>.</>,
    relatedArticles: [
      { title: 'NID DAT 2026 Eligibility', href: '/articles/nid-dat-eligibility' },
      { title: 'Portfolio Preparation Tips', href: '/articles/design-portfolio-guide' },
      { title: 'NID vs UCEED Comparison', href: '/articles/nid-vs-uceed' },
      { title: 'Life at NID', href: '/articles/life-at-nid' }
    ]
  },
  'comedk': {
    slug: 'comedk',
    title: 'COMEDK',
    fullName: 'Consortium of Medical, Engineering and Dental Colleges of Karnataka',
    stream: 'Engineering',
    color: '#059669',
    conductedBy: <a href="https://www.comedk.org" target="_blank" rel="noopener noreferrer" className="hover:underline">COMEDK Board</a>,
    mode: 'Computer Based Test (CBT)',
    frequency: 'Once a year (May)',
    duration: '3 Hours',
    totalMarks: '180',
    sections: ['Physics', 'Chemistry', 'Mathematics'],
    eligibility: [
      'Passed 12th with PCM with 45% aggregate',
      'Valid identity proof'
    ],
    importantDates: [
      { label: 'Registration Opens', date: 'February 2026' },
      { label: 'Exam Date', date: 'May 2026' }
    ],
    syllabus: [
      { subject: 'Physics', topics: ['Mechanics', 'Waves', 'Optics', 'Electricity'] },
      { subject: 'Chemistry', topics: ['Physical', 'Organic', 'Inorganic Chemistry'] },
      { subject: 'Mathematics', topics: ['Calculus', 'Algebra', 'Trigonometry'] }
    ],
    preparationTips: [
      'Focus on speed as there are 180 questions',
      'Practice previous years papers thoroughly',
      'Maintain accuracy as there is no negative marking'
    ],
    topColleges: ['RV College of Engineering', 'BMS College of Engineering', 'MS Ramaiah Institute of Technology'],
    description: <>COMEDK UGET is a national entrance test for B.Tech admission in private engineering colleges in Karnataka. Many students view it as a safety net alongside <Link href="/exams/jee-main" className="text-emerald-600 font-bold hover:underline">JEE Main</Link>.</>,
    relatedArticles: [
      { title: 'COMEDK 2026 Eligibility', href: '/articles/comedk-eligibility' },
      { title: 'Top Engineering Colleges in Bangalore', href: '/articles/top-blr-colleges' },
      { title: 'COMEDK vs JEE Main', href: '/articles/comedk-vs-jee' },
      { title: 'Preparation Tips for COMEDK', href: '/articles/comedk-prep-guide' }
    ]
  },
  'viteee': {
    slug: 'viteee',
    title: 'VITEEE',
    fullName: 'VIT Engineering Entrance Examination',
    stream: 'Engineering',
    color: '#0ea5e9',
    conductedBy: <a href="https://vit.ac.in" target="_blank" rel="noopener noreferrer" className="hover:underline">Vellore Institute of Technology</a>,
    mode: 'Computer Based Test (CBT)',
    frequency: 'Once a year (April)',
    duration: '2 Hours 30 Minutes',
    totalMarks: '125',
    sections: ['Maths/Biology', 'Physics', 'Chemistry', 'English', 'Aptitude'],
    eligibility: [
      'Passed 12th with PCM/PCB with 60% aggregate (50% for SC/ST)',
      'Born on or after July 1, 2004',
      'PIO/OCI candidates are also eligible'
    ],
    importantDates: [
      { label: 'Registration Opens', date: 'November 2025' },
      { label: 'Exam Window', date: 'April 2026' },
      { label: 'Result', date: 'May 2026' }
    ],
    syllabus: [
      { subject: 'Physics', topics: ['Laws of Motion', 'Work, Energy and Power', 'Properties of Matter', 'Electrostatics', 'Current Electricity', 'Magnetic Effects'] },
      { subject: 'Chemistry', topics: ['Atomic Structure', 'p,d and f Block Elements', 'Coordination Chemistry', 'Solid State', 'Thermodynamics', 'Organic Compounds'] },
      { subject: 'Mathematics', topics: ['Matrices and Determinants', 'Complex Numbers', 'Analytical Geometry', 'Vector Algebra', 'Differential Calculus', 'Integral Calculus'] }
    ],
    preparationTips: [
      'VITEEE doesn\'t have negative marking — attempt all questions',
      'Focus on speed as you need to solve 125 questions in 150 minutes',
      'Master the basic English and Aptitude section — it\'s 15 easy marks',
      'Practice mock tests specifically designed for VITEEE pattern',
      'Revise Class 11 and 12 NCERT thoroughly'
    ],
    topColleges: ['VIT Vellore', 'VIT Chennai', 'VIT Bhopal', 'VIT Andhra Pradesh'],
    description: 'VITEEE is a national-level engineering entrance exam conducted by VIT for admission to its undergraduate engineering programs (B.Tech). It is highly popular due to VIT\'s consistent placement record and world-class infrastructure. Many students also target BITSAT and WBJEE alongside this exam.',
    relatedArticles: [
      { title: 'VITEEE 2026 Eligibility', href: '/articles/viteee-eligibility' },
      { title: 'Campus Comparison: Vellore vs Chennai', href: '/articles/vit-campus-comparison' },
      { title: 'VITEEE Preparation Strategy', href: '/articles/viteee-prep' },
      { title: 'Direct Admission in VIT', href: '/articles/vit-direct-admission' },
      { title: 'VIT Placements Report 2025', href: '/articles/vit-placements' },
      { title: 'VITEEE English & Aptitude Guide', href: '/articles/vit-aptitude-prep' },
      { title: 'VIT Hostel Life & Fees', href: '/articles/vit-hostels' },
      { title: 'VITEEE Mock Test PDF', href: '/articles/viteee-mock-tests' }
    ]
  },
  'wbjee': {
    slug: 'wbjee',
    title: 'WBJEE',
    fullName: 'West Bengal Joint Entrance Examination',
    stream: 'Engineering',
    color: '#0369a1',
    conductedBy: <a href="https://wbjeeb.nic.in" target="_blank" rel="noopener noreferrer" className="hover:underline">WBJEEB</a>,
    mode: 'Pen and Paper (OMR)',
    frequency: 'Once a year (April)',
    duration: '4 Hours (2 Hours per paper)',
    totalMarks: '200 (Paper I: 100, Paper II: 100)',
    sections: ['Mathematics (Paper I)', 'Physics & Chemistry (Paper II)'],
    eligibility: [
      'Passed 12th with PCM with 45% aggregate (40% for SC/ST/OBC/PwD)',
      'Minimum age: 17 years as on Dec 31, 2026',
      'Citizens of India or OCI candidates'
    ],
    importantDates: [
      { label: 'Registration Opens', date: 'December 2025' },
      { label: 'Exam Date', date: 'April 2026' },
      { label: 'Result', date: 'May 2026' }
    ],
    syllabus: [
      { subject: 'Mathematics', topics: ['Algebra', 'Trigonometry', 'Coordinate Geometry', 'Calculus', 'Probability'] },
      { subject: 'Physics', topics: ['Mechanics', 'Heat and Thermodynamics', 'Light and Optics', 'Electricity and Magnetism'] },
      { subject: 'Chemistry', topics: ['General Chemistry', 'Physical Chemistry', 'Inorganic Chemistry', 'Organic Chemistry'] }
    ],
    preparationTips: [
      'Mathematics carries 50% weightage — give it special focus',
      'Practice with OMR sheets to improve bubbling speed and accuracy',
      'WBJEE questions are conceptually deep — avoid rote learning',
      'Solve previous 10 years papers to understand the recurring patterns',
      'Focus on time management between Physics and Chemistry in Paper II'
    ],
    topColleges: ['Jadavpur University', 'Calcutta University', 'Heritage Institute of Technology', 'IEM Kolkata', 'Haldia Institute of Technology'],
    description: <>WBJEE is the gateway to engineering and pharmacy courses in West Bengal. It is known for its high competition level, especially for seats in Jadavpur University. Candidates aiming for West Bengal colleges also look at <Link href="/exams/jee-main" className="text-[#0369a1] font-bold hover:underline">JEE Main</Link> for top-tier seats.</>,
    relatedArticles: [
      { title: 'WBJEE 2026 Eligibility', href: '/articles/wbjee-eligibility' },
      { title: 'Jadavpur University Cutoffs', href: '/articles/ju-cutoff' },
      { title: 'WBJEE vs JEE Main', href: '/articles/wbjee-vs-jee' },
      { title: 'Private Colleges in WB', href: '/articles/wb-private-colleges' },
      { title: 'WBJEE Counselling Process', href: '/articles/wbjee-counselling' },
      { title: 'Pharmacy Admission through WBJEE', href: '/articles/wb-pharmacy-guide' },
      { title: 'OMR Bubbling Tips', href: '/articles/omr-tips' },
      { title: 'Best WBJEE Coaching in Kolkata', href: '/articles/kolkata-coaching' }
    ]
  },
  'snap': {
    slug: 'snap',
    title: 'SNAP',
    fullName: 'Symbiosis National Aptitude Test',
    stream: 'Management',
    color: '#f59e0b',
    conductedBy: <a href="https://snaptest.org" target="_blank" rel="noopener noreferrer" className="hover:underline">Symbiosis International University</a>,
    mode: 'Computer Based Test (CBT)',
    frequency: 'Once a year (Multiple slots in December)',
    duration: '60 Minutes',
    totalMarks: '60',
    sections: ['General English', 'Analytical & Logical Reasoning', 'Quantitative, Data Interpretation & Data Sufficiency'],
    eligibility: [
      'Bachelor\'s degree with 50% aggregate (45% for SC/ST)',
      'Final year students can also apply',
      'NRI candidates can apply through separate category'
    ],
    importantDates: [
      { label: 'Registration Opens', date: 'August 2025' },
      { label: 'Exam Dates', date: 'December 2025' },
      { label: 'Result', date: 'January 2026' }
    ],
    syllabus: [
      { subject: 'General English', topics: ['Reading Comprehension', 'Verbal Reasoning', 'Grammar', 'Vocabulary'] },
      { subject: 'Logical Reasoning', topics: ['Puzzles', 'Series', 'Blood Relations', 'Syllogisms', 'Critical Reasoning'] },
      { subject: 'Quant/DI', topics: ['Arithmetic', 'Algebra', 'Number System', 'Data Interpretation', 'Data Sufficiency'] }
    ],
    preparationTips: [
      'SNAP is a speed-based test — you have only 1 minute per question',
      'Focus on Analytical Reasoning as it carries the highest weightage',
      'Practice mental math to solve Quant questions faster',
      'Take at least 15-20 full-length mocks to build stamina for the 60-min sprint',
      'Analyze your performance to identify which section to attempt first'
    ],
    topColleges: ['SIBM Pune', 'SCMHRD Pune', 'SIIB Pune', 'SIBM Bangalore', 'SIBM Hyderabad'],
    description: <>SNAP is the entrance test for admission to MBA and other postgraduate programs at Symbiosis International. It is one of the most student-friendly MBA exams due to its shorter duration. Candidates often take SNAP as a backup to <Link href="/exams/cat" className="text-[#f59e0b] font-bold hover:underline">CAT</Link> or <Link href="/exams/xat" className="text-[#f59e0b] font-bold hover:underline">XAT</Link>.</>,
    relatedArticles: [
      { title: 'SNAP 2025 Eligibility', href: '/articles/snap-eligibility' },
      { title: 'SIBM Pune Selection Process', href: '/articles/sibm-selection' },
      { title: 'SNAP vs CAT Comparison', href: '/articles/snap-vs-cat' },
      { title: 'Top Symbiosis Colleges', href: '/articles/top-symbiosis-campuses' },
      { title: 'SNAP Speed-Based Test Tips', href: '/articles/snap-speed-tips' },
      { title: 'Symbiosis MBA Fee Structure', href: '/articles/symbiosis-fees' },
      { title: 'SNAP Logical Reasoning Guide', href: '/articles/snap-lr-prep' },
      { title: 'GE-PIWAT Preparation', href: '/articles/symbiosis-gepiwat' }
    ]
  }
}
