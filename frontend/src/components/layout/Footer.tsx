'use client'

import { useState, useEffect } from 'react'
import {
  Search, ChevronRight, Facebook, Instagram, Youtube, Linkedin,
  Send, Mail, Phone, MapPin, ExternalLink, HelpCircle
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'

const footerLinks = {
  Exams: ['JEE Main', 'NEET', 'CAT', 'CUET', 'All exams'],
  Courses: ['BTech', 'MBA', 'MBBS', 'BDS', 'Others'],
  Services: ['Mentorship', 'Scholarship', 'Counseling', 'Admission Support', 'Selection', 'Consultation'],
  Company: ['About', 'Careers', 'Events', 'Contact Us', 'FAQ', 'Sitemap'],
}

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/promoteducation/', label: 'Facebook', color: 'hover:text-blue-500' },
  { icon: Instagram, href: 'https://www.instagram.com/promote_education/', label: 'Instagram', color: 'hover:text-pink-500' },
  { icon: Youtube, href: 'https://www.youtube.com/@PromoteEducationOfficial', label: 'YouTube', color: 'hover:text-red-500' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/promote-education-pvt-ltd', label: 'LinkedIn', color: 'hover:text-blue-600' },
  {
    icon: (props: any) => (
      <svg viewBox="0 0 448 512" fill="currentColor" {...props}>
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.3-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.5-11.3 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.5-9.3 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.7 23.5 9.2 31.6 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
      </svg>
    ),
    href: 'https://wa.me/919900116101',
    label: 'WhatsApp',
    color: 'hover:text-green-500'
  },
]

export default function Footer() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [focused, setFocused] = useState(false)
  const [activeOffice, setActiveOffice] = useState(0)
  const [showMapOptions, setShowMapOptions] = useState(false)

  const offices = [
    {
      city: 'Kolkata',
      address: "Ecosuite Business Tower, Street No. 676, Action Area II, Action Area IID, Newtown, Kolkata, West Bengal 700161",
    },
    {
      city: 'Bangalore',
      address: "S5, Hiprofiles Business center, 1/A CHURCH STREET, Bangalore - 560001. Opposite - Tata Starbucks coffee shop",
    },
    {
      city: 'Delhi',
      address: "U-179 Office no - 303 The Eduguide, 3rd floor near Laxmi nagar metro station gate no 4. Landmark kotak Mahindra Bank Shakarpur Laxmi Nagar 110092",
    }
  ]

  const activeAddress = offices[activeOffice].address
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeAddress)}`
  const appleMapsUrl = `https://maps.apple.com/?q=${encodeURIComponent(activeAddress)}`

  // Live search logic
  useEffect(() => {
    const searchColleges = async () => {
      if (query.length < 2) {
        setResults([])
        return
      }
      const { data, error } = await supabase
        .from('colleges')
        .select('name, location, stream')
        .or(`name.ilike.%${query}%,location.ilike.%${query}%,stream.ilike.%${query}%`)
        .limit(4)

      if (!error && data) setResults(data)
    }
    const timer = setTimeout(searchColleges, 300)
    return () => clearTimeout(timer)
  }, [query])

  return (
    <footer style={{ background: '#0F172A' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Top Grid: Links & Search */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-12 mb-16">

          {/* Brand col */}
          <div className="col-span-2 md:col-span-3">
            <div className="flex items-center gap-6 mb-10">
              <a href="/" className="flex items-center gap-5 group">
                <div className="w-20 h-20 -ml-2 rounded-full border border-white/10 overflow-hidden bg-white flex-shrink-0 shadow-2xl transition-all duration-300 group-hover:border-sky-500 group-hover:scale-105 transform">
                  <img
                    src="/images/PromoteEducationLogo.png"
                    alt="Promote Education"
                    className="w-full h-full object-contain scale-[1.2] -translate-y-[1px]"
                  />
                </div>
                <div className="flex flex-col items-center -space-y-2">
                  <span className="font-black text-[18px] md:text-[22px] text-white tracking-[0.2em] leading-tight">PROMOTE</span>
                  <span className="font-black text-[18px] md:text-[22px] text-sky-400 tracking-[0.2em] leading-tight">EDUCATION</span>
                </div>
              </a>
            </div>
            <p className="text-sm mb-6 text-slate-400 leading-relaxed pr-4">
              India's most trusted college discovery platform. Helping students and parents make confident decisions.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                {['iOS App', 'Android'].map((app) => (
                  <button
                    key={app}
                    className="text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-white/10 text-slate-500 hover:text-white hover:bg-white/5 transition-all"
                  >
                    {app}
                  </button>
                ))}
              </div>
              <a
                href="/faq"
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-sky-400 transition-colors"
              >
                <HelpCircle size={14} className="text-sky-500" />
                Frequently Asked Questions
              </a>
              <div className="mt-20 ml-1">
                <h4 className="text-[9px] font-black mb-4 tracking-[0.15em] text-slate-500 uppercase">
                  More from us
                </h4>
                <div className="flex gap-6">
                  {['Careers', 'Events', 'News', 'Media'].map(link => (
                    <a
                      key={link}
                      href={`/${link.toLowerCase()}`}
                      className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Link columns (4 categories) */}
          <div className="col-span-2 md:col-span-5 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-[9px] font-black mb-5 tracking-[0.15em] text-slate-500 uppercase">
                  {category}
                </h4>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href={
                          link === 'All exams' ? '/exams' :
                          link === 'Others' ? '/courses' :
                          category === 'Services' ? (
                            link === 'Scholarship' ? '/scholarships' : `/${link.toLowerCase().replace(/ /g, '-')}`
                          ) :
                          category === 'Company' ? `/${link.toLowerCase().replace(/ /g, '-')}` :
                            category === 'Courses' ? `/courses/${link.toLowerCase().replace(/ /g, '-').replace(/\./g, '')}` :
                              category === 'Exams' ? `/exams/${link.toLowerCase().replace(/ /g, '-')}` :
                                '#'
                        }
                        className="text-[13px] text-slate-400 hover:text-sky-400 transition-colors whitespace-nowrap"
                      >
                        {link}
                      </a>
                      {link === 'Contact Us' && (
                        <div className="mt-3 flex flex-col gap-2">
                          <a
                            href="tel:+919900116101"
                            className="text-[11px] text-slate-500 hover:text-emerald-500 transition-colors flex items-center gap-2"
                          >
                            <span className="w-1 h-1 rounded-full bg-emerald-500" />
                            +91 99001 16101
                          </a>
                          <a
                            href="mailto:info@promoteducation.com"
                            className="text-[11px] text-slate-500 hover:text-sky-500 transition-colors flex items-center gap-2"
                          >
                            <span className="w-1 h-1 rounded-full bg-sky-500" />
                            info@promoteducation.com
                          </a>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Search Bar, Socials & Address Col */}
          <div className="col-span-2 md:col-span-4 md:pl-8">
            <h3 className="text-white font-display text-sm mb-5">Quick Search</h3>
            <div className="relative group mb-10">
              <div className={cn(
                "flex items-center gap-2 p-1 rounded-xl transition-all duration-300",
                focused ? "bg-white" : "bg-white/5 border border-white/10"
              )}>
                <div className="pl-3 text-slate-400">
                  <Search size={14} />
                </div>
                <input
                  type="text"
                  placeholder="Search platform..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setTimeout(() => setFocused(false), 200)}
                  className={cn(
                    "flex-1 bg-transparent py-2.5 text-xs font-medium outline-none border-none",
                    focused ? "text-slate-900" : "text-white placeholder:text-slate-500"
                  )}
                />
                <button className="px-4 py-2 bg-sky-500 text-white text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-sky-400 transition-all">
                  Find
                </button>
              </div>

              {/* Search Results Dropdown */}
              {focused && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-xl overflow-hidden shadow-2xl border border-slate-100 z-[60] animate-in slide-in-from-top-2">
                  {results.map((res, i) => (
                    <button
                      key={i}
                      className="w-full flex flex-col items-start px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0"
                    >
                      <span className="text-[12px] font-bold text-slate-900">{res.name}</span>
                      <span className="text-[9px] text-slate-400 uppercase tracking-wider">{res.stream} • {res.location}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Social & Address Blocks (Stacked) */}
            <div className="flex flex-col gap-8">
              <div>
                <h4 className="text-[9px] font-black mb-5 tracking-[0.15em] text-slate-500 uppercase">Connect</h4>
                <div className="flex items-center gap-5">
                  {socialLinks.map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={cn("text-slate-400 transition-all duration-300 transform hover:scale-125", social.color)}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="relative">
                <h4 className="text-[9px] font-black mb-4 tracking-[0.15em] text-slate-500 uppercase">Our Presence</h4>

                <div className="flex flex-wrap gap-2 mb-6">
                  {offices.map((office, idx) => (
                    <button
                      key={office.city}
                      onClick={() => {
                        setActiveOffice(idx)
                        setShowMapOptions(true)
                      }}
                      className={cn(
                        "text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-all duration-300",
                        activeOffice === idx
                          ? "bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-500/20"
                          : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                      )}
                    >
                      {office.city}
                    </button>
                  ))}
                </div>

                <div
                  className="group/address cursor-pointer"
                  onClick={() => setShowMapOptions(!showMapOptions)}
                >
                  <div className="flex gap-4">
                    <MapPin size={18} className="text-sky-500 shrink-0 mt-1 group-hover/address:scale-125 transition-transform" />
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-sky-500 uppercase tracking-widest">{offices[activeOffice].city} Office</span>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-medium group-hover/address:text-white transition-colors">
                        {offices[activeOffice].address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map Options Dropdown */}
                {showMapOptions && (
                  <div className="absolute bottom-full left-0 mb-4 w-48 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-[70] animate-in slide-in-from-bottom-2">
                    <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{offices[activeOffice].city} Maps</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); setShowMapOptions(false); }}
                        className="text-slate-400 hover:text-slate-900 transition-colors"
                      >
                        <Search size={12} className="rotate-45" />
                      </button>
                    </div>
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors group/opt"
                    >
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-xs font-bold text-slate-900">Google Maps</span>
                      <ExternalLink size={12} className="ml-auto text-slate-300 group-hover/opt:text-slate-900" />
                    </a>
                    <a
                      href={appleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors group/opt border-t border-slate-50"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-xs font-bold text-slate-900">Apple Maps</span>
                      <ExternalLink size={12} className="ml-auto text-slate-300 group-hover/opt:text-slate-900" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-white/5" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-[10px] text-slate-500">
            © 2026 Promote Education Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: 'Privacy policy', href: '/privacy-policy' },
              { label: 'Terms of use', href: '/terms-of-use' },
              { label: 'Disclaimer', href: '/disclaimer' },
              { label: 'Cookie policy', href: '/cookie-policy' }
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[10px] text-slate-500 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
