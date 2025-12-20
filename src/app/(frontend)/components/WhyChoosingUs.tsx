export function WhyChoosingUs() {
  const items = [
    {
      title: 'Luxury facilities',
      desc: 'The advantage of hiring a workspace with us is that gives you comfortable service and all-around facilities.',
    },
    {
      title: 'Affordable Price',
      desc: 'You can get a workspace of the highest quality at an affordable price and still enjoy the facilities that are only here.',
    },
    {
      title: 'Many Choices',
      desc: 'We provide many unique work space choices so that you can choose the workspace to your liking.',
    },
  ]

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16">
      <div className="grid gap-10 md:grid-cols-4 md:items-start">
        <h2 className="text-3xl font-semibold leading-tight">
          Why <br /> Choosing Us
        </h2>

        <div className="md:col-span-3">
          <div className="grid gap-8 md:grid-cols-3">
            {items.map((it) => (
              <div key={it.title}>
                <h3 className="text-base font-semibold">{it.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-500">{it.desc}</p>
                <button className="mt-4 text-sm font-medium text-orange-500 hover:opacity-80">
                  More info →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
