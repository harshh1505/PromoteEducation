import RankingsPageContent from '@/components/pages/RankingsPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Top College Rankings 2024 — Engineering, Medical & MBA',
  description: 'Compare the best colleges in India based on NIRF 2024 rankings, placement records, and ROI. Browse top engineering, medical, law, and management institutions.',
}

export default function RankingsPage() {
  return <RankingsPageContent />
}
