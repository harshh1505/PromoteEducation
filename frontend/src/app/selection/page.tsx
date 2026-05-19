import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { 
  Building2, 
  BookOpen, 
  Search, 
  CheckCircle2, 
  ArrowRight,
  BarChart3,
  MapPin,
  Target,
  Zap,
  Star,
  GraduationCap,
  PhoneCall,
  Clock,
  ShieldCheck,
  CheckSquare,
  FileSearch,
  Bell,
  HeartHandshake,
  ClipboardCheck,
  Briefcase,
  Globe
} from 'lucide-react'

// ─────────────────────────────────────────────
// SEO METADATA — Next.js App Router
// ─────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Smart College & Course Selection 2026 | ROI-based Matching',
  description:
    'Find your perfect academic fit with our scientific college selection process. We evaluate ROI, placements, and campus culture for JEE, NEET, and MBA 2026.',
  keywords: [
    'college selection India', 'course selection 2026', 'best engineering branch selection', 
    'college ROI analysis', 'university comparison 2026', 'placement track record audit',
    'infrastructure verification', 'student life evaluation', 'career goal matching'
  ],
  openGraph: {
    title: 'Smart College & Course Selection 2026 | Promote Education',
    description:
      'Choosing the right university is a lifelong decision. Use our data-driven matrix to select the campus that guarantees your career success.',
    type: 'website',
    url: 'https://promoteeducation.in/selection',
  },
  alternates: { canonical: 'https://promoteeducation.in/selection' },
}

// ─────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────
const SERVICES = [
  {
    icon: BarChart3,
    title: "ROI Benchmarking",
    desc: "We analyze the median salary vs the total cost of education over 5 years. Our matrix ensures your degree pays for itself faster.",
    features: ["Salary vs Fee Audit", "Break-even Analysis", "Future Earning Potential", "Loan Assistance Prep"]
  },
  {
    icon: Briefcase,
    title: "Placement Tracking",
    desc: "Moving beyond 'Highest Package'. We audit the recruiter quality, sector-wise distribution, and the consistency of the placement cell.",
    features: ["Median Salary Check", "Recruiter Pedigree", "Internship Opportunities", "Branch-wise Placement"]
  },
  {
    icon: Building2,
    title: "Infrastructure Audit",
    desc: "Verified physical audits of Labs, Hostels, and Research facilities. We use real student feedback to debunk marketing fluff.",
    features: ["Lab Standards Check", "Hostel Quality Audit", "Digital Infrastructure", "Sports & Amenities"]
  },
  {
    icon: GraduationCap,
    title: "Faculty Pedigree",
    desc: "Analysis of the teaching staff's research citations, industry experience, and academic background from global institutions.",
    features: ["Research Impact Score", "Industry Experience", "Teacher-Student Ratio", "Guest Lecture Series"]
  },
  {
    icon: Globe,
    title: "Location Intelligence",
    desc: "Proximity to industrial hubs is crucial for internships and jobs. We evaluate city connectivity, safety, and living costs.",
    features: ["Industry Hub Access", "Connectivity Audit", "Safety Index Check", "Living Cost Analysis"]
  },
  {
    icon: ShieldCheck,
    title: "Accreditation Check",
    desc: "Strict verification of NAAC, NBA, and global rankings to ensure your degree is recognized by international employers and universities.",
    features: ["NAAC/NBA Rating", "NIRF Trend Analysis", "Global Accreditations", "University Status Check"]
  },
  {
    icon: HeartHandshake,
    title: "Cultural Fitment",
    desc: "Evaluating the on-campus culture—Student societies, hackathons, and technical fests that contribute to your holistic growth.",
    features: ["Student Body Diversity", "Society & Clubs Audit", "Technical Fest Pedigree", "Campus Safety Culture"]
  },
  {
    icon: Target,
    title: "Branch vs College Logic",
    desc: "Should you choose a lower branch at a top college or a top branch at a mid-tier college? We solve this dilemma with data.",
    features: ["Branch Neutrality Audit", "College Brand Impact", "Switch-over Probability", "Dual Degree Analysis"]
  },
  {
    icon: ClipboardCheck,
    title: "Backup Strategy",
    desc: "Always have a Plan B. We help you select safety colleges that ensure you don't lose a year, regardless of rank volatility.",
    features: ["Safety/Target/Dream List", "Waitlist Management", "Alternative Exams", "Admission Security"]
  }
]

