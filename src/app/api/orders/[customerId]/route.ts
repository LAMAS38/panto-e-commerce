// API route that returns orders for a given customer. This file illustrates
// how to write a Next.js App Router API route that uses Payload CMS on
// the server. It should be placed under `src/app/api/orders/[customerId]/route.ts`.
// It expects a dynamic segment `customerId` in the URL and returns all
// orders for that customer sorted by creation date.

import { NextResponse } from 'next/server'
import payload from 'payload'

export async function GET(
  request: Request,
  { params }: { params: { customerId: string } }
) {
  const { customerId } = params
  if (!customerId) {
    return NextResponse.json({ message: 'Customer ID is required' }, { status: 400 })
  }
  try {
    const orders = await payload.find({
      collection: 'orders',
      where: { customer: { equals: customerId } },
      sort: '-createdAt',
    })
    return NextResponse.json(orders)
  } catch (err) {
    console.error('Error fetching orders:', err)
    return NextResponse.json({ message: 'Failed to fetch orders' }, { status: 500 })
  }
}