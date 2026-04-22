import type { Metadata } from 'next'
import ExamBlogPage from '@/components/pages/ExamBlogPage'

type Props = {
  params: Promise<{ slug: string }>
}

const examData: Record<string, { title: string; fullName: string; stream: string }> = {
  'jee-main': { title: 'JEE Main', fullName: 'Joint Entrance Examination Main', stream: 'Engineering' },
  'jee-advanced': { title: 'JEE Advanced', fullName: 'Joint Entrance Examination Advanced', stream: 'Engineering' },
  'neet-ug': { title: 'NEET UG', fullName: 'National Eligibility cum Entrance Test', stream: 'Medical' },
  'cat': { title: 'CAT', fullName: 'Common Admission Test', stream: 'Management' },
  'gate': { title: 'GATE', fullName: 'Graduate Aptitude Test in Engineering', stream: 'Engineering' },
  'clat': { title: 'CLAT', fullName: 'Common Law Admission Test', stream: 'Law' },
  'nift': { title: 'NIFT', fullName: 'National Institute of Fashion Technology Entrance', stream: 'Design' },
  'cuet-ug': { title: 'CUET UG', fullName: 'Common University Entrance Test', stream: 'General' },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const exam = examData[slug]
  const title = exam ? `${exam.title} 2025 — Eligibility, Syllabus, Dates & Preparation Tips` : 'Exam Details'
  const description = exam
    ? `Complete guide to ${exam.fullName} (${exam.title}) 2025. Get eligibility criteria, syllabus, exam dates, preparation tips, cut-offs, and top colleges accepting ${exam.title} scores.`
    : 'Detailed exam information and preparation guide.'

  return {
    title,
    description,
    openGraph: { title, description },
  }
}

export default async function ExamPage({ params }: Props) {
  const { slug } = await params
  return <ExamBlogPage slug={slug} />
}
