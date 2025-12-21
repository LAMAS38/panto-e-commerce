import Link from 'next/link'
import { getProducts, getCategories } from '@/lib/payload'
import { Navbar } from '../components/Navbar'
import ProductCardWithCart from './ProductCardWithCart'
import ProductSearchBar from './ProductSearchBar'

interface ProductsPageProps {
  searchParams: Promise<{ category?: string; search?: string }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams
  const selectedCategory = params.category
  const searchQuery = params.search?.toLowerCase() || ''

  // Récupérer tous les produits et catégories
  const allProducts = await getProducts()
  const categories = await getCategories()

  // Filtrer par catégorie
  let filteredProducts = selectedCategory
    ? allProducts.filter((p) => {
        const cat = typeof p.category === 'object' ? p.category.slug : null
        return cat === selectedCategory
      })
    : allProducts

  // Filtrer par recherche
  if (searchQuery) {
    filteredProducts = filteredProducts.filter((p) => {
      const title = p.title.toLowerCase()
      const description = p.description?.toLowerCase() || ''
      const category = typeof p.category === 'object' ? p.category.title.toLowerCase() : ''
      
      return (
        title.includes(searchQuery) ||
        description.includes(searchQuery) ||
        category.includes(searchQuery)
      )
    })
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {searchQuery ? `Search results for "${searchQuery}"` : 'All Products'}
          </h1>
          <p className="text-gray-600">
            {searchQuery 
              ? `Found ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`
              : 'Discover our complete collection of premium furniture'
            }
          </p>
        </div>

        {/* Barre de recherche style Hero */}
        <div className="mb-8 max-w-2xl">
          <ProductSearchBar initialQuery={searchQuery} />
        </div>

        {/* Filtres par catégorie */}
        {!searchQuery && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  !selectedCategory
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.slug}`}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.slug
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Grille de produits */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCardWithCart key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg">
            <p className="text-gray-600 text-lg mb-2">
              {searchQuery 
                ? `No products found for "${searchQuery}"`
                : 'No products found in this category.'
              }
            </p>
            <Link
              href="/products"
              className="inline-block mt-4 text-orange-500 hover:text-orange-600 font-semibold"
            >
              {searchQuery ? 'Clear search →' : 'View all products →'}
            </Link>
          </div>
        )}

        {/* Nombre de produits */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Footer simple */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 Panto. Built with Next.js & Payload CMS.</p>
        </div>
      </footer>
    </div>
  )
}
