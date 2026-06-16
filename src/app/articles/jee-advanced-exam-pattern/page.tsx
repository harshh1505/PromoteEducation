import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'JEE Advanced 2026 Exam Pattern: Papers, Marking & Question Types',
  description: 'The JEE Advanced exam is known for its unpredictable pattern and multiple question types. Check the marking scheme for Paper 1 and Paper 2.',
  alternates: {
    canonical: 'https://promoteducation.com/articles/jee-advanced-exam-pattern'
  }
}

export default function Page() {
  const slug = 'jee-advanced-exam-pattern'
  const content = (
    <>
      <p>
        The JEE Advanced exam is famous for its unpredictable pattern. Unlike most exams, the types of questions and the marking scheme can change every year, requiring candidates to be mentally agile. For eligibility details, refer to our <a href="/articles/jee-advanced-eligibility-2026">JEE Advanced eligibility guide</a>.
      </p>

      <h2>Exam Structure</h2>
      <ul>
        <li><strong>Two Compulsory Papers:</strong> Paper 1 and Paper 2 (Both are mandatory).</li>
        <li><strong>Duration:</strong> 3 hours each (Total 6 hours of testing).</li>
        <li><strong>Mode:</strong> Computer Based Test (CBT).</li>
      </ul>

      <h2>Diverse Question Types</h2>
      <p>JEE Advanced includes various formats to test conceptual depth:</p>
      <ul>
        <li>Single Correct Choice MCQs</li>
        <li>Multiple Correct Choice MCQs (MSQs)</li>
        <li>Numerical Value Questions (Integer/Decimal)</li>
        <li>Match the Following & Comprehension-based Questions</li>
      </ul>

      <h2>Variable Marking Scheme</h2>
      <p>
        The marking scheme often includes partial marking for MSQs and negative marking for incorrect answers. Understanding the specific marking for each section at the start of the exam is crucial for your <a href="/articles/jee-advanced-preparation-strategy">mock test strategy</a>.
      </p>

      <p>
        👉 <strong>Internal Link:</strong> Combine this with our <a href="/articles/jee-advanced-preparation-strategy">JEE Advanced Mock Test Strategy</a>
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'JEE Advanced 2026 Complete Guide', href: '/exams/jee-advanced' },
    { title: 'Detailed Syllabus', href: '/articles/jee-advanced-syllabus-2026' },
    { title: 'Preparation Tips', href: '/articles/jee-advanced-preparation-strategy' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="JEE Advanced 2026 Exam Pattern"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="5 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Exam Pattern"
    />
  )
}
