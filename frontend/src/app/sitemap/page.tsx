'use client'

import React from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { 
  ChevronRight, Map, BookOpen, GraduationCap, 
  ShieldCheck, HelpCircle, FileText, Globe, 
  TrendingUp, Layout, Briefcase, HeartPulse,
  Stethoscope, Code, FlaskConical
} from 'lucide-react'

interface SitemapLink {
  label: string
  href: string
  icon?: React.ElementType
}

interface SitemapSection {
  title: string
  icon: React.ElementType
  links: SitemapLink[]
}

const SITEMAP_DATA: SitemapSection[] = [
  {
    title: 'Core Platform',
    icon: Layout,
    links: [
      { label: 'Homepage', href: '/' },
      { label: 'College Rankings', href: '/rankings' },
      { label: 'Education News', href: '/news' },
      { label: 'Student Tools', href: '/tools' },
      { label: 'Education Loan Calculator', href: '/loan-calculator' },
    ]
  },
  {
    title: 'Knowledge Hubs',
    icon: BookOpen,
    links: [
      { label: 'Course Directory', href: '/courses', icon: Globe },
      { label: 'B.Tech & Engineering', href: '/courses/btech', icon: Code },
      { label: 'MBA & Management', href: '/courses/mba', icon: Briefcase },
      { label: 'M.Tech & PG Engg', href: '/courses/mtech', icon: GraduationCap },
      { label: 'MBBS & Medical', href: '/courses/mbbs', icon: Stethoscope },
      { label: 'BDS & Dental', href: '/courses/bds', icon: FlaskConical },
      { label: 'B.Sc Nursing', href: '/courses/bsc-nursing', icon: HeartPulse },
    ]
  },
  {
    title: 'Support & Info',
    icon: HelpCircle,
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact Support', href: '/contact-us' },
      { label: 'Frequently Asked Questions', href: '/faq' },
    ]
  },
  {
    title: 'Legal & Compliance',
    icon: ShieldCheck,
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Use', href: '/terms-of-use' },
      { label: 'Disclaimer', href: '/disclaimer' },
      { label: 'Cookie Policy', href: '/cookie-policy' },
    ]
  }
]

export default function SitemapPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "'DM Sans', sans-serif" }}>
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');
        .font-display { font-family: 'Playfair Display', Georgia, serif; }
        .sitemap-card { transition: all 0.3s ease; }
        .sitemap-card:hover { transform: translateY(-4px); }
        .sitemap-link { transition: all 0.2s ease; }
        .sitemap-link:hover { color: #0ea5e9; padding-left: 4px; }
        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }
        `
      }} />

      <Navbar />

      {/* Hero */}
      <section style={{ padding: '160px 0 60px', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: 'white' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '99px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)', marginBottom: '24px' }}>
            <Map size={14} style={{ color: '#38bdf8' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#38bdf8', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Navigation Directory
            </span>
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(40px, 6vw, 64px)', marginBottom: '20px' }}>
            Website Sitemap
          </h1>
          <p style={{ fontSize: '17px', color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
            A comprehensive overview of our platform's structure and resources to help you find exactly what you need.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: '80px 0 120px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '32px' }}>
            {SITEMAP_DATA.map((section, idx) => (
              <div key={idx} className="sitemap-card" style={{ 
                background: 'white', 
                padding: '32px', 
                borderRadius: '24px', 
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ 
                    width: '40px', height: '40px', borderRadius: '12px', 
                    background: '#f1f5f9', display: 'flex', alignItems: 'center', 
                    justifyContent: 'center', color: '#0f172a' 
                  }}>
                    {(() => {
                      const SectionIcon = section.icon
                      return <SectionIcon size={20} />
                    })()}
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>{section.title}</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {section.links.map((link, lIdx) => {
                    const IconComponent = link.icon
                    return (
                      <Link key={lIdx} href={link.href} className="sitemap-link" style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        fontSize: '14px', 
                        color: '#64748b',
                        textDecoration: 'none',
                        fontWeight: 500
                      }}>
                        <ChevronRight size={14} style={{ color: '#cbd5e1' }} />
                        {IconComponent && <IconComponent size={12} style={{ color: '#94a3b8' }} />}
                        {link.label}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
