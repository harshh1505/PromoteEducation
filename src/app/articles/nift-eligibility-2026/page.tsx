import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'NIFT 2026 Eligibility Criteria: Age Limit, Qualification & Courses',
  description: 'Understanding the eligibility criteria for the NIFT Entrance Exam is essential for students aspiring to build a career in fashion and design. Check age limit and qualification.',
  alternates: {
    canonical: 'https://promoteducation.com/articles/nift-eligibility-2026'
  }
}

export default function Page() {
  const slug = 'nift-eligibility-2026'
  const content = (
    <>
      <p>
        Understanding the eligibility criteria for the NIFT Entrance Exam is essential for students aspiring to build a career in fashion and design. Conducted by the <a href="https://nift.ac.in" target="_blank" rel="noopener noreferrer" className="hover:underline">National Institute of Fashion Technology</a>, the exam offers admission into prestigious undergraduate and postgraduate design programs. For a broader overview, check our <a href="/exams/nift">NIFT 2026 complete guide</a>.
      </p>

      <h2>Basic Eligibility Requirements</h2>
      <ul>
        <li><strong>UG Courses (B.Des, B.FTech):</strong> Candidates must have passed Class 12 or equivalent from any recognized board.</li>
        <li><strong>PG Courses (M.Des, MFM, M.FTech):</strong> A relevant bachelor’s degree from a recognized institute is mandatory.</li>
        <li>Candidates appearing for their final exams in 2026 are also eligible to apply.</li>
      </ul>

      <h2>Age Limit</h2>
      <ul>
        <li><strong>For UG Programs:</strong> The maximum age limit is usually 24 years as of August 1st of the admission year. (There is a relaxation of 5 years for SC/ST/PWD categories).</li>
        <li><strong>For PG Programs:</strong> There is no upper age limit for postgraduate courses.</li>
      </ul>

      <h2>Courses Offered</h2>
      <p>NIFT offers a variety of specialized programs across its campuses:</p>
      <ul>
        <li>Bachelor of Design (B.Des) - Fashion Design, Leather Design, Accessory Design, etc.</li>
        <li>Bachelor of Fashion Technology (B.FTech) - Apparel Production.</li>
        <li>Master of Design (M.Des)</li>
        <li>Master of Fashion Management (MFM)</li>
      </ul>

      <p>
        👉 <strong>Internal Link:</strong> Read the <a href="/exams/nift">NIFT 2026 Complete Guide</a>
      </p>

      <h2>Conclusion</h2>
      <p>
        Always check the official NIFT admission prospectus for the most current guidelines before applying. Align your eligibility check with our <a href="/articles/nift-preparation-strategy">NIFT 2026 preparation strategy</a>.
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'NIFT 2026 Complete Guide', href: '/exams/nift' },
    { title: 'Syllabus Breakdown', href: '/articles/nift-syllabus-2026' },
    { title: 'Preparation Strategy', href: '/articles/nift-preparation-strategy' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="NIFT 2026 Eligibility Criteria"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="6 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Design Entrance"
    />
  )
}
