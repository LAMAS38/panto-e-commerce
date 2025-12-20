'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ShoppingBag, Check } from 'lucide-react'
import type { Product } from '@/payload-types'

interface ProductDetailClientProps {
  product: Product
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  // Extraire les images
  const images = product.images || []
  const firstImage = images[0]
  const imageData = typeof firstImage?.image === 'object' ? firstImage.image : null
  const mainImageUrl = imageData?.url || 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=1200&auto=format&fit=crop'

  // Calculer le discount
  const comparePrice = product.compareAtPrice ?? 0
  const hasDiscount = comparePrice > 0 && comparePrice > product.price
  const discountPercent = hasDiscount
    ? Math.round(((comparePrice - product.price) / comparePrice) * 100)
    : 0

  // Catégorie
  const category = typeof product.category === 'object' ? product.category.title : 'Product'

  const handleAddToCart = () => {
    // TODO: Implémenter le vrai panier
    console.log('Add to cart:', { product: product.slug, quantity })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Products
          </Link>
        </div>
      </div>

      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white">
              <Image
                src={mainImageUrl}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
              {hasDiscount && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-full">
                  -{discountPercent}% OFF
                </div>
              )}
            </div>

            {/* Thumbnails si plusieurs images */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.slice(0, 4).map((img, idx) => {
                  const imgData = typeof img.image === 'object' ? img.image : null
                  const thumbUrl = imgData?.url || mainImageUrl
                  return (
                    <div
                      key={idx}
                      className="relative aspect-square rounded-lg overflow-hidden bg-white cursor-pointer hover:opacity-75 transition-opacity"
                    >
                      <Image src={thumbUrl} alt={`${product.title} ${idx + 1}`} fill className="object-cover" />
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Category */}
            <p className="text-sm text-orange-500 font-semibold uppercase tracking-wide mb-2">
              {category}
            </p>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price}
              </span>
              {hasDiscount && (
                <span className="text-xl text-gray-500 line-through">
                  ${comparePrice}
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="mb-8">
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  −
                </button>
                <span className="w-16 text-center font-semibold text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              {addedToCart ? (
                <>
                  <Check className="w-5 h-5" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </>
              )}
            </button>

            {/* Product Features */}
            <div className="mt-8 pt-8 border-t">
              <h3 className="font-semibold text-gray-900 mb-4">Product Features</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Premium quality materials</li>
                <li>✓ Modern minimalist design</li>
                <li>✓ Durable construction</li>
                <li>✓ Easy to clean and maintain</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
