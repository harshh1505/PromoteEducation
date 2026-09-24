import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compare Colleges',
  description: 'Compare top colleges in India side-by-side. Compare NIRF rankings, courses, tuition fees, placements, and infrastructure.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: 'https://promoteducation.com/compare',
  },
  openGraph: {
    title: 'Compare Colleges Side by Side | Promote Education',
    description: 'Compare top colleges in India side-by-side. Compare NIRF rankings, courses, tuition fees, placements, and infrastructure.',
    url: 'https://promoteducation.com/compare',
    type: 'website',
  },
}

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
