import StarRating from '@/app/(frontend)/components/StarRating'
import type { Review } from '@/payload-types'

type ReviewsListProps = {
  reviews: Review[]
}

export default function ReviewsList({ reviews }: ReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No reviews yet. Be the first to review this product!
      </div>
    )
  }

  // Calculer la moyenne
  const averageRating =
    reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length

  return (
    <div>
      {/* Average Rating */}
      <div className="mb-8 pb-8 border-b">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900">
              {averageRating.toFixed(1)}
            </div>
            <StarRating value={Math.round(averageRating)} readonly size="sm" />
            <p className="text-sm text-gray-600 mt-1">
              {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </p>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-gray-50 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-semibold text-gray-900">{review.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
              <StarRating value={review.rating || 5} readonly size="sm" />
            </div>
            <p className="text-gray-700 leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}