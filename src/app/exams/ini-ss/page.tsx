import ExamEditorialContent from '@/components/pages/exams/ExamEditorialContent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'INI SS 2026 | Eligibility, DM/M.Ch Admission, Exam Pattern',
  description: 'Everything you need to know about INI SS 2026. Explore eligibility for super-specialty medical courses (DM/M.Ch) at AIIMS, JIPMER, and other institutes of national importance.',
  keywords: ['INI SS', 'INI SS 2026', 'DM MCh admission', 'Super-specialty medical entrance', 'AIIMS SS entrance']
}

const examData = {
  id: 'ini-ss',
  name: 'INI SS',
  fullName: 'Institute of National Importance Super-Specialty Entrance Test',
  stream: 'Medical',
  conductedBy: 'AIIMS, New Delhi',
  frequency: 'Bi-annually',
  duration: '90 Minutes',
  totalMarks: '80',
  sections: [
    { id: 'overview', label: 'Overview' },
    { id: 'eligibility', label: 'Eligibility' },
    { id: 'pattern', label: 'Exam Pattern' },
    { id: 'syllabus', label: 'Syllabus' },
    { id: 'faq', label: 'FAQs' }
  ],
  overview: `The <strong>INI SS</strong> (Super-Specialty) is the most advanced medical entrance examination in India. It is conducted for admission to DM (Doctor of Medicine), M.Ch (Master of Chirurgie), and MD (Hospital Administration) courses. This exam is the exclusive gateway for super-specialty seats at <strong>AIIMS, JIPMER Puducherry, PGIMER Chandigarh, and SCTIMST Thiruvananthapuram</strong>. It tests specialized clinical knowledge and research aptitude in specific super-specialty domains.`,
  eligibility: [
    "Candidates must hold an MD/MS degree or its equivalent recognized by the NMC/DCI in relevant broad specialties.",
    "The upper age limit is generally 35 years (with relaxations for reserved categories and government servants).",
    "Must have completed the qualifying degree before the specified cutoff date for the session.",
    "Provisional registration with NMC/State Medical Council is mandatory."
  ],
  pattern: [
    { label: "Stage 1", value: "80 Questions (90m)" },
    { label: "Stage 2", value: "Lab/Clinical (20m)" },
    { label: "Marking", value: "+1 / -1/3" },
    { label: "Cutoff", value: "50% Percentile" }
  ],
  dates: [
    { event: "Application Starts", date: "Sep 2025", status: 'closed' as const },
    { event: "Exam Date (Jan Session)", date: "Oct 2025", status: 'closed' as const },
    { event: "July Session Registration", date: "Mar 2026", status: 'open' as const },
    { event: "Exam Date (July Session)", date: "Apr 2026", status: 'upcoming' as const }
  ],
  syllabus: [
    { subject: "Clinical Speciality", topics: ["Advanced Pathophysiology", "Diagnostic Modalities", "Surgical Techniques", "Recent Advances in Medical Science"] },
    { subject: "Research Methodology", topics: ["Biostatistics", "Clinical Trials", "Medical Ethics", "Epidemiology"] }
  ],
  faqs: [
    { q: "What is the difference between INI CET and INI SS?", a: "The <a href='/exams/ini-cet' class='text-sky-600 hover:underline'>INI CET</a> is for postgraduate courses (MD/MS), while INI SS is for super-specialty courses (DM/M.Ch) after completing MD/MS." },
    { q: "Is there an interview for INI SS?", a: "Admission to some institutes like AIIMS involves a Stage 2 departmental clinical/practical assessment after qualifying Stage 1." }
  ],
  highlights: [
    { label: "Duration", value: "90 Minutes", icon: "Clock" },
    { label: "Total Questions", value: "80 MCQ", icon: "Target" },
    { label: "Level", value: "Super-Specialty", icon: "Award" },
    { label: "Aspirants", value: "20K+", icon: "Users" }
  ]
}

export default function Page() {
  return <ExamEditorialContent examData={examData} />
}
