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
  const { data } = await supabase.from('blogs').select('slug').eq('is_live', true)
  return (data || []).map((b: { slug: string }) => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: blog } = await supabase
    .from('blogs')
    .select('title, summary, featured_image')
    .eq('slug', slug)
    .single()

  const title = blog?.title 
    ? `${blog.title} | Promote Education Blog` 
    : 'Expert Education Blog | Promote Education'
  const description = blog?.summary || 'Read expert education insights, guides, and college preparation tips.'
  const canonical = `https://promoteducation.com/blogs/${slug}`

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
      images: blog?.featured_image ? [{ url: blog.featured_image }] : [{ url: '/og-image.png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: blog?.featured_image ? [blog.featured_image] : ['/og-image.png'],
    },
  }
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <PageClient params={params} />
}
