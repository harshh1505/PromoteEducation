import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Promote Education - Empowering Students Across India',
  description: 'Learn about Promote Education mission, our story, our certified academic counselors, and our commitment to guiding students toward their dream institutions.',
  alternates: {
    canonical: 'https://promoteducation.com/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
