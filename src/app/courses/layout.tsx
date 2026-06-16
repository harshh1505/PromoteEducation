import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Best Courses in India 2026 - UG/PG Courses List, Eligibility & Career Scope',
    template: '%s | Promote Education'
  },
  description: 'Explore 500+ courses in India. Find eligibility, career scope, average salary for B.Tech, MBBS, MBA, BA, B.Sc and more. Complete course guide for admission 2026.',
  keywords: [
    'best courses in india 2026',
    'ug courses list',
    'pg courses',
    'higher education courses',
    'b.tech courses',
    'mba courses',
    'medical courses',
    'engineering courses',
    'science courses after 12th',
    'course eligibility',
    'career scope courses india',
    'course duration'
  ],
  alternates: {
    canonical: '/courses',
  },
  openGraph: {
    title: 'Best Courses in India 2026 - UG/PG Courses List, Eligibility & Career Scope',
    description: 'Explore 500+ courses in India. Find eligibility, career scope, average salary for all major streams.',
    url: 'https://promoteducation.com/courses',
  },
}

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return children
}