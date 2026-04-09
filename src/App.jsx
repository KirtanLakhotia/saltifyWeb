import { AnimatePresence, motion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Benefits from './pages/Benefits.jsx'
import Products from './pages/Products.jsx'
import Reviews from './pages/Reviews.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/Login.jsx'
import Checkout from './pages/Checkout.jsx'

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_10%_12%,rgba(56,189,248,0.18),transparent_22%),radial-gradient(circle_at_88%_20%,rgba(251,191,36,0.12),transparent_24%),linear-gradient(180deg,#ffffff_0%,#f8fafc_52%,#f3f4f6_100%)] text-slate-900">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="noise-overlay absolute inset-0 opacity-20" />
        <div className="absolute left-[-8rem] top-10 h-96 w-96 rounded-full bg-sky-200/35 blur-3xl" />
        <div className="absolute right-[-7rem] top-80 h-96 w-96 rounded-full bg-amber-200/35 blur-3xl" />
      </div>
      <div className="relative mx-auto flex min-h-screen w-full max-w-screen-2xl flex-col px-4 sm:px-8 lg:px-12">
        <Navbar />
        <main className="flex-1 py-10 sm:py-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/benefits" element={<Benefits />} />
                <Route path="/products" element={<Products />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
