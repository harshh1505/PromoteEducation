import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import CompareSection from '@/components/sections/CompareSection'
import CollegesSection from '@/components/sections/CollegesSection'
import LoanSection from '@/components/sections/LoanSection'
import StatsBar from '@/components/sections/StatsBar'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import MoreFromUsSection from '@/components/sections/MoreFromUsSection'
import NewsSection from '@/components/sections/NewsSection'
import FAQSection from '@/components/sections/FAQSection'

import NewsletterSection from '@/components/sections/NewsletterSection'
import StickyCROElements from '@/components/ui/StickyCROElements'
import ExitIntentPopup from '@/components/ui/ExitIntentPopup'

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
