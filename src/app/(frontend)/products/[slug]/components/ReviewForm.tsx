'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

type ReviewFormProps = {
  productId: string
}

export default function ReviewForm({ productId }: ReviewFormProps) {
  const { user } = useAuth()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setSubmitting(true)

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          rating,
          comment,
          userId: user.id,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Erreur lors de l’envoi.')
      }

      setRating(0)
      setComment('')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-md mt-6">
      <h3 className="text-lg font-semibold">Laisser un avis</h3>
      <div>
        <label className="block mb-1">Note</label>
        <input
          type="number"
          min={1}
          max={5}
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Commentaire</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <button type="submit" disabled={submitting} className="btn btn-primary">
        {submitting ? 'Envoi...' : 'Soumettre'}
      </button>
    </form>
  )
}
