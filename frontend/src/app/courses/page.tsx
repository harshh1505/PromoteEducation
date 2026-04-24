'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import {
  ArrowRight, GraduationCap, Stethoscope, Briefcase,
  Code, FlaskConical, Award, Users, BookOpen,
  TrendingUp, Sparkles, ChevronRight, Search,
  Target, Globe, ShieldCheck, HeartPulse
} from 'lucide-react'

const COURSE_STREAMS = [
  {
    id: 'btech',
    title: 'B.Tech & Engineering',
    description: 'Master JEE Main, JEE Advanced, and specialized engineering branches.',
    icon: Code,
    color: '#0ea5e9',
    bg: '#f0f9ff',
    border: '#bae6fd',
    stats: '240+ Articles',
    popular: ['Computer Science', 'AI & ML', 'Electronics', 'Mechanical'],
    href: '/courses/btech'
  },
  {
    id: 'mbbs',
    title: 'MBBS & Medical',
    description: 'Your roadmap from NEET preparation to clinical residency and beyond.',
    icon: Stethoscope,
    color: '#ef4444',
    bg: '#fef2f2',
    border: '#fecaca',
    stats: '260+ Articles',
    popular: ['NEET UG', 'Top Medical Colleges', 'Clinical Postings', 'Specializations'],
    href: '/courses/mbbs'
  },
  {
    id: 'mba',
    title: 'MBA & Management',
    description: 'Prepare for CAT, GMAT and lead the corporate world with elite B-Schools.',
    icon: Briefcase,
    color: '#f59e0b',
    bg: '#fffbeb',
    border: '#fde68a',
    stats: '180+ Articles',
    popular: ['CAT Strategy', 'IIM Selection', 'ROI Analysis', 'Corporate Placement'],
    href: '/courses/mba'
  },
  {
    id: 'mtech',
    title: 'M.Tech & PG Engg',
    description: 'Advanced research and specialization pathways through GATE and beyond.',
    icon: GraduationCap,
    color: '#8b5cf6',
    bg: '#f5f3ff',
    border: '#ddd6fe',
    stats: '120+ Articles',
    popular: ['GATE 2026', 'Research Labs', 'Direct Ph.D', 'PSU Recruitment'],
    href: '/courses/mtech'
  },
  {
    id: 'bsc-nursing',
    title: 'B.Sc Nursing',
    description: 'Step into the noble field of clinical care and advanced nursing practice.',
    icon: HeartPulse,
    color: '#10b981',
    bg: '#ecfdf5',
    border: '#a7f3d0',
    stats: '150+ Articles',
    popular: ['AIIMS Nursing', 'Clinical Skills', 'M.Sc Specialization', 'Staff Jobs'],
    href: '/courses/bsc-nursing'
  },
  {
    id: 'bds',
    title: 'BDS & Dental',
    description: 'Excellence in oral health, clinical procedures, and MDS specialization.',
    icon: FlaskConical,
    color: '#06b6d4',
    bg: '#ecfeff',
    border: '#a5f3fc',
    stats: '140+ Articles',
    popular: ['NEET MDS', 'Prosthodontics', 'Private Practice', 'Oral Surgery'],
    href: '/courses/bds'
  }
]

