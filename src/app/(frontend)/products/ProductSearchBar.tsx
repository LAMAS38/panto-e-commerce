'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'

interface ProductSearchBarProps {
  initialQuery?: string
}

export default function ProductSearchBar({ initialQuery = '' }: ProductSearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`)
    }
  }

  const handleClear = () => {
    setQuery('')
    router.push('/products')
  }

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2 rounded-full bg-gray-100 p-2 border border-gray-200">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search furniture..."
        className="w-full bg-transparent px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-500"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Clear search"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      )}
      <button
        type="submit"
        className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 transition-colors"
        aria-label="Search"
      >
        <Search className="h-5 w-5 text-white" />
      </button>
    </form>
  )
}
