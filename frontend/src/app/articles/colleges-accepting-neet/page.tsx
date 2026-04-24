import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'Top Medical Colleges Accepting NEET Score in India 2026',
  description: 'Explore the list of top AIIMS, government, and private medical colleges accepting NEET UG scores for MBBS and BDS admissions.',
  alternates: {
    canonical: 'https://promoteducation.com/articles/colleges-accepting-neet'
  }
}

export default function Page() {
  const slug = 'colleges-accepting-neet'
  const content = (
    <>
      <p>
        NEET UG is the single gateway to almost all medical colleges in India. Whether you aim for the premier AIIMS institutes or top state government colleges, your NEET score will be the determining factor. You can check the <a href="/articles/neet-vs-aiims-jipmer">merger details of AIIMS and JIPMER here</a>.
      </p>

      <h2>Top Medical Institutes</h2>
      <ul>
        <li><strong>AIIMS New Delhi:</strong> The most prestigious medical college in India.</li>
        <li><strong>CMC Vellore:</strong> A top-ranked private medical institution.</li>
        <li><strong>Maulana Azad Medical College (MAMC):</strong> One of the best government colleges in Delhi.</li>
        <li><strong>JIPMER Puducherry:</strong> Known for its excellent research and clinical facilities.</li>
      </ul>

      <h2>Types of Colleges</h2>
      <p>
        Admissions are categorized into 15% All India Quota (AIQ) and 85% State Quota. Ensure you understand the <a href="/articles/neet-eligibility-2026">eligibility requirements</a> for both.
      </p>

      <p>
        👉 <strong>Internal Link:</strong> Link to our detailed <a href="/courses/mbbs">MBBS Course Hub</a> for more college details.
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'NEET 2026 Complete Guide', href: '/exams/neet-ug' },
    { title: 'NEET vs AIIMS vs JIPMER', href: '/articles/neet-vs-aiims-jipmer' },
    { title: 'Eligibility Criteria 2026', href: '/articles/neet-eligibility-2026' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="Top Medical Colleges Accepting NEET"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="6 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Colleges"
    />
  )
}
