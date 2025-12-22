import Link from 'next/link'

export function WhyChoosingUs() {
  return (
    <section className="relative bg-[#f7f7f7] py-12 md:py-20">
      {/* Background Image */}
      {/* <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=1600&auto=format&fit=crop')",
        }}
      /> */}

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="grid gap-8 md:gap-12 lg:grid-cols-4">
          {/* Title */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Why<br />Choosing Us
            </h2>
          </div>

          {/* Features */}
          <div className="lg:col-span-3 grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                Luxury facilities
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-4 leading-relaxed">
                The advantage of hiring a workspace with us is that gives you comfortable service and all-around facilities.
              </p>
              <Link 
                href="/products" 
                className="text-sm md:text-base text-orange-500 hover:text-orange-600 font-medium transition-colors inline-flex items-center gap-1"
              >
                More info →
              </Link>
            </div>

            {/* Feature 2 */}
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                Affordable Price
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-4 leading-relaxed">
                You can get a workspace of the highest quality at an affordable price and still enjoy the facilities that are only here.
              </p>
              <Link 
                href="/products" 
                className="text-sm md:text-base text-orange-500 hover:text-orange-600 font-medium transition-colors inline-flex items-center gap-1"
              >
                More info →
              </Link>
            </div>

            {/* Feature 3 */}
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                Many Choices
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-4 leading-relaxed">
                We provide many unique work space choices so that you can choose the workspace to your liking.
              </p>
              <Link 
                href="/products" 
                className="text-sm md:text-base text-orange-500 hover:text-orange-600 font-medium transition-colors inline-flex items-center gap-1"
              >
                More info →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
