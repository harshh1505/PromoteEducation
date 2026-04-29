import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { 
  Users, 
  Target, 
  Rocket, 
  CheckCircle2, 
  ArrowRight, 
  Star,
  BrainCircuit,
  Briefcase,
  GraduationCap,
  MessageCircle,
  TrendingUp,
  Award,
  PhoneCall,
  Clock,
  ShieldCheck,
  CheckSquare,
  FileSearch,
  Bell,
  HeartHandshake,
  ClipboardCheck
} from 'lucide-react'

// ─────────────────────────────────────────────
// SEO METADATA — Next.js App Router
// ─────────────────────────────────────────────
export const metadata: Metadata = {
  title: '1-on-1 Mentorship for IIT-JEE, NEET & Careers | Expert Mentors',
  description:
    'Get mentored by IITians, Doctors, and Industry Experts. Personalized study plans, doubt clearing, and career guidance for 2026 aspirants. Join India\'s top mentorship platform.',
  keywords: [
    'mentorship for JEE NEET', 'IITian mentors', 'NEET mentorship program', 
    '1-on-1 career coaching', 'study strategy for JEE', 'best mentorship for competitive exams',
    'AIIMS student mentorship', 'personalized study planner', 'career guidance India'
  ],
  openGraph: {
    title: 'Expert 1-on-1 Mentorship & Career Coaching | Promote Education',
    description:
      'Bridge the gap between your potential and your goals. Connect with mentors who have already conquered the path you are on.',
    type: 'website',
    url: 'https://promoteeducation.in/mentorship',
  },
  alternates: { canonical: 'https://promoteeducation.in/mentorship' },
}

// ─────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────
const MODULES = [
  {
    icon: BrainCircuit,
    title: "Diagnostic Assessment",
    desc: "A scientific audit of your current academic standing. We identify specific subject-wise gaps and cognitive strengths to build your baseline.",
    features: ["Skill Gap Analysis", "Cognitive Strength Mapping", "Subject Priority Audit", "Baseline Testing"]
  },
  {
    icon: Target,
    title: "Personalized Roadmap",
    desc: "Moving away from one-size-fits-all. We craft a day-by-day study schedule tailored to your pace, school timings, and personal goals.",
    features: ["Daily Study Planners", "Revision Cycles", "Backlog Management", "Custom Milestone Tracking"]
  },
  {
    icon: Users,
    title: "1-on-1 Mentorship Sessions",
    desc: "Direct access to mentors who are IITians or Doctors. Get your doubts resolved and strategies refined in personalized video/audio sessions.",
    features: ["Live Video Calls", "Unlimited WhatsApp Support", "Performance Reviews", "Doubt Clearing Hub"]
  },
  {
    icon: TrendingUp,
    title: "Exam Performance Audit",
    desc: "We don't just look at marks. We analyze your test-taking behavior—negative marking patterns, time management, and question selection strategy.",
    features: ["Accuracy Tracking", "Speed Optimization", "Negative Marking Control", "Test Analysis Reports"]
  },
  {
    icon: MessageCircle,
    title: "Mental Wellness & Focus",
    desc: "Managing exam stress is half the battle. Our counselors help you maintain peak mental health, motivation, and consistent focus levels.",
    features: ["Stress Management", "Burnout Prevention", "Motivation Workshops", "Mindfulness Techniques"]
  },
  {
    icon: Briefcase,
    title: "Career & Stream Guidance",
    desc: "Unsure about which branch to choose? Our experts provide data-backed insights into future industry trends, salaries, and career growth.",
    features: ["Branch vs College Audit", "Future Salary Trends", "Industry Expert Connect", "Career Path Visualization"]
  },
  {
    icon: Award,
    title: "Profile Building",
    desc: "For students eyeing top-tier universities, we guide you on building a holistic profile including extracurriculars, certifications, and projects.",
    features: ["Certification Guidance", "Project Assistance", "Extracurricular Strategy", "Holistic Profile Audit"]
  },
  {
    icon: GraduationCap,
    title: "Alumni Network Connect",
    desc: "Exclusive access to students currently studying in IITs, AIIMS, and IIMs. Get the real 'on-campus' perspective before you join.",
    features: ["Campus Life Briefings", "Peer Networking", "Senior-Junior Connect", "Exclusive Webinars"]
  },
  {
    icon: Rocket,
    title: "Interview & SOP Prep",
    desc: "Specialized training for university interviews and Statement of Purpose (SOP) writing for both Indian and International institutions.",
    features: ["Mock Interviews", "SOP Reviewing", "Soft Skills Grooming", "Personal Branding"]
  }
]

