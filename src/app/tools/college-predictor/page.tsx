import { Metadata } from 'next'
import ClientPage from './ClientPage'

export const metadata: Metadata = {
  title: 'NEET Medical College Predictor 2026 | Promote Education',
  description: 'Predict your chances of getting admission into top Government and Private MBBS/BDS colleges across India based on your NEET rank and marks.',
  keywords: 'NEET College Predictor, medical college predictor, NEET MBBS cutoff, BDS cutoff 2026, NEET rank predictor, AIIMS cutoff',
  alternates: {
    canonical: 'https://promoteducation.com/tools/college-predictor',
  },
}

export default function CollegePredictorPage() {
  return <ClientPage />
}
