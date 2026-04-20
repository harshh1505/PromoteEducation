'use client'

import Navbar from './Navbar'
import Footer from './Footer'

interface LegalPageLayoutProps {
  title: string
  lastUpdated: string
  children: React.ReactNode
}

export default function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 pt-32 pb-20">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-gold" />
            <span className="text-xs font-bold uppercase tracking-widest text-gold-dark">Legal & Compliance</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-medium text-ink tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-sm text-ink-3 italic">
            Last Updated: {lastUpdated}
          </p>
        </div>

        <div className="prose prose-sm max-w-none prose-headings:font-medium prose-headings:text-ink prose-p:text-ink-2 prose-li:text-ink-2 prose-strong:text-ink">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  )
}
