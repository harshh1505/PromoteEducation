'use client'

import { ArrowRight, ExternalLink, GraduationCap, Stethoscope, Briefcase, Scale, Palette, FlaskConical, BookOpen } from 'lucide-react'
import Link from 'next/link'

const topExams = [
  { name: 'JEE Main', fullName: 'Joint Entrance Examination Main', stream: 'Engineering', icon: GraduationCap, applicants: '12L+', slug: 'jee-main', applyLink: 'https://jeemain.nta.nic.in/' },
  { name: 'JEE Advanced', fullName: 'Joint Entrance Examination Advanced', stream: 'Engineering', icon: GraduationCap, applicants: '2.5L+', slug: 'jee-advanced', applyLink: 'https://jeeadv.ac.in/' },
  { name: 'NEET UG', fullName: 'National Eligibility cum Entrance Test', stream: 'Medical', icon: Stethoscope, applicants: '20L+', slug: 'neet-ug', applyLink: 'https://neet.nta.nic.in/' },
  { name: 'CAT', fullName: 'Common Admission Test', stream: 'Management', icon: Briefcase, applicants: '2.8L+', slug: 'cat', applyLink: 'https://iimcat.ac.in/' },
  { name: 'GATE', fullName: 'Graduate Aptitude Test in Engineering', stream: 'Engineering', icon: FlaskConical, applicants: '8L+', slug: 'gate', applyLink: 'https://gate2025.iitr.ac.in/' },
  { name: 'CLAT', fullName: 'Common Law Admission Test', stream: 'Law', icon: Scale, applicants: '70K+', slug: 'clat', applyLink: 'https://consortiumofnlus.ac.in/' },
  { name: 'NIFT', fullName: 'National Institute of Fashion Technology', stream: 'Design', icon: Palette, applicants: '40K+', slug: 'nift', applyLink: 'https://nift.ac.in/' },
  { name: 'CUET UG', fullName: 'Common University Entrance Test', stream: 'General', icon: BookOpen, applicants: '14L+', slug: 'cuet-ug', applyLink: 'https://cuet.nta.nic.in/' },
]

export default function TopExamsSection() {
  return (
    <section className="py-16" style={{ background: 'var(--surface-2)' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-px" style={{ background: 'var(--gold)' }} />
              <span className="text-xs font-medium tracking-wider uppercase" style={{ color: 'var(--gold)', letterSpacing: '0.1em' }}>
                Exam hub
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-medium"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em', color: 'var(--ink)' }}
            >
              Top exams in India
            </h2>
            <p className="mt-1.5 text-sm" style={{ color: 'var(--ink-3)' }}>
              Eligibility, syllabus & preparation guides for every major entrance exam
            </p>
          </div>
          <Link
            href="/exams"
            className="hidden md:flex items-center gap-1.5 text-sm font-medium transition-all duration-150 hover:opacity-80"
            style={{ color: 'var(--action)' }}
          >
            All exams
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Marquee Scroller */}
        <div className="relative">
          <div className="flex animate-marquee-slow hover:[animation-play-state:paused]">
            {[...topExams, ...topExams, ...topExams].map((exam, idx) => {
              const Icon = exam.icon
              return (
                <div key={`${exam.slug}-${idx}`} className="flex-shrink-0 mx-2">
                  <div
                    className="w-56 rounded-xl p-4 card-hover flex flex-col gap-2.5"
                    style={{ background: 'var(--surface)', border: '0.5px solid var(--border)' }}
                  >
                    {/* Top row: Icon + Stream badge */}
                    <div className="flex items-center justify-between">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: 'var(--gold-light)' }}
                      >
                        <Icon size={15} style={{ color: 'var(--gold-dark)' }} />
                      </div>
                      <span
                        className="text-[9px] font-medium px-2 py-0.5 rounded-full"
                        style={{
                          background: 'var(--gold-light)',
                          color: 'var(--gold-dark)',
                          border: '0.5px solid var(--border)',
                          borderRadius: '999px',
                        }}
                      >
                        {exam.stream}
                      </span>
                    </div>

                    {/* Name */}
                    <div>
                      <Link href={`/exams/${exam.slug}`} className="hover:opacity-80 transition-opacity">
                        <h3 className="font-medium text-sm mb-0.5" style={{ color: 'var(--ink)', letterSpacing: '-0.01em' }}>
                          {exam.name}
                        </h3>
                      </Link>
                      <p className="text-[10px] leading-snug line-clamp-1" style={{ color: 'var(--ink-3)' }}>
                        {exam.fullName}
                      </p>
                    </div>

                    {/* Applicants */}
                    <div className="text-[10px]" style={{ color: 'var(--ink-4)' }}>
                      {exam.applicants} applicants
                    </div>

                    <div style={{ height: '0.5px', background: 'var(--border)' }} />

                    {/* Actions row */}
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/exams/${exam.slug}`}
                        className="flex-1 text-center text-[10px] font-medium py-1.5 rounded-lg transition-colors duration-150"
                        style={{ color: 'var(--action)', background: 'var(--surface-2)' }}
                      >
                        Details
                      </Link>
                      <a
                        href={exam.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 flex items-center justify-center gap-1 text-[10px] font-medium py-1.5 rounded-lg text-white transition-opacity duration-150 hover:opacity-90"
                        style={{ background: 'var(--midnight)' }}
                      >
                        Apply <ExternalLink size={9} />
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
        </div>

      </div>
    </section>
  )
}
