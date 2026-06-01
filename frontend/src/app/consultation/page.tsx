import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { 
  Video, 
  MessageSquare, 
  Calendar, 
  ShieldCheck, 
  Zap,
  Users,
  CheckCircle2,
  Clock,
  Smartphone,
  Globe,
  Share2,
  PhoneCall,
  Target,
  Briefcase,
  Award,
  ClipboardCheck,
  Search,
  MapPin
} from 'lucide-react'

// ─────────────────────────────────────────────
// SEO METADATA — Next.js App Router
// ─────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Free Expert Educational Consultation 2026 | Career Advice Call',
  description:
    'Book a free 1-on-1 educational consultation with India\'s top career experts. Get strategic advice on university selection, career pivots, and global studies for 2026.',
  keywords: [
    'educational consultation free', 'career advice call India', 'expert education consultant', 
    'university selection help', 'career pivot consultation', 'financial aid planning',
    'global study abroad consultant', 'profile audit expert', '1-on-1 student coaching'
  ],
  openGraph: {
    title: 'Free 1-on-1 Expert Educational Consultation | Promote Education',
    description:
      'Expert career guidance is now a click away. Access our network of certified counselors from any device, anywhere in the world.',
    type: 'website',
    url: 'https://promoteeducation.in/consultation',
  },
  alternates: { canonical: 'https://promoteeducation.in/consultation' },
}

// ─────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────
const SERVICES = [
  {
    icon: Video,
    title: "1-on-1 Strategic Consulting",
    desc: "Private sessions with domain experts to discuss your academic roadmap, institution preferences, and long-term career goals.",
    features: ["Private Video Calls", "Unlimited Q&A", "Personalized Roadmap", "Session Recording Access"]
  },
  {
    icon: Target,
    title: "Career Pivot Analysis",
    desc: "Thinking of switching streams? Our consultants analyze your transferable skills to find the most profitable career pivot for you.",
    features: ["Skill Gap Analysis", "Stream Switch Feasibility", "ROI of Transition", "Market Demand Audit"]
  },
  {
    icon: Globe,
    title: "Global Outreach Hub",
    desc: "Strategic guidance for international university applications—from Ivy League to European public universities and Australian campuses.",
    features: ["Country-wise ROI", "Visa Strategy Aid", "Scholarship Scouting", "Global Ranking Audit"]
  },
  {
    icon: Briefcase,
    title: "Financial Planning Aid",
    desc: "We help you navigate the complex world of education loans, collateral-free funding, and institutional scholarship applications.",
    features: ["Loan Eligibility Check", "Funding Source Audit", "Budget Optimization", "Repayment Planning"]
  },
  {
    icon: Award,
    title: "Profile Strengthening",
    desc: "Bespoke advice on certifications, internships, and research projects that will make your profile stand out to top-tier universities.",
    features: ["Certification Scouting", "Project Assistance", "CV Narrative Building", "LinkedIn Optimization"]
  },
  {
    icon: Users,
    title: "Corporate Networking",
    desc: "Learn how to leverage alumni networks and industry connections to secure internships even before you start your first semester.",
    features: ["Alumni Connect Hub", "Networking Workshops", "Internship Strategy", "Industry Expert Access"]
  },
  {
    icon: MessageSquare,
    title: "Conflict Resolution",
    desc: "Specialized sessions for parents and students to align expectations, career goals, and financial constraints for a unified decision.",
    features: ["Family Goal Alignment", "Budget Transparency", "Aspiration Balancing", "Mediation Sessions"]
  },
  {
    icon: ShieldCheck,
    title: "Legal & Documentation",
    desc: "Expert audit of your legal paperwork—Category certificates, Gap year affidavits, and University-specific legal requirements.",
    features: ["Document Validity Audit", "Affidavit Formats", "Correction Window Help", "Legal Requirement Guide"]
  },
  {
    icon: ClipboardCheck,
    title: "Post-Admissions Guide",
    desc: "Our job doesn't end with selection. We provide consultation on pre-enrollment protocols, on-campus life, and first-semester prep.",
    features: ["Reporting Protocols", "Hostel Selection Aid", "Campus Life Briefing", "Initial Course Setup"]
  }
]

const STEPS = [
  { n: '01', title: 'Phase 1: Discovery Call', time: 'Day 1', desc: 'A quick 15-minute briefing to understand your immediate concerns and current academic standing.' },
  { n: '02', title: 'Phase 2: Diagnostic Audit', time: 'Day 3', desc: 'Our experts analyze your profile and aspirations to create a baseline for the strategy session.' },
  { n: '03', title: 'Phase 3: Strategy Building', time: 'Day 7', desc: 'A 60-minute deep-dive session to build your 5-year academic and professional roadmap.' },
  { n: '04', title: 'Phase 4: Implementation', time: 'Ongoing', desc: 'Execution of the roadmap—University applications, profile building, and financial planning.' },
  { n: '05', title: 'Phase 5: Periodic Review', time: 'Monthly', desc: 'Monthly sync-up calls to track progress and adjust the strategy based on latest portal results.' },
  { n: '06', title: 'Phase 6: Goal Achievement', time: 'Month 12', desc: 'Final review session post-admission to celebrate your success and prep for campus life.' },
]

