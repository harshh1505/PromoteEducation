
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ArrowLeft, Clock, Eye, Calendar, User, Clock3 } from 'lucide-react'
import { resolveImageUrl } from '@/lib/utils'
import BlogInteractive from './ClientPage'
import CounselorWidget from '@/components/ui/CounselorWidget'

// Dynamically import MarkdownViewer as it is a heavy package, but keep it SSR-rendered
const MarkdownViewer = dynamic(() => import('@/components/ui/MarkdownViewer'), {
  ssr: true,
})

export const revalidate = 3600 // Cache for 1 hour

export async function generateStaticParams() {
  try {
    const { data } = await supabase
      .from('blogs')
      .select('slug')
      .eq('is_live', true)

    return (data || []).map((blog) => ({
      slug: blog.slug,
    }))
  } catch (err) {
    console.error('Failed to generate static params for blogs:', err)
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const { data: blog } = await supabase
      .from('blogs')
      .select('title, summary, seo_title, seo_description')
      .eq('slug', slug)
      .single()

    if (!blog) return { title: 'Blog Post Not Found' }

    return {
      title: blog.seo_title || `${blog.title} | Promote Education`,
      description: blog.seo_description || blog.summary || 'Expert education advisor blogs.',
    }
  } catch (err) {
    return { title: 'Blog Post' }
  }
}

export default async function BlogDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // 1. Fetch current blog post
  const { data: blog, error } = await supabase
    .from('blogs')
    .select('id, slug, title, summary, category, published_at, read_time, views, featured_image, author')
    .eq('slug', slug)
    .single()

  if (error || !blog) {
    return notFound()
  }

  // 2. Fetch sections, FAQs and trending articles in parallel
  const [sectionsRes, faqsRes, trendingRes] = await Promise.all([
    supabase
      .from('blog_sections')
      .select('heading, subheading, content, image_url')
      .eq('blog_id', blog.id)
      .order('section_order', { ascending: true }),
    supabase
      .from('blog_faqs')
      .select('question, answer')
      .eq('blog_id', blog.id)
      .order('faq_order', { ascending: true }),
    supabase
      .from('blogs')
      .select('slug, title, published_at, featured_image, views')
      .neq('slug', slug)
      .eq('is_live', true)
      .order('views', { ascending: false })
      .limit(3)
  ])

  const sections = sectionsRes.data || []
  const faqs = faqsRes.data || []
  const trending = trendingRes.data || []

  return (
    <div className="min-h-screen flex flex-col bg-white font-body selection:bg-sky-500 selection:text-white relative">
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
                  <Calendar size={12} />
                  {blog.published_at ? new Date(blog.published_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  }) : 'Recent'}
                </span>
                <span className="text-slate-200 text-xs">•</span>
                <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Clock3 size={12} /> {blog.read_time} min read
                </span>
                <span className="text-slate-200 text-xs">•</span>
                <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Eye size={12} /> {blog.views >= 1000 ? `${(blog.views / 1000).toFixed(1)}K` : blog.views} views
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-[44px] font-black text-slate-900 leading-[1.12] tracking-tighter mb-8 font-display">
                {blog.title}
              </h1>

              {/* Author / Client Interactions Bar */}
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

                {/* Client interactivity portal for sharing and scroll reading progress */}
                <BlogInteractive slug={blog.slug} title={blog.title} summary={blog.summary || ''} />
              </div>

              {/* Cover Image */}
              {blog.featured_image && (
                <div className="w-full h-[280px] md:h-[450px] rounded-[32px] overflow-hidden border border-slate-100 mb-12 relative">
                  <Image 
                    src={resolveImageUrl(blog.featured_image) || ''} 
                    alt={blog.title} 
                    fill
                    sizes="(max-width: 1200px) 100vw, 900px"
                    priority
                    className="object-cover"
                  />
                </div>
              )}

              {/* Render dynamic blog sections containing content */}
              <div className="prose prose-slate prose-lg max-w-none
                prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-slate-650 prose-p:leading-relaxed prose-p:text-base
                prose-a:text-emerald-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-slate-800 prose-strong:font-bold
                prose-ul:text-slate-600 prose-ol:text-slate-600
                prose-li:my-1
                prose-blockquote:border-l-emerald-500 prose-blockquote:text-slate-500 prose-blockquote:italic
                prose-code:text-emerald-600 prose-code:bg-slate-50 prose-code:rounded prose-code:px-1 prose-code:text-sm
                prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-2xl
                prose-img:rounded-2xl prose-img:shadow-md
                prose-hr:border-slate-200">
                {sections.map((section, idx) => (
                  <div key={idx} className="mb-10">
                    {section.heading && <h2 className="text-2xl font-black text-slate-900 mt-10 mb-4">{section.heading}</h2>}
                    {section.subheading && <h3 className="text-xl font-black text-slate-900 mt-8 mb-3">{section.subheading}</h3>}
                    {section.image_url && (
                      <div className="w-full h-[200px] md:h-[350px] rounded-[24px] overflow-hidden mb-6 relative">
                        <Image src={resolveImageUrl(section.image_url) || ''} alt={section.heading || 'section image'} fill className="object-cover" />
                      </div>
                    )}
                    {section.content && <MarkdownViewer content={section.content} />}
                  </div>
                ))}
              </div>

              {/* FAQs Section */}
              {faqs.length > 0 && (
                <section id="faq" className="mt-16 pt-12 border-t border-slate-150">
                  <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Frequently Asked Questions</h2>
                  <div className="space-y-6">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl">
                        <h4 className="font-extrabold text-slate-900 text-sm md:text-base mb-2">{faq.question}</h4>
                        <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-10 lg:sticky lg:top-32 h-fit">
              {/* Trending Articles */}
              <div className="bg-white border border-slate-100 rounded-[28px] p-6 shadow-sm">
                <h3 className="text-xs font-black text-slate-900 mb-6 uppercase tracking-wider border-b border-slate-50 pb-3">
                  Trending Articles
                </h3>

                <div className="space-y-6">
                  {trending.length > 0 ? (
                    trending.map((tBlog) => (
                      <Link 
                        href={`/blogs/${tBlog.slug}`} 
                        key={tBlog.slug} 
                        className="group flex gap-4 items-start"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 relative">
                          <Image 
                            src={resolveImageUrl(tBlog.featured_image) || 'https://images.unsplash.com/photo-1523050335192-ce67a276b42a?w=100'} 
                            alt={tBlog.title} 
                            fill
                            sizes="64px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs md:text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-emerald-500 transition-colors mb-1">
                            {tBlog.title}
                          </h4>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400">
                            <span>
                              {tBlog.published_at ? new Date(tBlog.published_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                              }) : 'Recent'}
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
              <CounselorWidget />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
