import MedicalCollegeKolkataContent from '@/components/pages/colleges/MedicalCollegeKolkataContent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Medical College Kolkata | Admission, Cutoff, Ranking 2026',
  description: 'Complete guide to Medical College Kolkata admissions 2026. Get latest NEET cutoff, fee structure, courses, and ranking for Asia\'s oldest medical institution.',
  keywords: ['Medical College Kolkata', 'Calcutta Medical College', 'Medical College Kolkata admission', 'Medical College Kolkata cutoff', 'Medical College Kolkata courses', 'Medical College Kolkata ranking']
}

export default function Page() {
  return <MedicalCollegeKolkataContent />
}
