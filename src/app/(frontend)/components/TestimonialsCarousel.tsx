'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import type { Review, Media } from '@/payload-types'

type Props = {
  testimonials: Review[]
}

function mediaUrl(m?: number | Media | null) {
  if (!m || typeof m === 'number') return null
  return m.url ?? null
}

export default function TestimonialsCarousel({ testimonials }: Props) {
  const autoplay = useMemo(
    () => Autoplay({ delay: 5000, stopOnInteraction: true }),
    [],
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [autoplay],
  )

  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-10">
          <p className="text-orange-500 font-semibold text-sm tracking-[0.25em] uppercase">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Our Client Reviews
          </h2>
        </div>

        <div className="relative">
          {/* Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white shadow flex items-center justify-center"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white shadow flex items-center justify-center"
            aria-label="Next"
          >
            ›
          </button>

          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((review, i) => {
                const bg = mediaUrl(review.background)
                const avatar = mediaUrl(review.avatar)

                const rating = Math.max(1, Math.min(5, review.rating ?? 5))

                return (
                  <div
                    key={review.id ?? i}
                    className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_32%]"
                  >
                    <div className="relative h-[440px] rounded-3xl overflow-hidden shadow-lg">
                      {/* Background */}
                      {bg && (
                        <Image
                          src={bg}
                          alt={review.name ?? 'Review'}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 85vw, 32vw"
                          priority={i === selectedIndex}
                        />
                      )}

                      {/* Overlay card */}
                      <div className="absolute left-1/2 bottom-6 -translate-x-1/2 w-[85%] rounded-2xl bg-white/95 p-6 text-center shadow">
                        <div className="-mt-12 mb-3 flex justify-center">
                          <div className="h-16 w-16 rounded-full border-4 border-white overflow-hidden shadow">
                            {avatar ? (
                              <Image
                                src={avatar}
                                alt={review.name ?? 'Avatar'}
                                width={64}
                                height={64}
                                className="h-16 w-16 object-cover"
                              />
                            ) : (
                              <div className="h-16 w-16 bg-gray-200" />
                            )}
                          </div>
                        </div>

                        <p className="font-bold text-gray-900 text-lg">
                          {review.name}
                        </p>
                        <p className="text-sm text-gray-500">{review.role}</p>

                        <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                          “{review.quote}”
                        </p>

                        <div className="mt-4 text-orange-500">
                          {'★'.repeat(rating)}
                          <span className="text-gray-300">
                            {'★'.repeat(5 - rating)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
