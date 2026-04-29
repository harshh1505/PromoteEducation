import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { 
  Compass, 
  Map, 
  Lightbulb, 
  HeartHandshake,
  ArrowRight,
  TrendingUp,
  Sparkles,
  BarChart,
  Target,
  Search,
  MessageSquare,
  Globe,
  PhoneCall,
  Clock,
  ShieldCheck,
  CheckSquare,
  FileSearch,
  Bell,
  ClipboardCheck,
  CheckCircle2
} from 'lucide-react'

// ─────────────────────────────────────────────
// SEO METADATA — Next.js App Router
// ─────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'College Counselling & Choice Filling 2026 | JoSAA, MCC & State Aid',
  description:
    'Expert college counselling and choice filling for JEE, NEET, and university admissions. We handle JoSAA, MCC, and State rounds with data-driven strategy for 2026.',
  keywords: [
    'college counselling 2026', 'JoSAA choice filling support', 'MCC counselling aid', 
    'state CET counselling help', 'best college consultant India', 'NEET counselling 2026',
    'engineering choice filling', 'medical admission counselling', 'private university guidance'
  ],
  openGraph: {
    title: 'Expert College Counselling & Choice Filling 2026 | Promote Education',
    description:
      'Maximize your rank potential with scientific choice filling. End-to-end counselling support for all major national and state-level entrance exams.',
    type: 'website',
    url: 'https://promoteeducation.in/counseling',
  },
  alternates: { canonical: 'https://promoteeducation.in/counseling' },
}

// ─────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────
const SERVICES = [
  {
    icon: Compass,
    title: "JoSAA Counselling Aid",
    desc: "Strategic guidance for IITs, NITs, and IIITs. We build your preference list based on 10 years of cutoff volatility and placement trends.",
    features: ["IIT/NIT Prioritization", "Branch vs College Audit", "CSAB Special Round Aid", "Seat Upgrade Tracking"]
  },
  {
    icon: ShieldCheck,
    title: "MCC Medical Assistance",
    desc: "End-to-end support for NEET All India Quota (AIQ) and Deemed University rounds. We ensure you secure the best clinical branch.",
    features: ["MBBS/BDS Specialization", "Deemed University Audit", "State vs AIQ Strategy", "Category Quota Matching"]
  },
  {
    icon: Map,
    title: "State CET Strategic Aid",
    desc: "Expert help for WBJEE, KCET, COMEDK, TNEA, and other state rounds. We manage multiple portals simultaneously with 100% accuracy.",
    features: ["Local Domicile Benefits", "State Rank Optimization", "Private College Quotas", "Fee Structure Audits"]
  },
  {
    icon: ClipboardCheck,
    title: "Choice-Filling Optimization",
    desc: "Our proprietary algorithm ranks 500+ colleges based on your specific rank. We maximize your chances of a Tier-1 allotment.",
    features: ["AI-based Rank Matching", "Mock Round Analysis", "Safety vs Dream Lists", "Freezing vs Floating Help"]
  },
  {
    icon: HeartHandshake,
    title: "NRI & Management Quota",
    desc: "Bespoke guidance for direct admissions and specialized quotas in top private institutions like VIT, Manipal, and SRM.",
    features: ["Direct Admission Tracking", "Sponsorship Audit", "Eligibility Verification", "Strategic Seat Locking"]
  },
  {
    icon: BarChart,
    title: "Category Certificate Audit",
    desc: "Ensuring your EWS, OBC-NCL, or SC/ST certificates are valid and updated as per the latest NTA/MCC/JoSAA formats.",
    features: ["NCL Central List Check", "Format Verification", "Correction Window Help", "Affidavit Preparation"]
  },
  {
    icon: Bell,
    title: "Real-time Round Alerts",
    desc: "Never miss a document upload or fee payment deadline. Instant notifications for every round result and reporting schedule.",
    features: ["WhatsApp Deadline Pushes", "Portal Status Monitoring", "Payment Failure Recovery", "Withdrawal Timelines"]
  },
  {
    icon: Search,
    title: "Spot Round Specialization",
    desc: "We track leftover seats in top colleges. Our experts help you grab vacant Tier-1 seats during institutional and CSAB spot rounds.",
    features: ["Vacancy Tracking", "Last-minute Strategy", "On-spot Reporting Aid", "Refund Process Guidance"]
  },
  {
    icon: Target,
    title: "Seat Acceptance & Reporting",
    desc: "Final mile support for physical reporting at the allotted college. We help you with document folders and fee disbursement.",
    features: ["Reporting Checklists", "Physical Verification Prep", "Anti-ragging Affidavits", "Hostel Booking Aid"]
  }
]

