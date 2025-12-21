import { getPayloadClient } from '@/lib/payload'
import TestimonialsCarousel from './TestimonialsCarousel'

export async function Testimonials() {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'reviews',
    where: {
      and: [
        { published: { equals: true } },
        { featured: { equals: true } },
      ],
    },
    limit: 6,
    depth: 1,
  })

  return <TestimonialsCarousel testimonials={docs} />
}
