import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'Best Books for JEE Main 2026: Subject-wise Expert Recommendations',
  description: 'Choosing the right books is crucial for JEE success. Get expert recommendations for Physics, Chemistry, and Mathematics books for JEE Main 2026.',
}

export default function Page() {
  const slug = 'best-books-jee-main'
  const content = (
    <>
      <p>Choosing the right books is crucial. While NCERT is the foundation, you need specialized books to master the complex problem-solving required for a top rank in JEE Main 2026. This resource list is designed to complement your <a href="/articles/jee-main-preparation-strategy">overall preparation strategy</a> and the <a href="/articles/jee-main-syllabus-2026">prescribed syllabus</a>.</p>

      <h2>Physics</h2>
      <ul>
        <li><strong>Concepts of Physics</strong> by H.C. Verma (Vol 1 & 2)</li>
        <li><strong>Understanding Physics</strong> by D.C. Pandey</li>
        <li>Problems in General Physics by I.E. Irodov (for Advanced level)</li>
      </ul>

      <h2>Chemistry</h2>
      <ul>
        <li><strong>NCERT Textbooks</strong> (Absolute Must for Inorganic)</li>
        <li>Physical Chemistry by O.P. Tandon</li>
        <li>Organic Chemistry by M.S. Chouhan / Morrison & Boyd</li>
      </ul>

      <h2>Mathematics</h2>
      <ul>
        <li><strong>Cengage Series</strong> by G. Tiwani</li>
        <li>Objective Mathematics by R.D. Sharma</li>
        <li>Skills in Mathematics series by Arihant</li>
      </ul>

      <p>
        👉 <strong>Internal Link:</strong> Link to <a href="/articles/jee-main-preparation-strategy">Preparation Strategy Blog</a>
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
      title="Best Books for JEE Main 2026"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="7 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Resources"
    />
  )
}
