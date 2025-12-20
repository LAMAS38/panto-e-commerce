import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-gray-900">
              Panto
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Products
            </Link>
            <Link 
              href="/products?category=chair" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Chairs
            </Link>
            <Link 
              href="/products?category=sofa" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Sofas
            </Link>
          </nav>

          {/* Cart Button (placeholder for later) */}
          <button className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
              />
            </svg>
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-blue-600 rounded-full">
              0
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu (simplified for now) */}
      <div className="md:hidden border-t border-gray-200 px-4 py-3">
        <nav className="flex flex-col space-y-2">
          <Link 
            href="/" 
            className="text-gray-700 hover:text-gray-900 transition-colors py-2"
          >
            Home
          </Link>
          <Link 
            href="/products" 
            className="text-gray-700 hover:text-gray-900 transition-colors py-2"
          >
            All Products
          </Link>
          <Link 
            href="/products?category=chair" 
            className="text-gray-700 hover:text-gray-900 transition-colors py-2"
          >
            Chairs
          </Link>
          <Link 
            href="/products?category=sofa" 
            className="text-gray-700 hover:text-gray-900 transition-colors py-2"
          >
            Sofas
          </Link>
        </nav>
      </div>
    </header>
  )
}
