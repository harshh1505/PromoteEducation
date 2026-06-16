import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'NEET 2026 Syllabus: Complete PCB Topic-wise Breakdown & Weightage',
  description: 'The syllabus for NEET UG 2026 is based on NCERT Class 11 and 12. Get a detailed subject-wise breakdown of Physics, Chemistry, and Biology topics.',
  alternates: {
    canonical: 'https://promoteducation.com/articles/neet-syllabus-2026'
  }
}

export default function Page() {
  const slug = 'neet-syllabus-2026'
  const content = (
    <>
      <p>
        The syllabus for NEET UG 2026 is strictly based on the NCERT Class 11 and 12 curriculum. Mastering these topics is the only way to secure a seat in top medical colleges. Before you begin, ensure you are familiar with the <a href="/articles/neet-exam-pattern">latest exam pattern</a> and the <a href="/exams/neet-ug">overall NEET guide</a>.
      </p>

      <h2>Physics</h2>
      <p>
        Physics is often considered the most challenging section. It includes Mechanics, Thermodynamics, Optics, and Modern Physics. Focusing on conceptual clarity and problem-solving is key.
      </p>
      
      <h2>Chemistry</h2>
      <p>
        Chemistry covers Organic, Inorganic, and Physical Chemistry. NCERT is the most important resource for Inorganic Chemistry, while Physical Chemistry requires practice of numerical problems.
      </p>
      
      <h2>Biology</h2>
      <p>
        Biology carries 50% of the total marks in NEET. It includes Botany and Zoology. High-weightage topics include Genetics, Ecology, and Human Physiology.
      </p>

      <p>
        👉 <strong>Internal Link:</strong> Pair this with our <a href="/articles/neet-preparation-strategy">NEET 2026 Preparation Strategy</a>
      </p>

      <h2>Topic-wise Weightage</h2>
      <p>
        Analyzing previous years' papers shows that some chapters are more important than others. Make sure to prioritize these during your final revision.
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'NEET 2026 Complete Guide', href: '/exams/neet-ug' },
    { title: 'Best Books for NEET', href: '/articles/best-books-neet' },
    { title: 'Preparation Strategy', href: '/articles/neet-preparation-strategy' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="NEET 2026 Syllabus Breakdown"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="10 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Syllabus"
    />
  )
}
