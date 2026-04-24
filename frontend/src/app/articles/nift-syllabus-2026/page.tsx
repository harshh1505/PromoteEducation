import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'NIFT 2026 Syllabus: CAT & GAT Detailed Topic Breakdown',
  description: 'The syllabus for the NIFT Entrance Exam includes creative and analytical sections. Get a detailed breakdown of CAT and GAT topics.',
  alternates: {
    canonical: 'https://promoteducation.com/articles/nift-syllabus-2026'
  }
}

export default function Page() {
  const slug = 'nift-syllabus-2026'
  const content = (
    <>
      <p>
        The syllabus for the NIFT Entrance Exam is unique as it tests both your creative imagination and your general analytical ability. Mastering both the CAT and GAT sections is essential for a top rank. Before you start, check the <a href="/articles/nift-exam-pattern">detailed exam pattern</a> and our <a href="/exams/nift">complete NIFT guide</a>.
      </p>

      <h2>Creative Ability Test (CAT)</h2>
      <p>
        The CAT section tests your drawing skills, creativity, and power of observation. You need to develop a strong color sense and imagination.
      </p>
      <ul>
        <li>Discernment of design ability</li>
        <li>Innovative use of colors</li>
        <li>Illustration and sketching skills</li>
        <li>Conceptualization of ideas into visual forms</li>
      </ul>
      
      <h2>General Ability Test (GAT)</h2>
      <p>
        The GAT section is an objective-type test covering analytical and language skills.
      </p>
      <ul>
        <li><strong>Quantitative Ability:</strong> Basic mathematics (up to Class 10).</li>
        <li><strong>English Comprehension:</strong> Reading passages, vocabulary, and grammar.</li>
        <li><strong>General Knowledge:</strong> Current affairs, fashion industry updates, and history.</li>
      </ul>

      <p>
        👉 <strong>Internal Link:</strong> Pair this with our <a href="/articles/nift-preparation-strategy">NIFT 2026 Preparation Strategy</a>
      </p>

      <h2>Preparation Focus</h2>
      <p>
        Design aspirants should dedicate at least 2 hours daily to sketching practice while maintaining a steady pace with General Aptitude topics. Check our <a href="/articles/best-books-nift">recommended books</a> for specialized CAT preparation.
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'NIFT 2026 Complete Guide', href: '/exams/nift' },
    { title: 'Best Books for NIFT', href: '/articles/best-books-nift' },
    { title: 'Preparation Strategy', href: '/articles/nift-preparation-strategy' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="NIFT 2026 Syllabus Breakdown"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="10 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Syllabus"
    />
  )
}
