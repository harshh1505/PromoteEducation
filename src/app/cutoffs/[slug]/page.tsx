import ClientPage from './ClientPage'

export const runtime = 'edge'

export default function CutoffsPage({ params }: { params: Promise<{ slug: string }> }) {
  return <ClientPage params={params} />
}
