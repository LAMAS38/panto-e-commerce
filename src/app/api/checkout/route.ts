import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json()

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      )
    }

    // Créer les line items pour Stripe
    const lineItems = items.map((item: { product: { title: string; images?: { image?: { url?: string } }[]; description?: string; price: number }; quantity: number }) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product.title,
          images: item.product.images?.[0]?.image?.url 
            ? [item.product.images[0].image.url] 
            : [],
          description: item.product.description || '',
        },
        unit_amount: Math.round(item.product.price * 100), // Stripe utilise les centimes
      },
      quantity: item.quantity,
    }))

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

    // Créer la session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'FR', 'DE', 'ES', 'IT'],
      },
    })

    // Retourner l'URL au lieu du sessionId
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
