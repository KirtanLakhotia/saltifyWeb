import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/hooks/useAppContext.js'

function FloatingCartBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { cart, cartCount } = useAppContext()
  const [pulse, setPulse] = useState(false)
  const prevCountRef = useRef(cartCount)

  useEffect(() => {
    if (cartCount > prevCountRef.current) {
      setPulse(true)
      const timer = window.setTimeout(() => setPulse(false), 650)
      prevCountRef.current = cartCount
      return () => window.clearTimeout(timer)
    }
    prevCountRef.current = cartCount
    return undefined
  }, [cartCount])

  if (cartCount === 0 || location.pathname === '/checkout') {
    return null
  }

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
    0,
  )

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: pulse ? 1.02 : 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={() => navigate('/checkout')}
        className="fixed bottom-[max(0.6rem,env(safe-area-inset-bottom))] left-1/2 z-[80] w-[calc(100%-3rem)] max-w-[18.5rem] -translate-x-1/2 rounded-2xl border border-indigo-300/70 bg-gradient-to-r from-indigo-600 via-sky-500 to-cyan-500 px-3 py-2.5 text-left shadow-[0_16px_36px_rgba(14,116,255,0.35)] backdrop-blur sm:bottom-[max(1.25rem,env(safe-area-inset-bottom))] sm:w-[calc(100%-2rem)] sm:max-w-md sm:px-5 sm:py-3"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                pulse ? 'bg-white text-emerald-600' : 'bg-white/95 text-indigo-600'
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2 sm:h-5 sm:w-5">
                <path d="M6 6h15l-1.4 7.2a2 2 0 0 1-2 1.6H9.2a2 2 0 0 1-2-1.6L5.3 4.6A1.5 1.5 0 0 0 3.8 3.5H2" />
                <circle cx="10" cy="19.3" r="1.2" />
                <circle cx="17.2" cy="19.3" r="1.2" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-white sm:text-sm">
                {cartCount} {cartCount === 1 ? 'item' : 'items'} in cart
              </p>
              <p className="truncate text-[10px] text-white/90 sm:text-xs">
                Tap to open cart
              </p>
            </div>
          </div>

          <div className="shrink-0 pl-2 text-right">
            <p className="text-[10px] uppercase tracking-wide text-white/80 sm:text-xs">Total</p>
            <p className="text-sm font-bold text-white sm:text-lg">INR {total}</p>
          </div>
        </div>
      </motion.button>
    </AnimatePresence>
  )
}

export default FloatingCartBar
