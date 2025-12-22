// src/app/(frontend)/components/Hero.tsx
import Image from 'next/image'
import { SearchBar } from './SearchBar'
function getMediaUrl(m: any) {
  // m peut être: id, ou objet Media résolu
  if (!m) return ''
  if (typeof m === 'string' || typeof m === 'number') return ''
  return m.url || ''
}

export function Hero({ home }: { home: any }) {
  const bg = getMediaUrl(home?.hero?.background)

  return (
    <section className="relative w-full overflow-hidden rounded-[24px]">
      {/* Background image */}
      {bg ? (
        <div className="absolute inset-0">
          <Image
            src={bg}
            alt="Hero background"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gray-200" />
      )}

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-6 py-28 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
          {home?.hero?.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/90">
          {home?.hero?.subtitle}
        </p>

        {/* Si tu as une search bar ici, garde-la; sinon laisse clean */}
        <SearchBar />
      </div>
    </section>
  )
}
