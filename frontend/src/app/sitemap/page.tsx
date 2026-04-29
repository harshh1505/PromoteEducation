import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { 
  ChevronRight, Map, BookOpen, GraduationCap, 
  ShieldCheck, HelpCircle, FileText, Globe, 
  TrendingUp, Layout, Briefcase, HeartPulse,
  Stethoscope, Code, FlaskConical, Sparkles,
  Search, Users, Compass, Shield, Target,
  MessageSquare, FileSearch, PieChart, Activity
} from 'lucide-react'

// ─────────────────────────────────────────────
// SEO METADATA
// ─────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Website Sitemap | Promote Education Navigation Directory',
  description:
    'Comprehensive website map of Promote Education. Easily navigate through our admission support, mentorship, counselling, rankings, and exam guides.',
  keywords: ['sitemap', 'website map', 'promote education directory', 'navigation guide'],
  openGraph: {
    title: 'Website Sitemap | Promote Education',
    description: 'Find every page on Promote Education—from admission aid to career mentorship.',
    type: 'website',
  }
}

// ─────────────────────────────────────────────
// SITEMAP DATA
// ─────────────────────────────────────────────
const SITEMAP_DATA = [
  {
    title: 'Professional Services',
    icon: Sparkles,
    color: 'text-sky-500',
    links: [
      { label: 'Admission Support', href: '/admission-support' },
      { label: 'Counselling Strategy', href: '/counseling' },
      { label: 'Career Mentorship', href: '/mentorship' },
      { label: 'College Selection', href: '/selection' },
      { label: 'Expert Consultation', href: '/consultation' },
      { label: 'Scholarship Guide', href: '/scholarships' },
    ]
  },
  {
    title: 'Knowledge Centers',
    icon: BookOpen,
    color: 'text-indigo-500',
    links: [
      { label: 'All Courses', href: '/courses' },
      { label: 'B.Tech Engineering', href: '/courses/btech' },
      { label: 'MBBS Medical', href: '/courses/mbbs' },
      { label: 'MBA Management', href: '/courses/mba' },
      { label: 'M.Tech PG Engineering', href: '/courses/mtech' },
      { label: 'BDS Dental', href: '/courses/bds' },
      { label: 'B.Sc Nursing', href: '/courses/bsc-nursing' },
    ]
  },
  {
    title: 'Entrance Exams',
    icon: Target,
    color: 'text-rose-500',
    links: [
      { label: 'JEE Main 2026', href: '/exams/jee-main' },
      { label: 'JEE Advanced', href: '/exams/jee-advanced' },
      { label: 'NEET UG 2026', href: '/exams/neet-ug' },
      { label: 'CUET UG', href: '/exams/cuet-ug' },
      { label: 'WBJEE Portal', href: '/exams/wbjee' },
      { label: 'COMEDK & KCET', href: '/exams/comedk' },
      { label: 'TNEA Counseling', href: '/exams/tnea' },
    ]
  },
  {
    title: 'College Directories',
    icon: GraduationCap,
    color: 'text-emerald-500',
    links: [
      { label: 'Top Engineering Colleges', href: '/colleges/engineering' },
      { label: 'Top Medical Colleges', href: '/colleges/medical' },
      { label: 'Top MBA Institutions', href: '/colleges/management' },
      { label: 'Top Private Universities', href: '/colleges/private' },
      { label: 'Deemed Universities', href: '/colleges/deemed' },
      { label: 'NIRF 2026 Rankings', href: '/rankings' },
    ]
  },
  {
    title: 'Platform & Tools',
    icon: Activity,
    color: 'text-amber-500',
    links: [
      { label: 'College Predictor', href: '/tools/college-predictor' },
      { label: 'Loan Calculator', href: '/loan-calculator' },
      { label: 'Education News', href: '/news' },
      { label: 'Latest Articles', href: '/articles' },
      { label: 'Student Testimonials', href: '/reviews' },
      { label: 'Compare Colleges', href: '/compare' },
    ]
  },
  {
    title: 'Company',
    icon: Users,
    color: 'text-slate-500',
    links: [
      { label: 'About Promote Education', href: '/about' },
      { label: 'Contact Support', href: '/contact' },
      { label: 'Help Center (FAQ)', href: '/faq' },
      { label: 'Join as Mentor', href: '/careers/mentor' },
      { label: 'Media & Press', href: '/press' },
    ]
  },
  {
    title: 'Legal & Compliance',
    icon: ShieldCheck,
    color: 'text-slate-400',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Use', href: '/terms-of-use' },
      { label: 'Disclaimer', href: '/disclaimer' },
      { label: 'Cookie Policy', href: '/cookie-policy' },
      { label: 'Refund Policy', href: '/refund-policy' },
    ]
  }
]

// ─────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────
export default function SitemapPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      {/* ── HERO ── */}
      <header className="pt-32 pb-20 border-b border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 text-sky-700 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-sm mb-6">
            <Map size={12} className="text-sky-500" />
            Platform Directory · Sitemap v2.0
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1] mb-6">
            Navigate Your <br />
            <span className="text-sky-500 italic">Ambition</span>
          </h1>

          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto font-medium">
            Explore our comprehensive directory of admission services, exam guides, and university resources designed to simplify your educational journey.
          </p>
        </div>
      </header>

      <main className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {SITEMAP_DATA.map((section, idx) => (
              <section key={idx} className="flex flex-col">
                <header className="flex items-center gap-3 mb-8">
                  <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center ${section.color} shadow-sm border border-slate-100`}>
                    <section.icon size={20} />
                  </div>
                  <h2 className="text-lg font-black text-slate-900">{section.title}</h2>
                </header>

                <nav className="flex flex-col gap-4">
                  {section.links.map((link, lIdx) => (
                    <Link
                      key={lIdx}
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-slate-500 hover:text-sky-500 font-medium transition-colors"
                    >
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-sky-500 transition-colors" />
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </section>
            ))}
          </div>

          {/* ── FOOTER SEARCH ── */}
          <div className="mt-24 pt-16 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-md">
              <h3 className="text-2xl font-black text-slate-900 mb-3">Can't find something?</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                Our global helpdesk is active 24/7. Speak to a counselor or search our knowledge base for specific institution data.
              </p>
            </div>
            <div className="flex gap-4">
              <Link 
                href="/contact" 
                className="px-8 py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-full hover:bg-slate-800 transition-all"
              >
                Contact Support
              </Link>
              <Link 
                href="/faq" 
                className="px-8 py-4 bg-white border border-slate-200 text-slate-900 font-black text-xs uppercase tracking-widest rounded-full hover:bg-slate-50 transition-all"
              >
                Read FAQs
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
