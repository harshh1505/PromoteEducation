import BlogsPageContent from '@/components/pages/BlogsPage'
import type { Metadata } from 'next'

// Blogs directory page component
export const metadata: Metadata = {
  title: 'Expert Education Blogs & Prep Guides 2026 | Promote Education',
  description: 'Explore insightful blogs, expert preparation guides, exam strategies, and college selection tips written by expert education advisors at Promote Education.',
}

export default function BlogsPage() {
  return <BlogsPageContent />
}