const STEPS = [
  { n: '01', title: 'Phase 1: Aspiration Mapping', time: 'Month 1', desc: 'Understanding your long-term career goals—Research, Corporate, or Entrepreneurship.' },
  { n: '02', title: 'Phase 2: Data Mining', time: 'Month 2', desc: 'Filtering 1000+ colleges based on your rank, budget, and location preferences.' },
  { n: '03', title: 'Phase 3: Comparative Audit', time: 'Month 3', desc: 'Side-by-side comparison of shortlisted colleges on ROI, faculty, and placements.' },
  { n: '04', title: 'Phase 4: Feedback Loop', time: 'Month 4', desc: 'Connecting with current students and alumni of the shortlisted institutions for real insights.' },
  { n: '05', title: 'Phase 5: Final Shortlist', time: 'Month 5', desc: 'Finalizing the list of 10 colleges to apply for across different tiers (Dream/Target/Safety).' },
  { n: '06', title: 'Phase 6: Enrollment Aid', time: 'Month 6', desc: 'Transitioning from selection to enrollment, including fee payment and document locking.' },
]

const PROCESS_STEPS = [
  { title: 'Academic Profile Audit', desc: 'We review your marks, rank, and extra-curriculars to set a realistic benchmark for selection.' },
  { title: 'Constraint Mapping', desc: 'Defining your budget, location flexibility, and branch priorities to filter the master college list.' },
  { title: 'The Decision Matrix', desc: 'Applying our proprietary 12-parameter score to each college to find your "Highest Probability" match.' },
  { title: 'Alumni Validation', desc: 'Verifying our data with current students to ensure the ground reality matches the official reports.' },
  { title: 'Infrastructure Check', desc: 'Virtual or physical audit of labs and hostels to ensure a quality learning environment.' },
  { title: 'Selection Sign-off', desc: 'Final counselor review and student sign-off on the preference order before the application season starts.' },
]

const FAQS = [
  {
    q: "Is college brand more important than the branch?",
    a: "It depends on your goal. For MBA aspirants, a top college brand matters. For tech-focused roles, the branch and its specialized curriculum often take priority."
  },
  {
    q: "How do you verify placement data?",
    a: "We use three sources: Official University Reports, NIRF Data (which is verified by the government), and direct feedback from the latest batch of alumni."
  },
  {
    q: "Can I select colleges across different states?",
    a: "Yes, our database covers national-level institutes and top state universities across all major Indian states, ensuring you have the widest possible choice."
  },
  {
    q: "Do you help with course selection for MBA?",
    a: "Absolutely. We provide specialized selection guidance for MBA specializations (Marketing, Finance, Data Science) based on future market demand."
  },
  {
    q: "What is a 'Dream/Target/Safety' list?",
    a: "Dream: High rank colleges. Target: Colleges matching your rank. Safety: Guaranteed admissions to ensure you don't lose a year."
  },
  {
    q: "Is ROI the only factor for selection?",
    a: "ROI is crucial, but we also consider faculty pedigree, research culture, and campus safety, ensuring a holistic environment for your growth."
  }
]