const PROCESS_STEPS = [
  { title: 'Slot Reservation', desc: 'Choose a time that fits your schedule via our automated booking engine with instant calendar sync.' },
  { title: 'Profile Pre-fill', desc: 'Submit your basic academic data before the call so our experts can come prepared with specific data.' },
  { title: 'Live Consultation', desc: 'An interactive session using digital whiteboards to visualize your career growth and institution options.' },
  { title: 'Session Recap', desc: 'Receive a session summary PDF and recording link within 2 hours of the consultation completion.' },
  { title: 'Continuous Support', desc: 'Follow-up access to the consultant via email/WhatsApp for any clarifications on the discussed strategy.' },
  { title: 'Outcome Tracking', desc: 'We monitor your application progress to ensure the consultation strategy is yielding real-world results.' },
]

const FAQS = [
  {
    q: "Is the first consultation really free?",
    a: "Yes, we believe every student deserves basic career clarity. Your initial 15-minute discovery call is 100% free with no obligation."
  },
  {
    q: "How do I join the video session?",
    a: "Once you book a slot, you will receive a Zoom or Google Meet link via email and WhatsApp. You can join from any smartphone or laptop."
  },
  {
    q: "Can I choose my consultant?",
    a: "Our system matches you based on your stream (Medical, Engineering, etc.), but you can also request specific experts from our directory."
  },
  {
    q: "What should I have ready for the call?",
    a: "Please keep your latest marksheets, rank cards, and a list of your top 3 career questions ready for a productive session."
  },
  {
    q: "Is the data I share kept private?",
    a: "Absolutely. All consultations are 100% private and encrypted. Your data is never shared with third-party institutions without your consent."
  },
  {
    q: "Can my parents join the session?",
    a: "We highly encourage parents to join the final strategy session as they are critical stakeholders in your educational journey."
  }
]

