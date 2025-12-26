import { OrdersRepo } from '../repositories/orders.repo'

export class OrdersService {
  /**
   * Récupérer les commandes d'un client
   */
  static async getCustomerOrders(customerId: number) {
    return OrdersRepo.findByCustomer(customerId)
  }

  /**
   * Récupérer une commande par ID
   */
  static async getOrderById(orderId: number) {
    return OrdersRepo.findById(orderId)
  }
}