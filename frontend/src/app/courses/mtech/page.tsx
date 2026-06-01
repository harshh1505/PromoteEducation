'use client'

import React from 'react'
import CourseHubTemplate from '@/components/pages/CourseHubTemplate'
import {
  FileText, Users, Building, BarChart3, Compass, Target, Cpu, Award,
  ClipboardList, HelpCircle, CheckSquare, Code, Settings, Zap, FlaskConical
} from 'lucide-react'

// ─── Data Configuration ───────────────────────────────────────────────────────

const STATS = [
  { value: '240+', label: 'Expert Articles', icon: FileText },
  { value: '2.8L+', label: 'Monthly Readers', icon: Users },
  { value: '50+', label: 'Institute Reviews', icon: Building },
  { value: '15+', label: 'Years of Data', icon: BarChart3 },
]

const JOURNEY_LEVELS = [
  {
    level: 'beginner' as const,
    title: 'B.Tech Student',
    subtitle: 'The Base',
    description: 'Understanding M.Tech value, GATE syllabus basics, CGPA strategy, and early goal mapping.',
    articles: 48,
    icon: Compass,
    topics: ['Why M.Tech?', 'GATE Exam Pattern', 'CGPA for Placements', 'Research Mindset', 'Goal Setting'],
    extendedInfo: 'Critical decisions on board exams vs competitive prep, building conceptual clarity in key computer science/engineering modules, and finding research interests.'
  },
  {
    level: 'intermediate' as const,
    title: 'GATE Aspirant',
    subtitle: 'The Grind',
    description: 'Preparation schedule, high-weightage topics, virtual calculator tips, mock analysis, and CCMT/COAP registration.',
    articles: 64,
    icon: Target,
    topics: ['Syllabus Breakdown', 'Best Reference Books', 'Mock Test Strategy', 'Virtual Calculator Hack', 'CCMT & COAP Guide'],
    extendedInfo: 'Formulating revision notes, subject-wise weightage analyses, solving past papers, and navigating cutoff updates across IITs/NITs.'
  },
  {
    level: 'advanced' as const,
    title: 'M.Tech Student',
    subtitle: 'The Build',
    description: 'Research methodology, thesis topic selection, lab work, stipend (TA) management, and publishing papers.',
    articles: 71,
    icon: Cpu,
    topics: ['Literature Review', 'Thesis Topic Selection', 'Research Publications', 'TA Deliverables', 'Internship Prep'],
    extendedInfo: 'Balancing Teaching Assistant (TA) duties, learning technical writing, conducting experiments, and collaborating with faculty guides.'
  },
  {
    level: 'expert' as const,
    title: 'Post M.Tech',
    subtitle: 'The Launch',
    description: 'PG placement cycles, PSU recruitment through GATE, industrial R&D positions, and PhD opportunities.',
    articles: 57,
    icon: Award,
    topics: ['PG Placements', 'PSU Jobs through GATE', 'R&D Roles', 'PhD in India/Abroad', 'Salary Negotiation'],
    extendedInfo: 'Mastering core coding rounds, system architect challenges, executive research interviews, or planning higher PhD pathways abroad.'
  },
]

const FREE_RESOURCES = [
  {
    icon: ClipboardList,
    title: 'Institute Preference List Tool',
    description: 'Interactive choice filling assistant built on JOSAA, COAP & CCMT cutoff patterns.',
    cta: 'Build Your List',
    colorClass: 'bg-sky-600 hover:bg-sky-700',
    bgClass: 'bg-sky-50/50',
    borderClass: 'border-sky-100',
    benefits: ['Rank-based preferences generator', 'Stipend & seat count verification', 'PDF export format']
  },
  {
    icon: BarChart3,
    title: 'GATE Cutoff Analyzer 2025',
    description: 'Clean analysis tool tracking GATE cutoffs for 80+ IITs, NITs, and IIITs.',
    cta: 'Download Excel',
    colorClass: 'bg-emerald-600 hover:bg-emerald-700',
    bgClass: 'bg-emerald-50/50',
    borderClass: 'border-emerald-100',
    benefits: ['5-year historical cutoff trends', 'Specialization-wise closing scores', 'Category-wise seat lists']
  },
  {
    icon: HelpCircle,
    title: 'Specialization Selector Quiz',
    description: 'Recommendations based on B.Tech branch and PG career aspirations.',
    cta: 'Take Quiz',
    colorClass: 'bg-violet-600 hover:bg-violet-700',
    bgClass: 'bg-violet-50/50',
    borderClass: 'border-violet-100',
    benefits: ['12-question aptitude profile', 'Software vs research suitability', 'Job scope reports']
  },
  {
    icon: CheckSquare,
    title: 'COAP/CCMT Checklist',
    description: 'Checklist for counselling documentation, seat acceptance, and offer rejection rules.',
    cta: 'Get Checklist',
    colorClass: 'bg-amber-600 hover:bg-amber-700',
    bgClass: 'bg-amber-50/50',
    borderClass: 'border-amber-100',
    benefits: ['Valid category certificate dates', 'Offer acceptance workflow guides', 'Seat booking verification steps']
  },
]

