import LoanCalculatorPageContent from '@/components/pages/LoanCalculatorPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Education Loan EMI Calculator — Plan Your Studies',
  description: 'Calculate your monthly loan repayments (EMI) with our easy-to-use tool. Compare interest rates, principal vs. interest, and tax benefits for education loans in India.',
}

export default function LoanCalculatorPage() {
  return <LoanCalculatorPageContent />
}
