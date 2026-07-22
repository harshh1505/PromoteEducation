import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://promoteeducation.in'

  // 1. Static Pages
  const staticPages = [
    '',
    '/colleges',
    '/colleges/engineering',
    '/colleges/medical',
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
  const { data: colleges } = await supabase.from('colleges').select('slug, updated_at')
  const collegePages = colleges?.map((c) => ({
    url: `${baseUrl}/colleges/${c.slug}`,
    lastModified: c.updated_at ? new Date(c.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  })) || []

  // 3. Traffic Magnet Pages (Location/Filters)
  const streams = ['engineering', 'medical']
  const cities = ['delhi', 'mumbai', 'bangalore', 'pune']
  const magnetPages: any[] = []

  streams.forEach(s => {
    cities.forEach(c => {
      magnetPages.push({
        url: `${baseUrl}/colleges/${s}-in-${c}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      })
    })
  })

  // 4. Individual Blog Pages
  const { data: blogs } = await supabase.from('blogs').select('slug, updated_at').eq('is_live', true)
  const blogPages = blogs?.map((b) => ({
    url: `${baseUrl}/blogs/${b.slug}`,
    lastModified: b.updated_at ? new Date(b.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  })) || []

  // 5. Individual Course Pages
  const { data: courses } = await supabase.from('courses').select('slug, created_at')
  const coursePages = courses?.map((c) => {
    let urlPath = c.slug || '';
    if (c.slug) {
      const parts = c.slug.split('-');
      if (parts.length > 1) {
        urlPath = `${parts[0]}/${parts.slice(1).join('-')}`;
      }
    }
    return {
      url: `${baseUrl}/courses/${urlPath}`,
      lastModified: c.created_at ? new Date(c.created_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }
  }) || []

  return [...staticPages, ...collegePages, ...magnetPages, ...blogPages, ...coursePages]
}
