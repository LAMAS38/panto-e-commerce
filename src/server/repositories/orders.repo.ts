import { getPayload } from 'payload'
import config from '@/payload.config'

export class OrdersRepo {
  /**
   * Récupérer toutes les commandes d'un client
   */
  static async findByCustomer(customerId: number) {
    const payload = await getPayload({ config })
    
    return payload.find({
      collection: 'orders',
      where: {
        customer: { equals: customerId },
      },
      depth: 2,
      sort: '-createdAt',
    })
  }

  /**
   * Récupérer une commande par ID
   */
  static async findById(orderId: number) {
    const payload = await getPayload({ config })
    
    return payload.findByID({
      collection: 'orders',
      id: orderId,
      depth: 2,
    })
  }

  /**
   * Vérifier si un client a acheté un produit
   */
  static async hasOrdered(customerId: number, productId: number) {
    const payload = await getPayload({ config })
    
    const orders = await payload.find({
      collection: 'orders',
      where: {
        and: [
          { customer: { equals: customerId } },
          { status: { equals: 'paid' } },
        ],
      },
      depth: 2,
    })

    return orders.docs.some((order: any) =>
      order.items?.some((item: any) => {
        const itemProduct = typeof item.product === 'object' ? item.product : null
        return itemProduct?.id === productId
      })
    )
  }
}