"use client";

// This page displays the logged-in customer's profile information and
// provides links to their order history and other account-related
// sections. If the user is not authenticated, they are redirected to
// the login page.

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from './useAuth'

export default function AccountPage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  // If not authenticated, redirect to login when done loading
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [loading, user, router])

  if (loading || !user) {
    return <div className="max-w-3xl mx-auto py-12 px-4">Loading…</div>
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-semibold mb-6">My Account</h1>
      <div className="space-y-3 mb-8">
        <p><span className="font-medium">Name:</span> {user.firstName} {user.lastName}</p>
        <p><span className="font-medium">Email:</span> {user.email}</p>
        {user.phone && <p><span className="font-medium">Phone:</span> {user.phone}</p>}
      </div>
      <div className="space-y-4">
        <Link href="/account/orders" className="text-blue-600 hover:underline">View my orders</Link>
        {/* Future: add link to reviews if desired */}
      </div>
    </div>
  )
}