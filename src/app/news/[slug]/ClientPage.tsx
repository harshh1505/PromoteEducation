'use client'

import { useState, useEffect } from 'react'
import { Share2, Check } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface NewsInteractiveProps {
  slug: string
  heading: string
  synopsis: string
}

export default function NewsInteractive({ slug, heading, synopsis }: NewsInteractiveProps) {
  const [copied, setCopied] = useState(false)

  // Increment news article views count securely client-side on mount
  useEffect(() => {
    async function incrementViews() {
      try {
        await supabase.rpc('increment_news_views', { article_slug: slug })
      } catch (err) {
        console.warn('Failed to increment news views securely:', err)
      }
    }
    if (slug) {
      incrementViews()
    }
  }, [slug])

  // Native share or clipboard copy fallback
  const handleShare = () => {
    if (typeof window === 'undefined') return
    const url = window.location.href
    if (navigator.share) {
      navigator.share({
        title: heading,
        text: synopsis ? synopsis.replace(/[*\n]/g, '') : '',
        url: url
      }).catch(err => console.log('Error sharing:', err))
    } else {
      navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button 
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-slate-50 text-slate-500 hover:text-slate-900 transition-all border border-slate-200 text-xs font-bold"
    >
      {copied ? (
        <>
          <Check size={14} className="text-green-500" /> Copied Link
        </>
      ) : (
        <>
          <Share2 size={14} /> Share Article
        </>
      )}
    </button>
  )
}
