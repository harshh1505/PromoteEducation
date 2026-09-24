import type { Metadata } from 'next'
import ExamsListPage from '@/components/pages/exams/ExamsListPage'

export const metadata: Metadata = {
  title: 'Top Entrance Exams in India 2026 — Complete Guide',
  description: 'Explore all major entrance exams in India including JEE Main, NEET, CAT, GATE, CLAT, CUET and more. Get eligibility, syllabus, dates, and preparation tips for every exam.',
  keywords: ['entrance exams in india 2026', 'jee main 2026', 'neet 2026', 'cat exam', 'gate 2026', 'clat exam', 'cuet ug 2026'],
  alternates: {
    canonical: 'https://promoteducation.com/exams',
  },
  openGraph: {
    title: 'Top Entrance Exams in India 2026 — Complete Guide | Promote Education',
    description: 'Explore all major entrance exams in India including JEE Main, NEET, CAT, GATE, CLAT, CUET and more.',
    url: 'https://promoteducation.com/exams',
    type: 'website',
  },
}

export default function ExamsPage() {
  return <ExamsListPage />
}
