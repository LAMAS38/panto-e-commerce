import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    
    // Récupérer l'utilisateur authentifié
    const { user } = await payload.auth({ headers: request.headers })
    
    if (!user || user.collection !== 'customers') {
      return NextResponse.json(
        { error: 'You must be logged in to leave a review' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { productId, rating, comment } = body

    if (!productId || !rating || !comment) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Vérifier si l'utilisateur a déjà laissé un avis
    const existingReview = await payload.find({
      collection: 'reviews',
      where: {
        and: [
          { customer: { equals: user.id } },
          { product: { equals: productId } },
        ],
      },
      limit: 1,
    })

    if (existingReview.docs.length > 0) {
      return NextResponse.json(
        { error: 'You have already reviewed this product' },
        { status: 400 }
      )
    }

    // Vérifier si l'utilisateur a acheté le produit
    const orders = await payload.find({
      collection: 'orders',
      where: {
        and: [
          { customer: { equals: user.id } },
          { status: { equals: 'paid' } },
        ],
      },
      depth: 2,
    })

    const hasPurchased = orders.docs.some((order: any) =>
      order.items?.some((item: any) => {
        const itemProduct = typeof item.product === 'object' ? item.product : null
        return itemProduct?.id === productId
      })
    )

    if (!hasPurchased) {
      return NextResponse.json(
        { error: 'You must purchase this product before reviewing it' },
        { status: 400 }
      )
    }

    // Créer le review
    const review = await payload.create({
      collection: 'reviews',
      data: {
        name: `${user.firstName} ${user.lastName.charAt(0)}.`,
        customer: user.id,
        product: productId,
        rating,
        comment,
        published: false,
        slug: `${user.firstName.toLowerCase()}-${Date.now()}`,
      },
    })

    return NextResponse.json({
      success: true,
      review,
      message: 'Review submitted successfully! It will be published after moderation.',
    })
  } catch (error) {
    console.error('Review creation error:', error)
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create review' },
      { status: 400 }
    )
  }
}