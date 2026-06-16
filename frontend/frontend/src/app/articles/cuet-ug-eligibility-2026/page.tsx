import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'CUET UG 2026 Eligibility Criteria: Age Limit, Qualification & Board Requirements',
  description: 'Understanding the eligibility criteria for CUET UG 2026 is essential for students aiming for central universities like DU, JNU, and BHU. Check qualification marks.',
  alternates: {
    canonical: 'https://promoteducation.com/articles/cuet-ug-eligibility-2026'
  }
}

export default function Page() {
  const slug = 'cuet-ug-eligibility-2026'
  const content = (
    <>
      <p>
        Understanding the eligibility criteria for CUET UG is essential for students aiming to pursue undergraduate courses from India's top central universities. Conducted by the <a href="https://nta.ac.in" target="_blank" rel="noopener noreferrer" className="hover:underline">National Testing Agency (NTA)</a>, CUET UG ensures a fair evaluation for all. For a complete overview, check our <a href="/exams/cuet-ug">CUET UG 2026 complete guide</a>.
      </p>

      <h2>Basic Eligibility Requirements</h2>
      <ul>
        <li><strong>Qualification:</strong> Candidates must have passed Class 12 or equivalent from a recognized board.</li>
        <li><strong>Appearing Candidates:</strong> Students appearing for their Class 12 exams in 2026 are also eligible to apply.</li>
        <li><strong>Stream Neutrality:</strong> Students from Science, Commerce, and Arts are all eligible, provided they meet the specific course requirements of their target university.</li>
      </ul>

      <h2>Age Limit</h2>
      <p>
        For appearing in CUET UG 2026, there is **no strict upper age limit** set by the NTA. However, candidates must fulfill the age criteria (if any) of the university to which they are seeking admission.
      </p>

      <h2>University Specific Criteria</h2>
      <p>
        While NTA sets the broad rules, individual universities like <strong>University of Delhi (DU)</strong> or <strong>BHU</strong> may have specific subject requirements (e.g., Mathematics mandatory for Economics Hons). Always cross-reference with our <a href="/articles/colleges-accepting-cuet-ug">CUET colleges guide</a>.
      </p>

      <p>
        👉 <strong>Internal Link:</strong> Read the <a href="/exams/cuet-ug">CUET UG 2026 Complete Guide</a>
      </p>

      <h2>Conclusion</h2>
      <p>
        Verify your subject combinations early to avoid disqualification. Pair your eligibility check with our <a href="/articles/cuet-ug-preparation-strategy">CUET UG 2026 preparation strategy</a> to master the NCERT-based pattern.
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'CUET UG 2026 Complete Guide', href: '/exams/cuet-ug' },
    { title: 'Syllabus Breakdown', href: '/articles/cuet-ug-syllabus-2026' },
    { title: 'Preparation Strategy', href: '/articles/cuet-ug-preparation-strategy' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="CUET UG 2026 Eligibility Criteria"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="6 min"
      content={content}
      relatedArticles={relatedArticles}
      category="University Entrance"
    />
  )
}
