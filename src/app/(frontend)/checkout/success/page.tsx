'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/app/(frontend)/context/CartContext'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const { clearCart } = useCart()
  const [sessionId, setSessionId] = useState<string | null>(null)

  useEffect(() => {
    const id = searchParams.get('session_id')
    setSessionId(id)
    if (id) clearCart()
  }, [searchParams, clearCart])

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-semibold">Paiement réussi ✅</h1>
      <p className="mt-4 text-gray-600">
        Merci pour ta commande. Ton panier a été vidé.
      </p>

      <div className="mt-6 rounded-lg border p-4">
        <p className="text-sm text-gray-500">Session ID</p>
        <p className="mt-1 font-mono text-sm break-all">
          {sessionId ?? '...'}
        </p>
      </div>

      <div className="mt-8 flex gap-3">
        <Link href="/" className="rounded-md bg-black px-4 py-2 text-white">
          Retour à l’accueil
        </Link>

        <Link href="/products" className="rounded-md border px-4 py-2">
          Continuer mes achats
        </Link>
      </div>
    </div>
  )
}
