import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50">

      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Panto
          </h1>
          <p className="text-gray-600 text-lg">
            Creating beautiful, minimalist spaces since 2020
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-2xl p-8 md:p-12 mb-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            At Panto, we believe that furniture should be more than just functional – it should transform your space into a sanctuary of comfort and style. Our mission is to provide premium, minimalist furniture that brings elegance and simplicity to modern living.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We carefully curate each piece with attention to detail, ensuring that every item meets our high standards of quality, design, and sustainability.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white rounded-2xl p-8 md:p-12 mb-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Premium Quality
              </h3>
              <p className="text-gray-600 text-sm">
                Each piece is crafted with the finest materials and attention to detail.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Timeless Design
              </h3>
              <p className="text-gray-600 text-sm">
                Our minimalist aesthetic ensures your furniture never goes out of style.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Affordable Luxury
              </h3>
              <p className="text-gray-600 text-sm">
                Premium furniture at prices that won&apos;t break the bank.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Customer First
              </h3>
              <p className="text-gray-600 text-sm">
                Your satisfaction is our priority, with dedicated support every step of the way.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Explore Our Collection
          </Link>
        </div>
      </div>
    </div>
  )
}
