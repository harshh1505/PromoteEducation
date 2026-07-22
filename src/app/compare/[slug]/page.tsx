export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateStaticParams() {
  return [{ slug: 'colleges' }]
}

import PageClient from './PageClient'

export default function Page() {
  return <PageClient />
}
