import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'Top Engineering Colleges Accepting JEE Main Score in India',
  description: 'Looking for colleges after JEE Main? Explore the list of top NITs, IIITs, and other premier engineering institutes accepting JEE Main scores for admission.',
}

export default function Page() {
  const slug = 'colleges-accepting-jee-main'
  const content = (
    <>
      <p>JEE Main is the gateway to some of India's most prestigious engineering institutions. Beyond the IITs (which require qualifying JEE Advanced), there are several top-tier colleges that offer world-class education. You can read more about the <a href="/articles/jee-main-vs-advanced-bitsat">difference between JEE Main and Advanced here</a>.</p>

      <h2>National Institutes of Technology (NITs)</h2>
      <p>With 31 institutes across the country, NITs like NIT Trichy, NIT Warangal, and NIT Surathkal are considered on par with several IITs. They offer a wide range of engineering branches and excellent industry exposure.</p>

      <h2>Indian Institutes of Information Technology (IIITs)</h2>
      <p>IIITs focus heavily on Computer Science and Information Technology. IIIT Hyderabad, IIIT Bangalore, and IIIT Delhi are among the most sought-after colleges for tech enthusiasts.</p>

      <h2>Government Funded Technical Institutes (GFTIs)</h2>
      <p>There are several GFTIs like DTU (Delhi Technological University) and NSUT that accept JEE Main scores and have a long-standing reputation for excellence.</p>

      <p>
        👉 <strong>Internal Link:</strong> Link to our <a href="/colleges">Detailed College Search</a> to compare these institutes.
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'JEE Main 2026 Complete Guide', href: '/exams/jee-main' },
    { title: 'JEE vs Advanced vs BITSAT', href: '/articles/jee-main-vs-advanced-bitsat' },
    { title: 'Eligibility Criteria 2026', href: '/articles/jee-main-eligibility-2026' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="Top Colleges Accepting JEE Main Score"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="6 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Colleges"
    />
  )
}
