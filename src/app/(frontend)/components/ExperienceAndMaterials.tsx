import Link from 'next/link'
import Image from 'next/image'

export function ExperienceAndMaterials() {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        {/* Experience Section */}
        <div className="grid gap-8 md:gap-12 lg:grid-cols-2 items-center mb-16 md:mb-24">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&auto=format&fit=crop"
                alt="Modern house exterior"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="text-orange-500 font-semibold text-sm md:text-base mb-3 uppercase tracking-wide">
              EXPERIENCES
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              We Provide You The Best Experience
            </h2>
            <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
              You don&apos;t have to worry about the result because all of these interiors are made by people who are professionals in their fields with an elegant and luxurious style and with premium quality materials.
            </p>
            <Link 
              href="/products" 
              className="text-sm md:text-base text-orange-500 hover:text-orange-600 font-semibold transition-colors inline-flex items-center gap-1"
            >
              More Info →
            </Link>
          </div>
        </div>

        {/* Materials Section */}
        <div className="grid gap-8 md:gap-12 lg:grid-cols-2 items-center">
          {/* Content */}
          <div>
            <p className="text-orange-500 font-semibold text-sm md:text-base mb-3 uppercase tracking-wide">
              MATERIALS
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Very Serious Materials For Making Furniture
            </h2>
            <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
              Because panto was very serious about designing furniture for our environment, using a very expensive and famous capital but at a relatively low price.
            </p>
            <Link 
              href="/products" 
              className="text-sm md:text-base text-orange-500 hover:text-orange-600 font-semibold transition-colors inline-flex items-center gap-1"
            >
              More Info →
            </Link>
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400&auto=format&fit=crop"
                alt="Interior design 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden mt-8">
              <Image
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop"
                alt="Interior design 2"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden -mt-8">
              <Image
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&auto=format&fit=crop"
                alt="Interior design 3"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1615873968403-89e068629265?w=400&auto=format&fit=crop"
                alt="Interior design 4"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
