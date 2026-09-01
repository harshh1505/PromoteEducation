import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Contact Us | Promote Education',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://promoteducation.com/contact',
  },
}

export default function Page() {
  redirect('/contact')
}
