'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import type { Product } from '@/payload-types'
import { toProductCardDTO, type ProductCardDTO } from '@/lib/dto/product.dto'

const tabs = [
  { label: 'Chair', slug: 'chair' },
  { label: 'Beds', slug: 'bed' },
  { label: 'Sofa', slug: 'sofa' },
  { label: 'Lamp', slug: 'lamp' },
] as const

interface BestSellingProps {
  products: Product[]
}

export function BestSelling({ products }: BestSellingProps) {
  const { addItem } = useCart()
  const [selectedTab, setSelectedTab] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // 🔥 CONVERTIR EN DTOs
  const productDTOs: ProductCardDTO[] = products.map(toProductCardDTO)

  const filteredProducts = selectedTab
    ? productDTOs.filter((p) => {
        const cat = p.category.toLowerCase()
        return cat === selectedTab
      })
    : productDTOs

  const itemsToShow = 4
  const maxIndex = Math.max(0, filteredProducts.length - itemsToShow)

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  const handleTabClick = (slug: string | null) => {
    setSelectedTab(slug)
    setCurrentIndex(0)
  }

  return (
    <section className="bg-white/60 py-8 md:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-semibold">Best Selling Product</h2>

          <div className="mx-auto mt-4 md:mt-6 inline-flex flex-wrap items-center justify-center gap-1 rounded-full bg-zinc-100 p-1">
            <button
              onClick={() => handleTabClick(null)}
              className={`rounded-full px-3 md:px-4 py-2 text-xs md:text-sm transition-all ${
                !selectedTab ? 'bg-white shadow' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              All
            </button>
            {tabs.map((tab) => (
              <button
                key={tab.slug}
                onClick={() => handleTabClick(tab.slug)}
                className={`rounded-full px-3 md:px-4 py-2 text-xs md:text-sm transition-all ${
                  selectedTab === tab.slug ? 'bg-white shadow' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-6 md:mt-10">
          <button 
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute -left-2 md:-left-3 top-1/2 z-10 flex h-8 w-8 md:h-10 md:w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow transition-opacity ${
              currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-50'
            }`}
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 text-zinc-700" />
          </button>
          
          <button 
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`absolute -right-2 md:-right-3 top-1/2 z-10 flex h-8 w-8 md:h-10 md:w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow transition-opacity ${
              currentIndex >= maxIndex ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-50'
            }`}
          >
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-zinc-700" />
          </button>

          <div className="overflow-hidden px-6 md:px-8">
            <div className="grid gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.slice(currentIndex, currentIndex + itemsToShow).map((productDTO) => {
                // 🔥 Utiliser le DTO propre
                const imageUrl = productDTO.image || 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=800&auto=format&fit=crop'

                // Retrouver le produit original pour addItem
                const originalProduct = products.find(p => p.id === productDTO.id)!

                return (
                  <div 
                    key={productDTO.id} 
                    className="group rounded-2xl bg-white p-3 md:p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <Link href={`/products/${productDTO.slug}`}>
                      <div className="flex items-center justify-center rounded-xl bg-zinc-50 p-3 md:p-4">
                        <Image
                          src={imageUrl}
                          alt={productDTO.title}
                          width={220}
                          height={220}
                          className="h-32 md:h-44 w-auto object-contain transition-transform group-hover:scale-105"
                        />
                      </div>

                      <div className="mt-3 md:mt-4">
                        <p className="text-xs text-zinc-500">{productDTO.category}</p>
                        <p className="mt-1 font-semibold line-clamp-1 text-sm md:text-base">{productDTO.title}</p>

                        <div className="mt-2 md:mt-3 flex items-center justify-between">
                          <p className="font-semibold text-sm md:text-base">${productDTO.price}</p>
                          <button 
                            className="inline-flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-zinc-900 text-white transition-all hover:bg-orange-500"
                            onClick={(e) => {
                              e.preventDefault()
                              addItem(originalProduct, 1)
                            }}
                          >
                            <Plus className="h-4 w-4 md:h-5 md:w-5" />
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>

          {maxIndex > 0 && (
            <div className="mt-4 md:mt-6 flex justify-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex 
                      ? 'w-6 md:w-8 bg-orange-500' 
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}

          <div className="mt-6 md:mt-10 text-center">
            <Link href="/products" className="text-sm font-medium text-orange-500 hover:opacity-80">
              View All →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
