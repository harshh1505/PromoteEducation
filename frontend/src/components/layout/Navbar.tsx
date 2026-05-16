'use client'

import { useState, useEffect } from 'react'
import {
  Menu, X, ChevronDown, ChevronRight, ArrowRight, User, LogOut,
  Trophy, GraduationCap, MessageSquare, Bell, Building2,
  Target, FileText, Coins, Globe, ClipboardList,
  BookOpen, Newspaper, IndianRupee, HelpCircle,
  CheckSquare, Search, FileEdit, BarChart3,
  Compass, Users, ShieldCheck, Video, Clock
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import AuthModal from '@/components/ui/AuthModal'
import CounsellingModal from '@/components/ui/CounsellingModal'
import GoalModal from '@/components/ui/GoalModal'

const navItems = [
  { label: 'Home', href: '/', hasMegaMenu: false },
  { label: 'Explore', href: '#', hasMegaMenu: true },
  { label: 'Tools', href: '/tools', hasDropdown: false },
  { label: 'Exams', href: '/exams', hasDropdown: false },
  { label: 'Rankings', href: '/rankings', hasDropdown: false },
  { label: 'About Us', href: '/about', hasDropdown: false },
  // { label: 'FAQ', href: '/faq', hasDropdown: false },
]

const topCategories = [
  { label: 'All Courses', href: '/courses' },
  { label: 'B.Tech', href: '/courses/btech' },
  { label: 'MBA', href: '/courses/mba' },
  { label: 'M.Tech', href: '/courses/mtech' },
  { label: 'MBBS', href: '/courses/mbbs' },
  { label: 'BDS', href: '/courses/bds' },
  { label: 'B.Sc Nursing', href: '/courses/bsc-nursing' },
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
    title: 'Professional Services',
    items: [
      { label: 'Admission Support', href: '/admission-support', icon: 'ShieldCheck', badge: 'High Priority' },
      { label: 'Career Mentorship', href: '/mentorship', icon: 'Users' },
      { label: 'Counselling Strategy', href: '/counseling', icon: 'Compass' },
      { label: 'Selection Support', href: '/selection', icon: 'Target' },
      { label: 'Expert Consultation', href: '/consultation', icon: 'Video', badge: 'Free' },
      { label: 'Scholarship Guide', href: '/scholarships', icon: 'Coins', status: '2026' },
    ]
  },
  {
    title: 'Academic Hubs',
    items: [
      { label: 'NIRF Rankings', href: '/rankings', icon: 'Trophy' },
      { label: 'Entrance Exams', href: '/exams', icon: 'BookOpen' },
      { label: 'Course Directory', href: '/courses', icon: 'GraduationCap' },
      { label: 'Study Abroad', href: '/abroad', icon: 'Globe', status: 'Popular' },
      { label: 'Education News', href: '/news', icon: 'Newspaper' },
      { label: 'Review Hub', href: '/#reviews', icon: 'MessageSquare' },
    ]
  },
  {
    title: 'Platform Tools',
    items: [
      { label: 'College Predictor', href: '/tools', icon: 'Search', badge: 'AI Tool' },
      { label: 'Loan Calculator', href: '/loan-calculator', icon: 'IndianRupee' },
      { label: 'Admission Alerts', href: '/alerts', icon: 'Bell', status: 'New' },
      { label: 'College Finder', href: '/tools', icon: 'Search' },
      { label: 'Compare Colleges', href: '/compare', icon: 'BarChart3' },
    ]
  }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('Home')
  const [authVisible, setAuthVisible] = useState(false)
  const [counsellingVisible, setCounsellingVisible] = useState(false)
  const [goalVisible, setGoalVisible] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [userDropdown, setUserDropdown] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searchFocused, setSearchFocused] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [currentTime, setCurrentTime] = useState<string>('')
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)

  const IconMap: any = {
    Trophy, GraduationCap, MessageSquare, Bell, Building2,
    Target, FileText, Coins, Globe, ClipboardList,
    BookOpen, Newspaper, IndianRupee, HelpCircle,
    CheckSquare, Search, FileEdit, Compass, Users, 
    ShieldCheck, Video
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

    // Running Clock Logic
    const clockTimer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-IN', { 
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true 
      }))
    }, 1000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      subscription.unsubscribe()
      clearInterval(clockTimer)
    }
  }, [])

  // Navbar live search logic
  useEffect(() => {
    const fetchResults = async () => {
      const trimmedQuery = searchQuery.trim()
      if (trimmedQuery.length < 2) {
        setSearchResults([])
        return
      }
      setIsSearching(true)
      const { data, error } = await supabase
        .from('colleges')
        .select('name, slug, location, stream')
        .or(`name.ilike.%${trimmedQuery}%,location.ilike.%${trimmedQuery}%,stream.ilike.%${trimmedQuery}%`)
        .limit(5)

      if (!error && data) {
        setSearchResults(data)
      } else {
        console.error('Search error:', error)
      }
      setIsSearching(false)
    }

    const timer = setTimeout(fetchResults, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUserDropdown(false)
  }

  const handleMouseEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout)
    setMegaMenuOpen(true)
  }

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setMegaMenuOpen(false)
    }, 150)
    setHoverTimeout(timeout)
  }

  return (
    <>
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'translate-y-0' : 'translate-y-0'
      )}>
        {/* Top Row: Main Nav & Search */}
        <div className="bg-slate-900 border-b border-white/5 py-3 md:py-2">
          <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 flex items-center justify-between gap-4 md:gap-8">

            {/* Logo Section */}
            <div className="flex items-center gap-4 md:gap-8 shrink-0">
              <a href="/" className="flex items-center gap-2.5 group">
                <div className="w-11 h-11 rounded-full border border-sky-500/20 overflow-hidden bg-white flex-shrink-0 shadow-lg group-hover:border-sky-500 transition-all duration-300 relative">
                  <img
                    src="/images/PromoteEducationLogo.png"
                    alt="Promote Education"
                    className="w-full h-full object-contain scale-[1.2] -translate-y-[1px]"
                  />
                </div>
                <div className="flex flex-col items-center -space-y-0.5">
                  <span className="font-black text-[11px] md:text-xs text-white tracking-widest leading-tight">PROMOTE</span>
                  <span className="font-black text-[11px] md:text-xs text-sky-400 tracking-widest leading-tight">EDUCATION</span>
                </div>
              </a>

              <div
                onClick={() => setGoalVisible(true)}
                className="hidden lg:flex items-center gap-2 pl-4 border-l border-white/10 group cursor-pointer"
              >
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-none mb-1 flex items-center gap-1">
                    <GraduationCap size={10} className="text-sky-500" /> Select Goal & City
                  </span>
                  <div className="flex items-center gap-1 text-white group-hover:text-sky-400 transition-colors">
                    <span className="text-xs font-bold">Select Goal</span>
                    <ChevronDown size={12} className="opacity-40" />
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Search Bar (Functional) */}
            <div className="hidden md:flex flex-1 max-w-2xl relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-400 transition-colors">
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Search for Colleges, Exams, Courses and More..."
                className="w-full bg-white/10 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:bg-white focus:text-slate-900 transition-all font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              />

              {/* Live Results Dropdown */}
              {searchFocused && (searchQuery.trim().length >= 2) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-[70] animate-in slide-in-from-top-2">
                  {isSearching ? (
                    <div className="p-8 text-center">
                      <div className="w-6 h-6 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Searching Institutions...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="py-2">
                      <div className="px-5 py-2 mb-1">
                        <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Top Matches</p>
                      </div>
                      {searchResults.map((res, i) => (
                        <button
                          key={i}
                          onClick={() => { window.location.href = `/colleges/${res.slug}` }}
                          className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 text-left transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-sky-500 group-hover:text-white transition-all shadow-sm">
                            <Building2 size={18} />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-tight">{res.name}</span>
                            <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider mt-0.5">{res.stream} • {res.location}</span>
                          </div>
                          <ChevronRight size={14} className="ml-auto text-slate-200 group-hover:text-sky-500 transition-colors" />
                        </button>
                      ))}
                      <div className="p-2 mt-1 border-t border-slate-50">
                        <button
                          onClick={() => window.location.href = '/colleges'}
                          className="w-full py-2 text-[11px] font-bold text-sky-600 hover:bg-sky-50 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          View all results <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-10 text-center">
                      <Search size={24} className="mx-auto text-slate-200 mb-3" />
                      <p className="text-sm font-bold text-slate-900 mb-1">No colleges found</p>
                      <p className="text-xs text-slate-400">We couldn't find any results for "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              )}

              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hidden lg:block">
                <FileEdit size={16} />
              </div>
            </div>

            {/* Action Items */}
            <div className="flex items-center gap-3 md:gap-5 shrink-0">
              <div className="hidden xl:flex flex-col items-center">
                <button className="flex items-center gap-2 text-white hover:text-sky-400 transition-colors">
                  <FileEdit size={16} className="text-sky-500" />
                  <span className="text-xs font-bold">Write a Review</span>
                </button>
              </div>

              <div className="w-px h-8 bg-white/10 hidden md:block" />

              <div 
                className="relative group/explore"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all",
                    megaMenuOpen ? "bg-white text-slate-900" : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className={cn("rounded-[1px]", megaMenuOpen ? "bg-sky-500" : "bg-current")} />
                    ))}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wide">Explore</span>
                  <ChevronDown size={14} className={cn("transition-transform duration-300", megaMenuOpen ? "rotate-180" : "")} />
                </button>
              </div>

              <button className="relative p-2 text-white/60 hover:text-white transition-colors">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-sky-500 rounded-full border-2 border-slate-900" />
              </button>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdown(!userDropdown)}
                    className="flex items-center gap-2 p-1 pl-2 rounded-full border border-white/10 hover:bg-white/5 transition-all"
                  >
                    <div className="w-7 h-7 rounded-full bg-sky-500 flex items-center justify-center text-white text-[10px] font-bold">
                      {user.email?.[0].toUpperCase()}
                    </div>
                    <ChevronDown size={14} className="text-white/40 mr-1" />
                  </button>

                  {userDropdown && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-[60] animate-in slide-in-from-top-2">
                      <div className="px-4 py-3 border-b border-slate-50 mb-1">
                        <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Signed in as</p>
                        <p className="text-xs font-bold text-slate-900 truncate">{user.email}</p>
                      </div>
                      <a href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50">
                        <User size={16} /> My Dashboard
                      </a>
                      <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50">
                        <LogOut size={16} /> Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setAuthVisible(true)}
                  className="w-8 h-8 md:w-auto md:px-4 md:py-2 rounded-full border border-white/20 text-white text-xs font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <User size={14} className="md:hidden" />
                  <span className="hidden md:inline text-white">Sign in</span>
                </button>
              )}

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-white"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row: Secondary Nav & Categories */}
        <div className="bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm hidden md:block">
          <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 flex items-center justify-between h-11 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  className={cn(
                    "text-[13px] font-bold whitespace-nowrap transition-colors flex items-center gap-1",
                    (activeItem === item.label || (item.label === 'Explore' && megaMenuOpen)) ? "text-sky-600" : "text-slate-600 hover:text-slate-900"
                  )}
                  onMouseEnter={item.label === 'Explore' ? handleMouseEnter : undefined}
                  onMouseLeave={item.label === 'Explore' ? handleMouseLeave : undefined}
                  onClick={() => {
                    if (item.label !== 'Explore') {
                      setActiveItem(item.label)
                      window.location.href = item.href
                    }
                  }}
                >
                  {item.label}
                  {item.label === 'Explore' && <ChevronDown size={12} className={cn("transition-transform", megaMenuOpen ? "rotate-180" : "")} />}
                </button>
              ))}
              <div className="w-px h-4 bg-slate-200" />
              <div className="flex items-center gap-5">
                {topCategories.map((cat) => (
                  <a
                    key={cat.label}
                    href={cat.href}
                    className="text-xs font-medium text-slate-500 hover:text-sky-600 whitespace-nowrap transition-colors"
                  >
                    {cat.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-8 pl-6 bg-gradient-to-r from-transparent via-white to-white sticky right-0">
              <div className="hidden lg:flex items-center gap-2 px-1">
                <Clock size={14} className="text-sky-500" />
                <span className="text-sm font-black text-slate-800 tabular-nums uppercase tracking-tight min-w-[85px]">
                  {currentTime || '--:--:-- --'}
                </span>
              </div>
              <a href="/cutoffs" className="flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors whitespace-nowrap bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200/60 shadow-sm ring-4 ring-amber-500/5 animate-pulse-slow">
                <BarChart3 size={13} className="text-amber-500" /> Cutoffs
              </a>
              <a href="/abroad" className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-sky-600 transition-colors whitespace-nowrap">
                <Globe size={13} className="text-sky-500" /> Study Abroad
              </a>
            </div>
          </div>
        </div>

        {/* Mega Menu Overlay */}
        {megaMenuOpen && (
          <div
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-2xl animate-in slide-in-from-top-2 duration-300 z-50"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
              <button 
                onClick={() => setMegaMenuOpen(false)}
                className="absolute top-4 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X size={20} />
              </button>
            <div className="max-w-[1440px] mx-auto px-6 py-12 grid grid-cols-12 gap-10">
              {/* Groups Section */}
              <div className="col-span-9 grid grid-cols-3 gap-10">
                {exploreGroups.map(group => (
                  <div key={group.title} className="flex flex-col">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-1.5 h-4 bg-sky-500 rounded-full" />
                      <h5 className="text-[10px] uppercase font-black text-slate-900 tracking-[0.2em]">{group.title}</h5>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {group.items.map(subItem => {
                        const Icon = IconMap[subItem.icon]
                        return (
                          <a
                            key={subItem.label}
                            href={subItem.href}
                            className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400 group-hover:bg-sky-500 group-hover:text-white transition-all shadow-sm border border-slate-100">
                                {Icon && <Icon size={14} />}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[13px] font-bold text-slate-700 group-hover:text-sky-600 transition-colors leading-none">{subItem.label}</span>
                                {subItem.badge && <span className="text-[8px] text-sky-600 font-bold mt-1.5 uppercase tracking-tighter opacity-70">{subItem.badge}</span>}
                              </div>
                            </div>
                            {subItem.status && (
                              <span className="text-[8px] bg-sky-50 text-sky-600 px-2 py-0.5 rounded-full font-black uppercase tracking-tighter border border-sky-100/50">
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

              {/* Sidebar Feature */}
              <div className="col-span-3 flex flex-col gap-4">
                <div className="flex-1 bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden flex flex-col justify-end border border-white/5 shadow-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 blur-[80px] -mr-16 -mt-16" />
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-2xl bg-sky-500 flex items-center justify-center mb-6 shadow-lg shadow-sky-500/40">
                      <Compass size={20} className="text-white" />
                    </div>
                    <h6 className="text-xl font-black mb-3 leading-tight tracking-tight">Personalized Roadmap 2026</h6>
                    <p className="text-white/50 text-xs mb-6 leading-relaxed font-medium">Get a step-by-step admission plan tailored to your exam scores and goal.</p>
                    <button className="w-full py-4 bg-white text-slate-900 font-black rounded-2xl hover:bg-sky-50 transition-all active:scale-[0.98] text-[10px] uppercase tracking-widest">
                      Start Planning
                    </button>
                  </div>
                </div>
                
                <div className="p-5 bg-sky-50 border border-sky-100 rounded-3xl flex items-center gap-4 group cursor-pointer hover:bg-sky-100 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-sky-500 shadow-sm border border-sky-100">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-sky-600 uppercase tracking-widest mb-0.5">24/7 Helpdesk</p>
                    <p className="text-xs font-bold text-slate-900">Talk to Expert Now</p>
                  </div>
                  <ChevronRight size={14} className="ml-auto text-sky-300 group-hover:text-sky-500 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 top-14 bg-white z-[45] overflow-y-auto">
            <div className="p-6 space-y-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Search Colleges, Exams..."
                  className="w-full pl-11 pr-4 py-3 bg-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery.length >= 2 && searchResults.length > 0 && (
                  <div className="mt-2 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
                    {searchResults.map((res, i) => (
                      <button
                        key={i}
                        onClick={() => { window.location.href = `/colleges/${res.slug}`; setMobileOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50"
                      >
                        <Building2 size={14} className="text-slate-400" />
                        <div className="flex flex-col text-left">
                          <span className="text-[11px] font-bold text-slate-900">{res.name}</span>
                          <span className="text-[9px] text-slate-400 uppercase tracking-tighter">{res.location}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Main Menu</p>
                <div className="grid gap-2">
                  {navItems.map(item => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl text-sm font-bold text-slate-900 active:bg-sky-50 transition-colors"
                    >
                      {item.label}
                      <ChevronDown size={16} className="-rotate-90 opacity-20" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Explore Categories</p>
                <div className="flex flex-wrap gap-2">
                  {topCategories.map(cat => (
                    <a key={cat.label} href={cat.href} className="px-4 py-2 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 active:bg-sky-600 active:text-white transition-all">
                      {cat.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <CounsellingModal
        isOpen={counsellingVisible}
        onClose={() => setCounsellingVisible(false)}
      />

      <GoalModal
        isOpen={goalVisible}
        onClose={() => setGoalVisible(false)}
      />
      <AuthModal isOpen={authVisible} onClose={() => setAuthVisible(false)} />
    </>
  )
}
