import { ReviewsRepo } from '../repositories/reviews.repo'
import { OrdersRepo } from '../repositories/orders.repo'

/**
 * Service layer for reviews. This layer orchestrates business logic
 * beyond simple database queries—for example verifying that a
 * customer has purchased a product before allowing them to submit a
 * review. By separating these concerns here, pages and route
 * handlers stay lightweight and focused on input and output.
 */
export class ReviewsService {
  /**
   * Retrieve published reviews associated with a product.
   */
  static async getReviewsForProduct(productId: string) {
    return ReviewsRepo.findPublishedByProduct(productId)
  }

  /**
   * Retrieve featured, published reviews to display on the homepage.
   */
  static async getFeaturedReviews(limit: number = 3) {
    return ReviewsRepo.getFeatured(limit)
  }

  /**
   * Create a new review if the customer has purchased the product.
   *
   * @throws Error if the customer has not ordered the product.
   */
  static async createReview(
    customerId: string,
    productId: string,
    rating: number,
    comment: string,
  ) {
    // Optional: verify the customer has an order containing the product
    const orders = await OrdersRepo.findByCustomer(customerId)
    const purchased = orders.docs?.some((order: any) =>
      order.items.some((item: any) => item.product?.id === productId),
    )
    if (!purchased) {
      throw new Error('Customer has not purchased this product')
    }
    return ReviewsRepo.createReview({
      customer: customerId,
      product: productId,
      rating,
      comment,
      published: false, // default to false until admin approves
    })
  }
}