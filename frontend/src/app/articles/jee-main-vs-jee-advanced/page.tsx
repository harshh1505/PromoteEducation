import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'JEE Main vs JEE Advanced: Key Differences, Difficulty & Colleges',
  description: 'Understand the fundamental differences between JEE Main and JEE Advanced. Compare difficulty levels, attempt limits, and the colleges you can enter.',
  alternates: {
    canonical: 'https://promoteducation.com/articles/jee-main-vs-jee-advanced'
  }
}

export default function Page() {
  const slug = 'jee-main-vs-jee-advanced'
  const content = (
    <>
      <p>
        Engineering aspirants often wonder about the real differences between JEE Main and JEE Advanced. While <a href="/exams/jee-main">JEE Main</a> is the entrance for NITs and IIITs, <a href="/exams/jee-advanced">JEE Advanced</a> is exclusively for the prestigious IITs.
      </p>

      <h2>The Major Differences</h2>
      <div className="overflow-x-auto my-8">
        <table className="w-full text-left border-collapse border border-slate-200">
          <thead>
            <tr className="bg-slate-50">
              <th className="p-4 border border-slate-200 font-bold text-[#2563eb]">Feature</th>
              <th className="p-4 border border-slate-200 font-bold text-[#2563eb]">JEE Main</th>
              <th className="p-4 border border-slate-200 font-bold text-[#2563eb]">JEE Advanced</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 border border-slate-200 font-medium">Difficulty</td>
              <td className="p-4 border border-slate-200 text-slate-600">Moderate</td>
              <td className="p-4 border border-slate-200 text-slate-600">Very High</td>
            </tr>
            <tr className="bg-slate-50/50">
              <td className="p-4 border border-slate-200 font-medium">Top Colleges</td>
              <td className="p-4 border border-slate-200 text-slate-600">NITs, IIITs, GFTIs</td>
              <td className="p-4 border border-slate-200 text-slate-600">IITs Only</td>
            </tr>
            <tr>
              <td className="p-4 border border-slate-200 font-medium">Attempts</td>
              <td className="p-4 border border-slate-200 text-slate-600">3 consecutive years</td>
              <td className="p-4 border border-slate-200 text-slate-600">2 consecutive years</td>
            </tr>
            <tr className="bg-slate-50/50">
              <td className="p-4 border border-slate-200 font-medium">Eligibility</td>
              <td className="p-4 border border-slate-200 text-slate-600">Open to all 12th pass</td>
              <td className="p-4 border border-slate-200 text-slate-600">Top 2.5 lakh of JEE Main</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Which Exam should you focus on?</h2>
      <p>
        For most students, securing a good score in JEE Main is the primary goal as it ensures a seat in top government colleges. However, if your ultimate dream is an IIT, your <a href="/articles/jee-advanced-preparation-strategy">preparation strategy</a> must be tailored for the Advanced level from day one.
      </p>

      <p>
        👉 <strong>Internal Link:</strong> Link back to our <a href="/exams/jee-advanced">JEE Advanced 2026 Pillar Page</a>
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'JEE Advanced 2026 Guide', href: '/exams/jee-advanced' },
    { title: 'JEE Main 2026 Guide', href: '/exams/jee-main' },
    { title: 'Top IITs in India', href: '/articles/colleges-accepting-jee-advanced' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="JEE Main vs JEE Advanced"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="6 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Comparison"
    />
  )
}
