'use client'

import React from 'react'
import CourseHubTemplate from '@/components/pages/CourseHubTemplate'
import {
  FileText, Users, Building, BarChart3, Compass, Target, Cpu, Award,
  ClipboardList, HelpCircle, CheckSquare, DollarSign, Settings
} from 'lucide-react'

// ─── Data Configuration ───────────────────────────────────────────────────────

const STATS = [
  { value: '180+', label: 'MBA Guides', icon: FileText },
  { value: '1.5L+', label: 'Monthly MBA Readers', icon: Users },
  { value: '45+', label: 'B-School Reviews', icon: Building },
  { value: '12+', label: 'Years of Strategy', icon: BarChart3 },
]

const JOURNEY_LEVELS = [
  {
    level: 'beginner' as const,
    title: 'Undergraduate Base',
    subtitle: 'The Foundation',
    description: 'Profile building, work experience planning, and choosing the right MBA path.',
    articles: 32,
    icon: Compass,
    topics: ['Profile Building', 'Work-Ex vs Fresher', 'Why MBA?', 'Pre-MBA Certs', 'Finance Basics'],
    extendedInfo: 'Evaluating when to acquire corporate work experience and developing analytical writing skills early on.'
  },
  {
    level: 'intermediate' as const,
    title: 'MBA Aspirant',
    subtitle: 'The Grind',
    description: 'CAT/GMAT strategy, mock analysis, and B-school shortlisting.',
    articles: 58,
    icon: Target,
    topics: ['CAT Strategy', 'GMAT Roadmap', 'Mock Analysis', 'SOP Writing', 'GD/PI Prep'],
    extendedInfo: 'Formulating verbal ability, quantitative logic, analyzing mock percentile scores, and preparing case study portfolios.'
  },
  {
    level: 'advanced' as const,
    title: 'MBA Student',
    subtitle: 'The Build',
    description: 'Summer internships, case competitions, and specialization choices.',
    articles: 62,
    icon: Cpu,
    topics: ['Case Study Method', 'Networking 101', 'Summer Placements', 'Specialization Quiz', 'Consulting Prep'],
    extendedInfo: 'Surviving first-year core modules, managing group deliverables, and securing summer placements.'
  },
  {
    level: 'expert' as const,
    title: 'Business Leader',
    subtitle: 'The Launch',
    description: 'Final placements, corporate growth, and entrepreneurial ventures.',
    articles: 44,
    icon: Award,
    topics: ['Final Placements', 'Corporate Strategy', 'M&A Roles', 'Venture Capital', 'Leadership Skills'],
    extendedInfo: 'Navigating executive recruiting rounds, structuring career goals, and deciding on corporate paths.'
  },
]

const FREE_RESOURCES = [
  {
    icon: ClipboardList,
    title: 'B-School Shortlist Tool',
    description: 'Calculate admission odds based on profiles and mocks.',
    cta: 'Predict My College',
    colorClass: 'bg-sky-600 hover:bg-sky-700',
    bgClass: 'bg-sky-50/50',
    borderClass: 'border-sky-100',
    benefits: ['Profile evaluation matrix', 'IIM admission matrix calculator', 'Private colleges matchers']
  },
  {
    icon: BarChart3,
    title: 'CAT Percentile Predictor',
    description: 'CAT score vs percentile maps based on latest difficulty.',
    cta: 'Download Predictor',
    colorClass: 'bg-emerald-600 hover:bg-emerald-700',
    bgClass: 'bg-emerald-50/50',
    borderClass: 'border-emerald-100',
    benefits: ['Latest slot-wise calibrations', 'Raw score analysis', 'Sectional cutoff forecasts']
  },
  {
    icon: HelpCircle,
    title: 'Specialization Quiz',
    description: 'Match profile to Marketing, Finance, HR, or Ops.',
    cta: 'Take Quiz',
    colorClass: 'bg-violet-600 hover:bg-violet-700',
    bgClass: 'bg-violet-50/50',
    borderClass: 'border-violet-100',
    benefits: ['Career aptitude indexing', 'Saves from wrong choices', 'Detailed reports']
  },
  {
    icon: CheckSquare,
    title: 'GD/PI Strategy Kit',
    description: 'Handling stress interviews and abstract topics.',
    cta: 'Get Interview Kit',
    colorClass: 'bg-amber-600 hover:bg-amber-700',
    bgClass: 'bg-amber-50/50',
    borderClass: 'border-amber-100',
    benefits: ['Case study samples', 'Current affairs sheets', 'Interview answers templates']
  },
]

