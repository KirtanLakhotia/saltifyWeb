import { reviews } from '../utils/siteData.js'

function Reviews() {
  return (
    <section className="space-y-7">
      <div>
        <h1 className="font-display text-4xl text-stone-900">Customer Reviews</h1>
        <p className="mt-2 max-w-3xl text-stone-600">
          Social proof styled like modern D2C brands to build trust and increase
          conversion.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {reviews.map((review, index) => (
          <article
            key={`${review.author}-${index}`}
            className="rounded-2xl border border-amber-100 bg-white p-6 shadow-md shadow-amber-100/50"
          >
            <p className="text-sm italic leading-relaxed text-stone-700">
              "{review.text}"
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-amber-800">
              {review.author}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Reviews
