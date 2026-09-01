import type { Metadata } from 'next'
import ClientPage from './ClientPage'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'AI Career & College Brainstorm Tool | Promote Education',
  description: 'Use our AI-powered brainstorming tool to discover ideal college paths, degree options, and career opportunities.',
  alternates: {
    canonical: 'https://promoteducation.com/tools/brainstorm',
  },
}

export default function BrainstormPage() {
  return <ClientPage />
}
