import ExamEditorialContent from '@/components/pages/exams/ExamEditorialContent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET PG 2026 | Eligibility, Cutoff, Syllabus & Important Dates',
  description: 'Your ultimate guide to NEET PG 2026. Get the latest updates on MD/MS/PG Diploma admissions, qualifying marks, exam pattern, and detailed syllabus for all medical graduates.',
  keywords: ['NEET PG', 'NEET PG 2026', 'MD MS admission', 'Postgraduate medical entrance', 'NBE exam']
}

const examData = {
  id: 'neet-pg',
  name: 'NEET PG',
  fullName: 'National Eligibility cum Entrance Test for Postgraduates',
  stream: 'Medical',
  conductedBy: 'NBE (National Board of Examinations)',
  frequency: 'Annually',
  duration: '3.5 Hours',
  totalMarks: '800',
  sections: [
    { id: 'overview', label: 'Overview' },
    { id: 'eligibility', label: 'Eligibility' },
    { id: 'pattern', label: 'Exam Pattern' },
    { id: 'syllabus', label: 'Syllabus' },
    { id: 'faq', label: 'FAQs' }
  ],
  overview: `The <strong>NEET PG</strong> is the single mandatory entrance examination for admission to various MD/MS and PG Diploma courses under the Indian Medical Council Act. Conducted by the <strong>National Board of Examinations (NBE)</strong>, it covers all medical colleges in India, including all-India quota seats and state quota seats (except for AIIMS, JIPMER, etc., which use <a href="/exams/ini-cet" class="text-sky-600 hover:underline">INI CET</a>). It is one of the most competitive exams in the world, testing the entire span of a candidate's MBBS knowledge.`,
  eligibility: [
    "A recognized MBBS degree or Provisional MBBS Pass Certificate from an institution recognized by the NMC.",
    "Permanent or provisional registration with NMC or State Medical Council.",
    "Completion of the 12-month compulsory rotating internship before the specified date (usually March 31st).",
    "Candidates who are already pursuing a PG course are generally ineligible for the same session."
  ],
  pattern: [
    { label: "Questions", value: "200 MCQ" },
    { label: "Max Marks", value: "800" },
    { label: "Marking", value: "+4 / -1" },
    { label: "Session", value: "Single Shift" }
  ],
  dates: [
    { event: "Registration Opens", date: "Jan 2026", status: 'open' as const },
    { event: "Registration Closes", date: "Feb 2026", status: 'upcoming' as const },
    { event: "Exam Date", date: "June 2026", status: 'upcoming' as const },
    { event: "Result Date", date: "July 2026", status: 'upcoming' as const }
  ],
  syllabus: [
    { subject: "Part A (Pre-Clinical)", topics: ["Anatomy", "Physiology", "Biochemistry"] },
    { subject: "Part B (Para-Clinical)", topics: ["Pharmacology", "Microbiology", "Pathology", "Forensic Medicine", "Social and Preventive Medicine"] },
    { subject: "Part C (Clinical)", topics: ["General Medicine", "General Surgery", "Obstetrics & Gynaecology", "Pediatrics", "Ophthalmology", "ENT", "Orthopedics"] }
  ],
  faqs: [
    { q: "Is there an age limit for NEET PG?", a: "There is currently no upper age limit for appearing in the NEET PG examination." },
    { q: "Can I choose my exam center?", a: "Yes, candidates can select their preferred city during registration, subject to seat availability on a first-come-first-served basis." }
  ],
  highlights: [
    { label: "Duration", value: "210 Minutes", icon: "Clock" },
    { label: "Total Questions", value: "200 MCQ", icon: "Target" },
    { label: "Level", value: "Postgraduate", icon: "Award" },
    { label: "Applicants", value: "2.5L+", icon: "Users" }
  ]
}

export default function Page() {
  return <ExamEditorialContent examData={examData} />
}
