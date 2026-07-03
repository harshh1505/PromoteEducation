'use client'

import React from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, ChevronRight, Share2, Bookmark, MessageCircle } from 'lucide-react'

export interface BlogProps {
  title: string
  description: string
  updatedDate: string
  readTime: string
  content: React.ReactNode
  relatedArticles?: { title: string; href: string }[]
  category?: string
  slug: string
}

export default function BlogTemplate({
  title,
  description,
  updatedDate,
  readTime,
  content,
  relatedArticles,
  category = 'Guide',
  slug
}: BlogProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Organization",
      "name": "Promote Education"
    },
    "dateModified": updatedDate,
    "publisher": {
      "@type": "Organization",
      "name": "Promote Education",
      "logo": {
        "@type": "ImageObject",
        "url": "https://promoteducation.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://promoteducation.com/articles/${slug}`
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f9fbff]">
      <script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Navbar />

      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-[900px] mx-auto px-6">
          
          {/* Breadcrumbs / Category */}
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-xs font-bold text-slate-400 hover:text-[#0b57d0] transition-colors uppercase tracking-wider">Home</Link>
            <ChevronRight size={12} className="text-slate-300" />
            <span className="text-xs font-bold text-[#0b57d0] uppercase tracking-wider">{category}</span>
          </div>

          {/* Header */}
          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0b57d0] leading-[1.2] mb-6 tracking-tight" style={{ fontFamily: 'var(--font-display), Inter, sans-serif' }}>
              {title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 py-6 border-y border-slate-100">
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Calendar size={16} className="text-slate-400" />
                <span>Updated {updatedDate}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Clock size={16} className="text-slate-400" />
                <span>{readTime} read</span>
              </div>
              <div className="ml-auto flex items-center gap-4">
                <button className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600" title="Bookmark">
                  <Bookmark size={18} />
                </button>
                <button className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600" title="Share">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <div className="prose prose-slate prose-lg max-w-none prose-headings:text-[#0b57d0] prose-headings:font-bold prose-headings:tracking-tight prose-p:text-slate-700 prose-p:leading-[1.8] prose-li:text-slate-700 prose-a:text-[#0b57d0] prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:shadow-xl article-content">
            {content}
          </div>

          {/* Related Articles Card */}
          {relatedArticles && relatedArticles.length > 0 && (
            <div className="mt-16 p-8 rounded-2xl bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#0b57d0] rounded-full" />
                Related Articles
              </h3>
              <ul className="space-y-4">
                {relatedArticles.map((article, idx) => (
                  <li key={idx} className="group">
                    <Link 
                      href={article.href}
                      className="flex items-center justify-between text-slate-600 group-hover:text-[#0b57d0] transition-colors"
                    >
                      <span className="font-medium">{article.title}</span>
                      <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Bottom Navigation */}
          <div className="mt-12 pt-8 border-t border-slate-100">
            <Link href="/exams" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-wider">
              <ArrowLeft size={16} /> Back to Exams
            </Link>
          </div>
        </div>
      </main>

      <Footer />


    </div>
  )
}
