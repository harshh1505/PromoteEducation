import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import {
  ArrowRight, MapPin, Clock, Briefcase, TrendingUp,
  BookOpen, Heart, Zap, Users, Coffee, Award, Mail
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Careers at Promote Education — Join Our Mission',
  description: 'Join the Promote Education team and help millions of students make smarter academic decisions. Explore open roles in technology, content, counselling, and business development.',
  alternates: { canonical: 'https://promoteducation.com/careers' },
}

// Each entry = one card. openings > 1 shows a badge.
const openRoles = [
  {
    title: 'Academic Counsellor',
    openings: 4,
    team: 'Counselling',
    location: 'Kolkata',
    type: 'Full-time',
    level: 'Junior-Mid',
    description: 'Advise students on the best academic pathways, course selections, and college choices based on their goals, scores, and preferences. Conduct one-on-one counselling sessions, build long-term student relationships, and support end-to-end enrollment across all streams — engineering, medical, management, and law.',
    tags: ['Student Advisory', 'Career Guidance', 'Communication', 'CRM'],
  },
  {
    title: 'Admission Counsellor',
    openings: 3,
    team: 'Admissions',
    location: 'Kolkata',
    type: 'Full-time',
    level: 'Junior-Mid',
    description: 'Manage the complete admissions workflow for students applying to partner colleges. Coordinate application documents, liaise with institutions, track application statuses, and ensure every student receives accurate, timely guidance through their entire admission journey.',
    tags: ['Admissions', 'Documentation', 'College Liaison', 'Pipeline Management'],
  },
  {
    title: 'Android App Developer',
    openings: 1,
    team: 'Engineering',
    location: 'Kolkata',
    type: 'Full-time',
    level: 'Mid',
    description: 'Design and build high-quality Android features for the Promote Education app used by thousands of students daily. Work closely with design and product teams to ship polished, performant experiences.',
    tags: ['Android', 'Kotlin', 'Jetpack Compose', 'REST APIs'],
  },
  {
    title: 'Backend Developer',
    openings: 1,
    team: 'Engineering',
    location: 'Kolkata',
    type: 'Full-time',
    level: 'Mid',
    description: 'Build and maintain scalable backend services powering our college discovery, exam data, and lead management systems. Write clean, well-tested code and contribute to architecture decisions.',
    tags: ['Node.js', 'PostgreSQL', 'Supabase', 'REST / GraphQL'],
  },
  {
    title: 'Content Writer',
    openings: 1,
    team: 'Editorial',
    location: 'Kolkata',
    type: 'Full-time',
    level: 'Junior-Mid',
    description: 'Research and write accurate, SEO-optimised articles on college admissions, entrance exams, courses, and career pathways. Collaborate with subject-matter experts to produce trustworthy content that students rely on.',
    tags: ['Content Writing', 'SEO', 'Research', 'Education'],
  },
]

// Total individual openings for the counter
const totalOpenings = openRoles.reduce((sum, r) => sum + r.openings, 0)

const teamColorMap: Record<string, string> = {
  'Engineering': 'bg-sky-50 text-sky-700 border-sky-200',
  'Product': 'bg-violet-50 text-violet-700 border-violet-200',
  'Editorial': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Design': 'bg-rose-50 text-rose-700 border-rose-200',
  'Counselling': 'bg-amber-50 text-amber-700 border-amber-200',
  'Admissions': 'bg-sky-50 text-sky-700 border-sky-200',
  'Marketing': 'bg-orange-50 text-orange-700 border-orange-200',
  'Partnerships': 'bg-teal-50 text-teal-700 border-teal-200',
  'Data & Analytics': 'bg-indigo-50 text-indigo-700 border-indigo-200',
}

const levelColorMap: Record<string, string> = {
  'Senior': 'bg-slate-900 text-white',
  'Lead': 'bg-slate-900 text-white',
  'Mid-Senior': 'bg-slate-700 text-white',
  'Mid': 'bg-slate-100 text-slate-700',
  'Junior-Mid': 'bg-slate-100 text-slate-700',
}

