import type { Product, Category, Media } from '@/payload-types'

/**
 * DTO pour affichage carte produit (homepage, products list)
 */
export interface ProductCardDTO {
  id: number
  title: string
  slug: string
  price: number
  compareAtPrice?: number
  image: string | null
  category: string
  featured: boolean
}

/**
 * DTO pour page détail produit
 */
export interface ProductDetailDTO {
  id: number
  title: string
  slug: string
  description: string | null
  price: number
  compareAtPrice?: number
  images: string[]
  category: {
    id: number
    title: string
    slug: string
  }
  featured: boolean
}

/**
 * DTO pour items du panier
 */
export interface CartItemDTO {
  productId: number
  title: string
  slug: string
  price: number
  quantity: number
  image: string | null
  subtotal: number
}

/**
 * DTO pour checkout Stripe
 */
export interface CheckoutItemDTO {
  name: string
  description: string
  price: number // en dollars
  quantity: number
  image?: string
}

// ========================================
// TRANSFORMERS (Product → DTO)
// ========================================

/**
 * Convertit un Product Payload en ProductCardDTO
 */
export function toProductCardDTO(product: Product): ProductCardDTO {
  const firstImage = product.images?.[0]
  const imageData = typeof firstImage?.image === 'object' ? firstImage.image : null
  const rawUrl = imageData?.url
  const imageUrl = (rawUrl && rawUrl.startsWith('http')) 
    ? rawUrl 
    : null

  const category = typeof product.category === 'object' 
    ? product.category.title 
    : 'Product'

  return {
    id: product.id,
    title: product.title,
    slug: product.slug,
    price: product.price,
    compareAtPrice: product.compareAtPrice || undefined,
    image: imageUrl,
    category,
    featured: product.featured || false,
  }
}

/**
 * Convertit un Product Payload en ProductDetailDTO
 */
export function toProductDetailDTO(product: Product): ProductDetailDTO {
  const images = product.images?.map((img) => {
    const imageData = typeof img.image === 'object' ? img.image : null
    const rawUrl = imageData?.url
    return (rawUrl && rawUrl.startsWith('http')) ? rawUrl : null
  }).filter((url): url is string => url !== null) || []

  const category = typeof product.category === 'object'
    ? {
        id: product.category.id,
        title: product.category.title,
        slug: product.category.slug,
      }
    : {
        id: 0,
        title: 'Uncategorized',
        slug: 'uncategorized',
      }

  return {
    id: product.id,
    title: product.title,
    slug: product.slug,
    description: product.description || null,
    price: product.price,
    compareAtPrice: product.compareAtPrice || undefined,
    images,
    category,
    featured: product.featured || false,
  }
}

/**
 * Convertit un Product Payload + quantity en CartItemDTO
 */
export function toCartItemDTO(product: Product, quantity: number): CartItemDTO {
  const firstImage = product.images?.[0]
  const imageData = typeof firstImage?.image === 'object' ? firstImage.image : null
  const rawUrl = imageData?.url
  const imageUrl = (rawUrl && rawUrl.startsWith('http')) ? rawUrl : null

  return {
    productId: product.id,
    title: product.title,
    slug: product.slug,
    price: product.price,
    quantity,
    image: imageUrl,
    subtotal: product.price * quantity,
  }
}

/**
 * Convertit un Product Payload en CheckoutItemDTO pour Stripe
 */
export function toCheckoutItemDTO(product: Product, quantity: number): CheckoutItemDTO {
  const firstImage = product.images?.[0]
  const imageData = typeof firstImage?.image === 'object' ? firstImage.image : null
  const rawUrl = imageData?.url
  const imageUrl = (rawUrl && rawUrl.startsWith('http')) ? rawUrl : undefined

  return {
    name: product.title,
    description: product.description || `Premium ${typeof product.category === 'object' ? product.category.title : 'Product'}`,
    price: product.price,
    quantity,
    image: imageUrl,
  }
}
