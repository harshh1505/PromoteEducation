import NewsPageContent from '@/components/pages/NewsPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Latest Education News & Exam Alerts 2024',
  description: 'Stay updated with the latest news on JEE, NEET, admissions, and policy changes in the Indian education sector. Real-time alerts and analysis.',
}

export default function NewsPage() {
  return <NewsPageContent />
}
