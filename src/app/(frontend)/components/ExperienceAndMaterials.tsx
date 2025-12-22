import Image from 'next/image'
import Link from 'next/link'

function getMediaUrl(m: any) {
  if (!m) return ''
  if (typeof m === 'string' || typeof m === 'number') return ''
  return m.url || ''
}

export function ExperienceAndMaterials({ home }: { home: any }) {
  const expImg = getMediaUrl(home?.experience?.image)

  const tiles: string[] =
    home?.materials?.tiles?.map((t: any) => getMediaUrl(t?.image)).filter(Boolean) || []

  // fallback simple si jamais pas 4 tiles
  while (tiles.length < 4) tiles.push('')

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16 lg:py-20 space-y-16 md:space-y-24">
      {/* EXPERIENCE SECTION */}
      <div className="grid gap-8 md:gap-12 lg:grid-cols-2 items-center">
        {/* Image - Animation slide-in-left */}
        <div className="relative h-[280px] sm:h-[320px] md:h-[360px] lg:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden group animate-slide-in-left">
          {expImg ? (
            <Image 
              src={expImg} 
              alt="Experience" 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-700" 
              sizes="(max-width: 1024px) 100vw, 50vw" 
            />
          ) : (
            <div className="h-full w-full bg-gray-200 shimmer" />
          )}
          {/* Overlay gradient au hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content - Animation slide-in-right */}
        <div className="animate-slide-in-right animation-delay-200">
          <div className="text-orange-500 text-xs tracking-[0.2em] font-semibold uppercase mb-3">
            Experiences
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight">
            {home?.experience?.title || 'We Provide You The Best Experience'}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
            {home?.experience?.subtitle || "You don't have to worry about the result because all of these interiors are made by people who are professionals in their fields with an elegant and luxurious style and with premium quality materials."}
          </p>
          <Link 
            href="/about" 
            className="inline-flex items-center gap-2 text-orange-500 font-semibold text-sm sm:text-base hover:text-orange-600 transition-all hover:gap-3 group"
          >
            More Info 
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* MATERIALS SECTION */}
      <div className="grid gap-8 md:gap-12 lg:grid-cols-2 items-center">
        {/* Content - Animation slide-in-left (ordre inversé sur desktop) */}
        <div className="order-2 lg:order-1 animate-slide-in-left animation-delay-200">
          <div className="text-orange-500 text-xs tracking-[0.2em] font-semibold uppercase mb-3">
            Materials
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight">
            {home?.materials?.title || 'Very Serious Materials For Making Furniture'}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
            {home?.materials?.subtitle || "Because panto was very serious about designing furniture for our environment, using a very expensive and famous capital but at a relatively low price."}
          </p>
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 text-orange-500 font-semibold text-sm sm:text-base hover:text-orange-600 transition-all hover:gap-3 group"
          >
            More Info 
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Grid images - Animation stagger */}
        <div className="order-1 lg:order-2 grid grid-cols-2 gap-4 md:gap-6 animate-slide-in-right">
          {tiles.map((src, i) => (
            <div 
              key={i} 
              className={`relative h-[140px] sm:h-[180px] md:h-[200px] rounded-xl md:rounded-2xl overflow-hidden group hover-lift ${
                i % 2 === 0 ? '' : 'mt-4 md:mt-8'
              }`}
              style={{ 
                animationDelay: `${i * 0.1}s`,
                opacity: 0,
                animation: 'fade-in 0.6s ease-out forwards'
              }}
            >
              {src ? (
                <>
                  <Image 
                    src={src} 
                    alt={`Material ${i + 1}`} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500" 
                    sizes="(max-width: 768px) 50vw, 25vw" 
                  />
                  {/* Overlay gradient au hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </>
              ) : (
                <div className="h-full w-full bg-gray-200 shimmer" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
