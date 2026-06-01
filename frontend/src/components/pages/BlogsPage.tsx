'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Calendar, ArrowRight, BookOpen, Clock, User, Eye, Sparkles } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import LeadModal from '@/components/ui/LeadModal'

export default function BlogsPageContent() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [categories, setCategories] = useState<string[]>(['All'])
  const [showLeadModal, setShowLeadModal] = useState(false)

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 animate-in fade-in slide-in-from-top-6 duration-700">
          <div className="lg:col-span-8">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black text-slate-900 leading-[1.08] tracking-tighter mb-6 font-display">
              Education guides and insights <br className="hidden md:inline" />
              from our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600">trusted advisors</span>
            </h1>

            {/* Description */}
            <p className="text-slate-500 text-base md:text-lg leading-relaxed font-medium max-w-2xl">
              Read our latest articles on entrance exams, college admissions, and career advice.
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 relative overflow-hidden shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300">
              {/* Decorative light gradient */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-100/50 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Live counselling open
                </span>
              </div>
              
              <h3 className="text-slate-900 font-extrabold text-lg mb-2">
                Confused about college selection?
              </h3>
              
              <p className="text-slate-500 text-xs font-medium mb-5 leading-relaxed">
                Connect with our expert mentors to build a customized admission and exam strategy today.
              </p>
              
              <button 
                onClick={() => setShowLeadModal(true)}
                className="w-full py-3 bg-[#111111] hover:bg-slate-800 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
              >
                Talk to counsel online
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        {categories.length > 1 && (
          <div className="flex gap-8 mb-12 pb-3 border-b border-slate-100 overflow-x-auto no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative pb-3 text-xs font-extrabold tracking-wider uppercase transition-all duration-300 whitespace-nowrap ${
                    isActive ? 'text-slate-900' : 'text-slate-400 hover:text-slate-650'
                  }`}
                >
                  {cat}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 animate-in fade-in duration-300" />
                  )}
                </button>
              )
            })}
          </div>
        )}

        {loading ? (
          /* Loading Skeleton state */
          <div className="space-y-12 animate-pulse">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
              <div className="lg:col-span-7 aspect-[16/10] bg-slate-50 rounded-[32px]" />
              <div className="lg:col-span-5 space-y-6 flex flex-col justify-center">
                <div className="h-4 w-24 bg-slate-100 rounded" />
                <div className="h-10 w-full bg-slate-100 rounded" />
                <div className="h-10 w-5/6 bg-slate-100 rounded" />
                <div className="h-16 w-full bg-slate-100 rounded" />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="space-y-4">
                  <div className="aspect-[16/10] bg-slate-50 rounded-[24px]" />
                  <div className="h-4 w-1/3 bg-slate-100 rounded" />
                  <div className="h-6 w-3/4 bg-slate-100 rounded" />
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
          <div className="space-y-20">
            {/* Featured Post (only on 'All' category and if featured exists) */}
            {selectedCategory === 'All' && featuredBlog && (
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center py-4 mb-20 border-b border-slate-100 pb-16">
                {/* Left Column: Asymmetric Image Container */}
                <div className="lg:col-span-7 relative aspect-[16/10] w-full rounded-[32px] overflow-hidden group/featured">
                  <Link href={`/blogs/${featuredBlog.slug}`}>
                    <img
                      src={featuredBlog.image_url || 'https://images.unsplash.com/photo-1523050335192-ce67a276b42a?w=800'}
                      alt={featuredBlog.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/featured:scale-[1.03]"
                    />
                  </Link>
                </div>

                {/* Right Column: Editorial Copy */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase text-emerald-600">
                      {featuredBlog.category}
                    </span>
                    <span className="text-slate-200 text-xs">•</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <Clock size={12} /> {featuredBlog.read_time}
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
                          {new Date(featuredBlog.published_at).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric'
                          })}
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

            {/* Blogs Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
              {displayGridBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="flex flex-col group"
                >
                  {/* Blog Image Container */}
                  <div className="w-full aspect-[16/10] overflow-hidden rounded-[24px] bg-slate-50 mb-5 relative">
                    <Link href={`/blogs/${blog.slug}`}>
                      <img
                        src={blog.image_url || 'https://images.unsplash.com/photo-1523050335102-c89b1811b128?w=800'}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                        alt={blog.title}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1523050335102-c89b1811b128?w=800';
                        }}
                      />
                    </Link>
                    <div className="absolute top-4 left-4">
                      <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm text-slate-900 text-[9px] font-black uppercase tracking-[0.15em] rounded-md shadow-sm border border-slate-100">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  {/* Blog Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-3">
                        <span>{new Date(blog.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span className="text-slate-200">•</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {blog.read_time}</span>
                        <span className="text-slate-200">•</span>
                        <span className="flex items-center gap-1"><Eye size={12} /> {blog.views >= 1000 ? `${(blog.views / 1000).toFixed(1)}K` : blog.views}</span>
                      </div>

                      <Link href={`/blogs/${blog.slug}`}>
                        <h3 className="font-black text-lg text-slate-900 leading-snug group-hover:text-emerald-500 transition-colors line-clamp-2 mb-3">
                          {blog.title}
                        </h3>
                      </Link>

                      <p className="text-slate-500 text-xs leading-relaxed font-medium line-clamp-3 mb-6">
                        {blog.summary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 text-[9px] font-bold border border-slate-100">
                          {blog.author?.[0] || 'P'}
                        </div>
                        <span className="text-[10px] font-bold text-slate-650">{blog.author}</span>
                      </div>

                      <Link
                        href={`/blogs/${blog.slug}`}
                        className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-[#111111] hover:text-emerald-500 transition-colors group"
                      >
                        Read Article <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
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
