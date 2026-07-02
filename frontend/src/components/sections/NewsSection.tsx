'use client'

import React from 'react'
import { ArrowRight, MessageSquare, Share2, Eye, ChevronRight } from 'lucide-react'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

function stripMarkdown(text: string): string {
  if (!text) return ''
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/^#+\s+/gm, '')
    .replace(/([*_~`]{1,3})(\s*(?:(?!\1).)+?\s*)\1/g, '$2')
    .replace(/[*_~`]/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^\s*[-*_]{3,}\s*$/gm, '')
    .replace(/^\s*>\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export default function NewsSection() {
  const [articles, setArticles] = useState<any[]>([])

  useEffect(() => {
    async function fetchNews() {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('published_at', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error fetching news from Supabase:', error)
      } else if (data) {
        // Map database fields to the UI format
        const mapped = data.map((item: any) => {
          const cleanedContent = stripMarkdown(item.synopsis || '')
          return {
            isLive: item.is_live,
            title: item.heading,
            excerpt: cleanedContent ? (cleanedContent.length > 140 ? cleanedContent.slice(0, 137) + '...' : cleanedContent) : '',
            author: item.editor,
            date: new Date(item.published_at || item.created_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }),
            comments: item.comments_count > 0 ? String(item.comments_count) : undefined,
            shares: item.shares_count > 0 ? String(item.shares_count) : undefined,
            views: item.views >= 1000 ? `${(item.views / 1000).toFixed(1)}K` : String(item.views),
            image: item.featured_image || 'https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?w=400',
            slug: item.slug
          }
        })
        
        setArticles(mapped)
      }
    }
    fetchNews()
  }, [])

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <h2 className="text-2xl font-bold text-ink mb-10 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          Latest News & Articles
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-12">
          {articles.map((item, idx) => (
            <Link 
              href={item.slug ? `/news/${item.slug}` : '#'} 
              key={idx} 
              className="flex gap-6 group cursor-pointer hover:bg-slate-50/50 p-2 rounded-2xl transition-all"
            >
              <div className="flex-1 min-w-0">
                 <div className="flex items-start gap-2 mb-2">
                   {item.isLive && (
                     <span className="flex items-center gap-1 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md mt-0.5 animate-pulse shrink-0">
                       <span className="w-1.5 h-1.5 bg-white rounded-full" /> LIVE
                     </span>
                   )}
                   <h3 className="text-sm md:text-base font-bold text-ink leading-snug group-hover:text-action transition-colors line-clamp-2">
                     {item.title}
                   </h3>
                 </div>
                 
                 <p className="text-xs text-ink-3 line-clamp-2 mb-3 leading-relaxed font-light">
                   {item.excerpt}
                 </p>

                 <div className="flex items-center gap-2 text-[10px] text-ink-4">
                   <span className="font-bold text-ink-2">{item.author}</span>
                   <span className="opacity-40">•</span>
                   <span>{item.date}</span>
                 </div>

                 <div className="flex items-center gap-4 mt-2 text-[10px] text-ink-4 font-bold uppercase tracking-wider">
                   {item.comments && (
                     <div className="flex items-center gap-1">
                       <MessageSquare size={12} className="text-action" /> {item.comments} Comments
                     </div>
                   )}
                   {item.shares && (
                     <div className="flex items-center gap-1">
                       <Share2 size={12} className="text-action" /> {item.shares} Shares
                     </div>
                   )}
                   {item.views && (
                     <div className="flex items-center gap-1">
                       <Eye size={12} className="text-action" /> {item.views} Views
                     </div>
                   )}
                 </div>
              </div>

              <div className="flex-shrink-0 w-20 h-20 md:w-28 md:h-20 rounded-xl overflow-hidden shadow-sm">
                <img 
                  src={item.image} 
                  alt="" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?w=400'; // News Fallback
                  }}
                />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
           <Link href="/news" className="flex items-center gap-2 px-8 py-2.5 border border-action/30 rounded-lg text-action text-sm font-bold hover:bg-action hover:text-white transition-all group">
             View All Updates <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
           </Link>
        </div>

      </div>
    </section>
  )
}

