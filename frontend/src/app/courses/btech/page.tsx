'use client'

import React from 'react'
import CourseHubTemplate from '@/components/pages/CourseHubTemplate'
import {
  FileText, Users, Building, BarChart3, Compass, Target, Cpu, Award,
  ClipboardList, HelpCircle, CheckSquare, Code, Settings, Zap,
  FlaskConical
} from 'lucide-react'

// ─── Data Configuration ───────────────────────────────────────────────────────

const STATS = [
  { value: '240+', label: 'Expert Articles', icon: FileText },
  { value: '2.8L+', label: 'Monthly Readers', icon: Users },
  { value: '50+', label: 'College Reviews', icon: Building },
  { value: '15+', label: 'Years of Data', icon: BarChart3 },
]

const JOURNEY_LEVELS = [
  {
    level: 'beginner' as const,
    title: 'Class 10 – 12',
    subtitle: 'The Foundation',
    description: 'Stream selection, understanding B.Tech scope, JEE syllabus alignment, and mental prep.',
    articles: 48,
    icon: Compass,
    topics: ['PCM Stream Choice', 'What is B.Tech?', 'JEE vs BITSAT vs State Exams', 'Branch Awareness', 'Study Plans'],
    extendedInfo: 'Critical decisions on board exams vs competitive prep, building conceptual clarity in Physics, Chemistry, and Math.'
  },
  {
    level: 'intermediate' as const,
    title: 'JEE Aspirant',
    subtitle: 'The Grind',
    description: 'Mock test strategy, college shortlisting, JoSAA/CSAB counseling, and branch prioritization.',
    articles: 64,
    icon: Target,
    topics: ['JEE Mains Strategy', 'JEE Advanced Prep', 'JOSAA Counseling', 'College Shortlisting', 'SOP & Documents'],
    extendedInfo: 'Navigating previous cutoffs, category quotas, seat allocation rules, and optimizing your options order list.'
  },
  {
    level: 'advanced' as const,
    title: 'B.Tech Student',
    subtitle: 'The Build',
    description: 'Academic survival, CGPA management, tech stack choice, DSA roadmap, and internship applications.',
    articles: 71,
    icon: Cpu,
    topics: ['CGPA Strategy', 'Internship Hunt', 'DSA & CP Roadmap', 'Research Projects', 'Placement Prep'],
    extendedInfo: 'Mastering core programming, system design, structural algorithms, and open-source contributions to build a standout profile.'
  },
  {
    level: 'expert' as const,
    title: 'Post B.Tech',
    subtitle: 'The Launch',
    description: 'Campus placement seasons, salary negotiation, GATE exam, MS abroad, and startup execution.',
    articles: 57,
    icon: Award,
    topics: ['Placement Season', 'GATE 2026', 'MS Abroad', 'Startup vs MNC', 'Salary Negotiation'],
    extendedInfo: 'Preparing for technical coding rounds, system architect discussions, higher studies selection (M.Tech, MS, MBA), or venture building.'
  },
]

const FREE_RESOURCES = [
  {
    icon: ClipboardList,
    title: 'College Preference List Tool',
    description: 'Interactive choice filling assistant built on JOSAA & CSAB cutoff patterns.',
    cta: 'Build Your List',
    colorClass: 'bg-sky-600 hover:bg-sky-700',
    bgClass: 'bg-sky-50/50',
    borderClass: 'border-sky-100',
    benefits: ['Rank-based preferences generator', 'State & gender quota optimization', 'PDF export format']
  },
  {
    icon: BarChart3,
    title: 'Cutoff Analyzer 2025',
    description: 'Clean analysis tool tracking JEE cutoffs for 120+ government-funded institutions.',
    cta: 'Download Excel',
    colorClass: 'bg-emerald-600 hover:bg-emerald-700',
    bgClass: 'bg-emerald-50/50',
    borderClass: 'border-emerald-100',
    benefits: ['5-year historical cutoff trends', 'HS vs OS reservation breakdown', 'Branch-wise closing ranks']
  },
  {
    icon: HelpCircle,
    title: 'Branch Selector Quiz',
    description: 'Interest-mapping assessment evaluating mathematical and operational aptitudes.',
    cta: 'Take Quiz',
    colorClass: 'bg-violet-600 hover:bg-violet-700',
    bgClass: 'bg-violet-50/50',
    borderClass: 'border-violet-100',
    benefits: ['12-question aptitude profile', 'Software vs hardware suitability', 'Job scope reports']
  },
  {
    icon: CheckSquare,
    title: 'SOP & Document Checklist',
    description: 'Pre-counseling workbook to streamline document preparation and validation steps.',
    cta: 'Get Checklist',
    colorClass: 'bg-amber-600 hover:bg-amber-700',
    bgClass: 'bg-amber-50/50',
    borderClass: 'border-amber-100',
    benefits: ['Valid category certificate dates', 'Medical certificate formats', 'Seat acceptance checklists']
  },
]

