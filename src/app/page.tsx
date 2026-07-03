import dynamic from 'next/dynamic'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'

// Dynamic imports for below-the-fold heavy sections — code-split into separate chunks
const CompareSection = dynamic(() => import('@/components/sections/CompareSection'))
const CollegesSection = dynamic(() => import('@/components/sections/CollegesSection'))
const LoanSection = dynamic(() => import('@/components/sections/LoanSection'))
const StatsBar = dynamic(() => import('@/components/sections/StatsBar'))
const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'))
const MoreFromUsSection = dynamic(() => import('@/components/sections/MoreFromUsSection'))
const NewsSection = dynamic(() => import('@/components/sections/NewsSection'))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection'))
const NewsletterSection = dynamic(() => import('@/components/sections/NewsletterSection'))
const StickyCROElements = dynamic(() => import('@/components/ui/StickyCROElements'))
const ExitIntentPopup = dynamic(() => import('@/components/ui/ExitIntentPopup'))

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. College Comparison Tool */}
      <CompareSection />

      {/* 3. Top Colleges / Featured Colleges */}
      <CollegesSection />

      {/* 4. Loan Calculator */}
      <LoanSection />

      {/* 5. Placement Statistics / Trust Indicators */}
      <StatsBar />

      {/* 6. Testimonials */}
      <TestimonialsSection />

      {/* 7. Reels & YouTube Videos */}
      <MoreFromUsSection />

      {/* 8. News & Articles */}
      <NewsSection />

      {/* 9. FAQ */}
      <FAQSection />

      {/* 9. Newsletter */}
      <NewsletterSection />

      {/* 11. Footer */}
      <Footer />

      {/* Floating Conversion Optimizers */}
      <StickyCROElements />
      <ExitIntentPopup />
    </main>
  )
}
