import { Hero } from './components/Hero'
import { WhyChoosingUs } from './components/WhyChoosingUs'
import { BestSelling } from './components/BestSelling'
import { ExperienceAndMaterials } from './components/ExperienceAndMaterials'
import { Testimonials } from './components/Testimonials'
import { getHome } from '@/lib/payload'

export default async function HomePage() {
  const [home] = await Promise.all([getHome()])

  return (
    <>
      <Hero home={home} />
      <WhyChoosingUs />
      <BestSelling />
      <ExperienceAndMaterials home={home} />
      <Testimonials />
    </>
  )
}
