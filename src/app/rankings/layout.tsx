import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Top College Rankings 2026 — Engineering, Medical, Law & MBA',
  description: 'Official rankings for top colleges in India. Compare institutions by NIRF score, Average Package, Fees, and placement records. Find the best colleges for Engineering, Medical, Management, and Law.',
  alternates: {
    canonical: 'https://promoteducation.com/rankings',
  },
  openGraph: {
    title: 'Top College Rankings 2026 — Engineering, Medical, Law & MBA | Promote Education',
    description: 'Official rankings for top colleges in India. Compare institutions by NIRF score, Average Package, Fees, and placement records.',
    url: 'https://promoteducation.com/rankings',
    type: 'website',
  },
}

export default function RankingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
