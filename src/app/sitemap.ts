import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://promoteducation.com'

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
    '/study-abroad',
    '/compare',
    '/loan-calculator',
    '/careers',
    '/events',
    '/tools/brainstorm',
    '/tools/college-predictor',
    '/privacy-policy',
    '/terms-of-use',
    '/cookie-policy',
    '/disclaimer',
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

  // 5. Course Hub Pages (Degree Slugs)
  const degreeSlugs = [
    'btech', 'mtech', 'mba', 'mbbs', 'bds', 'bsc-nursing',
    'ba-llb', 'llm', 'bpharm', 'mpharm', 'march', 'be', 'msc', 'phd'
  ]
  const degreePages = degreeSlugs.map((deg) => ({
    url: `${baseUrl}/courses/${deg}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // 6. Course Specialization Pages (from course_catalog table)
  const { data: courseCatalog } = await supabase.from('course_catalog').select('slug, degree')
  const coursePages = (courseCatalog || []).map((c) => {
    const degreeSlug = (c.degree || '').replace(/\./g, '').toLowerCase()
    return {
      url: `${baseUrl}/courses/${degreeSlug}/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }
  })

  // 7. Individual Exam Pages
  let examSlugs: string[] = [
    'aiims-entrance', 'bitsat', 'cat', 'clat', 'cuet-ug', 'gate',
    'ini-cet', 'ini-ss', 'jee-advanced', 'jee-main', 'neet-pg', 'neet-ug', 'nift', 'xat'
  ]
  try {
    const examsDir = path.join(process.cwd(), 'src/app/exams')
    if (fs.existsSync(examsDir)) {
      examSlugs = fs.readdirSync(examsDir).filter(f => {
        try {
          return fs.statSync(path.join(examsDir, f)).isDirectory() && !f.startsWith('[')
        } catch {
          return false
        }
      })
    }
  } catch {
    // Keep fallback list
  }
  const examPages = examSlugs.map((slug) => ({
    url: `${baseUrl}/exams/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // 8. Individual Article Pages
  let articleSlugs: string[] = []
  try {
    const articlesDir = path.join(process.cwd(), 'src/app/articles')
    if (fs.existsSync(articlesDir)) {
      articleSlugs = fs.readdirSync(articlesDir).filter(f => {
        try {
          return fs.statSync(path.join(articlesDir, f)).isDirectory() && !f.startsWith('[')
        } catch {
          return false
        }
      })
    }
  } catch {
    // Keep empty if failed
  }
  const articlePages = articleSlugs.map((slug) => ({
    url: `${baseUrl}/articles/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    ...staticPages, 
    ...collegePages, 
    ...magnetPages, 
    ...blogPages, 
    ...degreePages,
    ...coursePages,
    ...examPages,
    ...articlePages
  ]
}

