import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-white py-14">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="text-lg font-semibold">Panto</p>
            <p className="mt-3 text-sm leading-6 text-zinc-500">
              The advantage of hiring a workspace with us is that gives you comfortable service and all-around facilities.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-orange-500">Services</p>
            <div className="mt-4 space-y-3 text-sm text-zinc-600">
              <Link href="/email" className="block hover:text-zinc-900">Email Marketing</Link>
              <Link href="/campaigns" className="block hover:text-zinc-900">Campaigns</Link>
              <Link href="/branding" className="block hover:text-zinc-900">Branding</Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-orange-500">Furniture</p>
            <div className="mt-4 space-y-3 text-sm text-zinc-600">
              <Link href="/shop" className="block hover:text-zinc-900">Beds</Link>
              <Link href="/shop" className="block hover:text-zinc-900">Chair</Link>
              <Link href="/shop" className="block hover:text-zinc-900">All</Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-orange-500">Follow Us</p>
            <div className="mt-4 space-y-3 text-sm text-zinc-600">
              <a className="block hover:text-zinc-900" href="#">Facebook</a>
              <a className="block hover:text-zinc-900" href="#">Twitter</a>
              <a className="block hover:text-zinc-900" href="#">Instagram</a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t pt-6 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>Copyright © 2025</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-900">Terms & Conditions</a>
            <a href="#" className="hover:text-zinc-900">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
