import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'CLAT 2026 Eligibility Criteria: Age Limit, Qualification & Attempts',
  description: 'Understanding the eligibility criteria for CLAT 2026 is essential for law aspirants. Check the qualification marks, age limits, and NLU admission rules.',
  alternates: {
    canonical: 'https://promoteducation.com/articles/clat-eligibility-2026'
  }
}

export default function Page() {
  const slug = 'clat-eligibility-2026'
  const content = (
    <>
      <p>
        Understanding the eligibility criteria for CLAT is essential for students aiming to pursue law from India's top National Law Universities (NLUs). Conducted by the <a href="https://consortiumofnlus.ac.in" target="_blank" rel="noopener noreferrer" className="hover:underline">Consortium of NLUs</a>, CLAT is the gateway to prestigious integrated law programs. For a complete overview, check our <a href="/exams/clat">CLAT 2026 complete guide</a>.
      </p>

      <h2>Basic Eligibility Requirements</h2>
      <ul>
        <li><strong>For UG (BA LL.B):</strong> Candidates must have passed Class 12 or equivalent with a minimum of 45% marks (40% for SC/ST categories).</li>
        <li><strong>For PG (LL.M):</strong> Candidates must have completed an LL.B or equivalent degree with a minimum of 50% marks (45% for SC/ST categories).</li>
        <li>Candidates appearing for their final exams in 2026 are also eligible to apply.</li>
      </ul>

      <h2>Age Limit</h2>
      <p>
        As per the latest guidelines, there is **no upper age limit** for appearing in CLAT for either UG or PG programs. This allows students and professionals from all walks of life to pursue a legal career.
      </p>

      <h2>Number of Attempts</h2>
      <p>
        There is no restriction on the number of attempts for CLAT. Candidates can take the exam annually to improve their scores and secure a seat in a top-tier NLU.
      </p>

      <p>
        👉 <strong>Internal Link:</strong> Read the <a href="/exams/clat">CLAT 2026 Complete Guide</a>
      </p>

      <h2>Conclusion</h2>
      <p>
        Always verify the official criteria from the Consortium of NLUs before applying. Pair your eligibility check with our <a href="/articles/clat-preparation-strategy">CLAT 2026 preparation strategy</a> to master the reasoning-based pattern.
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'CLAT 2026 Complete Guide', href: '/exams/clat' },
    { title: 'Syllabus Breakdown', href: '/articles/clat-syllabus-2026' },
    { title: 'Preparation Strategy', href: '/articles/clat-preparation-strategy' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="CLAT 2026 Eligibility Criteria"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="6 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Law Entrance"
    />
  )
}
