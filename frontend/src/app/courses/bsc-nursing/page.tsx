'use client'

import React from 'react'
import CourseHubTemplate from '@/components/pages/CourseHubTemplate'
import {
  FileText, Users, Building, BarChart3, Compass, Target, Cpu, Award,
  ClipboardList, HelpCircle, CheckSquare, Code, Settings, Star, FlaskConical
} from 'lucide-react'

// ─── Data Configuration ───────────────────────────────────────────────────────

const STATS = [
  { value: '140+', label: 'Clinical Guides', icon: FileText },
  { value: '1.2L+', label: 'Monthly Readers', icon: Users },
  { value: '35+', label: 'College Reviews', icon: Building },
  { value: '10+', label: 'Years of Data', icon: BarChart3 },
]

const JOURNEY_LEVELS = [
  {
    level: 'beginner' as const,
    title: 'Aspiring Nurse',
    subtitle: 'Class 10 – 12',
    description: 'Understanding B.Sc Nursing scope, NEET vs AIIMS entrance patterns, eligibility, and early choice guides.',
    articles: 28,
    icon: Compass,
    topics: ['What is B.Sc Nursing?', 'NEET-UG for Nursing', 'AIIMS Nursing Exam', 'Selection Criteria', 'Private vs Govt'],
    extendedInfo: 'Making the decision to choose professional nursing, understanding registration boards, and scoring high on entrance exams.'
  },
  {
    level: 'intermediate' as const,
    title: 'Nursing Student',
    subtitle: 'The Training',
    description: 'First year fundamentals, clinical ward rotations, anatomy/physiology preparation, and semester exams.',
    articles: 42,
    icon: Cpu,
    topics: ['Clinical Fundamentals', 'Anatomy & Physiology', 'Drug Calculations', 'Patient Care Plans', 'Viva Strategy'],
    extendedInfo: 'Learning drug administration math, preparing care plan files, doing vital checks, and performing clinical procedures under guidance.'
  },
  {
    level: 'advanced' as const,
    title: 'Professional',
    subtitle: 'The Practice',
    description: 'Hospital internships, clinical case study submissions, NORCET preparation, and staff nurse registration.',
    articles: 51,
    icon: Target,
    topics: ['NORCET 2026 Strategy', 'Hospital Internships', 'Licensing Exams', 'Staff Nurse Roles', 'Specialty Nursing'],
    extendedInfo: 'Acquiring hands-on specialty experience in emergency/maternity wards, revising NORCET mock materials, and clearing licensing exams.'
  },
  {
    level: 'expert' as const,
    title: 'Advanced Practice',
    subtitle: 'The Lead',
    description: 'M.Sc Nursing courses, ICU super-specialization, clinical leadership roles, and NCLEX-RN preparation for overseas.',
    articles: 35,
    icon: Award,
    topics: ['Critical Care Nursing', 'Teaching Careers', 'International (NCLEX)', 'Nursing Research', 'Admin Roles'],
    extendedInfo: 'Applying for higher studies (M.Sc), moving into nursing education (Tutor/Lecturer), or clearing NCLEX exams to practice in the USA/UK/Canada.'
  },
]

const FREE_RESOURCES = [
  {
    icon: ClipboardList,
    title: 'Nursing College Predictor',
    description: 'Predict top AIIMS and State nursing colleges based on your entrance score and category.',
    cta: 'Predict Now',
    colorClass: 'bg-sky-600 hover:bg-sky-700',
    bgClass: 'bg-sky-50/50',
    borderClass: 'border-sky-100',
    benefits: ['Entrance-based choice filling', 'AIIMS seat matrices', 'State quota predictors']
  },
  {
    icon: Settings,
    title: 'Clinical Skills Checklist',
    description: 'Complete checklist of essential procedures and clinical competencies for first-year nursing students.',
    cta: 'Download PDF',
    colorClass: 'bg-emerald-600 hover:bg-emerald-700',
    bgClass: 'bg-emerald-50/50',
    borderClass: 'border-emerald-100',
    benefits: ['First year step-by-step procedures', 'ICU monitoring logs', 'Sterilization standards check']
  },
  {
    icon: HelpCircle,
    title: 'NORCET Mock Analysis',
    description: 'Get our expert analysis of previous year NORCET papers and high-weightage topics.',
    cta: 'Get Analysis',
    colorClass: 'bg-violet-600 hover:bg-violet-700',
    bgClass: 'bg-violet-50/50',
    borderClass: 'border-violet-100',
    benefits: ['Weightage analysis of key subjects', 'Scenario-based question formats', 'Section-wise cutoffs']
  },
  {
    icon: CheckSquare,
    title: 'Admission Checklist',
    description: 'Comprehensive guide to documents required for nursing admission across all states.',
    cta: 'View Checklist',
    colorClass: 'bg-amber-600 hover:bg-amber-700',
    bgClass: 'bg-amber-50/50',
    borderClass: 'border-amber-100',
    benefits: ['Registration board forms', 'Health clearance templates', 'Quota certificates guide']
  },
]

