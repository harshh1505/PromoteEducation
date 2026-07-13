'use client'

import LeadModal from './LeadModal'

interface CounsellingModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CounsellingModal({ isOpen, onClose }: CounsellingModalProps) {
  return (
    <LeadModal
      isOpen={isOpen}
      onClose={onClose}
      collegeName=""
      stream="General"
    />
  )
}
