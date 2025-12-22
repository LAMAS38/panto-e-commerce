import Link from 'next/link'
import { Facebook, Twitter, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-bold text-gray-900 mb-4 inline-block">
              Panto
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              The advantage of hiring a workspace with us is that gives you comfortable service and all-around facilities.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-orange-500 font-semibold mb-4 text-sm md:text-base">
              Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">
                  Email Marketing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">
                  Campaigns
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">
                  Branding
                </Link>
              </li>
            </ul>
          </div>

          {/* Furniture */}
          <div>
            <h3 className="text-orange-500 font-semibold mb-4 text-sm md:text-base">
              Furniture
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products?category=bed" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">
                  Beds
                </Link>
              </li>
              <li>
                <Link href="/products?category=chair" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">
                  Chair
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">
                  All
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-orange-500 font-semibold mb-4 text-sm md:text-base">
              Follow Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors text-sm group"
                >
                  <Facebook className="w-4 h-4 group-hover:text-orange-500" />
                  Facebook
                </a>
              </li>
              <li>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors text-sm group"
                >
                  <Twitter className="w-4 h-4 group-hover:text-orange-500" />
                  Twitter
                </a>
              </li>
              <li>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors text-sm group"
                >
                  <Instagram className="w-4 h-4 group-hover:text-orange-500" />
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs md:text-sm">
            Copyright © 2025
          </p>
          <div className="flex gap-6">
            <Link href="/contact" className="text-gray-500 hover:text-orange-500 transition-colors text-xs md:text-sm">
              Terms &amp; Conditions
            </Link>
            <Link href="/contact" className="text-gray-500 hover:text-orange-500 transition-colors text-xs md:text-sm">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
