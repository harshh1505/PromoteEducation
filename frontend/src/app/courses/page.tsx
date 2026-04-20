import CoursesPageContent from '@/components/pages/CoursesPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Find Top Courses & Specializations in India',
  description: 'Discover the best undergraduate and postgraduate courses in Engineering, Medical, MBA, and Design. Search by stream and career prospects.',
}

export default function CoursesPage() {
  return <CoursesPageContent />
}
