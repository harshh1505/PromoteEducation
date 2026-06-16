import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'CLAT 2026 Syllabus: English, Legal Reasoning, GK & Logical Topics',
  description: 'The syllabus for CLAT 2026 focuses heavily on comprehension and reasoning skills. Get a detailed breakdown of all five sections including Legal Reasoning.',
  alternates: {
    canonical: 'https://promoteducation.com/articles/clat-syllabus-2026'
  }
}

export default function Page() {
  const slug = 'clat-syllabus-2026'
  const content = (
    <>
      <p>
        The syllabus for CLAT shifted recently to focus more on comprehension and reading-based reasoning skills rather than rote memorization. Mastering the legal and logical sections is the key to a seat in a top NLU. Before you start, check the <a href="/articles/clat-exam-pattern">detailed exam pattern</a> and our <a href="/exams/clat">complete CLAT guide</a>.
      </p>

      <h2>English Language</h2>
      <p>
        This section tests your ability to read and comprehend complex passages, draw inferences, and understand vocabulary in context.
      </p>
      <ul>
        <li>Reading Comprehension (450-word passages)</li>
        <li>Contextual Vocabulary</li>
        <li>Grammatical correction and inference drawing</li>
      </ul>
      
      <h2>Legal Reasoning</h2>
      <p>
        Perhaps the most important section, it tests your ability to identify legal principles and apply them to factual scenarios. You don't need prior legal knowledge, but you need sharp reasoning.
      </p>
      <ul>
        <li>Application of legal principles</li>
        <li>Case-based questions</li>
        <li>Constitutional Law and Law of Torts/Contracts/Crimes basics</li>
      </ul>
      
      <h2>Other Critical Sections</h2>
      <ul>
        <li><strong>Current Affairs & GK:</strong> Focuses on contemporary legal developments and international events.</li>
        <li><strong>Logical Reasoning:</strong> Identifying arguments, premises, and conclusions.</li>
        <li><strong>Quantitative Techniques:</strong> Basic math (up to Class 10) presented in a data interpretation format.</li>
      </ul>

      <p>
        👉 <strong>Internal Link:</strong> Pair this with our <a href="/articles/clat-preparation-strategy">CLAT 2026 Preparation Strategy</a>
      </p>

      <h2>Preparation Focus</h2>
      <p>
        Since CLAT is a reading-heavy exam, develop a habit of reading editorials daily. Check our <a href="/articles/best-books-clat">recommended books</a> for specialized legal aptitude practice.
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'CLAT 2026 Complete Guide', href: '/exams/clat' },
    { title: 'Best Books for CLAT', href: '/articles/best-books-clat' },
    { title: 'Preparation Strategy', href: '/articles/clat-preparation-strategy' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="CLAT 2026 Syllabus breakdown"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="10 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Syllabus"
    />
  )
}
