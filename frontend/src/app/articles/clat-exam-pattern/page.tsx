import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'CLAT 2026 Exam Pattern: Sections, Marking & Duration Explained',
  description: 'The CLAT 2026 exam is conducted in offline mode. Check the detailed sections, marking scheme with negative marks, and the total duration.',
  alternates: {
    canonical: 'https://promoteducation.com/articles/clat-exam-pattern'
  }
}

export default function Page() {
  const slug = 'clat-exam-pattern'
  const content = (
    <>
      <p>
        The CLAT exam is an offline, pen-and-paper-based test designed to evaluate your readiness for a rigorous legal education. Understanding the structure is vital for building an effective <a href="/articles/clat-preparation-strategy">mock test strategy</a>. For eligibility details, refer to our <a href="/articles/clat-eligibility-2026">CLAT eligibility guide</a>.
      </p>

      <h2>Exam Structure</h2>
      <ul>
        <li><strong>Total Questions:</strong> 120 Questions.</li>
        <li><strong>Total Marks:</strong> 120 Marks.</li>
        <li><strong>Duration:</strong> 2 hours (120 minutes).</li>
        <li><strong>Mode:</strong> Offline (OMR-based).</li>
      </ul>

      <h2>Marking Scheme</h2>
      <ul>
        <li><strong>Correct Answer:</strong> +1 mark.</li>
        <li><strong>Incorrect Answer:</strong> -0.25 marks (Negative Marking).</li>
        <li><strong>Unanswered Questions:</strong> 0 marks.</li>
      </ul>

      <p>
        👉 <strong>Internal Link:</strong> Combine this with our <a href="/articles/clat-preparation-strategy">CLAT Mock Test Strategy</a>
      </p>

      <h2>Sectional Distribution</h2>
      <p>
        The exam is divided into five sections, with English and Legal Reasoning carrying the highest weightage. Candidates must manage their time across sections without any sectional time limits, making <a href="/articles/clat-preparation-strategy">time management</a> the most critical skill for CLAT.
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'CLAT 2026 Complete Guide', href: '/exams/clat' },
    { title: 'Syllabus Breakdown', href: '/articles/clat-syllabus-2026' },
    { title: 'Preparation Tips', href: '/articles/clat-preparation-strategy' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="CLAT 2026 Exam Pattern"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="5 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Exam Pattern"
    />
  )
}
