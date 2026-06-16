import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// ─────────────────────────────────────────────
// SEO METADATA — Next.js App Router
// ─────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Scholarships & Education Loans India 2026 | Merit, Need & Government Schemes',
  description:
    'Comprehensive guide to scholarships in India 2026 — Fulbright, DAAD, Chevening, NSP, PMSSS. Check eligibility, amounts, deadlines and apply. Free counselling from Promote Education.',
  keywords: [
    'scholarships in India 2026', 'education loan India', 'merit scholarship', 'need based scholarship',
    'Fulbright scholarship India', 'DAAD scholarship', 'Chevening scholarship', 'NSP scholarship',
    'PMSSS scholarship', 'government scholarship India', 'scholarship for engineering students',
    'scholarship for medical students', 'free scholarship guidance India',
  ],
  openGraph: {
    title: 'Scholarships & Education Loans India 2026 | Promote Education',
    description:
      'Find the right scholarship for your course, category and budget. Detailed guide to 50+ national and international funding schemes with amounts and deadlines.',
    type: 'website',
    url: 'https://promoteeducation.in/scholarships',
  },
  alternates: { canonical: 'https://promoteeducation.in/scholarships' },
}

// ─────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────
const SCHOLARSHIPS = [
  // International
  {
    name: 'Fulbright-Nehru Fellowship',
    type: 'International',
    amount: '₹25–35 Lakh / year',
    coverage: 'Tuition, living, travel, insurance',
    eligibility: 'Indian citizens; Master\'s / PhD in USA',
    deadline: 'July 15, 2026',
    link: 'https://www.usief.org.in/',
    highlight: true,
  },
  {
    name: 'DAAD Scholarship (Germany)',
    type: 'International',
    amount: '€934 / month + benefits',
    coverage: 'Stipend, travel, health insurance',
    eligibility: 'Bachelor\'s degree, IELTS / German B2',
    deadline: 'October 1, 2026',
    link: 'https://www.daad.in/',
    highlight: false,
  },
  {
    name: 'Chevening Scholarship (UK)',
    type: 'International',
    amount: 'Full cost (avg. ₹40 Lakh)',
    coverage: '100% tuition + living allowance',
    eligibility: '2 years work experience, UG degree',
    deadline: 'November 7, 2025',
    link: 'https://www.chevening.org/',
    highlight: true,
  },
  {
    name: 'Australia Awards',
    type: 'International',
    amount: 'Full cost (AUD 60,000+)',
    coverage: 'Tuition, travel, establishment allowance',
    eligibility: 'Indian citizens; Bachelor\'s; IELTS 6.5+',
    deadline: 'April 30, 2026',
    link: 'https://www.australiaawards.gov.au/',
    highlight: false,
  },
  // Government — India
  {
    name: 'National Scholarship Portal (NSP)',
    type: 'Government — India',
    amount: '₹10,000 – ₹50,000 / year',
    coverage: 'Tuition + maintenance',
    eligibility: 'Income < ₹8 LPA; SC / ST / OBC / Minority',
    deadline: 'October 31, 2026',
    link: 'https://scholarships.gov.in/',
    highlight: true,
  },
  {
    name: 'PM Scholarship Scheme (PMSSS)',
    type: 'Government — India',
    amount: '₹25,000 – ₹30,000 / year',
    coverage: 'Tuition waiver',
    eligibility: 'Ex-servicemen wards; 12th ≥ 60%',
    deadline: 'September 30, 2026',
    link: 'https://ksb.gov.in/',
    highlight: false,
  },
  {
    name: 'Ishan Uday Scholarship (NE India)',
    type: 'Government — India',
    amount: '₹5,400 / month',
    coverage: 'Monthly stipend',
    eligibility: 'Domicile of NE states; UG / PG',
    deadline: 'October 31, 2026',
    link: 'https://scholarships.gov.in/',
    highlight: false,
  },
  // PSU / Corporate
  {
    name: 'ONGC Scholarship',
    type: 'PSU / Corporate',
    amount: '₹48,000 / year',
    coverage: 'Lump sum annual grant',
    eligibility: 'General top 25% merit; SC/ST top 10%',
    deadline: 'September 15, 2026',
    link: 'https://www.ongcindia.com/',
    highlight: false,
  },
  {
    name: 'LIC Golden Jubilee Scholarship',
    type: 'PSU / Corporate',
    amount: '₹20,000 / year',
    coverage: 'Annual grant',
    eligibility: 'Income < ₹2 LPA; 12th ≥ 60%',
    deadline: 'August 31, 2026',
    link: 'https://licindia.in/',
    highlight: false,
  },
  // University / Institution
  {
    name: 'TATA Capital Pankh Scholarship',
    type: 'Institution',
    amount: '₹10,000 – ₹50,000',
    coverage: 'Partial tuition',
    eligibility: 'Income < ₹4 LPA; UG 1st year',
    deadline: 'June 30, 2026',
    link: 'https://www.tatacapital.com/',
    highlight: false,
  },
]

