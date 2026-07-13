'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Share2, Check, ArrowRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'

// Lazy-load the heavy LeadModal component
const LeadModal = dynamic(() => import('@/components/ui/LeadModal'), {
  ssr: false,
})

interface BlogInteractiveProps {
  slug: string
  title: string
  summary: string
}

export default function BlogInteractive({ slug, title, summary }: BlogInteractiveProps) {
  const [copied, setCopied] = useState(false)
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Track scroll progress for reading indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Safely increment view count client-side on mount
  useEffect(() => {
    async function incrementViews() {
      try {
        await supabase.rpc('increment_blog_views', { blog_slug: slug })
      } catch (err) {
        console.warn('Failed to increment views securely:', err)
      }
    }
    if (slug) {
      incrementViews()
    }
  }, [slug])

  // Handle native Web Share or Clipboard Copy fallback
  const handleShare = () => {
    if (typeof window === 'undefined') return
    const url = window.location.href
    if (navigator.share) {
      navigator.share({
        title: title,
        text: summary,
        url: url
      }).catch(err => console.log('Error sharing:', err))
    } else {
      navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-slate-100 z-50">
        <div 
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Share Button (in article meta row) */}
      <button 
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-slate-900 transition-all border border-slate-200 text-xs font-bold"
      >
        {copied ? (
          <>
            <Check size={14} className="text-green-500" /> Copied
          </>
        ) : (
          <>
            <Share2 size={14} /> Share
          </>
        )}
      </button>

      {/* Lead Modal and bottom Consultation CTA */}
      <div className="my-14 p-8 bg-slate-50 border border-slate-100 rounded-[28px] relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-50 rounded-full blur-xl pointer-events-none" />
        <h3 className="text-base font-black text-slate-900 mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Confused about admission rules?
        </h3>
        <p className="text-slate-500 text-xs leading-relaxed mb-5 font-medium">
          Our senior counselors can build a custom academic timeline and find college options matching your rank, budget, and goals. Speak directly to an expert today.
        </p>
        <button 
          onClick={() => setShowLeadModal(true)}
          className="px-6 py-3 bg-[#111111] hover:bg-slate-800 text-white font-bold text-[9px] uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 w-fit"
        >
          Book Free Consultation Session
          <ArrowRight size={12} />
        </button>
      </div>

      {/* Counselor Sidebar Help Widget CTA button */}
      <div className="absolute hidden">
        {/* We expose a window function or element trigger to open modal from other buttons if needed, 
            or just bind them since they are within this document. Or the sidebar itself can have its button.
            To allow the sidebar "Connect with advisor" button to open the modal, we can capture a portal click 
            or just put the sidebar widget inside Client Components if necessary. But to keep it highly optimized, 
            let's just put the counselor widget in a client state or let the main client wrapper listen to custom events!
        */}
      </div>

      {showLeadModal && (
        <LeadModal
          isOpen={showLeadModal}
          onClose={() => setShowLeadModal(false)}
          collegeName="Top Indian Universities"
          collegeLogo="https://ui-avatars.com/api/?name=Promote+Education&background=3B2EA8&color=fff"
          stream="All Streams"
        />
      )}

      {/* Listen to custom click events for counselor button from server components to open modal */}
      <CounselorModalTrigger onOpen={() => setShowLeadModal(true)} />
    </>
  )
}

function CounselorModalTrigger({ onOpen }: { onOpen: () => void }) {
  useEffect(() => {
    const handleTrigger = (e: Event) => {
      e.preventDefault()
      onOpen()
    }
    document.addEventListener('open-consultation-modal', handleTrigger)
    return () => document.removeEventListener('open-consultation-modal', handleTrigger)
  }, [onOpen])
  
  return null
}
