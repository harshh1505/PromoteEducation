import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'NIFT 2026 Exam Pattern: CAT, GAT & Situation Test Explained',
  description: 'The NIFT Entrance Exam has multiple stages including CAT, GAT, and the Situation Test. Check the selection process and marking scheme for 2026.',
  alternates: {
    canonical: 'https://promoteducation.com/articles/nift-exam-pattern'
  }
}

export default function Page() {
  const slug = 'nift-exam-pattern'
  const content = (
    <>
      <p>
        The NIFT Entrance Exam is a multi-stage selection process designed to identify the most creative and capable design minds in the country. For eligibility details, refer to our <a href="/articles/nift-eligibility-2026">NIFT eligibility guide</a>.
      </p>

      <h2>Stage 1: Written Entrance Examination</h2>
      <ul>
        <li><strong>CAT (Creative Ability Test):</strong> A paper-based drawing test (Weightage: 50% for B.Des).</li>
        <li><strong>GAT (General Ability Test):</strong> A computer-based objective test (Weightage: 30% for B.Des).</li>
      </ul>

      <h2>Stage 2: Situation Test / Personal Interview</h2>
      <ul>
        <li><strong>Situation Test (for B.Des):</strong> A hands-on test where candidates create 3D models using provided materials (Weightage: 20%).</li>
        <li><strong>Personal Interview (for PG courses):</strong> A portfolio review and interview process.</li>
      </ul>

      <p>
        👉 <strong>Internal Link:</strong> Combine this with our <a href="/articles/nift-preparation-strategy">NIFT Preparation Strategy</a>
      </p>

      <h2>Selection Weightage</h2>
      <p>
        The final merit list is prepared by combining the scores of all stages. Candidates must clear the cutoff in the written exam to qualify for the Situation Test. Check our <a href="/articles/colleges-accepting-nift">campus rankings</a> to see where your target score could lead you.
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'NIFT 2026 Complete Guide', href: '/exams/nift' },
    { title: 'Syllabus Breakdown', href: '/articles/nift-syllabus-2026' },
    { title: 'Preparation Tips', href: '/articles/nift-preparation-strategy' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="NIFT 2026 Exam Pattern"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="5 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Exam Pattern"
    />
  )
}
