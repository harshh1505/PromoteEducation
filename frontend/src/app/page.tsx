import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import StatsBar from '@/components/sections/StatsBar'
import CollegesSection from '@/components/sections/CollegesSection'
import AIMatchSection from '@/components/sections/AIMatchSection'
import ExamsSection from '@/components/sections/ExamsSection'
import ReviewsSection from '@/components/sections/ReviewsSection'
import CompareSection from '@/components/sections/CompareSection'

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatsBar />
      <CollegesSection />
      <AIMatchSection />
      <ExamsSection />
      <ReviewsSection />
      <CompareSection />
      <Footer />
    </main>
  )
}
