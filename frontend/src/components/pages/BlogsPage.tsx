'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Calendar, ArrowRight, BookOpen, Clock, User, Eye, Sparkles } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function BlogsPageContent() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [categories, setCategories] = useState<string[]>(['All'])

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('is_live', true)
          .order('published_at', { ascending: false })

        if (error) {
          throw error
        }

        if (data) {
          setBlogs(data)
          
          // Dynamically extract unique categories
          const cats = ['All', ...Array.from(new Set(data.map((item: any) => item.category).filter(Boolean)))] as string[]
          setCategories(cats)
        }
      } catch (error) {
        console.error('Error fetching blogs from Supabase:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  // Filtered blogs
  const filteredBlogs = selectedCategory === 'All'
    ? blogs
    : blogs.filter(blog => blog.category === selectedCategory)

  // Find the featured blog (the latest one with an image)
  const featuredBlog = blogs.find(blog => blog.image_url)
  // Other blogs excluding the featured one
  const secondaryBlogs = blogs.filter(blog => blog.id !== featuredBlog?.id)
  
  // Apply category filter to grid list
  const displayGridBlogs = selectedCategory === 'All'
    ? secondaryBlogs
    : filteredBlogs

  return (
    <div className="min-h-screen flex flex-col bg-white font-body selection:bg-sky-500 selection:text-white relative overflow-hidden">
      {/* Decorative Blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-100/30 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute top-[20%] left-0 w-[400px] h-[400px] bg-indigo-50/40 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <Navbar />
      
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-6 pt-32 pb-20 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col justify-center mb-16 animate-in fade-in slide-in-from-top-6 duration-700">
          <div className="max-w-3xl">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-50/60 border border-sky-100/50 rounded-full mb-6 shadow-sm w-fit backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
              <span className="text-[10px] font-black text-sky-700 uppercase tracking-[0.2em]">
                Education Journal
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black text-slate-900 leading-[1.08] tracking-tighter mb-6 font-display">
              Perspectives & guides from our <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-500 to-indigo-600">academic mentors</span>
            </h1>

            {/* Description */}
            <p className="text-slate-500 text-base md:text-lg max-w-2xl leading-relaxed font-medium">
              Deep-dives into entrance exam preparations, college selection parameters, and strategic counsel compiled by senior academic advisors.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-12 pb-2 border-b border-slate-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          /* Loading Skeleton state */
          <div className="space-y-12">
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 h-[450px] bg-slate-100 rounded-[40px] animate-pulse" />
              <div className="lg:col-span-5 space-y-6">
                <div className="h-6 w-32 bg-slate-100 rounded animate-pulse" />
                <div className="h-12 w-full bg-slate-100 rounded animate-pulse" />
                <div className="h-12 w-5/6 bg-slate-100 rounded animate-pulse" />
                <div className="h-20 w-full bg-slate-100 rounded animate-pulse" />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="space-y-4">
                  <div className="aspect-video bg-slate-100 rounded-3xl animate-pulse" />
                  <div className="h-6 w-3/4 bg-slate-100 rounded animate-pulse" />
                  <div className="h-12 w-full bg-slate-100 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        ) : blogs.length === 0 ? (
          /* Empty state */
          <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
            <BookOpen size={48} className="mx-auto text-slate-300 mb-4 animate-bounce" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No blogs published yet</h3>
            <p className="text-slate-500 text-sm max-w-sm mx-auto">
              We are working with our education counsellors to bring you premium content shortly. Stay tuned!
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Featured Post (only on 'All' category and if featured exists) */}
            {selectedCategory === 'All' && featuredBlog && (
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-slate-50 rounded-[2.5rem] p-6 lg:p-10 border border-slate-100/50">
                <div className="lg:col-span-7 relative h-[320px] lg:h-[450px] rounded-[2rem] overflow-hidden shadow-xl group/featured">
                  <img
                    src={featuredBlog.image_url || 'https://images.unsplash.com/photo-1523050335192-ce67a276b42a?w=800'}
                    alt={featuredBlog.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/featured:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-10 z-10 block lg:hidden">
                    <span className="inline-block px-3 py-1.5 bg-sky-500 text-white text-[9px] font-black uppercase tracking-widest rounded-md mb-3 shadow-lg shadow-sky-500/20">
                      {featuredBlog.category}
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold text-white leading-tight line-clamp-2">
                      {featuredBlog.title}
                    </h2>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-sky-50 text-sky-600 text-[10px] font-black uppercase tracking-widest rounded-md border border-sky-100">
                      {featuredBlog.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <Clock size={12} /> {featuredBlog.read_time}
                    </span>
                  </div>

                  <Link href={`/blogs/${featuredBlog.slug}`} className="group">
                    <h2 className="text-2xl lg:text-3xl font-black text-slate-900 leading-tight mb-4 group-hover:text-sky-600 transition-colors">
                      {featuredBlog.title}
                    </h2>
                  </Link>

                  <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium line-clamp-3">
                    {featuredBlog.summary}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-200/60">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold">
                        {featuredBlog.author?.[0] || 'P'}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">{featuredBlog.author}</div>
                        <div className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">
                          {new Date(featuredBlog.published_at).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                    
                    <Link
                      href={`/blogs/${featuredBlog.slug}`}
                      className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-sky-600 hover:text-sky-700 transition-colors group"
                    >
                      Read Story <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Blogs Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayGridBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="flex flex-col bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-sky-200 transition-all duration-300 group overflow-hidden"
                >
                  {/* Blog Image */}
                  <div className="w-full aspect-video overflow-hidden relative bg-slate-50">
                    <img
                      src={blog.image_url || 'https://images.unsplash.com/photo-1523050335102-c89b1811b128?w=800'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt={blog.title}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1523050335102-c89b1811b128?w=800';
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-md shadow-sm border border-slate-100">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  {/* Blog Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-3">
                        <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(blog.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {blog.read_time}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Eye size={12} /> {blog.views >= 1000 ? `${(blog.views / 1000).toFixed(1)}K` : blog.views}</span>
                      </div>

                      <Link href={`/blogs/${blog.slug}`}>
                        <h3 className="font-bold text-lg text-slate-900 leading-snug group-hover:text-sky-600 transition-colors line-clamp-2 mb-3">
                          {blog.title}
                        </h3>
                      </Link>

                      <p className="text-slate-500 text-xs leading-relaxed font-medium line-clamp-3 mb-6">
                        {blog.summary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-[9px] font-bold">
                          {blog.author?.[0] || 'P'}
                        </div>
                        <span className="text-[10px] font-bold text-slate-600">{blog.author}</span>
                      </div>

                      <Link
                        href={`/blogs/${blog.slug}`}
                        className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-sky-500 group-hover:gap-2 transition-all"
                      >
                        Read Full <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
