// src/app/(frontend)/components/ExperienceAndMaterials.tsx
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
    <section className="mx-auto max-w-6xl px-6 py-16 space-y-20">
      {/* EXPERIENCE */}
      <div className="grid gap-10 md:grid-cols-2 items-center">
        <div className="relative h-[260px] md:h-[360px] rounded-[24px] overflow-hidden">
          {expImg ? (
            <Image src={expImg} alt="Experience" fill className="object-cover" sizes="50vw" />
          ) : (
            <div className="h-full w-full bg-gray-200" />
          )}
        </div>

        <div>
          <div className="text-orange-500 text-xs tracking-widest font-semibold uppercase">
            Experiences
          </div>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold">
            {home?.experience?.title}
          </h2>
          <p className="mt-4 text-gray-600">
            {home?.experience?.subtitle}
          </p>
          <Link href="/about" className="mt-6 inline-flex items-center gap-2 text-orange-500">
            More Info <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      {/* MATERIALS */}
      <div className="grid gap-10 md:grid-cols-2 items-center">
        <div>
          <div className="text-orange-500 text-xs tracking-widest font-semibold uppercase">
            Materials
          </div>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold">
            {home?.materials?.title}
          </h2>
          <p className="mt-4 text-gray-600">
            {home?.materials?.subtitle}
          </p>
          <Link href="/shop" className="mt-6 inline-flex items-center gap-2 text-orange-500">
            More Info <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {tiles.map((src, i) => (
            <div key={i} className="relative h-[160px] rounded-[20px] overflow-hidden">
              {src ? (
                <Image src={src} alt={`Material ${i + 1}`} fill className="object-cover" sizes="25vw" />
              ) : (
                <div className="h-full w-full bg-gray-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
