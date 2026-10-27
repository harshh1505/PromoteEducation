import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import {
  BookOpen,
  GraduationCap,
  ChevronRight,
  Target,
  Clock,
  Compass,
  CheckCircle2,
  Layers,
  ArrowRight
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Entrance Exam Articles & Complete Preparation Guides 2026',
  description:
    'Comprehensive library of verified entrance exam guides, subject syllabus breakdowns, high-yield topics, cutoffs, eligibility criteria, and expert preparation strategies for JEE, NEET, BITSAT, INI CET, CAT, XAT, GATE, CLAT, CUET, and NIFT.',
  keywords: [
    'exam preparation guides 2026',
    'jee main preparation articles',
    'neet exam pattern syllabus',
    'bitsat cutoffs and eligibility',
    'ini cet seat matrix',
    'cat vs xat preparation',
    'gate exam strategy',
    'cuet ug syllabus 2026',
    'clat preparation guide'
  ],
  alternates: {
    canonical: 'https://promoteducation.com/articles',
  },
  openGraph: {
    title: 'Entrance Exam Articles & Complete Preparation Guides 2026 | Promote Education',
    description:
      'Explore 80+ in-depth exam analysis guides, cutoffs, book recommendations, and preparation blueprints verified by academic mentors.',
    url: 'https://promoteducation.com/articles',
    type: 'website',
  },
}

interface ArticleCategory {
  name: string
  tag: string
  color: string
  bg: string
  borderColor: string
  examHub: string
  description: string
  articles: Array<{
    slug: string
    title: string
    readTime: string
    badge: string
  }>
}

