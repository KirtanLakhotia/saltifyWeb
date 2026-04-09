import { motion } from 'framer-motion'

function SignatureButton({
  children,
  as: Component = 'button',
  className = '',
  variant = 'primary',
  ...props
}) {
  const base =
    'group relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] transition duration-500'

  const tone =
    variant === 'primary'
      ? 'text-slate-900'
      : 'text-slate-700'

  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
      <Component className={`${base} ${tone} ${className}`} {...props}>
        <span
          className={`absolute inset-0 rounded-full p-[1px] ${
            variant === 'primary'
              ? 'bg-gradient-to-r from-sky-300 via-indigo-300 to-fuchsia-300'
              : 'bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200'
          }`}
        >
          <span
            className={`block h-full w-full rounded-full ${
              variant === 'primary'
                ? 'bg-gradient-to-r from-white via-sky-50 to-fuchsia-50'
                : 'bg-white'
            }`}
          />
        </span>
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition duration-700 group-hover:translate-x-full" />
        <span className="relative">{children}</span>
      </Component>
    </motion.div>
  )
}

export default SignatureButton
