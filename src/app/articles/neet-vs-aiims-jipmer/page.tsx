import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'NEET vs AIIMS vs JIPMER: What Changed After NEET Became Common Exam',
  description: 'Understand the transition from individual exams like AIIMS and JIPMER to the unified NEET UG. Check what has changed for medical aspirants.',
  alternates: {
    canonical: 'https://promoteducation.com/articles/neet-vs-aiims-jipmer'
  }
}

export default function Page() {
  const slug = 'neet-vs-aiims-jipmer'
  const content = (
    <>
      <p>
        Earlier, prestigious exams like AIIMS MBBS Entrance Exam and JIPMER Entrance Exam existed separately. However, following recent reforms, admissions to these institutes are now managed through <a href="/exams/neet-ug">NEET UG</a>.
      </p>

      <h2>The Unified Entrance Era</h2>
      <div className="overflow-x-auto my-8">
        <table className="w-full text-left border-collapse border border-slate-200">
          <thead>
            <tr className="bg-slate-50">
              <th className="p-4 border border-slate-200 font-bold text-[#1DB87A]">Exam Name</th>
              <th className="p-4 border border-slate-200 font-bold text-[#1DB87A]">Current Status</th>
              <th className="p-4 border border-slate-200 font-bold text-[#1DB87A]">Admission Through</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 border border-slate-200 font-medium">NEET UG</td>
              <td className="p-4 border border-slate-200 text-slate-600">Active</td>
              <td className="p-4 border border-slate-200 text-slate-600">Unified Portal</td>
            </tr>
            <tr className="bg-slate-50/50">
              <td className="p-4 border border-slate-200 font-medium">AIIMS Exam</td>
              <td className="p-4 border border-slate-200 text-slate-600">Discontinued</td>
              <td className="p-4 border border-slate-200 text-slate-600">NEET UG Score</td>
            </tr>
            <tr>
              <td className="p-4 border border-slate-200 font-medium">JIPMER Exam</td>
              <td className="p-4 border border-slate-200 text-slate-600">Discontinued</td>
              <td className="p-4 border border-slate-200 text-slate-600">NEET UG Score</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>What this means for students?</h2>
      <p>
        Students no longer need to prepare for multiple exam patterns. Focus entirely on the <a href="/articles/neet-syllabus-2026">NEET syllabus</a> to gain admission into any medical college in India, including AIIMS New Delhi and JIPMER Puducherry.
      </p>

      <p>
        👉 <strong>Internal Link:</strong> Link back to our <a href="/exams/neet-ug">NEET 2026 Complete Guide</a>
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'NEET 2026 Complete Guide', href: '/exams/neet-ug' },
    { title: 'Top Medical Colleges', href: '/articles/colleges-accepting-neet' },
    { title: 'Syllabus breakdown', href: '/articles/neet-syllabus-2026' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="NEET vs AIIMS vs JIPMER"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="6 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Comparison"
    />
  )
}
