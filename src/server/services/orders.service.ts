import { OrdersRepo } from '../repositories/orders.repo'

/**
 * Service layer for Orders. Encapsulates any business logic around
 * order retrieval. At present it simply proxies calls to the
 * repository, but if you need to add calculations or aggregation
 * (e.g. computing totals, statuses), this is where you can do it.
 */
export class OrdersService {
  /**
   * Retrieve all orders belonging to a specific customer.
   */
  static async getOrdersForCustomer(customerId: string) {
    return OrdersRepo.findByCustomer(customerId)
  }
}