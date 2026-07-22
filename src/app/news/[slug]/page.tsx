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

import PageClient from './PageClient'

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <PageClient params={params} />
}
