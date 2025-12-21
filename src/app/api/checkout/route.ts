import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-12-15.clover',
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

    console.log('🛒 Creating checkout for', items.length, 'items')

    // Créer les line items pour Stripe
    const lineItems = items.map((item: { 
      product: { 
        title: string
        images?: { image?: { url?: string } }[]
        description?: string
        price: number 
      }
      quantity: number 
    }) => {
      // Extraire l'URL de l'image
      const rawImageUrl = item.product.images?.[0]?.image?.url
      
      // Vérifier que c'est une URL ABSOLUE valide (commence par http)
      const validImageUrl = rawImageUrl && rawImageUrl.startsWith('http') 
        ? rawImageUrl 
        : null

      console.log('🖼️', item.product.title, '→', validImageUrl || 'No image')

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.title,
            // N'envoyer que les URLs valides
            images: validImageUrl ? [validImageUrl] : [],
            description: item.product.description || '',
          },
          unit_amount: Math.round(item.product.price * 100),
        },
        quantity: item.quantity,
      }
    })

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

    console.log('🌐 Base URL:', baseUrl)

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

    console.log('✅ Stripe session created:', session.id)
    console.log('🔗 Checkout URL:', session.url)

    if (!session.url) {
      console.error('❌ Stripe session missing URL')
      return NextResponse.json(
        { error: 'Failed to create checkout session URL' },
        { status: 500 }
      )
    }

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('💥 Stripe error:', error)
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: `Stripe error: ${error.message}` },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
