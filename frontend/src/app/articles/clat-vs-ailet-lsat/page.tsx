import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'CLAT vs AILET vs LSAT India: Which Law Exam Should You Choose?',
  description: 'Law aspirants often compare CLAT, AILET, and LSAT India. Understand the differences in colleges, focus, and difficulty to make the right choice.',
  alternates: {
    canonical: 'https://promoteducation.com/articles/clat-vs-ailet-lsat'
  }
}

export default function Page() {
  const slug = 'clat-vs-ailet-lsat'
  const content = (
    <>
      <p>
        Law aspirants in India often face a choice between three major entrance exams: <a href="/exams/clat">CLAT</a>, AILET, and LSAT India. While all lead to prestigious legal careers, their focus and participating colleges vary.
      </p>

      <h2>The Major Differences</h2>
      <div className="overflow-x-auto my-8">
        <table className="w-full text-left border-collapse border border-slate-200">
          <thead>
            <tr className="bg-slate-50">
              <th className="p-4 border border-slate-200 font-bold text-[#7A3AD5]">Exam</th>
              <th className="p-4 border border-slate-200 font-bold text-[#7A3AD5]">Primary Focus</th>
              <th className="p-4 border border-slate-200 font-bold text-[#7A3AD5]">Top Colleges</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 border border-slate-200 font-medium">CLAT</td>
              <td className="p-4 border border-slate-200 text-slate-600">Comprehension & Legal</td>
              <td className="p-4 border border-slate-200 text-slate-600">22 National Law Universities</td>
            </tr>
            <tr className="bg-slate-50/50">
              <td className="p-4 border border-slate-200 font-medium">AILET</td>
              <td className="p-4 border border-slate-200 text-slate-600">Critical Reasoning</td>
              <td className="p-4 border border-slate-200 text-slate-600">National Law University, Delhi</td>
            </tr>
            <tr>
              <td className="p-4 border border-slate-200 font-medium">LSAT India</td>
              <td className="p-4 border border-slate-200 text-slate-600">Analytical Reasoning</td>
              <td className="p-4 border border-slate-200 text-slate-600">Jindal Global Law School & others</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Which Exam to Prioritize?</h2>
      <p>
        If your goal is to study in one of the top 22 NLUs, CLAT is your primary focus. If you specifically target NLU Delhi, AILET is mandatory. LSAT India is an excellent option for those looking at premier private law colleges. Also, ensure you check the <a href="/articles/clat-eligibility-2026">latest eligibility criteria</a> for each.
      </p>

      <p>
        👉 <strong>Internal Link:</strong> Link back to our <a href="/exams/clat">CLAT 2026 Pillar Page</a>
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'CLAT 2026 Complete Guide', href: '/exams/clat' },
    { title: 'Top NLUs in India', href: '/articles/colleges-accepting-clat' },
    { title: 'Syllabus breakdown', href: '/articles/clat-syllabus-2026' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="CLAT vs AILET vs LSAT Comparison"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="6 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Comparison"
    />
  )
}
