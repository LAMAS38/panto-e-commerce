import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/lib/payload'
import ProductDetailClient from './ProductDetailClient'
import type { Metadata } from 'next'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

// 🔥 METADATA DYNAMIQUE POUR SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: 'Product Not Found | Panto',
      description: 'The product you are looking for does not exist.',
    }
  }

  const category = typeof product.category === 'object' ? product.category.title : 'Product'
  const firstImage = product.images?.[0]
  const imageData = typeof firstImage?.image === 'object' ? firstImage.image : null
  const imageUrl = imageData?.url || 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=1200'

  return {
    title: `${product.title} - ${category} | Panto`,
    description: product.description || `Buy ${product.title} at $${product.price}. Premium ${category.toLowerCase()} from Panto.`,
    openGraph: {
      title: product.title,
      description: product.description || `Premium ${category.toLowerCase()} at $${product.price}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.title,
        }
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description || `Premium ${category.toLowerCase()}`,
      images: [imageUrl],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <ProductDetailClient product={product} />
    </div>
  )
}
