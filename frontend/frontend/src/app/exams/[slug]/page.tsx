import { Metadata } from 'next'
import { examDatabase } from '@/data/examDatabase'
import ExamBlogPage from '@/components/pages/exams/ExamBlogPage'
import { notFound } from 'next/navigation'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const exam = examDatabase[params.slug]
  if (!exam) return { title: 'Exam Not Found' }

  return {
    title: `${exam.title} 2026 | Eligibility, Syllabus, Exam Pattern & Dates`,
    description: `Complete guide to ${exam.title} 2026. Get latest updates on admission, syllabus, exam pattern, and important dates for ${exam.stream} candidates.`,
    keywords: [exam.title, `${exam.title} 2026`, `${exam.stream} admission`, `${exam.title} syllabus`],
    openGraph: {
      title: `${exam.title} 2026 Guide`,
      description: `Complete guide to ${exam.title} 2026. Get latest updates on admission, syllabus, exam pattern, and important dates.`,
    }
  }
}

export default function Page({ params }: Props) {
  const exam = examDatabase[params.slug]
  
  if (!exam) {
    notFound()
  }

  return <ExamBlogPage exam={exam} />
}
