import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'JEE Advanced 2026 Eligibility Criteria: Attempts, Rank & Qualification',
  description: 'Understanding the eligibility criteria for JEE Advanced 2026 is crucial because only the top candidates from JEE Main qualify. Check attempt limits and rank requirements.',
  alternates: {
    canonical: 'https://promoteducation.com/articles/jee-advanced-eligibility-2026'
  }
}

export default function Page() {
  const slug = 'jee-advanced-eligibility-2026'
  const content = (
    <>
      <p>
        Understanding the eligibility criteria for JEE Advanced is crucial because not all students who appear for JEE Main can attempt it. Only the top candidates who meet specific performance benchmarks qualify for this prestigious exam. For a complete overview, see our <a href="/exams/jee-advanced">JEE Advanced 2026 complete guide</a>.
      </p>

      <h2>Basic Eligibility Requirements</h2>
      <ul>
        <li><strong>JEE Main Performance:</strong> Candidates must be among the top 2,50,000 successful candidates (across all categories) in B.E./B.Tech. paper of JEE Main 2026.</li>
        <li><strong>Educational Qualification:</strong> Must have passed Class 12 or equivalent with Physics, Chemistry, and Mathematics as mandatory subjects.</li>
        <li><strong>Board Percentage:</strong> Usually requires a minimum of 75% aggregate marks in Class 12 (65% for SC/ST/PwD) or being in the top 20 percentile of the respective board.</li>
      </ul>

      <h2>Attempt Limit</h2>
      <p>
        A candidate can attempt JEE Advanced a **maximum of two times** in two consecutive years. This makes every attempt extremely valuable for IIT aspirants.
      </p>

      <h2>Age Limit</h2>
      <p>
        Candidates should be within the prescribed age limit—typically born on or after October 1, 1999 (with a 5-year relaxation for SC, ST, and PwD candidates).
      </p>

      <p>
        👉 <strong>Internal Link:</strong> Read the <a href="/exams/jee-advanced">JEE Advanced 2026 Complete Guide</a>
      </p>

      <h2>Important Note</h2>
      <p>
        Eligibility rules are governed by the Joint Admission Board (JAB) and may change slightly each year. Always verify official details from the <a href="https://jeeadv.ac.in" target="_blank" rel="noopener noreferrer" className="hover:underline">organizing IIT's official portal</a> before finalizing your <a href="/articles/jee-advanced-preparation-strategy">preparation strategy</a>.
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'JEE Advanced 2026 Complete Guide', href: '/exams/jee-advanced' },
    { title: 'Syllabus Breakdown', href: '/articles/jee-advanced-syllabus-2026' },
    { title: 'Preparation Strategy', href: '/articles/jee-advanced-preparation-strategy' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="JEE Advanced 2026 Eligibility Criteria"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="6 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Engineering Entrance"
    />
  )
}
