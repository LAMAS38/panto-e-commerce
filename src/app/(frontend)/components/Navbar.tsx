'use client'

import Link from 'next/link'
import { ShoppingBag, ChevronDown, Menu, X, User } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'

export function Navbar() {
  const { totalItems } = useCart()
  const { user, isAuthenticated } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
      className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10 relative"
    >
      <div className="mx-auto flex w-full items-center justify-between px-2 md:px-4 py-5">
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
              <div
                className="absolute left-0 top-full w-44 rounded-xl bg-white p-2 text-zinc-900 shadow-xl"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <Link
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  href="/products?category=chairs"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Chairs
                </Link>
                <Link
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  href="/products?category=sofas"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Sofas
                </Link>
                <Link
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  href="/products?category=lamps"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Lamps
                </Link>
                <Link
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  href="/products?category=beds"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Beds
                </Link>
              </div>
            )}
          </div>
          <Link className="hover:text-white transition-colors" href="/products">
            Shop
          </Link>
          <Link className="hover:text-white transition-colors" href="/about">
            About Us
          </Link>
          <Link className="hover:text-white transition-colors" href="/contact">
            Contact
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Account Button (Desktop) */}
          {isAuthenticated ? (
            <Link
              href="/account"
              className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 transition-colors"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm font-medium"
            >
              Log In
            </Link>
          )}

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
        <div className="md:hidden absolute inset-x-0 top-full border-t border-white/10 bg-black/95 backdrop-blur-sm">
          <nav className="flex flex-col gap-4 px-6 py-8 text-white">
            {/* Account Link (Mobile) */}
            {isAuthenticated ? (
              <Link
                href="/account"
                className="text-lg font-medium hover:text-orange-400 transition-colors flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                My Account
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="text-lg font-medium hover:text-orange-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log In
              </Link>
            )}

            <Link
              href="/products"
              className="text-lg font-medium hover:text-orange-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop
            </Link>

            {/* Subcategories */}
            <div className="flex flex-col gap-2 pl-4 text-white/80 text-base">
              <Link
                href="/products?category=chairs"
                className="hover:text-orange-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Chairs
              </Link>
              <Link
                href="/products?category=sofas"
                className="hover:text-orange-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sofas
              </Link>
              <Link
                href="/products?category=lamps"
                className="hover:text-orange-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Lamps
              </Link>
              <Link
                href="/products?category=beds"
                className="hover:text-orange-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Beds
              </Link>
            </div>

            <Link
              href="/about"
              className="text-lg font-medium hover:text-orange-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-lg font-medium hover:text-orange-400 transition-colors"
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