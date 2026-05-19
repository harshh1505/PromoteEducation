'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CompareSlugRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/#compare-section')
  }, [router])

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-slate-400 font-bold animate-pulse text-sm uppercase tracking-widest">
        Redirecting to College Comparison Tool...
      </div>
    </div>
  )
}