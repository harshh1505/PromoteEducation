import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compare Colleges | Promote Education',
  robots: { index: false, follow: true },
  alternates: {
    canonical: 'https://promoteducation.com/compare',
  },
}

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
