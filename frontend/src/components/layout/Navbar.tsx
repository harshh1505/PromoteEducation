'use client'

import { useState, useEffect } from 'react'
import { 
  Menu, X, ChevronDown, User, LogOut, 
  Trophy, GraduationCap, MessageSquare, Bell, Building2, 
  Target, FileText, Coins, Globe, ClipboardList, 
  BookOpen, Newspaper, IndianRupee, HelpCircle, 
  CheckSquare, Search, FileEdit 
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import AuthModal from '@/components/ui/AuthModal'
import CounsellingModal from '@/components/ui/CounsellingModal'

const navItems = [
  { label: 'Home', href: '/', hasMegaMenu: false },
  { label: 'Explore', href: '#', hasMegaMenu: true },
  { label: 'Tools', href: '/tools', hasDropdown: false },
  { label: 'Rankings', href: '/rankings', hasDropdown: false },
]

interface ExploreItem {
  label: string
  href: string
  icon: string
  status?: string
  badge?: string
}

interface ExploreGroup {
  title: string
  items: ExploreItem[]
}

const exploreGroups: ExploreGroup[] = [
  {
    title: 'Discover',
    items: [
      { label: 'College Rankings', href: '/rankings', icon: 'Trophy' },
      { label: 'Top Courses', href: '/courses', icon: 'GraduationCap' },
      { label: 'Read College Reviews', href: '/#reviews', icon: 'MessageSquare' },
      { label: 'Admission Alerts 2026', href: '/alerts', icon: 'Bell', status: 'New' },
      { label: 'Institute (Counselling & more)', href: '#', icon: 'Building2' },
      { label: 'College Predictor', href: '/tools', icon: 'Target' },
      { label: 'Practice Questions', href: '#', icon: 'FileText' },
      { label: 'Scholarships 2026', href: '#', icon: 'Coins' },
    ]
  },
  {
    title: 'Resources',
    items: [
      { label: 'Study Abroad', href: '#', icon: 'Globe', badge: '50% Off Visa Fees' },
      { label: 'Abroad Exams', href: '#', icon: 'ClipboardList' },
      { label: 'Entrance Exams', href: '/#exams', icon: 'BookOpen' },
      { label: 'News', href: '/news', icon: 'Newspaper' },
      { label: 'Education Loan Calculator', href: '/loan-calculator', icon: 'IndianRupee' },
      { label: 'Ask a Question', href: '#', icon: 'HelpCircle' },
      { label: 'Test Series', href: '#', icon: 'CheckSquare' },
      { label: 'Course Finder', href: '#', icon: 'Search' },
      { label: 'Articles', href: '/articles', icon: 'FileEdit' },
    ]
  }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('Explore')
  const [authVisible, setAuthVisible] = useState(false)
  const [counsellingVisible, setCounsellingVisible] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [userDropdown, setUserDropdown] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)

  const IconMap: any = {
    Trophy, GraduationCap, MessageSquare, Bell, Building2, 
    Target, FileText, Coins, Globe, ClipboardList, 
    BookOpen, Newspaper, IndianRupee, HelpCircle, 
    CheckSquare, Search, FileEdit
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)

    // Listen for auth changes
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      subscription.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUserDropdown(false)
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-0 shadow-sm bg-white/95 backdrop-blur-md border-b border-border'
        )}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-14">

            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-midnight/10 transition-transform duration-300 group-hover:scale-105">
                <img 
                  src="/images/carousel/PromoteEducationLogo.jpeg" 
                  alt="Promote Education"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col -gap-1">
                <span className="font-bold text-lg tracking-tight leading-none" style={{ color: 'var(--gold-dark)', fontFamily: 'var(--font-display)' }}>
                  Promote
                </span>
                <span className="font-bold text-lg tracking-tight leading-none" style={{ color: 'var(--action)', fontFamily: 'var(--font-display)' }}>
                  Education
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <div 
                  key={item.label}
                  className="relative h-14 flex items-center"
                  onMouseEnter={() => item.hasMegaMenu && setMegaMenuOpen(true)}
                  onMouseLeave={() => item.hasMegaMenu && setMegaMenuOpen(false)}
                >
                  <a
                    href={item.href}
                    onClick={() => setActiveItem(item.label)}
                    className={cn(
                      'nav-link-underline flex items-center gap-1 px-3 py-1.5 text-sm font-medium transition-colors duration-150',
                      activeItem === item.label
                        ? 'text-midnight active'
                        : 'text-ink-2 hover:text-midnight'
                    )}
                  >
                    {item.label}
                    {item.hasMegaMenu && (
                      <ChevronDown size={12} className={cn("opacity-60 transition-transform duration-200", megaMenuOpen && "rotate-180")} />
                    )}
                  </a>

                  {item.hasMegaMenu && megaMenuOpen && (
                    <div 
                      className="absolute top-14 left-1/2 -translate-x-1/2 w-[720px] bg-white rounded-2xl shadow-2xl border border-border p-8 grid grid-cols-2 gap-10 animate-in fade-in slide-in-from-top-2 duration-300"
                      onMouseEnter={() => setMegaMenuOpen(true)}
                    >
                      {exploreGroups.map((group) => (
                        <div key={group.title}>
                          <h4 className="text-[10px] uppercase font-bold text-ink-4 tracking-widest mb-4">
                            {group.title}
                          </h4>
                          <div className="grid gap-1">
                            {group.items.map((subItem) => {
                              const Icon = IconMap[subItem.icon]
                              return (
                                <a
                                  key={subItem.label}
                                  href={subItem.href}
                                  className="group/item flex items-center justify-between p-2 rounded-xl hover:bg-surface-2 transition-all"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-surface-2 flex items-center justify-center text-ink-3 group-hover/item:bg-midnight group-hover/item:text-gold transition-colors">
                                      {Icon && <Icon size={16} />}
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-sm font-medium text-ink-2 group-hover/item:text-ink">
                                        {subItem.label}
                                      </span>
                                      {subItem.badge && (
                                        <span className="text-[9px] font-bold text-green-600 uppercase tracking-tighter">
                                          {subItem.badge}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  {subItem.status && (
                                    <span className="text-[10px] bg-midnight text-gold px-1.5 py-0.5 rounded-full font-bold">
                                      {subItem.status}
                                    </span>
                                  )}
                                </a>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdown(!userDropdown)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-pill border transition-all border-border hover:bg-surface-2"
                    )}
                  >
                    <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold text-[10px] font-bold">
                      {user.email?.[0].toUpperCase()}
                    </div>
                    <span className={cn("text-sm text-ink-2")}>
                      {user.email?.split('@')[0]}
                    </span>
                    <ChevronDown size={14} className="text-ink-4" />
                  </button>

                  {userDropdown && (
                    <div 
                      className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-border py-1 z-[60]"
                      onMouseLeave={() => setUserDropdown(false)}
                    >
                      <div className="px-4 py-2 border-b border-border mb-1">
                        <p className="text-[10px] uppercase font-bold text-ink-4 tracking-widest">Signed in as</p>
                        <p className="text-xs font-medium text-ink truncate">{user.email}</p>
                      </div>
                      <button 
                        onClick={() => { window.location.href = '/dashboard'; setUserDropdown(false) }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-ink-2 hover:bg-surface-2 transition-colors"
                      >
                        <User size={14} /> My Dashboard
                      </button>
                      <button 
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={14} /> Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setAuthVisible(true)}
                  className={cn(
                    "text-sm transition-colors duration-150 px-2 font-medium text-ink-3 hover:text-midnight"
                  )}
                >
                  Sign in
                </button>
              )}
                <a
                  href="https://wa.me/919900116101"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-pill transition-all duration-300 hover:bg-green-50 text-green-600 border border-green-100"
                  )}
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412.001 12.045c0 2.12.554 4.189 1.602 6.04L0 24l6.105-1.602a11.832 11.832 0 005.937 1.598h.005c6.637 0 12.048-5.412 12.05-12.046a11.83 11.83 0 00-3.536-8.52z" />
                  </svg>
                  <span className="text-xs font-bold">Contact</span>
                </a>
                <button
                  onClick={() => setCounsellingVisible(true)}
                  className="text-sm font-bold px-5 py-2 rounded-pill transition-all duration-300 hover:brightness-105 active:scale-95 shadow-lg shadow-gold/20"
                  style={{
                    background: 'var(--gold)',
                    color: '#fff',
                  }}
                >
                  Get counselling
                </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              className={cn(
                "md:hidden p-1 transition-colors",
                scrolled ? "text-ink" : "text-white/70"
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="md:hidden border-t"
            style={{ background: 'var(--midnight-2)', borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {user && (
                <div className="flex items-center gap-3 py-3 mb-2 border-b border-white/5">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm font-bold">
                    {user.email?.[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">{user.email?.split('@')[0]}</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">Active Student</p>
                  </div>
                </div>
              )}
              {navItems.map((item) => (
                <div key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => { setActiveItem(item.label); !item.hasMegaMenu && setMobileOpen(false) }}
                    className="flex items-center justify-between text-white/70 hover:text-white py-2.5 text-sm border-b border-white/5 last:border-0"
                  >
                    {item.label}
                    {item.hasMegaMenu && <ChevronDown size={14} />}
                  </a>
                  
                  {item.hasMegaMenu && (
                    <div className="pl-4 py-2 space-y-6">
                      {exploreGroups.map(group => (
                        <div key={group.title}>
                          <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest mb-3">{group.title}</p>
                          <div className="grid gap-4">
                            {group.items.map(subItem => {
                              const Icon = IconMap[subItem.icon]
                              return (
                                <a 
                                  key={subItem.label} 
                                  href={subItem.href} 
                                  onClick={() => setMobileOpen(false)}
                                  className="flex items-center gap-3"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gold">
                                    {Icon && <Icon size={14} />}
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm text-white/80">{subItem.label}</span>
                                    {subItem.badge && <span className="text-[9px] text-gold font-bold">{subItem.badge}</span>}
                                  </div>
                                </a>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {!user && (
                <button
                  onClick={() => { setAuthVisible(true); setMobileOpen(false) }}
                  className="mt-4 w-full py-2.5 rounded-pill text-sm font-medium text-white border border-white/20 hover:bg-white/5"
                >
                  Sign in
                </button>
              )}
              <button
                onClick={() => { setCounsellingVisible(true); setMobileOpen(false) }}
                className="mt-2 w-full py-2.5 rounded-pill text-sm font-medium transition-all duration-150"
                style={{ background: 'var(--gold)', color: 'var(--midnight)', borderRadius: '999px' }}
              >
                Get counselling
              </button>
              {user && (
                <button 
                  onClick={handleSignOut}
                  className="mt-4 w-full py-2.5 text-sm font-medium text-red-400 border border-red-400/20 rounded-pill"
                >
                  Sign out
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      <CounsellingModal isOpen={counsellingVisible} onClose={() => setCounsellingVisible(false)} />
      <AuthModal isOpen={authVisible} onClose={() => setAuthVisible(false)} />
    </>
  )
}
