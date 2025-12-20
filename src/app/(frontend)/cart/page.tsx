'use client'

import { useCart } from '../context/CartContext'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Panto
            </Link>
          </div>
        </div>

        {/* Empty State */}
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
              <ShoppingBag className="w-10 h-10 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven&apos;t added anything to your cart yet.
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
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Panto
            </Link>
            <Link
              href="/products"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const firstImage = item.product.images?.[0]
              const imageData = typeof firstImage?.image === 'object' ? firstImage.image : null
              const imageUrl = imageData?.url || 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=400'

              return (
                <div
                  key={item.product.id}
                  className="bg-white rounded-xl p-6 flex gap-6 shadow-sm"
                >
                  {/* Image */}
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                    <Image
                      src={imageUrl}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="text-lg font-semibold text-gray-900 hover:text-orange-500 transition-colors"
                    >
                      {item.product.title}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">
                      {typeof item.product.category === 'object'
                        ? item.product.category.title
                        : 'Product'}
                    </p>
                    <p className="text-lg font-bold text-gray-900 mt-2">
                      ${item.product.price}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          −
                        </button>
                        <span className="w-12 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="ml-auto text-red-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              )
            })}

            {/* Clear Cart Button */}
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span className="font-semibold">$0.00</span>
                </div>
              </div>

              <div className="pt-6 border-t">
                <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                <button className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  Proceed to Checkout
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
