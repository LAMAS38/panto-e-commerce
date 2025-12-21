import Link from 'next/link'
import Image from 'next/image'

const testimonials = [
  {
    name: 'Bang Upin',
    role: 'Pedagang Asongan',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&auto=format&fit=crop',
    quote: 'Terimakasih banyak, now my room feels more luxurious and comfortable.'
  },
  {
    name: 'Ibuk Susi',
    role: 'Ibu Rumah Tangga',
    image: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400&auto=format&fit=crop',
    quote: 'Terimakasih banyak, now my room feels more luxurious and comfortable.'
  },
  {
    name: 'Mpok Ina',
    role: 'Karyawan Swasta',
    image: 'https://images.unsplash.com/photo-1600878459108-e1eda4ec7e45?w=400&auto=format&fit=crop',
    quote: 'Terimakasih banyak, now my room feels more luxurious and comfortable.'
  }
]

export function Testimonials() {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <p className="text-orange-500 font-semibold text-sm md:text-base mb-3 uppercase tracking-wide">
            TESTIMONIALS
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Our Client Reviews
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Image */}
              <div className="relative aspect-[4/3]">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {testimonial.role}
                </p>
                <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
                  &quot;{testimonial.quote}&quot;
                </p>
                <Link 
                  href="/products" 
                  className="text-sm md:text-base text-orange-500 hover:text-orange-600 font-semibold transition-colors inline-flex items-center gap-1"
                >
                  VIEW NOW →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
