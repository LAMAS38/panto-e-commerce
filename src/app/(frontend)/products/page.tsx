// ProductsPage.tsx
// A revamped products listing page with responsive grid, sorting, view toggles,
// price range slider, featured filter and pagination controls.  Inspired by
// modern e‑commerce sites (e.g. Zara), this page lets users search, filter,
// sort and browse products across multiple breakpoints.  The page itself
// remains a server component so it can fetch data, while client‑side
// components (like PriceSlider) handle interactive UI elements.

import PriceSlider from './PriceSlider'
import ProductCardWithCart from './ProductCardWithCart'
import Link from 'next/link'
import type { Product } from '@/payload-types'
import { getProducts } from '@/lib/payload'
import { Search } from 'lucide-react'

interface ProductsPageProps {
  searchParams: {
    category?: string
    search?: string
    sort?: string
    minPrice?: string
    maxPrice?: string
    cols?: string
    featured?: string
    page?: string
    viewAll?: string
  }
}

// Helper to build query strings while preserving existing parameters.  Any
// override provided in the `overrides` object will replace the existing
// parameter, and undefined values will remove the key entirely.
function buildQuery(baseParams: Record<string, string | undefined>, overrides: Record<string, string | undefined>) {
  const params = new URLSearchParams()
  // include base params first
  Object.entries(baseParams).forEach(([key, value]) => {
    if (value !== undefined) params.set(key, value)
  })
  // apply overrides
  Object.entries(overrides).forEach(([key, value]) => {
    if (value === undefined) {
      params.delete(key)
    } else {
      params.set(key, value)
    }
  })
  const query = params.toString()
  return query
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // Fetch all products from Payload CMS.  You can adjust this call to use
  // your own data access layer / repository if needed.
  const allProducts: Product[] = await getProducts()

  // In Next.js 15, searchParams is asynchronous when using server components.
  // Await it before accessing its properties. See https://nextjs.org/docs/messages/sync-dynamic-apis
  const sp: any = await (searchParams as any)
  const category: string | undefined = sp.category
  const search: string | undefined = sp.search?.toLowerCase()
  const sort: string = sp.sort ?? ''
  const cols: number = parseInt(sp.cols ?? '0', 10) || 0
  const featured: boolean = sp.featured === '1' || sp.featured === 'true'
  const page: number = parseInt(sp.page ?? '1', 10)
  const viewAll: boolean = sp.viewAll === '1' || sp.viewAll === 'true'
  const minPriceParam: number | undefined = sp.minPrice ? parseFloat(sp.minPrice) : undefined
  const maxPriceParam: number | undefined = sp.maxPrice ? parseFloat(sp.maxPrice) : undefined

  // Derive unique categories from products.  Each category has a slug and title.
  const categoryMap: Record<string, string> = {}
  allProducts.forEach((prod) => {
    const cat = prod.category
    if (typeof cat === 'object' && cat) {
      categoryMap[cat.slug] = cat.title
    }
  })
  const categoryList = Object.entries(categoryMap).map(([slug, title]) => ({ slug, title }))

  // Compute default price bounds.
  const prices = allProducts.map((p) => p.price)
  const minDefaultPrice = Math.min(...prices)
  const maxDefaultPrice = Math.max(...prices)
  const minPrice = minPriceParam ?? minDefaultPrice
  const maxPrice = maxPriceParam ?? maxDefaultPrice

  // Apply filters: category, search term, featured flag and price range.
  let filtered = allProducts.slice()
  if (category) {
    filtered = filtered.filter((p) => {
      const cat = p.category
      if (typeof cat === 'object' && cat) return cat.slug === category
      if (typeof cat === 'string') return cat === category
      return false
    })
  }
  if (search) {
    filtered = filtered.filter((p) => p.title.toLowerCase().includes(search))
  }
  if (featured) {
    filtered = filtered.filter((p) => p.featured)
  }
  filtered = filtered.filter((p) => {
    const price = p.price
    return price >= minPrice && price <= maxPrice
  })

  // Apply sorting.
  if (sort === 'price_asc') {
    filtered.sort((a, b) => a.price - b.price)
  } else if (sort === 'price_desc') {
    filtered.sort((a, b) => b.price - a.price)
  } else if (sort === 'name_asc') {
    filtered.sort((a, b) => a.title.localeCompare(b.title))
  } else if (sort === 'name_desc') {
    filtered.sort((a, b) => b.title.localeCompare(a.title))
  }

  // Pagination logic: show 12 items per page unless viewAll is true.
  const pageSize = 12
  const totalProducts = filtered.length
  const totalPages = Math.ceil(totalProducts / pageSize)
  const currentPage = viewAll ? 1 : Math.max(1, Math.min(page, totalPages))
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = viewAll ? totalProducts : startIndex + pageSize
  const productsToDisplay = viewAll ? filtered : filtered.slice(startIndex, endIndex)

  // Determine grid classes based on the requested number of columns.
  // If a specific column count is selected (2, 3 or 4), apply it uniformly
  // across all breakpoints so the layout stays consistent on mobile.  When
  // no selection is made (cols === 0) the grid progressively adds columns at
  // larger breakpoints.  This gives users explicit control over the number
  // of columns displayed on small screens.
  let gridCols = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
  if (cols === 2) {
    gridCols = 'grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2'
  } else if (cols === 3) {
    gridCols = 'grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3'
  } else if (cols === 4) {
    gridCols = 'grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4'
  }

  // Base params object used by buildQuery.  Only include defined parameters.
  const baseParams: Record<string, string | undefined> = {
    category: category || undefined,
    search: search || undefined,
    sort: sort || undefined,
    minPrice: minPriceParam !== undefined ? String(minPriceParam) : undefined,
    maxPrice: maxPriceParam !== undefined ? String(maxPriceParam) : undefined,
    cols: cols ? String(cols) : undefined,
    featured: featured ? '1' : undefined,
    page: viewAll ? undefined : String(currentPage),
    viewAll: viewAll ? '1' : undefined,
  }

  // Build query helpers for different kinds of links.
  const queryWithoutPrice = (overrides: Record<string, string | undefined> = {}) => {
    return buildQuery({ ...baseParams, minPrice: undefined, maxPrice: undefined, page: undefined, viewAll: undefined }, overrides)
  }
  const queryWithOverrides = (overrides: Record<string, string | undefined> = {}) => {
    return buildQuery(baseParams, overrides)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
      {/* Page heading */}
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-5xl font-bold mb-2">All Products</h1>
        <p className="text-gray-600">Discover our complete collection of premium furniture</p>
      </div>

      {/* Search and categories/filter row */}
      <div className="flex flex-col gap-4 md:gap-6">
        {/* Search Bar */}
        <form method="get" className="relative w-full max-w-md">
          <div className="relative">
            <input
              type="text"
              name="search"
              defaultValue={search ?? ''}
              placeholder="Search furniture..."
              className="w-full h-12 pl-4 pr-14 rounded-full border border-gray-300 focus:ring-2 focus:ring-orange-500 bg-white text-sm placeholder-gray-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 bg-white hover:bg-gray-100"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-orange-500" strokeWidth={2} />
            </button>
          </div>
          {/* Preserve existing filters when searching */}
          {category && <input type="hidden" name="category" value={category} />}
          {sort && <input type="hidden" name="sort" value={sort} />}
          {minPriceParam !== undefined && <input type="hidden" name="minPrice" value={String(minPriceParam)} />}
          {maxPriceParam !== undefined && <input type="hidden" name="maxPrice" value={String(maxPriceParam)} />}
          {cols > 0 && <input type="hidden" name="cols" value={String(cols)} />}
          {featured && <input type="hidden" name="featured" value="1" />}
        </form>

        {/* Categories and featured chips */}
        <div className="flex flex-wrap gap-3 items-center justify-center md:justify-start">
          {/* All products chip */}
          <Link
            href={`/products?${buildQuery(baseParams, { category: undefined, featured: undefined, page: undefined, viewAll: undefined })}`}
            className={`px-4 py-2 rounded-full border text-sm transition-colors ${!category && !featured ? 'bg-gray-900 text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
          >
            All
          </Link>
          {/* Dynamically generated category chips */}
          {categoryList.map((cat) => {
            const selected = category === cat.slug && !featured
            return (
              <Link
                key={cat.slug}
                href={`/products?${buildQuery(baseParams, { category: cat.slug, featured: undefined, page: undefined, viewAll: undefined })}`}
                className={`px-4 py-2 rounded-full border text-sm transition-colors ${selected ? 'bg-gray-900 text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
              >
                {cat.title}
              </Link>
            )
          })}
          {/* Featured chip */}
          <Link
            href={`/products?${buildQuery(baseParams, { category: undefined, featured: featured ? undefined : '1', page: undefined, viewAll: undefined })}`}
            className={`px-4 py-2 rounded-full border text-sm transition-colors ${featured ? 'bg-gray-900 text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
          >
            Featured
          </Link>
        </div>

        {/* Sorting and view options */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Sort links */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700">
            <span className="font-medium">Sort by:</span>
            <Link
              href={`/products?${queryWithOverrides({ sort: 'price_asc', page: undefined, viewAll: undefined })}`}
              className={`hover:text-orange-500 ${sort === 'price_asc' ? 'font-semibold underline' : ''}`}
            >
              Price ↑
            </Link>
            <Link
              href={`/products?${queryWithOverrides({ sort: 'price_desc', page: undefined, viewAll: undefined })}`}
              className={`hover:text-orange-500 ${sort === 'price_desc' ? 'font-semibold underline' : ''}`}
            >
              Price ↓
            </Link>
            <Link
              href={`/products?${queryWithOverrides({ sort: 'name_asc', page: undefined, viewAll: undefined })}`}
              className={`hover:text-orange-500 ${sort === 'name_asc' ? 'font-semibold underline' : ''}`}
            >
              A–Z
            </Link>
            <Link
              href={`/products?${queryWithOverrides({ sort: 'name_desc', page: undefined, viewAll: undefined })}`}
              className={`hover:text-orange-500 ${sort === 'name_desc' ? 'font-semibold underline' : ''}`}
            >
              Z–A
            </Link>
          </div>

          {/* View column toggles */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span className="font-medium">View:</span>
            {[2, 3, 4].map((num) => (
              <Link
                key={num}
                href={`/products?${queryWithOverrides({ cols: String(num), page: undefined, viewAll: undefined })}`}
                className={`px-2 py-1 rounded hover:bg-gray-100 transition-colors ${cols === num ? 'bg-gray-900 text-white' : 'text-gray-700'}`}
              >
                {num}
              </Link>
            ))}
          </div>
        </div>

        {/* Price slider */}
        <div className="max-w-md">
          <PriceSlider
            minDefault={Math.floor(minDefaultPrice)}
            maxDefault={Math.ceil(maxDefaultPrice)}
            minCurrent={minPrice}
            maxCurrent={maxPrice}
            baseQuery={queryWithoutPrice()}
          />
        </div>
      </div>

      {/* Products grid */}
      <div className={`mt-8 grid ${gridCols} gap-4 md:gap-6 lg:gap-8`}>
        {productsToDisplay.map((product) => (
          <ProductCardWithCart key={product.id} product={product} compact={cols >= 3} />
        ))}
      </div>

      {/* No results fallback */}
      {productsToDisplay.length === 0 && (
        <div className="text-center py-12 text-gray-600">No products found.</div>
      )}

      {/* Pagination / summary */}
      {!viewAll && totalPages > 1 && (
        <div className="mt-8 flex flex-col items-center gap-4">
          {/* Page numbers */}
          <div className="flex items-center gap-3 text-sm">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <Link
                key={num}
                href={`/products?${queryWithOverrides({ page: String(num), viewAll: undefined })}`}
                className={`px-2 py-1 rounded hover:bg-gray-100 transition-colors ${num === currentPage ? 'font-bold underline' : ''}`}
              >
                {num}
              </Link>
            ))}
            {/* Next page link */}
            {currentPage < totalPages && (
              <Link
                href={`/products?${queryWithOverrides({ page: String(currentPage + 1), viewAll: undefined })}`}
                className="ml-2 px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
              >
                Next
              </Link>
            )}
            {/* View all link */}
            <Link
              href={`/products?${queryWithOverrides({ viewAll: '1', page: undefined })}`}
              className="ml-4 underline text-sm"
            >
              View all ({totalProducts})
            </Link>
          </div>
          {/* Summary */}
          <div className="text-sm text-gray-600">
            Showing {productsToDisplay.length} of {totalProducts} products
          </div>
        </div>
      )}

      {viewAll && (
        <div className="mt-8 text-center text-sm text-gray-600">
          Showing {totalProducts} products
        </div>
      )}
    </div>
  )
}