import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function useLeadCapture() {
  const [isAuthorized] = useState<boolean>(true)

  const markAsCaptured = () => {
    localStorage.setItem('lead_captured', 'true')
  }

  return { isAuthorized: true, markAsCaptured }
}
