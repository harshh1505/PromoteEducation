import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) | Promote Education',
  description: 'Find answers to common questions about college admissions, NEET & JEE counseling, seat allocation, tuition fees, and admission guidance at Promote Education.',
  alternates: {
    canonical: 'https://promoteducation.com/faq',
  },
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
