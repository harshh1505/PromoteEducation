'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Newspaper, Calendar, ArrowRight, TrendingUp, Bell } from 'lucide-react'

export default function NewsPageContent() {
  const articles = [
    {
      title: "JEE Main 2024 Session 2 Results Declared: Top Rankers and Cut-off Analysis",
      category: "Exam News",
      date: "Apr 19, 2024",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60"
    },
    {
      title: "New IIM to be established in Odisha: Human Resource Ministry announces budget",
      category: "Policy",
      date: "Apr 18, 2024",
      image: "https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?w=800&auto=format&fit=crop&q=60"
    },
    {
      title: "How Al is changing the scope of Engineering and Management education in 2024",
      category: "Analysis",
      date: "Apr 17, 2024",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=60"
    },
    {
      title: "BITSAT 2024 Registration Extended: Here is everything you need to know",
      category: "Admission",
      date: "Apr 16, 2024",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-32 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Newspaper size={20} className="text-gold" />
              <span className="text-xs font-bold uppercase tracking-widest text-gold-dark">Education Bulletin</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-medium text-ink tracking-tight mb-4">
              Stay ahead with <span className="text-gold-dark italic">real-time</span> news.
            </h1>
            <p className="text-lg text-ink-3 leading-relaxed">
              Latest updates on entrance exams, admission cycles, and policy changes in the Indian education sector.
            </p>
          </div>
          <button className="flex items-center gap-3 px-6 py-3 bg-midnight text-white rounded-pill hover:brightness-125 transition-all self-start md:self-center">
             <Bell size={18} className="text-gold" />
             Subscribe to Alerts
          </button>
        </div>

        {/* Trending grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
           {/* Featured News */}
           <div className="relative h-[500px] rounded-[40px] overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1523050335192-ce67a276b42a?w=1200&auto=format&fit=crop&q=60" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Featured"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-10">
                 <span className="inline-block px-3 py-1 bg-gold text-midnight text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
                    Latest Headline
                 </span>
                 <h2 className="text-3xl font-medium text-white mb-4 pr-12">
                   UGC releases new list of accredited online degree programs for 2024-25.
                 </h2>
                 <div className="flex items-center gap-4 text-xs text-white/60">
                   <span className="flex items-center gap-1.5"><Calendar size={14} /> Apr 20, 2024</span>
                   <span className="flex items-center gap-1.5"><TrendingUp size={14} /> 2.4k Reads</span>
                 </div>
              </div>
           </div>

           {/* List of sub news */}
           <div className="space-y-6">
              {articles.map((article) => (
                <div key={article.title} className="group flex gap-6 p-4 rounded-3xl bg-white border border-border hover:shadow-xl transition-all cursor-pointer">
                   <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                      <img src={article.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="News" />
                   </div>
                   <div className="flex flex-col justify-center">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gold-dark mb-2">{article.category}</span>
                      <h3 className="text-lg font-medium text-ink mb-2 leading-snug group-hover:text-action transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-xs text-ink-4 flex items-center gap-1.5"><Calendar size={12} /> {article.date}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
           {[1,2,3].map(i => (
             <div key={i} className="p-6 rounded-3xl border border-border bg-white group hover:border-gold transition-colors">
                <div className="w-full aspect-video rounded-2xl bg-surface-2 mb-6 overflow-hidden">
                   <img src={`https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?w=400&u=${i}`} className="w-full h-full object-cover" alt="Article" />
                </div>
                <h4 className="font-medium text-ink mb-3 leading-tight">Navigating the choice between Tier-1 Engineering and Tier-2 Management...</h4>
                <button className="flex items-center gap-1.5 text-xs font-bold text-action hover:gap-3 transition-all">
                   Read Full Story <ArrowRight size={14} />
                </button>
             </div>
           ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
