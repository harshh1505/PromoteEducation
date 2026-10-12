import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateStaticParams() {
  const streams = ['engineering', 'medical', 'management', 'law', 'design']
  const cities = ['delhi', 'mumbai', 'bangalore', 'pune', 'hyderabad', 'chennai']
  const params: { slug: string }[] = []
  for (const stream of streams) {
    for (const city of cities) {
      params.push({ slug: `${stream}-in-${city}` })
    }
  }
  return params
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const canonicalUrl = `https://promoteducation.com/colleges/${slug}`
  return {
    title: `Redirecting to ${slug} Colleges...`,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  redirect(`/colleges/${slug}`)
}
