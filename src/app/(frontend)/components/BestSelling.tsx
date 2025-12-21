'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import type { Product } from '@/payload-types'

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

  const filteredProducts = selectedTab
    ? products.filter((p) => {
        const cat = typeof p.category === 'object' ? p.category.slug : null
        return cat === selectedTab
      })
    : products

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
    <section className="bg-white/60 py-16">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Best Selling Product</h2>

          <div className="mx-auto mt-6 inline-flex items-center gap-1 rounded-full bg-zinc-100 p-1">
            <button
              onClick={() => handleTabClick(null)}
              className={`rounded-full px-4 py-2 text-sm transition-all ${
                !selectedTab ? 'bg-white shadow' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              All
            </button>
            {tabs.map((tab) => (
              <button
                key={tab.slug}
                onClick={() => handleTabClick(tab.slug)}
                className={`rounded-full px-4 py-2 text-sm transition-all ${
                  selectedTab === tab.slug ? 'bg-white shadow' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-10">
          <button 
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute -left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow transition-opacity ${
              currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-50'
            }`}
          >
            <ChevronLeft className="h-5 w-5 text-zinc-700" />
          </button>
          
          <button 
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`absolute -right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow transition-opacity ${
              currentIndex >= maxIndex ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-50'
            }`}
          >
            <ChevronRight className="h-5 w-5 text-zinc-700" />
          </button>

          <div className="overflow-hidden px-8">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.slice(currentIndex, currentIndex + itemsToShow).map((product) => {
                const firstImage = product.images?.[0]
                const imageData = typeof firstImage?.image === 'object' ? firstImage.image : null
                
                // 🔥 FIX: Utiliser directement les URLs absolues (Unsplash ou Blob)
                const rawUrl = imageData?.url
                const imageUrl = (rawUrl && rawUrl.startsWith('http')) 
                  ? rawUrl 
                  : 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=800&auto=format&fit=crop'
                
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
                        <p className="mt-1 font-semibold line-clamp-1">{product.title}</p>

                        <div className="mt-3 flex items-center justify-between">
                          <p className="font-semibold">${product.price}</p>
                          <button 
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-white transition-all hover:bg-orange-500"
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
          </div>

          {maxIndex > 0 && (
            <div className="mt-6 flex justify-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex 
                      ? 'w-8 bg-orange-500' 
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}

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
