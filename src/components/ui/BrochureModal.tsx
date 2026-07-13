'use client'

import LeadModal from './LeadModal'

interface BrochureModalProps {
  isOpen: boolean
  onClose: () => void
  collegeName: string
  collegeId?: string
  stream: string
  mode?: string
  targetUrl?: string
}

export default function BrochureModal({ 
  isOpen, 
  onClose, 
  collegeName, 
  collegeId, 
  stream 
}: BrochureModalProps) {
  return (
    <LeadModal
      isOpen={isOpen}
      onClose={onClose}
      collegeName={collegeName}
      collegeId={collegeId}
      stream={stream}
    />
  )
}
