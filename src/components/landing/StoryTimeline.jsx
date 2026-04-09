import { motion } from 'framer-motion'

function StoryTimeline({ items }) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,#2f1a0e,transparent_45%),linear-gradient(180deg,#140f0b_0%,#0e0c11_100%)] px-6 py-10 text-white shadow-2xl sm:px-10">
      <div className="absolute inset-y-0 left-7 w-px bg-gradient-to-b from-amber-400/80 via-amber-200/40 to-transparent sm:left-12" />
      <div className="relative space-y-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
            Brand Story
          </p>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl">
            From a basic ingredient to a more intentional ritual.
          </h2>
        </div>

        <div className="space-y-6">
          {items.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative pl-10 sm:pl-16"
            >
              <span className="absolute left-[18px] top-1 h-4 w-4 rounded-full border border-amber-200/80 bg-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.55)] sm:left-[41px]" />
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
                  {item.year}
                </p>
                <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-200">
                  {item.text}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StoryTimeline
