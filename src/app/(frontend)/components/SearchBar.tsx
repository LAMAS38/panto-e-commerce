'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'

type SearchBarProps = {
  variant?: 'hero' | 'default'
  className?: string
}

export function SearchBar({ variant = 'default', className = '' }: SearchBarProps) {
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

  const isHero = variant === 'hero'

  return (
    <form
      onSubmit={handleSearch}
      className={[
        'mt-10 flex w-full max-w-lg items-center gap-2 rounded-full p-2 backdrop-blur',
        isHero ? 'bg-white/20' : 'bg-zinc-100',
        className,
      ].join(' ')}
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search furniture"
        className={[
          'w-full bg-transparent px-4 py-3 text-sm outline-none',
          isHero ? 'text-white placeholder:text-white/70' : 'text-zinc-900 placeholder:text-zinc-500',
        ].join(' ')}
      />

      {query && (
        <button
          type="button"
          onClick={handleClear}
          className={[
            'inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full transition-colors',
            isHero ? 'bg-white/10 hover:bg-white/20' : 'bg-zinc-200 hover:bg-zinc-300',
          ].join(' ')}
          aria-label="Clear search"
        >
          <X className={['h-5 w-5', isHero ? 'text-white' : 'text-zinc-900'].join(' ')} />
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
