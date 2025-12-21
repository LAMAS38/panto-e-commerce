'use client'

import Link from 'next/link'
import { XCircle, ArrowLeft, ShoppingBag } from 'lucide-react'

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg text-center">
          {/* Cancel Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
            <XCircle className="w-12 h-12 text-red-500" />
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Payment Cancelled
          </h1>

          <p className="text-gray-600 mb-8">
            Your payment was not processed. Your cart items are still saved and ready when you&apos;re ready to checkout.
          </p>

          {/* Info Box */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <p className="text-sm text-gray-600">
              No charges were made to your account. You can return to your cart to complete your purchase or continue shopping.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cart"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              Back to Cart
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>

          {/* Help Text */}
          <p className="text-xs text-gray-500 mt-8">
            Need help? <Link href="/contact" className="text-orange-500 hover:underline">Contact our support team</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