export default function CoursesHubPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "'DM Sans', sans-serif" }}>
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');
        .font-display { font-family: 'Playfair Display', Georgia, serif; }
        .hero-glow {
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 100vw;
          height: 600px;
          background: radial-gradient(circle at 50% 0%, rgba(14, 165, 233, 0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .stream-card { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .stream-card:hover { transform: translateY(-8px); }
        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }
        `
      }} />

      <Navbar />

      {/* Hero Section */}
      <section style={{ padding: '160px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-glow" />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '99px', background: '#f1f5f9', marginBottom: '24px' }}>
            <Sparkles size={14} style={{ color: '#0ea5e9' }} />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Your Education Journey Starts Here
            </span>
          </div>

          <h1 className="font-display" style={{ fontSize: 'clamp(40px, 6vw, 72px)', color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '24px' }}>
            Choose Your Path to <br />
            <em style={{ color: '#0ea5e9' }}>Academic Excellence</em>
          </h1>

          <p style={{ fontSize: '18px', color: '#64748b', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto 40px' }}>
            India's most comprehensive Knowledge Hub for prospective students. Expert guidance, detailed roadmaps, and data-driven insights for every major stream.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
            {[
              { label: 'Courses Covered', value: '12+', icon: BookOpen },
              { label: 'Active Learners', value: '2.5L+', icon: Users },
              { label: 'Expert Articles', value: '1200+', icon: Award },
            ].map((stat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0ea5e9' }}>
                  <stat.icon size={20} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>{stat.value}</p>
                  <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Streams Grid */}
      <section style={{ padding: '40px 0 100px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '24px' }}>
            {COURSE_STREAMS.map((stream) => (
              <Link key={stream.id} href={stream.href}>
                <div className="stream-card" style={{
                  background: '#ffffff',
                  borderRadius: '24px',
                  padding: '32px',
                  height: '100%',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer'
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    background: stream.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: stream.color,
                    marginBottom: '24px'
                  }}>
                    <stream.icon size={32} />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a' }}>{stream.title}</h3>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '4px 12px',
                      borderRadius: '99px',
                      background: stream.bg,
                      color: stream.color,
                      border: `1px solid ${stream.border}`
                    }}>
                      {stream.stats}
                    </div>
                  </div>

                  <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, marginBottom: '24px', flex: 1 }}>
                    {stream.description}
                  </p>

                  <div style={{ marginBottom: '28px' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
                      Popular in this stream
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {stream.popular.map(tag => (
                        <span key={tag} style={{
                          fontSize: '12px',
                          fontWeight: 600,
                          padding: '6px 14px',
                          borderRadius: '8px',
                          background: '#f8fafc',
                          border: '1px solid #f1f5f9',
                          color: '#475569'
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: stream.color
                  }}>
                    Explore Knowledge Hub <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '100px 0', background: '#0f172a', color: '#ffffff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <h2 className="font-display" style={{ fontSize: '42px', lineHeight: 1.1, marginBottom: '24px' }}>
                Why Students Trust <br />
                <span style={{ color: '#38bdf8' }}>Our Knowledge Hubs</span>
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '17px', lineHeight: 1.7, marginBottom: '40px' }}>
                We don't just provide information; we build roadmaps. Our stream-specific hubs are designed to guide you from high school foundation to your professional launch.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                {[
                  { title: 'Verified Content', desc: 'Updated weekly by academic experts.', icon: ShieldCheck },
                  { title: 'Data-Driven', desc: 'ROI and placement trends for every course.', icon: TrendingUp },
                  { title: 'Expert Roadmap', desc: 'Step-by-step prep strategy for exams.', icon: Target },
                  { title: 'Global Reach', desc: 'Information on international pathways.', icon: Globe },
                ].map((f, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <f.icon size={18} style={{ color: '#38bdf8' }} />
                      <h4 style={{ fontWeight: 700, fontSize: '16px' }}>{f.title}</h4>
                    </div>
                    <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                borderRadius: '32px',
                padding: '40px',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(56,189,248,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Premium Resource</p>
                    <h3 style={{ fontSize: '20px', fontWeight: 700 }}>2026 Admission Guide</h3>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {[
                    'Complete College Selection Matrix',
                    'Round-by-Round Counseling Strategy',
                    'Verified Placement Reports 2025',
                    'Expert Branch Comparison Tool'
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ChevronRight size={12} color="white" />
                      </div>
                      <span style={{ fontSize: '14px', color: '#cbd5e1', fontWeight: 500 }}>{item}</span>
                    </div>
                  ))}
                </div>

                <button style={{
                  width: '100%',
                  marginTop: '32px',
                  padding: '16px',
                  borderRadius: '12px',
                  background: '#38bdf8',
                  color: '#0f172a',
                  fontWeight: 800,
                  fontSize: '14px',
                  border: 'none',
                  cursor: 'pointer'
                }}>
                  Get Access Now
                </button>
              </div>

              {/* Decorative glow */}
              <div style={{
                position: 'absolute',
                top: '-20px', right: '-20px',
                width: '100px', height: '100px',
                background: 'radial-gradient(circle, rgba(56,189,248,0.2) 0%, transparent 70%)',
                zIndex: -1
              }} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}