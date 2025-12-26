import { ReviewsRepo } from '../repositories/reviews.repo'
import { OrdersRepo } from '../repositories/orders.repo'

export class ReviewsService {
  /**
   * Créer un review (avec vérification d'achat)
   */
  static async createReview(data: {
    customerId: number
    productId: number
    name: string
    rating: number
    comment: string
  }) {
    const { customerId, productId, name, rating, comment } = data

    // Vérifier si le client a déjà laissé un avis
    const hasReviewed = await ReviewsRepo.hasReviewed(customerId, productId)
    if (hasReviewed) {
      throw new Error('You have already reviewed this product')
    }

    // Vérifier si le client a acheté le produit
    const hasOrdered = await OrdersRepo.hasOrdered(customerId, productId)
    if (!hasOrdered) {
      throw new Error('You must purchase this product before reviewing it')
    }

    // Créer le review
    return ReviewsRepo.create({
      name,
      customer: customerId,
      product: productId,
      rating,
      comment,
    })
  }

  /**
   * Récupérer les reviews d'un produit
   */
  static async getProductReviews(productId: number) {
    return ReviewsRepo.findPublishedByProduct(productId)
  }

  /**
   * Récupérer les reviews featured pour la home
   */
  static async getFeaturedReviews() {
    return ReviewsRepo.getFeatured(6)
  }
}