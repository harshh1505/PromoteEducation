import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'GATE 2026 Syllabus: Branch-wise Topics & Weightage Analysis',
  description: 'The syllabus for GATE 2026 varies by branch. Get a detailed breakdown of Engineering Mathematics, General Aptitude, and Core Subjects.',
  alternates: {
    canonical: 'https://promoteducation.com/articles/gate-syllabus-2026'
  }
}

export default function Page() {
  const slug = 'gate-syllabus-2026'
  const content = (
    <>
      <p>
        The syllabus for GATE varies significantly by branch. However, there are common sections that every aspirant must master to score well. Understanding the <a href="/articles/gate-exam-pattern">exam pattern</a> is equally important.
      </p>

      <h2>Common Sections (Mandatory)</h2>
      <ul>
        <li><strong>Engineering Mathematics:</strong> Covers Linear Algebra, Calculus, Differential Equations, and Probability. (Approx 13-15 marks)</li>
        <li><strong>General Aptitude:</strong> Verbal Ability, Quantitative Aptitude, and Analytical Reasoning. (Mandatory 15 marks)</li>
      </ul>
      
      <h2>Core Subjects by Branch</h2>
      <p>The core section carries 70-72 marks and includes specialized topics based on your choice of paper:</p>
      <ul>
        <li><strong>Computer Science (CS):</strong> OS, DBMS, Algorithms, Data Structures, TOC, CN.</li>
        <li><strong>Mechanical Engineering (ME):</strong> Thermodynamics, Fluid Mechanics, Theory of Machines, SOM.</li>
        <li><strong>Electrical Engineering (EE):</strong> Control Systems, Power Systems, Machines, Network Theory.</li>
      </ul>

      <p>
        👉 <strong>Internal Link:</strong> Pair this with our <a href="/articles/gate-preparation-strategy">GATE 2026 Preparation Strategy</a>
      </p>

      <h2>Preparation Focus</h2>
      <p>
        Focus on subjects with high weightage first. For example, in CSE, Discrete Mathematics and Algorithms are crucial. Check our <a href="/articles/best-books-gate">recommended books</a> for each subject.
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'GATE 2026 Complete Guide', href: '/exams/gate' },
    { title: 'Best Books for GATE', href: '/articles/best-books-gate' },
    { title: 'Preparation Strategy', href: '/articles/gate-preparation-strategy' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="GATE 2026 Syllabus breakdown"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="10 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Syllabus"
    />
  )
}
