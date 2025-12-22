'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { useCart } from '../context/CartContext'

type Category = {
  id: number
  title: string
  slug: string
}

type Media = {
  id: number
  url?: string | null
  alt?: string | null
}

type Product = {
  id: number
  title: string
  slug: string
  price: number
  compareAtPrice?: number | null
  rating?: number | null
  category?: number | Category | null
  images?: { image: number | Media }[] | null
}

function resolveMediaUrl(m: number | Media | null | undefined) {
  if (!m || typeof m === 'number') return null
  const url = m.url ?? null
  if (!url) return null

  if (url.startsWith('/')) {
    const base =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.NEXT_PUBLIC_VERCEL_URL ||
      'http://localhost:3000'
    return `${base}${url}`
  }

  return url
}

function resolveCategorySlug(c: Product['category']) {
  if (!c) return null
  if (typeof c === 'number') return null
  return c.slug
}

function Stars({ value }: { value: number }) {
  const v = Math.max(0, Math.min(5, value))
  return (
    <div className="mt-2 text-orange-500 text-sm">
      {'★'.repeat(v)}
      <span className="text-gray-200">{'★'.repeat(5 - v)}</span>
    </div>
  )
}

export default function BestSellingCarousel({
  categories,
  products,
}: {
  categories: Category[]
  products: Product[]
}) {
  const { addItem } = useCart()
  
  const tabs = useMemo(
    () => [{ title: 'All', slug: 'all' }, ...categories.map((c) => ({ title: c.title, slug: c.slug }))],
    [categories],
  )

  const [active, setActive] = useState('all')

  const filtered = useMemo(() => {
    if (active === 'all') return products
    return products.filter((p) => resolveCategorySlug(p.category) === active)
  }, [active, products])

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    dragFree: false,
    skipSnaps: false,
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    emblaApi?.scrollTo(0)
  }, [active, emblaApi])

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Best Selling Product
        </h2>

        {/* Tabs */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full bg-gray-100 p-1">
            {tabs.map((t) => (
              <button
                key={t.slug}
                onClick={() => setActive(t.slug)}
                className={[
                  'rounded-full px-4 py-2 text-sm transition',
                  active === t.slug
                    ? 'bg-white shadow text-gray-900'
                    : 'text-gray-600 hover:text-gray-900',
                ].join(' ')}
              >
                {t.title}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel + arrows */}
        <div className="relative mt-10">
          <button
            type="button"
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow p-3 hover:shadow-md"
            aria-label="Previous"
          >
            ←
          </button>

          <button
            type="button"
            onClick={scrollNext}
            className="absolute right-0 top-1/2 z-10 translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow p-3 hover:shadow-md"
            aria-label="Next"
          >
            →
          </button>

          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-6">
              {filtered.map((p) => {
                const media = p.images?.[0]?.image ?? null
                const img = resolveMediaUrl(media)
                const rating = Math.round(p.rating ?? 5)

                return (
                  <div
                    key={p.id}
                    className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_48%] lg:flex-[0_0_23%]"
                  >
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
                      <Link href={`/products/${p.slug}`} className="block">
                        <div className="relative h-64 bg-gray-50">
                          {img ? (
                            <Image
                              src={img}
                              alt={p.title}
                              fill
                              className="object-contain p-6"
                              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 90vw"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-sm text-gray-400">
                              No image
                            </div>
                          )}
                        </div>
                      </Link>

                      <div className="p-5">
                        <p className="text-xs text-gray-500">
                          {typeof p.category === 'object' && p.category?.title
                            ? p.category.title
                            : 'Category'}
                        </p>

                        <div className="mt-1 flex items-start justify-between gap-3">
                          <Link
                            href={`/products/${p.slug}`}
                            className="text-base font-semibold text-gray-900 leading-snug hover:underline"
                          >
                            {p.title}
                          </Link>
                        </div>

                        <Stars value={rating} />

                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-lg font-bold text-gray-900">
                            ${p.price}
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              // Convertir Product vers le type complet pour addItem
                              addItem(p as any, 1)
                            }}
                            className="h-12 w-12 rounded-full bg-gray-900 text-white text-xl leading-none hover:bg-orange-500 transition-colors"
                            aria-label="Add to cart"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/products" className="text-orange-500 hover:underline">
              View All →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
