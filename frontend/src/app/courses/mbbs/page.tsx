'use client'

import React from 'react'
import CourseHubTemplate from '@/components/pages/CourseHubTemplate'
import {
  FileText, Users, Building, BarChart3, Compass, Target, Cpu, Award,
  ClipboardList, HelpCircle, CheckSquare, Activity, Eye, FlaskConical, Star
} from 'lucide-react'

// ─── Data Configuration ───────────────────────────────────────────────────────

const STATS = [
  { value: '260+', label: 'Clinical Articles', icon: FileText },
  { value: '3.1L+', label: 'Monthly Readers', icon: Users },
  { value: '60+', label: 'Medical Reviews', icon: Building },
  { value: '18+', label: 'Years of Data', icon: BarChart3 },
]

const JOURNEY_LEVELS = [
  {
    level: 'beginner' as const,
    title: 'The Foundation',
    subtitle: 'Class 10 – 12',
    description: 'PCB stream selection, understanding MBBS scope, NEET basics, and medical preparation.',
    articles: 52,
    icon: Compass,
    topics: ['PCB Stream Choice', 'What is MBBS?', 'NEET vs AIIMS', 'Biology Deep Dive', 'Study Plans'],
    extendedInfo: 'Building conceptual clarity in Physics, Chemistry, and Biology, and deciding early on medical paths.'
  },
  {
    level: 'intermediate' as const,
    title: 'NEET Aspirant',
    subtitle: 'The Grind',
    description: 'Mock test strategy, college shortlisting, MCC counseling navigation, and state quota mastery.',
    articles: 68,
    icon: Target,
    topics: ['NEET UG Strategy', 'Physics & Chem Prep', 'MCC Counseling', 'State vs AIQ Quota', 'Document Verification'],
    extendedInfo: 'Focusing on NEET MCQ practices, handling negative marking, and choice-locking preferences during MCC seat allocation.'
  },
  {
    level: 'advanced' as const,
    title: 'MBBS Student',
    subtitle: 'The Clinic',
    description: 'Pre-clinical year survival, clinical postings, USMLE/PLAB prep, and internship excellence.',
    articles: 74,
    icon: Cpu,
    topics: ['Pre-Clinical Strategy', 'Clinical Postings', 'USMLE Step 1 Prep', 'Research & Papers', 'Internship Guide'],
    extendedInfo: 'Surviving anatomy, biochemistry, starting ward rounds, preparing clinical reports, and practicing diagnosing patients.'
  },
  {
    level: 'expert' as const,
    title: 'Post MBBS / Residency',
    subtitle: 'The Calling',
    description: 'NEET-PG strategy, MD/MS/Diploma choices, super-specializations, and international medicine.',
    articles: 66,
    icon: Award,
    topics: ['NEET-PG 2026', 'MD vs MS Choice', 'USMLE Pathway', 'Hospital Jobs', 'Research Fellowship'],
    extendedInfo: 'Preparing for NEET-PG/NEXT exams, deciding between MD (Medicine) vs MS (Surgery), or exploring international pathways.'
  },
]

const FREE_RESOURCES = [
  {
    icon: ClipboardList,
    title: 'College Preference List Tool',
    description: 'Build choice preference lists based on NEET ranks and state quotas.',
    cta: 'Build Your List',
    colorClass: 'bg-sky-600 hover:bg-sky-700',
    bgClass: 'bg-sky-50/50',
    borderClass: 'border-sky-100',
    benefits: ['NEET-UG choice filling helper', 'State quota predictions', 'Bond penalty calculators']
  },
  {
    icon: BarChart3,
    title: 'Cutoff Analyzer 2025',
    description: 'MCC closing ranks database for government, deemed, and private medical colleges.',
    cta: 'Download Excel',
    colorClass: 'bg-emerald-600 hover:bg-emerald-700',
    bgClass: 'bg-emerald-50/50',
    borderClass: 'border-emerald-100',
    benefits: ['5-year cutoff database', 'HS vs AIQ filters', 'Deemed universities rank analysis']
  },
  {
    icon: HelpCircle,
    title: 'Specialization Quiz',
    description: 'Aptitude quiz recommending ideal MD/MS clinical fields.',
    cta: 'Take Quiz',
    colorClass: 'bg-violet-600 hover:bg-violet-700',
    bgClass: 'bg-violet-50/50',
    borderClass: 'border-violet-100',
    benefits: ['Clinical aptitude test', 'Saves from residency fatigue', 'Lifestyle-fit analysis']
  },
  {
    icon: CheckSquare,
    title: 'MCC Counseling Checklist',
    description: 'Checklist for counseling documentation, round schedules, and stray rounds.',
    cta: 'Get Checklist',
    colorClass: 'bg-amber-600 hover:bg-amber-700',
    bgClass: 'bg-amber-50/50',
    borderClass: 'border-amber-100',
    benefits: ['Document templates', 'Stray round schedules', 'Category certificate dates']
  },
]