const TESTIMONIALS = [
  {
    quote: "This portal helped me navigate the COAP counselling rounds when I was extremely confused between IIT Delhi and IIT Bombay. Lifesaver!",
    name: "Sandeep Kumar",
    detail: "IIT Bombay, M.Tech CSE '27",
    avatar: "SK",
  },
  {
    quote: "The specialization selector quiz recommended AI over traditional Systems, which landed me an R&D role at NVIDIA. Best decision ever.",
    name: "Megha Jain",
    detail: "IISc Bangalore, AI Research '26",
    avatar: "MJ",
  },
  {
    quote: "Honest comparisons on stipend rules and placement trends between new IITs and older NITs. Extremely informative.",
    name: "Vikram Singh",
    detail: "IIT Delhi, VLSI '28",
    avatar: "VS",
  },
]

const SPECIALTIES = [
  {
    icon: Code,
    title: 'Computer Science & AI',
    count: '48 articles',
    textClass: 'text-rose-700',
    description: 'Advanced algorithms, Deep Learning models, cloud computing infrastructure, systems design, and cybersecurity.',
    scope: 'Principal AI Engineer, Systems Scientist, Tech Lead',
    recruiters: 'Microsoft Research, Google, Adobe R&D'
  },
  {
    icon: Cpu,
    title: 'VLSI & Microelectronics',
    count: '36 articles',
    textClass: 'text-sky-700',
    description: 'Semiconductor physics, ASIC/FPGA digital and analog IC design layouts, fabrication, and hardware validation.',
    scope: 'Silicon Design Engineer, Hardware Architect',
    recruiters: 'Intel, Qualcomm, Texas Instruments, Nvidia'
  },
  {
    icon: Zap,
    title: 'EV & Power Systems',
    count: '31 articles',
    textClass: 'text-violet-700',
    description: 'Electric vehicle powertrain architectures, smart grid control logic, high-voltage battery management systems.',
    scope: 'EV Systems Engineer, Power Grid Architect',
    recruiters: 'Tesla, Mercedes-Benz, Tata Motors, Siemens'
  },
  {
    icon: Settings,
    title: 'Robotics & Automation',
    count: '27 articles',
    textClass: 'text-amber-700',
    description: 'Cyber-physical systems, autonomous navigation algorithms, kinematics, sensor fusion, and control systems.',
    scope: 'Robotics R&D Engineer, Control Systems Specialist',
    recruiters: 'Boston Dynamics, ABB, KUKA Robotics, Fanuc'
  },
  {
    icon: Building,
    title: 'Structural Engineering',
    count: '24 articles',
    textClass: 'text-emerald-700',
    description: 'Seismic hazard analysis, advanced structural dynamics, concrete/steel design, and high-rise structural health monitoring.',
    scope: 'Principal Structural Lead, Infrastructure Architect',
    recruiters: 'L&T Infrastructure, AFCONS, Tata Consulting Engineers'
  },
  {
    icon: FlaskConical,
    title: 'Process & Biotech',
    count: '19 articles',
    textClass: 'text-teal-700',
    description: 'Bioreactor scaling, bioinformatics data analysis, metabolic engineering, and industrial chemical process design.',
    scope: 'Chief Process Engineer, Bioprocess Scientist',
    recruiters: 'Biocon, Serum Institute, Reliance R&D, Pfizer'
  },
]

const STUDENT_VISUAL = {
  imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
  avatarName: 'Sandeep, IIT Bombay CSE \'27',
  goalTitle: 'IIT Research Lab',
  activePrepLabel: 'GATE Score 850',
  overlayText: 'Helping scholars land at',
  overlaySub: 'IITs • IISc • NITs • Top Government R&D Labs'
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function MtechBlogPage() {
  return (
    <CourseHubTemplate
      courseId="mtech"
      streamName="M.Tech"
      hubName="M.Tech Knowledge Hub • 240+ Articles"
      heroTitle="Mastering Engineering Depth."
      heroGradient="Your Specialization Starts Here."
      heroSubtitle="India's most trusted resource for GATE preparation, post-graduate engineering specializations, and R&D/PSU career paths."
      searchPlaceholder="Search GATE strategy, IIT M.Tech cutoffs, specializations..."
      trendingTopics={['GATE 2026', 'IIT M.Tech', 'COAP 2026', 'CCMT Counselling', 'AI/ML Spec', 'PSU Jobs', 'Stipends']}
      stats={STATS}
      journeyLevels={JOURNEY_LEVELS}
      freeResources={FREE_RESOURCES}
      testimonials={TESTIMONIALS}
      specialties={SPECIALTIES}
      specialtiesTitle="Compare M.Tech Branches"
      specialtiesSubtitle="Analyze core technology focus, career scope, and top hiring companies across primary post-graduate engineering domains."
      studentVisual={STUDENT_VISUAL}
    />
  )
}