const STEPS = [
  { n: '01', title: 'Phase 1: Rank Diagnostic', time: 'June', desc: 'Analyzing your rank across different categories and identifying the best possible college-branch combinations.' },
  { n: '02', title: 'Phase 2: Choice Building', time: 'June – July', desc: 'Crafting your personalized preference list for Round 1. We prioritize ROI and future branch growth.' },
  { n: '03', title: 'Phase 3: Mock Allotment', time: 'July', desc: 'Analyzing mock results to see where you stand. We refine the choice list before the final locking window.' },
  { n: '04', title: 'Phase 4: Round 1 – 6', time: 'July – Aug', desc: 'Managing the actual rounds. We guide you on whether to Freeze, Float, or Slide after every allotment result.' },
  { n: '05', title: 'Phase 5: Spot Rounds', time: 'Aug – Sept', desc: 'Participating in CSAB or State special rounds to secure upgrades in vacant seats of top-tier institutions.' },
  { n: '06', title: 'Phase 6: Reporting', time: 'Sept', desc: 'Final documentation and physical reporting at the allotted college to secure your admission permanently.' },
]

const PROCESS_STEPS = [
  { title: 'Data Profiling', desc: 'We input your rank, category, and preferences into our system to generate a list of "High Probability" colleges.' },
  { title: 'Preference Mapping', desc: 'Our senior counselors manually review and rank the generated list based on the latest placement data and alumni feedback.' },
  { title: 'Choice Locking', desc: 'We handle the actual entry of choices on the official portal, ensuring zero errors in college codes or branch sequences.' },
  { title: 'Upgrade Monitoring', desc: 'We monitor every subsequent round, ensuring you are always in the running for a seat upgrade without losing your current allotment.' },
  { title: 'Grievance Handling', desc: 'Direct support for any portal glitches, payment failures, or data discrepancies that occur during the counselling window.' },
  { title: 'Final Fulfillment', desc: 'Verification of your allotment letter and guiding you through the final reporting protocols of the respective university.' },
]

const FAQS = [
  {
    q: "What is the difference between JoSAA and CSAB?",
    a: "JoSAA is the main counselling for IITs, NITs, and IIITs. CSAB is the special round conducted for vacant seats in NITs and IIITs after JoSAA ends. We provide specialized strategy for both."
  },
  {
    q: "Can I participate in multiple counselling rounds?",
    a: "Yes, you can simultaneously participate in JoSAA, MCC, and your State CET rounds. Our experts manage all these portals for you to ensure you have multiple safety nets."
  },
  {
    q: "What does Float, Freeze, and Slide mean?",
    a: "Freeze means you accept the seat. Float means you accept the seat but want a better college in next rounds. Slide means you accept the seat but want a better branch in the SAME college."
  },
  {
    q: "Do you help with NRI quota choices?",
    a: "Yes, we have a specialized cell for NRI and Management quota choices in top-tier private universities like VIT, BITS, and Manipal."
  },
  {
    q: "What if I don't get a seat in Round 1?",
    a: "Round 1 is just the beginning. We optimize your list for Round 2 and beyond, and if needed, we prepare a high-impact strategy for the final 'Spot Rounds'."
  },
  {
    q: "How accurate is your college predictor?",
    a: "Our algorithm uses 10 years of historical data combined with current year rank trends, providing a 95%+ accuracy in predicting allotment probabilities."
  }
]

