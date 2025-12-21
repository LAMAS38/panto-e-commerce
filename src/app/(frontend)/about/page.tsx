import { Navbar } from '../components/Navbar'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold text-gray-900 mb-6 text-center">About Panto</h1>
        
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Welcome to Panto, where minimalist design meets modern living. We curate premium furniture 
            that transforms your space into a contemporary sanctuary.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Our Mission</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We believe that great furniture should be both beautiful and functional. Every piece in our 
            collection is carefully selected for its quality, design, and ability to enhance your daily life.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Why Choose Us</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-3">
              <span className="text-orange-500 font-bold">✓</span>
              <span><strong>Premium Quality:</strong> Every product is crafted with attention to detail</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 font-bold">✓</span>
              <span><strong>Modern Design:</strong> Timeless pieces that elevate any space</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 font-bold">✓</span>
              <span><strong>Affordable Luxury:</strong> High-end furniture at accessible prices</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 font-bold">✓</span>
              <span><strong>Customer First:</strong> Your satisfaction is our priority</span>
            </li>
          </ul>

          <div className="mt-12 text-center">
            <Link 
              href="/products"
              className="inline-block bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Explore Our Collection
            </Link>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-gray-300 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 Panto. Built with Next.js & Payload CMS.</p>
        </div>
      </footer>
    </div>
  )
}
