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

import PageClient from './PageClient'

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <PageClient params={params} />
}
