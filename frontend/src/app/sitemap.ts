import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://promoteducation.com'
  const currentDate = new Date()

  // Static Routes
  const routes = [
    '',
    '/courses',
    '/rankings',
    '/tools',
    '/news',
    '/loan-calculator',
    '/about',
    '/faq',
    '/privacy-policy',
    '/terms-of-use',
    '/disclaimer',
    '/cookie-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // Course Hubs
  const courseRoutes = [
    '/courses/btech',
    '/courses/mba',
    '/courses/mtech',
    '/courses/bsc-nursing',
    '/courses/mbbs',
    '/courses/bds',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Exam Pages
  const examRoutes = [
    '/exams/jee-main',
    '/exams/jee-advanced',
    '/exams/neet-ug',
    '/exams/cat',
    '/exams/gate',
    '/exams/clat',
    '/exams/nift',
    '/exams/cuet-ug',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Article Pages (SEO Cluster)
  const articleRoutes = [
    '/articles/jee-main-eligibility-2026',
    '/articles/jee-main-syllabus-2026',
    '/articles/jee-main-exam-pattern',
    '/articles/best-books-jee-main',
    '/articles/jee-main-preparation-strategy',
    '/articles/jee-main-vs-advanced-bitsat',
    '/articles/colleges-accepting-jee-main',
    '/articles/neet-eligibility-2026',
    '/articles/neet-syllabus-2026',
    '/articles/neet-exam-pattern',
    '/articles/best-books-neet',
    '/articles/neet-preparation-strategy',
    '/articles/neet-vs-aiims-jipmer',
    '/articles/colleges-accepting-neet',
    '/articles/gate-eligibility-2026',
    '/articles/gate-syllabus-2026',
    '/articles/gate-exam-pattern',
    '/articles/best-books-gate',
    '/articles/gate-preparation-strategy',
    '/articles/gate-vs-ese-cat',
    '/articles/colleges-accepting-gate',
    '/articles/nift-eligibility-2026',
    '/articles/nift-syllabus-2026',
    '/articles/nift-exam-pattern',
    '/articles/best-books-nift',
    '/articles/nift-preparation-strategy',
    '/articles/nift-vs-nid-uceed',
    '/articles/colleges-accepting-nift',
    '/articles/jee-advanced-eligibility-2026',
    '/articles/jee-advanced-syllabus-2026',
    '/articles/jee-advanced-exam-pattern',
    '/articles/best-books-jee-advanced',
    '/articles/jee-advanced-preparation-strategy',
    '/articles/jee-main-vs-jee-advanced',
    '/articles/colleges-accepting-jee-advanced',
    '/articles/cat-eligibility-2026',
    '/articles/cat-syllabus-2026',
    '/articles/cat-exam-pattern',
    '/articles/best-books-cat',
    '/articles/cat-preparation-strategy',
    '/articles/cat-vs-xat-gmat',
    '/articles/colleges-accepting-cat',
    '/articles/clat-eligibility-2026',
    '/articles/clat-syllabus-2026',
    '/articles/clat-exam-pattern',
    '/articles/best-books-clat',
    '/articles/clat-preparation-strategy',
    '/articles/clat-vs-ailet-lsat',
    '/articles/colleges-accepting-clat',
    '/articles/cuet-ug-eligibility-2026',
    '/articles/cuet-ug-syllabus-2026',
    '/articles/cuet-ug-exam-pattern',
    '/articles/best-books-cuet-ug',
    '/articles/cuet-ug-preparation-strategy',
    '/articles/cuet-ug-vs-jee-neet',
    '/articles/colleges-accepting-cuet-ug',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...routes, ...courseRoutes, ...examRoutes, ...articleRoutes]
}
