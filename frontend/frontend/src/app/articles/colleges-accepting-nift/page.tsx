import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'Top NIFT Colleges in India: Campuses, Courses & Rankings 2026',
  description: 'Explore the list of top NIFT campuses including Delhi, Mumbai, and Bengaluru. Check their rankings, popular courses, and infrastructure.',
  alternates: {
    canonical: 'https://promoteducation.com/articles/colleges-accepting-nift'
  }
}

export default function Page() {
  const slug = 'colleges-accepting-nift'
  const content = (
    <>
      <p>
        The National Institute of Fashion Technology (NIFT) has established itself as the pioneer of fashion education in India. With multiple campuses across the country, choosing the right one depends on your rank and choice of specialization. You can read more about the <a href="/articles/nift-vs-nid-uceed">differences between design institutes here</a>.
      </p>

      <h2>Top Rated NIFT Campuses</h2>
      <ul>
        <li><strong>NIFT Delhi:</strong> The oldest and most prestigious campus with a massive alumni network.</li>
        <li><strong>NIFT Mumbai:</strong> Strategically located in the fashion capital of India.</li>
        <li><strong>NIFT Bengaluru:</strong> Known for its proximity to India's IT and apparel industry hubs.</li>
        <li><strong>NIFT Hyderabad & Chennai:</strong> Top-tier campuses with excellent industry exposure.</li>
      </ul>

      <h2>Choosing Your Specialization</h2>
      <p>
        While Delhi and Mumbai are highly competitive, campuses like Gandhinagar and Kolkata are excellent choices for specialized courses like Accessory Design and Knitwear Design. Make sure you meet the <a href="/articles/nift-eligibility-2026">latest eligibility requirements</a> for the counselling process.
      </p>

      <p>
        👉 <strong>Internal Link:</strong> Link to our detailed <a href="/colleges">College Search</a> for more fashion school details.
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'NIFT 2026 Complete Guide', href: '/exams/nift' },
    { title: 'NIFT vs NID vs UCEED', href: '/articles/nift-vs-nid-uceed' },
    { title: 'Eligibility Criteria 2026', href: '/articles/nift-eligibility-2026' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="Top NIFT Campuses in India"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="6 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Colleges"
    />
  )
}
