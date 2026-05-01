import { motion } from 'framer-motion'

const icons = [
  (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
      <path d="M4 12h16" />
      <path d="M12 4v16" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
      <path d="M5 12c2-5 12-5 14 0-2 5-12 5-14 0Z" />
      <circle cx="12" cy="12" r="2.2" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
      <path d="M12 3 4 7v5c0 5 4 8 8 9 4-1 8-4 8-9V7l-8-4Z" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
      <path d="M6 18 18 6" />
      <path d="M8 6h10v10" />
    </svg>
  ),
]

function Features({ items }) {
  return (
    <section className="space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          Interactive Features
        </p>
        <h2 className="font-display mt-3 text-3xl text-slate-900 sm:text-4xl">
          Why Choose Saltify
        </h2>
        <p className="mt-3 text-sm text-slate-600 sm:text-base">
          A more cinematic and product-minded way to tell the Saltify story.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            whileHover={{ y: -10, rotateX: -6, rotateY: 8 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-[0_18px_36px_rgba(148,163,184,0.18)]"
          >
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-sky-200/65 via-white to-amber-100/65 opacity-70 transition duration-300 group-hover:opacity-100" />
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3 + index, repeat: Infinity, ease: 'easeInOut' }}
              className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 shadow-lg"
            >
              {icons[index % icons.length]}
            </motion.div>
            <h3 className="relative mt-5 text-lg font-semibold text-slate-900 transition group-hover:text-sky-700">
              {item.title}
            </h3>
            <p className="relative mt-3 text-sm leading-relaxed text-slate-600">
              {item.text}
            </p>
            {/* <div className="relative mt-6 overflow-hidden rounded-xl bg-slate-100 px-3 py-2 text-xs uppercase tracking-[0.22em] text-slate-600">
              Hover to expand the story
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'linear' }}
              />
            </div> */}
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export default Features
