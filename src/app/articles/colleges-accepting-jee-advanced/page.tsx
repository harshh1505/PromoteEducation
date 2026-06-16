import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'Top IITs in India Accepting JEE Advanced Score 2026',
  description: 'Explore the list of the prestigious Indian Institutes of Technology (IITs) accepting JEE Advanced scores for B.Tech admissions. Check rankings and placements.',
  alternates: {
    canonical: 'https://promoteducation.com/articles/colleges-accepting-jee-advanced'
  }
}

export default function Page() {
  const slug = 'colleges-accepting-jee-advanced'
  const content = (
    <>
      <p>
        The Indian Institutes of Technology (IITs) are the crown jewels of Indian engineering education. Admission to these institutes is exclusively through <a href="/exams/jee-advanced">JEE Advanced</a>. These institutes offer top engineering programs with excellent placements and global recognition.
      </p>

      <h2>The "Old" IITs (Top Tier)</h2>
      <ul>
        <li><strong>IIT Bombay:</strong> Consistently ranked #1 for its CSE and Electrical departments.</li>
        <li><strong>IIT Delhi:</strong> Known for its vibrant startup culture and research facilities.</li>
        <li><strong>IIT Madras:</strong> The #1 engineering institute as per NIRF rankings.</li>
        <li><strong>IIT Kanpur & IIT Kharagpur:</strong> Famous for their vast campuses and academic rigor.</li>
      </ul>

      <h2>The Newer IITs</h2>
      <p>
        Institutes like IIT Hyderabad, IIT Gandhinagar, and IIT Indore have rapidly climbed the rankings and now offer infrastructure and placements comparable to the older IITs. You can read more about the <a href="/articles/jee-main-vs-jee-advanced">eligibility for these institutes here</a>.
      </p>

      <h2>Admission Process</h2>
      <p>
        After qualifying JEE Advanced, students must participate in <strong>JoSAA counselling</strong> to secure their branch and campus. Ensure you meet the <a href="/articles/jee-advanced-eligibility-2026">board percentage requirements</a> to finalize your seat.
      </p>

      <p>
        👉 <strong>Internal Link:</strong> Link to our detailed <a href="/colleges">College Search</a> for more IIT details.
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'JEE Advanced 2026 Complete Guide', href: '/exams/jee-advanced' },
    { title: 'JEE Main vs JEE Advanced', href: '/articles/jee-main-vs-jee-advanced' },
    { title: 'Eligibility Criteria 2026', href: '/articles/jee-advanced-eligibility-2026' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="Top IITs Accepting JEE Advanced"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="6 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Colleges"
    />
  )
}
