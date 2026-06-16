import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'Best Books for NEET 2026: Subject-wise Expert Recommendations',
  description: 'Choosing the right books is critical for NEET success. Get expert recommendations for Biology, Physics, and Chemistry for NEET 2026.',
  alternates: {
    canonical: 'https://promoteducation.com/articles/best-books-neet'
  }
}

export default function Page() {
  const slug = 'best-books-neet'
  const content = (
    <>
      <p>
        Choosing the right books is critical for success in NEET 2026. While NCERT remains the primary resource, you need additional reference material to master problem-solving. This list complements our <a href="/articles/neet-preparation-strategy">overall preparation strategy</a> and the <a href="/articles/neet-syllabus-2026">latest syllabus</a>.
      </p>

      <h2>Biology (Most Important)</h2>
      <ul>
        <li><strong>NCERT Biology Class 11 & 12</strong> (Read every line)</li>
        <li>Trueman's Objective Biology (Vol 1 & 2)</li>
        <li>MTG Objective NCERT at your Fingertips</li>
      </ul>

      <h2>Physics</h2>
      <ul>
        <li>Concepts of Physics by H.C. Verma</li>
        <li>Objective Physics by D.C. Pandey</li>
        <li>NCERT Physics Textbooks</li>
      </ul>

      <h2>Chemistry</h2>
      <ul>
        <li><strong>NCERT Chemistry Class 11 & 12</strong> (Absolute must for Inorganic)</li>
        <li>Physical Chemistry by O.P. Tandon</li>
        <li>Modern Approach to Chemical Calculations by R.C. Mukherjee</li>
      </ul>

      <p>
        👉 <strong>Internal Link:</strong> Link to our <a href="/articles/neet-preparation-strategy">NEET Preparation Strategy Blog</a>
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'NEET 2026 Complete Guide', href: '/exams/neet-ug' },
    { title: 'Preparation Strategy', href: '/articles/neet-preparation-strategy' },
    { title: 'Syllabus breakdown', href: '/articles/neet-syllabus-2026' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="Best Books for NEET 2026"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="7 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Resources"
    />
  )
}
