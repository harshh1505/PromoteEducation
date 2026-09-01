import React from 'react'
import ContactUsPage from '@/components/pages/ContactUsPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Promote Education - Admissions Counseling & Guidance',
  description: 'Get in touch with Promote Education. Contact our senior admission counselors for expert guidance on JEE, NEET, and university choice filling.',
  keywords: ['contact promote education', 'admission counseling phone', 'admissions head office', 'delhi bangalore kolkata counseling centers'],
  alternates: {
    canonical: 'https://promoteducation.com/contact'
  }
}

export default function Page() {
  return <ContactUsPage />
}
