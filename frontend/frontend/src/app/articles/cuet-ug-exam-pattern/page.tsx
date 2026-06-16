import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'CUET UG 2026 Exam Pattern: Sections, Marking & Mode Explained',
  description: 'The CUET UG 2026 exam is a computer-based test with a unique marking scheme. Check the structure of Language, Domain, and General tests.',
  alternates: {
    canonical: 'https://promoteducation.com/articles/cuet-ug-exam-pattern'
  }
}

export default function Page() {
  const slug = 'cuet-ug-exam-pattern'
  const content = (
    <>
      <p>
        The CUET UG exam pattern is highly flexible, allowing students to choose combinations that suit their university preferences. Understanding the marking scheme is vital for building an effective <a href="/articles/cuet-ug-preparation-strategy">mock test strategy</a>. For eligibility details, refer to our <a href="/articles/cuet-ug-eligibility-2026">CUET UG eligibility guide</a>.
      </p>

      <h2>Exam highlights</h2>
      <ul>
        <li><strong>Mode:</strong> Computer Based Test (CBT).</li>
        <li><strong>Question Type:</strong> Multiple Choice Questions (MCQs).</li>
        <li><strong>Sections:</strong> Language (Section I), Domain (Section II), and General Test (Section III).</li>
      </ul>

      <h2>Marking Scheme</h2>
      <ul>
        <li><strong>Correct Answer:</strong> +5 marks.</li>
        <li><strong>Incorrect Answer:</strong> -1 mark (Negative marking applies).</li>
        <li><strong>Unanswered:</strong> 0 marks.</li>
      </ul>

      <p>
        👉 <strong>Internal Link:</strong> Combine this with our <a href="/articles/cuet-ug-preparation-strategy">CUET UG Mock Test Strategy</a>
      </p>

      <h2>Duration and Shifts</h2>
      <p>
        The exam is conducted in multiple shifts over several days. Each subject has a specific time limit (usually 45 or 60 minutes). Choosing the right subject combination is critical—check our <a href="/articles/colleges-accepting-cuet-ug">list of top universities</a> to see their specific requirements.
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'CUET UG 2026 Complete Guide', href: '/exams/cuet-ug' },
    { title: 'Syllabus Breakdown', href: '/articles/cuet-ug-syllabus-2026' },
    { title: 'Preparation Tips', href: '/articles/cuet-ug-preparation-strategy' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="CUET UG 2026 Exam Pattern"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="5 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Exam Pattern"
    />
  )
}
