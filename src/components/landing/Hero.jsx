import { useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import SignatureButton from '../common/SignatureButton.jsx'

function Hero() {
  const canvasRef = useRef(null)
  const headlineRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const imageRef = useRef(null)

  const headline = useMemo(() => 'Quality is all that matters.', [])

  useEffect(() => {
    if (
      !headlineRef.current ||
      !subtitleRef.current ||
      !ctaRef.current ||
      !imageRef.current
    ) {
      return
    }

    const chars = headlineRef.current.querySelectorAll('[data-char]')
    gsap.set(chars, { opacity: 0, y: 34, filter: 'blur(8px)' })
    gsap.set([subtitleRef.current, ctaRef.current, imageRef.current], {
      opacity: 0,
      y: 22,
      scale: 0.97,
      filter: 'blur(6px)',
    })

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.to(chars, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      stagger: 0.03,
      duration: 0.9,
    })
      .to(
        imageRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.95,
        },
        '-=0.45',
      )
      .to(
        subtitleRef.current,
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.75 },
        '-=0.5',
      )
      .to(
        ctaRef.current,
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.65 },
        '-=0.4',
      )

    return () => tl.kill()
  }, [headline])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let rafId = 0
    let width = 0
    let height = 0
    let dpr = 1
    const particles = []
    const count = 58

    const reset = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      particles.length = 0
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 0.7 + Math.random() * 1.6,
          alpha: 0.12 + Math.random() * 0.2,
          vx: (Math.random() - 0.5) * 0.08,
          vy: -0.02 - Math.random() * 0.06,
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    const draw = (time) => {
      rafId = window.requestAnimationFrame(draw)
      const t = time / 1000
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        p.x += p.vx + Math.sin(t + p.phase) * 0.02
        p.y += p.vy
        if (p.y < -8) {
          p.y = height + 8
          p.x = Math.random() * width
        }
        if (p.x < -6) p.x = width + 6
        if (p.x > width + 6) p.x = -6
        ctx.fillStyle = `rgba(160,170,190,${p.alpha.toFixed(3)})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    reset()
    rafId = window.requestAnimationFrame(draw)
    window.addEventListener('resize', reset)
    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('resize', reset)
    }
  }, [])

  return (
    <section className="relative h-screen overflow-hidden rounded-[2rem] border border-slate-200 bg-[radial-gradient(circle_at_50%_20%,rgba(147,197,253,0.35),transparent_35%),radial-gradient(circle_at_50%_70%,rgba(251,191,36,0.12),transparent_46%),linear-gradient(180deg,#ffffff_0%,#f8fafc_48%,#f3f4f6_100%)]">
      <div className="pointer-events-none absolute inset-0 noise-overlay opacity-20" />
      <motion.div
        animate={{ opacity: [0.18, 0.34, 0.18], scale: [0.96, 1.03, 0.96] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-1/2 top-[26%] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-gradient-to-b from-sky-300/35 to-fuchsia-200/20 blur-3xl"
      />
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <div className="max-w-5xl">
          <h1
            ref={headlineRef}
            className="font-display text-4xl leading-[0.95] text-slate-900 sm:text-6xl lg:text-7xl"
          >
            {headline.split('').map((char, index) => (
              <span
                key={`${char}-${index}`}
                data-char
                className={char === ' ' ? 'inline-block w-[0.35em]' : 'inline-block'}
              >
                {char}
              </span>
            ))}
          </h1>

          <div
            ref={imageRef}
            className="relative mx-auto mt-8 w-[20rem] sm:w-[26rem] lg:w-[34rem]"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-300/40 via-indigo-200/15 to-amber-200/30 blur-3xl" />
            <img
              src="/images/background_image_bg_removed.png"
              alt="Bamboo salt product"
              className="relative mx-auto w-full drop-shadow-[0_30px_48px_rgba(148,163,184,0.42)]"
            />
          </div>

          <p
            ref={subtitleRef}
            className="mx-auto mt-8 max-w-4xl text-sm leading-relaxed text-slate-600 sm:text-xl"
          >
            We Craft the finest bamboo salt for you quality and purity in every grain.
          </p>

          <div
            ref={ctaRef}
            className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"
          >
            <SignatureButton as={Link} to="/products" variant="primary">
              Explore Products
            </SignatureButton>
            <SignatureButton as={Link} to="/products" variant="ghost">
              Order Now
            </SignatureButton>
          </div>
        </div>
      </div>


    </section>
  )
}

export default Hero
