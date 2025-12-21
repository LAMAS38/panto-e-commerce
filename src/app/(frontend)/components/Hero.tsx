import { SearchBar } from './SearchBar'

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

        {/* Search - Sans variant */}
        <SearchBar />
      </div>
    </section>
  )
}
