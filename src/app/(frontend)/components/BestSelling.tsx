import { getPayloadClient } from '@/lib/payload'
import BestSellingCarousel from './BestSellingCarousel'

export async function BestSelling() {
  const payload = await getPayloadClient()

  // On récupère catégories pour les tabs
  const categoriesRes = await payload.find({
    collection: 'categories',
    limit: 50,
    sort: 'title',
  })

  // On récupère les produits "featured" + images résolues
  const productsRes = await payload.find({
    collection: 'products',
    where: {
      and: [{ status: { equals: 'published' } }, { featured: { equals: true } }],
    },
    limit: 24,
    depth: 2, // IMPORTANT: images.image devient un Media complet
    sort: '-createdAt',
  })

  return (
    <BestSellingCarousel
      categories={categoriesRes.docs}
      products={productsRes.docs}
    />
  )
}
