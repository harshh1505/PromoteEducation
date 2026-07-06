export const dynamicParams = false

export async function generateStaticParams() {
  const { articleDatabase } = await import('@/data/articleDatabase')
  return Object.keys(articleDatabase).map(slug => ({ slug }))
}

import { Metadata } from 'next'
import ArticleClient from './ArticleClient'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const { articleDatabase } = await import('@/data/articleDatabase')
  const { examDatabase } = await import('@/data/examDatabase')
  const dbArticle = articleDatabase[slug]
  const examKey = Object.keys(examDatabase).find(key => slug.startsWith(key))
  const exam = examKey ? examDatabase[examKey] : null

  const title = dbArticle?.title || slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  const examTitle = exam?.title || 'Entrance Exams'

  return {
    title: `${title} | ${examTitle} Guide 2026`,
    description: `Complete guide to ${title} for 2026. Get expert tips, eligibility criteria, and preparation strategies for ${examTitle} aspirants.`,
    keywords: [examTitle, slug, 'admission 2026', 'exam preparation', 'syllabus'],
  }
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <ArticleClient params={params} />
}