// ─────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────
export default function ConsultationPage() {
  const jsonLdService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': '1-on-1 Educational Consultation & Career Advice 2026',
    'provider': {
      '@type': 'Organization',
      'name': 'Promote Education',
      'url': 'https://promoteeducation.in'
    },
    'areaServed': 'India',
    'description': 'Expert 1-on-1 educational consultation for university selection, career planning, and profile building.',
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Consultation Modules',
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
      { '@type': 'ListItem', position: 2, name: 'Consultation', item: 'https://promoteeducation.in/consultation' },
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
                <li className="text-slate-700 font-bold">Expert Consultation</li>
              </ol>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
              <div className="flex-1 max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-sm mb-6">
                  <Video size={12} className="text-emerald-500" />
                  Live Expert Video Interaction · Booking Open
                </div>

                <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1] mb-6">
                  Consultation <br />
                  <span className="text-emerald-500 italic">Without Borders</span><br />
                  Expert Aid 2026
                </h1>

                <p className="text-lg text-slate-500 leading-relaxed max-w-2xl font-medium">
                  Expert career guidance is now a click away. Access our network of certified counselors from any device, anywhere in the world. Bridge the gap between your potential and professional excellence.
                </p>
              </div>

              {/* Quick-jump box */}
              <aside className="lg:w-72 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm self-start">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Jump to section</p>
                <nav className="space-y-1">
                  {[
                    ['#services', 'Consultation Modules'],
                    ['#roadmap', 'Success Roadmap'],
                    ['#process', 'Our Methodology'],
                    ['#why-us', 'Why Choose Us'],
                    ['#faq', 'Consultation FAQs'],
                    ['#contact', 'Secure Your Slot'],
                  ].map(([href, label]) => (
                    <a
                      key={href}
                      href={href}
                      className="flex justify-between items-center py-2 text-sm text-slate-600 hover:text-emerald-500 font-medium border-b border-slate-50 last:border-0 transition-colors"
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
                { val: '40k+', label: 'Consultations', sub: 'Completed Globally' },
                { val: '100+', label: 'Expert Mentors', sub: 'Certified Consultants' },
                { val: '4.9/5', label: 'Satisfaction', sub: 'Average User Rating' },
                { val: '24/7', label: 'Booking Desk', sub: 'Live Slot Availability' },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-3xl font-black text-slate-900">{s.val}</p>
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-1">{s.label}</p>
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
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Expert Consultation Modules</h2>
                <p className="text-slate-500 max-w-2xl leading-relaxed font-medium">
                  A multi-dimensional approach to career planning. We leverage technology to make expert advice accessible and interactive.
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {SERVICES.map((service, i) => (
                  <article key={i} className="bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-lg hover:border-slate-300 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-900 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 mb-6 shadow-sm">
                      <service.icon size={24} />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-3">{service.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-6 font-medium">{service.desc}</p>
                    <div className="pt-5 border-t border-slate-50 space-y-2">
                      {service.features.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
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
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Your Consultation Journey</h2>
                <p className="text-slate-500 font-medium max-w-2xl leading-relaxed">
                  A structured methodology from the first discovery call to final goal achievement.
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STEPS.map((s) => (
                  <article key={s.n} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-4xl font-black text-slate-100 leading-none">{s.n}</p>
                      <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded-sm border border-emerald-100">
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
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">A Truly Digital Experience</h2>
                <p className="text-slate-500 font-medium max-w-2xl leading-relaxed">
                  We've leveraged state-of-the-art technology to make career coaching more interactive and productive.
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

              {/* Consultation Checklist */}
              <div className="mt-14 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 mb-6">Consultation Session Deliverables</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      cat: 'Live Interaction',
                      items: ['Digital Whiteboard Mapping', 'Live Screen-share Audits', 'Face-to-Face Video Consultation', 'Instant Chat Resolution'],
                    },
                    {
                      cat: 'Post-Session Kit',
                      items: ['Consultation Summary PDF', 'Full Session Recording Link', 'Customized Action Plan', 'Follow-up Email Support'],
                    },
                    {
                      cat: 'Strategic Tools',
                      items: ['Budget Optimization Sheet', 'College Preference Tracker', 'Document Validity Checklist', 'Alumni Referral Codes'],
                    },
                  ].map((col) => (
                    <div key={col.cat}>
                      <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-4">{col.cat}</p>
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
                  <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">Why Choose Our Expert Consultation?</h2>
                  <p className="text-slate-500 mb-8 leading-relaxed font-medium">
                    In an era of information overload, clarity is the most valuable asset. Our consultants eliminate the noise and give you a straight-line strategy to your dream career. We don't just give advice; we build blueprints.
                  </p>
                  <ul className="space-y-4">
                    {[
                      { t: 'Certified Domain Experts', d: 'Every consultant is vetted for their expertise in specific fields like Tech, Medical, or Management.' },
                      { t: 'Multi-Lingual Support', d: 'Consult in your preferred regional language—English, Hindi, Bengali, or Marathi.' },
                      { t: 'Transparent ROI Logic', d: 'Our advice is always backed by real-world salary data and institutional performance reports.' },
                      { t: 'Zero Global Barriers', d: 'Join from any country. Our system handles time-zone sync and global connectivity.' }
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
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16" />
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-6">Consultation Impact 2025</p>
                  <div className="space-y-8 relative z-10">
                    {[
                      { l: 'User Satisfaction', v: '99.1%', p: 'w-[99.1%]' },
                      { l: 'Strategic Allotment', v: '88.4%', p: 'w-[88.4%]' },
                      { l: 'Budget Savings (Avg)', v: '₹4.2L', p: 'w-[92%]' },
                      { l: 'Resolution Speed', v: '24 Hours', p: 'w-[100%]' },
                    ].map((stat, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-end mb-2">
                          <p className="text-sm font-black text-slate-900">{stat.l}</p>
                          <p className="text-sm font-black text-emerald-500">{stat.v}</p>
                        </div>
                        <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                          <div className={`h-full bg-emerald-500 rounded-full ${stat.p}`} />
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
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Consultation FAQs</h2>
                <p className="text-slate-500 font-medium">Common questions about booking and attending expert sessions.</p>
              </header>
              <div className="space-y-10">
                {FAQS.map((f, i) => (
                  <article key={i}>
                    <h3 className="text-base font-black text-slate-900 mb-3 flex gap-3">
                      <span className="text-emerald-500 flex-shrink-0">Q.</span>
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
                  ['/mentorship', 'Expert Mentorship'],
                  ['/counselling', 'Counselling Strategy'],
                  ['/selection', 'Smart College Selection'],
                  ['/tools/college-predictor', 'College Predictor Tool'],
                  ['/articles/career-pivot-guide', 'Career Pivot Guide'],
                  ['/exams/neet-ug', 'NEET UG 2026 Strategy'],
                  ['/exams/jee-main', 'JEE Main 2026 Prep'],
                  ['/rankings', 'Latest University Rankings'],
                  ['/#compare-section', 'Compare Colleges 1-on-1'],
                  ['/articles/education-loan-guide', 'Education Loan Guide'],
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
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full -ml-32 -mb-32 blur-3xl" />
                
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight relative z-10 leading-[1.1]">
                  Your Global Career <br />
                  <span className="text-emerald-400">Starts With a Call.</span>
                </h2>
                <p className="text-slate-300 font-medium max-w-2xl mx-auto mb-10 text-lg leading-relaxed relative z-10">
                  Join 40,000+ students who have secured expert clarity via Promote Education. Discovery slots are now open for the 2026 session.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
                  <Link
                    href="/contact"
                    className="px-10 py-5 bg-emerald-500 text-white font-black text-xs uppercase tracking-widest rounded-full shadow-2xl hover:bg-emerald-400 transition-all scale-110"
                  >
                    Secure Your Slot Now
                  </Link>
                  <div className="flex flex-col items-center sm:items-start gap-1">
                    <Link
                      href="tel:+919900116101"
                      className="px-10 py-5 bg-white/10 border border-white/20 text-white font-black text-xs uppercase tracking-widest rounded-full hover:bg-white/20 transition-all flex items-center gap-2"
                    >
                      <PhoneCall size={16} />
                      +91 99001 16101
                    </Link>
                    <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest ml-2">Speak to Consultation Desk</p>
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
