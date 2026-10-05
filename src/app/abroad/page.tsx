import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Study Abroad',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://promoteducation.com/study-abroad',
  },
}

export default function Page() {
  redirect('/study-abroad')
}
