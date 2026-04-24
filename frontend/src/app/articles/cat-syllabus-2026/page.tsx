import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'CAT 2026 Syllabus: VARC, DILR & QA Detailed Topic-wise Breakdown',
  description: 'The syllabus for CAT 2026 is divided into three sections: VARC, DILR, and QA. Get a detailed breakdown of the topics you need to master.',
  alternates: {
    canonical: 'https://promoteducation.com/articles/cat-syllabus-2026'
  }
}

export default function Page() {
  const slug = 'cat-syllabus-2026'
  const content = (
    <>
      <p>
        The syllabus for CAT is designed to test your logical, verbal, and numerical abilities. Mastering the three core sections is the only way to secure a 99+ percentile. Before you start, check the <a href="/articles/cat-exam-pattern">latest exam pattern</a> and our <a href="/exams/cat">complete CAT guide</a>.
      </p>

      <h2>Verbal Ability & Reading Comprehension (VARC)</h2>
      <p>
        This section tests your English proficiency and ability to interpret complex passages.
      </p>
      <ul>
        <li>Reading Comprehension (Approx 70% of the section)</li>
        <li>Para Jumbles & Para Summary</li>
        <li>Sentence Correction & Vocabulary</li>
      </ul>
      
      <h2>Data Interpretation & Logical Reasoning (DILR)</h2>
      <p>
        DILR is often the most unpredictable section. It requires sharp analytical skills.
      </p>
      <ul>
        <li>Data Sets: Tables, Bar Graphs, Pie Charts</li>
        <li>Logical Puzzles: Seating arrangements, Team formation, Games and Tournaments</li>
        <li>Blood Relations and Coding-Decoding</li>
      </ul>
      
      <h2>Quantitative Aptitude (QA)</h2>
      <p>
        The QA section covers basic mathematics up to the graduation level.
      </p>
      <ul>
        <li><strong>Arithmetic:</strong> Percentages, Profit & Loss, Time & Work.</li>
        <li><strong>Algebra:</strong> Quadratic equations, Logarithms, Progressions.</li>
        <li><strong>Geometry & Mensuration:</strong> Circles, Triangles, Coordinate Geometry.</li>
      </ul>

      <p>
        👉 <strong>Internal Link:</strong> Pair this with our <a href="/articles/cat-preparation-strategy">CAT 2026 Preparation Strategy</a>
      </p>

      <h2>Focus Areas</h2>
      <p>
        For a high score, focus on Arithmetic in QA and Reading Comprehension in VARC. Use our <a href="/articles/best-books-cat">recommended books</a> for specialized topic-wise practice.
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'CAT 2026 Complete Guide', href: '/exams/cat' },
    { title: 'Best Books for CAT', href: '/articles/best-books-cat' },
    { title: 'Preparation Strategy', href: '/articles/cat-preparation-strategy' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="CAT 2026 Syllabus breakdown"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="10 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Syllabus"
    />
  )
}
