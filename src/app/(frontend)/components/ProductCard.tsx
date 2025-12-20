import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/payload-types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  // Extraire la première image
  const firstImage = product.images?.[0]
  const imageData = typeof firstImage?.image === 'object' ? firstImage.image : null
  const imageUrl = imageData?.url || '/placeholder.jpg'
  const imageAlt = imageData?.alt || product.title

  // Calculer le discount si compareAtPrice existe
  // Calculer le discount si compareAtPrice existe
  const comparePrice = product.compareAtPrice ?? 0
  const hasDiscount = comparePrice > 0 && comparePrice > product.price
  const discountPercent = hasDiscount
    ? Math.round(((comparePrice - product.price) / comparePrice) * 100)
    : 0

  return (
    <Link 
      href={`/products/${product.slug}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Badge si produit featured */}
        {product.featured && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Featured
          </div>
        )}

        {/* Badge discount */}
        {hasDiscount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            -{discountPercent}%
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          {typeof product.category === 'object' ? product.category.title : 'Product'}
        </p>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-gray-900">
            ${product.price}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              ${product.compareAtPrice}
            </span>
          )}
        </div>

        {/* Description preview (optional) */}
        {product.description && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {product.description}
          </p>
        )}
      </div>
    </Link>
  )
}
