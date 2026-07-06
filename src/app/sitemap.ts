import { MetadataRoute } from 'next'

export const runtime = 'edge'
const baseUrl = 'https://promoteducation.com'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

/** Lightweight REST helper — avoids importing the supabase client at build time */
async function supabaseSelect<T>(
  table: string,
  select: string,
  filter?: string
): Promise<T[]> {
  if (!supabaseUrl || !supabaseAnonKey) return []
  try {
    const url = new URL(`${supabaseUrl}/rest/v1/${table}`)
    url.searchParams.set('select', select)
    if (filter) {
      const [col, val] = filter.split('=')
      url.searchParams.set(col, `eq.${val}`)
    }
    const res = await fetch(url.toString(), {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
      // Don't cache sitemap data during build — always get fresh data
      cache: 'no-store',
    })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Static Pages
  const staticPages = [
    '',
    '/colleges',
    '/colleges/engineering',
    '/admission-support',
    '/mentorship',
    '/counselling',
    '/selection',
    '/consultation',
    '/scholarships',
    '/rankings',
    '/news',
    '/blogs',
    '/sitemap',
    '/about',
    '/contact',
    '/faq',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.9,
  }))

  // 2. Individual College Pages
  const colleges = await supabaseSelect<{ slug: string; updated_at: string }>(
    'colleges',
    'slug,updated_at'
  )
  const collegePages = colleges.map((c) => ({
    url: `${baseUrl}/colleges/${c.slug}`,
    lastModified: c.updated_at ? new Date(c.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // 3. Traffic Magnet Pages (Location/Filters)
  const streams = ['engineering', 'medical']
  const cities = ['delhi', 'mumbai', 'bangalore', 'pune']
  const magnetPages = streams.flatMap((s) =>
    cities.map((c) => ({
      url: `${baseUrl}/colleges/${s}-in-${c}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  )

  // 4. Individual Blog Pages
  const blogs = await supabaseSelect<{ slug: string; updated_at: string }>(
    'blogs',
    'slug,updated_at',
    'is_live=true'
  )
  const blogPages = blogs.map((b) => ({
    url: `${baseUrl}/blogs/${b.slug}`,
    lastModified: b.updated_at ? new Date(b.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // 5. Individual Course Pages
  const courses = await supabaseSelect<{ slug: string; created_at: string }>(
    'courses',
    'slug,created_at'
  )
  const coursePages = courses.map((c) => {
    let urlPath = c.slug || ''
    if (c.slug) {
      const parts = c.slug.split('-')
      if (parts.length > 1) {
        urlPath = `${parts[0]}/${parts.slice(1).join('-')}`
      }
    }
    return {
      url: `${baseUrl}/courses/${urlPath}`,
      lastModified: c.created_at ? new Date(c.created_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }
  })

  return [...staticPages, ...collegePages, ...magnetPages, ...blogPages, ...coursePages]
}
