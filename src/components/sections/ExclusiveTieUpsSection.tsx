'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShieldCheck, Award, CheckCircle2 } from 'lucide-react'

interface ExclusiveCollege {
  name: string
  shortName: string
  location: string
  slug: string
  logo: string
  badge?: string
}

const exclusiveColleges: ExclusiveCollege[] = [
  {
    name: 'Institute of Engineering and Management',
    shortName: 'IEM Kolkata',
    location: 'Kolkata, WB',
    slug: 'iem-kolkata-mgmt',
    logo: '/images/partners/iem-clean.webp',
    badge: 'Premier Engineering & Management',
  },
  {
    name: 'Techno India Group',
    shortName: 'Techno India Group',
    location: 'Kolkata, WB',
    slug: 'techno-india-university-mgmt',
    logo: '/images/partners/techno-india.svg',
    badge: 'Premier Tech Campus',
  },
  {
    name: 'M.S. Ramaiah Foundation',
    shortName: 'MS Ramaiah Foundation',
    location: 'Bengaluru, KA',
    slug: 'ms-ramaiah-institute-of-technology-bangalore',
    logo: '/images/partners/ramaiah.png',
    badge: 'Top Tier Institution',
  },
  {
    name: 'Kalinga Institute of Industrial Technology',
    shortName: 'KIIT Bhubaneswar',
    location: 'Bhubaneswar, Odisha',
    slug: 'ksom-kiit-bhubaneswar',
    logo: '/images/partners/kiit.svg',
    badge: 'Institute of Eminence',
  },
  {
    name: 'SRM Institute of Science and Technology',
    shortName: 'SRM IST',
    location: 'Chennai, TN',
    slug: 'srm-institute-of-science-and-technology',
    logo: '/images/partners/srm.svg',
    badge: 'NAAC A++ Accredited',
  },
  {
    name: 'Eastern Institute for Integrated Learning in Management',
    shortName: 'EIILM Kolkata',
    location: 'Kolkata, WB',
    slug: 'eiilm-kolkata',
    logo: '/images/partners/eiilm-clean.webp',
    badge: 'Top Management School',
  },
]

export default function ExclusiveTieUpsSection() {
  return (
    <section
      id="exclusive-colleges"
      aria-labelledby="exclusive-colleges-heading"
      className="relative py-12 md:py-16 bg-slate-50/70 border-t border-b border-slate-200/70 overflow-hidden"
    >
      {/* Subtle Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-4xl h-36 bg-sky-100/40 rounded-full blur-[90px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-9 md:mb-11">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/80 text-[11px] font-semibold text-slate-600 shadow-[0_1px_2px_rgba(0,0,0,0.03)] uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
            Premier Institutional Network
          </div>

          <h2
            id="exclusive-colleges-heading"
            className="text-2xl md:text-3xl lg:text-[2rem] font-bold text-slate-900 tracking-tight"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}
          >
            Exclusive Colleges
          </h2>

          <p className="mt-2 text-sm md:text-base text-slate-500 leading-relaxed">
            Partnering with leading colleges to bring students exclusive opportunities, direct guidance, and admission support.
          </p>
        </div>

        {/* Logo Cards Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
          {exclusiveColleges.map((college) => (
            <Link
              key={college.slug}
              href={`/colleges/${college.slug}`}
              id={`college-${college.slug}`}
              title={`${college.name} (${college.location}) — View admission & program details`}
              className="group relative flex flex-col items-center justify-between p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(15,23,42,0.07)] hover:border-sky-300 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            >
              {/* Logo Area */}
              <div className="w-full h-14 sm:h-16 flex items-center justify-center p-1.5 relative">
                <Image
                  src={college.logo}
                  alt={`${college.name} logo`}
                  width={140}
                  height={60}
                  className="max-h-11 sm:max-h-12 w-auto max-w-[85%] object-contain filter grayscale opacity-65 contrast-90 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:contrast-100 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Text Label & Location */}
              <div className="w-full text-center mt-3 pt-2.5 border-t border-slate-100/90 flex flex-col justify-center">
                <p className="text-[12px] font-semibold text-slate-700 group-hover:text-sky-600 transition-colors duration-200 truncate">
                  {college.shortName}
                </p>
                <p className="text-[10.5px] text-slate-400 truncate mt-0.5">
                  {college.location}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Credibility Micro-Points */}
        <div className="mt-8 pt-6 border-t border-slate-200/60 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[11.5px] font-medium text-slate-500">
          <div className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
            <span>Authorized Admission Assistance</span>
          </div>
          <span className="hidden sm:inline text-slate-300" aria-hidden="true">•</span>
          <div className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>Direct Merit &amp; Quota Counseling</span>
          </div>
          <span className="hidden sm:inline text-slate-300" aria-hidden="true">•</span>
          <div className="inline-flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <span>Verified Institutional Tie-Ups</span>
          </div>
        </div>
      </div>
    </section>
  )
}
