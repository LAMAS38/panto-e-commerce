import payload from 'payload'

/**
 * Repository for accessing order documents. Provides convenience
 * methods for retrieving orders by customer. Additional methods
 * can be added here if your application needs more complex order
 * queries.
 */
export class OrdersRepo {
  /**
   * Find all orders belonging to a specific customer.
   *
   * @param customerId The ID of the customer to search orders for.
   */
  static async findByCustomer(customerId: string) {
    return await payload.find({
      collection: 'orders',
      where: {
        customer: { equals: customerId },
      },
      sort: '-createdAt',
    })
  }
}