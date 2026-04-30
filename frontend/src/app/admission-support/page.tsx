import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { 
  ClipboardCheck, 
  FileText, 
  Calendar, 
  HelpCircle,
  CheckCircle2,
  PhoneCall,
  Clock,
  ShieldCheck,
  CheckSquare,
  FileSearch,
  Bell,
  HeartHandshake
} from 'lucide-react'

// ─────────────────────────────────────────────
// SEO METADATA — Next.js App Router
// ─────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Direct Admission Support India 2026 | Top Admission Consultants',
  description:
    'Best admission support in India for JEE, NEET, CUET & MBA. Expert admission consultants for form filling, JoSAA/MCC counselling, and direct admission guidance 2026-27.',
  keywords: [
    'admission support India', 'admission consultant India', 'best admission guidance',
    'form filling assistance', 'counselling help JEE NEET', 'college admission 2026',
    'JoSAA counselling aid', 'MCC counselling support', 'university registration help',
    'document verification service', 'admission alerts 2026', 'college reporting help',
    'engineering admission support', 'medical admission guidance', 'MBA admission consultant'
  ],
  openGraph: {
    title: 'Admission Support & Counselling Aid 2026 | Promote Education',
    description:
      'Secure your future seat with India\'s top admission consultants. End-to-end fulfillment for all major entrance exams and university admissions.',
    type: 'website',
    url: 'https://promoteeducation.in/admission-support',
  },
  alternates: { canonical: 'https://promoteeducation.in/admission-support' },
}

// ─────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────
const SERVICES = [
  {
    icon: FileSearch,
    title: "Form Filling Assistance",
    desc: "Precision handling of complex application forms. We manage your OMR and online registrations for JEE, NEET, CUET, and more with 100% accuracy.",
    features: ["Data Entry Audit", "Photo/Sign Formatting", "Fee Payment Support", "Category Certificate Check"]
  },
  {
    icon: CheckSquare,
    title: "Document Verification",
    desc: "Rigorous audit of your academic records, transcripts, and ID proofs. We ensure your paperwork meets the exact standards of the NTA, MCC, and state boards.",
    features: ["Gap Certificate Guidance", "Reservation Quota Audit", "Document Digitization", "Affidavit Preparation"]
  },
  {
    icon: Bell,
    title: "Alerts & Notifications",
    desc: "A personalized command center for your deadlines. Real-time updates via WhatsApp, SMS, and Email for every critical event in the admission cycle.",
    features: ["Real-time Deadlines", "Exam Date Reminders", "Counseling Call Alerts", "Result Publication Pushes"]
  },
  {
    icon: Calendar,
    title: "Choice-Filling Strategy",
    desc: "The most critical step. We build a scientific preference list based on your rank, category, and 5-year historical cutoff trends to maximize seat allotment.",
    features: ["Mock Allotment Analysis", "Trend-based Optimization", "Branch vs College Prioritization", "JoSAA/CSAB Specials"]
  },
  {
    icon: HeartHandshake,
    title: "Physical Reporting Aid",
    desc: "Transition smoothly from home to campus. We brief you on on-campus protocols, fee disbursement, and the final document submission process.",
    features: ["Reporting Checklists", "On-campus Protocol", "Fees Disbursement Aid", "Hostel Booking Guidance"]
  },
  {
    icon: HelpCircle,
    title: "Grievance Redressal",
    desc: "Direct coordination with university helpdesks. We resolve technical glitches, payment failures, and data discrepancies during the application window.",
    features: ["Correction Window Aid", "Nodal Center Connect", "Query Management", "Payment Failure Recovery"]
  },
  {
    icon: ShieldCheck,
    title: "NRI & Management Quota",
    desc: "Expert guidance for specialized seats. We help you navigate the eligibility and documentation required for NRI, Sponsored, and Management quotas.",
    features: ["Eligibility Assessment", "Sponsorship Documentation", "Direct Admission Tracking", "Quota-specific Counseling"]
  },
  {
    icon: Clock,
    title: "Seat Acceptance & Refunds",
    desc: "Managing the financial cycle. We guide you through seat acceptance fees, withdrawal processes, and ensuring timely refunds from portals.",
    features: ["Withdrawal Timing Advice", "Refund Tracking", "Seat Lock Procedures", "Floating vs Freezing Help"]
  },
  {
    icon: ClipboardCheck,
    title: "Post-Allotment Support",
    desc: "Our job isn't done until you're in class. We assist with initial registration, medical checkup requirements, and anti-ragging affidavit submissions.",
    features: ["Medical Certificate Format", "Anti-ragging Affidavits", "College Registration Link", "Initial Course Briefing"]
  }
]

