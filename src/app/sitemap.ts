import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'
import fs from 'fs'
import path from 'path'
import { getAllCourseSlugs } from '@/lib/courseService'

export const dynamic = 'force-static'

function cleanDegreeSlug(degree: string): string {
  const d = (degree || '').trim()
  if (d.toLowerCase() === 'md / ms') return 'md-ms'
  if (d.toLowerCase() === 'dm / m.ch.') return 'dm-mch'
  if (d.toLowerCase() === 'b.a. ll.b.') return 'ba-llb'
  return d.toLowerCase().replace(/\./g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://promoteducation.com'
  const currentDate = new Date()

  // 1. Static and Feature Pages
  const staticRoutes: Array<{ route: string; priority: number; changeFrequency: 'daily' | 'weekly' | 'monthly' }> = [
    { route: '', priority: 1.0, changeFrequency: 'daily' },
    // Core Hubs
    { route: '/courses', priority: 0.95, changeFrequency: 'daily' },
    { route: '/colleges', priority: 0.95, changeFrequency: 'daily' },
    { route: '/colleges/engineering', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/colleges/medical', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/exams', priority: 0.95, changeFrequency: 'daily' },
    { route: '/cutoffs', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/cutoffs/engineering', priority: 0.85, changeFrequency: 'weekly' },
    { route: '/cutoffs/medical', priority: 0.85, changeFrequency: 'weekly' },
    { route: '/rankings', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/scholarships', priority: 0.85, changeFrequency: 'weekly' },
    // Admission & Guidance Services
    { route: '/admission-support', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/mentorship', priority: 0.85, changeFrequency: 'weekly' },
    { route: '/counselling', priority: 0.85, changeFrequency: 'weekly' },
    { route: '/selection', priority: 0.8, changeFrequency: 'weekly' },
    { route: '/consultation', priority: 0.85, changeFrequency: 'weekly' },
    { route: '/study-abroad', priority: 0.85, changeFrequency: 'weekly' },
    // Tools & Comparison
    { route: '/compare', priority: 0.85, changeFrequency: 'weekly' },
    { route: '/compare/colleges', priority: 0.85, changeFrequency: 'weekly' },
    { route: '/loan-calculator', priority: 0.85, changeFrequency: 'weekly' },
    { route: '/tools/college-predictor', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/tools/brainstorm', priority: 0.85, changeFrequency: 'weekly' },
    // Publications & News
    { route: '/news', priority: 0.9, changeFrequency: 'daily' },
    { route: '/blogs', priority: 0.9, changeFrequency: 'daily' },
    // Institutional / Company Info
    { route: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { route: '/faq', priority: 0.75, changeFrequency: 'monthly' },
    { route: '/careers', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/events', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/sitemap', priority: 0.6, changeFrequency: 'monthly' },
    // Legal & Compliance
    { route: '/privacy-policy', priority: 0.5, changeFrequency: 'monthly' },
    { route: '/terms-of-use', priority: 0.5, changeFrequency: 'monthly' },
    { route: '/cookie-policy', priority: 0.5, changeFrequency: 'monthly' },
    { route: '/disclaimer', priority: 0.5, changeFrequency: 'monthly' },
  ]

  const staticPages = staticRoutes.map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency,
    priority,
  }))

  // 2. Individual College Pages (Filter out alias/redirect slugs)
  const aliasSlugs = new Set(['amity-university-noida', 'mit-wpu'])
  const { data: colleges } = await supabase.from('colleges').select('slug, updated_at')
  const collegePages = (colleges || [])
    .filter((c) => c.slug && !aliasSlugs.has(c.slug))
    .map((c) => ({
      url: `${baseUrl}/colleges/${c.slug}`,
      lastModified: c.updated_at ? new Date(c.updated_at) : currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }))

  // 3. Location & Stream Traffic Magnet Pages
  const magnetStreams = ['engineering', 'medical', 'management', 'law']
  const magnetCities = ['delhi', 'mumbai', 'bangalore', 'pune', 'hyderabad', 'chennai', 'kolkata']
  const magnetPages: MetadataRoute.Sitemap = []

  magnetStreams.forEach((stream) => {
    magnetCities.forEach((city) => {
      magnetPages.push({
        url: `${baseUrl}/colleges/${stream}-in-${city}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.75,
      })
      magnetPages.push({
        url: `${baseUrl}/colleges/category/${stream}-in-${city}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.75,
      })
    })
  })

  // 4. Dynamic Course Hub Pages (/courses/[slug])
  const allCourseSlugs = await getAllCourseSlugs()
  const courseHubPages = allCourseSlugs.map((slug) => ({
    url: `${baseUrl}/courses/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 5. Course Specialisation Pages (/courses/[slug]/[specSlug])
  const { data: courseCatalog } = await supabase.from('course_catalog').select('slug, degree')
  const courseSpecPages = (courseCatalog || []).map((c) => {
    const degSlug = cleanDegreeSlug(c.degree)
    return {
      url: `${baseUrl}/courses/${degSlug}/${c.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }
  })

  // 6. Blog Posts
  const { data: blogs } = await supabase.from('blogs').select('slug, updated_at').eq('is_live', true)
  const blogPages = (blogs || []).map((b) => ({
    url: `${baseUrl}/blogs/${b.slug}`,
    lastModified: b.updated_at ? new Date(b.updated_at) : currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // 7. News Articles
  const { data: news } = await supabase.from('news_articles').select('slug, updated_at')
  const newsPages = (news || []).map((n) => ({
    url: `${baseUrl}/news/${n.slug}`,
    lastModified: n.updated_at ? new Date(n.updated_at) : currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  // 8. Individual Exam Pages
  let examSlugs: string[] = []
  try {
    const { examDatabase } = await import('@/data/examDatabase')
    examSlugs = Object.keys(examDatabase)
  } catch {
    examSlugs = [
      'jee-main', 'jee-advanced', 'neet-ug', 'cat', 'gate', 'clat', 'nift', 'cuet-ug',
      'ini-cet', 'ini-ss', 'aiims-entrance', 'xat', 'bitsat', 'neet-pg', 'srmjeee',
      'mh-cet-law', 'nid-dat', 'comedk', 'viteee', 'wbjee', 'snap'
    ]
  }

  // Also include any directory-based exam routes if present
  try {
    const examsDir = path.join(process.cwd(), 'src/app/exams')
    if (fs.existsSync(examsDir)) {
      const dirExams = fs.readdirSync(examsDir).filter((f) => {
        try {
          return fs.statSync(path.join(examsDir, f)).isDirectory() && !f.startsWith('[')
        } catch {
          return false
        }
      })
      examSlugs = Array.from(new Set([...examSlugs, ...dirExams]))
    }
  } catch {
    // Keep examSlugs
  }

  const examPages = examSlugs.map((slug) => ({
    url: `${baseUrl}/exams/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // 9. Individual Article Pages
  let articleSlugs: string[] = []
  try {
    const { articleDatabase } = await import('@/data/articleDatabase')
    articleSlugs = Object.keys(articleDatabase)
  } catch {
    // Keep empty fallback
  }

  try {
    const articlesDir = path.join(process.cwd(), 'src/app/articles')
    if (fs.existsSync(articlesDir)) {
      const dirArticles = fs.readdirSync(articlesDir).filter((f) => {
        try {
          return fs.statSync(path.join(articlesDir, f)).isDirectory() && !f.startsWith('[')
        } catch {
          return false
        }
      })
      articleSlugs = Array.from(new Set([...articleSlugs, ...dirArticles]))
    }
  } catch {
    // Keep articleSlugs
  }

  const articlePages = articleSlugs.map((slug) => ({
    url: `${baseUrl}/articles/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Deduplicate all URLs
  const seenUrls = new Set<string>()
  const finalSitemap: MetadataRoute.Sitemap = []

  const allEntries = [
    ...staticPages,
    ...collegePages,
    ...magnetPages,
    ...courseHubPages,
    ...courseSpecPages,
    ...blogPages,
    ...newsPages,
    ...examPages,
    ...articlePages,
  ]

  for (const entry of allEntries) {
    if (!seenUrls.has(entry.url)) {
      seenUrls.add(entry.url)
      finalSitemap.push(entry)
    }
  }

  return finalSitemap
}
