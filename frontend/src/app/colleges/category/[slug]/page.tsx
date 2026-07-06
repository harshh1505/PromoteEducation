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

import PageClient from './PageClient'

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <PageClient params={params} />
}
