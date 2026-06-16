import type { Metadata } from 'next'
import ExamsListPage from '@/components/pages/exams/ExamsListPage'

export const metadata: Metadata = {
  title: 'Top Entrance Exams in India 2025 — Complete Guide | Promote Education',
  description: 'Explore all major entrance exams in India including JEE Main, NEET, CAT, GATE, CLAT, CUET and more. Get eligibility, syllabus, dates, and preparation tips for every exam.',
  openGraph: {
    title: 'Top Entrance Exams in India 2025 — Complete Guide',
    description: 'Explore all major entrance exams in India including JEE Main, NEET, CAT, GATE, CLAT, CUET and more.',
  },
}

export default function ExamsPage() {
  return <ExamsListPage />
}
