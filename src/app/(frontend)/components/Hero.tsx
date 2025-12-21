import { SearchBar } from './SearchBar'

export function Hero() {
  return (
    <section className="relative h-[500px] w-full overflow-hidden rounded-b-[20px] md:h-[700px] lg:h-[860px] md:rounded-b-[40px]">
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
      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="max-w-4xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          Make Your Interior More <br className="hidden md:block" />
          Minimalistic &amp; Modern
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-6 text-white/80 md:mt-6 md:text-base">
          Turn your room with panto into a lot more minimalist and modern with ease and speed
        </p>

        {/* Search */}
        <SearchBar />
      </div>
    </section>
  )
}
