import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SignatureButton from '../common/SignatureButton.jsx'

function CTA() {
  return (
    <section className="relative overflow-hidden rounded-[2.2rem] border border-slate-200 bg-[radial-gradient(circle_at_top,#bae6fd,transparent_30%),linear-gradient(135deg,#ffffff_0%,#f8fafc_52%,#fff7ed_100%)] px-6 py-14 text-slate-900 shadow-[0_24px_50px_rgba(148,163,184,0.2)] sm:px-12">
      <motion.div
        className="absolute -right-12 top-0 h-40 w-40 rounded-full bg-sky-200/45 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-10 bottom-0 h-48 w-48 rounded-full bg-amber-200/40 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative grid items-center gap-6 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            Strong Call To Action
          </p>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl">
            Elevate Every Meal.
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-600 sm:text-base">
            Switch to a cleaner, richer, and more refined salt experience.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <SignatureButton
            as={Link}
            to="/products"
            variant="primary"
          >
            Order Now
          </SignatureButton>
          <SignatureButton
            as={Link}
            to="/contact"
            variant="ghost"
          >
            Contact Us
          </SignatureButton>
        </div>
      </div>
    </section>
  )
}

export default CTA
