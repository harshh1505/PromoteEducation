import type { Metadata } from 'next'
import PageClient from './PageClient'

export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateStaticParams() {
  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  
  // Fetch all articles so drafts can be previewed without Next.js crashing
  const { data } = await supabase.from('news_articles').select('slug')
  return (data || []).map((article: { slug: string }) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: article } = await supabase
    .from('news_articles')
    .select('heading, synopsis, featured_image')
    .eq('slug', slug)
    .single()

  const title = article?.heading 
    ? `${article.heading} | Promote Education News` 
    : 'Latest Education News | Promote Education'
  const description = article?.synopsis || 'Read the latest updates and exam news on Promote Education.'
  const canonical = `https://promoteducation.com/news/${slug}`

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      images: article?.featured_image ? [{ url: article.featured_image }] : [{ url: '/og-image.png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: article?.featured_image ? [article.featured_image] : ['/og-image.png'],
    },
  }
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <PageClient params={params} />
}
