import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'JEE Main 2026 Eligibility Criteria: Age Limit, Attempts & Qualification',
  description: 'Understanding the eligibility criteria for the JEE Main 2026 is the first step for every engineering aspirant. Check age limit, attempts, and qualification.',
  alternates: {
    canonical: 'https://promoteducation.com/articles/jee-main-eligibility-2026'
  }
}

export default function Page() {
  const slug = 'jee-main-eligibility-2026'
  const content = (
    <>
      <p>
        Understanding the eligibility criteria for the JEE Main is the first step for every engineering aspirant. Conducted by the <a href="https://nta.ac.in/" target="_blank" rel="noopener noreferrer" className="text-[#0b57d0] hover:underline font-medium">National Testing Agency</a>, this exam has flexible rules, but missing even one requirement can make you ineligible. For a broader overview of the exam, check our <a href="/exams/jee-main">complete JEE Main 2026 guide</a>.
      </p>

      <h2>Basic Eligibility Requirements</h2>
      <ul>
        <li>Candidates must have passed Class 12 or equivalent</li>
        <li>Physics and Mathematics are mandatory subjects</li>
        <li>Candidates appearing in 2026 are also eligible</li>
      </ul>

      <p>
        Unlike many exams, JEE Main does not impose a strict age limit, making it accessible to a wide range of students. However, you should align your preparation with the <a href="/articles/jee-main-syllabus-2026">latest syllabus breakdown</a> to ensure you're studying the right topics.
      </p>

      <h2>Number of Attempts</h2>
      <p>
        Students can attempt JEE Main three consecutive years, with two sessions each year. This means you effectively get six chances to improve your score.
      </p>

      <p>
        👉 <strong>Internal Link:</strong> Learn more in our <a href="/exams/jee-main">JEE Main 2026 Complete Guide</a>
      </p>

      <h2>Qualifying Marks</h2>
      <p>
        For admission into top institutes like National Institutes of Technology, candidates must also meet minimum percentage criteria in Class 12.
      </p>

      <h2>Conclusion</h2>
      <p>
        Always verify your eligibility before applying to avoid last-minute issues.
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'JEE Main 2026 Complete Guide', href: '/exams/jee-main' },
    { title: 'Syllabus & Weightage', href: '/articles/jee-main-syllabus-2026' },
    { title: 'Preparation Strategy', href: '/articles/jee-main-preparation-strategy' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="JEE Main 2026 Eligibility Criteria"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="6 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Entrance Exam"
    />
  )
}
