'use client'

import Link from 'next/link'
import { ShoppingBag, ChevronDown, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

export function Navbar() {
  const { totalItems } = useCart()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5">
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold text-white hover:text-orange-400 transition-colors">
          Panto
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 text-sm text-white/90 md:flex">
          <div 
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="inline-flex items-center gap-1 hover:text-white transition-colors">
              Furniture <ChevronDown className="h-4 w-4" />
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 top-8 w-44 rounded-xl bg-white p-2 text-zinc-900 shadow-xl">
                <Link 
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors" 
                  href="/products?category=chair"
                >
                  Chairs
                </Link>
                <Link 
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors" 
                  href="/products?category=sofa"
                >
                  Sofas
                </Link>
                <Link 
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors" 
                  href="/products?category=lamp"
                >
                  Lamps
                </Link>
                <Link 
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors" 
                  href="/products?category=bed"
                >
                  Beds
                </Link>
              </div>
            )}
          </div>

          <Link className="hover:text-white transition-colors" href="/products">Shop</Link>
          <Link className="hover:text-white transition-colors" href="/about">About Us</Link>
          <Link className="hover:text-white transition-colors" href="/contact">Contact</Link>
        </nav>

        {/* Right Side - Cart + Mobile Menu Button */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <Link
            href="/cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 transition-colors"
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[11px] font-semibold text-white animate-pulse">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur">
          <nav className="flex flex-col px-4 py-4 space-y-2">
            <Link 
              href="/products" 
              className="px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              href="/products?category=chair" 
              className="px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              • Chairs
            </Link>
            <Link 
              href="/products?category=sofa" 
              className="px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              • Sofas
            </Link>
            <Link 
              href="/products?category=lamp" 
              className="px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              • Lamps
            </Link>
            <Link 
              href="/products?category=bed" 
              className="px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              • Beds
            </Link>
            <Link 
              href="/about" 
              className="px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              href="/contact" 
              className="px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
