import { NextRequest, NextResponse } from 'next/server'
import { OrdersService } from '@/server/services/orders.service'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    
    const { user } = await payload.auth({ headers: request.headers })

    if (!user || user.collection !== 'customers') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const result = await OrdersService.getCustomerOrders(user.id)

    return NextResponse.json({
      orders: result.docs,
      total: result.totalDocs,
    })
  } catch (error) {
    console.error('Orders fetch error:', error)
    
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}