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

  const rawTitle = blog?.title || 'Expert Education Blog'
  const baseTitle = rawTitle.replace(/\s*\|\s*Promote Education.*$/i, '').trim()
  const fullTitle = `${baseTitle} | Promote Education`
  const description = blog?.summary || 'Read expert education insights, guides, and college preparation tips.'
  const canonical = `https://promoteducation.com/blogs/${slug}`

  return {
    title: baseTitle,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      type: 'article',
      images: blog?.featured_image ? [{ url: blog.featured_image }] : [{ url: '/og-image.png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: blog?.featured_image ? [blog.featured_image] : ['/og-image.png'],
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: currentBlog } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single()

  let enrichedBlog: any = null
  let trending: any[] = []

  if (currentBlog) {
    const [{ data: sectionsData }, { data: faqsData }, { data: otherBlogs }] = await Promise.all([
      supabase
        .from('blog_sections')
        .select('*')
        .eq('blog_id', currentBlog.id)
        .order('section_order', { ascending: true }),
      supabase
        .from('blog_faqs')
        .select('*')
        .eq('blog_id', currentBlog.id)
        .order('faq_order', { ascending: true }),
      supabase
        .from('blogs')
        .select('slug, title, published_at, featured_image, views')
        .neq('slug', slug)
        .eq('is_live', true)
        .limit(3)
    ])

    enrichedBlog = {
      ...currentBlog,
      sections: sectionsData || [],
      faqs: faqsData || []
    }
    trending = otherBlogs || []
  }

  const blogPostSchema = currentBlog ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": currentBlog.title,
    "description": currentBlog.summary,
    "image": currentBlog.featured_image ? [currentBlog.featured_image] : ["https://promoteducation.com/og-image.png"],
    "datePublished": currentBlog.published_at || new Date().toISOString(),
    "dateModified": currentBlog.updated_at || currentBlog.published_at || new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": currentBlog.author_name || "Promote Education Editorial",
      "url": "https://promoteducation.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Promote Education",
      "logo": {
        "@type": "ImageObject",
        "url": "https://promoteducation.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://promoteducation.com/blogs/${slug}`
    }
  } : null

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://promoteducation.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blogs",
        "item": "https://promoteducation.com/blogs"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": currentBlog?.title || slug,
        "item": `https://promoteducation.com/blogs/${slug}`
      }
    ]
  }

  const faqSchema = enrichedBlog?.faqs && enrichedBlog.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": enrichedBlog.faqs.map((faq: any) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null

  return (
    <>
      {blogPostSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <PageClient params={params} initialBlog={enrichedBlog} initialTrending={trending} />
    </>
  )
}