const STEPS = [
  { n: '01', title: 'Phase 1: Discovery', time: 'Month 1', desc: 'Understanding your current profile, habits, and setting realistic 12-month academic goals.' },
  { n: '02', title: 'Phase 2: Foundation', time: 'Month 2', desc: 'Strengthening core concepts and establishing a rigorous study discipline with 24/7 mentor support.' },
  { n: '03', title: 'Phase 3: Intensification', time: 'Month 3-5', desc: 'Deep-diving into complex problem solving and increasing study stamina for long-duration exams.' },
  { n: '04', title: 'Phase 4: Mock Mastery', time: 'Month 6-8', desc: 'Transitioning to full-length tests with focus on speed, accuracy, and minimizing negative marking.' },
  { n: '05', title: 'Phase 5: Final Strategy', time: 'Month 9-11', desc: 'Refining the final attempt strategy, revision of high-yield topics, and mental conditioning.' },
  { n: '06', title: 'Phase 6: Result & Beyond', time: 'Month 12', desc: 'Post-exam analysis, counseling guidance, and transition into your dream college campus.' },
]

const PROCESS_STEPS = [
  { title: 'Mentor Matching', desc: 'We pair you with a mentor who shares your background or has achieved the specific goal you are targeting (e.g., IIT-B CS).' },
  { title: 'Baseline Audit', desc: 'A comprehensive test to identify exactly where you stand in terms of speed, conceptual depth, and focus levels.' },
  { title: 'Agile Planning', desc: 'We create a 12-week sprint plan that is updated weekly based on your actual progress and feedback.' },
  { title: 'Feedback Loop', desc: 'Weekly reviews to track performance metrics and adjust strategies to ensure you are always ahead of the curve.' },
  { title: 'Real-time Support', desc: 'Direct access to your mentor via WhatsApp for any academic or motivational hurdles you face during the week.' },
  { title: 'Parent-Mentor Sync', desc: 'Regular updates for parents to ensure a supportive environment at home for the student\'s preparation.' },
]

const FAQS = [
  {
    q: "Who are the mentors?",
    a: "Our mentors are high-achievers from IITs, AIIMS, IIMs, and Fortune 500 companies. Every mentor goes through a rigorous selection process focused on their ability to teach and empathize."
  },
  {
    q: "Is this only for JEE and NEET?",
    a: "While we have massive expertise in JEE/NEET, we also offer mentorship for CUET, Law (CLAT), Management (IPMAT), and general career guidance for school students."
  },
  {
    q: "How many sessions do I get per month?",
    a: "Standard plans include 4 detailed 1-on-1 video sessions and unlimited WhatsApp/Chat support. Premium plans offer up to 8 sessions and daily performance tracking."
  },
  {
    q: "Can I change my mentor if I'm not satisfied?",
    a: "Absolutely. We ensure a perfect student-mentor fit. If you feel the teaching style isn't clicking, we facilitate a mentor change within 48 hours."
  },
  {
    q: "Do you provide study material?",
    a: "We provide curated study planners, practice sheets, and revision notes. We also guide you on which external books and modules are best for your current level."
  },
  {
    q: "Is parental involvement required?",
    a: "We believe in a three-way partnership between student, mentor, and parent. We provide monthly progress reports and occasional sync-up calls for parents."
  }
]

