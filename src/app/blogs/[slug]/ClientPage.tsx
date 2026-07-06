'use client'

import { useState, useEffect, use } from 'react'
import MarkdownViewer from '@/components/ui/MarkdownViewer'
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
  AlertTriangle,
  ArrowRight
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { resolveImageUrl } from '@/lib/utils'
import LeadModal from '@/components/ui/LeadModal'

export default function BlogDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const [blog, setBlog] = useState<any>(null)
  const [trending, setTrending] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const { slug } = use(params)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <div className="min-h-screen flex flex-col bg-white font-body selection:bg-sky-500 selection:text-white relative">
      {/* Top Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-slate-100 z-50">
        <div 
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Main Content Area */}
            <article className="lg:col-span-8">
              
              {/* Category / Meta Bar */}
              <div className="flex items-center flex-wrap gap-3 mb-6">
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-emerald-600">
                  {blog.category || 'Education'}
                </span>
                <span className="text-slate-200 text-xs">•</span>
                <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider flex items-center gap-1">
                  {new Date(blog.published_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
                <span className="text-slate-200 text-xs">•</span>
                <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Clock size={12} /> {blog.read_time}
                </span>
                <span className="text-slate-200 text-xs">•</span>
                <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Eye size={12} /> {blog.views >= 1000 ? `${(blog.views / 1000).toFixed(1)}K` : blog.views} views
                </span>
              </div>

              {/* Title */}
              <h1 
                className="text-3xl md:text-4xl lg:text-[44px] font-black text-slate-900 leading-[1.12] tracking-tighter mb-8 font-display"
              >
                {blog.title}
              </h1>

              {/* Author / Share Bar */}
              <div className="flex items-center justify-between py-6 border-y border-slate-100 mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 border border-slate-100 font-bold text-sm">
                    {blog.author?.[0] || 'P'}
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900">{blog.author || 'Promote Education Contributor'}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Academic Advisor</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
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
                </div>
              </div>

              {/* Cover Image */}
              {blog.image_url && (
                <div className="w-full h-[280px] md:h-[450px] rounded-[32px] overflow-hidden border border-slate-100 mb-12">
                  <img 
                    src={resolveImageUrl(blog.image_url) || ''} 
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
                prose-p:text-slate-650 prose-p:leading-relaxed prose-p:text-base
                prose-a:text-emerald-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-slate-800 prose-strong:font-bold
                prose-ul:text-slate-600 prose-ol:text-slate-600
                prose-li:my-1
                prose-blockquote:border-l-emerald-500 prose-blockquote:text-slate-500 prose-blockquote:italic
                prose-code:text-emerald-600 prose-code:bg-slate-50 prose-code:rounded prose-code:px-1 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-2xl
                prose-img:rounded-2xl prose-img:shadow-md
                prose-hr:border-slate-200
                prose-table:w-full prose-table:border-collapse prose-table:my-8
                prose-th:bg-slate-50 prose-th:text-left prose-th:font-black prose-th:text-slate-900 prose-th:p-4 prose-th:border prose-th:border-slate-200 prose-th:uppercase prose-th:tracking-wider prose-th:text-xs
                prose-td:p-4 prose-td:border prose-td:border-slate-200 prose-td:text-slate-600 prose-td:text-sm">
                <MarkdownViewer content={blog.content} />
              </article>

              {/* CTA callout */}
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

            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-10 lg:sticky lg:top-32 h-fit">
              
              {/* Trending/Other Blogs */}
              <div className="bg-white border border-slate-100 rounded-[28px] p-6 shadow-sm">
                <h3 className="text-xs font-black text-slate-900 mb-6 uppercase tracking-wider border-b border-slate-50 pb-3">
                  Trending Articles
                </h3>

                <div className="space-y-6">
                  {trending.length > 0 ? (
                    trending.map((tBlog, index) => (
                      <Link 
                        href={`/blogs/${tBlog.slug}`} 
                        key={tBlog.slug} 
                        className="group flex gap-4 items-start"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-200">
                           <img 
                              src={resolveImageUrl(tBlog.image_url) || ''} 
                              alt="" 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                           />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs md:text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-emerald-500 transition-colors mb-1">
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
                            <span>{tBlog.views >= 1000 ? `${(tBlog.views / 1000).toFixed(1)}K` : tBlog.views} views</span>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400">No other articles available.</p>
                  )}
                </div>
              </div>

              {/* Counselor Help Widget */}
              <div className="bg-slate-50 border border-slate-100 rounded-[28px] p-6 relative overflow-hidden shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300">
                {/* Decorative light gradient */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-100/50 rounded-full blur-xl pointer-events-none" />
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Counselling open
                  </span>
                </div>
                
                <h3 className="text-slate-900 font-extrabold text-base mb-2">
                  Need personalized advice?
                </h3>
                
                <p className="text-slate-500 text-xs font-medium mb-5 leading-relaxed">
                  Talk to our certified career advisors to map out your target colleges and admission strategy.
                </p>
                
                <button 
                  onClick={() => setShowLeadModal(true)}
                  className="w-full py-3 bg-[#111111] hover:bg-slate-800 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  Connect with advisor
                  <ArrowRight size={12} />
                </button>
              </div>

            </aside>

          </div>
        </div>
      </main>

      <Footer />
      <LeadModal
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        collegeName="Top Indian Universities"
        collegeLogo="https://ui-avatars.com/api/?name=Promote+Education&background=3B2EA8&color=fff"
        stream="All Streams"
      />
    </div>
  )
}
