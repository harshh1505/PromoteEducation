
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ArrowLeft, Calendar, Clock, Eye, User, Bookmark, ChevronRight } from 'lucide-react'
import { resolveImageUrl } from '@/lib/utils'
import NewsInteractive from './ClientPage'

// Dynamically import MarkdownViewer, but keep it SSR-rendered
const MarkdownViewer = dynamic(() => import('@/components/ui/MarkdownViewer'), {
  ssr: true,
})

export const revalidate = 3600 // Cache for 1 hour

export async function generateStaticParams() {
  try {
    const { data } = await supabase
      .from('news_articles')
      .select('slug')
      .eq('is_live', true)

    return (data || []).map((art) => ({
      slug: art.slug,
    }))
  } catch (err) {
    console.error('Failed to generate static params for news:', err)
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const { data: article } = await supabase
      .from('news_articles')
      .select('heading, synopsis, seo_title, seo_description')
      .eq('slug', slug)
      .single()

    if (!article) return { title: 'Article Not Found' }

    return {
      title: article.seo_title || `${article.heading} | Promote Education`,
      description: article.seo_description || article.synopsis || 'Latest education news and alerts.',
    }
  } catch (err) {
    return { title: 'News Bulletin' }
  }
}

export default async function NewsArticleDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // 1. Fetch current news article
  const { data: article, error } = await supabase
    .from('news_articles')
    .select('id, slug, heading, synopsis, editor, published_at, created_at, comments_count, shares_count, views, featured_image, is_live')
    .eq('slug', slug)
    .single()

  if (error || !article) {
    return notFound()
  }

  // 2. Fetch sections and trending articles in parallel
  const [sectionsRes, trendingRes] = await Promise.all([
    supabase
      .from('news_sections')
      .select('content, image_url')
      .eq('article_id', article.id)
      .order('section_order', { ascending: true }),
    supabase
      .from('news_articles')
      .select('slug, heading, published_at, featured_image, views')
      .neq('slug', slug)
      .eq('is_live', true)
      .order('views', { ascending: false })
      .limit(3)
  ])

  const sections = sectionsRes.data || []
  const trending = trendingRes.data || []

  // Calculate dynamic reading time based on sections text
  const totalText = sections.map((s) => s.content || '').join(' ')
  const wordCount = totalText.split(/\s+/).length || 0
  const readTimeVal = Math.max(1, Math.ceil(wordCount / 200))
  const readTime = `${readTimeVal} min read`

  return (
    <div className="min-h-screen flex flex-col bg-white font-body selection:bg-sky-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <Link 
            href="/news" 
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-900 transition-all mb-10 uppercase tracking-widest"
          >
            <ArrowLeft size={14} /> Back to News Bulletin
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content Area */}
            <article className="lg:col-span-8">
              {/* Header metadata */}
              <div className="flex items-center flex-wrap gap-4 mb-6">
                <span className="px-3 py-1 bg-sky-55 text-sky-650 text-[10px] font-black uppercase tracking-widest rounded-md border border-sky-100 bg-sky-50">
                  News & Updates
                </span>
                {article.is_live && (
                  <span className="flex items-center gap-1 bg-red-650 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md animate-pulse bg-red-650 bg-red-600">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" /> LIVE
                  </span>
                )}
                <div className="flex items-center gap-4 text-slate-400 text-[11px] font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> 
                    {article.published_at ? new Date(article.published_at).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    }) : 'Recent'}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-200" />
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {readTime}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-200" />
                  <span className="flex items-center gap-1">
                    <Eye size={12} /> {article.views} Views
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 
                className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.15] tracking-tight mb-8"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {article.heading}
              </h1>

              {/* Author / Share Action Bar */}
              <div className="flex items-center justify-between py-6 border-y border-slate-100 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-650 border border-slate-200 text-slate-600">
                    <User size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900">{article.editor || 'Promote Education Editor'}</div>
                    <div className="text-[11px] text-slate-400 font-medium">Verified by Academic Council</div>
                  </div>
                </div>

                {/* News details page share action */}
                <NewsInteractive slug={article.slug} heading={article.heading} synopsis={article.synopsis || ''} />
              </div>

              {/* Featured Cover Image */}
              {article.featured_image && (
                <div className="w-full aspect-video md:h-[400px] rounded-3xl overflow-hidden shadow-sm border border-slate-100 mb-10 relative">
                  <Image 
                    src={resolveImageUrl(article.featured_image) || ''} 
                    alt={article.heading} 
                    fill
                    sizes="(max-width: 1200px) 100vw, 900px"
                    priority
                    className="object-cover"
                  />
                </div>
              )}

              {/* Render dynamic news sections containing content */}
              <div className="prose prose-slate prose-lg max-w-none
                prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-slate-600 prose-p:leading-relaxed
                prose-a:text-[#38b6ff] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-slate-800 prose-strong:font-bold
                prose-ul:text-slate-600 prose-ol:text-slate-600
                prose-li:my-1
                prose-blockquote:border-l-[#38b6ff] prose-blockquote:text-slate-500 prose-blockquote:italic
                prose-code:text-[#38b6ff] prose-code:bg-slate-100 prose-code:rounded prose-code:px-1 prose-code:text-sm
                prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-2xl
                prose-img:rounded-2xl prose-img:shadow-md
                prose-hr:border-slate-200">
                {sections.map((section, idx) => (
                  <div key={idx} className="mb-8">
                    {section.image_url && (
                      <div className="w-full h-[200px] md:h-[350px] rounded-[24px] overflow-hidden mb-6 relative">
                        <Image src={resolveImageUrl(section.image_url) || ''} alt="section image" fill className="object-cover" />
                      </div>
                    )}
                    {section.content && <MarkdownViewer content={section.content} />}
                  </div>
                ))}
              </div>

              {/* Counselling Callout Banner */}
              <div className="my-12 p-8 bg-sky-50/50 border border-sky-100 rounded-3xl text-sky-950 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-base font-bold mb-2 flex items-center gap-2">
                    <Bookmark size={16} className="text-sky-500" /> Need Counselling Assistance?
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-0 font-medium">
                    If this news impacts your admission path or college choices, our expert academic advisors can guide you through the latest process and seats. Book a free consultation today.
                  </p>
                </div>
              </div>
            </article>

            {/* Right Sidebar */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Trending updates list */}
              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                <h3 
                  className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-200/60 pb-3"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Trending Updates
                </h3>

                <div className="space-y-6">
                  {trending.length > 0 ? (
                    trending.map((tArticle) => (
                      <Link 
                        href={`/news/${tArticle.slug}`} 
                        key={tArticle.slug} 
                        className="group block"
                      >
                        <div className="flex gap-4">
                          {tArticle.featured_image && (
                            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-200 relative">
                              <Image 
                                src={resolveImageUrl(tArticle.featured_image) || ''} 
                                alt={tArticle.heading} 
                                fill
                                sizes="64px"
                                className="object-cover group-hover:scale-105 transition-transform duration-500" 
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs md:text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-sky-600 transition-colors mb-1">
                              {tArticle.heading}
                            </h4>
                            <div className="flex items-center gap-2 text-[10px] text-slate-400">
                              <span>
                                {tArticle.published_at ? new Date(tArticle.published_at).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric'
                                }) : 'Recent'}
                              </span>
                              <span>•</span>
                              <span>{tArticle.views >= 1000 ? `${(tArticle.views / 1000).toFixed(1)}K` : tArticle.views} Views</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400">No other news available.</p>
                  )}
                </div>
              </div>

              {/* Sidebar Action Widget CTA */}
              <div className="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden shadow-lg shadow-slate-900/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl -mr-10 -mt-10" />
                <div className="relative z-10">
                  <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest mb-2 block">Premium Assistance</span>
                  <h3 className="text-xl font-bold mb-4 leading-tight">Find your dream engineering or medical college</h3>
                  <p className="text-slate-300 text-xs leading-relaxed mb-6">
                    Connect with certified admission advisors who have helped over 50,000+ students secure seats in top Indian universities.
                  </p>
                  <Link 
                    href="/admission-support" 
                    className="w-full py-3 bg-white text-slate-900 font-bold rounded-xl text-center text-xs flex items-center justify-center gap-1.5 hover:bg-slate-100 transition-all"
                  >
                    Get Free Counselling <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