const perks = [
  { icon: TrendingUp, label: 'Competitive Compensation', desc: 'Market-rate salaries with equity for senior roles' },
  { icon: Coffee, label: 'Flexible Work', desc: 'Remote-first with hubs in Kolkata, Bangalore, and Delhi' },
  { icon: BookOpen, label: '₹15,000 - ₹40,000 Learning Budget', desc: 'Annual budget for courses, books, and conferences' },
  { icon: Heart, label: 'Health Insurance', desc: 'Comprehensive medical cover for you and your family' },
  { icon: Zap, label: 'Equipment', desc: 'Best-in-class equipment to do your best work' },
  { icon: Users, label: '5-Day Work Week', desc: 'Strict 5-day week with no-meeting Fridays' },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 pt-32">

        {/* ── Page Header ── */}
        <section className="py-16 border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-10 h-[2px] bg-sky-500" />
                  <span className="text-[11px] font-black text-sky-500 uppercase tracking-[0.2em]">Open Positions</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.05]">
                  Find your role<br />at Promote Education.
                </h1>
              </div>
              <div className="md:max-w-xs">
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-5">
                  We are hiring across engineering, content, counselling, design, and business. All roles are open to candidates across India.
                </p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{totalOpenings} Open Roles</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Open Roles ── */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="space-y-4">
              {openRoles.map((role, i) => (
                <div
                  key={i}
                  className="group p-8 rounded-3xl border border-slate-100 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-100/80 transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-widest ${teamColorMap[role.team] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                          {role.team}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${levelColorMap[role.level] || 'bg-slate-100 text-slate-600'}`}>
                          {role.level}
                        </span>
                        <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                          <MapPin size={11} /> {role.location}
                        </span>
                        <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                          <Clock size={11} /> {role.type}
                        </span>
                        {role.openings > 1 && (
                          <span className="px-3 py-1 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-widest">
                            {role.openings} openings
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl font-black text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
                        {role.title}
                      </h2>
                      <p className="text-sm text-slate-500 leading-relaxed max-w-2xl mb-5">{role.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {role.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-slate-50 border border-slate-100 text-slate-500 text-[11px] font-bold rounded-lg">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="shrink-0">
                      <a
                        href={`mailto:careers@promoteducation.com?subject=Application: ${role.title}`}
                        className="inline-flex items-center gap-2 px-7 py-3.5 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-sky-500 transition-all shadow-lg shadow-slate-900/10 group-hover:shadow-sky-500/20"
                      >
                        Apply Now
                        <ArrowRight size={15} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Perks ── */}
        <section className="py-20 bg-slate-50 border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-10 h-[2px] bg-sky-500" />
                  <span className="text-[11px] font-black text-sky-500 uppercase tracking-[0.2em]">Benefits & Perks</span>
                </div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-[1.05]">
                  We take care of our team.
                </h2>
              </div>
              <p className="text-slate-500 text-sm font-medium max-w-xs leading-relaxed">
                People do their best work when they feel supported. Here is what we offer everyone at Promote Education.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {perks.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="flex items-start gap-5 p-7 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-md hover:shadow-slate-100 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900 mb-1">{label}</div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Hiring Process ── */}
        <section className="py-20 bg-white border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-10 h-[2px] bg-sky-500" />
                  <span className="text-[11px] font-black text-sky-500 uppercase tracking-[0.2em]">Hiring Process</span>
                </div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-[1.05]">
                  Transparent, fast,<br />and human.
                </h2>
              </div>
              <p className="text-slate-500 text-sm font-medium max-w-xs leading-relaxed">
                Our entire process takes 2–3 weeks. No ghost rounds, no unnecessary steps.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Apply', desc: 'Send your CV and a brief note on why you want to join Promote Education. No cover letter templates — just be yourself.' },
                { step: '02', title: 'Intro Call', desc: 'A 30-minute conversation with a hiring manager. We want to understand your story, experience, and what motivates you.' },
                { step: '03', title: 'Skills Round', desc: 'A practical, role-specific assessment — a case study, take-home task, or technical interview. Never more than 3 hours of your time.' },
                { step: '04', title: 'Final Interview', desc: 'Meet the team leads and founders. We discuss culture fit, long-term goals, and answer every question you have about us.' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="p-6 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all">
                  <div className="text-5xl font-black text-slate-100 leading-none mb-4">{step}</div>
                  <h3 className="text-base font-black text-slate-900 mb-2">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Offices ── */}
        <section className="py-20 bg-slate-50 border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-10 h-[2px] bg-sky-500" />
                  <span className="text-[11px] font-black text-sky-500 uppercase tracking-[0.2em]">Our Offices</span>
                </div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-[1.05]">
                  Remote-first,<br />with three great hubs.
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  city: 'Kolkata',
                  tag: 'Headquarters',
                  address: 'Ecosuite Business Tower, Newtown, Action Area II, Kolkata — 700161',
                  teams: ['Engineering', 'Product', 'Editorial'],
                },
                {
                  city: 'Bangalore',
                  tag: 'Growth Hub',
                  address: 'S5 Hiprofiles Business Centre, 1/A Church Street, Bangalore — 560001',
                  teams: ['Marketing', 'Partnerships', 'Sales'],
                },
                {
                  city: 'Delhi',
                  tag: 'Operations',
                  address: 'U-179, Office No. 303, The Eduguide, Laxmi Nagar, New Delhi — 110092',
                  teams: ['Counselling', 'BD', 'Operations'],
                },
              ].map(({ city, tag, address, teams }) => (
                <div key={city} className="p-8 rounded-3xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-lg hover:shadow-slate-100 transition-all">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-2xl font-black text-slate-900">{city}</h3>
                    <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">{tag}</span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-5">{address}</p>
                  <div className="flex flex-wrap gap-2">
                    {teams.map((t) => (
                      <span key={t} className="px-3 py-1 bg-slate-50 border border-slate-100 text-slate-500 text-[11px] font-bold rounded-lg">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Minimal Email CTA ── */}
        <section className="py-16 border-t border-slate-100 bg-white">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Don&apos;t see your role?</p>
              <p className="text-lg font-black text-slate-900">Send us a speculative application and we&apos;ll keep you in mind.</p>
            </div>
            <a
              href="mailto:careers@promoteducation.com"
              className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-sky-500 transition-all"
            >
              <Mail size={15} />
              careers@promoteducation.com
            </a>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
