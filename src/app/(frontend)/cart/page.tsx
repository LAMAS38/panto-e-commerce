// Modified cart page with responsive layout for mobile, tablet, and desktop
// This file corresponds to src/app/(frontend)/cart/page.tsx in the original project.
// Changes:
// - Updated grid to use md:grid-cols-2 and lg:grid-cols-3
// - Added md:col-span utility classes so the first section spans two columns on tablet
//   and large screens while the summary occupies one column.

'use client'

import { useState } from 'react'
import { useCart } from '../context/CartContext'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      if (!data.url) {
        throw new Error('No checkout URL')
      }

      window.location.href = data.url
    } catch (error) {
      console.error('Checkout error:', error)
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Empty cart view
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Panto
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
              <ShoppingBag className="w-10 h-10 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven&apos;t added anything yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Title and continue shopping link */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
          <Link href="/products" className="text-sm md:text-base text-gray-600 hover:text-gray-900">
            Continue Shopping
          </Link>
        </div>

        {/* Responsive grid: 1 column on mobile, 2 columns on tablets, 3 on desktop */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Items list occupies two columns on md and lg */}
          <div className="md:col-span-2 lg:col-span-2 space-y-4">
            {items.map((item) => {
              // Determine the first product image, if available
              const firstImage = item.product.images && item.product.images[0]
              const imageUrl =
                firstImage?.image && typeof firstImage.image === 'object' && firstImage.image?.url
                  ? firstImage.image.url
                  : 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=400'
              return (
                <div
                  key={item.product.id}
                  className="bg-white rounded-xl p-4 sm:p-6 flex items-center gap-4 sm:gap-6 shadow-sm"
                >
                  {/* Product image - shrink on small screens */}
                  <div className="relative w-20 h-20 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                    <Image src={imageUrl} alt={item.product.title} fill className="object-cover" />
                  </div>
                  {/* Product details */}
                  <div className="flex-1">
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="block text-base sm:text-lg font-semibold text-gray-900 hover:text-orange-500"
                    >
                      {item.product.title}
                    </Link>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
                      {typeof item.product.category === 'object' ? item.product.category.title : 'Product'}
                    </p>
                    <p className="text-base sm:text-lg font-bold text-gray-900 mt-1 sm:mt-2">
                      ${item.product.price}
                    </p>
                    <div className="flex items-center gap-3 sm:gap-4 mt-3 sm:mt-4">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-100 hover:bg-gray-200"
                        >
                          −
                        </button>
                        <span className="w-8 sm:w-12 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-100 hover:bg-gray-200"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="ml-auto text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  {/* Total price column - visible on all breakpoints */}
                  <div className="flex-shrink-0 text-right pl-2 sm:pl-4">
                    <p className="text-sm sm:text-lg font-bold text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              )
            })}
            <button onClick={clearCart} className="text-red-500 hover:text-red-600 text-sm font-medium">
              Clear Cart
            </button>
          </div>
          {/* Order summary occupies one column on md and lg */}
          <div className="md:col-span-1 lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
              </div>
              <div className="pt-6 border-t">
                <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Proceed to Checkout
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center mt-4">
                Secure checkout powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}