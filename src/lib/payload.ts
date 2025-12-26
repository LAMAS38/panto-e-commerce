import { getPayload } from 'payload'
import config from '@/payload.config'

// Helper pour obtenir l'instance Payload
export async function getPayloadClient() {
  const payloadConfig = await config
  return await getPayload({ config: payloadConfig })
}

export async function getHome() {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'home',
    depth: 2, 
  })
}

// Récupérer tous les produits publiés
export async function getProducts() {
  const payload = await getPayloadClient()
  
  const { docs } = await payload.find({
    collection: 'products',
    where: {
      status: {
        equals: 'published',
      },
    },
    depth: 2, // Pour avoir les relations (category, images)
    limit: 100,
  })

  return docs
}

// Récupérer les produits featured
export async function getFeaturedProducts() {
  const payload = await getPayloadClient()
  
  const { docs } = await payload.find({
    collection: 'products',
    where: {
      and: [
        {
          status: {
            equals: 'published',
          },
        },
        {
          featured: {
            equals: true,
          },
        },
      ],
    },
    depth: 2,
    limit: 6,
  })

  return docs
}

// Récupérer un produit par slug
export async function getProductBySlug(slug: string) {
  const payload = await getPayloadClient()
  
  const { docs } = await payload.find({
    collection: 'products',
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          status: {
            equals: 'published',
          },
        },
      ],
    },
    depth: 2,
    limit: 1,
  })

  return docs[0] || null
}

// Récupérer toutes les catégories
export async function getCategories() {
  const payload = await getPayloadClient()
  
  const { docs } = await payload.find({
    collection: 'categories',
    limit: 100,
  })

  return docs
}

// Récupérer les produits par catégorie
export async function getProductsByCategory(categorySlug: string) {
  const payload = await getPayloadClient()
  
  // D'abord trouver la catégorie
  const { docs: categories } = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: categorySlug,
      },
    },
    limit: 1,
  })

  if (!categories.length) return []

  const categoryId = categories[0].id

  // Ensuite trouver les produits
  const { docs } = await payload.find({
    collection: 'products',
    where: {
      and: [
        {
          status: {
            equals: 'published',
          },
        },
        {
          category: {
            equals: categoryId,
          },
        },
      ],
    },
    depth: 2,
    limit: 100,
  })

  return docs
}

// Helpers pour Reviews
export async function getProductReviews(productId: number) {
  const payload = await getPayloadClient()
  
  return payload.find({
    collection: 'reviews',
    where: {
      and: [
        { product: { equals: productId } },
        { published: { equals: true } },
      ],
    },
    depth: 2,
    sort: '-createdAt',
  })
}

export async function getFeaturedReviews() {
  const payload = await getPayloadClient()
  
  return payload.find({
    collection: 'reviews',
    where: {
      and: [
        { featured: { equals: true } },
        { published: { equals: true } },
      ],
    },
    depth: 2,
    sort: 'order',
    limit: 6,
  })
}