// ─────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────
export default function SelectionPage() {
  const jsonLdService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'College & Course Selection Support 2026',
    'provider': {
      '@type': 'Organization',
      'name': 'Promote Education',
      'url': 'https://promoteeducation.in'
    },
    'areaServed': 'India',
    'description': 'End-to-end college selection support. Data-driven matching of ranks with institutions based on ROI, placements, and campus quality.',
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Selection Services',
      'itemListElement': SERVICES.map(s => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': s.title,
          'description': s.desc
        }
      }))
    }
  }

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://promoteeducation.in' },
      { '@type': 'ListItem', position: 2, name: 'Selection', item: 'https://promoteeducation.in/selection' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />

      <div className="flex flex-col min-h-screen bg-white text-slate-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <Navbar />

        {/* ── HERO ── */}
        <header className="pt-32 pb-20 border-b border-slate-100 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <li><Link href="/" className="hover:text-slate-700 transition-colors">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-slate-700 font-bold">College Selection</li>
              </ol>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
              <div className="flex-1 max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-sm mb-6">
                  AI-Powered Matching · Cycle 2026 Open
                </div>

                <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1] mb-6">
                  Precision <br />
                  <span className="text-indigo-500 italic">Selection</span><br />
                  Expert Matrix 2026
                </h1>

                <p className="text-lg text-slate-500 leading-relaxed max-w-2xl font-medium">
                  Choosing the right course and university is the most critical decision of your academic life. We use a data-driven 12-parameter matrix to find the institution that perfectly matches your rank, budget, and career aspirations.
                </p>
              </div>

              {/* Quick-jump box */}
              <aside className="lg:w-72 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm self-start">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Jump to section</p>
                <nav className="space-y-1">
                  {[
                    ['#services', 'Selection Modules'],
                    ['#roadmap', 'Selection Roadmap'],
                    ['#process', 'Our Methodology'],
                    ['#why-us', 'Why Choose Us'],
                    ['#faq', 'Selection FAQs'],
                    ['#contact', 'Start Selection'],
                  ].map(([href, label]) => (
                    <a
                      key={href}
                      href={href}
                      className="flex justify-between items-center py-2 text-sm text-slate-600 hover:text-indigo-500 font-medium border-b border-slate-50 last:border-0 transition-colors"
                    >
                      {label}
                      <span className="text-slate-300 text-xs">→</span>
                    </a>
                  ))}
                </nav>
              </aside>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-14 border-t border-slate-200">
              {[
                { val: '15k+', label: 'Profiles Evaluated', sub: 'In Last 2 Years' },
                { val: '1.2k+', label: 'Institutions', sub: 'Verified Data Points' },
                { val: '100%', label: 'Satisfaction', sub: 'Placement Outcome' },
                { val: '12+', label: 'Parameters', sub: 'Selection Decision Matrix' },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-3xl font-black text-slate-900">{s.val}</p>
                  <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-1">{s.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        <main>
          {/* ── CORE SERVICES ── */}
          <section id="services" className="py-20 border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
              <header className="mb-12">
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Scientific Selection Modules</h2>
                <p className="text-slate-500 max-w-2xl leading-relaxed font-medium">
                  We look beyond the brochures. Our selection modules analyze every facet of a university to ensure your highest ROI.
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {SERVICES.map((service, i) => (
                  <article key={i} className="bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-lg hover:border-slate-300 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-900 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500 mb-6 shadow-sm">
                      <service.icon size={24} />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-3">{service.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-6 font-medium">{service.desc}</p>
                    <div className="pt-5 border-t border-slate-50 space-y-2">
                      {service.features.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ── ROADMAP ── */}
          <section id="roadmap" className="py-20 bg-slate-50 border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
              <header className="mb-14">
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">The Selection Roadmap 2026</h2>
                <p className="text-slate-500 font-medium max-w-2xl leading-relaxed">
                  A granular journey from self-discovery to securing your dream campus.
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STEPS.map((s) => (
                  <article key={s.n} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-4xl font-black text-slate-100 leading-none">{s.n}</p>
                      <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded-sm border border-indigo-100">
                        {s.time}
                      </span>
                    </div>
                    <h3 className="text-base font-black text-slate-900 mb-3">{s.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{s.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ── SUPPORT PROCESS ── */}
          <section id="process" className="py-20 border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
              <header className="mb-14">
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Our Selection Methodology</h2>
                <p className="text-slate-500 font-medium max-w-2xl leading-relaxed">
                  The methodology behind our 100% student satisfaction in university matchmaking.
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {PROCESS_STEPS.map((step, i) => (
                  <div key={i} className="relative p-8 border border-slate-100 rounded-3xl bg-slate-50/50">
                    <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center text-lg font-black mb-6">
                      {i + 1}
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-3">{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{step.desc}</p>
                  </div>
                ))}
              </div>

              {/* Selection Checklist */}
              <div className="mt-14 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 mb-6">Critical Decision Checklist</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      cat: 'Academic Matching',
                      items: ['Rank vs Historical Cutoffs', 'Branch Curriculum Audit', 'Faculty Research Pedigree', 'Accreditation Status'],
                    },
                    {
                      cat: 'Financial & ROI',
                      items: ['Total Fee Transparency', 'Median Salary Analysis', 'Scholarship Availability', 'Living Cost Index'],
                    },
                    {
                      cat: 'Campus & Culture',
                      items: ['Lab & Hostel Standards', 'Industry Hub Proximity', 'Alumni Network Strength', 'Safety & Diversity Audit'],
                    },
                  ].map((col) => (
                    <div key={col.cat}>
                      <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-4">{col.cat}</p>
                      <ul className="space-y-2">
                        {col.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-slate-600 font-medium">
                            <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── WHY CHOOSE US (SEO RICH) ── */}
          <section id="why-us" className="py-20 bg-slate-50 border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">Why Trust Promote Education for Selection?</h2>
                  <p className="text-slate-500 mb-8 leading-relaxed font-medium">
                    Selection is more than just picking a name from a list. It's about aligning your next 4 years with the next 40 years of your career. We eliminate bias and marketing noise to give you the objective truth about every campus.
                  </p>
                  <ul className="space-y-4">
                    {[
                      { t: '100% Unbiased Audits', d: 'We are not recruiters for colleges. Our reports are based on objective data and alumni feedback.' },
                      { t: 'Scientific Decision Matrix', d: 'Every college is scored on 12 critical parameters before it makes it to your list.' },
                      { t: 'ROI Focused Logic', d: 'We prioritize institutions that offer the fastest break-even on your educational investment.' },
                      { t: 'Verified Ground Reality', d: 'Direct insights from our network of 10,000+ mentees currently studying in these institutions.' }
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 mt-1">
                          <CheckCircle2 size={14} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">{item.t}</p>
                          <p className="text-xs text-slate-500 font-medium">{item.d}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16" />
                  <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-6">Selection Impact 2025</p>
                  <div className="space-y-8 relative z-10">
                    {[
                      { l: 'Successful Placements', v: '94.2%', p: 'w-[94.2%]' },
                      { l: 'Student Retention', v: '99.1%', p: 'w-[99.1%]' },
                      { l: 'Tier-1 Campus Matches', v: '86.4%', p: 'w-[86.4%]' },
                      { l: 'Data Point Accuracy', v: '100%', p: 'w-[100%]' },
                    ].map((stat, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-end mb-2">
                          <p className="text-sm font-black text-slate-900">{stat.l}</p>
                          <p className="text-sm font-black text-indigo-500">{stat.v}</p>
                        </div>
                        <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                          <div className={`h-full bg-indigo-500 rounded-full ${stat.p}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section id="faq" className="py-20 border-b border-slate-100">
            <div className="max-w-3xl mx-auto px-6">
              <header className="mb-14">
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Selection FAQs</h2>
                <p className="text-slate-500 font-medium">Common questions about university shortlisting and course selection.</p>
              </header>
              <div className="space-y-10">
                {FAQS.map((f, i) => (
                  <article key={i}>
                    <h3 className="text-base font-black text-slate-900 mb-3 flex gap-3">
                      <span className="text-indigo-500 flex-shrink-0">Q.</span>
                      {f.q}
                    </h3>
                    <p className="text-slate-500 leading-relaxed font-medium pl-7 border-l-2 border-slate-100">
                      {f.a}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ── INTERNAL LINKS (SEO) ── */}
          <section className="py-16 border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Related Guides on Promote Education</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  ['/admission-support', 'Admission Support 2026'],
                  ['/scholarships', 'Scholarship Guide India'],
                  ['/exams/neet-ug', 'NEET UG Selection Aid'],
                  ['/exams/jee-main', 'JEE Main Selection Aid'],
                  ['/colleges/medical', 'Best Medical Colleges'],
                  ['/colleges/engineering', 'Best Engineering Colleges'],
                  ['/mentorship', 'Expert Mentorship'],
                  ['/counseling', 'Counselling Strategy'],
                  ['/tools/college-predictor', 'College Predictor Tool'],
                  ['/rankings', 'Latest Rankings 2026'],
                  ['/#compare-section', 'Compare Colleges'],
                  ['/articles/top-mba-specializations', 'MBA Specialization Guide'],
                ].map(([href, label]) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-sm font-bold text-sky-600 hover:underline leading-snug"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ── FINAL CTA ── */}
          <section id="contact" className="py-20">
            <div className="max-w-7xl mx-auto px-6">
              <div className="bg-slate-900 rounded-3xl p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full -ml-32 -mb-32 blur-3xl" />
                
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight relative z-10 leading-[1.1]">
                  Your Future Degree Deserves<br />
                  <span className="text-indigo-400">Scientific Selection.</span>
                </h2>
                <p className="text-slate-300 font-medium max-w-2xl mx-auto mb-10 text-lg leading-relaxed relative z-10">
                  Join 15,000+ students who found their perfect match. Our selection desk is open for the 2026-27 academic session.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
                  <Link
                    href="/contact"
                    className="px-10 py-5 bg-indigo-500 text-white font-black text-xs uppercase tracking-widest rounded-full shadow-2xl hover:bg-indigo-400 transition-all scale-110"
                  >
                    Start Selection Process
                  </Link>
                  <div className="flex flex-col items-center sm:items-start gap-1">
                    <Link
                      href="tel:+919900116101"
                      className="px-10 py-5 bg-white/10 border border-white/20 text-white font-black text-xs uppercase tracking-widest rounded-full hover:bg-white/20 transition-all flex items-center gap-2"
                    >
                      <PhoneCall size={16} />
                      +91 99001 16101
                    </Link>
                    <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest ml-2">Speak to Selection Expert</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </>
  )
}