const STEPS = [
  { n: '01', title: 'Phase 1: Registration', time: 'Nov – Jan', desc: 'Managing exam registrations for JEE, NEET, and university-specific entrances. We track 50+ deadlines simultaneously.' },
  { n: '02', title: 'Phase 2: Correction', time: 'Feb – April', desc: 'Opening the window for data correction, photo re-uploads, and ensuring your admit card generates without errors.' },
  { n: '03', title: 'Phase 3: Result Audit', time: 'May – June', desc: 'Analyzing your rank and percentile to determine the best possible tier-1 and tier-2 college options across India.' },
  { n: '04', title: 'Phase 4: Counseling', time: 'June – Aug', desc: 'Strategic choice filling for JoSAA, MCC, and state rounds. Handling up to 7 rounds of allotment and upgrades.' },
  { n: '05', title: 'Phase 5: Spot Rounds', time: 'Aug – Sept', desc: 'Maximizing chances in CSAB and institutional spot rounds where leftover seats in top colleges are filled at lower ranks.' },
  { n: '06', title: 'Phase 6: Enrollment', time: 'Sept – Oct', desc: 'Final document submission, physical verification, and commencement of the first semester of your degree.' },
]

const PROCESS_STEPS = [
  { 
    title: 'Profile Analysis & Benchmarking', 
    desc: 'We evaluate your academic history, budget, location preferences, and category. Using AI, we benchmark your rank against 10 years of historical data to find your "Safety," "Target," and "Reach" colleges.' 
  },
  { 
    title: 'Document Scrubbing & Audit', 
    desc: 'Our legal experts review every certificate (Income, Caste, Gap, EWS, PwD) to ensure zero rejection. We help you correct discrepancies in Aadhaar, marksheets, and signatures before the portal opens.' 
  },
  { 
    title: 'Managed Application Filing', 
    desc: 'Our specialized desk handles the actual data entry and submission. We ensure every field is error-free, photos are correctly scaled, and fee payments are confirmed with transaction IDs.' 
  },
  { 
    title: 'Real-time Deadline Tracking', 
    desc: 'We monitor 100+ portal updates daily. You receive instant alerts for correction windows, admit card releases, and result publications via WhatsApp and dedicated dashboard notifications.' 
  },
  { 
    title: 'Strategic Choice-Filling', 
    desc: 'We design your preference list for JoSAA, MCC, or State rounds. We prioritize colleges based on your specific rank volatility, branch placements, and future ROI, not just generic rankings.' 
  },
  { 
    title: 'Round-by-Round Optimization', 
    desc: 'Counseling is a marathon. We guide you on when to "Float," "Freeze," or "Slide" after each round to ensure you get the best possible upgrade in subsequent counseling stages.' 
  },
]

