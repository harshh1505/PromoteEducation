import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'CAT 2026 Exam Pattern: Sections, Time Limit & Marking Scheme',
  description: 'The CAT 2026 exam is conducted online. Check the detailed sections, time limits for each section, and the marking scheme for MCQs and TITA questions.',
  alternates: {
    canonical: 'https://promoteducation.com/articles/cat-exam-pattern'
  }
}

export default function Page() {
  const slug = 'cat-exam-pattern'
  const content = (
    <>
      <p>
        The CAT exam is a time-bound computer-based test with sectional time limits. Understanding the structure is vital for building an effective <a href="/articles/cat-preparation-strategy">mock test strategy</a>. For eligibility details, refer to our <a href="/articles/cat-eligibility-2026">CAT eligibility guide</a>.
      </p>

      <h2>Exam Highlights</h2>
      <ul>
        <li><strong>Sections:</strong> VARC, DILR, and Quantitative Aptitude.</li>
        <li><strong>Total Duration:</strong> 2 hours (120 minutes).</li>
        <li><strong>Sectional Time Limit:</strong> 40 minutes per section (You cannot jump between sections).</li>
      </ul>

      <h2>Marking Scheme</h2>
      <ul>
        <li><strong>Correct Answer:</strong> +3 marks.</li>
        <li><strong>Incorrect Answer (MCQs):</strong> -1 mark.</li>
        <li><strong>Incorrect Answer (TITA/Non-MCQs):</strong> No negative marking.</li>
      </ul>

      <p>
        👉 <strong>Internal Link:</strong> Combine this with our <a href="/articles/cat-preparation-strategy">CAT Mock Test Strategy</a>
      </p>

      <h2>Type of Questions</h2>
      <p>
        CAT includes both Multiple Choice Questions (MCQs) and Type-In-The-Answer (TITA) questions. TITA questions are unique as they have no negative marking, making them crucial for your <a href="/articles/cat-preparation-strategy">overall score optimization</a>.
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'CAT 2026 Complete Guide', href: '/exams/cat' },
    { title: 'Syllabus Breakdown', href: '/articles/cat-syllabus-2026' },
    { title: 'Preparation Tips', href: '/articles/cat-preparation-strategy' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="CAT 2026 Exam Pattern"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="5 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Exam Pattern"
    />
  )
}