const TESTIMONIALS = [
  {
    quote: "The CAT strategy guide here helped me move from 85 to 99.4 percentile. The B-school reviews were spot on.",
    name: "Ananya Kapoor",
    detail: "IIM Bangalore, MBA '27",
    avatar: "AK",
  },
  {
    quote: "Consulting case prep was the hardest part for me. This blog's deep dives gave me the framework I needed.",
    name: "Vikram Malhotra",
    detail: "ISB Hyderabad, '26",
    avatar: "VM",
  },
  {
    quote: "Finally, a platform that gives the real ROI numbers of private B-schools instead of just marketing fluff.",
    name: "Siddharth Rao",
    detail: "XLRI Jamshedpur, '28",
    avatar: "SR",
  },
]

const SPECIALTIES = [
  {
    icon: DollarSign,
    title: 'Finance & Banking',
    count: '31 articles',
    textClass: 'text-rose-700',
    description: 'Corporate valuation, risk assessment, portfolio management, stock analysis, and investment banking.',
    scope: 'Investment Banker, Equity Analyst, VC Associate',
    recruiters: 'Goldman Sachs, J.P. Morgan, Morgan Stanley'
  },
  {
    icon: Award,
    title: 'Marketing & Brand',
    count: '24 articles',
    textClass: 'text-sky-700',
    description: 'Consumer psychology, brand management, digital marketing, sales operations, and product marketing.',
    scope: 'Brand Manager, Product Marketer, Digital Lead',
    recruiters: 'HUL, P&G, PepsiCo, L\'Oreal'
  },
  {
    icon: Compass,
    title: 'Consulting & Strategy',
    count: '38 articles',
    textClass: 'text-violet-700',
    description: 'Business restructuring, market entry, operations scaling, and organizational transformation.',
    scope: 'Management Consultant, Strategy Analyst',
    recruiters: 'McKinsey, BCG, Bain, Accenture Strategy'
  },
  {
    icon: Cpu,
    title: 'Product Management',
    count: '29 articles',
    textClass: 'text-amber-700',
    description: 'Product lifecycle planning, UX methodologies, engineering sprints, and growth analytics.',
    scope: 'Product Manager, Technical PM, Growth PM',
    recruiters: 'Amazon, Google, Meta, Uber'
  },
  {
    icon: Settings,
    title: 'Operations & Supply',
    count: '22 articles',
    textClass: 'text-emerald-700',
    description: 'Logistics scaling, inventory math, procurement channels, and manufacturing automation.',
    scope: 'Supply Chain Lead, Logistics Director',
    recruiters: 'Amazon, Flipkart, DHL, Maersk'
  },
  {
    icon: Users,
    title: 'Human Resources',
    count: '18 articles',
    textClass: 'text-teal-700',
    description: 'Talent acquisitions, corporate labor compliance, compensation structures, and training.',
    scope: 'HR Director, Talent Acquisition Lead',
    recruiters: 'Microsoft, Deloitte, Tata Group'
  },
]

const STUDENT_VISUAL = {
  imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
  avatarName: 'Neha, IIM Bangalore \'27',
  goalTitle: 'McKinsey Associate',
  activePrepLabel: 'CAT Mock Prep',
  overlayText: 'Helping business students land at',
  overlaySub: 'IIMs • ISB • XLRI • Top Private B-Schools'
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function MbaBlogPage() {
  return (
    <CourseHubTemplate
      courseId="mba"
      streamName="MBA"
      hubName="MBA Knowledge Hub • 180+ Guides"
      heroTitle="The MBA Blueprint."
      heroGradient="From CAT Strategy to B-Schools."
      heroSubtitle="Mastering Management. India's most comprehensive resource for CAT/GMAT prep, B-school reviews, and corporate career paths."
      searchPlaceholder="Search CAT strategy, IIM reviews, careers..."
      trendingTopics={['CAT 2026', 'IIM Ahmedabad', 'MBA in Finance', 'GMAT Focus', 'Consulting Roles', 'MBA Fees']}
      stats={STATS}
      journeyLevels={JOURNEY_LEVELS}
      freeResources={FREE_RESOURCES}
      testimonials={TESTIMONIALS}
      specialties={SPECIALTIES}
      specialtiesTitle="Explore MBA Specializations"
      specialtiesSubtitle="Compare focus areas, career scopes, and key hiring partners across MBA domains."
      studentVisual={STUDENT_VISUAL}
    />
  )
}