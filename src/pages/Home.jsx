import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/landing/Hero.jsx'
import Features from '../components/landing/Features.jsx'
import ProductCard from '../components/landing/ProductCard.jsx'
import CTA from '../components/landing/CTA.jsx'
import { useAppContext } from '../context/hooks/useAppContext.js'
import { homeFeatures, products } from '../utils/siteData.js'

const journey = [
  { title: 'Sourcing', text: 'Pure Sea Salt Selection.We begin with high-quality sea salt, carefully chosen for its natural mineral composition.' },
  { title: 'Processing', text: 'Bamboo Roasting Ritual. Salt is sealed in bamboo and roasted multiple times at extreme temperatures, following traditional methods.' },
  { title: 'Quality Check', text: 'Purification & Enrichment. Each cycle removes impurities and enhances mineral richness, resulting in a cleaner, deeper taste.' },
  { title: 'Delivery', text: 'Sealed Freshness. Packed with care to preserve purity, ensuring every grain reaches you in its finest form.' },
]

function Home() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [featuredAdded, setFeaturedAdded] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragArmed, setDragArmed] = useState(false)
  const dragStartXRef = useRef(0)
  const dragDeltaXRef = useRef(0)
  const pointerIdRef = useRef(null)
  const animationLockRef = useRef(false)
  const animationUnlockTimerRef = useRef(null)
  const wheelSessionRef = useRef({
    accumulatedX: 0,
    triggered: false,
    lastEventAt: 0,
  })
  const touchStartXRef = useRef(0)
  const touchDeltaXRef = useRef(0)
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

  const ANIMATION_LOCK_MS = 480
  const DRAG_THRESHOLD_PX = 56
  const TOUCH_THRESHOLD_PX = 56
  const WHEEL_STEP_THRESHOLD = 42
  const WHEEL_IDLE_RESET_MS = 180

  useEffect(() => () => {
    if (animationUnlockTimerRef.current) {
      window.clearTimeout(animationUnlockTimerRef.current)
    }
  }, [])

  const goToIndex = (nextIndex) => {
    const bounded = Math.max(0, Math.min(products.length - 1, nextIndex))
    setActiveIndex(bounded)
  }

  const triggerStep = (direction) => {
    if (animationLockRef.current) return false
    animationLockRef.current = true
    if (animationUnlockTimerRef.current) {
      window.clearTimeout(animationUnlockTimerRef.current)
    }
    animationUnlockTimerRef.current = window.setTimeout(() => {
      animationLockRef.current = false
    }, ANIMATION_LOCK_MS)

    setActiveIndex((prev) => {
      const next = direction > 0 ? prev + 1 : prev - 1
      return Math.max(0, Math.min(products.length - 1, next))
    })
    return true
  }

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

  const isInteractiveTarget = (target) =>
    Boolean(target?.closest('button, a, input, select, textarea, label, [role="button"]'))

  const onPointerDown = (event) => {
    if (event.pointerType === 'touch') return
    if (isInteractiveTarget(event.target)) {
      setDragArmed(false)
      setIsDragging(false)
      return
    }
    setDragArmed(true)
    setIsDragging(false)
    pointerIdRef.current = event.pointerId
    dragStartXRef.current = event.clientX
    dragDeltaXRef.current = 0
  }

  const onPointerMove = (event) => {
    if (event.pointerType === 'touch') return
    if (!dragArmed || pointerIdRef.current !== event.pointerId) return
    dragDeltaXRef.current = event.clientX - dragStartXRef.current
    if (!isDragging && Math.abs(dragDeltaXRef.current) > 6) {
      setIsDragging(true)
      event.currentTarget.setPointerCapture(event.pointerId)
    }
  }

  const onPointerUp = (event) => {
    if (event.pointerType === 'touch') return
    if (!dragArmed || pointerIdRef.current !== event.pointerId) return
    setDragArmed(false)
    pointerIdRef.current = null
    if (!isDragging) return
    setIsDragging(false)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    if (dragDeltaXRef.current <= -DRAG_THRESHOLD_PX) triggerStep(1)
    else if (dragDeltaXRef.current >= DRAG_THRESHOLD_PX) triggerStep(-1)
    dragDeltaXRef.current = 0
  }

  const onTouchStart = (event) => {
    if (event.touches.length === 1) {
      touchStartXRef.current = event.touches[0].clientX
      touchDeltaXRef.current = 0
    }
  }

  const onTouchMove = (event) => {
    if (event.touches.length === 1) {
      touchDeltaXRef.current = event.touches[0].clientX - touchStartXRef.current
    }
  }

  const onTouchEnd = () => {
    if (touchDeltaXRef.current <= -TOUCH_THRESHOLD_PX) triggerStep(1)
    else if (touchDeltaXRef.current >= TOUCH_THRESHOLD_PX) triggerStep(-1)
    touchDeltaXRef.current = 0
  }

  const onWheel = (event) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return
    const now = Date.now()

    if (now - wheelSessionRef.current.lastEventAt > WHEEL_IDLE_RESET_MS) {
      wheelSessionRef.current.accumulatedX = 0
      wheelSessionRef.current.triggered = false
    }

    wheelSessionRef.current.lastEventAt = now

    if (wheelSessionRef.current.triggered) {
      event.preventDefault()
      return
    }

    wheelSessionRef.current.accumulatedX += event.deltaX
    if (Math.abs(wheelSessionRef.current.accumulatedX) < WHEEL_STEP_THRESHOLD) return

    const direction = wheelSessionRef.current.accumulatedX > 0 ? 1 : -1
    const didSlide = triggerStep(direction)

    if (didSlide) {
      wheelSessionRef.current.triggered = true
      wheelSessionRef.current.accumulatedX = 0
      event.preventDefault()
    }
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
              Signature Collection
            </p>
            <h2 className="section-headline text-slate-900">
              Ancient Craft
              <br />
              Modern Purity
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Experience the rare art of bamboo salt - slow-roasted multiple times in bamboo at high temperatures, creating a mineral-rich, deeply balanced salt unlike anything else.
            </p>
            <div className="flex items-center gap-2">
              {products.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => goToIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    activeIndex === index
                      ? 'w-10 bg-slate-900'
                      : 'w-2.5 bg-slate-400 hover:bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>

          <div
            className={`overflow-hidden rounded-[2rem] border border-slate-200 bg-white/80 shadow-[0_20px_45px_rgba(148,163,184,0.22)] backdrop-blur-md ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onWheel={onWheel}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <motion.div
              className="flex"
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
            >
              {products.map((item, index) => (
                <div key={item.id} className="w-full shrink-0 p-6">
                  <motion.img
                    src={item.image}
                    alt={item.name}
                    className="mx-auto h-64 w-auto object-contain sm:h-80"
                    animate={activeIndex === index ? { y: [0, -8, 0], rotate: [0, -1.1, 0, 1.1, 0] } : { y: 0, rotate: 0 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <h3 className="mt-6 text-2xl font-semibold text-slate-900">{item.name}</h3>
                  <p className="mt-3 text-sm text-slate-600">{item.description}</p>
                  <p className="mt-4 text-3xl font-bold text-slate-900">INR {item.price}</p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={onAddToCart}
                      className={`rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:shadow-md ${
                        featuredAdded && index === activeIndex
                          ? 'scale-[1.03] border-emerald-300 bg-emerald-50 text-emerald-700'
                          : ''
                      }`}
                    >
                      {featuredAdded && index === activeIndex ? 'Added ✓' : 'Add to Cart'}
                    </button>
                    <button
                      onClick={onOrderNow}
                      className="rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(56,189,248,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(56,189,248,0.32)]"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
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
            Rooted in Tradition.
          </h3>
          <p className="text-base leading-relaxed text-slate-600">
            Saltify brings the ancient Korean art of bamboo salt to modern kitchens. Each batch is roasted multiple times in bamboo barrels, enhancing its purity, removing impurities, and enriching it with natural minerals while developing its naturally alkaline character. 
            This is not just salt — it is a ritual of refinement.
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
            The Making of Bamboo Salt
          </p>
          <h3 className="section-headline text-slate-900">
            A journey of fire, time, and transformation.
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
