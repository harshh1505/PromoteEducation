import type { Metadata } from 'next'
import CoursesClient from './CoursesClient'

export const metadata: Metadata = {
  title: 'Best Courses in India 2026 - UG/PG Courses List, Eligibility & Career Scope',
  description: 'Explore 500+ courses in India. Find eligibility, career scope, average salary for B.Tech, MBBS, MBA, BA, B.Sc, BCA, MCA and more. Complete course guide for admission 2026.',
  keywords: ['best courses in india 2026', 'ug courses list', 'pg courses list', 'engineering courses', 'medical courses', 'management courses'],
  alternates: {
    canonical: 'https://promoteducation.com/courses',
  },
  openGraph: {
    title: 'Best Courses in India 2026 - UG/PG Courses List, Eligibility & Career Scope | Promote Education',
    description: 'Explore 500+ courses in India. Find eligibility, career scope, average salary for all major streams.',
    url: 'https://promoteducation.com/courses',
    type: 'website',
  },
}

export default function CoursesPage() {
  return <CoursesClient />
}
