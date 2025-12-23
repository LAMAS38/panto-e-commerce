'use client'

type Review = {
  id: string
  comment: string
  rating: number
  user: {
    name: string
  }
  createdAt: string
}

type ReviewsListProps = {
  reviews: Review[]
}

export default function ReviewsList({ reviews }: ReviewsListProps) {
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-2">Avis des clients</h3>
      <p className="mb-4 text-yellow-500 font-bold">Note moyenne : {averageRating.toFixed(1)} / 5</p>
      <ul className="space-y-4">
        {reviews.map((review) => (
          <li key={review.id} className="border p-4 rounded-md">
            <div className="text-sm text-gray-600">
              <span className="font-semibold">{review.user.name}</span> — {new Date(review.createdAt).toLocaleDateString()}
            </div>
            <div className="text-yellow-500">Note : {review.rating} / 5</div>
            <p>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
