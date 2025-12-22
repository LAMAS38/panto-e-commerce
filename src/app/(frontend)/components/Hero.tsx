import { SearchBar } from './SearchBar'

export function Hero() {
  return (
    <section className="relative h-[500px] w-full overflow-hidden rounded-b-[20px] md:h-[700px] lg:h-[860px] md:rounded-b-[40px]">
      {/* Background avec effet hover */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=2000&auto=format&fit=crop')",
        }}
      />

      {/* Dark overlay avec animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/10 animate-fade-in" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center px-4 sm:px-6 text-center text-white">
        {/* Titre responsive avec animation */}
        <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl animate-slide-up">
          Make Your Interior More <br className="hidden md:block" />
          Minimalistic &amp; Modern
        </h1>

        {/* Description responsive */}
        <p className="mt-4 max-w-xl text-sm leading-6 text-white/90 sm:text-base md:mt-6 lg:text-lg animate-slide-up animation-delay-200 px-4 sm:px-0">
          Turn your room with panto into a lot more minimalist and modern with ease and speed
        </p>

        {/* Search avec animation */}
        <div className="w-full animate-slide-up animation-delay-400">
          <SearchBar />
        </div>
      </div>

      {/* Badge scroll hint (mobile uniquement) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden animate-bounce">
        <div className="flex flex-col items-center gap-1 text-white/60">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span className="text-xs font-medium">Scroll</span>
        </div>
      </div>
    </section>
  )
}
