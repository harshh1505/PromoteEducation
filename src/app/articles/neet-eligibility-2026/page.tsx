import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'NEET 2026 Eligibility Criteria: Age Limit, Attempts & Qualification',
  description: 'Understanding the eligibility criteria for NEET UG 2026 is essential before applying. Check age limit, attempts, and qualification for medical aspirants.',
  alternates: {
    canonical: 'https://promoteducation.com/articles/neet-eligibility-2026'
  }
}

export default function Page() {
  const slug = 'neet-eligibility-2026'
  const content = (
    <>
      <p>
        Understanding the eligibility criteria for NEET UG is essential before applying. Conducted by the <a href="https://nta.ac.in/" target="_blank" rel="noopener noreferrer" className="text-[#1DB87A] font-medium hover:underline">National Testing Agency</a>, NEET is the only entrance exam for MBBS, BDS, and other medical courses in India. For a complete overview, see our <a href="/exams/neet-ug">NEET 2026 complete guide</a>.
      </p>

      <h2>Basic Eligibility Requirements</h2>
      <ul>
        <li>Candidates must have passed Class 12 or equivalent</li>
        <li>Physics, Chemistry, and Biology are mandatory subjects</li>
        <li>Candidates appearing in 2026 are also eligible</li>
      </ul>

      <h2>Age Limit</h2>
      <ul>
        <li><strong>Minimum age:</strong> 17 years by December 31st of the year of admission.</li>
        <li><strong>Upper age limit:</strong> There is currently no upper age limit for NEET UG as per the latest Supreme Court and NMC rulings.</li>
      </ul>

      <h2>Number of Attempts</h2>
      <p>
        There is no fixed limit on the number of attempts for NEET, allowing students to improve their scores over multiple years. This flexibility allows many aspirants to pursue their medical dreams at their own pace.
      </p>

      <p>
        👉 <strong>Internal Link:</strong> Read the <a href="/exams/neet-ug">NEET 2026 Complete Guide</a>
      </p>

      <h2>Qualifying Marks</h2>
      <p>Candidates must secure minimum qualifying marks in their 12th board exams to be eligible for NEET:</p>
      <ul>
        <li><strong>General:</strong> 50% aggregate in PCB</li>
        <li><strong>OBC/SC/ST:</strong> 40% aggregate in PCB</li>
      </ul>

      <h2>Conclusion</h2>
      <p>
        Always verify your eligibility criteria through official NTA brochures before applying to avoid any last-minute disqualification. Pair your eligibility check with our <a href="/articles/neet-preparation-strategy">NEET 2026 preparation strategy</a> for the best results.
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'NEET 2026 Complete Guide', href: '/exams/neet-ug' },
    { title: 'Syllabus & Weightage', href: '/articles/neet-syllabus-2026' },
    { title: 'Preparation Strategy', href: '/articles/neet-preparation-strategy' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="NEET 2026 Eligibility Criteria"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="6 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Medical Entrance"
    />
  )
}
