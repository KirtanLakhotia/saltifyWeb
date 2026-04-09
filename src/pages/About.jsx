import { motion } from 'framer-motion'

const sections = [
  {
    title: 'Our Vision',
    text: 'We imagine a future where every essential material is trusted by design and consistent by engineering.',
    tone: 'from-sky-100 via-white to-slate-50',
  },
  {
    title: 'Our Craft',
    text: 'We build with precision and deliver with reliability. Our focus is not just products, but performance that drives industries forward.',
    tone: 'from-amber-100 via-white to-slate-50',
  },
  {
    title: 'Our Impact',
    text: 'By raising quality standards and improving consistency, we help teams operate with confidence at every stage.',
    tone: 'from-emerald-100 via-white to-slate-50',
  },
]

function About() {
  return (
    <div className="space-y-8">
      {sections.map((section, index) => (
        <section
          key={section.title}
          className="relative flex min-h-screen items-center overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_45px_rgba(148,163,184,0.18)] sm:p-10"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${section.tone}`} />
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: index * 0.04 }}
            className="relative max-w-4xl space-y-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              About Saltify 0{index + 1}
            </p>
            <h1 className="section-headline text-slate-900">{section.title}</h1>
            <p className="max-w-3xl text-base leading-relaxed text-slate-600 sm:text-xl">
              {section.text}
            </p>
          </motion.div>
        </section>
      ))}
    </div>
  )
}

export default About
