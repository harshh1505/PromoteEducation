import type { Metadata } from 'next'
import ExamsListPage from '@/components/pages/exams/ExamsListPage'

export const metadata: Metadata = {
  title: 'Top Entrance Exams in India 2027 — Complete Guide',
  description: 'Explore all major entrance exams in India including JEE Main, NEET, CAT, GATE, CLAT, CUET and more. Get eligibility, syllabus, dates, and preparation tips for every exam.',
  keywords: ['entrance exams in india 2027', 'jee main 2027', 'neet 2027', 'cat exam', 'gate 2027', 'clat exam', 'cuet ug 2027'],
  alternates: {
    canonical: 'https://promoteducation.com/exams',
  },
  openGraph: {
    title: 'Top Entrance Exams in India 2027 — Complete Guide | Promote Education',
    description: 'Explore all major entrance exams in India including JEE Main, NEET, CAT, GATE, CLAT, CUET and more.',
    url: 'https://promoteducation.com/exams',
    type: 'website',
  },
}

export default function ExamsPage() {
  return <ExamsListPage />
}
