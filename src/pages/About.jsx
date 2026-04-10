import { motion } from 'framer-motion'

const sections = [
  {
    title: 'Our Vision',
    text: 'At Saltify, we envision a world where purity is not a privilege, but a universal standard. In a time where quality is often compromised for scale, we stand committed to redefining what true excellence means. Our vision is to make the finest bamboo salt accessible across the globe — reaching every corner with the same level of authenticity, care, and consistency. We believe that something as essential as salt should inspire trust, embody craftsmanship, and deliver uncompromised value in every grain.',
    tone: 'from-sky-100 via-white to-slate-50',
  },
  {
    title: 'Our Craft',
    text: 'Quality is all that matters — and at Saltify, it defines everything we do. Our bamboo salt is created through a meticulous, time-honored process that respects both tradition and precision. Each stage is carefully controlled to preserve purity, enhance mineral richness, and achieve a level of refinement that sets our product apart. We do not believe in shortcuts or mass compromise; instead, we focus on perfecting every detail. The result is not just a product, but a standard of excellence that reflects dedication, discipline, and an uncompromising commitment to quality.',
    tone: 'from-amber-100 via-white to-slate-50',
  },
  {
    title: 'Our Impact',
    text: 'Our impact extends far beyond the product itself. At Saltify, we are deeply rooted in nature and guided by a responsibility to preserve it. By embracing natural processes and sustainable practices, we ensure that our production remains in harmony with the environment. We aim to contribute to a healthier lifestyle by offering a product that is pure, authentic, and thoughtfully crafted. Every step we take is aligned with a larger purpose — to create value not only for our customers, but also for the world we share, maintaining a balance between innovation, tradition, and respect for nature.',
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
              {/* <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                About Saltify 0{index + 1}
              </p> */}
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
