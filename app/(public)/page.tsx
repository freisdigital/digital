import { HeroSection } from "@/components/home/hero-section"
import { StatsBar } from "@/components/home/stats-bar"
import { FeaturedProducts } from "@/components/home/featured-products"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <FeaturedProducts />
    </>
  )
}
