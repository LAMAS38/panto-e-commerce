import { getPayload } from 'payload'
import config from '@/payload.config'

export class ReviewsRepo {
  /**
   * Récupérer tous les reviews publiés d'un produit
   */
  static async findPublishedByProduct(productId: number) {
    const payload = await getPayload({ config })
    
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

  /**
   * Récupérer les reviews featured pour la homepage
   */
  static async getFeatured(limit: number = 6) {
    const payload = await getPayload({ config })
    
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
      limit,
    })
  }

  /**
   * Créer un review
   */
  static async create(data: {
    name: string
    customer: number
    product: number
    rating: number
    comment: string
  }) {
    const payload = await getPayload({ config })
    
    return payload.create({
      collection: 'reviews',
      data: {
        ...data,
        published: false, // Modération par défaut
      },
    })
  }

  /**
   * Vérifier si un customer a déjà reviewé un produit
   */
  static async hasReviewed(customerId: number, productId: number) {
    const payload = await getPayload({ config })
    
    const result = await payload.find({
      collection: 'reviews',
      where: {
        and: [
          { customer: { equals: customerId } },
          { product: { equals: productId } },
        ],
      },
      limit: 1,
    })
    
    return result.docs.length > 0
  }
}