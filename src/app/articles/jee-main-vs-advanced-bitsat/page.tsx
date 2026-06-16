import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'JEE Main vs JEE Advanced vs BITSAT: Key Differences Explained',
  description: 'Engineering aspirants often compare exams like JEE Main, JEE Advanced, and BITSAT. Understand the key differences in difficulty, syllabus, and colleges.',
}

export default function Page() {
  const slug = 'jee-main-vs-advanced-bitsat'
  const content = (
    <>
      <p>Engineering aspirants often compare exams like JEE Main, JEE Advanced, and BITSAT. While they all lead to prestigious engineering careers, their patterns and difficulty levels vary significantly. For a full breakdown of the primary exam, see our <a href="/exams/jee-main">JEE Main 2026 complete guide</a>.</p>

      <h2>Comparison Table</h2>
      <div className="overflow-x-auto my-8">
        <table className="w-full text-left border-collapse border border-slate-200">
          <thead>
            <tr className="bg-slate-50">
              <th className="p-4 border border-slate-200 font-bold text-[#0b57d0]">Exam</th>
              <th className="p-4 border border-slate-200 font-bold text-[#0b57d0]">Difficulty</th>
              <th className="p-4 border border-slate-200 font-bold text-[#0b57d0]">Top Colleges</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 border border-slate-200 font-medium">JEE Main</td>
              <td className="p-4 border border-slate-200 text-slate-600">Moderate</td>
              <td className="p-4 border border-slate-200 text-slate-600">NITs, IIITs, GFTIs</td>
            </tr>
            <tr className="bg-slate-50/50">
              <td className="p-4 border border-slate-200 font-medium">JEE Advanced</td>
              <td className="p-4 border border-slate-200 text-slate-600">High</td>
              <td className="p-4 border border-slate-200 text-slate-600">IITs Only</td>
            </tr>
            <tr>
              <td className="p-4 border border-slate-200 font-medium">BITSAT</td>
              <td className="p-4 border border-slate-200 text-slate-600">Moderate</td>
              <td className="p-4 border border-slate-200 text-slate-600">BITS Pilani, Goa, Hyderabad</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Which one should you choose?</h2>
      <p>Most students prepare for JEE Main as it covers the largest number of colleges. However, if your goal is an IIT, JEE Advanced should be your ultimate target. BITSAT is a great alternative for those who prefer a more speed-oriented exam pattern.</p>

      <p>
        👉 <strong>Internal Link:</strong> Link back to our <a href="/exams/jee-main">JEE Main 2026 Pillar Page</a>
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'JEE Main 2026 Complete Guide', href: '/exams/jee-main' },
    { title: 'Top Colleges Accepting JEE Main', href: '/articles/colleges-accepting-jee-main' },
    { title: 'Exam Pattern & Marking', href: '/articles/jee-main-exam-pattern' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="JEE Main vs JEE Advanced vs BITSAT"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="9 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Comparison"
    />
  )
}
