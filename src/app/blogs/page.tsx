import BlogsPageContent from '@/components/pages/BlogsPage'
import { supabase } from '@/lib/supabase'
import type { Metadata } from 'next'

export const revalidate = 3600 // Cache for 1 hour, serve instantly

// Blogs directory page component
export const metadata: Metadata = {
  title: 'Expert Education Blogs & Prep Guides 2026 | Promote Education',
  description: 'Explore insightful blogs, expert preparation guides, exam strategies, and college selection tips written by expert education advisors at Promote Education.',
}

export default async function BlogsPage() {
  const { data: initialBlogs } = await supabase
    .from('blogs')
    .select('id, slug, title, summary, category, published_at, read_time, views, featured_image, author, featured')
    .eq('is_live', true)
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })

  return <BlogsPageContent initialBlogs={initialBlogs || []} />
}
