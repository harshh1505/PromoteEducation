import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Education Loan Calculator',
  description: 'Calculate your education loan EMI, interest rates, and repayment schedule for undergraduate and postgraduate studies in India and abroad.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: 'https://promoteducation.com/loan-calculator',
  },
  openGraph: {
    title: 'Education Loan Calculator | Promote Education',
    description: 'Calculate your education loan EMI, interest rates, and repayment schedule for undergraduate and postgraduate studies in India and abroad.',
    url: 'https://promoteducation.com/loan-calculator',
    type: 'website',
  },
}

export default function LoanCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
