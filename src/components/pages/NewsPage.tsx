'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Calendar, ArrowRight, TrendingUp, Bell, MessageSquare, Share2, Eye } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { resolveImageUrl } from '@/lib/utils'

const ITEMS_PER_PAGE = 12

export default function NewsPageContent({ 
  initialArticles, 
  initialEduArticles 
}: { 
  initialArticles: any[]
  initialEduArticles: any[]
}) {
  const mapArticle = (item: any) => ({
    isLive: item.is_live,
    title: item.heading,
    author: item.editor,
    date: item.published_at ? new Date(item.published_at).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) : 'Recent',
    comments: item.comments_count > 0 ? String(item.comments_count) : undefined,
    shares: item.shares_count > 0 ? String(item.shares_count) : undefined,
    views: item.views >= 1000 ? `${(item.views / 1000).toFixed(1)}K` : String(item.views),
    image: item.featured_image || 'https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?w=800',
    slug: item.slug
  })

  const [articles, setArticles] = useState<any[]>(initialArticles.map(mapArticle))
  const [eduArticles] = useState<any[]>(initialEduArticles)
  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(initialArticles.length >= ITEMS_PER_PAGE)

  // Client-side pagination to fetch subsequent pages
  async function loadMoreNews() {
    if (loadingMore) return
    setLoadingMore(true)
    try {
      const nextPage = page + 1
      const start = (nextPage - 1) * ITEMS_PER_PAGE
      const end = start + ITEMS_PER_PAGE - 1

      const { data, error } = await supabase
        .from('news_articles')
        .select('id, slug, heading, synopsis, editor, published_at, created_at, comments_count, shares_count, views, featured_image, is_live')
        .eq('is_live', true)
        .order('published_at', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false })
        .range(start, end)

      if (error) throw error

      if (data && data.length > 0) {
        setArticles((prev) => [...prev, ...data.map(mapArticle)])
        setPage(nextPage)
        if (data.length < ITEMS_PER_PAGE) {
          setHasMore(false)
        }
      } else {
        setHasMore(false)
      }
    } catch (err) {
      console.error('Error fetching more news:', err)
    } finally {
      setLoadingMore(false)
    }
  }

  const featuredArticle = articles[0]
  const subArticles = articles.slice(1)

  return (
    <div className="min-h-screen flex flex-col bg-white font-body selection:bg-sky-500 selection:text-white">
      <Navbar />
      
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-6 pt-32 pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-10 h-[2px] bg-sky-500" />
              <span className="text-[11px] font-black text-sky-500 uppercase tracking-[0.2em]">Education Bulletin</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.05] mb-4">
              Stay ahead with <br /> <span className="text-sky-600 italic">real-time</span> news.
            </h1>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              Latest updates on entrance exams, admission cycles, and policy changes in the Indian education sector.
            </p>
          </div>
          <button className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-sky-500 transition-all shadow-lg shadow-slate-900/10 self-start md:self-center">
             <Bell size={18} />
             Subscribe to Alerts
          </button>
        </div>

        {/* Trending grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
           {/* Featured News */}
           {featuredArticle ? (
             <Link 
               href={featuredArticle.slug ? `/news/${featuredArticle.slug}` : '#'}
               className="relative h-[500px] rounded-[40px] overflow-hidden shadow-2xl border border-slate-100 group block cursor-pointer animate-in fade-in duration-500"
             >
                <Image 
                  src={featuredArticle.image} 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={featuredArticle.title}
                  fill
                  sizes="(max-width: 1200px) 100vw, 800px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-10 z-10">
                   <span className="inline-block px-4 py-2 bg-sky-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-4 shadow-lg shadow-sky-500/20">
                      Latest Headline
                   </span>
                   <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 pr-12 leading-tight group-hover:text-sky-300 transition-colors">
                     {featuredArticle.title}
                   </h2>
                   <div className="flex items-center gap-4 text-xs font-bold text-slate-300 uppercase tracking-wider">
                     <span className="flex items-center gap-1.5"><Calendar size={14} className="text-sky-400" /> {featuredArticle.date}</span>
                     {featuredArticle.views && (
                       <span className="flex items-center gap-1.5"><TrendingUp size={14} className="text-sky-400" /> {featuredArticle.views} Reads</span>
                     )}
                   </div>
                </div>
             </Link>
           ) : (
             <div className="relative h-[500px] rounded-[40px] bg-slate-100 animate-pulse border border-slate-100" />
           )}

           {/* List of sub news */}
           <div className="space-y-6">
              {subArticles.length > 0 ? (
                subArticles.map((article, idx) => (
                  <Link 
                    href={article.slug ? `/news/${article.slug}` : '#'} 
                    key={idx} 
                    className="group flex gap-6 p-4 rounded-3xl bg-white border border-slate-100 hover:shadow-xl shadow-slate-900/5 transition-all cursor-pointer"
                  >
                     <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 relative shadow-sm">
                        {article.isLive && (
                          <span className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md animate-pulse shadow-md">
                            <span className="w-1.5 h-1.5 bg-white rounded-full" /> LIVE
                          </span>
                        )}
                        <Image 
                          src={article.image} 
                          className="object-cover group-hover:scale-110 transition-transform duration-500" 
                          alt={article.title}
                          fill
                          sizes="128px"
                        />
                     </div>
                     <div className="flex flex-col justify-center flex-1">
                        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-sky-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5 mb-3"><Calendar size={12} className="text-slate-400" /> {article.date}</p>
                        <div className="flex items-center gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                           {article.comments && (
                             <div className="flex items-center gap-1">
                               <MessageSquare size={12} className="text-sky-500" /> {article.comments}
                             </div>
                           )}
                           {article.shares && (
                             <div className="flex items-center gap-1">
                               <Share2 size={12} className="text-sky-500" /> {article.shares}
                             </div>
                           )}
                           {article.views && (
                             <div className="flex items-center gap-1">
                               <Eye size={12} className="text-sky-500" /> {article.views}
                             </div>
                           )}
                        </div>
                     </div>
                  </Link>
                ))
              ) : (
                <div className="p-8 text-center text-slate-400 italic bg-slate-50 rounded-2xl border border-dashed">
                  No other news available at the moment.
                </div>
              )}
           </div>
        </div>

        {/* Pagination controls for main list */}
        {hasMore && (
          <div className="flex justify-center mb-16">
            <button
              onClick={loadMoreNews}
              disabled={loadingMore}
              className="px-8 py-4 bg-slate-900 text-white hover:bg-sky-500 transition-all font-bold text-xs uppercase tracking-widest rounded-full shadow-lg shadow-slate-900/10 flex items-center gap-2"
            >
              {loadingMore ? 'Loading...' : 'Load More News'}
              <ArrowRight size={14} className={loadingMore ? 'animate-pulse' : ''} />
            </button>
          </div>
        )}

        {/* Dynamic Edu Articles Grid */}
        <div className="grid md:grid-cols-3 gap-8">
           {eduArticles.length > 0 ? (
             eduArticles.map((article) => {
               const categorySlug = (article.category || '').toLowerCase().trim().replace(/\s+/g, '-').replace(/\./g, '')
               const link = `/blogs/${article.slug}`
               
               return (
                 <div key={article.id} className="p-6 rounded-3xl border border-slate-100 bg-white group hover:border-sky-200 hover:shadow-xl shadow-slate-900/5 transition-all flex flex-col justify-between">
                     <div>
                       <div className="w-full aspect-video rounded-2xl bg-slate-50 mb-6 overflow-hidden shadow-sm relative">
                          <Image 
                            src={resolveImageUrl(article.featured_image) || 'https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?w=400'} 
                            className="object-cover group-hover:scale-105 transition-transform duration-700" 
                            alt={article.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 350px"
                          />
                       </div>
                       <h4 className="font-bold text-slate-900 mb-4 leading-tight group-hover:text-sky-600 transition-colors line-clamp-2">{article.title}</h4>
                       {article.summary && <p className="text-xs text-slate-500 line-clamp-2 mb-4 font-light leading-relaxed">{article.summary}</p>}
                     </div>
                     <Link href={link} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-sky-500 group-hover:gap-3 transition-all mt-4 self-start">
                        Read Full Story <ArrowRight size={14} />
                     </Link>
                 </div>
               )
             })
           ) : (
             [...Array(3)].map((_, idx) => (
               <div key={idx} className="h-80 rounded-3xl bg-slate-100 animate-pulse border border-slate-150" />
             ))
           )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
