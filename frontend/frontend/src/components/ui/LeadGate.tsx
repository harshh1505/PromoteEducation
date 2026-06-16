'use client'

import React, { useState } from 'react'
import { useLeadCapture } from '@/hooks/useLeadCapture'
import BrochureModal from './BrochureModal'

interface LeadGateProps {
  children: React.ReactNode
  collegeName?: string
  stream?: string
  targetUrl?: string
  mode?: 'brochure' | 'details' | 'share' | 'remind'
}

export default function LeadGate({ 
  children, 
  collegeName = 'Educational Content', 
  stream = 'General', 
  targetUrl,
  mode = 'details'
}: LeadGateProps) {
  const { isAuthorized } = useLeadCapture()
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    if (isAuthorized) {
      // If already authorized, we don't intercept the click
      return
    }

    // Intercept the click to show the lead capture form
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(true)
  }

  return (
    <>
      <div onClickCapture={handleClick} className="contents">
        {children}
      </div>
      <BrochureModal 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        collegeName={collegeName}
        stream={stream}
        mode={mode}
        targetUrl={targetUrl}
      />
    </>
  )
}