// ─────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────
export default function CounselingPage() {
  const jsonLdService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'College Counselling & Choice Filling Support 2026',
    'provider': {
      '@type': 'Organization',
      'name': 'Promote Education',
      'url': 'https://promoteeducation.in'
    },
    'areaServed': 'India',
    'description': 'Expert college counselling for JoSAA, MCC, and state rounds. Specialized choice-filling optimization for JEE and NEET aspirants.',
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Counselling Services',
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
      { '@type': 'ListItem', position: 2, name: 'Counselling', item: 'https://promoteeducation.in/counseling' },
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
                <li className="text-slate-700 font-bold">College Counselling</li>
              </ol>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
              <div className="flex-1 max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 text-sky-700 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-sm mb-6">
                  <Sparkles size={12} className="text-sky-500" />
                  Counseling Cycle 2026 · Strategy Hub Open
                </div>

                <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1] mb-6">
                  Navigate Your<br />
                  <span className="text-sky-500 italic">Ambition</span><br />
                  Strategic Aid 2026
                </h1>

                <p className="text-lg text-slate-500 leading-relaxed max-w-2xl font-medium">
                  We help you move beyond guesswork. Our counselling team combines proprietary rank-matching algorithms with real-time market trends to build a choice list that maximizes your rank's potential.
                </p>
              </div>

              {/* Quick-jump box */}
              <aside className="lg:w-72 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm self-start">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Jump to section</p>
                <nav className="space-y-1">
                  {[
                    ['#services', 'Counselling Services'],
                    ['#roadmap', 'Counselling Roadmap'],
                    ['#process', 'Our Methodology'],
                    ['#why-us', 'Why Choose Us'],
                    ['#faq', 'Counselling FAQs'],
                    ['#contact', 'Speak to Counselor'],
                  ].map(([href, label]) => (
                    <a
                      key={href}
                      href={href}
                      className="flex justify-between items-center py-2 text-sm text-slate-600 hover:text-sky-500 font-medium border-b border-slate-50 last:border-0 transition-colors"
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
                { val: '50k+', label: 'Choices Filled', sub: 'In Last 3 Cycles' },
                { val: '98.4%', label: 'Allotment Rate', sub: 'Tier-1 Institutions' },
                { val: '500+', label: 'Colleges Mapped', sub: 'Placement Validated' },
                { val: '10+', label: 'Years Experience', sub: 'Counselling Experts' },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-3xl font-black text-slate-900">{s.val}</p>
                  <p className="text-[10px] font-black text-sky-500 uppercase tracking-widest mt-1">{s.label}</p>
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
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Data-Driven Counselling Domains</h2>
                <p className="text-slate-500 max-w-2xl leading-relaxed font-medium">
                  Whether you're aiming for national institutes or top-tier state universities, we provide specialized strategy for every portal.
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {SERVICES.map((service, i) => (
                  <article key={i} className="bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-lg hover:border-slate-300 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-900 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500 mb-6 shadow-sm">
                      <service.icon size={24} />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-3">{service.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-6 font-medium">{service.desc}</p>
                    <div className="pt-5 border-t border-slate-50 space-y-2">
                      {service.features.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
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
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">The Counselling Roadmap 2026</h2>
                <p className="text-slate-500 font-medium max-w-2xl leading-relaxed">
                  A granular breakdown of the counselling season. We provide precision strategy at every milestone.
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STEPS.map((s) => (
                  <article key={s.n} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-4xl font-black text-slate-100 leading-none">{s.n}</p>
                      <span className="text-[10px] font-black text-sky-500 uppercase tracking-widest bg-sky-50 px-2 py-1 rounded-sm border border-sky-100">
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
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Our Counselling Methodology</h2>
                <p className="text-slate-500 font-medium max-w-2xl leading-relaxed">
                  The methodology behind our high-success rate in securing Tier-1 allotments.
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

              {/* Counselling Deliverables */}
              <div className="mt-14 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 mb-6">Counselling Kit Deliverables</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      cat: 'Pre-Round Strategy',
                      items: ['Rank Impact Report', 'Personalized Choice List', 'Category Audit Certificate', 'Mock Allotment Analysis'],
                    },
                    {
                      cat: 'In-Round Support',
                      items: ['Round-by-Round Guidance', 'Upgrade Opportunity Alerts', 'Seat Locking Reminders', 'Payment Assistance'],
                    },
                    {
                      cat: 'Final Fulfillment',
                      items: ['Allotment Letter Audit', 'Reporting Protocols Guide', 'Fee Refund Assistance', 'Anti-ragging Kit'],
                    },
                  ].map((col) => (
                    <div key={col.cat}>
                      <p className="text-[10px] font-black text-sky-500 uppercase tracking-widest mb-4">{col.cat}</p>
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
                  <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">Why Choose Promote Education for Counselling?</h2>
                  <p className="text-slate-500 mb-8 leading-relaxed font-medium">
                    College counselling is a game of probability and strategy. A single mistake in the choice order can cost you a better college. Our proprietary algorithm and senior counselors ensure you stay ahead of the volatility.
                  </p>
                  <ul className="space-y-4">
                    {[
                      { t: 'AI-Enhanced Choice Lists', d: 'Preference lists generated using historical cutoff volatility and current year trends.' },
                      { t: 'Multi-Portal Management', d: 'Simultaneous support for JoSAA, MCC, and multiple State counselling rounds.' },
                      { t: 'Expert Category Audit', d: 'Ensuring 100% validity for Reservation, EWS, and PwD certificate benefits.' },
                      { t: 'Round-the-Clock Desk', d: 'Immediate support during high-pressure round results and locking windows.' }
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
                  <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full -mr-16 -mt-16" />
                  <p className="text-[10px] font-black text-sky-500 uppercase tracking-widest mb-6">Counselling Impact 2025</p>
                  <div className="space-y-8 relative z-10">
                    {[
                      { l: 'Successful Allotments', v: '98.4%', p: 'w-[98.4%]' },
                      { l: 'Upgrades in Rounds', v: '76.2%', p: 'w-[76.2%]' },
                      { l: 'Tier-1 Campus Placement', v: '84.1%', p: 'w-[84.1%]' },
                      { l: 'Choice Error Rate', v: '0.0%', p: 'w-[100%]' },
                    ].map((stat, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-end mb-2">
                          <p className="text-sm font-black text-slate-900">{stat.l}</p>
                          <p className="text-sm font-black text-sky-500">{stat.v}</p>
                        </div>
                        <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                          <div className={`h-full bg-sky-500 rounded-full ${stat.p}`} />
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
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Counselling FAQs</h2>
                <p className="text-slate-500 font-medium">Common questions about the college allotment and choice filling process.</p>
              </header>
              <div className="space-y-10">
                {FAQS.map((f, i) => (
                  <article key={i}>
                    <h3 className="text-base font-black text-slate-900 mb-3 flex gap-3">
                      <span className="text-sky-500 flex-shrink-0">Q.</span>
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
                  ['/exams/neet-ug', 'NEET UG Strategy 2026'],
                  ['/exams/jee-main', 'JEE Main Prep Guide'],
                  ['/colleges/medical', 'Top Medical Colleges'],
                  ['/colleges/engineering', 'Top Engineering Colleges'],
                  ['/mentorship', 'Expert Mentors'],
                  ['/tools/college-predictor', 'College Predictor Tool'],
                  ['/articles/choice-filling-josaa', 'JoSAA Choice Filling Guide'],
                  ['/exams/cuet-ug', 'CUET UG Counselling 2026'],
                  ['/rankings', 'Latest NIRF Rankings 2026'],
                  ['/compare', 'Compare Colleges 1-on-1'],
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
                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/10 rounded-full -ml-32 -mb-32 blur-3xl" />
                
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight relative z-10 leading-[1.1]">
                  Don't Gamble With Your Rank.<br />
                  <span className="text-sky-400">Lock Your Tier-1 Seat Now.</span>
                </h2>
                <p className="text-slate-300 font-medium max-w-2xl mx-auto mb-10 text-lg leading-relaxed relative z-10">
                  Join 25,000+ students who secured top-tier admissions via our scientific counselling aid. Helpdesk active 24/7 during locking windows.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
                  <Link
                    href="/contact"
                    className="px-10 py-5 bg-sky-500 text-white font-black text-xs uppercase tracking-widest rounded-full shadow-2xl hover:bg-sky-400 transition-all scale-110"
                  >
                    Start Choice Filling
                  </Link>
                  <div className="flex flex-col items-center sm:items-start gap-1">
                    <Link
                      href="tel:+919900116101"
                      className="px-10 py-5 bg-white/10 border border-white/20 text-white font-black text-xs uppercase tracking-widest rounded-full hover:bg-white/20 transition-all flex items-center gap-2"
                    >
                      <PhoneCall size={16} />
                      +91 99001 16101
                    </Link>
                    <p className="text-[9px] font-black text-sky-400 uppercase tracking-widest ml-2">Available 24/7 for Enrolled Students</p>
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
