// Modified version of ProductCardWithCart with unified styling and accent colours.
// Ensure this component is treated as a Client Component by Next.js. The CartContext hook is client-side only.
'use client'
// Original file is located at src/app/(frontend)/products/ProductCardWithCart.tsx in the remote repository.
// Changes:
// - Added border to the card container for better separation on light backgrounds.
// - Unified discount badge colour to orange (same accent used elsewhere) instead of red.

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import type { Product } from '@/payload-types'

interface ProductCardProps {
  product: Product
  compact?: boolean
}

export default function ProductCardWithCart({ product, compact = false }: ProductCardProps) {
  const { addItem } = useCart()

  // Extract the first image from the product
  const firstImage = product.images?.[0]
  const imageData = typeof firstImage?.image === 'object' ? firstImage.image : null
  const imageUrl =
    imageData?.url ||
    'https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=800&auto=format&fit=crop'
  const imageAlt = imageData?.alt || product.title

  // Compute discount (safe version)
  const comparePrice = product.compareAtPrice ?? 0
  const hasDiscount = comparePrice > 0 && comparePrice > product.price
  const discountPercent = hasDiscount
    ? Math.round(((comparePrice - product.price) / comparePrice) * 100)
    : 0

  // Category title
  const category = typeof product.category === 'object' ? product.category.title : 'Product'

  return (
    <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* Image Container */}
      <Link href={`/products/${product.slug}`}>
        <div className={`relative overflow-hidden bg-gray-50 ${compact ? 'aspect-square' : 'aspect-[4/3] md:aspect-square'}`}>
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Badge featured */}
          {product.featured && (
            <div className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full md:text-xs md:px-3 md:py-1">
              Featured
            </div>
          )}

          {/* Badge discount */}
          {hasDiscount && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full md:text-xs md:px-3 md:py-1">
              -{discountPercent}%
            </div>
          )}

          {/* Overlay price for compact view */}
          {compact && (
            <div className="absolute bottom-0 left-0 bg-white/80 backdrop-blur-sm px-2 py-1 text-xs font-semibold text-gray-900">
              ${product.price}
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      {!compact && (
        <div className="p-4">
          {/* Category */}
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{category}</p>

          {/* Title */}
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-orange-500 transition-colors">
              {product.title}
            </h3>
          </Link>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-gray-900">${product.price}</span>
              {hasDiscount && (
                <span className="text-sm text-gray-500 line-through">${comparePrice}</span>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={(e) => {
                e.preventDefault()
                addItem(product, 1)
              }}
              className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-900 text-white hover:bg-orange-500 transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}