import { useRef } from 'react'
import { motion } from 'framer-motion'

function MagneticButton({
  children,
  className = '',
  as: Component = 'button',
  ...props
}) {
  const wrapperRef = useRef(null)

  const onMove = (event) => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const rect = wrapper.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    wrapper.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`
  }

  const onLeave = () => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    wrapper.style.transform = 'translate(0px, 0px)'
  }

  return (
    <motion.div
      ref={wrapperRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      transition={{ type: 'spring', stiffness: 180, damping: 20 }}
      className="inline-flex transition-transform duration-150"
    >
      <Component className={className} {...props}>
        {children}
      </Component>
    </motion.div>
  )
}

export default MagneticButton
