import type { Metadata } from 'next'
import AIIMSKalyaniContent from '@/components/pages/colleges/AIIMSKalyaniContent'

export const metadata: Metadata = {
  title: 'AIIMS Kalyani: Courses, Admission Process, Eligibility & Campus Details (2026 Guide)',
  description: 'Explore AIIMS Kalyani courses, eligibility, admission process, infrastructure, student life, and career opportunities in this complete 2026 guide.',
  alternates: {
    canonical: '/colleges/aiims-kalyani',
  },
  openGraph: {
    title: 'AIIMS Kalyani: Admission Guide 2026',
    description: 'Complete guide to AIIMS Kalyani courses and admissions.',
    type: 'website',
  },
}

export default function AIIMSKalyaniPage() {
  return <AIIMSKalyaniContent />
}
