'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Package, ArrowRight } from 'lucide-react'
import { useCart } from '../../context/CartContext'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const { clearCart } = useCart()
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [orderNumber] = useState(() => Math.floor(100000 + Math.random() * 900000))

  useEffect(() => {
    const id = searchParams.get('session_id')
    setSessionId(id)
    if (id) {
      clearCart()
    }
  }, [searchParams, clearCart])

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>

          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Package className="w-6 h-6 text-orange-500" />
              <p className="text-lg font-semibold text-gray-900">
                Order #{orderNumber}
              </p>
            </div>
            <p className="text-sm text-gray-600">
              A confirmation email has been sent to your email address.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </Link>
          </div>

          {/* Session ID for debugging */}
          {sessionId && (
            <p className="text-xs text-gray-400 mt-8">
              Session ID: {sessionId}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
