import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'CAT 2026 Eligibility Criteria: Age Limit, Qualification & Attempts',
  description: 'Understanding the eligibility criteria for CAT 2026 is the first step for MBA aspirants. Check the qualification marks and attempt limits for IIM admissions.',
  alternates: {
    canonical: 'https://promoteducation.com/articles/cat-eligibility-2026'
  }
}

export default function Page() {
  const slug = 'cat-eligibility-2026'
  const content = (
    <>
      <p>
        Understanding the eligibility criteria for CAT is the first step for MBA aspirants. Conducted by the <a href="https://iimcat.ac.in" target="_blank" rel="noopener noreferrer" className="hover:underline">Indian Institutes of Management (IIMs)</a>, CAT is the gateway to top B-schools in India. For a complete overview of the exam, check our <a href="/exams/cat">CAT 2026 complete guide</a>.
      </p>

      <h2>Basic Eligibility Requirements</h2>
      <ul>
        <li>Candidates must have a bachelor’s degree from a recognized university in any stream.</li>
        <li><strong>Minimum Marks:</strong> 50% marks in graduation (45% for reserved categories like SC, ST, and PwD).</li>
        <li><strong>Final-Year Students:</strong> Candidates appearing in their final year are also eligible to apply.</li>
      </ul>

      <h2>Age Limit</h2>
      <p>
        There is **no age limit** for appearing in CAT. This makes it accessible to both fresh graduates and working professionals seeking to transition into management roles.
      </p>

      <h2>Number of Attempts</h2>
      <p>
        There is no restriction on the number of attempts for CAT. Candidates can take the exam as many times as they want to improve their scores and secure a seat in their dream IIM.
      </p>

      <p>
        👉 <strong>Internal Link:</strong> Read the <a href="/exams/cat">CAT 2026 Complete Guide</a>
      </p>

      <h2>Conclusion</h2>
      <p>
        Ensure you meet all academic and documentary criteria before applying. Pair your eligibility check with our <a href="/articles/cat-preparation-strategy">CAT 2026 preparation strategy</a> to maximize your percentile.
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'CAT 2026 Complete Guide', href: '/exams/cat' },
    { title: 'Syllabus Breakdown', href: '/articles/cat-syllabus-2026' },
    { title: 'Preparation Strategy', href: '/articles/cat-preparation-strategy' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="CAT 2026 Eligibility Criteria"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="6 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Management Entrance"
    />
  )
}
