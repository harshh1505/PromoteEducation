import dynamic from 'next/dynamic'

export const runtime = 'edge'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowLeft, Share2, Clock, Calendar, Bookmark, ChevronRight, CheckCircle2, Target, BookOpen, ScrollText, Zap } from 'lucide-react'
import { articleDatabase } from '@/data/articleDatabase'
import { examDatabase } from '@/data/examDatabase'
import MarkdownViewer from '@/components/ui/MarkdownViewer'





export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const dbArticle = articleDatabase[slug]
  const examKey = Object.keys(examDatabase).find(key => slug.startsWith(key))
  const exam = examKey ? examDatabase[examKey] : null
  
  const title = dbArticle?.title || slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  const examTitle = exam?.title || 'Entrance Exams'

  return {
    title: `${title} | ${examTitle} Guide 2026`,
    description: `Complete guide to ${title} for 2026. Get expert tips, eligibility criteria, and preparation strategies for ${examTitle} aspirants.`,
    keywords: [examTitle, slug, 'admission 2026', 'exam preparation', 'syllabus'],
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const dbArticle = articleDatabase[slug]
  
  // Try to find the associated exam by matching the slug prefix
  // e.g. "jee-main-eligibility" matches "jee-main"
  const examKey = Object.keys(examDatabase).find(key => slug.startsWith(key))
  const exam = examKey ? examDatabase[examKey] : null

  // Fallback for non-existent DB entries
  const title = dbArticle?.title || slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  const category = dbArticle?.category || (slug.includes('eligibility') ? 'Eligibility' : slug.includes('syllabus') ? 'Syllabus' : slug.includes('pattern') ? 'Exam Pattern' : 'Guide')
  const readTime = dbArticle?.readTime || '8 min read'
  const summary = dbArticle?.summary || (exam ? `A detailed deep-dive into ${title} for the 2026 academic session. Verified by our editorial team for ${exam.title} aspirants.` : `This comprehensive guide covers everything you need to know about ${title}. Our experts have analyzed the latest notification to provide you with the most accurate information.`)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <Link href={exam ? `/exams/${exam.slug}` : "/exams"} className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-900 transition-all mb-10 uppercase tracking-widest">
            <ArrowLeft size={14} /> Back to {exam ? exam.title : 'Exams'}
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-md">
                {category}
              </span>
              <div className="flex items-center gap-2 text-slate-400 text-[11px] font-medium">
                <Calendar size={12} /> {dbArticle?.lastUpdated || 'April 25, 2026'}
                <span className="w-1 h-1 rounded-full bg-slate-200" />
                <Clock size={12} /> {readTime}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-8">
              {title}
            </h1>

            <div className="flex items-center justify-between py-6 border-y border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white text-xs font-bold">
                  PE
                </div>
                <div>
                  <div className="text-sm font-black text-slate-900">Promote Education Editorial</div>
                  <div className="text-[11px] text-slate-400 font-medium">Verified by Academic Experts</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2.5 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all border border-transparent hover:border-slate-100">
                  <Share2 size={18} />
                </button>
                <button className="p-2.5 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all border border-transparent hover:border-slate-100">
                  <Bookmark size={18} />
                </button>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <article className="prose prose-slate max-w-none">
            <div className="bg-slate-50 rounded-3xl p-8 mb-12 border border-slate-100">
              <h3 className="text-lg font-black text-slate-900 mb-4 mt-0">Executive Summary</h3>
              <p className="text-slate-600 text-[15px] leading-relaxed mb-0">
                {summary}
              </p>
            </div>

            {dbArticle ? (
              dbArticle.sections.map((section, idx) => (
                <div key={idx} className="mb-12">
                  <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">{section.title}</h2>
                  <div className="prose prose-slate prose-base max-w-none
                    prose-p:text-slate-600 prose-p:leading-relaxed
                    prose-headings:font-black prose-headings:text-slate-900
                    prose-a:text-[#38b6ff] prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-slate-800
                    prose-ul:text-slate-600 prose-ol:text-slate-600
                    prose-li:my-1
                    prose-blockquote:border-l-[#38b6ff] prose-blockquote:text-slate-500 prose-blockquote:italic
                    prose-code:text-[#38b6ff] prose-code:bg-slate-100 prose-code:rounded prose-code:px-1 prose-code:before:content-none prose-code:after:content-none
                    prose-table:w-full prose-table:border-collapse prose-table:my-8
                    prose-th:bg-slate-50 prose-th:text-left prose-th:font-black prose-th:text-slate-900 prose-th:p-4 prose-th:border prose-th:border-slate-200 prose-th:uppercase prose-th:tracking-wider prose-th:text-xs
                    prose-td:p-4 prose-td:border prose-td:border-slate-200 prose-td:text-slate-600 prose-td:text-sm">
                    {typeof section.content === 'string' ? (
                      <MarkdownViewer content={section.content} />
                    ) : (
                      section.content
                    )}
                  </div>
                </div>
              ))
            ) : exam ? (
              <>
                {/* Smart Template Logic based on Slug */}
                {/* Smart Template Logic based on Slug */}
                {slug.includes('eligibility') && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Detailed Eligibility Requirements</h2>
                        <div className="space-y-4">
                            {exam.eligibility.map((item, i) => (
                                <div key={i} className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 hover:border-sky-200 transition-all">
                                    <CheckCircle2 size={20} className="text-sky-500 shrink-0 mt-0.5" />
                                    <p className="text-[15px] text-slate-600 leading-relaxed mb-0">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {slug.includes('syllabus') && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Full Subject-wise Syllabus</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {exam.syllabus.map((s, i) => (
                                <div key={i} className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                                    <div className="flex items-center gap-2 mb-4 text-sky-600 font-black uppercase tracking-widest text-xs">
                                        <BookOpen size={16} /> {s.subject}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {s.topics.map((t, j) => (
                                            <span key={j} className="text-[11px] font-bold px-2.5 py-1 bg-white border border-slate-200 rounded-md text-slate-500 uppercase tracking-tighter">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {slug.includes('pattern') && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Exam Pattern Analysis</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: Target, label: 'Total Marks', value: exam.totalMarks },
                                { icon: Clock, label: 'Time Duration', value: exam.duration },
                                { icon: ScrollText, label: 'Exam Mode', value: exam.mode },
                                { icon: Zap, label: 'Frequency', value: exam.frequency },
                            ].map(item => (
                                <div key={item.label} className="p-6 rounded-3xl border border-slate-100 bg-white">
                                    <item.icon size={20} className="text-slate-300 mb-3" />
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</div>
                                    <div className="text-sm font-black text-slate-900">{item.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {slug.includes('books') && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Recommended Resources</h2>
                        <p className="text-slate-600 mb-6">Our academic council recommends the following standard textbooks for {exam.title} preparation:</p>
                        <div className="space-y-3">
                            {['Standard Reference Textbook (Volume 1)', 'Problem Solving Manual by Editorial Board', 'Previous Year Questions (PYQ) Archive'].map(book => (
                                <div key={book} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                                    <span className="text-sm font-bold text-slate-800">{book}</span>
                                    <span className="text-[10px] font-black text-sky-600 uppercase tracking-widest">Recommended</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mb-12">
                    <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Strategic Preparation</h2>
                    <p className="text-slate-600 leading-relaxed text-[16px] mb-8">
                        The key to cracking {exam.title} is consistency and high-yield topic prioritization. 
                        We recommend focusing on the following core tips provided by toppers:
                    </p>
                    <div className="space-y-4">
                        {exam.preparationTips.slice(0, 3).map((tip, i) => (
                            <div key={i} className="p-5 rounded-2xl bg-white border border-slate-100 italic text-slate-500 text-sm">
                                "{tip}"
                            </div>
                        ))}
                    </div>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Introduction</h2>
                <p className="text-slate-600 leading-relaxed text-[16px] mb-8">
                  The {title} remains one of the most significant milestones for students across India. 
                  As competition intensifies, a thorough understanding of the examination landscape is not 
                  just helpful—it's essential for success.
                </p>

                <div className="my-12 p-10 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-4">Strategic Tip</h3>
                        <p className="text-slate-300 text-sm leading-relaxed mb-0">
                            Most successful candidates spend 60% of their time on high-weightage chapters 
                            identified in our detailed analysis. Don't just study hard; study smart.
                        </p>
                    </div>
                </div>
              </>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
                <Link href={exam ? `/exams/${exam.slug}` : "/exams"} className="p-6 rounded-3xl border border-slate-200 hover:border-slate-900 transition-all group">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Previous Chapter</div>
                    <div className="text-sm font-black text-slate-900 flex items-center justify-between">
                        Exam Overview <ArrowLeft size={16} className="text-slate-300 group-hover:text-slate-900" />
                    </div>
                </Link>
                <button className="p-6 rounded-3xl border border-slate-200 hover:border-slate-900 transition-all group text-right">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Social</div>
                    <div className="text-sm font-black text-slate-900 flex items-center justify-between flex-row-reverse">
                        Share Guide <Share2 size={16} className="text-slate-300 group-hover:text-slate-900" />
                    </div>
                </button>
            </div>
          </article>

          {/* Newsletter / CTA */}
          <section className="mt-20 pt-20 border-t border-slate-100 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Never miss an update</h2>
            <p className="text-sm text-slate-500 mb-10 max-w-md mx-auto">
              Get the latest exam notifications, admission alerts, and expert guides directly in your inbox.
            </p>
            <div className="flex max-w-md mx-auto gap-2">
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 px-6 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                />
                <button className="px-8 py-3.5 bg-slate-900 text-white text-sm font-bold rounded-2xl hover:bg-slate-800 transition-all">
                    Join Now
                </button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
