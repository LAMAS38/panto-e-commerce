'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Check } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useState } from 'react'
import type { Product } from '@/payload-types'

interface ProductCardProps {
  product: Product
}

export default function ProductCardWithCart({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  // Extraire la première image
  const firstImage = product.images?.[0]
  const imageData = typeof firstImage?.image === 'object' ? firstImage.image : null
  const imageUrl = imageData?.url || 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=800&auto=format&fit=crop'
  const imageAlt = imageData?.alt || product.title

  // Calculer le discount
  const comparePrice = product.compareAtPrice ?? 0
  const hasDiscount = comparePrice > 0 && comparePrice > product.price
  const discountPercent = hasDiscount
    ? Math.round(((comparePrice - product.price) / comparePrice) * 100)
    : 0

  // Catégorie
  const category = typeof product.category === 'object' ? product.category.title : 'Product'

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsAdding(true)
    
    // Petit délai pour feedback visuel
    await new Promise(resolve => setTimeout(resolve, 300))
    
    addItem(product, 1)
    setIsAdding(false)
    setJustAdded(true)
    
    // Reset après 2 secondes
    setTimeout(() => setJustAdded(false), 2000)
  }

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in">
      {/* Image Container */}
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Badge featured avec pulse */}
          {product.featured && (
            <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full animate-pulse-subtle">
              Featured
            </div>
          )}

          {/* Badge discount */}
          {hasDiscount && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
              -{discountPercent}%
            </div>
          )}

          {/* Overlay au hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-medium">
          {category}
        </p>

        {/* Title */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-orange-500 transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
            <span className="text-lg font-bold text-gray-900">${product.price}</span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                ${comparePrice}
              </span>
            )}
          </div>

          {/* Add to Cart Button avec feedback visuel */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding || justAdded}
            className={`inline-flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 ${
              justAdded
                ? 'bg-green-500 text-white scale-110'
                : isAdding
                ? 'bg-gray-400 text-white'
                : 'bg-gray-900 text-white hover:bg-orange-500 hover:scale-110'
            }`}
            aria-label="Add to cart"
          >
            {justAdded ? (
              <Check className="w-4 h-4" />
            ) : (
              <ShoppingBag className={`w-4 h-4 ${isAdding ? 'animate-bounce' : ''}`} />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
