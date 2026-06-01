'use client'

import React from 'react'
import CourseHubTemplate from '@/components/pages/CourseHubTemplate'
import {
  FileText, Users, Building, BarChart3, Compass, Target, Cpu, Award,
  ClipboardList, HelpCircle, CheckSquare, Code, Settings, Star, FlaskConical
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
    description: 'Understanding BDS course structure, NEET UG eligibility criteria, and building a foundation in biology.',
    articles: 48,
    icon: Compass,
    topics: ['PCB Stream Choice', 'What is BDS?', 'NEET UG Strategy', 'Dentistry Awareness', 'Study Plans'],
    extendedInfo: 'Developing an understanding of dental anatomy basics, choosing between MBBS and BDS, and scoring high in biology/chemistry.'
  },
  {
    level: 'intermediate' as const,
    title: 'NEET Aspirant',
    subtitle: 'The Grind',
    description: 'NEET exam strategy, dental college selection cutoffs, MCC counseling, and seat locking guidance.',
    articles: 64,
    icon: Target,
    topics: ['NEET UG Strategy', 'Physics for NEET', 'Chemistry for NEET', 'Biology for NEET', 'Counseling Guide'],
    extendedInfo: 'Formulating slot strategies, managing negative marking, and shortlisting government vs private BDS seats.'
  },
  {
    level: 'advanced' as const,
    title: 'BDS Student',
    subtitle: 'The Build',
    description: 'First year BDS academics, pre-clinical lab routines, clinical patient management, and NEET-MDS prep.',
    articles: 71,
    icon: Cpu,
    topics: ['Anatomy & Physiology', 'Dental Materials', 'Pre-clinical Prosthodontics', 'Clinical Postings', 'NEET-MDS Prep'],
    extendedInfo: 'Surviving biochemistry and oral pathology, learning dental carving, taking patient histories, and mastering root canals.'
  },
  {
    level: 'expert' as const,
    title: 'Post BDS',
    subtitle: 'The Launch',
    description: 'Private practice startup strategies, MDS entrance exams, dental hospital jobs, and overseas licensing.',
    articles: 57,
    icon: Award,
    topics: ['NEET-MDS 2026', 'Private Practice', 'Dentist Salary Guide', 'MDS Specializations', 'Overseas Licensing'],
    extendedInfo: 'Acquiring clinic management skills, preparing for MDS (Master of Dental Surgery) specialization, or clearing licensing exams (like ORE, NDEB) for abroad.'
  },
]

const FREE_RESOURCES = [
  {
    icon: ClipboardList,
    title: 'Dental College Preference List Tool',
    description: 'Interactive tool to rank dental colleges based on your NEET rank, location preferences, and patient flow.',
    cta: 'Build Your List',
    colorClass: 'bg-sky-600 hover:bg-sky-700',
    bgClass: 'bg-sky-50/50',
    borderClass: 'border-sky-100',
    benefits: ['NEET-UG dental preference builder', 'State quota adjustments', 'Patient inflow analytics']
  },
  {
    icon: BarChart3,
    title: 'NEET Cutoff Analyzer 2025',
    description: 'Download previous year NEET cutoffs for all Govt and Private Dental Colleges in a single spreadsheet.',
    cta: 'Download Excel',
    colorClass: 'bg-emerald-600 hover:bg-emerald-700',
    bgClass: 'bg-emerald-50/50',
    borderClass: 'border-emerald-100',
    benefits: ['5-year BDS cutoff database', 'HS vs AIQ filters', 'Deemed universities rank maps']
  },
  {
    icon: HelpCircle,
    title: 'MDS Specialization Selector',
    description: 'A 12-question quiz that recommends MDS branches based on your interests, skills, and career goals.',
    cta: 'Take Quiz',
    colorClass: 'bg-violet-600 hover:bg-violet-700',
    bgClass: 'bg-violet-50/50',
    borderClass: 'border-violet-100',
    benefits: ['Aptitude & manual dexterity profile', 'Clinical vs non-clinical scopes', 'MDS job growth reports']
  },
  {
    icon: CheckSquare,
    title: 'SOP & Document Checklist',
    description: 'Comprehensive checklist for MCC counseling documents, formats, and timelines.',
    cta: 'Get Checklist',
    colorClass: 'bg-amber-600 hover:bg-amber-700',
    bgClass: 'bg-amber-50/50',
    borderClass: 'border-amber-100',
    benefits: ['Document verification checklist', 'Bond penalty guidelines', 'Medical fitness templates']
  },
]

