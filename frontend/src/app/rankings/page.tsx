import { Suspense } from 'react'
import RankingsPageContent from '@/components/pages/RankingsPage'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Top College Rankings 2025 — Engineering, Medical, Law & MBA',
  description: 'Official 2025 rankings for top colleges in India. Compare institutions by NIRF score, Average Package, Fees, and placement records. Find the best colleges for Engineering, Medical, Management, and Law.',
}

export default function RankingsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-slate-400 text-sm">Loading rankings...</div>}>
      <RankingsPageContent />
    </Suspense>
  )
}
