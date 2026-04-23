'use client'

import React from 'react'
import KnowledgeHubPage from '@/components/pages/KnowledgeHubPage'
import { 
  Layers, GraduationCap, Code, Building, FileText, Briefcase, Users,
  BarChart3
} from 'lucide-react'

// ─── M.Tech Specific Configuration (Same as B.Tech Design) ───────────────────

const CATEGORIES = [
  { id: 'all', label: 'All Articles', icon: Layers, count: 240 },
  { id: 'admission', label: 'Admission Guide', icon: GraduationCap, count: 48 },
  { id: 'branches', label: 'Branch Deep-Dives', icon: Code, count: 36 },
  { id: 'colleges', label: 'College Reviews', icon: Building, count: 52 },
  { id: 'exams', label: 'GATE & Entrance', icon: FileText, count: 29 },
  { id: 'career', label: 'Careers & Salaries', icon: Briefcase, count: 44 },
  { id: 'campus', label: 'Campus Life', icon: Users, count: 31 },
]

const LEVEL_CONFIG = {
  beginner: { label: 'Aspirant', color: '#10b981', bg: '#ecfdf5', ring: '#a7f3d0' },
  intermediate: { label: 'GATE Prep', color: '#0ea5e9', bg: '#f0f7ff', ring: '#bae6fd' },
  advanced: { label: 'Research', color: '#8b5cf6', bg: '#f5f3ff', ring: '#ddd6fe' },
  expert: { label: 'Industry', color: '#f59e0b', bg: '#fffbeb', ring: '#fde68a' },
}

const JOURNEY_LEVELS = [
  {
    level: 'beginner' as const,
    title: 'The Foundation',
    subtitle: 'Class 10 – 12',
    description: 'Stream selection, understanding B.Tech, JEE basics, and building the right mindset.',
    articles: 48,
    icon: '🌱',
    topics: ['PCM Stream Choice', 'What is B.Tech?', 'JEE vs BITSAT vs State Exams', 'Branch Awareness', 'Study Plans'],
  },
  {
    level: 'intermediate' as const,
    title: 'JEE Aspirant',
    subtitle: 'The Grind',
    description: 'Exam strategy, college shortlisting, counseling navigation, and application mastery.',
    articles: 64,
    icon: '⚡',
    topics: ['JEE Mains Strategy', 'JEE Advanced Prep', 'JOSAA Counseling', 'College Shortlisting', 'SOP & Documents'],
  },
  {
    level: 'advanced' as const,
    title: 'B.Tech Student',
    subtitle: 'The Build',
    description: 'Semester survival, CGPA management, internships, projects, and campus placement prep.',
    articles: 71,
    icon: '🔨',
    topics: ['CGPA Strategy', 'Internship Hunt', 'DSA & CP Roadmap', 'Research Projects', 'Placement Prep'],
  },
  {
    level: 'expert' as const,
    title: 'Post B.Tech',
    subtitle: 'The Launch',
    description: 'Career tracks, salary negotiation, higher education, GATE, MBA, and international options.',
    articles: 57,
    icon: '🚀',
    topics: ['Placement Season', 'GATE 2026', 'MS Abroad', 'Startup vs MNC', 'Salary Negotiation'],
  },
]

const TRENDING_TOPICS = [
  'GATE 2026', 'IIT M.Tech', 'Research Papers', 'PSU Jobs',
  'Stipend Updates', 'M.Tech vs MS', 'Specializations', 'Placements',
]

const STATS = [
  { value: '180+', label: 'Research Articles', icon: FileText },
  { value: '45K+', label: 'Active Scholars', icon: Users },
  { value: '25+', label: 'IIT Reviews', icon: Building },
  { value: '10+', label: 'Industry Partners', icon: BarChart3 },
]

const FREE_RESOURCES = [
  {
    icon: '📋',
    title: 'College Preference List Tool',
    description: 'Interactive tool to rank colleges based on your JEE rank, branch interest, and location preferences.',
    cta: 'Build Your List',
    color: '#0284c7',
    bg: '#f0f9ff',
    border: '#bae6fd',
  },
  {
    icon: '📊',
    title: 'Cutoff Analyzer 2025',
    description: 'Download previous year JEE cutoffs for all NITs, IIITs, and GFTIs in a single spreadsheet.',
    cta: 'Download Excel',
    color: '#059669',
    bg: '#ecfdf5',
    border: '#a7f3d0',
  },
  {
    icon: '🎯',
    title: 'Branch Selector Quiz',
    description: 'A 12-question quiz that recommends branches based on your interests, skills, and career goals.',
    cta: 'Take Quiz',
    color: '#7c3aed',
    bg: '#f5f3ff',
    border: '#ddd6fe',
  },
  {
    icon: '📝',
    title: 'SOP & Document Checklist',
    description: 'Comprehensive checklist for JOSAA counseling documents, formats, and timelines.',
    cta: 'Get Checklist',
    color: '#d97706',
    bg: '#fffbeb',
    border: '#fde68a',
  },
]

export default function MtechBlogPage() {
  return (
    <KnowledgeHubPage
      stream="mtech"
      courseTitle="M.Tech"
      heroTagline={<>Mastering the M.Tech.<br /><em style={{ color: '#0284c7' }}>Innovation Starts Here.</em></>}
      categories={CATEGORIES}
      journeyLevels={JOURNEY_LEVELS}
      levelConfig={LEVEL_CONFIG}
      stats={STATS}
      trendingTopics={TRENDING_TOPICS}
      featuredResources={FREE_RESOURCES}
    />
  )
}