const FAQS = [
  {
    q: "What is JoSAA and MCC counseling?",
    a: "JoSAA handles admissions for 23 IITs, 31 NITs, and IIITs. MCC manages 15% All India Quota for MBBS/BDS in government colleges and 100% in Deemed/Central Universities. We provide specialized guidance for both."
  },
  {
    q: "Can you help with private university admissions?",
    a: "Yes, we handle applications for top private institutions like BITS, VIT, Manipal, SRM, and Amity. We also guide students through Management and NRI quota processes for these universities."
  },
  {
    q: "What happens if I miss a deadline?",
    a: "Our system sends you 5 reminders per deadline. If you've already missed a window, we analyze 'spot rounds' or alternative entrance exams that are still open for registration."
  },
  {
    q: "Do you provide help with document errors?",
    a: "Absolutely. We assist in correcting data during the 'correction window' and help you procure necessary affidavits or certificates (EWS, OBC-NCL, Gap certificates) required by the authorities."
  },
  {
    q: "Is your support limited to only one exam?",
    a: "No. Our 'Premium Admission Support' covers up to 5 different entrance exams and their subsequent counseling rounds, ensuring you have multiple safety nets for your career."
  },
  {
    q: "How do you help in choice-filling?",
    a: "We don't just list colleges. We use a proprietary algorithm that ranks colleges based on your specific rank, the previous 5-year cutoff volatility, and the placement trends for specific branches."
  }
]

