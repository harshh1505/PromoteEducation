import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CourseClient from './CourseClient'
import { getCourseBySlug, getCollegesForCourse, getAllCourseSlugs } from '@/lib/courseService'

export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = await getAllCourseSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const courseSlug = (slug || '').toLowerCase().trim()
  const course = await getCourseBySlug(courseSlug)

  if (!course) {
    return {
      title: 'Course Not Found',
      description: 'The requested course could not be found.',
    }
  }

  const canonicalUrl = `https://promoteducation.com/courses/${courseSlug}`
  const rawTitle = course.title || `${course.course_name} (${course.short_name}): Duration, Eligibility, Fees, Admission 2026`
  const baseTitle = rawTitle.replace(/\s*\|\s*Promote Education.*$/i, '').trim()
  const fullTitle = `${baseTitle} | Promote Education`
  const pageDescription = course.short_description || `Complete guide to ${course.course_name} (${course.short_name}) admission 2026. Explore eligibility, entrance exams, specialisations, career scope, and top colleges in India.`
  const ogImage = course.cover_image || '/og-image.png'

  const pageKeywords = [
    course.course_name,
    course.short_name,
    `${course.short_name} admission 2026`,
    `${course.short_name} eligibility`,
    `${course.short_name} syllabus`,
    `${course.short_name} top colleges in India`
  ].filter(Boolean) as string[]

  return {
    title: baseTitle,
    description: pageDescription,
    keywords: pageKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description: pageDescription,
      url: canonicalUrl,
      type: 'article',
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: pageDescription,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    }
  }
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const courseSlug = (slug || '').toLowerCase().trim()
  const course = await getCourseBySlug(courseSlug)

  if (!course) {
    return notFound()
  }

  const colleges = await getCollegesForCourse(course.category, 6)

  // JSON-LD Structured Data
  const canonicalUrl = `https://promoteducation.com/courses/${courseSlug}`
  
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://promoteducation.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Courses',
        item: 'https://promoteducation.com/courses'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: course.short_name,
        item: canonicalUrl
      }
    ]
  }

  const courseJsonLd: any = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.course_name,
    description: course.short_description,
    provider: {
      '@type': 'Organization',
      name: 'Promote Education',
      sameAs: 'https://promoteducation.com'
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: course.mode || 'Full-Time',
      duration: course.duration
    }
  }

  const faqJsonLd = course.faqs && course.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: course.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  } : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <CourseClient course={course} colleges={colleges} />
    </>
  )
}