const TESTIMONIALS = [
  {
    quote: "This blog guided my BDS admission journey perfectly. The MCC counseling guides saved me from wasting my NEET rank on a low-patient-flow college.",
    name: "Rahul Sharma",
    detail: "MAMC Delhi, BDS '28",
    avatar: "RS",
  },
  {
    quote: "The specialization comparisons helped me choose Orthodontics over Pedodontics. Best career move of my life.",
    name: "Priya Patel",
    detail: "GDC Mumbai, MDS '26",
    avatar: "PP",
  },
  {
    quote: "An honest look at setup costs for dental clinics and real dentist salary reports across India. Far better than marketing brochures.",
    name: "Arjun Nair",
    detail: "Manipal Dental, BDS '27",
    avatar: "AN",
  },
]

const SPECIALTIES = [
  {
    icon: FlaskConical,
    title: 'Oral & Maxillofacial Surgery',
    count: '48 articles',
    textClass: 'text-rose-700',
    description: 'Oral pathology, wisdom teeth extraction, jaw reconstructions, trauma treatments, and cosmetic oral surgery.',
    scope: 'Oral Surgeon, Facial Trauma Consultant',
    recruiters: 'Apollo Hospitals, Max Healthcare, Military Dental Corps'
  },
  {
    icon: Settings,
    title: 'Orthodontics & Dentofacial Orthopedics',
    count: '36 articles',
    textClass: 'text-sky-700',
    description: 'Correction of dental malocclusions, alignment design, clear aligners (Invisalign), and skeletal growth modification.',
    scope: 'Orthodontist, Clear Aligner Specialist',
    recruiters: 'Clove Dental, Dentzz, Private Orthodontic Practice'
  },
  {
    icon: Cpu,
    title: 'Endodontics & Conservative Dentistry',
    count: '31 articles',
    textClass: 'text-violet-700',
    description: 'Advanced root canal therapies, aesthetic composite restorations, veneers, crowns, and micro-dentistry.',
    scope: 'Endodontist, Cosmetic Dentist Specialist',
    recruiters: 'Dental Care Chains, Corporate Dental Clinics'
  },
  {
    icon: Code,
    title: 'Prosthodontics',
    count: '27 articles',
    textClass: 'text-amber-700',
    description: 'Full mouth rehabilitation, dental implants, complete and partial dentures, and maxillofacial prosthetics.',
    scope: 'Prosthodontist, Implantologist',
    recruiters: 'Implant R&D Labs, Multispecialty Hospitals'
  },
  {
    icon: Users,
    title: 'Pedodontics',
    count: '24 articles',
    textClass: 'text-emerald-700',
    description: 'Pediatric dental care, preventive sealants, space maintainers, and child behavior management during procedures.',
    scope: 'Pediatric Dentist, School Health Consultant',
    recruiters: 'Rainbow Children\'s Hospital, Cloudnine'
  },
  {
    icon: Star,
    title: 'Periodontology',
    count: '19 articles',
    textClass: 'text-teal-700',
    description: 'Treatment of gum diseases, surgical periodontics, bone grafting, aesthetic gum contouring, and implants.',
    scope: 'Periodontist, Periodontal Surgeon',
    recruiters: 'Private Practice, Dental Research Institutes'
  },
]

const STUDENT_VISUAL = {
  imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
  avatarName: 'Priya, GDC Mumbai MDS \'26',
  goalTitle: 'Invisalign Consultant',
  activePrepLabel: 'NEET MDS Rank 150',
  overlayText: 'Helping dental students land at',
  overlaySub: 'MAMC • GDC Mumbai • Manipal Dental • Top Dental Colleges'
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BdsBlogPage() {
  return (
    <CourseHubTemplate
      courseId="bds"
      streamName="BDS"
      hubName="BDS Knowledge Hub • 240+ Articles"
      heroTitle="Everything BDS."
      heroGradient="Mastering Dentistry."
      heroSubtitle="Your complete dental career guide. India's most comprehensive resource for NEET UG dental preparation, clinical practices, and MDS pathways."
      searchPlaceholder="Search NEET dental strategy, Govt vs Private BDS, MDS entrance..."
      trendingTopics={['NEET UG 2026', 'NEET-MDS Prep', 'AIIMS Dental', 'Dentist Salary', 'MCC Counseling', 'Private Dental Colleges', 'MDS Ortho', 'BDS Fees']}
      stats={STATS}
      journeyLevels={JOURNEY_LEVELS}
      freeResources={FREE_RESOURCES}
      testimonials={TESTIMONIALS}
      specialties={SPECIALTIES}
      specialtiesTitle="Explore Dental Specializations"
      specialtiesSubtitle="Compare surgical skills, career paths, and corporate placement partners across dental domains."
      studentVisual={STUDENT_VISUAL}
    />
  )
}