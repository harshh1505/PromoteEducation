import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AdmissionAlertsPage from '@/components/pages/alerts/AdmissionAlertsPage'

export const metadata: Metadata = {
  title: 'Admission Alerts 2027 — Application Deadlines, Exam Dates & Counselling | Promote Education',
  description:
    'Real-time admission alerts and entrance exam notifications for 2027 session. Track application closing dates, admit cards, correction windows, and counselling seat allotment for JEE, NEET, CAT, CLAT, GATE, and 30+ top entrance exams in India.',
  keywords: [
    'admission alerts 2027',
    'entrance exam dates 2027',
    'application form closing dates',
    'jee main 2027 registration',
    'neet ug 2027 notification',
    'cat 2027 admit card',
    'clat 2027 last date',
    'josaa counselling 2027',
    'mcc neet counselling',
    'free exam alerts whatsapp',
    'college admission notifications India'
  ],
  openGraph: {
    title: 'Admission Alerts 2027 — Application Deadlines & Exam Dates | Promote Education',
    description:
      'Real-time entrance exam notifications, application closing dates, admit cards, and counselling alerts for the 2027 academic session. Verified by official portals.',
    type: 'website',
    url: 'https://promoteducation.com/alerts',
  },
  alternates: {
    canonical: 'https://promoteducation.com/alerts'
  }
}

export default function AlertsRoute() {
  return (
    <>
      <Navbar />
      <AdmissionAlertsPage />
      <Footer />
    </>
  )
}
