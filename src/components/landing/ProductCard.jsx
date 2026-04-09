import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppContext } from '../../context/hooks/useAppContext.js'

function ProductCard({ product }) {
  const navigate = useNavigate()
  const { user, addToCart } = useAppContext()
  const [qty, setQty] = useState(1)
  const [addedPulse, setAddedPulse] = useState(false)

  const onAddToCart = () => {
    if (!user) {
      navigate('/login')
      return
    }
    addToCart(product, qty)
    setAddedPulse(true)
    window.setTimeout(() => setAddedPulse(false), 1000)
  }

  const onOrderNow = () => {
    if (!user) {
      navigate('/login')
      return
    }
    addToCart(product, 1)
    navigate('/checkout')
  }

  return (
    <motion.article
      whileHover={{ y: -10, rotateX: -6, rotateY: 8 }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      style={{ transformStyle: 'preserve-3d' }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5 shadow-[0_20px_38px_rgba(148,163,184,0.2)]"
    >
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-sky-100/90 via-white to-amber-100/85 opacity-90" />
      <div className="relative rounded-[1.25rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),rgba(248,250,252,0.75))] p-4">
        <motion.img
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.25 }}
          src={product.image}
          alt={product.name}
          className="mx-auto h-52 w-auto object-contain drop-shadow-[0_16px_24px_rgba(148,163,184,0.28)]"
        />
      </div>

      <div className="relative mt-5 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-slate-900">{product.name}</h3>
          <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700">
            6x roast
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {product.description}
        </p>
        <p className="mt-4 text-2xl font-bold text-slate-900">INR {product.price}</p>

        <div className="mt-4">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Quantity
          </label>
          <select
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none ring-sky-300 transition focus:ring"
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative mt-5 grid grid-cols-2 gap-2">
        <button
          onClick={onAddToCart}
          className={`rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:shadow-md ${
            addedPulse ? 'scale-[1.03] border-emerald-300 bg-emerald-50 text-emerald-700' : ''
          }`}
        >
          {addedPulse ? 'Added ✓' : 'Add to Cart'}
        </button>
        <button
          onClick={onOrderNow}
          className="rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-3 text-sm font-semibold text-white shadow-[0_0_22px_rgba(56,189,248,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(56,189,248,0.28)]"
        >
          Order Now
        </button>
      </div>
    </motion.article>
  )
}

export default ProductCard