const LOAN_SCHEMES = [
  { bank: 'SBI Student Loan', limit: 'Up to ₹1.5 Cr (abroad)', rate: '8.65% p.a.', moratorium: 'Course + 1 yr', note: 'No collateral up to ₹7.5 L' },
  { bank: 'HDFC Credila', limit: 'No upper limit', rate: '9.55% p.a.', moratorium: 'Course + 6 months', note: 'Fast-track approval in 5 days' },
  { bank: 'Axis Bank Education Loan', limit: 'Up to ₹75 Lakh', rate: '9.70% p.a.', moratorium: 'Course + 1 yr', note: 'Available for 50+ countries' },
  { bank: 'Vidya Lakshmi Portal', limit: 'Up to ₹6.5 Lakh (govt-backed)', rate: '4% p.a. (subsidised)', moratorium: '1 yr post-graduation', note: 'Central Interest Subsidy Scheme' },
]

const FAQS = [
  {
    q: 'Can I apply for multiple scholarships at the same time?',
    a: 'Yes. You can apply for multiple scholarships simultaneously as long as the individual scholarship\'s terms do not prohibit it. Government schemes like NSP generally allow stacking with institutional grants. International scholarships like Chevening and Fulbright typically prohibit holding another major scholarship concurrently.'
  },
  {
    q: 'What is the minimum income to qualify for need-based scholarships in India?',
    a: 'Most Central government need-based scholarships (NSP, PMSSS) require family income below ₹6–8 Lakh per annum. Some State-level schemes use a lower threshold of ₹2.5 Lakh. Private scholarships (TATA Pankh, LIC Golden Jubilee) typically cap eligibility at ₹2–4 LPA.'
  },
  {
    q: 'Which scholarship is best for studying MBBS in India?',
    a: 'For MBBS in government colleges, NSP Post-Matric Scholarships and State merit scholarships cover tuition effectively. PMSSS is specifically for wards of defence personnel. ONGC and LIC scholarships are also applicable and don\'t restrict to specific streams.'
  },
  {
    q: 'Is education loan interest tax-deductible in India?',
    a: 'Yes. Under Section 80E of the Income Tax Act, the entire interest paid on an education loan is deductible for up to 8 consecutive years from the year repayment begins. This applies to loans for higher education in India or abroad.'
  },
  {
    q: 'What documents are needed to apply for scholarships?',
    a: 'Standard requirements: mark sheets (Class 10, 12, graduation), income certificate (latest), caste/category certificate (if applicable), Aadhaar, bank passbook, a Statement of Purpose (SOP) for international scholarships, and two academic recommendation letters. Government portals like NSP also require your Aadhaar-linked bank account for direct transfer.'
  },
  {
    q: 'How do I check if a scholarship is genuine?',
    a: 'Always verify through official government portals (scholarships.gov.in for Central schemes), official university websites, or embassy portals for international scholarships. Legitimate scholarships never charge an application fee. Our team verifies all scholarships listed on Promote Education before publication.'
  },
]

