import { useState, useEffect } from 'react'

export function useLeadCapture() {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lead_captured') === 'true'
    }
    return false
  })

  useEffect(() => {
    const checkAuth = async () => {
      // 1. Check LocalStorage
      const hasCaptured = localStorage.getItem('lead_captured') === 'true'
      if (hasCaptured) {
        setIsAuthorized(true)
        return
      }

      setIsAuthorized(false)
    }

    checkAuth()
  }, [])

  const markAsCaptured = () => {
    localStorage.setItem('lead_captured', 'true')
    setIsAuthorized(true)
  }

  return { isAuthorized, markAsCaptured }
}
