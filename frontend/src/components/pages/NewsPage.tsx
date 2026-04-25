'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Newspaper, Calendar, ArrowRight, TrendingUp, Bell, MessageSquare, Share2, Eye } from 'lucide-react'
import { newsItems } from '@/components/sections/NewsSection'

export default function NewsPageContent() {
  // Use newsItems from NewsSection
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
           <div className="relative h-[500px] rounded-[40px] overflow-hidden shadow-2xl border border-slate-100 group">
              <img 
                src="https://images.unsplash.com/photo-1523050335192-ce67a276b42a?w=1200&auto=format&fit=crop&q=60" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Featured"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-10 z-10">
                 <span className="inline-block px-4 py-2 bg-sky-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-4 shadow-lg shadow-sky-500/20">
                    Latest Headline
                 </span>
                 <h2 className="text-3xl font-bold text-white mb-4 pr-12 leading-tight">
                   UGC releases new list of accredited online degree programs for 2024-25.
                 </h2>
                 <div className="flex items-center gap-4 text-xs font-bold text-slate-300 uppercase tracking-wider">
                   <span className="flex items-center gap-1.5"><Calendar size={14} className="text-sky-400" /> Apr 20, 2024</span>
                   <span className="flex items-center gap-1.5"><TrendingUp size={14} className="text-sky-400" /> 2.4k Reads</span>
                 </div>
              </div>
           </div>

           {/* List of sub news */}
           <div className="space-y-6">
              {newsItems.map((article, idx) => (
                <div key={idx} className="group flex gap-6 p-4 rounded-3xl bg-white border border-slate-100 hover:shadow-xl shadow-slate-900/5 transition-all cursor-pointer">
                   <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 relative shadow-sm">
                      {article.isLive && (
                        <span className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md animate-pulse shadow-md">
                          <span className="w-1.5 h-1.5 bg-white rounded-full" /> LIVE
                        </span>
                      )}
                      <img src={article.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="News" />
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
                </div>
              ))}
           </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
           {[1,2,3].map(i => (
             <div key={i} className="p-6 rounded-3xl border border-slate-100 bg-white group hover:border-sky-200 hover:shadow-xl shadow-slate-900/5 transition-all">
                <div className="w-full aspect-video rounded-2xl bg-slate-50 mb-6 overflow-hidden shadow-sm">
                   <img src={`https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?w=400&u=${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Article" />
                </div>
                <h4 className="font-bold text-slate-900 mb-4 leading-tight group-hover:text-sky-600 transition-colors">Navigating the choice between Tier-1 Engineering and Tier-2 Management...</h4>
                <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-sky-500 group-hover:gap-3 transition-all">
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
