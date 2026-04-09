import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/landing/Hero.jsx'
import Features from '../components/landing/Features.jsx'
import ProductCard from '../components/landing/ProductCard.jsx'
import CTA from '../components/landing/CTA.jsx'
import { useAppContext } from '../context/hooks/useAppContext.js'
import { homeFeatures, products } from '../utils/siteData.js'

const journey = [
  { title: 'Sourcing', text: 'Carefully selected inputs from trusted origins.' },
  { title: 'Processing', text: 'Refined with precision-focused methods.' },
  { title: 'Quality Check', text: 'Every batch verified for consistency.' },
  { title: 'Delivery', text: 'Reliable fulfillment with premium handling.' },
]

function Home() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [featuredAdded, setFeaturedAdded] = useState(false)
  const navigate = useNavigate()
  const { user, addToCart } = useAppContext()
  const activeProduct = products[activeIndex]

  const themes = useMemo(
    () => [
      'from-sky-100 via-white to-amber-50',
      'from-fuchsia-100 via-white to-indigo-50',
      'from-emerald-100 via-white to-cyan-50',
    ],
    [],
  )

  const onOrderNow = () => {
    if (!user) {
      navigate('/login')
      return
    }
    addToCart(activeProduct, 1)
    navigate('/checkout')
  }

  const onAddToCart = () => {
    if (!user) {
      navigate('/login')
      return
    }
    addToCart(activeProduct, 1)
    setFeaturedAdded(true)
    window.setTimeout(() => setFeaturedAdded(false), 700)
  }

  return (
    <div className="space-y-20 lg:space-y-28">
      <Hero />

      <section className="relative min-h-screen overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_25px_60px_rgba(148,163,184,0.2)] sm:p-10">
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${themes[activeIndex]} transition-all duration-700`}
        />
        <div className="relative z-10 grid min-h-[76vh] items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Featured Product
            </p>
            <h2 className="section-headline text-slate-900">
              Designed to lead.
              <br />
              Built to perform.
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Start with a focused product reveal before exploring the full range.
              This creates a premium launch rhythm instead of a generic catalog scroll.
            </p>
            <div className="flex items-center gap-2">
              {products.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    activeIndex === index
                      ? 'w-10 bg-slate-900'
                      : 'w-2.5 bg-slate-400 hover:bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>

          <motion.div
            key={activeProduct.id}
            initial={{ opacity: 0, scale: 0.93, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, ease: 'easeInOut' }}
            className="rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-[0_20px_45px_rgba(148,163,184,0.22)] backdrop-blur-md"
          >
            <motion.img
              src={activeProduct.image}
              alt={activeProduct.name}
              className="mx-auto h-64 w-auto object-contain sm:h-80"
              animate={{ y: [0, -8, 0], rotate: [0, -1.1, 0, 1.1, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <h3 className="mt-6 text-2xl font-semibold text-slate-900">
              {activeProduct.name}
            </h3>
            <p className="mt-3 text-sm text-slate-600">{activeProduct.description}</p>
            <p className="mt-4 text-3xl font-bold text-slate-900">
              INR {activeProduct.price}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={onAddToCart}
                className={`rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:shadow-md ${
                  featuredAdded
                    ? 'scale-[1.03] border-emerald-300 bg-emerald-50 text-emerald-700'
                    : ''
                }`}
              >
                {featuredAdded ? 'Added ✓' : 'Add to Cart'}
              </button>
              <button
                onClick={onOrderNow}
                className="rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(56,189,248,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(56,189,248,0.32)]"
              >
                Order Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>

        {/* <section className="space-y-8">
          <div className="flex items-end justify-between gap-4">
            <h2 className="section-headline text-slate-900">Explore all variants</h2>
            <Link to="/products" className="text-sm font-semibold text-sky-700">
              Open products
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section> */}

      <Features items={homeFeatures} />

      <section className="grid items-center gap-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_45px_rgba(148,163,184,0.18)] sm:p-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            About
          </p>
          <h3 className="section-headline text-slate-900">
            Built on precision.
            <br />
            Driven by innovation.
          </h3>
          <p className="text-base leading-relaxed text-slate-600">
            We build with precision and deliver with reliability. Our focus is
            not just products, but performance that drives industries forward.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-[1.8rem] bg-gradient-to-tr from-sky-200/50 to-amber-100/60 blur-2xl" />
          <motion.img
            src="/images/Saltify 2 cropped.png"
            alt="Saltify visual"
            className="relative mx-auto w-full max-w-md rounded-[1.5rem] border border-slate-200 bg-white p-3 shadow-lg"
            whileHover={{ scale: 1.03 }}
          />
        </motion.div>
      </section>

      <section className="space-y-8">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Process Journey
          </p>
          <h3 className="section-headline text-slate-900">
            From source to delivery.
          </h3>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {journey.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="rounded-[1.4rem] border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5 shadow-[0_12px_30px_rgba(148,163,184,0.16)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                Step {index + 1}
              </p>
              <h4 className="mt-2 text-lg font-semibold text-slate-900">
                {step.title}
              </h4>
              <p className="mt-2 text-sm text-slate-600">{step.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <CTA />
    </div>
  )
}

export default Home