const ARTICLE_CATEGORIES: ArticleCategory[] = [
  {
    name: 'JEE Main & JEE Advanced',
    tag: 'Engineering Entrance',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    borderColor: 'border-sky-200',
    examHub: '/exams/jee-main',
    description: 'National-level engineering entrance blueprints, syllabus weightage, and high-yield scoring strategies.',
    articles: [
      { slug: 'jee-main-exam-pattern', title: 'JEE Main 2026 Exam Pattern & Marking Scheme', readTime: '6 min', badge: 'Exam Pattern' },
      { slug: 'jee-main-syllabus-2026', title: 'JEE Main 2026 Complete Syllabus & High-Yield Weightage', readTime: '8 min', badge: 'Syllabus' },
      { slug: 'jee-main-eligibility-2026', title: 'JEE Main 2026 Eligibility Criteria & 75% Rule', readTime: '5 min', badge: 'Eligibility' },
      { slug: 'jee-main-preparation-strategy', title: 'JEE Main 6-Month Preparation Blueprint & Daily Timetable', readTime: '10 min', badge: 'Strategy' },
      { slug: 'best-books-jee-main', title: 'Best Recommended Books for Physics, Chemistry & Maths', readTime: '7 min', badge: 'Books' },
      { slug: 'colleges-accepting-jee-main', title: 'Top Engineering Colleges Accepting JEE Main Scores', readTime: '8 min', badge: 'Colleges' },
      { slug: 'jee-advanced-exam-pattern', title: 'JEE Advanced 2026 Paper 1 & 2 Pattern Breakdown', readTime: '7 min', badge: 'Exam Pattern' },
      { slug: 'jee-advanced-syllabus-2026', title: 'JEE Advanced 2026 Syllabus & Tough Topic Analysis', readTime: '9 min', badge: 'Syllabus' },
      { slug: 'jee-advanced-eligibility-2026', title: 'JEE Advanced Eligibility: Top 2.5 Lakh Cutoff & Attempts', readTime: '6 min', badge: 'Eligibility' },
      { slug: 'jee-advanced-preparation-strategy', title: 'Advanced Problem-Solving Strategy for IIT Aspirants', readTime: '11 min', badge: 'Strategy' },
      { slug: 'best-books-jee-advanced', title: 'Best Reference Books for JEE Advanced Mastery', readTime: '8 min', badge: 'Books' },
      { slug: 'colleges-accepting-jee-advanced', title: 'All 23 IITs & Premier Institutes Accepting JEE Advanced', readTime: '6 min', badge: 'Colleges' },
      { slug: 'jee-main-vs-jee-advanced', title: 'JEE Main vs JEE Advanced: Core Differences Explained', readTime: '7 min', badge: 'Comparison' },
      { slug: 'jee-main-vs-advanced-bitsat', title: 'JEE Main vs Advanced vs BITSAT: Tri-Exam Strategic Plan', readTime: '9 min', badge: 'Comparison' },
    ]
  },
  {
    name: 'BITSAT & BITS Pilani',
    tag: 'Premier Private Tech',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    examHub: '/exams/bitsat',
    description: 'Comprehensive guides for Birla Institute of Technology and Science admission exams and cutoffs.',
    articles: [
      { slug: 'bitsat-eligibility', title: 'BITSAT 2026 Eligibility: 75% PCM Aggregate Criteria', readTime: '6 min', badge: 'Eligibility' },
      { slug: 'bits-pilani-cutoff', title: 'BITS Pilani, Goa & Hyderabad Cutoff Trends (2021-2025)', readTime: '10 min', badge: 'Cutoffs' },
      { slug: 'bitsat-bonus-questions', title: 'The Bonus Question Strategy: How to Score 380+ in BITSAT', readTime: '8 min', badge: 'Strategy' },
      { slug: 'bitsat-crash-course', title: 'BITSAT Crash Course: 45-Day High-Speed Revision Plan', readTime: '7 min', badge: 'Crash Course' },
      { slug: 'bitsat-english-lr', title: 'Cracking BITSAT English Proficiency & Logical Reasoning', readTime: '6 min', badge: 'Preparation' },
      { slug: 'bitsat-vs-jee', title: 'BITSAT vs JEE Main: Speed vs Accuracy Benchmark', readTime: '8 min', badge: 'Comparison' },
      { slug: 'bits-direct-admission', title: 'BITS Direct Admission Policy for State & Central Board Toppers', readTime: '5 min', badge: 'Admission' },
      { slug: 'bits-pilani-life', title: 'Campus Life at BITS Pilani: 0% Attendance, Clubs & Culture', readTime: '9 min', badge: 'Campus Life' },
    ]
  },
  {
    name: 'NEET UG & Medical Admissions',
    tag: 'Medical Entrance',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    examHub: '/exams/neet-ug',
    description: 'National Eligibility cum Entrance Test guides for MBBS, BDS, and AYUSH admissions across India.',
    articles: [
      { slug: 'neet-exam-pattern', title: 'NEET UG 2026 Exam Pattern, Negative Marking & Timing', readTime: '6 min', badge: 'Exam Pattern' },
      { slug: 'neet-syllabus-2026', title: 'NEET UG 2026 Biology, Chemistry & Physics Syllabus', readTime: '8 min', badge: 'Syllabus' },
      { slug: 'neet-eligibility-2026', title: 'NEET Eligibility Criteria, Age Limits & Code Explanations', readTime: '6 min', badge: 'Eligibility' },
      { slug: 'neet-preparation-strategy', title: 'How to Score 650+ in NEET: Revision Routine & NCERT Drills', readTime: '10 min', badge: 'Strategy' },
      { slug: 'best-books-neet', title: 'Must-Read NEET Books for Biology, Organic & Physical Chemistry', readTime: '7 min', badge: 'Books' },
      { slug: 'colleges-accepting-neet', title: 'Top Government & Private Medical Colleges Accepting NEET', readTime: '9 min', badge: 'Colleges' },
      { slug: 'neet-vs-aiims-jipmer', title: 'NEET UG vs Historic AIIMS & JIPMER Medical Admission Formats', readTime: '7 min', badge: 'Analysis' },
    ]
  },
  {
    name: 'INI CET & Post-PG Medical',
    tag: 'Medical PG Entrance',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    borderColor: 'border-rose-200',
    examHub: '/exams/ini-cet',
    description: 'Specialized entrance guides for AIIMS, JIPMER, PGIMER, and NIMHANS MD/MS/DM seat matrix.',
    articles: [
      { slug: 'aiims-pg-seat-matrix', title: 'AIIMS PG Seat Matrix 2026: Campus-wise MD/MS Breakdown', readTime: '7 min', badge: 'Seat Matrix' },
      { slug: 'ini-cet-exam-pattern', title: 'INI CET 2026 Exam Pattern: Single Best Answer & Multi-Correct', readTime: '6 min', badge: 'Exam Pattern' },
      { slug: 'ini-cet-syllabus-2026', title: 'INI CET Complete 19-Subject Medical Syllabus & High-Yield Topics', readTime: '12 min', badge: 'Syllabus' },
      { slug: 'ini-cet-eligibility-2026', title: 'INI CET Eligibility Criteria: 55% Aggregate & Internship Cutoff', readTime: '6 min', badge: 'Eligibility' },
      { slug: 'ini-cet-high-yield-topics', title: 'High-Yield Clinical Pearls & Subject Weightage for INI CET', readTime: '9 min', badge: 'High Yield' },
      { slug: 'ini-cet-vs-neet-pg', title: 'INI CET vs NEET PG: Clinical Vignettes vs Theory Comparison', readTime: '8 min', badge: 'Comparison' },
      { slug: 'best-ini-cet-coaching', title: 'Best Coaching & Digital Test Series for INI CET Preparation', readTime: '7 min', badge: 'Coaching' },
      { slug: 'post-pg-medical-career', title: 'Career Options After MD/MS: Super-Specialty vs Clinical Practice', readTime: '9 min', badge: 'Career' },
    ]
  },
  {
    name: 'CAT & Management (IIMs)',
    tag: 'MBA Entrance',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    borderColor: 'border-amber-200',
    examHub: '/exams/cat',
    description: 'Common Admission Test strategy, percentile calculations, sectional cutoffs, and IIM call criteria.',
    articles: [
      { slug: 'cat-exam-pattern', title: 'CAT 2026 Exam Pattern: VARC, DILR & QA Sectional Time Limits', readTime: '7 min', badge: 'Exam Pattern' },
      { slug: 'cat-syllabus-2026', title: 'CAT 2026 Complete Syllabus & Quantitative Aptitude Topics', readTime: '8 min', badge: 'Syllabus' },
      { slug: 'cat-eligibility-2026', title: 'CAT 2026 Eligibility: Graduation Percentage & Work Experience', readTime: '5 min', badge: 'Eligibility' },
      { slug: 'cat-preparation-strategy', title: 'Mastering CAT in 6 Months: Section-by-Section Score Multipliers', readTime: '10 min', badge: 'Strategy' },
      { slug: 'best-books-cat', title: 'Best Books for CAT Preparation (Arun Sharma, Nishit Sinha & Sarvesh Verma)', readTime: '7 min', badge: 'Books' },
      { slug: 'colleges-accepting-cat', title: 'Top 50 Non-IIM B-Schools Accepting CAT (FMS, SPJIMR, MDI)', readTime: '9 min', badge: 'Colleges' },
      { slug: 'cat-vs-xat-gmat', title: 'CAT vs XAT vs GMAT: Which MBA Entrance Should You Prioritize?', readTime: '8 min', badge: 'Comparison' },
    ]
  },
  {
    name: 'XAT & XLRI Jamshedpur',
    tag: 'Management Entrance',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    borderColor: 'border-purple-200',
    examHub: '/exams/xat',
    description: 'Xavier Aptitude Test deep dives, Decision Making section mastery, and XLRI selection metrics.',
    articles: [
      { slug: 'xat-exam-pattern', title: 'XAT 2026 Exam Pattern: VALR, DM, QA-DI & General Knowledge', readTime: '7 min', badge: 'Exam Pattern' },
      { slug: 'xat-eligibility', title: 'XAT Eligibility Criteria & Academic Background Requirements', readTime: '5 min', badge: 'Eligibility' },
      { slug: 'xat-decision-making-guide', title: 'The Ultimate Guide to Mastering XAT Decision Making Section', readTime: '10 min', badge: 'Decision Making' },
      { slug: 'xat-essay-writing', title: 'XAT Essay Writing Framework: Topics, Tone & Evaluation Rubrics', readTime: '8 min', badge: 'Essay' },
      { slug: 'xat-selection-process', title: 'XLRI Final Selection: GD, PI, Academic Weightage & Work Ex', readTime: '7 min', badge: 'Selection' },
      { slug: 'top-colleges-xat', title: 'Top B-Schools Accepting XAT Scores (XLRI, XIMB, IMT, TAPMI)', readTime: '8 min', badge: 'Colleges' },
      { slug: 'xat-vs-cat-comparison', title: 'XAT vs CAT Difficulty Level & Time Allocation Analysis', readTime: '7 min', badge: 'Comparison' },
      { slug: 'xlri-hrm-vs-bm', title: 'XLRI Human Resource Management vs Business Management', readTime: '9 min', badge: 'Course Choice' },
    ]
  },
  {
    name: 'GATE (Graduate Aptitude Test in Engineering)',
    tag: 'Post-Graduate & PSU',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    borderColor: 'border-blue-200',
    examHub: '/exams/gate',
    description: 'GATE strategy for M.Tech admissions at IISc/IITs and PSU recruitment opportunities.',
    articles: [
      { slug: 'gate-exam-pattern', title: 'GATE 2026 Exam Pattern: MCQs, MSQs & NAT Question Formats', readTime: '6 min', badge: 'Exam Pattern' },
      { slug: 'gate-syllabus-2026', title: 'GATE 2026 Branch-Wise Syllabus & Engineering Maths Weightage', readTime: '8 min', badge: 'Syllabus' },
      { slug: 'gate-eligibility-2026', title: 'GATE Eligibility: 3rd Year B.Tech Eligibility & Pre-requisites', readTime: '5 min', badge: 'Eligibility' },
      { slug: 'gate-preparation-strategy', title: 'Cracking GATE with AIR Under 100: Revision & Virtual Calculator Tips', readTime: '9 min', badge: 'Strategy' },
      { slug: 'best-books-gate', title: 'Standard Textbooks & Solved Previous Year Question Papers for GATE', readTime: '7 min', badge: 'Books' },
      { slug: 'colleges-accepting-gate', title: 'IITs, NITs & IIITs Offering M.Tech Through GATE Counselling', readTime: '8 min', badge: 'Colleges' },
      { slug: 'gate-vs-ese-cat', title: 'GATE vs ESE vs CAT: Selecting the Right Post-B.Tech Pathway', readTime: '8 min', badge: 'Comparison' },
    ]
  },
  {
    name: 'CLAT & Law Entrance',
    tag: 'National Law Entrance',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    borderColor: 'border-teal-200',
    examHub: '/exams/clat',
    description: 'Common Law Admission Test blueprints for NLUs (BA LLB & LLM programs).',
    articles: [
      { slug: 'clat-exam-pattern', title: 'CLAT 2026 Exam Pattern: Passage-Based Comprehension & Deductive Reasoning', readTime: '6 min', badge: 'Exam Pattern' },
      { slug: 'clat-syllabus-2026', title: 'CLAT 2026 Syllabus: Legal Reasoning, Current Affairs & Logical Sections', readTime: '8 min', badge: 'Syllabus' },
      { slug: 'clat-eligibility-2026', title: 'CLAT Eligibility: Minimum Board Marks & No Upper Age Limit Clause', readTime: '5 min', badge: 'Eligibility' },
      { slug: 'clat-preparation-strategy', title: 'Daily Editorial Reading & Speed Comprehension Drills for CLAT', readTime: '9 min', badge: 'Strategy' },
      { slug: 'best-books-clat', title: 'Best Law Entrance Books for Legal Aptitude & Static GK', readTime: '6 min', badge: 'Books' },
      { slug: 'colleges-accepting-clat', title: 'All 26 National Law Universities (NLUs) Ranking & Cutoffs', readTime: '8 min', badge: 'Colleges' },
      { slug: 'clat-vs-ailet-lsat', title: 'CLAT vs AILET vs LSAT India: Structure & Law School Mapping', readTime: '7 min', badge: 'Comparison' },
    ]
  },
  {
    name: 'CUET UG & Central Universities',
    tag: 'Undergraduate Entrance',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    borderColor: 'border-orange-200',
    examHub: '/exams/cuet-ug',
    description: 'Central University Entrance Test guides for Delhi University, BHU, JNU, and allied colleges.',
    articles: [
      { slug: 'cuet-ug-exam-pattern', title: 'CUET UG 2026 Exam Pattern: Language, Domain Subjects & General Test', readTime: '6 min', badge: 'Exam Pattern' },
      { slug: 'cuet-ug-syllabus-2026', title: 'CUET UG 2026 Domain Syllabus: Class 12 NCERT Alignment', readTime: '8 min', badge: 'Syllabus' },
      { slug: 'cuet-ug-eligibility-2026', title: 'CUET UG Eligibility Criteria & University-Specific Subject Mappings', readTime: '6 min', badge: 'Eligibility' },
      { slug: 'cuet-ug-preparation-strategy', title: 'Scoring 100 Percentile in CUET UG: Domain Accuracy & Speed', readTime: '9 min', badge: 'Strategy' },
      { slug: 'best-books-cuet-ug', title: 'Best Practice Question Banks & Mocks for CUET UG', readTime: '6 min', badge: 'Books' },
      { slug: 'colleges-accepting-cuet-ug', title: 'Top Central & State Universities Participating in CUET UG', readTime: '8 min', badge: 'Colleges' },
      { slug: 'cuet-ug-vs-jee-neet', title: 'CUET UG vs JEE vs NEET: Understanding Overlapping Prep Strategies', readTime: '7 min', badge: 'Comparison' },
    ]
  },
  {
    name: 'NIFT & Design Entrance',
    tag: 'Design & Fashion Tech',
    color: 'text-pink-600',
    bg: 'bg-pink-50',
    borderColor: 'border-pink-200',
    examHub: '/exams/nift',
    description: 'National Institute of Fashion Technology CAT, GAT, and Situation Test preparation guides.',
    articles: [
      { slug: 'nift-exam-pattern', title: 'NIFT 2026 Exam Pattern: Creative Ability Test (CAT) & General Ability (GAT)', readTime: '6 min', badge: 'Exam Pattern' },
      { slug: 'nift-syllabus-2026', title: 'NIFT 2026 Complete Syllabus: Sketching, Perspective & Design Thinking', readTime: '8 min', badge: 'Syllabus' },
      { slug: 'nift-eligibility-2026', title: 'NIFT Eligibility Criteria: Age Limits & 10+2 Qualification Rules', readTime: '5 min', badge: 'Eligibility' },
      { slug: 'nift-preparation-strategy', title: 'Developing Observation Skills & Portfolio for NIFT & Situation Test', readTime: '9 min', badge: 'Strategy' },
      { slug: 'best-books-nift', title: 'Best Reference Material & Drawing Books for NIFT Aspirants', readTime: '6 min', badge: 'Books' },
      { slug: 'colleges-accepting-nift', title: 'All NIFT Campuses (Delhi, Mumbai, Bengaluru) & Seat Capacity', readTime: '7 min', badge: 'Colleges' },
      { slug: 'nift-vs-nid-uceed', title: 'NIFT vs NID DAT vs UCEED: Choosing the Right Design Career Stream', readTime: '8 min', badge: 'Comparison' },
    ]
  }
]

