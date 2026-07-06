export const runtime = 'edge'

import ClientPage from './ClientPage'

export default function NewsArticleDetailsPage({ params }: { params: Promise<{ slug: string }> }) {

  return <ClientPage params={params} />
}
