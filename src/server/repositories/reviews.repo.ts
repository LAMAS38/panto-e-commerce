import payload from 'payload'

/**
 * Repository for interacting with the reviews collection. This class
 * encapsulates common queries used across the application when
 * fetching or manipulating review documents. By isolating these
 * queries, other parts of the application remain decoupled from
 * Payload’s API and can be refactored more easily.
 */
export class ReviewsRepo {
  /**
   * Find all published reviews associated with a specific product.
   *
   * @param productId The ID of the product whose reviews should be returned.
   */
  static async findPublishedByProduct(productId: string) {
    return await payload.find({
      collection: 'reviews',
      where: {
        product: { equals: productId },
        published: { equals: true },
      },
    })
  }

  /**
   * Fetch a limited number of reviews that are both published and
   * featured. These can be displayed on the home page or other
   * promotional areas.
   *
   * @param limit The maximum number of reviews to return.
   */
  static async getFeatured(limit: number = 3) {
    return await payload.find({
      collection: 'reviews',
      where: {
        featured: { equals: true },
        published: { equals: true },
      },
      limit,
      sort: '-createdAt',
    })
  }

  /**
   * Create a new review document.
   *
   * @param data The data used to create the review.
   */
  static async createReview(data: any) {
    return await payload.create({
      collection: 'reviews',
      data,
    })
  }

  /**
   * Update an existing review document.
   *
   * @param id The ID of the review to update.
   * @param data The fields to update on the review.
   */
  static async updateReview(id: string, data: any) {
    return await payload.update({
      collection: 'reviews',
      id,
      data,
    })
  }

  /**
   * Delete a review by its ID.
   *
   * @param id The ID of the review to delete.
   */
  static async deleteReview(id: string) {
    return await payload.delete({
      collection: 'reviews',
      id,
    })
  }
}