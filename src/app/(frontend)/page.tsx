
import { Hero } from './components/Hero'
import { WhyChoosingUs } from './components/WhyChoosingUs'
import { BestSelling } from './components/BestSelling'
import { ExperienceAndMaterials } from './components/ExperienceAndMaterials'
import { Testimonials } from './components/Testimonials'
import { getFeaturedProducts } from '@/lib/payload'

export default async function HomePage() {
  // Fetch products côté serveur
  const featuredProducts = await getFeaturedProducts()

  return (
    <>
      <Hero />
      <WhyChoosingUs />
      <BestSelling products={featuredProducts} />
      <ExperienceAndMaterials />
      <Testimonials />
    </>
  )
}