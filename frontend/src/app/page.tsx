import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import LivePulse from '@/components/sections/LivePulse'
import StatsBar from '@/components/sections/StatsBar'
import CollegesSection from '@/components/sections/CollegesSection'
import PopularCitiesSection from '@/components/sections/PopularCitiesSection'
import ExamsSection from '@/components/sections/ExamsSection'
import MockTestSection from '@/components/sections/MockTestSection'
import PYQSection from '@/components/sections/PYQSection'
import CompareSection from '@/components/sections/CompareSection'
import LoanSection from '@/components/sections/LoanSection'
import NewsSection from '@/components/sections/NewsSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection'
import NewsletterSection from '@/components/sections/NewsletterSection'
import MoreFromUsSection from '@/components/sections/MoreFromUsSection'

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <LivePulse />
      <StatsBar />
      <MoreFromUsSection />
      <CollegesSection />
      <WhyChooseUsSection />
      <PopularCitiesSection />
      <ExamsSection />
      <MockTestSection />
      <PYQSection />
      <CompareSection />
      <LoanSection />
      <NewsSection />
      <TestimonialsSection />
      <NewsletterSection />
      <Footer />
    </main>
  )
}