const STEPS = [
  { n: '01', title: 'Profile Assessment', desc: 'We evaluate your academic record, family income, category, and career goals to shortlist the 5 most relevant funding sources for your profile.' },
  { n: '02', title: 'Document Preparation', desc: 'Guidance on writing a strong SOP, securing recommendation letters, and organising income/category certificates — the documents that make or break applications.' },
  { n: '03', title: 'Application Filing', desc: 'We complete and submit applications on the correct portals within deadlines, eliminating errors that cause rejection.' },
  { n: '04', title: 'Follow-up & Disbursement', desc: 'Tracking application status, responding to scholarship committee queries, and confirming timely fund disbursement to your account.' },
]

const TYPES = [
  {
    slug: 'merit-scholarships',
    label: 'Merit-Based',
    tagline: 'For academic high-achievers',
    desc: 'Awarded purely on academic performance — typically top 10–25% of a batch. Includes Central and State merit lists, university toppers\' grants, and international fellowships like Fulbright.',
    examples: ['Fulbright-Nehru Fellowship', 'ONGC Foundation Scholarship', 'SBI Asha Scholarship', 'Inspire Scholarship (DST)'],
  },
  {
    slug: 'need-based-scholarships',
    label: 'Need-Based',
    tagline: 'Based on family income',
    desc: 'Designed for students from economically weaker backgrounds. Government schemes (NSP, Post-Matric) and NGO bursaries form the bulk. Income threshold typically ₹2.5 – ₹8 LPA.',
    examples: ['NSP Post-Matric Scholarship', 'Ishan Uday (NE India)', 'TATA Pankh Scholarship', 'LIC Golden Jubilee'],
  },
  {
    slug: 'category-scholarships',
    label: 'Category / Reservation',
    tagline: 'SC · ST · OBC · Minority · EWS',
    desc: 'Exclusive schemes for reserved categories under Central and State government mandates. Often stackable with merit grants. Require a valid caste/category certificate.',
    examples: ['Dr. Ambedkar Foundation Scholarship', 'AIAPGET Minority Scholarship', 'PM YASASVI', 'State Post-Matric OBC Schemes'],
  },
  {
    slug: 'international-scholarships',
    label: 'International Study',
    tagline: 'For studying abroad',
    desc: 'Country-specific funding from foreign governments and universities — covering tuition, living, and travel. Competitive but open to Indian applicants across disciplines.',
    examples: ['Chevening (UK)', 'DAAD (Germany)', 'Australia Awards', 'Erasmus+ (EU)'],
  },
]

