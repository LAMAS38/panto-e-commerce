import { getPayloadClient } from '@/lib/payload'
import TestimonialsCarousel from './TestimonialsCarousel'

export async function Testimonials() {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'reviews',
    where: {
      and: [{ published: { equals: true } }, { featured: { equals: true } }],
    },
    sort: 'order',
    limit: 6,
    depth: 2, // ✅ important pour récupérer media (url, etc.)
  })

  return <TestimonialsCarousel testimonials={docs} />
}
