'use client'

import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Calendar, 
  Eye, 
  Share2, 
  User, 
  Clock, 
  ChevronRight,
  Bookmark,
  Check,
  AlertTriangle
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function BlogDetailsPage({ params }: { params: { slug: string } }) {
  const [blog, setBlog] = useState<any>(null)
  const [trending, setTrending] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const { slug } = params

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        // 1. Increment views using RPC function
        try {
          await supabase.rpc('increment_blog_views', { blog_slug: slug })
        } catch (rpcErr) {
          console.warn('RPC view increment failed, falling back to manual update:', rpcErr)
        }

        // 2. Fetch the current blog post
        const { data: currentBlog, error: fetchErr } = await supabase
          .from('blogs')
          .select('*')
          .eq('slug', slug)
          .single()

        if (fetchErr) {
          throw fetchErr
        }

        if (!currentBlog) {
          setError('Blog not found')
          setLoading(false)
          return
        }

        setBlog(currentBlog)
        
        // Dynamically update page title for browser
        if (typeof document !== 'undefined') {
          document.title = `${currentBlog.title} | Promote Education`
        }

        // 3. Fetch trending/other blogs (excluding current one)
        const { data: otherBlogs } = await supabase
          .from('blogs')
          .select('slug, title, published_at, image_url, views')
          .neq('slug', slug)
          .eq('is_live', true)
          .limit(3)

        if (otherBlogs) {
          setTrending(otherBlogs)
        }
      } catch (err: any) {
        console.error('Error fetching blog details:', err)
        setError(err.message || 'Failed to load blog')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      loadData()
    }
  }, [slug])

  const handleShare = () => {
    if (typeof window === 'undefined') return
    const url = window.location.href
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        text: blog?.summary,
        url: url
      }).catch(err => console.log('Error sharing:', err))
    } else {
      navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Loading skeleton state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-1 pt-32 pb-20 max-w-7xl mx-auto w-full px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-6">
              <div className="h-6 w-32 bg-slate-200 rounded animate-pulse" />
              <div className="h-12 w-3/4 bg-slate-200 rounded animate-pulse" />
              <div className="h-6 w-1/2 bg-slate-200 rounded animate-pulse" />
              <div className="w-full aspect-video bg-slate-200 rounded-[2.5rem] animate-pulse" />
              <div className="space-y-3 pt-6">
                <div className="h-4 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-slate-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="lg:col-span-4 space-y-6">
              <div className="h-8 w-40 bg-slate-200 rounded animate-pulse" />
              <div className="h-32 bg-slate-200 rounded-2xl animate-pulse" />
              <div className="h-32 bg-slate-200 rounded-2xl animate-pulse" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Error state
  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1 pt-40 pb-20 flex flex-col items-center justify-center text-center px-6">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Blog Post Not Found
          </h1>
          <p className="text-slate-500 max-w-md mb-8">
            The blog post you are looking for does not exist, has been removed, or there was a database issue.
          </p>
          <Link href="/blogs" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-sky-500 transition-all shadow-md">
            <ArrowLeft size={16} /> Back to Blogs Directory
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white font-body selection:bg-sky-500 selection:text-white">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Breadcrumb */}
          <Link 
            href="/blogs" 
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-900 transition-all mb-10 uppercase tracking-widest"
          >
            <ArrowLeft size={14} /> Back to Blogs
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Main Content Area */}
            <article className="lg:col-span-8">
              
              {/* Category / Meta Bar */}
              <div className="flex items-center flex-wrap gap-4 mb-6">
                <span className="px-3 py-1 bg-sky-50 text-sky-600 text-[10px] font-black uppercase tracking-widest rounded-md border border-sky-100">
                  {blog.category || 'Education'}
                </span>
                <div className="flex items-center gap-4 text-slate-400 text-[11px] font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> 
                    {new Date(blog.published_at).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-200" />
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {blog.read_time}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-200" />
                  <span className="flex items-center gap-1">
                    <Eye size={12} /> {blog.views} Views
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 
                className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.15] tracking-tight mb-8"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {blog.title}
              </h1>

              {/* Author / Share Bar */}
              <div className="flex items-center justify-between py-6 border-y border-slate-100 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200 font-bold text-sm">
                    {blog.author?.[0] || 'P'}
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900">{blog.author || 'Promote Education Contributor'}</div>
                    <div className="text-[11px] text-slate-400 font-medium">Academic Specialist</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
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
                        <Share2 size={14} /> Share
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Cover Image */}
              {blog.image_url && (
                <div className="w-full aspect-video md:h-[400px] rounded-3xl overflow-hidden shadow-sm border border-slate-100 mb-10">
                  <img 
                    src={blog.image_url} 
                    alt={blog.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1523050335102-c89b1811b128?w=800';
                    }}
                  />
                </div>
              )}

              {/* Article content body */}
              <article className="prose prose-slate prose-lg max-w-none
                prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-slate-600 prose-p:leading-relaxed
                prose-a:text-[#38b6ff] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-slate-800 prose-strong:font-bold
                prose-ul:text-slate-600 prose-ol:text-slate-600
                prose-li:my-1
                prose-blockquote:border-l-[#38b6ff] prose-blockquote:text-slate-500 prose-blockquote:italic
                prose-code:text-[#38b6ff] prose-code:bg-slate-100 prose-code:rounded prose-code:px-1 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-2xl
                prose-img:rounded-2xl prose-img:shadow-md
                prose-hr:border-slate-200">
                <ReactMarkdown>
                  {blog.content}
                </ReactMarkdown>
              </article>

              {/* CTA callout */}
              <div className="my-12 p-8 bg-sky-50/50 border border-sky-100 rounded-3xl text-sky-950">
                <h3 className="text-base font-bold mb-2 flex items-center gap-2">
                  <Bookmark size={16} className="text-sky-500" /> Confused about Admission Rules?
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-0">
                  Talk directly to our top counsellors to build your custom academic timeline and find college options matching your rank and goals. Book a free consultation session today.
                </p>
              </div>

            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-8">
              
              {/* Trending/Other Blogs */}
              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                <h3 
                  className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-200/60 pb-3"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Trending Blogs
                </h3>

                <div className="space-y-6">
                  {trending.length > 0 ? (
                    trending.map((tBlog) => (
                      <Link 
                        href={`/blogs/${tBlog.slug}`} 
                        key={tBlog.slug} 
                        className="group block"
                      >
                        <div className="flex gap-4">
                          {tBlog.image_url && (
                            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-200">
                              <img 
                                src={tBlog.image_url} 
                                alt="" 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs md:text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-sky-600 transition-colors mb-1">
                              {tBlog.title}
                            </h4>
                            <div className="flex items-center gap-2 text-[10px] text-slate-400">
                              <span>
                                {new Date(tBlog.published_at).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                              <span>•</span>
                              <span>{tBlog.views >= 1000 ? `${(tBlog.views / 1000).toFixed(1)}K` : tBlog.views} Views</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400">No other blogs available.</p>
                  )}
                </div>
              </div>

              {/* Call-to-action */}
              <div className="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden shadow-lg shadow-slate-900/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl -mr-10 -mt-10" />
                <div className="relative z-10">
                  <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest mb-2 block">Counselling</span>
                  <h3 className="text-xl font-bold mb-4 leading-tight">Need expert help selecting a stream?</h3>
                  <p className="text-slate-300 text-xs leading-relaxed mb-6">
                    Connect with certified admission advisors who have helped over 50,000+ students secure seats in top Indian universities.
                  </p>
                  <Link 
                    href="/admission-support" 
                    className="w-full py-3 bg-white text-slate-900 font-bold rounded-xl text-center text-xs flex items-center justify-center gap-1.5 hover:bg-slate-100 transition-all"
                  >
                    Get Free Advice <ChevronRight size={14} />
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
