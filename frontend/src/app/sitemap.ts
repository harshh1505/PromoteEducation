import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://promote-education.vercel.app' // Replace with real domain

  // 1. Static Pages
  const staticPages = [
    '',
    '/colleges',
    '/colleges/engineering',
    '/colleges/medical',
    '/about',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1.0,
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

  return [...staticPages, ...collegePages, ...magnetPages]
}
