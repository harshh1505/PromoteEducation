import ExamEditorialContent from '@/components/pages/exams/ExamEditorialContent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AIIMS Nursing & Para-Medical Entrance 2026 | Eligibility & Dates',
  description: 'Comprehensive guide to AIIMS B.Sc Nursing and Para-Medical entrance exams 2026. Get latest eligibility criteria (55% Gen/OBC), exam pattern, and important dates for AIIMS across India.',
  keywords: ['AIIMS Nursing entrance', 'AIIMS B.Sc Nursing 2026', 'AIIMS Para-medical admission', 'AIIMS entrance exam eligibility']
}

const examData = {
  id: 'aiims-entrance',
  name: 'AIIMS Nursing',
  fullName: 'AIIMS B.Sc (Hons) Nursing & Para-Medical Entrance Examination',
  stream: 'Medical',
  conductedBy: 'AIIMS, New Delhi',
  frequency: 'Annually',
  duration: '2 Hours',
  totalMarks: '100',
  sections: [
    { id: 'overview', label: 'Overview' },
    { id: 'eligibility', label: 'Eligibility' },
    { id: 'pattern', label: 'Exam Pattern' },
    { id: 'syllabus', label: 'Syllabus' },
    { id: 'faq', label: 'FAQs' }
  ],
  overview: `The <strong>AIIMS Nursing & Para-Medical Entrance</strong> is a national-level examination conducted by <strong>AIIMS New Delhi</strong> for admission to B.Sc (Hons) Nursing, B.Sc (Post-Basic) Nursing, and various Para-medical courses at AIIMS institutions nationwide. Known for its high academic standards and clinical excellence, AIIMS provides one of the most prestigious nursing certifications in Asia. The entrance test specifically evaluates the candidate's scientific aptitude and general knowledge.`,
  eligibility: [
    "Candidates must have passed 10+2 or equivalent with Physics, Chemistry, Biology, and English.",
    "A minimum aggregate of 55% for General/OBC candidates and 50% for SC/ST candidates in the qualifying exam.",
    "The candidate must be at least 17 years of age as of December 31st of the admission year.",
    "Only female candidates are generally eligible for B.Sc (Hons) Nursing across most AIIMS institutes."
  ],
  pattern: [
    { label: "Questions", value: "100 MCQ" },
    { label: "Total Time", value: "120 Minutes" },
    { label: "Marking", value: "+1 / -1/3" },
    { label: "Mode", value: "Computer Based" }
  ],
  dates: [
    { event: "Basic Registration", date: "Feb 2026", status: 'open' as const },
    { event: "Final Registration", date: "Mar 2026", status: 'upcoming' as const },
    { event: "Exam Date", date: "June 2026", status: 'upcoming' as const },
    { event: "Results", date: "July 2026", status: 'upcoming' as const }
  ],
  syllabus: [
    { subject: "Physics", topics: ["Magnetic Effect of Current", "Atoms and Nuclei", "Electronic Devices", "Optics", "Dual Nature of Matter"] },
    { subject: "Chemistry", topics: ["Solid State", "Chemical Kinetics", "Surface Chemistry", "General Principles of Isolation of Elements", "p-Block Elements"] },
    { subject: "Biology", topics: ["Cell Theory", "Structural Organization of Cell", "Mendel's Law of Inheritance", "Five Kingdom Classification"] },
    { subject: "General Knowledge", topics: ["Current Affairs", "General Policy", "Scientific Research", "Geography", "History"] }
  ],
  faqs: [
    { q: "Can male candidates apply for B.Sc Nursing at AIIMS?", a: "No, AIIMS B.Sc (Hons) Nursing is currently open only for female candidates. Male candidates can apply for specific Para-medical courses." },
    { q: "What is Basic Registration at AIIMS?", a: "AIIMS uses a PAAR (Prospective Applicants Advanced Registration) system. Basic registration is the first step where you upload your photo and details; it is valid for future years as well." }
  ],
  highlights: [
    { label: "Duration", value: "120 Minutes", icon: "Clock" },
    { label: "Total Questions", value: "100 MCQ", icon: "Target" },
    { label: "Level", value: "Undergraduate", icon: "Award" },
    { label: "Aspirants", value: "50K+", icon: "Users" }
  ]
}

export default function Page() {
  return <ExamEditorialContent examData={examData} />
}
