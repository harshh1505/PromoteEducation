import React from 'react'

export interface ArticleContent {
  slug: string
  title: string
  category: string
  lastUpdated: string
  readTime: string
  summary: string
  sections: {
    title: string
    content: React.ReactNode
  }[]
}

export const articleDatabase: Record<string, ArticleContent> = {
  'bitsat-eligibility': {
    slug: 'bitsat-eligibility',
    title: 'BITSAT 2026 Detailed Eligibility Criteria',
    category: 'Eligibility',
    lastUpdated: 'April 25, 2026',
    readTime: '6 min read',
    summary: 'A complete breakdown of the mandatory requirements for BITSAT 2026, including board percentage rules, subject combinations, and the unique direct admission policy for toppers.',
    sections: [
      {
        title: 'Academic Qualification',
        content: (
          <div className="space-y-4">
            <p>To be eligible for BITSAT 2026, candidates must have passed the 12th examination of 10+2 system from a recognized Central or State board or its equivalent with Physics, Chemistry, and Mathematics (for Engineering) or Biology (for Pharmacy).</p>
            <div className="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl">
              <p className="text-sm font-bold text-sky-900 mb-1">The 75-60 Rule</p>
              <p className="text-xs text-sky-800">Candidates must have obtained a minimum of <strong>75% aggregate marks</strong> in Physics, Chemistry, and Mathematics/Biology subjects, with at least <strong>60% marks in each</strong> of these subjects individually.</p>
            </div>
          </div>
        )
      },
      {
        title: 'Year of Passing',
        content: (
          <p>Only students who are appearing for 12th class examination in 2026 or who have passed 12th class examination in 2025 are eligible to appear in BITSAT 2026. Students who passed 12th in 2024 or earlier are NOT eligible.</p>
        )
      }
    ]
  },
  'bits-pilani-cutoff': {
    slug: 'bits-pilani-cutoff',
    title: 'BITS Pilani Cutoff Trends (2021-2025)',
    category: 'Analysis',
    lastUpdated: 'April 24, 2026',
    readTime: '10 min read',
    summary: 'Historical analysis of BITS Pilani scores required for top branches like Computer Science, Electronics, and Mechanical across Pilani, Goa, and Hyderabad campuses.',
    sections: [
      {
        title: 'Pilani Campus (Main)',
        content: (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-3 text-left">Branch</th>
                  <th className="p-3 text-center">2024 Cutoff</th>
                  <th className="p-3 text-center">2025 (Expected)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr><td className="p-3 font-bold">Computer Science</td><td className="p-3 text-center">331</td><td className="p-3 text-center text-sky-600 font-bold">335-340</td></tr>
                <tr><td className="p-3 font-bold">Electronics & Comm</td><td className="p-3 text-center">298</td><td className="p-3 text-center">305+</td></tr>
                <tr><td className="p-3 font-bold">Mechanical</td><td className="p-3 text-center">244</td><td className="p-3 text-center">250+</td></tr>
              </tbody>
            </table>
          </div>
        )
      }
    ]
  },
  'bitsat-bonus-questions': {
    slug: 'bitsat-bonus-questions',
    title: 'The Bonus Question Strategy: How to Score 400+',
    category: 'Strategy',
    lastUpdated: 'April 25, 2026',
    readTime: '8 min read',
    summary: 'The secret weapon of BITSAT toppers. Learn how to unlock and tackle the 12 bonus questions to push your score beyond the standard 390 limit.',
    sections: [
      {
        title: 'How it Works',
        content: (
          <p>If a candidate answers all 130 questions in the BITSAT (without skipping any), they unlock <strong>12 additional bonus questions</strong> (4 each from Physics, Chemistry, and Mathematics). These questions allow you to score beyond the maximum marks of the standard paper.</p>
        )
      },
      {
        title: 'The Risk vs Reward',
        content: (
          <p>The catch is that once you opt for bonus questions, you <strong>cannot go back</strong> to edit your previous 130 answers. Toppers suggest only attempting this if you have at least 20-30 minutes remaining and are confident in 90% of your answers.</p>
        )
      }
    ]
  },
  'bitsat-vs-jee': {
    slug: 'bitsat-vs-jee',
    title: 'BITSAT vs JEE Main: Key Differences in 2026',
    category: 'Comparison',
    lastUpdated: 'April 25, 2026',
    readTime: '7 min read',
    summary: 'A head-to-head comparison of difficulty level, syllabus, time management, and examination patterns to help you tailor your preparation for both.',
    sections: [
      {
        title: 'Speed vs Depth',
        content: (
          <p>While JEE Main focuses on depth and conceptual application, BITSAT is a <strong>pure speed test</strong>. You have to solve more questions in the same amount of time. Precision and quick mental math are rewarded more in BITSAT than in JEE Main.</p>
        )
      }
    ]
  },
  'bitsat-english-lr': {
    slug: 'bitsat-english-lr',
    title: 'Mastering BITSAT English & Logical Reasoning',
    category: 'Syllabus',
    lastUpdated: 'April 25, 2026',
    readTime: '9 min read',
    summary: 'The English & LR section accounts for 20% of your BITSAT score but is often neglected. Learn the high-yield topics and strategies to score a perfect 75/75.',
    sections: [
      {
        title: 'English Proficiency',
        content: (
          <p>Focus on Synonyms, Antonyms, and Reading Comprehension. BITSAT English isn\'t about complex literature; it\'s about precision and common usage. Practice at least 20 analogies every day.</p>
        )
      },
      {
        title: 'Logical Reasoning',
        content: (
          <p>This section tests your non-verbal and verbal reasoning. Topics like "Series Completion", "Figure Matrix", and "Paper Folding" are frequently asked. Unlike PCM, these marks are "free" if you practice enough.</p>
        )
      }
    ]
  },
  'bits-direct-admission': {
    slug: 'bits-direct-admission',
    title: 'Direct Admission for Board Toppers: The Ultimate Guide',
    category: 'Admission',
    lastUpdated: 'April 25, 2026',
    readTime: '5 min read',
    summary: 'Did you know that BITS Pilani offers direct admission to first rank holders of all Central and State boards in India? Learn the eligibility and application process for this elite entry.',
    sections: [
      {
        title: 'Eligibility for Direct Entry',
        content: (
          <p>The First Rank holder (Topper) of any Central or State board in India is guaranteed admission to the program of their choice, regardless of their BITSAT score. You must be the overall topper of the 12th board in the Science stream.</p>
        )
      }
    ]
  },
  'bitsat-crash-course': {
    slug: 'bitsat-crash-course',
    title: '30-Day BITSAT Sprint: Strategy for 2026',
    category: 'Strategy',
    lastUpdated: 'April 25, 2026',
    readTime: '12 min read',
    summary: 'A day-by-day preparation plan for the final month before BITSAT. Focus on high-weightage topics and increasing your solving speed.',
    sections: [
      {
        title: 'Week 1: High Weightage Review',
        content: (
          <p>Focus on Electrostatics, Modern Physics, Thermodynamics, and Organic Chemistry. These form the backbone of the BITSAT paper.</p>
        )
      },
      {
        title: 'Week 4: Mock Test Marathon',
        content: (
          <p>Take one full-length mock test every day at the exact time of your actual exam slot. This builds biological clock synchronization and exam stamina.</p>
        )
      }
    ]
  }
}
