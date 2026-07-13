'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function DynamicCoverImage({ 
  collegeId, 
  initialSrc, 
  alt 
}: { 
  collegeId: string
  initialSrc: string | null | undefined
  alt: string 
}) {
  const [src, setSrc] = useState<string | null | undefined>(initialSrc)

  useEffect(() => {
    async function fetchLiveImage() {
      if (!collegeId) return
      try {
        const { data, error } = await supabase
          .from('colleges')
          .select('cover_image')
          .eq('id', collegeId)
          .single()
        
        if (data && data.cover_image && data.cover_image !== initialSrc) {
          setSrc(data.cover_image)
        }
      } catch (err) {
        console.error('Error fetching live cover image:', err)
      }
    }
    fetchLiveImage()
  }, [collegeId, initialSrc])

  if (!src) return null

  return (
    <>
      <img 
        src={src} 
        alt={alt} 
        className="absolute inset-0 w-full h-full object-cover opacity-25"
        loading="eager"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-955 via-slate-950/85 to-transparent" />
    </>
  )
}
