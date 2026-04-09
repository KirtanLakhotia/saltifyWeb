import { benefits } from '../utils/siteData.js'

function Benefits() {
  return (
    <section className="space-y-7">
      <div>
        <h1 className="font-display text-4xl text-stone-900">Health Benefits</h1>
        <p className="mt-2 max-w-3xl text-stone-600">
          The same value proposition from your current website, now presented in
          a modern premium grid for better readability and trust.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {benefits.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-amber-100 bg-white p-6 shadow-md shadow-amber-100/50"
          >
            <h3 className="text-lg font-semibold text-stone-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              {item.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Benefits
