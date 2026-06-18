'use client'

import { useState, useEffect } from 'react'
import {
  Menu, X, ChevronDown, ChevronRight, ArrowRight, User, LogOut,
  Trophy, GraduationCap, MessageSquare, Bell, Building2,
  Target, FileText, Coins, Globe, ClipboardList,
  BookOpen, Newspaper, IndianRupee, HelpCircle,
  CheckSquare, Search, FileEdit, BarChart3,
  Compass, Users, ShieldCheck, Video, Clock,
  Briefcase, LayoutGrid, Headset
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import CounsellingModal from '@/components/ui/CounsellingModal'
import GoalModal from '@/components/ui/GoalModal'

const navItems = [
  { label: 'Home', href: '/', hasMegaMenu: false },
  { label: 'Explore', href: '#', hasMegaMenu: true },
  { label: 'Colleges', href: '/colleges', hasDropdown: false },
  { label: 'Exams', href: '/exams', hasDropdown: false },
  { label: 'Rankings', href: '/rankings', hasDropdown: false },
  { label: 'Blogs', href: '/blogs', hasDropdown: false },
  { label: 'About Us', href: '/about', hasDropdown: false },
  // { label: 'FAQ', href: '/faq', hasDropdown: false },
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
  subtitle: string
  headerIcon: string
  headerColor: string
  headerBg: string
  items: ExploreItem[]
}

const exploreGroups: ExploreGroup[] = [
  {
    title: 'Professional Services',
    subtitle: 'Expert guidance for every step',
    headerIcon: 'Briefcase',
    headerColor: 'text-sky-500',
    headerBg: 'bg-sky-500/10',
    items: [
      { label: 'Admission Support', href: '/admission-support', icon: 'ShieldCheck', badge: 'High Priority' },
      { label: 'Career Mentorship', href: '/mentorship', icon: 'Users' },
      { label: 'Counselling Strategy', href: '/counselling', icon: 'Compass' },
      { label: 'Selection Support', href: '/selection', icon: 'Target' },
      { label: 'Expert Consultation', href: '/consultation', icon: 'Video', badge: 'Free' },
      { label: 'Scholarship Guide', href: '/scholarships', icon: 'Coins', status: '2026' },
    ]
  },
  {
    title: 'Academic Hubs',
    subtitle: 'Stay informed. Stay ahead.',
    headerIcon: 'GraduationCap',
    headerColor: 'text-emerald-500',
    headerBg: 'bg-emerald-500/10',
    items: [
      { label: 'NIRF Rankings', href: '/rankings', icon: 'Trophy' },
      { label: 'Entrance Exams', href: '/exams', icon: 'BookOpen' },
      { label: 'Course Directory', href: '/courses', icon: 'GraduationCap' },
      { label: 'Study Abroad', href: '/study-abroad', icon: 'Globe', status: 'Popular' },
      { label: 'Education News', href: '/news', icon: 'Newspaper' },
      { label: 'Review Hub', href: '/#reviews', icon: 'MessageSquare' },
    ]
  },
  {
    title: 'Platform Tools',
    subtitle: 'Smart tools to plan better',
    headerIcon: 'LayoutGrid',
    headerColor: 'text-purple-500',
    headerBg: 'bg-purple-500/10',
    items: [
      { label: 'College Predictor', href: '/colleges', icon: 'Search', badge: 'AI Tool' },
      { label: 'Loan Calculator', href: '/#loan-calculator-section', icon: 'IndianRupee' },
      { label: 'Admission Alerts', href: '/alerts', icon: 'Bell', status: 'New' },
      { label: 'College Finder', href: '/colleges', icon: 'Search' },
      { label: 'Compare Colleges', href: '/#compare-section', icon: 'BarChart3' },
    ]
  }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('body-modal-open')
    } else {
      document.body.classList.remove('body-modal-open')
    }
    return () => document.body.classList.remove('body-modal-open')
  }, [mobileOpen])
  const [activeItem, setActiveItem] = useState('Home')
  const [counsellingVisible, setCounsellingVisible] = useState(false)
  const [goalVisible, setGoalVisible] = useState(false)
  const [exploreMobileOpen, setExploreMobileOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searchFocused, setSearchFocused] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [currentTime, setCurrentTime] = useState<string>('')
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)
  const [topCategories, setTopCategories] = useState<{label: string, href: string}[]>([
    { label: 'All Courses', href: '/courses' }
  ])

  const IconMap: any = {
    Trophy, GraduationCap, MessageSquare, Bell, Building2,
    Target, FileText, Coins, Globe, ClipboardList,
    BookOpen, Newspaper, IndianRupee, HelpCircle,
    CheckSquare, Search, FileEdit, Compass, Users, 
    ShieldCheck, Video, Briefcase, LayoutGrid, Headset
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)

    // Running Clock Logic
    const clockTimer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-IN', { 
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true 
      }))
    }, 1000)

    // Removed fetchTopCategories to use static array as requested
    setTopCategories([
      { label: 'All Courses', href: '/courses' },
      { label: 'B.Tech', href: '/courses/btech' },
      { label: 'MBBS', href: '/courses/mbbs' },
      { label: 'MBA', href: '/courses/mba' },
      { label: 'BDS', href: '/courses/mbbs/bds' }
    ])

    return () => {
      window.removeEventListener('scroll', handleScroll)
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
            <div className="flex items-center gap-2 sm:gap-4 md:gap-8 shrink-0">
              <a href="/" className="flex items-center gap-2 sm:gap-2.5 group">
                <div className="w-9 h-9 md:w-11 md:h-11 rounded-full border border-sky-500/20 overflow-hidden bg-white flex-shrink-0 shadow-lg group-hover:border-sky-500 transition-all duration-300 relative">
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
            <div className="flex items-center gap-1 sm:gap-3 md:gap-5 shrink-0">
              <div className="hidden xl:flex flex-col items-center">
                <button className="flex items-center gap-2 text-white hover:text-sky-400 transition-colors">
                  <FileEdit size={16} className="text-sky-500" />
                  <span className="text-xs font-bold">Write a Review</span>
                </button>
              </div>

              <div className="w-px h-8 bg-white/10 hidden md:block" />

              <div 
                className="relative group/explore"
                onMouseEnter={() => {
                  if (typeof window !== 'undefined' && window.innerWidth >= 1024) handleMouseEnter();
                }}
                onMouseLeave={() => {
                  if (typeof window !== 'undefined' && window.innerWidth >= 1024) handleMouseLeave();
                }}
              >
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.innerWidth < 1024) setMegaMenuOpen(!megaMenuOpen);
                  }}
                  className={cn(
                    "flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-lg transition-all",
                    megaMenuOpen ? "bg-white text-slate-900" : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  <div className="grid grid-cols-2 gap-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className={cn("rounded-[1px]", megaMenuOpen ? "bg-sky-500" : "bg-current")} />
                    ))}
                  </div>
                  <span className="hidden sm:inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wide">Explore</span>
                  <span className="sm:hidden text-[10px] font-bold uppercase tracking-wide">Explore</span>
                  <ChevronDown size={14} className={cn("transition-transform duration-300 hidden sm:block", megaMenuOpen ? "rotate-180" : "")} />
                </button>
              </div>

              <button className="relative p-2 text-white/60 hover:text-white transition-colors">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-sky-500 rounded-full border-2 border-slate-900" />
              </button>

              {/* Removed Auth Buttons */}

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-1.5 sm:p-2.5 flex items-center justify-center text-white"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
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
                  onMouseEnter={item.label === 'Explore' ? () => {
                    if (typeof window !== 'undefined' && window.innerWidth >= 1024) handleMouseEnter();
                  } : undefined}
                  onMouseLeave={item.label === 'Explore' ? () => {
                    if (typeof window !== 'undefined' && window.innerWidth >= 1024) handleMouseLeave();
                  } : undefined}
                  onClick={() => {
                    if (item.label !== 'Explore') {
                      setActiveItem(item.label)
                      window.location.href = item.href
                    } else {
                      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                        setMegaMenuOpen(!megaMenuOpen);
                      }
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
              <a href="/study-abroad" className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-sky-600 transition-colors whitespace-nowrap">
                <Globe size={13} className="text-sky-500" /> Study Abroad
              </a>
            </div>
          </div>
        </div>

        {/* Mega Menu Overlay */}
        {megaMenuOpen && (
          <div
            className="absolute top-[calc(100%+16px)] left-4 right-4 max-w-[1400px] mx-auto bg-white rounded-[2rem] border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] animate-in slide-in-from-top-2 duration-300 z-50 max-h-[85vh] overflow-y-auto lg:max-h-none lg:overflow-visible"
            onMouseEnter={() => {
              if (typeof window !== 'undefined' && window.innerWidth >= 1024) handleMouseEnter();
            }}
            onMouseLeave={() => {
              if (typeof window !== 'undefined' && window.innerWidth >= 1024) handleMouseLeave();
            }}
          >
            <button 
              onClick={() => setMegaMenuOpen(false)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors bg-slate-50 hover:bg-slate-100 rounded-full z-10 lg:hidden"
            >
              <X size={20} />
            </button>

            <div className="p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
              {/* Groups Section */}
              <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                {exploreGroups.map((group, index) => {
                  const HeaderIcon = IconMap[group.headerIcon]
                  return (
                    <div key={group.title} className={cn("flex flex-col relative", index !== 2 ? "md:after:content-[''] md:after:absolute md:after:right-[-1.5rem] lg:after:right-[-2.5rem] md:after:top-0 md:after:bottom-0 md:after:w-px md:after:bg-slate-100" : "")}>
                      
                      <div className="flex items-center gap-4 mb-8">
                        <div className={cn("w-12 h-12 rounded-full flex items-center justify-center shrink-0", group.headerBg, group.headerColor)}>
                          {HeaderIcon && <HeaderIcon size={20} className="stroke-[2.5]" />}
                        </div>
                        <div className="flex flex-col">
                          <h5 className="text-[13px] uppercase font-black text-slate-900 tracking-wider leading-tight">{group.title}</h5>
                          <p className="text-[11px] text-slate-500 font-medium mt-0.5">{group.subtitle}</p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        {group.items.map((subItem) => {
                          const Icon = IconMap[subItem.icon]
                          return (
                            <a
                              key={subItem.label}
                              href={subItem.href}
                              className="group flex items-center justify-between py-3.5 px-2 rounded-xl hover:bg-slate-50 transition-all border-b border-slate-50 last:border-0"
                            >
                              <div className="flex items-center gap-4">
                                <div className="text-slate-400 group-hover:text-sky-500 transition-colors">
                                  {Icon && <Icon size={18} className="stroke-[1.5]" />}
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[14px] font-bold text-slate-800 group-hover:text-sky-600 transition-colors leading-tight">{subItem.label}</span>
                                  {subItem.badge && <span className="text-[9px] text-sky-600 font-black mt-1 uppercase tracking-widest">{subItem.badge}</span>}
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                {subItem.status && (
                                  <span className="text-[9px] bg-sky-50 text-sky-600 px-2.5 py-1 rounded-full font-black uppercase tracking-wider">
                                    {subItem.status}
                                  </span>
                                )}
                                <ChevronRight size={14} className="text-slate-300 group-hover:text-sky-500 transition-transform group-hover:translate-x-0.5" />
                              </div>
                            </a>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Sidebar Feature */}
              <div className="lg:col-span-3 flex flex-col gap-5 lg:pl-4">
                <div className="flex-1 bg-[#0b48a3] rounded-[1.5rem] p-8 text-white relative overflow-hidden flex flex-col border border-[#165bc0] shadow-xl">
                  {/* Subtle map/path background pattern */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 100% 0%, #ffffff 0%, transparent 50%), radial-gradient(circle at 0% 100%, #1e3a8a 0%, transparent 50%)' }} />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mb-auto shadow-inner">
                      <Compass size={24} className="text-white" />
                    </div>
                    
                    <div className="mt-8">
                      <h6 className="text-[22px] font-black mb-3 leading-[1.1] tracking-tight">Personalized<br/>Roadmap 2026</h6>
                      <p className="text-white/80 text-[13px] mb-8 leading-relaxed font-medium">Get a step-by-step admission plan tailored to your exam scores and goal.</p>
                      <button className="w-full py-4 bg-white text-[#0b48a3] font-black rounded-[1rem] hover:bg-sky-50 transition-all active:scale-[0.98] text-[12px] uppercase tracking-widest shadow-lg shadow-black/10 flex items-center justify-center gap-2">
                        Start Planning <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 bg-[#f0f6ff] border border-blue-100 rounded-[1.5rem] flex items-center gap-4 group cursor-pointer hover:bg-blue-50 transition-all shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-blue-500 shadow-sm border border-blue-100 shrink-0">
                    <Headset size={20} className="stroke-[2]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-0.5">24/7 Helpdesk</p>
                    <p className="text-[14px] font-bold text-slate-800 leading-tight">Talk to Expert Now</p>
                  </div>
                  <ChevronRight size={16} className="ml-auto text-blue-300 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
            {/* Desktop Close Icon (Matches reference) */}
            <button 
              onClick={() => setMegaMenuOpen(false)}
              className="hidden lg:flex absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors z-10"
            >
              <X size={20} className="stroke-[1.5]" />
            </button>
          </div>
        )}

        {/* Mobile Menu Dropdown */}
        {mobileOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-2xl z-[45] animate-in slide-in-from-top-2 max-h-[calc(100dvh-60px)] overflow-y-auto flex flex-col">
            
            {/* Primary Navigation Items (The "Second Navbar") */}
            <div className="flex flex-col">
              {navItems.map(item => {
                if (item.label === 'Explore') {
                  return (
                    <div key={item.label} className="flex flex-col border-b border-slate-100 last:border-0">
                      <button
                        onClick={() => setExploreMobileOpen(!exploreMobileOpen)}
                        className="w-full flex items-center justify-between px-6 py-4 text-[15px] font-bold text-slate-900 active:bg-slate-50 transition-colors"
                      >
                        {item.label}
                        <ChevronDown size={16} className={cn("transition-transform duration-300 text-slate-400", exploreMobileOpen ? "rotate-180" : "")} />
                      </button>
                      
                      {exploreMobileOpen && (
                        <div className="bg-slate-50/50 px-6 pb-4 pt-1 flex flex-col gap-5 border-t border-slate-50 animate-in slide-in-from-top-2 duration-200">
                          {exploreGroups.map(group => (
                            <div key={group.title} className="flex flex-col gap-2">
                              <span className="text-[10px] font-black uppercase text-sky-600 tracking-widest">{group.title}</span>
                              <div className="flex flex-col gap-1">
                                {group.items.map(subItem => (
                                  <a 
                                    key={subItem.label} 
                                    href={subItem.href} 
                                    onClick={() => setMobileOpen(false)} 
                                    className="py-2 text-[13px] font-bold text-slate-600 hover:text-sky-600 active:text-sky-700 transition-colors"
                                  >
                                    {subItem.label}
                                  </a>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-6 py-4 text-[15px] font-bold text-slate-900 active:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                  >
                    {item.label}
                  </a>
                )
              })}
            </div>

            {/* Utilities and Search Section */}
            <div className="bg-slate-50 p-6 space-y-6 border-t border-slate-200 mt-auto">
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Search Colleges, Exams..."
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/20 shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery.length >= 2 && searchResults.length > 0 && (
                  <div className="mt-2 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
                    {searchResults.map((res, i) => (
                      <button
                        key={i}
                        onClick={() => { window.location.href = `/colleges/${res.slug}`; setMobileOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 animate-in fade-in duration-100"
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

              {/* Goal & City Selection CTA */}
              <button
                onClick={() => { setMobileOpen(false); setGoalVisible(true); }}
                className="w-full flex items-center justify-center gap-3 p-4 bg-[#3B2EA8] hover:bg-[#2c2196] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-indigo-900/10 transition-all active:scale-[0.98]"
              >
                <GraduationCap size={16} className="text-sky-400" />
                <span>Select Goal & City</span>
              </button>

              {/* Secondary Navigation Tools */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="/cutoffs"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 active:bg-slate-50 transition-colors shadow-sm"
                >
                  <BarChart3 size={14} className="text-amber-500" /> Cutoffs
                </a>
                <a
                  href="/study-abroad"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 active:bg-slate-50 transition-colors shadow-sm"
                >
                  <Globe size={14} className="text-sky-500" /> Study Abroad
                </a>
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
    </>
  )
}
