import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'NEET 2026 Exam Pattern: Marking Scheme, Questions & Time Duration',
  description: 'The NEET UG 2026 exam is conducted in offline (pen-paper) mode. Check the detailed marking scheme, number of questions, and time duration.',
  alternates: {
    canonical: 'https://promoteducation.com/articles/neet-exam-pattern'
  }
}

export default function Page() {
  const slug = 'neet-exam-pattern'
  const content = (
    <>
      <p>
        The NEET UG exam is conducted offline (pen-paper mode) using OMR sheets. Understanding the structure of the exam is vital for building a <a href="/articles/neet-preparation-strategy">mock test strategy</a>. For eligibility details, refer to our <a href="/articles/neet-eligibility-2026">NEET eligibility guide</a>.
      </p>

      <h2>Exam Structure</h2>
      <ul>
        <li><strong>Subjects:</strong> Physics, Chemistry, and Biology (Botany + Zoology)</li>
        <li><strong>Total Questions:</strong> 200 (Candidates need to attempt 180)</li>
        <li><strong>Time Duration:</strong> 3 hours and 20 minutes</li>
      </ul>

      <h2>Marking Scheme</h2>
      <ul>
        <li><strong>Correct Answer:</strong> +4 marks</li>
        <li><strong>Incorrect Answer:</strong> -1 mark (Negative Marking)</li>
        <li><strong>Unattempted:</strong> 0 marks</li>
      </ul>

      <p>
        👉 <strong>Internal Link:</strong> Combine this with our <a href="/articles/neet-preparation-strategy">NEET Mock Test Strategy</a>
      </p>

      <h2>Mode of Examination</h2>
      <p>
        Despite being a national-level entrance exam, NEET continues to be conducted in a traditional pen-and-paper format to ensure accessibility across all regions of India.
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'NEET 2026 Complete Guide', href: '/exams/neet-ug' },
    { title: 'Syllabus & Topics', href: '/articles/neet-syllabus-2026' },
    { title: 'Preparation Tips', href: '/articles/neet-preparation-strategy' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="NEET 2026 Exam Pattern"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="5 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Exam Pattern"
    />
  )
}
