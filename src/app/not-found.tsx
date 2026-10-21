import type { Metadata } from 'next'
import NotFoundPage from '@/components/pages/NotFoundPage'

export const metadata: Metadata = {
  title: '404: Page Not Found | Promote Education',
  description: 'The page you are looking for does not exist or has been moved. Explore 50,000+ top colleges, entrance exams, rankings, and cutoffs on Promote Education.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return <NotFoundPage />
}
