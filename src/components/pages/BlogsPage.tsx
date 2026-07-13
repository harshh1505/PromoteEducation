'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Calendar, ArrowRight, BookOpen, Clock, User, Eye, Sparkles } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { resolveImageUrl } from '@/lib/utils'

// Lazy-load heavy LeadModal component to optimize initial JS bundle size
const LeadModal = dynamic(() => import('@/components/ui/LeadModal'), {
  ssr: false,
})

const ITEMS_PER_PAGE = 12

export default function BlogsPageContent({ initialBlogs }: { initialBlogs: any[] }) {
  const [blogs, setBlogs] = useState<any[]>(initialBlogs)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(initialBlogs.length >= ITEMS_PER_PAGE)

  // Dynamically extract unique categories based on all loaded blogs
  const categories = ['All', ...Array.from(new Set(blogs.map((item: any) => item.category).filter(Boolean)))] as string[]

  // Fetch next page of blogs (Client-side pagination)
  async function loadMoreBlogs() {
    if (loadingMore) return
    setLoadingMore(true)
    try {
      const nextPage = page + 1
      const start = (nextPage - 1) * ITEMS_PER_PAGE
      const end = start + ITEMS_PER_PAGE - 1

      const { data, error } = await supabase
        .from('blogs')
        .select('id, slug, title, summary, category, published_at, read_time, views, featured_image, author, featured')
        .eq('is_live', true)
        .order('published_at', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false })
        .range(start, end)

      if (error) throw error

      if (data && data.length > 0) {
        setBlogs((prev) => [...prev, ...data])
        setPage(nextPage)
        if (data.length < ITEMS_PER_PAGE) {
          setHasMore(false)
        }
      } else {
        setHasMore(false)
      }
    } catch (err) {
      console.error('Error paginating blogs:', err)
    } finally {
      setLoadingMore(false)
    }
  }

  // Filtered blogs
  const filteredBlogs = selectedCategory === 'All'
    ? blogs
    : blogs.filter(blog => blog.category === selectedCategory)

  // Find the featured blog (the latest one with featured = true or has featured_image)
  const featuredBlog = blogs.find(blog => blog.featured) || blogs.find(blog => blog.featured_image)
  // Other blogs excluding the featured one
  const secondaryBlogs = blogs.filter(blog => blog.id !== featuredBlog?.id)
  
  // Apply category filter to grid list
  const displayGridBlogs = selectedCategory === 'All'
    ? secondaryBlogs
    : filteredBlogs

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-100 font-body selection:bg-sky-500 selection:text-white relative overflow-hidden">
      {/* Decorative Blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-200/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <Navbar />
      
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 md:px-12 pt-32 pb-20 relative z-10">
        
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16 animate-in fade-in slide-in-from-top-6 duration-700">
          <div className="lg:col-span-8 flex flex-col justify-center">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[62px] font-black text-slate-900 leading-[1.08] tracking-tighter mb-6 font-display">
              Education guides & insights <br className="hidden md:inline" />
              from <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600">trusted advisors</span>
            </h1>

            {/* Description */}
            <p className="text-slate-500 text-sm md:text-base lg:text-lg max-w-xl leading-relaxed mb-8 md:mb-10 font-medium">
              Read our latest articles on entrance exams, college admissions, and career advice to help you choose the best college and secure your admission.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="bg-white border border-slate-100 rounded-[20px] p-6 relative overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300 w-full max-w-sm z-10">
              {/* Decorative light gradient */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-100/50 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Live counselling open
                </span>
              </div>
              
              <h3 className="text-slate-800 font-extrabold text-lg mb-2">
                Confused about college selection?
              </h3>
              
              <p className="text-slate-500 text-xs font-medium mb-5 leading-relaxed">
                Connect with our expert mentors to build a customized admission and exam strategy today.
              </p>
              
              <button 
                onClick={() => setShowLeadModal(true)}
                className="w-full py-4 bg-[#111111] hover:bg-slate-850 hover:shadow-lg text-white font-bold text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                Talk to counsel online
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters as Pills */}
        {categories.length > 1 && (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex flex-wrap gap-2.5">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'bg-slate-900 border-slate-900 text-white shadow-md' 
                        : 'bg-white border-slate-100 text-slate-600 hover:border-slate-200 hover:shadow-sm hover:-translate-y-0.5'
                    }`}
                  >
                    <span className="text-xs font-bold">{cat}</span>
                  </button>
                )
              })}
            </div>
            
            {/* View All Blogs option if filtered */}
            {selectedCategory !== 'All' && (
              <button 
                onClick={() => setSelectedCategory('All')} 
                className="flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full transition-colors whitespace-nowrap"
              >
                See all blogs <ArrowRight size={14} />
              </button>
            )}
          </div>
        )}

        {blogs.length === 0 ? (
          /* Empty state */
          <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
            <BookOpen size={48} className="mx-auto text-slate-300 mb-4 animate-bounce" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No blogs published yet</h3>
            <p className="text-slate-500 text-sm max-w-sm mx-auto">
              We are working with our education counsellors to bring you premium content shortly. Stay tuned!
            </p>
          </div>
        ) : (
          <div className="space-y-20">
            {/* Featured Post (only on 'All' category and if featured exists) */}
            {selectedCategory === 'All' && featuredBlog && (
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center py-4 mb-20 border-b border-slate-100 pb-16">
                {/* Left Column: Asymmetric Image Container */}
                <div className="lg:col-span-7 relative aspect-[16/10] w-full rounded-[32px] overflow-hidden group/featured shadow-xl border border-slate-100">
                  <Link href={`/blogs/${featuredBlog.slug}`}>
                    <Image
                      src={resolveImageUrl(featuredBlog.featured_image) || 'https://images.unsplash.com/photo-1523050335192-ce67a276b42a?w=800'}
                      alt={featuredBlog.title}
                      fill
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      priority
                      className="object-cover transition-transform duration-700 ease-out group-hover/featured:scale-[1.03]"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-sm border border-slate-100 flex items-center gap-2">
                        <Sparkles size={14} className="text-emerald-500" /> Featured Post
                      </span>
                    </div>
                  </Link>
                </div>

                {/* Right Column: Editorial Copy */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg">
                      {featuredBlog.category}
                    </span>
                    <span className="text-slate-200 text-xs">•</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <Clock size={12} /> {featuredBlog.read_time} min read
                    </span>
                  </div>

                  <Link href={`/blogs/${featuredBlog.slug}`} className="group">
                    <h2 className="text-2xl lg:text-3xl font-black text-slate-900 leading-tight mb-4 group-hover:text-emerald-500 transition-colors">
                      {featuredBlog.title}
                    </h2>
                  </Link>

                  <p className="text-slate-500 text-xs leading-relaxed mb-6 font-medium line-clamp-3">
                    {featuredBlog.summary}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 text-xs font-bold border border-slate-100">
                        {featuredBlog.author?.[0] || 'P'}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">{featuredBlog.author}</div>
                        <div className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">
                          {featuredBlog.published_at ? new Date(featuredBlog.published_at).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric'
                          }) : 'Recent'}
                        </div>
                      </div>
                    </div>
                    
                    <Link
                      href={`/blogs/${featuredBlog.slug}`}
                      className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#111111] hover:text-emerald-500 transition-colors group"
                    >
                      Read Story <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* All Blogs Header (when showing grid) */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
              </h2>
            </div>

            {/* Blogs Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {displayGridBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="flex flex-col group bg-white rounded-[32px] p-3 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-slate-200 transition-all duration-300"
                >
                  {/* Blog Image Container */}
                  <div className="w-full aspect-[16/10] overflow-hidden rounded-[24px] bg-slate-50 mb-5 relative">
                    <Link href={`/blogs/${blog.slug}`}>
                      <Image
                        src={resolveImageUrl(blog.featured_image) || 'https://images.unsplash.com/photo-1523050335102-c89b1811b128?w=800'}
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                        alt={blog.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </Link>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-slate-900 text-[9px] font-black uppercase tracking-[0.2em] rounded-lg shadow-sm border border-slate-100">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  {/* Blog Details */}
                  <div className="flex-1 flex flex-col justify-between px-3 pb-3">
                    <div>
                      <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-4">
                        <span>{blog.published_at ? new Date(blog.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}</span>
                        <span className="text-slate-200">•</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {blog.read_time} min read</span>
                        <span className="text-slate-200">•</span>
                        <span className="flex items-center gap-1"><Eye size={12} /> {blog.views >= 1000 ? `${(blog.views / 1000).toFixed(1)}K` : blog.views}</span>
                      </div>

                      <Link href={`/blogs/${blog.slug}`}>
                        <h3 className="font-black text-xl text-slate-900 leading-snug group-hover:text-emerald-500 transition-colors line-clamp-2 mb-3">
                          {blog.title}
                        </h3>
                      </Link>

                      <p className="text-slate-500 text-xs leading-relaxed font-medium line-clamp-3 mb-6">
                        {blog.summary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 text-[10px] font-bold border border-slate-100">
                          {blog.author?.[0] || 'P'}
                        </div>
                        <span className="text-[11px] font-bold text-slate-700">{blog.author}</span>
                      </div>

                      <Link
                        href={`/blogs/${blog.slug}`}
                        className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#111111] hover:text-emerald-500 transition-colors group-hover:translate-x-1 duration-300"
                      >
                        Read Article <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {hasMore && (
              <div className="flex justify-center pt-8">
                <button
                  onClick={loadMoreBlogs}
                  disabled={loadingMore}
                  className="px-8 py-4 bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md text-slate-800 font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-250 flex items-center gap-2"
                >
                  {loadingMore ? 'Loading...' : 'Load More Articles'}
                  <ArrowRight size={14} className={loadingMore ? 'animate-pulse' : ''} />
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
      {showLeadModal && (
        <LeadModal
          isOpen={showLeadModal}
          onClose={() => setShowLeadModal(false)}
          collegeName="Top Indian Universities"
          collegeLogo="https://ui-avatars.com/api/?name=Promote+Education&background=3B2EA8&color=fff"
          stream="All Streams"
        />
      )}
    </div>
  )
}
