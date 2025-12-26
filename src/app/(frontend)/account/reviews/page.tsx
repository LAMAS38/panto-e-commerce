import { getPayloadClient } from '@/payload.server'
import { getUserFromRequest } from '@/lib/auth'
import { notFound } from 'next/navigation'
import ReviewsList from '@/components/product/ReviewsList'

export default async function AccountReviewsPage() {
  const user = await getUserFromRequest()

  if (!user) return notFound()

  const payload = await getPayloadClient()
  const reviews = await payload.find({
    collection: 'reviews',
    where: {
      user: { equals: user.id },
    },
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mes avis</h1>
      <ReviewsList reviews={reviews.docs} />
    </div>
  )
}
