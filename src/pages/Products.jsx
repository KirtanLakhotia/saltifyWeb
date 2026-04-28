import { useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '../components/landing/ProductCard.jsx'
import { products } from '../utils/siteData.js'

function Products() {
  const [active, setActive] = useState(products[0].id)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartXRef = useRef(0)
  const dragDeltaXRef = useRef(0)

  const activeIndex = products.findIndex((p) => p.id === active)

  const tone = useMemo(() => {
    if (active === 1) return 'from-sky-100 via-white to-amber-50'
    if (active === 2) return 'from-fuchsia-100 via-white to-indigo-50'
    return 'from-emerald-100 via-white to-cyan-50'
  }, [active])

  const goToIndex = (nextIndex) => {
    const bounded = Math.max(0, Math.min(products.length - 1, nextIndex))
    setActive(products[bounded].id)
  }

  const onPointerDown = (event) => {
    setIsDragging(true)
    dragStartXRef.current = event.clientX
    dragDeltaXRef.current = 0
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event) => {
    if (!isDragging) return
    dragDeltaXRef.current = event.clientX - dragStartXRef.current
  }

  const onPointerUp = (event) => {
    if (!isDragging) return
    setIsDragging(false)
    event.currentTarget.releasePointerCapture(event.pointerId)
    const threshold = 50
    if (dragDeltaXRef.current <= -threshold) goToIndex(activeIndex + 1)
    if (dragDeltaXRef.current >= threshold) goToIndex(activeIndex - 1)
    dragDeltaXRef.current = 0
  }

  const onWheel = (event) => {
    const horizontal = event.deltaX
    if (Math.abs(horizontal) < 18) return
    if (Math.abs(horizontal) <= Math.abs(event.deltaY)) return
    if (horizontal > 0) goToIndex(activeIndex + 1)
    else goToIndex(activeIndex - 1)
  }

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_45px_rgba(148,163,184,0.2)] sm:p-10">
        <div className={`absolute inset-0 bg-gradient-to-br ${tone}`} />
        <div className="relative grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Product Focus
            </p>
            <h1 className="section-headline text-slate-900">
              Premium quality.
              <br />
              Visual clarity.
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Choose a variant to shift the environment and spotlight one pack at a time.
            </p>
            <div className="flex flex-wrap gap-2">
              {products.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                    active === item.id
                      ? 'bg-slate-900 text-white'
                      : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.name.match(/\((.*?)\)/)?.[1] ?? item.name}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white/80 shadow-[0_18px_40px_rgba(148,163,184,0.18)] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onWheel={onWheel}
          >
            <motion.div
              className="flex"
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
            >
              {products.map((item) => (
                <div key={item.id} className="w-full shrink-0 p-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="mx-auto h-64 w-auto object-contain sm:h-80"
                  />
                  <h2 className="mt-4 text-2xl font-semibold text-slate-900">{item.name}</h2>
                  <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                  <p className="mt-3 text-3xl font-bold text-slate-900">INR {item.price}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="section-headline text-slate-900">All product variants</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Products

