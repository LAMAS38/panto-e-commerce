// src/app/api/reviews/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createReview, getReviewsByProduct } from '@/server/services/reviews.service'

export async function GET(req: NextRequest) {
  const productId = req.nextUrl.searchParams.get('productId')
  if (!productId) return NextResponse.json({ error: 'Missing productId' }, { status: 400 })

  const reviews = await getReviewsByProduct(productId)
  return NextResponse.json(reviews)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const review = await createReview(body)
  return NextResponse.json(review)
}
