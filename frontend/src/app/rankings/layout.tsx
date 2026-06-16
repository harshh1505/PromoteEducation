import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Top College Rankings 2025 — Engineering, Medical, Law & MBA',
  description: 'Official 2025 rankings for top colleges in India. Compare institutions by NIRF score, Average Package, Fees, and placement records. Find the best colleges for Engineering, Medical, Management, and Law.',
}

export default function RankingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
