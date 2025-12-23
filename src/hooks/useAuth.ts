"use client";

// This hook provides a simple way to access the current authenticated
// customer on the client side. It fetches the currently logged-in
// customer from the Payload authentication endpoint and exposes a
// `user` object, a `loading` boolean and a `refetch` function to
// refresh the user state. If the user is not logged in, `user`
// remains `null`.

import { useState, useEffect } from 'react'

export interface Customer {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  address?: {
    line1?: string
    line2?: string
    city?: string
    province?: string
    postalCode?: string
    country?: string
  }
}

export function useAuth() {
  const [user, setUser] = useState<Customer | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/customers/me', { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setUser(data)
      } else {
        setUser(null)
      }
    } catch (err) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { user, loading, refetch: fetchUser }
}