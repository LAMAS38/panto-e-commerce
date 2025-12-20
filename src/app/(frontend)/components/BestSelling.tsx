'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import type { Product } from '@/payload-types'

const tabs = ['Chair', 'Beds', 'Sofa', 'Lamp'] as const

interface BestSellingProps {
  products: Product[]
}

export function BestSelling({ products }: BestSellingProps) {
  const { addItem } = useCart()

  return (
    <section className="bg-white/60 py-16">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Best Selling Product</h2>

          <div className="mx-auto mt-6 inline-flex items-center gap-1 rounded-full bg-zinc-100 p-1">
            {tabs.map((t, idx) => (
              <button
                key={t}
                className={`rounded-full px-4 py-2 text-sm ${
                  idx === 0 ? 'bg-white shadow' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-10">
          {/* Arrows */}
          <button className="absolute -left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow md:inline-flex">
            <ChevronLeft className="h-5 w-5 text-zinc-700" />
          </button>
          <button className="absolute -right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow md:inline-flex">
            <ChevronRight className="h-5 w-5 text-zinc-700" />
          </button>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => {
              // Extraire l'image
              const firstImage = product.images?.[0]
              const imageData = typeof firstImage?.image === 'object' ? firstImage.image : null
              const imageUrl = imageData?.url || 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=800&auto=format&fit=crop'
              
              // Catégorie
              const category = typeof product.category === 'object' ? product.category.title : 'Product'

              return (
                <div 
                  key={product.id} 
                  className="group rounded-2xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <Link href={`/products/${product.slug}`}>
                    <div className="flex items-center justify-center rounded-xl bg-zinc-50 p-4">
                      <Image
                        src={imageUrl}
                        alt={product.title}
                        width={220}
                        height={220}
                        className="h-44 w-auto object-contain transition-transform group-hover:scale-105"
                      />
                    </div>

                    <div className="mt-4">
                      <p className="text-xs text-zinc-500">{category}</p>
                      <p className="mt-1 font-semibold">{product.title}</p>

                      <div className="mt-3 flex items-center justify-between">
                        <p className="font-semibold">${product.price}</p>
                        <button 
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-white transition-opacity hover:opacity-90"
                          onClick={(e) => {
                            e.preventDefault()
                            addItem(product, 1)
                          }}
                        >
                          <Plus className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>

          <div className="mt-10 text-center">
            <Link href="/products" className="text-sm font-medium text-orange-500 hover:opacity-80">
              View All →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
