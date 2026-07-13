import NewsPageContent from '@/components/pages/NewsPage'
import { supabase } from '@/lib/supabase'
import type { Metadata } from 'next'

export const revalidate = 3600 // Cache for 1 hour

export const metadata: Metadata = {
  title: 'Latest Education News & Exam Alerts 2026 | Promote Education',
  description: 'Stay updated with the latest news on JEE, NEET, admissions, and policy changes in the Indian education sector. Real-time alerts and analysis.',
}

export default async function NewsPage() {
  // Parallel server-side fetching of news and blogs
  const [newsRes, blogsRes] = await Promise.all([
    supabase
      .from('news_articles')
      .select('id, slug, heading, synopsis, editor, published_at, created_at, comments_count, shares_count, views, featured_image, is_live')
      .eq('is_live', true)
      .order('published_at', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false }),
    supabase
      .from('blogs')
      .select('id, slug, title, summary, featured_image, category, created_at')
      .eq('is_live', true)
      .order('created_at', { ascending: false })
      .limit(3)
  ])

  return (
    <NewsPageContent 
      initialArticles={newsRes.data || []} 
      initialEduArticles={blogsRes.data || []} 
    />
  )
}
