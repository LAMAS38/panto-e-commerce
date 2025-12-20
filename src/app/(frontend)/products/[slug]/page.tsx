import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/lib/payload'
import ProductDetailClient from './ProductDetailClient'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}

// Generate static params pour les produits (optionnel, pour SSG)
export async function generateStaticParams() {
  // On pourrait fetch tous les slugs ici pour du SSG
  // Mais pour l'instant on reste en SSR (dynamique)
  return []
}
