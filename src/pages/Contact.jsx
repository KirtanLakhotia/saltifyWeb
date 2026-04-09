function Contact() {
  return (
    <section className="space-y-7">
      <div>
        <h1 className="font-display text-4xl text-stone-900">Contact</h1>
        <p className="mt-2 max-w-3xl text-stone-600">
          A cleaner contact experience with direct actions for WhatsApp, email,
          and marketplace purchase intent.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-amber-100 bg-white p-6 shadow-md shadow-amber-100/60">
          <h2 className="text-lg font-semibold text-stone-900">Business Query</h2>
          <p className="mt-3 text-sm text-stone-600">hello@saltify.in</p>
          <a
            className="mt-4 inline-flex rounded-lg bg-stone-900 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700"
            href="mailto:hello@saltify.in"
          >
            Send Email
          </a>
        </article>

        <article className="rounded-2xl border border-amber-100 bg-white p-6 shadow-md shadow-amber-100/60">
          <h2 className="text-lg font-semibold text-stone-900">Quick Connect</h2>
          <p className="mt-3 text-sm text-stone-600">
            Chat instantly for product help and partnership support.
          </p>
          <a
            className="mt-4 inline-flex rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
            href="https://wa.me/919926902062?text=Hi%20there!"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </article>
      </div>
    </section>
  )
}

export default Contact
