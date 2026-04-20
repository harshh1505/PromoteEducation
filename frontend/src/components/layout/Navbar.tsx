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
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'border-b border-white/8 py-0' : 'border-b border-transparent py-2'
        )}
        style={{ background: 'var(--midnight)' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-14">

            {/* Logo */}
            <a href="/" className="flex items-center gap-2 group">
              <div
                className="w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-125"
                style={{ background: 'var(--gold)' }}
              />
              <span
                className="text-white font-medium text-base tracking-snug"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
              >
                Promote Education
              </span>
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
                      'nav-link-underline flex items-center gap-1 px-3 py-1.5 text-sm transition-colors duration-150',
                      activeItem === item.label
                        ? 'text-white active'
                        : 'text-white/55 hover:text-white/90'
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
                    className="flex items-center gap-2 px-3 py-1.5 rounded-pill border border-white/10 hover:bg-white/5 transition-all"
                  >
                    <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold text-[10px] font-bold">
                      {user.email?.[0].toUpperCase()}
                    </div>
                    <span className="text-sm text-white/80">{user.email?.split('@')[0]}</span>
                    <ChevronDown size={14} className="text-white/40" />
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
                  className="text-sm text-white/55 hover:text-white transition-colors duration-150 px-2"
                >
                  Sign in
                </button>
              )}
              <button
                onClick={() => setCounsellingVisible(true)}
                className="text-sm font-medium px-4 py-1.5 rounded-pill transition-all duration-150 hover:brightness-110 active:scale-95 shadow-lg shadow-gold/10"
                style={{
                  background: 'var(--gold)',
                  color: 'var(--midnight)',
                  borderRadius: '999px',
                }}
              >
                Get counselling
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-white/70 hover:text-white p-1"
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