const TESTIMONIALS = [
  {
    quote: "This blog single-handedly guided my B.Tech admission journey. The JOSAA counseling guide saved me from making huge mistakes.",
    name: "Rahul Sharma",
    detail: "IIT Delhi, CSE '28",
    avatar: "RS",
  },
  {
    quote: "The branch comparison articles helped me choose ECE over lower-tier CSE. Best decision of my life. Now placed at Qualcomm.",
    name: "Priya Patel",
    detail: "NIT Surathkal, ECE '26",
    avatar: "PP",
  },
  {
    quote: "I was confused between private universities. The college reviews and ROI analysis gave me the clarity I needed. No regret.",
    name: "Arjun Nair",
    detail: "BITS Pilani, Mechanical '27",
    avatar: "AN",
  },
]

const SPECIALTIES = [
  {
    icon: Code,
    title: 'CSE & IT',
    count: '48 articles',
    textClass: 'text-rose-700',
    description: 'Software development, Artificial Intelligence, Machine Learning, Cloud Systems, and Cybersecurity.',
    scope: 'Full Stack Dev, ML Engineer, Architect',
    recruiters: 'Google, Microsoft, Amazon'
  },
  {
    icon: Cpu,
    title: 'ECE & Robotics',
    count: '36 articles',
    textClass: 'text-sky-700',
    description: 'Semiconductor design, VLSI architectures, IoT ecosystems, Signal Processing, and Automation.',
    scope: 'VLSI Designer, Embedded Engineer',
    recruiters: 'Qualcomm, Intel, Nvidia'
  },
  {
    icon: Settings,
    title: 'Mechanical & Auto',
    count: '31 articles',
    textClass: 'text-violet-700',
    description: 'Electric Vehicle (EV) tech, thermodynamics, CAD structural modeling, and aerospace mechanics.',
    scope: 'EV Powertrain Analyst, CAD Designer',
    recruiters: 'Tesla, Tata Motors, L\'T'
  },
  {
    icon: Zap,
    title: 'Electrical & EV',
    count: '27 articles',
    textClass: 'text-amber-700',
    description: 'Power distribution, high-voltage battery systems, grid control logic, and EV charging infrastructure.',
    scope: 'EV Systems Engineer, Power Grid Lead',
    recruiters: 'Siemens, ABB, GE Renewables'
  },
  {
    icon: Building,
    title: 'Civil & Infra',
    count: '24 articles',
    textClass: 'text-emerald-700',
    description: 'Structural engineering, smart city architectures, geotechnical surveying, and green construction.',
    scope: 'Structural Designer, Construction Lead',
    recruiters: 'L&T Infra, DLF Group, AFCONS'
  },
  {
    icon: FlaskConical,
    title: 'Biotech & Chem',
    count: '19 articles',
    textClass: 'text-teal-700',
    description: 'Pharmaceutical chemical processes, bioinformatics databases, polymer synthesis, and biomaterials.',
    scope: 'Process Chemist, R&D Researcher',
    recruiters: 'Biocon, Reliance Industries, Pfizer'
  },
]

const STUDENT_VISUAL = {
  imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
  avatarName: 'Rahul, CSE \'28',
  goalTitle: 'Google SDE Core',
  activePrepLabel: 'JoSAA Round 1',
  overlayText: 'Helping engineers land at',
  overlaySub: 'IITs • NITs • IIITs • Top Private Universities'
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BtechBlogPage() {
  return (
    <CourseHubTemplate
      courseId="btech"
      streamName="B.Tech"
      hubName="B.Tech Knowledge Hub • 240+ Articles"
      heroTitle="Everything B.Tech."
      heroGradient="Nothing Held Back."
      heroSubtitle="Engineering your future. India's most trusted resource for JEE preparation, engineering branches comparison, and technology career roadmaps."
      searchPlaceholder="Search JEE prep, CSE vs ECE, IIT reviews..."
      trendingTopics={['JEE Main 2026', 'CSE Placements', 'IIT Bombay', 'AI/ML Branch', 'JOSAA Round 2', 'Private Colleges']}
      stats={STATS}
      journeyLevels={JOURNEY_LEVELS}
      freeResources={FREE_RESOURCES}
      testimonials={TESTIMONIALS}
      specialties={SPECIALTIES}
      specialtiesTitle="Compare Engineering Specialties"
      specialtiesSubtitle="An analytical comparison matrix mapping the core technology focus, career scope, and standard recruiters for all primary B.Tech streams."
      studentVisual={STUDENT_VISUAL}
    />
  )
}