const TESTIMONIALS = [
  {
    quote: "The NORCET study guide and scenario-based question breakdown helped me land my dream placement at AIIMS Rishikesh. Forever grateful!",
    name: "Sneha Reddy",
    detail: "AIIMS Rishikesh, Staff Nurse '26",
    avatar: "SR",
  },
  {
    quote: "As a student, I was struggling with drug math. The formulas and guides here saved my clinical grades during the first semester.",
    name: "Rahul Verma",
    detail: "CMC Vellore, B.Sc Nursing '27",
    avatar: "RV",
  },
  {
    quote: "I was confused between ANM/GNM and B.Sc Nursing. The articles here clear out the salary difference and growth scope clearly.",
    name: "Meera Das",
    detail: "SNDT Mumbai, B.Sc Nursing '28",
    avatar: "MD",
  },
]

const SPECIALTIES = [
  {
    icon: Settings,
    title: 'Critical Care / ICU Nursing',
    count: '38 articles',
    textClass: 'text-rose-700',
    description: 'Ventilator management, emergency resuscitation protocols, patient monitoring, and post-operative recovery care.',
    scope: 'ICU Nurse Specialist, Critical Care Supervisor',
    recruiters: 'Medanta, Fortis Healthcare, Apollo Hospitals'
  },
  {
    icon: Users,
    title: 'Neonatal & Pediatric Nursing',
    count: '29 articles',
    textClass: 'text-sky-700',
    description: 'Infant vascular access, pediatric oncology, NICU/PICU clinical protocols, and pediatric development milestones.',
    scope: 'Neonatal Nurse Specialist, NICU Charge Nurse',
    recruiters: 'Rainbow Children\'s Hospital, Cloudnine Hospitals'
  },
  {
    icon: Star,
    title: 'Cardiovascular Nursing',
    count: '31 articles',
    textClass: 'text-violet-700',
    description: 'ECG interpretation, cardiac catheterization lab support, post-bypass recovery, and cardiac rehabilitation.',
    scope: 'Cardiac Nurse Specialist, Cath Lab Coordinator',
    recruiters: 'Max Healthcare, Escorts Heart Institute, Medanta'
  },
  {
    icon: FlaskConical,
    title: 'Oncology Nursing',
    count: '24 articles',
    textClass: 'text-amber-700',
    description: 'Chemotherapy safety standards, pain management, palliative care, and radiation safety protocols.',
    scope: 'Oncology Nurse Practitioner, Palliative Coordinator',
    recruiters: 'Tata Memorial Hospital, Rajiv Gandhi Cancer Institute'
  },
  {
    icon: Compass,
    title: 'Public Health Nursing',
    count: '27 articles',
    textClass: 'text-emerald-700',
    description: 'Community health programs, vaccination campaigns, public health policies, and healthcare NGO coordination.',
    scope: 'Community Health Officer, NGO Health Director',
    recruiters: 'WHO India, UNICEF, National Health Mission'
  },
  {
    icon: HelpCircle,
    title: 'Psychiatric Nursing',
    count: '18 articles',
    textClass: 'text-teal-700',
    description: 'Psychotherapy assistance, mental crisis management, substance abuse rehabilitation, and behavioral counseling.',
    scope: 'Psychiatric Nurse Practitioner, Rehab Supervisor',
    recruiters: 'NIMHANS, Cadabams, Psychiatric Care Centers'
  },
]

const STUDENT_VISUAL = {
  imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
  avatarName: 'Sneha, AIIMS Rishikesh \'26',
  goalTitle: 'AIIMS Nursing Officer',
  activePrepLabel: 'NORCET Rank 240',
  overlayText: 'Helping nursing candidates land at',
  overlaySub: 'AIIMS • CMC Vellore • BHU • Top Government Nursing Colleges'
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function NursingBlogPage() {
  return (
    <CourseHubTemplate
      courseId="bsc-nursing"
      streamName="B.Sc Nursing"
      hubName="Nursing Knowledge Hub • 140+ Guides"
      heroTitle="Compassion Meets Excellence."
      heroGradient="Your Nursing Career Starts Here."
      heroSubtitle="Mastering Clinical Care. India's most comprehensive resource for AIIMS Nursing preparation, clinical skills, and professional career paths."
      searchPlaceholder="Search AIIMS Nursing strategy, clinical skills, NORCET..."
      trendingTopics={['NORCET 2026', 'AIIMS Nursing', 'Staff Nurse Salary', 'ICU Nursing', 'Nursing vs MBBS', 'Top Nursing Colleges', 'ANM/GNM vs BSc', 'NCLEX Exam']}
      stats={STATS}
      journeyLevels={JOURNEY_LEVELS}
      freeResources={FREE_RESOURCES}
      testimonials={TESTIMONIALS}
      specialties={SPECIALTIES}
      specialtiesTitle="Explore Nursing Specializations"
      specialtiesSubtitle="Compare clinical wards, career growth pathways, and top hiring hospitals across nursing specialties."
      studentVisual={STUDENT_VISUAL}
    />
  )
}