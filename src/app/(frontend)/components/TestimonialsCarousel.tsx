'use client'

import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import type { Review, Media } from '@/payload-types'

type Props = {
  testimonials: Review[]
}

export default function TestimonialsCarousel({ testimonials }: Props) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 4000 })]
  )

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-4xl font-bold mb-12">
          Our Client Reviews
        </h2>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {testimonials.map((review) => {
              const photo = review.photo as Media

              return (
                <div
                  key={review.id}
                  className="min-w-[300px] bg-white rounded-xl shadow-lg p-6"
                >
                  <Image
                    src={photo.url!}
                    alt={photo.alt || review.name}
                    width={300}
                    height={220}
                    className="rounded-lg object-cover"
                  />

                  <div className="mt-4">
                    <h3 className="font-semibold">{review.name}</h3>
                    <p className="text-sm text-gray-500">{review.role}</p>
                    <p className="mt-3 text-gray-700">
                      “{review.quote}”
                    </p>

                    <div className="mt-2 text-orange-500">
                        
                      {'★'.repeat(review.rating ?? 5)}

                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
