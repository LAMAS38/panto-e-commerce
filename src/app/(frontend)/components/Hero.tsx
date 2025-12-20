import { Search } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative h-[780px] w-full overflow-hidden rounded-b-[40px] md:h-[860px]">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=2000&auto=format&fit=crop')",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/10" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col items-center px-4 pt-36 text-center text-white md:pt-40">
        <h1 className="max-w-4xl text-4xl font-semibold leading-[1.15] tracking-tight md:text-6xl md:leading-[1.1]">
          Make Your Interior More <br className="hidden md:block" />
          Minimalistic &amp; Modern
        </h1>

        <p className="mt-6 max-w-xl text-sm leading-6 text-white/80 md:text-base">
          Turn your room with panto into a lot more minimalist and modern with ease and speed
        </p>

        {/* Search */}
        <div className="mt-10 flex w-full max-w-lg items-center gap-2 rounded-full bg-white/20 p-2 backdrop-blur">
          <input
            placeholder="Search furniture"
            className="w-full bg-transparent px-4 py-3 text-sm outline-none placeholder:text-white/70"
          />
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 hover:opacity-90"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>

  )
}