// ─────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────
export default function ScholarshipsPage() {
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
      { '@type': 'ListItem', position: 2, name: 'Scholarships', item: 'https://promoteeducation.in/scholarships' },
    ],
  }

  const jsonLdWebPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Scholarships & Education Loans India 2026',
    description: 'Complete guide to scholarships in India 2026 — merit, need-based, government, international.',
    url: 'https://promoteeducation.in/scholarships',
    publisher: {
      '@type': 'Organization',
      name: 'Promote Education',
      url: 'https://promoteeducation.in',
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebPage) }} />

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
                <li className="text-slate-700 font-bold">Scholarships & Loans</li>
              </ol>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
              <div className="flex-1 max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-sm mb-6">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  Updated April 2026 · 50+ Schemes Listed
                </div>

                <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1] mb-6">
                  Scholarships &<br />
                  <span className="text-sky-500">Education Loans</span><br />
                  India 2026
                </h1>

                <p className="text-lg text-slate-500 leading-relaxed max-w-2xl font-medium">
                  The most complete guide to funding your higher education in India and abroad — covering merit scholarships, government schemes, PSU grants, international fellowships, and low-interest education loans. With eligibility, amounts, and application deadlines.
                </p>
              </div>

              {/* Quick-jump box */}
              <aside className="lg:w-72 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm self-start">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Jump to section</p>
                <nav className="space-y-1">
                  {[
                    ['#scholarship-types', 'Types of Scholarships'],
                    ['#scholarship-table', '2026 Scholarship List'],
                    ['#how-to-apply', 'How to Apply'],
                    ['#education-loans', 'Education Loans'],
                    ['#eligibility', 'Eligibility Checker'],
                    ['#faq', 'FAQs'],
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
                { val: '₹500 Cr+', label: 'Funds Facilitated', sub: 'across 10,000+ students' },
                { val: '50+', label: 'Active Schemes', sub: 'India & international' },
                { val: '88%', label: 'Success Rate', sub: 'for assisted applications' },
                { val: 'Free', label: 'Our Guidance', sub: 'No hidden charges' },
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
          {/* ── TYPES OF SCHOLARSHIPS ── */}
          <section id="scholarship-types" className="py-20 border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
              <header className="mb-12">
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Types of Scholarships in India</h2>
                <p className="text-slate-500 max-w-2xl leading-relaxed font-medium">
                  Scholarships in India fall into four major categories. Understanding which type you qualify for is the first step to a successful application.
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {TYPES.map((t) => (
                  <article key={t.slug} className="bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-lg hover:border-slate-300 transition-all duration-300 group">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-[10px] font-black text-sky-500 uppercase tracking-widest mb-1">{t.tagline}</p>
                        <h3 className="text-lg font-black text-slate-900">{t.label} Scholarships</h3>
                      </div>
                      <Link
                        href={`/scholarships/${t.slug}`}
                        className="text-[10px] font-black text-slate-400 hover:text-sky-500 uppercase tracking-widest transition-colors flex items-center gap-1 mt-1"
                      >
                        View all <span>→</span>
                      </Link>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed mb-5 font-medium">{t.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {t.examples.map((ex) => (
                        <span key={ex} className="bg-slate-50 border border-slate-100 text-[11px] font-bold text-slate-600 px-3 py-1 rounded-lg">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ── SCHOLARSHIP TABLE ── */}
          <section id="scholarship-table" className="py-20 border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
              <header className="mb-10">
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
                  Scholarships for Indian Students 2026 — Complete List
                </h2>
                <p className="text-slate-500 font-medium max-w-2xl leading-relaxed">
                  Verified scholarships with confirmed 2026 amounts and deadlines. Sorted by type. Click any row to visit the official application portal.
                </p>
              </header>

              {/* Group by type */}
              {(['International', 'Government — India', 'PSU / Corporate', 'Institution'] as const).map((type) => {
                const group = SCHOLARSHIPS.filter(s => s.type === type)
                if (!group.length) return null
                return (
                  <div key={type} className="mb-10">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-3">
                      <span>{type}</span>
                      <span className="flex-1 border-t border-slate-100" />
                    </h3>
                    <div className="border border-slate-200 rounded-2xl overflow-hidden">
                      <table className="w-full border-collapse text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="text-left px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Scholarship</th>
                            <th className="text-left px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest hidden md:table-cell">Amount</th>
                            <th className="text-left px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest hidden lg:table-cell">Eligibility</th>
                            <th className="text-left px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Deadline</th>
                            <th className="px-5 py-3" />
                          </tr>
                        </thead>
                        <tbody>
                          {group.map((s, i) => (
                            <tr
                              key={s.name}
                              className={`border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors ${s.highlight ? 'bg-sky-50/40' : ''}`}
                            >
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-2">
                                  {s.highlight && (
                                    <span className="bg-sky-500 text-white text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-widest flex-shrink-0">
                                      Top Pick
                                    </span>
                                  )}
                                  <div>
                                    <p className="font-black text-slate-900">{s.name}</p>
                                    <p className="text-[11px] text-slate-400 font-medium mt-0.5 md:hidden">{s.amount}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-4 font-bold text-slate-700 hidden md:table-cell">
                                <p>{s.amount}</p>
                                <p className="text-[11px] text-slate-400 font-medium mt-0.5">{s.coverage}</p>
                              </td>
                              <td className="px-5 py-4 text-slate-500 font-medium hidden lg:table-cell max-w-xs">{s.eligibility}</td>
                              <td className="px-5 py-4">
                                <span className={`text-xs font-black px-2 py-1 rounded-sm ${
                                  new Date(s.deadline) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                                    ? 'bg-red-50 text-red-600'
                                    : 'bg-slate-100 text-slate-600'
                                }`}>
                                  {s.deadline}
                                </span>
                              </td>
                              <td className="px-5 py-4">
                                <a
                                  href={s.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sky-500 hover:underline text-[11px] font-black uppercase tracking-widest whitespace-nowrap"
                                  aria-label={`Apply for ${s.name}`}
                                >
                                  Apply →
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* ── HOW TO APPLY ── */}
          <section id="how-to-apply" className="py-20 bg-slate-50 border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
              <header className="mb-14">
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">How to Apply for Scholarships in India</h2>
                <p className="text-slate-500 font-medium max-w-2xl leading-relaxed">
                  Our four-step process handles everything from profile assessment to disbursement confirmation. No fee, no hidden charges.
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STEPS.map((s) => (
                  <article key={s.n} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                    <p className="text-5xl font-black text-slate-100 mb-4 leading-none">{s.n}</p>
                    <h3 className="text-base font-black text-slate-900 mb-3">{s.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{s.desc}</p>
                  </article>
                ))}
              </div>

              {/* Document checklist — high SEO value */}
              <div className="mt-14 bg-white border border-slate-200 rounded-2xl p-8">
                <h3 className="text-lg font-black text-slate-900 mb-6">Documents Required for Scholarship Applications</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      cat: 'Academic Documents',
                      items: ['Class 10 marksheet & certificate', 'Class 12 marksheet & certificate', 'Graduation degree / marksheets', 'Current institution enrolment proof'],
                    },
                    {
                      cat: 'Identity & Financial',
                      items: ['Aadhaar card (Aadhaar-linked bank a/c)', 'PAN card of parent/guardian', 'Income certificate from tahsildar', 'Caste / EWS certificate (if applicable)'],
                    },
                    {
                      cat: 'For International Scholarships',
                      items: ['Statement of Purpose (SOP)', '2 academic recommendation letters', 'IELTS / TOEFL / GMAT scores', 'Passport & valid visa (if already held)'],
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

          {/* ── EDUCATION LOANS ── */}
          <section id="education-loans" className="py-20 border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
              <header className="mb-10">
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Education Loans for Indian Students 2026</h2>
                <p className="text-slate-500 font-medium max-w-2xl leading-relaxed">
                  When scholarships don't cover the full cost, education loans bridge the gap. Compare the best options below — all interest is tax-deductible under Section 80E.
                </p>
              </header>

              <div className="border border-slate-200 rounded-2xl overflow-hidden mb-10">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest">Bank / Scheme</th>
                      <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest hidden md:table-cell">Max Loan</th>
                      <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest">Interest Rate</th>
                      <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest hidden lg:table-cell">Moratorium</th>
                      <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest hidden lg:table-cell">Key Benefit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {LOAN_SCHEMES.map((l, i) => (
                      <tr key={l.bank} className={`border-b border-slate-100 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-sky-50/30 transition-colors`}>
                        <td className="px-6 py-4 font-black text-slate-900">{l.bank}</td>
                        <td className="px-6 py-4 font-bold text-slate-700 hidden md:table-cell">{l.limit}</td>
                        <td className="px-6 py-4">
                          <span className="bg-emerald-50 text-emerald-700 text-xs font-black px-2 py-1 rounded-sm border border-emerald-100">
                            {l.rate}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-500 font-medium hidden lg:table-cell">{l.moratorium}</td>
                        <td className="px-6 py-4 text-slate-500 font-medium hidden lg:table-cell">{l.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex gap-4">
                <span className="text-amber-500 text-xl flex-shrink-0">§</span>
                <div>
                  <p className="text-sm font-black text-amber-900 mb-1">Tax Benefit — Section 80E</p>
                  <p className="text-sm text-amber-700 leading-relaxed font-medium">
                    The entire interest paid on an education loan is deductible from taxable income under Section 80E of the Income Tax Act, for up to 8 consecutive assessment years. There is no upper limit on the deductible interest amount.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── ELIGIBILITY QUICK-CHECK ── */}
          <section id="eligibility" className="py-20 bg-slate-900 text-white border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-6">
              <header className="mb-12">
                <h2 className="text-3xl font-black mb-3 tracking-tight">Scholarship Eligibility — Quick Reference</h2>
                <p className="text-slate-400 font-medium max-w-2xl leading-relaxed">
                  Find scholarships that match your profile. Use the table below as a quick-reference filter.
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    profile: 'General Category · Income > ₹8 LPA',
                    applies: ['Fulbright-Nehru', 'ONGC Scholarship', 'Chevening (UK)', 'University Merit Grants', 'DAAD Germany'],
                    note: 'Focus on merit-based and international scholarships.',
                  },
                  {
                    profile: 'SC / ST / OBC · Income < ₹2.5 LPA',
                    applies: ['NSP Post-Matric (100% aid)', 'PM YASASVI', 'Dr. Ambedkar Foundation', 'State Government Schemes', 'Ishan Uday (if NE India)'],
                    note: 'Multiple schemes can be combined. Apply by Oct 31.',
                  },
                  {
                    profile: 'EWS / General · Income < ₹8 LPA',
                    applies: ['NSP Merit-cum-Means', 'LIC Golden Jubilee', 'TATA Pankh Scholarship', 'PMSSS (if defence ward)', 'Inspire (if top 1% in 12th)'],
                    note: 'Income certificate from tahsildar is mandatory.',
                  },
                ].map((p) => (
                  <div key={p.profile} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <p className="text-[10px] font-black text-sky-400 uppercase tracking-widest mb-4">Profile</p>
                    <p className="text-sm font-black text-white mb-5 leading-snug">{p.profile}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Recommended Schemes</p>
                    <ul className="space-y-2 mb-5">
                      {p.applies.map((a) => (
                        <li key={a} className="text-sm text-slate-300 font-medium flex items-start gap-2">
                          <span className="text-sky-400 flex-shrink-0">→</span> {a}
                        </li>
                      ))}
                    </ul>
                    <p className="text-[11px] text-amber-400 font-bold leading-relaxed border-t border-white/10 pt-4">{p.note}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 text-center">
                <p className="text-slate-400 font-medium mb-5 text-sm">Not sure which category you fall in? Get a free profile assessment.</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-black text-xs uppercase tracking-widest rounded-full hover:bg-sky-50 transition-all"
                >
                  Book Free Consultation
                </Link>
              </div>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section id="faq" className="py-20 border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
              <header className="mb-14">
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Scholarship FAQs</h2>
                <p className="text-slate-500 font-medium">Common questions about scholarships and education loans in India.</p>
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
                  ['/exams/neet-ug', 'NEET UG 2026 Guide'],
                  ['/exams/jee-main', 'JEE Main 2026 Guide'],
                  ['/colleges/medical', 'Top Medical Colleges India'],
                  ['/colleges/engineering', 'Top Engineering Colleges India'],
                  ['/colleges/management', 'Top MBA Colleges India'],
                  ['/exams/cat', 'CAT 2026 Preparation'],
                  ['/tools/college-predictor', 'College Predictor Tool'],
                  ['/articles/how-to-write-sop', 'How to Write an SOP'],
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
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-6">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center">
                <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
                  Get Personalised Scholarship Guidance
                </h2>
                <p className="text-slate-500 font-medium max-w-xl mx-auto mb-8 leading-relaxed">
                  Our counsellors have helped 10,000+ students secure ₹500 Cr+ in scholarship funding. Free, no-obligation consultation.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="px-10 py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-full shadow-lg hover:bg-sky-500 transition-all"
                  >
                    Book Free Consultation
                  </Link>
                  <Link
                    href="/scholarships/guide-pdf"
                    className="px-10 py-4 bg-white border border-slate-200 text-slate-700 font-black text-xs uppercase tracking-widest rounded-full hover:bg-slate-50 transition-all"
                  >
                    Download Scholarship Guide (PDF)
                  </Link>
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