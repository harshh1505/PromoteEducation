'use client'

import React from 'react'
import { ArrowRight, MessageSquare, Share2, Eye, ChevronRight } from 'lucide-react'

const newsItems = [
  {
    isLive: true,
    title: 'JEE Mains 2026 Result (Today) LIVE: Final Answer Key OUT; NTA Session 2 Scorecard Link Soon @...',
    excerpt: 'JEE Mains 2026 session 2 final answer key is out. JEE Mains 2026 result for the session 2 exam will be out anytime soon, TODAY, Ap...',
    author: 'Mamona Majumder',
    date: 'Apr 20, 2026',
    comments: '1',
    shares: '7',
    image: 'https://images.unsplash.com/photo-1523050335102-c89b1811b128?w=400&auto=format&fit=crop&q=80'
  },
  {
    isLive: false,
    title: 'XLRI Results 2026 Soon at xlri.ac.in: XAT Qualifiers wait for Final Admission Calls',
    excerpt: 'XLRI will soon release final merit lists for admission to Jamshedpur and Delhi campuses. In the last admission cycle, XLRI released th...',
    author: 'Abhishek Dhawan',
    date: 'Apr 20, 2026',
    views: '1.2k',
    image: 'https://images.unsplash.com/photo-1560523160-754a9e25c68f?w=400&auto=format&fit=crop&q=80'
  },
  {
    isLive: true,
    title: 'ICSE, ISC Results 2026 @results.cisce.org Live Updates: Check Expected CISCE Results Date & Time',
    excerpt: 'ISC, ICSE results 2026 will be announced soon at cisce.org and results.cisce.org. Students can check results by logging with the...',
    author: 'Anangsha Patra',
    date: 'Apr 20, 2026',
    comments: '4',
    shares: '113',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&auto=format&fit=crop&q=80'
  },
  {
    isLive: true,
    title: 'NCHMCT JEE 2026 Admit Card Live: Steps to Download Hall Ticket, Link at nchmjee.nta.nic.in; Check...',
    excerpt: 'NCHMCT JEE admit card expected to be out by tomorrow morning. Candidates can download their hall tickets from the official websit...',
    author: 'Porishmita Paul',
    date: 'Apr 20, 2026',
    views: '840',
    image: 'https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?w=400&auto=format&fit=crop&q=80'
  },
  {
    isLive: false,
    title: 'Chef Salary in India 2025: Average Pay, Growth, and Top Hotel Packages',
    excerpt: 'The food and hospitality industry in India has seen big growth in recent years. Starting from luxury bars, family restaurants, to smal...',
    author: 'Porishmita Paul',
    date: 'Apr 20, 2026',
    views: '940',
    image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&auto=format&fit=crop&q=80'
  },
  {
    isLive: true,
    title: 'KEA PGCET 2026 Application Last Date (TODAY) LIVE; Register at cetonline.karnataka.gov.in',
    excerpt: 'Karnataka Examinations Authority will close PGCET 2026 registration window today, April 20. Candidates who are yet to fill...',
    author: 'Abhishek Dhawan',
    date: 'Apr 20, 2026',
    views: '2.1k',
    image: 'https://images.unsplash.com/photo-1576491192842-73def8850656?w=400&auto=format&fit=crop&q=80'
  }
]

export default function NewsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <h2 className="text-2xl font-bold text-ink mb-10 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          Latest News & Articles
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-12">
          {newsItems.map((item, idx) => (
            <div key={idx} className="flex gap-6 group cursor-pointer hover:bg-slate-50/50 p-2 rounded-2xl transition-all">
              <div className="flex-1 min-w-0">
                 <div className="flex items-start gap-2 mb-2">
                   {item.isLive && (
                     <span className="flex items-center gap-1 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md mt-0.5 animate-pulse">
                       <span className="w-1.5 h-1.5 bg-white rounded-full" /> LIVE
                     </span>
                   )}
                   <h3 className="text-sm md:text-base font-bold text-ink leading-snug group-hover:text-action transition-colors line-clamp-2">
                     {item.title}
                   </h3>
                 </div>
                 
                 <p className="text-xs text-ink-3 line-clamp-2 mb-3 leading-relaxed font-light">
                   {item.excerpt}
                 </p>

                 <div className="flex items-center gap-2 text-[10px] text-ink-4">
                   <span className="font-bold text-ink-2">{item.author}</span>
                   <span className="opacity-40">•</span>
                   <span>{item.date}</span>
                 </div>

                 <div className="flex items-center gap-4 mt-2 text-[10px] text-ink-4 font-bold uppercase tracking-wider">
                   {item.comments && (
                     <div className="flex items-center gap-1">
                       <MessageSquare size={12} className="text-action" /> {item.comments} Comments
                     </div>
                   )}
                   {item.shares && (
                     <div className="flex items-center gap-1">
                       <Share2 size={12} className="text-action" /> {item.shares} Shares
                     </div>
                   )}
                   {item.views && (
                     <div className="flex items-center gap-1">
                       <Eye size={12} className="text-action" /> {item.views} Views
                     </div>
                   )}
                 </div>
              </div>

              <div className="flex-shrink-0 w-20 h-20 md:w-28 md:h-20 rounded-xl overflow-hidden shadow-sm">
                <img 
                  src={item.image} 
                  alt="" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
           <button className="flex items-center gap-2 px-8 py-2.5 border border-action/30 rounded-lg text-action text-sm font-bold hover:bg-action hover:text-white transition-all group">
             View All Updates <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
           </button>
        </div>

      </div>
    </section>
  )
}
