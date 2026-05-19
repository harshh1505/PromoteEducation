'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoanCalculatorRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/#loan-calculator-section')
  }, [router])

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-slate-400 font-bold animate-pulse text-sm uppercase tracking-widest">
        Redirecting to Education Loan Finance Estimator...
      </div>
    </div>
  )
}
