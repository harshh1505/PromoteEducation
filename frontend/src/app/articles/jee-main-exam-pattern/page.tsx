import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'JEE Main 2026 Exam Pattern: Marking Scheme, Questions & Mode',
  description: 'The JEE Main 2026 exam is conducted in online mode with multiple-choice and numerical questions. Check the detailed marking scheme.',
}

export default function Page() {
  const slug = 'jee-main-exam-pattern'
  const content = (
    <>
      <p>The JEE Main exam is conducted in online mode (Computer Based Test) with multiple-choice and numerical questions. It is designed to test the analytical skills of students across the <a href="/articles/jee-main-syllabus-2026">detailed syllabus</a> of three core subjects.</p>

      <h2>Exam Highlights</h2>
      <ul>
        <li>90 total questions (candidates need to attempt 75)</li>
        <li>Section A: 20 MCQs per subject</li>
        <li>Section B: 10 Numerical questions per subject (attempt any 5)</li>
      </ul>

      <h2>Marking Scheme</h2>
      <ul>
        <li>+4 marks for every correct answer</li>
        <li>-1 negative marking for incorrect MCQs and Numerical questions</li>
        <li>0 marks for unattempted questions</li>
      </ul>

      <p>
        👉 <strong>Internal Link:</strong> Combine this with <a href="/articles/jee-main-preparation-strategy">JEE Main Mock Tests Strategy</a>
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'JEE Main 2026 Complete Guide', href: '/exams/jee-main' },
    { title: 'Preparation Strategy', href: '/articles/jee-main-preparation-strategy' },
    { title: 'Syllabus & Weightage', href: '/articles/jee-main-syllabus-2026' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="JEE Main 2026 Exam Pattern"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="5 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Exam Pattern"
    />
  )
}