// ─────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────
export default function MentorshipPage() {
  const jsonLdService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': '1-on-1 Student Mentorship & Career Coaching 2026',
    'provider': {
      '@type': 'Organization',
      'name': 'Promote Education',
      'url': 'https://promoteeducation.in'
    },
    'areaServed': 'India',
    'description': 'Personalized mentorship for JEE, NEET, and career growth. Connect with mentors from IITs and AIIMS for personalized study plans and strategy.',
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Mentorship Programs',
      'itemListElement': MODULES.map(m => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': m.title,
          'description': m.desc
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
      { '@type': 'ListItem', position: 2, name: 'Mentorship', item: 'https://promoteeducation.in/mentorship' },
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
                <li className="text-slate-700 font-bold">Mentorship Program</li>
              </ol>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
              <div className="flex-1 max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-sm mb-6">
                  <Star size={12} className="text-emerald-500" />
                  India's Top-Rated Mentors · Admissions Open 2026
                </div>

                <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1] mb-6">
                  Bridge the Gap With<br />
                  <span className="text-sky-500 italic">Expert Mentors</span><br />
                  IIT · AIIMS · IIM
                </h1>

                <p className="text-lg text-slate-500 leading-relaxed max-w-2xl font-medium">
                  Academic excellence is just the start. Our mentorship program connects you with high-achievers who have already conquered the path you are on. Build the strategy, mindset, and discipline required for a global career.
                </p>
              </div>

              {/* Quick-jump box */}
              <aside className="lg:w-72 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm self-start">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Jump to section</p>
                <nav className="space-y-1">
                  {[
                    ['#modules', 'Mentorship Modules'],
                    ['#roadmap', 'Learning Roadmap'],
                    ['#process', 'Our Methodology'],
                    ['#why-us', 'Why Choose Us'],
                    ['#faq', 'Mentorship FAQs'],
                    ['#contact', 'Find Your Mentor'],
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
                { val: '10k+', label: 'Students', sub: 'Mentored to Success' },
                { val: '250+', label: 'Expert Mentors', sub: 'IIT / AIIMS / IIM' },
                { val: '92%', label: 'Improvement', sub: 'In Performance Scores' },
                { val: '24/7', label: 'Support Hub', sub: 'Doubt Clearing Desk' },
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
          {/* ── CORE MODULES ── */}
          <section id="modules" className="py-20 border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
              <header className="mb-12">
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Comprehensive Mentorship Modules</h2>
                <p className="text-slate-500 max-w-2xl leading-relaxed font-medium">
                  We've curated a multi-layered approach to ensure you're not just ready for an exam, but ready for a professional legacy.
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {MODULES.map((module, i) => (
                  <article key={i} className="bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-lg hover:border-slate-300 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-900 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500 mb-6 shadow-sm">
                      <module.icon size={24} />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-3">{module.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-6 font-medium">{module.desc}</p>
                    <div className="pt-5 border-t border-slate-50 space-y-2">
                      {module.features.map((item, idx) => (
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
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">The Mentorship Journey 2026</h2>
                <p className="text-slate-500 font-medium max-w-2xl leading-relaxed">
                  A structured 12-month program to transform your academic and professional profile.
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
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Our Mentorship Methodology</h2>
                <p className="text-slate-500 font-medium max-w-2xl leading-relaxed">
                  The science-backed process that ensures every mentee hits their peak potential.
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

              {/* Mentorship Checklist */}
              <div className="mt-14 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 mb-6">Mentorship Deliverables</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      cat: 'Academic Support',
                      items: ['Personalized Study Plans', 'Weekly Subject Drills', 'Doubt Clearing Sessions', 'Revision Trackers'],
                    },
                    {
                      cat: 'Performance Tools',
                      items: ['Test Analysis Dashboards', 'Error Log Templates', 'Efficiency Metrics', 'Mock Test Strategy'],
                    },
                    {
                      cat: 'Career Readiness',
                      items: ['Profile Audit Reports', 'Networking Opportunities', 'University Choice Guidance', 'Mental Health Counseling'],
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
                  <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">Why Trust Promote Education for Mentorship?</h2>
                  <p className="text-slate-500 mb-8 leading-relaxed font-medium">
                    Mentorship isn't just about advice; it's about structured accountability. Most students fail not due to lack of effort, but due to lack of a scientifically validated strategy. Our mentors have been in your shoes and have succeeded at the highest levels.
                  </p>
                  <ul className="space-y-4">
                    {[
                      { t: 'Top-Tier Mentors', d: 'Connect with students and alumni from IIT Bombay, Delhi, AIIMS Delhi, and top IIMs.' },
                      { t: 'Data-Backed Strategy', d: 'We use performance data to adjust your strategy in real-time, every single week.' },
                      { t: 'Holistic Development', d: 'Focus on mental health, discipline, and career networking alongside academics.' },
                      { t: 'Global Alumni Network', d: 'Join an exclusive community of high-achievers and future industry leaders.' }
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
                  <p className="text-[10px] font-black text-sky-500 uppercase tracking-widest mb-6">Mentorship Impact 2025</p>
                  <div className="space-y-8 relative z-10">
                    {[
                      { l: 'Score Improvement', v: '32% Avg', p: 'w-[92%]' },
                      { l: 'Student Retention', v: '96.4%', p: 'w-[96.4%]' },
                      { l: 'Successful Placements/Admissions', v: '88.1%', p: 'w-[88.1%]' },
                      { l: 'Mental Wellness Score', v: '4.8/5', p: 'w-[98%]' },
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
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Mentorship FAQs</h2>
                <p className="text-slate-500 font-medium">Common questions about our personalized mentorship and coaching.</p>
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
                  ['/counseling', 'Counselling Experts'],
                  ['/tools/college-predictor', 'College Predictor Tool'],
                  ['/articles/best-books-neet', 'Best Books for NEET'],
                  ['/articles/jee-advanced-preparation-strategy', 'JEE Advanced Strategy'],
                  ['/rankings', 'Latest Rankings 2026'],
                  ['/compare', 'Compare Institutions'],
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
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/10 rounded-full -ml-32 -mb-32 blur-3xl" />
                
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight relative z-10 leading-[1.1]">
                  Launch Your Professional Legacy.<br />
                  <span className="text-emerald-400">Find Your Perfect Mentor.</span>
                </h2>
                <p className="text-slate-300 font-medium max-w-2xl mx-auto mb-10 text-lg leading-relaxed relative z-10">
                  Join India's most influential network of high-achievers. Sessions are filling fast for the 2026 cohort.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
                  <Link
                    href="/contact"
                    className="px-10 py-5 bg-emerald-500 text-white font-black text-xs uppercase tracking-widest rounded-full shadow-2xl hover:bg-emerald-400 transition-all scale-110"
                  >
                    Find My Mentor
                  </Link>
                  <div className="flex flex-col items-center sm:items-start gap-1">
                    <Link
                      href="tel:+919900116101"
                      className="px-10 py-5 bg-white/10 border border-white/20 text-white font-black text-xs uppercase tracking-widest rounded-full hover:bg-white/20 transition-all flex items-center gap-2"
                    >
                      <PhoneCall size={16} />
                      +91 99001 16101
                    </Link>
                    <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest ml-2">Speak to Mentorship Coordinator</p>
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
