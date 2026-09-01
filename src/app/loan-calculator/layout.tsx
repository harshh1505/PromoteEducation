import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Education Loan Calculator | Promote Education',
  robots: { index: false, follow: true },
  alternates: {
    canonical: 'https://promoteducation.com/loan-calculator',
  },
}

export default function LoanCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
