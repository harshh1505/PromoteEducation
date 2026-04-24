import type { Metadata } from 'next'
import BlogTemplate from '@/components/pages/BlogTemplate'

export const metadata: Metadata = {
  title: 'JEE Advanced 2026 Syllabus: Complete PCM Topic Breakdown & Analysis',
  description: 'The syllabus for JEE Advanced 2026 is significantly more advanced than JEE Main. Get a detailed breakdown of Physics, Chemistry, and Mathematics.',
  alternates: {
    canonical: 'https://promoteducation.com/articles/jee-advanced-syllabus-2026'
  }
}

export default function Page() {
  const slug = 'jee-advanced-syllabus-2026'
  const content = (
    <>
      <p>
        The syllabus for JEE Advanced is renowned for its depth and complexity. Unlike JEE Main, it tests deep conceptual understanding and the ability to apply multiple concepts to a single problem. Before diving in, ensure you meet the <a href="/articles/jee-advanced-eligibility-2026">eligibility criteria</a> and understand the <a href="/articles/jee-advanced-exam-pattern">unpredictable exam pattern</a>.
      </p>

      <h2>Physics</h2>
      <p>
        Physics in Advanced requires a mastery of mechanics and electromagnetism. Questions often combine multiple topics like rotational mechanics with electrostatics.
      </p>
      <ul>
        <li>General Physics & Mechanics</li>
        <li>Thermal Physics & Thermodynamics</li>
        <li>Electricity and Magnetism</li>
        <li>Optics and Modern Physics</li>
      </ul>
      
      <h2>Chemistry</h2>
      <p>
        Chemistry is often the scoring subject if approached correctly. Advanced questions focus heavily on reaction mechanisms and physical chemistry numericals.
      </p>
      <ul>
        <li><strong>Physical Chemistry:</strong> Energetics, Chemical Equilibrium, Electrochemistry.</li>
        <li><strong>Inorganic Chemistry:</strong> Coordination Compounds, P-block elements.</li>
        <li><strong>Organic Chemistry:</strong> Reaction mechanisms, Carbohydrates, Amino acids.</li>
      </ul>
      
      <h2>Mathematics</h2>
      <p>
        Mathematics is considered the toughest section. It requires speed and the ability to visualize complex functions.
      </p>
      <ul>
        <li>Algebra & Quadratic Equations</li>
        <li>Calculus (Differential and Integral)</li>
        <li>Vectors and 3D Geometry</li>
        <li>Trigonometry and Coordinate Geometry</li>
      </ul>

      <p>
        👉 <strong>Internal Link:</strong> Pair this with our <a href="/articles/jee-advanced-preparation-strategy">JEE Advanced 2026 Preparation Strategy</a>
      </p>

      <h2>Weightage Analysis</h2>
      <p>
        While every topic is important, Calculus and Mechanics usually carry the highest weightage. Use the <a href="/articles/best-books-jee-advanced">best recommended books</a> to master these core areas.
      </p>
    </>
  )

  const relatedArticles = [
    { title: 'JEE Advanced 2026 Complete Guide', href: '/exams/jee-advanced' },
    { title: 'Best Books for Advanced', href: '/articles/best-books-jee-advanced' },
    { title: 'Preparation Strategy', href: '/articles/jee-advanced-preparation-strategy' },
  ]

  return (
    <BlogTemplate
      slug={slug}
      title="JEE Advanced 2026 Syllabus"
      description={metadata.description as string}
      updatedDate="2026"
      readTime="10 min"
      content={content}
      relatedArticles={relatedArticles}
      category="Syllabus"
    />
  )
}
