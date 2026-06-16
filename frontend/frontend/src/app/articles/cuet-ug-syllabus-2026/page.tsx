import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'CUET UG 2026 Syllabus: Domain Subjects, Language & General Test',
  description: 'The syllabus for CUET UG 2026 is divided into three major sections. Get a detailed breakdown of Language, Domain Subjects (NCERT-based), and the General Test.',
  alternates: {
    canonical: 'https://promoteducation.com/articles/cuet-ug-syllabus-2026'
  }
}

export default function Page() {
  const slug = 'cuet-ug-syllabus-2026'
  const content = (
    <>
      <p>
        The syllabus for CUET UG is designed to test a student’s mastery of their school curriculum alongside general aptitude. Since domain subjects are strictly based on NCERT, mastering your school textbooks is the key. Before you start, check the <a href="/articles/cuet-ug-exam-pattern">detailed exam pattern</a> and our <a href="/exams/cuet-ug">complete CUET guide</a>.
      </p>

      <h2>Section 1: Language Test</h2>
      <p>
        This section tests your proficiency in a chosen language (English, Hindi, etc.) through comprehension-based questions.
      </p>
      <ul>
        <li>Reading Comprehension (Literary, Narrative, Factual)</li>
        <li>Vocabulary & Synonyms/Antonyms</li>
        <li>Grammar and Verbal Ability</li>
      </ul>
      
      <h2>Section 2: Domain Subjects</h2>
      <p>
        These are subject-specific tests based on your Class 12 curriculum. NTA offers 27 domain subjects.
      </p>
      <ul>
        <li><strong>Syllabus:</strong> Strictly based on Class 12 NCERT textbooks.</li>
        <li><strong>Key Subjects:</strong> Physics, Chemistry, Mathematics, Biology, Accountancy, Economics, History, Political Science.</li>
      </ul>
      
      <h2>Section 3: General Test</h2>
      <p>
        A mandatory or optional section depending on the university/course. It tests general awareness and logic.
      </p>
      <ul>
        <li>General Knowledge & Current Affairs</li>
        <li>Numerical Ability & Quantitative Reasoning</li>
        <li>Logical and Analytical Reasoning</li>
      </ul>

      <p>
        👉 <strong>Internal Link:</strong> Pair this with our <a href="/articles/cuet-ug-preparation-strategy">CUET UG 2026 Preparation Strategy</a>
      </p>

      <h2>Preparation Focus</h2>
      <p>
        Do not ignore the Language and General Test sections, as they often determine your overall merit for top colleges. Check our <a href="/articles/best-books-cuet-ug">recommended books</a> for specialized practice.
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'CUET UG 2026 Complete Guide', href: '/exams/cuet-ug' },
    { title: 'Best Books for CUET UG', href: '/articles/best-books-cuet-ug' },
    { title: 'Preparation Strategy', href: '/articles/cuet-ug-preparation-strategy' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="CUET UG 2026 Syllabus breakdown"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="10 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Syllabus"
    />
  )
}
