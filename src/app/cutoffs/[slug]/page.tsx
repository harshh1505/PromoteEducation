export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateStaticParams() {
  return [{ slug: 'engineering' }, { slug: 'medical' }]
}

import PageClient from './PageClient'

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <PageClient params={params} />
}
