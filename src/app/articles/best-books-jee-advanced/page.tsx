import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'Best Books for JEE Advanced 2026: Subject-wise Expert Picks',
  description: 'Advanced preparation requires high-level conceptual books. Get expert recommendations for Physics, Chemistry, and Mathematics for JEE Advanced 2026.',
  alternates: {
    canonical: 'https://promoteducation.com/articles/best-books-jee-advanced'
  }
}

export default function Page() {
  const slug = 'best-books-jee-advanced'
  const content = (
    <>
      <p>
        Cracking JEE Advanced requires resources that challenge your thinking and go beyond basic definitions. While NCERT provides the foundation, specialized advanced-level books are necessary to master the complex problem-solving required for an IIT rank. This list complements our <a href="/articles/jee-advanced-preparation-strategy">overall preparation strategy</a>.
      </p>

      <h2>Physics</h2>
      <ul>
        <li><strong>Concepts of Physics</strong> by H.C. Verma (Conceptual clarity).</li>
        <li><strong>Problems in General Physics</strong> by I.E. Irodov (Advanced problem solving).</li>
        <li>University Physics by Freedman and Young.</li>
      </ul>

      <h2>Chemistry</h2>
      <ul>
        <li><strong>Physical Chemistry</strong> by O.P. Tandon / P. Bahadur.</li>
        <li><strong>Organic Chemistry</strong> by Morrison & Boyd / M.S. Chouhan.</li>
        <li>Inorganic Chemistry by J.D. Lee (Concise).</li>
      </ul>

      <h2>Mathematics</h2>
      <ul>
        <li><strong>Cengage Series</strong> by G. Tiwani (Highly recommended).</li>
        <li>Skills in Mathematics series by Arihant.</li>
        <li>Advanced Problems in Mathematics by Vikas Gupta.</li>
      </ul>

      <p>
        👉 <strong>Internal Link:</strong> Link to our <a href="/articles/jee-advanced-preparation-strategy">JEE Advanced Preparation Strategy Blog</a>
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'JEE Advanced 2026 Complete Guide', href: '/exams/jee-advanced' },
    { title: 'Preparation Strategy', href: '/articles/jee-advanced-preparation-strategy' },
    { title: 'Detailed Syllabus', href: '/articles/jee-advanced-syllabus-2026' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="Best Books for JEE Advanced 2026"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="7 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Resources"
    />
  )
}
