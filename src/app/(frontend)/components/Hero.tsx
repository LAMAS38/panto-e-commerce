// Updated Hero component with responsive animation and accessibility
import Image from 'next/image'
import { SearchBar } from './SearchBar'

/**
 * Helper to extract the URL from a media object or return empty string.
 * Supports number or string IDs (which resolve to no URL in this context).
 */
function getMediaUrl(m: any) {
  if (!m) return ''
  if (typeof m === 'string' || typeof m === 'number') return ''
  return m.url || ''
}

/**
 * Hero section of the home page.
 * Receives the CMS home data and renders a background image,
 * heading and subtitle. Animations are purely CSS via Tailwind.
 */
export function Hero({ home }: { home: any }) {
  const bg = getMediaUrl(home?.hero?.background)

  return (
    <section className="relative w-full overflow-hidden rounded-[24px]">
      {/* Background image */}
      {bg ? (
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={bg}
            alt="Hero background"
            fill
            priority
            sizes="100vw"
            className="object-cover transition-transform duration-[4s] ease-in-out hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 hover:bg-black/40" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gray-200" />
      )}

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-32 text-center text-white motion-safe:animate-fade-down">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold">
          {home?.hero?.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/90">
          {home?.hero?.subtitle}
        </p>

        <SearchBar />
      </div>
    </section>
  )
}
