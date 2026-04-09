import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '../components/landing/ProductCard.jsx'
import { products } from '../utils/siteData.js'

function Products() {
  const [active, setActive] = useState(products[0].id)
  const activeProduct = products.find((p) => p.id === active) || products[0]
  const tone = useMemo(() => {
    if (active ===1) return 'from-sky-100 via-white to-amber-50'
    if (active === 2) return 'from-fuchsia-100 via-white to-indigo-50'
    return 'from-emerald-100 via-white to-cyan-50'
  }, [active])

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

          <motion.div
            key={activeProduct.id}
            initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.75, ease: 'easeInOut' }}
            className="rounded-[1.8rem] border border-slate-200 bg-white/80 p-6 shadow-[0_18px_40px_rgba(148,163,184,0.18)]"
          >
            <img
              src={activeProduct.image}
              alt={activeProduct.name}
              className="mx-auto h-64 w-auto object-contain sm:h-80"
            />
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">{activeProduct.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{activeProduct.description}</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">INR {activeProduct.price}</p>
          </motion.div>
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
