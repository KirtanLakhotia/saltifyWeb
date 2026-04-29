import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'
import { navLinks } from '../utils/siteData.js'
import { useAppContext } from '../context/hooks/useAppContext.js'
import MagneticButton from './common/MagneticButton.jsx'

function Navbar() {
  const { user, logout, cartCount } = useAppContext()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItemClass = ({ isActive }) =>
    `transition ${
      isActive
        ? 'text-sky-700'
        : 'text-slate-600 hover:text-slate-900'
    }`

  return (
    <header className="sticky top-0 z-40 pt-4">
      <nav className="glass-panel mx-auto flex min-h-20 items-center justify-between gap-3 rounded-2xl px-4 py-2 shadow-[0_12px_30px_rgba(148,163,184,0.18)]">
        <Link to="/" className="shrink-0">
          <img
            src="/finalll/logo.png"
            alt="Saltify"
            className="h-14 w-auto sm:h-16"
          />
        </Link>

        <div className="hidden items-center gap-6 text-sm font-semibold uppercase tracking-wide md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={navItemClass}>
              {link.name}
            </NavLink>
          ))}
        </div>

        {user ? (
          <div className="flex items-center gap-2">
            <Link
              to="/checkout"
              className="rounded-xl border border-sky-300 bg-sky-50 px-3 py-2 text-xs font-bold uppercase tracking-wide text-sky-700 transition hover:bg-sky-100"
            >
              Cart {cartCount}
            </Link>
            <Link
              to="/login"
              className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 sm:inline-flex"
            >
              {user.picture ? (
                <img
                  src={user.picture || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
                  alt={user.name || 'User'}
                  className="h-5 w-5 rounded-full border border-slate-200 object-cover"
                />
              ) : (
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-[10px] font-bold text-slate-700">
                  {(user.name || 'U').charAt(0).toUpperCase()}
                </span>
              )}
              Account
            </Link>
            <button
              onClick={logout}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Logout
            </button>
          </div>
        ) : (
          <MagneticButton
            as={Link}
            to="/login"
            className="rounded-xl bg-gradient-to-r from-sky-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_28px_rgba(56,189,248,0.35)] transition hover:from-sky-400 hover:to-fuchsia-400"
          >
            Login
          </MagneticButton>
        )}

        <button
          onClick={() => setMenuOpen(true)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 md:hidden"
          aria-label="Open menu"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
            <path d="M4 7h16" />
            <path d="M4 12h16" />
            <path d="M4 17h16" />
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              aria-label="Close menu overlay"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/35 md:hidden"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="fixed right-0 top-0 z-50 h-full w-[19rem] border-l border-slate-200 bg-white p-5 shadow-2xl md:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Menu
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
                    <path d="M6 6 18 18" />
                    <path d="M18 6 6 18" />
                  </svg>
                </button>
              </div>

              <div className="space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-700 hover:bg-slate-50"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="/checkout"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-700 hover:bg-slate-50"
                >
                  Cart {cartCount}
                </Link>
                {user ? (
                  <button
                    onClick={() => {
                      logout()
                      setMenuOpen(false)
                    }}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-700 hover:bg-slate-50"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-700 hover:bg-slate-50"
                  >
                    Login
                  </Link>
                )}
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
