import Link from 'next/link'
import { getProducts, getCategories } from '@/lib/payload'
import { Navbar } from '../components/Navbar'
import ProductCardWithCart from './ProductCardWithCart'

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams
  const selectedCategory = params.category

  // Récupérer tous les produits et catégories
  const allProducts = await getProducts()
  const categories = await getCategories()

  // Filtrer les produits par catégorie si nécessaire
  const products = selectedCategory
    ? allProducts.filter((p) => {
        const cat = typeof p.category === 'object' ? p.category.slug : null
        return cat === selectedCategory
      })
    : allProducts

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">
            Discover our complete collection of premium furniture
          </p>
        </div>

        {/* Filtres par catégorie */}
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

        {/* Grille de produits */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCardWithCart key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg">
            <p className="text-gray-600 text-lg">
              No products found in this category.
            </p>
            <Link
              href="/products"
              className="inline-block mt-4 text-orange-500 hover:text-orange-600 font-semibold"
            >
              View all products →
            </Link>
          </div>
        )}

        {/* Nombre de produits */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Showing {products.length} product{products.length !== 1 ? 's' : ''}
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