const TESTIMONIALS = [
  {
    quote: "This blog single-handedly guided my MBBS admission journey. The MCC counseling guide saved me from making huge mistakes in choice filling.",
    name: "Neha Sharma",
    detail: "AIIMS New Delhi, MBBS '28",
    avatar: "NS",
  },
  {
    quote: "The specialization comparison articles helped me choose Radiology over a lower-ranked MD General Medicine seat. Best decision of my life.",
    name: "Arjun Pillai",
    detail: "Maulana Azad Medical College, '26",
    avatar: "AP",
  },
  {
    quote: "I was confused between deemed and government medical colleges. The college reviews and fee ROI analysis gave me absolute clarity. No regrets.",
    name: "Divya Menon",
    detail: "Grant Medical College, Mumbai, '27",
    avatar: "DM",
  },
]

const SPECIALTIES = [
  {
    icon: Activity,
    title: 'Cardiology',
    count: '38 articles',
    textClass: 'text-rose-700',
    description: 'Diagnosis and treatment of heart conditions, electrocardiography, angioplasty, and cardiovascular surgery.',
    scope: 'Interventional Cardiologist, Cardiovascular Lead',
    recruiters: 'Apollo Hospitals, Fortis, Medanta'
  },
  {
    icon: Eye,
    title: 'Radiology',
    count: '29 articles',
    textClass: 'text-sky-700',
    description: 'Diagnostic interpretation using X-rays, MRI, CT scans, ultrasound, and nuclear medicine.',
    scope: 'Consultant Radiologist, Diagnostic Lead',
    recruiters: 'Max Healthcare, Manipal, Columbia Asia'
  },
  {
    icon: FlaskConical,
    title: 'General Surgery',
    count: '42 articles',
    textClass: 'text-violet-700',
    description: 'Operative procedures on endocrine systems, gastrointestinal tract, liver, and trauma care.',
    scope: 'General Surgeon, Medical Officer',
    recruiters: 'AIIMS, MAMC, Apollo Hospitals'
  },
  {
    icon: Users,
    title: 'Pediatrics',
    count: '31 articles',
    textClass: 'text-amber-700',
    description: 'Medical care of infants, children, and adolescents, growth development, and pediatric infections.',
    scope: 'Consultant Pediatrician, Neonatologist',
    recruiters: 'Rainbow Children\'s Hospital, Cloudnine'
  },
  {
    icon: Star,
    title: 'Dermatology',
    count: '24 articles',
    textClass: 'text-emerald-700',
    description: 'Clinical diagnosis of skin disorders, cosmetic dermatology, laser surgeries, and allergen research.',
    scope: 'Consultant Dermatologist, Cosmetologist',
    recruiters: 'Kaya Clinic, VLCC, Private Practice'
  },
  {
    icon: Cpu,
    title: 'Neurology',
    count: '27 articles',
    textClass: 'text-teal-700',
    description: 'Treatment of brain disorders, spinal cord injuries, nerve pathways, and neuro-surgical interventions.',
    scope: 'Neurologist, Neuro-surgeon',
    recruiters: 'NIMHANS, Medanta, Fortis Healthcare'
  },
]

const STUDENT_VISUAL = {
  imageUrl: 'https://images.unsplash.com/photo-1594824497964-58615b41637b?auto=format&fit=crop&q=80&w=800',
  avatarName: 'Neha, AIIMS New Delhi \'28',
  goalTitle: 'AIIMS Resident',
  activePrepLabel: 'NEET UG Prep',
  overlayText: 'Helping medical students land at',
  overlaySub: 'AIIMS • MAMC • KGMU • Top Government Medical Colleges'
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function MbbsBlogPage() {
  return (
    <CourseHubTemplate
      courseId="mbbs"
      streamName="MBBS"
      hubName="MBBS Knowledge Hub • 260+ Articles"
      heroTitle="Mastering Medicine."
      heroGradient="Your White Coat Awaits."
      heroSubtitle="India's most comprehensive resource for NEET UG preparation, medical college reviews, and clinical residency roadmaps."
      searchPlaceholder="Search NEET strategy, AIIMS vs MAMC, PG entrance..."
      trendingTopics={['NEET 2026', 'AIIMS Delhi', 'PG Entrance', 'USMLE Step 1', 'Stipend Updates', 'Bond Policy']}
      stats={STATS}
      journeyLevels={JOURNEY_LEVELS}
      freeResources={FREE_RESOURCES}
      testimonials={TESTIMONIALS}
      specialties={SPECIALTIES}
      specialtiesTitle="Explore Clinical Specializations"
      specialtiesSubtitle="Compare focus areas, career scopes, and top research hubs across key medical fields."
      studentVisual={STUDENT_VISUAL}
    />
  )
}