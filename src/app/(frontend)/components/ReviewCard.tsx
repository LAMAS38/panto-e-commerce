
import React from 'react'

type Props = {
  name: string
  comment: string
  rating: number
}

export const ReviewCard: React.FC<Props> = ({ name, comment, rating }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white space-y-2">
      <div className="flex items-center space-x-2">
        <span className="font-semibold">{name}</span>
        <div className="flex text-yellow-500">
          {'★'.repeat(rating)}
          {'☆'.repeat(5 - rating)}
        </div>
      </div>
      <p className="text-gray-700 text-sm">{comment}</p>
    </div>
  )
}
