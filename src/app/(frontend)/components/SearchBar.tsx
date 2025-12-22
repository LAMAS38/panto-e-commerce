'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'

export function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')

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
    // Conteneur centré avec max-width
    <div className="mt-10 w-full max-w-lg mx-auto">
      <form onSubmit={handleSearch} className="flex items-center gap-2 rounded-full bg-white/20 p-2 backdrop-blur">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search furniture"
          className="w-full bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/70"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Clear search"
          >
            <X className="h-5 w-5 text-white" />
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
    </div>
  )
}
