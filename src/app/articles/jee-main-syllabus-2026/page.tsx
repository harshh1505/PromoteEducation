import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'JEE Main 2026 Syllabus: Subject-wise Detailed Topics & Weightage',
  description: 'The syllabus for JEE Main 2026 is based on NCERT Class 11 and 12 topics. Get a detailed subject-wise breakdown and weightage analysis.',
  alternates: {
    canonical: 'https://promoteducation.com/articles/jee-main-syllabus-2026'
  }
}

export default function Page() {
  const slug = 'jee-main-syllabus-2026'
  const content = (
    <>
      <p>The syllabus for JEE Main is based on NCERT Class 11 and 12 topics. Understanding the distribution of questions across different subjects is vital for a targeted <a href="/articles/jee-main-preparation-strategy">preparation strategy</a>. Before diving into the details, make sure you've read our <a href="/exams/jee-main">JEE Main 2026 complete guide</a>.</p>
      
      <h2>Physics</h2>
      <p>Includes Mechanics, Thermodynamics, Modern Physics, Optics, and Electrodynamics. These topics form the backbone of the physics section.</p>
      
      <h2>Chemistry</h2>
      <p>Covers Organic, Inorganic, and Physical Chemistry. NCERT is considered the most important resource for the Chemistry section.</p>
      
      <h2>Mathematics</h2>
      <p>Includes Calculus, Algebra, Coordinate Geometry, Trigonometry, and Vectors. This section often determines the final rank of a candidate.</p>

      <p>
        👉 <strong>Internal Link:</strong> Pair this with <a href="/articles/jee-main-preparation-strategy">JEE Main Preparation Tips</a>
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'JEE Main 2026 Complete Guide', href: '/exams/jee-main' },
    { title: 'Preparation Strategy', href: '/articles/jee-main-preparation-strategy' },
    { title: 'Best Preparation Books', href: '/articles/best-books-jee-main' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="JEE Main 2026 Syllabus"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="10 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Syllabus"
    />
  )
}
