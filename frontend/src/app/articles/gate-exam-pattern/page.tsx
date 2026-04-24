import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'GATE 2026 Exam Pattern: Marking Scheme, Questions & Duration',
  description: 'The GATE 2026 exam is conducted online as a Computer Based Test. Check the marking scheme for MCQs, MSQs, and NAT questions.',
  alternates: {
    canonical: 'https://promoteducation.com/articles/gate-exam-pattern'
  }
}

export default function Page() {
  const slug = 'gate-exam-pattern'
  const content = (
    <>
      <p>
        The GATE exam is conducted online as a Computer Based Test (CBT). It is designed to test the comprehensive understanding of various undergraduate subjects in engineering and science. For eligibility details, refer to our <a href="/articles/gate-eligibility-2026">GATE eligibility guide</a>.
      </p>

      <h2>Exam Highlights</h2>
      <ul>
        <li><strong>Duration:</strong> 3 hours (180 minutes)</li>
        <li><strong>Total Marks:</strong> 100</li>
        <li><strong>Question Types:</strong> Multiple Choice (MCQs), Multiple Select (MSQs), and Numerical Answer Type (NAT).</li>
      </ul>

      <h2>Marking Scheme</h2>
      <ul>
        <li>Questions carry either 1 or 2 marks.</li>
        <li><strong>Negative Marking:</strong> Only for MCQs (-1/3 for 1-mark, -2/3 for 2-marks).</li>
        <li><strong>NAT/MSQs:</strong> No negative marking for incorrect answers.</li>
      </ul>

      <p>
        👉 <strong>Internal Link:</strong> Combine this with our <a href="/articles/gate-preparation-strategy">GATE Mock Test Strategy</a>
      </p>

      <h2>Mode of Examination</h2>
      <p>
        GATE is purely a computer-based test where candidates use a virtual calculator for numerical problems. Practice with a virtual calculator during your <a href="/articles/gate-preparation-strategy">preparation phase</a> is highly recommended.
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'GATE 2026 Complete Guide', href: '/exams/gate' },
    { title: 'Syllabus & Weightage', href: '/articles/gate-syllabus-2026' },
    { title: 'Preparation Tips', href: '/articles/gate-preparation-strategy' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="GATE 2026 Exam Pattern"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="5 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Exam Pattern"
    />
  )
}
