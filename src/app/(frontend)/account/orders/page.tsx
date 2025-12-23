"use client";

// This page shows the logged-in customer's orders. It fetches
// the orders from a backend API route based on the user's ID and
// displays each order with its items, totals and date. If the user is
// not authenticated, they are redirected to the login page.

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from './useAuth'

interface OrderItem {
  product?: { title?: string }
  qty: number
  price?: number
  priceAtPurchase?: number
}

interface Order {
  id: string
  createdAt: string
  total?: number
  items: OrderItem[]
  status?: string
}

export default function AccountOrdersPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [orders, setOrders] = useState<Order[] | null>(null)
  const [loadingOrders, setLoadingOrders] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [loading, user, router])

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        setLoadingOrders(true)
        try {
          const res = await fetch(`/api/orders/${user.id}`, { credentials: 'include' })
          if (res.ok) {
            const data = await res.json()
            // The returned data may include pagination info; extract docs if present
            const docs = (data && data.docs) || data
            setOrders(docs as Order[])
          } else {
            setOrders([])
          }
        } catch (err) {
          setOrders([])
        } finally {
          setLoadingOrders(false)
        }
      }
    }
    fetchOrders()
  }, [user])

  if (loading || !user) {
    return <div className="max-w-3xl mx-auto py-12 px-4">Loading…</div>
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-semibold mb-6">My Orders</h1>
      {loadingOrders ? (
        <p>Loading orders…</p>
      ) : !orders || orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-medium">Order #{order.id}</h2>
                  <p className="text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                  {order.status && <p className="text-gray-500 capitalize">Status: {order.status}</p>}
                </div>
                <div className="text-right">
                  {order.total && <p className="font-semibold">${order.total}</p>}
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>
                      {item.product?.title || 'Product'} × {item.qty}
                    </span>
                    <span>
                      ${item.priceAtPurchase || item.price || 0}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-8">
        <Link href="/account" className="text-blue-600 hover:underline">← Back to account</Link>
      </div>
    </div>
  )
}