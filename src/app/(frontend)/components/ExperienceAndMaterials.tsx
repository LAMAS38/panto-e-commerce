import Image from 'next/image'

export function ExperienceAndMaterials() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16">
      {/* Experience */}
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-3xl">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
            alt="Experience"
            width={900}
            height={650}
            className="h-[320px] w-full object-cover md:h-[420px]"
           />
        </div>

        <div>
          <p className="text-xs font-semibold tracking-widest text-orange-500">EXPERIENCES</p>
          <h3 className="mt-3 text-3xl font-semibold leading-tight">
            We Provide You The <br /> Best Experience
          </h3>
          <p className="mt-4 text-sm leading-6 text-zinc-500">
            You don’t have to worry about the result because all of these interiors are made by people who are professionals in their fields with an elegant and luxurious style and with premium quality materials.
          </p>
          <button className="mt-5 text-sm font-medium text-orange-500 hover:opacity-80">
            More Info →
          </button>
        </div>
      </div>

      {/* Materials */}
      <div className="mt-16 grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold tracking-widest text-orange-500">MATERIALS</p>
          <h3 className="mt-3 text-3xl font-semibold leading-tight">
            Very Serious <br /> Materials For Making <br /> Furniture
          </h3>
          <p className="mt-4 text-sm leading-6 text-zinc-500">
            Because panto was very serious about designing furniture for our environment, using a very expensive and famous capital but at a relatively low price.
          </p>
          <button className="mt-5 text-sm font-medium text-orange-500 hover:opacity-80">
            More Info →
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop"
                alt="Material 1"
                width={500}
                height={500}
                className="h-44 w-full object-cover"
                />

            </div>
            <div className="overflow-hidden rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop"
                alt="Material 2"
                width={500}
                height={500}
                className="h-52 w-full object-cover"
                />
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl">
            <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop"
                alt="Material 3"
                width={600}
                height={900}
                className="h-full w-full object-cover"
                />

          </div>
        </div>
      </div>
    </section>
  )
}
