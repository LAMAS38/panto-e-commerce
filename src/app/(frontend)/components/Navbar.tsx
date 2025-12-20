import Link from 'next/link'
import { ShoppingBag, ChevronDown } from 'lucide-react'

export function Navbar() {
  return (
    <header className="absolute left-0 right-0 top-0 z-20">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5">
        <Link href="/" className="text-lg font-semibold text-white">
          Panto
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-white/90 md:flex">
          <div className="group relative">
            <button className="inline-flex items-center gap-1 hover:text-white">
              Furniture <ChevronDown className="h-4 w-4" />
            </button>
            <div className="invisible absolute left-0 top-7 w-44 rounded-xl bg-white p-2 text-zinc-900 shadow-lg opacity-0 transition group-hover:visible group-hover:opacity-100">
              <Link className="block rounded-lg px-3 py-2 text-sm hover:bg-zinc-100" href="/shop">
                Chairs
              </Link>
              <Link className="block rounded-lg px-3 py-2 text-sm hover:bg-zinc-100" href="/shop">
                Tables
              </Link>
              <Link className="block rounded-lg px-3 py-2 text-sm hover:bg-zinc-100" href="/shop">
                Lamps
              </Link>
            </div>
          </div>

          <Link className="hover:text-white" href="/shop">Shop</Link>
          <Link className="hover:text-white" href="/about">About Us</Link>
          <Link className="hover:text-white" href="/contact">Contact</Link>
        </nav>

        <Link
          href="/cart"
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/15"
          aria-label="Cart"
        >
          <ShoppingBag className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[11px] font-semibold text-white">
            0
          </span>
        </Link>
      </div>
    </header>
  )
}