export default function ArticlesHubPage() {
  const totalArticles = ARTICLE_CATEGORIES.reduce((acc, cat) => acc + cat.articles.length, 0)

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Entrance Exam Articles & Complete Preparation Guides 2026',
    description:
      'Curated repository of 80+ entrance exam preparation articles, subject breakdowns, cutoffs, and strategies.',
    url: 'https://promoteducation.com/articles',
    hasPart: ARTICLE_CATEGORIES.flatMap((c) =>
      c.articles.map((a) => ({
        '@type': 'Article',
        name: a.title,
        url: `https://promoteducation.com/articles/${a.slug}`,
      }))
    ),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://promoteducation.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Articles & Guides',
        item: 'https://promoteducation.com/articles',
      },
    ],
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />

      {/* ── HERO SECTION ── */}
      <header className="pt-32 pb-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <ChevronRight size={12} className="text-slate-300" />
            <span className="text-sky-600">Articles & Exam Guides</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-[11px] font-black uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
              Verified Academic Library · {totalArticles} In-Depth Guides
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] mb-6">
              Entrance Exam <br />
              <span className="text-sky-600">Preparation Blueprints</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
              Explore subject-wise syllabus breakdowns, score maximization strategies, previous year cutoff trends, and official eligibility requirements for India's most competitive entrance examinations.
            </p>
          </div>

          {/* Quick Jump Bar */}
          <div className="mt-10 pt-8 border-t border-slate-100 flex flex-wrap gap-2">
            {ARTICLE_CATEGORIES.map((cat) => (
              <a
                key={cat.name}
                href={`#${cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-900 hover:text-white transition-all"
              >
                {cat.name.split('(')[0].trim()}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* ── ARTICLES DIRECTORY ── */}
      <main className="py-16 flex-1">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          {ARTICLE_CATEGORIES.map((category) => {
            const sectionId = category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
            return (
              <section
                key={category.name}
                id={sectionId}
                className="scroll-mt-28 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm"
              >
                {/* Category Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-8 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${category.bg} ${category.color} border ${category.borderColor}`}>
                        {category.tag}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">
                        {category.articles.length} Guides
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {category.name}
                    </h2>
                    <p className="text-sm text-slate-500 font-medium mt-1 max-w-2xl">
                      {category.description}
                    </p>
                  </div>

                  <Link
                    href={category.examHub}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-sky-600 transition-all text-xs font-black uppercase tracking-wider self-start md:self-auto shrink-0 shadow-sm"
                  >
                    <span>Visit Exam Portal</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {category.articles.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/articles/${article.slug}`}
                      className="group flex flex-col justify-between p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-sky-300 hover:shadow-lg transition-all duration-200"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 group-hover:text-sky-600 transition-colors bg-white px-2 py-0.5 rounded border border-slate-100">
                            {article.badge}
                          </span>
                          <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                            <Clock size={11} /> {article.readTime}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                          {article.title}
                        </h3>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/50 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-sky-600 transition-colors">
                        <span>Read Full Guide</span>
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )
          })}

          {/* ── BOTTOM CALLOUT ── */}
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="max-w-xl">
              <span className="px-3 py-1 bg-sky-500/20 text-sky-400 text-[10px] font-black uppercase tracking-widest rounded-md border border-sky-500/30">
                Personalized Counselling
              </span>
              <h3 className="text-2xl sm:text-3xl font-black mt-3 mb-2 tracking-tight">
                Need Help Selecting Your Ideal College or Stream?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Connect with our senior education advisors for rank-based counselling, category reservation advice, and verified admission guidance.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 shrink-0">
              <Link
                href="/counselling"
                className="px-6 py-3.5 rounded-full bg-sky-500 text-white font-black text-xs uppercase tracking-widest hover:bg-sky-400 transition-all shadow-md"
              >
                Book Free Consultation
              </Link>
              <Link
                href="/tools/college-predictor"
                className="px-6 py-3.5 rounded-full bg-white/10 text-white font-black text-xs uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all border border-white/20"
              >
                Use College Predictor
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
