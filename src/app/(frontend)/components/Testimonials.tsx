import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const reviews = [
  {
    name: 'Bang Upin',
    role: 'Pedagang Asongan',
    img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Ibuk Susi',
    role: 'Ibu Rumah Tangga',
    img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Mpok Ina',
    role: 'Karyawan Swasta',
    img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800&auto=format&fit=crop',
  },
]


export function Testimonials() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-widest text-orange-500">TESTIMONIALS</p>
          <h2 className="mt-2 text-2xl font-semibold">Our Client Reviews</h2>
        </div>

        <div className="relative mt-10">
          <button className="absolute left-0 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow md:inline-flex">
            <ChevronLeft className="h-5 w-5 text-zinc-700" />
          </button>
          <button className="absolute right-0 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow md:inline-flex">
            <ChevronRight className="h-5 w-5 text-zinc-700" />
          </button>

          <div className="grid gap-5 md:grid-cols-3">
            {reviews.map((r) => (
              <div key={r.name} className="overflow-hidden rounded-3xl shadow-sm">
                <div className="relative h-72 w-full">
                  <Image src={r.img} alt={r.name} fill className="object-cover" />
                </div>

                {/* card overlay like mock */}
                <div className="relative -mt-16 mx-6 rounded-2xl bg-white p-5 text-center shadow">
                  <p className="text-sm font-semibold">{r.name}</p>
                  <p className="mt-1 text-xs text-zinc-500">{r.role}</p>
                  <p className="mt-3 text-xs leading-5 text-zinc-500">
                    “Terimakasih banyak, now my room feels more luxurious and comfortable.”
                  </p>
                  <button className="mt-4 text-xs font-semibold text-orange-500">
                    VIEW NOW →
                  </button>
                </div>
                <div className="h-8" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