// ─────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────
export default function AdmissionSupportPage() {
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
      { '@type': 'ListItem', position: 2, name: 'Admission Support', item: 'https://promoteeducation.in/admission-support' },
    ],
  }

  const jsonLdService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'College Admission Support & Counselling Service 2026',
    'provider': {
      '@type': 'Organization',
      'name': 'Promote Education',
      'url': 'https://promoteeducation.in'
    },
    'areaServed': 'India',
    'description': 'End-to-end admission support for JEE, NEET, CUET, and MBA. Services include form filling, document verification, and strategic choice-filling for JoSAA/MCC counselling.',
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Admission Services',
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
                <li className="text-slate-700 font-bold">Admission Support</li>
              </ol>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
              <div className="flex-1 max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 text-sky-700 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-sm mb-6">
                  <ShieldCheck size={12} className="text-sky-500" />
                  Admission Cycle 2026-27 · Enrolment Open
                </div>

                <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1] mb-6">
                  Secure Your<br />
                  <span className="text-sky-500 italic">Future Seat</span><br />
                  Expert Aid 2026
                </h1>

                <p className="text-lg text-slate-500 leading-relaxed max-w-2xl font-medium">
                  Don't let complex paperwork or missed deadlines stand between you and your dream university. Our admission support team manages every step of your application journey — from form filling to final campus reporting.
                </p>
              </div>

              {/* Quick-jump box */}
              <aside className="lg:w-72 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm self-start">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Jump to section</p>
                <nav className="space-y-1">
                  {[
                    ['#services', 'Core Services'],
                    ['#roadmap', 'Admission Roadmap'],
                    ['#process', 'Our Support Process'],
                    ['#why-us', 'Why Choose Us'],
                    ['#faq', 'Admission FAQs'],
                    ['#contact', 'Talk to Expert'],
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
                { val: '15k+', label: 'Applications', sub: 'Processed Yearly' },
                { val: '500+', label: 'Institutions', sub: 'Direct Partnerships' },
                { val: '100%', label: 'Success Rate', sub: 'Deadline Compliance' },
                { val: '0%', label: 'Error Rate', sub: 'Documentation Audits' },
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
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">End-to-End Admission Fulfillment</h2>
                <p className="text-slate-500 max-w-2xl leading-relaxed font-medium">
                  We handle the logistics so you can focus on your exams. Our services cover the entire spectrum of the admission cycle.
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
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">The Admission Roadmap 2026</h2>
                <p className="text-slate-500 font-medium max-w-2xl leading-relaxed">
                  A granular breakdown of the academic year. We provide precision support at every milestone.
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
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Our Support Process</h2>
                <p className="text-slate-500 font-medium max-w-2xl leading-relaxed">
                  The methodology behind our 100% success rate in admission fulfillment.
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

              {/* Document checklist — from scholarships theme */}
              <div className="mt-14 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 mb-6">Critical Admission Checklist</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      cat: 'Primary Documents',
                      items: ['Class 10 & 12 Marksheets', 'Birth Certificate / Age Proof', 'Aadhaar Card (Aadhar-linked)', '8-10 Passport Size Photos'],
                    },
                    {
                      cat: 'Verification Essentials',
                      items: ['Caste/Category Certificate', 'Income Certificate (latest)', 'Domicile Certificate', 'Gap Year Affidavit (if applicable)'],
                    },
                    {
                      cat: 'Counseling Kit',
                      items: ['Entrance Exam Admit Card', 'Result / Rank Card', 'Seat Allotment Letter', 'Registration Fee Receipts'],
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
                  <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">Why Choose Promote Education for Admission Guidance?</h2>
                  <p className="text-slate-500 mb-8 leading-relaxed font-medium">
                    As India's leading admission consultants, we bridge the gap between your hard work and your dream campus. Navigating the JoSAA/MCC/State counselling portals is complex—one wrong choice can lead to a year's loss or a sub-optimal college allotment.
                  </p>
                  <ul className="space-y-4">
                    {[
                      { t: 'Expertise in 50+ Entrances', d: 'From national exams like JEE/NEET to state-specific WBJEE, KCET, and COMEDK.' },
                      { t: '100% Success in Documentation', d: 'We have a zero-rejection track record for category and income certificates.' },
                      { t: 'Data-Driven Choice Lists', d: 'Preference orders generated using our proprietary rank-matching algorithm.' },
                      { t: 'Round-the-Clock Support', d: 'Direct access to senior admission experts during high-stress counseling rounds.' }
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
                  <p className="text-[10px] font-black text-sky-500 uppercase tracking-widest mb-6">Counseling Statistics 2025</p>
                  <div className="space-y-8 relative z-10">
                    {[
                      { l: 'Successful Allotments', v: '98.4%', p: 'w-[98.4%]' },
                      { l: 'Upgrades in Round 2/3', v: '74.2%', p: 'w-[74.2%]' },
                      { l: 'Top-100 College Placement', v: '82.1%', p: 'w-[82.1%]' },
                      { l: 'Student Satisfaction', v: '99.1%', p: 'w-[99.1%]' },
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
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Admission FAQs</h2>
                <p className="text-slate-500 font-medium">Common questions about university admissions and counselling support.</p>
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
                  ['/scholarships', 'Scholarship Guide 2026'],
                  ['/exams/neet-ug', 'NEET UG 2026 Eligibility'],
                  ['/exams/jee-main', 'JEE Main 2026 Cutoffs'],
                  ['/colleges/medical', 'Top Medical Colleges India'],
                  ['/colleges/engineering', 'Best Engineering Colleges'],
                  ['/counseling', 'JoSAA Choice Filling Support'],
                  ['/mentorship', 'One-on-One Mentorship'],
                  ['/tools/college-predictor', 'Rank Predictor Tool'],
                  ['/articles/neet-eligibility-2026', 'NEET Eligibility Criteria'],
                  ['/exams/cuet-ug', 'CUET UG 2026 Guide'],
                  ['/rankings', 'Latest NIRF Rankings'],
                  ['/compare', 'Compare Colleges'],
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
                  Your Dream Campus Is Waiting.<br />
                  <span className="text-sky-400">Let's Secure Your Seat.</span>
                </h2>
                <p className="text-slate-300 font-medium max-w-2xl mx-auto mb-10 text-lg leading-relaxed relative z-10">
                  Join 15,000+ students who secured top-tier admissions via Promote Education. Our helpdesk is active 24/7 during counseling rounds.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
                  <Link
                    href="/contact"
                    className="px-10 py-5 bg-sky-500 text-white font-black text-xs uppercase tracking-widest rounded-full shadow-2xl hover:bg-sky-400 transition-all scale-110"
                  >
                    Start Your Application
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
