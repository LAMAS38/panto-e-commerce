import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json()

    if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

    const lineItems = items
    .filter((item: any) => item?.product && item?.quantity > 0)
    .map((item: any) => {
        const title = item?.product?.title || item?.product?.name || 'Product'
        const rawImageUrl = item?.product?.images?.[0]?.image?.url

        const fullImageUrl =
        rawImageUrl && rawImageUrl.startsWith('http')
            ? rawImageUrl
            : rawImageUrl
            ? `${baseUrl}${rawImageUrl}`
            : null

        return {
        price_data: {
            currency: 'usd',
            product_data: {
            name: title,
            ...(fullImageUrl && /^https?:\/\//.test(fullImageUrl)
                ? { images: [fullImageUrl] }
                : {}),
            description: item?.product?.description || '',
            },
            unit_amount: Math.round(Number(item?.product?.price || 0) * 100),
        },
        quantity: item.quantity,
        }
    })

    if (lineItems.length === 0) {
    return NextResponse.json({ error: 'No valid items to checkout' }, { status: 400 })
    }


    // Créer la session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/checkout/cancel`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'FR', 'DE', 'ES', 'IT'],
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Stripe error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
